"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

function sendTheme(iframe: HTMLIFrameElement, theme: string) {
  try {
    iframe.contentWindow?.postMessage({ type: "gintex-theme", theme }, "*");
  } catch {}
}

export default function ExplorePage() {
  const { theme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    sendTheme(iframe, theme);
    const onLoad = () => sendTheme(iframe, theme);
    iframe.addEventListener("load", onLoad);
    return () => iframe.removeEventListener("load", onLoad);
  }, [theme]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "gintex-theme-request" && iframeRef.current) {
        sendTheme(iframeRef.current, theme);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [theme]);

  return (
    <>
      {/* Hide the site header and footer on this page only */}
      <style>{`
        header, footer { display: none !important; }
        body { overflow: hidden !important; }
      `}</style>

      {/* Back button */}
      <Link
        href="/global-map"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold backdrop-blur-md transition-opacity hover:opacity-80"
        style={{
          background: "rgba(10,10,10,0.75)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#f8fafc",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back
      </Link>

      {/* Full-screen map */}
      <iframe
        ref={iframeRef}
        src="/global-map.html"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          border: "none",
          display: "block",
        }}
        title="GeoRepute World Intelligence Map"
        allowFullScreen
      />
    </>
  );
}
