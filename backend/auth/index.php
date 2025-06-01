<?php
require_once("../utilities/session.php");
require_once("../utilities/cors.php");
require_once("../services/index.php");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $response = null;

        if (isset($_SESSION['user'])) {
            $response  = $_SESSION['user'];
        }

        echo json_encode($response);
        exit;

    case 'POST':
        $input = file_get_contents('php://input');
        if ($input === false) {
            echo 'Error al leer el cuerpo de la solicitud';
            exit;
        }
        $data = json_decode($input, true);
        if (!isset($data['email']) || !isset($data['password'])) {
            echo 'null';
            exit;
        }

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        userAuthenticate($email, $password);

        echo json_encode($_SESSION['user']);
        exit;

    case 'PUT':
        $body = json_decode(file_get_contents("php://input"), true);

        if (!isset($body['name']) || empty($body['name'])) {
            http_response_code(400);
            echo json_encode([
                'field' => 'name',
                'message' => "Este campo es obligatorio"
            ]);
            die();
        }

        if (!isset($body['lastname']) || empty($body['lastname'])) {
            http_response_code(400);
            echo json_encode([
                'field' => 'lastname',
                'message' => "Este campo es obligatorio"
            ]);
            die();
        }

        if (!isset($body['email']) || empty($body['email'])) {
            http_response_code(400);
            echo json_encode([
                'field' => 'email',
                'message' => "Este campo es obligatorio"
            ]);
            die();
        }

        if (!isset($body['password']) || empty($body['password'])) {
            http_response_code(400);
            echo json_encode([
                'field' => 'password',
                'message' => "Este campo es obligatorio"
            ]);
            die();
        }

        $user = [];
        $user['name'] = trim($body['name']);
        $user['lastname'] = trim($body['lastname']);
        $user['email'] = trim($body['email']);
        $user['password'] = trim($body['password']);
        $user['photo'] = isset($body['photo']) ? trim($body['photo']) : "";

        $result = createUser($user);
        $result["password"] = null;
        $_SESSION["user"] = $result;
        echo json_encode($result);
        exit;

    case 'DELETE':
        deleteSession();
        echo json_encode([]);
        exit;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        exit;
}
