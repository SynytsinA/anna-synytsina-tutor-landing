"use client";

import React from "react";
import Image from "next/image";
import { FadeIn } from "@/components/shared/FadeIn";
import { 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Quote, 
  Star, 
  Sparkles 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ABOUT_METADATA, LANDING_SECTIONS } from "@/constants/landing";

const colorClasses = ["bg-indigo-50", "bg-pink-50", "bg-yellow-50"];

const getIcon = (index: number) => {
  switch (index) {
    case 0:
      return <Briefcase size={24} className="text-primary" />;
    case 1:
      return <GraduationCap size={24} className="text-secondary" />;
    case 2:
      return <Building2 size={24} className="text-accent" />;
    default:
      return <Briefcase size={24} />;
  }
};

export const About = () => {
  const { t, lang } = useLanguage();
  const aboutT = t.about;

  return (
    <section className="py-24 bg-white overflow-hidden" id={LANDING_SECTIONS.about}>
      <div className="max-w-[1200px] mx-auto px-5">
        <FadeIn>
          <h2 className="text-4xl font-heading font-bold text-slate-900 mb-16 text-center">
            {aboutT.title}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-24 items-start">
          {/* Left: Photo with Playful Polaroid Style */}
          <div className="relative flex justify-center mt-4">
            <FadeIn className="relative w-full max-w-[400px]">
              {/* Decorative background blob */}
              <div className="absolute -top-10 -left-10 w-[120%] h-[120%] bg-[#fff7ed] rounded-blob -rotate-3 z-0 animate-morph transition-all duration-[8000ms]"></div>

              {/* Floating Doodles */}
              <div className="absolute -top-6 -right-6 z-20 animate-float-decor">
                <Star
                  size={40}
                  fill="#facc15"
                  stroke="#0f172a"
                  strokeWidth="2"
                />
              </div>
              <div
                className="absolute bottom-8 -left-8 z-20 animate-float-decor"
                style={{ animationDelay: "1s" }}
              >
                <Sparkles size={32} className="text-pink-500" />
              </div>

              {/* Image Frame with Tape */}
              <div className="relative z-10 bg-white p-4 pb-20 border-2 border-slate-200 shadow-xl rotate-2 transition-transform duration-300 hover:rotate-0 hover:scale-[1.02] hover:shadow-2xl">
                {/* Tape */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 -rotate-2 w-32 h-10 bg-white/80 border-x-2 border-slate-200/50 shadow-sm opacity-90 z-20 backdrop-blur-sm"></div>

                <div className="overflow-hidden border border-slate-100 flex">
                  <Image
                    src={ABOUT_METADATA.profilePhoto.url}
                    alt={ABOUT_METADATA.profilePhoto.alt[lang]}
                    width={ABOUT_METADATA.profilePhoto.width}
                    height={ABOUT_METADATA.profilePhoto.height}
                    className="w-full h-auto aspect-[3/4] object-cover filter sepia-[.15]"
                    priority
                  />
                </div>

                {/* Handwritten Name */}
                <div className="absolute bottom-4 left-0 w-full text-center px-4">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider mb-2 bg-slate-100 px-3 py-1 rounded-full text-slate-600">
                    👩‍🏫 {aboutT.role}
                  </span>
                  <h3 className="font-hand text-3xl font-bold text-slate-900 leading-none -rotate-1">
                    {aboutT.name}
                  </h3>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-10">
            <FadeIn delay={0.1}>
              <div className="relative bg-white border-2 border-slate-900 rounded-[2rem] p-8 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] hover:shadow-hard transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Quote
                    size={40}
                    className="text-primary/20 fill-primary/20"
                  />
                  <span className="font-hand text-3xl font-bold text-primary -mt-2">
                    {lang === "ua" ? "Привіт!" : "Hello!"}
                  </span>
                </div>
                <p className="text-lg md:text-[1.15rem] leading-[1.8] text-slate-700 font-medium m-0">
                  {aboutT.desc}
                </p>
              </div>
            </FadeIn>

            <div className="flex flex-col gap-4">
              {aboutT.stats &&
                aboutT.stats.map((stat, index: number) => (
                  <FadeIn
                    key={index}
                    delay={0.2 + index * 0.1}
                    className={`flex items-center gap-6 px-6 py-5 rounded-hand border-2 border-slate-900 shadow-hard transition-all duration-300 hover:translate-x-1 hover:-rotate-1 ${
                      colorClasses[index % colorClasses.length]
                    }`}
                  >
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-2 border-slate-900 shrink-0 shadow-sm">
                      {getIcon(index)}
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-heading text-2xl font-bold text-slate-900 m-0 leading-none mb-1">
                        {stat.value}
                      </h4>
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-600 mb-1">
                        {stat.label}
                      </span>
                      <p className="text-sm text-slate-700 m-0 leading-tight">
                        {stat.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
