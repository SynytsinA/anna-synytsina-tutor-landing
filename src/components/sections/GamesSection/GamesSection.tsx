"use client";

import React, { useState } from "react";
import { Wand2, Gift, Play, Loader2, Snowflake } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { useLanguage } from "@/context/LanguageContext";
import { LANDING_SECTIONS, GAMES_SECTION_CONFIG } from "@/constants/landing";
import { PotterGame } from "@/components/features/PotterGame/PotterGame";
import { GrinchGame } from "@/components/features/GrinchGame/GrinchGame";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GamesSection = () => {
  const { t } = useLanguage();
  const themesT = t.themes;
  const [activeTab, setActiveTab] = useState<"potter" | "grinch">("potter");
  const [lessonStatus, setLessonStatus] = useState<"idle" | "loading" | "active">("idle");

  const startLesson = () => {
    setLessonStatus("loading");
    setTimeout(() => {
      setLessonStatus("active");
    }, GAMES_SECTION_CONFIG.loadingDelay);
  };

  const handleTabChange = (tab: "potter" | "grinch") => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setLessonStatus("idle");
  };

  return (
    <section 
      className="py-24 bg-gradient-to-br from-[#1e1b4b] to-[#312e81] relative overflow-hidden" 
      id={LANDING_SECTIONS.games}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        <div className="text-center mb-12">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-harry text-white mb-6 drop-shadow-lg">
              {themesT.title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-indigo-100 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              {themesT.desc}
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} className="max-w-[1000px] mx-auto">
          {/* Custom Pill Switcher */}
          <div className="flex justify-center mb-10">
            <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-full border border-white/20 inline-flex shadow-xl">
              <button
                onClick={() => handleTabChange("potter")}
                className={cn(
                  "px-8 py-3 rounded-full font-heading font-bold text-lg transition-all flex items-center justify-center gap-3",
                  activeTab === "potter"
                    ? "bg-white text-indigo-900 shadow-lg scale-105"
                    : "text-white/70 hover:text-white"
                )}
              >
                <Wand2 size={20} />
                {themesT.potter}
              </button>
              <button
                onClick={() => handleTabChange("grinch")}
                className={cn(
                  "px-8 py-3 rounded-full font-heading font-bold text-lg transition-all flex items-center justify-center gap-3",
                  activeTab === "grinch"
                    ? "bg-white text-emerald-800 shadow-lg scale-105"
                    : "text-white/70 hover:text-white"
                )}
              >
                <Gift size={20} />
                {themesT.grinch}
              </button>
            </div>
          </div>

          {/* Game Canvas Wrapper */}
          <div className={cn(
            "relative min-h-[600px] flex flex-col items-center justify-center transition-all duration-500",
            lessonStatus !== "active" && "bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-sm shadow-2xl"
          )}>
            
            {lessonStatus === "idle" && (
              <div className="flex flex-col items-center animate-pop-in">
                <div className={cn(
                  "w-32 h-32 rounded-full border-4 flex items-center justify-center mb-10 transition-colors bg-white/5 shadow-inner",
                  activeTab === "potter" ? "border-amber-400 text-amber-300" : "border-emerald-400 text-emerald-300"
                )}>
                  {activeTab === "potter" ? <Wand2 size={56} /> : <Snowflake size={56} />}
                </div>
                <button
                  onClick={startLesson}
                  className="group relative bg-white text-indigo-900 px-12 py-5 rounded-full font-heading font-bold text-2xl flex items-center gap-4 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] active:scale-95 shadow-xl"
                >
                  {themesT.startBtn}
                  <Play size={24} fill="currentColor" />
                </button>
              </div>
            )}

            {lessonStatus === "loading" && (
              <div className="flex flex-col items-center">
                <Loader2 size={64} className="animate-spin text-white/50 mb-6" />
                <p className="text-white font-heading text-2xl tracking-widest animate-pulse">
                  {themesT.loading}
                </p>
              </div>
            )}

            {lessonStatus === "active" && (
              <div className="w-full animate-fade-in">
                {activeTab === "potter" ? <PotterGame /> : <GrinchGame translations={themesT} />}
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
