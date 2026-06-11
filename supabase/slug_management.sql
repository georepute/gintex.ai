-- Slug Management System — schema additions for editable slugs + 301 redirects.
-- Run once in the Supabase SQL editor. Idempotent. Mirrors the RLS conventions
-- of the `blogs` table in supabase/schema.sql.

-- 1. Slug history on blogs --------------------------------------------------
-- Existing rows already have a unique slug (enforced by the UNIQUE constraint),
-- so no backfill is needed; the column defaults to an empty array.
ALTER TABLE public.blogs
  ADD COLUMN IF NOT EXISTS slug_history TEXT[] DEFAULT '{}';

-- Optional canonical override. When NULL, the canonical URL is derived from the
-- current slug (the default behaviour); set it only to force a specific canonical.
ALTER TABLE public.blogs
  ADD COLUMN IF NOT EXISTS canonical_url TEXT;

-- 2. Redirects table --------------------------------------------------------
-- One row per old URL that must keep resolving. `old_slug` is globally unique so
-- a single lookup resolves any historical URL to its current target.
CREATE TABLE IF NOT EXISTS public.blog_redirects (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id       UUID REFERENCES public.blogs(id) ON DELETE CASCADE,
  old_slug      TEXT NOT NULL UNIQUE,
  new_slug      TEXT NOT NULL,
  redirect_type INTEGER NOT NULL DEFAULT 301,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Fast resolution by old URL (UNIQUE already creates an index, but be explicit)
CREATE INDEX IF NOT EXISTS blog_redirects_old_slug_idx ON public.blog_redirects (old_slug);
-- Fast history lookup for a given article
CREATE INDEX IF NOT EXISTS blog_redirects_blog_id_idx  ON public.blog_redirects (blog_id);

-- 3. Row Level Security -----------------------------------------------------
ALTER TABLE public.blog_redirects ENABLE ROW LEVEL SECURITY;

-- Public can read redirects (the public /blog/[slug] page resolves old URLs via
-- the anon client). Redirect rows contain no sensitive data.
DROP POLICY IF EXISTS "blog_redirects_public_read" ON public.blog_redirects;
CREATE POLICY "blog_redirects_public_read" ON public.blog_redirects
  FOR SELECT USING (true);

-- Editors/admins can create redirects.
DROP POLICY IF EXISTS "blog_redirects_editor_insert" ON public.blog_redirects;
CREATE POLICY "blog_redirects_editor_insert" ON public.blog_redirects
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.admin_profiles ap WHERE ap.id = auth.uid()
    )
  );

-- Editors/admins can update redirects (used when chaining a->b->c).
DROP POLICY IF EXISTS "blog_redirects_editor_update" ON public.blog_redirects;
CREATE POLICY "blog_redirects_editor_update" ON public.blog_redirects
  FOR UPDATE USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.admin_profiles ap WHERE ap.id = auth.uid()
    )
  );

-- Only admins can delete redirects.
DROP POLICY IF EXISTS "blog_redirects_admin_delete" ON public.blog_redirects;
CREATE POLICY "blog_redirects_admin_delete" ON public.blog_redirects
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles ap
      WHERE ap.id = auth.uid() AND ap.role = 'admin'
    )
  );
