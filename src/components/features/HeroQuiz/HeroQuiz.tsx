"use client";

import React, { useEffect } from "react";
import { Brain, Calculator, BookA, PartyPopper, Star, Lightbulb } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

import { useHeroQuiz } from "@/hooks";

import { QuizQuestions } from "./QuizQuestions";
import { QuizResults } from "./QuizResults";

export const HeroQuiz = () => {
  const { t: allTranslations } = useLanguage();
  const t = allTranslations.heroQuiz;

  const {
    activeTab,
    currentIndex,
    selectedOptionIndex,
    score,
    isFinished,
    shuffledOptions,
    currentQuestions,
    progress,
    handleTabChange,
    handleOptionClick,
    resetQuizState
  } = useHeroQuiz();

  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [currentIndex, isFinished]);

  const getResultContent = () => {
    if (score === 5) return { ...t.result5, Icon: PartyPopper, colorClass: "text-green-600", bgClass: "bg-green-100" };
    if (score >= 3) return { ...t.result3, Icon: Star, colorClass: "text-yellow-600", bgClass: "bg-yellow-100" };
    return { ...t.resultBad, Icon: Lightbulb, colorClass: "text-blue-600", bgClass: "bg-blue-100" };
  };

  const resultContent = getResultContent();

  return (
    <div className="relative w-full md:max-w-[480px] lg:max-w-[500px] mx-auto perspective-1000 pt-5">
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-300 rounded-full blur-xl opacity-60 animate-pulse"></div>
      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-300 rounded-full blur-xl opacity-60 animate-pulse delay-700"></div>

      {/* Header Badge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white px-3 sm:px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-sm z-30 flex items-center gap-2 w-[90%] sm:w-auto justify-center">
        <Brain size={18} className="text-primary shrink-0" />
        <span className="font-heading font-bold text-slate-900 text-xs sm:text-sm text-center leading-tight whitespace-nowrap sm:whitespace-normal">
          {t.tryNow}
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-[2rem] border-[3px] border-slate-900 shadow-hard-xl overflow-hidden relative z-10 flex flex-col h-[580px] transition-transform duration-300 hover:-translate-y-1">

        {/* Tabs */}
        <div className="p-2 bg-slate-100/50 flex gap-2 pt-8 sm:pt-10 border-b-2 border-slate-100 shrink-0">
          <button
            onClick={() => handleTabChange('ukrainian')}
            className={`flex-1 py-3 rounded-xl font-bold font-heading text-sm transition-all duration-200 flex items-center justify-center gap-2 outline-none focus:outline-none ${activeTab === 'ukrainian' ? 'bg-primary text-white shadow-md scale-[1.02]' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            <BookA size={18} />
            <span className="hidden sm:inline">{t.tabUA}</span>
            <span className="sm:hidden">{t.tabUAMobile}</span>
          </button>
          <button
            onClick={() => handleTabChange('math')}
            className={`flex-1 py-3 rounded-xl font-bold font-heading text-sm transition-all duration-200 flex items-center justify-center gap-2 outline-none focus:outline-none ${activeTab === 'math' ? 'bg-secondary text-white shadow-md scale-[1.02]' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            <Calculator size={18} /> {t.tabMath}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col">

          {!isFinished ? (
            <QuizQuestions
              activeTab={activeTab}
              currentIndex={currentIndex}
              currentQuestions={currentQuestions}
              shuffledOptions={shuffledOptions}
              selectedOptionIndex={selectedOptionIndex}
              progress={progress}
              questionLabel={t.questionLabel}
              handleOptionClick={handleOptionClick}
            />
          ) : (
            <QuizResults
              score={score}
              total={currentQuestions.length}
              scoreLabel={t.scoreLabel}
              retryLabel={t.retry}
              resultContent={resultContent}
              resetQuizState={resetQuizState}
            />
          )}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="hidden sm:flex absolute top-20 -right-8 w-14 h-14 bg-white rounded-lg border-2 border-slate-900 shadow-hard rotate-12 items-center justify-center z-20 animate-float-decor">
        <span className="font-heading font-bold text-2xl text-primary">5+3</span>
      </div>
      <div className="hidden sm:flex absolute bottom-32 -left-6 w-12 h-12 bg-white rounded-full border-2 border-slate-900 shadow-hard -rotate-6 items-center justify-center z-20 animate-float-decor" style={{ animationDelay: '1.5s' }}>
        <span className="font-hand font-bold text-xl text-secondary">АБВ</span>
      </div>
    </div>
  );
};

