# Premium Target Website

## Saudi Branding Agency - Trilingual (Arabic, English, French)

### Pre-built for deployment

This repository contains the **pre-built** version ready to run.

### Quick Start

```bash
npm install --production
node dist/index.cjs
```

### Environment Variables Required

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL connection string |
| SESSION_SECRET | Session encryption key |
| SMTP_EMAIL | Email for sending notifications |
| SMTP_APP_PASSWORD | SMTP app password |
| NODE_ENV | Set to `production` |
| PORT | Server port (default: 5000) |

### Build from Source

```bash
npm install
npm run build
npm start
```

### Admin Dashboard
- URL: /admin/login
- Default: admin / admin123

### Features
- Trilingual (Arabic RTL, English, French)
- Portfolio showcase (17 projects)
- Blog, Pricing packages, Testimonials
- Contact form with email notifications
- WhatsApp checkout integration
- Admin dashboard for content management
