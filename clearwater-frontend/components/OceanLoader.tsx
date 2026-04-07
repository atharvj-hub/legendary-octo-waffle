"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

export default function OceanLoader() {
  const [isMounted, setIsMounted] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const foamRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.set(root, { autoAlpha: 1 });
      gsap.set(titleRef.current, { autoAlpha: 0, y: 18, filter: "blur(5px)" });
      gsap.set(waveRef.current, { yPercent: 112, scaleY: 0.78, rotate: -1.4 });
      gsap.set(flashRef.current, { autoAlpha: 0, scale: 0.82 });
      gsap.set(foamRefs.current, { autoAlpha: 0, scale: 0.5, y: 20 });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          document.body.style.overflow = previousOverflow;
          setIsMounted(false);
        },
      });

      timeline
        .to(titleRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55 })
        .to(foamRefs.current, {
          autoAlpha: 0.65,
          scale: 1,
          y: 0,
          duration: 0.48,
          stagger: 0.035,
          ease: "back.out(1.7)",
        }, "-=0.18")
        .to(waveRef.current, {
          yPercent: 18,
          scaleY: 1.08,
          rotate: 0.6,
          duration: 0.82,
          ease: "expo.inOut",
        }, "-=0.12")
        .to(flashRef.current, {
          autoAlpha: 1,
          scale: 1.08,
          duration: 0.16,
          ease: "power2.in",
        }, "-=0.08")
        .to(titleRef.current, {
          autoAlpha: 0,
          y: -18,
          filter: "blur(2px)",
          duration: 0.22,
          ease: "power2.in",
        }, "<")
        .to(waveRef.current, {
          yPercent: -118,
          scaleY: 1.18,
          rotate: 1.2,
          duration: 0.7,
          ease: "expo.in",
        })
        .to(flashRef.current, {
          autoAlpha: 0,
          scale: 1.24,
          duration: 0.55,
          ease: "power2.out",
        }, "-=0.46")
        .to(root, {
          autoAlpha: 0,
          duration: 0.42,
          ease: "power2.out",
        }, "-=0.24");
    }, root);

    return () => {
      document.body.style.overflow = previousOverflow;
      ctx.revert();
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ocean-loader" ref={rootRef} aria-label="Loading Clearwater experience">
      <div className="loader-current" />
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
      <div className="loader-wave" ref={waveRef} />
      <div className="loader-flash" ref={flashRef} />
    </div>
  );
}
