export interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  opacity: number;
  size: number;
}

export interface Puzzle {
  id: number;
  scrambled: string;
  answer: string;
}

export interface SparkConfig {
  left: string;
  top: string;
  delay: string;
  duration: string;
}
