"use client";

import React from "react";
import Image from "next/image";
import { Candy, TreePine, Snowflake, Gift } from "lucide-react";
import { useGrinchGame } from "@/hooks";
import { Toy } from "./parts/Toy";
import styles from "./GrinchGame.module.css";

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
    handleDragStart,
    handleDrop,
    handleTouchDrop,
    handleDragOver,
  } = useGrinchGame();

  const grinchImgUrl = "/images/interaktyvna-navchalna-gra-grinch-pochatkova-shkola.png";

  return (
    <div className={styles.grinchGameContainer}>
      {/* Decorative Background Elements */}
      <div className={styles.grinchBgCity} />
      <div className={styles.grinchBgOverlay} />
      <div className={styles.snowOverlay} />
      
      {/* Dynamic Falling Snow */}
      <div className={styles.dynamicSnowContainer}>
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className={styles.snowflakeParticle}
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
      <div className={`${styles.floatingDecor} ${styles.decor1}`}><Candy size={36} color="#f87171" /></div>
      <div className={`${styles.floatingDecor} ${styles.decor2}`}><TreePine size={44} color="#15803d" /></div>
      <div className={`${styles.floatingDecor} ${styles.decor3}`}><Snowflake size={28} color="#e0f2fe" /></div>
      <div className={`${styles.floatingDecor} ${styles.decor4}`}><Gift size={40} color="#facc15" /></div>

      {/* Grinch Character Image */}
      <div className={styles.grinchCharacter}>
        <Image src={grinchImgUrl} alt="The Grinch" width={480} height={480} />
      </div>

      <div className={styles.grinchHeader}>
        <h3>{translations.grinchTask}</h3>
        {isComplete && <div className={styles.successBadge}>{translations.success}</div>}
      </div>

      {/* Number Pool */}
      <div className={styles.numberPool}>
        {pool.map((num) => (
          <Toy
            key={num}
            num={num}
            onDragStart={(e) => handleDragStart(e, num)}
            onTouchDrop={handleTouchDrop}
          />
        ))}
        {pool.length === 0 && (
          <div className={styles.poolEmpty}>{translations.empty}</div>
        )}
      </div>

      {/* Drop Zones */}
      <div className={styles.dropZonesContainer}>
        <div
          id="zone-even"
          className={`${styles.dropZone} ${errorFlash === "even" ? styles.errorFlash : ""}`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "even")}
        >
          <h4>{translations.even}</h4>
          <div className={styles.zoneSlots}>
            {evenBox.map((n) => (
              <Toy key={n} num={n} />
            ))}
            {Array.from({ length: 5 - evenBox.length }).map((_, i) => (
              <div key={`empty-even-${i}`} className={styles.emptySlot} />
            ))}
          </div>
        </div>

        <div
          id="zone-odd"
          className={`${styles.dropZone} ${errorFlash === "odd" ? styles.errorFlash : ""}`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "odd")}
        >
          <h4>{translations.odd}</h4>
          <div className={styles.zoneSlots}>
            {oddBox.map((n) => (
              <Toy key={n} num={n} />
            ))}
            {Array.from({ length: 5 - oddBox.length }).map((_, i) => (
              <div key={`empty-odd-${i}`} className={styles.emptySlot} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
