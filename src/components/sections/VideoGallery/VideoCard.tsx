"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Volume2, VolumeX, Heart, Maximize, Minimize, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/utils/cn";
import { VideoMetadata } from "@/types/landing";
import { VideoSkeleton } from "./VideoSkeleton";

interface VideoCardProps {
  video: VideoMetadata;
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
  const [isLoading, setIsLoading] = useState(true);

  const getLabel = () => {
    const src = video.src.toLowerCase();
    if (src.includes("navchannya-v-ihrovii-formi")) return labels.thematic;
    if (src.includes("urok-matematyky")) return labels.math;
    if (src.includes("urok-ukrainskoi-movy")) return labels.ukrainian;
    if (src.includes("pidhotovka-do-shkoly")) return labels.schoolPrep;
    return labels.lesson;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force Safari to start fetching metadata
    video.load();

    if (video.readyState >= 2) {
      setIsLoading(false);
      return;
    }

    const interval = setInterval(() => {
      if (video.readyState >= 2) {
        setIsLoading(false);
        clearInterval(interval);
      }
    }, 100);

    // Safety timeout: force show poster after 3 seconds if Safari refuses to load
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false); // Metadata is usually enough to stop the skeleton
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplaythrough", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplaythrough", handleLoadedMetadata);
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
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Video play failed:", error);
          }
        });
      }
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
        "relative rounded-[40px] p-2 border border-slate-200 cursor-pointer transition-all duration-500 mx-auto group will-change-transform transform-gpu isolate",
        isLoading ? "bg-slate-200 shadow-md" : "bg-black shadow-xl",
        isModal
          ? "w-[min(90vw,calc(80dvh*9/16))] max-h-[80dvh] aspect-[9/16] shadow-[0_0_100px_rgba(0,0,0,0.5)] border-white/20"
          : "w-full max-w-[320px] aspect-[9/17] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
      )}
      onClick={onToggle}
      onDoubleClick={onDoubleClick}
    >
      {/* Skeleton Overlay - Fades out once video is ready */}
      <div
        className={cn(
          "absolute inset-0 z-30 transition-opacity duration-500",
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <VideoSkeleton isModal={isModal} />
      </div>

      <div className={cn(
        "relative w-full h-full transition-opacity duration-700",
        isLoading ? "opacity-[0.01]" : "opacity-100"
      )}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-6 bg-black rounded-b-xl z-10"></div>

        {/* Close button for modal */}
        {isModal && (
          <button
            onClick={(e) => { e.stopPropagation(); onClose?.(); }}
            className="absolute top-4 right-4 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-xl border border-slate-200 z-50 hover:scale-110 transition-transform pointer-events-auto"
            aria-label={t.a11y.close}
          >
            <X size={24} />
          </button>
        )}

        <div
          className="relative w-full h-full bg-[#1e1e1e] overflow-hidden rounded-[32px] isolate z-0"
          style={{
            WebkitMaskImage: "-webkit-radial-gradient(white, black)",
            WebkitTransform: "translateZ(0)"
          }}
        >
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            aria-label={t.videoGallery.ariaLabelFormat.replace("{subject}", getLabel())}
            title={t.videoGallery.ariaLabelFormat.replace("{subject}", getLabel())}
            playsInline
            onEnded={onToggle}
            onLoadedData={() => setIsLoading(false)}
            onLoadedMetadata={() => setIsLoading(false)}
            onCanPlay={() => setIsLoading(false)}
            onCanPlayThrough={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            muted={isMuted}
            preload="metadata"
            className="w-full h-full object-cover rounded-[32px] pointer-events-auto"
          />

          <div
            className={cn(
              "absolute inset-0 rounded-3xl flex items-center justify-center bg-black/20 z-[5] transition-opacity duration-200",
              isPlaying ? "opacity-0" : "opacity-100"
            )}
          >
            <div className="w-[60px] h-[60px] bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 transition-transform duration-200 group-hover:scale-110 group-hover:bg-white/30 text-white">
              <Play size={24} fill="currentColor" className="ml-1" />
            </div>
          </div>

          {/* Video UI Overlay */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none flex flex-col justify-between p-5 bg-gradient-to-b from-black/40 via-transparent via-80% to-black/80 z-[6]">
            <div className={cn("pt-4 flex justify-between transition-opacity duration-300", isPlaying ? "opacity-0" : "opacity-100")}>
              <div className="text-white text-[10px] font-bold flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 uppercase tracking-widest">
                <span>{getLabel()}</span>
              </div>
            </div>

            {/* Side Controls */}
            <div className="absolute right-4 bottom-[100px] pointer-events-auto">
              <div className="flex flex-col gap-5 items-center text-white">
                <button
                  className="bg-transparent border-none text-white p-0 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                  onClick={toggleMute}
                  aria-label={isMuted ? t.a11y.unmute : t.a11y.mute}
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
                  aria-label={t.a11y.fullscreen}
                >
                  {isModal ? (
                    <Minimize size={26} className="filter drop-shadow-md" />
                  ) : (
                    <Maximize size={26} className="filter drop-shadow-md" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar — outside overflow-hidden to avoid WebKit clipping bug */}
        {isModal && (
          <div className="absolute bottom-6 left-0 right-0 w-[88%] mx-auto pointer-events-auto flex items-center gap-3 z-20 px-3 py-2 rounded-full bg-black/50 backdrop-blur-sm">
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              onClick={(e) => e.stopPropagation()}
              className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white transition-all hover:h-1.5"
              aria-label={t.a11y.videoProgress}
            />
            <span className="text-white text-[10px] font-mono whitespace-nowrap min-w-[60px]">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
