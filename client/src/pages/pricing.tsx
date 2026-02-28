import { Link } from "wouter";
import { useLanguage } from "@/lib/language-context";
import { t, getLocalizedField } from "@/lib/i18n";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Sparkles, Clock, RotateCcw, CreditCard, Loader2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { motion } from "framer-motion";
import { SEO } from "@/components/seo";
import type { Package } from "@shared/schema";

const WHATSAPP_URL = "https://wa.me/966553011730";

export default function PricingPage() {
  const { lang } = useLanguage();
  const { toast } = useToast();

  const { data: packages, isLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  const checkoutMutation = useMutation({
    mutationFn: async (packageId: number) => {
      const res = await apiRequest("POST", "/api/checkout", { packageId, lang });
      return res.json();
    },
    onSuccess: (data: { url: string }) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: () => {
      toast({
        title: lang === "ar" ? "خطأ" : lang === "fr" ? "Erreur" : "Error",
        description: lang === "ar" ? "نظام الدفع غير متوفر حالياً، تواصل معنا عبر واتساب" : lang === "fr" ? "Le système de paiement n'est pas disponible, contactez-nous via WhatsApp" : "Payment system is not available, please contact us via WhatsApp",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <SEO
        titleAr="باقاتنا والأسعار"
        titleEn="Pricing Packages"
        titleFr="Nos forfaits et tarifs"
        descriptionAr="باقات تصميم الشعارات والهويات التجارية بأسعار تنافسية ومناسبة لميزانيتك"
        descriptionEn="Logo design and brand identity packages at competitive prices to fit your budget"
        descriptionFr="Forfaits de conception de logos et d'identité de marque à des prix compétitifs"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 me-1" />
            {lang === "ar" ? "أسعار شفافة" : lang === "fr" ? "Tarifs transparents" : "Transparent Pricing"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4" data-testid="text-pricing-title">
            {t("pricing.title", lang)}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("pricing.subtitle", lang)}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-10 w-24 mb-4" />
                <div className="space-y-2">
                  {[0, 1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {(packages || []).map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={pkg.isPopular ? "relative" : ""}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 start-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-primary text-primary-foreground shadow-sm" data-testid="badge-popular">
                      {t("pricing.popular", lang)}
                    </Badge>
                  </div>
                )}
                <Card
                  className={`p-6 h-full flex flex-col ${pkg.isPopular ? "border-primary border-2" : ""}`}
                  data-testid={`card-package-${pkg.id}`}
                >
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-2">{getLocalizedField(pkg, "name", lang)}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{getLocalizedField(pkg, "description", lang)}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{pkg.priceSAR.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">{t("pricing.sar", lang)}</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 mb-6">
                    {pkg.includedItems && pkg.includedItems.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">{t("pricing.includes", lang)}</p>
                        <ul className="space-y-2">
                          {pkg.includedItems.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                      {pkg.deliveryTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{pkg.deliveryTime}</span>
                        </div>
                      )}
                      {pkg.revisions && (
                        <div className="flex items-center gap-1">
                          <RotateCcw className="w-3 h-3" />
                          <span>
                            {pkg.revisions} {lang === "ar" ? "مراجعات" : lang === "fr" ? "révisions" : "revisions"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      variant={pkg.isPopular ? "default" : "outline"}
                      onClick={() => checkoutMutation.mutate(pkg.id)}
                      disabled={checkoutMutation.isPending}
                      data-testid={`button-pay-${pkg.id}`}
                    >
                      {checkoutMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin me-2" />
                      ) : (
                        <CreditCard className="w-4 h-4 me-2" />
                      )}
                      {lang === "ar" ? "ادفع الآن" : lang === "fr" ? "Payer maintenant" : "Pay Now"}
                    </Button>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block">
                      <Button
                        className="w-full"
                        variant="ghost"
                        data-testid={`button-package-whatsapp-${pkg.id}`}
                      >
                        <SiWhatsapp className="w-4 h-4 me-2" />
                        {t("cta.whatsapp", lang)}
                      </Button>
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Card className="p-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold font-heading mb-3">
              {lang === "ar"
                ? "تحتاج باقة مخصصة؟"
                : lang === "fr"
                ? "Besoin d'un forfait personnalisé ?"
                : "Need a Custom Package?"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {lang === "ar"
                ? "تواصل معنا وسنصمم باقة تناسب احتياجاتك بالضبط"
                : lang === "fr"
                ? "Contactez-nous et nous concevrons un forfait adapté à vos besoins"
                : "Contact us and we'll design a package that fits your exact needs"}
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button data-testid="button-custom-package-cta">{t("cta.whatsapp", lang)}</Button>
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
