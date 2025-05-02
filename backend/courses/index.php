<?php
require("../utilities/cors.php");
require_once("../services/index.php");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $courses = getCourses();
        echo json_encode($courses);
        exit;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        exit;
}
