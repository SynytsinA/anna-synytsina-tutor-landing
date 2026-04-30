"use client";

import React from "react";
import Image from "next/image";
import { Heart, Send, MoreHorizontal, X } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Testimonial } from "@/types/landing";
import styles from "./ReviewCard.module.css";

import { ReviewSkeleton } from "../ReviewSkeleton";

interface ReviewCardProps {
  item: Testimonial;
  index: number;
  onClick?: () => void;
  isModal?: boolean;
}

const BLUR_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

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

export const ReviewCard: React.FC<ReviewCardProps> = ({ item, index, onClick, isModal = false }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div
      className={`${isModal ? "" : "relative flex-none w-[300px] md:w-[300px] w-[85vw] snap-center"}`}
      onClick={onClick}
    >
      {/* Skeleton Layer - Fades out once loaded */}
      <div 
        className={`absolute inset-0 z-20 transition-opacity duration-500 ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <ReviewSkeleton isModal={isModal} />
      </div>

      {/* Content Layer - Fades in once image is ready */}
      <div
        className={`relative flex flex-col justify-between text-white shadow-xl overflow-hidden border-[3px] border-white transition-opacity duration-700 ${!isModal ? "w-full aspect-[9/16] max-h-[550px] rounded-3xl p-5 hover:scale-[1.02] cursor-pointer" : "h-[80vh] sm:h-[95vh] aspect-[9/16] p-3 sm:p-8 rounded-xl sm:rounded-[40px]"} ${getGradientClass(index)} ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        {/* Story Header */}
        <div className="relative z-20 flex flex-col gap-3">
          <div className="flex gap-1">
            <div className="h-0.5 bg-white flex-1 rounded-sm"></div>
            <div className="h-0.5 bg-white/30 flex-1 rounded-sm"></div>
          </div>

          <div className="flex items-center gap-2.5">
            <Avatar username={item.username} size="sm" />
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
            alt={item.alt}
            fill
            className="object-cover"
            sizes={isModal ? "1000px" : "(max-width: 768px) 85vw, 300px"}
            priority={isModal || index < 3}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            onLoad={() => setIsLoading(false)}
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
