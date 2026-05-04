"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GraduationCap, Menu, X } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { SOCIAL_LINKS } from "@/constants/seo";
import { NAV_STRUCTURE } from "@/constants/landing";
import { cn } from "@/utils/cn";

interface NavbarProps {
  t: {
    logo: string;
    toggle: string;
    menuLabels: Record<string, string>;
    a11y: {
      menu: string;
      close: string;
    };
  };
  toggleLang: () => void;
}

export const Navbar = ({ t, toggleLang }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const menuItems = React.useMemo(() => 
    NAV_STRUCTURE.map(item => ({
      ...item,
      label: t.menuLabels[item.id] || item.id
    })), 
    [t.menuLabels]
  );

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (menuItems.length > 0) {
        const scrolledToBottom = 
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
        
        if (scrolledToBottom) {
          setActiveSection(menuItems[menuItems.length - 1].href);
        }
      }
    };

    // Initialize state on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuItems]);

  useEffect(() => {
    if (menuItems.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -70% 0px", // Trigger when section is in upper-middle of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Check if we are at the bottom first - if so, don't let observer override
      const scrolledToBottom = 
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
      
      if (scrolledToBottom) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection("#" + entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    menuItems.forEach((item) => {
      if (item.href.startsWith("#")) {
        const id = item.href.substring(1);
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      }
    });

    return () => observer.disconnect();
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
                  "no-underline text-slate-900 font-bold text-xl font-hand transition-all duration-300 relative hover:text-primary pb-1",
                  "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[3px] after:bg-primary after:rounded-xl after:-rotate-2 after:transition-all after:duration-300 after:origin-center",
                  activeSection === item.href
                    ? "text-primary after:opacity-100 after:scale-x-100"
                    : "after:opacity-0 after:scale-x-0"
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
              <InstagramIcon size={22} />
            </a>

            <button
              className="lg:hidden bg-white border-2 border-slate-900 rounded-lg cursor-pointer flex items-center justify-center text-slate-900 p-1.5 shadow-[3px_3px_0px_#0f172a] w-10 h-10 z-[1001] relative transition-transform active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? t.a11y.close : t.a11y.menu}
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
                  "text-4xl font-bold font-hand text-slate-800 no-underline transition-all duration-500 ease-out transform hover:scale-105 active:scale-95 flex items-center justify-center",
                  isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                  activeSection === item.href && "text-primary"
                )}
                style={{ transitionDelay: `${100 + index * 50}ms` }}
              >
                {item.label}
                <span className={cn(
                  "inline-block w-2.5 h-2.5 bg-primary rounded-full ml-3 mb-2 transition-all duration-500",
                  activeSection === item.href ? "opacity-100 scale-100 animate-pulse" : "opacity-0 scale-0"
                )}></span>
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
                <InstagramIcon size={28} /> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
