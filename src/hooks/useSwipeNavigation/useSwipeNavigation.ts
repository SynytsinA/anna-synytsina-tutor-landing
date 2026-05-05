import { useState, useCallback } from "react";

import { SwipeNavigationProps } from "@/types/navigation";

export const useSwipeNavigation = ({ 
  onNext, 
  onPrev, 
  threshold = 70, 
  speed = 200 
}: SwipeNavigationProps) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchMoveX, setTouchMoveX] = useState<number>(0);
  const [animationDirection, setAnimationDirection] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchMoveX(0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentX = e.targetTouches[0].clientX;
    setTouchMoveX(currentX - touchStart);
  }, [touchStart]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > threshold) {
      setIsAnimating(true);
      if (diff > 0) {
        setAnimationDirection("left");
        setTimeout(() => {
          onNext();
          setAnimationDirection("right");
          setTouchMoveX(0);
          setTimeout(() => {
            setIsAnimating(false);
            setAnimationDirection(null);
          }, speed);
        }, speed);
      } else {
        setAnimationDirection("right");
        setTimeout(() => {
          onPrev();
          setAnimationDirection("left");
          setTouchMoveX(0);
          setTimeout(() => {
            setIsAnimating(false);
            setAnimationDirection(null);
          }, speed);
        }, speed);
      }
    } else {
      setTouchMoveX(0);
    }
    setTouchStart(null);
  }, [touchStart, threshold, speed, onNext, onPrev]);

  const getSwipeStyle = useCallback(() => ({
    transform: !isAnimating
      ? `translateX(${touchMoveX}px) rotate(${touchMoveX * 0.05}deg)`
      : animationDirection === "left"
        ? "translateX(-100vw)"
        : "translateX(100vw)",
    transition: touchStart === null ? `all ${speed / 1000}s ease-out` : "none",
    opacity: isAnimating ? 0 : 1
  }), [isAnimating, touchMoveX, animationDirection, touchStart, speed]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isAnimating,
    getSwipeStyle,
  };
};
