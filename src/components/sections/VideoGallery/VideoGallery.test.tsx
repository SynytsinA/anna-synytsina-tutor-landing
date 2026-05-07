import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi } from "vitest";

import { VIDEO_GALLERY_METADATA } from "@/constants/landing";
import { LanguageProvider } from "@/context/LanguageContext";

import { VideoGallery } from "./VideoGallery";

// Mock the InteractiveSlider
vi.mock("@/components/shared/InteractiveSlider", () => ({
  InteractiveSlider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-slider">{children}</div>
  ),
}));

// Mock FadeIn
vi.mock("@/components/shared/FadeIn/FadeIn", () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderWithLanguage = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe("VideoGallery", () => {
  it("renders the gallery with title and subtitle", () => {
    renderWithLanguage(<VideoGallery />);
    
    // Check for UA translations by default
    expect(screen.getByText("Як проходять уроки")).toBeInTheDocument();
    expect(screen.getByText(/Подивіться фрагменти з реальних занять/)).toBeInTheDocument();
  });

  it("renders all videos in the slider", () => {
    renderWithLanguage(<VideoGallery />);
    const videoCards = screen.getAllByTestId("video-card");
    expect(videoCards.length).toBe(VIDEO_GALLERY_METADATA.length);
  });

  it("opens modal when fullscreen button is clicked", () => {
    renderWithLanguage(<VideoGallery />);
    
    const fullscreenButtons = document.querySelectorAll(".lucide-maximize");
    // Click the first maximize icon's parent button
    fireEvent.click(fullscreenButtons[0].closest('button')!);
    
    // Modal should appear via data-testid
    const modal = screen.getByTestId("video-modal");
    expect(modal).toBeInTheDocument();
    
    // VideoCard in modal should have a close button
    const closeButton = modal.querySelector(".lucide-x");
    expect(closeButton).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    renderWithLanguage(<VideoGallery />);
    
    // Open modal
    const fullscreenButtons = document.querySelectorAll(".lucide-maximize");
    fireEvent.click(fullscreenButtons[0].closest('button')!);
    
    // Close modal
    const modal = screen.getByTestId("video-modal");
    const closeButton = modal.querySelector(".lucide-x")?.closest('button');
    fireEvent.click(closeButton!);
    
    // Modal should be gone
    expect(screen.queryByTestId("video-modal")).not.toBeInTheDocument();
  });

  it("handles ESC key to close modal", () => {
    renderWithLanguage(<VideoGallery />);
    
    // Open modal
    const fullscreenButtons = document.querySelectorAll(".lucide-maximize");
    fireEvent.click(fullscreenButtons[0].closest('button')!);
    
    // Press ESC
    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
    
    // Modal should be gone
    expect(screen.queryByTestId("video-modal")).not.toBeInTheDocument();
  });

  it("stops background video when modal is open", () => {
    renderWithLanguage(<VideoGallery />);
    
    // Open modal for the first video
    const fullscreenButtons = document.querySelectorAll(".lucide-maximize");
    fireEvent.click(fullscreenButtons[0].closest('button')!);
    
    // Check modal exists
    expect(screen.getByTestId("video-modal")).toBeInTheDocument();
  });
});
