<?php
    require_once("../connection.php");

    function userAuthenticate($email,$password){
        $user = getUserByEmail($email);

        if($user == false || $user["password"] !== $password){
            return false;
        }

        $user["password"] = null;
        
        $_SESSION['user'] = $user;
        $_SESSION['time'] = time();
    }
?>