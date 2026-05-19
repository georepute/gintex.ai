"use client";

import { useLang } from "./LanguageContext";

export function HtmlDirWrapper({ children }: { children: React.ReactNode }) {
  const { dir, lang } = useLang();
  return (
    <div dir={dir} lang={lang} className="flex min-h-screen flex-col font-sans">
      {children}
    </div>
  );
}
