"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn/FadeIn";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/utils/cn";

interface InteractiveSliderProps {
  children: React.ReactNode;
  itemCount: number;
  itemWidth?: number;
  maxWidth?: string;
  className?: string;
  containerClassName?: string;
}

export const InteractiveSlider: React.FC<InteractiveSliderProps> = ({
  children,
  itemCount,
  itemWidth = 320,
  maxWidth = "1100px",
  className = "",
  containerClassName = "",
}) => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const checkScrollPosition = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);

      // Approximate items per page based on client width (adding ~20px for gap)
      const perPage = Math.max(1, Math.round(clientWidth / (itemWidth + 20)));
      if (perPage !== itemsPerPage) setItemsPerPage(perPage);

      const totalPages = Math.ceil(itemCount / perPage);

      // Determine current page
      let currPage = Math.round(scrollLeft / clientWidth);

      // Snap to last dot if we've reached the end
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        currPage = totalPages - 1;
      }

      // Bound the current page
      currPage = Math.max(0, Math.min(currPage, totalPages - 1));

      setActivePage(currPage);
    }
  }, [itemWidth, itemCount, itemsPerPage]);

  useEffect(() => {
    // Initial calculation
    checkScrollPosition();
    // Re-check after a brief timeout to ensure DOM is fully rendered (especially on mount)
    const timeout = setTimeout(checkScrollPosition, 100);
    window.addEventListener("resize", checkScrollPosition);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const clientWidth = scrollRef.current.clientWidth;
      // Scroll by the container width to show the next group
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToDots = (pageIndex: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const { clientWidth, scrollWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      const targetScroll = Math.min(pageIndex * clientWidth, maxScroll);
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
      setActivePage(pageIndex);
    }
  };

  const getDotStyle = (index: number) => {
    const distance = Math.abs(index - activePage);
    if (distance === 0) return { scale: 1.25, opacity: 1 };
    if (distance === 1) return { scale: 1, opacity: 1 };
    if (distance === 2) return { scale: 0.7, opacity: 1 };
    if (distance === 3) return { scale: 0.4, opacity: 1 };
    return { scale: 0, opacity: 0 };
  };

  const totalPages = Math.ceil(itemCount / itemsPerPage);

  return (
    <div className={`w-full ${className}`}>
      <FadeIn
        delay={0.2}
        className={`relative flex items-center justify-center mx-auto md:px-16 px-0`}
        style={{ maxWidth }}
      >
        <button
          className="hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-orange-500 shadow-hard-orange items-center justify-center cursor-pointer z-20 text-orange-500 transition-all duration-200 hover:scale-110 hover:-rotate-3 hover:shadow-[6px_6px_0px_#ea580c] hover:border-orange-600 hover:text-orange-600 active:scale-95 active:shadow-none disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed outline-none focus:outline-none"
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          aria-label={t.a11y.previous}
        >
          <ChevronLeft size={28} />
        </button>

        <div
          className={`flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pt-10 pb-2 w-full scrollbar-hide ${containerClassName}`}
          ref={scrollRef}
          onScroll={checkScrollPosition}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingLeft: isMobile ? `calc(50% - ${itemWidth / 2}px)` : "1.25rem",
            paddingRight: isMobile ? `calc(50% - ${itemWidth / 2}px)` : "1.25rem"
          }}
        >
          {children}
        </div>

        <button
          className="hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-orange-500 shadow-hard-orange items-center justify-center cursor-pointer z-20 text-orange-500 transition-all duration-200 hover:scale-110 hover:rotate-3 hover:shadow-[6px_6px_0px_#ea580c] hover:border-orange-600 hover:text-orange-600 active:scale-95 active:shadow-none disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed outline-none focus:outline-none"
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          aria-label={t.a11y.next}
        >
          <ChevronRight size={28} />
        </button>
      </FadeIn>

      <div className="mt-6 pb-4 flex justify-center relative z-10">
        <div className="relative overflow-hidden py-4" style={{ width: "200px" }}>
          <div
            className="flex items-center gap-3 transition-transform duration-300 ease-out w-max"
            style={{
              transform: `translateX(calc(100px - ${(activePage * 26) + 7}px))`
            }}
          >
            {Array.from({ length: totalPages }).map((_, i) => {
              const { scale, opacity } = getDotStyle(i);
              return (
                <button
                  key={i}
                  className={cn(
                    "w-3.5 h-3.5 rounded-full border-2 border-slate-900 cursor-pointer p-0 flex-shrink-0 transition-all duration-300 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] focus:outline-none",
                    i === activePage ? "bg-primary shadow-hard" : "bg-white"
                  )}
                  style={{ transform: `scale(${scale})`, opacity }}
                  onClick={() => scrollToDots(i)}
                  aria-label={t.a11y.goToPage.replace("{page}", (i + 1).toString())}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
