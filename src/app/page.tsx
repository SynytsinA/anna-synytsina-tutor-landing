import dynamic from "next/dynamic";
import { Suspense } from "react";

import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { FAQ } from "@/components/sections/FAQ";
import { GamesSectionSkeleton } from "@/components/sections/GamesSection/GamesSectionSkeleton";
import { GlobalClassroom } from "@/components/sections/GlobalClassroom";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { VideoGallerySkeleton } from "@/components/sections/VideoGallery/VideoGallerySkeleton";

const VideoGallery = dynamic(
  () => import("@/components/sections/VideoGallery").then((m) => m.VideoGallery),
  {
    ssr: true,
    loading: () => <VideoGallerySkeleton />,
  }
);

const GamesSection = dynamic(
  () => import("@/components/sections/GamesSection").then((m) => m.GamesSection),
  {
    ssr: true,
    loading: () => <GamesSectionSkeleton />,
  }
);

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Approach />
      <Suspense fallback={<VideoGallerySkeleton />}>
        <VideoGallery />
      </Suspense>
      <Suspense fallback={<GamesSectionSkeleton />}>
        <GamesSection />
      </Suspense>
      <GlobalClassroom />
      <Testimonials />
      <FAQ />
    </main>
  );
}

