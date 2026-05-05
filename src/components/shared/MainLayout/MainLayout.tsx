"use client";

import React from "react";

import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, toggleLang } = useLanguage();

  return (
    <>
      <Navbar t={{ ...t.nav, a11y: t.a11y }} toggleLang={toggleLang} />
      {children}
      <Footer t={t.footer} />
    </>
  );
};

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  );
};
