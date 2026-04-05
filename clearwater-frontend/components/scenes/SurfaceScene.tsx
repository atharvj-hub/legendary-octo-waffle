"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

export default function SurfaceScene() {
  const compRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: compRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(compRef.current, {
        scale: 1.05,
        skewY: 1,
        yPercent: 4,
        filter: "blur(4px) brightness(0.97)",
        ease: "none",
      }, 0);

      tl.to(overlayRef.current, {
        opacity: 0.72,
        ease: "none",
      }, 0.28);

      tl.to(shimmerRef.current, {
        opacity: 0.12,
        ease: "none",
      }, 0.05);

      gsap.to(shimmerRef.current, {
        backgroundPosition: "200% 0",
        repeat: -1,
        duration: 7,
        ease: "linear",
      });
    }, compRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={compRef} className="surface-scene-v2" id="surface-section">
      <div ref={shimmerRef} className="surface-light-shimmer" />
      <div className="surface-water-distort" />
      <div ref={overlayRef} className="surface-dark-overlay" />
      <div className="surface-title">Surface</div>
    </section>
  );
}
