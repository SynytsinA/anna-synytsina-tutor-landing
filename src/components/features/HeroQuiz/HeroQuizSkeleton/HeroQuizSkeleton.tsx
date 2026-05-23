import { Brain } from "lucide-react";
import React from "react";

export const HeroQuizSkeleton = () => {
  return (
    <div className="relative w-full md:max-w-[480px] lg:max-w-[500px] mx-auto pt-5">
      {/* Background Decor */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-200/50 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-200/50 rounded-full blur-xl animate-pulse delay-700"></div>

      {/* Header Badge Skeleton */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white px-3 sm:px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-sm z-30 flex items-center gap-2 w-[90%] sm:w-auto justify-center">
        <Brain size={18} className="text-primary/30 shrink-0 animate-pulse" />
        <div className="h-3 bg-slate-200 rounded w-24 animate-pulse" />
      </div>

      {/* Main Card Skeleton */}
      <div className="bg-white rounded-[2rem] border-[3px] border-slate-900 shadow-hard-xl overflow-hidden relative z-10 flex flex-col h-[580px]">
        {/* Tabs Skeleton */}
        <div className="p-2 bg-slate-100/50 flex gap-2 pt-8 sm:pt-10 border-b-2 border-slate-100 shrink-0 animate-pulse">
          <div className="flex-1 h-12 bg-slate-200 rounded-xl" />
          <div className="flex-1 h-12 bg-slate-200 rounded-xl" />
        </div>

        {/* Content Area Skeleton */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between animate-pulse">
          {/* Question Progress & Title */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="h-4 bg-slate-200 rounded w-16" />
              <div className="h-4 bg-slate-200 rounded w-12" />
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-3 mb-8">
              <div className="bg-slate-200 h-3 rounded-full w-1/3" />
            </div>
            {/* Question Text */}
            <div className="space-y-3 mb-8">
              <div className="h-6 bg-slate-200 rounded w-5/6" />
              <div className="h-6 bg-slate-200 rounded w-2/3" />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-2">
            <div className="h-14 bg-slate-100 rounded-2xl border-2 border-slate-200" />
            <div className="h-14 bg-slate-100 rounded-2xl border-2 border-slate-200" />
            <div className="h-14 bg-slate-100 rounded-2xl border-2 border-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};
