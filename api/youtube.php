<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

try {
    $db = Database::getInstance()->getConnection();
    
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 6;
    $limit = min($limit, 20);
    
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
        ORDER BY published_at DESC 
        LIMIT ?
    ");
    
    $stmt->execute([$limit]);
    $videos = $stmt->fetchAll();
    
    if (empty($videos)) {
        $fallbackVideos = [
            [
                'id' => 'G4xpiUtz944',
                'title' => "Cuídate bien: El descanso de Dios",
                'thumbnail' => "https://img.youtube.com/vi/G4xpiUtz944/maxresdefault.jpg",
                'channelTitle' => "Pastor Julio Ortega",
                'timeAgo' => "hace 1 semana",
                'url' => "https://www.youtube.com/watch?v=G4xpiUtz944&t=1s",
                'embedUrl' => "https://www.youtube.com/embed/G4xpiUtz944",
                'views' => '1.2K',
                'duration' => '45:30',
                'publishedDate' => date('d M Y', strtotime('-1 week'))
            ],
            [
                'id' => 'fallback2',
                'title' => "Caminando en la Voluntad de Dios",
                'thumbnail' => "/imgs/predica2.jpg",
                'channelTitle' => "Pastora Ethel Bayona",
                'timeAgo' => "hace 2 semanas",
                'url' => "https://www.youtube.com/watch?v=fallback2",
                'embedUrl' => "https://www.youtube.com/embed/fallback2",
                'views' => '890',
                'duration' => '38:15',
                'publishedDate' => date('d M Y', strtotime('-2 weeks'))
            ],
            [
                'id' => 'fallback3',
                'title' => "La Gracia que Transforma",
                'thumbnail' => "/imgs/predica3.jpg",
                'channelTitle' => "Pastor Juan Carlos Escobar",
                'timeAgo' => "hace 3 semanas",
                'url' => "https://www.youtube.com/watch?v=fallback3",
                'embedUrl' => "https://www.youtube.com/embed/fallback3",
                'views' => '1.5K',
                'duration' => '42:20',
                'publishedDate' => date('d M Y', strtotime('-3 weeks'))
            ]
        ];
        
        $videos = array_slice($fallbackVideos, 0, $limit);
    }
    
    $lastUpdated = $db->query("SELECT MAX(updated_at) as last_update FROM youtube_videos")->fetch();
    
    echo json_encode([
        'success' => true,
        'videos' => $videos,
        'total' => count($videos),
        'lastUpdated' => $lastUpdated['last_update'] ?? date('c'),
        'source' => empty($videos) ? 'fallback' : 'database'
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error interno del servidor',
        'message' => $e->getMessage()
    ]);
}
?>