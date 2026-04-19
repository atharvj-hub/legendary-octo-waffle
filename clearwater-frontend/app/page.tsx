import HeroSection       from '@/components/sections/HeroSection';
import ScrollStorySection from '@/components/sections/ScrollStorySection';
import UploadSection      from '@/components/sections/UploadSection';
import TeamConstellation  from '@/components/TeamConstellation';

function Nav() {
  return (
    <nav className="sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm text-white">
        <a href="#hero" className="font-semibold">
          Clearwater
        </a>
        <div className="flex gap-6">
          <a href="#hero">Home</a>
          <a href="#upload">Upload</a>
          <a href="#team">Team</a>
        </div>
      </div>
    </nav>
  );
}

export default function HomePage() {
  return (
    <>
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