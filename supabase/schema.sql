-- =====================================================
-- Gintex.ai Blog CMS — Complete Database Schema
-- Run this in Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. ADMIN PROFILES
-- Extends auth.users with role information
-- =====================================================
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id        UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role      TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  full_name TEXT,
  email     TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Admins can read all profiles; users can only read their own
CREATE POLICY "admin_profiles_read" ON public.admin_profiles
  FOR SELECT USING (
    auth.uid() = id
    OR EXISTS (
      SELECT 1 FROM public.admin_profiles ap
      WHERE ap.id = auth.uid() AND ap.role = 'admin'
    )
  );

-- Only the user themselves can insert their own profile
CREATE POLICY "admin_profiles_insert" ON public.admin_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can update their own profile; admins can update any
CREATE POLICY "admin_profiles_update" ON public.admin_profiles
  FOR UPDATE USING (
    auth.uid() = id
    OR EXISTS (
      SELECT 1 FROM public.admin_profiles ap
      WHERE ap.id = auth.uid() AND ap.role = 'admin'
    )
  );

-- Only admins can delete profiles
CREATE POLICY "admin_profiles_delete" ON public.admin_profiles
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles ap
      WHERE ap.id = auth.uid() AND ap.role = 'admin'
    )
  );

-- Auto-create profile on signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'editor')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();


-- =====================================================
-- 2. BLOGS
-- Core content table for Gintex.ai blog system
-- =====================================================
CREATE TABLE IF NOT EXISTS public.blogs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  excerpt         TEXT,
  content         TEXT,
  cover_image     TEXT,
  seo_title       TEXT,
  seo_description TEXT,
  tags            TEXT[] DEFAULT '{}',
  status          TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'failed')),
  author_id       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reading_time    INTEGER,  -- in minutes
  language        TEXT NOT NULL DEFAULT 'en'
);

-- Indexes
CREATE INDEX IF NOT EXISTS blogs_status_idx       ON public.blogs (status);
CREATE INDEX IF NOT EXISTS blogs_slug_idx          ON public.blogs (slug);
CREATE INDEX IF NOT EXISTS blogs_published_at_idx  ON public.blogs (published_at DESC) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS blogs_author_idx        ON public.blogs (author_id);
CREATE INDEX IF NOT EXISTS blogs_tags_idx          ON public.blogs USING GIN (tags);
CREATE INDEX IF NOT EXISTS blogs_created_at_idx    ON public.blogs (created_at DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_blogs_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION public.update_blogs_updated_at();

-- Auto-set published_at when status flips to published
CREATE OR REPLACE FUNCTION public.set_published_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.status = 'published' AND OLD.status != 'published' THEN
    NEW.published_at = NOW();
  END IF;
  IF NEW.status != 'published' THEN
    NEW.published_at = NULL;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER blogs_set_published_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION public.set_published_at();

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Public can read published blogs
CREATE POLICY "blogs_public_read" ON public.blogs
  FOR SELECT USING (status = 'published');

-- Authenticated users (editors/admins) can read all blogs
CREATE POLICY "blogs_admin_read" ON public.blogs
  FOR SELECT USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.admin_profiles ap WHERE ap.id = auth.uid()
    )
  );

-- Editors and admins can insert/update
CREATE POLICY "blogs_editor_write" ON public.blogs
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.admin_profiles ap WHERE ap.id = auth.uid()
    )
  );

CREATE POLICY "blogs_editor_update" ON public.blogs
  FOR UPDATE USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.admin_profiles ap WHERE ap.id = auth.uid()
    )
  );

-- Only admins can delete blogs
CREATE POLICY "blogs_admin_delete" ON public.blogs
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles ap
      WHERE ap.id = auth.uid() AND ap.role = 'admin'
    )
  );


-- =====================================================
-- 3. AI GENERATION LOGS
-- Track AI usage and costs per generation
-- =====================================================
CREATE TABLE IF NOT EXISTS public.ai_generation_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt       TEXT NOT NULL,
  tokens       INTEGER,
  cost         NUMERIC(10, 6),
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  blog_id      UUID REFERENCES public.blogs(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS ai_gen_logs_user_idx    ON public.ai_generation_logs (user_id);
CREATE INDEX IF NOT EXISTS ai_gen_logs_blog_idx    ON public.ai_generation_logs (blog_id);
CREATE INDEX IF NOT EXISTS ai_gen_logs_created_idx ON public.ai_generation_logs (generated_at DESC);

ALTER TABLE public.ai_generation_logs ENABLE ROW LEVEL SECURITY;

-- Service role can always write (server-side logging)
CREATE POLICY "ai_logs_service_write" ON public.ai_generation_logs
  AS PERMISSIVE FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Admins can read all logs
CREATE POLICY "ai_logs_admin_read" ON public.ai_generation_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles ap
      WHERE ap.id = auth.uid() AND ap.role = 'admin'
    )
  );

-- Users can read their own logs
CREATE POLICY "ai_logs_own_read" ON public.ai_generation_logs
  FOR SELECT USING (auth.uid() = user_id);


-- =====================================================
-- 4. HELPER: slug generation
-- =====================================================
CREATE OR REPLACE FUNCTION public.generate_slug(title TEXT)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INT := 0;
BEGIN
  base_slug := LOWER(REGEXP_REPLACE(
    REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  ));
  base_slug := REGEXP_REPLACE(base_slug, '-+', '-', 'g');
  base_slug := TRIM(BOTH '-' FROM base_slug);
  base_slug := LEFT(base_slug, 80);

  final_slug := base_slug;
  WHILE EXISTS (SELECT 1 FROM public.blogs WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  RETURN final_slug;
END;
$$;


-- =====================================================
-- STORAGE BUCKET: blog-images
-- =====================================================
-- Run this separately in Supabase dashboard or via API:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Storage policy: anyone can read
-- CREATE POLICY "blog_images_public_read" ON storage.objects
--   FOR SELECT USING (bucket_id = 'blog-images');

-- Authenticated admins can upload
-- CREATE POLICY "blog_images_admin_upload" ON storage.objects
--   FOR INSERT WITH CHECK (
--     bucket_id = 'blog-images'
--     AND auth.uid() IS NOT NULL
--   );
