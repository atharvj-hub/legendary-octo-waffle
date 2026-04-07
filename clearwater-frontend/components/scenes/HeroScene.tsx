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
  const promptsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { y: 24 });
      if (headingRef.current) gsap.set(headingRef.current, { y: 24 });
      if (bodyRef.current) gsap.set(bodyRef.current, { y: 24 });
      if (creditsRef.current) gsap.set(creditsRef.current, { y: 24 });
      if (promptsRef.current.length) gsap.set(promptsRef.current, { y: 16, opacity: 0 });
      if (rightRef.current) gsap.set(rightRef.current, { x: 32, scale: 1, filter: 'blur(0px) brightness(1)' });

      const headingFloat = headingRef.current ? gsap.to(headingRef.current, {
        y: -5,
        duration: 2.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        paused: true,
      }) : null;

      const heroTrig = { trigger: compRef.current, start: 'top 72%' };

      gsap.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, scrollTrigger: heroTrig });
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.15,
        scrollTrigger: heroTrig,
        onComplete: () => {
          headingFloat?.play();
        },
      });
      gsap.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.35, scrollTrigger: heroTrig });
      gsap.to(creditsRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.55, scrollTrigger: heroTrig });
      gsap.to(promptsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.6,
        ease: 'power3.out',
        scrollTrigger: heroTrig,
      });
      gsap.to(rightRef.current, { opacity: 1, x: 0, duration: 1.1, delay: 0.25, scrollTrigger: heroTrig });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: compRef.current,
          start: 'top center',
          end: '+=100%',
          scrub: true,
        },
      });

      tl.to(compRef.current, {
        scale: 1.05,
        ease: 'none',
      }, 0);

      tl.to(rightRef.current, {
        filter: 'blur(3.5px) brightness(0.92) saturate(0.9)',
        scale: 1.06,
        ease: 'none',
      }, 0.08);

      tl.to(leftRef.current, {
        y: -30,
        ease: 'none',
      }, 0);

      tl.to(rightRef.current, {
        y: '-6%',
        ease: 'none',
      }, 0);
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
      />
      <div className="hero-left" ref={leftRef}>
        <p className="eyebrow" ref={eyebrowRef}>Project - 2026</p>
        <h2 className="hero-h" ref={headingRef}>The ocean holds<br />secrets. <em>We restore</em><br />what was lost.</h2>
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
      <div className="hero-right" ref={rightRef}>
        <div className="ring r1" />
        <div className="ring r2" />
        <div className="ring r3" />
        <div className="crosshair" />
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
