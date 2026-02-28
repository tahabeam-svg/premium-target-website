import { Link, useParams } from "wouter";
import { useLanguage } from "@/lib/language-context";
import { t, getLocalizedField } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ArrowLeft, Calendar, User, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPost } from "@shared/schema";
import { SEO } from "@/components/seo";

export function BlogOverview() {
  const { lang } = useLanguage();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <SEO titleAr="المدونة" titleEn="Blog" titleFr="Blog" descriptionAr="مقالات ونصائح في عالم التصميم والهويات التجارية" descriptionEn="Articles and tips about design and brand identity" descriptionFr="Articles et conseils sur le design et l'identité de marque" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 me-1" />
            {lang === "ar" ? "أحدث المقالات" : lang === "fr" ? "Derniers articles" : "Latest Articles"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4" data-testid="text-blog-title">
            {t("nav.blog", lang)}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {lang === "ar"
              ? "مقالات ونصائح حول التصميم والهوية التجارية"
              : lang === "fr"
              ? "Articles et conseils sur le design et l'identité de marque"
              : "Articles and tips about design and brand identity"}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : (posts || []).length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              {lang === "ar" ? "لا توجد مقالات بعد" : lang === "fr" ? "Pas encore d'articles" : "No articles yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(posts || []).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/${lang}/blog/${post.slug}`}>
                  <Card className="overflow-visible hover-elevate cursor-pointer group h-full" data-testid={`card-blog-${post.id}`}>
                    {post.featuredImage && (
                      <div className="overflow-hidden rounded-t-md">
                        <img
                          src={post.featuredImage}
                          alt={getLocalizedField(post, "title", lang)}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      {post.category && (
                        <Badge variant="secondary" className="mb-2 text-xs">{post.category}</Badge>
                      )}
                      <h3 className="font-semibold text-base mb-2">{getLocalizedField(post, "title", lang)}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {getLocalizedField(post, "excerpt", lang)}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {post.author && (
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </span>
                        )}
                        {post.publishDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.publishDate).toLocaleDateString(
                              lang === "ar" ? "ar-SA" : lang === "fr" ? "fr-FR" : "en-US"
                            )}
                          </span>
                        )}
                      </div>
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

export function BlogDetail() {
  const params = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ["/api/blog", params.slug],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full rounded-md" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-heading mb-4">{t("notFound.title", lang)}</h1>
          <Link href={`/${lang}/blog`}>
            <Button>{t("notFound.back", lang)}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`/${lang}/blog`}>
          <Button variant="ghost" size="sm" className="mb-8" data-testid="button-back-blog">
            <Arrow className="w-4 h-4 me-1 rotate-180" />
            {t("nav.blog", lang)}
          </Button>
        </Link>

        {post.category && <Badge variant="secondary" className="mb-4">{post.category}</Badge>}

        <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4" data-testid="text-blog-detail-title">
          {getLocalizedField(post, "title", lang)}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          {post.author && (
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          )}
          {post.publishDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishDate).toLocaleDateString(
                lang === "ar" ? "ar-SA" : lang === "fr" ? "fr-FR" : "en-US"
              )}
            </span>
          )}
        </div>

        {post.featuredImage && (
          <div className="rounded-md overflow-hidden mb-10">
            <img
              src={post.featuredImage}
              alt={getLocalizedField(post, "title", lang)}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="prose prose-sm dark:prose-invert max-w-none">
          {getLocalizedField(post, "body", lang).split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border flex items-center gap-2 flex-wrap">
            {post.tags.map((tag, i) => (
              <Badge key={i} variant="outline">{tag}</Badge>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
