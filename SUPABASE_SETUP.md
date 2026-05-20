# Supabase Setup Guide

Complete instructions for setting up the Supabase backend for the Gintex.ai Blog CMS.

---

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a region close to your users
3. Note your **Project URL** and **API Keys** (Settings → API)

---

## 2. Environment Variables

Add these to your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

- `NEXT_PUBLIC_SUPABASE_URL` — Project Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Project Settings → API → anon public key
- `SUPABASE_SERVICE_ROLE_KEY` — Project Settings → API → service_role key (keep secret, server-only)

---

## 3. Run the Database Schema

Go to **Supabase Dashboard → SQL Editor → New query** and paste the full contents of `supabase/schema.sql`. Click **Run**.

This creates:

### Tables

| Table | Purpose |
|---|---|
| `admin_profiles` | CMS user roles (admin / editor) |
| `blogs` | All blog content |
| `ai_generation_logs` | AI usage tracking |

### Auto-Triggers
- `on_auth_user_created_admin` — creates `admin_profiles` row on new signup
- `blogs_updated_at` — auto-updates `updated_at` on every blog change
- `blogs_set_published_at` — auto-sets `published_at` when status → published

### Helper Functions
- `generate_slug(title TEXT)` — generates unique URL-safe slugs

---

## 4. Row Level Security (RLS)

All tables have RLS enabled. Policies:

### `admin_profiles`
- Anyone with a valid auth session who is in `admin_profiles` can read profiles
- Users can only read/update their own profile
- Only admins can delete profiles

### `blogs`
- **Public** (unauthenticated): can only read rows with `status = 'published'`
- **Admin users**: can read all blogs, insert, update
- **Admin role only**: can delete blogs

### `ai_generation_logs`
- Service role has full access (for server-side writes)
- Admins can read all logs
- Users can read their own logs

---

## 5. Auth Configuration

In **Supabase Dashboard → Authentication → Settings**:

### Email Auth
- ✅ Enable email/password sign-in
- Disable "Confirm email" for internal-only admin (optional — admins you create manually don't need confirmation)
- Or keep email confirmation ON for security

### Site URL
Set to your production URL: `https://your-domain.com`

### Redirect URLs
Add: `https://your-domain.com/admin/dashboard`

---

## 6. Storage Bucket

In **Supabase Dashboard → Storage**:

1. Click **New bucket**
2. Name: `blog-images`
3. Set to **Public** (so cover images are publicly accessible)
4. Click **Create bucket**

Optional: Add storage policies for file size limits and type restrictions.

---

## 7. First Admin User

```sql
-- 1. Create user via Dashboard → Authentication → Users → Create user
-- 2. Then set their role to admin:
UPDATE public.admin_profiles
SET role = 'admin', full_name = 'Admin Name'
WHERE email = 'admin@gintex.ai';
```

---

## 8. Indexes (Already in schema.sql)

Key indexes for performance:
- `blogs_status_idx` — fast status filtering
- `blogs_slug_idx` — unique slug lookup
- `blogs_published_at_idx` — partial index on published blogs
- `blogs_tags_idx` — GIN index for tag array searches

---

## 9. Useful Queries

```sql
-- All published blogs
SELECT title, slug, published_at FROM blogs WHERE status = 'published' ORDER BY published_at DESC;

-- Blog count by status
SELECT status, COUNT(*) FROM blogs GROUP BY status;

-- Total AI tokens used
SELECT SUM(tokens), SUM(cost) FROM ai_generation_logs;

-- List all admin users
SELECT email, role, full_name FROM admin_profiles ORDER BY created_at;

-- Promote user to admin
UPDATE admin_profiles SET role = 'admin' WHERE email = 'user@example.com';
```
