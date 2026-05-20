import React from "react";

export interface InteractiveWordProps {
  word: string;
  delayStep?: number;
  scribbleDelay?: string;
}

export const InteractiveWord = ({
  word,
  delayStep = 0.1,
  scribbleDelay = "0.5s",
}: InteractiveWordProps) => {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {word.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block animate-playful-wave origin-bottom"
          style={{
            animationDelay: `${i * delayStep}s`,
            color: i % 3 === 0 ? "#4f46e5" : i % 3 === 1 ? "#ec4899" : "#f59e0b",
          }}
        >
          {char}
        </span>
      ))}
      <svg
        className="absolute -bottom-3 left-0 w-full h-[15px] -z-10 opacity-0 scale-x-0 origin-left animate-draw-scribble"
        style={{ animationDelay: scribbleDelay }}
        viewBox="0 0 200 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.00025 7.00005C39.4636 2.87258 133.023 -3.42128 197.973 5.46077"
          stroke="#EC4899"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};
