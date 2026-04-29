"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const ScrollToTop = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button 
      onClick={scrollToTop}
      aria-label={t.a11y.scrollToTop}
      className={`fixed bottom-8 right-8 z-[100] bg-primary text-white w-12 h-12 rounded-full shadow-hard flex items-center justify-center cursor-pointer transition-all duration-300 border-2 border-slate-900 hover:-translate-y-1 hover:shadow-hard-lg hover:bg-primary/90 focus:outline-none ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <ArrowUp size={24} strokeWidth={3} />
    </button>
  );
};
