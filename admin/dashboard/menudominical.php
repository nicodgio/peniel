<?php
session_start();
require_once '../conn/conn.php';

if (!isset($_SESSION['admin_user'])) {
    header('Location: ../login.php');
    exit;
}

try {
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM menudominical");
    $totalMenus = $stmt->fetch()['total'];
    
    $stmt = $pdo->query("SELECT id, nombre, telefono, cantidad, forma_pago, fecha FROM menudominical ORDER BY fecha DESC");
    $menus = $stmt->fetchAll();
    
    // Calcular totales
    $totalPlatos = 0;
    $totalEfectivo = 0;
    $totalBizum = 0;
    
    foreach ($menus as $menu) {
        $totalPlatos += $menu['cantidad'];
        if ($menu['forma_pago'] === 'efectivo') {
            $totalEfectivo += $menu['cantidad'];
        } else {
            $totalBizum += $menu['cantidad'];
        }
    }
} catch (PDOException $e) {
    $error = "Error al cargar los datos: " . $e->getMessage();
    $totalMenus = 0;
    $menus = [];
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menú Dominical - Admin</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="includes/admin_styles.css">
    <style>
        .export-btn {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        .export-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            border-radius: 12px;
            color: white;
            text-align: center;
        }
        .stat-card.efectivo {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .stat-card.bizum {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        .stat-number {
            font-size: 2.5rem;
            font-weight: 900;
            margin: 10px 0;
        }
        .stat-label {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        .header-actions {
            display: flex;
            gap: 15px;
            align-items: center;
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <?php include 'includes/sidebar.php'; ?>

        <main class="main-content">
            <div class="header">
                <h1 class="page-title">
                    <i class="fas fa-utensils"></i>
                    Menú Dominical
                </h1>
                <div class="header-actions">
                    <a href="export-menu-pdf.php" class="export-btn" target="_blank">
                        <i class="fas fa-file-pdf"></i>
                        Exportar PDF
                    </a>
                    <a href="dashboard.php" class="btn back-btn">
                        <i class="fas fa-arrow-left"></i>
                        Volver al Dashboard
                    </a>
                </div>
            </div>

            <?php if (isset($error)): ?>
                <div class="error-message">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">TOTAL PLATOS</div>
                    <div class="stat-number"><?php echo number_format($totalPlatos); ?></div>
                    <div class="stat-label"><?php echo $totalMenus; ?> personas registradas</div>
                </div>
                
                <div class="stat-card efectivo">
                    <div class="stat-label">EFECTIVO</div>
                    <div class="stat-number"><?php echo number_format($totalEfectivo); ?></div>
                    <div class="stat-label">platos</div>
                </div>
                
                <div class="stat-card bizum">
                    <div class="stat-label">BIZUM</div>
                    <div class="stat-number"><?php echo number_format($totalBizum); ?></div>
                    <div class="stat-label">platos</div>
                </div>
            </div>

            <div class="data-section">
                <div class="section-header">
                    <h2 class="section-title">
                        <i class="fas fa-list"></i>
                        Todos los Registros
                    </h2>
                </div>

                <?php if (empty($menus)): ?>
                    <div class="empty-state">
                        <div class="empty-icon">
                            <i class="fas fa-utensils"></i>
                        </div>
                        <div class="empty-text">No hay registros</div>
                        <div class="empty-subtext">Aún no se han registrado personas para el menú dominical</div>
                    </div>
                <?php else: ?>
                    <div class="data-table">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th>Cantidad</th>
                                    <th>Forma de Pago</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($menus as $menu): ?>
                                    <tr>
                                        <td><?php echo htmlspecialchars($menu['id']); ?></td>
                                        <td><?php echo htmlspecialchars($menu['nombre']); ?></td>
                                        <td><?php echo htmlspecialchars($menu['telefono']); ?></td>
                                        <td>
                                            <span class="quantity-badge">
                                                <?php echo htmlspecialchars($menu['cantidad']); ?> personas
                                            </span>
                                        </td>
                                        <td>
                                            <?php if ($menu['forma_pago'] === 'bizum'): ?>
                                                <span style="background: #4facfe; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                                                    <i class="fas fa-mobile-alt"></i> Bizum
                                                </span>
                                            <?php else: ?>
                                                <span style="background: #95a5a6; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                                                    <i class="fas fa-money-bill-wave"></i> Efectivo
                                                </span>
                                            <?php endif; ?>
                                        </td>
                                        <td>
                                            <span class="date-badge">
                                                <?php echo date('d/m/Y', strtotime($menu['fecha'])); ?>
                                            </span>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php endif; ?>
            </div>
        </main>
    </div>
</body>
</html>