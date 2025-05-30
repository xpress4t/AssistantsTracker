<?php
require("../utilities/cors.php");
require_once("../services/index.php");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $course = isset($_GET['course']) ? $_GET['course'] : null;
        $student = isset($_GET['student']) ? $_GET['student'] : null;
        $subject = isset($_GET['subject']) ? $_GET['subject'] : null;
        $dateFrom = isset($_GET['dateFrom']) ? $_GET['dateFrom'] : null;
        $dateTo = isset($_GET['dateTo']) ? $_GET['dateTo'] : null;
        $attendances = getAttendance($course, $student, $subject, $dateFrom, $dateTo);


        echo json_encode($attendances);
        exit;

    case 'POST':
        

    case 'PUT':


    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        exit;
}
