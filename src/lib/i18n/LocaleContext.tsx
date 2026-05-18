"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Locale } from "./translations";
import { translations } from "./translations";

type LocaleContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: typeof translations.en;
  isRtl: boolean;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  setLocale: () => {},
  t: translations.en,
  isRtl: false,
});

export function useLocale() {
  return useContext(LocaleContext);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("gintex-locale") as Locale | null;
    if (saved === "he" || saved === "en") setLocaleState(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (locale === "he") {
      root.setAttribute("dir", "rtl");
      root.setAttribute("lang", "he");
    } else {
      root.setAttribute("dir", "ltr");
      root.setAttribute("lang", "en");
    }
    localStorage.setItem("gintex-locale", locale);
  }, [locale]);

  const setLocale = (l: Locale) => setLocaleState(l);
  const t = translations[locale] as typeof translations.en;
  const isRtl = locale === "he";

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, isRtl }}>
      {children}
    </LocaleContext.Provider>
  );
}
