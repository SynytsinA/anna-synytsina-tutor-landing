import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { Toy } from "./Toy";

if (typeof window !== "undefined") {
  window.HTMLElement.prototype.setPointerCapture = vi.fn();
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  window.HTMLElement.prototype.hasPointerCapture = vi.fn().mockReturnValue(true);
}

describe("Toy", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.elementFromPoint = vi.fn();
  });

  it("renders the number correctly", () => {
    render(<Toy num={7} />);
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("renders tree variant for variant 1 (num % 5 === 1)", () => {
    const { container } = render(<Toy num={1} />);
    expect(container.querySelector("path[fill='url(#treeGrad)']")).toBeInTheDocument();
  });

  it("renders star variant for variant 2 (num % 5 === 2)", () => {
    const { container } = render(<Toy num={2} />);
    expect(container.querySelector("path[fill='url(#starGold)']")).toBeInTheDocument();
  });

  it("renders candy cane variant for variant 3 (num % 5 === 3)", () => {
    const { container } = render(<Toy num={3} />);
    expect(container.querySelector("pattern[id='candyStripes']")).toBeInTheDocument();
  });

  it("renders circular variant for variant 0 and 4", () => {
    const { container: container0 } = render(<Toy num={5} />);
    expect(container0.querySelector("[data-testid='toy-body']")).toBeInTheDocument();

    const { container: container4 } = render(<Toy num={4} />);
    expect(container4.querySelector("[data-testid='toy-body']")).toBeInTheDocument();
  });

  it("handles dragging behavior when isDraggable is true", () => {
    const { container } = render(<Toy num={1} isDraggable={true} />);
    const toy = container.firstChild as HTMLElement;

    fireEvent.pointerDown(toy, { clientX: 10, clientY: 10, button: 0 });
    expect(toy.setPointerCapture).toHaveBeenCalled();
    expect(toy.style.zIndex).toBe("1000");

    fireEvent.pointerMove(toy, { clientX: 50, clientY: 50 });
    expect(toy.style.transform).toBe("translate(40px, 40px) scale(1.1)");

    fireEvent.pointerUp(toy, { clientX: 50, clientY: 50 });
    expect(toy.releasePointerCapture).toHaveBeenCalled();
    expect(toy.style.transform).toBe("");
  });

  it("calls onTouchDrop when dropped over a valid zone", () => {
    const onTouchDrop = vi.fn();
    const { container } = render(
      <Toy num={1} isDraggable={true} onTouchDrop={onTouchDrop} />
    );
    const toy = container.firstChild as HTMLElement;

    const mockZone = document.createElement("div");
    mockZone.id = "zone-even";
    mockZone.className = "drop-zone";

    vi.mocked(document.elementFromPoint).mockReturnValue(mockZone);

    fireEvent.pointerDown(toy, { clientX: 10, clientY: 10, button: 0 });
    fireEvent.pointerMove(toy, { clientX: 20, clientY: 20 });
    fireEvent.pointerUp(toy, { clientX: 20, clientY: 20 });

    expect(onTouchDrop).toHaveBeenCalledWith(1, "zone-even");
  });

  it("does not drag when isDraggable is false", () => {
    const { container } = render(<Toy num={1} isDraggable={false} />);
    const toy = container.firstChild as HTMLElement;

    fireEvent.pointerDown(toy, { clientX: 10, clientY: 10, button: 0 });
    expect(toy.setPointerCapture).not.toHaveBeenCalled();
  });
});
