<?php
session_start();
require_once '../conn/conn.php';

if (!isset($_SESSION['admin_user'])) {
    header('Location: ../login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Admin</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="includes/admin_styles.css">
    <style>
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(135deg, #609be8 0%, #4a8bc2 100%);
        }

        .stat-card:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.08);
        }

        .stat-icon {
            width: 60px;
            height: 60px;
            background: rgba(96, 155, 232, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: #609be8;
            margin-bottom: 1.5rem;
        }

        .stat-value {
            font-size: 2.2rem;
            font-weight: 900;
            margin-bottom: 0.5rem;
        }

        .stat-label {
            font-size: 0.9rem;
            opacity: 0.8;
            margin-bottom: 1rem;
        }

        .stat-trend {
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }

        .trend-up {
            color: #4ade80;
        }

        .trend-down {
            color: #f87171;
        }

        .modules-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .module-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            transition: all 0.3s;
            cursor: pointer;
            text-decoration: none;
            color: white;
        }

        .module-card:hover {
            transform: translateY(-10px);
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .module-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #609be8 0%, #4a8bc2 100%);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin-bottom: 1.5rem;
        }

        .module-title {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 0.8rem;
        }

        .module-description {
            font-size: 0.9rem;
            opacity: 0.8;
            line-height: 1.5;
            margin-bottom: 1.5rem;
        }

        .module-status {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.8rem;
        }

        .status-badge {
            background: rgba(255, 255, 255, 0.1);
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
        }

        .status-active {
            background: rgba(74, 222, 128, 0.2);
            color: #4ade80;
        }

        .status-pending {
            background: rgba(251, 191, 36, 0.2);
            color: #fbbf24;
        }

        .header-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        @media (max-width: 768px) {
            .stats-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }

            .modules-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }

            .header {
                flex-direction: column;
                gap: 1rem;
                align-items: flex-start;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <?php include 'includes/sidebar.php'; ?>

        <main class="main-content">
            <div class="header">
                <h1 class="page-title">Dashboard</h1>
                <div class="header-actions">
                    <a href="../" class="btn btn-primary" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                        Ver Sitio Web
                    </a>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-value">247</div>
                    <div class="stat-label">Miembros Registrados</div>
                    <div class="stat-trend trend-up">
                        <i class="fas fa-arrow-up"></i>
                        +12% este mes
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="stat-value">8</div>
                    <div class="stat-label">Eventos Próximos</div>
                    <div class="stat-trend trend-up">
                        <i class="fas fa-arrow-up"></i>
                        3 esta semana
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-eye"></i>
                    </div>
                    <div class="stat-value">1,524</div>
                    <div class="stat-label">Visualizaciones Live</div>
                    <div class="stat-trend trend-down">
                        <i class="fas fa-arrow-down"></i>
                        -5% última semana
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="stat-value">45</div>
                    <div class="stat-label">Predicaciones</div>
                    <div class="stat-trend trend-up">
                        <i class="fas fa-arrow-up"></i>
                        2 nuevas
                    </div>
                </div>
            </div>

            <div class="modules-grid">
                <a href="#" class="module-card">
                    <div class="module-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3 class="module-title">Gestión de Usuarios</h3>
                    <p class="module-description">Administrar miembros, permisos y roles del sistema</p>
                    <div class="module-status">
                        <span>Próximamente</span>
                        <span class="status-badge status-pending">Pendiente</span>
                    </div>
                </a>

                <a href="#" class="module-card">
                    <div class="module-icon">
                        <i class="fas fa-calendar"></i>
                    </div>
                    <h3 class="module-title">Eventos</h3>
                    <p class="module-description">Crear y gestionar eventos, actividades y programaciones</p>
                    <div class="module-status">
                        <span>Próximamente</span>
                        <span class="status-badge status-pending">Pendiente</span>
                    </div>
                </a>

                <a href="#" class="module-card">
                    <div class="module-icon">
                        <i class="fas fa-video"></i>
                    </div>
                    <h3 class="module-title">Transmisiones</h3>
                    <p class="module-description">Configurar streams en vivo y enlaces de transmisión</p>
                    <div class="module-status">
                        <span>Próximamente</span>
                        <span class="status-badge status-pending">Pendiente</span>
                    </div>
                </a>

                <a href="#" class="module-card">
                    <div class="module-icon">
                        <i class="fas fa-hands-praying"></i>
                    </div>
                    <h3 class="module-title">Ministerios</h3>
                    <p class="module-description">Administrar ministerios, líderes y actividades</p>
                    <div class="module-status">
                        <span>Próximamente</span>
                        <span class="status-badge status-pending">Pendiente</span>
                    </div>
                </a>

                <a href="#" class="module-card">
                    <div class="module-icon">
                        <i class="fas fa-bible"></i>
                    </div>
                    <h3 class="module-title">Predicaciones</h3>
                    <p class="module-description">Subir y gestionar videos de predicaciones y estudios</p>
                    <div class="module-status">
                        <span>Próximamente</span>
                        <span class="status-badge status-pending">Pendiente</span>
                    </div>
                </a>

                <a href="menudominical.php" class="module-card">
                    <div class="module-icon">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <h3 class="module-title">Menú Dominical</h3>
                    <p class="module-description">Actualizar menú semanal y información de comidas</p>
                    <div class="module-status">
                        <span>Disponible</span>
                        <span class="status-badge status-active">Activo</span>
                    </div>
                </a>
            </div>
        </main>
    </div>
</body>
</html>