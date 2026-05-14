import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { translations } from "@/constants/translations";
import { useLanguage } from "@/context/LanguageContext";
import { usePotterGame, useImagePreloader } from "@/hooks";

import { PotterGame } from "./PotterGame";

// Mock the hooks
vi.mock("@/context/LanguageContext", () => ({
  useLanguage: vi.fn(),
}));

vi.mock("@/hooks", () => ({
  usePotterGame: vi.fn(),
  useImagePreloader: vi.fn(),
}));

describe("PotterGame", () => {
  const mockTranslations = translations.ua;
  const mockPuzzles = [
    { id: 1, scrambled: "ІЧКВДІ", answer: "КВІДІЧ" },
    { id: 2, scrambled: "ЯМАТІН", answer: "МАНТІЯ" },
  ];

  const defaultHookState: ReturnType<typeof usePotterGame> = {
    inputs: {},
    completed: {},
    allFinished: false,
    sparkConfigs: [],
    currentPuzzles: mockPuzzles,
    progressPercent: 0,
    handleInputChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLanguage).mockReturnValue({
      lang: "ua",
      t: mockTranslations,
      toggleLang: vi.fn(),
    });
    vi.mocked(useImagePreloader).mockReturnValue(true);
    vi.mocked(usePotterGame).mockReturnValue(defaultHookState);
  });

  it("renders loader when images are not loaded", () => {
    vi.mocked(useImagePreloader).mockReturnValue(false);
    render(<PotterGame />);
    expect(screen.getByText(/Завантаження магії/i)).toBeInTheDocument();
  });

  it("renders the game title and puzzles correctly", () => {
    render(<PotterGame />);

    expect(screen.getByText(mockTranslations.themes.potterTitle)).toBeInTheDocument();
    expect(screen.getByText("ІЧКВДІ")).toBeInTheDocument();
    expect(screen.getByText("ЯМАТІН")).toBeInTheDocument();
  });

  it("handles input changes", () => {
    const handleInputChange = vi.fn();
    vi.mocked(usePotterGame).mockReturnValue({
      ...defaultHookState,
      handleInputChange,
    });

    render(<PotterGame />);

    const inputs = screen.getAllByRole("textbox", { name: /Введіть слово/i });
    fireEvent.change(inputs[0], { target: { value: "КВІДІЧ" } });

    expect(handleInputChange).toHaveBeenCalledWith(1, "КВІДІЧ", expect.any(Function));
  });

  it("shows success message when all puzzles are finished", () => {
    vi.mocked(usePotterGame).mockReturnValue({
      ...defaultHookState,
      allFinished: true,
      progressPercent: 100,
    });

    render(<PotterGame />);

    expect(screen.getByText(mockTranslations.themes.potterSuccess)).toBeInTheDocument();
  });

  it("disables inputs for solved puzzles", () => {
    vi.mocked(usePotterGame).mockReturnValue({
      ...defaultHookState,
      completed: { 1: true },
      inputs: { 1: "КВІДІЧ" },
    });

    render(<PotterGame />);

    const inputs = screen.getAllByRole("textbox", { name: /Введіть слово/i });
    expect(inputs[0]).toBeDisabled();
    expect(inputs[0]).toHaveValue("КВІДІЧ");
    expect(inputs[1]).not.toBeDisabled();
  });

  it("renders progress bar with correct width", () => {
    vi.mocked(usePotterGame).mockReturnValue({
      ...defaultHookState,
      progressPercent: 50,
    });

    const { container } = render(<PotterGame />);

    // The progress fill div has a style with width
    const progressFill = container.querySelector("[style*='width: 50%']");
    expect(progressFill).toBeInTheDocument();
  });
});
