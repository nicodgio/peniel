<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require_once '../conn/conn.php';

if (!isset($_SESSION['admin_user'])) {
    header('Location: ../login.php');
    exit;
}

$user = $_SESSION['admin_user'];

$tiene_permiso = false;
if ($user['rol'] === 'admin') {
    $tiene_permiso = true;
} else {
    $permisos = $user['permisos'] ?? '';
    $tiene_permiso = strpos($permisos, "|transmisiones|") !== false;
}

if (!$tiene_permiso) {
    header('Location: dashboard.php');
    exit;
}

$mensaje = '';
$tipo_mensaje = '';

try {
    $check = $pdo->query("SHOW TABLES LIKE 'live_stream'");
    if ($check->rowCount() == 0) {
        die('Error: La tabla live_stream no existe. Por favor ejecuta el archivo database-schema.sql primero.');
    }
} catch (PDOException $e) {
    die('Error verificando tabla: ' . $e->getMessage());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (isset($_POST['action'])) {
            $action = $_POST['action'];

            if ($action === 'crear' || $action === 'editar') {
                $titulo = trim($_POST['titulo']);
                $descripcion = trim($_POST['descripcion']);
                $url_video = trim($_POST['url_video']);
                $activo = isset($_POST['activo']) ? 1 : 0;

                $video_id = '';
                if (preg_match('/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/', $url_video, $matches)) {
                    $video_id = $matches[1];
                }

                $url_embed = $video_id ? "https://www.youtube.com/embed/{$video_id}?autoplay=1" : $url_video;

                if ($action === 'crear') {
                    if ($activo == 1) {
                        $pdo->exec("UPDATE live_stream SET activo = 0");
                    }

                    $stmt = $pdo->prepare("INSERT INTO live_stream (titulo, descripcion, url_video, url_embed, activo) VALUES (?, ?, ?, ?, ?)");
                    $stmt->execute([$titulo, $descripcion, $url_video, $url_embed, $activo]);

                    $mensaje = "Transmisión creada exitosamente";
                    $tipo_mensaje = "success";
                } else {
                    $id = intval($_POST['id']);

                    if ($activo == 1) {
                        $pdo->exec("UPDATE live_stream SET activo = 0");
                    }

                    $stmt = $pdo->prepare("UPDATE live_stream SET titulo = ?, descripcion = ?, url_video = ?, url_embed = ?, activo = ? WHERE id = ?");
                    $stmt->execute([$titulo, $descripcion, $url_video, $url_embed, $activo, $id]);

                    $mensaje = "Transmisión actualizada exitosamente";
                    $tipo_mensaje = "success";
                }
            } elseif ($action === 'eliminar') {
                $id = intval($_POST['id']);
                $stmt = $pdo->prepare("DELETE FROM live_stream WHERE id = ?");
                $stmt->execute([$id]);

                $mensaje = "Transmisión eliminada exitosamente";
                $tipo_mensaje = "success";
            } elseif ($action === 'toggle') {
                $id = intval($_POST['id']);
                $activo = intval($_POST['activo']);

                $check = $pdo->prepare("SELECT id FROM live_stream WHERE id = ?");
                $check->execute([$id]);

                if ($check->rowCount() === 0) {
                    throw new Exception("Transmisión no encontrada");
                }

                if ($activo == 1) {
                    $pdo->exec("UPDATE live_stream SET activo = 0");
                }

                $stmt = $pdo->prepare("UPDATE live_stream SET activo = ? WHERE id = ?");
                $stmt->execute([$activo, $id]);

                $mensaje = $activo ? "Transmisión activada" : "Transmisión desactivada";
                $tipo_mensaje = "success";
            }
        }
    } catch (PDOException $e) {
        $mensaje = "Error: " . $e->getMessage();
        $tipo_mensaje = "error";
    }
}

try {
    $stmt = $pdo->query("SELECT * FROM live_stream ORDER BY created_at DESC");
    $transmisiones = $stmt->fetchAll();
} catch (PDOException $e) {
    die("Error al obtener transmisiones: " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transmisiones - Admin</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&display=swap"
        rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="includes/admin_styles.css">
    <style>
        .alert {
            padding: 1rem 1.5rem;
            border-radius: 10px;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            gap: 1rem
        }

        .alert-success {
            background: rgba(74, 222, 128, .2);
            color: #4ade80;
            border: 1px solid rgba(74, 222, 128, .3)
        }

        .alert-error {
            background: rgba(248, 113, 113, .2);
            color: #f87171;
            border: 1px solid rgba(248, 113, 113, .3)
        }

        .transmisiones-grid {
            display: grid;
            gap: 2rem;
            margin-top: 2rem
        }

        .transmision-card {
            background: rgba(255, 255, 255, .05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, .1);
            border-radius: 20px;
            overflow: hidden;
            transition: all .3s
        }

        .transmision-card.activa {
            border-color: #dc2626;
            box-shadow: 0 0 30px rgba(220, 38, 38, .3)
        }

        .transmision-header {
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 1rem;
            flex-wrap: wrap
        }

        .transmision-info {
            flex: 1;
            min-width: 250px
        }

        .transmision-title {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: .5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap
        }

        .live-badge {
            background: #dc2626;
            color: #fff;
            padding: .3rem .8rem;
            border-radius: 20px;
            font-size: .7rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-flex;
            align-items: center;
            gap: .5rem;
            animation: pulse 2s ease-in-out infinite
        }

        .live-dot {
            width: 6px;
            height: 6px;
            background: #fff;
            border-radius: 50%;
            animation: blink 1.5s ease-in-out infinite
        }

        .transmision-description {
            color: rgba(255, 255, 255, .7);
            line-height: 1.5;
            margin-bottom: 1rem
        }

        .transmision-url {
            font-size: .85rem;
            color: #609be8;
            word-break: break-all
        }

        .transmision-actions {
            display: flex;
            gap: .5rem;
            flex-shrink: 0;
            align-items: center
        }

        .toggle-switch {
            position: relative;
            width: 60px;
            height: 30px
        }

        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0
        }

        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, .1);
            transition: .3s;
            border-radius: 30px
        }

        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 22px;
            width: 22px;
            left: 4px;
            bottom: 4px;
            background-color: #fff;
            transition: .3s;
            border-radius: 50%
        }

        input:checked+.toggle-slider {
            background-color: #4ade80
        }

        input:checked+.toggle-slider:before {
            transform: translateX(30px)
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .9);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            padding: 1rem
        }

        .modal.active {
            display: flex
        }

        .modal-content {
            background: linear-gradient(135deg, #111 0, #1a1a1a 100%);
            border: 1px solid rgba(255, 255, 255, .1);
            border-radius: 20px;
            padding: 2rem;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem
        }

        .modal-title {
            font-size: 1.5rem;
            font-weight: 700
        }

        .modal-close {
            background: rgba(255, 255, 255, .1);
            border: none;
            color: #fff;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .3s
        }

        .modal-close:hover {
            background: rgba(255, 255, 255, .2)
        }

        .form-group {
            margin-bottom: 1.5rem
        }

        .form-group label {
            display: block;
            margin-bottom: .5rem;
            font-weight: 600;
            font-size: .9rem
        }

        .form-control {
            width: 100%;
            padding: .8rem 1rem;
            background: rgba(255, 255, 255, .05);
            border: 1px solid rgba(255, 255, 255, .2);
            border-radius: 10px;
            color: #fff;
            font-family: Montserrat, sans-serif;
            font-size: 1rem;
            box-sizing: border-box
        }

        .form-control:focus {
            outline: 0;
            border-color: #609be8;
            box-shadow: 0 0 0 3px rgba(96, 155, 232, .2)
        }

        textarea.form-control {
            min-height: 100px;
            resize: vertical
        }

        .checkbox-group {
            display: flex;
            align-items: center;
            gap: .8rem
        }

        .checkbox-group input[type=checkbox] {
            width: 20px;
            height: 20px;
            cursor: pointer
        }

        .form-help {
            font-size: .8rem;
            color: rgba(255, 255, 255, .6);
            margin-top: .5rem
        }

        .btn-group {
            display: flex;
            gap: 1rem;
            margin-top: 2rem
        }

        .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            color: rgba(255, 255, 255, .6)
        }

        .empty-state i {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: .5
        }

        @keyframes pulse {

            0%,
            100% {
                opacity: 1
            }

            50% {
                opacity: .8
            }
        }

        @keyframes blink {

            0%,
            100% {
                opacity: 1
            }

            50% {
                opacity: .3
            }
        }

        @media (max-width:768px) {
            .transmision-header {
                flex-direction: column
            }

            .transmision-actions {
                width: 100%;
                justify-content: flex-start
            }

            .btn-group {
                flex-direction: column
            }
        }
    </style>
</head>

<body>
    <div class="dashboard-container">
        <?php include 'includes/sidebar.php'; ?>
        <main class="main-content">
            <div class="header">
                <h1 class="page-title"><i class="fas fa-video"></i> Transmisiones en Vivo</h1>
                <button onclick="openModal('crear')" class="btn btn-primary"><i class="fas fa-plus"></i> Nueva
                    Transmisión</button>
            </div>
            <?php if ($mensaje): ?>
                <div class="alert alert-<?php echo $tipo_mensaje; ?>"><i
                        class="fas fa-<?php echo $tipo_mensaje === 'success' ? 'check-circle' : 'exclamation-circle'; ?>"></i><?php echo htmlspecialchars($mensaje); ?>
                </div><?php endif; ?>
            <div class="transmisiones-grid">
                <?php if (empty($transmisiones)): ?>
                    <div class="empty-state"><i class="fas fa-video"></i>
                        <h3>No hay transmisiones configuradas</h3>
                        <p>Crea tu primera transmisión para comenzar</p>
                    </div><?php else:
                    foreach ($transmisiones as $trans): ?>
                        <div class="transmision-card <?php echo $trans['activo'] ? 'activa' : ''; ?>">
                            <div class="transmision-header">
                                <div class="transmision-info">
                                    <h3 class="transmision-title">
                                        <?php echo htmlspecialchars($trans['titulo']); ?>        <?php if ($trans['activo']): ?><span
                                                class="live-badge"><span class="live-dot"></span>EN VIVO</span><?php endif; ?></h3>
                                    <?php if ($trans['descripcion']): ?>
                                        <p class="transmision-description"><?php echo htmlspecialchars($trans['descripcion']); ?></p>
                                    <?php endif; ?>
                                    <div class="transmision-url"><i
                                            class="fas fa-link"></i><?php echo htmlspecialchars($trans['url_video']); ?></div>
                                </div>
                                <div class="transmision-actions"><label class="toggle-switch"><input type="checkbox" <?php echo $trans['activo'] ? 'checked' : ''; ?>
                                            onchange="toggleTransmision(<?php echo $trans['id']; ?>,this.checked)"><span
                                            class="toggle-slider"></span></label><button
                                        onclick='openModal("editar",<?php echo json_encode($trans, JSON_HEX_APOS | JSON_HEX_QUOT); ?>)'
                                        class="btn btn-secondary btn-icon"><i class="fas fa-edit"></i></button><button
                                        onclick="eliminarTransmision(<?php echo $trans['id']; ?>)"
                                        class="btn btn-danger btn-icon"><i class="fas fa-trash"></i></button></div>
                            </div>
                        </div><?php endforeach; endif; ?>
            </div>
        </main>
    </div>
    <div id="transmisionModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="modalTitle">Nueva Transmisión</h2><button class="modal-close"
                    onclick="closeModal()">×</button>
            </div>
            <form id="transmisionForm" method="POST"><input type="hidden" name="action" id="formAction"
                    value="crear"><input type="hidden" name="id" id="transmisionId">
                <div class="form-group"><label for="titulo">Título *</label><input type="text" class="form-control"
                        id="titulo" name="titulo" required></div>
                <div class="form-group"><label for="descripcion">Descripción</label><textarea class="form-control"
                        id="descripcion" name="descripcion"></textarea></div>
                <div class="form-group"><label for="url_video">URL del Video *</label><input type="url"
                        class="form-control" id="url_video" name="url_video" required>
                    <div class="form-help"><i class="fas fa-info-circle"></i> Puedes usar enlaces de YouTube (ej:
                        https://www.youtube.com/watch?v=...)</div>
                </div>
                <div class="form-group">
                    <div class="checkbox-group"><input type="checkbox" id="activo" name="activo"><label
                            for="activo">Activar transmisión</label></div>
                </div>
                <div class="btn-group"><button type="submit" class="btn btn-primary"><i class="fas fa-save"></i>
                        Guardar</button><button type="button" class="btn btn-secondary" onclick="closeModal()"><i
                            class="fas fa-times"></i> Cancelar</button></div>
            </form>
        </div>
    </div>
    <script>function openModal(a, d) { d = d || null; const m = document.getElementById('transmisionModal'), f = document.getElementById('transmisionForm'), t = document.getElementById('modalTitle'), c = document.getElementById('formAction'); f.reset(); c.value = a; if (a === 'crear') { t.textContent = 'Nueva Transmisión' } else { t.textContent = 'Editar Transmisión'; document.getElementById('transmisionId').value = d.id; document.getElementById('titulo').value = d.titulo; document.getElementById('descripcion').value = d.descripcion || ''; document.getElementById('url_video').value = d.url_video; document.getElementById('activo').checked = d.activo == 1 } m.classList.add('active') } function closeModal() { document.getElementById('transmisionModal').classList.remove('active') } let isToggling = false; function toggleTransmision(id, activo) { if (isToggling) return; isToggling = true; const fd = new FormData(); fd.append('action', 'toggle'); fd.append('id', id); fd.append('activo', activo ? 1 : 0); fetch(window.location.href, { method: 'POST', body: fd }).then(r => r.text()).then(() => window.location.reload()).catch(e => { console.error('Error:', e); alert('Error al cambiar el estado'); isToggling = false; window.location.reload() }) } let isDeleting = false; function eliminarTransmision(id) { if (isDeleting) return; if (confirm('¿Estás seguro de eliminar esta transmisión?')) { isDeleting = true; const fd = new FormData(); fd.append('action', 'eliminar'); fd.append('id', id); fetch(window.location.href, { method: 'POST', body: fd }).then(r => r.text()).then(() => window.location.reload()).catch(e => { console.error('Error:', e); alert('Error al eliminar'); isDeleting = false; window.location.reload() }) } } window.onclick = function (e) { const m = document.getElementById('transmisionModal'); if (e.target === m) { closeModal() } }</script>
</body>

</html>