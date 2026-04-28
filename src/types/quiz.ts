export type Subject = 'ukrainian' | 'math';

export interface ShuffledOption {
  text: string;
  originalIndex: number;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}
