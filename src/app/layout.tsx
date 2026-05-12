import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { PremiumCursor } from "@/components/cursor";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
  title: "Gintex AI - Control How the Market Sees You",
  description: "See the Story Behind the Story",
  openGraph: {
    title: "Gintex AI - Control How the Market Sees You",
    description: "See the Story Behind the Story",
    url: "https://gintex-ai.vercel.app",
    siteName: "Gintex AI",
    type: "website",
    images: [
      {
        url: "https://gintex-ai.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "Gintex AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gintex AI - Control How the Market Sees You",
    description: "See the Story Behind the Story",
    images: ["https://gintex-ai.vercel.app/logo.png"],
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
    >
      <body className="flex min-h-screen flex-col font-sans">
        <PremiumCursor />
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
