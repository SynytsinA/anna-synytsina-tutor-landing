import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { useLanguage } from "@/context/LanguageContext";

import { GamesSection } from "./GamesSection";

vi.mock("@/components/shared/FadeIn", () => ({
  FadeIn: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="mock-fade-in">
      {children}
    </div>
  ),
}));

vi.mock("@/components/features/PotterGame/PotterGame", () => ({
  PotterGame: () => <div data-testid="mock-potter-game">Potter Game</div>,
}));

vi.mock("@/components/features/GrinchGame/GrinchGame", () => ({
  GrinchGame: () => <div data-testid="mock-grinch-game">Grinch Game</div>,
}));

vi.mock("@/context/LanguageContext", () => ({
  useLanguage: vi.fn(),
}));

describe("GamesSection Component", () => {
  const mockThemesData = {
    title: "Games Title",
    desc: "Games Description",
    potter: "Potter Tab",
    grinch: "Grinch Tab",
    startBtn: "Start Lesson",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLanguage).mockReturnValue({
      t: { themes: mockThemesData },
    } as ReturnType<typeof useLanguage>);
  });

  it("renders the title and description from translations", () => {
    render(<GamesSection />);
    expect(screen.getByText("Games Title")).toBeInTheDocument();
    expect(screen.getByText("Games Description")).toBeInTheDocument();
  });

  it("renders the tabs and idle state with Start Lesson button by default", () => {
    render(<GamesSection />);
    
    expect(screen.getByText("Potter Tab")).toBeInTheDocument();
    expect(screen.getByText("Grinch Tab")).toBeInTheDocument();
    expect(screen.getByText("Start Lesson")).toBeInTheDocument();
    
    // Games should not be visible yet
    expect(screen.queryByTestId("mock-potter-game")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-grinch-game")).not.toBeInTheDocument();
  });

  it("starts the potter lesson when Start Lesson is clicked (default tab)", () => {
    render(<GamesSection />);
    
    const startBtn = screen.getByText("Start Lesson");
    fireEvent.click(startBtn);
    
    expect(screen.queryByText("Start Lesson")).not.toBeInTheDocument();
    expect(screen.getByTestId("mock-potter-game")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-grinch-game")).not.toBeInTheDocument();
  });

  it("switches to grinch tab and starts the grinch lesson", () => {
    render(<GamesSection />);
    
    // Switch tab
    const grinchTab = screen.getByText("Grinch Tab");
    fireEvent.click(grinchTab);
    
    // Start lesson
    const startBtn = screen.getByText("Start Lesson");
    fireEvent.click(startBtn);
    
    expect(screen.getByTestId("mock-grinch-game")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-potter-game")).not.toBeInTheDocument();
  });

  it("resets to idle state when tab is changed after starting a lesson", () => {
    render(<GamesSection />);
    
    // Start potter lesson
    fireEvent.click(screen.getByText("Start Lesson"));
    expect(screen.getByTestId("mock-potter-game")).toBeInTheDocument();
    
    // Switch to grinch
    fireEvent.click(screen.getByText("Grinch Tab"));
    
    // Should go back to idle state with Start Lesson button
    expect(screen.getByText("Start Lesson")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-potter-game")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-grinch-game")).not.toBeInTheDocument();
  });
});
