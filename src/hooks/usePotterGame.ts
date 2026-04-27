"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { AUDIO_ASSETS } from "@/constants/audio";

interface Puzzle {
  id: number;
  scrambled: string;
  answer: string;
}

const puzzlesUA: Puzzle[] = [
  { id: 1, scrambled: "ІЧКВДІ", answer: "КВІДІЧ" },
  { id: 2, scrambled: "ЯМАТІН", answer: "МАНТІЯ" },
  { id: 3, scrambled: "ЛЛЯЗІ", answer: "ЗІЛЛЯ" },
  { id: 4, scrambled: "ЛЬРОТ", answer: "ТРОЛЬ" },
  { id: 5, scrambled: "ЮЧКЛ", answer: "КЛЮЧ" },
  { id: 6, scrambled: "ХИША", answer: "ШАХИ" },
  { id: 7, scrambled: "ЕСТПРКЕС", answer: "ЕКСПРЕС" },
  { id: 8, scrambled: "ІСКВАСИЛ", answer: "ВАСИЛІСК" },
];

const puzzlesEN: Puzzle[] = [
  { id: 1, scrambled: "IDDITCHQU", answer: "QUIDDITCH" },
  { id: 2, scrambled: "OLAKC", answer: "CLOAK" },
  { id: 3, scrambled: "TIONPO", answer: "POTION" },
  { id: 4, scrambled: "LLORT", answer: "TROLL" },
  { id: 5, scrambled: "YEK", answer: "KEY" },
  { id: 6, scrambled: "SECHS", answer: "CHESS" },
  { id: 7, scrambled: "XPRESS", answer: "EXPRESS" },
  { id: 8, scrambled: "SILISKBA", answer: "BASILISK" },
];

export const usePotterGame = (lang: "en" | "ua" = "ua") => {
  const [inputs, setInputs] = useState<{ [key: number]: string }>({});
  const [completed, setCompleted] = useState<{ [key: number]: boolean }>({});
  const [allFinished, setAllFinished] = useState(false);

  const [sparkConfigs, setSparkConfigs] = useState<
    { left: string; top: string; delay: string; duration: string }[]
  >([]);


  // Sound Refs
  const correctSfx = useRef<HTMLAudioElement | null>(null);
  const winSfx = useRef<HTMLAudioElement | null>(null);

  const currentPuzzles = useMemo(
    () => (lang === "ua" ? puzzlesUA : puzzlesEN),
    [lang]
  );
  
  const solvedCount = Object.keys(completed).length;
  const totalCount = currentPuzzles.length;
  const progressPercent = (solvedCount / totalCount) * 100;

  useEffect(() => {
    // Generate randomized configs only on the client
    const timer = setTimeout(() => {
      setSparkConfigs(
        [...Array(15)].map(() => ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          delay: `${Math.random() * 5}s`,
          duration: `${3 + Math.random() * 4}s`,
        }))
      );
    }, 0);



    // Initialize Audio
    correctSfx.current = new Audio(AUDIO_ASSETS.GAME_STEP_SUCCESS);
    correctSfx.current.volume = 0.5;

    winSfx.current = new Audio(AUDIO_ASSETS.RESULT_PERFECT);
    winSfx.current.volume = 0.6;
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (id: number, val: string, onFocusNext: (id: number) => void) => {
    if (completed[id]) return;

    const upperVal = val.toUpperCase();
    setInputs((prev) => ({ ...prev, [id]: upperVal }));

    const puzzle = currentPuzzles.find((p) => p.id === id);
    if (puzzle && upperVal === puzzle.answer) {
      const nextCompleted = { ...completed, [id]: true };
      setCompleted(nextCompleted);

      const isAllDone = currentPuzzles.every((p) => nextCompleted[p.id]);

      if (isAllDone) {
        setAllFinished(true);
        if (winSfx.current) {
          winSfx.current.currentTime = 0;
          winSfx.current.play().catch((e) => console.log("Win audio play failed", e));
        }
      } else {
        if (correctSfx.current) {
          correctSfx.current.currentTime = 0;
          correctSfx.current.play().catch(() => {});
        }
        onFocusNext(id);
      }
    }
  };

  return {
    inputs,
    completed,
    allFinished,
    sparkConfigs,
    currentPuzzles,
    progressPercent,
    handleInputChange,
  };
};
