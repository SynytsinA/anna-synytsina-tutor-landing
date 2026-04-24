import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { VideoGallery } from "./VideoGallery";
import { LanguageProvider } from "@/context/LanguageContext";
import { VIDEO_GALLERY_METADATA } from "@/constants/landing";

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
    fireEvent.click(fullscreenButtons[0].closest('button')!);
    
    // Modal should appear
    const modal = document.querySelector(".fixed.inset-0");
    expect(modal).toBeInTheDocument();
    
    // VideoCard in modal should have a close button
    const closeButton = document.querySelector(".lucide-x");
    expect(closeButton).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    renderWithLanguage(<VideoGallery />);
    
    // Open modal
    const fullscreenButtons = document.querySelectorAll(".lucide-maximize");
    fireEvent.click(fullscreenButtons[0].closest('button')!);
    
    // Close modal
    const closeButton = document.querySelector(".lucide-x")?.closest('button');
    fireEvent.click(closeButton!);
    
    // Modal should be gone
    const modal = document.querySelector(".fixed.inset-0");
    expect(modal).not.toBeInTheDocument();
  });

  it("handles ESC key to close modal", () => {
    renderWithLanguage(<VideoGallery />);
    
    // Open modal
    const fullscreenButtons = document.querySelectorAll(".lucide-maximize");
    fireEvent.click(fullscreenButtons[0].closest('button')!);
    
    // Press ESC
    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
    
    // Modal should be gone
    const modal = document.querySelector(".fixed.inset-0");
    expect(modal).not.toBeInTheDocument();
  });

  it("stops background video when modal is open", () => {
    renderWithLanguage(<VideoGallery />);
    
    // Start playing the first video in the slider
    const videoCards = screen.getAllByTestId("video-card");
    fireEvent.click(videoCards[0]);
    
    // Open modal for the first video
    const fullscreenButtons = document.querySelectorAll(".lucide-maximize");
    fireEvent.click(fullscreenButtons[0].closest('button')!);
    
    // When modal is open, ALL background slider cards should show the play icon (opacity-100)
    // because background playback is explicitly disabled via (modalVideoId === null && ...)
    const sliderPlayIcons = document.querySelectorAll("[data-testid='video-card']:not(.modal-card) .opacity-100");
    expect(sliderPlayIcons.length).toBeGreaterThanOrEqual(VIDEO_GALLERY_METADATA.length);
  });
});
