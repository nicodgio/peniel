<?php
session_start();
require_once '../conn/conn.php';

// Verificar autenticación
if (!isset($_SESSION['admin_user'])) {
    header('Location: ../login.php');
    exit;
}

// Descargar FPDF desde: http://www.fpdf.org/en/download.php
// Descomprime y coloca la carpeta 'fpdf' en tu directorio admin/
require_once 'fpdf/fpdf.php';

try {
    // Obtener todos los registros
    $stmt = $pdo->query("SELECT nombre, telefono, cantidad, forma_pago, fecha FROM menudominical ORDER BY fecha DESC, nombre ASC");
    $registros = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Calcular total de platos
    $totalPlatos = 0;
    $totalEfectivo = 0;
    $totalBizum = 0;
    
    foreach ($registros as $registro) {
        $totalPlatos += $registro['cantidad'];
        if ($registro['forma_pago'] === 'efectivo') {
            $totalEfectivo += $registro['cantidad'];
        } else {
            $totalBizum += $registro['cantidad'];
        }
    }
    
    // Crear PDF
    $pdf = new FPDF('P', 'mm', 'A4');
    $pdf->AddPage();
    $pdf->SetMargins(15, 15, 15);
    
    // Función helper para convertir texto
    function convertText($text) {
        return iconv('UTF-8', 'ISO-8859-1//TRANSLIT', $text);
    }
    
    // Título principal
    $pdf->SetFont('Arial', 'B', 20);
    $pdf->SetTextColor(96, 155, 232);
    $pdf->Cell(0, 10, convertText('MENÚ DOMINICAL'), 0, 1, 'C');
    $pdf->SetFont('Arial', '', 10);
    $pdf->SetTextColor(100, 100, 100);
    $pdf->Cell(0, 6, convertText('Reporte de Registros'), 0, 1, 'C');
    $pdf->Ln(5);
    
    // Fecha del reporte
    $pdf->SetFont('Arial', 'I', 9);
    $pdf->Cell(0, 5, convertText('Generado el: ' . date('d/m/Y H:i')), 0, 1, 'R');
    $pdf->Ln(5);
    
    // ===== RESUMEN GENERAL =====
    $pdf->SetFillColor(96, 155, 232);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(0, 10, convertText('RESUMEN GENERAL'), 0, 1, 'C', true);
    $pdf->Ln(3);
    
    // Cuadros de resumen
    $pdf->SetFont('Arial', 'B', 14);
    $pdf->SetTextColor(0, 0, 0);
    
    // Total de platos
    $pdf->SetFillColor(240, 248, 255);
    $pdf->Cell(60, 15, convertText('TOTAL PLATOS'), 1, 0, 'C', true);
    $pdf->SetFont('Arial', 'B', 20);
    $pdf->SetTextColor(96, 155, 232);
    $pdf->Cell(60, 15, $totalPlatos, 1, 0, 'C');
    $pdf->Ln();
    
    $pdf->Ln(3);
    
    // Detalle por forma de pago
    $pdf->SetFont('Arial', 'B', 11);
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFillColor(230, 230, 230);
    
    $pdf->Cell(60, 8, convertText('Efectivo'), 1, 0, 'L', true);
    $pdf->SetFont('Arial', '', 11);
    $pdf->Cell(60, 8, $totalEfectivo . ' platos', 1, 1, 'C');
    
    $pdf->SetFont('Arial', 'B', 11);
    $pdf->Cell(60, 8, convertText('Bizum'), 1, 0, 'L', true);
    $pdf->SetFont('Arial', '', 11);
    $pdf->Cell(60, 8, $totalBizum . ' platos', 1, 1, 'C');
    
    $pdf->Ln(10);
    
    // ===== LISTADO DETALLADO =====
    $pdf->SetFillColor(96, 155, 232);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(0, 10, convertText('LISTADO DE PERSONAS'), 0, 1, 'C', true);
    $pdf->Ln(3);
    
    // Encabezados de tabla
    $pdf->SetFont('Arial', 'B', 9);
    $pdf->SetFillColor(230, 230, 230);
    $pdf->SetTextColor(0, 0, 0);
    
    $pdf->Cell(70, 8, convertText('Nombre'), 1, 0, 'C', true);
    $pdf->Cell(35, 8, convertText('Teléfono'), 1, 0, 'C', true);
    $pdf->Cell(25, 8, convertText('Platos'), 1, 0, 'C', true);
    $pdf->Cell(25, 8, convertText('Pago'), 1, 0, 'C', true);
    $pdf->Cell(25, 8, convertText('Fecha'), 1, 1, 'C', true);
    
    // Datos de la tabla
    $pdf->SetFont('Arial', '', 8);
    $fill = false;
    
    foreach ($registros as $registro) {
        // Alternar color de fondo
        if ($fill) {
            $pdf->SetFillColor(250, 250, 250);
        } else {
            $pdf->SetFillColor(255, 255, 255);
        }
        
        $pdf->Cell(70, 7, convertText($registro['nombre']), 1, 0, 'L', true);
        $pdf->Cell(35, 7, convertText($registro['telefono']), 1, 0, 'C', true);
        $pdf->Cell(25, 7, $registro['cantidad'], 1, 0, 'C', true);
        
        // Color según forma de pago
        if ($registro['forma_pago'] === 'bizum') {
            $pdf->SetTextColor(0, 150, 0);
            $pdf->Cell(25, 7, 'Bizum', 1, 0, 'C', true);
            $pdf->SetTextColor(0, 0, 0);
        } else {
            $pdf->Cell(25, 7, 'Efectivo', 1, 0, 'C', true);
        }
        
        $pdf->Cell(25, 7, date('d/m/Y', strtotime($registro['fecha'])), 1, 1, 'C', true);
        
        $fill = !$fill;
    }
    
    // Pie de página
    $pdf->Ln(10);
    $pdf->SetFont('Arial', 'I', 8);
    $pdf->SetTextColor(150, 150, 150);
    $pdf->Cell(0, 5, convertText('Iglesia Peniel Madrid - Sistema de Gestión'), 0, 1, 'C');
    
    // Salida del PDF
    $pdf->Output('D', 'menu_dominical_' . date('Y-m-d') . '.pdf');
    
} catch (PDOException $e) {
    die("Error al generar PDF: " . $e->getMessage());
}
?>