"use client";

import React from "react";
import { Laptop, Wifi, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FadeIn } from "@/components/shared/FadeIn";
import { GLOBAL_CLASSROOM_CONFIG } from "@/constants/landing";
import { type CountryNode } from "@/types/landing";
import styles from "./GlobalClassroom.module.css";

export const GlobalClassroom = () => {
  const { lang, t: allTranslations } = useLanguage();
  const t = allTranslations.global;
  const { countries, stats } = GLOBAL_CLASSROOM_CONFIG;

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden text-white">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e293b_0%,#0f172a_100%)] z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Side */}
          <div className="flex flex-col">
            <FadeIn>
              <h2 className="text-4xl font-heading font-bold text-white mb-6 flex items-center gap-4 text-left">
                <Globe size={36} className="text-primary" /> {t.title}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg text-slate-300 leading-relaxed mb-10 text-left">
                {t.desc}
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="flex gap-10">
                 <div className="flex flex-col">
                    <span className="text-4xl font-bold text-purple-400">{stats.countriesCount}</span>
                    <span className="text-sm uppercase tracking-wider text-slate-400 mt-1">{t.countriesLabel}</span>
                 </div>
                 <div className="w-px bg-white/20"></div>
                 <div className="flex flex-col">
                    <span className="text-4xl font-bold text-purple-400">{stats.onlineValue}</span>
                    <span className="text-sm uppercase tracking-wider text-slate-400 mt-1">{t.onlineLabel}</span>
                 </div>
              </div>
            </FadeIn>
          </div>

          {/* Visualization Side */}
          <FadeIn delay={0.3} className="flex items-center justify-center">
            <div className="relative w-full h-[400px] flex items-center justify-center">
               {/* Background Orbit Lines (Decorative) */}
               <div className={`${styles.orbitLine} w-[300px] h-[300px] ${styles.spinSlow}`}></div>
               <div className={`${styles.orbitLine} w-[500px] h-[500px] ${styles.spinSlowReverse}`}></div>

               {/* Central Hub */}
               <div className="w-20 h-20 bg-primary rounded-full flex flex-col items-center justify-center relative z-10 shadow-[0_0_30px_rgba(79,70,229,0.5)] border-4 border-slate-900">
                  <div className="absolute inset-0 bg-primary blur-lg opacity-50 rounded-full animate-pulse"></div>
                  <div className="relative z-10">
                     <Laptop size={28} color="white" />
                  </div>
                  <div className="absolute -bottom-3 bg-green-500 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm whitespace-nowrap z-20">
                    <Wifi size={8} /> ONLINE
                  </div>
               </div>

               {/* Nodes */}
               {(countries as CountryNode[]).map((c, i) => (
                 <div 
                    key={i} 
                    className={`absolute ${styles.floatNode} flex items-center`}
                    style={{ 
                        top: c.top,
                        left: c.left,
                        right: c.right,
                        bottom: c.bottom,
                        animationDelay: `${i * 0.5}s`
                    }} 
                 >
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-2 text-sm whitespace-nowrap shadow-lg">
                       <span>{c.flag}</span>
                       <span>{c.name[lang as 'en' | 'ua']}</span>
                       <span className={`w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e] ${styles.pulseGreen}`}></span>
                    </div>
                 </div>
               ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
