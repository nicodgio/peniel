<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../admin/conn/conn.php';

try {
    $stmt = $pdo->query("SELECT id, dias, mes, diaSemana, titulo, descripcion, hora, icono, color FROM eventos ORDER BY id ASC LIMIT 3");
    $eventos = $stmt->fetchAll();
    
    echo json_encode([
        'success' => true,
        'eventos' => $eventos
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al cargar eventos: ' . $e->getMessage()
    ]);
}
?>