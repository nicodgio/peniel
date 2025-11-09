<?php
session_start();
require_once '../conn/conn.php';

if (!isset($_SESSION['admin_user'])) {
    header('Location: ../login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        if ($_POST['action'] === 'actualizar_config') {
            try {
                $platos_disponibles = (int)$_POST['platos_disponibles'];
                $fecha_especifica = !empty($_POST['fecha_especifica']) ? $_POST['fecha_especifica'] : null;
                
                $stmt = $pdo->prepare("UPDATE config_menu SET platos_disponibles = ?, fecha_especifica = ? WHERE id = 1");
                $stmt->execute([$platos_disponibles, $fecha_especifica]);
                
                if ($fecha_especifica) {
                    $fecha_obj = new DateTime($fecha_especifica);
                    $success_message = "Configuración actualizada. Fecha límite: " . $fecha_obj->format('d/m/Y');
                } else {
                    $success_message = "Configuración actualizada. Modo: Vencimiento semanal (cada domingo)";
                }
            } catch (PDOException $e) {
                $error_message = "Error al actualizar la configuración: " . $e->getMessage();
            }
        } elseif ($_POST['action'] === 'eliminar_registro') {
            try {
                $id = (int)$_POST['id'];
                $stmt = $pdo->prepare("DELETE FROM menudominical WHERE id = ?");
                $stmt->execute([$id]);
                
                $success_message = "Registro eliminado correctamente";
            } catch (PDOException $e) {
                $error_message = "Error al eliminar el registro: " . $e->getMessage();
            }
        }
    }
}

function limpiarRegistrosAntiguos($pdo) {
    try {
        $config = $pdo->query("SELECT fecha_especifica FROM config_menu WHERE id = 1")->fetch(PDO::FETCH_ASSOC);
        
        if ($config['fecha_especifica']) {
            $fecha_limite_obj = new DateTime($config['fecha_especifica'] . ' 23:59:59');
            $ahora = new DateTime();
            
            if ($ahora > $fecha_limite_obj) {
                $stmt = $pdo->prepare("DELETE FROM menudominical WHERE fecha <= ?");
                $stmt->execute([$config['fecha_especifica']]);
                return $stmt->rowCount();
            }
        } else {
            $hoy = new DateTime();
            $diaSemana = (int)$hoy->format('N');
            
            if ($diaSemana >= 1) {
                $ultimoDomingo = clone $hoy;
                if ($diaSemana == 7) {
                    $ultimoDomingo->modify('today');
                } else {
                    $ultimoDomingo->modify('last Sunday');
                }
                
                $fechaLimite = $ultimoDomingo->format('Y-m-d 23:59:59');
                
                $stmt = $pdo->prepare("DELETE FROM menudominical WHERE fecha <= ?");
                $stmt->execute([$fechaLimite]);
                
                return $stmt->rowCount();
            }
        }
        return 0;
    } catch (Exception $e) {
        error_log("Error al limpiar registros antiguos: " . $e->getMessage());
        return 0;
    }
}

$registrosEliminados = limpiarRegistrosAntiguos($pdo);

try {
    $config = $pdo->query("SELECT * FROM config_menu WHERE id = 1")->fetch(PDO::FETCH_ASSOC);
    
    if (!$config) {
        $pdo->exec("INSERT INTO config_menu (platos_disponibles, fecha_especifica, activo) VALUES (50, NULL, 1)");
        $config = $pdo->query("SELECT * FROM config_menu WHERE id = 1")->fetch(PDO::FETCH_ASSOC);
    }
    
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM menudominical");
    $totalMenus = $stmt->fetch()['total'];
    
    $stmt = $pdo->query("SELECT id, nombre, telefono, cantidad, forma_pago, fecha FROM menudominical ORDER BY fecha DESC");
    $menus = $stmt->fetchAll();
    
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
        * {
            box-sizing: border-box;
        }

        .header-actions {
            display: flex;
            gap: 12px;
            align-items: center;
            flex-wrap: wrap;
        }

        .action-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
            font-size: 0.95rem;
        }

        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .action-btn.export {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
        }

        .action-btn.export:hover {
            box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
        }

        .action-btn.config {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .action-btn.config:hover {
            box-shadow: 0 6px 20px rgba(240, 147, 251, 0.4);
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 25px;
            border-radius: 15px;
            color: white;
            text-align: center;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            transition: all 0.3s;
        }

        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }

        .stat-card.efectivo {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .stat-card.bizum {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .stat-card.disponibles {
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        }

        .stat-number {
            font-size: 2.8rem;
            font-weight: 900;
            margin: 10px 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .stat-label {
            font-size: 0.95rem;
            opacity: 0.95;
            font-weight: 500;
        }

        .message-box {
            padding: 15px 20px;
            border-radius: 12px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
        }

        .message-box.success {
            background: linear-gradient(135deg, rgba(74, 222, 128, 0.15), rgba(16, 185, 129, 0.15));
            color: #059669;
            border: 2px solid rgba(16, 185, 129, 0.3);
        }

        .message-box.error {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.15));
            color: #dc2626;
            border: 2px solid rgba(220, 38, 38, 0.3);
        }

        .message-box.info {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.15));
            color: #2563eb;
            border: 2px solid rgba(37, 99, 235, 0.3);
        }

        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.85);
            z-index: 10000;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .modal-overlay.active {
            display: flex;
        }

        .modal-box {
            background: #1a1d2e;
            border-radius: 20px;
            width: 100%;
            max-width: 500px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            overflow: hidden;
            border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .modal-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px 30px;
            font-size: 1.3rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .modal-body {
            padding: 30px;
            background: #1a1d2e;
        }

        .form-group {
            margin-bottom: 25px;
        }

        .form-group label {
            display: block;
            font-weight: 600;
            color: #e2e8f0;
            margin-bottom: 8px;
            font-size: 0.95rem;
        }

        .form-group label i {
            margin-right: 8px;
            color: #667eea;
        }

        .form-group input {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid #2d3748;
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.3s;
            font-family: 'Montserrat', sans-serif;
            background: #0f1117;
            color: #e2e8f0;
        }

        .form-group input[type="date"] {
            cursor: pointer;
            position: relative;
        }

        .form-group input[type="date"]::-webkit-calendar-picker-indicator {
            cursor: pointer;
            border-radius: 4px;
            margin-right: 2px;
            opacity: 0.8;
            filter: invert(0.8);
        }

        .form-group input[type="date"]::-webkit-calendar-picker-indicator:hover {
            opacity: 1;
        }

        .form-group input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
        }

        .modal-footer {
            padding: 20px 30px;
            background: #151823;
            display: flex;
            gap: 12px;
            justify-content: flex-end;
        }

        .modal-btn {
            padding: 12px 28px;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 0.95rem;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .modal-btn.primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .modal-btn.primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .modal-btn.secondary {
            background: #2d3748;
            color: #e2e8f0;
            border: 1px solid #4a5568;
        }

        .modal-btn.secondary:hover {
            background: #4a5568;
        }

        .modal-btn.danger {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
        }

        .modal-btn.danger:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
        }

        .delete-btn {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            padding: 8px 16px;
            border: none;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .delete-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
        }

        .confirm-modal .modal-body {
            text-align: center;
            padding: 40px 30px;
            background: #1a1d2e;
        }

        .confirm-modal .icon-warning {
            font-size: 4rem;
            color: #ef4444;
            margin-bottom: 20px;
        }

        .confirm-modal h3 {
            font-size: 1.4rem;
            margin-bottom: 15px;
            color: #e2e8f0;
        }

        .confirm-modal p {
            color: #94a3b8;
            font-size: 1rem;
            line-height: 1.6;
        }

        .table-actions {
            display: flex;
            gap: 8px;
            justify-content: center;
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
                    <button type="button" class="action-btn config" id="btnConfig">
                        <i class="fas fa-cog"></i>
                        Configuración
                    </button>
                    <a href="export-menu-pdf.php" class="action-btn export" target="_blank">
                        <i class="fas fa-file-pdf"></i>
                        Exportar PDF
                    </a>
                    <a href="dashboard.php" class="btn back-btn">
                        <i class="fas fa-arrow-left"></i>
                        Volver
                    </a>
                </div>
            </div>

            <?php if (isset($success_message)): ?>
                <div class="message-box success">
                    <i class="fas fa-check-circle"></i>
                    <span><?php echo htmlspecialchars($success_message); ?></span>
                </div>
            <?php endif; ?>

            <?php if (isset($error_message)): ?>
                <div class="message-box error">
                    <i class="fas fa-exclamation-circle"></i>
                    <span><?php echo htmlspecialchars($error_message); ?></span>
                </div>
            <?php endif; ?>

            <?php if ($registrosEliminados > 0): ?>
                <div class="message-box info">
                    <i class="fas fa-info-circle"></i>
                    <span>Se eliminaron <?php echo $registrosEliminados; ?> registro(s) automáticamente</span>
                </div>
            <?php endif; ?>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">TOTAL PLATOS VENDIDOS</div>
                    <div class="stat-number"><?php echo number_format($totalPlatos); ?></div>
                    <div class="stat-label"><?php echo $totalMenus; ?> personas registradas</div>
                </div>
                
                <div class="stat-card disponibles">
                    <div class="stat-label">PLATOS DISPONIBLES</div>
                    <div class="stat-number"><?php echo number_format($config['platos_disponibles'] - $totalPlatos); ?></div>
                    <div class="stat-label">de <?php echo $config['platos_disponibles']; ?> totales</div>
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
                                    <th>Acciones</th>
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
                                                <?php echo htmlspecialchars($menu['cantidad']); ?> platos
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
                                        <td>
                                            <div class="table-actions">
                                                <button type="button" class="delete-btn" onclick="confirmarEliminacion(<?php echo $menu['id']; ?>, '<?php echo htmlspecialchars($menu['nombre']); ?>')">
                                                    <i class="fas fa-trash"></i> Eliminar
                                                </button>
                                            </div>
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

    <div id="configModal" class="modal-overlay">
        <div class="modal-box">
            <div class="modal-header">
                <i class="fas fa-cog"></i>
                Configuración del Menú
            </div>
            <form method="POST">
                <input type="hidden" name="action" value="actualizar_config">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="platos_disponibles">
                            <i class="fas fa-pizza-slice"></i>
                            Platos Disponibles
                        </label>
                        <input 
                            type="number" 
                            id="platos_disponibles" 
                            name="platos_disponibles" 
                            value="<?php echo htmlspecialchars($config['platos_disponibles']); ?>"
                            min="1"
                            required
                        >
                    </div>
                    
                    <div class="form-group">
                        <label for="fecha_especifica">
                            <i class="fas fa-calendar-alt"></i>
                            Fecha Específica (Opcional)
                        </label>
                        <div style="display: flex; gap: 10px; align-items: stretch;">
                            <input 
                                type="date" 
                                id="fecha_especifica" 
                                name="fecha_especifica" 
                                value="<?php echo htmlspecialchars($config['fecha_especifica'] ?? ''); ?>"
                                style="flex: 1; cursor: pointer;"
                            >
                            <button 
                                type="button" 
                                id="btnLimpiarFecha"
                                class="modal-btn secondary"
                                style="padding: 12px 20px; margin: 0; white-space: nowrap;"
                                title="Limpiar fecha y volver a modo semanal"
                            >
                                <i class="fas fa-times"></i>
                                Limpiar
                            </button>
                        </div>
                    </div>
                    
                    <div style="background: rgba(102, 126, 234, 0.1); padding: 15px; border-radius: 10px; border: 1px solid rgba(102, 126, 234, 0.3);">
                        <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 0.9rem;">
                            <i class="fas fa-info-circle" style="color: #667eea;"></i>
                            <strong>Modo de vencimiento:</strong>
                        </p>
                        <p style="margin: 0 0 8px 0; color: #e2e8f0; font-size: 0.88rem;">
                            • <strong>Sin fecha:</strong> Los registros vencen cada domingo automáticamente
                        </p>
                        <p style="margin: 0; color: #e2e8f0; font-size: 0.88rem;">
                            • <strong>Con fecha:</strong> Todos los registros vencen en la fecha especificada
                        </p>
                        <?php if ($config['fecha_especifica']): ?>
                        <p style="margin: 15px 0 0 0; color: #4ade80; font-weight: 600; font-size: 0.95rem;">
                            <i class="fas fa-calendar-check"></i>
                            Fecha límite actual: 
                            <?php 
                            $fecha_obj = new DateTime($config['fecha_especifica']);
                            echo $fecha_obj->format('d/m/Y');
                            ?>
                        </p>
                        <?php else: ?>
                        <p style="margin: 15px 0 0 0; color: #4ade80; font-weight: 600; font-size: 0.95rem;">
                            <i class="fas fa-sync-alt"></i>
                            Modo activo: Vencimiento semanal (cada domingo)
                        </p>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="modal-btn secondary" id="btnCerrarConfig">
                        <i class="fas fa-times"></i>
                        Cancelar
                    </button>
                    <button type="submit" class="modal-btn primary">
                        <i class="fas fa-save"></i>
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    </div>

    <div id="deleteModal" class="modal-overlay confirm-modal">
        <div class="modal-box">
            <div class="modal-body">
                <div class="icon-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Confirmar Eliminación</h3>
                <p id="deleteMessage"></p>
            </div>
            <form method="POST">
                <input type="hidden" name="action" value="eliminar_registro">
                <input type="hidden" name="id" id="deleteId">
                <div class="modal-footer">
                    <button type="button" class="modal-btn secondary" id="btnCerrarDelete">
                        <i class="fas fa-times"></i>
                        Cancelar
                    </button>
                    <button type="submit" class="modal-btn danger">
                        <i class="fas fa-trash"></i>
                        Eliminar Registro
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        const configModal = document.getElementById('configModal');
        const deleteModal = document.getElementById('deleteModal');
        const btnConfig = document.getElementById('btnConfig');
        const btnCerrarConfig = document.getElementById('btnCerrarConfig');
        const btnCerrarDelete = document.getElementById('btnCerrarDelete');
        const btnLimpiarFecha = document.getElementById('btnLimpiarFecha');
        const inputFecha = document.getElementById('fecha_especifica');

        btnConfig.addEventListener('click', function() {
            configModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        btnCerrarConfig.addEventListener('click', function() {
            configModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        btnCerrarDelete.addEventListener('click', function() {
            deleteModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        btnLimpiarFecha.addEventListener('click', function() {
            inputFecha.value = '';
        });

        configModal.addEventListener('click', function(e) {
            if (e.target === configModal) {
                configModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        deleteModal.addEventListener('click', function(e) {
            if (e.target === deleteModal) {
                deleteModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        function confirmarEliminacion(id, nombre) {
            document.getElementById('deleteId').value = id;
            document.getElementById('deleteMessage').textContent = '¿Estás seguro de que deseas eliminar el registro de ' + nombre + '?';
            deleteModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        setTimeout(function() {
            const messages = document.querySelectorAll('.message-box');
            messages.forEach(function(message) {
                message.style.transition = 'opacity 0.5s, transform 0.5s';
                message.style.opacity = '0';
                message.style.transform = 'translateY(-10px)';
                setTimeout(function() {
                    message.remove();
                }, 500);
            });
        }, 5000);
    </script>
</body>
</html>