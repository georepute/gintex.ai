"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "he";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  toggleLang: () => {},
  dir: "ltr",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  function toggleLang() {
    setLang((prev) => (prev === "en" ? "he" : "en"));
  }

  return (
    <LanguageContext.Provider
      value={{ lang, toggleLang, dir: lang === "he" ? "rtl" : "ltr" }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
