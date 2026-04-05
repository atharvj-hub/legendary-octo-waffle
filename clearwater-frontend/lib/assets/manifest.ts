export type StillAsset = {
  path: string;
  alt: string;
  width?: number;
  height?: number;
  notes?: string;
};

export type MotionAsset = {
  path: string;
  notes?: string;
};

export const campaignAssets = {
  surface: {
    skyPlate: {
      path: '/campaign/images/surface/surface-sky-plate-v001.avif',
      alt: 'Ocean surface with soft horizon light',
      notes: 'Wide matte plate for the opening scene.',
    },
    causticsLoop: {
      path: '/campaign/video/surface/surface-caustics-loop-v001.mp4',
      notes: '6 to 8 second seamless loop, muted, no audio.',
    },
  },
  intro: {
    lightBeam: {
      path: '/campaign/images/intro/intro-light-beam-v001.avif',
      alt: 'Underwater light shaft with particulate bloom',
      notes: 'Can be layered over the grid background.',
    },
    particleSprite: {
      path: '/campaign/sprites/intro-particles-v001.webp',
      alt: 'Particle sprite sheet for underwater motes',
      notes: 'Optional if CSS particles are replaced later.',
    },
  },
  hero: {
    plate: {
      path: '/campaign/images/hero/hero-depth-plate-v001.avif',
      alt: 'Deep-water hero environment with layered depth',
      notes: 'Primary premium visual for the hero scene.',
    },
    loop: {
      path: '/campaign/video/hero-depth-loop-v001.mp4',
      notes: 'Subtle environmental motion, not a narrative video.',
    },
  },
  cards: {
    overlay: {
      path: '/campaign/images/cards/cards-sheen-overlay-v001.avif',
      alt: 'Soft underwater sheen overlay',
      notes: 'Used for premium reflective movement on hover.',
    },
  },
  lab: {
    beforeDemo: {
      path: '/campaign/images/lab/lab-demo-before-v001.webp',
      alt: 'Murky underwater frame before restoration',
      notes: 'Use realistic degradation, not stylized blur.',
    },
    afterDemo: {
      path: '/campaign/images/lab/lab-demo-after-v001.webp',
      alt: 'Restored underwater frame after processing',
      notes: 'Keep believable recovery, avoid over-sharpening.',
    },
  },
  future3d: {
    heroObject: {
      path: '/campaign/glb/hero-submersible-v001.glb',
      notes: 'Reserve for one controlled 3D moment only.',
    },
  },
} as const;

export type CampaignAssets = typeof campaignAssets;
