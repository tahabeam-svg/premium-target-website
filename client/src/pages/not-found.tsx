import { Link } from "wouter";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const { lang } = useLanguage();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl font-bold text-primary/20 mb-4">404</div>
        <h1 className="text-2xl font-bold font-heading mb-3" data-testid="text-404-title">
          {t("notFound.title", lang)}
        </h1>
        <p className="text-muted-foreground mb-6" data-testid="text-404-desc">
          {t("notFound.desc", lang)}
        </p>
        <Link href={`/${lang}`}>
          <Button data-testid="button-404-home">
            <Arrow className="w-4 h-4 me-2 rotate-180" />
            {t("notFound.back", lang)}
          </Button>
        </Link>
      </div>
    </div>
  );
}
