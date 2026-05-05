import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GrinchGame } from "./GrinchGame";

// Mock useLanguage
vi.mock("@/context/LanguageContext", () => ({
  useLanguage: () => ({
    t: {
      themes: {
        loader: "Loading..."
      }
    }
  }),
}));

const mockTranslations = {
  grinchTask: "Task text",
  success: "Success message",
  empty: "Empty",
  even: "Even",
  odd: "Odd",
};

// Mock useImagePreloader hook
vi.mock("@/hooks", async () => {
  const actual = await vi.importActual("@/hooks");
  return {
    ...actual,
    useImagePreloader: vi.fn().mockReturnValue(true),
    useGrinchGame: vi.fn().mockReturnValue({
      pool: [1, 2, 3],
      evenBox: [],
      oddBox: [],
      errorFlash: null,
      snowflakes: [],
      isComplete: false,
      handleTouchDrop: vi.fn(),
    }),
  };
});

describe("GrinchGame", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loader initially if images are not loaded", async () => {
    const { useImagePreloader } = await import("@/hooks");
    vi.mocked(useImagePreloader).mockReturnValueOnce(false);

    render(<GrinchGame translations={mockTranslations} />);
    expect(screen.getByTestId("game-loader")).toBeInTheDocument();
  });

  it("renders game component after images are loaded", () => {
    render(<GrinchGame translations={mockTranslations} />);
    expect(screen.getByText("Task text")).toBeInTheDocument();
  });

  it("shows toys in the number pool", () => {
    render(<GrinchGame translations={mockTranslations} />);
    // Toys have numbers 1, 2, 3
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("displays success message when game is completed", async () => {
    const { useGrinchGame } = await import("@/hooks");
    vi.mocked(useGrinchGame).mockReturnValueOnce({
      pool: [],
      evenBox: [2],
      oddBox: [1, 3],
      errorFlash: null,
      snowflakes: [],
      isComplete: true,
      handleTouchDrop: vi.fn(),
    });

    render(<GrinchGame translations={mockTranslations} />);
    expect(screen.getByText("Success message")).toBeInTheDocument();
  });
});
