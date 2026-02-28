import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles } from "lucide-react";
import { SEO } from "@/components/seo";

const FAQ_DATA = [
  {
    qAr: "كم تستغرق عملية تصميم الشعار؟",
    qEn: "How long does the logo design process take?",
    qFr: "Combien de temps dure le processus de conception de logo ?",
    aAr: "تستغرق عملية تصميم الشعار عادةً من 5 إلى 7 أيام عمل، تشمل البحث والتطوير والمراجعات. قد تختلف المدة حسب تعقيد المشروع.",
    aEn: "The logo design process typically takes 5-7 business days, including research, development, and revisions. Timeline may vary based on project complexity.",
    aFr: "Le processus de conception de logo prend généralement 5 à 7 jours ouvrables, incluant la recherche, le développement et les révisions.",
  },
  {
    qAr: "ما الفرق بين الهوية التجارية والهوية البصرية؟",
    qEn: "What's the difference between brand identity and visual identity?",
    qFr: "Quelle est la différence entre l'identité de marque et l'identité visuelle ?",
    aAr: "الهوية التجارية تشمل الاستراتيجية الكاملة للعلامة: القيم، الرسائل، نبرة الصوت، بالإضافة للعناصر المرئية. أما الهوية البصرية فتركز على العناصر المرئية فقط: الألوان، الخطوط، التصاميم.",
    aEn: "Brand identity encompasses the complete brand strategy: values, messaging, tone of voice, plus visual elements. Visual identity focuses solely on visual elements: colors, typography, and designs.",
    aFr: "L'identité de marque englobe la stratégie complète : valeurs, messages, ton de voix, plus les éléments visuels. L'identité visuelle se concentre uniquement sur les éléments visuels.",
  },
  {
    qAr: "هل تقدمون خدمات تصميم المواقع الإلكترونية؟",
    qEn: "Do you offer website design services?",
    qFr: "Offrez-vous des services de conception de sites web ?",
    aAr: "نعم، نقدم خدمات تصميم وتطوير المواقع الإلكترونية بأحدث التقنيات مع التركيز على تجربة المستخدم والأداء العالي.",
    aEn: "Yes, we offer website design and development services using the latest technologies, focusing on user experience and high performance.",
    aFr: "Oui, nous offrons des services de conception et développement de sites web avec les dernières technologies.",
  },
  {
    qAr: "كيف يمكنني التواصل معكم للحصول على عرض سعر؟",
    qEn: "How can I contact you for a price quote?",
    qFr: "Comment puis-je vous contacter pour un devis ?",
    aAr: "يمكنك التواصل معنا عبر واتساب على الرقم +966553011730 أو من خلال نموذج التواصل في الموقع أو عبر البريد الإلكتروني info@premiumtarget.sa",
    aEn: "You can contact us via WhatsApp at +966553011730, through the contact form on our website, or via email at info@premiumtarget.sa",
    aFr: "Vous pouvez nous contacter via WhatsApp au +966553011730, via le formulaire de contact ou par email à info@premiumtarget.sa",
  },
  {
    qAr: "هل تعملون مع العملاء خارج المملكة العربية السعودية؟",
    qEn: "Do you work with clients outside Saudi Arabia?",
    qFr: "Travaillez-vous avec des clients en dehors de l'Arabie Saoudite ?",
    aAr: "نعم، نعمل مع عملاء من جميع أنحاء العالم. نستخدم أدوات تواصل حديثة لضمان سير العمل بسلاسة مع العملاء في أي مكان.",
    aEn: "Yes, we work with clients worldwide. We use modern communication tools to ensure smooth workflow with clients anywhere.",
    aFr: "Oui, nous travaillons avec des clients du monde entier. Nous utilisons des outils de communication modernes.",
  },
  {
    qAr: "ما هي طرق الدفع المتاحة؟",
    qEn: "What payment methods are available?",
    qFr: "Quels modes de paiement sont disponibles ?",
    aAr: "نقبل التحويل البنكي والدفع عبر بطاقات الائتمان. يتم الدفع على مرحلتين: 50% مقدمًا و50% عند التسليم.",
    aEn: "We accept bank transfer and credit card payments. Payment is made in two installments: 50% upfront and 50% upon delivery.",
    aFr: "Nous acceptons les virements bancaires et les paiements par carte de crédit. Le paiement se fait en deux fois : 50% d'avance et 50% à la livraison.",
  },
  {
    qAr: "هل تقدمون استشارات مجانية؟",
    qEn: "Do you offer free consultations?",
    qFr: "Offrez-vous des consultations gratuites ?",
    aAr: "نعم، نقدم استشارة أولية مجانية لفهم احتياجاتك ومناقشة مشروعك قبل تقديم عرض السعر.",
    aEn: "Yes, we offer a free initial consultation to understand your needs and discuss your project before providing a quote.",
    aFr: "Oui, nous offrons une consultation initiale gratuite pour comprendre vos besoins et discuter de votre projet.",
  },
  {
    qAr: "كم عدد المراجعات المسموح بها؟",
    qEn: "How many revisions are allowed?",
    qFr: "Combien de révisions sont autorisées ?",
    aAr: "يعتمد عدد المراجعات على الباقة المختارة. عادةً نقدم 2-5 مراجعات مجانية حسب نوع الخدمة.",
    aEn: "The number of revisions depends on the chosen package. We typically offer 2-5 free revisions depending on the service type.",
    aFr: "Le nombre de révisions dépend du forfait choisi. Nous offrons généralement 2 à 5 révisions gratuites selon le type de service.",
  },
];

export default function FAQPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <SEO titleAr="الأسئلة الشائعة" titleEn="FAQ" titleFr="FAQ" descriptionAr="إجابات على الأسئلة الأكثر شيوعًا حول خدماتنا" descriptionEn="Answers to frequently asked questions about our services" descriptionFr="Réponses aux questions fréquemment posées sur nos services" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 me-1" />
            {lang === "ar" ? "لديك سؤال؟" : lang === "fr" ? "Une question ?" : "Have a Question?"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4" data-testid="text-faq-title">
            {t("faq.title", lang)}
          </h1>
          <p className="text-lg text-muted-foreground">{t("faq.subtitle", lang)}</p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {FAQ_DATA.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-md px-4" data-testid={`faq-accordion-${i}`}>
              <AccordionTrigger className="text-start text-sm font-medium py-4">
                {lang === "ar" ? item.qAr : lang === "fr" ? item.qFr : item.qEn}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                {lang === "ar" ? item.aAr : lang === "fr" ? item.aFr : item.aEn}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
