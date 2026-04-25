"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Heart, Send, MoreHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FadeIn } from "@/components/shared/FadeIn";
import { InteractiveSlider } from "@/components/shared/InteractiveSlider";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { TESTIMONIALS_DATA } from "@/constants/landing";
import styles from "./Testimonials.module.css";

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
  item: typeof TESTIMONIALS_DATA[0];
  index: number;
  onClick?: () => void;
  isModal?: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ item, index, onClick, isModal = false }) => {
  return (
    <div
      className={`${isModal ? "" : "flex-none w-[300px] md:w-[300px] w-[85vw] snap-center"}`}
      onClick={onClick}
    >
      <div
        className={`relative flex flex-col justify-between text-white shadow-xl overflow-hidden border-[3px] border-white transition-transform duration-300 ${!isModal ? "w-full aspect-[9/16] max-h-[550px] rounded-3xl p-5 hover:scale-[1.02] cursor-pointer" : "h-[80vh] sm:h-[95vh] aspect-[9/16] p-3 sm:p-8 rounded-xl sm:rounded-[40px]"} ${getGradientClass(index)}`}
      >
        {/* Story Header */}
        <div className="relative z-20 flex flex-col gap-3">
          <div className="flex gap-1">
            <div className="h-0.5 bg-white flex-1 rounded-sm"></div>
            <div className="h-0.5 bg-white/30 flex-1 rounded-sm"></div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/50 bg-white/20 relative">
              <Image
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.username}`}
                alt="avatar"
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col flex-1 leading-[1.1]">
              <span className="font-bold text-sm">{item.username}</span>
              <span className="text-xs opacity-80">{item.time}</span>
            </div>
            <div className="flex gap-4 items-center">
              <MoreHorizontal size={20} color="white" />
              {!isModal ? <X size={24} color="white" /> : <div className="w-6" />}
            </div>
          </div>
        </div>

        {/* Story Content - The Real Feedback Image */}
        <div className="absolute inset-0 z-10 bg-black/20 flex items-center justify-center">
          <Image
            src={item.image}
            alt={`Feedback from ${item.username}`}
            fill
            className="object-cover"
            sizes={isModal ? "1000px" : "(max-width: 768px) 85vw, 300px"}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent via-80% to-black/40"></div>
        </div>

        {/* Story Footer */}
        <div className="relative z-20 flex items-center gap-4 mt-auto">
          <div className="flex-1 h-11 rounded-full border border-white/50 flex items-center px-5 text-sm text-white backdrop-blur-sm bg-white/10">
            Send message...
          </div>
          <Heart size={28} color="white" strokeWidth={1.5} className="filter drop-shadow-md" />
          <Send size={28} color="white" strokeWidth={1.5} className="rotate-[15deg] mb-1 filter drop-shadow-md" />
        </div>
      </div>
    </div>
  );
};

export const Testimonials = () => {
  const { t: allTranslations } = useLanguage();
  const t = allTranslations.testimonials;
  const [modalItemId, setModalItemId] = useState<number | null>(null);

  const closeModal = useCallback(() => {
    setModalItemId(null);
    // If we're at the modal state in history, go back
    if (window.history.state?.modal) {
      window.history.back();
    }
  }, []);

  const navigateItem = useCallback((direction: number) => {
    if (modalItemId === null) return;
    const currentIndex = TESTIMONIALS_DATA.findIndex(item => item.id === modalItemId);
    let nextIndex = currentIndex + direction;

    if (nextIndex >= TESTIMONIALS_DATA.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = TESTIMONIALS_DATA.length - 1;

    setModalItemId(TESTIMONIALS_DATA[nextIndex].id);
  }, [modalItemId]);

  const handleNext = useCallback(() => navigateItem(1), [navigateItem]);
  const handlePrev = useCallback(() => navigateItem(-1), [navigateItem]);

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isAnimating,
    getSwipeStyle
  } = useSwipeNavigation({
    onNext: handleNext,
    onPrev: handlePrev
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalItemId === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    if (modalItemId !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      
      // Push state for back button handling
      if (!window.history.state?.modal) {
        window.history.pushState({ modal: true }, "");
      }

      const handlePopState = (e: PopStateEvent) => {
        if (!e.state?.modal) {
          setModalItemId(null); // Direct state set to avoid history.back() loop
        }
      };

      window.addEventListener("popstate", handlePopState);
      
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("popstate", handlePopState);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalItemId, closeModal, handleNext, handlePrev]);

  const selectedItem = TESTIMONIALS_DATA.find(item => item.id === modalItemId);
  const selectedIndex = TESTIMONIALS_DATA.findIndex(item => item.id === modalItemId);

  return (
    <section className="py-20 bg-slate-50 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] bg-[length:20px_20px]" id="reviews">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-10">
          <FadeIn>
            <h2 className="text-4xl font-heading font-bold text-slate-900 mb-5">{t.title}</h2>
          </FadeIn>
        </div>

        <InteractiveSlider
          itemCount={TESTIMONIALS_DATA.length}
          maxWidth="1100px"
          containerClassName={styles.storyCardContainer}
        >
          {TESTIMONIALS_DATA.map((item, i) => (
            <StoryCard
              key={item.id}
              item={item}
              index={i}
              onClick={() => setModalItemId(item.id)}
            />
          ))}
        </InteractiveSlider>
      </div>

      {/* Modal Overlay */}
      {modalItemId !== null && selectedItem && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[9999] flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-500"
          onClick={closeModal}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button Background Tap Target */}
          <div className="absolute inset-0" onClick={closeModal}></div>

          {/* Navigation Buttons - Desktop */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="hidden sm:flex absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all z-20"
            aria-label="Previous feedback"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all z-20"
            aria-label="Next feedback"
          >
            <ChevronRight size={32} />
          </button>

          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all z-20"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          <div
            className={`relative z-10 transition-all ${isAnimating ? "opacity-0" : "opacity-100"}`}
            style={getSwipeStyle()}
            onClick={(e) => e.stopPropagation()}
          >
            <StoryCard
              item={selectedItem}
              index={selectedIndex}
              isModal={true}
            />
          </div>
        </div>
      )}
    </section>
  );
};
