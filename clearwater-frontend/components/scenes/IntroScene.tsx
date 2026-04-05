'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function IntroScene() {
  const compRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.to('.grid-bg',    { opacity: 1,    duration: 1.6 }, 0.2)
        .to('.corner', { opacity: 1, duration: 0.6, stagger: 0.12 }, 0.6)
        .to('.intro-label',  { opacity: 1,    duration: 0.7 }, 1.0)
        .to('.char',      { y: 0, opacity: 1, duration: 0.95, stagger: 0.055 }, 1.4)
        .to('.intro-sub',  { opacity: 1,    duration: 0.8 }, 2.3)
        .to('.scroll-hint',{ opacity: 1,    duration: 0.6 }, 2.9)
        .to('nav',       { opacity: 1,    duration: 0.6 }, 3.0);
    }, compRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={compRef}>
      <nav>
        <span className="nav-logo">CLEARWATER</span>
        <span className="nav-tag">Underwater Vision</span>
      </nav>
      
      <section className="intro-section">
        <div className="grid-bg"></div>
        <div className="corner c-tl"></div>
        <div className="corner c-tr"></div>
        <div className="corner c-bl"></div>
        <div className="corner c-br"></div>

        <div className="intro-inner">
          <div className="intro-label">Clearwater &mdash; v1.0 &nbsp;&bull;&nbsp; 2026</div>
          <h1 className="intro-title">
            {'CLEARWATER'.split('').map((char, i) => (
              <span key={i} className="char">{char}</span>
            ))}
          </h1>
          <p className="intro-sub">Underwater Image Restoration &amp; Enhancement</p>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>
    </div>
  );
}
