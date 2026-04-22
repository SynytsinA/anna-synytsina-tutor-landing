"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Volume2, VolumeX, Heart, MessageCircle } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface VideoCardProps {
  video: {
    src: string;
    poster?: string;
  };
  meta: {
    title: string;
    desc: string;
  };
  isPlaying: boolean;
  onToggle: () => void;
}

export const VideoCard = ({ video, meta, isPlaying, onToggle }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.play().catch((error) => {
        console.error("Video play failed:", error);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="relative bg-black rounded-[36px] p-3 shadow-2xl border border-slate-200 cursor-pointer transition-transform duration-300 aspect-[9/17] max-w-[320px] mx-auto hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)] group will-change-transform transform-gpu"
      onClick={onToggle}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-6 bg-black rounded-b-xl z-10"></div>

      <div className="relative w-full h-full bg-[#1e1e1e] rounded-3xl overflow-hidden isolate transform-gpu">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          playsInline
          loop
          muted={isMuted}
          preload="metadata"
          className="w-full h-full object-cover rounded-3xl"
        />

        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/20 z-[5] transition-opacity duration-200",
            isPlaying ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="w-[60px] h-[60px] bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 transition-transform duration-200 group-hover:scale-110 group-hover:bg-white/30 text-white">
            <Play size={24} fill="currentColor" className="ml-1" />
          </div>
        </div>

        {/* Video UI Overlay */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-5 bg-gradient-to-b from-black/40 via-transparent via-80% to-black/80 z-[6]">
          <div className="pt-4 flex justify-between">
            <div className="text-white text-[10px] font-bold flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 uppercase tracking-widest">
              <span>Lessons</span>
            </div>
          </div>

          <div className="absolute right-4 bottom-[100px] pointer-events-auto">
            <div className="flex flex-col gap-5 items-center text-white">
              <button
                className="bg-black/50 border-none text-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-sm hover:bg-black/70 transition-colors"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <Heart size={26} className="filter drop-shadow-md hover:fill-rose-500 transition-colors" />
              <MessageCircle size={26} className="filter drop-shadow-md" />
            </div>
          </div>

          <div className="text-white mb-5">
            <strong className="block text-[1rem] font-bold mb-1 drop-shadow-lg">
              {meta.title}
            </strong>
            <p className="text-[0.85rem] font-medium opacity-90 m-0 leading-tight drop-shadow-md">
              {meta.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
