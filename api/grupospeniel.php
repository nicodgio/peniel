<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración de Telegram
$bot_token = '7956966475:AAHYJZbmtT4CYBMEA8xF-a9oZqX6LEDyKqE';
$chat_id = '-4892933115';

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
$required_fields = ['nombre', 'telefono', 'fechaNacimiento', 'sexo', 'direccion', 'cp', 'primeraVez', 'conocerMas'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "El campo '$field' es obligatorio"]);
        exit;
    }
}

// Formatear mensaje para Telegram
$mensaje = "🙏 *NUEVO REGISTRO - GRUPOS PENIEL* 🙏\n\n";
$mensaje .= "📋 *DATOS PERSONALES:*\n";
$mensaje .= "👤 *Nombre:* " . $data['nombre'] . "\n";
$mensaje .= "📱 *Teléfono:* " . $data['telefono'] . "\n";
$mensaje .= "📅 *Fecha de nacimiento:* " . $data['fechaNacimiento'] . "\n";
$mensaje .= "⚧ *Sexo:* " . ($data['sexo'] === 'F' ? 'Femenino' : 'Masculino') . "\n\n";

$mensaje .= "🏠 *INFORMACIÓN ADICIONAL:*\n";
$mensaje .= "📍 *Dirección:* " . $data['direccion'] . "\n";
$mensaje .= "📮 *Código Postal:* " . $data['cp'] . "\n";

// Campo opcional
if (!empty($data['invitadoDe'])) {
    $mensaje .= "👥 *Invitado de:* " . $data['invitadoDe'] . "\n";
}

$mensaje .= "⛪ *Primera vez en iglesia evangélica:* " . ($data['primeraVez'] === 'si' ? 'Sí' : 'No') . "\n";
$mensaje .= "📖 *Quiere conocer más de Dios:* " . ($data['conocerMas'] === 'si' ? 'Sí' : 'No') . "\n\n";

// Pedido de oración (opcional)
if (!empty($data['pedidoOracion'])) {
    $mensaje .= "🙏 *PEDIDO DE ORACIÓN:*\n";
    $mensaje .= $data['pedidoOracion'] . "\n\n";
}

$mensaje .= "📅 *Fecha de registro:* " . date('d/m/Y H:i:s') . "\n";
$mensaje .= "-----------------------------------";

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
            'message' => 'Formulario enviado correctamente a Telegram'
        ]);
    } else {
        // Error de Telegram
        http_response_code(500);
        echo json_encode([
            'error' => 'Error de Telegram: ' . $telegram_response['description']
        ]);
    }
} else {
    // Error de conexión
    http_response_code(500);
    echo json_encode([
        'error' => 'Error de conexión con Telegram'
    ]);
}

// Log opcional (para debugging)
$log_data = [
    'timestamp' => date('Y-m-d H:i:s'),
    'data' => $data,
    'telegram_response' => $response,
    'http_code' => $http_code
];

// Descomentar la siguiente línea para guardar logs
// file_put_contents('logs/grupospeniel.log', json_encode($log_data) . "\n", FILE_APPEND);

?>