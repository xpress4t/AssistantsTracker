<?php
// Este archivo es /backend/services/users.php, que contiene las funciones para obtener los usuarios de la base de datos
function getUserByEmail($email)
{
    //comprobar si esta seteado o no esta vacio
    if (!isset($email) || empty($email)) {
        return null;
    }

    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);

    if (!$connectionBBDD) {
        die("Conexión fallida: " . mysqli_connect_error());
    }

    $email = mysqli_real_escape_string($connectionBBDD, $email);
    $query = "SELECT userId, name, lastname, password, email, password FROM users WHERE email = '$email'";
    $resultado = mysqli_query($connectionBBDD, $query);

    if (!isset($resultado) || mysqli_num_rows($resultado) == 0) {
        return null;
    }

    $user = $resultado->fetch_assoc();
    return $user;
}

function getUsers($roleId)
{
    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);

    if (!$connectionBBDD) {
        die("Conexión fallida: " . mysqli_connect_error());
    }

    $query = "SELECT users.userId as id, name, lastname, photo, email, roleId as role FROM users JOIN user_roles ON users.userId = user_roles.userId";
    if (isset($roleId) && $roleId != null) {
        $query = $query . " WHERE role = " . $roleId;
    }
    $resultado = mysqli_query($connectionBBDD, $query);

    if (!isset($resultado) || mysqli_num_rows($resultado) == 0) {
        return null;
    }

    $users = array();
    while ($row = mysqli_fetch_assoc($resultado)) {
        if (isset($row['photo']) && !empty($row['photo'])) {
            $row['photo'] = "http://localhost" . $row['photo'];
        }
        $users[] = $row;
    }

    return $users;
}
