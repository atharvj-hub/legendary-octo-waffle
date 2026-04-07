"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

type CampaignTimelineProps = {
  children: ReactNode;
};

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

      const masterTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
        },
      });

      masterTimeline
        .to(q("[data-depth='background']"), { yPercent: -6, scale: 1.07, stagger: 0.03 }, 0)
        .to(q("[data-depth='mid']"), { yPercent: -12, stagger: 0.03 }, 0)
        .to(q("[data-depth='foreground']"), { yPercent: -18, stagger: 0.03 }, 0)
        .to(q(".surface-cover"), { y: -36, opacity: 0.72 }, 0.04)
        .to(q(".surface-depth-plate"), { opacity: 0.46, yPercent: -5, scale: 1.02 }, 0.06)
        .to(q(".surface-plate"), { filter: "blur(3px) brightness(0.86) saturate(0.92)" }, 0.07)
        .to(q(".surface-dark-overlay"), { opacity: 0.46 }, 0.1)
        .to(q(".hero-left"), { opacity: 1, y: 0, duration: 0.1 }, 0.18)
        .to(q(".hero-left .eyebrow, .hero-h, .hero-body, .hero-credits, .hero-chip"), {
          opacity: 1,
          y: 0,
          stagger: 0.012,
          duration: 0.1,
        }, 0.2)
        .to(q(".hero-right"), { opacity: 1, y: 0, duration: 0.12 }, 0.2)
        .to(q(".hero-right"), { filter: "blur(3px) brightness(0.94) saturate(0.92)", scale: 1.05, duration: 0.18 }, 0.27)
        .to(q(".cards-copy"), { opacity: 1, y: 0, duration: 0.1 }, 0.43)
        .to(q(".card"), { opacity: 1, y: 0, rotateX: 0, scale: 1, stagger: 0.025, duration: 0.12 }, 0.47)
        .to(q(".cta-lbl, .cta-body"), { opacity: 1, y: 0, stagger: 0.02, duration: 0.08 }, 0.66)
        .to(q(".cta-chip"), { opacity: 1, y: 0, stagger: 0.015, duration: 0.08 }, 0.7)
        .to(q(".enter-btn"), { opacity: 1, y: 0, duration: 0.1 }, 0.73)
        .to(q(".lab-hdr"), { opacity: 1, y: 0, duration: 0.1 }, 0.84)
        .to(q(".lab-wrap"), { opacity: 1, y: 0, duration: 0.1 }, 0.88);

      gsap.to(q("[data-breathe]"), {
        y: 6,
        scale: 1.015,
        opacity: 0.98,
        duration: 3,
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
    </div>
  );
}
