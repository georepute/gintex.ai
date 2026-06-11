import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { runResearch, runWrite, slugify } from "@/lib/reports/generate";
import type { ReportGenerationInput, ReportType } from "@/types/report";

// Web search + two long Claude calls take a while. Ask the platform for the most
// time it allows; on Vercel this caps the `after()` work window too.
export const maxDuration = 300;

const VALID_TYPES: ReportType[] = ["short", "standard", "research"];

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as ReportGenerationInput;
  const topic = body.topic?.trim();
  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  const claudeKey = process.env.CLAUDE_API_KEY;
  if (!claudeKey) {
    return NextResponse.json({ error: "CLAUDE_API_KEY not configured" }, { status: 503 });
  }

  const reportType: ReportType = VALID_TYPES.includes(body.report_type as ReportType)
    ? (body.report_type as ReportType)
    : "standard";
  const language = body.language ?? "en";
  const keywords = Array.isArray(body.keywords) ? body.keywords.filter(Boolean) : [];

  // Create the row first so the client has an id to poll immediately.
  const { data: row, error: insertError } = await supabase
    .from("intelligence_reports")
    .insert({
      topic,
      report_type: reportType,
      language,
      status: "queued",
      stage_detail: "Queued for research",
      author_id: user.id,
    })
    .select("id")
    .single();

  if (insertError || !row) {
    return NextResponse.json(
      { error: insertError?.message ?? "Failed to create report" },
      { status: 500 },
    );
  }

  const reportId = row.id as string;

  // Run the two-phase pipeline after the response is sent. We use the service
  // client inside the background task so writes don't depend on the request
  // cookie lifecycle.
  after(async () => {
    const anthropic = new Anthropic({ apiKey: claudeKey });
    const bg = await createClient();
    let totalTokens = 0;

    const setStatus = (fields: Record<string, unknown>) =>
      bg.from("intelligence_reports")
        .update({ ...fields, updated_at: new Date().toISOString() })
        .eq("id", reportId);

    try {
      // ── Phase 1: research ──
      await setStatus({ status: "researching", stage_detail: "Searching the web and gathering evidence" });
      const { research, tokens: rTokens } = await runResearch(
        anthropic, topic, keywords, language, reportType,
      );
      totalTokens += rTokens;
      await setStatus({
        status: "writing",
        stage_detail: `Found ${research.findings.length} sourced findings; composing the report`,
        evidence: research.findings,
        sources: research.sources,
      });

      // ── Phase 2: write ──
      const { report, tokens: wTokens } = await runWrite(
        anthropic, topic, research, language, reportType,
      );
      totalTokens += wTokens;

      // Unique slug.
      const baseSlug = slugify(report.title || topic);
      let finalSlug = baseSlug || `report-${reportId.slice(0, 8)}`;
      let counter = 0;
      while (true) {
        const { data: existing } = await bg
          .from("intelligence_reports")
          .select("id")
          .eq("slug", finalSlug)
          .neq("id", reportId)
          .maybeSingle();
        if (!existing) break;
        counter++;
        finalSlug = `${baseSlug}-${counter}`;
      }

      // Reports are intentionally image-free (text-forward, decision-grade).
      // No cover and no in-content images are assigned.
      await setStatus({
        status: "done",
        stage_detail: "Report ready for review",
        title: report.title,
        slug: finalSlug,
        excerpt: report.excerpt,
        content: report.content,
        tags: report.tags,
        seo_title: report.seo_title,
        seo_description: report.seo_description,
        reading_time: report.reading_time,
        word_count: report.word_count,
        error: null,
      });

      // Fire-and-forget usage log (reuses the existing table).
      bg.from("ai_generation_logs").insert({
        prompt: `[report] ${topic}`,
        tokens: totalTokens,
        cost: totalTokens * 0.000005,
        user_id: user.id,
      }).then(() => {}, () => {});
    } catch (err) {
      const message = err instanceof Error ? err.message : "Report generation failed";
      console.error("Report generation error:", message);
      await setStatus({ status: "failed", stage_detail: "Generation failed", error: message });
    }
  });

  return NextResponse.json({ id: reportId, status: "queued" }, { status: 202 });
}
