"use client";

import React, { useRef, useState, useEffect } from "react";
import { Heart, Send, MoreHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/shared/MainLayout";
import { FadeIn } from "@/components/shared/FadeIn";
import { TESTIMONIALS_CONFIG } from "@/constants/landing";
import styles from "./Testimonials.module.css";

const getUsername = (authorString: string) => {
  // Strip non-ASCII characters to prevent ByteString conversion errors in URLs/SSR
  const name = authorString.split(',')[0].trim().toLowerCase().replace(/\s/g, '_').replace(/[^\x00-\x7F]/g, '');
  return (name || 'user') + "_official";
};

const getGradientClass = (index: number) => {
  const classes = [
    styles.insta,
    styles.indigoPink,
    styles.cyanBlue,
    styles.amberRed,
    styles.violetFuchsia,
  ];
  return classes[index % classes.length];
};

interface StoryCardProps {
  review: { text: string; author: string };
  index: number;
}

const StoryCard: React.FC<StoryCardProps> = ({ review, index }) => {
  const username = getUsername(review.author);
  
  return (
    <div className="flex-none w-[300px] md:w-[300px] w-[85vw] snap-center">
       <div 
         className={`w-full aspect-[9/16] max-h-[550px] rounded-3xl relative flex flex-col justify-between p-5 text-white shadow-xl overflow-hidden border-[3px] border-white ${getGradientClass(index)}`}
       >
          {/* Story Header */}
          <div className="flex flex-col gap-3">
             <div className="flex gap-1">
                <div className="h-0.5 bg-white flex-1 rounded-sm"></div>
                <div className="h-0.5 bg-white/30 flex-1 rounded-sm"></div>
             </div>
             
             <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/50 bg-white/20">
                   <img 
                     src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} 
                     alt="avatar" 
                     className="w-full h-full"
                   />
                </div>
                <div className="flex flex-col flex-1 leading-[1.1]">
                   <span className="font-bold text-sm">{username}</span>
                   <span className="text-xs opacity-80">{index + 2}h</span>
                </div>
                <div className="flex gap-4 items-center">
                   <MoreHorizontal size={20} color="white" />
                   <X size={24} color="white" />
                </div>
          </div>
          </div>

          {/* Story Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center gap-5 relative">
             <div className="bg-white text-black px-5 py-4 rounded-[16px_16px_16px_4px] font-semibold text-lg shadow-lg -rotate-2 max-w-[90%]">
                "{review.text}"
             </div>
             <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold">
                {review.author}
             </div>
             
             <div className="absolute bottom-5 right-0 text-5xl rotate-[15deg]">
                {index % 2 === 0 ? "😍" : "🔥"}
             </div>
          </div>

          {/* Story Footer */}
          <div className="flex items-center gap-4 mt-5">
             <div className="flex-1 h-11 rounded-full border border-white/50 flex items-center px-5 text-sm text-white">
                Send message...
             </div>
             <Heart size={28} color="white" strokeWidth={1.5} />
             <Send size={28} color="white" strokeWidth={1.5} className="rotate-[15deg] mb-1" />
          </div>
       </div>
    </div>
  );
};

export const Testimonials = () => {
  const { t: allTranslations } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const t = allTranslations.testimonials;
  const reviews = t.reviews || [];

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);

      const index = Math.round(scrollLeft / TESTIMONIALS_CONFIG.itemWidth);
      if (index !== activeIndex && index >= 0 && index < reviews.length) {
        setActiveIndex(index);
      }
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [activeIndex, reviews.length]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = TESTIMONIALS_CONFIG.scrollAmount;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollToDots = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const itemWidth = TESTIMONIALS_CONFIG.itemWidth;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const targetScroll = Math.min(itemWidth * index, maxScroll);
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-20 bg-slate-50 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] bg-[length:20px_20px]" id="reviews">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-10">
           <FadeIn>
             <h2 className="text-4xl font-heading font-bold text-slate-900 mb-5">{t.title}</h2>
           </FadeIn>
        </div>
        
        <FadeIn delay={0.2} className="relative flex items-center justify-center max-w-[1000px] mx-auto md:px-16 px-0">
          
          <button 
            className="hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-orange-500 shadow-hard-orange items-center justify-center cursor-pointer z-20 text-orange-500 transition-all duration-200 hover:scale-110 hover:-rotate-3 hover:shadow-[6px_6px_0px_#ea580c] hover:border-orange-600 hover:text-orange-600 active:scale-95 active:shadow-none disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed outline-none focus:outline-none"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous review"
          >
             <ChevronLeft size={28} />
          </button>

          <div 
            className={`flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-10 px-5 w-full scrollbar-hide ${styles.storyCardContainer}`} 
            ref={scrollRef}
            onScroll={checkScrollPosition}
          >
             {reviews.map((review: { text: string; author: string }, i: number) => (
                <StoryCard key={i} review={review} index={i} />
             ))}
          </div>

          <button 
            className="hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-orange-500 shadow-hard-orange items-center justify-center cursor-pointer z-20 text-orange-500 transition-all duration-200 hover:scale-110 hover:rotate-3 hover:shadow-[6px_6px_0px_#ea580c] hover:border-orange-600 hover:text-orange-600 active:scale-95 active:shadow-none disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed outline-none focus:outline-none" 
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Next review"
          >
             <ChevronRight size={28} />
          </button>
        </FadeIn>

        <div className="flex justify-center gap-3 mt-8">
          {reviews.map((_: any, i: number) => (
            <button 
              key={i} 
              className={`w-3.5 h-3.5 rounded-full border-2 border-slate-900 cursor-pointer p-0 transition-all duration-300 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 focus:outline-none ${i === activeIndex ? 'bg-primary scale-125 shadow-hard' : 'bg-white'}`}
              onClick={() => scrollToDots(i)}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
