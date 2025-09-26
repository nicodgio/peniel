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
    
    $stmt = $pdo->query("SELECT id, nombre, telefono, cantidad, fecha FROM menudominical ORDER BY fecha DESC");
    $menus = $stmt->fetchAll();
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
                <a href="dashboard.php" class="btn back-btn">
                    <i class="fas fa-arrow-left"></i>
                    Volver al Dashboard
                </a>
            </div>

            <?php if (isset($error)): ?>
                <div class="error-message">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <div class="stats-summary">
                <div class="total-count"><?php echo number_format($totalMenus); ?></div>
                <div class="count-label">Registros de Menú Dominical</div>
                <div class="count-description">Total de personas registradas para el menú dominical</div>
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