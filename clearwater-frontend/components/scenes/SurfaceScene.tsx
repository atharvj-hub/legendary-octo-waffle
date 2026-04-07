"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { campaignAssets } from "../../lib/assets/manifest";
import { gsap } from "../../lib/gsap";

export default function SurfaceScene() {
  const compRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const surfacePlateRef = useRef<HTMLImageElement>(null);
  const depthPlateRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(depthPlateRef.current, { opacity: 0, scale: 1.08, yPercent: 6 });
      gsap.set(contentRef.current, { opacity: 0, y: 28 });
      gsap.set(flashRef.current, { opacity: 0, scaleY: 0.12, transformOrigin: "50% 0%" });

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(shimmerRef.current, { opacity: 0.78, duration: 0.72 })
        .to(flashRef.current, { opacity: 1, scaleY: 1, duration: 0.18, ease: "power2.in" }, "-=0.08")
        .to(flashRef.current, { opacity: 0, duration: 0.62, ease: "power2.out" })
        .to(contentRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.28")
        .to(shimmerRef.current, { opacity: 0.24, duration: 0.7 }, "-=0.55");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: compRef.current,
          start: "top top",
          end: "+=72%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(surfacePlateRef.current, {
        scale: 1.1,
        yPercent: -8,
        filter: "blur(3px) brightness(0.86) saturate(0.92)",
        ease: "none",
      }, 0);

      tl.to(depthPlateRef.current, {
        opacity: 0.42,
        scale: 1.02,
        yPercent: -2,
        ease: "none",
      }, 0.04);

      tl.to(overlayRef.current, {
        opacity: 0.46,
        ease: "none",
      }, 0.18);

      tl.to(shimmerRef.current, {
        opacity: 0.16,
        ease: "none",
      }, 0.05);

      tl.to(contentRef.current, {
        y: -24,
        opacity: 0.86,
        ease: "none",
      }, 0.06);

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
      <Image
        src={campaignAssets.surface.skyPlate.path}
        alt={campaignAssets.surface.skyPlate.alt}
        fill
        priority
        sizes="100vw"
        className="scene-plate surface-plate"
        ref={surfacePlateRef}
      />
      <Image
        src={campaignAssets.intro.lightBeam.path}
        alt={campaignAssets.intro.lightBeam.alt}
        fill
        sizes="100vw"
        className="scene-plate surface-depth-plate"
        ref={depthPlateRef}
      />
      <div ref={shimmerRef} className="surface-light-shimmer" />
      <div className="surface-water-distort" />
      <div ref={overlayRef} className="surface-dark-overlay" />
      <div ref={flashRef} className="surface-flash" />
      <div ref={contentRef} className="surface-cover">
        <p className="surface-kicker">Ocean vision campaign - 2026</p>
        <h1 className="surface-heading">Clearwater</h1>
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
            <dd>Clearwater research group</dd>
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
