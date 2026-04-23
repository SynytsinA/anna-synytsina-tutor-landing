import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Approach } from "@/components/sections/Approach";
import { VideoGallery } from "@/components/sections/VideoGallery";
import { GamesSection } from "@/components/sections/GamesSection";
import { GlobalClassroom } from "@/components/sections/GlobalClassroom";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

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
