<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

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
            titulo,
            descripcion,
            url_video,
            url_embed,
            activo,
            fecha_inicio,
            fecha_fin
        FROM live_stream
        WHERE activo = 1
        ORDER BY created_at DESC
        LIMIT 1
    ");
    
    $stmt->execute();
    $live = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($live) {
        echo json_encode([
            'success' => true,
            'live' => [
                'id' => (int)$live['id'],
                'titulo' => $live['titulo'],
                'descripcion' => $live['descripcion'],
                'url_video' => $live['url_video'],
                'url_embed' => $live['url_embed'],
                'activo' => (int)$live['activo'],
                'fecha_inicio' => $live['fecha_inicio'],
                'fecha_fin' => $live['fecha_fin']
            ]
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    } else {
        echo json_encode([
            'success' => false,
            'live' => null
        ], JSON_UNESCAPED_UNICODE);
    }
    
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