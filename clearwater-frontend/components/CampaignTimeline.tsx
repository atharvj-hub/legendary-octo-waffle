/**
 * CampaignTimeline — V2.0 Master animation system.
 *
 * ARCHITECTURE:
 * - Single master ScrollTrigger timeline drives all scroll-paced reveals.
 * - HeroScene is PINNED for 150vh for scrollytelling immersion.
 * - CTA section uses clip-path morphing to "grow" from center.
 * - Background gradient interpolates warm→cold via CSS variable tween.
 * - No images — all procedural.
 *
 * ANIMATION OWNERSHIP RULE:
 * Local scene components own ONLY idle loops, hover, and click animations.
 * All scroll-triggered pacing lives here.
 */
"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../lib/useReducedMotion";

type CampaignTimelineProps = {
  children: ReactNode;
};

const particleCount = 40;

const ambientParticles = Array.from({ length: particleCount }, (_, i) => ({
  left: (i * 19 + (i % 7) * 9) % 100,
  top: (i * 31 + (i % 5) * 13) % 100,
  size: 1.5 + (i % 4) * 0.65,
  opacity: 0.12 + (i % 5) * 0.04,
}));

export default function CampaignTimeline({ children }: CampaignTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      // ── INITIAL STATES ──
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
        ...q(".enter-magnetic"),
        ...q(".lab-hdr"),
        ...q(".lab-wrap"),
      ];

      gsap.set(revealTargets, { opacity: 0, y: 30 });
      gsap.set(q(".hero-split-char"), { opacity: 0, y: 32, rotateX: 40, transformOrigin: "50% 100%" });
      gsap.set(q(".cards-split-word"), { opacity: 0, y: 24, rotateX: 20, transformOrigin: "50% 100%" });
      gsap.set(q(".floating-stat"), { opacity: 0, y: 40, scale: 0.92 });
      gsap.set(q(".card-spec-float"), { opacity: 0, y: 24, scale: 0.9 });

      // CTA clip-path starts collapsed to center (Phase 4)
      gsap.set(q(".cta-section"), { clipPath: "circle(0% at 50% 50%)" });

      if (reducedMotion) {
        gsap.set(revealTargets, { opacity: 1, y: 0 });
        gsap.set(q(".hero-split-char, .cards-split-word"), { opacity: 1, y: 0, rotateX: 0 });
        gsap.set(q(".floating-stat, .card-spec-float"), { opacity: 1, y: 0, scale: 1 });
        gsap.set(q(".cta-section"), { clipPath: "circle(150% at 50% 50%)" });
        return;
      }

      // ── AMBIENT LOOPS ──
      gsap.to(q(".campaign-particle"), {
        y: () => gsap.utils.random(-18, -44),
        x: () => gsap.utils.random(-10, 12),
        autoAlpha: () => gsap.utils.random(0.2, 0.5),
        duration: () => gsap.utils.random(3.2, 6.8),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.04, from: "random" },
      });

      gsap.to(q("[data-breathe]"), {
        y: 3, scale: 1.006, opacity: 0.98,
        duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      // ── PHASE 4: HERO SECTION PINNING (150vh scroll-through) ──
      const heroSection = root.querySelector("#hero-section");
      if (heroSection) {
        gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "+=150%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        })
        // While pinned: the procedural background shifts
        .to(q(".hero-gradient"), {
          background: "radial-gradient(circle at 40% 30%, rgba(20,184,166,0.08) 0%, transparent 50%), linear-gradient(180deg, #050d17 0%, #020408 100%)",
          duration: 1,
        }, 0)
        // Geometric grid drifts
        .to(q("#hero-section .scene-grid"), {
          backgroundPosition: "20px 20px",
          opacity: 0.06,
          duration: 1,
        }, 0);
      }

      // ── PHASE 2: MASTER SCROLL TIMELINE ──
      const masterTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.4,
        },
      });

      // Background color temperature: warm ocean → pitch black
      masterTimeline
        .to(root, {
          "--bg-temperature": "#000000",
          duration: 1,
          ease: "none",
        }, 0)

        // ── SURFACE → HERO transition ──
        .to(q(".surface-cover"), { y: -10, opacity: 0.88 }, 0.04)
        .to(q(".surface-gradient"), { opacity: 0.4 }, 0.08)

        // ── HERO REVEALS ──
        .to(q(".hero-left"), { opacity: 1, y: 0, duration: 0.08 }, 0.14)
        .to(q(".hero-left .eyebrow"), { opacity: 1, y: 0, duration: 0.05 }, 0.15)
        .to(q(".hero-h"), { opacity: 1, y: 0, duration: 0.05 }, 0.16)

        // Character-by-character reveal (Apple typing effect)
        .fromTo(q(".hero-split-char"),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.02, duration: 0.14, ease: "none" },
          0.16)

        .to(q(".hero-body, .hero-credits, .hero-chip"), {
          opacity: 1, y: 0, stagger: 0.01, duration: 0.08,
        }, 0.22)

        .to(q(".hero-right"), { opacity: 1, y: 0, duration: 0.1 }, 0.16)

        // Floating stats rise from below
        .fromTo(q(".floating-stat"),
          { y: 40, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.14, ease: "power3.out" },
          0.22)

        // ── CARDS REVEALS ──
        .to(q(".cards-copy"), { opacity: 1, y: 0, duration: 0.12 }, 0.36)

        // Word-by-word reveal
        .fromTo(q(".cards-split-word"),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.03, duration: 0.16, ease: "none" },
          0.37)

        .to(q(".card"), { opacity: 1, y: 0, rotateX: 0, scale: 1, stagger: 0.025, duration: 0.16 }, 0.42)

        // Card spec labels float up
        .fromTo(q(".card-spec-float"),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.04, duration: 0.1, ease: "power3.out" },
          0.46)

        // ── PHASE 4: CTA CLIP-PATH MORPHING ──
        // The CTA section "grows" from a circle in the center
        .to(q(".cta-section"), {
          clipPath: "circle(150% at 50% 50%)",
          duration: 0.12,
          ease: "power2.inOut",
        }, 0.60)

        .to(q(".cta-lbl, .cta-body"), { opacity: 1, y: 0, stagger: 0.02, duration: 0.08 }, 0.65)
        .to(q(".cta-chip"), { opacity: 1, y: 0, stagger: 0.015, duration: 0.06 }, 0.69)
        .to(q(".enter-magnetic"), { opacity: 1, y: 0, duration: 0.08 }, 0.72)

        // ── LAB REVEALS ──
        .to(q(".lab-hdr"), { opacity: 1, y: 0, duration: 0.08 }, 0.84)
        .to(q(".lab-wrap"), { opacity: 1, y: 0, duration: 0.08 }, 0.88);

    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      className="campaign-timeline"
      ref={rootRef}
      style={{ "--bg-temperature": "#030a14" } as CSSProperties}
    >
      {children}
      {/* Ambient particles — lightweight CSS */}
      <div className="campaign-particles" aria-hidden="true">
        {ambientParticles.map((p, i) => (
          <span
            className="campaign-particle"
            key={i}
            style={{
              "--particle-left": `${p.left}%`,
              "--particle-top": `${p.top}%`,
              "--particle-size": `${p.size}px`,
              "--particle-opacity": p.opacity,
            } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
