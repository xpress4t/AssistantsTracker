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
    $query = "SELECT users.userId, name, lastname, password, email, roleId FROM users JOIN user_roles ON users.userId = user_roles.userId WHERE email = '$email'";
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

    $query = "SELECT users.userId as id, name, lastname, photo, email, roleId as role FROM users LEFT JOIN user_roles ON users.userId = user_roles.userId";
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
            $row['photo'] = "http://localhost/backend/assets/avatar/" . $row['photo'];
        }
        $users[] = $row;
    }

    return $users;
}

function createUser($user)
{
    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);
    if (!$connectionBBDD) {
        die("Conexión fallida: " . mysqli_connect_error());
    }

    $name = mysqli_real_escape_string($connectionBBDD, $user['name']);
    $lastname = mysqli_real_escape_string($connectionBBDD, $user['lastname']);
    $email = mysqli_real_escape_string($connectionBBDD, $user['email']);
    $password = mysqli_real_escape_string($connectionBBDD, $user['password']);
    $photo = mysqli_real_escape_string($connectionBBDD, $user['photo']);

    $checkQuery = "SELECT userId FROM users WHERE email = '$email'";
    $checkResult = mysqli_query($connectionBBDD, $checkQuery);
    if ($checkResult && mysqli_num_rows($checkResult) > 0) {
        http_response_code(409);
        echo json_encode([
            'field' => 'email',
            'message' => "Este correo ya está en uso"
        ]);
        die();
    }

    $query = "INSERT INTO users (name, lastname, email, password, photo) VALUES ('$name', '$lastname', '$email', '$password', '$photo')";
    mysqli_query($connectionBBDD, $query);
    return getUserByEmail($email);
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

    // Verifica si ya existe un registro en user_roles para este usuario
    $check = mysqli_query($connectionBBDD, "SELECT * FROM user_roles WHERE userId = '$userId'");
    if (mysqli_num_rows($check) > 0) {
        // Si existe, actualiza
        $query2 = "UPDATE user_roles SET roleId = '$roleId' WHERE userId = '$userId'";
        mysqli_query($connectionBBDD, $query2);
    } else {
        // Si no existe, inserta
        $query2 = "INSERT INTO user_roles (userId, roleId) VALUES ('$userId', '$roleId')";
        mysqli_query($connectionBBDD, $query2);
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

    $userId = mysqli_real_escape_string($connectionBBDD, $userId);
    if (empty($userId)) {
        http_response_code(400);
        echo json_encode([
            'field' => 'userId',
            'message' => "Este campo es obligatorio"
        ]);
        die();
    }
    $query1 = "DELETE FROM user_roles WHERE userId = '$userId'";
    mysqli_query($connectionBBDD, $query1);
    $query2 = "DELETE FROM user_classroom WHERE userId = '$userId'";
    mysqli_query($connectionBBDD, $query2);
    $query3 = "DELETE FROM users WHERE userId = '$userId'";
    mysqli_query($connectionBBDD, $query3);
    return getUsers(null);
}

function getFreeStudents()
{
    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);

    if (!$connectionBBDD) {
        die("Conexión fallida: " . mysqli_connect_error());
    }

    $query = "SELECT users.userId as id, roleId, classroomId FROM users JOIN user_roles ON users.userId = user_roles.userId LEFT JOIN user_classroom ON users.userId = user_classroom.userId WHERE roleId = 3 AND classroomId IS NULL";

    $resultado = mysqli_query($connectionBBDD, $query);

    if (!isset($resultado) || mysqli_num_rows($resultado) == 0) {
        return null;
    }

    $users = array();
    while ($row = mysqli_fetch_assoc($resultado)) {
        $users[] = $row['id'];
    }

    return $users;
}
