'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Fade in nav after 1.5s to compensate for the removed timeline load animation
    gsap.to(navRef.current, { opacity: 1, duration: 0.6, delay: 1.5, ease: 'power4.out' });
  }, []);

  return (
    <nav ref={navRef} id="nav">
      <span className="nav-logo">CLEARWATER</span>
      <span className="nav-tag">Underwater Vision</span>
    </nav>
  );
}
