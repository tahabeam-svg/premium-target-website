import { Link, useParams } from "wouter";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Layers, Eye, Monitor, ArrowRight, ArrowLeft, CheckCircle2, Clock, FileCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/seo";

const WHATSAPP_URL = "https://wa.me/966553011730";

interface ServiceDetail {
  slug: string;
  icon: typeof Palette;
  titleKey: string;
  descKey: string;
  heroAr: string;
  heroEn: string;
  heroFr: string;
  deliverables: { ar: string; en: string; fr: string }[];
  timeline: { ar: string; en: string; fr: string };
  faqItems: { q: { ar: string; en: string; fr: string }; a: { ar: string; en: string; fr: string } }[];
}

const SERVICES: ServiceDetail[] = [
  {
    slug: "logo-design",
    icon: Palette,
    titleKey: "services.logoDesign",
    descKey: "services.logoDesignDesc",
    heroAr: "شعار فريد يعكس جوهر علامتك ويميزها في سوق مزدحم. نصمم شعارات قابلة للتطبيق على جميع المنصات بأعلى جودة.",
    heroEn: "A unique logo that captures your brand essence and sets you apart. We create versatile, high-quality logos ready for any platform.",
    heroFr: "Un logo unique qui capture l'essence de votre marque. Nous créons des logos polyvalents et de haute qualité.",
    deliverables: [
      { ar: "3 مقترحات تصميم أولية", en: "3 initial design concepts", fr: "3 concepts de design initiaux" },
      { ar: "ملفات المصدر (AI, EPS, SVG)", en: "Source files (AI, EPS, SVG)", fr: "Fichiers source (AI, EPS, SVG)" },
      { ar: "إرشادات استخدام الشعار", en: "Logo usage guidelines", fr: "Directives d'utilisation du logo" },
      { ar: "نسخ بألوان مختلفة", en: "Multiple color variations", fr: "Variations de couleurs multiples" },
    ],
    timeline: { ar: "5-7 أيام عمل", en: "5-7 business days", fr: "5-7 jours ouvrables" },
    faqItems: [
      {
        q: { ar: "كم مقترح تصميم سأحصل عليه؟", en: "How many design proposals will I get?", fr: "Combien de propositions de design vais-je recevoir ?" },
        a: { ar: "نقدم 3 مقترحات تصميم أولية مع إمكانية تعديل المقترح المختار.", en: "We provide 3 initial design proposals with the option to refine the chosen one.", fr: "Nous fournissons 3 propositions de design initiales avec possibilité d'affiner celle choisie." },
      },
      {
        q: { ar: "ما صيغ الملفات التي سأستلمها؟", en: "What file formats will I receive?", fr: "Quels formats de fichiers vais-je recevoir ?" },
        a: { ar: "ستستلم ملفات AI, EPS, SVG, PNG, PDF بجميع الأحجام والألوان.", en: "You'll receive AI, EPS, SVG, PNG, PDF files in all sizes and colors.", fr: "Vous recevrez des fichiers AI, EPS, SVG, PNG, PDF dans toutes les tailles et couleurs." },
      },
    ],
  },
  {
    slug: "brand-identity",
    icon: Layers,
    titleKey: "services.brandIdentity",
    descKey: "services.brandIdentityDesc",
    heroAr: "هوية تجارية متكاملة تبني الثقة وتعزز مكانة علامتك في السوق. من الاستراتيجية إلى التطبيق.",
    heroEn: "A complete brand identity that builds trust and strengthens your market position. From strategy to execution.",
    heroFr: "Une identité de marque complète qui construit la confiance et renforce votre position sur le marché.",
    deliverables: [
      { ar: "استراتيجية العلامة التجارية", en: "Brand strategy document", fr: "Document de stratégie de marque" },
      { ar: "تصميم الشعار الرئيسي والفرعي", en: "Primary & secondary logo design", fr: "Design du logo principal et secondaire" },
      { ar: "لوحة الألوان والخطوط", en: "Color palette & typography", fr: "Palette de couleurs et typographie" },
      { ar: "نبرة الصوت وأسلوب التواصل", en: "Tone of voice & messaging", fr: "Ton de voix et messages" },
      { ar: "دليل الهوية التجارية", en: "Brand identity guidelines", fr: "Guide d'identité de marque" },
    ],
    timeline: { ar: "10-14 يوم عمل", en: "10-14 business days", fr: "10-14 jours ouvrables" },
    faqItems: [
      {
        q: { ar: "ما الفرق بين الهوية التجارية والبصرية؟", en: "What's the difference between brand and visual identity?", fr: "Quelle est la différence entre identité de marque et visuelle ?" },
        a: { ar: "الهوية التجارية تشمل الاستراتيجية والقيم والرسائل، بينما الهوية البصرية تركز على العناصر المرئية.", en: "Brand identity includes strategy, values, and messaging, while visual identity focuses on visual elements.", fr: "L'identité de marque inclut la stratégie, les valeurs et les messages, tandis que l'identité visuelle se concentre sur les éléments visuels." },
      },
    ],
  },
  {
    slug: "visual-identity",
    icon: Eye,
    titleKey: "services.visualIdentity",
    descKey: "services.visualIdentityDesc",
    heroAr: "هوية بصرية متناسقة ومؤثرة تجعل علامتك مرئية ومميزة في كل نقطة تماس مع جمهورك.",
    heroEn: "A cohesive, impactful visual identity that makes your brand visible and distinctive at every touchpoint.",
    heroFr: "Une identité visuelle cohérente et percutante qui rend votre marque visible et distinctive.",
    deliverables: [
      { ar: "تصميم المطبوعات التجارية", en: "Business stationery design", fr: "Design de papeterie commerciale" },
      { ar: "تصميم السوشيال ميديا", en: "Social media templates", fr: "Modèles pour réseaux sociaux" },
      { ar: "تصميم أغلفة وعبوات", en: "Packaging & cover design", fr: "Design d'emballages et couvertures" },
      { ar: "مكتبة عناصر بصرية", en: "Visual elements library", fr: "Bibliothèque d'éléments visuels" },
    ],
    timeline: { ar: "7-10 أيام عمل", en: "7-10 business days", fr: "7-10 jours ouvrables" },
    faqItems: [
      {
        q: { ar: "هل تشمل الهوية البصرية تصميم السوشيال ميديا؟", en: "Does visual identity include social media design?", fr: "L'identité visuelle inclut-elle le design des réseaux sociaux ?" },
        a: { ar: "نعم، نصمم قوالب جاهزة لجميع منصات التواصل الاجتماعي.", en: "Yes, we design ready-to-use templates for all social media platforms.", fr: "Oui, nous concevons des modèles prêts à l'emploi pour tous les réseaux sociaux." },
      },
    ],
  },
  {
    slug: "web-design",
    icon: Monitor,
    titleKey: "services.webDesign",
    descKey: "services.webDesignDesc",
    heroAr: "مواقع إلكترونية احترافية تجمع بين التصميم الجذاب والأداء العالي وتجربة المستخدم المتميزة.",
    heroEn: "Professional websites combining attractive design, high performance, and outstanding user experience.",
    heroFr: "Des sites web professionnels alliant design attractif, haute performance et expérience utilisateur exceptionnelle.",
    deliverables: [
      { ar: "تصميم UI/UX كامل", en: "Complete UI/UX design", fr: "Design UI/UX complet" },
      { ar: "تطوير متجاوب لجميع الأجهزة", en: "Responsive development", fr: "Développement responsive" },
      { ar: "تحسين محركات البحث", en: "SEO optimization", fr: "Optimisation SEO" },
      { ar: "لوحة تحكم لإدارة المحتوى", en: "Content management panel", fr: "Panneau de gestion de contenu" },
    ],
    timeline: { ar: "15-25 يوم عمل", en: "15-25 business days", fr: "15-25 jours ouvrables" },
    faqItems: [
      {
        q: { ar: "هل الموقع متوافق مع الجوال؟", en: "Is the website mobile-friendly?", fr: "Le site est-il compatible mobile ?" },
        a: { ar: "بالتأكيد، جميع مواقعنا متجاوبة بالكامل وتعمل بشكل مثالي على جميع الأجهزة.", en: "Absolutely, all our websites are fully responsive and work perfectly on all devices.", fr: "Absolument, tous nos sites sont entièrement responsive et fonctionnent parfaitement sur tous les appareils." },
      },
    ],
  },
];

export function ServicesOverview() {
  const { lang } = useLanguage();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <SEO
        titleAr="خدماتنا"
        titleEn="Our Services"
        titleFr="Nos services"
        descriptionAr="خدمات تصميم الشعارات والهويات التجارية والبصرية والمواقع الإلكترونية"
        descriptionEn="Logo design, brand identity, visual identity, and web design services"
        descriptionFr="Services de création de logos, identité de marque, identité visuelle et design web"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 me-1" />
            {lang === "ar" ? "ما نقدمه" : lang === "fr" ? "Ce que nous offrons" : "What We Offer"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4" data-testid="text-services-page-title">
            {t("services.title", lang)}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("services.subtitle", lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/${lang}/services/${service.slug}`}>
                  <Card className="p-8 h-full hover-elevate cursor-pointer group" data-testid={`card-service-detail-${service.slug}`}>
                    <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold font-heading mb-3">{t(service.titleKey, lang)}</h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {lang === "ar" ? service.heroAr : lang === "fr" ? service.heroFr : service.heroEn}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm">
                      {lang === "ar" ? "تفاصيل الخدمة" : lang === "fr" ? "Détails du service" : "Service details"}
                      <Arrow className="w-4 h-4" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ServiceDetail() {
  const params = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const service = SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-heading mb-4">{t("notFound.title", lang)}</h1>
          <Link href={`/${lang}/services`}>
            <Button>{t("notFound.back", lang)}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`/${lang}/services`}>
          <Button variant="ghost" size="sm" className="mb-8" data-testid="button-back-services">
            <Arrow className="w-4 h-4 me-1 rotate-180" />
            {t("nav.services", lang)}
          </Button>
        </Link>

        <div className="mb-12">
          <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center mb-6">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4" data-testid="text-service-detail-title">
            {t(service.titleKey, lang)}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {lang === "ar" ? service.heroAr : lang === "fr" ? service.heroFr : service.heroEn}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileCheck className="w-5 h-5 text-primary" />
              <h2 className="font-semibold font-heading text-lg">
                {lang === "ar" ? "ما ستحصل عليه" : lang === "fr" ? "Ce que vous recevrez" : "What You'll Get"}
              </h2>
            </div>
            <ul className="space-y-3">
              {service.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2" data-testid={`deliverable-${i}`}>
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{lang === "ar" ? d.ar : lang === "fr" ? d.fr : d.en}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="font-semibold font-heading text-lg">
                {lang === "ar" ? "الجدول الزمني" : lang === "fr" ? "Calendrier" : "Timeline"}
              </h2>
            </div>
            <p className="text-muted-foreground">
              {lang === "ar" ? service.timeline.ar : lang === "fr" ? service.timeline.fr : service.timeline.en}
            </p>
          </Card>
        </div>

        {service.faqItems.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold font-heading mb-6">
              {lang === "ar" ? "أسئلة سريعة" : lang === "fr" ? "Questions rapides" : "Quick Answers"}
            </h2>
            <div className="space-y-4">
              {service.faqItems.map((faq, i) => (
                <Card key={i} className="p-5" data-testid={`faq-item-${i}`}>
                  <h3 className="font-semibold text-sm mb-2">
                    {lang === "ar" ? faq.q.ar : lang === "fr" ? faq.q.fr : faq.q.en}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {lang === "ar" ? faq.a.ar : lang === "fr" ? faq.a.fr : faq.a.en}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Card className="p-8 bg-primary text-primary-foreground text-center">
          <h2 className="text-xl font-bold font-heading mb-3">
            {lang === "ar" ? "مستعد للبدء؟" : lang === "fr" ? "Prêt à commencer ?" : "Ready to Get Started?"}
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            {lang === "ar"
              ? "تواصل معنا اليوم واحصل على استشارة مجانية"
              : lang === "fr"
              ? "Contactez-nous aujourd'hui pour une consultation gratuite"
              : "Contact us today for a free consultation"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" data-testid="button-service-whatsapp">
                {t("cta.whatsapp", lang)}
              </Button>
            </a>
            <Link href={`/${lang}/contact`}>
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 no-default-hover-elevate" data-testid="button-service-contact">
                {t("nav.contact", lang)}
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
