"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Volume2, VolumeX, Heart, Maximize, Minimize, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLanguage } from "@/context/LanguageContext";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface VideoCardProps {
  video: {
    src: string;
    poster?: string;
  };
  isPlaying: boolean;
  isLiked?: boolean;
  onToggle: () => void;
  onFullscreen?: () => void;
  onLike?: () => void;
  onClose?: () => void;
  onDoubleClick?: () => void;
  isModal?: boolean;
}

export const VideoCard = ({ 
  video, 
  isPlaying, 
  isLiked = false,
  onToggle, 
  onFullscreen,
  onLike,
  onClose,
  onDoubleClick,
  isModal = false 
}: VideoCardProps) => {
  const { t } = useLanguage();
  const labels = t.videoGallery.labels;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const getLabel = () => {
    const src = video.src.toLowerCase();
    if (src.includes("math")) return labels.math;
    if (src.includes("ukrainian-language")) return labels.ukrainian;
    if (src.includes("preparing-for-school")) return labels.schoolPrep;
    if (src.includes("grinch") || src.includes("hogwarts")) return labels.thematic;
    return labels.lesson;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.();
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFullscreen?.();
  };

  return (
    <div
      data-testid="video-card"
      className={cn(
        "relative bg-black rounded-[36px] p-2 shadow-2xl border border-slate-200 cursor-pointer transition-all duration-300 aspect-[9/17] mx-auto group will-change-transform transform-gpu",
        isModal 
          ? "w-[min(95vw,600px)] h-auto max-h-[75vh] sm:max-h-[95vh] shadow-[0_0_100px_rgba(0,0,0,0.5)] border-white/20" 
          : "w-full max-w-[320px] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)]"
      )}
      onClick={onToggle}
      onDoubleClick={onDoubleClick}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-6 bg-black rounded-b-xl z-10"></div>

      {/* Close button for modal */}
      {isModal && (
        <button 
          onClick={(e) => { e.stopPropagation(); onClose?.(); }}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-xl border border-slate-200 z-[20] hover:scale-110 transition-transform pointer-events-auto"
        >
          <X size={24} />
        </button>
      )}

      <div className="relative w-full h-full bg-[#1e1e1e] rounded-3xl overflow-hidden isolate transform-gpu">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          playsInline
          onEnded={onToggle}
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
          <div className={cn("pt-4 flex justify-between transition-opacity duration-300", isPlaying ? "opacity-0" : "opacity-100")}>
            <div className="text-white text-[10px] font-bold flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 uppercase tracking-widest">
              <span>{getLabel()}</span>
            </div>
          </div>

          <div className="absolute right-4 bottom-[100px] pointer-events-auto">
            <div className="flex flex-col gap-5 items-center text-white">
              <button
                className="bg-transparent border-none text-white p-0 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX size={26} className="filter drop-shadow-md" /> : <Volume2 size={26} className="filter drop-shadow-md" />}
              </button>
              <Heart 
                size={26} 
                onClick={toggleLike}
                className={cn(
                  "filter drop-shadow-md transition-all cursor-pointer",
                  isLiked ? "fill-rose-500 text-rose-500 scale-125" : "text-white hover:text-rose-300"
                )} 
              />
              <button
                className="bg-transparent border-none text-white p-0 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                onClick={handleFullscreen}
              >
                {isModal ? (
                  <Minimize size={26} className="filter drop-shadow-md" />
                ) : (
                  <Maximize size={26} className="filter drop-shadow-md" />
                )}
              </button>
            </div>
          </div>

          {/* Progress Bar (Modal Only) */}
          {isModal && (
            <div className="absolute bottom-6 left-5 right-14 pointer-events-auto flex items-center gap-3">
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                onClick={(e) => e.stopPropagation()}
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white transition-all hover:h-1.5"
              />
              <span className="text-white text-[10px] font-mono whitespace-nowrap min-w-[60px]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
