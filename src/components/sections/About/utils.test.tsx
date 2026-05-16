import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { getStatIcon } from "./utils";

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
