"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { SplitChars } from "../../lib/splitText";

/**
 * SurfaceScene — The opening chapter. No images.
 * Uses a procedural dark gradient + geometric grid overlay.
 * Characters reveal letter-by-letter via the master timeline.
 */
export default function SurfaceScene() {
  const reducedMotion = useReducedMotion();
  const compRef = useRef<HTMLElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([contentRef.current, shimmerRef.current], { opacity: 1, y: 0 });
        return;
      }

      const q = gsap.utils.selector(compRef.current);

      gsap.set(contentRef.current, { opacity: 0, y: 28 });
      gsap.set(q(".split-char"), { opacity: 0, y: 40, rotateX: 45, transformOrigin: "50% 100%" });
      gsap.set(q(".surface-copy"), { opacity: 0, y: 24 });
      gsap.set(q(".surface-meta div"), { opacity: 0, y: 20 });

      // Shimmer loop
      if (shimmerRef.current) {
        gsap.to(shimmerRef.current, {
          backgroundPosition: "200% 0",
          repeat: -1,
          duration: 7,
          ease: "linear",
        });
      }
    }, compRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={compRef} className="surface-scene-v2" id="surface-section">
      {/* Procedural gradient background — no images */}
      <div className="scene-gradient surface-gradient" aria-hidden="true" />
      <div className="scene-grid" aria-hidden="true" />
      <div ref={shimmerRef} className="surface-light-shimmer" />
      <div ref={contentRef} className="surface-cover">
        <p className="surface-kicker">Ocean vision campaign · 2026</p>
        <h1 className="surface-heading" data-breathe>
          <SplitChars text="The Clearwater Edition" className="split-char" />
        </h1>
        <p className="surface-copy">
          Underwater image restoration and enhancement through physics-guided deep learning.
        </p>
        <dl className="surface-meta">
          <div>
            <dt>Project</dt>
            <dd>DCP + U-Net restoration system</dd>
          </div>
          <div>
            <dt>Team</dt>
            <dd>Atharv Jandial, Advitya Sharma, Darsh Dhawan, Divij Singh Soodan</dd>
          </div>
          <div>
            <dt>Flow</dt>
            <dd>Surface to signal in one short dive</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
