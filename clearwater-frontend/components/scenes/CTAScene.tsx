'use client';

import Image from 'next/image';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { campaignAssets } from '../../lib/assets/manifest';
import { gsap } from '../../lib/gsap';

const promptChips = [
  '/restore coral mural',
  '/trace a lost silhouette',
  '/recover pressure-faded blues',
];

export default function CTAScene() {
  const compRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const chipsRef = useRef<HTMLSpanElement[]>([]);
  const [ripples, setRipples] = useState<{ id: number; top: number; left: number }[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([labelRef.current, bodyRef.current, buttonRef.current], { y: 20, opacity: 0 });
      gsap.set(chipsRef.current, { y: 16, opacity: 0 });

      const ctaTrig = { trigger: compRef.current, start: 'top 70%' };
      gsap.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: ctaTrig });
      gsap.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power3.out', scrollTrigger: ctaTrig });
      gsap.to(chipsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        delay: 0.18,
        ease: 'power3.out',
        scrollTrigger: ctaTrig,
      });
      gsap.to(buttonRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.32, ease: 'power3.out', scrollTrigger: ctaTrig });
    }, compRef);

    return () => ctx.revert();
  }, []);

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const bounds = button.getBoundingClientRect();
    const newRipple = {
      id: Date.now(),
      top: event.clientY - bounds.top - 40,
      left: event.clientX - bounds.left - 40,
    };

    setRipples((previous) => [...previous, newRipple]);

    setTimeout(() => {
      setRipples((previous) => previous.filter((ripple) => ripple.id !== newRipple.id));
    }, 800);

    setTimeout(() => {
      const labSection = document.getElementById('lab-section');
      labSection?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const handleButtonMove = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const bounds = button.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;

    gsap.to(button, {
      x: x * 0.08,
      y: y * 0.12,
      duration: 0.35,
      ease: 'power3.out',
    });
  };

  const resetButton = () => {
    if (!buttonRef.current) {
      return;
    }

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: 'power3.out',
    });
  };

  return (
    <section className="cta-section" ref={compRef} id="cta-section">
      <Image
        src={campaignAssets.cta.portal.path}
        alt={campaignAssets.cta.portal.alt}
        fill
        sizes="100vw"
        className="scene-plate cta-plate"
      />
      <p className="cta-lbl" ref={labelRef}>Ready to restore</p>
      <p className="cta-body" ref={bodyRef}>Tell Clearwater what the water concealed, then enter the lab to recover the frame.</p>
      <div className="cta-prompts" aria-hidden="true">
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
      <button
        className="enter-btn"
        onClick={handleClick}
        onMouseMove={handleButtonMove}
        onMouseLeave={resetButton}
        ref={buttonRef}
      >
        Enter the Lab &rarr;
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="btn-ripple"
            style={{ width: '80px', height: '80px', top: `${ripple.top}px`, left: `${ripple.left}px` }}
          />
        ))}
      </button>
    </section>
  );
}
