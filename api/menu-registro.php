<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../admin/conn/conn.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido'
    ]);
    exit;
}

try {
    $config = $pdo->query("SELECT * FROM config_menu WHERE id = 1")->fetch(PDO::FETCH_ASSOC);
    
    if (!$config || !$config['activo']) {
        echo json_encode([
            'success' => false,
            'message' => 'El registro de menú no está disponible en este momento'
        ]);
        exit;
    }
    
    date_default_timezone_set('Europe/Madrid');
    $ahora = new DateTime();
    
    if ($config['fecha_especifica']) {
        $fecha_limite = new DateTime($config['fecha_especifica'] . ' 23:59:59');
        
        if ($ahora > $fecha_limite) {
            echo json_encode([
                'success' => false,
                'message' => 'El plazo para registrarse ha finalizado'
            ]);
            exit;
        }
    } else {
        $diaSemana = (int)$ahora->format('N');
        
        if ($diaSemana == 7) {
            echo json_encode([
                'success' => false,
                'message' => 'El registro cierra los sábados a las 23:59h. Ya no puedes registrarte para este domingo'
            ]);
            exit;
        }
    }
    
    $nombre = trim($_POST['nombre'] ?? '');
    $telefono = trim($_POST['telefono'] ?? '');
    $cantidad = (int)($_POST['cantidad'] ?? 1);
    $forma_pago = trim($_POST['forma_pago'] ?? 'efectivo');
    
    if (empty($nombre) || empty($telefono) || $cantidad < 1) {
        echo json_encode([
            'success' => false,
            'message' => 'Todos los campos son obligatorios'
        ]);
        exit;
    }
    
    if ($cantidad > 10) {
        echo json_encode([
            'success' => false,
            'message' => 'La cantidad máxima es de 10 platos por persona'
        ]);
        exit;
    }
    
    if (!in_array($forma_pago, ['efectivo', 'bizum'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Forma de pago no válida'
        ]);
        exit;
    }
    
    $stmt = $pdo->query("SELECT COALESCE(SUM(cantidad), 0) as total_vendidos FROM menudominical WHERE fecha = CURDATE()");
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
    $total_vendidos = $resultado['total_vendidos'];
    $platos_restantes = $config['platos_disponibles'] - $total_vendidos;
    
    if ($cantidad > $platos_restantes) {
        echo json_encode([
            'success' => false,
            'message' => $platos_restantes > 0 
                ? "Solo quedan {$platos_restantes} platos disponibles" 
                : "Lo sentimos, ya no hay platos disponibles"
        ]);
        exit;
    }
    
    $stmt = $pdo->prepare("INSERT INTO menudominical (nombre, telefono, cantidad, forma_pago, fecha) VALUES (?, ?, ?, ?, CURDATE())");
    $stmt->execute([$nombre, $telefono, $cantidad, $forma_pago]);
    
    if ($forma_pago === 'bizum') {
        $telegram_token = "7956966475:AAHYJZbmtT4CYBMEA8xF-a9oZqX6LEDyKqE";
        $chat_id = "-4925348780";
        
        $platos_texto = $cantidad === 1 ? "plato" : "platos";
        $mensaje = "🍽️ *NUEVO REGISTRO - MENÚ DOMINICAL*\n\n";
        $mensaje .= "👤 *Nombre:* {$nombre}\n";
        $mensaje .= "📱 *Teléfono:* {$telefono}\n";
        $mensaje .= "🍴 *Cantidad:* {$cantidad} {$platos_texto}\n";
        $mensaje .= "💳 *Forma de pago:* Bizum\n";
        $mensaje .= "📅 *Fecha:* " . date('d/m/Y') . "\n";
        
        if (isset($_FILES['comprobante']) && $_FILES['comprobante']['error'] === UPLOAD_ERR_OK) {
            $file_tmp = $_FILES['comprobante']['tmp_name'];
            $file_name = $_FILES['comprobante']['name'];
            $file_type = $_FILES['comprobante']['type'];
            
            $allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!in_array($file_type, $allowed_types)) {
                echo json_encode([
                    'success' => false,
                    'message' => 'El comprobante debe ser una imagen válida'
                ]);
                exit;
            }
            
            $url = "https://api.telegram.org/bot{$telegram_token}/sendPhoto";
            
            $post_fields = [
                'chat_id' => $chat_id,
                'caption' => $mensaje,
                'parse_mode' => 'Markdown',
                'photo' => new CURLFile($file_tmp, $file_type, $file_name)
            ];
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            
            $telegram_response = curl_exec($ch);
            $telegram_data = json_decode($telegram_response, true);
            curl_close($ch);
            
            if (!$telegram_data['ok']) {
                error_log("Error enviando a Telegram: " . $telegram_response);
            }
        } else {
            $url = "https://api.telegram.org/bot{$telegram_token}/sendMessage";
            
            $mensaje .= "\n⚠️ *No se adjuntó comprobante*";
            
            $post_fields = [
                'chat_id' => $chat_id,
                'text' => $mensaje,
                'parse_mode' => 'Markdown'
            ];
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            
            $telegram_response = curl_exec($ch);
            $telegram_data = json_decode($telegram_response, true);
            curl_close($ch);
            
            if (!$telegram_data['ok']) {
                error_log("Error enviando a Telegram: " . $telegram_response);
            }
        }
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Registro exitoso. ¡Te esperamos el domingo!'
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al procesar el registro. Intenta nuevamente.'
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al procesar el registro.'
    ]);
}
?>