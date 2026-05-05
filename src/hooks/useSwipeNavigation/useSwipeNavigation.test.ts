import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { useSwipeNavigation } from "./useSwipeNavigation";

describe("useSwipeNavigation", () => {
  const onNext = vi.fn();
  const onPrev = vi.fn();
  const props = { onNext, onPrev, threshold: 50, speed: 100 };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it("should initialize in idle state", () => {
    const { result } = renderHook(() => useSwipeNavigation(props));
    
    expect(result.current.isAnimating).toBe(false);
    expect(result.current.getSwipeStyle().transform).toContain("translateX(0px)");
  });

  it("should handle swipe left (next)", () => {
    const { result } = renderHook(() => useSwipeNavigation(props));
    
    act(() => {
      // @ts-expect-error - Mocking partial touch event
      result.current.handleTouchStart({ targetTouches: [{ clientX: 200 }] });
    });

    act(() => {
      // @ts-expect-error - Mocking partial touch event
      result.current.handleTouchMove({ targetTouches: [{ clientX: 100 }] });
    });

    // diff = 200 - 100 = 100 (> 50 threshold)
    act(() => {
      // @ts-expect-error - Mocking partial touch event
      result.current.handleTouchEnd({ changedTouches: [{ clientX: 100 }] });
    });

    expect(result.current.isAnimating).toBe(true);
    
    act(() => {
      vi.advanceTimersByTime(props.speed);
    });

    expect(onNext).toHaveBeenCalled();
    
    act(() => {
      vi.advanceTimersByTime(props.speed);
    });

    expect(result.current.isAnimating).toBe(false);
  });

  it("should handle swipe right (prev)", () => {
    const { result } = renderHook(() => useSwipeNavigation(props));
    
    act(() => {
      // @ts-expect-error - Mocking partial touch event
      result.current.handleTouchStart({ targetTouches: [{ clientX: 100 }] });
    });

    act(() => {
      // @ts-expect-error - Mocking partial touch event
      result.current.handleTouchMove({ targetTouches: [{ clientX: 200 }] });
    });

    // diff = 100 - 200 = -100 (|diff| > 50 threshold)
    act(() => {
      // @ts-expect-error - Mocking partial touch event
      result.current.handleTouchEnd({ changedTouches: [{ clientX: 200 }] });
    });

    expect(result.current.isAnimating).toBe(true);
    
    act(() => {
      vi.advanceTimersByTime(props.speed);
    });

    expect(onPrev).toHaveBeenCalled();
    
    act(() => {
      vi.advanceTimersByTime(props.speed);
    });

    expect(result.current.isAnimating).toBe(false);
  });

  it("should ignore swipes below threshold", () => {
    const { result } = renderHook(() => useSwipeNavigation(props));
    
    act(() => {
      // @ts-expect-error - Mocking partial touch event
      result.current.handleTouchStart({ targetTouches: [{ clientX: 100 }] });
    });

    act(() => {
      // @ts-expect-error - Mocking partial touch event
      result.current.handleTouchEnd({ changedTouches: [{ clientX: 120 }] });
    });

    expect(result.current.isAnimating).toBe(false);
    expect(onNext).not.toHaveBeenCalled();
    expect(onPrev).not.toHaveBeenCalled();
  });
});
