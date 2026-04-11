'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../lib/useReducedMotion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;       // How far the button pulls (default: 0.4)
  labelStrength?: number;  // How far the text pulls for parallax (default: 0.2)
  onClick?: () => void;
}

/**
 * MagneticButton — Apple-grade magnetic hover interaction.
 *
 * The button "reaches out" toward the cursor before the user even touches it.
 * The text label moves at a lower strength than the pill for a 3D parallax effect.
 * Elastic snap-back on mouse leave completes the premium feel.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  labelStrength = 0.2,
  onClick,
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion();
  const zoneRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const zone = zoneRef.current;
    const btn = btnRef.current;
    const label = labelRef.current;

    if (!zone || !btn || !label) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = zone.getBoundingClientRect();

      // Map mouse position relative to center of the zone
      const x = gsap.utils.mapRange(rect.left, rect.right, -rect.width / 2, rect.width / 2, e.clientX);
      const y = gsap.utils.mapRange(rect.top, rect.bottom, -rect.height / 2, rect.height / 2, e.clientY);

      // Animate the button casing
      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Animate the text label slightly less for 3D parallax feel
      gsap.to(label, {
        x: x * labelStrength,
        y: y * labelStrength,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      // Elastic snap-back for the button
      gsap.to(btn, {
        x: 0, y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });

      // Elastic snap-back for the text
      gsap.to(label, {
        x: 0, y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    };

    zone.addEventListener('mousemove', handleMouseMove);
    zone.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      zone.removeEventListener('mousemove', handleMouseMove);
      zone.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, labelStrength, reducedMotion]);

  return (
    <div
      ref={zoneRef}
      className="magnetic-zone"
      style={{ touchAction: 'none' }}
    >
      <div
        ref={btnRef}
        className={`magnetic-btn ${className}`}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(); }}
      >
        <div ref={labelRef} className="magnetic-label">
          {children}
        </div>
      </div>
    </div>
  );
}
