import { Link } from "wouter";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Target, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/seo";

const WHATSAPP_URL = "https://wa.me/966553011730";

export default function AboutPage() {
  const { lang } = useLanguage();

  const values = [
    {
      icon: Award,
      titleAr: "الجودة أولًا",
      titleEn: "Quality First",
      titleFr: "La qualité d'abord",
      descAr: "لا نقبل بأقل من الأفضل في كل مشروع نعمل عليه",
      descEn: "We never settle for less than the best in every project we work on",
      descFr: "Nous n'acceptons jamais moins que le meilleur dans chaque projet",
    },
    {
      icon: Heart,
      titleAr: "شغف الإبداع",
      titleEn: "Creative Passion",
      titleFr: "Passion créative",
      descAr: "نحب ما نفعله ونصب شغفنا في كل تفصيلة صغيرة",
      descEn: "We love what we do and pour our passion into every small detail",
      descFr: "Nous aimons ce que nous faisons et mettons notre passion dans chaque détail",
    },
    {
      icon: Target,
      titleAr: "التركيز على النتائج",
      titleEn: "Results-Driven",
      titleFr: "Orienté résultats",
      descAr: "كل قرار تصميمي نتخذه يهدف لتحقيق أهداف أعمالك",
      descEn: "Every design decision we make aims to achieve your business goals",
      descFr: "Chaque décision de design vise à atteindre vos objectifs commerciaux",
    },
    {
      icon: Users,
      titleAr: "التعاون الشفاف",
      titleEn: "Transparent Collaboration",
      titleFr: "Collaboration transparente",
      descAr: "نعمل جنبًا إلى جنب مع عملائنا بشفافية كاملة",
      descEn: "We work side by side with our clients in complete transparency",
      descFr: "Nous travaillons côte à côte avec nos clients en toute transparence",
    },
  ];

  const team = [
    {
      nameAr: "أحمد المطيري",
      nameEn: "Ahmed Al-Mutairi",
      nameFr: "Ahmed Al-Mutairi",
      roleAr: "المؤسس والمدير الإبداعي",
      roleEn: "Founder & Creative Director",
      roleFr: "Fondateur et directeur créatif",
      descAr: "أكثر من 10 سنوات خبرة في التصميم والهوية التجارية",
      descEn: "Over 10 years of experience in design and brand identity",
      descFr: "Plus de 10 ans d'expérience en design et identité de marque",
    },
    {
      nameAr: "سارة القحطاني",
      nameEn: "Sara Al-Qahtani",
      nameFr: "Sara Al-Qahtani",
      roleAr: "مديرة التصميم",
      roleEn: "Design Director",
      roleFr: "Directrice du design",
      descAr: "متخصصة في الهوية البصرية وتجربة المستخدم",
      descEn: "Specialized in visual identity and user experience",
      descFr: "Spécialisée en identité visuelle et expérience utilisateur",
    },
    {
      nameAr: "خالد العمري",
      nameEn: "Khalid Al-Omari",
      nameFr: "Khalid Al-Omari",
      roleAr: "مطور الويب الرئيسي",
      roleEn: "Lead Web Developer",
      roleFr: "Développeur web principal",
      descAr: "خبير في بناء المواقع الحديثة وتحسين الأداء",
      descEn: "Expert in building modern websites and performance optimization",
      descFr: "Expert en création de sites modernes et optimisation des performances",
    },
  ];

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <SEO titleAr="من نحن" titleEn="About Us" titleFr="À propos" descriptionAr="تعرف على فريق بريميوم تارجت وقصتنا في عالم التصميم والهويات التجارية" descriptionEn="Learn about Premium Target's team and our story in design and branding" descriptionFr="Découvrez l'équipe Premium Target et notre histoire dans le design et le branding" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 me-1" />
            {lang === "ar" ? "تعرف علينا" : lang === "fr" ? "Apprenez à nous connaître" : "Get to Know Us"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4" data-testid="text-about-title">
            {t("about.title", lang)}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("about.subtitle", lang)}</p>
        </div>

        <div className="max-w-3xl mx-auto mb-20">
          <Card className="p-8">
            <h2 className="text-xl font-bold font-heading mb-4">
              {lang === "ar" ? "قصتنا" : lang === "fr" ? "Notre histoire" : "Our Story"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.story", lang)}
            </p>
          </Card>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold font-heading mb-3">
              {lang === "ar" ? "قيمنا" : lang === "fr" ? "Nos valeurs" : "Our Values"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 text-center h-full" data-testid={`card-value-${i}`}>
                    <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-2">
                      {lang === "ar" ? value.titleAr : lang === "fr" ? value.titleFr : value.titleEn}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {lang === "ar" ? value.descAr : lang === "fr" ? value.descFr : value.descEn}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold font-heading mb-3">
              {lang === "ar" ? "من يقف خلف بريميوم تارجت" : lang === "fr" ? "L'équipe derrière Premium Target" : "The Team Behind Premium Target"}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {lang === "ar"
                ? "فريق من المبدعين يجمعهم الشغف بصنع هويات استثنائية"
                : lang === "fr"
                ? "Une équipe de créatifs unis par la passion de créer des identités exceptionnelles"
                : "A team of creatives united by a passion for crafting exceptional identities"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 text-center" data-testid={`card-team-${i}`}>
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary text-xl font-bold">
                    {(lang === "ar" ? member.nameAr : member.nameEn).charAt(0)}
                  </div>
                  <h3 className="font-semibold text-base mb-1">
                    {lang === "ar" ? member.nameAr : lang === "fr" ? member.nameFr : member.nameEn}
                  </h3>
                  <p className="text-xs text-primary font-medium mb-2">
                    {lang === "ar" ? member.roleAr : lang === "fr" ? member.roleFr : member.roleEn}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {lang === "ar" ? member.descAr : lang === "fr" ? member.descFr : member.descEn}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <Card className="p-8 bg-primary text-primary-foreground max-w-2xl mx-auto">
            <h2 className="text-xl font-bold font-heading mb-3">
              {lang === "ar" ? "هل أنت مستعد للبدء؟" : lang === "fr" ? "Prêt à commencer ?" : "Ready to Begin?"}
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              {lang === "ar"
                ? "دعنا نتحدث عن مشروعك القادم"
                : lang === "fr"
                ? "Parlons de votre prochain projet"
                : "Let's talk about your next project"}
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" data-testid="button-about-cta">{t("cta.whatsapp", lang)}</Button>
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
