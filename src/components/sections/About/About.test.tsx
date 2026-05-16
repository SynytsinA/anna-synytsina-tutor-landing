import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { ABOUT_METADATA } from "@/constants/landing";
import { translations } from "@/constants/translations";
import { useLanguage } from "@/context/LanguageContext";

import { About } from "./About";
import { COLOR_CLASSES } from "./constants";

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

describe("About Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with Ukrainian translations by default", () => {
    vi.mocked(useLanguage).mockReturnValue({
      lang: "ua",
      t: translations.ua,
      toggleLang: vi.fn(),
    });

    render(<About />);

    // Check title, name, and role
    expect(screen.getByRole("heading", { name: translations.ua.about.title })).toBeInTheDocument();
    expect(screen.getByText(translations.ua.about.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(translations.ua.about.role))).toBeInTheDocument();

    // Check description and greeting
    expect(screen.getByText(/^Привіт!$/)).toBeInTheDocument();
    expect(screen.getByText(translations.ua.about.desc.replace(/\u00A0/g, " "))).toBeInTheDocument();

    // Check stats are rendered
    translations.ua.about.stats.forEach((stat) => {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(stat.desc)).toBeInTheDocument();
    });

    // Check profile image
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain(encodeURIComponent(ABOUT_METADATA.profilePhoto.url));
    expect(img).toHaveAttribute("alt", ABOUT_METADATA.profilePhoto.alt.ua);
  });

  it("renders the component with English translations correctly", () => {
    vi.mocked(useLanguage).mockReturnValue({
      lang: "en",
      t: translations.en,
      toggleLang: vi.fn(),
    });

    render(<About />);

    // Check title, name, and role
    expect(screen.getByRole("heading", { name: translations.en.about.title })).toBeInTheDocument();
    expect(screen.getByText(translations.en.about.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(translations.en.about.role))).toBeInTheDocument();

    // Check description and greeting
    expect(screen.getByText(/^Hello!$/)).toBeInTheDocument();
    expect(screen.getByText(translations.en.about.desc.replace(/\u00A0/g, " "))).toBeInTheDocument();

    // Check stats are rendered
    translations.en.about.stats.forEach((stat) => {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(stat.desc)).toBeInTheDocument();
    });

    // Check profile image with English alt text
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("alt", ABOUT_METADATA.profilePhoto.alt.en);
  });

  it("applies the correct background colors to stat cards", () => {
    vi.mocked(useLanguage).mockReturnValue({
      lang: "ua",
      t: translations.ua,
      toggleLang: vi.fn(),
    });

    const { container } = render(<About />);

    // Find the statistic card containers (they have class rounded-hand and shadow-hard)
    const cards = container.querySelectorAll(".rounded-hand");
    expect(cards).toHaveLength(translations.ua.about.stats.length);

    cards.forEach((card, index) => {
      const expectedColorClass = COLOR_CLASSES[index % COLOR_CLASSES.length];
      expect(card).toHaveClass(expectedColorClass);
    });
  });
});
