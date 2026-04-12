'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticButton({
  children,
  strength = 0.4,
  labelStrength = 0.2,
  onClick
}: {
  children: React.ReactNode;
  strength?: number;
  labelStrength?: number;
  onClick?: () => void;
}) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    const btn = btnRef.current;
    const label = labelRef.current;

    if (!zone || !btn || !label) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = zone.getBoundingClientRect();
      const x = gsap.utils.mapRange(rect.left, rect.right, -rect.width / 2, rect.width / 2, e.clientX);
      const y = gsap.utils.mapRange(rect.top, rect.bottom, -rect.height / 2, rect.height / 2, e.clientY);

      gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(label, { x: x * labelStrength, y: y * labelStrength, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    };

    const handleMouseLeave = () => {
      gsap.to([btn, label], { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
    };

    zone.addEventListener('mousemove', handleMouseMove);
    zone.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      zone.removeEventListener('mousemove', handleMouseMove);
      zone.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, labelStrength]);

  return (
    <div ref={zoneRef} className="relative inline-flex p-12 cursor-pointer touch-none" onClick={onClick}>
      <div ref={btnRef} className="relative z-10 flex items-center justify-center rounded-full border border-white/20 px-8 py-4 transition-colors hover:bg-white/5">
        <div ref={labelRef} className="relative z-20 pointer-events-none">
          {children}
        </div>
      </div>
    </div>
  );
}
