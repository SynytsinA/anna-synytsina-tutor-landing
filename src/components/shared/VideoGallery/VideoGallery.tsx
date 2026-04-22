"use client";

import React, { useState } from "react";
import { FadeIn } from "@/components/shared/FadeIn";
import { useLanguage } from "@/components/shared/MainLayout";
import { LANDING_SECTIONS, VIDEO_GALLERY_METADATA } from "@/constants/landing";
import { VideoCard } from "./VideoCard";

export const VideoGallery = () => {
  const { t } = useLanguage();
  const galleryT = t.videoGallery;
  const metaList = galleryT.videos || [];
  const [playingId, setPlayingId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setPlayingId(prev => (prev === id ? null : id));
  };

  return (
    <section 
      className="py-24 bg-slate-50 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] bg-[length:20px_20px]" 
      id={LANDING_SECTIONS.videoGallery}
    >
      <div className="max-w-[1200px] mx-auto px-5">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-slate-900 mb-5">
              {galleryT.title}
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 font-medium">
              {galleryT.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-center max-w-[1100px] mx-auto">
          {VIDEO_GALLERY_METADATA.map((video, index) => (
            <FadeIn key={video.id} delay={index * 0.1}>
              <VideoCard
                video={video}
                meta={metaList[index] || { title: "Lesson", desc: "" }}
                isPlaying={playingId === video.id}
                onToggle={() => handleToggle(video.id)}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
