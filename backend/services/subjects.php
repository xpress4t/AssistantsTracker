<?php
// Este archivo es /backend/services/subjects.php, que contiene las funciones para obtener las asignaturas de la base de datos
function getSubjects($subjectId = null)
{
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

    $subjects = array();
    while ($row = mysqli_fetch_assoc($resultado)) {
        $subjects[] = $row;
    }
    return $subjects;
}
