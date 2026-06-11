-- Slug Management for Intelligence Reports — editable slugs + 301 redirects.
-- Mirror of supabase/slug_management.sql for the intelligence_reports table.
-- Run once in the Supabase SQL editor. Idempotent.

-- 1. Slug history on reports ------------------------------------------------
ALTER TABLE public.intelligence_reports
  ADD COLUMN IF NOT EXISTS slug_history TEXT[] DEFAULT '{}';

-- Optional canonical override (NULL = derive from current slug).
ALTER TABLE public.intelligence_reports
  ADD COLUMN IF NOT EXISTS canonical_url TEXT;

-- 2. Redirects table --------------------------------------------------------
-- One row per old report URL that must keep resolving. `old_slug` is globally
-- unique so a single lookup resolves any historical URL to its current target.
CREATE TABLE IF NOT EXISTS public.report_redirects (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id     UUID REFERENCES public.intelligence_reports(id) ON DELETE CASCADE,
  old_slug      TEXT NOT NULL UNIQUE,
  new_slug      TEXT NOT NULL,
  redirect_type INTEGER NOT NULL DEFAULT 301,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS report_redirects_old_slug_idx  ON public.report_redirects (old_slug);
CREATE INDEX IF NOT EXISTS report_redirects_report_id_idx ON public.report_redirects (report_id);

-- 3. Row Level Security -----------------------------------------------------
ALTER TABLE public.report_redirects ENABLE ROW LEVEL SECURITY;

-- Public can read redirects (the public /intelligence-report/[slug] page
-- resolves old URLs via the anon client). No sensitive data.
DROP POLICY IF EXISTS "report_redirects_public_read" ON public.report_redirects;
CREATE POLICY "report_redirects_public_read" ON public.report_redirects
  FOR SELECT USING (true);

-- Editors/admins can create redirects.
DROP POLICY IF EXISTS "report_redirects_editor_insert" ON public.report_redirects;
CREATE POLICY "report_redirects_editor_insert" ON public.report_redirects
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL
    AND EXISTS (SELECT 1 FROM public.admin_profiles ap WHERE ap.id = auth.uid())
  );

-- Editors/admins can update redirects (chaining a->b->c).
DROP POLICY IF EXISTS "report_redirects_editor_update" ON public.report_redirects;
CREATE POLICY "report_redirects_editor_update" ON public.report_redirects
  FOR UPDATE USING (
    auth.uid() IS NOT NULL
    AND EXISTS (SELECT 1 FROM public.admin_profiles ap WHERE ap.id = auth.uid())
  );

-- Only admins can delete redirects.
DROP POLICY IF EXISTS "report_redirects_admin_delete" ON public.report_redirects;
CREATE POLICY "report_redirects_admin_delete" ON public.report_redirects
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles ap
      WHERE ap.id = auth.uid() AND ap.role = 'admin'
    )
  );
