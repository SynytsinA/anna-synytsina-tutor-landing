import React from 'react';

interface ReviewSkeletonProps {
  isModal?: boolean;
}

export const ReviewSkeleton: React.FC<ReviewSkeletonProps> = ({ isModal = false }) => {
  return (
    <div className={`relative aspect-[9/16] rounded-3xl overflow-hidden bg-slate-200 animate-pulse ${isModal ? "h-[80vh] sm:h-[95vh] sm:rounded-[40px]" : "w-full max-h-[550px]"}`}>
        {/* Header Skeleton */}
        <div className="absolute top-5 left-5 right-5 z-20">
          <div className="flex gap-1 mb-4">
            <div className="h-0.5 bg-slate-300 flex-1 rounded-sm"></div>
            <div className="h-0.5 bg-slate-300/50 flex-1 rounded-sm"></div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-300"></div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="w-20 h-3 bg-slate-300 rounded"></div>
              <div className="w-12 h-2 bg-slate-300 rounded opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center gap-4">
          <div className="flex-1 h-11 rounded-full bg-slate-300 opacity-50"></div>
          <div className="w-7 h-7 rounded-full bg-slate-300"></div>
          <div className="w-7 h-7 rounded-full bg-slate-300"></div>
        </div>
      </div>
  );
};
