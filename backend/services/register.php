<?php

function registerUser($user)
{
    global $databaseHost, $databaseUser, $databaseName, $databasePassword;
    $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databaseName, $databasePassword);

    if (!$connectionBBDD) {
        die("Conexión fallida: " . mysqli_connect_error());
    }
    $name = mysqli_real_escape_string($connectionBBDD, $user['name']);
    
}
