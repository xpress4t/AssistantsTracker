<?php
    $databaseHost = "localhost";
    $databaseUser = "root";
    $databasePassword = "";
    $databaseName = "proyecto_final";

    function convertToMySQLTimestamp($inputDateString) {
    // Crea un objeto DateTime desde el string de entrada
    $date = DateTime::createFromFormat('D M d Y H:i:s T', $inputDateString);

    // Verifica si la conversión fue exitosa
    if (!$date) {
        // Intenta con un formato alternativo si el anterior falla
        $date = new DateTime($inputDateString);
    }

    // Devuelve la fecha en formato MySQL
    return $date->format('Y-m-d H:i:s');
}
?>