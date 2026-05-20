# Blog System Architecture

Complete technical overview of the Gintex.ai Blog CMS.

---

## System Overview

```
Admin (browser)
    │
    ├─► /admin/login         → Supabase Auth
    ├─► /admin/dashboard     → Stats overview (server component)
    ├─► /admin/blogs         → Blog list (client component, realtime-capable)
    ├─► /admin/blogs/new     → AI generation + save (client component)
    ├─► /admin/blogs/edit/[id] → Edit + publish (client component)
    └─► /admin/analytics     → AI usage stats (server component)

Public (browser / search engine)
    │
    ├─► /intelligence        → Blog listing (server component, ISR 60s)
    └─► /blog/[slug]         → Blog detail (server component, ISR 60s)

API (server)
    ├─► GET  /api/blogs           → Public paginated list
    ├─► GET  /api/blogs/[slug]    → Single published blog
    ├─► POST /api/admin/blogs/generate  → AI generation (OpenAI)
    ├─► POST /api/admin/blogs/create    → Save new blog
    ├─► PUT  /api/admin/blogs/[id]      → Update blog
    ├─► DELETE /api/admin/blogs/[id]    → Delete (admin only)
    └─► POST /api/admin/blogs/publish   → Publish (sets status + published_at)
```

---

## Blog Lifecycle

```
[Admin generates topic]
        │
        ▼
POST /api/admin/blogs/generate
  → OpenAI GPT-4o generates: title, slug, excerpt, content, SEO, tags
  → Logs tokens + cost to ai_generation_logs
        │
        ▼
[Admin reviews & edits in UI]
        │
        ├─► "Save as Draft"    → POST /api/admin/blogs/create  (status: draft)
        └─► "Publish"          → POST /api/admin/blogs/create  (status: published)
                                         + POST /api/admin/blogs/publish
        │
        ▼
[Blog saved to Supabase `blogs` table]
        │
        ▼
[If published: appears on /intelligence + /blog/[slug] within 60s]
```

---

## Data Flow

### Generation Flow
1. Admin enters topic, tone, keywords, language
2. Client POSTs to `/api/admin/blogs/generate`
3. Server validates auth session
4. OpenAI GPT-4o generates complete article JSON
5. Server logs usage to `ai_generation_logs`
6. JSON returned to client
7. Admin edits in the UI form
8. Admin saves (draft or publish)

### Publishing Flow
1. Admin clicks "Publish on Gintex.ai"
2. `POST /api/admin/blogs/publish` called with blog ID
3. Server validates auth
4. Supabase UPDATE: `status = 'published'`, `published_at = NOW()`
5. Blog immediately available at `/blog/[slug]`
6. `/intelligence` re-fetches on next request (ISR 60s cache)

### Public Read Flow
1. User visits `/intelligence` or `/blog/[slug]`
2. Next.js Server Component runs
3. Supabase query: `SELECT * FROM blogs WHERE status = 'published'`
4. Page rendered server-side with full SEO metadata
5. Cached for 60 seconds (ISR)

---

## Security Model

### Middleware (`src/middleware.ts`)
- Runs on every request to `/admin/*`
- Calls `supabase.auth.getUser()` to verify session
- Redirects unauthenticated users to `/admin/login`
- Redirects logged-in users away from `/admin/login`

### Server-Side Checks
- Every admin API route calls `supabase.auth.getUser()`
- Delete endpoint additionally checks `admin_profiles.role = 'admin'`
- Public API routes don't require auth (Supabase RLS filters to published only)

### RLS Policies
- Unauthenticated users: read only published blogs
- Editor role: read all, write all blogs — cannot delete
- Admin role: full access including delete

---

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx              ← Admin shell (sidebar nav)
│   │   ├── page.tsx                ← Redirects to /admin/dashboard
│   │   ├── login/page.tsx          ← Auth form
│   │   ├── dashboard/page.tsx      ← Stats overview (Server Component)
│   │   ├── blogs/
│   │   │   ├── page.tsx            ← Blog list (Client Component)
│   │   │   ├── new/page.tsx        ← Generate + create (Client Component)
│   │   │   └── edit/[id]/page.tsx  ← Edit + publish (Client Component)
│   │   └── analytics/page.tsx      ← Usage analytics (Server Component)
│   │
│   ├── intelligence/page.tsx       ← Public blog listing (Server Component)
│   ├── blog/
│   │   ├── page.tsx                ← Redirects to /intelligence
│   │   └── [slug]/page.tsx         ← Blog detail (Server Component)
│   │
│   └── api/
│       ├── blogs/
│       │   ├── route.ts            ← GET /api/blogs
│       │   └── [slug]/route.ts     ← GET /api/blogs/[slug]
│       └── admin/blogs/
│           ├── generate/route.ts   ← POST generate
│           ├── create/route.ts     ← POST create
│           ├── [id]/route.ts       ← PUT update, DELETE
│           └── publish/route.ts    ← POST publish
│
├── components/
│   └── admin/
│       └── AdminShell.tsx          ← Sidebar nav + layout shell
│
├── lib/
│   └── supabase/
│       ├── client.ts               ← Browser Supabase client
│       └── server.ts               ← Server Supabase client
│
├── types/
│   └── blog.ts                     ← TypeScript interfaces
│
└── middleware.ts                    ← Auth guard for /admin/*
```

---

## Rendering Strategy

| Route | Strategy | Cache |
|---|---|---|
| `/intelligence` | ISR (Server Component) | 60 seconds |
| `/blog/[slug]` | ISR (Server Component) | 60 seconds |
| `/admin/dashboard` | SSR (Server Component) | No cache |
| `/admin/blogs` | CSR (Client Component) | No cache |
| `/admin/blogs/new` | CSR (Client Component) | No cache |
| `/admin/blogs/edit/[id]` | CSR (Client Component) | No cache |
| `/admin/analytics` | SSR (Server Component) | No cache |
| `GET /api/blogs` | ISR | 60 seconds |
| `GET /api/blogs/[slug]` | ISR | 60 seconds |
| All admin API routes | SSR | No cache |

---

## SEO Implementation

### Per-Blog Metadata
Each `/blog/[slug]` page generates dynamic metadata from the blog record:
- `<title>`: `seo_title || title`
- `<meta name="description">`: `seo_description || excerpt`
- `og:title`, `og:description`, `og:image` (cover_image)
- `og:type`: `article`
- `og:publishedTime`: `published_at`
- JSON-LD: Article schema with author (Gintex AI org)
- Canonical URL: `https://gintex-ai.vercel.app/blog/[slug]`

### Intelligence Listing Page
- Static metadata in `page.tsx`
- Blog cards with cover images and tag badges

---

## AI Generation Details

### Model
- **OpenAI GPT-4o** — best balance of quality and speed for long-form content

### Prompt Strategy
- System prompt defines Gintex AI brand voice and content standards
- User prompt includes topic, tone, keywords, language
- JSON-only output format enforced
- Content: 800–1500 words, H2/H3 structure, SEO-optimized

### Token Tracking
- Every generation logs: prompt text, token count, estimated cost, user ID
- Analytics page shows totals and recent log entries

### Cost Estimate
- GPT-4o: ~$0.005 per 1K tokens
- Average article: ~2,000–3,000 tokens total ≈ $0.01–0.015 per article

---

## No External Platform Code

This system contains **zero** references to:
- Shopify
- WordPress
- Wix
- YouTube
- OAuth integrations for external platforms
- Multi-platform publishing queues
- Social media APIs

Publishing = saving to Supabase with `status = 'published'`. That's it.
