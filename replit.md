# Premium Target - Saudi Branding Agency Website

## Overview
Fully trilingual (Arabic RTL, English, French) website for Premium Target, a Saudi branding agency specializing in logo design, brand identity, visual identity, and web design.

## Tech Stack
- **Frontend**: React + Vite + TypeScript, Tailwind CSS, shadcn/ui, framer-motion
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Auth**: express-session + connect-pg-simple + bcryptjs
- **Payments**: Stripe Checkout (when configured)
- **Routing**: wouter with /{lang} prefix pattern (ar, en, fr)
- **State**: TanStack React Query v5

## Key Features
- Trilingual support (Arabic RTL, English LTR, French LTR) with automatic dir switching
- Dark/light theme toggle with localStorage persistence
- WhatsApp integration at +966553011730
- Contact form with server-side validation and DB persistence
- Portfolio showcase, pricing packages, blog, testimonials from PostgreSQL
- FAQ accordion, About, Why Us, Process pages
- Legal pages (Privacy, Terms, Refund)
- **Admin Dashboard** at /admin/login (credentials: admin / admin123)
- **Stripe Payment Integration** for packages (Pay Now on pricing page)
- SEO meta tags on every page with per-language titles and Open Graph tags

## Project Structure
- `client/src/pages/` - All page components (home, services, work, blog, pricing, contact, about, faq, why-us, process, legal, payment-result, not-found)
- `client/src/pages/admin/` - Admin login and dashboard pages
- `client/src/components/` - Header, Footer, WhatsApp button, SEO
- `client/src/lib/` - i18n, language-context, theme-provider, queryClient
- `shared/schema.ts` - Drizzle schema + Zod validation
- `server/` - Express routes, storage layer, seed data, db connection

## API Routes
### Public
- GET /api/portfolio - All published portfolio items
- GET /api/portfolio/:slug - Single portfolio item (published only)
- GET /api/packages - All pricing packages
- GET /api/blog - All published blog posts
- GET /api/blog/:slug - Single blog post (published only)
- GET /api/testimonials - All published testimonials
- POST /api/contact - Submit contact inquiry
- POST /api/checkout - Create Stripe checkout session
- GET /api/checkout/status - Check payment status

### Admin (Protected)
- POST /api/admin/login - Admin login
- POST /api/admin/logout - Admin logout
- GET /api/admin/session - Check admin session
- GET /api/admin/stats - Dashboard stats
- GET/POST/PATCH/DELETE /api/admin/portfolio - Portfolio CRUD
- GET/POST/PATCH/DELETE /api/admin/blog - Blog CRUD
- GET/POST/PATCH/DELETE /api/admin/packages - Packages CRUD
- GET/POST/PATCH/DELETE /api/admin/testimonials - Testimonials CRUD
- GET /api/admin/inquiries - List contact inquiries
- PATCH /api/admin/inquiries/:id/status - Update inquiry status
- GET /api/admin/payments - List payments

## Database Tables
- portfolio_items, packages, blog_posts, testimonials, contact_inquiries, admin_users, payments

## Admin Dashboard
- Default credentials: admin / admin123
- Access at /admin/login
- Manages all content (portfolio, blog, packages, testimonials)
- View and manage contact inquiries
- View payment records

## Design
- Primary color: Deep teal (hue 197)
- Fonts: Poppins + Playfair Display (headings) for Latin, Cairo + Almarai for Arabic
- `font-heading` tailwind class applies Playfair Display / Cairo to headings
- Logo: attached_assets/logo_Premium_Target_1770888120391.png (imported via @assets alias)
- Portfolio: 17 real projects from premiumtarget.sa with live WordPress image URLs
- Professional, clean design with subtle animations via framer-motion
