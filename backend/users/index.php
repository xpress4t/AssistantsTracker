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

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        exit;
}
