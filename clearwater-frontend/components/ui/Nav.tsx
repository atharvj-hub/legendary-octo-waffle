'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import MagneticButton from './MagneticButton';

export default function Nav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('story');

  useEffect(() => {
    if (pathname !== '/') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );

    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  const getLinkClass = (section: string) => {
    const isActive = pathname === '/' && activeSection === section;

    return isActive
      ? '!min-h-0 !border-transparent !bg-transparent !px-4 !py-2 !text-white !opacity-100 !shadow-none hover:!shadow-none'
      : '!min-h-0 !border-transparent !bg-transparent !px-4 !py-2 !text-slate-500 !opacity-70 !shadow-none hover:!text-white hover:!opacity-100 hover:!shadow-none';
  };

  return (
    <nav
      id="global-nav"
      className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-white/5 bg-black/50 px-6 py-4 backdrop-blur-md md:px-12"
    >
      <div className="pointer-events-auto flex flex-col">
        <span className="text-lg font-bold tracking-wide text-white">Clearwater</span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Underwater Vision</span>
      </div>

      <div className="hidden items-center gap-2 text-xs uppercase tracking-widest md:flex">
        <MagneticButton
          href="/#story"
          strength={0.2}
          labelStrength={0.1}
          variant="ghost"
          className={getLinkClass('story')}
        >
          Story
        </MagneticButton>

        <MagneticButton
          href="/#team"
          strength={0.2}
          labelStrength={0.1}
          variant="ghost"
          className={getLinkClass('team')}
        >
          Team
        </MagneticButton>

        <MagneticButton
          href="/#lab"
          strength={0.2}
          labelStrength={0.1}
          variant="ghost"
          className={getLinkClass('lab')}
        >
          Lab
        </MagneticButton>
      </div>

      <MagneticButton
        href="/#lab"
        strength={0.4}
        labelStrength={0.2}
        variant="ghost"
        className="lab-beacon lab-beacon--nav !border-transparent !p-0"
      >
        Enter the Lab &rarr;
      </MagneticButton>
    </nav>
  );
}
