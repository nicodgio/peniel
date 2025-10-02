<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/database.php';

$API_KEY = 'AIzaSyCkJJFxIAnw1ukBakSOwrhP0GavwY_yt18';
$CHANNEL_ID = 'UCbfff5PKN2dbtJCgK8w9_yA';

function getLatestVideos($apiKey, $channelId, $maxResults = 10) {
    try {
        // Solicitar más videos de los necesarios para compensar los filtrados
        $url = "https://www.googleapis.com/youtube/v3/search?" . http_build_query([
            'part' => 'snippet',
            'channelId' => $channelId,
            'maxResults' => 50,
            'order' => 'date',
            'type' => 'video',
            'key' => $apiKey
        ]);

        $response = @file_get_contents($url);
        
        if ($response === false) {
            return ['error' => 'Error al conectar con YouTube API'];
        }

        $data = json_decode($response, true);
        
        if (isset($data['error'])) {
            return ['error' => $data['error']['message']];
        }

        if (!isset($data['items']) || empty($data['items'])) {
            return ['error' => 'No se encontraron videos'];
        }

        // Obtener IDs para consultar detalles
        $videoIds = [];
        foreach ($data['items'] as $item) {
            if (isset($item['id']['videoId'])) {
                $videoIds[] = $item['id']['videoId'];
            }
        }

        if (empty($videoIds)) {
            return ['error' => 'No se pudieron extraer IDs de videos'];
        }

        // Obtener detalles de los videos
        $detailsUrl = "https://www.googleapis.com/youtube/v3/videos?" . http_build_query([
            'part' => 'contentDetails,snippet',
            'id' => implode(',', $videoIds),
            'key' => $apiKey
        ]);

        $detailsResponse = @file_get_contents($detailsUrl);
        
        if ($detailsResponse === false) {
            // Si falla obtener detalles, devolver los videos originales sin filtrar
            return array_slice($data['items'], 0, $maxResults);
        }

        $detailsData = json_decode($detailsResponse, true);

        if (!isset($detailsData['items'])) {
            // Si no hay detalles, devolver videos originales
            return array_slice($data['items'], 0, $maxResults);
        }

        // Crear un mapa de duraciones
        $videoDurations = [];
        foreach ($detailsData['items'] as $detail) {
            $videoDurations[$detail['id']] = $detail['contentDetails']['duration'] ?? 'PT0S';
        }

        // Filtrar videos
        $filteredItems = [];
        foreach ($data['items'] as $item) {
            if (!isset($item['id']['videoId'])) {
                continue;
            }
            
            $videoId = $item['id']['videoId'];
            
            if (!isset($videoDurations[$videoId])) {
                continue;
            }
            
            $duration = $videoDurations[$videoId];
            
            // Convertir duración a segundos
            preg_match('/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/', $duration, $matches);
            $hours = isset($matches[1]) ? intval($matches[1]) : 0;
            $minutes = isset($matches[2]) ? intval($matches[2]) : 0;
            $seconds = isset($matches[3]) ? intval($matches[3]) : 0;
            $totalSeconds = ($hours * 3600) + ($minutes * 60) + $seconds;
            
            // Filtrar videos
            $title = isset($item['snippet']['title']) ? strtoupper($item['snippet']['title']) : '';
            $isNotLive = !preg_match('/\b(EN VIVO|LIVE|DIRECTO|TRANSMISIÓN|TRANSMISION)\b/i', $title);
            
            // Incluir videos que tengan duración válida, menor a 2 horas y no sean en vivo
            if ($totalSeconds > 0 && $totalSeconds < 7200 && $isNotLive) {
                $filteredItems[] = $item;
            }
            
            // Detener cuando tengamos suficientes
            if (count($filteredItems) >= $maxResults) {
                break;
            }
        }

        // Si no se encontraron videos filtrados, devolver los primeros originales
        if (empty($filteredItems)) {
            return array_slice($data['items'], 0, $maxResults);
        }

        return $filteredItems;
        
    } catch (Exception $e) {
        error_log("Error en getLatestVideos: " . $e->getMessage());
        return ['error' => 'Error al obtener videos: ' . $e->getMessage()];
    }
}

function getVideoDetails($apiKey, $videoIds) {
    if (empty($videoIds)) {
        return [];
    }
    
    try {
        $url = "https://www.googleapis.com/youtube/v3/videos?" . http_build_query([
            'part' => 'statistics,contentDetails',
            'id' => implode(',', $videoIds),
            'key' => $apiKey
        ]);

        $response = @file_get_contents($url);
        
        if ($response === false) {
            return [];
        }

        $data = json_decode($response, true);
        
        if (isset($data['error']) || !isset($data['items'])) {
            return [];
        }

        $details = [];
        foreach ($data['items'] as $item) {
            $details[$item['id']] = [
                'viewCount' => isset($item['statistics']['viewCount']) ? $item['statistics']['viewCount'] : 0,
                'likeCount' => isset($item['statistics']['likeCount']) ? $item['statistics']['likeCount'] : 0,
                'duration' => isset($item['contentDetails']['duration']) ? $item['contentDetails']['duration'] : ''
            ];
        }
        
        return $details;
        
    } catch (Exception $e) {
        error_log("Error en getVideoDetails: " . $e->getMessage());
        return [];
    }
}

function formatDuration($duration) {
    if (empty($duration)) {
        return '0:00';
    }
    
    preg_match('/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/', $duration, $matches);
    
    $hours = isset($matches[1]) ? intval($matches[1]) : 0;
    $minutes = isset($matches[2]) ? intval($matches[2]) : 0;
    $seconds = isset($matches[3]) ? intval($matches[3]) : 0;
    
    if ($hours > 0) {
        return sprintf('%d:%02d:%02d', $hours, $minutes, $seconds);
    } else {
        return sprintf('%d:%02d', $minutes, $seconds);
    }
}

function formatViews($views) {
    $views = intval($views);
    if ($views >= 1000000) {
        return round($views / 1000000, 1) . 'M';
    } elseif ($views >= 1000) {
        return round($views / 1000, 1) . 'K';
    }
    return strval($views);
}

function formatDate($dateString) {
    try {
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
    } catch (Exception $e) {
        return 'hace poco';
    }
}

try {
    $db = Database::getInstance()->getConnection();
    
    echo "Iniciando actualización de videos...\n";
    
    // PRIMERO: Limpiar toda la tabla
    $db->exec("TRUNCATE TABLE youtube_videos");
    echo "Base de datos limpiada.\n";
    
    // Obtener videos filtrados
    $videos = getLatestVideos($API_KEY, $CHANNEL_ID, 6);
    
    if (isset($videos['error'])) {
        throw new Exception($videos['error']);
    }
    
    if (empty($videos)) {
        throw new Exception('No se encontraron videos para procesar');
    }
    
    // Extraer IDs de videos
    $videoIds = [];
    foreach ($videos as $item) {
        if (isset($item['id']['videoId'])) {
            $videoIds[] = $item['id']['videoId'];
        }
    }
    
    if (empty($videoIds)) {
        throw new Exception('No se pudieron extraer IDs de videos');
    }
    
    $videoDetails = getVideoDetails($API_KEY, $videoIds);
    
    $insertStmt = $db->prepare("
        INSERT INTO youtube_videos (
            video_id, title, description, thumbnail, published_at, 
            channel_title, url, embed_url, views, likes, duration, 
            time_ago, published_date
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
    ");
    
    $processedCount = 0;
    
    foreach ($videos as $item) {
        if (!isset($item['id']['videoId']) || !isset($item['snippet'])) {
            continue;
        }
        
        $videoId = $item['id']['videoId'];
        $snippet = $item['snippet'];
        
        $thumbnail = '';
        if (isset($snippet['thumbnails']['high']['url'])) {
            $thumbnail = $snippet['thumbnails']['high']['url'];
        } elseif (isset($snippet['thumbnails']['medium']['url'])) {
            $thumbnail = $snippet['thumbnails']['medium']['url'];
        } elseif (isset($snippet['thumbnails']['default']['url'])) {
            $thumbnail = $snippet['thumbnails']['default']['url'];
        }
        
        $publishedAt = date('Y-m-d H:i:s', strtotime($snippet['publishedAt']));
        $url = "https://www.youtube.com/watch?v={$videoId}";
        $embedUrl = "https://www.youtube.com/embed/{$videoId}";
        
        $views = '0';
        $likes = 0;
        $duration = '';
        
        if (isset($videoDetails[$videoId])) {
            $views = formatViews($videoDetails[$videoId]['viewCount']);
            $likes = intval($videoDetails[$videoId]['likeCount']);
            $duration = formatDuration($videoDetails[$videoId]['duration']);
        }
        
        $timeAgo = formatDate($snippet['publishedAt']);
        $publishedDate = date('d M Y', strtotime($snippet['publishedAt']));
        
        $insertStmt->execute([
            $videoId,
            html_entity_decode($snippet['title'], ENT_QUOTES, 'UTF-8'),
            isset($snippet['description']) ? html_entity_decode($snippet['description'], ENT_QUOTES, 'UTF-8') : '',
            $thumbnail,
            $publishedAt,
            isset($snippet['channelTitle']) ? html_entity_decode($snippet['channelTitle'], ENT_QUOTES, 'UTF-8') : '',
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
    
    $totalVideos = $db->query("SELECT COUNT(*) as total FROM youtube_videos")->fetch();
    echo "Videos en base de datos: {$totalVideos['total']}\n";
    
    echo "Actualización completada. Videos procesados: {$processedCount}\n";
    echo "Fecha: " . date('Y-m-d H:i:s') . "\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    error_log("Error updating YouTube videos: " . $e->getMessage());
    http_response_code(500);
}
?>