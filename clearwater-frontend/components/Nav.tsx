'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  const getLinkClass = (section: string) => {
    const isActive = pathname === '/' && activeSection === section;

    return isActive
      ? 'text-white opacity-100 transition-all duration-300'
      : 'text-slate-500 hover:text-white opacity-70 transition-all duration-300';
  };

  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-white/5 bg-black/50 px-6 py-5 backdrop-blur-md md:px-12 md:py-6">
      <div className="flex flex-col">
        <span className="text-lg font-bold tracking-wide text-white">Clearwater</span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Underwater Vision</span>
      </div>

      <div className="hidden gap-8 text-xs uppercase tracking-widest md:flex">
        <Link href="/#story" className={getLinkClass('story')}>
          Story
        </Link>
        <Link href="/#team" className={getLinkClass('team')}>
          Team
        </Link>
        <Link href="/#lab" className={getLinkClass('lab')}>
          Lab
        </Link>
      </div>

      <Link
        href="/#lab"
        className="relative rounded-full border border-[#00E5FF] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00E5FF] transition-all duration-300 hover:bg-[#00E5FF]/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] md:px-8 md:py-3"
      >
        Enter Lab
      </Link>
    </nav>
  );
}
