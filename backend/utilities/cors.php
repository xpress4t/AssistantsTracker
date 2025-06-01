<?php

// Comprobar sesion existente / Crear session
$origin = 'http://localhost:3000';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // CORS preflight
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    http_response_code(200);
    exit();
}

// Para el resto de métodos (GET, POST, etc.)
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
