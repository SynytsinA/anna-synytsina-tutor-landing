import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { useGrinchGame } from "./useGrinchGame";

class MockAudio {
  play = vi.fn().mockResolvedValue(undefined);
  pause = vi.fn();
  currentTime = 0;
  volume = 1;
}
global.Audio = MockAudio as unknown as typeof Audio;

describe("useGrinchGame", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useGrinchGame());

    expect(result.current.pool.length).toBeGreaterThan(0);
    expect(result.current.evenBox).toEqual([]);
    expect(result.current.oddBox).toEqual([]);
    expect(result.current.isComplete).toBe(false);
  });

  it("should process correct even move", () => {
    const { result } = renderHook(() => useGrinchGame());
    const evenNum = result.current.pool.find(n => n % 2 === 0)!;

    act(() => {
      result.current.handleTouchDrop(evenNum, "zone-even");
    });

    expect(result.current.evenBox).toContain(evenNum);
    expect(result.current.pool).not.toContain(evenNum);
  });

  it("should process correct odd move", () => {
    const { result } = renderHook(() => useGrinchGame());
    const oddNum = result.current.pool.find(n => n % 2 !== 0)!;

    act(() => {
      result.current.handleTouchDrop(oddNum, "zone-odd");
    });

    expect(result.current.oddBox).toContain(oddNum);
    expect(result.current.pool).not.toContain(oddNum);
  });

  it("should handle incorrect move with error flash", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useGrinchGame());
    const evenNum = result.current.pool.find(n => n % 2 === 0)!;

    act(() => {
      result.current.handleTouchDrop(evenNum, "zone-odd");
    });

    expect(result.current.errorFlash).toBe("odd");
    expect(result.current.evenBox).not.toContain(evenNum);

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(result.current.errorFlash).toBe(null);
    vi.useRealTimers();
  });

  it("should mark as complete when pool is empty", () => {
    const { result } = renderHook(() => useGrinchGame());

    const poolCopy = [...result.current.pool];
    poolCopy.forEach(num => {
      act(() => {
        result.current.handleTouchDrop(num, num % 2 === 0 ? "zone-even" : "zone-odd");
      });
    });

    expect(result.current.pool.length).toBe(0);
    expect(result.current.isComplete).toBe(true);
  });
});
