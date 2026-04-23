"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn/FadeIn";
import { useLanguage } from "@/components/shared/MainLayout";
import { LANDING_SECTIONS, VIDEO_GALLERY_METADATA } from "@/constants/landing";
import { VideoCard } from "./VideoCard";

// Using 320 to match Testimonials structure
const ITEM_WIDTH = 320;

export const VideoGallery = () => {
  const { t } = useLanguage();
  const galleryT = t.videoGallery;
  const metaList = galleryT.videos || [];
  
  const [playingId, setPlayingId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleToggle = (id: number) => {
    setPlayingId(prev => (prev === id ? null : id));
  };

  const checkScrollPosition = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);

      const index = Math.round(scrollLeft / ITEM_WIDTH);
      if (index !== activeIndex && index >= 0 && index < VIDEO_GALLERY_METADATA.length) {
        setActiveIndex(index);
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [checkScrollPosition]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -ITEM_WIDTH : ITEM_WIDTH,
        behavior: 'smooth'
      });
    }
  };

  const scrollToDots = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const targetScroll = Math.min(ITEM_WIDTH * index, maxScroll);
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  return (
    <section 
      className="py-20 bg-slate-50 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] bg-[length:20px_20px]" 
      id={LANDING_SECTIONS.videoGallery}
    >
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-10">
           <FadeIn>
             <h2 className="text-4xl font-heading font-bold text-slate-900 mb-5">
               {galleryT.title}
             </h2>
             <p className="max-w-2xl mx-auto text-lg text-slate-600 font-medium">
               {galleryT.subtitle}
             </p>
           </FadeIn>
        </div>

        <FadeIn delay={0.2} className="relative flex items-center justify-center max-w-[1100px] mx-auto md:px-16 px-0">
          
          <button 
            className="hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-orange-500 shadow-hard-orange items-center justify-center cursor-pointer z-20 text-orange-500 transition-all duration-200 hover:scale-110 hover:-rotate-3 hover:shadow-[6px_6px_0px_#ea580c] hover:border-orange-600 hover:text-orange-600 active:scale-95 active:shadow-none disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed outline-none focus:outline-none"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous videos"
          >
             <ChevronLeft size={28} />
          </button>

          <div 
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-10 px-5 w-full scrollbar-hide"
            ref={scrollRef}
            onScroll={checkScrollPosition}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
             {VIDEO_GALLERY_METADATA.map((video, index) => (
                <div key={video.id} className="flex-none w-[280px] md:w-[300px] snap-center">
                  <VideoCard
                    video={video}
                    meta={metaList[index] || { title: "Lesson", desc: "" }}
                    isPlaying={playingId === video.id}
                    onToggle={() => handleToggle(video.id)}
                  />
                </div>
             ))}
          </div>

          <button 
            className="hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-orange-500 shadow-hard-orange items-center justify-center cursor-pointer z-20 text-orange-500 transition-all duration-200 hover:scale-110 hover:rotate-3 hover:shadow-[6px_6px_0px_#ea580c] hover:border-orange-600 hover:text-orange-600 active:scale-95 active:shadow-none disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed outline-none focus:outline-none" 
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Next videos"
          >
             <ChevronRight size={28} />
          </button>
        </FadeIn>

        <div className="flex justify-center gap-3 mt-8">
          {VIDEO_GALLERY_METADATA.map((_, i) => (
            <button 
              key={i} 
              className={`w-3.5 h-3.5 rounded-full border-2 border-slate-900 cursor-pointer p-0 transition-all duration-300 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 focus:outline-none ${i === activeIndex ? 'bg-primary scale-125 shadow-hard' : 'bg-white'}`}
              onClick={() => scrollToDots(i)}
              aria-label={`Go to video ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
