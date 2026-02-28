import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";
import {
  portfolioItems, packages, blogPosts, testimonials, contactInquiries, adminUsers, payments,
  type PortfolioItem, type InsertPortfolioItem,
  type Package, type InsertPackage,
  type BlogPost, type InsertBlogPost,
  type Testimonial, type InsertTestimonial,
  type ContactInquiry, type InsertContactInquiry,
  type AdminUser, type InsertAdminUser,
  type Payment, type InsertPayment,
} from "@shared/schema";

export interface IStorage {
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getAllPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioBySlug(slug: string): Promise<PortfolioItem | undefined>;
  getPortfolioById(id: number): Promise<PortfolioItem | undefined>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  updatePortfolioItem(id: number, item: Partial<InsertPortfolioItem>): Promise<PortfolioItem | undefined>;
  deletePortfolioItem(id: number): Promise<boolean>;

  getPackages(): Promise<Package[]>;
  getPackageBySlug(slug: string): Promise<Package | undefined>;
  getPackageById(id: number): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  updatePackage(id: number, pkg: Partial<InsertPackage>): Promise<Package | undefined>;
  deletePackage(id: number): Promise<boolean>;

  getBlogPosts(): Promise<BlogPost[]>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogById(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;

  getTestimonials(): Promise<Testimonial[]>;
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonialById(id: number): Promise<Testimonial | undefined>;
  createTestimonial(t: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, t: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;

  getContactInquiries(): Promise<ContactInquiry[]>;
  getContactInquiryById(id: number): Promise<ContactInquiry | undefined>;
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  updateContactInquiryStatus(id: number, status: string): Promise<ContactInquiry | undefined>;

  getAdminByUsername(username: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;

  createPayment(payment: InsertPayment): Promise<Payment>;
  getPaymentBySessionId(sessionId: string): Promise<Payment | undefined>;
  updatePaymentStatus(id: number, status: string, paymentIntentId?: string): Promise<Payment | undefined>;
  getPayments(): Promise<Payment[]>;

  getStats(): Promise<{ portfolio: number; blog: number; packages: number; testimonials: number; inquiries: number; payments: number }>;
}

export class DatabaseStorage implements IStorage {
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return db.select().from(portfolioItems).where(eq(portfolioItems.published, true));
  }

  async getAllPortfolioItems(): Promise<PortfolioItem[]> {
    return db.select().from(portfolioItems).orderBy(desc(portfolioItems.publishDate));
  }

  async getPortfolioBySlug(slug: string): Promise<PortfolioItem | undefined> {
    const results = await db.select().from(portfolioItems).where(eq(portfolioItems.slug, slug));
    const item = results[0];
    if (item && item.published === false) return undefined;
    return item;
  }

  async getPortfolioById(id: number): Promise<PortfolioItem | undefined> {
    const [item] = await db.select().from(portfolioItems).where(eq(portfolioItems.id, id));
    return item;
  }

  async createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem> {
    const [created] = await db.insert(portfolioItems).values(item).returning();
    return created;
  }

  async updatePortfolioItem(id: number, item: Partial<InsertPortfolioItem>): Promise<PortfolioItem | undefined> {
    const [updated] = await db.update(portfolioItems).set(item).where(eq(portfolioItems.id, id)).returning();
    return updated;
  }

  async deletePortfolioItem(id: number): Promise<boolean> {
    const result = await db.delete(portfolioItems).where(eq(portfolioItems.id, id)).returning();
    return result.length > 0;
  }

  async getPackages(): Promise<Package[]> {
    return db.select().from(packages);
  }

  async getPackageBySlug(slug: string): Promise<Package | undefined> {
    const [pkg] = await db.select().from(packages).where(eq(packages.slug, slug));
    return pkg;
  }

  async getPackageById(id: number): Promise<Package | undefined> {
    const [pkg] = await db.select().from(packages).where(eq(packages.id, id));
    return pkg;
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const [created] = await db.insert(packages).values(pkg).returning();
    return created;
  }

  async updatePackage(id: number, pkg: Partial<InsertPackage>): Promise<Package | undefined> {
    const [updated] = await db.update(packages).set(pkg).where(eq(packages.id, id)).returning();
    return updated;
  }

  async deletePackage(id: number): Promise<boolean> {
    const result = await db.delete(packages).where(eq(packages.id, id)).returning();
    return result.length > 0;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).where(eq(blogPosts.published, true));
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.publishDate));
  }

  async getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
    const results = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    const post = results[0];
    if (post && post.published === false) return undefined;
    return post;
  }

  async getBlogById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [created] = await db.insert(blogPosts).values(post).returning();
    return created;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db.update(blogPosts).set(post).where(eq(blogPosts.id, id)).returning();
    return updated;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).where(eq(testimonials.published, true));
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials);
  }

  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    const [t] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return t;
  }

  async createTestimonial(t: InsertTestimonial): Promise<Testimonial> {
    const [created] = await db.insert(testimonials).values(t).returning();
    return created;
  }

  async updateTestimonial(id: number, t: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updated] = await db.update(testimonials).set(t).where(eq(testimonials.id, id)).returning();
    return updated;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id)).returning();
    return result.length > 0;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
  }

  async getContactInquiryById(id: number): Promise<ContactInquiry | undefined> {
    const [inquiry] = await db.select().from(contactInquiries).where(eq(contactInquiries.id, id));
    return inquiry;
  }

  async createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [created] = await db.insert(contactInquiries).values(inquiry).returning();
    return created;
  }

  async updateContactInquiryStatus(id: number, status: string): Promise<ContactInquiry | undefined> {
    const [updated] = await db.update(contactInquiries).set({ status }).where(eq(contactInquiries.id, id)).returning();
    return updated;
  }

  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return user;
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const [created] = await db.insert(adminUsers).values(user).returning();
    return created;
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [created] = await db.insert(payments).values(payment).returning();
    return created;
  }

  async getPaymentBySessionId(sessionId: string): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.stripeSessionId, sessionId));
    return payment;
  }

  async updatePaymentStatus(id: number, status: string, paymentIntentId?: string): Promise<Payment | undefined> {
    const updateData: any = { status };
    if (paymentIntentId) updateData.stripePaymentIntentId = paymentIntentId;
    const [updated] = await db.update(payments).set(updateData).where(eq(payments.id, id)).returning();
    return updated;
  }

  async getPayments(): Promise<Payment[]> {
    return db.select().from(payments).orderBy(desc(payments.createdAt));
  }

  async getStats() {
    const [pCount] = await db.select({ count: sql<number>`count(*)` }).from(portfolioItems);
    const [bCount] = await db.select({ count: sql<number>`count(*)` }).from(blogPosts);
    const [pkgCount] = await db.select({ count: sql<number>`count(*)` }).from(packages);
    const [tCount] = await db.select({ count: sql<number>`count(*)` }).from(testimonials);
    const [iCount] = await db.select({ count: sql<number>`count(*)` }).from(contactInquiries);
    const [payCount] = await db.select({ count: sql<number>`count(*)` }).from(payments);
    return {
      portfolio: Number(pCount.count),
      blog: Number(bCount.count),
      packages: Number(pkgCount.count),
      testimonials: Number(tCount.count),
      inquiries: Number(iCount.count),
      payments: Number(payCount.count),
    };
  }
}

export const storage = new DatabaseStorage();
