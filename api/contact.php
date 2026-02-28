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

$name = preg_replace('/[\r\n]/', '', trim($input['name'] ?? ''));
$email = preg_replace('/[\r\n]/', '', trim($input['email'] ?? ''));
$phone = preg_replace('/[\r\n]/', '', trim($input['phone'] ?? ''));
$service = preg_replace('/[\r\n]/', '', trim($input['service'] ?? ''));
$message = trim($input['message'] ?? '');
$lang = preg_replace('/[^a-z]/', '', trim($input['lang'] ?? 'ar'));

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, email, and message are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

$adminEmail = 'info@premiumtarget.sa';
$adminSubject = "رسالة جديدة من الموقع - $name";
$adminBody = "
<html dir='rtl'>
<body style='font-family: Arial, sans-serif; direction: rtl;'>
<h2 style='color: #2E5DB5;'>رسالة جديدة من نموذج التواصل</h2>
<table style='border-collapse: collapse; width: 100%;'>
<tr><td style='padding: 8px; border: 1px solid #ddd; font-weight: bold;'>الاسم</td><td style='padding: 8px; border: 1px solid #ddd;'>$name</td></tr>
<tr><td style='padding: 8px; border: 1px solid #ddd; font-weight: bold;'>البريد</td><td style='padding: 8px; border: 1px solid #ddd;'>$email</td></tr>
<tr><td style='padding: 8px; border: 1px solid #ddd; font-weight: bold;'>الهاتف</td><td style='padding: 8px; border: 1px solid #ddd;'>$phone</td></tr>
<tr><td style='padding: 8px; border: 1px solid #ddd; font-weight: bold;'>الخدمة</td><td style='padding: 8px; border: 1px solid #ddd;'>$service</td></tr>
<tr><td style='padding: 8px; border: 1px solid #ddd; font-weight: bold;'>الرسالة</td><td style='padding: 8px; border: 1px solid #ddd;'>$message</td></tr>
</table>
</body>
</html>";

$adminHeaders = "MIME-Version: 1.0\r\n";
$adminHeaders .= "Content-type: text/html; charset=UTF-8\r\n";
$adminHeaders .= "From: Premium Target <noreply@premiumtarget.sa>\r\n";
$adminHeaders .= "Reply-To: $name <$email>\r\n";

mail($adminEmail, $adminSubject, $adminBody, $adminHeaders);

$isAr = $lang === 'ar';
$isFr = $lang === 'fr';

if ($isAr) {
    $subject = 'شكرًا لتواصلك مع بريميوم تارجت!';
} elseif ($isFr) {
    $subject = 'Merci de nous avoir contactés - Premium Target !';
} else {
    $subject = 'Thank You for Contacting Premium Target!';
}

$dir = $isAr ? 'rtl' : 'ltr';
$align = $isAr ? 'right' : 'left';
$fontFamily = $isAr ? "'Cairo', 'Almarai', Arial, sans-serif" : "'Poppins', 'Segoe UI', Arial, sans-serif";

$greeting = $isAr ? "مرحبًا $name،" : ($isFr ? "Bonjour $name," : "Hello $name,");

$line1 = $isAr
    ? 'شكرًا لتواصلك معنا! تم استلام رسالتك بنجاح وسيقوم فريقنا المختص بمراجعتها والرد عليك في أقرب وقت ممكن.'
    : ($isFr
        ? 'Merci de nous avoir contactés ! Votre message a bien été reçu et notre équipe spécialisée l\'examinera et vous répondra dans les plus brefs délais.'
        : 'Thank you for reaching out! Your message has been received and our specialized team will review it and get back to you as soon as possible.');

$line2 = $isAr
    ? 'إذا كنت ترغب في الحصول على رد أسرع واستشارة فورية مجانية، يمكنك التواصل معنا مباشرة عبر:'
    : ($isFr
        ? 'Si vous souhaitez une réponse plus rapide et une consultation gratuite immédiate, vous pouvez nous contacter directement via :'
        : 'If you\'d like a faster response and a free instant consultation, you can reach us directly via:');

$whatsappText = $isAr ? 'تواصل عبر واتساب' : ($isFr ? 'Contactez-nous sur WhatsApp' : 'Chat on WhatsApp');
$callText = $isAr ? 'اتصل بنا' : ($isFr ? 'Appelez-nous' : 'Call Us');
$hoursLabel = $isAr ? 'ساعات العمل:' : ($isFr ? "Heures d'ouverture :" : 'Working Hours:');
$hoursValue = $isAr ? 'الأحد - الخميس: ٩ صباحًا - ٦ مساءً' : ($isFr ? 'Dimanche - Jeudi : 9h - 18h' : 'Sunday - Thursday: 9AM - 6PM');
$closing = $isAr
    ? 'نتطلع لمساعدتك في تحقيق رؤيتك!'
    : ($isFr ? 'Nous avons hâte de vous aider à réaliser votre vision !' : 'We look forward to helping you bring your vision to life!');
$teamSign = $isAr ? 'فريق بريميوم تارجت' : ($isFr ? "L'équipe Premium Target" : 'The Premium Target Team');
$agencyDesc = $isAr ? 'وكالة العلامات التجارية المتميزة' : ($isFr ? 'Agence de Branding Premium' : 'Premium Branding Agency');

$autoReplyHtml = <<<HTML
<!DOCTYPE html>
<html dir="$dir" lang="$lang">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:$fontFamily;">
  <div style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#2E5DB5,#7B3F9E);padding:32px 24px;text-align:center;">
      <h1 style="color:#ffffff;font-size:22px;margin:0 0 6px 0;">Premium Target</h1>
      <p style="color:#c8b8e8;font-size:13px;margin:0;">$agencyDesc</p>
    </div>
    <div style="padding:32px 28px;text-align:$align;">
      <p style="font-size:16px;color:#1a1a1a;margin:0 0 16px 0;font-weight:600;">$greeting</p>
      <p style="font-size:14px;color:#444;line-height:1.8;margin:0 0 16px 0;">$line1</p>
      <p style="font-size:14px;color:#444;line-height:1.8;margin:0 0 20px 0;">$line2</p>
      <div style="text-align:center;margin:24px 0;">
        <a href="https://wa.me/966553011730" style="display:inline-block;background:#25D366;color:#ffffff;padding:12px 28px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;margin:0 6px 10px 6px;">$whatsappText</a>
        <a href="tel:+966553011730" style="display:inline-block;background:#2E5DB5;color:#ffffff;padding:12px 28px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;margin:0 6px 10px 6px;">$callText</a>
      </div>
      <div style="background:#eef2fb;border-radius:6px;padding:16px;margin:20px 0;text-align:center;">
        <p style="font-size:13px;color:#555;margin:0 0 4px 0;font-weight:600;">$hoursLabel</p>
        <p style="font-size:13px;color:#666;margin:0;">$hoursValue</p>
      </div>
      <p style="font-size:14px;color:#7B3F9E;font-weight:600;margin:20px 0 4px 0;text-align:center;">$closing</p>
      <p style="font-size:13px;color:#888;margin:0;text-align:center;">$teamSign</p>
    </div>
    <div style="background:#f4f4f5;padding:16px 24px;text-align:center;border-top:1px solid #e5e5e5;">
      <p style="font-size:11px;color:#999;margin:0;">Premium Target &bull; premiumtarget.sa &bull; +966 553 011 730</p>
    </div>
  </div>
</body>
</html>
HTML;

$replyHeaders = "MIME-Version: 1.0\r\n";
$replyHeaders .= "Content-type: text/html; charset=UTF-8\r\n";
$replyHeaders .= "From: Premium Target <noreply@premiumtarget.sa>\r\n";

mail($email, $subject, $autoReplyHtml, $replyHeaders);

http_response_code(200);
echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
