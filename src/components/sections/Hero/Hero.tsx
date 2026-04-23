"use client";

import React from "react";
import { ArrowRight, Play } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { HeroQuiz } from "@/components/features/HeroQuiz";
import { HERO_CONFIG, LANDING_SECTIONS } from "@/constants/landing";
import { useLanguage } from "@/context/LanguageContext";

const InteractiveWord = ({ word }: { word: string }) => {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {word.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block animate-playful-wave origin-bottom"
          style={{
            animationDelay: `${i * HERO_CONFIG.interactiveWordDelay}s`,
            color:
              i % 3 === 0 ? "#4f46e5" : i % 3 === 1 ? "#ec4899" : "#f59e0b",
          }}
        >
          {char}
        </span>
      ))}
      <svg
        className="absolute -bottom-3 left-0 w-full h-[15px] -z-10 opacity-0 scale-x-0 origin-left animate-draw-scribble"
        style={{ animationDelay: HERO_CONFIG.scribbleDelay }}
        viewBox="0 0 200 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.00025 7.00005C39.4636 2.87258 133.023 -3.42128 197.973 5.46077"
          stroke="#EC4899"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};

export const Hero = () => {
  const { t, lang } = useLanguage();

  const handleScroll = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const titleStartString = t.hero.titleStart || "";
  const firstSpaceIndex = titleStartString.indexOf(" ");

  let firstWord = titleStartString;
  let restOfTitle = "";

  if (firstSpaceIndex !== -1) {
    firstWord = titleStartString.substring(0, firstSpaceIndex);
    restOfTitle = titleStartString.substring(firstSpaceIndex);
  }

  return (
    <header className="pt-32 pb-20 md:pt-40 md:pb-32 bg-[#fffdf5] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] bg-[length:30px_30px] opacity-50 z-0"></div>

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
          {/* Left Side - Content */}
          <div className="flex flex-col items-start order-1">
            <FadeIn delay={HERO_CONFIG.fadeDelays.badge}>
              <div className="inline-flex items-center gap-2 bg-white border-2 border-slate-900 rounded-hand px-5 py-2 font-hand font-bold text-xl text-slate-900 tracking-wide shadow-hard-orange mb-8 -rotate-2">
                <span>{HERO_CONFIG.badgeIcon}</span>
                {t.hero.tag}
              </div>
            </FadeIn>

            <FadeIn delay={HERO_CONFIG.fadeDelays.title}>
              <h1 className="text-[3rem] sm:text-[3.5rem] md:text-[4.5rem] leading-[1.1] text-slate-900 font-heading font-semibold mb-6">
                <InteractiveWord word={firstWord} />
                {restOfTitle} <br />
                <span className="relative inline-block text-primary">
                  {t.hero.titleHighlight}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-[20px] -z-10 opacity-80"
                    viewBox="0 0 200 15"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M5,10 Q100,5 195,10"
                      fill="none"
                      stroke="#facc15"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={HERO_CONFIG.fadeDelays.subtitle}>
              <p className="text-xl leading-relaxed text-slate-600 max-w-[500px] mb-10 font-medium">
                {t.hero.subtitle}
              </p>
            </FadeIn>

            <FadeIn
              delay={HERO_CONFIG.fadeDelays.actions}
              className="flex flex-wrap gap-5 items-center"
            >
              <a
                href={`#${LANDING_SECTIONS.contact}`}
                onClick={handleScroll(LANDING_SECTIONS.contact)}
                className="bg-primary text-white px-8 py-4 rounded-hand font-hand text-2xl font-medium no-underline flex items-center gap-2 transition-all duration-200 shadow-hard-indigo border-2 border-black hover:-translate-y-1 hover:shadow-[0_12px_0px_#4338ca] active:translate-y-1 active:shadow-none"
              >
                {t.hero.cta} <ArrowRight size={20} />
              </a>
              <a
                href={`#${LANDING_SECTIONS.videoGallery}`}
                onClick={handleScroll(LANDING_SECTIONS.videoGallery)}
                className="flex items-center gap-2 font-bold text-slate-900 no-underline px-5 py-2.5 rounded-full transition-colors duration-200 hover:bg-white hover:shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-secondary shadow-sm">
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                </div>
                {t.hero.watchVideo}
              </a>
            </FadeIn>
          </div>

          {/* Right Side - Interactive Quiz Widget */}
          <div className="flex flex-col items-center justify-center relative order-2 mb-8 lg:mb-0 w-full">
            <FadeIn delay={HERO_CONFIG.fadeDelays.quiz} className="relative w-full flex justify-center">
              <HeroQuiz />
            </FadeIn>
          </div>
        </div>
      </div>
    </header>
  );
};
