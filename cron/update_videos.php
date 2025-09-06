<?php
require_once '../config/database.php';

$API_KEY = 'AIzaSyCkJJFxIAnw1ukBakSOwrhP0GavwY_yt18';
$CHANNEL_ID = 'UCbfff5PKN2dbtJCgK8w9_yA';

function getLatestVideos($apiKey, $channelId, $maxResults = 10) {
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

    return $data['items'];
}

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

function formatViews($views) {
    if ($views >= 1000000) {
        return round($views / 1000000, 1) . 'M';
    } elseif ($views >= 1000) {
        return round($views / 1000, 1) . 'K';
    }
    return $views;
}

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

try {
    $db = Database::getInstance()->getConnection();
    
    echo "Iniciando actualización de videos...\n";
    
    $videos = getLatestVideos($API_KEY, $CHANNEL_ID, 10);
    
    if (isset($videos['error'])) {
        throw new Exception($videos['error']);
    }
    
    $videoIds = array_column($videos, 'id');
    $videoIds = array_map(function($item) { return $item['videoId']; }, $videoIds);
    $videoDetails = getVideoDetails($API_KEY, $videoIds);
    
    $insertStmt = $db->prepare("
        INSERT INTO youtube_videos (
            video_id, title, description, thumbnail, published_at, 
            channel_title, url, embed_url, views, likes, duration, 
            time_ago, published_date
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        ) ON DUPLICATE KEY UPDATE
            title = VALUES(title),
            description = VALUES(description),
            thumbnail = VALUES(thumbnail),
            views = VALUES(views),
            likes = VALUES(likes),
            time_ago = VALUES(time_ago),
            updated_at = CURRENT_TIMESTAMP
    ");
    
    $processedCount = 0;
    
    foreach ($videos as $item) {
        $videoId = $item['id']['videoId'];
        $snippet = $item['snippet'];
        
        $thumbnail = $snippet['thumbnails']['high']['url'] ?? 
                    $snippet['thumbnails']['medium']['url'] ?? 
                    $snippet['thumbnails']['default']['url'];
        
        $publishedAt = date('Y-m-d H:i:s', strtotime($snippet['publishedAt']));
        $url = "https://www.youtube.com/watch?v={$videoId}";
        $embedUrl = "https://www.youtube.com/embed/{$videoId}";
        
        $views = '0';
        $likes = 0;
        $duration = '';
        
        if (isset($videoDetails[$videoId])) {
            $views = formatViews($videoDetails[$videoId]['viewCount']);
            $likes = $videoDetails[$videoId]['likeCount'];
            $duration = formatDuration($videoDetails[$videoId]['duration']);
        }
        
        $timeAgo = formatDate($snippet['publishedAt']);
        $publishedDate = date('d M Y', strtotime($snippet['publishedAt']));
        
        $insertStmt->execute([
            $videoId,
            $snippet['title'],
            $snippet['description'],
            $thumbnail,
            $publishedAt,
            $snippet['channelTitle'],
            $url,
            $embedUrl,
            $views,
            $likes,
            $duration,
            $timeAgo,
            $publishedDate
        ]);
        
        $processedCount++;
    }
    
    // Mantener solo los últimos 6 videos
    $cleanupStmt = $db->prepare("
        DELETE FROM youtube_videos 
        WHERE id NOT IN (
            SELECT id FROM (
                SELECT id FROM youtube_videos 
                ORDER BY published_at DESC 
                LIMIT 6
            ) as latest_videos
        )
    ");
    $cleanupStmt->execute();
    
    $totalVideos = $db->query("SELECT COUNT(*) as total FROM youtube_videos")->fetch();
    echo "Videos en base de datos: {$totalVideos['total']}\n";
    
    echo "Actualización completada. Videos procesados: {$processedCount}\n";
    echo "Fecha: " . date('Y-m-d H:i:s') . "\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    error_log("Error updating YouTube videos: " . $e->getMessage());
}
?>