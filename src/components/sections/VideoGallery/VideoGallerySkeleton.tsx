import React from "react";

export const VideoGallerySkeleton = () => {
  return (
    <section className="py-20 bg-slate-50 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] bg-[length:20px_20px]">
      <div className="max-w-[1200px] mx-auto px-5 animate-pulse">
        <div className="text-center mb-10">
          <div className="h-10 bg-slate-200 rounded w-64 mx-auto mb-5" />
          <div className="h-6 bg-slate-200 rounded max-w-2xl mx-auto mb-2" />
          <div className="h-6 bg-slate-200 rounded max-w-md mx-auto" />
        </div>
        <div className="flex gap-6 overflow-hidden justify-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-[280px] md:w-[300px] h-[480px] bg-white rounded-3xl border-2 border-slate-200 p-4 flex flex-col justify-between shrink-0">
              <div className="w-full h-[320px] bg-slate-100 rounded-2xl" />
              <div className="space-y-3">
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
