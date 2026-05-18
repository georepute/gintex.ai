import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }
  return NextResponse.json(data);
}
