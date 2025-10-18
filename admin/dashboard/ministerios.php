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

$uploadDirImg = '../imgs/ministerios/';
$uploadDirVideo = '../videos/ministerios/';

if (!file_exists($uploadDirImg))
    mkdir($uploadDirImg, 0755, true);
if (!file_exists($uploadDirVideo))
    mkdir($uploadDirVideo, 0755, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        try {
            if ($_POST['action'] === 'create') {
                $imagen = '';
                $video = '';

                if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === 0) {
                    $ext = pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION);
                    $nombreArchivo = preg_replace('/[^a-z0-9]+/', '-', strtolower($_POST['nombre']));
                    $imagen = $nombreArchivo . '.' . $ext;
                    move_uploaded_file($_FILES['imagen']['tmp_name'], $uploadDirImg . $imagen);
                }

                if (isset($_FILES['video']) && $_FILES['video']['error'] === 0) {
                    $ext = pathinfo($_FILES['video']['name'], PATHINFO_EXTENSION);
                    $nombreArchivo = preg_replace('/[^a-z0-9]+/', '-', strtolower($_POST['nombre']));
                    $video = $nombreArchivo . '.' . $ext;
                    move_uploaded_file($_FILES['video']['tmp_name'], $uploadDirVideo . $video);
                }

                $stmt = $pdo->prepare("INSERT INTO ministerios (nombre, categoria, frecuencia, horario, lema, descripcion, descripcion_completa, lider, telefono, actividades, requisitos, impacto, icono, color, imagen, video, proyectos_misioneros, orden) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([
                    $_POST['nombre'],
                    $_POST['categoria'],
                    $_POST['frecuencia'],
                    $_POST['horario'],
                    $_POST['lema'],
                    $_POST['descripcion'],
                    $_POST['descripcion_completa'],
                    $_POST['lider'],
                    $_POST['telefono'],
                    $_POST['actividades'],
                    $_POST['requisitos'],
                    $_POST['impacto'],
                    $_POST['icono'],
                    $_POST['color'],
                    $imagen,
                    $video ?: null,
                    $_POST['proyectos_misioneros'] ?: null,
                    $_POST['orden'] ?? 0
                ]);

                $_SESSION['message'] = "Ministerio creado exitosamente";
                $_SESSION['messageType'] = "success";

            } elseif ($_POST['action'] === 'update') {
                $stmt = $pdo->prepare("SELECT imagen, video FROM ministerios WHERE id = ?");
                $stmt->execute([$_POST['id']]);
                $ministerioActual = $stmt->fetch();

                $imagen = $ministerioActual['imagen'];
                $video = $ministerioActual['video'];

                if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === 0) {
                    if ($imagen && file_exists($uploadDirImg . $imagen)) {
                        unlink($uploadDirImg . $imagen);
                    }
                    $ext = pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION);
                    $nombreArchivo = preg_replace('/[^a-z0-9]+/', '-', strtolower($_POST['nombre']));
                    $imagen = $nombreArchivo . '.' . $ext;
                    move_uploaded_file($_FILES['imagen']['tmp_name'], $uploadDirImg . $imagen);
                }

                if (isset($_FILES['video']) && $_FILES['video']['error'] === 0) {
                    if ($video && file_exists($uploadDirVideo . $video)) {
                        unlink($uploadDirVideo . $video);
                    }
                    $ext = pathinfo($_FILES['video']['name'], PATHINFO_EXTENSION);
                    $nombreArchivo = preg_replace('/[^a-z0-9]+/', '-', strtolower($_POST['nombre']));
                    $video = $nombreArchivo . '.' . $ext;
                    move_uploaded_file($_FILES['video']['tmp_name'], $uploadDirVideo . $video);
                }

                if (isset($_POST['eliminar_video']) && $_POST['eliminar_video'] === '1') {
                    if ($video && file_exists($uploadDirVideo . $video)) {
                        unlink($uploadDirVideo . $video);
                    }
                    $video = null;
                }

                $stmt = $pdo->prepare("UPDATE ministerios SET nombre=?, categoria=?, frecuencia=?, horario=?, lema=?, descripcion=?, descripcion_completa=?, lider=?, telefono=?, actividades=?, requisitos=?, impacto=?, icono=?, color=?, imagen=?, video=?, proyectos_misioneros=?, orden=? WHERE id=?");
                $stmt->execute([
                    $_POST['nombre'],
                    $_POST['categoria'],
                    $_POST['frecuencia'],
                    $_POST['horario'],
                    $_POST['lema'],
                    $_POST['descripcion'],
                    $_POST['descripcion_completa'],
                    $_POST['lider'],
                    $_POST['telefono'],
                    $_POST['actividades'],
                    $_POST['requisitos'],
                    $_POST['impacto'],
                    $_POST['icono'],
                    $_POST['color'],
                    $imagen,
                    $video,
                    $_POST['proyectos_misioneros'] ?: null,
                    $_POST['orden'] ?? 0,
                    $_POST['id']
                ]);

                $_SESSION['message'] = "Ministerio actualizado exitosamente";
                $_SESSION['messageType'] = "success";

            } elseif ($_POST['action'] === 'delete') {
                $stmt = $pdo->prepare("SELECT imagen, video FROM ministerios WHERE id = ?");
                $stmt->execute([$_POST['id']]);
                $ministerio = $stmt->fetch();

                if ($ministerio['imagen'] && file_exists($uploadDirImg . $ministerio['imagen'])) {
                    unlink($uploadDirImg . $ministerio['imagen']);
                }
                if ($ministerio['video'] && file_exists($uploadDirVideo . $ministerio['video'])) {
                    unlink($uploadDirVideo . $ministerio['video']);
                }

                $stmt = $pdo->prepare("DELETE FROM ministerios WHERE id=?");
                $stmt->execute([$_POST['id']]);

                $_SESSION['message'] = "Ministerio eliminado exitosamente";
                $_SESSION['messageType'] = "success";
            }

            header('Location: ministerios.php');
            exit;
        } catch (PDOException $e) {
            $_SESSION['message'] = "Error: " . $e->getMessage();
            $_SESSION['messageType'] = "error";
            header('Location: ministerios.php');
            exit;
        }
    }
}

$ministerios = $pdo->query("SELECT * FROM ministerios ORDER BY orden ASC, id DESC");
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ministerios - Admin</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&display=swap"
        rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="includes/admin_styles.css">
    <style>
        .ministerios-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .ministerio-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            overflow: hidden;
            transition: all 0.3s;
        }

        .ministerio-card:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.08);
        }

        .ministerio-imagen {
            width: 100%;
            height: 200px;
            object-fit: cover;
            background: #000;
        }

        .ministerio-content {
            padding: 1.5rem;
        }

        .ministerio-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
        }

        .ministerio-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: white;
            margin-bottom: 0.5rem;
        }

        .ministerio-categoria {
            display: inline-block;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            color: white;
        }

        .ministerio-info {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .ministerio-actions {
            display: flex;
            gap: 0.5rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
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
            font-size: 0.85rem;
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
            overflow-y: auto;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: linear-gradient(135deg, #111 0%, #1a1a1a 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            margin: auto;
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
        .form-select,
        .form-textarea {
            width: 100%;
            padding: 0.8rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            color: white;
            font-family: 'Montserrat', sans-serif;
        }

        .form-textarea {
            min-height: 100px;
            resize: vertical;
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .file-upload-box {
            border: 2px dashed rgba(255, 255, 255, 0.3);
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        }

        .file-upload-box:hover {
            border-color: #609be8;
            background: rgba(96, 155, 232, 0.1);
        }

        .file-preview {
            max-width: 200px;
            max-height: 150px;
            margin: 0.5rem auto;
            display: block;
            border-radius: 10px;
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

        @media (max-width: 768px) {
            .ministerios-grid {
                grid-template-columns: 1fr;
            }

            .form-row {
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
                <h1 class="page-title">Gestión de Ministerios</h1>
                <button onclick="openModal()" class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                    Nuevo Ministerio
                </button>
            </div>

            <?php if ($message): ?>
                <div class="message <?php echo $messageType; ?>" id="messageAlert">
                    <?php echo $message; ?>
                </div>
            <?php endif; ?>

            <div class="ministerios-grid">
                <?php while ($ministerio = $ministerios->fetch()): ?>
                    <div class="ministerio-card">
                        <img src="<?php echo htmlspecialchars($ministerio['imagen']); ?>"
                            alt="<?php echo htmlspecialchars($ministerio['nombre']); ?>" 
                            class="ministerio-imagen"
                            onerror="this.onerror=null; this.style.display='none';">
                        <div class="ministerio-content">
                            <div class="ministerio-header">
                                <div>
                                    <h3 class="ministerio-title"><?php echo htmlspecialchars($ministerio['nombre']); ?></h3>
                                    <span class="ministerio-categoria"
                                        style="background: <?php echo $ministerio['color']; ?>">
                                        <?php echo htmlspecialchars($ministerio['categoria']); ?>
                                    </span>
                                </div>
                            </div>

                            <div class="ministerio-info">
                                <i class="fas fa-user-tie"></i>
                                <?php echo htmlspecialchars($ministerio['lider']); ?>
                            </div>

                            <div class="ministerio-info">
                                <i class="far fa-clock"></i>
                                <?php echo htmlspecialchars($ministerio['frecuencia']); ?>
                            </div>

                            <?php if ($ministerio['video']): ?>
                                <div class="ministerio-info">
                                    <i class="fas fa-video"></i>
                                    Video disponible
                                </div>
                            <?php endif; ?>

                            <div class="ministerio-actions">
                                <button onclick='editMinisterio(<?php echo json_encode($ministerio); ?>)'
                                    class="btn-icon btn-edit">
                                    <i class="fas fa-edit"></i>
                                    Editar
                                </button>
                                <button
                                    onclick="deleteMinisterio(<?php echo $ministerio['id']; ?>, '<?php echo addslashes($ministerio['nombre']); ?>')"
                                    class="btn-icon btn-delete">
                                    <i class="fas fa-trash"></i>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                <?php endwhile; ?>
            </div>
        </main>
    </div>

    <div id="ministerioModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="modalTitle">Nuevo Ministerio</h2>
                <button onclick="closeModal()" class="btn-close">×</button>
            </div>

            <form id="ministerioForm" method="POST" enctype="multipart/form-data">
                <input type="hidden" name="action" id="formAction" value="create">
                <input type="hidden" name="id" id="ministerioId">
                <input type="hidden" name="eliminar_video" id="eliminarVideo" value="0">

                <div class="form-row">
                    <div class="form-group">
                        <label>Nombre *</label>
                        <input type="text" name="nombre" id="nombre" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label>Categoría *</label>
                        <input type="text" name="categoria" id="categoria" class="form-input" required>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Frecuencia *</label>
                        <input type="text" name="frecuencia" id="frecuencia" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label>Horario *</label>
                        <input type="text" name="horario" id="horario" class="form-input" required>
                    </div>
                </div>

                <div class="form-group">
                    <label>Lema *</label>
                    <input type="text" name="lema" id="lema" class="form-input" required>
                </div>

                <div class="form-group">
                    <label>Descripción corta *</label>
                    <textarea name="descripcion" id="descripcion" class="form-textarea" required></textarea>
                </div>

                <div class="form-group">
                    <label>Descripción completa *</label>
                    <textarea name="descripcion_completa" id="descripcion_completa" class="form-textarea"
                        style="min-height: 150px;" required></textarea>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Líder *</label>
                        <input type="text" name="lider" id="lider" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label>Teléfono *</label>
                        <input type="text" name="telefono" id="telefono" class="form-input" required>
                    </div>
                </div>

                <div class="form-group">
                    <label>Actividades (una por línea) *</label>
                    <textarea name="actividades" id="actividades" class="form-textarea" required></textarea>
                </div>

                <div class="form-group">
                    <label>Requisitos (uno por línea) *</label>
                    <textarea name="requisitos" id="requisitos" class="form-textarea" required></textarea>
                </div>

                <div class="form-group">
                    <label>Impacto *</label>
                    <textarea name="impacto" id="impacto" class="form-textarea" required></textarea>
                </div>

                <div class="form-group">
                    <label>Proyectos Misioneros (uno por línea, opcional)</label>
                    <textarea name="proyectos_misioneros" id="proyectos_misioneros" class="form-textarea"></textarea>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Icono FontAwesome *</label>
                        <input type="text" name="icono" id="icono" class="form-input" required
                            placeholder="fas fa-hands-helping">
                    </div>
                    <div class="form-group">
                        <label>Color *</label>
                        <input type="color" name="color" id="color" class="form-input" required>
                    </div>
                </div>

                <div class="form-group">
                    <label>Orden (para ordenar en el sitio)</label>
                    <input type="number" name="orden" id="orden" class="form-input" value="0">
                </div>

                <div class="form-group">
                    <label>Imagen * <span id="imagenOptional"></span></label>
                    <input type="file" name="imagen" id="imagen" accept="image/*" class="form-input">
                    <img id="imagenPreview" class="file-preview" style="display: none;">
                </div>

                <div class="form-group">
                    <label>Video (opcional)</label>
                    <input type="file" name="video" id="video" accept="video/*" class="form-input">
                    <div id="videoInfo" style="display: none; margin-top: 0.5rem;">
                        <span id="videoNombre"></span>
                        <button type="button" onclick="eliminarVideoExistente()" class="btn-icon btn-delete"
                            style="margin-top: 0.5rem;">
                            Eliminar video actual
                        </button>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    <i class="fas fa-save"></i>
                    Guardar Ministerio
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

        function openModal() {
            document.getElementById('ministerioModal').classList.add('active');
            document.getElementById('modalTitle').textContent = 'Nuevo Ministerio';
            document.getElementById('formAction').value = 'create';
            document.getElementById('ministerioForm').reset();
            document.getElementById('ministerioId').value = '';
            document.getElementById('imagen').required = true;
            document.getElementById('imagenOptional').textContent = '';
            document.getElementById('imagenPreview').style.display = 'none';
            document.getElementById('videoInfo').style.display = 'none';
            document.getElementById('eliminarVideo').value = '0';
        }

        function closeModal() {
            document.getElementById('ministerioModal').classList.remove('active');
        }

        function editMinisterio(ministerio) {
            document.getElementById('ministerioModal').classList.add('active');
            document.getElementById('modalTitle').textContent = 'Editar Ministerio';
            document.getElementById('formAction').value = 'update';
            document.getElementById('ministerioId').value = ministerio.id;
            document.getElementById('nombre').value = ministerio.nombre;
            document.getElementById('categoria').value = ministerio.categoria;
            document.getElementById('frecuencia').value = ministerio.frecuencia;
            document.getElementById('horario').value = ministerio.horario;
            document.getElementById('lema').value = ministerio.lema;
            document.getElementById('descripcion').value = ministerio.descripcion;
            document.getElementById('descripcion_completa').value = ministerio.descripcion_completa;
            document.getElementById('lider').value = ministerio.lider;
            document.getElementById('telefono').value = ministerio.telefono;
            document.getElementById('actividades').value = ministerio.actividades;
            document.getElementById('requisitos').value = ministerio.requisitos;
            document.getElementById('impacto').value = ministerio.impacto;
            document.getElementById('proyectos_misioneros').value = ministerio.proyectos_misioneros || '';
            document.getElementById('icono').value = ministerio.icono;
            document.getElementById('color').value = ministerio.color;
            document.getElementById('orden').value = ministerio.orden;

            document.getElementById('imagen').required = false;
            document.getElementById('imagenOptional').textContent = '(dejar en blanco para mantener actual)';

            if (ministerio.imagen) {
                const preview = document.getElementById('imagenPreview');
                preview.src = ministerio.imagen;
                preview.style.display = 'block';
            }

            if (ministerio.video) {
                document.getElementById('videoInfo').style.display = 'block';
                document.getElementById('videoNombre').textContent = 'Video: ' + ministerio.video;
            } else {
                document.getElementById('videoInfo').style.display = 'none';
            }

            document.getElementById('eliminarVideo').value = '0';
        }

        function eliminarVideoExistente() {
            document.getElementById('eliminarVideo').value = '1';
            document.getElementById('videoInfo').style.display = 'none';
            alert('El video será eliminado al guardar los cambios');
        }

        function deleteMinisterio(id, nombre) {
            if (confirm('¿Estás seguro de que quieres eliminar el ministerio "' + nombre + '"? Esto eliminará también la imagen y el video asociados.')) {
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

        document.getElementById('ministerioModal').addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal();
            }
        });

        document.getElementById('imagen').addEventListener('change', function (e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const preview = document.getElementById('imagenPreview');
                    preview.src = event.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    </script>
</body>

</html>