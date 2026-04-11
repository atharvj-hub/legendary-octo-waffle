'use client';

import SplineHero from '../../components/SplineHero';
import MagneticButton from '../../components/ui/MagneticButton';
import type { Application } from '@splinetool/runtime';
import { useCallback, useState } from 'react';

/**
 * /test-3d — Isolated sandbox for proving the Spline × GSAP scroll integration.
 *
 * This page exists solely to test:
 *   1. Spline canvas loads and renders at 60fps
 *   2. GSAP ScrollTrigger drives rotation.y and scale smoothly
 *   3. MagneticButton interaction feels premium
 *   4. The depth sandwich (z-index layering) works correctly
 *
 * Gate: This must feel buttery smooth before merging into the main campaign.
 * Once confirmed, the SplineHero component moves into page.tsx as a pinned layer.
 */
export default function Test3DPage() {
  const [splineReady, setSplineReady] = useState(false);

  const handleSplineReady = useCallback((app: Application) => {
    setSplineReady(true);
    console.log('[Test3D] Spline app loaded:', app);
  }, []);

  return (
    <main>
      {/* Layer 0: The pinned Spline 3D canvas (position: fixed via .canvas-container) */}
      <SplineHero onReady={handleSplineReady} />

      {/* Layer 1+: The foreground HTML UI that scrolls over the 3D */}
      <div id="narrative-section" className="test3d-narrative">
        {/* Section 1: Opening — Spline object should be small and distant */}
        <section className="test3d-scene test3d-open">
          <div className="test3d-content layer-ui">
            <p className="test3d-kicker">
              {splineReady ? '3D Scene Active' : 'Loading 3D…'}
            </p>
            <h1 className="test3d-title">Scroll to Reveal</h1>
            <p className="test3d-body">
              The 3D object behind this text is driven entirely by GSAP ScrollTrigger.
              As you scroll, it rotates 360°, scales up at the midpoint, and rises.
            </p>
          </div>
        </section>

        {/* Section 2: Midpoint — Spline object should be rotated ~180°, fully scaled */}
        <section className="test3d-scene test3d-mid">
          <div className="test3d-content layer-ui">
            <h2 className="test3d-title">The Midpoint</h2>
            <p className="test3d-body">
              At 50% scroll progress, the object has turned 180° and is at maximum scale (1.15×).
              The depth sandwich keeps this text crisp and selectable above the WebGL canvas.
            </p>
            <div className="test3d-stats layer-mid">
              <div className="floating-spec">
                <span className="floating-stat-value">360°</span>
                <span className="floating-stat-label">Full rotation</span>
              </div>
              <div className="floating-spec">
                <span className="floating-stat-value">1.15×</span>
                <span className="floating-stat-label">Peak scale</span>
              </div>
              <div className="floating-spec">
                <span className="floating-stat-value">60fps</span>
                <span className="floating-stat-label">Target framerate</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Exit — Spline object should be back to origin rotation, fading */}
        <section className="test3d-scene test3d-exit">
          <div className="test3d-content layer-ui">
            <h2 className="test3d-title">The Exit</h2>
            <p className="test3d-body">
              The object completes its 360° rotation and returns to baseline scale.
              In the real campaign, this is where the lab UI would take over.
            </p>
            <MagneticButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Back to Top ↑
            </MagneticButton>
          </div>
        </section>
      </div>
    </main>
  );
}
