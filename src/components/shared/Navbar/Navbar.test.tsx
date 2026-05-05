import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { Navbar } from "./Navbar";

// Mock next/link to simplify navigation testing
vi.mock("next/link", () => ({
  default: ({ children, href, onClick, className }: { children: React.ReactNode; href: string; onClick?: () => void; className?: string }) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  ),
}));

describe("Navbar", () => {
  const mockTranslations = {
    logo: "Anna Tutoring",
    toggle: "UA/EN",
    menuLabels: {
      about: "About",
      services: "Services",
    },
    a11y: {
      menu: "Menu",
      close: "Close",
    },
  };
  const mockToggleLang = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
  });

  it("renders correctly with translations", () => {
    render(<Navbar t={mockTranslations} toggleLang={mockToggleLang} />);

    expect(screen.getByText("Anna Tutoring")).toBeInTheDocument();
    expect(screen.getAllByText("Services").length).toBeGreaterThan(0);
    expect(screen.getAllByText("About").length).toBeGreaterThan(0);
  });

  it("calls toggleLang when the language button is clicked", () => {
    render(<Navbar t={mockTranslations} toggleLang={mockToggleLang} />);
    
    // desktop button
    const toggleButton = screen.getByText("UA/EN");
    fireEvent.click(toggleButton);
    
    expect(mockToggleLang).toHaveBeenCalledTimes(1);
  });

  it("opens mobile menu when hamburger icon is clicked", () => {
    render(<Navbar t={mockTranslations} toggleLang={mockToggleLang} />);
    
    // Find the button that is likely the burger menu (the one with 'lg:hidden' class)
    const buttons = screen.getAllByRole("button");
    const burgerButton = buttons.find(b => b.className.includes("lg:hidden"));
    
    if (!burgerButton) throw new Error("Burger button not found");
    
    fireEvent.click(burgerButton);
    
    // Mobile menu items should now be visible (though we don't test CSS visibility strictly in JSDOM, 
    // the state-driven classes will be applied)
    // The mobile menu also contains the menu labels.
    const mobileLinks = screen.getAllByText("Services");
    expect(mobileLinks.length).toBeGreaterThan(1); // One for desktop, one for mobile
  });

  it("updates background when scrolled", () => {
    render(<Navbar t={mockTranslations} toggleLang={mockToggleLang} />);
    
    const nav = screen.getByRole("navigation");
    expect(nav).not.toHaveClass("bg-white/95");

    // Simulate scroll
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    
    // Note: window.scrollY doesn't update automatically in JSDOM fireEvent
    // We might need to mock it if the component relies on it.
    Object.defineProperty(window, 'scrollY', { value: 100 });
    fireEvent.scroll(window);
    
    expect(nav).toHaveClass("bg-white/95");
  });
});
