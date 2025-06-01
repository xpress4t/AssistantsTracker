<?php

function checkValue($value)
{
    if (isset($value) && !empty($value) && !is_null($value)) {
        return true;
    }

    return false;
}


function getAttendance($course, $student, $subject, $dateFrom, $dateTo)
{
    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);

    if (!$connectionBBDD) {
        die("Conexión fallida: " . mysqli_connect_error());
    }

    $attendanceQuery = "SELECT attendanceId, classroomId, attendance.userId, subjectId, date, value ";
    $attendanceQuery .= "FROM attendance LEFT JOIN user_classroom ON attendance.userId = user_classroom.userId";

    // Debemos añadir WHERE si alguno de los parámetros es distinto de null
    if (checkValue($course) || checkValue($student) || checkValue($subject) || checkValue($dateFrom) || checkValue($dateTo)) {
        $attendanceQuery .= " WHERE ";
        $conditions = array();

        if (checkValue($course)) {
            $conditions[] = "classroomId = '" . mysqli_real_escape_string($connectionBBDD, $course) . "'";
        }
        if (checkValue($student)) {
            $conditions[] = "attendance.userId = '" . mysqli_real_escape_string($connectionBBDD, $student) . "'";
        }
        if (checkValue($subject)) {
            $conditions[] = "subjectId = '" . mysqli_real_escape_string($connectionBBDD, $subject) . "'";
        }
        if (checkValue($dateFrom)) {
            $conditions[] = "date >= '" . convertToMySQLTimestamp(mysqli_real_escape_string($connectionBBDD, $dateFrom)) . "'";
        }
        if (checkValue($dateTo)) {
            $conditions[] = "date <= '" . convertToMySQLTimestamp(mysqli_real_escape_string($connectionBBDD, $dateTo)) . "'";
        }

        $attendanceQuery .= implode(" AND ", $conditions);
    }

    $attendanceQuery .= " ORDER BY date DESC";

    $attendanceResponse = mysqli_query($connectionBBDD, $attendanceQuery);
    if (!isset($attendanceResponse) || mysqli_num_rows($attendanceResponse) == 0) {
        return [];
    }


    $attendances = array();
    while ($row = mysqli_fetch_assoc($attendanceResponse)) {
        $row['value'] = (bool)$row['value'];
        $attendances[] = $row;
    }

    return $attendances;
}

function createAttendance($attendance, $filters)
{
    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);

    if (!$connectionBBDD) {
        die("Conexión fallida: " . mysqli_connect_error());
    }
    if (
        !isset($attendance['userId']) ||
        !isset($attendance['subjectId']) ||
        !isset($attendance['value'])
    ) {
        http_response_code(400);
        die(json_encode([
            "error" => "Faltan datos en attendance",
            "attendance" => $attendance
        ]));
    }

    $userId = mysqli_real_escape_string($connectionBBDD, $attendance['userId']);
    $subjectId = mysqli_real_escape_string($connectionBBDD, $attendance['subjectId']);
    $value = $attendance['value'] ? 1 : 0;
    $date = date('Y-m-d');
    $query1 = "SELECT attendanceId FROM attendance WHERE userId='$userId' AND subjectId='$subjectId' AND date='$date'";
    $checkResult = mysqli_query($connectionBBDD, $query1);

    if (mysqli_num_rows($checkResult) > 0) {
        http_response_code(409);
        die(json_encode(["error" => "La asistencia ya existe para este usuario, asignatura y fecha"]));
    }

    $query2 = "INSERT INTO attendance (userId, subjectId, value, date) VALUES ('$userId', '$subjectId', '$value', '$date')";
    $result = mysqli_query($connectionBBDD, $query2);

    if (!$result) {
        http_response_code(500);
        die(json_encode(["error" => "Error al insertar asistencia"]));
    }


    return getAttendance(
        isset($filters['course']) ? $filters['course'] : null,
        isset($filters['student']) ? $filters['student'] : null,
        isset($filters['subject']) ? $filters['subject'] : null,
        isset($filters['dateFrom']) ? $filters['dateFrom'] : null,
        isset($filters['dateTo']) ? $filters['dateTo'] : null
    );
}

function editAttendance($attendance, $filters)
{
    global $databaseHost, $databaseUser, $databasePassword, $databaseName;
    $connectionBBDD = mysqli_connect($databaseHost, $databaseUser, $databasePassword, $databaseName);

    if (!$connectionBBDD) {
        die("Conexión fallida: " . mysqli_connect_error());
    }

    $attendanceId = mysqli_real_escape_string($connectionBBDD, $attendance['attendanceId']);
    $value = $attendance['value'] ? 1 : 0;

    $query = "UPDATE attendance SET value='$value' WHERE attendanceId='$attendanceId'";
    $result = mysqli_query($connectionBBDD, $query);

    if (!$result) {
        http_response_code(500);
        die(json_encode(["error" => "Error al actualizar asistencia"]));
    }

    return getAttendance(
        isset($filters['course']) ? $filters['course'] : null,
        isset($filters['student']) ? $filters['student'] : null,
        isset($filters['subject']) ? $filters['subject'] : null,
        isset($filters['dateFrom']) ? $filters['dateFrom'] : null,
        isset($filters['dateTo']) ? $filters['dateTo'] : null
    );
}
