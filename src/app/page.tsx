import { Hero } from "@/components/shared/Hero";
import { About } from "@/components/shared/About";
import { Services } from "@/components/shared/Services";
import { Approach } from "@/components/shared/Approach";
import { VideoGallery } from "@/components/shared/VideoGallery";
import { GamesSection } from "@/components/shared/GamesSection";
import { GlobalClassroom } from "@/components/shared/GlobalClassroom";
import { Testimonials } from "@/components/shared/Testimonials";
import { FAQ } from "@/components/shared/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Approach />
      <VideoGallery />
      <GamesSection />
      <GlobalClassroom />
      <Testimonials />
      <FAQ />
    </main>
  );
}
