import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { SECTIONS_METADATA } from "@/constants/data";
import { useFAQ } from "@/hooks/useFAQ";

import { FAQ } from "./FAQ";

vi.mock("@/components/shared/FadeIn", () => ({
  FadeIn: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="mock-fade-in">
      {children}
    </div>
  ),
}));

vi.mock("@/hooks/useFAQ", () => ({
  useFAQ: vi.fn(),
}));

describe("FAQ Component", () => {
  const mockFaqData = {
    title: "Frequently Asked Questions",
    items: [
      { q: "Question 1", a: "Answer 1" },
      { q: "Question 2", a: "Answer 2" },
      { q: "Question 3", a: "Answer 3" },
    ],
  };

  const defaultMockReturn = {
    t: mockFaqData,
    openIndex: null,
    toggleItem: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useFAQ).mockReturnValue(defaultMockReturn);
  });

  it("renders the FAQ section title and all questions", () => {
    render(<FAQ />);

    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();

    mockFaqData.items.forEach((item) => {
      expect(screen.getByText(item.q)).toBeInTheDocument();
      expect(screen.getByText(item.a)).toBeInTheDocument();
    });
  });

  it("calls toggleItem when clicking on a question button", () => {
    const toggleItem = vi.fn();
    vi.mocked(useFAQ).mockReturnValue({
      ...defaultMockReturn,
      toggleItem,
    });

    render(<FAQ />);

    // Click the second question button
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]);

    expect(toggleItem).toHaveBeenCalledWith(1);
  });

  it("applies correct aria-expanded state and displays appropriate icon", () => {
    // Mock that the first item (index 0) is open
    vi.mocked(useFAQ).mockReturnValue({
      ...defaultMockReturn,
      openIndex: 0,
    });

    render(<FAQ />);
    const buttons = screen.getAllByRole("button");

    // First button should be expanded, others not
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "false");

    // Check icons
    // The open one (index 0) should render minus icon (rendered as lucide-minus or similar)
    const openCard = buttons[0].closest("[data-testid='mock-fade-in']");
    const closedCard = buttons[1].closest("[data-testid='mock-fade-in']");

    expect(openCard?.querySelector(".lucide-minus")).toBeInTheDocument();
    expect(openCard?.querySelector(".lucide-plus")).not.toBeInTheDocument();

    expect(closedCard?.querySelector(".lucide-plus")).toBeInTheDocument();
    expect(closedCard?.querySelector(".lucide-minus")).not.toBeInTheDocument();
  });

  it("applies correct grid style templates for open and closed items", () => {
    vi.mocked(useFAQ).mockReturnValue({
      ...defaultMockReturn,
      openIndex: 1, // second item open
    });

    const { container } = render(<FAQ />);

    // Find item content divs (the ones with transition property for grid-template-rows)
    const contentDivs = container.querySelectorAll("[style*='grid-template-rows']");
    expect(contentDivs).toHaveLength(3);

    // Index 1 should be 1fr, others 0fr
    expect(contentDivs[0]).toHaveStyle({ gridTemplateRows: "0fr" });
    expect(contentDivs[1]).toHaveStyle({ gridTemplateRows: "1fr" });
    expect(contentDivs[2]).toHaveStyle({ gridTemplateRows: "0fr" });
  });

  it("applies border left color classes dynamically by cycling index", () => {
    render(<FAQ />);

    // First mock-fade-in element is the heading wrapper, so we slice it off to get the question cards
    const cards = screen.getAllByTestId("mock-fade-in").slice(1);
    const colorClasses = SECTIONS_METADATA.faq.colorClasses;

    cards.forEach((card, index) => {
      const expectedClass = colorClasses[index % colorClasses.length];
      // Since classes are separated by spaces, we check each individual class in expectation
      expectedClass.split(" ").forEach((cls) => {
        expect(card).toHaveClass(cls);
      });
    });
  });
});
