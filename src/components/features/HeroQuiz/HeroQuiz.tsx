"use client";

import React, { useEffect } from "react";
import { Brain, Calculator, BookA, Check, X, RotateCcw, PartyPopper, Star, Lightbulb } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

import { useHeroQuiz } from "@/hooks";

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
  const ResultIcon = resultContent.Icon;

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
            onClick={() => handleTabChange('ua')}
            className={`flex-1 py-3 rounded-xl font-bold font-heading text-sm transition-all duration-200 flex items-center justify-center gap-2 outline-none focus:outline-none ${activeTab === 'ua' ? 'bg-primary text-white shadow-md scale-[1.02]' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
          >
            <BookA size={18} />
            <span className="hidden sm:inline">{t.tabUA}</span>
            <span className="sm:hidden">{t.tabUAMobile}</span>
          </button>
          <button
            onClick={() => handleTabChange('math')}
            className={`flex-1 py-3 rounded-xl font-bold font-heading text-sm transition-all duration-200 flex items-center justify-center gap-2 outline-none focus:outline-none ${activeTab === 'math' ? 'bg-secondary text-white shadow-md scale-[1.02]' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
          >
            <Calculator size={18} /> {t.tabMath}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col">

          {!isFinished ? (
            <>
              <div className="flex justify-between items-center h-6 mb-2 shrink-0">
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">{t.questionLabel} {currentIndex + 1} / {currentQuestions.length}</span>
                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${activeTab === 'ua' ? 'bg-primary' : 'bg-secondary'}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="h-[120px] flex items-center justify-center mb-2 shrink-0 px-2">
                <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-slate-900 text-center leading-tight w-full">
                  {currentQuestions[currentIndex].q}
                </h3>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                {shuffledOptions.map((optionObj, idx) => {
                  let btnClass = "bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-900 hover:bg-slate-50";
                  let icon = null;

                  if (selectedOptionIndex !== null) {
                    if (optionObj.originalIndex === currentQuestions[currentIndex].correct) {
                      btnClass = "bg-green-100 border-2 border-green-500 text-green-700";
                      icon = <Check size={24} className="absolute right-4 text-green-600" />;
                    } else if (idx === selectedOptionIndex) {
                      btnClass = "bg-red-100 border-2 border-red-500 text-red-700";
                      icon = <X size={24} className="absolute right-4 text-red-500" />;
                    } else {
                      btnClass = "border-2 border-transparent opacity-0 pointer-events-none";
                    }
                  } else {
                    btnClass = "bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-900 hover:bg-slate-50 shadow-sm";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx, optionObj.originalIndex)}
                      disabled={selectedOptionIndex !== null}
                      className={`w-full min-h-[64px] px-6 rounded-xl font-bold text-base sm:text-lg transition-colors duration-200 relative flex items-center justify-center outline-none focus:outline-none ${btnClass}`}
                    >
                      <span className="text-center w-full">{optionObj.text}</span>
                      {icon}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center animate-pop-in h-full">
              <div className={`w-20 h-20 ${resultContent.bgClass} rounded-full flex items-center justify-center mb-6`}>
                <ResultIcon size={40} className={resultContent.colorClass} />
              </div>
              <h3 className="text-3xl font-heading font-bold text-slate-900 mb-2">{resultContent.title}</h3>
              <p className="text-slate-600 mb-8 text-lg">
                {t.scoreLabel.replace('{score}', score.toString()).replace('{total}', currentQuestions.length.toString())}
                <br />{resultContent.desc}
              </p>
              <button
                onClick={resetQuizState}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-hard outline-none focus:outline-none"
              >
                <RotateCcw size={18} /> {t.retry}
              </button>
            </div>
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
