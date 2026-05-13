"use client";

import { Candy, TreePine, Snowflake, Gift } from "lucide-react";
import Image from "next/image";
import React from "react";

import { GameLoader } from "@/components/shared/GameLoader";
import { useGrinchGame, useImagePreloader } from "@/hooks";
import { cn } from "@/utils/cn";

import { GRINCH_GAME_ASSETS } from "./constants";
import { Toy } from "./Toy";

interface GrinchGameProps {
  translations: {
    grinchTask: string;
    success: string;
    empty: string;
    even: string;
    odd: string;
  };
}

export const GrinchGame = ({ translations }: GrinchGameProps) => {
  const {
    pool,
    evenBox,
    oddBox,
    errorFlash,
    snowflakes,
    isComplete,
    handleTouchDrop,
  } = useGrinchGame();

  const { grinchImgUrl, bgImgUrl } = GRINCH_GAME_ASSETS;

  const isLoaded = useImagePreloader([grinchImgUrl, bgImgUrl]);

  if (!isLoaded) {
    return <GameLoader />;
  }

  return (
    <div 
      data-testid="grinch-game-container" 
      className="bg-[#064e3b] rounded-[24px] p-[30px] text-white relative overflow-hidden min-h-[500px] border-[4px] border-[#b91c1c] shadow-[0_0_30px_rgba(220,38,38,0.2)] font-poppins z-[1] animate-in fade-in duration-700"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/ihrova-metodyka-navchannya-misto-grincha.webp')] bg-cover bg-center opacity-60 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(19,78,74,0.4)] to-[rgba(6,78,59,0.9)] z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(white_2px,transparent_3px)] bg-[length:50px_50px] opacity-[0.15] pointer-events-none z-[1]" />

      {/* Dynamic Falling Snow */}
      <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute top-[-20px] bg-white rounded-full blur-[0.5px] animate-[snowFall_linear_infinite]"
            style={{
              left: `${flake.left}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              opacity: flake.opacity,
              animationDuration: `${flake.animationDuration}s`,
              animationDelay: `${flake.animationDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Christmas Decorations */}
      <div className="absolute opacity-80 pointer-events-none animate-float-decor z-0 top-[5%] left-[5%] delay-0 -rotate-[15deg]"><Candy size={36} color="#f87171" /></div>
      <div className="absolute opacity-80 pointer-events-none animate-float-decor z-0 bottom-[15%] right-[5%] delay-[2s] rotate-[10deg]"><TreePine size={44} color="#15803d" /></div>
      <div className="absolute opacity-80 pointer-events-none animate-float-decor z-0 top-[20%] right-[15%] delay-[1s]"><Snowflake size={28} color="#e0f2fe" /></div>
      <div className="absolute opacity-80 pointer-events-none animate-float-decor z-0 bottom-[5%] left-[10%] delay-[3s] -rotate-[10deg]"><Gift size={40} color="#facc15" /></div>

      {/* Grinch Character Image */}
      <div className="absolute top-[-10px] right-[-25px] w-[120px] z-[20] -rotate-[15deg] pointer-events-none sm:w-[150px] sm:top-[-20px] sm:right-[-30px]">
        <Image 
          src={grinchImgUrl} 
          alt="The Grinch" 
          width={480} 
          height={480} 
          priority 
          unoptimized 
          className="w-full h-auto drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        />
      </div>

      <div className="text-center mt-[60px] mb-[30px] mx-auto relative z-[2]">
        <h3 className="text-[1.7rem] [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">{translations.grinchTask}</h3>
        {isComplete && (
          <div 
            data-testid="success-badge" 
            className="font-semibold text-[1.2rem] bg-[#F59E0B] text-black inline-block px-[15px] py-[5px] rounded-[20px] absolute bottom-[-55px] left-1/2 -translate-x-1/2 w-max animate-pop-in-centered"
          >
            {translations.success}
          </div>
        )}
      </div>

      {/* Number Pool */}
      <div 
        data-testid="number-pool" 
        className="flex flex-wrap place-content-center items-start gap-[15px] min-h-[140px] mt-[70px] mb-[40px] relative z-[10] p-[10px] w-full"
      >
        {pool.map((num) => (
          <Toy
            key={num}
            num={num}
            isDraggable={true}
            onTouchDrop={handleTouchDrop}
          />
        ))}
        {pool.length === 0 && (
          <div data-testid="pool-empty" className="italic text-[1.4rem] opacity-80 w-full h-full flex items-center justify-center mt-[50px] pt-[20px]">
            {translations.empty}
          </div>
        )}
      </div>

      {/* Drop Zones */}
      <div className="flex gap-[20px] justify-center items-stretch relative z-[10]">
        <div
          id="zone-even"
          className={cn(
            "drop-zone flex-1 min-h-[200px] bg-black/30 rounded-[16px] p-[15px] border-2 border-dashed border-white/30 transition-colors duration-300",
            errorFlash === "even" && "bg-red-500/40 border-red-500 error-flash"
          )}
        >
          <h4 className="text-center mt-0 mb-[15px] text-[1.2rem]">{translations.even}</h4>
          <div className="flex flex-wrap gap-[10px] justify-center items-end min-h-[80px]">
            {evenBox.map((n) => (
              <Toy key={n} num={n} />
            ))}
            {Array.from({ length: 5 - evenBox.length }).map((_, i) => (
              <div 
                key={`empty-even-${i}`} 
                className="w-[50px] h-[50px] rounded-full border-2 border-dashed border-white/20 mx-[3px] shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] shrink-0" 
              />
            ))}
          </div>
        </div>

        <div
          id="zone-odd"
          className={cn(
            "drop-zone flex-1 min-h-[200px] bg-black/30 rounded-[16px] p-[15px] border-2 border-dashed border-white/30 transition-colors duration-300",
            errorFlash === "odd" && "bg-red-500/40 border-red-500 error-flash"
          )}
        >
          <h4 className="text-center mt-0 mb-[15px] text-[1.2rem]">{translations.odd}</h4>
          <div className="flex flex-wrap gap-[10px] justify-center items-end min-h-[80px]">
            {oddBox.map((n) => (
              <Toy key={n} num={n} />
            ))}
            {Array.from({ length: 5 - oddBox.length }).map((_, i) => (
              <div 
                key={`empty-odd-${i}`} 
                className="w-[50px] h-[50px] rounded-full border-2 border-dashed border-white/20 mx-[3px] shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] shrink-0" 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
