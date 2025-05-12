<?php
function getRoles()
{
    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);
    if (!$connectionBBDD) {
        die("Conexión fallida: " . mysqli_connect_error());
    };

    $query = "SELECT roleId as id, name FROM roles";
    $resultado = mysqli_query($connectionBBDD, $query);
    if (!isset($resultado) || mysqli_num_rows($resultado) == 0) {
        return null;
    }

    $roles = array();
    while ($row = mysqli_fetch_assoc($resultado)) {
        $roles[] = $row;
    }
    return $roles;
}
