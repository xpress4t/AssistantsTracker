<?php
require_once("databaseConfig.php");

function getUserByEmail($email)
{
    //comprobar si esta seteado o no esta vacio
    if (!isset($email) || empty($email)) {
        return null;
    }

    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);
    // Comprobar la conexión
    if (!$connectionBBDD) {
        die("Conexión fallida: " . mysqli_connect_error());
    }

    // Para evitar caracteres raros en al consulta
    $email = mysqli_real_escape_string($connectionBBDD, $email);
    // Realizo la consulta
    $query = "SELECT id, name, lastname, password, photo, email FROM users WHERE email = '$email'";
    // Ejecuto la consulta
    $resultado = mysqli_query($connectionBBDD, $query);

    if (!isset($resultado) || mysqli_num_rows($resultado) == 0) {
        return null;
    }

    $user = $resultado->fetch_assoc();
    return $user;
}

function getStudents()
{
    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);
    // Comprobar la conexión
    if (!$connectionBBDD) {
        die("Conexión fallida: " . mysqli_connect_error());
    }

    // Realizo la consulta
    $query = "SELECT id, name, lastname, photo FROM users";
    // Ejecuto la consulta
    $resultado = mysqli_query($connectionBBDD, $query);

    if (!isset($resultado) || mysqli_num_rows($resultado) == 0) {
        return null;
    }

    $students = array();
    while ($row = mysqli_fetch_assoc($resultado)) {
        if (isset($row['photo']) && !empty($row['photo'])) {
            $row['photo'] = "http://localhost" . $row['photo'];
        }
        $students[] = $row;
    }

    return $students;
}
