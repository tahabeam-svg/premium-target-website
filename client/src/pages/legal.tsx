import { useLanguage } from "@/lib/language-context";
import { Card } from "@/components/ui/card";

export function PrivacyPolicy() {
  const { lang } = useLanguage();

  const content = {
    ar: {
      title: "سياسة الخصوصية",
      sections: [
        { title: "جمع المعلومات", body: "نجمع المعلومات التي تقدمها لنا طوعًا عند استخدام نموذج التواصل أو عند طلب خدماتنا. تشمل هذه المعلومات: الاسم، البريد الإلكتروني، رقم الهاتف، وتفاصيل المشروع." },
        { title: "استخدام المعلومات", body: "نستخدم المعلومات المقدمة فقط لأغراض: الرد على استفساراتك، تقديم العروض والخدمات المطلوبة، تحسين خدماتنا، والتواصل معك بخصوص مشروعك." },
        { title: "حماية المعلومات", body: "نتخذ إجراءات أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف." },
        { title: "مشاركة المعلومات", body: "لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة إلا بموافقتك أو عندما يكون ذلك مطلوبًا بموجب القانون." },
        { title: "حقوقك", body: "يحق لك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها. يمكنك التواصل معنا في أي وقت لممارسة هذه الحقوق." },
      ],
    },
    en: {
      title: "Privacy Policy",
      sections: [
        { title: "Information Collection", body: "We collect information you voluntarily provide when using our contact form or requesting our services. This includes: name, email, phone number, and project details." },
        { title: "Use of Information", body: "We use the provided information only for: responding to your inquiries, providing requested services, improving our services, and communicating about your project." },
        { title: "Information Protection", body: "We take appropriate security measures to protect your personal information from unauthorized access, modification, disclosure, or destruction." },
        { title: "Information Sharing", body: "We do not sell, rent, or share your personal information with third parties except with your consent or when required by law." },
        { title: "Your Rights", body: "You have the right to request access to, correction, or deletion of your personal data. Contact us anytime to exercise these rights." },
      ],
    },
    fr: {
      title: "Politique de confidentialité",
      sections: [
        { title: "Collecte d'informations", body: "Nous collectons les informations que vous fournissez volontairement lors de l'utilisation de notre formulaire de contact ou de la demande de nos services." },
        { title: "Utilisation des informations", body: "Nous utilisons les informations fournies uniquement pour : répondre à vos demandes, fournir les services demandés et améliorer nos services." },
        { title: "Protection des informations", body: "Nous prenons des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès non autorisé." },
        { title: "Partage des informations", body: "Nous ne vendons, ne louons ni ne partageons vos informations personnelles avec des tiers sauf avec votre consentement." },
        { title: "Vos droits", body: "Vous avez le droit de demander l'accès, la correction ou la suppression de vos données personnelles." },
      ],
    },
  };

  const c = content[lang];

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-heading mb-8" data-testid="text-privacy-title">{c.title}</h1>
        <div className="space-y-6">
          {c.sections.map((section, i) => (
            <Card key={i} className="p-6">
              <h2 className="font-semibold font-heading text-base mb-2">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TermsConditions() {
  const { lang } = useLanguage();

  const content = {
    ar: {
      title: "الشروط والأحكام",
      sections: [
        { title: "القبول", body: "باستخدام موقعنا وخدماتنا، فإنك توافق على هذه الشروط والأحكام. إذا كنت لا توافق على أي جزء، يرجى عدم استخدام خدماتنا." },
        { title: "الخدمات", body: "نقدم خدمات تصميم الشعارات والهويات التجارية والبصرية وتصميم المواقع الإلكترونية. تفاصيل كل مشروع يتم الاتفاق عليها مسبقًا." },
        { title: "الدفع", body: "يتم الدفع وفقًا للاتفاق المبرم لكل مشروع. عادةً يتم الدفع على مرحلتين: 50% مقدمًا و50% عند التسليم." },
        { title: "الملكية الفكرية", body: "جميع حقوق الملكية الفكرية للتصاميم تنتقل إلى العميل بعد إتمام الدفع الكامل." },
        { title: "المسؤولية", body: "نسعى لتقديم أفضل جودة ممكنة، لكننا لا نضمن نتائج تجارية محددة من استخدام تصاميمنا." },
      ],
    },
    en: {
      title: "Terms & Conditions",
      sections: [
        { title: "Acceptance", body: "By using our website and services, you agree to these terms. If you disagree with any part, please do not use our services." },
        { title: "Services", body: "We provide logo design, brand identity, visual identity, and web design services. Details of each project are agreed upon in advance." },
        { title: "Payment", body: "Payment is made according to the agreement for each project. Usually paid in two installments: 50% upfront and 50% upon delivery." },
        { title: "Intellectual Property", body: "All intellectual property rights for designs transfer to the client upon full payment completion." },
        { title: "Liability", body: "We strive to deliver the best quality possible, but we do not guarantee specific commercial results from using our designs." },
      ],
    },
    fr: {
      title: "Conditions générales",
      sections: [
        { title: "Acceptation", body: "En utilisant notre site et nos services, vous acceptez ces conditions. Si vous n'êtes pas d'accord, veuillez ne pas utiliser nos services." },
        { title: "Services", body: "Nous fournissons des services de création de logos, d'identité de marque, d'identité visuelle et de conception web." },
        { title: "Paiement", body: "Le paiement est effectué selon l'accord pour chaque projet. Généralement en deux versements : 50% d'avance et 50% à la livraison." },
        { title: "Propriété intellectuelle", body: "Tous les droits de propriété intellectuelle des designs sont transférés au client après le paiement intégral." },
        { title: "Responsabilité", body: "Nous nous efforçons de fournir la meilleure qualité possible, mais nous ne garantissons pas de résultats commerciaux spécifiques." },
      ],
    },
  };

  const c = content[lang];

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-heading mb-8" data-testid="text-terms-title">{c.title}</h1>
        <div className="space-y-6">
          {c.sections.map((section, i) => (
            <Card key={i} className="p-6">
              <h2 className="font-semibold font-heading text-base mb-2">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RefundPolicy() {
  const { lang } = useLanguage();

  const content = {
    ar: {
      title: "سياسة الاسترداد",
      sections: [
        { title: "سياسة الاسترداد", body: "نلتزم بتقديم خدمات عالية الجودة لعملائنا. في حال عدم رضاك عن الخدمة، نقدم سياسة استرداد واضحة وعادلة." },
        { title: "قبل البدء بالتصميم", body: "يمكنك استرداد المبلغ بالكامل إذا تم إلغاء المشروع قبل البدء في مرحلة التصميم (خلال 48 ساعة من الدفع)." },
        { title: "بعد البدء بالتصميم", body: "إذا تم البدء في العمل، يمكن استرداد 50% من المبلغ المدفوع. لا يمكن الاسترداد بعد تسليم المقترحات الأولية والموافقة عليها." },
        { title: "حالات عدم الاسترداد", body: "لا يمكن استرداد المبلغ بعد: الموافقة على التصاميم النهائية، استلام الملفات المصدرية، أو بعد مرور 30 يومًا من التسليم." },
        { title: "كيفية الطلب", body: "لطلب استرداد، يرجى التواصل معنا عبر البريد الإلكتروني info@premiumtarget.sa مع ذكر رقم الطلب وسبب الاسترداد." },
      ],
    },
    en: {
      title: "Refund Policy",
      sections: [
        { title: "Our Commitment", body: "We are committed to providing high-quality services. If you're not satisfied, we offer a clear and fair refund policy." },
        { title: "Before Design Starts", body: "You can receive a full refund if the project is canceled before the design phase begins (within 48 hours of payment)." },
        { title: "After Design Starts", body: "If work has begun, 50% of the paid amount can be refunded. No refund after initial proposals are delivered and approved." },
        { title: "Non-Refundable Cases", body: "Refunds are not available after: final design approval, receiving source files, or 30 days after delivery." },
        { title: "How to Request", body: "To request a refund, contact us at info@premiumtarget.sa with your order number and reason for the refund." },
      ],
    },
    fr: {
      title: "Politique de remboursement",
      sections: [
        { title: "Notre engagement", body: "Nous nous engageons à fournir des services de haute qualité. En cas d'insatisfaction, nous offrons une politique de remboursement claire." },
        { title: "Avant le début du design", body: "Vous pouvez recevoir un remboursement complet si le projet est annulé avant le début de la phase de design (dans les 48 heures)." },
        { title: "Après le début du design", body: "Si le travail a commencé, 50% du montant payé peut être remboursé. Pas de remboursement après approbation des propositions." },
        { title: "Cas non remboursables", body: "Les remboursements ne sont pas disponibles après : l'approbation du design final, la réception des fichiers source, ou 30 jours après la livraison." },
        { title: "Comment demander", body: "Pour demander un remboursement, contactez-nous à info@premiumtarget.sa avec votre numéro de commande." },
      ],
    },
  };

  const c = content[lang];

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-heading mb-8" data-testid="text-refund-title">{c.title}</h1>
        <div className="space-y-6">
          {c.sections.map((section, i) => (
            <Card key={i} className="p-6">
              <h2 className="font-semibold font-heading text-base mb-2">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
