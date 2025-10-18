<?php
session_start();
require_once '../conn/conn.php';

if (!isset($_SESSION['admin_user'])) {
    header('Location: ../login.php');
    exit;
}

require_once 'fpdf/fpdf.php';

class PDF extends FPDF {
    function Header() {
        if ($this->PageNo() == 1) {
            $logoPath = __DIR__ . '/logo.png';
            if (file_exists($logoPath)) {
                $this->Image($logoPath, 15, 12, 60);
            }
            $this->Ln(22);
        } else {
            $this->Ln(5);
        }
    }
    
    function Footer() {
        $this->SetY(-12);
        $this->SetFont('Arial', '', 8);
        $this->SetTextColor(120, 120, 120);
        $this->Cell(95, 5, convertText('Iglesia Peniel Madrid'), 0, 0, 'L');
        $this->Cell(95, 5, convertText('Página ') . $this->PageNo(), 0, 0, 'R');
    }
}

function convertText($text) {
    return iconv('UTF-8', 'ISO-8859-1//TRANSLIT', $text);
}

try {
    $stmt = $pdo->query("SELECT nombre, telefono, cantidad, forma_pago, fecha FROM menudominical ORDER BY forma_pago ASC, nombre ASC");
    $registros = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $totalPlatos = 0;
    $totalEfectivo = 0;
    $totalBizum = 0;
    $personasEfectivo = 0;
    $personasBizum = 0;
    
    foreach ($registros as $registro) {
        $totalPlatos += $registro['cantidad'];
        if ($registro['forma_pago'] === 'efectivo') {
            $totalEfectivo += $registro['cantidad'];
            $personasEfectivo++;
        } else {
            $totalBizum += $registro['cantidad'];
            $personasBizum++;
        }
    }
    
    $pdf = new PDF('P', 'mm', 'A4');
    $pdf->AddPage();
    $pdf->SetMargins(15, 15, 15);
    $pdf->SetAutoPageBreak(true, 18);
    
    $pdf->SetFont('Arial', 'B', 20);
    $pdf->SetTextColor(40, 40, 40);
    $pdf->Cell(0, 10, convertText('REPORTE MENÚ DOMINICAL'), 0, 1, 'C');
    
    $pdf->SetFont('Arial', '', 10);
    $pdf->SetTextColor(100, 100, 100);
    $domingoProximo = date('d/m/Y', strtotime('next Sunday'));
    if (date('N') == 7) {
        $domingoProximo = date('d/m/Y');
    }
    $pdf->Cell(0, 5, convertText('Servicio del domingo ' . $domingoProximo), 0, 1, 'C');
    
    $pdf->SetFont('Arial', '', 8);
    $pdf->SetTextColor(140, 140, 140);
    $pdf->Cell(0, 4, convertText('Generado el ' . date('d/m/Y') . ' a las ' . date('H:i')), 0, 1, 'C');
    $pdf->Ln(6);
    
    $pdf->SetDrawColor(200, 200, 200);
    $pdf->Line(15, $pdf->GetY(), 195, $pdf->GetY());
    $pdf->Ln(6);
    
    $boxWidth = 58;
    $boxHeight = 24;
    $startX = 15;
    $startY = $pdf->GetY();
    $spacing = 3;
    
    $pdf->SetDrawColor(220, 220, 220);
    $pdf->SetLineWidth(0.3);
    
    $pdf->SetFillColor(250, 250, 250);
    $pdf->Rect($startX, $startY, $boxWidth, $boxHeight, 'FD');
    $pdf->SetXY($startX, $startY + 4);
    $pdf->SetFont('Arial', '', 9);
    $pdf->SetTextColor(100, 100, 100);
    $pdf->Cell($boxWidth, 4, 'TOTAL PLATOS', 0, 1, 'C');
    $pdf->SetX($startX);
    $pdf->SetFont('Arial', 'B', 22);
    $pdf->SetTextColor(40, 40, 40);
    $pdf->Cell($boxWidth, 10, $totalPlatos, 0, 1, 'C');
    $pdf->SetX($startX);
    $pdf->SetFont('Arial', '', 8);
    $pdf->SetTextColor(120, 120, 120);
    $pdf->Cell($boxWidth, 3, count($registros) . ' personas', 0, 1, 'C');
    
    $pdf->Rect($startX + $boxWidth + $spacing, $startY, $boxWidth, $boxHeight, 'FD');
    $pdf->SetXY($startX + $boxWidth + $spacing, $startY + 4);
    $pdf->SetFont('Arial', '', 9);
    $pdf->SetTextColor(100, 100, 100);
    $pdf->Cell($boxWidth, 4, 'EFECTIVO (cobrar)', 0, 1, 'C');
    $pdf->SetX($startX + $boxWidth + $spacing);
    $pdf->SetFont('Arial', 'B', 22);
    $pdf->SetTextColor(40, 40, 40);
    $pdf->Cell($boxWidth, 10, $totalEfectivo, 0, 1, 'C');
    $pdf->SetX($startX + $boxWidth + $spacing);
    $pdf->SetFont('Arial', '', 8);
    $pdf->SetTextColor(120, 120, 120);
    $pdf->Cell($boxWidth, 3, $personasEfectivo . ' personas', 0, 1, 'C');
    
    $pdf->Rect($startX + ($boxWidth + $spacing) * 2, $startY, $boxWidth, $boxHeight, 'FD');
    $pdf->SetXY($startX + ($boxWidth + $spacing) * 2, $startY + 4);
    $pdf->SetFont('Arial', '', 9);
    $pdf->SetTextColor(100, 100, 100);
    $pdf->Cell($boxWidth, 4, 'BIZUM (pagado)', 0, 1, 'C');
    $pdf->SetX($startX + ($boxWidth + $spacing) * 2);
    $pdf->SetFont('Arial', 'B', 22);
    $pdf->SetTextColor(40, 40, 40);
    $pdf->Cell($boxWidth, 10, $totalBizum, 0, 1, 'C');
    $pdf->SetX($startX + ($boxWidth + $spacing) * 2);
    $pdf->SetFont('Arial', '', 8);
    $pdf->SetTextColor(120, 120, 120);
    $pdf->Cell($boxWidth, 3, $personasBizum . ' personas', 0, 1, 'C');
    
    $pdf->Ln(30);
    
    $pdf->SetDrawColor(200, 200, 200);
    $pdf->Line(15, $pdf->GetY(), 195, $pdf->GetY());
    $pdf->Ln(5);
    
    $pdf->SetFont('Arial', 'B', 11);
    $pdf->SetTextColor(40, 40, 40);
    $pdf->Cell(0, 6, convertText('LISTADO DE PERSONAS'), 0, 1, 'L');
    $pdf->Ln(2);
    
    $registrosEfectivo = array_filter($registros, function($r) { return $r['forma_pago'] === 'efectivo'; });
    $registrosBizum = array_filter($registros, function($r) { return $r['forma_pago'] === 'bizum'; });
    
    $efectivoArr = array_values($registrosEfectivo);
    $bizumArr = array_values($registrosBizum);
    
    $pdf->SetDrawColor(220, 220, 220);
    $pdf->SetLineWidth(0.2);
    
    $pdf->SetFont('Arial', 'B', 8);
    $pdf->SetFillColor(245, 245, 245);
    $pdf->SetTextColor(60, 60, 60);
    $pdf->Cell(65, 6, convertText('EFECTIVO - Cobrar'), 1, 0, 'C', true);
    $pdf->Cell(20, 6, convertText('Platos'), 1, 0, 'C', true);
    $pdf->Cell(5, 6, '', 0, 0, 'C');
    $pdf->Cell(65, 6, convertText('BIZUM - Verificar Telegram'), 1, 0, 'C', true);
    $pdf->Cell(25, 6, convertText('Platos'), 1, 1, 'C', true);
    
    $pdf->SetFont('Arial', '', 8);
    $pdf->SetTextColor(40, 40, 40);
    
    $maxRows = max(count($efectivoArr), count($bizumArr));
    
    for ($i = 0; $i < $maxRows; $i++) {
        $fill = ($i % 2 == 1);
        
        if ($fill) {
            $pdf->SetFillColor(252, 252, 252);
        } else {
            $pdf->SetFillColor(255, 255, 255);
        }
        
        if (isset($efectivoArr[$i])) {
            $pdf->Cell(65, 5, convertText($efectivoArr[$i]['nombre']), 1, 0, 'L', true);
            $pdf->SetFont('Arial', 'B', 8);
            $pdf->Cell(20, 5, $efectivoArr[$i]['cantidad'], 1, 0, 'C', true);
            $pdf->SetFont('Arial', '', 8);
        } else {
            $pdf->Cell(65, 5, '', 1, 0, 'L', true);
            $pdf->Cell(20, 5, '', 1, 0, 'C', true);
        }
        
        $pdf->Cell(5, 5, '', 0, 0, 'C');
        
        if (isset($bizumArr[$i])) {
            $pdf->Cell(65, 5, convertText($bizumArr[$i]['nombre']), 1, 0, 'L', true);
            $pdf->SetFont('Arial', 'B', 8);
            $pdf->Cell(25, 5, $bizumArr[$i]['cantidad'], 1, 1, 'C', true);
            $pdf->SetFont('Arial', '', 8);
        } else {
            $pdf->Cell(65, 5, '', 1, 0, 'L', true);
            $pdf->Cell(25, 5, '', 1, 1, 'C', true);
        }
    }
    
    if ($pdf->GetY() > 250) {
        $pdf->AddPage();
    }
    
    $pdf->Ln(8);
    $pdf->SetFont('Arial', 'B', 9);
    $pdf->SetTextColor(40, 40, 40);
    $pdf->Cell(0, 5, convertText('INSTRUCCIONES:'), 0, 1, 'L');
    $pdf->Ln(1);
    
    $pdf->SetFont('Arial', '', 8);
    $pdf->SetTextColor(60, 60, 60);
    $pdf->MultiCell(0, 4, convertText(
        "1. Preparar el total de " . $totalPlatos . " platos.\n\n" .
        "2. EFECTIVO: Cobrar a las " . $personasEfectivo . " personas listadas en la columna izquierda al momento de entregar.\n\n" .
        "3. BIZUM: Las " . $personasBizum . " personas de la columna derecha ya pagaron. Verificar comprobante en Telegram si es necesario.\n\n" .
        "4. Entregar la cantidad exacta de platos indicada para cada persona."
    ), 0, 'L');
    
    $pdf->Output('D', 'menu_dominical_' . date('Y-m-d') . '.pdf');
    
} catch (PDOException $e) {
    die("Error al generar PDF: " . $e->getMessage());
}
?>