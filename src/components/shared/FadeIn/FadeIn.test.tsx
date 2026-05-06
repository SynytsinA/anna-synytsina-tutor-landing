import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { FadeIn } from "./FadeIn";

describe("FadeIn", () => {
  // Mock IntersectionObserver
  const mockObserve = vi.fn();
  const mockUnobserve = vi.fn();
  const mockDisconnect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    // @ts-expect-error - Mocking IntersectionObserver
    window.IntersectionObserver = class {
      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = mockDisconnect;
    };
  });

  it("renders children correctly", () => {
    render(
      <FadeIn>
        <div data-testid="child">Test Child</div>
      </FadeIn>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies the initial Tailwind classes", () => {
    render(
      <FadeIn className="custom-class">
        <div>Content</div>
      </FadeIn>
    );

    const container = screen.getByText("Content").parentElement;
    expect(container).toHaveClass("opacity-0");
    expect(container).toHaveClass("translate-y-5");
    expect(container).toHaveClass("custom-class");
    expect(container).not.toHaveClass("opacity-100");
  });

  it("triggers visibility when intersection observer fires", () => {
    let observerCallback: IntersectionObserverCallback;
    
    // @ts-expect-error - Mocking IntersectionObserver
    window.IntersectionObserver = class {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }
      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = mockDisconnect;
    };

    render(
      <FadeIn>
        <div data-testid="child">Target</div>
      </FadeIn>
    );

    // Simulate intersection
    act(() => {
      const entry = { isIntersecting: true } as IntersectionObserverEntry;
      observerCallback([entry], {} as IntersectionObserver);
    });

    const container = screen.getByTestId("child").parentElement;
    expect(container).toHaveClass("opacity-100");
    expect(container).toHaveClass("translate-y-0");
    expect(mockUnobserve).toHaveBeenCalled();
  });

  it("applies custom delay and styles", () => {
    render(
      <FadeIn delay={0.5} style={{ color: "red" }}>
        <div>Styled Content</div>
      </FadeIn>
    );

    const container = screen.getByText("Styled Content").parentElement;
    expect(container).toHaveStyle("transition-delay: 0.5s");
    expect(container).toHaveStyle("color: rgb(255, 0, 0)");
  });
});
