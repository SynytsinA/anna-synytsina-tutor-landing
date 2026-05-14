import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi } from "vitest";

import { QuizQuestions } from "./QuizQuestions";

describe("QuizQuestions", () => {
  const mockHandleOptionClick = vi.fn();
  
  const mockQuestions = [
    { q: "Яке слово є іменником?", correct: 2 },
    { q: "Скільки буде 5 + 3?", correct: 1 },
  ];

  const mockShuffledOptions = [
    { text: "Бігти", originalIndex: 0 },
    { text: "Веселий", originalIndex: 1 },
    { text: "Школа", originalIndex: 2 },
  ];

  const defaultProps = {
    activeTab: "ukrainian",
    currentIndex: 0,
    currentQuestions: mockQuestions,
    shuffledOptions: mockShuffledOptions,
    selectedOptionIndex: null,
    progress: 50,
    questionLabel: "Питання",
    handleOptionClick: mockHandleOptionClick,
  };

  it("renders the question and options correctly", () => {
    render(<QuizQuestions {...defaultProps} />);

    expect(screen.getByText("Питання 1 / 2")).toBeInTheDocument();
    expect(screen.getByText("Яке слово є іменником?")).toBeInTheDocument();
    expect(screen.getByText("Бігти")).toBeInTheDocument();
    expect(screen.getByText("Веселий")).toBeInTheDocument();
    expect(screen.getByText("Школа")).toBeInTheDocument();
  });

  it("renders the progress bar with correct width and color", () => {
    const { container } = render(<QuizQuestions {...defaultProps} />);
    
    const progressBar = container.querySelector(".bg-primary");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle("width: 50%");
  });

  it("renders the progress bar with secondary color for math tab", () => {
    const { container } = render(<QuizQuestions {...defaultProps} activeTab="math" />);
    
    const progressBar = container.querySelector(".bg-secondary");
    expect(progressBar).toBeInTheDocument();
  });

  it("calls handleOptionClick when an option is clicked", () => {
    render(<QuizQuestions {...defaultProps} />);

    const optionButton = screen.getByText("Школа");
    fireEvent.click(optionButton);

    // Visual index is 2, original index is 2
    expect(mockHandleOptionClick).toHaveBeenCalledWith(2, 2);
  });

  it("shows correct feedback when correct option is selected", () => {
    // Correct index for "Яке слово є іменником?" is 2 ("Школа")
    render(
      <QuizQuestions 
        {...defaultProps} 
        selectedOptionIndex={2} 
      />
    );

    const correctButton = screen.getByText("Школа").closest("button");
    expect(correctButton).toHaveClass("bg-green-100");
    // Should have Check icon (lucide-check)
    expect(correctButton?.querySelector(".lucide-check")).toBeInTheDocument();

    // Other buttons should be hidden
    const wrongButton = screen.getByText("Бігти").closest("button");
    expect(wrongButton).toHaveClass("opacity-0");
  });

  it("shows both correct and wrong feedback when incorrect option is selected", () => {
    // Correct index is 2 ("Школа"). We select index 0 ("Бігти").
    render(
      <QuizQuestions 
        {...defaultProps} 
        selectedOptionIndex={0} 
      />
    );

    // Selected wrong button
    const wrongButton = screen.getByText("Бігти").closest("button");
    expect(wrongButton).toHaveClass("bg-red-100");
    expect(wrongButton?.querySelector(".lucide-x")).toBeInTheDocument();

    // Correct button should still be highlighted in green
    const correctButton = screen.getByText("Школа").closest("button");
    expect(correctButton).toHaveClass("bg-green-100");
    expect(correctButton?.querySelector(".lucide-check")).toBeInTheDocument();

    // The third button should be hidden
    const otherButton = screen.getByText("Веселий").closest("button");
    expect(otherButton).toHaveClass("opacity-0");
  });

  it("disables all buttons when an option is selected", () => {
    render(<QuizQuestions {...defaultProps} selectedOptionIndex={0} />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });
});
