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
    // Obtener datos del formulario
    $nombre = trim($_POST['nombre'] ?? '');
    $telefono = trim($_POST['telefono'] ?? '');
    $cantidad = (int)($_POST['cantidad'] ?? 1);
    $forma_pago = trim($_POST['forma_pago'] ?? 'efectivo');
    
    // Validar campos obligatorios
    if (empty($nombre) || empty($telefono) || $cantidad < 1) {
        echo json_encode([
            'success' => false,
            'message' => 'Todos los campos son obligatorios'
        ]);
        exit;
    }
    
    // Validar cantidad máxima
    if ($cantidad > 10) {
        echo json_encode([
            'success' => false,
            'message' => 'La cantidad máxima es de 10 personas'
        ]);
        exit;
    }
    
    // Validar forma de pago
    if (!in_array($forma_pago, ['efectivo', 'bizum'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Forma de pago no válida'
        ]);
        exit;
    }
    
    // Insertar en la base de datos
    $stmt = $pdo->prepare("INSERT INTO menudominical (nombre, telefono, cantidad, forma_pago, fecha) VALUES (?, ?, ?, ?, CURDATE())");
    $stmt->execute([$nombre, $telefono, $cantidad, $forma_pago]);
    
    // Si es Bizum, enviar notificación a Telegram
    if ($forma_pago === 'bizum') {
        // Configuración de Telegram
        $telegram_token = "7956966475:AAHYJZbmtT4CYBMEA8xF-a9oZqX6LEDyKqE";
        $chat_id = "-4925348780";
        
        // Preparar el mensaje
        $personas_texto = $cantidad === 1 ? "persona" : "personas";
        $mensaje = "🍽️ *NUEVO REGISTRO - MENÚ DOMINICAL*\n\n";
        $mensaje .= "👤 *Nombre:* {$nombre}\n";
        $mensaje .= "📱 *Teléfono:* {$telefono}\n";
        $mensaje .= "🍴 *Cantidad:* {$cantidad} {$personas_texto}\n";
        $mensaje .= "💳 *Forma de pago:* Bizum\n";
        $mensaje .= "📅 *Fecha:* " . date('d/m/Y') . "\n";
        
        // Verificar si hay imagen adjunta
        if (isset($_FILES['comprobante']) && $_FILES['comprobante']['error'] === UPLOAD_ERR_OK) {
            $file_tmp = $_FILES['comprobante']['tmp_name'];
            $file_name = $_FILES['comprobante']['name'];
            $file_type = $_FILES['comprobante']['type'];
            
            // Validar que sea una imagen
            $allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!in_array($file_type, $allowed_types)) {
                echo json_encode([
                    'success' => false,
                    'message' => 'El comprobante debe ser una imagen válida'
                ]);
                exit;
            }
            
            // Enviar foto a Telegram con el mensaje como caption
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
            
            // Verificar si el envío fue exitoso
            if (!$telegram_data['ok']) {
                error_log("Error enviando a Telegram: " . $telegram_response);
            }
        } else {
            // Si no hay imagen, enviar solo el mensaje de texto
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