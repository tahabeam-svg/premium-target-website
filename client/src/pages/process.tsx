import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Search, Lightbulb, Palette, Rocket, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { SEO } from "@/components/seo";

const WHATSAPP_URL = "https://wa.me/966553011730";

export default function ProcessPage() {
  const { lang } = useLanguage();

  const steps = [
    {
      icon: Search,
      step: 1,
      titleAr: "الاكتشاف والبحث",
      titleEn: "Discovery & Research",
      titleFr: "Découverte et recherche",
      descAr: "نبدأ بفهم عميق لعلامتك التجارية: أهدافك، جمهورك المستهدف، المنافسين، والسوق. نجري أبحاثًا شاملة نبني عليها استراتيجيتنا.",
      descEn: "We begin with a deep understanding of your brand: your goals, target audience, competitors, and market. We conduct comprehensive research to build our strategy.",
      descFr: "Nous commençons par une compréhension approfondie de votre marque : vos objectifs, public cible, concurrents et marché.",
      deliverablesAr: ["تحليل السوق والمنافسين", "فهم الجمهور المستهدف", "تحديد أهداف المشروع", "ملخص الاكتشاف"],
      deliverablesEn: ["Market & competitor analysis", "Target audience understanding", "Project objectives definition", "Discovery brief"],
      deliverablesFr: ["Analyse du marché et des concurrents", "Compréhension du public cible", "Définition des objectifs", "Brief de découverte"],
    },
    {
      icon: Lightbulb,
      step: 2,
      titleAr: "الاستراتيجية والتخطيط",
      titleEn: "Strategy & Planning",
      titleFr: "Stratégie et planification",
      descAr: "نحول نتائج البحث إلى استراتيجية واضحة تحدد اتجاه العلامة التجارية: القيم، الشخصية، الموقع في السوق، وخارطة الطريق.",
      descEn: "We transform research insights into a clear strategy that defines brand direction: values, personality, market positioning, and roadmap.",
      descFr: "Nous transformons les résultats de recherche en une stratégie claire qui définit la direction de la marque.",
      deliverablesAr: ["استراتيجية العلامة التجارية", "تحديد القيم والشخصية", "خارطة الطريق", "الجدول الزمني"],
      deliverablesEn: ["Brand strategy document", "Values & personality definition", "Roadmap", "Project timeline"],
      deliverablesFr: ["Document de stratégie de marque", "Définition des valeurs et personnalité", "Feuille de route", "Calendrier"],
    },
    {
      icon: Palette,
      step: 3,
      titleAr: "التصميم والتطوير",
      titleEn: "Design & Development",
      titleFr: "Design et développement",
      descAr: "نحول الاستراتيجية إلى تصاميم إبداعية. نعمل بشكل تكراري مع مراجعات منتظمة حتى نصل للنتيجة المثالية.",
      descEn: "We transform strategy into creative designs. We work iteratively with regular reviews until we reach the perfect result.",
      descFr: "Nous transformons la stratégie en designs créatifs. Nous travaillons de manière itérative avec des révisions régulières.",
      deliverablesAr: ["مقترحات التصميم الأولية", "مراجعات وتحسينات", "التصميم النهائي المعتمد", "تطوير العناصر التطبيقية"],
      deliverablesEn: ["Initial design concepts", "Reviews & refinements", "Final approved design", "Applied elements development"],
      deliverablesFr: ["Concepts de design initiaux", "Révisions et améliorations", "Design final approuvé", "Développement des éléments"],
    },
    {
      icon: Rocket,
      step: 4,
      titleAr: "التسليم والإطلاق",
      titleEn: "Delivery & Launch",
      titleFr: "Livraison et lancement",
      descAr: "نسلم جميع الملفات النهائية مع دليل شامل لاستخدام الهوية. ونقدم دعمًا مستمرًا لضمان التطبيق الصحيح.",
      descEn: "We deliver all final files with a comprehensive identity usage guide. We provide ongoing support to ensure proper implementation.",
      descFr: "Nous livrons tous les fichiers finaux avec un guide complet d'utilisation de l'identité. Nous offrons un support continu.",
      deliverablesAr: ["ملفات المصدر الكاملة", "دليل الهوية التجارية", "إرشادات التطبيق", "دعم ما بعد التسليم"],
      deliverablesEn: ["Complete source files", "Brand identity guide", "Application guidelines", "Post-delivery support"],
      deliverablesFr: ["Fichiers source complets", "Guide d'identité de marque", "Directives d'application", "Support après livraison"],
    },
  ];

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <SEO titleAr="آلية العمل" titleEn="Our Process" titleFr="Notre processus" descriptionAr="تعرف على خطوات العمل في بريميوم تارجت من الاستشارة إلى التسليم" descriptionEn="Learn about Premium Target's workflow from consultation to delivery" descriptionFr="Découvrez le processus de travail de Premium Target, de la consultation à la livraison" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 me-1" />
            {lang === "ar" ? "كيف نعمل" : lang === "fr" ? "Comment nous travaillons" : "How We Work"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4" data-testid="text-process-title">
            {t("process.title", lang)}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("process.subtitle", lang)}</p>
        </div>

        <div className="space-y-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const deliverables = lang === "ar" ? step.deliverablesAr : lang === "fr" ? step.deliverablesFr : step.deliverablesEn;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: lang === "ar" ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="p-6 sm:p-8" data-testid={`process-step-detail-${step.step}`}>
                  <div className="flex items-start gap-5">
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-primary mb-1">
                        {lang === "ar" ? `الخطوة ${step.step}` : lang === "fr" ? `Étape ${step.step}` : `Step ${step.step}`}
                      </div>
                      <h2 className="text-lg font-bold font-heading mb-2">
                        {lang === "ar" ? step.titleAr : lang === "fr" ? step.titleFr : step.titleEn}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {lang === "ar" ? step.descAr : lang === "fr" ? step.descFr : step.descEn}
                      </p>
                      <ul className="space-y-1.5">
                        {deliverables.map((d, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="text-muted-foreground">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 bg-primary text-primary-foreground">
            <h2 className="text-xl font-bold font-heading mb-3">
              {lang === "ar" ? "جاهز للبدء في مشروعك؟" : lang === "fr" ? "Prêt à lancer votre projet ?" : "Ready to Start Your Project?"}
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              {lang === "ar"
                ? "تواصل معنا واحصل على استشارة مجانية"
                : lang === "fr"
                ? "Contactez-nous pour une consultation gratuite"
                : "Contact us for a free consultation"}
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" data-testid="button-process-cta">{t("cta.whatsapp", lang)}</Button>
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
