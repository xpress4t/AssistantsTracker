<?php
require("../utilities/cors.php");
require_once("../connection.php");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $students = getStudents();
        echo json_encode($students);
        exit;

    default:
        http_response_code(405); 
        echo json_encode(["error" => "Método no permitido"]);
        exit;
}