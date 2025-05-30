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

    $attendanceQuery = "SELECT attendanceId, userId, subjectId, date, value FROM attendance";
    // Debemos añadir WHERE si alguno de los parámetros es distinto de null
    if (checkValue($course) || checkValue($student) || checkValue($subject) || checkValue($dateFrom) || checkValue($dateTo)) {
        $attendanceQuery .= " WHERE ";
        $conditions = array();

        if (checkValue($course)) {
            $conditions[] = "courseId = '" . mysqli_real_escape_string($connectionBBDD, $course) . "'";
        }
        if (checkValue($student)) {
            $conditions[] = "userId = '" . mysqli_real_escape_string($connectionBBDD, $student) . "'";
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

function putAttendance() {}

function postAttendance() {}
