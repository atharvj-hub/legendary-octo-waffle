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
      path: '/campaign/images/surface/surface-threshold-wide-v001.webp',
      alt: 'Ocean surface with soft horizon light',
      notes: 'Wide matte plate for the opening scene.',
    },
    /** @placeholder — File does not exist yet. Do NOT render until asset is produced. */
    causticsLoop: {
      path: '/campaign/video/surface/surface-caustics-loop-v001.mp4',
      notes: '6 to 8 second seamless loop, muted, no audio.',
    },
  },
  intro: {
    lightBeam: {
      path: '/campaign/images/intro/intro-descent-cathedral-v001.webp',
      alt: 'Underwater cathedral descent with light shafts and reef silhouettes',
      notes: 'Can be layered over the grid background.',
    },
    /** @placeholder — File does not exist yet. Do NOT render until asset is produced. */
    particleSprite: {
      path: '/campaign/sprites/intro-particles-v001.webp',
      alt: 'Particle sprite sheet for underwater motes',
      notes: 'Optional if CSS particles are replaced later.',
    },
  },
  hero: {
    plate: {
      path: '/campaign/images/hero/hero-explorer-depth-plate-v001.webp',
      alt: 'Deep-water explorer environment with reef archive cylinders',
      notes: 'Primary premium visual for the hero scene.',
    },
    /** @placeholder — File does not exist yet. Do NOT render until asset is produced. */
    loop: {
      path: '/campaign/video/hero-depth-loop-v001.mp4',
      notes: 'Subtle environmental motion, not a narrative video.',
    },
  },
  cards: {
    reefMemory: {
      path: '/campaign/images/cards/cards-reef-memory-v001.webp',
      alt: 'Macro coral memory texture in suspended underwater particles',
      notes: 'Feature card plate for physical restoration.',
    },
    diverLens: {
      path: '/campaign/images/cards/cards-diver-lens-v001.webp',
      alt: 'Diver lens reflecting a luminous reef',
      notes: 'Feature card plate for learning and focus.',
    },
    sonarAbyss: {
      path: '/campaign/images/cards/cards-sonar-abyss-v001.webp',
      alt: 'Abstract abyssal sonar rings in deep water',
      notes: 'Feature card plate for fusion and signal arbitration.',
    },
  },
  cta: {
    portal: {
      path: '/campaign/images/cta/cta-luminous-portal-v001.webp',
      alt: 'Luminous coral portal in deep underwater light',
      notes: 'Final campaign plate for the call to action.',
    },
  },
  lab: {
    beforeDemo: {
      path: '/campaign/images/lab/lab-restored-reef-before-v001.webp',
      alt: 'Murky underwater frame before restoration',
      notes: 'Use realistic degradation, not stylized blur.',
    },
    afterDemo: {
      path: '/campaign/images/lab/lab-restored-reef-after-v001.webp',
      alt: 'Restored underwater frame after processing',
      notes: 'Keep believable recovery, avoid over-sharpening.',
    },
  },
  /** @placeholder — GLB file does not exist yet. Do NOT render until asset is produced. */
  future3d: {
    heroObject: {
      path: '/campaign/glb/hero-submersible-v001.glb',
      notes: 'Reserve for one controlled 3D moment only.',
    },
  },
} as const;

export type CampaignAssets = typeof campaignAssets;
