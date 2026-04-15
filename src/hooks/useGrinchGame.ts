"use client";

import { useState, useEffect, useRef } from "react";

export const useGrinchGame = () => {
  const initialNumbers = [1, 8, 10, 9, 3, 7, 4, 6, 2, 5];
  const [pool, setPool] = useState<number[]>(initialNumbers);
  const [evenBox, setEvenBox] = useState<number[]>([]);
  const [oddBox, setOddBox] = useState<number[]>([]);
  const [errorFlash, setErrorFlash] = useState<"even" | "odd" | null>(null);

  // Generate random snowflakes
  const [snowflakes, setSnowflakes] = useState<
    {
      id: number;
      left: number;
      animationDuration: number;
      animationDelay: number;
      opacity: number;
      size: number;
    }[]
  >([]);

  // Audio Refs
  const dropSfxRef = useRef<HTMLAudioElement | null>(null);
  const completionSfxRef = useRef<HTMLAudioElement | null>(null);

  const isComplete = pool.length === 0;

  useEffect(() => {
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

    // Initialize Audio
    dropSfxRef.current = new Audio(
      "https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73467.mp3"
    );
    dropSfxRef.current.volume = 0.5;

    completionSfxRef.current = new Audio(
      "https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3"
    );
    completionSfxRef.current.volume = 0.6;
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

  const handleDragStart = (e: React.DragEvent, num: number) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("application/json", JSON.stringify({ num }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, target: "even" | "odd") => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;

    try {
      const parsed = JSON.parse(data);
      processMove(parsed.num, target);
    } catch (err) {
      console.error("Grinch drop parse failed", err);
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
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleTouchDrop,
  };
};
