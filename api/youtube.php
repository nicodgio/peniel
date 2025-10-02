<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);

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
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

try {
    $db = Database::getInstance()->getConnection();
    
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 6;
    $limit = max(1, min($limit, 20));
    
    $stmt = $db->prepare("
        SELECT
            video_id as id,
            title,
            description,
            thumbnail,
            published_at,
            channel_title as channelTitle,
            url,
            embed_url as embedUrl,
            views,
            likes,
            duration,
            time_ago as timeAgo,
            published_date as publishedDate,
            updated_at
        FROM youtube_videos
        WHERE thumbnail IS NOT NULL
        ORDER BY published_at DESC
        LIMIT ?
    ");
    
    $stmt->execute([$limit]);
    $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($videos)) {
        throw new Exception('No hay videos disponibles en la base de datos');
    }
    
    $lastUpdatedQuery = $db->query("SELECT MAX(updated_at) as last_update FROM youtube_videos");
    $lastUpdated = $lastUpdatedQuery ? $lastUpdatedQuery->fetch(PDO::FETCH_ASSOC) : null;
    
    echo json_encode([
        'success' => true,
        'videos' => $videos,
        'total' => count($videos),
        'lastUpdated' => $lastUpdated['last_update'] ?? date('c')
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error de base de datos',
        'message' => $e->getMessage(),
        'code' => $e->getCode(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error interno del servidor',
        'message' => $e->getMessage(),
        'trace' => $e->getTraceAsString(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ], JSON_UNESCAPED_UNICODE);
}
?>