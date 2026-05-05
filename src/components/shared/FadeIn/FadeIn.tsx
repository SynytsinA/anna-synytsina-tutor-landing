"use client";

import React, { useState, useEffect, useRef } from "react";

import { cn } from "@/utils/cn";

interface FadeInProps {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const FadeIn = ({
  children,
  delay = 0,
  className = "",
  style = {},
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={cn(
        "fade-in-section",
        isVisible && "fade-in-visible",
        className
      )}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
};
