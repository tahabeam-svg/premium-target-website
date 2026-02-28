import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { useLocation } from "wouter";
import { type Lang, DEFAULT_LANG, getLang, isRTL, LANG_CONFIG } from "./i18n";

interface LanguageContextType {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (lang: Lang) => void;
  switchLang: (newLang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: DEFAULT_LANG,
  dir: "rtl",
  setLang: () => {},
  switchLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [lang, setLangState] = useState<Lang>(() => getLang(location));

  const dir = isRTL(lang) ? "rtl" : "ltr";

  useEffect(() => {
    const currentLang = getLang(location);
    if (currentLang !== lang) {
      setLangState(currentLang);
    }
  }, [location]);

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = LANG_CONFIG[lang].locale;
    const fontLink = lang === "ar"
      ? "'Noto Sans Arabic', 'IBM Plex Sans Arabic', 'Tajawal', sans-serif"
      : "'Inter', 'Plus Jakarta Sans', sans-serif";
    document.documentElement.style.setProperty("--font-sans", fontLink);
  }, [lang, dir]);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
  }, []);

  const switchLang = useCallback((newLang: Lang) => {
    const currentPath = location.replace(/^\/(ar|en|fr)/, "");
    const newPath = `/${newLang}${currentPath || ""}`;
    setLangState(newLang);
    setLocation(newPath);
  }, [location, setLocation]);

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
