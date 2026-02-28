import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Shield, Zap, HeartHandshake, Lightbulb, BarChart3, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { SEO } from "@/components/seo";

const WHATSAPP_URL = "https://wa.me/966553011730";

export default function WhyUsPage() {
  const { lang } = useLanguage();

  const reasons = [
    {
      icon: Shield,
      titleAr: "خبرة موثوقة",
      titleEn: "Trusted Expertise",
      titleFr: "Expertise de confiance",
      descAr: "أكثر من 5 سنوات من الخبرة في سوق الهوية التجارية السعودي مع فهم عميق للثقافة المحلية والأسواق العالمية",
      descEn: "Over 5 years of experience in the Saudi branding market with a deep understanding of local culture and global markets",
      descFr: "Plus de 5 ans d'expérience sur le marché saoudien du branding avec une compréhension approfondie de la culture locale",
    },
    {
      icon: Lightbulb,
      titleAr: "إبداع بلا حدود",
      titleEn: "Boundless Creativity",
      titleFr: "Créativité sans limites",
      descAr: "كل مشروع فريد ويحصل على اهتمام خاص. لا نستخدم قوالب جاهزة - كل شيء يُصمم من الصفر خصيصًا لك",
      descEn: "Every project is unique and receives special attention. We don't use templates - everything is designed from scratch specifically for you",
      descFr: "Chaque projet est unique et reçoit une attention particulière. Nous ne utilisons pas de modèles - tout est conçu sur mesure",
    },
    {
      icon: BarChart3,
      titleAr: "نتائج قابلة للقياس",
      titleEn: "Measurable Results",
      titleFr: "Résultats mesurables",
      descAr: "نركز على أهداف أعمالك ونصمم هويات تحقق نتائج ملموسة في التعرف على العلامة والمبيعات",
      descEn: "We focus on your business goals and design identities that deliver tangible results in brand recognition and sales",
      descFr: "Nous nous concentrons sur vos objectifs commerciaux et concevons des identités qui génèrent des résultats tangibles",
    },
    {
      icon: HeartHandshake,
      titleAr: "شراكة حقيقية",
      titleEn: "True Partnership",
      titleFr: "Partenariat véritable",
      descAr: "نحن لسنا مجرد مزود خدمة - نحن شريك في رحلة بناء علامتك. نستمع ونتعاون ونبتكر معًا",
      descEn: "We're not just a service provider - we're a partner in your brand-building journey. We listen, collaborate, and innovate together",
      descFr: "Nous ne sommes pas qu'un prestataire - nous sommes un partenaire dans votre parcours de création de marque",
    },
    {
      icon: Zap,
      titleAr: "سرعة دون تنازل",
      titleEn: "Speed Without Compromise",
      titleFr: "Rapidité sans compromis",
      descAr: "نلتزم بالمواعيد دائمًا مع الحفاظ على أعلى معايير الجودة في كل خطوة",
      descEn: "We always meet deadlines while maintaining the highest quality standards at every step",
      descFr: "Nous respectons toujours les délais tout en maintenant les normes de qualité les plus élevées",
    },
    {
      icon: Clock,
      titleAr: "دعم ما بعد التسليم",
      titleEn: "Post-Delivery Support",
      titleFr: "Support après livraison",
      descAr: "لا تنتهي علاقتنا عند التسليم. نقدم دعمًا مستمرًا لضمان نجاح تطبيق هويتك",
      descEn: "Our relationship doesn't end at delivery. We provide ongoing support to ensure your identity is successfully implemented",
      descFr: "Notre relation ne s'arrête pas à la livraison. Nous offrons un support continu pour garantir le succès",
    },
  ];

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <SEO titleAr="لماذا نحن" titleEn="Why Us" titleFr="Pourquoi nous" descriptionAr="اكتشف ما يميز بريميوم تارجت عن غيرها من وكالات التصميم" descriptionEn="Discover what sets Premium Target apart from other design agencies" descriptionFr="Découvrez ce qui distingue Premium Target des autres agences de design" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 me-1" />
            {lang === "ar" ? "ما يميزنا" : lang === "fr" ? "Ce qui nous distingue" : "What Sets Us Apart"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4" data-testid="text-why-us-title">
            {t("whyUs.title", lang)}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("whyUs.subtitle", lang)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="p-6 h-full" data-testid={`card-reason-${i}`}>
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base mb-2">
                    {lang === "ar" ? reason.titleAr : lang === "fr" ? reason.titleFr : reason.titleEn}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {lang === "ar" ? reason.descAr : lang === "fr" ? reason.descFr : reason.descEn}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Card className="p-8 bg-primary text-primary-foreground max-w-2xl mx-auto">
            <h2 className="text-xl font-bold font-heading mb-3">
              {lang === "ar" ? "مستعد للعمل مع فريق يهتم؟" : lang === "fr" ? "Prêt à travailler avec une équipe engagée ?" : "Ready to Work with a Team That Cares?"}
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              {lang === "ar"
                ? "تواصل معنا اليوم واكتشف كيف يمكننا مساعدتك"
                : lang === "fr"
                ? "Contactez-nous aujourd'hui et découvrez comment nous pouvons vous aider"
                : "Get in touch today and discover how we can help you"}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" data-testid="button-why-us-whatsapp">{t("cta.whatsapp", lang)}</Button>
              </a>
              <Link href={`/${lang}/contact`}>
                <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 no-default-hover-elevate" data-testid="button-why-us-contact">
                  {t("nav.contact", lang)}
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
