"use client";

import React, { useRef } from "react";
import styles from "../GrinchGame.module.css";

interface ToyProps {
  num: number;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
  onTouchDrop?: (num: number, zoneId: string) => void;
}

export const Toy: React.FC<ToyProps> = ({
  num,
  onDragStart,
  onDragEnd,
  onTouchDrop,
}) => {
  const variant = num % 5;
  const isDraggable = !!onDragStart;

  const elementRef = useRef<HTMLDivElement>(null);
  const touchStartPos = useRef({ x: 0, y: 0 });
  const lastTouchPos = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isDraggable) return;
    if (e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
    }

    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    lastTouchPos.current = { x: touch.clientX, y: touch.clientY };

    if (elementRef.current) {
      elementRef.current.style.transition = "none";
      elementRef.current.style.zIndex = "1000";
      elementRef.current.style.position = "relative";
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggable || !elementRef.current) return;
    if (e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
    }

    const touch = e.touches[0];
    lastTouchPos.current = { x: touch.clientX, y: touch.clientY };

    const deltaX = touch.clientX - touchStartPos.current.x;
    const deltaY = touch.clientY - touchStartPos.current.y;

    elementRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.2)`;
  };

  const handleTouchEnd = () => {
    if (!isDraggable || !elementRef.current) return;

    elementRef.current.style.visibility = "hidden";
    const elemBelow = document.elementFromPoint(
      lastTouchPos.current.x,
      lastTouchPos.current.y
    );
    elementRef.current.style.visibility = "visible";

    let droppedZoneId: string | null = null;
    if (elemBelow) {
      const zone = elemBelow.closest(".drop-zone");
      if (zone && zone.id) droppedZoneId = zone.id;
    }

    elementRef.current.style.transform = "";
    elementRef.current.style.zIndex = "";
    elementRef.current.style.transition = "transform 0.3s ease";

    if (droppedZoneId && onTouchDrop) {
      onTouchDrop(num, droppedZoneId);
    }
  };

  const renderToyContent = () => {
    switch (variant) {
      case 1:
        return (
          <div className={styles.toyShapeWrapper}>
            <svg viewBox="0 0 50 50" className={styles.toySvgShape}>
              <defs>
                <linearGradient id="treeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="100%" stopColor="#166534" />
                </linearGradient>
              </defs>
              <path
                d="M25 2 L8 22 H18 L6 36 H16 L4 48 H46 L34 36 H44 L32 22 H42 L25 2 Z"
                fill="url(#treeGrad)"
                stroke="#14532d"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="25" cy="16" r="3" fill="#facc15" stroke="#b45309" strokeWidth="0.5" />
              <circle cx="14" cy="30" r="3" fill="#f87171" stroke="#991b1b" strokeWidth="0.5" />
              <circle cx="36" cy="30" r="3" fill="#60a5fa" stroke="#1e40af" strokeWidth="0.5" />
            </svg>
            <span className={styles.toyNum}>{num}</span>
          </div>
        );
      case 2:
        return (
          <div className={styles.toyShapeWrapper}>
            <svg viewBox="0 0 50 50" className={styles.toySvgShape}>
              <defs>
                <linearGradient id="starGold" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fde047" />
                  <stop offset="100%" stopColor="#eab308" />
                </linearGradient>
              </defs>
              <path
                d="M25 2 L31 19 L49 19 L35 29 L40 47 L25 37 L10 47 L15 29 L1 19 L19 19 Z"
                fill="url(#starGold)"
                stroke="#a16207"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.toyNum}>{num}</span>
          </div>
        );
      case 3:
        return (
          <div className={styles.toyShapeWrapper}>
            <svg viewBox="0 0 50 50" className={styles.toySvgShape}>
              <pattern
                id="candyStripes"
                patternUnits="userSpaceOnUse"
                width="10"
                height="10"
                patternTransform="rotate(45)"
              >
                <rect width="5" height="10" fill="#dc2626" />
                <rect x="5" width="5" height="10" fill="#ffffff" />
              </pattern>
              <path
                d="M 34 46 V 16 A 10 10 0 0 0 14 16 V 21"
                stroke="url(#candyStripes)"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className={`${styles.toyNum} ${styles.candyNum}`}>{num}</span>
          </div>
        );
      case 0:
      case 4:
      default:
        return (
          <div className={styles.toyBody}>
            <div className={styles.toyHighlight} />
            <span className={styles.toyNum}>{num}</span>
          </div>
        );
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${styles.toyItem} ${styles[`toyVariant${variant}`]} ${isDraggable ? "cursor-grab active:cursor-grabbing" : ""}`}
      draggable={isDraggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.toyHangerLoop} />
      <div className={styles.toyHangerCap} />
      {renderToyContent()}
    </div>
  );
};
