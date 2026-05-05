import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { useImagePreloader } from "./useImagePreloader";

describe("useImagePreloader", () => {
  const mockImages = ["img1.jpg", "img2.jpg"];

  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    global.Image = class {
      onload: () => void = () => {};
      onerror: () => void = () => {};
      set src(val: string) {
        // Simulate async loading with a small delay
        setTimeout(() => {
          if (val.includes("error")) {
            this.onerror();
          } else {
            this.onload();
          }
        }, 50);
      }
    } as unknown as typeof Image;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("should initialize with false state", () => {
    const { result } = renderHook(() => useImagePreloader(mockImages));
    expect(result.current).toBe(false);
  });

  it("should become true after images load and minimum delay (800ms) passes", async () => {
    const { result } = renderHook(() => useImagePreloader(mockImages));
    
    // Advance past Image timeout (50ms)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    expect(result.current).toBe(false);
    
    // Advance past minDelay (800ms total)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(800);
    });
    
    expect(result.current).toBe(true);
  });

  it("should handle image loading errors gracefully and still set loaded to true", async () => {
    const { result } = renderHook(() => useImagePreloader(["img1.jpg", "error.jpg"]));
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    
    expect(result.current).toBe(true);
  });

  it("should respect minDelay even if images load instantly", async () => {
    // Instant loading mock
    global.Image = class {
      set src(val: string) {
        // Trigger onload immediately in a microtask to ensure Promise.all sees it
        Promise.resolve().then(() => this.onload());
      }
      onload: () => void = () => {};
    } as unknown as typeof Image;

    const { result } = renderHook(() => useImagePreloader(mockImages));
    
    // Give microtasks a chance to run
    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(400);
    });
    expect(result.current).toBe(false);
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });
    
    expect(result.current).toBe(true);
  });

  it("should not update state if unmounted before completion", async () => {
    const { result, unmount } = renderHook(() => useImagePreloader(mockImages));
    
    unmount();
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    
    expect(result.current).toBe(false);
  });
});
