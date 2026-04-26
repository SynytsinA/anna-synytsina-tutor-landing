import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders the first letter of the username", () => {
    render(<Avatar username="Anna" />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("has correct aria-label", () => {
    render(<Avatar username="Anna" />);
    expect(screen.getByLabelText(/Avatar for Anna/i)).toBeInTheDocument();
  });
});
