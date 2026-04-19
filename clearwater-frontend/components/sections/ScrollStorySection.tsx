'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BEATS = [
  {
    id:      'enhance',
    label:   '01 / Enhancement',
    heading: 'See Through\nThe Dark',
    body:    'Our SS-UIE neural architecture restores colour fidelity and contrast in visually degraded underwater frames — recovering what the ocean obscures.',
    accent:  '#00E5FF',
    stat:    { value: '93%', label: 'PSNR improvement' },
  },
  {
    id:      'detect',
    label:   '02 / Detection',
    heading: 'Identify\nEvery Form',
    body:    'YOLOv8 with cross-class NMS isolates marine objects with frame-level precision. Real-time inference at deployment depth.',
    accent:  '#00FFBB',
    stat:    { value: '0.91', label: 'mAP@0.5 score' },
  },
  {
    id:      'dehazing',
    label:   '03 / Dehazing',
    heading: 'Physics-Led\nClarity',
    body:    'Dark Channel Prior physics modelling cuts scattering artefacts before the neural pipeline. Signal-first, then enhancement.',
    accent:  '#3B82F6',
    stat:    { value: '4×', label: 'visibility increase' },
  },
];

export default function ScrollStorySection() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      BEATS.forEach((_, i) => {
        const panel    = `.story-panel-${i}`;
        const content  = `.story-content-${i}`;
        const clipRect = `.story-clip-${i}`;

        // Clip-path reveal — panel "opens" from centre
        ScrollTrigger.create({
          trigger: panel,
          start:  'top 80%',
          end:    'top 20%',
          onEnter: () => {
            gsap.to(clipRect, {
              clipPath: 'inset(0% 0% 0% 0% round 24px)',
              duration: 1.1,
              ease:     'expo.out',
            });
            gsap.fromTo(
              content,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.9, delay: 0.25, ease: 'power3.out' },
            );
          },
          once: true,
        });

        // Parallax within panel
        gsap.to(`.story-visual-${i}`, {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            start:   'top bottom',
            end:     'bottom top',
            scrub:   1.5,
          },
        });
      });

      // Section title reveal
      gsap.fromTo(
        '.story-section-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: {
            trigger: wrapRef.current,
            start:   'top 85%',
            once:    true,
          },
        },
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapRef}
      id="story"
      className="relative w-full bg-[#030712] py-32"
    >
      {/* Section header */}
      <div className="story-section-label mx-auto mb-24 max-w-5xl px-8 opacity-0">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#00E5FF]/60">
          How It Works
        </p>
        <h2
          className="text-4xl font-light leading-snug text-white md:text-5xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Three layers of intelligence,<br />
          <em className="text-[#00E5FF]">one coherent output.</em>
        </h2>
      </div>

      {/* Beat panels */}
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 lg:px-8">
        {BEATS.map((beat, i) => (
          <div
            key={beat.id}
            className={`story-panel-${i} relative`}
          >
            {/* Clipped container */}
            <div
              className={`story-clip-${i} overflow-hidden rounded-3xl border border-white/5`}
              style={{
                clipPath: 'inset(0% 50% 0% 50% round 24px)',
                background: 'linear-gradient(135deg, rgba(4,17,32,0.98) 0%, rgba(2,10,18,0.98) 100%)',
              }}
            >
              <div className="grid min-h-[340px] grid-cols-1 gap-0 lg:grid-cols-2">
                {/* Text side */}
                <div
                  className={`story-content-${i} flex flex-col justify-center p-10 opacity-0 lg:p-14`}
                  style={{ order: i % 2 === 0 ? 0 : 1 }}
                >
                  <span
                    className="mb-5 font-mono text-[9px] uppercase tracking-[0.4em]"
                    style={{ color: beat.accent }}
                  >
                    {beat.label}
                  </span>
                  <h3
                    className="mb-5 text-3xl font-light leading-tight text-white md:text-4xl"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", whiteSpace: 'pre-line' }}
                  >
                    {beat.heading}
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-slate-400">
                    {beat.body}
                  </p>
                  {/* Stat */}
                  <div
                    className="mt-8 w-fit rounded-xl border px-5 py-3"
                    style={{ borderColor: `${beat.accent}22`, background: `${beat.accent}0a` }}
                  >
                    <span
                      className="block font-mono text-2xl font-bold leading-none"
                      style={{ color: beat.accent }}
                    >
                      {beat.stat.value}
                    </span>
                    <span className="mt-1 block font-mono text-[9px] uppercase tracking-widest text-slate-500">
                      {beat.stat.label}
                    </span>
                  </div>
                </div>

                {/* Visual side */}
                <div
                  className="relative overflow-hidden"
                  style={{ order: i % 2 === 0 ? 1 : 0 }}
                >
                  <div className={`story-visual-${i} absolute inset-0`}>
                    {/* Procedural visual placeholder — replace with real imagery */}
                    <div className="h-full w-full" style={{
                      background: `radial-gradient(ellipse 70% 60% at ${i % 2 === 0 ? '70%' : '30%'} 50%, ${beat.accent}18 0%, transparent 70%), linear-gradient(135deg, #020e1a 0%, #041520 100%)`,
                    }} />
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-[0.06]" style={{
                      backgroundImage: `linear-gradient(${beat.accent} 1px, transparent 1px), linear-gradient(90deg, ${beat.accent} 1px, transparent 1px)`,
                      backgroundSize: '40px 40px',
                    }} />
                    {/* Glowing orb */}
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                      style={{
                        width: 200, height: 200,
                        background: `radial-gradient(circle, ${beat.accent}20 0%, transparent 70%)`,
                      }}
                    />
                    {/* Label */}
                    <div className="absolute bottom-6 right-6 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-sm">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                        {beat.id} · module
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connector line to next panel */}
            {i < BEATS.length - 1 && (
              <div className="mx-auto my-0 h-8 w-px bg-gradient-to-b from-white/10 to-transparent" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
