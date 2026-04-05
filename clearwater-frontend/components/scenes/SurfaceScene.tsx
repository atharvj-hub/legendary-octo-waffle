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

      // 🌊 surface movement
      tl.to(compRef.current, {
        scale: 1.1,
        skewY: 2,
        filter: "blur(10px)",
      }, 0);

      // 🌊 dive darkness
      tl.to(overlayRef.current, {
        opacity: 1,
      }, 0.3);

      // 🌊 continuous ripple pulse
      gsap.to(shimmerRef.current, {
        backgroundPosition: "200% 0",
        repeat: -1,
        duration: 6,
        ease: "linear",
      });

    }, compRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={compRef} className="surface-scene-v2">
      {/* 🌊 light shimmer */}
      <div ref={shimmerRef} className="surface-light-shimmer" />

      {/* 🌊 water distortion layer */}
      <div className="surface-water-distort" />

      {/* 🌊 dark dive overlay */}
      <div ref={overlayRef} className="surface-dark-overlay" />

      {/* 🌊 title */}
      <div className="surface-title">
        Surface
      </div>
    </section>
  );
}
