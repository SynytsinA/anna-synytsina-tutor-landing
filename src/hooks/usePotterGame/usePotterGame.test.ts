import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { usePotterGame } from "./usePotterGame";
import { POTTER_PUZZLES_UA } from "@/constants/game";

class MockAudio {
  play = vi.fn().mockResolvedValue(undefined);
  pause = vi.fn();
  currentTime = 0;
  volume = 1;
}
global.Audio = MockAudio as unknown as typeof Audio;

describe("usePotterGame", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => usePotterGame("ua"));

    expect(result.current.inputs).toEqual({});
    expect(result.current.completed).toEqual({});
    expect(result.current.allFinished).toBe(false);
    expect(result.current.currentPuzzles).toEqual(POTTER_PUZZLES_UA);
  });

  it("should handle correct input change", () => {
    const { result } = renderHook(() => usePotterGame("ua"));
    const firstPuzzle = POTTER_PUZZLES_UA[0];
    const onFocusNext = vi.fn();

    act(() => {
      result.current.handleInputChange(firstPuzzle.id, firstPuzzle.answer, onFocusNext);
    });

    expect(result.current.inputs[firstPuzzle.id]).toBe(firstPuzzle.answer);
    expect(result.current.completed[firstPuzzle.id]).toBe(true);
    expect(onFocusNext).toHaveBeenCalledWith(firstPuzzle.id);
  });

  it("should handle incorrect input change", () => {
    const { result } = renderHook(() => usePotterGame("ua"));
    const firstPuzzle = POTTER_PUZZLES_UA[0];
    const onFocusNext = vi.fn();

    act(() => {
      result.current.handleInputChange(firstPuzzle.id, "WRONG", onFocusNext);
    });

    expect(result.current.inputs[firstPuzzle.id]).toBe("WRONG");
    expect(result.current.completed[firstPuzzle.id]).toBeFalsy();
    expect(onFocusNext).not.toHaveBeenCalled();
  });

  it("should calculate progress percent correctly", () => {
    const { result } = renderHook(() => usePotterGame("ua"));
    const firstPuzzle = POTTER_PUZZLES_UA[0];

    act(() => {
      result.current.handleInputChange(firstPuzzle.id, firstPuzzle.answer, () => { });
    });

    const expectedPercent = (1 / POTTER_PUZZLES_UA.length) * 100;
    expect(result.current.progressPercent).toBe(expectedPercent);
  });

  it("should finish game when all puzzles are solved", () => {
    const { result } = renderHook(() => usePotterGame("ua"));

    POTTER_PUZZLES_UA.forEach(puzzle => {
      act(() => {
        result.current.handleInputChange(puzzle.id, puzzle.answer, () => { });
      });
    });

    expect(result.current.allFinished).toBe(true);
  });
});
