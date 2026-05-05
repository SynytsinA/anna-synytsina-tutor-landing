"use client";

import { useState, useEffect, useRef } from "react";

import { AUDIO_ASSETS } from "@/constants/audio";
import { GRINCH_INITIAL_NUMBERS } from "@/constants/game";
import { Snowflake } from "@/types/game";

export const useGrinchGame = () => {
  const [pool, setPool] = useState<number[]>(GRINCH_INITIAL_NUMBERS);
  const [evenBox, setEvenBox] = useState<number[]>([]);
  const [oddBox, setOddBox] = useState<number[]>([]);
  const [errorFlash, setErrorFlash] = useState<"even" | "odd" | null>(null);

  // Generate random snowflakes
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  // Audio Refs
  const dropSfxRef = useRef<HTMLAudioElement | null>(null);
  const completionSfxRef = useRef<HTMLAudioElement | null>(null);

  const isComplete = pool.length === 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSnowflakes(
        Array.from({ length: 40 }).map((_, i) => ({
          id: i,
          left: Math.random() * 100,
          animationDuration: 15 + Math.random() * 20,
          animationDelay: -Math.random() * 35,
          opacity: 0.15 + Math.random() * 0.4,
          size: 2 + Math.random() * 4,
        }))
      );
    }, 0);

    // Initialize Audio
    dropSfxRef.current = new Audio(AUDIO_ASSETS.GAME_STEP_SUCCESS);
    dropSfxRef.current.volume = 0.5;

    completionSfxRef.current = new Audio(AUDIO_ASSETS.RESULT_PERFECT);
    completionSfxRef.current.volume = 0.6;
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isComplete && completionSfxRef.current) {
      completionSfxRef.current.currentTime = 0;
      completionSfxRef.current.play().catch((error) => {
        console.log("Audio play failed:", error);
      });
    }
  }, [isComplete]);

  const processMove = (num: number, target: "even" | "odd") => {
    const isEven = num % 2 === 0;

    if ((target === "even" && isEven) || (target === "odd" && !isEven)) {
      if (target === "even") {
        setEvenBox((prev) => [...prev, num]);
      } else {
        setOddBox((prev) => [...prev, num]);
      }
      setPool((prev) => prev.filter((n) => n !== num));

      if (dropSfxRef.current) {
        dropSfxRef.current.currentTime = 0;
        dropSfxRef.current.play().catch(() => {});
      }
      return true;
    } else {
      setErrorFlash(target);
      setTimeout(() => setErrorFlash(null), 600);
      return false;
    }
  };

  const handleTouchDrop = (num: number, targetZoneId: string) => {
    let target: "even" | "odd" | null = null;
    if (targetZoneId === "zone-even") target = "even";
    if (targetZoneId === "zone-odd") target = "odd";

    if (target) {
      processMove(num, target);
    }
  };

  return {
    pool,
    evenBox,
    oddBox,
    errorFlash,
    snowflakes,
    isComplete,
    handleTouchDrop,
  };
};
