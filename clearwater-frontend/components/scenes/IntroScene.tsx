"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

export default function IntroScene() {
  const compRef = useRef<HTMLDivElement>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: compRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        },
      });

      tl.to(gridRef.current, { opacity: 1, duration: 1.6 }, 0)
        .to(cornersRef.current, {
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
        }, 0.3)
        .to(labelRef.current, { opacity: 1 }, 0.5)
        .to(charsRef.current, {
          y: 0,
          opacity: 1,
          stagger: 0.05,
        }, 0.7)
        .to(subRef.current, { opacity: 1 }, 1.0)
        .to(scrollRef.current, { opacity: 1 }, 1.2);

    }, compRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={compRef} className="intro-section">

      <div ref={gridRef} className="grid-bg"></div>

      {["c-tl", "c-tr", "c-bl", "c-br"].map((cls, i) => (
        <div
          key={cls}
          ref={(el) => { if (el) cornersRef.current[i] = el; }}
          className={`corner ${cls}`}
        />
      ))}

      <div className="intro-inner">
        <div ref={labelRef} className="intro-label">
          Clearwater — v1.0 • 2026
        </div>

        <h1 className="intro-title">
          {"CLEARWATER".split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => { if (el) charsRef.current[i] = el; }}
              className="char"
            >
              {char}
            </span>
          ))}
        </h1>

        <p ref={subRef} className="intro-sub">
          Underwater Image Restoration & Enhancement
        </p>
      </div>

      <div ref={scrollRef} className="scroll-hint">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>

    </section>
  );
}