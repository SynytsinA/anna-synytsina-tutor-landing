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
    
    // @ts-ignore
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

  it("applies the fade-in-section class initially", () => {
    render(
      <FadeIn className="custom-class">
        <div>Content</div>
      </FadeIn>
    );

    const container = screen.getByText("Content").parentElement;
    expect(container).toHaveClass("fade-in-section");
    expect(container).toHaveClass("custom-class");
    expect(container).not.toHaveClass("fade-in-visible");
  });

  it("triggers visibility when intersection observer fires", () => {
    let observerCallback: any;
    
    // @ts-ignore
    window.IntersectionObserver = class {
      constructor(callback: any) {
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
      const entry = { isIntersecting: true };
      observerCallback([entry]);
    });

    const container = screen.getByTestId("child").parentElement;
    expect(container).toHaveClass("fade-in-visible");
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
