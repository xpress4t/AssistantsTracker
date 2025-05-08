<?php

use function PHPSTORM_META\type;

require("../utilities/cors.php");
require_once("../services/index.php");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $courses = getCourses();
        echo json_encode($courses);
        exit;

    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);

        // Validar que $body['name'] existe y es un valor válido
        if (!isset($body['name']) || !is_string($body['name']) || empty($body['name'])) {
            http_response_code(400);
            echo json_encode([
                'field' => 'name',
                'message' => "Este campo es obligatorio"
            ]);
            die();
        }

        $course = [];
        $course['name'] = trim($body['name']);

        $courses = createCourse($course);
        echo json_encode($courses);
        exit;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        exit;
}
