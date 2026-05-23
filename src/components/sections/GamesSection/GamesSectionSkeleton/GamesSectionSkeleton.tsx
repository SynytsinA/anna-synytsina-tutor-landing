import React from "react";

export const GamesSectionSkeleton = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#1e1b4b] to-[#312e81] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 relative z-10 animate-pulse">
        <div className="text-center mb-12">
          <div className="h-12 bg-white/10 rounded w-80 mx-auto mb-6" />
          <div className="h-6 bg-white/10 rounded max-w-2xl mx-auto" />
        </div>
        <div className="max-w-[1000px] mx-auto">
          {/* Switcher */}
          <div className="flex justify-center mb-10">
            <div className="h-14 bg-white/10 rounded-full w-72" />
          </div>
          {/* Canvas */}
          <div className="min-h-[600px] bg-white/5 border border-white/10 rounded-[32px] flex flex-col items-center justify-center p-8">
            <div className="w-32 h-32 rounded-full bg-white/10 mb-10" />
            <div className="h-16 bg-white/20 rounded-full w-64" />
          </div>
        </div>
      </div>
    </section>
  );
};
