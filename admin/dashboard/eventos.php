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
                $stmt = $pdo->prepare("INSERT INTO eventos (dias, mes, diaSemana, titulo, descripcion, hora, icono, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([$_POST['dias'], $_POST['mes'], $_POST['diaSemana'], $_POST['titulo'], $_POST['descripcion'], $_POST['hora'], $_POST['icono'], $_POST['color']]);
                $_SESSION['message'] = "Evento creado exitosamente";
                $_SESSION['messageType'] = "success";
            } elseif ($_POST['action'] === 'update') {
                $stmt = $pdo->prepare("UPDATE eventos SET dias=?, mes=?, diaSemana=?, titulo=?, descripcion=?, hora=?, icono=?, color=? WHERE id=?");
                $stmt->execute([$_POST['dias'], $_POST['mes'], $_POST['diaSemana'], $_POST['titulo'], $_POST['descripcion'], $_POST['hora'], $_POST['icono'], $_POST['color'], $_POST['id']]);
                $_SESSION['message'] = "Evento actualizado exitosamente";
                $_SESSION['messageType'] = "success";
            } elseif ($_POST['action'] === 'delete') {
                $stmt = $pdo->prepare("DELETE FROM eventos WHERE id=?");
                $stmt->execute([$_POST['id']]);
                $_SESSION['message'] = "Evento eliminado exitosamente";
                $_SESSION['messageType'] = "success";
            }
            header('Location: eventos.php');
            exit;
        } catch (PDOException $e) {
            $_SESSION['message'] = "Error: " . $e->getMessage();
            $_SESSION['messageType'] = "error";
            header('Location: eventos.php');
            exit;
        }
    }
}

$eventos = $pdo->query("SELECT * FROM eventos ORDER BY 
    CASE mes
        WHEN 'ENE' THEN 1
        WHEN 'FEB' THEN 2
        WHEN 'MAR' THEN 3
        WHEN 'ABR' THEN 4
        WHEN 'MAY' THEN 5
        WHEN 'JUN' THEN 6
        WHEN 'JUL' THEN 7
        WHEN 'AGO' THEN 8
        WHEN 'SEP' THEN 9
        WHEN 'OCT' THEN 10
        WHEN 'NOV' THEN 11
        WHEN 'DIC' THEN 12
    END,
    CAST(SUBSTRING_INDEX(dias, '-', 1) AS UNSIGNED)");
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eventos - Admin</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="includes/admin_styles.css">
    <style>
        .eventos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .evento-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            overflow: hidden;
            transition: all 0.3s;
        }

        .evento-card:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.08);
        }

        .evento-header {
            background: rgba(255, 255, 255, 0.1);
            padding: 1.5rem;
            text-align: center;
            position: relative;
            border-top: 4px solid;
        }

        .evento-month {
            display: inline-block;
            padding: 0.4rem 1rem;
            border-radius: 15px;
            font-weight: 700;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.8rem;
            color: white;
        }

        .evento-day {
            font-size: 2rem;
            font-weight: 900;
            color: white;
            margin-bottom: 0.3rem;
        }

        .evento-weekday {
            font-size: 0.85rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.8);
            text-transform: uppercase;
        }

        .evento-body {
            padding: 1.5rem;
        }

        .evento-title {
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 0.8rem;
            color: white;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .evento-time {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 25px;
            padding: 0.4rem 0.8rem;
            font-size: 0.85rem;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .evento-description {
            color: rgba(255, 255, 255, 0.85);
            line-height: 1.6;
            font-size: 0.95rem;
            margin-bottom: 1.5rem;
        }

        .evento-actions {
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

        .color-preview {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .icon-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 0.5rem;
            margin-top: 0.5rem;
        }

        .icon-option {
            padding: 0.8rem;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid transparent;
            border-radius: 10px;
            cursor: pointer;
            text-align: center;
            transition: all 0.3s;
        }

        .icon-option:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .icon-option.selected {
            border-color: #609be8;
            background: rgba(96, 155, 232, 0.2);
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
            .eventos-grid {
                grid-template-columns: 1fr;
            }

            .form-row {
                grid-template-columns: 1fr;
            }

            .icon-grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <?php include 'includes/sidebar.php'; ?>

        <main class="main-content">
            <div class="header">
                <h1 class="page-title">Gestión de Eventos</h1>
                <button onclick="openModal()" class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                    Nuevo Evento
                </button>
            </div>

            <?php if ($message): ?>
                <div class="message <?php echo $messageType; ?>" id="messageAlert">
                    <?php echo $message; ?>
                </div>
            <?php endif; ?>

            <div class="eventos-grid">
                <?php while ($evento = $eventos->fetch()): ?>
                    <div class="evento-card">
                        <div class="evento-header" style="border-top-color: <?php echo $evento['color']; ?>">
                            <div class="evento-month" style="background-color: <?php echo $evento['color']; ?>">
                                <?php echo $evento['mes']; ?>
                            </div>
                            <div class="evento-day"><?php echo $evento['dias']; ?></div>
                            <div class="evento-weekday"><?php echo $evento['diaSemana']; ?></div>
                        </div>
                        <div class="evento-body">
                            <h3 class="evento-title">
                                <i class="<?php echo $evento['icono']; ?>" style="color: <?php echo $evento['color']; ?>"></i>
                                <?php echo htmlspecialchars($evento['titulo']); ?>
                            </h3>
                            <div class="evento-time">
                                <i class="far fa-clock"></i>
                                <?php echo $evento['hora']; ?>
                            </div>
                            <p class="evento-description">
                                <?php echo htmlspecialchars($evento['descripcion']); ?>
                            </p>
                            <div class="evento-actions">
                                <button onclick='editEvento(<?php echo json_encode($evento); ?>)' class="btn-icon btn-edit">
                                    <i class="fas fa-edit"></i>
                                    Editar
                                </button>
                                <button onclick="deleteEvento(<?php echo $evento['id']; ?>)" class="btn-icon btn-delete">
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

    <div id="eventoModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="modalTitle">Nuevo Evento</h2>
                <button onclick="closeModal()" class="btn-close">×</button>
            </div>

            <form id="eventoForm" method="POST">
                <input type="hidden" name="action" id="formAction" value="create">
                <input type="hidden" name="id" id="eventoId">

                <div class="form-row">
                    <div class="form-group">
                        <label>Día(s) *</label>
                        <input type="text" name="dias" id="dias" class="form-input" required placeholder="Ej: 30 o 5-8">
                    </div>
                    <div class="form-group">
                        <label>Mes *</label>
                        <select name="mes" id="mes" class="form-select" required>
                            <option value="ENE">Enero</option>
                            <option value="FEB">Febrero</option>
                            <option value="MAR">Marzo</option>
                            <option value="ABR">Abril</option>
                            <option value="MAY">Mayo</option>
                            <option value="JUN">Junio</option>
                            <option value="JUL">Julio</option>
                            <option value="AGO">Agosto</option>
                            <option value="SEP">Septiembre</option>
                            <option value="OCT">Octubre</option>
                            <option value="NOV">Noviembre</option>
                            <option value="DIC">Diciembre</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label>Día de la semana *</label>
                    <input type="text" name="diaSemana" id="diaSemana" class="form-input" required placeholder="Ej: DOMINGO o VIERNES A LUNES">
                </div>

                <div class="form-group">
                    <label>Título *</label>
                    <input type="text" name="titulo" id="titulo" class="form-input" required>
                </div>

                <div class="form-group">
                    <label>Descripción *</label>
                    <textarea name="descripcion" id="descripcion" class="form-textarea" required></textarea>
                </div>

                <div class="form-group">
                    <label>Hora *</label>
                    <input type="text" name="hora" id="hora" class="form-input" required placeholder="Ej: 14:00 HRS">
                </div>

                <div class="form-group">
                    <label>Icono *</label>
                    <input type="hidden" name="icono" id="icono" required>
                    <div class="icon-grid">
                        <div class="icon-option" onclick="selectIcon('fas fa-utensils')">
                            <i class="fas fa-utensils"></i>
                        </div>
                        <div class="icon-option" onclick="selectIcon('fas fa-running')">
                            <i class="fas fa-running"></i>
                        </div>
                        <div class="icon-option" onclick="selectIcon('fas fa-pray')">
                            <i class="fas fa-pray"></i>
                        </div>
                        <div class="icon-option" onclick="selectIcon('fas fa-bible')">
                            <i class="fas fa-bible"></i>
                        </div>
                        <div class="icon-option" onclick="selectIcon('fas fa-heart')">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="icon-option" onclick="selectIcon('fas fa-music')">
                            <i class="fas fa-music"></i>
                        </div>
                        <div class="icon-option" onclick="selectIcon('fas fa-campground')">
                            <i class="fas fa-campground"></i>
                        </div>
                        <div class="icon-option" onclick="selectIcon('fas fa-calendar-day')">
                            <i class="fas fa-calendar-day"></i>
                        </div>
                        <div class="icon-option" onclick="selectIcon('fas fa-birthday-cake')">
                            <i class="fas fa-birthday-cake"></i>
                        </div>
                        <div class="icon-option" onclick="selectIcon('fas fa-hands-helping')">
                            <i class="fas fa-hands-helping"></i>
                        </div>
                        <div class="icon-option" onclick="selectIcon('fas fa-users')">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="icon-option" onclick="selectIcon('fas fa-star')">
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label>Color *</label>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <input type="color" name="color" id="color" class="form-input" required style="width: 100px;" value="#609be8">
                        <div class="color-preview" id="colorPreview" style="background-color: #609be8;"></div>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    <i class="fas fa-save"></i>
                    Guardar Evento
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
            document.getElementById('eventoModal').classList.add('active');
            document.getElementById('modalTitle').textContent = 'Nuevo Evento';
            document.getElementById('formAction').value = 'create';
            document.getElementById('eventoForm').reset();
            document.getElementById('eventoId').value = '';
            document.getElementById('color').value = '#609be8';
            updateColorPreview('#609be8');
            document.querySelectorAll('.icon-option').forEach(el => el.classList.remove('selected'));
        }

        function closeModal() {
            document.getElementById('eventoModal').classList.remove('active');
        }

        function editEvento(evento) {
            document.getElementById('eventoModal').classList.add('active');
            document.getElementById('modalTitle').textContent = 'Editar Evento';
            document.getElementById('formAction').value = 'update';
            document.getElementById('eventoId').value = evento.id;
            document.getElementById('dias').value = evento.dias;
            document.getElementById('mes').value = evento.mes;
            document.getElementById('diaSemana').value = evento.diaSemana;
            document.getElementById('titulo').value = evento.titulo;
            document.getElementById('descripcion').value = evento.descripcion;
            document.getElementById('hora').value = evento.hora;
            document.getElementById('icono').value = evento.icono;
            document.getElementById('color').value = evento.color;
            updateColorPreview(evento.color);
            selectIcon(evento.icono);
        }

        function deleteEvento(id) {
            if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
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

        function selectIcon(iconClass) {
            document.getElementById('icono').value = iconClass;
            document.querySelectorAll('.icon-option').forEach(el => {
                el.classList.remove('selected');
            });
            event.currentTarget.classList.add('selected');
        }

        function updateColorPreview(color) {
            document.getElementById('colorPreview').style.backgroundColor = color;
        }

        document.getElementById('color').addEventListener('input', function(e) {
            updateColorPreview(e.target.value);
        });

        document.getElementById('eventoModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    </script>
</body>
</html>