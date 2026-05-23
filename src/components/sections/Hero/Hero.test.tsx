import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { useHero } from "@/hooks/useHero";

import { Hero } from "./Hero";

vi.mock("@/components/features/HeroQuiz", () => ({
  HeroQuiz: () => <div data-testid="mock-hero-quiz">Hero Quiz</div>,
  HeroQuizSkeleton: () => <div data-testid="mock-hero-quiz-skeleton">Hero Quiz Skeleton</div>,
}));

vi.mock("@/components/shared/FadeIn", () => ({
  FadeIn: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="mock-fade-in">
      {children}
    </div>
  ),
}));

vi.mock("@/components/ui/InteractiveWord", () => ({
  InteractiveWord: ({ word }: { word: string }) => (
    <span data-testid="mock-interactive-word">{word}</span>
  ),
}));

vi.mock("@/hooks/useHero", () => ({
  useHero: vi.fn(),
}));

describe("Hero Component", () => {
  const mockHandleScroll = vi.fn();
  
  const mockHeroData = {
    t: {
      hero: {
        tag: "Hero Tag",
        titleHighlight: "Highlight Title",
        subtitle: "Hero Subtitle",
        cta: "Call to Action",
        watchVideo: "Watch Video",
      },
    },
    handleScroll: mockHandleScroll,
    firstWord: "First",
    restOfTitle: "Rest of Title",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useHero).mockReturnValue(mockHeroData as unknown as ReturnType<typeof useHero>);
    mockHandleScroll.mockReturnValue(vi.fn());
  });

  it("renders all text elements correctly", () => {
    render(<Hero />);
    
    expect(screen.getByText("Hero Tag")).toBeInTheDocument();
    expect(screen.getByTestId("mock-interactive-word")).toHaveTextContent("First");
    expect(screen.getByText(/Rest of Title/)).toBeInTheDocument();
    expect(screen.getByText("Highlight Title")).toBeInTheDocument();
    expect(screen.getByText("Hero Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Call to Action")).toBeInTheDocument();
    expect(screen.getByText("Watch Video")).toBeInTheDocument();
  });

  it("renders the HeroQuiz component", () => {
    render(<Hero />);
    expect(screen.getByTestId("mock-hero-quiz")).toBeInTheDocument();
  });

  it("sets up scroll handlers for CTA buttons", () => {
    const mockScrollFn1 = vi.fn();
    const mockScrollFn2 = vi.fn();
    
    mockHandleScroll.mockImplementation((section) => {
      if (section === "contact") return mockScrollFn1;
      if (section === "video-gallery") return mockScrollFn2;
      return vi.fn();
    });

    render(<Hero />);

    const ctaButton = screen.getByText("Call to Action").closest("a");
    const watchVideoButton = screen.getByText("Watch Video").closest("a");

    expect(ctaButton).toHaveAttribute("href", "#contact");
    expect(watchVideoButton).toHaveAttribute("href", "#video-gallery");

    fireEvent.click(ctaButton!);
    expect(mockScrollFn1).toHaveBeenCalled();

    fireEvent.click(watchVideoButton!);
    expect(mockScrollFn2).toHaveBeenCalled();
  });
});
