import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-provider";
import { t, type Lang, SUPPORTED_LANGS, LANG_CONFIG } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Sun, Moon, Globe, ChevronDown } from "lucide-react";
import logoImg from "@assets/logo_Premium_Target_1770888120391.png";

const NAV_ITEMS = [
  { key: "nav.home", path: "" },
  { key: "nav.services", path: "/services" },
  { key: "nav.work", path: "/work" },
  { key: "nav.pricing", path: "/pricing" },
  { key: "nav.about", path: "/about" },
  { key: "nav.blog", path: "/blog" },
  { key: "nav.contact", path: "/contact" },
];

export function Header() {
  const { lang, switchLang, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    const fullPath = `/${lang}${path}`;
    if (path === "") return location === `/${lang}` || location === `/${lang}/`;
    return location.startsWith(fullPath);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href={`/${lang}`} data-testid="link-logo">
            <div className="flex items-center gap-2">
              <img
                src={logoImg}
                alt="Premium Target"
                className="h-9 w-auto object-contain"
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
            {NAV_ITEMS.map((item) => (
              <Link key={item.key} href={`/${lang}${item.path}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm ${isActive(item.path) ? "bg-accent text-accent-foreground" : ""}`}
                  data-testid={`nav-${item.key}`}
                >
                  {t(item.key, lang)}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-lang-switcher">
                  <Globe className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={dir === "rtl" ? "start" : "end"}>
                {SUPPORTED_LANGS.map((l) => (
                  <DropdownMenuItem
                    key={l}
                    onClick={() => switchLang(l)}
                    className={l === lang ? "bg-accent" : ""}
                    data-testid={`lang-${l}`}
                  >
                    <span className="text-sm">{LANG_CONFIG[l].label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background" data-testid="nav-mobile">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link key={item.key} href={`/${lang}${item.path}`}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-base ${isActive(item.path) ? "bg-accent text-accent-foreground" : ""}`}
                  onClick={() => setMobileOpen(false)}
                  data-testid={`mobile-nav-${item.key}`}
                >
                  {t(item.key, lang)}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
