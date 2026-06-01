import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { PremiumCursor } from "@/components/cursor";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggleFloat } from "@/components/ThemeToggleFloat";
import { LanguageProvider } from "@/components/LanguageContext";
import { HtmlDirWrapper } from "@/components/HtmlDirWrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  title: {
    default: "Gintex AI — Control How the Market Sees You",
    template: "%s | Gintex AI",
  },
  description:
    "Business Visibility Intelligence — Control how the market, AI systems, and search engines see your brand.",
  keywords: [
    "AI visibility",
    "reputation intelligence",
    "GEO targeting",
    "SEO optimization",
    "market intelligence",
    "brand perception",
    "digital authority",
    "GeoRepute",
    "GEON intelligence",
  ],
  authors: [{ name: "Gintex AI", url: "https://gintex-ai.vercel.app" }],
  creator: "Gintex AI",
  metadataBase: new URL("https://gintex-ai.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gintex AI",
    description: "Control How the Market Sees You — Business Visibility Intelligence",
    url: "https://gintex-ai.vercel.app",
    siteName: "Gintex AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://gintex-ai.vercel.app/act-gintex.jpeg",
        width: 1200,
        height: 630,
        alt: "Gintex AI — Control How the Market Sees You",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gintex AI",
    description: "Control How the Market Sees You — Business Visibility Intelligence",
    images: ["https://gintex-ai.vercel.app/act-gintex.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body>
        <LanguageProvider>
        <ThemeProvider>
        <HtmlDirWrapper>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Gintex AI",
              alternateName: "GINTEX",
              url: "https://gintex-ai.vercel.app",
              logo: "https://gintex-ai.vercel.app/logo.png",
              description:
                "AI visibility, reputation intelligence, and strategic market positioning systems for brands. GeoRepute audits, SEO optimization, and digital authority-building.",
              foundingDate: "2024",
              areaServed: "Worldwide",
              serviceType: [
                "AI Visibility Intelligence",
                "Reputation & Perception Intelligence",
                "SEO Optimization",
                "GEO Targeting",
                "Market Intelligence",
                "Strategic Growth Infrastructure",
              ],
              sameAs: [
                "https://gintex-ai.vercel.app",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                url: "https://gintex-ai.vercel.app/contact",
                availableLanguage: "English",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Gintex AI Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "GeoRepute Market Execution" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Visibility Intelligence" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reputation & Perception Intelligence" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marketing Audit" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Strategic Growth Infrastructure" } },
                ],
              },
            }),
          }}
        />
        <PremiumCursor />
        <ThemeToggleFloat />
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
        </HtmlDirWrapper>
        </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
