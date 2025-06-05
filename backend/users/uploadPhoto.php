<?php
require_once("../utilities/session.php");
require_once("../utilities/cors.php");

$targetDir = "../assets/avatar/";
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['photo'])) {
    $file = $_FILES['photo'];
    $fileName = uniqid() . "_" . basename($file["name"]);
    $targetFile = $targetDir . $fileName;

    if (move_uploaded_file($file["tmp_name"], $targetFile)) {
        echo json_encode([
            "url" => $fileName
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error al subir la foto"]);
    }
    exit;
}

http_response_code(400);
echo json_encode(["error" => "No se recibió archivo"]);
exit;
