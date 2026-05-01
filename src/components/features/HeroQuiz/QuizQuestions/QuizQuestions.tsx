import React from "react";
import { Check, X } from "lucide-react";

interface QuizQuestionsProps {
  activeTab: string;
  currentIndex: number;
  currentQuestions: Array<{ q: string; correct: number }>;
  shuffledOptions: Array<{ text: string; originalIndex: number }>;
  selectedOptionIndex: number | null;
  progress: number;
  questionLabel: string;
  handleOptionClick: (visualIdx: number, originalIdx: number) => void;
}

export const QuizQuestions = ({
  activeTab,
  currentIndex,
  currentQuestions,
  shuffledOptions,
  selectedOptionIndex,
  progress,
  questionLabel,
  handleOptionClick,
}: QuizQuestionsProps) => {
  return (
    <>
      <div className="flex justify-between items-center h-6 mb-2 shrink-0">
        <span className="text-xs font-bold text-slate-600 tracking-wider uppercase">
          {questionLabel} {currentIndex + 1} / {currentQuestions.length}
        </span>
        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              activeTab === "ukrainian" ? "bg-primary" : "bg-secondary"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="h-[120px] flex items-center justify-center mb-2 shrink-0 px-2">
        <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-slate-900 text-center leading-tight w-full">
          {currentQuestions[currentIndex].q}
        </h2>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {shuffledOptions.map((optionObj, idx) => {
          let btnClass =
            "bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-900 hover:bg-slate-50";
          let icon = null;

          if (selectedOptionIndex !== null) {
            if (
              optionObj.originalIndex ===
              currentQuestions[currentIndex].correct
            ) {
              btnClass = "bg-green-100 border-2 border-green-500 text-green-700";
              icon = <Check size={24} className="absolute right-4 text-green-600" />;
            } else if (idx === selectedOptionIndex) {
              btnClass = "bg-red-100 border-2 border-red-500 text-red-700";
              icon = <X size={24} className="absolute right-4 text-red-500" />;
            } else {
              btnClass = "border-2 border-transparent opacity-0 pointer-events-none";
            }
          } else {
            btnClass =
              "bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-900 hover:bg-slate-50 shadow-sm";
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
  );
};
