import type { Metadata } from "next";
import { ContactView } from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact | Gintex Ai",
  description:
    "Get in touch with Gintex AI—GeoReput intelligence, services, and partnerships.",
};

export default function ContactPage() {
  return <ContactView />;
}
