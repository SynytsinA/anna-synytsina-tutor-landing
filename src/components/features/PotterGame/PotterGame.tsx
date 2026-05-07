"use client";

import Image from "next/image";
import React, { useRef } from "react";

import { GameLoader } from "@/components/shared/GameLoader";
import { useLanguage } from "@/context/LanguageContext";
import { usePotterGame, useImagePreloader } from "@/hooks";

import styles from "./PotterGame.module.css";
import { SnitchIcon, HallowsIcon, LightningBolt, FeatherIcon, CheckIcon } from "./PotterIcons";

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
    '/images/tsikavi-uroky-dlya-ditei-hogwarts-hall.webp',
    '/images/sortuvalnyi-kapelyuh-interaktyvna-ukrainska-mova.webp'
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
            src="/images/sortuvalnyi-kapelyuh-interaktyvna-ukrainska-mova.webp"
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
                  {!isSolved && !inputs[puzzle.id] && <FeatherIcon className={styles.quillIcon} />}
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
