"use client";

import React, { useState, useEffect } from "react";
import { FadeIn } from "@/components/shared/FadeIn/FadeIn";
import { InteractiveSlider } from "@/components/shared/InteractiveSlider";
import { useLanguage } from "@/context/LanguageContext";
import { LANDING_SECTIONS, VIDEO_GALLERY_METADATA } from "@/constants/landing";
import { VideoCard } from "./VideoCard";

export const VideoGallery = () => {
  const { t } = useLanguage();
  const galleryT = t.videoGallery;

  const [playingId, setPlayingId] = useState<number | null>(null);
  const [modalVideoId, setModalVideoId] = useState<number | null>(null);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  // Lock scroll and handle ESC when modal is open
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    if (modalVideoId) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [modalVideoId]);

  const handleToggle = (id: number) => {
    setPlayingId(prev => (prev === id ? null : id));
  };

  const handleFullscreen = (id: number) => {
    setModalVideoId(id);
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

  const closeModal = () => {
    setModalVideoId(null);
    setPlayingId(null);
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
            <p className="max-w-2xl mx-auto text-lg text-slate-600 font-medium">
              {galleryT.subtitle}
            </p>
          </FadeIn>
        </div>

        <InteractiveSlider itemCount={VIDEO_GALLERY_METADATA.length} maxWidth="1100px">
          {VIDEO_GALLERY_METADATA.map((video) => (
            <div key={video.id} className="flex-none w-[280px] md:w-[300px] snap-center">
              <VideoCard
                video={video}
                isPlaying={modalVideoId === null && playingId === video.id}
                isLiked={likedIds.has(video.id)}
                onToggle={() => handleToggle(video.id)}
                onFullscreen={() => handleFullscreen(video.id)}
                onLike={() => handleLike(video.id)}
              />
            </div>
          ))}
        </InteractiveSlider>
      </div>

      {/* Modal Overlay */}
      {modalVideoId && modalVideo && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div className="animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
            <VideoCard
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
