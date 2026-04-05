"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

export default function IntroScene() {
  const compRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(labelRef.current, { y: 18 });
      gsap.set(subRef.current, { y: 18 });
      gsap.set(scrollRef.current, { y: 18 });

      particlesRef.current.forEach((particle) => {
        const depth = Math.random();
        let size = 1;
        let speed = 5;
        let baseOpacity = 0.25;

        if (depth < 0.3) {
          size = gsap.utils.random(2, 4);
          speed = gsap.utils.random(2, 4);
          baseOpacity = 0.55;
        } else if (depth < 0.7) {
          size = gsap.utils.random(1, 2);
          speed = gsap.utils.random(4, 7);
          baseOpacity = 0.28;
        } else {
          size = gsap.utils.random(0.5, 1);
          speed = gsap.utils.random(8, 12);
          baseOpacity = 0.15;
        }

        gsap.set(particle, {
          position: "absolute",
          top: () => `${gsap.utils.random(0, 100)}%`,
          left: () => `${gsap.utils.random(0, 100)}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: baseOpacity,
        });

        gsap.to(particle, {
          x: () => `+=${gsap.utils.random(-25, 25)}`,
          y: () => `-=${gsap.utils.random(60, 120)}`,
          opacity: baseOpacity + gsap.utils.random(-0.08, 0.18),
          duration: speed,
          delay: () => gsap.utils.random(0, 3),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(particle, {
          y: "-=36",
          scrollTrigger: {
            trigger: compRef.current,
            scrub: true,
          },
        });
      });

      gsap.to(beamRef.current, {
        xPercent: 8,
        yPercent: -6,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(veilRef.current, {
        yPercent: -5,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: compRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        },
      });

      tl.fromTo(compRef.current, { opacity: 0 }, { opacity: 1 }, 0.55);
      tl.to(compRef.current, { y: "-18%", ease: "none" }, 0);
      tl.to(gridRef.current, { y: "-10%", ease: "none" }, 0);
      tl.to(beamRef.current, { yPercent: -18, opacity: 0.42, ease: "none" }, 0.05);
      tl.to(veilRef.current, { yPercent: -10, opacity: 0.86, ease: "none" }, 0);
      tl.to(charsRef.current, { y: "-34", stagger: 0.025, ease: "none" }, 0.2);

      tl.to(gridRef.current, { opacity: 1, duration: 1.4 }, 0)
        .to(cornersRef.current, {
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
        }, 0.25)
        .to(labelRef.current, { opacity: 1, y: 0 }, 0.45)
        .to(charsRef.current, {
          y: 0,
          opacity: 1,
          stagger: 0.045,
        }, 0.68)
        .to(subRef.current, { opacity: 1, y: 0 }, 0.95)
        .to(scrollRef.current, { opacity: 1, y: 0 }, 1.1);
    }, compRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={compRef} id="intro-section" className="intro-section" style={{ opacity: 0 }}>
      <div className="intro-beam" ref={beamRef} />
      <div className="intro-veil" ref={veilRef} />

      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
        {Array.from({ length: 36 }).map((_, index) => (
          <div
            key={index}
            ref={(element) => {
              if (element) {
                particlesRef.current[index] = element;
              }
            }}
          />
        ))}
      </div>

      <div ref={gridRef} className="grid-bg" />

      {["c-tl", "c-tr", "c-bl", "c-br"].map((className, index) => (
        <div
          key={className}
          ref={(element) => {
            if (element) {
              cornersRef.current[index] = element;
            }
          }}
          className={`corner ${className}`}
        />
      ))}

      <div className="intro-inner">
        <div ref={labelRef} className="intro-label">
          Clearwater - expedition log - 2026
        </div>

        <h1 className="intro-title">
          {"CLEARWATER".split("").map((char, index) => (
            <span
              key={index}
              ref={(element) => {
                if (element) {
                  charsRef.current[index] = element;
                }
              }}
              className="char"
            >
              {char}
            </span>
          ))}
        </h1>

        <p ref={subRef} className="intro-sub">
          Underwater image restoration and enhancement
        </p>
      </div>

      <div ref={scrollRef} className="scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
