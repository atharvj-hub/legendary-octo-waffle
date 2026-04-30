import HeroSection from '@/components/sections/HeroSection';
import ScrollStorySection from '@/components/sections/ScrollStorySection';
import UploadSection from '@/components/sections/UploadSection';
import TeamConstellation from '@/components/TeamConstellation';
import JamPoster from '@/components/sections/JamPoster';

export default function HomePage() {
  return (
    <main className="relative w-full overflow-hidden">
      <div className="brutalist-box m-4 p-8 bg-white border-8 border-black">
        <h1 className="text-6xl md:text-8xl font-display text-center uppercase tracking-tighter text-black mb-4">
          Clearwater <span className="text-red-600">Maximalist</span>
        </h1>
        <p className="text-center font-mono text-xl uppercase font-bold text-black border-t-4 border-b-4 border-black py-4">
          Bold • Colourful • Brutalism • Three.js
        </p>
      </div>

      <JamPoster />

      <HeroSection />
      <ScrollStorySection />
      <UploadSection />
      <TeamConstellation />
    </main>
  );
}
