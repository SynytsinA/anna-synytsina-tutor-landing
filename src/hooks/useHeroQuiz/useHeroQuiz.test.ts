import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { QUIZ_QUESTIONS } from "@/constants/landing";
import { translations } from "@/constants/translations";
import { useLanguage } from "@/context/LanguageContext";

import { useHeroQuiz } from "./useHeroQuiz";

// Mock useLanguage
vi.mock("@/context/LanguageContext", () => ({
  useLanguage: vi.fn(() => ({ 
    lang: "ua", 
    t: translations.ua, 
    toggleLang: vi.fn() 
  }))
}));

class MockAudio {
  play = vi.fn().mockResolvedValue(undefined);
  pause = vi.fn();
  currentTime = 0;
  volume = 1;
}
global.Audio = MockAudio as unknown as typeof Audio;

describe("useHeroQuiz", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.mocked(useLanguage).mockReturnValue({ 
      lang: "ua", 
      t: translations.ua, 
      toggleLang: vi.fn() 
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useHeroQuiz());

    expect(result.current.activeTab).toBe("ukrainian");
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.score).toBe(0);
    expect(result.current.isFinished).toBe(false);
  });

  it("should handle tab change", () => {
    const { result } = renderHook(() => useHeroQuiz());

    act(() => {
      result.current.handleTabChange("math");
    });

    expect(result.current.activeTab).toBe("math");
    expect(result.current.currentIndex).toBe(0);
  });

  it("should increment score on correct answer", () => {
    const { result } = renderHook(() => useHeroQuiz());
    const currentQuestion = QUIZ_QUESTIONS.ua.ukrainian[0];
    const correctIdx = currentQuestion.correct;

    // Find the shuffled option that has the original correct index
    const visualIdx = result.current.shuffledOptions.findIndex(o => o.originalIndex === correctIdx);

    act(() => {
      result.current.handleOptionClick(visualIdx, correctIdx);
    });

    expect(result.current.score).toBe(1);
    expect(result.current.selectedOptionIndex).toBe(visualIdx);

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.selectedOptionIndex).toBe(null);
  });

  it("should not increment score on wrong answer", () => {
    const { result } = renderHook(() => useHeroQuiz());
    const wrongIdx = 999; // Arbitrary wrong original index

    act(() => {
      result.current.handleOptionClick(0, wrongIdx);
    });

    expect(result.current.score).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(result.current.currentIndex).toBe(1);
  });

  it("should finish quiz after last question", () => {
    const { result } = renderHook(() => useHeroQuiz());
    const totalQuestions = QUIZ_QUESTIONS.ua.ukrainian.length;

    for (let i = 0; i < totalQuestions; i++) {
      act(() => {
        result.current.handleOptionClick(0, 0); // Click any option
      });
      act(() => {
        vi.advanceTimersByTime(1200);
      });
    }

    expect(result.current.isFinished).toBe(true);
  });

  it("should reset quiz state", () => {
    const { result } = renderHook(() => useHeroQuiz());

    act(() => {
      result.current.handleOptionClick(0, QUIZ_QUESTIONS.ua.ukrainian[0].correct);
    });

    act(() => {
      result.current.resetQuizState();
    });

    expect(result.current.score).toBe(0);
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.isFinished).toBe(false);
  });

  it("should use English questions when language is set to 'en'", () => {
    vi.mocked(useLanguage).mockReturnValue({ 
      lang: "en", 
      t: translations.en, 
      toggleLang: vi.fn() 
    });

    const { result } = renderHook(() => useHeroQuiz());

    act(() => {
      result.current.handleTabChange("math");
    });

    expect(result.current.currentQuestions[0].q).toBe("What is 5 + 3?");
  });
});
