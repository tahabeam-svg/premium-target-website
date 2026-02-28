import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/language-context";
import { t, getLocalizedField } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ArrowLeft, Palette, Layers, Eye, Monitor, Star, CheckCircle2, Sparkles, Target, Award, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/seo";
import type { PortfolioItem, Package, Testimonial } from "@shared/schema";

const HERO_IMAGES = ["/images/hero-1.png", "/images/hero-2.png", "/images/hero-3.png"];

const WHATSAPP_URL = "https://wa.me/966553011730";

const SERVICE_ICONS = [Palette, Layers, Eye, Monitor];
const SERVICE_KEYS = ["logoDesign", "brandIdentity", "visualIdentity", "webDesign"] as const;
const SERVICE_SLUGS = ["logo-design", "brand-identity", "visual-identity", "web-design"];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function HomePage() {
  const { lang } = useLanguage();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const { data: portfolio, isLoading: loadingWork } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  const { data: packages, isLoading: loadingPkgs } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  const { data: testimonials, isLoading: loadingTestimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        titleAr="الرئيسية"
        titleEn="Home"
        titleFr="Accueil"
        descriptionAr="بريميوم تارجت - وكالة سعودية متخصصة في تصميم الشعارات والهويات التجارية والبصرية والمواقع الإلكترونية"
        descriptionEn="Premium Target - Saudi agency specializing in logo design, brand identity, visual identity, and web design"
        descriptionFr="Premium Target - Agence saoudienne spécialisée en conception de logos, identité de marque et design web"
      />
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={HERO_IMAGES[currentSlide]}
              alt="Premium Target branding agency"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm" data-testid="badge-hero">
              <Sparkles className="w-3 h-3 me-1" />
              {lang === "ar" ? "وكالة إبداعية سعودية" : lang === "fr" ? "Agence cr\u00e9ative saoudienne" : "Saudi Creative Agency"}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading leading-tight mb-6 text-white drop-shadow-lg" data-testid="text-hero-title">
              {t("hero.title", lang)}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
              {t("hero.subtitle", lang)}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={`/${lang}/services`}>
                <Button size="lg" data-testid="button-hero-services">
                  {t("hero.cta", lang)}
                  <Arrow className="w-4 h-4 ms-2" />
                </Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="backdrop-blur-sm" data-testid="button-hero-contact">
                  {t("hero.cta2", lang)}
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: "150+", label: lang === "ar" ? "مشروع مكتمل" : lang === "fr" ? "Projets termin\u00e9s" : "Projects Completed" },
              { value: "50+", label: lang === "ar" ? "عميل سعيد" : lang === "fr" ? "Clients satisfaits" : "Happy Clients" },
              { value: "5+", label: lang === "ar" ? "سنوات خبرة" : lang === "fr" ? "Ann\u00e9es d'exp\u00e9rience" : "Years Experience" },
              { value: "100%", label: lang === "ar" ? "رضا العملاء" : lang === "fr" ? "Satisfaction client" : "Client Satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1" data-testid={`text-stat-${i}`}>{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Hero slideshow navigation">
            {HERO_IMAGES.map((_, i) => (
              <span
                key={i}
                role="tab"
                tabIndex={0}
                aria-selected={i === currentSlide}
                onClick={() => setCurrentSlide(i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setCurrentSlide(i); }}
                className={`inline-block rounded-full cursor-pointer transition-all duration-300 ${i === currentSlide ? "bg-white" : "bg-white/40"}`}
                style={{ width: i === currentSlide ? 32 : 10, height: 10 }}
                data-testid={`button-hero-dot-${i}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-3" data-testid="text-services-title">{t("services.title", lang)}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("services.subtitle", lang)}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_KEYS.map((key, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <motion.div
                  key={key}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <Link href={`/${lang}/services/${SERVICE_SLUGS[i]}`}>
                    <Card className="p-6 h-full hover-elevate cursor-pointer group" data-testid={`card-service-${key}`}>
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-base mb-2">{t(`services.${key}`, lang)}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t(`services.${key}Desc`, lang)}</p>
                      <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium">
                        {lang === "ar" ? "اكتشف المزيد" : lang === "fr" ? "En savoir plus" : "Learn more"}
                        <Arrow className="w-3 h-3" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-3" data-testid="text-work-title">{t("work.title", lang)}</h2>
              <p className="text-muted-foreground max-w-xl">{t("work.subtitle", lang)}</p>
            </div>
            <Link href={`/${lang}/work`}>
              <Button variant="outline" size="sm" data-testid="button-view-all-work">
                {t("work.viewAll", lang)}
                <Arrow className="w-3 h-3 ms-1" />
              </Button>
            </Link>
          </div>
          {loadingWork ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(portfolio || []).slice(0, 6).map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <Link href={`/${lang}/work/${item.slug}`}>
                    <Card className="overflow-visible hover-elevate cursor-pointer group" data-testid={`card-portfolio-${item.id}`}>
                      <div className="overflow-hidden rounded-t-md">
                        <img
                          src={item.featuredImage}
                          alt={getLocalizedField(item, "title", lang)}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5">
                        <Badge variant="secondary" className="mb-2 text-xs">{item.category}</Badge>
                        <h3 className="font-semibold text-base mb-1">{getLocalizedField(item, "title", lang)}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{getLocalizedField(item, "summary", lang)}</p>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-3">{t("process.title", lang)}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("process.subtitle", lang)}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((step, i) => {
              const icons = [Target, Sparkles, Palette, CheckCircle2];
              const StepIcon = icons[i];
              return (
                <motion.div
                  key={step}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <div className="text-center" data-testid={`process-step-${step}`}>
                    <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <StepIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-xs font-medium text-primary mb-2">
                      {lang === "ar" ? `الخطوة ${step}` : lang === "fr" ? `Étape ${step}` : `Step ${step}`}
                    </div>
                    <h3 className="font-semibold text-base mb-2">{t(`process.step${step}Title`, lang)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(`process.step${step}Desc`, lang)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-3">{t("whyUs.title", lang)}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("whyUs.subtitle", lang)}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                titleAr: "خبرة متخصصة",
                titleEn: "Specialized Expertise",
                titleFr: "Expertise spécialisée",
                descAr: "فريق من المحترفين المتخصصين في مجال الهوية التجارية والتصميم الإبداعي",
                descEn: "A team of professionals specialized in brand identity and creative design",
                descFr: "Une équipe de professionnels spécialisés en identité de marque et design créatif",
              },
              {
                icon: Target,
                titleAr: "نتائج ملموسة",
                titleEn: "Tangible Results",
                titleFr: "Résultats tangibles",
                descAr: "نركز على تحقيق نتائج قابلة للقياس تعزز نمو أعمالك",
                descEn: "We focus on delivering measurable results that boost your business growth",
                descFr: "Nous nous concentrons sur des résultats mesurables qui stimulent votre croissance",
              },
              {
                icon: Users,
                titleAr: "دعم مستمر",
                titleEn: "Ongoing Support",
                titleFr: "Support continu",
                descAr: "نقدم دعمًا مستمرًا لضمان نجاح علامتك التجارية على المدى الطويل",
                descEn: "We provide continuous support to ensure your brand's long-term success",
                descFr: "Nous offrons un support continu pour assurer le succès à long terme de votre marque",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <Card className="p-6 h-full" data-testid={`card-why-${i}`}>
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-base mb-2">
                      {lang === "ar" ? item.titleAr : lang === "fr" ? item.titleFr : item.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {lang === "ar" ? item.descAr : lang === "fr" ? item.descFr : item.descEn}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {!loadingTestimonials && testimonials && testimonials.length > 0 && (
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-3">{t("testimonials.title", lang)}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("testimonials.subtitle", lang)}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <Card className="p-6 h-full" data-testid={`card-testimonial-${item.id}`}>
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: item.rating || 5 }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">
                      "{getLocalizedField(item, "content", lang)}"
                    </p>
                    <div className="flex items-center gap-3 pt-3 border-t border-border">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                        {getLocalizedField(item, "name", lang).charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{getLocalizedField(item, "name", lang)}</div>
                        <div className="text-xs text-muted-foreground">{getLocalizedField(item, "role", lang)}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-4">
            {lang === "ar"
              ? "جاهز لبناء هوية علامتك التجارية؟"
              : lang === "fr"
              ? "Prêt à construire votre identité de marque ?"
              : "Ready to Build Your Brand Identity?"}
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            {lang === "ar"
              ? "تواصل معنا اليوم ودعنا نساعدك في تحويل رؤيتك إلى واقع"
              : lang === "fr"
              ? "Contactez-nous aujourd'hui et laissez-nous transformer votre vision en réalité"
              : "Get in touch today and let us transform your vision into reality"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" data-testid="button-cta-whatsapp">
                {t("cta.whatsapp", lang)}
              </Button>
            </a>
            <Link href={`/${lang}/contact`}>
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 no-default-hover-elevate" data-testid="button-cta-contact">
                {t("cta.startProject", lang)}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
