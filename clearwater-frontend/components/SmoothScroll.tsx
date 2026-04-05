"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "../lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.065,
      syncTouch: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.08,
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    frame = requestAnimationFrame(raf);
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
