import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { ReviewCard } from "./ReviewCard";

// Mock external components
interface MockImageProps {
  src: string;
  alt: string;
  onLoad?: () => void;
  "data-testid"?: string;
}

vi.mock("next/image", () => ({
  default: ({ src, alt, onLoad, "data-testid": testId }: MockImageProps) => {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={src}
        alt={alt}
        data-testid={testId || "mock-image"}
        onLoad={onLoad}
      />
    );
  },
}));

vi.mock("@/components/ui/Avatar", () => ({
  Avatar: ({ username }: { username: string }) => (
    <div data-testid="mock-avatar">{username}</div>
  ),
}));

vi.mock("../ReviewSkeleton", () => ({
  ReviewSkeleton: () => <div data-testid="mock-skeleton">Skeleton</div>,
}));

vi.mock("lucide-react", () => ({
  Heart: () => <div data-testid="mock-heart" />,
  Send: () => <div data-testid="mock-send" />,
  MoreHorizontal: () => <div data-testid="mock-more" />,
  X: () => <div data-testid="mock-x" />,
}));

vi.mock("./utils", () => ({
  getGradientClass: () => "mock-gradient",
}));

describe("ReviewCard Component", () => {
  const mockItem = {
    id: 1,
    username: "john_doe",
    time: "2h",
    image: "/mock-image.png",
    alt: "Mock Review Image",
    text: "Great tutor!",
  };

  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders user information correctly", () => {
    render(<ReviewCard item={mockItem} index={0} />);
    
    expect(screen.getAllByText("john_doe").length).toBeGreaterThan(0);
    expect(screen.getByText("2h")).toBeInTheDocument();
    expect(screen.getByTestId("mock-avatar")).toHaveTextContent("john_doe");
  });

  it("calls onClick when the card is clicked", () => {
    const { container } = render(<ReviewCard item={mockItem} index={0} onClick={mockOnClick} />);
    
    fireEvent.click(container.firstChild as HTMLElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("displays skeleton initially and hides it after image loads", () => {
    render(<ReviewCard item={mockItem} index={0} />);
    
    const skeletonContainer = screen.getByTestId("mock-skeleton").parentElement;
    const contentContainer = screen.getAllByText("john_doe")[0].closest(".mock-gradient");
    
    // Initially, isLoading is true, so skeleton is visible (opacity-100) and content is hidden (opacity-0)
    expect(skeletonContainer).toHaveClass("opacity-100");
    expect(contentContainer).toHaveClass("opacity-0");

    // Simulate image load
    const img = screen.getByTestId("mock-image");
    fireEvent.load(img);

    // After load, skeleton is hidden (opacity-0) and content is visible (opacity-100)
    expect(skeletonContainer).toHaveClass("opacity-0");
    expect(contentContainer).toHaveClass("opacity-100");
  });

  it("renders close icon (X) when not in modal mode", () => {
    render(<ReviewCard item={mockItem} index={0} />);
    expect(screen.getByTestId("mock-x")).toBeInTheDocument();
  });

  it("hides close icon (X) when in modal mode", () => {
    render(<ReviewCard item={mockItem} index={0} isModal={true} />);
    expect(screen.queryByTestId("mock-x")).not.toBeInTheDocument();
  });
});
