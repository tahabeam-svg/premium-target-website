import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { PortfolioItem, BlogPost, Package, Testimonial, ContactInquiry, Payment } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  PackageIcon,
  MessageSquare,
  Mail,
  CreditCard,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";

type Section = "overview" | "portfolio" | "blog" | "packages" | "testimonials" | "inquiries" | "payments";

interface AdminStats {
  portfolio: number;
  blog: number;
  packages: number;
  testimonials: number;
  inquiries: number;
  payments: number;
}

const navItems: { key: Section; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "portfolio", label: "Portfolio", icon: Briefcase },
  { key: "blog", label: "Blog", icon: FileText },
  { key: "packages", label: "Packages", icon: PackageIcon },
  { key: "testimonials", label: "Testimonials", icon: MessageSquare },
  { key: "inquiries", label: "Inquiries", icon: Mail },
  { key: "payments", label: "Payments", icon: CreditCard },
];

// --- Schemas ---
const portfolioSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  titleEn: z.string().min(1, "English title is required"),
  titleFr: z.string().min(1, "French title is required"),
  summaryAr: z.string().min(1, "Arabic summary is required"),
  summaryEn: z.string().min(1, "English summary is required"),
  summaryFr: z.string().min(1, "French summary is required"),
  problemAr: z.string().optional().default(""),
  problemEn: z.string().optional().default(""),
  problemFr: z.string().optional().default(""),
  solutionAr: z.string().optional().default(""),
  solutionEn: z.string().optional().default(""),
  solutionFr: z.string().optional().default(""),
  category: z.string().min(1, "Category is required"),
  industry: z.string().optional().default(""),
  featuredImage: z.string().min(1, "Featured image is required"),
  galleryImages: z.string().optional().default(""),
  deliverables: z.string().optional().default(""),
  timeline: z.string().optional().default(""),
  services: z.string().optional().default(""),
  published: z.boolean().default(true),
});

const blogSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  titleAr: z.string().min(1, "Arabic title is required"),
  titleEn: z.string().min(1, "English title is required"),
  titleFr: z.string().min(1, "French title is required"),
  excerptAr: z.string().optional().default(""),
  excerptEn: z.string().optional().default(""),
  excerptFr: z.string().optional().default(""),
  bodyAr: z.string().optional().default(""),
  bodyEn: z.string().optional().default(""),
  bodyFr: z.string().optional().default(""),
  featuredImage: z.string().optional().default(""),
  category: z.string().optional().default(""),
  tags: z.string().optional().default(""),
  author: z.string().optional().default(""),
  published: z.boolean().default(true),
});

const packageSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  nameAr: z.string().min(1, "Arabic name is required"),
  nameEn: z.string().min(1, "English name is required"),
  nameFr: z.string().min(1, "French name is required"),
  descriptionAr: z.string().min(1, "Arabic description is required"),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionFr: z.string().min(1, "French description is required"),
  priceSAR: z.coerce.number().min(0, "Price must be positive"),
  includedItems: z.string().optional().default(""),
  deliveryTime: z.string().optional().default(""),
  revisions: z.coerce.number().optional().default(0),
  isPopular: z.boolean().default(false),
  category: z.string().optional().default(""),
  sortOrder: z.coerce.number().optional().default(0),
});

const testimonialSchema = z.object({
  nameAr: z.string().min(1, "Arabic name is required"),
  nameEn: z.string().min(1, "English name is required"),
  nameFr: z.string().min(1, "French name is required"),
  roleAr: z.string().optional().default(""),
  roleEn: z.string().optional().default(""),
  roleFr: z.string().optional().default(""),
  contentAr: z.string().min(1, "Arabic content is required"),
  contentEn: z.string().min(1, "English content is required"),
  contentFr: z.string().min(1, "French content is required"),
  company: z.string().optional().default(""),
  avatar: z.string().optional().default(""),
  rating: z.coerce.number().min(1).max(5).default(5),
  published: z.boolean().default(true),
});

function splitToArray(val: string): string[] | undefined {
  if (!val || !val.trim()) return undefined;
  return val.split(",").map((s) => s.trim()).filter(Boolean);
}

// --- Overview Section ---
function OverviewSection() {
  const { data: stats, isLoading } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const cards = [
    { label: "Portfolio", value: stats?.portfolio ?? 0, icon: Briefcase },
    { label: "Blog Posts", value: stats?.blog ?? 0, icon: FileText },
    { label: "Packages", value: stats?.packages ?? 0, icon: PackageIcon },
    { label: "Testimonials", value: stats?.testimonials ?? 0, icon: MessageSquare },
    { label: "Inquiries", value: stats?.inquiries ?? 0, icon: Mail },
    { label: "Payments", value: stats?.payments ?? 0, icon: CreditCard },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6" data-testid="text-overview-title">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.label}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid={`text-stat-${card.label.toLowerCase().replace(/\s/g, "-")}`}>
                {card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// --- Portfolio Section ---
function PortfolioSection() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: items = [], isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/admin/portfolio"],
  });

  const form = useForm<z.infer<typeof portfolioSchema>>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      slug: "", titleAr: "", titleEn: "", titleFr: "",
      summaryAr: "", summaryEn: "", summaryFr: "",
      problemAr: "", problemEn: "", problemFr: "",
      solutionAr: "", solutionEn: "", solutionFr: "",
      category: "", industry: "", featuredImage: "",
      galleryImages: "", deliverables: "", timeline: "", services: "",
      published: true,
    },
  });

  function openCreate() {
    setEditItem(null);
    form.reset({
      slug: "", titleAr: "", titleEn: "", titleFr: "",
      summaryAr: "", summaryEn: "", summaryFr: "",
      problemAr: "", problemEn: "", problemFr: "",
      solutionAr: "", solutionEn: "", solutionFr: "",
      category: "", industry: "", featuredImage: "",
      galleryImages: "", deliverables: "", timeline: "", services: "",
      published: true,
    });
    setDialogOpen(true);
  }

  function openEdit(item: PortfolioItem) {
    setEditItem(item);
    form.reset({
      slug: item.slug,
      titleAr: item.titleAr, titleEn: item.titleEn, titleFr: item.titleFr,
      summaryAr: item.summaryAr, summaryEn: item.summaryEn, summaryFr: item.summaryFr,
      problemAr: item.problemAr ?? "", problemEn: item.problemEn ?? "", problemFr: item.problemFr ?? "",
      solutionAr: item.solutionAr ?? "", solutionEn: item.solutionEn ?? "", solutionFr: item.solutionFr ?? "",
      category: item.category, industry: item.industry ?? "",
      featuredImage: item.featuredImage,
      galleryImages: item.galleryImages?.join(", ") ?? "",
      deliverables: item.deliverables?.join(", ") ?? "",
      timeline: item.timeline ?? "",
      services: item.services?.join(", ") ?? "",
      published: item.published ?? true,
    });
    setDialogOpen(true);
  }

  const saveMutation = useMutation({
    mutationFn: async (data: z.infer<typeof portfolioSchema>) => {
      const payload = {
        ...data,
        galleryImages: splitToArray(data.galleryImages ?? ""),
        deliverables: splitToArray(data.deliverables ?? ""),
        services: splitToArray(data.services ?? ""),
        industry: data.industry || null,
        problemAr: data.problemAr || null,
        problemEn: data.problemEn || null,
        problemFr: data.problemFr || null,
        solutionAr: data.solutionAr || null,
        solutionEn: data.solutionEn || null,
        solutionFr: data.solutionFr || null,
        timeline: data.timeline || null,
      };
      if (editItem) {
        await apiRequest("PATCH", `/api/admin/portfolio/${editItem.id}`, payload);
      } else {
        await apiRequest("POST", "/api/admin/portfolio", payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setDialogOpen(false);
      toast({ title: editItem ? "Portfolio updated" : "Portfolio created" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/portfolio/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setDeleteId(null);
      toast({ title: "Portfolio item deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <h2 className="text-2xl font-semibold" data-testid="text-portfolio-title">Portfolio</h2>
        <Button onClick={openCreate} data-testid="button-create-portfolio">
          <Plus className="mr-2 h-4 w-4" /> Add Portfolio
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-12" data-testid="text-portfolio-empty">No portfolio items yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium">Title (EN)</th>
                <th className="text-left py-3 px-2 font-medium">Category</th>
                <th className="text-left py-3 px-2 font-medium">Status</th>
                <th className="text-right py-3 px-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b" data-testid={`row-portfolio-${item.id}`}>
                  <td className="py-3 px-2">{item.titleEn}</td>
                  <td className="py-3 px-2">{item.category}</td>
                  <td className="py-3 px-2">
                    <Badge variant={item.published ? "default" : "secondary"} className="no-default-active-elevate">
                      {item.published ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(item)} data-testid={`button-edit-portfolio-${item.id}`}>
                        <Pencil />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setDeleteId(item.id)} data-testid={`button-delete-portfolio-${item.id}`}>
                        <Trash2 />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Portfolio" : "Create Portfolio"}</DialogTitle>
            <DialogDescription>Fill in the portfolio item details below.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => saveMutation.mutate(data))} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="slug" render={({ field }) => (
                  <FormItem><FormLabel>Slug</FormLabel><FormControl><Input data-testid="input-portfolio-slug" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem><FormLabel>Category</FormLabel><FormControl><Input data-testid="input-portfolio-category" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="titleAr" render={({ field }) => (
                  <FormItem><FormLabel>Title (AR)</FormLabel><FormControl><Input data-testid="input-portfolio-titleAr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="titleEn" render={({ field }) => (
                  <FormItem><FormLabel>Title (EN)</FormLabel><FormControl><Input data-testid="input-portfolio-titleEn" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="titleFr" render={({ field }) => (
                  <FormItem><FormLabel>Title (FR)</FormLabel><FormControl><Input data-testid="input-portfolio-titleFr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="summaryAr" render={({ field }) => (
                  <FormItem><FormLabel>Summary (AR)</FormLabel><FormControl><Textarea data-testid="input-portfolio-summaryAr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="summaryEn" render={({ field }) => (
                  <FormItem><FormLabel>Summary (EN)</FormLabel><FormControl><Textarea data-testid="input-portfolio-summaryEn" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="summaryFr" render={({ field }) => (
                  <FormItem><FormLabel>Summary (FR)</FormLabel><FormControl><Textarea data-testid="input-portfolio-summaryFr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="featuredImage" render={({ field }) => (
                <FormItem><FormLabel>Featured Image URL</FormLabel><FormControl><Input data-testid="input-portfolio-featuredImage" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="industry" render={({ field }) => (
                  <FormItem><FormLabel>Industry</FormLabel><FormControl><Input data-testid="input-portfolio-industry" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="timeline" render={({ field }) => (
                  <FormItem><FormLabel>Timeline</FormLabel><FormControl><Input data-testid="input-portfolio-timeline" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="galleryImages" render={({ field }) => (
                <FormItem><FormLabel>Gallery Images (comma-separated URLs)</FormLabel><FormControl><Input data-testid="input-portfolio-galleryImages" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="deliverables" render={({ field }) => (
                <FormItem><FormLabel>Deliverables (comma-separated)</FormLabel><FormControl><Input data-testid="input-portfolio-deliverables" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="services" render={({ field }) => (
                <FormItem><FormLabel>Services (comma-separated)</FormLabel><FormControl><Input data-testid="input-portfolio-services" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="published" render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <input type="checkbox" checked={field.value} onChange={field.onChange} data-testid="input-portfolio-published" className="rounded" />
                  </FormControl>
                  <FormLabel className="!mt-0">Published</FormLabel>
                </FormItem>
              )} />
              <DialogFooter>
                <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-portfolio">
                  {saveMutation.isPending ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>Are you sure you want to delete this portfolio item? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteId(null)} data-testid="button-cancel-delete-portfolio">Cancel</Button>
            <Button variant="destructive" onClick={() => deleteId && deleteMutation.mutate(deleteId)} disabled={deleteMutation.isPending} data-testid="button-confirm-delete-portfolio">
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- Blog Section ---
function BlogSection() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<BlogPost | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: items = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog"],
  });

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      slug: "", titleAr: "", titleEn: "", titleFr: "",
      excerptAr: "", excerptEn: "", excerptFr: "",
      bodyAr: "", bodyEn: "", bodyFr: "",
      featuredImage: "", category: "", tags: "", author: "",
      published: true,
    },
  });

  function openCreate() {
    setEditItem(null);
    form.reset({
      slug: "", titleAr: "", titleEn: "", titleFr: "",
      excerptAr: "", excerptEn: "", excerptFr: "",
      bodyAr: "", bodyEn: "", bodyFr: "",
      featuredImage: "", category: "", tags: "", author: "",
      published: true,
    });
    setDialogOpen(true);
  }

  function openEdit(item: BlogPost) {
    setEditItem(item);
    form.reset({
      slug: item.slug,
      titleAr: item.titleAr, titleEn: item.titleEn, titleFr: item.titleFr,
      excerptAr: item.excerptAr ?? "", excerptEn: item.excerptEn ?? "", excerptFr: item.excerptFr ?? "",
      bodyAr: item.bodyAr ?? "", bodyEn: item.bodyEn ?? "", bodyFr: item.bodyFr ?? "",
      featuredImage: item.featuredImage ?? "", category: item.category ?? "",
      tags: item.tags?.join(", ") ?? "", author: item.author ?? "",
      published: item.published ?? true,
    });
    setDialogOpen(true);
  }

  const saveMutation = useMutation({
    mutationFn: async (data: z.infer<typeof blogSchema>) => {
      const payload = {
        ...data,
        tags: splitToArray(data.tags ?? ""),
        excerptAr: data.excerptAr || null,
        excerptEn: data.excerptEn || null,
        excerptFr: data.excerptFr || null,
        bodyAr: data.bodyAr || null,
        bodyEn: data.bodyEn || null,
        bodyFr: data.bodyFr || null,
        featuredImage: data.featuredImage || null,
        category: data.category || null,
        author: data.author || null,
      };
      if (editItem) {
        await apiRequest("PATCH", `/api/admin/blog/${editItem.id}`, payload);
      } else {
        await apiRequest("POST", "/api/admin/blog", payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setDialogOpen(false);
      toast({ title: editItem ? "Blog post updated" : "Blog post created" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/blog/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setDeleteId(null);
      toast({ title: "Blog post deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <h2 className="text-2xl font-semibold" data-testid="text-blog-title">Blog Posts</h2>
        <Button onClick={openCreate} data-testid="button-create-blog">
          <Plus className="mr-2 h-4 w-4" /> Add Blog Post
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-12" data-testid="text-blog-empty">No blog posts yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium">Title (EN)</th>
                <th className="text-left py-3 px-2 font-medium">Category</th>
                <th className="text-left py-3 px-2 font-medium">Author</th>
                <th className="text-left py-3 px-2 font-medium">Status</th>
                <th className="text-right py-3 px-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b" data-testid={`row-blog-${item.id}`}>
                  <td className="py-3 px-2">{item.titleEn}</td>
                  <td className="py-3 px-2">{item.category ?? "-"}</td>
                  <td className="py-3 px-2">{item.author ?? "-"}</td>
                  <td className="py-3 px-2">
                    <Badge variant={item.published ? "default" : "secondary"} className="no-default-active-elevate">
                      {item.published ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(item)} data-testid={`button-edit-blog-${item.id}`}>
                        <Pencil />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setDeleteId(item.id)} data-testid={`button-delete-blog-${item.id}`}>
                        <Trash2 />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Blog Post" : "Create Blog Post"}</DialogTitle>
            <DialogDescription>Fill in the blog post details below.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => saveMutation.mutate(data))} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="slug" render={({ field }) => (
                  <FormItem><FormLabel>Slug</FormLabel><FormControl><Input data-testid="input-blog-slug" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem><FormLabel>Category</FormLabel><FormControl><Input data-testid="input-blog-category" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="titleAr" render={({ field }) => (
                  <FormItem><FormLabel>Title (AR)</FormLabel><FormControl><Input data-testid="input-blog-titleAr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="titleEn" render={({ field }) => (
                  <FormItem><FormLabel>Title (EN)</FormLabel><FormControl><Input data-testid="input-blog-titleEn" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="titleFr" render={({ field }) => (
                  <FormItem><FormLabel>Title (FR)</FormLabel><FormControl><Input data-testid="input-blog-titleFr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="bodyAr" render={({ field }) => (
                  <FormItem><FormLabel>Body (AR)</FormLabel><FormControl><Textarea data-testid="input-blog-bodyAr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="bodyEn" render={({ field }) => (
                  <FormItem><FormLabel>Body (EN)</FormLabel><FormControl><Textarea data-testid="input-blog-bodyEn" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="bodyFr" render={({ field }) => (
                  <FormItem><FormLabel>Body (FR)</FormLabel><FormControl><Textarea data-testid="input-blog-bodyFr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="featuredImage" render={({ field }) => (
                  <FormItem><FormLabel>Featured Image URL</FormLabel><FormControl><Input data-testid="input-blog-featuredImage" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="author" render={({ field }) => (
                  <FormItem><FormLabel>Author</FormLabel><FormControl><Input data-testid="input-blog-author" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="tags" render={({ field }) => (
                <FormItem><FormLabel>Tags (comma-separated)</FormLabel><FormControl><Input data-testid="input-blog-tags" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="published" render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <input type="checkbox" checked={field.value} onChange={field.onChange} data-testid="input-blog-published" className="rounded" />
                  </FormControl>
                  <FormLabel className="!mt-0">Published</FormLabel>
                </FormItem>
              )} />
              <DialogFooter>
                <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-blog">
                  {saveMutation.isPending ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>Are you sure you want to delete this blog post? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteId(null)} data-testid="button-cancel-delete-blog">Cancel</Button>
            <Button variant="destructive" onClick={() => deleteId && deleteMutation.mutate(deleteId)} disabled={deleteMutation.isPending} data-testid="button-confirm-delete-blog">
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- Packages Section ---
function PackagesSection() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Package | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: items = [], isLoading } = useQuery<Package[]>({
    queryKey: ["/api/admin/packages"],
  });

  const form = useForm<z.infer<typeof packageSchema>>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      slug: "", nameAr: "", nameEn: "", nameFr: "",
      descriptionAr: "", descriptionEn: "", descriptionFr: "",
      priceSAR: 0, includedItems: "", deliveryTime: "",
      revisions: 0, isPopular: false, category: "", sortOrder: 0,
    },
  });

  function openCreate() {
    setEditItem(null);
    form.reset({
      slug: "", nameAr: "", nameEn: "", nameFr: "",
      descriptionAr: "", descriptionEn: "", descriptionFr: "",
      priceSAR: 0, includedItems: "", deliveryTime: "",
      revisions: 0, isPopular: false, category: "", sortOrder: 0,
    });
    setDialogOpen(true);
  }

  function openEdit(item: Package) {
    setEditItem(item);
    form.reset({
      slug: item.slug,
      nameAr: item.nameAr, nameEn: item.nameEn, nameFr: item.nameFr,
      descriptionAr: item.descriptionAr, descriptionEn: item.descriptionEn, descriptionFr: item.descriptionFr,
      priceSAR: item.priceSAR,
      includedItems: item.includedItems?.join(", ") ?? "",
      deliveryTime: item.deliveryTime ?? "",
      revisions: item.revisions ?? 0,
      isPopular: item.isPopular ?? false,
      category: item.category ?? "",
      sortOrder: item.sortOrder ?? 0,
    });
    setDialogOpen(true);
  }

  const saveMutation = useMutation({
    mutationFn: async (data: z.infer<typeof packageSchema>) => {
      const payload = {
        ...data,
        includedItems: splitToArray(data.includedItems ?? ""),
        deliveryTime: data.deliveryTime || null,
        category: data.category || null,
      };
      if (editItem) {
        await apiRequest("PATCH", `/api/admin/packages/${editItem.id}`, payload);
      } else {
        await apiRequest("POST", "/api/admin/packages", payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setDialogOpen(false);
      toast({ title: editItem ? "Package updated" : "Package created" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/packages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setDeleteId(null);
      toast({ title: "Package deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <h2 className="text-2xl font-semibold" data-testid="text-packages-title">Packages</h2>
        <Button onClick={openCreate} data-testid="button-create-package">
          <Plus className="mr-2 h-4 w-4" /> Add Package
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-12" data-testid="text-packages-empty">No packages yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium">Name (EN)</th>
                <th className="text-left py-3 px-2 font-medium">Price (SAR)</th>
                <th className="text-left py-3 px-2 font-medium">Category</th>
                <th className="text-left py-3 px-2 font-medium">Popular</th>
                <th className="text-right py-3 px-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b" data-testid={`row-package-${item.id}`}>
                  <td className="py-3 px-2">{item.nameEn}</td>
                  <td className="py-3 px-2">{item.priceSAR}</td>
                  <td className="py-3 px-2">{item.category ?? "-"}</td>
                  <td className="py-3 px-2">
                    {item.isPopular && <Badge variant="default" className="no-default-active-elevate">Popular</Badge>}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(item)} data-testid={`button-edit-package-${item.id}`}>
                        <Pencil />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setDeleteId(item.id)} data-testid={`button-delete-package-${item.id}`}>
                        <Trash2 />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Package" : "Create Package"}</DialogTitle>
            <DialogDescription>Fill in the package details below.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => saveMutation.mutate(data))} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="slug" render={({ field }) => (
                  <FormItem><FormLabel>Slug</FormLabel><FormControl><Input data-testid="input-package-slug" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem><FormLabel>Category</FormLabel><FormControl><Input data-testid="input-package-category" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="nameAr" render={({ field }) => (
                  <FormItem><FormLabel>Name (AR)</FormLabel><FormControl><Input data-testid="input-package-nameAr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="nameEn" render={({ field }) => (
                  <FormItem><FormLabel>Name (EN)</FormLabel><FormControl><Input data-testid="input-package-nameEn" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="nameFr" render={({ field }) => (
                  <FormItem><FormLabel>Name (FR)</FormLabel><FormControl><Input data-testid="input-package-nameFr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="descriptionAr" render={({ field }) => (
                  <FormItem><FormLabel>Description (AR)</FormLabel><FormControl><Textarea data-testid="input-package-descriptionAr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="descriptionEn" render={({ field }) => (
                  <FormItem><FormLabel>Description (EN)</FormLabel><FormControl><Textarea data-testid="input-package-descriptionEn" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="descriptionFr" render={({ field }) => (
                  <FormItem><FormLabel>Description (FR)</FormLabel><FormControl><Textarea data-testid="input-package-descriptionFr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="priceSAR" render={({ field }) => (
                  <FormItem><FormLabel>Price (SAR)</FormLabel><FormControl><Input type="number" data-testid="input-package-priceSAR" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="revisions" render={({ field }) => (
                  <FormItem><FormLabel>Revisions</FormLabel><FormControl><Input type="number" data-testid="input-package-revisions" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="sortOrder" render={({ field }) => (
                  <FormItem><FormLabel>Sort Order</FormLabel><FormControl><Input type="number" data-testid="input-package-sortOrder" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="deliveryTime" render={({ field }) => (
                <FormItem><FormLabel>Delivery Time</FormLabel><FormControl><Input data-testid="input-package-deliveryTime" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="includedItems" render={({ field }) => (
                <FormItem><FormLabel>Included Items (comma-separated)</FormLabel><FormControl><Input data-testid="input-package-includedItems" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="isPopular" render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <input type="checkbox" checked={field.value} onChange={field.onChange} data-testid="input-package-isPopular" className="rounded" />
                  </FormControl>
                  <FormLabel className="!mt-0">Popular</FormLabel>
                </FormItem>
              )} />
              <DialogFooter>
                <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-package">
                  {saveMutation.isPending ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>Are you sure you want to delete this package? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteId(null)} data-testid="button-cancel-delete-package">Cancel</Button>
            <Button variant="destructive" onClick={() => deleteId && deleteMutation.mutate(deleteId)} disabled={deleteMutation.isPending} data-testid="button-confirm-delete-package">
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- Testimonials Section ---
function TestimonialsSection() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: items = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/admin/testimonials"],
  });

  const form = useForm<z.infer<typeof testimonialSchema>>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      nameAr: "", nameEn: "", nameFr: "",
      roleAr: "", roleEn: "", roleFr: "",
      contentAr: "", contentEn: "", contentFr: "",
      company: "", avatar: "", rating: 5, published: true,
    },
  });

  function openCreate() {
    setEditItem(null);
    form.reset({
      nameAr: "", nameEn: "", nameFr: "",
      roleAr: "", roleEn: "", roleFr: "",
      contentAr: "", contentEn: "", contentFr: "",
      company: "", avatar: "", rating: 5, published: true,
    });
    setDialogOpen(true);
  }

  function openEdit(item: Testimonial) {
    setEditItem(item);
    form.reset({
      nameAr: item.nameAr, nameEn: item.nameEn, nameFr: item.nameFr,
      roleAr: item.roleAr ?? "", roleEn: item.roleEn ?? "", roleFr: item.roleFr ?? "",
      contentAr: item.contentAr, contentEn: item.contentEn, contentFr: item.contentFr,
      company: item.company ?? "", avatar: item.avatar ?? "",
      rating: item.rating ?? 5, published: item.published ?? true,
    });
    setDialogOpen(true);
  }

  const saveMutation = useMutation({
    mutationFn: async (data: z.infer<typeof testimonialSchema>) => {
      const payload = {
        ...data,
        roleAr: data.roleAr || null,
        roleEn: data.roleEn || null,
        roleFr: data.roleFr || null,
        company: data.company || null,
        avatar: data.avatar || null,
      };
      if (editItem) {
        await apiRequest("PATCH", `/api/admin/testimonials/${editItem.id}`, payload);
      } else {
        await apiRequest("POST", "/api/admin/testimonials", payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setDialogOpen(false);
      toast({ title: editItem ? "Testimonial updated" : "Testimonial created" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/testimonials/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setDeleteId(null);
      toast({ title: "Testimonial deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <h2 className="text-2xl font-semibold" data-testid="text-testimonials-title">Testimonials</h2>
        <Button onClick={openCreate} data-testid="button-create-testimonial">
          <Plus className="mr-2 h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-12" data-testid="text-testimonials-empty">No testimonials yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium">Name (EN)</th>
                <th className="text-left py-3 px-2 font-medium">Company</th>
                <th className="text-left py-3 px-2 font-medium">Rating</th>
                <th className="text-left py-3 px-2 font-medium">Status</th>
                <th className="text-right py-3 px-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b" data-testid={`row-testimonial-${item.id}`}>
                  <td className="py-3 px-2">{item.nameEn}</td>
                  <td className="py-3 px-2">{item.company ?? "-"}</td>
                  <td className="py-3 px-2">{item.rating}/5</td>
                  <td className="py-3 px-2">
                    <Badge variant={item.published ? "default" : "secondary"} className="no-default-active-elevate">
                      {item.published ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(item)} data-testid={`button-edit-testimonial-${item.id}`}>
                        <Pencil />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setDeleteId(item.id)} data-testid={`button-delete-testimonial-${item.id}`}>
                        <Trash2 />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit Testimonial" : "Create Testimonial"}</DialogTitle>
            <DialogDescription>Fill in the testimonial details below.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => saveMutation.mutate(data))} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="nameAr" render={({ field }) => (
                  <FormItem><FormLabel>Name (AR)</FormLabel><FormControl><Input data-testid="input-testimonial-nameAr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="nameEn" render={({ field }) => (
                  <FormItem><FormLabel>Name (EN)</FormLabel><FormControl><Input data-testid="input-testimonial-nameEn" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="nameFr" render={({ field }) => (
                  <FormItem><FormLabel>Name (FR)</FormLabel><FormControl><Input data-testid="input-testimonial-nameFr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="roleAr" render={({ field }) => (
                  <FormItem><FormLabel>Role (AR)</FormLabel><FormControl><Input data-testid="input-testimonial-roleAr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="roleEn" render={({ field }) => (
                  <FormItem><FormLabel>Role (EN)</FormLabel><FormControl><Input data-testid="input-testimonial-roleEn" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="roleFr" render={({ field }) => (
                  <FormItem><FormLabel>Role (FR)</FormLabel><FormControl><Input data-testid="input-testimonial-roleFr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="contentAr" render={({ field }) => (
                  <FormItem><FormLabel>Content (AR)</FormLabel><FormControl><Textarea data-testid="input-testimonial-contentAr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="contentEn" render={({ field }) => (
                  <FormItem><FormLabel>Content (EN)</FormLabel><FormControl><Textarea data-testid="input-testimonial-contentEn" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="contentFr" render={({ field }) => (
                  <FormItem><FormLabel>Content (FR)</FormLabel><FormControl><Textarea data-testid="input-testimonial-contentFr" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="company" render={({ field }) => (
                  <FormItem><FormLabel>Company</FormLabel><FormControl><Input data-testid="input-testimonial-company" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="avatar" render={({ field }) => (
                  <FormItem><FormLabel>Avatar URL</FormLabel><FormControl><Input data-testid="input-testimonial-avatar" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="rating" render={({ field }) => (
                  <FormItem><FormLabel>Rating (1-5)</FormLabel><FormControl><Input type="number" min={1} max={5} data-testid="input-testimonial-rating" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="published" render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <input type="checkbox" checked={field.value} onChange={field.onChange} data-testid="input-testimonial-published" className="rounded" />
                  </FormControl>
                  <FormLabel className="!mt-0">Published</FormLabel>
                </FormItem>
              )} />
              <DialogFooter>
                <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-testimonial">
                  {saveMutation.isPending ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>Are you sure you want to delete this testimonial? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteId(null)} data-testid="button-cancel-delete-testimonial">Cancel</Button>
            <Button variant="destructive" onClick={() => deleteId && deleteMutation.mutate(deleteId)} disabled={deleteMutation.isPending} data-testid="button-confirm-delete-testimonial">
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- Inquiries Section ---
function InquiriesSection() {
  const { toast } = useToast();

  const { data: items = [], isLoading } = useQuery<ContactInquiry[]>({
    queryKey: ["/api/admin/inquiries"],
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await apiRequest("PATCH", `/api/admin/inquiries/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/inquiries"] });
      toast({ title: "Status updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  function getStatusVariant(status: string | null): "default" | "secondary" | "destructive" | "outline" {
    switch (status) {
      case "new": return "default";
      case "in-progress": return "outline";
      case "closed": return "secondary";
      default: return "default";
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6" data-testid="text-inquiries-title">Contact Inquiries</h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-12" data-testid="text-inquiries-empty">No inquiries yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium">Name</th>
                <th className="text-left py-3 px-2 font-medium">Email</th>
                <th className="text-left py-3 px-2 font-medium">Service</th>
                <th className="text-left py-3 px-2 font-medium">Message</th>
                <th className="text-left py-3 px-2 font-medium">Date</th>
                <th className="text-left py-3 px-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b" data-testid={`row-inquiry-${item.id}`}>
                  <td className="py-3 px-2">{item.name}</td>
                  <td className="py-3 px-2">{item.email}</td>
                  <td className="py-3 px-2">{item.service ?? "-"}</td>
                  <td className="py-3 px-2 max-w-[200px] truncate">{item.message}</td>
                  <td className="py-3 px-2 whitespace-nowrap">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-3 px-2">
                    <Select
                      value={item.status ?? "new"}
                      onValueChange={(val) => statusMutation.mutate({ id: item.id, status: val })}
                    >
                      <SelectTrigger className="w-[130px]" data-testid={`select-inquiry-status-${item.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// --- Payments Section ---
function PaymentsSection() {
  const { data: items = [], isLoading } = useQuery<Payment[]>({
    queryKey: ["/api/admin/payments"],
  });

  function getStatusVariant(status: string | null): "default" | "secondary" | "destructive" | "outline" {
    switch (status) {
      case "completed": return "default";
      case "pending": return "outline";
      case "failed": return "destructive";
      default: return "secondary";
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6" data-testid="text-payments-title">Payments</h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-12" data-testid="text-payments-empty">No payments yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium">ID</th>
                <th className="text-left py-3 px-2 font-medium">Customer</th>
                <th className="text-left py-3 px-2 font-medium">Email</th>
                <th className="text-left py-3 px-2 font-medium">Package</th>
                <th className="text-left py-3 px-2 font-medium">Amount</th>
                <th className="text-left py-3 px-2 font-medium">Status</th>
                <th className="text-left py-3 px-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b" data-testid={`row-payment-${item.id}`}>
                  <td className="py-3 px-2">{item.id}</td>
                  <td className="py-3 px-2">{item.customerName ?? "-"}</td>
                  <td className="py-3 px-2">{item.customerEmail ?? "-"}</td>
                  <td className="py-3 px-2">{item.packageSlug ?? "-"}</td>
                  <td className="py-3 px-2">{item.amount} {item.currency}</td>
                  <td className="py-3 px-2">
                    <Badge variant={getStatusVariant(item.status)} className="no-default-active-elevate">
                      {item.status ?? "unknown"}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 whitespace-nowrap">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// --- Main Dashboard ---
export default function AdminDashboardPage() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<Section>("overview");

  const { data: session, isLoading: sessionLoading } = useQuery<{ isAdmin: boolean }>({
    queryKey: ["/api/admin/session"],
    retry: false,
  });

  useEffect(() => {
    if (!sessionLoading && (!session || !session.isAdmin)) {
      window.location.href = "/admin/login";
    }
  }, [session, sessionLoading]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/admin/logout");
    },
    onSuccess: () => {
      window.location.href = "/admin/login";
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  if (sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session || !session.isAdmin) {
    return null;
  }

  const sectionComponents: Record<Section, JSX.Element> = {
    overview: <OverviewSection />,
    portfolio: <PortfolioSection />,
    blog: <BlogSection />,
    packages: <PackagesSection />,
    testimonials: <TestimonialsSection />,
    inquiries: <InquiriesSection />,
    payments: <PaymentsSection />,
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="w-64 border-r bg-muted/30 flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-lg font-bold" data-testid="text-admin-brand">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === item.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover-elevate"
              }`}
              data-testid={`button-nav-${item.key}`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-2 border-t">
          <button
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover-elevate"
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4" />
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {sectionComponents[activeSection]}
        </div>
      </div>
    </div>
  );
}
