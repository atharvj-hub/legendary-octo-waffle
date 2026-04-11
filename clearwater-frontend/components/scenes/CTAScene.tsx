'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../lib/useReducedMotion';
import MagneticButton from '../ui/MagneticButton';

const promptChips = [
  '/restore coral mural',
  '/trace a lost silhouette',
  '/recover pressure-faded blues',
];

export default function CTAScene() {
  const reducedMotion = useReducedMotion();
  const compRef = useRef<HTMLElement>(null);
  const chipsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;
    }, compRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollToLab = () => {
    document.getElementById('lab-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="cta-section scene-mask" ref={compRef} id="cta-section">
      {/* Procedural gradient — no images */}
      <div className="scene-gradient cta-gradient" aria-hidden="true" />
      <div className="scene-grid" aria-hidden="true" />

      <p className="cta-lbl">Ready to restore</p>
      <p className="cta-body">Tell Clearwater what the water concealed, then enter the lab to recover the frame.</p>
      <div className="cta-prompts" aria-hidden="true">
        {promptChips.map((prompt, index) => (
          <span
            key={prompt}
            className="cta-chip"
            ref={(el) => { if (el) chipsRef.current[index] = el; }}
          >
            {prompt}
          </span>
        ))}
      </div>
      <div className="enter-magnetic">
        <MagneticButton strength={0.5} labelStrength={0.25} onClick={scrollToLab}>
          Enter the Lab &rarr;
        </MagneticButton>
      </div>
    </section>
  );
}
