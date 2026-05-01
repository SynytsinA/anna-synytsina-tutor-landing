import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { HeroQuiz } from "./HeroQuiz";

// Mock useLanguage
vi.mock("@/context/LanguageContext", () => ({
  useLanguage: () => ({
    lang: "ua",
    t: {
      heroQuiz: {
        tryNow: "Try Now",
        tabUA: "UA",
        tabUAMobile: "UA-M",
        tabMath: "Math",
        questionLabel: "Question",
        scoreLabel: "Score {score} out of {total}",
        retry: "Retry",
        result5: { title: "Great job!", desc: "Excellent" },
        result3: { title: "Good job!", desc: "Average" },
        resultBad: { title: "Keep practicing", desc: "Keep going" }
      }
    }
  }),
}));

// Mock useHeroQuiz
const mockHandleTabChange = vi.fn();
const mockHandleOptionClick = vi.fn();
const mockResetQuizState = vi.fn();

vi.mock("@/hooks", () => ({
  useHeroQuiz: vi.fn().mockReturnValue({
    activeTab: "ukrainian",
    currentIndex: 0,
    selectedOptionIndex: null,
    score: 0,
    isFinished: false,
    shuffledOptions: [
      { text: "Option A", originalIndex: 0 },
      { text: "Option B", originalIndex: 1 },
    ],
    currentQuestions: [
      { q: "Question 1", options: ["A", "B"], correct: 0 },
    ],
    progress: 0,
    handleTabChange: (...args: any[]) => mockHandleTabChange(...args),
    handleOptionClick: (...args: any[]) => mockHandleOptionClick(...args),
    resetQuizState: (...args: any[]) => mockResetQuizState(...args),
  }),
}));

describe("HeroQuiz", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the tabs and question correctly", () => {
    render(<HeroQuiz />);
    expect(screen.getByText("Try Now")).toBeInTheDocument();
    expect(screen.getByText("UA")).toBeInTheDocument();
    expect(screen.getByText("Math")).toBeInTheDocument();
    expect(screen.getByText("Question 1")).toBeInTheDocument();
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
  });

  it("calls handleTabChange when tabs are clicked", () => {
    render(<HeroQuiz />);
    
    fireEvent.click(screen.getByText("Math"));
    expect(mockHandleTabChange).toHaveBeenCalledWith("math");
  });

  it("calls handleOptionClick when an option is clicked", () => {
    render(<HeroQuiz />);
    
    fireEvent.click(screen.getByText("Option A"));
    expect(mockHandleOptionClick).toHaveBeenCalledWith(0, 0);
  });

  it("renders result screen when quiz is finished", async () => {
    const { useHeroQuiz } = await import("@/hooks");
    vi.mocked(useHeroQuiz).mockReturnValueOnce({
      activeTab: "ukrainian",
      currentIndex: 0,
      selectedOptionIndex: null,
      score: 5,
      isFinished: true,
      shuffledOptions: [],
      currentQuestions: [
        { q: "Question 1", options: ["A", "B"], correct: 0 },
      ],
      progress: 100,
      handleTabChange: mockHandleTabChange,
      handleOptionClick: mockHandleOptionClick,
      resetQuizState: mockResetQuizState,
    });

    render(<HeroQuiz />);
    expect(screen.getByText("Great job!")).toBeInTheDocument();
    expect(screen.getByText(/Score 5 out of 1/)).toBeInTheDocument();
  });

  it("renders result screen with intermediate message when score is 3 or 4", async () => {
    const { useHeroQuiz } = await import("@/hooks");
    vi.mocked(useHeroQuiz).mockReturnValueOnce({
      activeTab: "ukrainian",
      currentIndex: 0,
      selectedOptionIndex: null,
      score: 3,
      isFinished: true,
      shuffledOptions: [],
      currentQuestions: [
        { q: "Question 1", options: ["A", "B"], correct: 0 },
      ],
      progress: 100,
      handleTabChange: mockHandleTabChange,
      handleOptionClick: mockHandleOptionClick,
      resetQuizState: mockResetQuizState,
    });

    render(<HeroQuiz />);
    expect(screen.getByText("Good job!")).toBeInTheDocument();
    expect(screen.getByText(/Score 3 out of 1/)).toBeInTheDocument();
  });

  it("renders result screen with encouragement message when score is below 3", async () => {
    const { useHeroQuiz } = await import("@/hooks");
    vi.mocked(useHeroQuiz).mockReturnValueOnce({
      activeTab: "ukrainian",
      currentIndex: 0,
      selectedOptionIndex: null,
      score: 1,
      isFinished: true,
      shuffledOptions: [],
      currentQuestions: [
        { q: "Question 1", options: ["A", "B"], correct: 0 },
      ],
      progress: 100,
      handleTabChange: mockHandleTabChange,
      handleOptionClick: mockHandleOptionClick,
      resetQuizState: mockResetQuizState,
    });

    render(<HeroQuiz />);
    expect(screen.getByText("Keep practicing")).toBeInTheDocument();
    expect(screen.getByText(/Score 1 out of 1/)).toBeInTheDocument();
  });
});

