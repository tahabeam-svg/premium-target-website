import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  titleAr: text("title_ar").notNull(),
  titleEn: text("title_en").notNull(),
  titleFr: text("title_fr").notNull(),
  summaryAr: text("summary_ar").notNull(),
  summaryEn: text("summary_en").notNull(),
  summaryFr: text("summary_fr").notNull(),
  problemAr: text("problem_ar"),
  problemEn: text("problem_en"),
  problemFr: text("problem_fr"),
  solutionAr: text("solution_ar"),
  solutionEn: text("solution_en"),
  solutionFr: text("solution_fr"),
  category: varchar("category", { length: 100 }).notNull(),
  industry: varchar("industry", { length: 100 }),
  featuredImage: text("featured_image").notNull(),
  galleryImages: text("gallery_images").array(),
  deliverables: text("deliverables").array(),
  timeline: varchar("timeline", { length: 100 }),
  services: text("services").array(),
  published: boolean("published").default(true),
  publishDate: timestamp("publish_date").defaultNow(),
});

export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  nameFr: text("name_fr").notNull(),
  descriptionAr: text("description_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionFr: text("description_fr").notNull(),
  priceSAR: integer("price_sar").notNull(),
  includedItems: text("included_items").array(),
  deliveryTime: varchar("delivery_time", { length: 100 }),
  revisions: integer("revisions"),
  isPopular: boolean("is_popular").default(false),
  category: varchar("category", { length: 100 }),
  sortOrder: integer("sort_order").default(0),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  titleAr: text("title_ar").notNull(),
  titleEn: text("title_en").notNull(),
  titleFr: text("title_fr").notNull(),
  excerptAr: text("excerpt_ar"),
  excerptEn: text("excerpt_en"),
  excerptFr: text("excerpt_fr"),
  bodyAr: text("body_ar"),
  bodyEn: text("body_en"),
  bodyFr: text("body_fr"),
  featuredImage: text("featured_image"),
  category: varchar("category", { length: 100 }),
  tags: text("tags").array(),
  author: varchar("author", { length: 255 }),
  published: boolean("published").default(true),
  publishDate: timestamp("publish_date").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  nameFr: text("name_fr").notNull(),
  roleAr: text("role_ar"),
  roleEn: text("role_en"),
  roleFr: text("role_fr"),
  contentAr: text("content_ar").notNull(),
  contentEn: text("content_en").notNull(),
  contentFr: text("content_fr").notNull(),
  company: varchar("company", { length: 255 }),
  avatar: text("avatar"),
  rating: integer("rating").default(5),
  published: boolean("published").default(true),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  service: varchar("service", { length: 100 }),
  message: text("message").notNull(),
  lang: varchar("lang", { length: 5 }).default("ar"),
  status: varchar("status", { length: 50 }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPortfolioSchema = createInsertSchema(portfolioItems).omit({ id: true, publishDate: true });
export const insertPackageSchema = createInsertSchema(packages).omit({ id: true });
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, publishDate: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertContactSchema = createInsertSchema(contactInquiries).omit({ id: true, createdAt: true, status: true });

export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = z.infer<typeof insertPortfolioSchema>;
export type Package = typeof packages.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactSchema>;

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  packageId: integer("package_id"),
  packageSlug: varchar("package_slug", { length: 255 }),
  stripeSessionId: varchar("stripe_session_id", { length: 500 }),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 500 }),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 10 }).default("SAR"),
  status: varchar("status", { length: 50 }).default("pending"),
  customerEmail: varchar("customer_email", { length: 255 }),
  customerName: varchar("customer_name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({ id: true, createdAt: true });
export const insertPaymentSchema = createInsertSchema(payments).omit({ id: true, createdAt: true });

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10),
  lang: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
