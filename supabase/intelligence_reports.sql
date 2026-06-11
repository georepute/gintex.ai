-- Intelligence Reports table for the decision-grade report generator.
-- Run this once in the Supabase SQL editor (or via the CLI) before using
-- the /admin/reports feature. Mirrors the conventions of the `blogs` table.

create table if not exists public.intelligence_reports (
  id              uuid primary key default gen_random_uuid(),
  topic           text not null,
  title           text,
  slug            text unique,
  excerpt         text,
  content         text,
  report_type     text not null default 'standard'
                    check (report_type in ('short','standard','research')),
  status          text not null default 'queued'
                    check (status in ('queued','researching','writing','done','failed','published')),
  stage_detail    text,
  evidence        jsonb,
  sources         jsonb,
  tags            text[] default '{}',
  seo_title       text,
  seo_description text,
  reading_time    integer,
  word_count      integer,
  language        text not null default 'en',
  error           text,
  cover_image     text,
  author_id       uuid references auth.users (id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  published_at    timestamptz
);

create index if not exists intelligence_reports_status_idx
  on public.intelligence_reports (status);
create index if not exists intelligence_reports_published_idx
  on public.intelligence_reports (published_at desc);

-- Row Level Security ---------------------------------------------------------
alter table public.intelligence_reports enable row level security;

-- Public (anon + authenticated) may read ONLY published reports.
drop policy if exists "Public can read published reports"
  on public.intelligence_reports;
create policy "Public can read published reports"
  on public.intelligence_reports
  for select
  using (status = 'published');

-- Authenticated admins/editors can read every report (any status).
drop policy if exists "Authenticated can read all reports"
  on public.intelligence_reports;
create policy "Authenticated can read all reports"
  on public.intelligence_reports
  for select
  to authenticated
  using (true);

-- Authenticated users can insert/update reports.
drop policy if exists "Authenticated can insert reports"
  on public.intelligence_reports;
create policy "Authenticated can insert reports"
  on public.intelligence_reports
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update reports"
  on public.intelligence_reports;
create policy "Authenticated can update reports"
  on public.intelligence_reports
  for update
  to authenticated
  using (true)
  with check (true);

-- Only admins (admin_profiles.role = 'admin') may delete.
drop policy if exists "Admins can delete reports"
  on public.intelligence_reports;
create policy "Admins can delete reports"
  on public.intelligence_reports
  for delete
  to authenticated
  using (
    exists (
      select 1 from public.admin_profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
