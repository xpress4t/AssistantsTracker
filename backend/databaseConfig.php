<?php
$databaseHost = $_ENV["DDBB_HOST"];
$databaseUser = $_ENV["DDBB_USER"];
$databasePassword = $_ENV["DDBB_PWD"];
$databaseName = $_ENV["DDBB_NAME"];

function convertToMySQLTimestamp($inputDateString)
{
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
