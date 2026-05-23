import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { useLanguage } from "@/context/LanguageContext";
import { useSwipeNavigation } from "@/hooks";

import { Testimonials } from "./Testimonials";

vi.mock("@/constants/landing", () => ({
  TESTIMONIALS_DATA: [
    { id: 1, text: "Review 1" },
    { id: 2, text: "Review 2" },
    { id: 3, text: "Review 3" },
  ],
}));

vi.mock("@/context/LanguageContext", () => ({
  useLanguage: vi.fn(),
}));

vi.mock("@/hooks", () => ({
  useSwipeNavigation: vi.fn(),
}));

vi.mock("@/components/shared/FadeIn", () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-fade-in">{children}</div>,
}));

vi.mock("@/components/shared/InteractiveSlider", () => ({
  InteractiveSlider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-slider">{children}</div>
  ),
}));

interface MockReviewCardProps {
  item: { text: string };
  onClick?: () => void;
  isModal?: boolean;
}

vi.mock("./ReviewCard", () => ({
  ReviewCard: ({ item, onClick, isModal }: MockReviewCardProps) => (
    <div
      data-testid={isModal ? "mock-modal-review-card" : "mock-review-card"}
      onClick={onClick}
    >
      {item.text}
    </div>
  ),
}));

describe("Testimonials Component", () => {
  const mockUseLanguage = {
    t: {
      testimonials: { title: "Testimonials Title" },
      a11y: { close: "Close", previousFeedback: "Prev", nextFeedback: "Next" },
    },
  };

  const mockUseSwipeNavigation = {
    handleTouchStart: vi.fn(),
    handleTouchMove: vi.fn(),
    handleTouchEnd: vi.fn(),
    isAnimating: false,
    getSwipeStyle: () => ({}),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLanguage).mockReturnValue(mockUseLanguage as unknown as ReturnType<typeof useLanguage>);
    vi.mocked(useSwipeNavigation).mockReturnValue(mockUseSwipeNavigation as unknown as ReturnType<typeof useSwipeNavigation>);
  });

  it("renders the section title and slider", () => {
    render(<Testimonials />);
    expect(screen.getByText("Testimonials Title")).toBeInTheDocument();
    expect(screen.getByTestId("mock-slider")).toBeInTheDocument();
  });

  it("renders the correct number of review cards", () => {
    render(<Testimonials />);
    const cards = screen.getAllByTestId("mock-review-card");
    expect(cards).toHaveLength(3);
    expect(cards[0]).toHaveTextContent("Review 1");
  });

  it("opens the modal when a review card is clicked", () => {
    render(<Testimonials />);

    expect(screen.queryByTestId("mock-modal-review-card")).not.toBeInTheDocument();

    const cards = screen.getAllByTestId("mock-review-card");
    fireEvent.click(cards[0]); // Click first card

    expect(screen.getByTestId("mock-modal-review-card")).toBeInTheDocument();
    expect(screen.getByTestId("mock-modal-review-card")).toHaveTextContent("Review 1");
  });

  it("navigates through items in the modal", () => {
    render(<Testimonials />);

    fireEvent.click(screen.getAllByTestId("mock-review-card")[0]);

    const nextBtn = screen.getByLabelText("Next");
    const prevBtn = screen.getByLabelText("Prev");

    fireEvent.click(nextBtn);
    expect(screen.getByTestId("mock-modal-review-card")).toHaveTextContent("Review 2");

    fireEvent.click(prevBtn);
    expect(screen.getByTestId("mock-modal-review-card")).toHaveTextContent("Review 1");

    // Test wrap around
    fireEvent.click(prevBtn);
    expect(screen.getByTestId("mock-modal-review-card")).toHaveTextContent("Review 3");
  });

  it("closes the modal when the close button is clicked", () => {
    render(<Testimonials />);

    fireEvent.click(screen.getAllByTestId("mock-review-card")[0]);
    expect(screen.getByTestId("mock-modal-review-card")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Close"));
    expect(screen.queryByTestId("mock-modal-review-card")).not.toBeInTheDocument();
  });

  it("handles keyboard navigation", () => {
    render(<Testimonials />);

    fireEvent.click(screen.getAllByTestId("mock-review-card")[0]);
    expect(screen.getByTestId("mock-modal-review-card")).toHaveTextContent("Review 1");

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByTestId("mock-modal-review-card")).toHaveTextContent("Review 2");

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByTestId("mock-modal-review-card")).toHaveTextContent("Review 1");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByTestId("mock-modal-review-card")).not.toBeInTheDocument();
  });
});
