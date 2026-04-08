'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { campaignAssets } from '../../lib/assets/manifest';
import { gsap } from '../../lib/gsap';

const prompts = [
  '/recover reef pigments',
  '/lift abyss detail',
  '/restore diver silhouette',
];

export default function HeroScene() {
  const compRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const creditsRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const promptsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (rightRef.current) gsap.set(rightRef.current, { x: 32, scale: 1, filter: 'blur(0px) brightness(1)' });

      if (headingRef.current) gsap.to(headingRef.current, {
        y: -5,
        duration: 2.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      if (coreRef.current) {
        gsap.to(coreRef.current, {
          y: -8,
          rotate: 0.6,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      gsap.to('.core-scan', {
        yPercent: 160,
        duration: 3.8,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }, compRef);

    return () => ctx.revert();
  }, []);

  const scrollToLab = () => {
    const labSection = document.getElementById('lab-section');
    labSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" ref={compRef} id="hero-section">
      <Image
        src={campaignAssets.hero.plate.path}
        alt={campaignAssets.hero.plate.alt}
        fill
        sizes="100vw"
        className="scene-plate hero-plate"
        data-depth="background"
      />
      <div className="hero-left" ref={leftRef} data-depth="foreground">
        <p className="eyebrow" ref={eyebrowRef}>Project - 2026</p>
        <h2 className="hero-h" ref={headingRef} data-breathe>The ocean holds<br />secrets. <em>We restore</em><br />what was lost.</h2>
        <p className="hero-body" ref={bodyRef}>A hybrid deep-learning system combining Dark Channel Prior physics modeling with a custom U-Net architecture to restore clarity, color, and detail from degraded underwater imagery.</p>
        <div className="hero-credits" ref={creditsRef}>
          <div className="credit">
            <span className="credit-lbl">Domain</span>
            <span className="credit-val">Computer Vision</span>
          </div>
          <div className="credit">
            <span className="credit-lbl">Backend</span>
            <span className="credit-val">FastAPI - Python</span>
          </div>
          <div className="credit">
            <span className="credit-lbl">Model</span>
            <span className="credit-val">DCP + U-Net</span>
          </div>
        </div>
        <div className="hero-prompts">
          {prompts.map((prompt, index) => (
            <button
              key={prompt}
              type="button"
              className="hero-chip"
              ref={(element) => {
                if (element) {
                  promptsRef.current[index] = element;
                }
              }}
              onClick={scrollToLab}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
      <div className="hero-right" ref={rightRef} data-depth="mid">
        <div className="ring r1" />
        <div className="ring r2" />
        <div className="ring r3" />
        <div className="crosshair" />
        <div className="restoration-core" ref={coreRef} aria-hidden="true">
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
        <div className="dot d1" />
        <div className="dot d2" />
        <div className="dot d3" />
        <div className="stat s1">
          <span className="stat-n">6ch</span>
          <span className="stat-l">Feature fusion</span>
        </div>
        <div className="stat s2">
          <span className="stat-n">512x512</span>
          <span className="stat-l">Input resolution</span>
        </div>
      </div>
    </section>
  );
}
