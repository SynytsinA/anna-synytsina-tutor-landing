"use client";

import React, { createContext, useContext, useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { translations } from "@/constants/data";

interface LanguageContextType {
  lang: "en" | "ua";
  t: typeof translations.en;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<"en" | "ua">("ua");
  const t = translations[lang];

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "ua" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      <Navbar t={t.nav} toggleLang={toggleLang} />
      {children}
      <Footer t={t.footer} />
    </LanguageContext.Provider>
  );
}
