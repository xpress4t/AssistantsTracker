<?php
// Este archivo es /backend/users/index.php, que es el "endpoint" para obtener los usuarios
require("../utilities/cors.php");
require_once("../services/index.php");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $roleId = isset($_GET['roleId']) ? $_GET['roleId'] : null;
        $users = getUsers($roleId);
        echo json_encode($users);
        exit;

    case 'PUT':
        $body = json_decode(file_get_contents("php://input"), true);

        if (!isset($body['user']['name']) || empty($body['user']['name'])) {
            http_response_code(400);
            echo json_encode([
                'field' => 'name',
                'message' => "Este campo es obligatorio"
            ]);
            die();
        }

        if (!isset($body['user']['lastname']) || empty($body['user']['lastname'])) {
            http_response_code(400);
            echo json_encode([
                'field' => 'lastname',
                'message' => "Este campo es obligatorio"
            ]);
            die();
        }

        if (!isset($body['user']['email']) || empty($body['user']['email'])) {
            http_response_code(400);
            echo json_encode([
                'field' => 'email',
                'message' => "Este campo es obligatorio"
            ]);
            die();
        }

        if (!isset($body['user']['roleId']) || empty($body['user']['roleId'])) {
            http_response_code(400);
            echo json_encode([
                'field' => 'roleId',
                'message' => "Este campo es obligatorio"
            ]);
            die();
        }

        if (!isset($body['user']['userId']) || empty($body['user']['userId'])) {
            http_response_code(400);
            echo json_encode([
                'field' => 'userId',
                'message' => "Este campo es obligatorio"
            ]);
            die();
        }

        $user = [];
        $user['name'] = trim($body['user']['name']);
        $user['lastname'] = trim($body['user']['lastname']);
        $user['email'] = trim($body['user']['email']);
        $user['roleId'] = trim($body['user']['roleId']);
        $user['userId'] = trim($body['user']['userId']);

        $users = editUser($user);
        echo json_encode($users);
        exit;

    case 'DELETE':
        $body = json_decode(file_get_contents("php://input"), true);

        exit;
        
    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        exit;
}
