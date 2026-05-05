import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { FAQ } from "@/components/sections/FAQ";
import { GamesSection } from "@/components/sections/GamesSection";
import { GlobalClassroom } from "@/components/sections/GlobalClassroom";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { VideoGallery } from "@/components/sections/VideoGallery";

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
