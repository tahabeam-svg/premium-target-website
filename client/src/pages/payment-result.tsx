import { useLanguage } from "@/lib/language-context";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { SEO } from "@/components/seo";

export function PaymentSuccess() {
  const { lang } = useLanguage();
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");

  const { data, isLoading } = useQuery<{ status: string; customerEmail: string }>({
    queryKey: ["/api/checkout/status", sessionId],
    queryFn: async () => {
      const res = await fetch(`/api/checkout/status?session_id=${sessionId}`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    enabled: !!sessionId,
  });

  const isPaid = data?.status === "paid";

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <SEO
        titleAr="تم الدفع بنجاح"
        titleEn="Payment Successful"
        titleFr="Paiement réussi"
      />
      <Card className="max-w-md w-full p-8 text-center">
        {!sessionId ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <XCircle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h1 className="text-2xl font-bold font-heading">
              {lang === "ar" ? "جلسة دفع غير صالحة" : lang === "fr" ? "Session de paiement invalide" : "Invalid Payment Session"}
            </h1>
            <Link href={`/${lang}/pricing`}>
              <Button>{lang === "ar" ? "العودة للباقات" : lang === "fr" ? "Retour aux forfaits" : "Back to Pricing"}</Button>
            </Link>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-muted-foreground">
              {lang === "ar" ? "جاري التحقق من الدفع..." : lang === "fr" ? "Vérification du paiement..." : "Verifying payment..."}
            </p>
          </div>
        ) : isPaid ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold font-heading" data-testid="text-payment-success">
              {lang === "ar" ? "تم الدفع بنجاح!" : lang === "fr" ? "Paiement réussi !" : "Payment Successful!"}
            </h1>
            <p className="text-muted-foreground">
              {lang === "ar"
                ? "شكراً لك! سنتواصل معك قريباً لبدء العمل على مشروعك."
                : lang === "fr"
                ? "Merci ! Nous vous contacterons bientôt pour commencer votre projet."
                : "Thank you! We'll contact you shortly to begin work on your project."}
            </p>
            {data?.customerEmail && (
              <p className="text-sm text-muted-foreground">
                {lang === "ar" ? "تم إرسال التأكيد إلى:" : lang === "fr" ? "Confirmation envoyée à :" : "Confirmation sent to:"} {data.customerEmail}
              </p>
            )}
            <Link href={`/${lang}`}>
              <Button data-testid="button-back-home">
                {lang === "ar" ? "العودة للرئيسية" : lang === "fr" ? "Retour à l'accueil" : "Back to Home"}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <XCircle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h1 className="text-2xl font-bold font-heading">
              {lang === "ar" ? "لم يكتمل الدفع" : lang === "fr" ? "Paiement non complété" : "Payment Not Completed"}
            </h1>
            <p className="text-muted-foreground">
              {lang === "ar" ? "لم يتم تأكيد الدفع. يرجى المحاولة مرة أخرى." : lang === "fr" ? "Le paiement n'a pas été confirmé. Veuillez réessayer." : "The payment was not confirmed. Please try again."}
            </p>
            <Link href={`/${lang}/pricing`}>
              <Button>{lang === "ar" ? "العودة للباقات" : lang === "fr" ? "Retour aux forfaits" : "Back to Pricing"}</Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}

export function PaymentCancel() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <SEO
        titleAr="تم إلغاء الدفع"
        titleEn="Payment Cancelled"
        titleFr="Paiement annulé"
      />
      <Card className="max-w-md w-full p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <XCircle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="text-2xl font-bold font-heading" data-testid="text-payment-cancel">
            {lang === "ar" ? "تم إلغاء الدفع" : lang === "fr" ? "Paiement annulé" : "Payment Cancelled"}
          </h1>
          <p className="text-muted-foreground">
            {lang === "ar"
              ? "لم يتم خصم أي مبلغ. يمكنك المحاولة مرة أخرى أو التواصل معنا."
              : lang === "fr"
              ? "Aucun montant n'a été débité. Vous pouvez réessayer ou nous contacter."
              : "No amount was charged. You can try again or contact us."}
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link href={`/${lang}/pricing`}>
              <Button data-testid="button-back-pricing">
                {lang === "ar" ? "العودة للباقات" : lang === "fr" ? "Retour aux forfaits" : "Back to Pricing"}
              </Button>
            </Link>
            <a href="https://wa.me/966553011730" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" data-testid="button-contact-whatsapp">
                {lang === "ar" ? "تواصل معنا" : lang === "fr" ? "Contactez-nous" : "Contact Us"}
              </Button>
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
