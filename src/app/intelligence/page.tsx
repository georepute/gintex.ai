import type { Metadata } from "next";
import { createClient as createAnonClient } from "@supabase/supabase-js";
import type { Blog } from "@/types/blog";
import type { IntelligenceReport } from "@/types/report";
import { IntelligencePageClient } from "@/components/intelligence/IntelligencePageClient";

export const metadata: Metadata = {
  title: "Intelligence — Insights, Research & Frameworks",
  description:
    "Perspectives on AI visibility, brand perception, GEO, SEO, and market intelligence. Research and frameworks from the Gintex AI team.",
  alternates: { canonical: "https://gintex-ai.vercel.app/intelligence" },
};

export const revalidate = 60;

function anon() {
  return createAnonClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

async function getPublishedBlogs(): Promise<Blog[]> {
  try {
    const { data } = await anon()
      .from("blogs")
      .select("id, title, slug, excerpt, cover_image, tags, published_at, reading_time, language")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(24);
    return (data ?? []) as Blog[];
  } catch {
    return [];
  }
}

async function getPublishedReports(): Promise<IntelligenceReport[]> {
  try {
    const { data } = await anon()
      .from("intelligence_reports")
      .select("id, title, slug, excerpt, cover_image, tags, published_at, reading_time, report_type, word_count, language")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(24);
    return (data ?? []) as IntelligenceReport[];
  } catch {
    return [];
  }
}

export default async function IntelligencePage() {
  const [blogs, reports] = await Promise.all([getPublishedBlogs(), getPublishedReports()]);
  return <IntelligencePageClient blogs={blogs} reports={reports} />;
}
