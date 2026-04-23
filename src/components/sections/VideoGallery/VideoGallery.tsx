"use client";

import React, { useState } from "react";
import { FadeIn } from "@/components/shared/FadeIn/FadeIn";
import { InteractiveSlider } from "@/components/shared/InteractiveSlider";
import { useLanguage } from "@/context/LanguageContext";
import { LANDING_SECTIONS, VIDEO_GALLERY_METADATA } from "@/constants/landing";
import { VideoCard } from "./VideoCard";

// Using 320 to match Testimonials structure
const ITEM_WIDTH = 320;

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
        </InteractiveSlider>
      </div>
    </section>
  );
};
