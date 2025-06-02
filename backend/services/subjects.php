<?php
// Este archivo es /backend/services/subjects.php, que contiene las funciones para obtener las asignaturas de la base de datos
function getSubjects()
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
  };

  $query = "SELECT subjects.subjectId as id, name FROM subjects";

  $resultado = mysqli_query($connectionBBDD, $query);

  if (!isset($resultado) || mysqli_num_rows($resultado) == 0) {
    return null;
  }

  $mySubjects = [];
  if ($roleId === '2' || $roleId === '3') {
    $courses = getCourses();

    foreach ($courses as $course) {
      foreach ($course['subjects'] as $subject) {
        if (
          $roleId === '3' ||
          ($subject['teacherId'] === $userId && !in_array($subject['subjectId'], $mySubjects))
        ) {
          $mySubjects[] = $subject['subjectId'];
        }
      }
    }
  }

  $subjects = array();
  while ($row = mysqli_fetch_assoc($resultado)) {
    switch ($roleId) {
      case '1':
        $subjects[] = $row;
        break;

      case '2':
      case '3':
        if (in_array($row['id'], $mySubjects)) {
          $subjects[] = $row;
        }
        break;

      default:
    }
  }
  return $subjects;
}

function createSubject($subject)
{
  global $databaseHost, $databaseUser, $databasePassword, $databaseName;
  $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);

  if (!$connectionBBDD) {
    die("Conexión fallida: " . mysqli_connect_error());
  };

  $name = mysqli_real_escape_string($connectionBBDD, $subject['name']);
  $query = "INSERT INTO subjects (name) VALUES ('" . $name . "')";
  mysqli_query($connectionBBDD, $query);

  return getSubjects();
}

function editSubject($subject)
{
  global $databaseHost, $databaseUser, $databasePassword, $databaseName;
  $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);

  if (!$connectionBBDD) {
    die("Conexión fallida: " . mysqli_connect_error());
  };
  $name = mysqli_real_escape_string($connectionBBDD, $subject['name']);
  $id = mysqli_real_escape_string($connectionBBDD, $subject['id']);
  if (empty($name) || empty($id)) {
    http_response_code(400);
    echo json_encode([
      'field' => empty($name) ? 'name' : 'id',
      'message' => "Este campo es obligatorio"
    ]);
    die();
  }
  $query = "UPDATE subjects SET name = '$name' WHERE subjectId = '$id'";
  mysqli_query($connectionBBDD, $query);

  return getSubjects();
}

function deleteSubject($subjectId)
{
  global $databaseHost, $databaseUser, $databasePassword, $databaseName;
  $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);

  if (!$connectionBBDD) {
    die("Conexión fallida: " . mysqli_connect_error());
  }

  $subjectId = mysqli_real_escape_string($connectionBBDD, $subjectId);
  if (empty($subjectId)) {
    http_response_code(400);
    echo json_encode([
      'field' => 'subjectId',
      'message' => "Este campo es obligatorio"
    ]);
    die();
  }
  $query = "DELETE FROM subjects WHERE subjectId = '$subjectId'";
  mysqli_query($connectionBBDD, $query);

  return getSubjects();
}
