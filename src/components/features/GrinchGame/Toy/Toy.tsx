"use client";

import React, { useRef } from "react";

import { cn } from "@/utils/cn";

interface ToyProps {
  num: number;
  isDraggable?: boolean;
  onTouchDrop?: (num: number, zoneId: string) => void;
}

export const Toy: React.FC<ToyProps> = ({
  num,
  isDraggable = false,
  onTouchDrop,
}) => {
  const variant = num % 5;

  const elementRef = useRef<HTMLDivElement>(null);
  const touchStartPos = useRef({ x: 0, y: 0 });
  const lastTouchPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isDraggable || !elementRef.current) return;
    
    // Only handle primary button (left click) or touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    if (e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
    }

    elementRef.current.setPointerCapture(e.pointerId);

    touchStartPos.current = { x: e.clientX, y: e.clientY };
    lastTouchPos.current = { x: e.clientX, y: e.clientY };

    elementRef.current.style.transition = "none";
    elementRef.current.style.zIndex = "1000";
    elementRef.current.style.position = "relative";
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggable || !elementRef.current) return;
    if (!elementRef.current.hasPointerCapture(e.pointerId)) return;

    if (e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
    }

    lastTouchPos.current = { x: e.clientX, y: e.clientY };

    const deltaX = e.clientX - touchStartPos.current.x;
    const deltaY = e.clientY - touchStartPos.current.y;

    elementRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.1)`;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggable || !elementRef.current) return;
    if (!elementRef.current.hasPointerCapture(e.pointerId)) return;

    elementRef.current.releasePointerCapture(e.pointerId);

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
    const commonNumClass = "text-[1.5rem] font-bold text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.6)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none";
    const wrapperClass = "w-[54px] h-[54px] relative drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]";
    const svgClass = "w-full h-full block";

    switch (variant) {
      case 1:
        return (
          <div className={wrapperClass}>
            <svg viewBox="0 0 50 50" className={svgClass}>
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
            <span className={commonNumClass}>{num}</span>
          </div>
        );
      case 2:
        return (
          <div className={wrapperClass}>
            <svg viewBox="0 0 50 50" className={svgClass}>
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
            <span className={commonNumClass}>{num}</span>
          </div>
        );
      case 3:
        return (
          <div className={wrapperClass}>
            <svg viewBox="0 0 50 50" className={svgClass}>
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
            <span className={cn(
              "absolute z-20 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#14532d] text-[1.6rem] font-extrabold [text-shadow:1.5px_1.5px_0_#fff,-1.5px_1.5px_0_#fff,1.5px_-1.5px_0_#fff,-1.5px_-1.5px_0_#fff,0_2px_5px_rgba(0,0,0,0.3)]"
            )}>{num}</span>
          </div>
        );
      case 0:
      case 4:
      default:
        return (
          <div 
            data-testid="toy-body"
            className={cn(
              "w-full h-full rounded-full flex items-center justify-center shadow-[2px_5px_10px_rgba(0,0,0,0.3)] relative overflow-hidden",
              variant === 0 ? "bg-[radial-gradient(circle_at_30%_30%,#f87171,#991b1b)]" : "bg-[radial-gradient(circle_at_30%_30%,#2dd4bf,#0f766e)]"
            )}
          >
            <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(251,255,255,0.8)_0%,transparent_70%)] rounded-full" />
            <span className={commonNumClass}>{num}</span>
          </div>
        );
    }
  };

  return (
    <div
      ref={elementRef}
      data-testid="toy-item"
      className={cn(
        "w-[50px] h-[50px] relative select-none",
        isDraggable && "cursor-grab active:cursor-grabbing"
      )}
      style={{ touchAction: isDraggable ? "none" : "auto" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-[12px] h-[12px] border-2 border-[#ccc] rounded-full border-b-0 z-0" />
      <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-[18px] h-[8px] bg-[#999] rounded-[3px] z-[1]" />
      {renderToyContent()}
    </div>
  );
};
