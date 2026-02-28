import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_URL = "https://wa.me/966553011730";

export function WhatsAppButton() {
  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "whatsapp_click",
        eventCategory: "engagement",
        eventAction: "click",
        eventLabel: "floating_whatsapp",
      });
    }
  };

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      data-testid="button-whatsapp-floating"
      className="fixed bottom-6 end-6 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp className="w-7 h-7 text-white" />
    </a>
  );
}
