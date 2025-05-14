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
        $course['studentIds'] = $body['studentIds'];
        $course['subjects'] = $body['subjects'];

        $courses = createCourse($course);
        echo json_encode($courses);
        exit;

    case 'PUT':
        $body = json_decode(file_get_contents('php://input'), true);

        if (!isset($body['id']) || !is_string($body['id']) || empty($body['id'])) {
            http_response_code(400);
            echo json_encode([
                'field' => 'id',
                'message' => "Este campo es obligatorio"
            ]);
            die();
        }

        if (!isset($body['name']) || !is_string($body['name']) || empty($body['name'])) {
            http_response_code(400);
            echo json_encode([
                'field' => 'name',
                'message' => "Este campo es obligatorio"
            ]);
            die();
        }

        $course = [];
        $course['id'] = trim($body['id']);
        $course['name'] = trim($body['name']);
        $course['studentIds'] = $body['studentIds'];
        $course['subjects'] = $body['subjects'];

        $courses = editCourse($course);
        echo json_encode($courses);
        exit;

    case 'DELETE':
        $body = json_decode(file_get_contents('php://input'), true);

        if (!isset($body['id']) || !is_string($body['id']) || empty($body['id'])) {
            http_response_code(400);
            echo json_encode([
                'field' => 'id',
                'message' => "Este campo es obligatorio"
            ]);
            die();
        }

        $courseId = $body['id'];
        $courses = deleteCourse($courseId);
        echo json_encode($courses);
        exit;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        exit;
}
