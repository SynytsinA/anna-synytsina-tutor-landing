"use client";

import React from "react";
import { Backpack, BookOpen, Pencil, CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { useLanguage } from "@/context/LanguageContext";
import { LANDING_SECTIONS, SERVICES_CONFIG } from "@/constants/landing";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "backpack":
      return <Backpack size={28} />;
    case "book":
      return <BookOpen size={28} />;
    case "pencil":
      return <Pencil size={28} />;
    default:
      return <BookOpen size={28} />;
  }
};

const getBgClass = (index: number) => {
  switch (index) {
    case 0:
      return "bg-rose-50 text-rose-600";
    case 1:
      return "bg-indigo-50 text-indigo-600";
    case 2:
      return "bg-amber-50 text-amber-600";
    default:
      return "bg-slate-50 text-slate-600";
  }
};

export const Services = () => {
  const { t } = useLanguage();
  const servicesT = t.subjects; // Known as 'subjects' in translations but 'Services' in UI
  const cards = servicesT.cards || [];

  return (
    <section className="py-20 bg-white" id={LANDING_SECTIONS.subjects}>
      <div className="max-w-[1200px] mx-auto px-5">
        <FadeIn>
          <h2 className="text-4xl font-heading font-bold text-slate-900 mb-5 text-center">
            {servicesT.title}
          </h2>
        </FadeIn>

        <div className={cn("grid gap-8", SERVICES_CONFIG.grid)}>
          {cards.map((card: any, index: number) => (
            <FadeIn
              key={index}
              className="bg-white rounded-3xl p-8 border-[3px] border-slate-900 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex flex-col gap-6 h-full shadow-[6px_6px_0px_rgba(15,23,42,0.1)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg hover:border-slate-900"
              delay={0.1 * (index + 1)}
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]",
                  getBgClass(index)
                )}
              >
                {getIcon(card.icon)}
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold mb-2">
                  {card.title}
                </h3>
                <p className="mb-4 text-slate-600">{card.desc}</p>
                <ul className="flex flex-col gap-3 m-0 p-0 list-none">
                  {card.list.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-slate-900 font-semibold text-[0.95rem] leading-[1.4]"
                    >
                      <CheckCircle
                        size={16}
                        className="text-green-500 shrink-0 mt-1"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
