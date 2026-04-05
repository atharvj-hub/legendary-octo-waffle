import CampaignRail from '../components/CampaignRail';
import SurfaceScene from '../components/scenes/SurfaceScene';
import IntroScene from '../components/scenes/IntroScene';
import HeroScene from '../components/scenes/HeroScene';
import CardsScene from '../components/scenes/CardsScene';
import CTAScene from '../components/scenes/CTAScene';
import LabScene from '../components/scenes/LabScene';

export default function Home() {
  return (
    <main>
      <CampaignRail />
      <SurfaceScene />
      <IntroScene />
      <HeroScene />
      <CardsScene />
      <CTAScene />
      <LabScene />
    </main>
  );
}
