'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

export default function HeroScene() {
  const compRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const creditsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { y: 24 });
      if (headingRef.current) gsap.set(headingRef.current, { y: 24 });

      // ── ENTER ANIMATIONS (trigger-based, one-shot) ──
      const heroTrig = { trigger: compRef.current, start: 'top 72%' };

      gsap.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, scrollTrigger: heroTrig });
      gsap.to(headingRef.current, { opacity: 1, y: 0, duration: 0.9, delay: 0.15, scrollTrigger: heroTrig });
      gsap.to(bodyRef.current, { opacity: 1, duration: 0.8, delay: 0.35, scrollTrigger: heroTrig });
      gsap.to(creditsRef.current, { opacity: 1, duration: 0.8, delay: 0.55, scrollTrigger: heroTrig });
      gsap.to(rightRef.current, { opacity: 1, x: 0, duration: 1.1, delay: 0.25, scrollTrigger: heroTrig });

      // ── CINEMATIC CONTROL LAYER (scroll-scrubbed) ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: compRef.current,
          start: 'top center',
          end: '+=100%',
          scrub: true,
        },
      });

      // 1. DEPTH ZOOM — camera slowly pushing forward
      tl.to(compRef.current, {
        scale: 1.08,
        ease: 'none',
      }, 0);

      // 2. FOCUS PULL — background blurs, foreground stays sharp
      tl.to(rightRef.current, {
        filter: 'blur(5px)',
        ease: 'none',
      }, 0.1);

      // 3. FOREGROUND PRIORITY — text floats upward into focus
      tl.to(leftRef.current, {
        y: -40,
        ease: 'none',
      }, 0);

      // 4. BACKGROUND PARALLAX — right side moves slower
      tl.to(rightRef.current, {
        y: '-8%',
        ease: 'none',
      }, 0);

      // 5. CONTRAST CONTROL — underwater depth pressure
      tl.to(compRef.current, {
        filter: 'brightness(0.88) saturate(0.92)',
        ease: 'none',
      }, 0.3);

    }, compRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={compRef}>
      <div className="hero-left" ref={leftRef}>
        <p className="eyebrow" ref={eyebrowRef}>Project &mdash; 2026</p>
        <h2 className="hero-h" ref={headingRef}>The ocean holds<br />secrets. <em>We restore</em><br />what was lost.</h2>
        <p className="hero-body" ref={bodyRef}>A hybrid deep-learning system combining Dark Channel Prior physics modeling with a custom U-Net architecture to restore clarity, color, and detail from degraded underwater imagery.</p>
        <div className="hero-credits" ref={creditsRef}>
          <div className="credit">
            <span className="credit-lbl">Domain</span>
            <span className="credit-val">Computer Vision</span>
          </div>
          <div className="credit">
            <span className="credit-lbl">Backend</span>
            <span className="credit-val">FastAPI · Python</span>
          </div>
          <div className="credit">
            <span className="credit-lbl">Model</span>
            <span className="credit-val">DCP + U-Net</span>
          </div>
        </div>
      </div>
      <div className="hero-right" ref={rightRef}>
        <div className="ring r1"></div>
        <div className="ring r2"></div>
        <div className="ring r3"></div>
        <div className="crosshair"></div>
        <div className="dot d1"></div>
        <div className="dot d2"></div>
        <div className="dot d3"></div>
        <div className="stat s1">
          <span className="stat-n">6ch</span>
          <span className="stat-l">Feature fusion</span>
        </div>
        <div className="stat s2">
          <span className="stat-n">512²</span>
          <span className="stat-l">Input resolution</span>
        </div>
      </div>
    </section>
  );
}
