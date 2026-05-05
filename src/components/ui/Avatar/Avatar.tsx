import React from 'react';

import { cn } from "@/utils/cn";

interface AvatarProps {
  username: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const COLORS = [
  'bg-rose-400',
  'bg-sky-400',
  'bg-amber-400',
  'bg-emerald-400',
  'bg-indigo-400',
  'bg-violet-400',
  'bg-teal-400',
  'bg-orange-400',
];

const getDeterministicColor = (username: string) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
};

export const Avatar = ({ username, className, size = 'md' }: AvatarProps) => {
  const initial = username.charAt(0).toUpperCase();
  const bgColor = getDeterministicColor(username);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div
      aria-label={`Avatar for ${username}`}
      className={cn(
        "rounded-full flex items-center justify-center font-bold text-white border border-white/20 shadow-sm",
        bgColor,
        sizeClasses[size],
        className
      )}
    >
      <span className="relative z-10">{initial}</span>
      {/* Subtle glass overlay */}
      <div className="absolute inset-0 rounded-full bg-white/10 opacity-50" />
    </div>
  );
};
