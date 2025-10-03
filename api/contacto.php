<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración de Telegram
$bot_token = '7956966475:AAHYJZbmtT4CYBMEA8xF-a9oZqX6LEDyKqE';
$chat_id = '-4659088059'; // Chat ID diferente para contacto

// Verificar que sea una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// Obtener datos JSON del cuerpo de la petición
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validar que se recibieron datos
if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'No se recibieron datos válidos']);
    exit;
}

// Validar campos obligatorios
$required_fields = ['nombre', 'email', 'asunto', 'mensaje'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "El campo '$field' es obligatorio"]);
        exit;
    }
}

// Validar formato de email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'El formato del email no es válido']);
    exit;
}

// Formatear mensaje para Telegram
$mensaje = "📬 *NUEVO MENSAJE DE CONTACTO* 📬\n\n";
$mensaje .= "👤 *DATOS DEL REMITENTE:*\n";
$mensaje .= "📝 *Nombre:* " . $data['nombre'] . "\n";
$mensaje .= "✉️ *Email:* " . $data['email'] . "\n";

// Teléfono es opcional
if (!empty($data['telefono'])) {
    $mensaje .= "📱 *Teléfono:* " . $data['telefono'] . "\n";
}

$mensaje .= "\n🎯 *ASUNTO:*\n";

// Mapear el asunto a texto más legible
$asuntos = [
    'primera-visita' => '🆕 Primera visita',
    'consejeria' => '🤝 Consejería pastoral',
    'grupos' => '👥 Grupos Peniel',
    'ministerios' => '⛪ Ministerios',
    'oracion' => '🙏 Pedido de oración',
    'informacion' => 'ℹ️ Información general',
    'otro' => '📋 Otro'
];

$asunto_texto = isset($asuntos[$data['asunto']]) ? $asuntos[$data['asunto']] : $data['asunto'];
$mensaje .= $asunto_texto . "\n\n";

$mensaje .= "💬 *MENSAJE:*\n";
$mensaje .= "-----------------------------------\n";
$mensaje .= $data['mensaje'] . "\n";
$mensaje .= "-----------------------------------\n\n";

$mensaje .= "📅 *Fecha de recepción:* " . date('d/m/Y H:i:s') . "\n";
$mensaje .= "🌐 *IP del remitente:* " . $_SERVER['REMOTE_ADDR'] . "\n";

// Preparar datos para enviar a Telegram
$telegram_data = [
    'chat_id' => $chat_id,
    'text' => $mensaje,
    'parse_mode' => 'Markdown'
];

// Enviar mensaje a Telegram
$url = "https://api.telegram.org/bot$bot_token/sendMessage";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($telegram_data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Verificar respuesta de Telegram
if ($http_code === 200) {
    $telegram_response = json_decode($response, true);
    
    if ($telegram_response['ok']) {
        // Éxito
        echo json_encode([
            'success' => true,
            'message' => 'Mensaje enviado correctamente'
        ]);
    } else {
        // Error de Telegram
        http_response_code(500);
        echo json_encode([
            'error' => 'Error al enviar el mensaje: ' . $telegram_response['description']
        ]);
    }
} else {
    // Error de conexión
    http_response_code(500);
    echo json_encode([
        'error' => 'Error de conexión con el servidor'
    ]);
}

// Log opcional (para debugging)
$log_data = [
    'timestamp' => date('Y-m-d H:i:s'),
    'data' => $data,
    'telegram_response' => $response,
    'http_code' => $http_code,
    'ip' => $_SERVER['REMOTE_ADDR']
];
?>