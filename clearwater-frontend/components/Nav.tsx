'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(navRef.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: ".intro-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} id="nav">
      <span className="nav-logo">CLEARWATER</span>
      <span className="nav-tag">Underwater Vision</span>
    </nav>
  );
}
