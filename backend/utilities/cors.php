<?php
// Permite cualquier origen
header("Access-Control-Allow-Origin: *");
// Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Headers permitidos
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Comprobar sesion existente / Crear session