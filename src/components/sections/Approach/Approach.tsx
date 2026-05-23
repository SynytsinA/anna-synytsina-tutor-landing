"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { FadeIn } from "@/components/shared/FadeIn";
import { APPROACH_METADATA, LANDING_SECTIONS } from "@/constants/landing";
import { useLanguage } from "@/context/LanguageContext";

import { APPROACH_ICONS, COLOR_CLASSES, ICON_COLOR_CLASSES } from "./constants";

export const Approach = () => {
  const { t, lang } = useLanguage();
  const approachT = t.values;
  const list = approachT.list || [];
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section className="py-24 bg-white" id={LANDING_SECTIONS.approach}>
      <div className="max-w-[1200px] mx-auto px-5">
        <FadeIn immediate>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">
              {approachT.title}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">
          {/* Left: 4 Value Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1">
            {list.map((item, index: number) => {
              const Icon = APPROACH_ICONS[index % APPROACH_ICONS.length];
              const colorClass = COLOR_CLASSES[index % COLOR_CLASSES.length];
              const iconColorClass = ICON_COLOR_CLASSES[index % ICON_COLOR_CLASSES.length];

              return (
                <FadeIn
                  immediate
                  key={index}
                  delay={index * 0.1}
                  className={`rounded-hand p-8 border-2 border-slate-900 shadow-hard transition-all duration-300 hover:shadow-hard-lg hover:-translate-y-1 ${index % 2 === 0 ? "rotate-1" : "-rotate-1"
                    } ${colorClass}`}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center bg-white border-2 border-slate-900 mb-6 shrink-0 shadow-sm ${iconColorClass}`}
                  >
                    <Icon size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-hand text-2xl font-bold text-slate-900 mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </FadeIn>
              );
            })}
          </div>

          {/* Right: Portrait Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <FadeIn
              immediate
              className="relative p-3 bg-white border-2 border-slate-900 shadow-hard-xl rotate-3 transition-all duration-300 hover:rotate-0 hover:scale-[1.02] hover:shadow-hard-2xl"
              delay={0.2}
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-[120px] h-[40px] bg-white/60 border-x border-slate-200/50 shadow-sm opacity-80 z-10 backdrop-blur-sm"></div>

              <div className="relative overflow-hidden border border-slate-100 flex aspect-[3/4]">
                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-slate-200 animate-pulse z-10" />
                )}
                <Image
                  src={APPROACH_METADATA.portraitImage.url}
                  alt={APPROACH_METADATA.portraitImage.alt[lang]}
                  width={APPROACH_METADATA.portraitImage.width}
                  height={APPROACH_METADATA.portraitImage.height}
                  className={`w-full h-full object-cover rounded-sm filter brightness-[1.02] contrast-[1.02] transition-opacity duration-500 ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  priority
                  onLoad={() => setIsImageLoaded(true)}
                />
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-accent rounded-full border-2 border-slate-900 flex items-center justify-center shadow-hard animate-bounce-slow">
                <Sparkles className="text-white" size={24} />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
