import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/i18n";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { SEO } from "@/components/seo";
import { useState } from "react";

const WHATSAPP_URL = "https://wa.me/966553011730";

export default function ContactPage() {
  const { lang } = useLanguage();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      lang: lang,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      toast({
        title: lang === "ar" ? "تم الإرسال" : lang === "fr" ? "Envoyé" : "Sent",
        description: t("contact.success", lang),
      });
    },
    onError: () => {
      toast({
        title: lang === "ar" ? "خطأ" : lang === "fr" ? "Erreur" : "Error",
        description: lang === "ar" ? "حدث خطأ، يرجى المحاولة مرة أخرى" : lang === "fr" ? "Une erreur s'est produite" : "An error occurred, please try again",
        variant: "destructive",
      });
    },
  });

  const services = [
    { value: "logo-design", labelAr: "تصميم الشعارات", labelEn: "Logo Design", labelFr: "Création de logo" },
    { value: "brand-identity", labelAr: "الهوية التجارية", labelEn: "Brand Identity", labelFr: "Identité de marque" },
    { value: "visual-identity", labelAr: "الهوية البصرية", labelEn: "Visual Identity", labelFr: "Identité visuelle" },
    { value: "web-design", labelAr: "تصميم المواقع", labelEn: "Web Design", labelFr: "Design web" },
    { value: "other", labelAr: "أخرى", labelEn: "Other", labelFr: "Autre" },
  ];

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <SEO
        titleAr="تواصل معنا"
        titleEn="Contact Us"
        titleFr="Contactez-nous"
        descriptionAr="تواصل مع بريميوم تارجت للحصول على استشارة مجانية حول مشروع هويتك التجارية"
        descriptionEn="Contact Premium Target for a free consultation about your branding project"
        descriptionFr="Contactez Premium Target pour une consultation gratuite sur votre projet de branding"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 me-1" />
            {lang === "ar" ? "نحن هنا لمساعدتك" : lang === "fr" ? "Nous sommes là pour vous" : "We're Here to Help"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4" data-testid="text-contact-title">
            {t("contact.title", lang)}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle", lang)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2">
            {submitted ? (
              <Card className="p-8 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold font-heading mb-3" data-testid="text-thank-you-title">
                  {lang === "ar" ? "شكرًا لتواصلك معنا!" : lang === "fr" ? "Merci de nous avoir contactés !" : "Thank You for Reaching Out!"}
                </h2>
                <p className="text-muted-foreground mb-2">
                  {lang === "ar"
                    ? "تم استلام رسالتك بنجاح، وسيقوم فريقنا بمراجعتها في أقرب وقت."
                    : lang === "fr"
                    ? "Votre message a été reçu avec succès. Notre équipe l'examinera dans les plus brefs délais."
                    : "Your message has been received successfully. Our team will review it shortly."}
                </p>
                <p className="text-foreground font-medium mb-6">
                  {lang === "ar"
                    ? "لتسريع الرد والحصول على استشارة فورية مجانية، تواصل معنا مباشرة:"
                    : lang === "fr"
                    ? "Pour une réponse plus rapide et une consultation gratuite immédiate, contactez-nous directement :"
                    : "For a faster response and a free instant consultation, contact us directly:"}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button className="w-full bg-[#25D366] hover:bg-[#25D366] border-[#1da851] text-white no-default-hover-elevate" data-testid="button-whatsapp-reply">
                      <SiWhatsapp className="w-5 h-5 me-2" />
                      {lang === "ar" ? "تواصل عبر واتساب" : lang === "fr" ? "Contactez-nous sur WhatsApp" : "Chat on WhatsApp"}
                    </Button>
                  </a>
                  <a href="tel:+966553011730" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full" data-testid="button-call-reply">
                      <Phone className="w-5 h-5 me-2" />
                      {lang === "ar" ? "اتصل بنا الآن" : lang === "fr" ? "Appelez-nous maintenant" : "Call Us Now"}
                    </Button>
                  </a>
                </div>

                <div className="bg-primary/5 rounded-md p-4 mb-6">
                  <p className="text-sm text-muted-foreground">
                    {lang === "ar"
                      ? "فريقنا متاح من الأحد إلى الخميس، من 9 صباحًا حتى 6 مساءً. نحن نتطلع لمساعدتك في تحقيق رؤيتك!"
                      : lang === "fr"
                      ? "Notre équipe est disponible du dimanche au jeudi, de 9h à 18h. Nous avons hâte de vous aider à réaliser votre vision !"
                      : "Our team is available Sunday to Thursday, 9AM to 6PM. We look forward to helping you bring your vision to life!"}
                  </p>
                </div>

                <Button onClick={() => setSubmitted(false)} variant="ghost" className="text-muted-foreground" data-testid="button-send-another">
                  {lang === "ar" ? "إرسال رسالة أخرى" : lang === "fr" ? "Envoyer un autre message" : "Send Another Message"}
                </Button>
              </Card>
            ) : (
              <Card className="p-6 sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("contact.name", lang)}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("contact.name", lang)} {...field} data-testid="input-contact-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("contact.email", lang)}</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder={t("contact.email", lang)} {...field} data-testid="input-contact-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("contact.phone", lang)}</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+966" dir="ltr" {...field} data-testid="input-contact-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("contact.service", lang)}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-contact-service">
                                  <SelectValue placeholder={t("selectService", lang)} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {services.map((s) => (
                                  <SelectItem key={s.value} value={s.value} data-testid={`option-service-${s.value}`}>
                                    {lang === "ar" ? s.labelAr : lang === "fr" ? s.labelFr : s.labelEn}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.message", lang)}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("contact.message", lang)}
                              className="resize-none min-h-[120px]"
                              {...field}
                              data-testid="input-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={mutation.isPending} className="w-full sm:w-auto" data-testid="button-contact-submit">
                      {mutation.isPending ? (
                        <span>{t("loading", lang)}</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 me-2" />
                          {t("contact.send", lang)}
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-base mb-4">
                {lang === "ar" ? "معلومات التواصل" : lang === "fr" ? "Informations" : "Contact Info"}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      {lang === "ar" ? "العنوان" : lang === "fr" ? "Adresse" : "Address"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {lang === "ar" ? "الرياض، المملكة العربية السعودية" : lang === "fr" ? "Riyad, Arabie Saoudite" : "Riyadh, Saudi Arabia"}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      {lang === "ar" ? "الهاتف" : lang === "fr" ? "Téléphone" : "Phone"}
                    </p>
                    <a href="tel:+966553011730" className="text-sm text-muted-foreground hover:text-foreground" dir="ltr">
                      +966 553 011 730
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      {lang === "ar" ? "البريد" : "Email"}
                    </p>
                    <a href="mailto:info@premiumtarget.sa" className="text-sm text-muted-foreground hover:text-foreground">
                      info@premiumtarget.sa
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      {lang === "ar" ? "ساعات العمل" : lang === "fr" ? "Heures d'ouverture" : "Working Hours"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {lang === "ar" ? "الأحد - الخميس: 9ص - 6م" : lang === "fr" ? "Dim - Jeu: 9h - 18h" : "Sun - Thu: 9AM - 6PM"}
                    </p>
                  </div>
                </li>
              </ul>
            </Card>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block">
              <Card className="p-6 hover-elevate cursor-pointer bg-[#25D366]/5 border-[#25D366]/20" data-testid="card-whatsapp-cta">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                    <SiWhatsapp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t("cta.whatsapp", lang)}</p>
                    <p className="text-xs text-muted-foreground">
                      {lang === "ar" ? "ردود فورية على واتساب" : lang === "fr" ? "Réponses immédiates sur WhatsApp" : "Instant replies on WhatsApp"}
                    </p>
                  </div>
                </div>
              </Card>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
