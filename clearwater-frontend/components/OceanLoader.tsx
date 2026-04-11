"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../lib/useReducedMotion";

export default function OceanLoader() {
  const reducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const absorptionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const foamRefs = useRef<HTMLSpanElement[]>([]);
  const particleRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const root = rootRef.current;
    if (!root) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const pageTargets = [
      document.querySelector<HTMLElement>(".campaign-timeline"),
      document.getElementById("nav"),
    ].filter((target): target is HTMLElement => Boolean(target));

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      gsap.set(root, { autoAlpha: 1 });
      gsap.set(titleRef.current, { autoAlpha: 0, y: 18, filter: "blur(5px)" });
      gsap.set(waveRef.current, { yPercent: 118, scaleY: 0.72, rotate: -1.6 });
      gsap.set(flashRef.current, { autoAlpha: 0, scale: 0.82 });
      gsap.set(absorptionRef.current, { autoAlpha: 0 });
      gsap.set(foamRefs.current, { autoAlpha: 0, scale: 0.5, y: 20 });
      gsap.set(particleRefs.current, { autoAlpha: 0, y: 20, scale: 0.7 });
      gsap.set(pageTargets, { filter: "blur(0px) brightness(1)", willChange: "filter" });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          document.body.style.overflow = previousOverflow;
          gsap.set(pageTargets, { clearProps: "filter,willChange" });
          setIsMounted(false);
        },
      });

      timeline
        .to(titleRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.72, ease: "power3.out" })
        .to(foamRefs.current, {
          autoAlpha: 0.42,
          scale: 0.86,
          y: 4,
          duration: 0.55,
          stagger: 0.035,
          ease: "sine.out",
        }, "-=0.2")
        .to(waveRef.current, {
          yPercent: 78,
          scaleY: 0.86,
          rotate: -0.7,
          duration: 0.58,
          ease: "sine.inOut",
        }, "-=0.08")
        .to(foamRefs.current, {
          autoAlpha: 0.9,
          scale: 1.12,
          y: -10,
          duration: 0.42,
          stagger: 0.018,
          ease: "back.out(1.8)",
        }, "-=0.12")
        .to(waveRef.current, {
          yPercent: 10,
          scaleY: 1.12,
          rotate: 0.5,
          duration: 0.78,
          ease: "power3.inOut",
        }, "-=0.36")
        .to(pageTargets, {
          filter: "blur(6px) brightness(0.7)",
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.58")
        .to([root, ...pageTargets], {
          x: "+=2",
          yoyo: true,
          repeat: 3,
          duration: 0.05,
          ease: "power1.inOut",
        }, "-=0.18")
        .to(flashRef.current, {
          autoAlpha: 1,
          scale: 1.1,
          duration: 0.14,
          ease: "power2.in",
        }, "-=0.05")
        .to(titleRef.current, {
          autoAlpha: 0,
          y: -18,
          filter: "blur(3px)",
          duration: 0.18,
          ease: "power3.in",
        }, "<")
        .to(root, { backgroundColor: "#020617", duration: 1, ease: "power2.inOut" }, "<")
        .to(absorptionRef.current, { autoAlpha: 1, duration: 1, ease: "power2.inOut" }, "<")
        .fromTo(particleRefs.current,
          { autoAlpha: 0, y: 20, scale: 0.7 },
          { autoAlpha: 0.6, y: 0, scale: 1, duration: 1.2, stagger: 0.02, ease: "power2.out" },
          "+=0.08"
        )
        .to(waveRef.current, {
          yPercent: -18,
          scaleY: 0.46,
          rotate: 0.2,
          clipPath: "polygon(0 43%, 8% 39%, 17% 45%, 26% 40%, 36% 44%, 47% 38%, 58% 45%, 68% 40%, 78% 44%, 88% 39%, 100% 43%, 100% 60%, 0 60%)",
          filter: "blur(1.5px) saturate(0.9) brightness(1.08)",
          duration: 0.72,
          ease: "power3.out",
        }, "-=0.74")
        .to(root, {
          opacity: 0.52,
          duration: 0.6,
          ease: "power2.out",
        }, "<")
        .to(absorptionRef.current, {
          autoAlpha: 0,
          duration: 0.55,
          ease: "power2.out",
        }, "<")
        .to(q(".loader-current, .loader-particles"), {
          autoAlpha: 0,
          duration: 0.45,
          ease: "power2.out",
        }, "<")
        .to(pageTargets, {
          filter: "blur(0px) brightness(1)",
          duration: 0.62,
          ease: "power2.out",
        }, "<")
        .to(flashRef.current, {
          autoAlpha: 0,
          scale: 1.24,
          duration: 0.62,
          ease: "power2.out",
        }, "<")
        .to(waveRef.current, {
          yPercent: -58,
          scaleY: 0.22,
          autoAlpha: 0,
          duration: 0.7,
          ease: "sine.inOut",
        }, "-=0.08")
        .to(root, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            // Bug 1 fix: Force-reveal surface content the instant the loader dies
            gsap.to([
              '.surface-cover',
              '.surface-kicker',
              '.surface-copy',
              '.surface-meta div',
            ], {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out',
              stagger: 0.12,
              clearProps: 'transform', // Let scroll timeline take over after
            });

            // Reveal the split characters with a staggered typing effect
            gsap.to('.split-char', {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.025,
              clearProps: 'transform',
            });

            // Ensure background plates are visible
            gsap.to('[data-depth="background"]', {
              opacity: 1,
              filter: 'none',
              duration: 0.6,
            });
          },
        }, "<");
    }, root);

    return () => {
      document.body.style.overflow = previousOverflow;
      gsap.set(pageTargets, { clearProps: "filter,willChange" });
      ctx.revert();
    };
  }, [reducedMotion]);

  if (!isMounted || reducedMotion) {
    return null;
  }

  return (
    <div className="ocean-loader" ref={rootRef} aria-label="Loading Clearwater experience">
      <div className="loader-current" />
      <div className="loader-absorption" ref={absorptionRef} />
      <div className="loader-title" ref={titleRef} aria-hidden="true">
        <span>The</span>
        <strong>Clear</strong>
        <em>water</em>
      </div>
      <div className="loader-foam" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, index) => (
          <span
            key={index}
            ref={(element) => {
              if (element) {
                foamRefs.current[index] = element;
              }
            }}
          />
        ))}
      </div>
      <div className="loader-particles" aria-hidden="true">
        {Array.from({ length: 42 }).map((_, index) => (
          <span
            key={index}
            className="loader-particle"
            ref={(element) => {
              if (element) {
                particleRefs.current[index] = element;
              }
            }}
          />
        ))}
      </div>
      <div className="loader-wave" ref={waveRef} />
      <div className="loader-flash" ref={flashRef} />
    </div>
  );
}
