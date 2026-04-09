/**
 * CampaignTimeline — Master animation system for the campaign page.
 *
 * ANIMATION OWNERSHIP RULE (10.10):
 * All scroll-triggered story pacing (reveals, transitions, parallax depth)
 * is centralised here via a single master ScrollTrigger timeline.
 *
 * Local scene components (HeroScene, CTAScene, OceanLoader, card hover handlers)
 * should own ONLY:
 *   - Idle loops (e.g. floating motion, breathing)
 *   - Hover / pointer feedback
 *   - Click animations
 *
 * Do NOT add scroll-triggered timelines in individual scene files.
 * This keeps the campaign pacing predictable and avoids conflicts.
 */
"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../lib/useReducedMotion";

type CampaignTimelineProps = {
  children: ReactNode;
};

const wavePathA = "M0,100 C300,180 600,20 900,100 C1200,180 1440,60 1440,60 L1440,200 L0,200 Z";
const wavePathB = "M0,120 C300,60 600,160 900,80 C1200,40 1440,140 1440,140 L1440,200 L0,200 Z";
const transitionBeats = [0.14, 0.33, 0.6, 0.8];
const particleCount = 56;

const ambientParticles = Array.from({ length: particleCount }, (_, index) => ({
  left: (index * 19 + (index % 7) * 9) % 100,
  top: (index * 31 + (index % 5) * 13) % 100,
  size: 1.5 + (index % 4) * 0.65,
  opacity: 0.18 + (index % 5) * 0.06,
}));

export default function CampaignTimeline({ children }: CampaignTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const revealTargets = [
        ...q(".hero-left"),
        ...q(".hero-left .eyebrow"),
        ...q(".hero-h"),
        ...q(".hero-body"),
        ...q(".hero-credits"),
        ...q(".hero-chip"),
        ...q(".hero-right"),
        ...q(".cards-copy"),
        ...q(".card"),
        ...q(".cta-lbl"),
        ...q(".cta-body"),
        ...q(".cta-chip"),
        ...q(".enter-btn"),
        ...q(".lab-hdr"),
        ...q(".lab-wrap"),
      ];

      gsap.set(revealTargets, { opacity: 0, y: 30 });
      gsap.set(q("[data-depth='background']"), { yPercent: 0, scale: 1.03 });
      gsap.set(q("[data-depth='mid']"), { yPercent: 0 });
      gsap.set(q("[data-depth='foreground']"), { yPercent: 0 });
      gsap.set(q(".campaign-light-pass"), { autoAlpha: 0.68, xPercent: -120 });
      gsap.set(q(".campaign-particle"), { autoAlpha: 0.18, x: 0, y: 0 });
      gsap.set(q(".card, .hero-chip, .cta-chip, .upload-z"), { "--panel-breath": 0.04 });
      gsap.set(q(".campaign-wave-transition"), { autoAlpha: 0, yPercent: 96, scaleY: 0.94 });

      if (reducedMotion) {
        gsap.set(revealTargets, { opacity: 1, y: 0 });
        gsap.set(q("[data-depth='background'], [data-depth='mid'], [data-depth='foreground']"), { yPercent: 0, scale: 1 });
        gsap.set(q(".campaign-light-pass, .campaign-particle, .campaign-wave-transition"), { autoAlpha: 0 });
        return;
      }

      gsap.to(q(".campaign-light-pass"), {
        xPercent: 120,
        duration: 7.2,
        repeat: -1,
        ease: "none",
      });

      gsap.to(q(".campaign-ambient-drift"), {
        xPercent: -3,
        yPercent: -1.6,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(q(".campaign-particle"), {
        y: () => gsap.utils.random(-18, -44),
        x: () => gsap.utils.random(-10, 12),
        autoAlpha: () => gsap.utils.random(0.24, 0.62),
        duration: () => gsap.utils.random(3.2, 6.8),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.035,
          from: "random",
        },
      });

      gsap.to(q(".card, .hero-chip, .cta-chip, .upload-z"), {
        "--panel-breath": 0.12,
        duration: () => gsap.utils.random(3.4, 5.8),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.12,
          from: "random",
        },
      });

      gsap.to(q(".campaign-wave-path, .campaign-wave-depth, .campaign-wave-highlight, .campaign-wave-caustic-path"), {
        attr: { d: wavePathB },
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(q(".campaign-wave-displacement"), {
        attr: { scale: 10 },
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(q(".campaign-wave-drift"), {
        x: -80,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(q(".campaign-wave-material"), {
        scaleY: 1.02,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(q(".campaign-wave-caustics"), {
        backgroundPosition: "180% 0",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const masterTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.65,
        },
      });

      masterTimeline
        .to(q("[data-depth='background']"), { yPercent: -5, scale: 1.055, stagger: 0.02 }, 0)
        .to(q("[data-depth='mid']"), { yPercent: -10, stagger: 0.02 }, 0)
        .to(q("[data-depth='foreground']"), { yPercent: -14, stagger: 0.02 }, 0)
        .to(q(".surface-cover"), { y: -10, opacity: 0.88 }, 0.04)
        .to(q(".surface-depth-plate"), { opacity: 0.46, yPercent: -5, scale: 1.02 }, 0.06)
        .to(q(".surface-plate"), { filter: "blur(1.6px) brightness(0.92) saturate(0.86)" }, 0.07)
        .to(q(".surface-dark-overlay"), { opacity: 0.34 }, 0.1)
        .to(q(".hero-left"), { opacity: 1, y: 0, duration: 0.1 }, 0.18)
        .to(q(".hero-left .eyebrow, .hero-h, .hero-body, .hero-credits, .hero-chip"), {
          opacity: 1,
          y: 0,
          stagger: 0.012,
          duration: 0.1,
        }, 0.2)
        .to(q(".hero-right"), { opacity: 1, y: 0, duration: 0.12 }, 0.2)
        .to(q(".hero-right"), { filter: "blur(3px) brightness(0.94) saturate(0.92)", scale: 1.05, duration: 0.18 }, 0.27)
        .to(q(".cards-copy"), { opacity: 1, y: 0, duration: 0.16 }, 0.34)
        .to(q(".card"), { opacity: 1, y: 0, rotateX: 0, scale: 1, stagger: 0.025, duration: 0.18 }, 0.38)
        .to(q(".cta-lbl, .cta-body"), { opacity: 1, y: 0, stagger: 0.02, duration: 0.08 }, 0.66)
        .to(q(".cta-chip"), { opacity: 1, y: 0, stagger: 0.015, duration: 0.08 }, 0.7)
        .to(q(".enter-btn"), { opacity: 1, y: 0, duration: 0.1 }, 0.73)
        .to(q(".lab-hdr"), { opacity: 1, y: 0, duration: 0.1 }, 0.84)
        .to(q(".lab-wrap"), { opacity: 1, y: 0, duration: 0.1 }, 0.88);

      q(".campaign-wave-transition").forEach((wave, index) => {
        const beat = transitionBeats[index] ?? 0.5;

        masterTimeline
          .to(wave, {
            autoAlpha: 0.92,
            yPercent: 8,
            scaleY: 1,
            duration: 0.035,
            immediateRender: false,
          }, beat)
          .to(wave, {
            autoAlpha: 0,
            yPercent: -82,
            scaleY: 0.88,
            duration: 0.065,
          }, beat + 0.035);
      });

      gsap.to(q("[data-breathe]"), {
        y: 3,
        scale: 1.006,
        opacity: 0.98,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div className="campaign-timeline" ref={rootRef}>
      {children}
      <div className="campaign-ambient-drift" aria-hidden="true" />
      <div className="campaign-light-pass" aria-hidden="true" />
      <div className="campaign-particles" aria-hidden="true">
        {ambientParticles.map((particle, index) => (
          <span
            className="campaign-particle"
            key={index}
            style={{
              "--particle-left": `${particle.left}%`,
              "--particle-top": `${particle.top}%`,
              "--particle-size": `${particle.size}px`,
              "--particle-opacity": particle.opacity,
            } as CSSProperties}
          />
        ))}
      </div>
      {transitionBeats.map((_, index) => (
        <div className="campaign-wave-transition" key={index} aria-hidden="true">
          <div className="campaign-wave-drift campaign-wave-material">
            <div className="campaign-wave-body" />
            <div className="campaign-wave-haze" />
            <svg className="campaign-wave-svg" viewBox="0 0 1440 200" preserveAspectRatio="none">
              <defs>
                <filter id={`wave-turbulence-${index}`} x="-4%" y="-12%" width="108%" height="124%">
                  <feTurbulence baseFrequency="0.012 0.028" numOctaves="2" seed={17 + index} result="noise" />
                  <feDisplacementMap className="campaign-wave-displacement" in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
              <path className="campaign-wave-depth" d={wavePathA} filter={`url(#wave-turbulence-${index})`} />
              <path className="campaign-wave-path" d={wavePathA} filter={`url(#wave-turbulence-${index})`} />
              <path className="campaign-wave-highlight" d={wavePathA} filter={`url(#wave-turbulence-${index})`} />
              <path className="campaign-wave-caustic-path" d={wavePathA} />
            </svg>
            <div className="campaign-wave-caustics" />
            <div className="campaign-wave-foam" />
          </div>
        </div>
      ))}
    </div>
  );
}
