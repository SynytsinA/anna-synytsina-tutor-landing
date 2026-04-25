import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Footer } from "./Footer";

// Mock FadeIn to avoid intersection observer overhead in unit test
vi.mock("@/components/shared/FadeIn", () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("Footer", () => {
  const mockTranslations = {
    title: "Contacts",
    sub: "Get in touch with us",
    cta: "Message us on Instagram",
    copyright: "All rights reserved",
    waitingMsg: "Waiting for you!",
  };

  it("renders correctly with translations", () => {
    render(<Footer t={mockTranslations} />);

    expect(screen.getByText("Contacts")).toBeInTheDocument();
    expect(screen.getByText("Get in touch with us")).toBeInTheDocument();
    expect(screen.getByText("Message us on Instagram")).toBeInTheDocument();
    expect(screen.getByText("Waiting for you!")).toBeInTheDocument();
    
    const copyrightRegex = new RegExp(`© ${new Date().getFullYear()} All rights reserved`, "i");
    expect(screen.getByText(copyrightRegex)).toBeInTheDocument();
  });

  it("contains a link to Instagram", () => {
    render(<Footer t={mockTranslations} />);
    
    const instaLink = screen.getByRole("link", { name: /Message us on Instagram/i });
    expect(instaLink).toBeInTheDocument();
    expect(instaLink).toHaveAttribute("target", "_blank");
  });

  it("renders the teacher image", () => {
    render(<Footer t={mockTranslations} />);
    
    const img = screen.getByAltText(/Teacher Anna Class/i);
    expect(img).toBeInTheDocument();
  });
});
