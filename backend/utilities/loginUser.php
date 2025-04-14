<?php
    require_once("../connection.php");

    function userAuthenticate($email,$password){
        $user = getUserByEmail($email);

        if($user == false || $user["password"] !== $password){
            http_response_code(404);
            echo json_encode([
                "error" => "Usuario no encontrado o credenciales incorrectas",
                "code" => 404
            ]);
            exit;
        }

        $user["password"] = null;
        
        $_SESSION['user'] = $user;
        $_SESSION['time'] = time();
    }
?>