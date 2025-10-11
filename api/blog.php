<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../admin/conn/conn.php';

try {
    // Parámetros opcionales para paginación y filtros
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
    $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
    $categoria = isset($_GET['categoria']) ? $_GET['categoria'] : null;
    
    // Construcción de la query base
    $query = "SELECT id, titulo, autor, fecha_publicacion, descripcion_corta, imagen_url, categoria, versiculos 
              FROM devocionales 
              WHERE activo = 1";
    
    // Filtro por categoría si se especifica
    if ($categoria) {
        $query .= " AND categoria = :categoria";
    }
    
    $query .= " ORDER BY fecha_publicacion DESC LIMIT :limit OFFSET :offset";
    
    $stmt = $pdo->prepare($query);
    
    // Bind de parámetros
    if ($categoria) {
        $stmt->bindParam(':categoria', $categoria, PDO::PARAM_STR);
    }
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    
    $stmt->execute();
    $devocionales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Obtener el total de registros para paginación
    $countQuery = "SELECT COUNT(*) as total FROM devocionales WHERE activo = 1";
    if ($categoria) {
        $countQuery .= " AND categoria = :categoria";
    }
    
    $countStmt = $pdo->prepare($countQuery);
    if ($categoria) {
        $countStmt->bindParam(':categoria', $categoria, PDO::PARAM_STR);
    }
    $countStmt->execute();
    $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    // Formatear las fechas para mejor legibilidad
    foreach ($devocionales as &$devocional) {
        $fecha = new DateTime($devocional['fecha_publicacion']);
        $devocional['fecha_formateada'] = $fecha->format('d/m/Y');
        $devocional['fecha_completa'] = $fecha->format('d \d\e F \d\e Y');
    }
    
    echo json_encode([
        'success' => true,
        'devocionales' => $devocionales,
        'total' => intval($total),
        'limit' => $limit,
        'offset' => $offset
    ], JSON_UNESCAPED_UNICODE);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al cargar devocionales: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>