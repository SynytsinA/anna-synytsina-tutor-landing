"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FadeIn } from "@/components/shared/FadeIn";
import { InteractiveSlider } from "@/components/shared/InteractiveSlider";
import { useSwipeNavigation } from "@/hooks";
import { TESTIMONIALS_DATA } from "@/constants/landing";
import { StoryCard } from "./StoryCard";
import styles from "./Testimonials.module.css";


export const Testimonials = () => {
  const { t: allTranslations } = useLanguage();
  const t = allTranslations.testimonials;
  const [modalItemId, setModalItemId] = useState<number | null>(null);

  const closeModal = useCallback(() => {
    if (modalItemId === null) return;
    setModalItemId(null);
    // If we're at the modal state in history, go back
    if (window.history.state?.modal) {
      window.history.back();
    }
  }, [modalItemId]);

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
            aria-label={allTranslations.a11y.previousFeedback}
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all z-20"
            aria-label={allTranslations.a11y.nextFeedback}
          >
            <ChevronRight size={32} />
          </button>

          {/* Close Button */}
          <button
            onClick={(e) => { e.stopPropagation(); closeModal(); }}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all z-20"
            aria-label={allTranslations.a11y.close}
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
