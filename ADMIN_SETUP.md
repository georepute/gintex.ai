# Admin Setup Guide

How to create admins, manage roles, and access the CMS.

---

## 1. First-Time Setup

### a. Run the database schema

Go to **Supabase Dashboard → SQL Editor** and run the contents of `supabase/schema.sql`.

### b. Set environment variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase and OpenAI credentials.

### c. Create the storage bucket

In **Supabase Dashboard → Storage**, create a new bucket:
- Name: `blog-images`
- Public: ✅ Yes

---

## 2. Creating Your First Admin User

### Via Supabase Dashboard

1. Go to **Authentication → Users** in your Supabase Dashboard
2. Click **Add User → Create new user**
3. Enter email and password
4. After the user is created, go to **Table Editor → admin_profiles**
5. The trigger auto-creates a profile with `role = 'editor'`
6. Change the role to `'admin'` for full access:
   ```sql
   UPDATE public.admin_profiles
   SET role = 'admin'
   WHERE email = 'your@email.com';
   ```

### Via SQL (quickest for first admin)

```sql
-- First create the auth user via Supabase Dashboard, then:
UPDATE public.admin_profiles
SET role = 'admin', full_name = 'Your Name'
WHERE email = 'admin@gintex.ai';
```

---

## 3. Logging In

Navigate to: `https://your-domain.com/admin/login`

Enter your email and password. You will be redirected to `/admin/dashboard`.

The login page is **not linked** from the public website — it's internal-only.

---

## 4. Roles

### `admin`
Full access:
- Generate blogs
- Edit all blogs
- Publish / unpublish blogs
- Delete blogs
- View analytics
- Manage other admin profiles

### `editor`
Restricted access:
- Generate blogs
- Edit blogs
- Save drafts
- Mark for review
- Cannot publish (handled by admins)
- Cannot delete

---

## 5. Managing Roles

Only admins can change roles. Via SQL:

```sql
-- Promote to admin
UPDATE public.admin_profiles SET role = 'admin' WHERE email = 'user@example.com';

-- Demote to editor
UPDATE public.admin_profiles SET role = 'editor' WHERE email = 'user@example.com';
```

---

## 6. Routes

| Route | Description |
|---|---|
| `/admin/login` | Login page |
| `/admin/dashboard` | Overview stats |
| `/admin/blogs` | All blog posts |
| `/admin/blogs/new` | Generate new blog |
| `/admin/blogs/edit/[id]` | Edit a blog |
| `/admin/analytics` | AI usage stats |

All `/admin/*` routes (except login) require authentication.

---

## 7. Session Persistence

Sessions are managed by Supabase SSR cookies. They persist across browser refreshes until the user signs out or the session expires (default: 1 week).

To sign out: click **Sign out** in the bottom-left of the admin sidebar.
