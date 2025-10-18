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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        try {
            if ($_POST['action'] === 'create') {
                $rol = $_POST['rol'];
                $permisos = '';

                if ($rol === 'usuario') {
                    $permisosArray = isset($_POST['permisos']) ? $_POST['permisos'] : [];
                    $permisos = '|' . implode('|', $permisosArray) . '|';
                }

                $passwordHash = password_hash($_POST['password'], PASSWORD_DEFAULT);

                $stmt = $pdo->prepare("INSERT INTO usuarios (username, password, Nombre, rol, permisos) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([$_POST['username'], $passwordHash, $_POST['Nombre'], $rol, $permisos]);

                $_SESSION['message'] = "Usuario creado exitosamente";
                $_SESSION['messageType'] = "success";
            } elseif ($_POST['action'] === 'update') {
                $rol = $_POST['rol'];
                $permisos = '';

                if ($rol === 'usuario') {
                    $permisosArray = isset($_POST['permisos']) ? $_POST['permisos'] : [];
                    $permisos = '|' . implode('|', $permisosArray) . '|';
                }

                if (!empty($_POST['password'])) {
                    $passwordHash = password_hash($_POST['password'], PASSWORD_DEFAULT);
                    $stmt = $pdo->prepare("UPDATE usuarios SET username=?, password=?, Nombre=?, rol=?, permisos=? WHERE id=?");
                    $stmt->execute([$_POST['username'], $passwordHash, $_POST['Nombre'], $rol, $permisos, $_POST['id']]);
                } else {
                    $stmt = $pdo->prepare("UPDATE usuarios SET username=?, Nombre=?, rol=?, permisos=? WHERE id=?");
                    $stmt->execute([$_POST['username'], $_POST['Nombre'], $rol, $permisos, $_POST['id']]);
                }

                $_SESSION['message'] = "Usuario actualizado exitosamente";
                $_SESSION['messageType'] = "success";
            } elseif ($_POST['action'] === 'delete') {
                $stmt = $pdo->prepare("DELETE FROM usuarios WHERE id=?");
                $stmt->execute([$_POST['id']]);
                $_SESSION['message'] = "Usuario eliminado exitosamente";
                $_SESSION['messageType'] = "success";
            }
            header('Location: usuarios.php');
            exit;
        } catch (PDOException $e) {
            $_SESSION['message'] = "Error: " . $e->getMessage();
            $_SESSION['messageType'] = "error";
            header('Location: usuarios.php');
            exit;
        }
    }
}

$usuarios = $pdo->query("SELECT * FROM usuarios ORDER BY id DESC");

$modulosDisponibles = [
    'eventos' => 'Eventos',
    'transmisiones' => 'Transmisiones',
    'ministerios' => 'Ministerios',
    'predicaciones' => 'Predicaciones',
    'menu_dominical' => 'Menú Dominical'
];
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuarios - Admin</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&display=swap"
        rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="includes/admin_styles.css">
    <style>
        .usuarios-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .usuario-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 1.5rem;
            transition: all 0.3s;
        }

        .usuario-card:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.08);
        }

        .usuario-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .usuario-avatar {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #609be8 0%, #4a8bc2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            font-weight: 700;
            color: white;
        }

        .usuario-info h3 {
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 0.3rem;
            color: white;
        }

        .usuario-username {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.7);
        }

        .usuario-rol {
            display: inline-block;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .rol-admin {
            background: rgba(74, 222, 128, 0.2);
            color: #4ade80;
        }

        .rol-usuario {
            background: rgba(96, 155, 232, 0.2);
            color: #609be8;
        }

        .usuario-permisos {
            margin-bottom: 1rem;
        }

        .usuario-permisos-label {
            font-size: 0.8rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: rgba(255, 255, 255, 0.8);
        }

        .permisos-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
        }

        .permiso-badge {
            background: rgba(255, 255, 255, 0.1);
            padding: 0.3rem 0.6rem;
            border-radius: 12px;
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.9);
        }

        .usuario-actions {
            display: flex;
            gap: 0.5rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: linear-gradient(135deg, #111 0%, #1a1a1a 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }

        .modal-title {
            font-size: 1.5rem;
            font-weight: 700;
        }

        .btn-close {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }

        .form-input,
        .form-select {
            width: 100%;
            padding: 0.8rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            color: white;
            font-family: 'Montserrat', sans-serif;
        }

        .permisos-checkboxes {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.8rem;
            margin-top: 0.5rem;
        }

        .checkbox-item {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            padding: 0.8rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .checkbox-item:hover {
            background: rgba(255, 255, 255, 0.08);
        }

        .checkbox-item input[type="checkbox"] {
            width: 18px;
            height: 18px;
            cursor: pointer;
        }

        .checkbox-item label {
            margin: 0;
            cursor: pointer;
            flex: 1;
        }

        #permisosContainer {
            display: none;
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

        .btn-icon {
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
        }

        .btn-edit {
            background: rgba(96, 155, 232, 0.2);
            color: #609be8;
        }

        .btn-edit:hover {
            background: rgba(96, 155, 232, 0.3);
        }

        .btn-delete {
            background: rgba(248, 113, 113, 0.2);
            color: #f87171;
        }

        .btn-delete:hover {
            background: rgba(248, 113, 113, 0.3);
        }

        @media (max-width: 768px) {
            .usuarios-grid {
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
                <h1 class="page-title">Gestión de Usuarios</h1>
                <button onclick="openModal()" class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                    Nuevo Usuario
                </button>
            </div>

            <?php if ($message): ?>
                <div class="message <?php echo $messageType; ?>" id="messageAlert">
                    <?php echo $message; ?>
                </div>
            <?php endif; ?>

            <div class="usuarios-grid">
                <?php while ($usuario = $usuarios->fetch()): ?>
                    <div class="usuario-card">
                        <div class="usuario-header">
                            <div class="usuario-avatar">
                                <?php echo strtoupper(substr($usuario['Nombre'], 0, 1)); ?>
                            </div>
                            <div class="usuario-info">
                                <h3><?php echo htmlspecialchars($usuario['Nombre']); ?></h3>
                                <div class="usuario-username">@<?php echo htmlspecialchars($usuario['username']); ?></div>
                            </div>
                        </div>

                        <div class="usuario-rol <?php echo $usuario['rol'] === 'admin' ? 'rol-admin' : 'rol-usuario'; ?>">
                            <?php echo $usuario['rol'] === 'admin' ? 'Administrador' : 'Usuario'; ?>
                        </div>

                        <?php if ($usuario['rol'] === 'usuario'): ?>
                            <div class="usuario-permisos">
                                <div class="usuario-permisos-label">Permisos:</div>
                                <div class="permisos-list">
                                    <?php
                                    $permisos = $usuario['permisos'] ?? '';
                                    if (!empty($permisos)) {
                                        foreach ($modulosDisponibles as $key => $nombre) {
                                            if (strpos($permisos, "|$key|") !== false) {
                                                echo '<span class="permiso-badge">' . htmlspecialchars($nombre) . '</span>';
                                            }
                                        }
                                    } else {
                                        echo '<span class="permiso-badge">Sin permisos</span>';
                                    }
                                    ?>
                                </div>
                            </div>
                        <?php else: ?>
                            <div class="usuario-permisos">
                                <div class="usuario-permisos-label">Permisos:</div>
                                <div class="permisos-list">
                                    <span class="permiso-badge">Acceso Total</span>
                                </div>
                            </div>
                        <?php endif; ?>

                        <div class="usuario-actions">
                            <button onclick='editUsuario(<?php echo json_encode($usuario); ?>)' class="btn-icon btn-edit">
                                <i class="fas fa-edit"></i>
                                Editar
                            </button>
                            <button onclick="deleteUsuario(<?php echo $usuario['id']; ?>)" class="btn-icon btn-delete">
                                <i class="fas fa-trash"></i>
                                Eliminar
                            </button>
                        </div>
                    </div>
                <?php endwhile; ?>
            </div>
        </main>
    </div>

    <div id="usuarioModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="modalTitle">Nuevo Usuario</h2>
                <button onclick="closeModal()" class="btn-close">×</button>
            </div>

            <form id="usuarioForm" method="POST">
                <input type="hidden" name="action" id="formAction" value="create">
                <input type="hidden" name="id" id="usuarioId">

                <div class="form-group">
                    <label>Nombre completo *</label>
                    <input type="text" name="Nombre" id="Nombre" class="form-input" required>
                </div>

                <div class="form-group">
                    <label>Usuario *</label>
                    <input type="text" name="username" id="username" class="form-input" required>
                </div>

                <div class="form-group">
                    <label>Contraseña <span id="passwordOptional"></span></label>
                    <input type="password" name="password" id="password" class="form-input">
                </div>

                <div class="form-group">
                    <label>Rol *</label>
                    <select name="rol" id="rol" class="form-select" required onchange="togglePermisos()">
                        <option value="usuario">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>

                <div class="form-group" id="permisosContainer">
                    <label>Permisos de acceso *</label>
                    <div class="permisos-checkboxes">
                        <?php foreach ($modulosDisponibles as $key => $nombre): ?>
                            <div class="checkbox-item">
                                <input type="checkbox" name="permisos[]" value="<?php echo $key; ?>"
                                    id="permiso_<?php echo $key; ?>">
                                <label for="permiso_<?php echo $key; ?>"><?php echo $nombre; ?></label>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    <i class="fas fa-save"></i>
                    Guardar Usuario
                </button>
            </form>
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

        function togglePermisos() {
            const rol = document.getElementById('rol').value;
            const permisosContainer = document.getElementById('permisosContainer');

            if (rol === 'usuario') {
                permisosContainer.style.display = 'block';
            } else {
                permisosContainer.style.display = 'none';
            }
        }

        function openModal() {
            document.getElementById('usuarioModal').classList.add('active');
            document.getElementById('modalTitle').textContent = 'Nuevo Usuario';
            document.getElementById('formAction').value = 'create';
            document.getElementById('usuarioForm').reset();
            document.getElementById('usuarioId').value = '';
            document.getElementById('password').required = true;
            document.getElementById('passwordOptional').textContent = '*';
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            togglePermisos();
        }

        function closeModal() {
            document.getElementById('usuarioModal').classList.remove('active');
        }

        function editUsuario(usuario) {
            document.getElementById('usuarioModal').classList.add('active');
            document.getElementById('modalTitle').textContent = 'Editar Usuario';
            document.getElementById('formAction').value = 'update';
            document.getElementById('usuarioId').value = usuario.id;
            document.getElementById('Nombre').value = usuario.Nombre;
            document.getElementById('username').value = usuario.username;
            document.getElementById('password').value = '';
            document.getElementById('password').required = false;
            document.getElementById('passwordOptional').textContent = '(dejar en blanco para no cambiar)';
            document.getElementById('rol').value = usuario.rol;

            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);

            if (usuario.rol === 'usuario' && usuario.permisos) {
                const permisos = usuario.permisos.split('|').filter(p => p);
                permisos.forEach(permiso => {
                    const checkbox = document.getElementById('permiso_' + permiso);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }

            togglePermisos();
        }

        function deleteUsuario(id) {
            if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
                const form = document.createElement('form');
                form.method = 'POST';
                form.innerHTML = `
                    <input type="hidden" name="action" value="delete">
                    <input type="hidden" name="id" value="${id}">
                `;
                document.body.appendChild(form);
                form.submit();
            }
        }

        document.getElementById('usuarioModal').addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal();
            }
        });
    </script>
</body>

</html>