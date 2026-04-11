'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Application, SPEObject } from '@splinetool/runtime';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';

// Lazy-load Spline to avoid blocking initial paint (Step 5 performance guard)
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="spline-loading">
      <span className="spline-loading-text">Loading 3D scene…</span>
    </div>
  ),
});

/**
 * PLACEHOLDER_SCENE_URL
 * ─────────────────────
 * Replace this with your actual Spline scene URL once the Restoration Lens is built.
 * The only code change required is swapping this single string.
 *
 * Current: Spline's public "Floating Laptop" demo scene (a good test for rotation scrub).
 * To use your own: Export from Spline → Code → React → copy the URL.
 */
const PLACEHOLDER_SCENE_URL =
  'https://prod.spline.design/6Wq1Q7YGyM-uBq42/scene.splinecode';

/**
 * The name of the 3D object inside the Spline scene that GSAP will control.
 * When you build the real Restoration Lens in Spline, name the root object "RestorationLens".
 */
const TARGET_OBJECT_NAME = 'RestorationLens';

interface SplineHeroProps {
  /** Optional override scene URL */
  sceneUrl?: string;
  /** Called when the Spline app finishes loading and is ready for GSAP */
  onReady?: (app: Application) => void;
  /** Whether to show the component (for lab handoff visibility toggle) */
  visible?: boolean;
}

export default function SplineHero({
  sceneUrl = PLACEHOLDER_SCENE_URL,
  onReady,
  visible = true,
}: SplineHeroProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const splineApp = useRef<Application | null>(null);
  const targetObject = useRef<SPEObject | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  /** Capture the Spline Application instance when the scene loads */
  const handleLoad = useCallback(
    (app: Application) => {
      splineApp.current = app;

      // Try to find the named target object
      try {
        const obj = app.findObjectByName(TARGET_OBJECT_NAME);
        if (obj) {
          targetObject.current = obj;
        }
      } catch {
        // Object not found — expected with placeholder scenes.
        // GSAP scrub will gracefully no-op.
        console.info(
          `[SplineHero] Object "${TARGET_OBJECT_NAME}" not found in scene. ` +
          `This is expected with placeholder scenes. GSAP scrub will still run.`
        );
      }

      setIsLoaded(true);
      onReady?.(app);
    },
    [onReady]
  );

  /** Wire GSAP ScrollTrigger to drive Spline object rotation + scale */
  useEffect(() => {
    if (!isLoaded || reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Master scroll-driven animation for the 3D object
      gsap.timeline({
        scrollTrigger: {
          trigger: '#narrative-section',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2, // Smooth Apple-like scrubbing
          onUpdate: (self) => {
            const obj = targetObject.current;
            if (!obj) return;

            const progress = self.progress;

            // Rotation: full 360° turn over the scroll (0 → 2π)
            obj.rotation.y = progress * Math.PI * 2;

            // Scale: subtle zoom 1.0 → 1.15 at midpoint, back to 1.0
            const scaleCurve = 1 + 0.15 * Math.sin(progress * Math.PI);
            obj.scale.x = scaleCurve;
            obj.scale.y = scaleCurve;
            obj.scale.z = scaleCurve;

            // Opacity via emissive intensity or position shift
            // (Spline materials don't expose opacity, so we use Y position)
            // Rise: object floats up slightly as user scrolls deeper
            obj.position.y = progress * -20;
          },
        },
      });
    }, container);

    return () => ctx.revert();
  }, [isLoaded, reducedMotion]);

  // Reduced motion: skip the entire Spline canvas
  if (reducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="canvas-container"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease-out',
        display: visible ? 'block' : 'none',
      }}
    >
      <Spline scene={sceneUrl} onLoad={handleLoad} />
      {!isLoaded && (
        <div className="spline-loading">
          <span className="spline-loading-text">Initialising 3D…</span>
        </div>
      )}
    </div>
  );
}
