"use client";

import React from "react";
import Image from "next/image";
import { FadeIn } from "@/components/shared/FadeIn";
import { 
  ShieldCheck, 
  Award, 
  Zap, 
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/components/shared/MainLayout";
import { APPROACH_METADATA, LANDING_SECTIONS } from "@/constants/landing";

const icons = [ShieldCheck, Award, Zap, Sparkles];
const colorClasses = [
  "bg-rose-50",
  "bg-indigo-50",
  "bg-amber-50",
  "bg-emerald-50",
];
const iconColorClasses = [
  "text-rose-600",
  "text-indigo-600",
  "text-amber-600",
  "text-emerald-600",
];

export const Approach = () => {
  const { t, lang } = useLanguage();
  const approachT = t.values;
  const list = approachT.list || [];

  return (
    <section className="py-24 bg-white" id={LANDING_SECTIONS.approach}>
      <div className="max-w-[1200px] mx-auto px-5">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">
              {approachT.title}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">
          {/* Left: 4 Value Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1">
            {list.map((item: any, index: number) => {
              const Icon = icons[index % icons.length];
              const colorClass = colorClasses[index % colorClasses.length];
              const iconColorClass = iconColorClasses[index % iconColorClasses.length];

              return (
                <FadeIn
                  key={index}
                  delay={index * 0.1}
                  className={`rounded-hand p-8 border-2 border-slate-900 shadow-hard transition-all duration-300 hover:shadow-hard-lg hover:-translate-y-1 ${
                    index % 2 === 0 ? "rotate-1" : "-rotate-1"
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
              className="relative p-3 bg-white border-2 border-slate-900 shadow-hard-xl rotate-3 transition-transform hover:rotate-0 duration-500"
              delay={0.2}
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-[120px] h-[40px] bg-white/60 border-x border-slate-200/50 shadow-sm opacity-80 z-10 backdrop-blur-sm"></div>
              
              <div className="overflow-hidden border border-slate-100 flex">
                <Image
                  src={APPROACH_METADATA.portraitImage.url}
                  alt={APPROACH_METADATA.portraitImage.alt[lang]}
                  width={APPROACH_METADATA.portraitImage.width}
                  height={APPROACH_METADATA.portraitImage.height}
                  className="w-full h-auto object-cover rounded-sm filter brightness-[1.02] contrast-[1.02]"
                  priority
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
