<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../admin/conn/conn.php';

try {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'ID inválido'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    $stmt = $pdo->prepare("
        SELECT id, titulo, autor, fecha_publicacion, descripcion_corta, 
               contenido, imagen_url, categoria, versiculos 
        FROM devocionales 
        WHERE id = :id AND activo = 1
    ");
    
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $devocional = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$devocional) {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Devocional no encontrado'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    // Formatear las fechas
    $fecha = new DateTime($devocional['fecha_publicacion']);
    
    // Meses en español
    $meses = [
        'January' => 'Enero',
        'February' => 'Febrero', 
        'March' => 'Marzo',
        'April' => 'Abril',
        'May' => 'Mayo',
        'June' => 'Junio',
        'July' => 'Julio',
        'August' => 'Agosto',
        'September' => 'Septiembre',
        'October' => 'Octubre',
        'November' => 'Noviembre',
        'December' => 'Diciembre'
    ];
    
    $mes_ingles = $fecha->format('F');
    $mes_espanol = $meses[$mes_ingles];
    
    $devocional['fecha_formateada'] = $fecha->format('d/m/Y');
    $devocional['fecha_completa'] = $fecha->format('d') . ' de ' . $mes_espanol . ' de ' . $fecha->format('Y');
    
    echo json_encode([
        'success' => true,
        'devocional' => $devocional
    ], JSON_UNESCAPED_UNICODE);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al cargar el devocional: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>