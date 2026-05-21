import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { useServices } from "@/hooks/useServices";

import { Services } from "./Services";

vi.mock("@/components/shared/FadeIn", () => ({
  FadeIn: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="mock-fade-in">
      {children}
    </div>
  ),
}));

vi.mock("./utils", () => ({
  getIcon: () => <div data-testid="mock-icon">Icon</div>,
  getBgClass: () => "mock-bg-class",
}));

vi.mock("@/hooks/useServices", () => ({
  useServices: vi.fn(),
}));

describe("Services Component", () => {
  const mockCards = [
    {
      icon: "backpack",
      title: "Service 1",
      desc: "Description 1",
      list: ["Item 1", "Item 2"],
    },
    {
      icon: "book",
      title: "Service 2",
      desc: "Description 2",
      list: ["Item 3"],
    },
  ];

  const mockServicesData = {
    t: {
      title: "Our Services",
    },
    cards: mockCards,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useServices).mockReturnValue(mockServicesData as unknown as ReturnType<typeof useServices>);
  });

  it("renders the section title", () => {
    render(<Services />);
    expect(screen.getByText("Our Services")).toBeInTheDocument();
  });

  it("renders the correct number of service cards", () => {
    render(<Services />);

    const icons = screen.getAllByTestId("mock-icon");
    expect(icons).toHaveLength(2);

    expect(screen.getByText("Service 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();

    expect(screen.getByText("Service 2")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("passes correct classes from utils", () => {
    render(<Services />);

    const iconContainers = screen.getAllByTestId("mock-icon").map(el => el.parentElement);
    expect(iconContainers[0]).toHaveClass("mock-bg-class");
    expect(iconContainers[1]).toHaveClass("mock-bg-class");
  });
});
