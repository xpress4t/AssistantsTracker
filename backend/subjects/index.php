<?php
require("../utilities/cors.php");
require_once("../services/index.php");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $subjects = getSubjects();
        echo json_encode($subjects);
        exit;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        exit;
}
