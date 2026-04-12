'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  'Atharv Jandal',
  'Advitya Sharma',
  'Darsh Dhawan',
  'Divij Singh Soodan',
];

const storyPrompts = [
  'Restore coral mural',
  'Trace a lost silhouette',
  'Recover pressure faded blues',
];

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<SVGGeometryElement>('.math-line', containerRef.current);

      lines.forEach((line) => {
        const length = line.getTotalLength();

        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: 'power3.inOut',
          delay: 0.2,
        });
      });

      gsap.to('.math-svg', {
        rotation: 360,
        transformOrigin: 'center center',
        duration: 150,
        repeat: -1,
        ease: 'none',
      });

      gsap.fromTo(
        '.title-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          delay: 1.2,
          ease: 'power3.out',
        },
      );

      gsap.fromTo(
        '.team-member',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#team',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(
        '.lab-container',
        { scale: 0.85, opacity: 0, borderRadius: '64px' },
        {
          scale: 1,
          opacity: 1,
          borderRadius: '24px',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#lab',
            start: 'top 90%',
            end: 'top 30%',
            scrub: 1.5,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#030712] text-white selection:bg-[#00E5FF] selection:text-black">
      <section
        id="story"
        className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center md:px-10"
      >
        <div className="story-prompts pointer-events-none absolute top-24 left-1/2 z-10 hidden -translate-x-1/2 md:flex">
          {storyPrompts.map((prompt) => (
            <span key={prompt} className="story-chip">
              {prompt}
            </span>
          ))}
        </div>

        <svg
          className="math-svg pointer-events-none absolute inset-0 h-full w-full opacity-20"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path
            className="math-line"
            d="M -20,50 L 120,50"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="0.1"
          />
          <path
            className="math-line"
            d="M 50,-20 L 50,120"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="0.1"
          />
          <circle
            className="math-line"
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="0.1"
          />
          <circle
            className="math-line"
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="0.05"
            strokeDasharray="1 1"
          />
          <path
            className="math-line"
            d="M 25,25 L 75,75 M 25,75 L 75,25"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="0.05"
          />
        </svg>

        <h1 className="title-reveal relative z-10 mb-6 font-serif text-7xl font-light tracking-tight md:text-9xl">
          Clearwater
        </h1>
        <p className="title-reveal relative z-10 max-w-3xl text-xl font-light tracking-wide text-slate-400 md:text-2xl">
          Reveal what the water concealed.
        </p>
      </section>

      <section
        id="team"
        className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center border-t border-white/5 bg-[#030712] px-6 py-24 md:px-10"
      >
        <p className="mb-12 text-xs uppercase tracking-[0.3em] text-[#00E5FF]">The Architects</p>
        <div className="grid grid-cols-2 gap-12 text-center md:grid-cols-4">
          {teamMembers.map((name) => (
            <div key={name} className="team-member flex flex-col gap-2">
              <span className="font-serif text-2xl text-white">{name}</span>
              <span className="text-xs uppercase tracking-widest text-slate-500">Vision Engineer</span>
            </div>
          ))}
        </div>
      </section>

      <section
        id="lab"
        className="relative flex min-h-screen flex-col items-center justify-center border-t border-[#00E5FF]/20 bg-gradient-to-b from-[#030712] to-[#010308] px-6 py-24 md:px-10"
      >
        <div className="pointer-events-none absolute top-0 left-1/2 h-64 w-3/4 -translate-x-1/2 rounded-full bg-[#00E5FF]/10 blur-[120px]" />

        <h2 className="relative z-10 mb-16 text-center font-serif text-4xl md:text-5xl">
          Restoration Studio
        </h2>

        <div className="lab-container relative z-10 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl md:p-12">
          <div className="group mb-12 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 transition-colors hover:border-[#00E5FF]/50">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-[#00E5FF] group-hover:text-[#00E5FF]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="text-center text-sm uppercase tracking-widest text-slate-400 transition-colors group-hover:text-white">
              Drop degraded frame here
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-widest text-slate-600">
              PNG • JPG • WEBP
            </p>
          </div>

          <div className="relative z-20 mb-12 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8">
            <MagneticButton
              strength={0.4}
              labelStrength={0.2}
              variant="ghost"
              className="!min-h-0 !border-transparent !bg-transparent !p-0 !shadow-none hover:!shadow-none"
            >
              <div className="rounded-full bg-[#00E5FF] px-8 py-3 text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                Run Enhancement
              </div>
            </MagneticButton>

            <MagneticButton
              strength={0.4}
              labelStrength={0.2}
              variant="ghost"
              className="!min-h-0 !border-transparent !bg-transparent !p-0 !shadow-none hover:!shadow-none"
            >
              <div className="rounded-full border border-white/30 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white/10">
                Run Detection
              </div>
            </MagneticButton>
          </div>

          <div className="relative flex h-96 w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/50">
            <p className="text-xs uppercase tracking-widest text-slate-600">
              Comparison Slider Placeholder
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
