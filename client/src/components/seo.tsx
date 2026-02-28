import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/lib/language-context";

interface SEOProps {
  titleAr?: string;
  titleEn?: string;
  titleFr?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  descriptionFr?: string;
  image?: string;
}

const SITE_NAME = {
  ar: "بريميوم تارجت",
  en: "Premium Target",
  fr: "Premium Target",
};

const DEFAULT_DESC = {
  ar: "وكالة سعودية متخصصة في تصميم الشعارات والهويات التجارية والبصرية والمواقع الإلكترونية",
  en: "Saudi agency specializing in logo design, brand identity, visual identity, and web design",
  fr: "Agence saoudienne spécialisée en conception de logos, identité de marque et design web",
};

export function SEO({ titleAr, titleEn, titleFr, descriptionAr, descriptionEn, descriptionFr, image }: SEOProps) {
  const { lang } = useLanguage();

  const titles = { ar: titleAr, en: titleEn, fr: titleFr };
  const descriptions = { ar: descriptionAr, en: descriptionEn, fr: descriptionFr };

  const pageTitle = titles[lang] || "";
  const fullTitle = pageTitle ? `${pageTitle} | ${SITE_NAME[lang]}` : SITE_NAME[lang];
  const description = descriptions[lang] || DEFAULT_DESC[lang];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
