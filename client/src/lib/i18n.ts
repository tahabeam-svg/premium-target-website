export type Lang = "ar" | "en" | "fr";

export const SUPPORTED_LANGS: Lang[] = ["ar", "en", "fr"];
export const DEFAULT_LANG: Lang = "ar";

export const LANG_CONFIG: Record<Lang, { dir: "rtl" | "ltr"; label: string; code: string; locale: string }> = {
  ar: { dir: "rtl", label: "العربية", code: "AR", locale: "ar-SA" },
  en: { dir: "ltr", label: "English", code: "EN", locale: "en-US" },
  fr: { dir: "ltr", label: "Français", code: "FR", locale: "fr-FR" },
};

export function getLang(path: string): Lang {
  const match = path.match(/^\/(ar|en|fr)(\/|$)/);
  return (match?.[1] as Lang) || DEFAULT_LANG;
}

export function isRTL(lang: Lang): boolean {
  return lang === "ar";
}

const translations: Record<string, Record<Lang, string>> = {
  "nav.home": { ar: "الرئيسية", en: "Home", fr: "Accueil" },
  "nav.about": { ar: "من نحن", en: "About", fr: "À propos" },
  "nav.whyUs": { ar: "لماذا نحن", en: "Why Us", fr: "Pourquoi nous" },
  "nav.services": { ar: "خدماتنا", en: "Services", fr: "Services" },
  "nav.work": { ar: "أعمالنا", en: "Portfolio", fr: "Portfolio" },
  "nav.blog": { ar: "المدونة", en: "Blog", fr: "Blog" },
  "nav.pricing": { ar: "الباقات", en: "Pricing", fr: "Tarifs" },
  "nav.contact": { ar: "تواصل معنا", en: "Contact", fr: "Contact" },
  "nav.faq": { ar: "الأسئلة الشائعة", en: "FAQ", fr: "FAQ" },

  "hero.title": {
    ar: "نصنع هويات تجارية تُلهم وتبقى",
    en: "We Craft Brand Identities That Inspire & Last",
    fr: "Nous créons des identités de marque inspirantes et durables"
  },
  "hero.subtitle": {
    ar: "وكالة سعودية متخصصة في تصميم الشعارات والهويات التجارية والبصرية والمواقع الإلكترونية",
    en: "A Saudi agency specializing in logo design, brand identity, visual identity, and web design",
    fr: "Une agence saoudienne spécialisée en conception de logos, identité de marque, identité visuelle et design web"
  },
  "hero.cta": { ar: "اكتشف خدماتنا", en: "Explore Our Services", fr: "Découvrir nos services" },
  "hero.cta2": { ar: "تواصل معنا", en: "Get In Touch", fr: "Contactez-nous" },

  "services.title": { ar: "خدماتنا", en: "Our Services", fr: "Nos services" },
  "services.subtitle": {
    ar: "حلول متكاملة لبناء هوية علامتك التجارية",
    en: "Comprehensive solutions for building your brand identity",
    fr: "Des solutions complètes pour construire votre identité de marque"
  },
  "services.logoDesign": { ar: "تصميم الشعارات", en: "Logo Design", fr: "Création de logo" },
  "services.logoDesignDesc": {
    ar: "نصمم شعارات فريدة تعكس رؤية علامتك التجارية وتترك انطباعًا لا يُنسى",
    en: "We design unique logos that reflect your brand vision and leave a lasting impression",
    fr: "Nous concevons des logos uniques qui reflètent votre vision de marque"
  },
  "services.brandIdentity": { ar: "الهوية التجارية", en: "Brand Identity", fr: "Identité de marque" },
  "services.brandIdentityDesc": {
    ar: "نبني هوية تجارية متكاملة تعزز مكانة علامتك في السوق",
    en: "We build complete brand identities that strengthen your market position",
    fr: "Nous construisons des identités de marque complètes qui renforcent votre position"
  },
  "services.visualIdentity": { ar: "الهوية البصرية", en: "Visual Identity", fr: "Identité visuelle" },
  "services.visualIdentityDesc": {
    ar: "نطور هوية بصرية متناسقة تشمل جميع نقاط الاتصال مع عملائك",
    en: "We develop cohesive visual identities across all customer touchpoints",
    fr: "Nous développons des identités visuelles cohérentes sur tous les points de contact"
  },
  "services.webDesign": { ar: "تصميم المواقع", en: "Web Design", fr: "Design web" },
  "services.webDesignDesc": {
    ar: "نصمم مواقع إلكترونية احترافية تجمع بين الجمال والأداء العالي",
    en: "We design professional websites that combine beauty with high performance",
    fr: "Nous concevons des sites web professionnels alliant beauté et performance"
  },

  "work.title": { ar: "أعمالنا", en: "Our Work", fr: "Nos réalisations" },
  "work.subtitle": {
    ar: "مشاريع نفخر بها ونتائج ملموسة لعملائنا",
    en: "Projects we're proud of and tangible results for our clients",
    fr: "Des projets dont nous sommes fiers et des résultats tangibles"
  },
  "work.viewAll": { ar: "عرض الكل", en: "View All", fr: "Voir tout" },
  "work.viewProject": { ar: "عرض المشروع", en: "View Project", fr: "Voir le projet" },

  "pricing.title": { ar: "باقاتنا", en: "Our Packages", fr: "Nos forfaits" },
  "pricing.subtitle": {
    ar: "باقات مصممة لتناسب احتياجاتك وميزانيتك",
    en: "Packages designed to fit your needs and budget",
    fr: "Des forfaits conçus pour s'adapter à vos besoins et votre budget"
  },
  "pricing.popular": { ar: "الأكثر طلبًا", en: "Most Popular", fr: "Le plus populaire" },
  "pricing.sar": { ar: "ر.س", en: "SAR", fr: "SAR" },
  "pricing.getStarted": { ar: "ابدأ الآن", en: "Get Started", fr: "Commencer" },
  "pricing.includes": { ar: "يتضمن:", en: "Includes:", fr: "Inclus :" },
  "pricing.delivery": { ar: "مدة التسليم:", en: "Delivery:", fr: "Livraison :" },
  "pricing.revisions": { ar: "المراجعات:", en: "Revisions:", fr: "Révisions :" },

  "about.title": { ar: "من نحن", en: "About Us", fr: "À propos de nous" },
  "about.subtitle": {
    ar: "فريق من المبدعين الشغوفين بصنع هويات تجارية استثنائية",
    en: "A team of passionate creatives dedicated to building exceptional brands",
    fr: "Une équipe de créatifs passionnés dédiée à la création de marques exceptionnelles"
  },
  "about.story": {
    ar: "بريميوم تارجت وكالة سعودية متخصصة تأسست بشغف لتقديم حلول إبداعية متكاملة في عالم الهوية التجارية والتصميم. نجمع بين الخبرة العميقة والإبداع المتجدد لنساعد الشركات في بناء هويات قوية تعكس رؤيتهم وتتواصل مع جمهورهم بفعالية.",
    en: "Premium Target is a specialized Saudi agency founded with a passion for delivering comprehensive creative solutions in branding and design. We combine deep expertise with fresh creativity to help businesses build powerful identities that reflect their vision and connect effectively with their audience.",
    fr: "Premium Target est une agence saoudienne spécialisée fondée avec la passion de fournir des solutions créatives complètes en matière de branding et de design. Nous combinons une expertise approfondie avec une créativité renouvelée."
  },

  "whyUs.title": { ar: "لماذا بريميوم تارجت؟", en: "Why Premium Target?", fr: "Pourquoi Premium Target ?" },
  "whyUs.subtitle": {
    ar: "نتميز بالتزامنا بالجودة والإبداع في كل مشروع",
    en: "We stand out through our commitment to quality and creativity in every project",
    fr: "Nous nous distinguons par notre engagement envers la qualité et la créativité"
  },

  "contact.title": { ar: "تواصل معنا", en: "Contact Us", fr: "Contactez-nous" },
  "contact.subtitle": {
    ar: "نحن هنا لمساعدتك في بناء علامتك التجارية",
    en: "We're here to help you build your brand",
    fr: "Nous sommes là pour vous aider à construire votre marque"
  },
  "contact.name": { ar: "الاسم", en: "Name", fr: "Nom" },
  "contact.email": { ar: "البريد الإلكتروني", en: "Email", fr: "Email" },
  "contact.phone": { ar: "الهاتف", en: "Phone", fr: "Téléphone" },
  "contact.service": { ar: "الخدمة", en: "Service", fr: "Service" },
  "contact.message": { ar: "الرسالة", en: "Message", fr: "Message" },
  "contact.send": { ar: "إرسال", en: "Send Message", fr: "Envoyer" },
  "contact.success": {
    ar: "تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا",
    en: "Your message has been sent successfully! We'll get back to you soon",
    fr: "Votre message a été envoyé avec succès ! Nous vous répondrons bientôt"
  },

  "faq.title": { ar: "الأسئلة الشائعة", en: "Frequently Asked Questions", fr: "Questions fréquentes" },
  "faq.subtitle": {
    ar: "إجابات على أكثر الأسئلة شيوعًا حول خدماتنا",
    en: "Answers to the most common questions about our services",
    fr: "Réponses aux questions les plus fréquentes sur nos services"
  },

  "testimonials.title": { ar: "آراء عملائنا", en: "Client Testimonials", fr: "Témoignages clients" },
  "testimonials.subtitle": {
    ar: "ماذا يقول عملاؤنا عن تجربتهم معنا",
    en: "What our clients say about their experience with us",
    fr: "Ce que nos clients disent de leur expérience avec nous"
  },

  "footer.rights": {
    ar: "جميع الحقوق محفوظة",
    en: "All rights reserved",
    fr: "Tous droits réservés"
  },
  "footer.privacy": { ar: "سياسة الخصوصية", en: "Privacy Policy", fr: "Politique de confidentialité" },
  "footer.terms": { ar: "الشروط والأحكام", en: "Terms & Conditions", fr: "Conditions générales" },
  "footer.refund": { ar: "سياسة الاسترداد", en: "Refund Policy", fr: "Politique de remboursement" },

  "cta.whatsapp": { ar: "تواصل عبر واتساب", en: "Chat on WhatsApp", fr: "Discuter sur WhatsApp" },
  "cta.startProject": { ar: "ابدأ مشروعك", en: "Start Your Project", fr: "Lancez votre projet" },

  "process.title": { ar: "منهجية العمل", en: "Our Process", fr: "Notre processus" },
  "process.subtitle": {
    ar: "خطوات واضحة ومنظمة لضمان أفضل النتائج",
    en: "Clear, organized steps to ensure the best results",
    fr: "Des étapes claires et organisées pour garantir les meilleurs résultats"
  },
  "process.step1Title": { ar: "الاكتشاف", en: "Discovery", fr: "Découverte" },
  "process.step1Desc": {
    ar: "نتعرف على رؤيتك وأهدافك وجمهورك المستهدف لفهم احتياجاتك",
    en: "We learn about your vision, goals, and target audience to understand your needs",
    fr: "Nous découvrons votre vision, vos objectifs et votre public cible"
  },
  "process.step2Title": { ar: "الاستراتيجية", en: "Strategy", fr: "Stratégie" },
  "process.step2Desc": {
    ar: "نضع خطة استراتيجية واضحة تحدد اتجاه العلامة التجارية",
    en: "We create a clear strategic plan that defines your brand direction",
    fr: "Nous élaborons un plan stratégique clair qui définit la direction de votre marque"
  },
  "process.step3Title": { ar: "التصميم", en: "Design", fr: "Design" },
  "process.step3Desc": {
    ar: "نحول الاستراتيجية إلى تصاميم إبداعية تعكس هوية علامتك",
    en: "We transform strategy into creative designs that reflect your brand identity",
    fr: "Nous transformons la stratégie en designs créatifs qui reflètent votre identité"
  },
  "process.step4Title": { ar: "التسليم", en: "Delivery", fr: "Livraison" },
  "process.step4Desc": {
    ar: "نسلم المشروع النهائي مع جميع الملفات والإرشادات اللازمة",
    en: "We deliver the final project with all necessary files and guidelines",
    fr: "Nous livrons le projet final avec tous les fichiers et directives nécessaires"
  },

  "search.title": { ar: "البحث", en: "Search", fr: "Recherche" },
  "search.placeholder": { ar: "ابحث في الموقع...", en: "Search the site...", fr: "Rechercher sur le site..." },

  "notFound.title": { ar: "الصفحة غير موجودة", en: "Page Not Found", fr: "Page non trouvée" },
  "notFound.desc": {
    ar: "عذرًا، الصفحة التي تبحث عنها غير موجودة",
    en: "Sorry, the page you're looking for doesn't exist",
    fr: "Désolé, la page que vous recherchez n'existe pas"
  },
  "notFound.back": { ar: "العودة للرئيسية", en: "Back to Home", fr: "Retour à l'accueil" },

  "selectService": { ar: "اختر الخدمة", en: "Select a service", fr: "Choisir un service" },
  "loading": { ar: "جاري التحميل...", en: "Loading...", fr: "Chargement..." },
};

export function t(key: string, lang: Lang): string {
  return translations[key]?.[lang] || key;
}

export function getLocalizedField<T>(item: T, field: string, lang: Lang): string {
  const langSuffix = lang.charAt(0).toUpperCase() + lang.slice(1);
  const key = `${field}${langSuffix}` as keyof T;
  return (item[key] as string) || "";
}
