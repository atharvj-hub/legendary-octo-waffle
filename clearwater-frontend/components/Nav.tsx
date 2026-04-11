'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';

const links = [
  { href: '#surface-section', label: 'Story' },
  { href: '#hero-section', label: 'System' },
  { href: '#cards-section', label: 'Pipeline' },
];

export default function Nav() {
  const reducedMotion = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(navRef.current, { y: -24 });
      gsap.set(linksRef.current, { y: -12, opacity: 0 });
      gsap.set(ctaRef.current, { y: -12, opacity: 0 });

      gsap.to(navRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.18,
      });

      gsap.to(linksRef.current, {
        opacity: 1, y: 0, duration: 0.65, stagger: 0.06, ease: 'power3.out', delay: 0.05,
      });

      gsap.to(ctaRef.current, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.16,
      });
    }, navRef);

    // Phase 3: Magnetic pull on nav links (outside GSAP context so they persist)
    if (reducedMotion) return () => ctx.revert();

    const allLinks = [...linksRef.current, ctaRef.current].filter(Boolean) as HTMLElement[];

    const handlers = allLinks.map((link) => {
      const handleMove = (e: MouseEvent) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(link, { x: x * 0.2, y: y * 0.3, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
      };
      const handleLeave = () => {
        gsap.to(link, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
      };
      link.addEventListener('mousemove', handleMove);
      link.addEventListener('mouseleave', handleLeave);
      return { link, handleMove, handleLeave };
    });

    return () => {
      handlers.forEach(({ link, handleMove, handleLeave }) => {
        link.removeEventListener('mousemove', handleMove);
        link.removeEventListener('mouseleave', handleLeave);
      });
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <nav ref={navRef} id="nav">
      <div className="nav-brand">
        <span className="nav-logo">CLEARWATER</span>
        <span className="nav-tag">Ocean vision campaign</span>
      </div>
      <div className="nav-links" aria-label="Primary">
        {links.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            ref={(el) => { if (el) linksRef.current[index] = el; }}
            className="nav-link"
          >
            {link.label}
          </a>
        ))}
      </div>
      <a href="#lab-section" className="nav-cta" ref={ctaRef}>
        Enter lab
      </a>
    </nav>
  );
}
