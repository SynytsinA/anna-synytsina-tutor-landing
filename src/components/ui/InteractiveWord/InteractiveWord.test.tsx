import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, it, expect } from "vitest";

import { InteractiveWord } from "./InteractiveWord";

describe("InteractiveWord Component", () => {
  it("renders the word character by character", () => {
    render(<InteractiveWord word="Test" />);
    
    expect(screen.getByText("T")).toBeInTheDocument();
    expect(screen.getByText("e")).toBeInTheDocument();
    expect(screen.getByText("s")).toBeInTheDocument();
    expect(screen.getByText("t")).toBeInTheDocument();
  });
});
