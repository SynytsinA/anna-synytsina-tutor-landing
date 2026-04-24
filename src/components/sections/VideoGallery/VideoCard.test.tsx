import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { VideoCard } from "./VideoCard";
import { LanguageProvider } from "@/context/LanguageContext";

const mockVideo = {
  id: 1,
  src: "/videos/math-lesson.mp4",
};

const renderWithLanguage = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe("VideoCard", () => {
  it("renders correctly with given video data", () => {
    renderWithLanguage(
      <VideoCard 
        video={mockVideo} 
        isPlaying={false} 
        onToggle={() => {}} 
      />
    );
    
    expect(screen.getByText("Математика")).toBeInTheDocument();
    const videoElement = document.querySelector("video");
    expect(videoElement).toHaveAttribute("src", mockVideo.src);
  });

  it("calls onToggle when clicked", () => {
    const onToggle = vi.fn();
    renderWithLanguage(
      <VideoCard 
        video={mockVideo} 
        isPlaying={false} 
        onToggle={onToggle} 
      />
    );
    
    const container = screen.getByTestId("video-card");
    fireEvent.click(container); 
    expect(onToggle).toHaveBeenCalled();
  });

  it("shows play icon when not playing", () => {
    renderWithLanguage(
      <VideoCard 
        video={mockVideo} 
        isPlaying={false} 
        onToggle={() => {}} 
      />
    );
    // Lucide-react icons usually have a data-testid if we add it, 
    // otherwise we can look for svg
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("handles liking a video", () => {
    const onLike = vi.fn();
    renderWithLanguage(
      <VideoCard 
        video={mockVideo} 
        isPlaying={false} 
        isLiked={false}
        onToggle={() => {}} 
        onLike={onLike}
      />
    );
    
    const heartIcon = document.querySelector(".lucide-heart");
    expect(heartIcon).toBeInTheDocument();
    fireEvent.click(heartIcon!);
    expect(onLike).toHaveBeenCalled();
  });

  it("displays correct category label based on filename", () => {
    const { rerender } = renderWithLanguage(
      <VideoCard 
        video={{ src: "test-math.mp4" }} 
        isPlaying={false} 
        onToggle={() => {}} 
      />
    );
    expect(screen.getByText("Математика")).toBeInTheDocument();

    rerender(
      <LanguageProvider>
        <VideoCard 
          video={{ src: "ukrainian-language-demo.mp4" }} 
          isPlaying={false} 
          onToggle={() => {}} 
        />
      </LanguageProvider>
    );
    expect(screen.getByText("Українська мова")).toBeInTheDocument();

    rerender(
      <LanguageProvider>
        <VideoCard 
          video={{ src: "grinch-lesson.mp4" }} 
          isPlaying={false} 
          onToggle={() => {}} 
        />
      </LanguageProvider>
    );
    expect(screen.getByText("Тематичний урок")).toBeInTheDocument();
  });
});
