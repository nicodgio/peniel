<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    require_once '../config/database.php';
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error cargando configuración',
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

try {
    $db = Database::getInstance()->getConnection();
    
    $stmt = $db->prepare("
        SELECT
            id,
            nombre,
            categoria,
            frecuencia,
            horario,
            lema,
            descripcion,
            lider,
            telefono,
            actividades,
            requisitos,
            impacto,
            icono,
            color,
            imagen,
            video,
            proyectos_misioneros,
            orden,
            activo
        FROM ministerios
        WHERE activo = 1
        ORDER BY orden ASC, nombre ASC
    ");
    
    $stmt->execute();
    $ministerios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'ministerios' => $ministerios,
        'total' => count($ministerios)
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error de base de datos',
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error interno del servidor',
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}