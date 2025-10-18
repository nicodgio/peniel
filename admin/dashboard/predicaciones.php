<?php
session_start();
require_once '../conn/conn.php';

if (!isset($_SESSION['admin_user'])) {
    header('Location: ../login.php');
    exit;
}

$message = '';
$messageType = '';

if (isset($_SESSION['message'])) {
    $message = $_SESSION['message'];
    $messageType = $_SESSION['messageType'];
    unset($_SESSION['message']);
    unset($_SESSION['messageType']);
}

try {
    $stmt = $pdo->query("SELECT * FROM youtube_videos ORDER BY published_at DESC LIMIT 6");
    $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $statsStmt = $pdo->query("SELECT COUNT(*) as total, MAX(updated_at) as last_update FROM youtube_videos");
    $stats = $statsStmt->fetch(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    $error = "Error al cargar videos: " . $e->getMessage();
    $videos = [];
    $stats = ['total' => 0, 'last_update' => null];
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Predicaciones - Admin</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="includes/admin_styles.css">
    <style>
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 1.5rem;
            text-align: center;
        }

        .stat-value {
            font-size: 2rem;
            font-weight: 900;
            color: #609be8;
            margin-bottom: 0.5rem;
        }

        .stat-label {
            font-size: 0.85rem;
            opacity: 0.8;
        }

        .videos-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 2rem;
        }

        .video-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            overflow: hidden;
            transition: all 0.3s;
        }

        .video-card:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.08);
        }

        .video-thumbnail {
            width: 100%;
            aspect-ratio: 16/9;
            object-fit: cover;
            background: #000;
        }

        .video-content {
            padding: 1.5rem;
        }

        .video-title {
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 0.8rem;
            color: white;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .video-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 0.8rem;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.7);
        }

        .video-meta span {
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }

        .video-description {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-bottom: 1rem;
        }

        .video-actions {
            display: flex;
            gap: 0.5rem;
        }

        .btn-video {
            flex: 1;
            padding: 0.6rem;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 0.85rem;
            text-decoration: none;
        }

        .btn-view {
            background: rgba(96, 155, 232, 0.2);
            color: #609be8;
        }

        .btn-view:hover {
            background: rgba(96, 155, 232, 0.3);
        }

        .btn-sync {
            background: linear-gradient(135deg, #4ade80, #22c55e);
            color: white;
        }

        .btn-sync:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(74, 222, 128, 0.3);
        }

        .btn-sync:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .message {
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 2rem;
            text-align: center;
        }

        .message.success {
            background: rgba(74, 222, 128, 0.2);
            color: #4ade80;
            border: 1px solid rgba(74, 222, 128, 0.3);
        }

        .message.error {
            background: rgba(248, 113, 113, 0.2);
            color: #f87171;
            border: 1px solid rgba(248, 113, 113, 0.3);
        }

        .loading-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9999;
            align-items: center;
            justify-content: center;
        }

        .loading-overlay.active {
            display: flex;
        }

        .loading-content {
            text-align: center;
        }

        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top-color: #609be8;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
            .videos-grid {
                grid-template-columns: 1fr;
            }

            .stats-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <?php include 'includes/sidebar.php'; ?>

        <main class="main-content">
            <div class="header">
                <h1 class="page-title">Predicaciones de YouTube</h1>
                <button onclick="sincronizarVideos()" id="btnSync" class="btn btn-sync">
                    <i class="fas fa-sync-alt"></i>
                    Actualizar Videos
                </button>
            </div>

            <?php if ($message): ?>
                <div class="message <?php echo $messageType; ?>" id="messageAlert">
                    <?php echo $message; ?>
                </div>
            <?php endif; ?>

            <?php if (isset($error)): ?>
                <div class="message error">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value"><?php echo $stats['total']; ?></div>
                    <div class="stat-label">Total Videos</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">6</div>
                    <div class="stat-label">Mostrando en Web</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">
                        <?php 
                        if ($stats['last_update']) {
                            $date = new DateTime($stats['last_update']);
                            echo $date->format('d/m/Y');
                        } else {
                            echo 'N/A';
                        }
                        ?>
                    </div>
                    <div class="stat-label">Última Actualización</div>
                </div>
            </div>

            <div class="videos-grid">
                <?php if (!empty($videos)): ?>
                    <?php foreach ($videos as $video): ?>
                        <div class="video-card">
                            <img src="<?php echo htmlspecialchars($video['thumbnail']); ?>" 
                                 alt="<?php echo htmlspecialchars($video['title']); ?>" 
                                 class="video-thumbnail">
                            <div class="video-content">
                                <h3 class="video-title"><?php echo htmlspecialchars($video['title']); ?></h3>
                                
                                <div class="video-meta">
                                    <?php if ($video['views']): ?>
                                        <span>
                                            <i class="fas fa-eye"></i>
                                            <?php echo number_format($video['views']); ?>
                                        </span>
                                    <?php endif; ?>
                                    <?php if ($video['time_ago']): ?>
                                        <span>
                                            <i class="far fa-clock"></i>
                                            <?php echo htmlspecialchars($video['time_ago']); ?>
                                        </span>
                                    <?php endif; ?>
                                </div>

                                <?php if ($video['description']): ?>
                                    <p class="video-description">
                                        <?php echo htmlspecialchars($video['description']); ?>
                                    </p>
                                <?php endif; ?>

                                <div class="video-actions">
                                    <a href="<?php echo htmlspecialchars($video['url']); ?>" 
                                       target="_blank" 
                                       class="btn-video btn-view">
                                        <i class="fab fa-youtube"></i>
                                        Ver en YouTube
                                    </a>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php else: ?>
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                        <p style="color: rgba(255,255,255,0.7);">No hay videos disponibles. Haz clic en "Actualizar Videos" para sincronizar.</p>
                    </div>
                <?php endif; ?>
            </div>
        </main>
    </div>

    <div class="loading-overlay" id="loadingOverlay">
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p style="color: white; font-size: 1.1rem; font-weight: 600;">Sincronizando videos...</p>
            <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">Por favor espera</p>
        </div>
    </div>

    <script>
        const messageAlert = document.getElementById('messageAlert');
        if (messageAlert) {
            setTimeout(() => {
                messageAlert.style.transition = 'opacity 0.5s ease';
                messageAlert.style.opacity = '0';
                setTimeout(() => {
                    messageAlert.remove();
                }, 500);
            }, 3000);
        }

        async function sincronizarVideos() {
            const btnSync = document.getElementById('btnSync');
            const loadingOverlay = document.getElementById('loadingOverlay');
            
            btnSync.disabled = true;
            loadingOverlay.classList.add('active');
            
            try {
                const response = await fetch('https://penielmadrid.es/api/youtube.php');
                const data = await response.json();
                
                if (data.success) {
                    sessionStorage.setItem('sync_message', 'Videos sincronizados exitosamente. Se encontraron ' + data.total + ' videos.');
                    sessionStorage.setItem('sync_type', 'success');
                } else {
                    sessionStorage.setItem('sync_message', 'Error al sincronizar: ' + (data.message || 'Error desconocido'));
                    sessionStorage.setItem('sync_type', 'error');
                }
            } catch (error) {
                sessionStorage.setItem('sync_message', 'Error de conexión: ' + error.message);
                sessionStorage.setItem('sync_type', 'error');
            } finally {
                window.location.reload();
            }
        }

        window.addEventListener('load', function() {
            const message = sessionStorage.getItem('sync_message');
            const messageType = sessionStorage.getItem('sync_type');
            
            if (message) {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message ' + messageType;
                messageDiv.id = 'messageAlert';
                messageDiv.textContent = message;
                
                const header = document.querySelector('.header');
                header.parentNode.insertBefore(messageDiv, header.nextSibling);
                
                setTimeout(() => {
                    messageDiv.style.transition = 'opacity 0.5s ease';
                    messageDiv.style.opacity = '0';
                    setTimeout(() => {
                        messageDiv.remove();
                    }, 500);
                }, 3000);
                
                sessionStorage.removeItem('sync_message');
                sessionStorage.removeItem('sync_type');
            }
        });
    </script>
</body>
</html>