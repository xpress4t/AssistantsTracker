<?php
require_once("../utilities/session.php");
require_once("../utilities/cors.php");
require_once("../services/index.php");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $roles = getRoles();
        echo json_encode($roles);
        exit;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        exit;
}
