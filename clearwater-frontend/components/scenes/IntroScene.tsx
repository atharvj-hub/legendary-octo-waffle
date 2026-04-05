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
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      particlesRef.current.forEach((p) => {
        const depth = Math.random();
        let size, speed, baseOpacity;

        if (depth < 0.3) {
          // Near: bigger, faster, brighter
          size = gsap.utils.random(2, 4);
          speed = gsap.utils.random(2, 4);
          baseOpacity = 0.6;
        } else if (depth < 0.7) {
          // Mid: normal
          size = gsap.utils.random(1, 2);
          speed = gsap.utils.random(4, 7);
          baseOpacity = 0.3;
        } else {
          // Far: tiny, slow, dim
          size = gsap.utils.random(0.5, 1);
          speed = gsap.utils.random(8, 12);
          baseOpacity = 0.15;
        }

        gsap.set(p, {
          position: "absolute",
          top: () => gsap.utils.random(0, 100) + "%",
          left: () => gsap.utils.random(0, 100) + "%",
          width: size + "px",
          height: size + "px",
          opacity: baseOpacity,
        });

        gsap.to(p, {
          x: () => `+=${gsap.utils.random(-25, 25)}`,
          y: () => `-=${gsap.utils.random(60, 120)}`,
          opacity: baseOpacity + gsap.utils.random(-0.1, 0.2),
          duration: speed,
          delay: () => gsap.utils.random(0, 3),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(p, {
          y: "-=30",
          scrollTrigger: {
            trigger: compRef.current,
            scrub: true,
          },
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: compRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        },
      });

      tl.fromTo(compRef.current, {
        opacity: 0,
      }, {
        opacity: 1,
      }, 0.6);

      // Add background parallax
      tl.to(compRef.current, {
        y: "-20%",
        ease: "none",
      }, 0);

      tl.to(gridRef.current, {
        y: "-10%",
        ease: "none",
      }, 0);

      // Add foreground exaggeration
      tl.to(charsRef.current, {
        y: "-40",
        stagger: 0.03,
      }, 0.2);

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
    <section ref={compRef} className="intro-section" style={{ opacity: 0 }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} ref={(el) => { if (el) particlesRef.current[i] = el; }} />
        ))}
      </div>

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