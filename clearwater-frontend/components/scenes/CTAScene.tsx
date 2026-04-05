'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';

export default function CTAScene() {
  const compRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<{id: number, top: number, left: number}[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ctaTrig = { trigger: '.cta-section', start: 'top 70%' };
      gsap.to('.cta-lbl',  { opacity: 1, duration: 0.6, scrollTrigger: ctaTrig });
      gsap.to('.enter-btn',{ opacity: 1, duration: 0.8, delay: 0.22, scrollTrigger: ctaTrig });
    }, compRef);

    return () => ctx.revert();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const r = btn.getBoundingClientRect();
    const newRipple = {
      id: Date.now(),
      top: e.clientY - r.top - 40,
      left: e.clientX - r.left - 40
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(rip => rip.id !== newRipple.id));
    }, 800);

    setTimeout(() => {
      const labSection = document.getElementById('lab-section');
      if (labSection) {
        labSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  return (
    <section className="cta-section" ref={compRef}>
      <p className="cta-lbl">Ready to restore</p>
      <button className="enter-btn" onClick={handleClick}>
        Enter the Lab &rarr;
        {ripples.map(ripple => (
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
