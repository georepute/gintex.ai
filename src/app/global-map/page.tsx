"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

function sendTheme(iframe: HTMLIFrameElement, theme: string) {
  try {
    iframe.contentWindow?.postMessage({ type: "gintex-theme", theme }, "*");
  } catch {}
}

export default function GlobalMapPage() {
  const { theme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Send theme whenever it changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    // If already loaded, send immediately
    sendTheme(iframe, theme);
    // Also send on iframe load (handles initial render)
    const onLoad = () => sendTheme(iframe, theme);
    iframe.addEventListener("load", onLoad);
    return () => iframe.removeEventListener("load", onLoad);
  }, [theme]);

  // Reply to theme-request messages from the iframe
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
    <iframe
      ref={iframeRef}
      src="/global-map.html"
      className="w-full border-0 block"
      style={{ height: "calc(100vh - 80px)", display: "block", background: "#000" }}
      title="GeoRepute World Intelligence Map"
      allowFullScreen
    />
  );
}
