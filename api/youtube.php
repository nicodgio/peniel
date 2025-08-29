<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración de YouTube API
$API_KEY = 'AIzaSyCkJJFxIAnw1ukBakSOwrhP0GavwY_yt18';
$CHANNEL_ID = 'UCbfff5PKN2dbtJCgK8w9_yA';

// Función para obtener los últimos videos del canal
function getLatestVideos($apiKey, $channelId, $maxResults = 6) {
    $url = "https://www.googleapis.com/youtube/v3/search?" . http_build_query([
        'part' => 'snippet',
        'channelId' => $channelId,
        'maxResults' => $maxResults,
        'order' => 'date',
        'type' => 'video',
        'key' => $apiKey
    ]);

    $response = file_get_contents($url);
    
    if ($response === false) {
        return ['error' => 'Error al conectar con YouTube API'];
    }

    $data = json_decode($response, true);
    
    if (isset($data['error'])) {
        return ['error' => $data['error']['message']];
    }

    $videos = [];
    
    foreach ($data['items'] as $item) {
        $videoId = $item['id']['videoId'];
        $snippet = $item['snippet'];
        
        // Obtener thumbnail de alta calidad
        $thumbnail = $snippet['thumbnails']['high']['url'] ?? 
                    $snippet['thumbnails']['medium']['url'] ?? 
                    $snippet['thumbnails']['default']['url'];
        
        $videos[] = [
            'id' => $videoId,
            'title' => $snippet['title'],
            'description' => $snippet['description'],
            'thumbnail' => $thumbnail,
            'publishedAt' => $snippet['publishedAt'],
            'channelTitle' => $snippet['channelTitle'],
            'url' => "https://www.youtube.com/watch?v={$videoId}",
            'embedUrl' => "https://www.youtube.com/embed/{$videoId}"
        ];
    }
    
    return $videos;
}

// Función para obtener detalles adicionales de los videos
function getVideoDetails($apiKey, $videoIds) {
    $url = "https://www.googleapis.com/youtube/v3/videos?" . http_build_query([
        'part' => 'statistics,contentDetails',
        'id' => implode(',', $videoIds),
        'key' => $apiKey
    ]);

    $response = file_get_contents($url);
    
    if ($response === false) {
        return [];
    }

    $data = json_decode($response, true);
    
    if (isset($data['error'])) {
        return [];
    }

    $details = [];
    foreach ($data['items'] as $item) {
        $details[$item['id']] = [
            'viewCount' => $item['statistics']['viewCount'] ?? 0,
            'likeCount' => $item['statistics']['likeCount'] ?? 0,
            'duration' => $item['contentDetails']['duration'] ?? ''
        ];
    }
    
    return $details;
}

// Función para formatear la duración
function formatDuration($duration) {
    preg_match('/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/', $duration, $matches);
    
    $hours = $matches[1] ?? 0;
    $minutes = $matches[2] ?? 0;
    $seconds = $matches[3] ?? 0;
    
    if ($hours > 0) {
        return sprintf('%d:%02d:%02d', $hours, $minutes, $seconds);
    } else {
        return sprintf('%d:%02d', $minutes, $seconds);
    }
}

// Función para formatear las vistas
function formatViews($views) {
    if ($views >= 1000000) {
        return round($views / 1000000, 1) . 'M';
    } elseif ($views >= 1000) {
        return round($views / 1000, 1) . 'K';
    }
    return $views;
}

// Función para formatear fecha
function formatDate($dateString) {
    $date = new DateTime($dateString);
    $now = new DateTime();
    $interval = $now->diff($date);
    
    if ($interval->days >= 365) {
        $years = floor($interval->days / 365);
        return $years . ' año' . ($years > 1 ? 's' : '');
    } elseif ($interval->days >= 30) {
        $months = floor($interval->days / 30);
        return $months . ' mes' . ($months > 1 ? 'es' : '');
    } elseif ($interval->days >= 7) {
        $weeks = floor($interval->days / 7);
        return $weeks . ' semana' . ($weeks > 1 ? 's' : '');
    } elseif ($interval->days > 0) {
        return $interval->days . ' día' . ($interval->days > 1 ? 's' : '');
    } elseif ($interval->h > 0) {
        return $interval->h . ' hora' . ($interval->h > 1 ? 's' : '');
    } else {
        return $interval->i . ' minuto' . ($interval->i > 1 ? 's' : '');
    }
}

// Procesar la solicitud
try {
    $videos = getLatestVideos($API_KEY, $CHANNEL_ID, 6);
    
    if (isset($videos['error'])) {
        http_response_code(500);
        echo json_encode(['error' => $videos['error']]);
        exit;
    }
    
    // Obtener IDs de videos para detalles adicionales
    $videoIds = array_column($videos, 'id');
    $videoDetails = getVideoDetails($API_KEY, $videoIds);
    
    // Combinar información
    foreach ($videos as &$video) {
        $videoId = $video['id'];
        
        if (isset($videoDetails[$videoId])) {
            $video['views'] = formatViews($videoDetails[$videoId]['viewCount']);
            $video['likes'] = $videoDetails[$videoId]['likeCount'];
            $video['duration'] = formatDuration($videoDetails[$videoId]['duration']);
        }
        
        $video['timeAgo'] = formatDate($video['publishedAt']);
        $video['publishedDate'] = date('d M Y', strtotime($video['publishedAt']));
    }
    
    echo json_encode([
        'success' => true,
        'videos' => $videos,
        'total' => count($videos),
        'lastUpdated' => date('c')
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error interno del servidor: ' . $e->getMessage()]);
}
