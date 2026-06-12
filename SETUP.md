# Portfolio CRM — Setup Guide

## Prerequisites
- Node.js 18+
- PostgreSQL database (local or Supabase)

## 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
- `DATABASE_URL` — your PostgreSQL connection string
  - **Supabase**: Project Settings > Database > Connection string (URI mode)
  - **Local**: `postgresql://postgres:password@localhost:5432/portfolio_crm`
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000` for development
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — your admin login credentials

## 2. Install & Database Setup

```bash
npm install
npx prisma generate        # generate Prisma client
npx prisma db push         # push schema to database
npm run db:seed            # seed with your portfolio data + admin user
```

## 3. Run Development Server

```bash
npm run dev
```

Open:
- **Portfolio**: http://localhost:3000
- **Admin CRM**: http://localhost:3000/admin  
- **Login**: http://localhost:3000/login

## 4. First Login

Use the credentials from your `.env.local`:
- Email: `admin@portfolio.com` (or your `ADMIN_EMAIL`)
- Password: `Admin@1234` (or your `ADMIN_PASSWORD`)

**Change your password after first login** via a DB update or by building a profile page.

## 5. Production Deployment (Vercel)

```bash
npm run build   # verify build passes
```

On Vercel:
1. Add all `.env.local` variables as Environment Variables
2. Set `NEXTAUTH_URL` to your production URL
3. Run `npx prisma db push` against your production DB

---

## CRM Features

| Route | Feature |
|-------|---------|
| `/admin` | Dashboard with stats |
| `/admin/personal` | Edit name, bio, socials, stats |
| `/admin/projects` | Full CRUD for projects + image upload |
| `/admin/skills` | Icon skills + progress bars |
| `/admin/experience` | Timeline entries |
| `/admin/services` | Services offered |
| `/admin/messages` | Contact form inbox |
| `/admin/seo` | SEO title, description, OG image |

All changes to content immediately reflect on the live portfolio at `/`.

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/portfolio` | All portfolio data |
| GET/PUT | `/api/personal` | Personal info |
| GET/POST | `/api/projects` | Projects list |
| GET/PUT/DELETE | `/api/projects/[id]` | Single project |
| GET/POST | `/api/skills` | Skills |
| PUT/DELETE | `/api/skills/[id]` | Single skill |
| GET/POST | `/api/experience` | Experience entries |
| PUT/DELETE | `/api/experience/[id]` | Single entry |
| GET/POST | `/api/services` | Services |
| PUT/DELETE | `/api/services/[id]` | Single service |
| GET/POST | `/api/contact` | Contact messages |
| PUT/DELETE | `/api/contact/[id]` | Single message |
| GET/PUT | `/api/seo` | SEO settings |
| POST | `/api/upload` | Image upload (5MB max) |
