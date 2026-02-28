<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$packageId = intval($input['packageId'] ?? 0);
$lang = trim($input['lang'] ?? 'ar');

$packagesJson = file_get_contents(__DIR__ . '/packages.json');
$packages = json_decode($packagesJson, true);

$selectedPackage = null;
foreach ($packages as $pkg) {
    if ($pkg['id'] === $packageId) {
        $selectedPackage = $pkg;
        break;
    }
}

if (!$selectedPackage) {
    http_response_code(404);
    echo json_encode(['error' => 'Package not found']);
    exit;
}

$isAr = $lang === 'ar';
$isFr = $lang === 'fr';

if ($isAr) {
    $pkgName = $selectedPackage['nameAr'];
} elseif ($isFr) {
    $pkgName = $selectedPackage['nameFr'];
} else {
    $pkgName = $selectedPackage['nameEn'];
}

$price = $selectedPackage['priceSAR'];

$adminEmail = 'info@premiumtarget.sa';
$subject = "طلب جديد - $pkgName - $price ر.س";

$body = <<<HTML
<html dir='rtl'>
<body style='font-family: Arial, sans-serif; direction: rtl;'>
<div style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
  <div style="background:linear-gradient(135deg,#2E5DB5,#7B3F9E);padding:32px 24px;text-align:center;">
    <h1 style="color:#ffffff;font-size:22px;margin:0 0 6px 0;">طلب باقة جديد</h1>
    <p style="color:#c8b8e8;font-size:13px;margin:0;">Premium Target</p>
  </div>
  <div style="padding:32px 28px;">
    <table style='border-collapse: collapse; width: 100%;'>
    <tr><td style='padding: 12px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;'>الباقة</td><td style='padding: 12px; border: 1px solid #ddd;'>$pkgName</td></tr>
    <tr><td style='padding: 12px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;'>السعر</td><td style='padding: 12px; border: 1px solid #ddd;'>$price ر.س</td></tr>
    <tr><td style='padding: 12px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;'>اللغة</td><td style='padding: 12px; border: 1px solid #ddd;'>$lang</td></tr>
    </table>
    <p style="margin-top: 20px; text-align: center;">
      <a href="https://wa.me/966553011730" style="display:inline-block;background:#25D366;color:#ffffff;padding:12px 28px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">تواصل مع العميل عبر واتساب</a>
    </p>
  </div>
</div>
</body>
</html>
HTML;

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: Premium Target <noreply@premiumtarget.sa>\r\n";

mail($adminEmail, $subject, $body, $headers);

$whatsappMsg = urlencode($isAr ? "مرحبًا، أريد طلب باقة: $pkgName ($price ر.س)" : ($isFr ? "Bonjour, je souhaite commander le forfait: $pkgName ($price SAR)" : "Hello, I'd like to order the package: $pkgName ($price SAR)"));

echo json_encode([
    'success' => true,
    'url' => "https://wa.me/966553011730?text=$whatsappMsg"
]);
