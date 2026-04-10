<?php
// backend/api/contact.php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

// 1. Configuración de cabeceras para CORS y JSON
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Lista de dominios que tienen permiso para usar esta API
$allowedOrigins = [
    'http://localhost:5173',       // Para tus pruebas en local con Vite
    'http://localhost:4173',       // Para pruebas locales de build
    'https://www.toscamare.es',    // Tu dominio en producción (Ionos)
    'https://toscamare.es'         // Tu dominio sin 'www'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Si es una petición OPTIONS (Preflight de CORS), terminamos aquí
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. Asegurarse de que es una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// 3. Capturar el Body JSON
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Cuerpo JSON inválido']);
    exit;
}

// 4. Validaciones Anti-bot
// Honeypot
if (!empty($data['website'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Error de validación']);
    exit;
}

// Filtro de tiempo mínimo
$formLoadTime = isset($data['formLoadTime']) ? (int)$data['formLoadTime'] : 0;
// En PHP time() devuelve segundos, JS Date.now() devuelve milisegundos.
$currentTimeMillis = round(microtime(true) * 1000);
if ($formLoadTime > 0 && ($currentTimeMillis - $formLoadTime) < 1000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Por favor, tómate un momento para completar el formulario']);
    exit;
}

// 5. Cargar configuración destino
$config = require __DIR__ . '/config.php';

// Limpieza de inputs
function sanitize($str) {
    if (!$str) return '';
    return trim(strip_tags($str));
}

$formType = isset($data['formType']) ? sanitize($data['formType']) : 'contacto';
$fullName = isset($data['fullName']) ? sanitize($data['fullName']) : '';
$companyName = isset($data['companyName']) ? sanitize($data['companyName']) : '';
$email = isset($data['email']) ? filter_var(sanitize($data['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($data['phone']) ? sanitize($data['phone']) : '';
$subject = isset($data['subject']) ? sanitize($data['subject']) : '';
$messageText = isset($data['message']) ? sanitize($data['message']) : '';
$selectedProducts = isset($data['selectedProducts']) && is_array($data['selectedProducts']) ? $data['selectedProducts'] : [];
$deliveryMethod = isset($data['deliveryMethod']) ? sanitize($data['deliveryMethod']) : '';
$selectedStore = isset($data['selectedStore']) ? sanitize($data['selectedStore']) : '';

// Validar obligatorios
if (empty($fullName) || empty($email) || empty($subject) || empty($messageText)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Todos los campos obligatorios son requeridos']);
    exit;
}

$isPedido = ($formType === 'pedidos');
$targetEmail = $isPedido ? $config['pedidos']['email_destino'] : $config['contacto']['email_destino'];
$senderPass = $isPedido ? $config['pedidos']['password'] : $config['contacto']['password'];

// 6. Construcción del Email
$mailSubject = $isPedido ? "NUEVO PEDIDO: $fullName" : "Nuevo mensaje de contacto: $subject";

// Formatear el HTML
$accentColor = "#005bb7";
$title = $isPedido ? "Nuevo Pedido" : "Consulta de Contacto";

$productsHtml = "";
if ($isPedido && !empty($selectedProducts)) {
    $rows = "";
    foreach ($selectedProducts as $p) {
        $qty = htmlspecialchars($p['quantity']);
        $unit = htmlspecialchars(isset($p['unit']) ? $p['unit'] : 'Uds');
        $pname = htmlspecialchars($p['name']);
        $noteHtml = !empty($p['note']) ? '<div style="font-size:12px; color:#64748b; margin-top:4px;">Nota: ' . htmlspecialchars($p['note']) . '</div>' : '';
        
        $rows .= "
        <tr>
            <td style=\"padding:10px 0; border-bottom:1px solid #f1f5f9; color:{$accentColor}; font-weight:700; width:100px; vertical-align:top;\">{$qty} {$unit}</td>
            <td style=\"padding:10px 0; border-bottom:1px solid #f1f5f9; color:#334155;\">
                <div style=\"font-weight:600;\">{$pname}</div>
                {$noteHtml}
            </td>
        </tr>";
    }

    $productsHtml = "
    <div style=\"margin-bottom:20px; padding:20px; background:#f8fbff; border-radius:12px; border:1px solid #e1e8f0;\">
        <div style=\"font-weight:700; color:{$accentColor}; font-size:13px; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px; border-bottom:1px solid #e1e8f0; padding-bottom:8px;\">
            Contenido del Pedido
        </div>
        <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-size:14px;\">
            {$rows}
        </table>
    </div>";
}

$companyHtml = $companyName ? "<span style=\"color:#64748b; font-weight:400; font-size:14px;\">— " . htmlspecialchars($companyName) . "</span>" : "";
$phoneHtml = $phone ? "
<div style=\"flex:1; padding:15px; background:#fcfcfc; border-radius:12px; border:1px solid #f1f5f9; margin-left:15px;\">
    <div style=\"font-weight:700; color:{$accentColor}; font-size:10px; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;\">Teléfono</div>
    <div style=\"color:#1e293b; font-size:14px;\">" . htmlspecialchars($phone) . "</div>
</div>" : "";

$deliveryStr = ($deliveryMethod === 'domicilio') ? "🚚 Envío a domicilio" : "🏪 Recoger en tienda: " . htmlspecialchars($selectedStore ? $selectedStore : "No especificada");
$specificHtml = $isPedido ? "
<div style=\"margin-bottom:20px; padding:18px; background:#f0f7ff; border-radius:12px; border:1px solid #d1e5ff;\">
    <div style=\"font-weight:700; color:{$accentColor}; font-size:11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;\">Método de Entrega</div>
    <div style=\"color:#1e293b; font-size:15px; font-weight:600;\">{$deliveryStr}</div>
</div>" : "
<div style=\"margin-bottom:20px; padding:18px; background:#fcfcfc; border-radius:12px; border:1px solid #f1f5f9;\">
    <div style=\"font-weight:700; color:{$accentColor}; font-size:11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;\">Asunto</div>
    <div style=\"color:#1e293b; font-size:15px;\">" . htmlspecialchars($subject) . "</div>
</div>";

$messageTitle = $isPedido ? "Observaciones del Pedido" : "Contenido del Mensaje";
$safeMessage = nl2br(htmlspecialchars($messageText));

$htmlBody = "
<!DOCTYPE html>
<html lang=\"es\">
<head>
  <meta charset=\"UTF-8\">
</head>
<body style=\"margin:0; padding:0; background-color:#fafafa; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;\">
  <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color:#fafafa; padding:30px 0;\">
    <tr>
      <td align=\"center\">
        <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.05);\">
          <tr>
            <td style=\"background:linear-gradient(135deg, {$accentColor} 0%, #7fbaf5 100%); padding:50px 30px; text-align:center;\">
              <h1 style=\"margin:0; color:#ffffff; font-size:26px; font-weight:800; letter-spacing:0.5px;\">{$title}</h1>
              <p style=\"margin:10px 0 0; color:rgba(255,255,255,0.9); font-size:14px;\">Notificación oficial - Toscamare</p>
            </td>
          </tr>
          <tr>
            <td style=\"padding:40px 30px;\">
              <div style=\"margin-bottom:20px; padding:18px; background:#fcfcfc; border-radius:12px; border:1px solid #f1f5f9;\">
                <div style=\"font-weight:700; color:{$accentColor}; font-size:11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;\">Información del Cliente</div>
                <div style=\"color:#1e293b; font-size:16px; font-weight:500;\">" . htmlspecialchars($fullName) . " {$companyHtml}</div>
              </div>
              <div style=\"display:flex; margin-bottom:20px;\">
                <div style=\"flex:1; padding:15px; background:#fcfcfc; border-radius:12px; border:1px solid #f1f5f9;\">
                  <div style=\"font-weight:700; color:{$accentColor}; font-size:10px; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;\">Email</div>
                  <div style=\"color:#1e293b; font-size:14px;\"><a href=\"mailto:{$email}\" style=\"color:{$accentColor}; text-decoration:none;\">{$email}</a></div>
                </div>
                {$phoneHtml}
              </div>
              {$specificHtml}
              {$productsHtml}
              <div style=\"margin-bottom:30px; padding:20px; background:#fcfcfc; border-radius:12px; border:1px solid #f1f5f9;\">
                <div style=\"font-weight:700; color:{$accentColor}; font-size:11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;\">{$messageTitle}</div>
                <div style=\"color:#334155; font-size:15px; line-height:1.6;\">{$safeMessage}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td style=\"text-align:center; padding:20px; color:#9ca3af; font-size:11px; border-top:1px solid #f3f4f6; background-color: #fafbfc;\">
              <p style=\"margin:0 0 5px 0;\">TOSCAMARE - Gestión Automática de Formularios Web</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
";

// 7. Enviar Correo usando PHPMailer
$mail = new PHPMailer(true);

try {
    // Configuración del servidor
    $mail->isSMTP();
    $mail->Host       = $config['smtp']['host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $targetEmail;
    $mail->Password   = $senderPass;
    $mail->SMTPSecure = $config['smtp']['encryption'] === 'tls' ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = $config['smtp']['port'];
    $mail->CharSet    = 'UTF-8';

    // Para evitar errores de certificado SSL en local si fuera necesario:
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    // Destinatarios
    $mail->setFrom($targetEmail, 'Toscamare Web');
    $mail->addAddress($targetEmail);     
    $mail->addReplyTo($email, $fullName);

    // Contenido
    $mail->isHTML(true);
    $mail->Subject = $mailSubject;
    $mail->Body    = $htmlBody;
    $mail->AltBody = strip_tags($htmlBody);

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente']);
} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => "Error al enviar el correo: {$e->getMessage()}"]);
}
