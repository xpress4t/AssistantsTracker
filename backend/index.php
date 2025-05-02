<?php
require_once("services/index.php");

$result = getUserByEmail("emmanuel@gmail.com");

echo json_encode($result);
exit;
