<?php
    require_once("connection.php");

    $result = getUserByEmail("pepitoLosPalotes@gmail.com");

    echo json_encode($result);
    exit;
?>