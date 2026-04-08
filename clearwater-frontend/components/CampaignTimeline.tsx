"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

type CampaignTimelineProps = {
  children: ReactNode;
};

const wavePathA = "M0,100 C300,180 600,20 900,100 C1200,180 1440,60 1440,60 L1440,200 L0,200 Z";
const wavePathB = "M0,120 C300,60 600,160 900,80 C1200,40 1440,140 1440,140 L1440,200 L0,200 Z";
const transitionBeats = [0.14, 0.33, 0.6, 0.8];

export default function CampaignTimeline({ children }: CampaignTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null);

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
      gsap.set(q(".campaign-wave-transition"), { autoAlpha: 0, yPercent: 96, scaleY: 0.94 });

      gsap.to(q(".campaign-wave-path"), {
        attr: { d: wavePathB },
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(q(".campaign-wave-drift"), {
        x: -50,
        duration: 4,
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
        .to(q("[data-depth='background']"), { yPercent: -4, scale: 1.045, stagger: 0.02 }, 0)
        .to(q("[data-depth='mid']"), { yPercent: -7, stagger: 0.02 }, 0)
        .to(q("[data-depth='foreground']"), { yPercent: -4, stagger: 0.02 }, 0)
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
  }, []);

  return (
    <div className="campaign-timeline" ref={rootRef}>
      {children}
      {transitionBeats.map((_, index) => (
        <div className="campaign-wave-transition" key={index} aria-hidden="true">
          <div className="campaign-wave-drift">
            <svg className="campaign-wave-svg" viewBox="0 0 1440 200" preserveAspectRatio="none">
              <path className="campaign-wave-depth" d={wavePathA} />
              <path className="campaign-wave-path" d={wavePathA} />
            </svg>
            <div className="campaign-wave-foam" />
          </div>
        </div>
      ))}
    </div>
  );
}
