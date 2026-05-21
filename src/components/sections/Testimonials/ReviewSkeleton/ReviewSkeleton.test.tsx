import { render } from "@testing-library/react";
import React from "react";
import { describe, it, expect } from "vitest";

import { ReviewSkeleton } from "./ReviewSkeleton";

describe("ReviewSkeleton Component", () => {
  it("renders correctly with default props (not modal)", () => {
    const { container } = render(<ReviewSkeleton />);
    
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toBeInTheDocument();
    
    // Check for default classes
    expect(mainDiv).toHaveClass("w-full");
    expect(mainDiv).toHaveClass("max-h-[550px]");
    
    // Check that it doesn't have modal classes
    expect(mainDiv).not.toHaveClass("h-[80vh]");
  });

  it("renders correctly with isModal=true", () => {
    const { container } = render(<ReviewSkeleton isModal={true} />);
    
    const mainDiv = container.firstChild as HTMLElement;
    
    // Check for modal specific classes
    expect(mainDiv).toHaveClass("h-[80vh]");
    expect(mainDiv).toHaveClass("sm:h-[95vh]");
    expect(mainDiv).toHaveClass("sm:rounded-[40px]");
    
    // Check that it doesn't have default classes
    expect(mainDiv).not.toHaveClass("max-h-[550px]");
  });
});
