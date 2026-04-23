import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MainLayout } from "./MainLayout";

// Mock Navbar and Footer
vi.mock("@/components/shared/Navbar", () => ({
  Navbar: ({ t }: any) => <nav data-testid="mock-navbar">{t.logo}</nav>,
}));

vi.mock("@/components/shared/Footer", () => ({
  Footer: ({ t }: any) => <footer data-testid="mock-footer">{t.title}</footer>,
}));

describe("MainLayout", () => {
  it("renders Navbar, Footer and children within LanguageProvider", () => {
    render(
      <MainLayout>
        <div data-testid="child">Main Content</div>
      </MainLayout>
    );

    expect(screen.getByTestId("mock-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Main Content")).toBeInTheDocument();
  });

  it("passes translations from context to Navbar and Footer", () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    // Default language is 'ua' which has specific translations in data.ts
    // In our mocks we render logo and title
    // Let's check for UA specific content (or handle as generic depending on data.ts)
    // Logo is "Синиціна Анна" in UA
    expect(screen.getByTestId("mock-navbar")).toHaveTextContent("Синиціна Анна");
    // Footer title is "Готові почати?" in UA
    expect(screen.getByTestId("mock-footer")).toHaveTextContent("Готові почати?");
  });
});
