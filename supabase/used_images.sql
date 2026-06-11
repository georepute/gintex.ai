-- Global image-uniqueness ledger. Every Picsum seed assigned to a blog or
-- report cover/in-content image is recorded here. The UNIQUE(seed) constraint
-- is the hard guarantee that no two assets ever share the same image.
-- Run once in the Supabase SQL editor. Idempotent.

CREATE TABLE IF NOT EXISTS public.used_images (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seed       BIGINT NOT NULL UNIQUE,          -- the Picsum seed (global uniqueness)
  owner_type TEXT NOT NULL CHECK (owner_type IN ('blog', 'report')),
  owner_id   UUID,                            -- blog/report id (nullable for safety)
  slot       TEXT NOT NULL DEFAULT 'cover',   -- 'cover' | 'content-1' | 'content-2' ...
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS used_images_owner_idx ON public.used_images (owner_type, owner_id);

-- Row Level Security -------------------------------------------------------
ALTER TABLE public.used_images ENABLE ROW LEVEL SECURITY;

-- Public read is harmless (just seed numbers) and keeps anon backfill checks simple.
DROP POLICY IF EXISTS "used_images_public_read" ON public.used_images;
CREATE POLICY "used_images_public_read" ON public.used_images
  FOR SELECT USING (true);

-- Editors/admins (any authenticated admin profile) can reserve seeds.
DROP POLICY IF EXISTS "used_images_editor_insert" ON public.used_images;
CREATE POLICY "used_images_editor_insert" ON public.used_images
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL
    AND EXISTS (SELECT 1 FROM public.admin_profiles ap WHERE ap.id = auth.uid())
  );

-- Only admins can delete (e.g. to free a seed).
DROP POLICY IF EXISTS "used_images_admin_delete" ON public.used_images;
CREATE POLICY "used_images_admin_delete" ON public.used_images
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.admin_profiles ap WHERE ap.id = auth.uid() AND ap.role = 'admin')
  );
