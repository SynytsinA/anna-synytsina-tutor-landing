"use client";

import React from "react";
import Image from "next/image";
import { Heart, Send, MoreHorizontal, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FadeIn } from "@/components/shared/FadeIn";
import { InteractiveSlider } from "@/components/shared/InteractiveSlider";
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
}

const StoryCard: React.FC<StoryCardProps> = ({ item, index }) => {
  return (
    <div className="flex-none w-[300px] md:w-[300px] w-[85vw] snap-center">
       <div 
         className={`w-full aspect-[9/16] max-h-[550px] rounded-3xl relative flex flex-col justify-between p-5 text-white shadow-xl overflow-hidden border-[3px] border-white ${getGradientClass(index)}`}
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
                   <X size={24} color="white" />
                </div>
          </div>
          </div>

          {/* Story Content - The Real Feedback Image */}
          <div className="absolute inset-0 z-10 bg-black/10">
             <Image 
               src={item.image}
               alt={`Feedback from ${item.username}`}
               fill
               className="object-cover"
               sizes="(max-width: 768px) 85vw, 300px"
             />
             {/* Gradient overlay for better text visibility in header/footer */}
             <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent via-80% to-black/60"></div>
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
            <StoryCard key={item.id} item={item} index={i} />
          ))}
        </InteractiveSlider>
      </div>
    </section>
  );
};
