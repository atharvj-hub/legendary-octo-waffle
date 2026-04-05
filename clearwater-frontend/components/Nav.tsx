'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

const links = [
  { href: '#intro-section', label: 'Story' },
  { href: '#hero-section', label: 'System' },
  { href: '#cards-section', label: 'Pipeline' },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(navRef.current, { y: -24 });
      gsap.set(linksRef.current, { y: -12, opacity: 0 });
      gsap.set(ctaRef.current, { y: -12, opacity: 0 });

      gsap.to(navRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.18,
      });

      gsap.to(linksRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.05,
      });

      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.16,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

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
            ref={(element) => {
              if (element) {
                linksRef.current[index] = element;
              }
            }}
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
