"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { usePotterGame, useImagePreloader } from "@/hooks";
import { GameLoader } from "@/components/shared/GameLoader";
import styles from "./PotterGame.module.css";

// --- Custom SVGs ---
const SnitchIcon = ({ className }: { className?: string }) => (
  <svg viewBox="-20 -10 140 80" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="50" cy="30" r="10" fill="gold" stroke="none" />
    <path d="M40 30 Q 10 0, 0 20 T 10 50" stroke="#fbbf24" fill="rgba(251, 191, 36, 0.2)" />
    <path d="M60 30 Q 90 0, 100 20 T 90 50" stroke="#fbbf24" fill="rgba(251, 191, 36, 0.2)" />
  </svg>
);

const HallowsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M50 10 L90 90 L10 90 Z" />
    <line x1="50" y1="10" x2="50" y2="90" />
    <circle cx="50" cy="65" r="25" />
  </svg>
);

const LightningBolt = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const FeatherIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
    <line x1="16" y1="8" x2="2" y2="22" />
    <line x1="17.5" y1="15" x2="9" y2="15" />
  </svg>
);

const CheckIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="3"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const PotterGame = () => {
  const { lang, t } = useLanguage();
  const {
    inputs,
    completed,
    allFinished,
    sparkConfigs,
    currentPuzzles,
    progressPercent,
    handleInputChange,
  } = usePotterGame(lang);

  const isLoaded = useImagePreloader([
    '/images/tsikavi-uroky-dlya-ditei-hogwarts-hall.png',
    '/images/sortuvalnyi-kapelyuh-interaktyvna-ukrainska-mova.png'
  ]);

  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const focusNextInput = (currentId: number) => {
    const currentIndex = currentPuzzles.findIndex((p) => p.id === currentId);
    if (currentIndex === -1) return;

    for (let i = currentIndex + 1; i < currentPuzzles.length; i++) {
      const nextId = currentPuzzles[i].id;
      if (!completed[nextId] && inputRefs.current[nextId]) {
        inputRefs.current[nextId]?.focus();
        return;
      }
    }
    for (let i = 0; i < currentIndex; i++) {
      const nextId = currentPuzzles[i].id;
      if (!completed[nextId] && inputRefs.current[nextId]) {
        inputRefs.current[nextId]?.focus();
        return;
      }
    }
  };

  if (!isLoaded) {
    return <GameLoader />;
  }

  return (
    <div className={`${styles.potterGameContainer} animate-in fade-in duration-700`}>
      {/* Background Stones */}
      <div className={styles.potterBgStone} />
      <div className={styles.potterBgOverlay} />

      {/* Magical dust & sparks */}
      <div className={styles.magicalDustContainer}>
        {sparkConfigs.map((cfg, i) => (
          <div
            key={`spark-${i}`}
            className={styles.magicalSpark}
            style={{
              left: cfg.left,
              top: cfg.top,
              animationDelay: cfg.delay,
              animationDuration: cfg.duration,
            }}
          />
        ))}
      </div>

      <div className={styles.hallowsBgWatermark}>
        <HallowsIcon className={styles.hallowsIconBg} />
      </div>


      <div className={styles.potterHeaderModern}>
        <div>
          <Image
            src="/images/sortuvalnyi-kapelyuh-interaktyvna-ukrainska-mova.png"
            alt="Сортувальний капелюх — інтерактивне навчання від Анни Синиціної"
            width={0}
            height={0}
            sizes="100vw"
            className={styles.sortingHatImg}
            unoptimized
          />
        </div>

        <h3 className={styles.magicalGlowText}>
          {t.themes.potterTitle}
        </h3>

        {/* Progress or Success Message */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', height: '60px', alignItems: 'center' }}>
          {!allFinished ? (
            <div className={styles.snitchProgressTrack}>
              <div
                className={styles.snitchProgressFill}
                style={{ width: `${progressPercent}%` }}
              >
                <div className={styles.flyingSnitchMarker}>
                  <SnitchIcon className={styles.snitchSvg} />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.potterSuccessMsgModern}>
              <LightningBolt className={styles.boltIcon} />
              <span>{t.themes.potterSuccess}</span>
              <LightningBolt className={styles.boltIcon} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.potterGridParchment}>
        {currentPuzzles.map((puzzle) => {
          const isSolved = completed[puzzle.id];

          return (
            <div
              key={puzzle.id}
              className={`${styles.potterParchmentCard} ${isSolved ? styles.solved : ""}`}
            >
              {/* Red Runic Circles */}
              <div className={`${styles.runicCircle} ${styles.runicTl}`} />
              <div className={`${styles.runicCircle} ${styles.runicBr}`} />

              {/* Wax Seal */}
              <div className={styles.waxSealStatus}>
                {isSolved ? (
                  <CheckIcon style={{ width: '20px', height: '20px' }} />
                ) : (
                  <div className={styles.sealDot} />
                )}
              </div>

              <div className={styles.puzzleContentModern}>
                <span className={styles.scrambledTextParchment}>
                  {puzzle.scrambled}
                </span>

                <div className={styles.inputWrapperParchment}>
                  {!isSolved && <FeatherIcon className={styles.quillIcon} />}
                  <input
                    ref={(el) => {
                      inputRefs.current[puzzle.id] = el;
                    }}
                    type="text"
                    value={inputs[puzzle.id] || ""}
                    onChange={(e) => handleInputChange(puzzle.id, e.target.value, focusNextInput)}
                    className={styles.parchmentInput}
                    disabled={isSolved}
                    autoComplete="off"
                    spellCheck="false"
                    placeholder={isSolved ? "" : "?"}
                    aria-label={t.a11y.enterWord}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
