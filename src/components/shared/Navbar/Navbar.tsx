"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Instagram, GraduationCap, Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SOCIAL_LINKS } from "@/constants/navigation";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  t: {
    logo: string;
    toggle: string;
    menu: Array<{ label: string; href: string }>;
  };
  toggleLang: () => void;
}

export const Navbar = ({ t, toggleLang }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const menuItems = React.useMemo(() => t.menu || [], [t.menu]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrolledToBottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight - 50;

      if (scrolledToBottom && menuItems.length > 0) {
        setActiveSection(menuItems[menuItems.length - 1].href);
        return;
      }

      const sections = menuItems.map((item) => item.href.substring(1));
      let current = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 150) {
            current = "#" + section;
          }
        }
      }

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuItems]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        
        // Manual smooth scroll
        const offset = 80; // Navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        // Update URL hash without standard jump
        window.history.pushState(null, "", href);
        setActiveSection(href);
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 h-20 z-[1000] transition-all duration-300 text-slate-900 border-slate-900",
          isMobileMenuOpen
            ? "bg-transparent"
            : isScrolled
            ? "bg-white/95 backdrop-blur-md h-[70px] shadow-sm border-b-2"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-5 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 cursor-pointer shrink-0"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "/");
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="w-10 h-10 bg-primary rounded-blob flex items-center justify-center text-white border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]">
              <GraduationCap size={20} color="white" />
            </div>
            <span className="font-hand font-bold text-2xl sm:text-3xl whitespace-nowrap pt-1">
              {t.logo}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-6 xl:gap-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className={cn(
                  "no-underline text-slate-900 font-bold text-xl font-hand transition-colors duration-200 relative hover:text-primary",
                  activeSection === item.href &&
                    'text-primary after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[3px] after:bg-primary after:rounded-xl after:-rotate-2'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleLang}
              className="hidden md:block bg-white border-2 border-slate-900 px-3 py-1.5 rounded-hand font-bold cursor-pointer text-sm font-hand text-slate-900 shadow-[3px_3px_0px_rgba(0,0,0,0.1)] transition-all duration-200 whitespace-nowrap hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:translate-y-px active:shadow-[1px_1px_0px_rgba(0,0,0,0.1)]"
            >
              {t.toggle}
            </button>

            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-blob text-white border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] transition-transform duration-200 hover:scale-110 hover:rotate-6"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>

            <button
              className="lg:hidden bg-white border-2 border-slate-900 rounded-lg cursor-pointer flex items-center justify-center text-slate-900 p-1.5 shadow-[3px_3px_0px_#0f172a] w-10 h-10 z-[1001] relative transition-transform active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[999] bg-[#fffdf5] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isMobileMenuOpen
            ? "opacity-100 visible clip-circle-open"
            : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl transition-transform duration-700 translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-100/50 rounded-full blur-3xl transition-transform duration-700 -translate-x-10 translate-y-10"></div>

        <div className="flex-1 flex flex-col justify-start items-center px-6 relative z-10 pt-28 pb-8 overflow-y-auto">
          <div className="flex flex-col items-center gap-6 w-full">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className={cn(
                  "text-4xl font-bold font-hand text-slate-800 no-underline transition-all duration-500 ease-out transform hover:scale-105 active:scale-95",
                  isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                  activeSection === item.href && "text-primary"
                )}
                style={{ transitionDelay: `${100 + index * 50}ms` }}
              >
                {item.label}
                {activeSection === item.href && (
                  <span className="inline-block w-2.5 h-2.5 bg-primary rounded-full ml-3 mb-2 animate-pulse"></span>
                )}
              </Link>
            ))}
          </div>

          <div
            className={cn(
              "mt-auto pt-10 flex flex-col gap-4 items-center transition-all duration-500 delay-300",
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            )}
          >
            <div className="flex items-center gap-8 mt-2">
              <button
                onClick={toggleLang}
                className="font-bold font-hand text-2xl text-slate-700 hover:text-primary transition-colors"
              >
                {t.toggle === "🇺🇦 UA" ? "English" : "Українська"}
              </button>

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-bold font-hand text-2xl text-slate-700 hover:text-pink-600 transition-colors"
              >
                <Instagram size={28} /> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
