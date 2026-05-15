import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { ABOUT_METADATA } from "@/constants/landing";
import { translations } from "@/constants/translations";
import { useLanguage } from "@/context/LanguageContext";

import { About } from "./About";
import { COLOR_CLASSES } from "./constants";
import { getStatIcon } from "./utils";

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

describe("getStatIcon Utility", () => {
  it("returns Briefcase icon with primary text color for index 0", () => {
    const icon = getStatIcon(0);
    const { container } = render(icon);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("text-primary");
    expect(svg).toHaveClass("lucide-briefcase");
  });

  it("returns GraduationCap icon with secondary text color for index 1", () => {
    const icon = getStatIcon(1);
    const { container } = render(icon);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("text-secondary");
    expect(svg).toHaveClass("lucide-graduation-cap");
  });

  it("returns Building2 icon with accent text color for index 2", () => {
    const icon = getStatIcon(2);
    const { container } = render(icon);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("text-accent");
    expect(svg).toHaveClass("lucide-building2");
  });

  it("returns Briefcase fallback icon for other indices", () => {
    const icon = getStatIcon(99);
    const { container } = render(icon);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("lucide-briefcase");
    expect(svg).not.toHaveClass("text-primary");
  });
});

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
