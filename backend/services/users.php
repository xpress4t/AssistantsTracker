<?php
function getUserByEmail($email)
{
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
        $query = $query . " WHERE roleId = " . $roleId;
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

function editUser($user)
{
    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);

    if (!$connectionBBDD) {
        die("Conexión fallida: " . mysqli_connect_error());
    }

    $name = mysqli_real_escape_string($connectionBBDD, $user['name']);
    $lastname = mysqli_real_escape_string($connectionBBDD, $user['lastname']);
    $email = mysqli_real_escape_string($connectionBBDD, $user['email']);
    $roleId = mysqli_real_escape_string($connectionBBDD, $user['roleId']);
    $userId = mysqli_real_escape_string($connectionBBDD, $user['userId']);

    $query1 = "UPDATE users SET name = '$name', lastname = '$lastname', email = '$email' WHERE userId = '$userId'";
    mysqli_query($connectionBBDD, $query1);

    $query2 = "UPDATE user_roles SET roleId = '$roleId' WHERE userId = '$userId'";
    if (!mysqli_query($connectionBBDD, $query2)) {
        die("Error en la consulta: " . mysqli_error($connectionBBDD));
    }

    return getUsers(null);
}

function deleteUser($userId)
{
    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);
    
    if (!$connectionBBDD) {
        die("Conexión fallida: " . mysqli_connect_error());
    }
    
    $query = "DELETE FROM users WHERE userId = '$userId'";
    mysqli_query($connectionBBDD, $query);
}
