"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { campaignAssets } from "../../lib/assets/manifest";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";

export default function SurfaceScene() {
  const reducedMotion = useReducedMotion();
  const compRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const surfacePlateRef = useRef<HTMLImageElement>(null);
  const depthPlateRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([contentRef.current, shimmerRef.current], { opacity: 1, y: 0 });
        gsap.set(flashRef.current, { opacity: 0 });
        return;
      }

      const q = gsap.utils.selector(compRef.current);

      gsap.set(depthPlateRef.current, { opacity: 0, scale: 1.08, yPercent: 6 });
      gsap.set(contentRef.current, { opacity: 0, y: 28 });
      gsap.set(flashRef.current, { opacity: 0, scaleY: 0.12, transformOrigin: "50% 0%" });
      gsap.set(q(".split-char"), { opacity: 0, y: 40, rotateX: 45, transformOrigin: "50% 100%" });
      gsap.set(q(".surface-copy"), { opacity: 0, y: 24 });
      gsap.set(q(".surface-meta div"), { opacity: 0, y: 20 });

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(shimmerRef.current, { opacity: 0.78, duration: 0.72 })
        .to(flashRef.current, { opacity: 1, scaleY: 1, duration: 0.18, ease: "power2.in" }, "-=0.08")
        .to(flashRef.current, { opacity: 0, duration: 0.62, ease: "power2.out" })
        .to(contentRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.28")
        // Character-by-character reveal for the heading
        .to(q(".split-char"), {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.035,
          duration: 0.65,
          ease: "power3.out",
        }, "-=0.6")
        // Copy fades in after heading
        .to(q(".surface-copy"), {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        }, "-=0.3")
        // Meta cards stagger in
        .to(q(".surface-meta div"), {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.35")
        .to(shimmerRef.current, { opacity: 0.24, duration: 0.7 }, "-=0.55");

      gsap.to(shimmerRef.current, {
        backgroundPosition: "200% 0",
        repeat: -1,
        duration: 7,
        ease: "linear",
      });
    }, compRef);

    return () => ctx.revert();
  }, [reducedMotion]);

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
        data-depth="background"
      />
      <Image
        src={campaignAssets.intro.lightBeam.path}
        alt={campaignAssets.intro.lightBeam.alt}
        fill
        sizes="100vw"
        className="scene-plate surface-depth-plate"
        ref={depthPlateRef}
        data-depth="background"
      />
      <div ref={shimmerRef} className="surface-light-shimmer" data-depth="mid" />
      <div className="surface-water-distort" />
      <div ref={overlayRef} className="surface-dark-overlay" />
      <div ref={flashRef} className="surface-flash" />
      <div ref={contentRef} className="surface-cover">
        <p className="surface-kicker">Ocean vision campaign - 2026</p>
        <h1 className="surface-heading" data-breathe aria-label="The Clearwater Edition">
          {/* Character-level split for "The" */}
          <span className="surface-heading-the" aria-hidden="true">
            {"The".split("").map((char, i) => (
              <span key={`the-${i}`} className="split-char" data-index={i}>
                {char}
              </span>
            ))}
          </span>
          {/* Character-level split for "Clear" */}
          <span className="surface-heading-clear" aria-hidden="true">
            {"Clear".split("").map((char, i) => (
              <span key={`clear-${i}`} className="split-char" data-index={i + 3}>
                {char}
              </span>
            ))}
          </span>
          {/* Character-level split for "water" (italic) */}
          <em className="surface-heading-water" aria-hidden="true">
            {"water".split("").map((char, i) => (
              <span key={`water-${i}`} className="split-char" data-index={i + 8}>
                {char}
              </span>
            ))}
          </em>
          {/* Character-level split for "Edition" */}
          <span className="surface-heading-edition" aria-hidden="true">
            {"Edition".split("").map((char, i) => (
              <span key={`edition-${i}`} className="split-char" data-index={i + 13}>
                {char}
              </span>
            ))}
          </span>
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
