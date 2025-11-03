<?php
if (!isset($_SESSION['admin_user'])) {
    header('Location: ../login.php');
    exit;
}
$user = $_SESSION['admin_user'];
$current_page = basename($_SERVER['PHP_SELF']);

function tienePermiso($modulo) {
    global $user;
    if ($user['rol'] === 'admin') {
        return true;
    }
    $permisos = $user['permisos'] ?? '';
    return strpos($permisos, "|$modulo|") !== false;
}
?>
<aside class="sidebar">
    <div class="sidebar-header">
        <div class="admin-badge">Admin Panel</div>
        <h2 class="sidebar-title">Dashboard</h2>
        <p class="sidebar-subtitle">Panel de Control</p>
    </div>
    
    <nav>
        <ul class="sidebar-nav">
            <li class="nav-item">
                <a href="dashboard.php" class="nav-link <?php echo ($current_page == 'dashboard.php') ? 'active' : ''; ?>">
                    <i class="fas fa-home nav-icon"></i>
                    Inicio
                </a>
            </li>

            <?php if ($user['rol'] === 'admin'): ?>
            <li class="nav-item">
                <a href="usuarios.php" class="nav-link <?php echo ($current_page == 'usuarios.php') ? 'active' : ''; ?>">
                    <i class="fas fa-users nav-icon"></i>
                    Usuarios
                </a>
            </li>
            <?php endif; ?>

            <?php if (tienePermiso('eventos')): ?>
            <li class="nav-item">
                <a href="eventos.php" class="nav-link <?php echo ($current_page == 'eventos.php') ? 'active' : ''; ?>">
                    <i class="fas fa-calendar nav-icon"></i>
                    Eventos
                </a>
            </li>
            <?php endif; ?>

            <?php if (tienePermiso('transmisiones')): ?>
            <li class="nav-item">
                <a href="transmisiones.php" class="nav-link <?php echo ($current_page == 'transmisiones.php') ? 'active' : ''; ?>">
                    <i class="fas fa-video nav-icon"></i>
                    Transmisiones
                </a>
            </li>
            <?php endif; ?>

            <?php if (tienePermiso('ministerios')): ?>
            <li class="nav-item">
                <a href="ministerios.php" class="nav-link <?php echo ($current_page == 'ministerios.php') ? 'active' : ''; ?>">
                    <i class="fas fa-hands-praying nav-icon"></i>
                    Ministerios
                </a>
            </li>
            <?php endif; ?>

            <?php if (tienePermiso('predicaciones')): ?>
            <li class="nav-item">
                <a href="predicaciones.php" class="nav-link <?php echo ($current_page == 'predicaciones.php') ? 'active' : ''; ?>">
                    <i class="fas fa-bible nav-icon"></i>
                    Predicaciones
                </a>
            </li>
            <?php endif; ?>

            <?php if (tienePermiso('menu_dominical')): ?>
            <li class="nav-item">
                <a href="menudominical.php" class="nav-link <?php echo ($current_page == 'menudominical.php') ? 'active' : ''; ?>">
                    <i class="fas fa-utensils nav-icon"></i>
                    Menú Dominical
                </a>
            </li>
            <?php endif; ?>
        </ul>
    </nav>

    <div class="user-info">
        <div class="user-name"><?php echo htmlspecialchars($user['nombre']); ?></div>
        <div class="user-role"><?php echo ucfirst($user['rol']); ?></div>
        <a href="../logout.php" class="logout-btn">
            <i class="fas fa-sign-out-alt"></i>
            Cerrar Sesión
        </a>
    </div>
</aside>