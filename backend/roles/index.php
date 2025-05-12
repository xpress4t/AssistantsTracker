<?php
require("../utilities/cors.php");
require_once("../services/index.php");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $roles = getRoles();
        echo json_encode($roles);
        exit;

    default:
        http_response_code(405);
        echo json_encode(["errpr" => "Método no permitido"]);
        exit;
}
