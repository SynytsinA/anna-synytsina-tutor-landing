"use client";

import React, { useState } from "react";
import { Plus, Minus, MessageCircleQuestion } from "lucide-react";
import { useLanguage } from "@/components/shared/MainLayout";
import { FadeIn } from "@/components/shared/FadeIn";
import { FAQ_CONFIG } from "@/constants/landing";

export const FAQ = () => {
  const { t: allTranslations } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const t = allTranslations.faq;
  const { colorClasses } = FAQ_CONFIG;

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="max-w-[1200px] mx-auto px-5">
        <FadeIn>
          <h2 className="text-4xl font-heading font-bold text-slate-900 mb-10 text-center">
            <span className="flex items-center justify-center gap-4 leading-none">
              <MessageCircleQuestion size={40} className="text-primary" />
              {t.title}
            </span>
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-5 max-w-[800px] mx-auto">
          {t.items.map((item: { q: string; a: string }, index: number) => {
            const isOpen = openIndex === index;
            const colorClass = colorClasses[index % colorClasses.length];

            return (
              <FadeIn
                key={index}
                delay={index * 0.1}
                className={`bg-white border-2 border-slate-900 rounded-2xl shadow-hard overflow-hidden transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg ${colorClass} ${
                  isOpen ? "translate-x-0.5 translate-y-0.5 shadow-[2px_2px_0px_#0f172a]" : ""
                }`}
              >
                <button
                  className="w-full flex justify-between items-center p-6 bg-transparent border-none cursor-pointer text-left focus:outline-none"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-xl font-semibold text-slate-900">
                    {item.q}
                  </span>
                  <span>
                    {isOpen ? (
                      <Minus size={20} className="text-primary" />
                    ) : (
                      <Plus size={20} className="text-primary" />
                    )}
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-slate-600 leading-relaxed m-0">
                      {item.a}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
