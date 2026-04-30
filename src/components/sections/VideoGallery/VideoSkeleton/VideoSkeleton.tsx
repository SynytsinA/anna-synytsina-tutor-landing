import React from "react";
import { cn } from "@/utils/cn";

interface VideoSkeletonProps {
  isModal?: boolean;
}

export const VideoSkeleton = ({ isModal = false }: VideoSkeletonProps) => {
  return (
    <div
      className={cn(
        "relative bg-transparent rounded-[36px] p-2 transition-all duration-300 w-full h-full animate-pulse"
      )}
    >
      {/* Notch Placeholder */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-6 bg-slate-300 rounded-b-xl z-10"></div>

      <div className="relative w-full h-full bg-slate-300 rounded-3xl overflow-hidden">
        {/* Play Button Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[60px] h-[60px] bg-slate-400/30 rounded-full"></div>
        </div>

        {/* Top Label Placeholder */}
        <div className="absolute top-8 left-5">
           <div className="w-24 h-5 bg-slate-400/30 rounded-full"></div>
        </div>

        {/* Side Icons Placeholder */}
        <div className="absolute right-4 bottom-[100px] flex flex-col gap-5 items-center">
           <div className="w-7 h-7 bg-slate-400/30 rounded-full"></div>
           <div className="w-7 h-7 bg-slate-400/30 rounded-full"></div>
           <div className="w-7 h-7 bg-slate-400/30 rounded-full"></div>
        </div>

        {/* Progress Bar Placeholder (Modal Only) */}
        {isModal && (
          <div className="absolute bottom-6 left-5 right-5 h-1 bg-slate-400/30 rounded-lg"></div>
        )}
      </div>
    </div>
  );
};
