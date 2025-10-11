<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../admin/conn/conn.php';

try {
    $stmt = $pdo->query("SELECT id, dias, mes, diaSemana, titulo, descripcion, hora, icono, color FROM eventos ORDER BY id ASC");
    $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $eventosActivos = [];
    $mesesMap = [
        'ENE' => 1, 'FEB' => 2, 'MAR' => 3, 'ABR' => 4, 'MAY' => 5, 'JUN' => 6,
        'JUL' => 7, 'AGO' => 8, 'SEP' => 9, 'OCT' => 10, 'NOV' => 11, 'DIC' => 12
    ];
    
    $fechaActual = strtotime(date('Y-m-d'));
    
    foreach ($eventos as $evento) {
        $mesTexto = strtoupper(trim($evento['mes']));
        $mesNum = $mesesMap[$mesTexto] ?? date('n');
        
        $dias = explode('-', $evento['dias']);
        $diaFinal = intval(end($dias));
        
        $año = date('Y');
        $fechaEvento = strtotime("$año-$mesNum-$diaFinal");
        
        if ($fechaEvento < $fechaActual) {
            $deleteStmt = $pdo->prepare("DELETE FROM eventos WHERE id = :id");
            $deleteStmt->execute(['id' => $evento['id']]);
        } else {
            $eventosActivos[] = $evento;
        }
    }
    
    $eventosActivos = array_slice($eventosActivos, 0, 3);
    
    echo json_encode([
        'success' => true,
        'eventos' => $eventosActivos
    ], JSON_UNESCAPED_UNICODE);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al cargar eventos: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>