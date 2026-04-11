'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../lib/useReducedMotion';

const prompts = [
  '/recover reef pigments',
  '/lift abyss detail',
  '/restore diver silhouette',
];

import { SplitChars, FloatingStat } from '../../lib/splitText';

export default function HeroScene() {
  const reducedMotion = useReducedMotion();
  const compRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(compRef.current);

      gsap.set(q(".hero-split-char"), { opacity: 0, y: 32, rotateX: 40, transformOrigin: "50% 100%" });
      gsap.set(q(".floating-stat"), { opacity: 0, y: 40, scale: 0.92 });

      if (reducedMotion) {
        gsap.set(q(".hero-split-char"), { opacity: 1, y: 0, rotateX: 0 });
        gsap.set(q(".floating-stat"), { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // Subtle idle breathing on heading
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          y: -5, duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true,
        });
      }

      // Procedural core idle rotation
      if (coreRef.current) {
        gsap.to(coreRef.current, {
          y: -8, rotate: 0.6, duration: 4.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
        });
      }

      gsap.to('.core-scan', {
        yPercent: 160, duration: 3.8, repeat: -1, ease: 'sine.inOut',
      });
    }, compRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollToLab = () => {
    document.getElementById('lab-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const line1 = "The ocean holds";
  const line2 = "secrets. ";
  const line2em = "We restore";
  const line3 = "what was lost.";

  return (
    <section className="hero-section" ref={compRef} id="hero-section">
      {/* Procedural gradient background — no images */}
      <div className="scene-gradient hero-gradient" aria-hidden="true" />
      <div className="scene-grid" aria-hidden="true" />

      <div className="hero-left" data-depth="foreground">
        <p className="eyebrow">Project · 2026</p>
        <h2 className="hero-h" ref={headingRef} data-breathe aria-label="The ocean holds secrets. We restore what was lost.">
          <span className="hero-line"><SplitChars text={line1} offset={0} className="hero-split-char" /></span>
          <br />
          <span className="hero-line">
            <SplitChars text={line2} offset={line1.length} className="hero-split-char" />
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
              <SplitChars text={line2em} offset={line1.length + line2.length} className="hero-split-char" />
            </em>
          </span>
          <br />
          <span className="hero-line"><SplitChars text={line3} offset={line1.length + line2.length + line2em.length} className="hero-split-char" /></span>
        </h2>
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
        <div className="hero-prompts">
          {prompts.map((prompt) => (
            <button key={prompt} type="button" className="hero-chip" onClick={scrollToLab}>{prompt}</button>
          ))}
        </div>
      </div>

      <div className="hero-right" ref={coreRef}>
        <div className="ring r1" />
        <div className="ring r2" />
        <div className="ring r3" />
        <div className="crosshair" />
        <div className="restoration-core" aria-hidden="true">
          <div className="core-beam b1" />
          <div className="core-beam b2" />
          <div className="core-shell">
            <div className="core-before">raw</div>
            <div className="core-after">restored</div>
            <div className="core-scan" />
            <div className="core-split" />
            <div className="core-aperture" />
          </div>
        </div>
        {/* Floating stats — animated by master timeline */}
        <FloatingStat value="6ch" label="Feature fusion" className="stat-float-1" />
        <FloatingStat value="512×512" label="Input resolution" className="stat-float-2" />
        <div className="dot d1" />
        <div className="dot d2" />
        <div className="dot d3" />
      </div>
    </section>
  );
}
