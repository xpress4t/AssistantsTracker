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
  $query = "SELECT users.userId, name, lastname, password, email, roleId, photo FROM users LEFT JOIN user_roles ON users.userId = user_roles.userId WHERE email = '$email'";
  $resultado = mysqli_query($connectionBBDD, $query);

  if (!isset($resultado) || mysqli_num_rows($resultado) == 0) {
    return null;
  }

  $user = $resultado->fetch_assoc();

  if (isset($user['photo']) && !empty($user['photo'])) {
    $user['photo'] = $_ENV["API_URL"] . "/assets/avatar/" . $user['photo'];
  }

  return $user;
}

function getUsers($roleIdFilter)
{
  if (!isset($_SESSION['user'])) {
    return [];
  }

  $roleId = $_SESSION['user']['roleId'];
  $userId = $_SESSION['user']['userId'];

  global $databaseHost, $databaseUser, $databasePassword, $databaseName;
  $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);

  if (!$connectionBBDD) {
    die("Conexión fallida: " . mysqli_connect_error());
  }

  $query = "SELECT users.userId as id, name, lastname, photo, email, roleId as role FROM users LEFT JOIN user_roles ON users.userId = user_roles.userId";
  if (isset($roleIdFilter) && $roleIdFilter != null) {
    $query = $query . " WHERE roleId = " . $roleIdFilter;
  }
  $resultado = mysqli_query($connectionBBDD, $query);

  if (!isset($resultado) || mysqli_num_rows($resultado) == 0) {
    return null;
  }

  $myStudents = [];
  if ($roleId === '2') {
    $courses = getCourses();
    foreach ($courses as $course) {
      foreach ($course['studentIds'] as $studentId) {
        $myStudents[] = $studentId;
      }
    }
  }

  $users = array();
  while ($row = mysqli_fetch_assoc($resultado)) {
    if (isset($row['photo']) && !empty($row['photo'])) {
      $row['photo'] = $_ENV["API_URL"] . "/assets/avatar/" . $row['photo'];
    }

    if ($roleIdFilter === '3') {
      switch ($roleId) {
        case '1':
          $users[] = $row;
          break;

        case '2':
          if (in_array($row['id'], $myStudents)) {
            $users[] = $row;
          }
          break;

        case '3':
          if ($row['id'] == $userId) {
            $users[] = $row;
          }
          break;

        default:
      }
    } else {
      $users[] = $row;
    }
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

function cleanUpNonStudentUser($userId)
{
  global $databaseHost, $databaseUser, $databasePassword, $databaseName;
  $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);

  if (!$connectionBBDD) {
    die("Conexión fallida: " . mysqli_connect_error());
  }

  mysqli_query(
    $connectionBBDD,
    "DELETE FROM user_classroom WHERE userId = '$userId'"
  );

  mysqli_query(
    $connectionBBDD,
    "DELETE FROM attendance WHERE userId = '$userId'"
  );
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

  if ($roleId != 3) {
    cleanUpNonStudentUser($userId);
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
  if (!isset($_SESSION['user'])) {
    return [];
  }

  $roleId = $_SESSION['user']['roleId'];

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
    switch ($roleId) {
      case '1':
      case '2':
        $users[] = $row['id'];

      case '3':
      default:
    }
  }

  return $users;
}
