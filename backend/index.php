<?php
require_once("connection.php");

$result = getUserByEmail("emmanuel@gmail.com");

echo json_encode($result);
exit;
