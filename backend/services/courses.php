<?php
function getCourses()
{
    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);

    if (!$connectionBBDD) {
        die("Conexión fallida: " . mysqli_connect_error());
    }

    $coursesQuery = "SELECT classroomId AS id, name FROM classrooms";
    $coursesRes = mysqli_query($connectionBBDD, $coursesQuery);
    if (!isset($coursesRes) || mysqli_num_rows($coursesRes) == 0) {
        return null;
    }

    $courses = array();
    while ($row = mysqli_fetch_assoc($coursesRes)) {
        $row['studentIds'] = array();
        $row['subjects'] = array();

        $studentsQuery = "SELECT userId, classroomId from user_classroom WHERE classroomId = " . $row['id'];
        $studentsRes = mysqli_query($connectionBBDD, $studentsQuery);
        if (!(!isset($studentsRes) || mysqli_num_rows($studentsRes) == 0)) {
            while ($studentRow = mysqli_fetch_assoc($studentsRes)) {
                $row['studentIds'][] = $studentRow['userId'];
            }
        }

        $subjectsQuery = "SELECT classroomId, subjectId, teacherId from classroom_subjects WHERE classroomId = " . $row['id'];
        $subjectsQuery = mysqli_query($connectionBBDD, $subjectsQuery);
        if (!(!isset($subjectsQuery) || mysqli_num_rows($subjectsQuery) == 0)) {
            while ($subjectRow = mysqli_fetch_assoc($subjectsQuery)) {
                unset($subjectRow['classroomId']);
                $row['subjects'][] = $subjectRow;
            }
        }

        $courses[] = $row;
    }

    return $courses;
}

function createCourse($course)
{
    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $GLOBALS['connectionBBDD'] = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);
    if (!$GLOBALS['connectionBBDD']) {
        die("Conexión fallida: " . mysqli_connect_error());
    }

    function escapeStudentIds($studentId)
    {
        return mysqli_real_escape_string($GLOBALS['connectionBBDD'], $studentId);
    }

    function escapeSubjectData($subject)
    {
        return [
            'subjectId' => mysqli_real_escape_string($GLOBALS['connectionBBDD'], $subject['subjectId']),
            'teacherId' => isset($subject['teacherId'])
                ? mysqli_real_escape_string($GLOBALS['connectionBBDD'], $subject['teacherId'])
                : null,
        ];
    }

    $name = mysqli_real_escape_string($GLOBALS['connectionBBDD'], $course['name']);
    $students = array_map('escapeStudentIds', $course['studentIds']);
    $subjects = array_map('escapeSubjectData', $course['subjects']);

    $insertQuery = "INSERT INTO classrooms (name) VALUES ('" . $name . "')";
    mysqli_query($GLOBALS['connectionBBDD'], $insertQuery);

    // Obtener el courseID
    $courseQuery = 'SELECT * FROM classrooms ORDER BY classroomId DESC LIMIT 1';
    $resultado = mysqli_query($GLOBALS['connectionBBDD'], $courseQuery);

    if (!isset($resultado) || mysqli_num_rows($resultado) == 0) {
        return null;
    }

    $classroomId = null;
    while ($row = mysqli_fetch_assoc($resultado)) {
        $classroomId = $row['classroomId'];
    }

    // Hacer un INSERT por cada estudiante, en la tabla user_classroom
    if (isset($students) && !empty($students)) {
        $insertStudentQuery = "INSERT INTO user_classroom (userId, classroomId) VALUES ";
        foreach ($students as $studentId) {
            $insertStudentQuery = $insertStudentQuery . "('" . $studentId . "', '" . $classroomId . "'), ";
        }
        // Con el rtrim elimino la coma y el espacio que hay demás en la query del forEach
        $insertStudentQuery = rtrim($insertStudentQuery, ", ");
        mysqli_query($GLOBALS['connectionBBDD'], $insertStudentQuery);
    }

    if (isset($subjects) && !empty($subjects)) {
        $insertSubjectQuery = "INSERT INTO classroom_subjects (classroomId, subjectId, teacherId) VALUES ";
        foreach ($subjects as $subjectId) {
            $insertSubjectQuery = $insertSubjectQuery . "('" . $classroomId . "','" . $subjectId['subjectId'] . "', '" . $subjectId['teacherId'] . "'), ";
        }
        // Hacer un INSERT por cada materia, en la tabla classroom_subjects
        $insertSubjectQuery = rtrim($insertSubjectQuery, ", ");
        mysqli_query($GLOBALS['connectionBBDD'], $insertSubjectQuery);
    }


    return getCourses();
}

function editCourse($course)
{
    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $GLOBALS['connectionBBDD'] = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);

    if (!$GLOBALS['connectionBBDD']) {
        die("Conexión fallida: " . mysqli_connect_error());
    }

    function realEscapeStudentIds($studentId)
    {
        return mysqli_real_escape_string($GLOBALS['connectionBBDD'], $studentId);
    }

    function realEscapeSubjectData($subject)
    {
        return [
            'subjectId' => mysqli_real_escape_string($GLOBALS['connectionBBDD'], $subject['subjectId']),
            'teacherId' => isset($subject['teacherId'])
                ? mysqli_real_escape_string($GLOBALS['connectionBBDD'], $subject['teacherId'])
                : null,
        ];
    }

    $classroomId = mysqli_real_escape_string($GLOBALS['connectionBBDD'], $course['id']);
    $name = mysqli_real_escape_string($GLOBALS['connectionBBDD'], $course['name']);
    $students = array_map('realEscapeStudentIds', $course['studentIds']);
    $subjects = array_map('realEscapeSubjectData', $course['subjects']);

    $query = "UPDATE classrooms SET name = '$name' WHERE classroomId = '$classroomId'";
    mysqli_query($GLOBALS['connectionBBDD'], $query);

    // Eliminar los estudiantes y materias anteriores
    $deleteStudents = "DELETE FROM user_classroom WHERE classroomId = '$classroomId'";
    mysqli_query($GLOBALS['connectionBBDD'], $deleteStudents);

    $deleteSubjects = "DELETE FROM classroom_subjects WHERE classroomId = '$classroomId'";
    mysqli_query($GLOBALS['connectionBBDD'], $deleteSubjects);

    // Hacer un INSERT por cada estudiante, en la tabla user_classroom
    if (isset($students) && !empty($students)) {
        $insertStudentQuery = "INSERT INTO user_classroom (userId, classroomId) VALUES ";
        foreach ($students as $studentId) {
            $insertStudentQuery = $insertStudentQuery . "('" . $studentId . "', '" . $classroomId . "'), ";
        }
        // Con el rtrim elimino la coma y el espacio que hay demás en la query del forEach
        $insertStudentQuery = rtrim($insertStudentQuery, ", ");
        mysqli_query($GLOBALS['connectionBBDD'], $insertStudentQuery);
    }

    if (isset($subjects) && !empty($subjects)) {
        $insertSubjectQuery = "INSERT INTO classroom_subjects (classroomId, subjectId, teacherId) VALUES ";
        foreach ($subjects as $subjectId) {
            $insertSubjectQuery = $insertSubjectQuery . "('" . $classroomId . "','" . $subjectId['subjectId'] . "', '" . $subjectId['teacherId'] . "'), ";
        }
        // Hacer un INSERT por cada materia, en la tabla classroom_subjects
        $insertSubjectQuery = rtrim($insertSubjectQuery, ", ");
        mysqli_query($GLOBALS['connectionBBDD'], $insertSubjectQuery);
    }

    return getCourses();
}

function deleteCourse($courseId)
{
    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);

    if (!$connectionBBDD) {
        die("Conexión fallida: " . mysqli_connect_error());
    }
    $courseId = mysqli_real_escape_string($connectionBBDD, $courseId);
    if (empty($courseId)) {
        http_response_code(400);
        echo json_encode([
            'field' => 'id',
            'message' => "Este campo es obligatorio"
        ]);
        die();
    }

    $query = "DELETE FROM classrooms WHERE classroomId = '$courseId'";
    mysqli_query($connectionBBDD, $query);

    return getCourses();
}
