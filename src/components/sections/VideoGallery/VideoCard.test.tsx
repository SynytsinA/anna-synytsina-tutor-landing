import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi } from "vitest";

import { LanguageProvider } from "@/context/LanguageContext";

import { VideoCard } from "./VideoCard";

const mockVideo = {
  id: 1,
  src: "/videos/urok-matematyky.mp4",
  poster: "/videos/math-poster.jpg",
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
        onToggle={() => { }}
      />
    );

    // In UA: "Математика" for "urok-matematyky"
    expect(screen.getByText("Математика")).toBeInTheDocument();
    const videoElement = document.querySelector("video");
    expect(videoElement).toHaveAttribute("poster", mockVideo.poster);
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

  it("shows play icon when not playing and loaded", async () => {
    renderWithLanguage(
      <VideoCard
        video={mockVideo}
        isPlaying={false}
        onToggle={() => { }}
      />
    );

    const video = document.querySelector("video");
    // Simulate video loaded
    await act(async () => {
      fireEvent(video!, new Event("canplay"));
    });

    expect(document.querySelector(".lucide-play")).toBeInTheDocument();
  });

  it("handles liking a video", () => {
    const onLike = vi.fn();
    renderWithLanguage(
      <VideoCard
        video={mockVideo}
        isPlaying={false}
        isLiked={false}
        onToggle={() => { }}
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
        video={{ id: 1, src: "urok-matematyky.mp4", poster: "test.jpg" }}
        isPlaying={false}
        onToggle={() => { }}
      />
    );
    expect(screen.getByText("Математика")).toBeInTheDocument();

    rerender(
      <LanguageProvider>
        <VideoCard
          video={{ id: 2, src: "urok-ukrainskoi-movy.mp4", poster: "test.jpg" }}
          isPlaying={false}
          onToggle={() => { }}
        />
      </LanguageProvider>
    );
    expect(screen.getByText("Українська мова")).toBeInTheDocument();

    rerender(
      <LanguageProvider>
        <VideoCard
          video={{ id: 3, src: "pidhotovka-do-shkoly.mp4", poster: "test.jpg" }}
          isPlaying={false}
          onToggle={() => { }}
        />
      </LanguageProvider>
    );
    expect(screen.getByText("Підготовка до школи")).toBeInTheDocument();
  });

  it("shows modal controls in modal mode", () => {
    renderWithLanguage(
      <VideoCard
        video={mockVideo}
        isPlaying={true}
        onToggle={() => { }}
        isModal={true}
      />
    );

    // In modal mode, it shows Close and Maximize/Minimize buttons
    expect(document.querySelector(".lucide-x")).toBeInTheDocument();
    expect(document.querySelector(".lucide-minimize")).toBeInTheDocument();
  });
});
