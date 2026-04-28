import { useState, useEffect, useRef } from "react";
import { QUIZ_QUESTIONS } from "@/constants/landing";
import { AUDIO_ASSETS } from "@/constants/audio";
import { Subject, ShuffledOption } from "@/types/quiz";

export const useHeroQuiz = () => {
  const [activeTab, setActiveTab] = useState<Subject>('ua');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const correctAudio = useRef<HTMLAudioElement | null>(null);
  const wrongAudio = useRef<HTMLAudioElement | null>(null);
  const completeAudio = useRef<HTMLAudioElement | null>(null);
  const averageAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    correctAudio.current = new Audio(AUDIO_ASSETS.QUIZ_CORRECT);
    wrongAudio.current = new Audio(AUDIO_ASSETS.QUIZ_INCORRECT);
    wrongAudio.current.volume = 0.6;
    completeAudio.current = new Audio(AUDIO_ASSETS.RESULT_PERFECT);
    completeAudio.current.volume = 0.3;
    averageAudio.current = new Audio(AUDIO_ASSETS.RESULT_AVERAGE);
    averageAudio.current.volume = 0.7;
  }, []);

  const currentQuestions = QUIZ_QUESTIONS[activeTab];

  const generateShuffledOptions = (tab: Subject, idx: number, shouldShuffle = true): ShuffledOption[] => {
    if (!QUIZ_QUESTIONS[tab][idx]) return [];
    const q = QUIZ_QUESTIONS[tab][idx];
    const opts = q.options.map((text, i) => ({ text, originalIndex: i }));
    if (shouldShuffle) {
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
    }
    return opts;
  };

  const [shuffledOptions, setShuffledOptions] = useState<ShuffledOption[]>(() =>
    generateShuffledOptions('ua', 0, false)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShuffledOptions(generateShuffledOptions(activeTab, currentIndex));
    }, 0);
    return () => clearTimeout(timer);
  }, [activeTab, currentIndex]);

  useEffect(() => {
    if (isFinished) {
      if (score === currentQuestions.length) {
        completeAudio.current?.play().catch(() => { });
      } else {
        averageAudio.current?.play().catch(() => { });
      }
    }
  }, [isFinished, score, currentQuestions.length]);

  const resetQuizState = () => {
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setIsFinished(false);
  };

  const handleTabChange = (tab: Subject) => {
    setActiveTab(tab);
    resetQuizState();
  };

  const playFeedbackSound = (type: 'correct' | 'wrong') => {
    if (type === 'correct') correctAudio.current?.play().catch(() => { });
    else wrongAudio.current?.play().catch(() => { });
  };

  const handleOptionClick = (visualIndex: number, originalIndex: number) => {
    if (selectedOptionIndex !== null) return;

    (document.activeElement as HTMLElement)?.blur();
    setSelectedOptionIndex(visualIndex);
    const correct = originalIndex === currentQuestions[currentIndex].correct;

    if (correct) {
      setScore(s => s + 1);
      playFeedbackSound('correct');
    } else {
      playFeedbackSound('wrong');
    }

    setTimeout(() => {
      if (currentIndex < currentQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOptionIndex(null);
      } else {
        setIsFinished(true);
      }
    }, 1200);
  };

  const progress = ((currentIndex) / currentQuestions.length) * 100;

  return {
    activeTab,
    currentIndex,
    selectedOptionIndex,
    score,
    isFinished,
    shuffledOptions,
    currentQuestions,
    progress,
    handleTabChange,
    handleOptionClick,
    resetQuizState
  };
};
