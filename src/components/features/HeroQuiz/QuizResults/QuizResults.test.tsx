import { render, screen, fireEvent } from "@testing-library/react";
import { Star } from "lucide-react";
import React from "react";
import { describe, it, expect, vi } from "vitest";

import { QuizResults } from "./QuizResults";

describe("QuizResults", () => {
  const mockResetQuizState = vi.fn();
  const mockResultContent = {
    title: "Чудовий результат!",
    desc: "Ти справжній знавець!",
    bgClass: "bg-green-100",
    colorClass: "text-green-600",
    Icon: Star,
  };

  const defaultProps = {
    score: 8,
    total: 10,
    scoreLabel: "Твій результат: {score} з {total}",
    retryLabel: "Спробувати ще раз",
    resultContent: mockResultContent,
    resetQuizState: mockResetQuizState,
  };

  it("renders the results correctly", () => {
    render(<QuizResults {...defaultProps} />);

    expect(screen.getByText(/Чудовий результат!/)).toBeInTheDocument();
    expect(screen.getByText(/Ти справжній знавець!/)).toBeInTheDocument();
    expect(screen.getByText(/Твій результат: 8 з 10/)).toBeInTheDocument();
    expect(screen.getByText(/Спробувати ще раз/)).toBeInTheDocument();
  });

  it("renders the provided icon with correct classes", () => {
    const { container } = render(<QuizResults {...defaultProps} />);
    
    const iconContainer = container.querySelector(".bg-green-100");
    expect(iconContainer).toBeInTheDocument();
    
    const icon = iconContainer?.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("text-green-600");
  });

  it("calls resetQuizState when retry button is clicked", () => {
    render(<QuizResults {...defaultProps} />);

    const retryButton = screen.getByText("Спробувати ще раз");
    fireEvent.click(retryButton);

    expect(mockResetQuizState).toHaveBeenCalledTimes(1);
  });

  it("replaces score and total placeholders in scoreLabel", () => {
    render(
      <QuizResults
        {...defaultProps}
        score={5}
        total={5}
        scoreLabel="You got {score} out of {total} points"
      />
    );

    expect(screen.getByText(/You got 5 out of 5 points/)).toBeInTheDocument();
  });
});
