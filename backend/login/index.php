<?php
require("../utilities/cors.php");
require_once("../utilities/loginUser.php");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        // Lee el contenido bruto del body
        $input = file_get_contents('php://input');
        if ($input === false) {
            echo 'Error al leer el cuerpo de la solicitud';
            exit;
        }

        // Decodifica el JSON
        $data = json_decode($input, true); // true lo convierte en array asociativo
        
        // Accede a los valores
        if (!isset($data['email']) || !isset($data['password'])) {
            echo 'null';
            exit;
        }
        
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
        
        userAuthenticate($email, $password);

        echo json_encode($_SESSION['user']);
        exit;

    case 'GET':
    default:
        exit;
}
