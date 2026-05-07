import React from "react";

export const SnitchIcon = ({ className }: { className?: string }) => (
  <svg viewBox="-20 -10 140 80" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="50" cy="30" r="10" fill="gold" stroke="none" />
    <path d="M40 30 Q 10 0, 0 20 T 10 50" stroke="#fbbf24" fill="rgba(251, 191, 36, 0.2)" />
    <path d="M60 30 Q 90 0, 100 20 T 90 50" stroke="#fbbf24" fill="rgba(251, 191, 36, 0.2)" />
  </svg>
);

export const HallowsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M50 10 L90 90 L10 90 Z" />
    <line x1="50" y1="10" x2="50" y2="90" />
    <circle cx="50" cy="65" r="25" />
  </svg>
);

export const LightningBolt = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export const FeatherIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
    <line x1="16" y1="8" x2="2" y2="22" />
    <line x1="17.5" y1="15" x2="9" y2="15" />
  </svg>
);

export const CheckIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
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
