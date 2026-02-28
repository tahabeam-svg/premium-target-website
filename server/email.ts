import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

interface ContactAutoReplyParams {
  to: string;
  name: string;
  lang: string;
}

export async function sendContactAutoReply({ to, name, lang }: ContactAutoReplyParams) {
  const isAr = lang === "ar";
  const isFr = lang === "fr";

  const subject = isAr
    ? "شكرًا لتواصلك مع بريميوم تارجت!"
    : isFr
    ? "Merci de nous avoir contactés - Premium Target !"
    : "Thank You for Contacting Premium Target!";

  const dir = isAr ? "rtl" : "ltr";
  const align = isAr ? "right" : "left";
  const fontFamily = isAr ? "'Cairo', 'Almarai', Arial, sans-serif" : "'Poppins', 'Segoe UI', Arial, sans-serif";

  const greeting = isAr ? `مرحبًا ${name}،` : isFr ? `Bonjour ${name},` : `Hello ${name},`;

  const line1 = isAr
    ? "شكرًا لتواصلك معنا! تم استلام رسالتك بنجاح وسيقوم فريقنا المختص بمراجعتها والرد عليك في أقرب وقت ممكن."
    : isFr
    ? "Merci de nous avoir contactés ! Votre message a bien été reçu et notre équipe spécialisée l'examinera et vous répondra dans les plus brefs délais."
    : "Thank you for reaching out! Your message has been received and our specialized team will review it and get back to you as soon as possible.";

  const line2 = isAr
    ? "إذا كنت ترغب في الحصول على رد أسرع واستشارة فورية مجانية، يمكنك التواصل معنا مباشرة عبر:"
    : isFr
    ? "Si vous souhaitez une réponse plus rapide et une consultation gratuite immédiate, vous pouvez nous contacter directement via :"
    : "If you'd like a faster response and a free instant consultation, you can reach us directly via:";

  const whatsappText = isAr ? "تواصل عبر واتساب" : isFr ? "Contactez-nous sur WhatsApp" : "Chat on WhatsApp";
  const callText = isAr ? "اتصل بنا" : isFr ? "Appelez-nous" : "Call Us";
  const hoursLabel = isAr ? "ساعات العمل:" : isFr ? "Heures d'ouverture :" : "Working Hours:";
  const hoursValue = isAr ? "الأحد - الخميس: ٩ صباحًا - ٦ مساءً" : isFr ? "Dimanche - Jeudi : 9h - 18h" : "Sunday - Thursday: 9AM - 6PM";
  const closing = isAr
    ? "نتطلع لمساعدتك في تحقيق رؤيتك!"
    : isFr
    ? "Nous avons hâte de vous aider à réaliser votre vision !"
    : "We look forward to helping you bring your vision to life!";
  const teamSign = isAr ? "فريق بريميوم تارجت" : isFr ? "L'équipe Premium Target" : "The Premium Target Team";

  const html = `
<!DOCTYPE html>
<html dir="${dir}" lang="${lang}">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:${fontFamily};">
  <div style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    
    <div style="background:linear-gradient(135deg,#2E5DB5,#7B3F9E);padding:32px 24px;text-align:center;">
      <h1 style="color:#ffffff;font-size:22px;margin:0 0 6px 0;">Premium Target</h1>
      <p style="color:#c8b8e8;font-size:13px;margin:0;">${isAr ? "وكالة العلامات التجارية المتميزة" : isFr ? "Agence de Branding Premium" : "Premium Branding Agency"}</p>
    </div>

    <div style="padding:32px 28px;text-align:${align};">
      <p style="font-size:16px;color:#1a1a1a;margin:0 0 16px 0;font-weight:600;">${greeting}</p>
      <p style="font-size:14px;color:#444;line-height:1.8;margin:0 0 16px 0;">${line1}</p>
      <p style="font-size:14px;color:#444;line-height:1.8;margin:0 0 20px 0;">${line2}</p>

      <div style="text-align:center;margin:24px 0;">
        <a href="https://wa.me/966553011730" style="display:inline-block;background:#25D366;color:#ffffff;padding:12px 28px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;margin:0 6px 10px 6px;">${whatsappText}</a>
        <a href="tel:+966553011730" style="display:inline-block;background:#2E5DB5;color:#ffffff;padding:12px 28px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;margin:0 6px 10px 6px;">${callText}</a>
      </div>

      <div style="background:#eef2fb;border-radius:6px;padding:16px;margin:20px 0;text-align:center;">
        <p style="font-size:13px;color:#555;margin:0 0 4px 0;font-weight:600;">${hoursLabel}</p>
        <p style="font-size:13px;color:#666;margin:0;">${hoursValue}</p>
      </div>

      <p style="font-size:14px;color:#7B3F9E;font-weight:600;margin:20px 0 4px 0;text-align:center;">${closing}</p>
      <p style="font-size:13px;color:#888;margin:0;text-align:center;">${teamSign}</p>
    </div>

    <div style="background:#f4f4f5;padding:16px 24px;text-align:center;border-top:1px solid #e5e5e5;">
      <p style="font-size:11px;color:#999;margin:0;">Premium Target &bull; premiumtarget.sa &bull; +966 553 011 730</p>
    </div>
  </div>
</body>
</html>`;

  await transporter.sendMail({
    from: `"Premium Target" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
  });
}
