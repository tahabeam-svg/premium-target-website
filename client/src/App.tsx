import { useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/lib/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getLang } from "@/lib/i18n";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import WhyUsPage from "@/pages/why-us";
import ProcessPage from "@/pages/process";
import { ServicesOverview, ServiceDetail } from "@/pages/services";
import { WorkOverview, WorkDetail } from "@/pages/work";
import { BlogOverview, BlogDetail } from "@/pages/blog";
import PricingPage from "@/pages/pricing";
import ContactPage from "@/pages/contact";
import FAQPage from "@/pages/faq";
import { PrivacyPolicy, TermsConditions, RefundPolicy } from "@/pages/legal";
import { PaymentSuccess, PaymentCancel } from "@/pages/payment-result";
import NotFound from "@/pages/not-found";
import AdminLoginPage from "@/pages/admin/login";
import AdminDashboardPage from "@/pages/admin/dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/ar" />
      </Route>

      <Route path="/admin/login" component={AdminLoginPage} />
      <Route path="/admin/dashboard" component={AdminDashboardPage} />

      <Route path="/:lang" component={HomePage} />
      <Route path="/:lang/about" component={AboutPage} />
      <Route path="/:lang/why-us" component={WhyUsPage} />
      <Route path="/:lang/process" component={ProcessPage} />
      <Route path="/:lang/services" component={ServicesOverview} />
      <Route path="/:lang/services/:slug" component={ServiceDetail} />
      <Route path="/:lang/work" component={WorkOverview} />
      <Route path="/:lang/work/:slug" component={WorkDetail} />
      <Route path="/:lang/blog" component={BlogOverview} />
      <Route path="/:lang/blog/:slug" component={BlogDetail} />
      <Route path="/:lang/pricing" component={PricingPage} />
      <Route path="/:lang/contact" component={ContactPage} />
      <Route path="/:lang/faq" component={FAQPage} />
      <Route path="/:lang/privacy-policy" component={PrivacyPolicy} />
      <Route path="/:lang/terms" component={TermsConditions} />
      <Route path="/:lang/refund-policy" component={RefundPolicy} />
      <Route path="/:lang/payment-success" component={PaymentSuccess} />
      <Route path="/:lang/payment-cancel" component={PaymentCancel} />

      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) {
    return <Router />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Router />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider>
            <LanguageProvider>
              <AppContent />
              <Toaster />
            </LanguageProvider>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
