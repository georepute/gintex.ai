import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Report ID required" }, { status: 400 });

  const { data: report, error: fetchError } = await supabase
    .from("intelligence_reports")
    .select("id, status, slug")
    .eq("id", id)
    .single();

  if (fetchError || !report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }
  if (report.status === "published") {
    return NextResponse.json({ error: "Report is already published" }, { status: 400 });
  }
  if (!report.slug) {
    return NextResponse.json({ error: "Report is not ready to publish yet" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("intelligence_reports")
    .update({
      status: "published",
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    success: true,
    report: data,
    publicUrl: `/intelligence-report/${data.slug}`,
  });
}
