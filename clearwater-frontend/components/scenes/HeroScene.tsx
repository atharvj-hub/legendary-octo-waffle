'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroScene() {
  const compRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set initial state matching CSS logic
      gsap.set(['.eyebrow', '.hero-h'], { y: 24 });

      const heroTrig = { trigger: '.hero-section', start: 'top 72%' };

      gsap.to('.eyebrow', { opacity: 1, y: 0, duration: 0.7, scrollTrigger: heroTrig });
      gsap.to('.hero-h',  { opacity: 1, y: 0, duration: 0.9, delay: 0.1, scrollTrigger: heroTrig });
      gsap.to('.hero-body', { opacity: 1, duration: 0.8, delay: 0.2, scrollTrigger: heroTrig });
      gsap.to('.hero-credits', { opacity: 1, duration: 0.8, delay: 0.35, scrollTrigger: heroTrig });
      gsap.to('.hero-right', { opacity: 1, x: 0, duration: 1.1, delay: 0.2, scrollTrigger: heroTrig });

    }, compRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={compRef}>
      <div className="hero-left">
        <p className="eyebrow">Project &mdash; 2026</p>
        <h2 className="hero-h">The ocean holds<br />secrets. <em>We restore</em><br />what was lost.</h2>
        <p className="hero-body">A hybrid deep-learning system combining Dark Channel Prior physics modeling with a custom U-Net architecture to restore clarity, color, and detail from degraded underwater imagery.</p>
        <div className="hero-credits">
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
      <div className="hero-right">
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
