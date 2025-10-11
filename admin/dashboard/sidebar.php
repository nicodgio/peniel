<?php
if (!isset($_SESSION['admin_user'])) {
    header('Location: ../login.php');
    exit;
}

$user = $_SESSION['admin_user'];
$current_page = basename($_SERVER['PHP_SELF']);
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
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <i class="fas fa-users nav-icon"></i>
                    Usuarios
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <i class="fas fa-calendar nav-icon"></i>
                    Eventos
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <i class="fas fa-video nav-icon"></i>
                    Transmisiones
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <i class="fas fa-hands-praying nav-icon"></i>
                    Ministerios
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <i class="fas fa-bible nav-icon"></i>
                    Predicaciones
                </a>
            </li>
            <li class="nav-item">
                <a href="menudominical.php" class="nav-link <?php echo ($current_page == 'menudominical.php') ? 'active' : ''; ?>">
                    <i class="fas fa-utensils nav-icon"></i>
                    Menú Dominical
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <i class="fas fa-image nav-icon"></i>
                    Galería
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <i class="fas fa-cog nav-icon"></i>
                    Configuración
                </a>
            </li>
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