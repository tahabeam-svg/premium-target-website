import { useState } from "react";
import { Link, useParams } from "wouter";
import { useLanguage } from "@/lib/language-context";
import { t, getLocalizedField } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Search, Calendar, Clock, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { PortfolioItem } from "@shared/schema";
import { SEO } from "@/components/seo";

const WHATSAPP_URL = "https://wa.me/966553011730";

export function WorkOverview() {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const { data: portfolio, isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  const categories = portfolio
    ? Array.from(new Set(portfolio.map((p) => p.category)))
    : [];

  const filtered = (portfolio || []).filter((item) => {
    const matchCategory = filter === "all" || item.category === filter;
    const matchSearch = !search || getLocalizedField(item, "title", lang).toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <SEO titleAr="أعمالنا" titleEn="Our Work" titleFr="Nos réalisations" descriptionAr="اكتشف مشاريعنا السابقة في تصميم الشعارات والهويات التجارية" descriptionEn="Discover our previous projects in logo design and brand identity" descriptionFr="Découvrez nos projets précédents en conception de logos et identité de marque" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 me-1" />
            {lang === "ar" ? "معرض أعمالنا" : lang === "fr" ? "Notre portfolio" : "Our Portfolio"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4" data-testid="text-work-page-title">
            {t("work.title", lang)}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("work.subtitle", lang)}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
          <div className="relative w-full sm:w-64">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("search.placeholder", lang)}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-9"
              data-testid="input-work-search"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              data-testid="filter-all"
            >
              {lang === "ar" ? "الكل" : lang === "fr" ? "Tout" : "All"}
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(cat)}
                data-testid={`filter-${cat}`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-52 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              {lang === "ar" ? "لا توجد نتائج" : lang === "fr" ? "Aucun résultat" : "No results found"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/${lang}/work/${item.slug}`}>
                  <Card className="overflow-visible hover-elevate cursor-pointer group" data-testid={`card-work-${item.id}`}>
                    <div className="overflow-hidden rounded-t-md">
                      <img
                        src={item.featuredImage}
                        alt={getLocalizedField(item, "title", lang)}
                        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <Badge variant="secondary" className="mb-2 text-xs">{item.category}</Badge>
                      <h3 className="font-semibold text-base mb-1">{getLocalizedField(item, "title", lang)}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{getLocalizedField(item, "summary", lang)}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function WorkDetail() {
  const params = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const { data: item, isLoading } = useQuery<PortfolioItem>({
    queryKey: ["/api/portfolio", params.slug],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-80 w-full rounded-md" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-heading mb-4">{t("notFound.title", lang)}</h1>
          <Link href={`/${lang}/work`}>
            <Button>{t("notFound.back", lang)}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`/${lang}/work`}>
          <Button variant="ghost" size="sm" className="mb-8" data-testid="button-back-work">
            <Arrow className="w-4 h-4 me-1 rotate-180" />
            {t("nav.work", lang)}
          </Button>
        </Link>

        <Badge variant="secondary" className="mb-4">{item.category}</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4" data-testid="text-work-detail-title">
          {getLocalizedField(item, "title", lang)}
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {getLocalizedField(item, "summary", lang)}
        </p>

        <div className="rounded-md overflow-hidden mb-10">
          <img
            src={item.featuredImage}
            alt={getLocalizedField(item, "title", lang)}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {getLocalizedField(item, "problem", lang) && (
            <Card className="p-6">
              <h2 className="font-semibold font-heading text-lg mb-3">
                {lang === "ar" ? "التحدي" : lang === "fr" ? "Le défi" : "The Challenge"}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {getLocalizedField(item, "problem", lang)}
              </p>
            </Card>
          )}
          {getLocalizedField(item, "solution", lang) && (
            <Card className="p-6">
              <h2 className="font-semibold font-heading text-lg mb-3">
                {lang === "ar" ? "الحل" : lang === "fr" ? "La solution" : "The Solution"}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {getLocalizedField(item, "solution", lang)}
              </p>
            </Card>
          )}
        </div>

        {item.deliverables && item.deliverables.length > 0 && (
          <div className="mb-10">
            <h2 className="font-semibold font-heading text-lg mb-4">
              {lang === "ar" ? "المخرجات" : lang === "fr" ? "Livrables" : "Deliverables"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {item.deliverables.map((d, i) => (
                <Badge key={i} variant="secondary">{d}</Badge>
              ))}
            </div>
          </div>
        )}

        {item.timeline && (
          <div className="flex items-center gap-2 mb-10 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{lang === "ar" ? "المدة:" : lang === "fr" ? "Durée :" : "Timeline:"} {item.timeline}</span>
          </div>
        )}

        {item.galleryImages && item.galleryImages.length > 0 && (
          <div className="mb-10">
            <h2 className="font-semibold font-heading text-lg mb-4">
              {lang === "ar" ? "معرض الصور" : lang === "fr" ? "Galerie" : "Gallery"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {item.galleryImages.map((img, i) => (
                <div key={i} className="rounded-md overflow-hidden">
                  <img src={img} alt={`${getLocalizedField(item, "title", lang)} ${i + 1}`} className="w-full h-auto object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

        <Card className="p-8 bg-primary text-primary-foreground text-center">
          <h2 className="text-xl font-bold font-heading mb-3">
            {lang === "ar" ? "أعجبك هذا المشروع؟" : lang === "fr" ? "Ce projet vous plaît ?" : "Like This Project?"}
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            {lang === "ar"
              ? "دعنا نصنع لك شيئًا مميزًا أيضًا"
              : lang === "fr"
              ? "Laissez-nous créer quelque chose d'unique pour vous aussi"
              : "Let us create something unique for you too"}
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" data-testid="button-work-cta-whatsapp">
              {t("cta.whatsapp", lang)}
            </Button>
          </a>
        </Card>
      </div>
    </div>
  );
}
