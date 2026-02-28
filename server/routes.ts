import express, { type Express, type Request, type Response, type NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import bcrypt from "bcryptjs";
import Stripe from "stripe";
import { storage } from "./storage";
import { contactFormSchema, insertPortfolioSchema, insertBlogPostSchema, insertPackageSchema, insertTestimonialSchema } from "@shared/schema";
import { sendContactAutoReply } from "./email";
import { z } from "zod";

const PgSession = connectPgSimple(session);

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!(req.session as any).isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.use(
    session({
      store: new PgSession({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET || "premium-target-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
    })
  );

  // ===== PUBLIC API =====

  app.get("/api/portfolio", async (_req, res) => {
    try {
      const items = await storage.getPortfolioItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio items" });
    }
  });

  app.get("/api/portfolio/:slug", async (req, res) => {
    try {
      const item = await storage.getPortfolioBySlug(req.params.slug);
      if (!item) {
        return res.status(404).json({ message: "Portfolio item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio item" });
    }
  });

  app.get("/api/packages", async (_req, res) => {
    try {
      const pkgs = await storage.getPackages();
      res.json(pkgs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packages" });
    }
  });

  app.get("/api/packages/:slug", async (req, res) => {
    try {
      const pkg = await storage.getPackageBySlug(req.params.slug);
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }
      res.json(pkg);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch package" });
    }
  });

  app.get("/api/blog", async (_req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.get("/api/testimonials", async (_req, res) => {
    try {
      const items = await storage.getTestimonials();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = contactFormSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid form data", errors: parsed.error.errors });
      }
      const inquiry = await storage.createContactInquiry(parsed.data);

      try {
        await sendContactAutoReply({
          to: parsed.data.email,
          name: parsed.data.name,
          lang: parsed.data.lang || "en",
        });
      } catch (emailErr) {
        console.error("Failed to send auto-reply email:", emailErr);
      }

      res.status(201).json({ message: "Inquiry submitted successfully", id: inquiry.id });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit inquiry" });
    }
  });

  // ===== ADMIN AUTH =====

  app.get("/api/admin/session", (req, res) => {
    res.json({ isAdmin: !!(req.session as any).isAdmin });
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = await storage.getAdminByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      (req.session as any).isAdmin = true;
      (req.session as any).adminId = user.id;
      res.json({ message: "Logged in successfully" });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });

  // ===== ADMIN CRUD =====

  app.get("/api/admin/stats", requireAdmin, async (_req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Portfolio CRUD
  app.get("/api/admin/portfolio", requireAdmin, async (_req, res) => {
    try {
      const items = await storage.getAllPortfolioItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio items" });
    }
  });

  app.post("/api/admin/portfolio", requireAdmin, async (req, res) => {
    try {
      const parsed = insertPortfolioSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
      const item = await storage.createPortfolioItem(parsed.data);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to create portfolio item" });
    }
  });

  app.patch("/api/admin/portfolio/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const updated = await storage.updatePortfolioItem(id, req.body);
      if (!updated) return res.status(404).json({ message: "Not found" });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update portfolio item" });
    }
  });

  app.delete("/api/admin/portfolio/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const deleted = await storage.deletePortfolioItem(id);
      if (!deleted) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete portfolio item" });
    }
  });

  // Blog CRUD
  app.get("/api/admin/blog", requireAdmin, async (_req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.post("/api/admin/blog", requireAdmin, async (req, res) => {
    try {
      const parsed = insertBlogPostSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
      const post = await storage.createBlogPost(parsed.data);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  app.patch("/api/admin/blog/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const updated = await storage.updateBlogPost(id, req.body);
      if (!updated) return res.status(404).json({ message: "Not found" });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  app.delete("/api/admin/blog/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const deleted = await storage.deleteBlogPost(id);
      if (!deleted) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // Packages CRUD
  app.get("/api/admin/packages", requireAdmin, async (_req, res) => {
    try {
      const pkgs = await storage.getPackages();
      res.json(pkgs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packages" });
    }
  });

  app.post("/api/admin/packages", requireAdmin, async (req, res) => {
    try {
      const parsed = insertPackageSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
      const pkg = await storage.createPackage(parsed.data);
      res.status(201).json(pkg);
    } catch (error) {
      res.status(500).json({ message: "Failed to create package" });
    }
  });

  app.patch("/api/admin/packages/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const updated = await storage.updatePackage(id, req.body);
      if (!updated) return res.status(404).json({ message: "Not found" });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update package" });
    }
  });

  app.delete("/api/admin/packages/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const deleted = await storage.deletePackage(id);
      if (!deleted) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete package" });
    }
  });

  // Testimonials CRUD
  app.get("/api/admin/testimonials", requireAdmin, async (_req, res) => {
    try {
      const items = await storage.getAllTestimonials();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/admin/testimonials", requireAdmin, async (req, res) => {
    try {
      const parsed = insertTestimonialSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
      const item = await storage.createTestimonial(parsed.data);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  app.patch("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const updated = await storage.updateTestimonial(id, req.body);
      if (!updated) return res.status(404).json({ message: "Not found" });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update testimonial" });
    }
  });

  app.delete("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const deleted = await storage.deleteTestimonial(id);
      if (!deleted) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  // Contact Inquiries
  app.get("/api/admin/inquiries", requireAdmin, async (_req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  app.patch("/api/admin/inquiries/:id/status", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const { status } = req.body;
      if (!status) return res.status(400).json({ message: "Status required" });
      const updated = await storage.updateContactInquiryStatus(id, status);
      if (!updated) return res.status(404).json({ message: "Not found" });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update inquiry status" });
    }
  });

  // Payments list
  app.get("/api/admin/payments", requireAdmin, async (_req, res) => {
    try {
      const paymentsList = await storage.getPayments();
      res.json(paymentsList);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });

  // ===== STRIPE CHECKOUT =====

  app.post("/api/checkout", async (req, res) => {
    try {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey) {
        return res.status(503).json({ message: "Payment system not configured" });
      }

      const stripe = new Stripe(stripeKey);
      const checkoutSchema = z.object({ packageId: z.number(), lang: z.string().optional() });
      const parsed = checkoutSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ message: "Invalid data" });
      const { packageId, lang } = parsed.data;

      const pkg = await storage.getPackageById(packageId);
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }

      const origin = `${req.protocol}://${req.get("host")}`;

      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "sar",
              product_data: {
                name: pkg.nameEn,
                description: pkg.descriptionEn,
              },
              unit_amount: pkg.priceSAR * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${origin}/${lang || "ar"}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/${lang || "ar"}/payment-cancel`,
      });

      await storage.createPayment({
        packageId: pkg.id,
        packageSlug: pkg.slug,
        stripeSessionId: checkoutSession.id,
        amount: pkg.priceSAR,
        currency: "SAR",
        status: "pending",
      });

      res.json({ url: checkoutSession.url });
    } catch (error: any) {
      console.error("Stripe checkout error:", error.message);
      res.status(500).json({ message: "Failed to create checkout session" });
    }
  });

  app.get("/api/checkout/status", async (req, res) => {
    try {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey) {
        return res.status(503).json({ message: "Payment system not configured" });
      }

      const stripe = new Stripe(stripeKey);
      const sessionId = req.query.session_id as string;
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID required" });
      }

      const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
      const payment = await storage.getPaymentBySessionId(sessionId);

      if (payment && checkoutSession.payment_status === "paid" && payment.status !== "paid") {
        await storage.updatePaymentStatus(
          payment.id,
          "paid",
          checkoutSession.payment_intent as string
        );
      }

      res.json({
        status: checkoutSession.payment_status,
        customerEmail: checkoutSession.customer_details?.email,
      });
    } catch (error: any) {
      console.error("Checkout status error:", error.message);
      res.status(500).json({ message: "Failed to check payment status" });
    }
  });

  // Stripe Webhook
  app.post("/api/webhook/stripe", express.raw({ type: "application/json" }), async (req, res) => {
    try {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      if (!stripeKey) return res.status(503).send("Not configured");

      const stripe = new Stripe(stripeKey);
      let event: Stripe.Event;

      if (webhookSecret) {
        const sig = req.headers["stripe-signature"] as string;
        event = stripe.webhooks.constructEvent(req.rawBody as any, sig, webhookSecret);
      } else {
        event = req.body as Stripe.Event;
      }

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const payment = await storage.getPaymentBySessionId(session.id);
        if (payment) {
          await storage.updatePaymentStatus(
            payment.id,
            "paid",
            session.payment_intent as string
          );
        }
      }

      res.json({ received: true });
    } catch (error: any) {
      console.error("Webhook error:", error.message);
      res.status(400).json({ message: "Webhook error" });
    }
  });

  return httpServer;
}
