import type { Metadata } from "next";
import { ContactView } from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact — Start With Intelligence",
  description:
    "Book a free GeoReput audit or speak with a strategist. Every engagement starts with understanding your brand's current market position.",
  alternates: { canonical: "https://gintex-ai.vercel.app/contact" },
};

export default function ContactPage() {
  return <ContactView />;
}
