import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { InstagramIcon } from "./InstagramIcon";

describe("InstagramIcon", () => {
  it("renders correctly with default props", () => {
    const { container } = render(<InstagramIcon />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
