import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { APPROACH_METADATA } from "@/constants/landing";
import { translations } from "@/constants/translations";
import { useLanguage } from "@/context/LanguageContext";

import { Approach } from "./Approach";
import { COLOR_CLASSES, ICON_COLOR_CLASSES } from "./constants";

// Mock FadeIn component
vi.mock("@/components/shared/FadeIn", () => ({
  FadeIn: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="mock-fade-in">
      {children}
    </div>
  ),
}));

// Mock Language Context hook
vi.mock("@/context/LanguageContext", () => ({
  useLanguage: vi.fn(),
}));

describe("Approach Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with Ukrainian translations by default", () => {
    vi.mocked(useLanguage).mockReturnValue({
      lang: "ua",
      t: translations.ua,
      toggleLang: vi.fn(),
    });

    render(<Approach />);

    // Check section title
    expect(screen.getByRole("heading", { name: translations.ua.values.title })).toBeInTheDocument();

    // Check value cards rendering
    translations.ua.values.list.forEach((item) => {
      expect(screen.getByRole("heading", { name: item.title })).toBeInTheDocument();
      expect(screen.getByText(item.desc)).toBeInTheDocument();
    });

    // Check profile image
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain(encodeURIComponent(APPROACH_METADATA.portraitImage.url));
    expect(img).toHaveAttribute("alt", APPROACH_METADATA.portraitImage.alt.ua);
  });

  it("renders the component with English translations correctly", () => {
    vi.mocked(useLanguage).mockReturnValue({
      lang: "en",
      t: translations.en,
      toggleLang: vi.fn(),
    });

    render(<Approach />);

    // Check section title
    expect(screen.getByRole("heading", { name: translations.en.values.title })).toBeInTheDocument();

    // Check value cards rendering
    translations.en.values.list.forEach((item) => {
      expect(screen.getByRole("heading", { name: item.title })).toBeInTheDocument();
      expect(screen.getByText(item.desc)).toBeInTheDocument();
    });

    // Check profile image with English alt text
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain(encodeURIComponent(APPROACH_METADATA.portraitImage.url));
    expect(img).toHaveAttribute("alt", APPROACH_METADATA.portraitImage.alt.en);
  });

  it("applies the correct background and icon colors to value cards dynamically", () => {
    vi.mocked(useLanguage).mockReturnValue({
      lang: "ua",
      t: translations.ua,
      toggleLang: vi.fn(),
    });

    const { container } = render(<Approach />);

    // Find all value card containers (marked by class rounded-hand and shadow-hard)
    const cards = container.querySelectorAll(".rounded-hand");
    expect(cards).toHaveLength(translations.ua.values.list.length);

    cards.forEach((card, index) => {
      // Assert background color matches the cycle
      const expectedBgClass = COLOR_CLASSES[index % COLOR_CLASSES.length];
      expect(card).toHaveClass(expectedBgClass);

      // Assert icon wrapper contains the correct icon color class
      const expectedIconColorClass = ICON_COLOR_CLASSES[index % ICON_COLOR_CLASSES.length];
      const iconWrapper = card.querySelector(".rounded-full");
      expect(iconWrapper).toBeInTheDocument();
      expect(iconWrapper).toHaveClass(expectedIconColorClass);
    });
  });
});
