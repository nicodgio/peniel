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
    $input = json_decode(file_get_contents('php://input'), true);
    
    $nombre = trim($input['nombre'] ?? '');
    $telefono = trim($input['telefono'] ?? '');
    $cantidad = (int)($input['cantidad'] ?? 1);
    
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
            'message' => 'La cantidad máxima es de 10 personas'
        ]);
        exit;
    }
    
    $stmt = $pdo->prepare("INSERT INTO menudominical (nombre, telefono, cantidad, fecha) VALUES (?, ?, ?, CURDATE())");
    $stmt->execute([$nombre, $telefono, $cantidad]);
    
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
}
?>