import HeroSection       from '@/components/sections/HeroSection';
import ScrollStorySection from '@/components/sections/ScrollStorySection';
import UploadSection      from '@/components/sections/UploadSection';
import TeamConstellation  from '@/components/TeamConstellation';
import BackgroundFish     from '@/components/ui/BackgroundFish';
import Nav                from '@/components/ui/Nav';

export default function HomePage() {
  return (
    <>
      {/* Persistent underwater fish — z-0, pointer-events-none */}
      <BackgroundFish />

      {/* Navigation */}
      <Nav />

      <main className="relative z-10">
        {/* 1. Hero — fullscreen depth environment */}
        <HeroSection />

        {/* 2. Scroll Story — clip-path morphing narrative panels */}
        <ScrollStorySection />

        {/* 3. Upload — core interaction */}
        <UploadSection />

        {/* 4. Team Constellation */}
        <TeamConstellation />
      </main>
    </>
  );
}