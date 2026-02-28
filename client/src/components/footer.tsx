import { Link } from "wouter";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/i18n";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiWhatsapp, SiInstagram, SiX, SiLinkedin } from "react-icons/si";
import logoImg from "@assets/logo_Premium_Target_1770888120391.png";

const WHATSAPP_URL = "https://wa.me/966553011730";

export function Footer() {
  const { lang } = useLanguage();

  const services = [
    { key: "services.logoDesign", path: `/${lang}/services/logo-design` },
    { key: "services.brandIdentity", path: `/${lang}/services/brand-identity` },
    { key: "services.visualIdentity", path: `/${lang}/services/visual-identity` },
    { key: "services.webDesign", path: `/${lang}/services/web-design` },
  ];

  const quickLinks = [
    { key: "nav.about", path: `/${lang}/about` },
    { key: "nav.work", path: `/${lang}/work` },
    { key: "nav.pricing", path: `/${lang}/pricing` },
    { key: "nav.blog", path: `/${lang}/blog` },
    { key: "nav.faq", path: `/${lang}/faq` },
    { key: "nav.contact", path: `/${lang}/contact` },
  ];

  const legal = [
    { key: "footer.privacy", path: `/${lang}/privacy-policy` },
    { key: "footer.terms", path: `/${lang}/terms` },
    { key: "footer.refund", path: `/${lang}/refund-policy` },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="Premium Target" className="h-8 w-auto object-contain" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {lang === "ar"
                ? "وكالة سعودية متخصصة في تصميم الهويات التجارية والشعارات والمواقع الإلكترونية"
                : lang === "fr"
                ? "Agence saoudienne spécialisée en design de marque, logos et sites web"
                : "Saudi agency specializing in brand identity, logo, and web design"}
            </p>
            <div className="flex items-center gap-2">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-testid="link-footer-whatsapp" className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center hover-elevate">
                <SiWhatsapp className="w-4 h-4" />
              </a>
              <a href="#" data-testid="link-footer-instagram" className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center hover-elevate">
                <SiInstagram className="w-4 h-4" />
              </a>
              <a href="#" data-testid="link-footer-x" className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center hover-elevate">
                <SiX className="w-4 h-4" />
              </a>
              <a href="#" data-testid="link-footer-linkedin" className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center hover-elevate">
                <SiLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">{t("nav.services", lang)}</h3>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.key}>
                  <Link href={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid={`link-footer-${item.key}`}>
                    {t(item.key, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">
              {lang === "ar" ? "روابط سريعة" : lang === "fr" ? "Liens rapides" : "Quick Links"}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.key}>
                  <Link href={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid={`link-footer-${item.key}`}>
                    {t(item.key, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">
              {lang === "ar" ? "معلومات التواصل" : lang === "fr" ? "Informations de contact" : "Contact Info"}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {lang === "ar" ? "الرياض، المملكة العربية السعودية" : lang === "fr" ? "Riyad, Arabie Saoudite" : "Riyadh, Saudi Arabia"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <a href="tel:+966553011730" className="text-sm text-muted-foreground hover:text-foreground transition-colors" dir="ltr">
                  +966 553 011 730
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <a href="mailto:info@premiumtarget.sa" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  info@premiumtarget.sa
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {lang === "ar" ? "الأحد - الخميس: 9ص - 6م" : lang === "fr" ? "Dim - Jeu: 9h - 18h" : "Sun - Thu: 9AM - 6PM"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Premium Target. {t("footer.rights", lang)}.
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {legal.map((item) => (
                <Link key={item.key} href={item.path} className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid={`link-footer-${item.key}`}>
                  {t(item.key, lang)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
