import React from "react";
import { RotateCcw } from "lucide-react";

interface QuizResultsProps {
  score: number;
  total: number;
  scoreLabel: string;
  retryLabel: string;
  resultContent: {
    title: string;
    desc: string;
    bgClass: string;
    colorClass: string;
    Icon: React.ComponentType<{ size: number; className: string }>;
  };
  resetQuizState: () => void;
}

export const QuizResults = ({
  score,
  total,
  scoreLabel,
  retryLabel,
  resultContent,
  resetQuizState,
}: QuizResultsProps) => {
  const ResultIcon = resultContent.Icon;

  return (
    <div className="flex flex-col items-center justify-center text-center animate-pop-in h-full">
      <div
        className={`w-20 h-20 ${resultContent.bgClass} rounded-full flex items-center justify-center mb-6`}
      >
        <ResultIcon size={40} className={resultContent.colorClass} />
      </div>
      <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">
        {resultContent.title}
      </h2>
      <p className="text-slate-700 mb-8 text-lg">
        {scoreLabel.replace("{score}", score.toString()).replace("{total}", total.toString())}
        <br />
        {resultContent.desc}
      </p>
      <button
        onClick={resetQuizState}
        className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-hard outline-none focus:outline-none"
      >
        <RotateCcw size={18} /> {retryLabel}
      </button>
    </div>
  );
};
