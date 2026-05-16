import { redirect } from "next/navigation";

// /blog redirects to /intelligence (the canonical listing page)
export default function BlogIndexPage() {
  redirect("/intelligence");
}
