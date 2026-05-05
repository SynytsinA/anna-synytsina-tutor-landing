"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

import { FadeIn } from "@/components/shared/FadeIn/FadeIn";
import { InteractiveSlider } from "@/components/shared/InteractiveSlider";
import { LANDING_SECTIONS, VIDEO_GALLERY_METADATA } from "@/constants/landing";
import { useLanguage } from "@/context/LanguageContext";
import { useSwipeNavigation } from "@/hooks";

import { VideoCard } from "./VideoCard";

export const VideoGallery = () => {
  const { t } = useLanguage();
  const galleryT = t.videoGallery;

  const [playingId, setPlayingId] = useState<number | null>(null);
  const [modalVideoId, setModalVideoId] = useState<number | null>(null);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  const closeModal = React.useCallback(() => {
    if (modalVideoId === null) return;
    setModalVideoId(null);
    setPlayingId(null);
    // If we're at the modal state in history, go back
    if (window.history.state?.modalVideo) {
      window.history.back();
    }
  }, [modalVideoId]);

  const navigateVideo = React.useCallback((direction: number) => {
    if (modalVideoId === null) return;
    const currentIndex = VIDEO_GALLERY_METADATA.findIndex(v => v.id === modalVideoId);
    let nextIndex = currentIndex + direction;

    if (nextIndex >= VIDEO_GALLERY_METADATA.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = VIDEO_GALLERY_METADATA.length - 1;

    const nextId = VIDEO_GALLERY_METADATA[nextIndex].id;
    setModalVideoId(nextId);
    setPlayingId(null); // Ensure video is paused when navigating
  }, [modalVideoId]);

  const handleNext = React.useCallback(() => navigateVideo(1), [navigateVideo]);
  const handlePrev = React.useCallback(() => navigateVideo(-1), [navigateVideo]);

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

  // Lock scroll and handle ESC and arrows when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (modalVideoId !== null) {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
    };

    if (modalVideoId !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      // Push state for back button handling
      if (!window.history.state?.modalVideo) {
        window.history.pushState({ modalVideo: true }, "");
      }

      const handlePopState = (e: PopStateEvent) => {
        if (!e.state?.modalVideo) {
          setModalVideoId(null);
          setPlayingId(null);
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
  }, [modalVideoId, handleNext, handlePrev, closeModal]);

  const handleToggle = (id: number) => {
    setPlayingId(prev => (prev === id ? null : id));
  };

  const handleFullscreen = (id: number) => {
    setModalVideoId(id);
    setPlayingId(null); // Ensure video is paused when entering modal
  };

  const handleLike = (id: number) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const modalVideo = VIDEO_GALLERY_METADATA.find(v => v.id === modalVideoId);

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
            <p className="max-w-2xl mx-auto text-lg text-slate-700 font-medium">
              {galleryT.subtitle}
            </p>
          </FadeIn>
        </div>

        <InteractiveSlider itemCount={VIDEO_GALLERY_METADATA.length} maxWidth="1100px" itemWidth={280}>
          {VIDEO_GALLERY_METADATA.map((video) => (
            <div key={video.id} className="flex-none w-[280px] md:w-[300px] snap-center">
              <VideoCard
                video={video}
                isPlaying={modalVideoId === null && playingId === video.id}
                isLiked={likedIds.has(video.id)}
                onToggle={() => handleToggle(video.id)}
                onFullscreen={() => handleFullscreen(video.id)}
                onDoubleClick={() => handleFullscreen(video.id)}
                onLike={() => handleLike(video.id)}
              />
            </div>
          ))}
        </InteractiveSlider>
      </div>

      {/* Modal Overlay */}
      {modalVideoId !== null && modalVideo && (
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
            aria-label={t.a11y.previousVideo}
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all z-20"
            aria-label={t.a11y.nextVideo}
          >
            <ChevronRight size={32} />
          </button>

          <div
            className={`relative z-10 transition-all ${isAnimating ? "opacity-0" : "opacity-100"}`}
            style={getSwipeStyle()}
            onClick={(e) => e.stopPropagation()}
          >
            <VideoCard
              key={modalVideoId}
              video={modalVideo}
              isPlaying={playingId === modalVideoId}
              isLiked={likedIds.has(modalVideoId)}
              onToggle={() => handleToggle(modalVideoId)}
              onClose={closeModal}
              onFullscreen={closeModal}
              onLike={() => handleLike(modalVideoId)}
              isModal={true}
            />
          </div>
        </div>
      )}
    </section>
  );
};
