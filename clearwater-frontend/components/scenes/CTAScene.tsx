'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { campaignAssets } from '../../lib/assets/manifest';
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
  const labelRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const chipsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;
    }, compRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollToLab = () => {
    const labSection = document.getElementById('lab-section');
    labSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="cta-section" ref={compRef} id="cta-section">
      <Image
        src={campaignAssets.cta.portal.path}
        alt={campaignAssets.cta.portal.alt}
        fill
        sizes="100vw"
        className="scene-plate cta-plate"
        data-depth="background"
      />
      <p className="cta-lbl" ref={labelRef} data-depth="foreground">Ready to restore</p>
      <p className="cta-body" ref={bodyRef} data-depth="foreground">Tell Clearwater what the water concealed, then enter the lab to recover the frame.</p>
      <div className="cta-prompts" aria-hidden="true" data-depth="mid">
        {promptChips.map((prompt, index) => (
          <span
            key={prompt}
            className="cta-chip"
            ref={(element) => {
              if (element) {
                chipsRef.current[index] = element;
              }
            }}
          >
            {prompt}
          </span>
        ))}
      </div>
      {/* Bug 4 fix: MagneticButton replaces the standard enter-btn */}
      <div className="enter-magnetic" data-depth="foreground">
        <MagneticButton
          strength={0.5}
          labelStrength={0.25}
          onClick={scrollToLab}
        >
          Enter the Lab &rarr;
        </MagneticButton>
      </div>
    </section>
  );
}
