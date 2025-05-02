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
