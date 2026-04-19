'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARTICLE_COUNT = 55;

export default function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const taglineRef   = useRef<HTMLParagraphElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const raysRef      = useRef<HTMLDivElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);

  /* ─── Particle canvas ─────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    0.4 + Math.random() * 1.6,
      vy:   -(0.08 + Math.random() * 0.18),   // drift upward slowly
      vx:   (Math.random() - 0.5) * 0.06,
      a:    Math.random(),
      da:   0.002 + Math.random() * 0.004,
      fade: Math.random() > 0.5 ? 1 : -1,
    }));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.a += p.da * p.fade;
        if (p.a >= 1 || p.a <= 0) p.fade *= -1;
        p.x += p.vx; p.y += p.vy;
        if (p.y < -4)  p.y = H + 4;
        if (p.x < -4)  p.x = W + 4;
        if (p.x > W+4) p.x = -4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${p.a * 0.55})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  /* ─── GSAP entry animation ─────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Depth "surface break" — overlay recedes upward
      tl.to(overlayRef.current, { scaleY: 0, transformOrigin: 'top center', duration: 1.4, ease: 'expo.inOut' }, 0);

      // Light rays fan in
      tl.fromTo(
        '.hero-ray',
        { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
        { scaleY: 1, opacity: 1, duration: 2.2, stagger: 0.12, ease: 'expo.out' },
        0.3,
      );

      // Title chars stagger
      tl.fromTo(
        '.hero-char',
        { y: 80, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, stagger: 0.04, ease: 'back.out(1.4)' },
        0.8,
      );

      tl.fromTo(
        taglineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        1.6,
      );

      tl.fromTo(
        '.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
        1.9,
      );

      // Scroll-driven parallax
      gsap.to('.hero-depth-layer', {
        y: (i) => (i + 1) * 120,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end:   'bottom top',
          scrub: 1.2,
        },
      });

      // Hero fades and scales out slightly on scroll
      gsap.to(sectionRef.current, {
        opacity: 0,
        scale: 0.96,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '60% top',
          end:   'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Split title text into spans for char animation */
  const titleText  = 'CLEARWATER';
  const titleText2 = 'VISION';

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-[#020a10]"
    >
      {/* Entry overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30 bg-[#020a10]"
      />

      {/* Particles */}
      <canvas
        ref={canvasRef}
        className="hero-depth-layer pointer-events-none absolute inset-0 z-[1]"
      />

      {/* Deep gradient atmosphere */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#020a10] via-[#041520] to-[#020e1a]" />

      {/* Caustic light overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,180,220,0.18) 0%, transparent 70%), ' +
            'radial-gradient(ellipse 40% 30% at 30% 20%, rgba(0,229,255,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Light rays */}
      <div
        ref={raysRef}
        className="hero-depth-layer pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="hero-ray absolute top-0 h-[70vh]"
            style={{
              left:      `${10 + i * 11}%`,
              width:     `${1.5 + (i % 3) * 0.8}%`,
              transform: `rotate(${-12 + i * 3.5}deg) skewX(${i % 2 === 0 ? -3 : 2}deg)`,
              background: `linear-gradient(to bottom, rgba(0,200,255,${0.07 - i * 0.005}) 0%, transparent 100%)`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Depth horizon line */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] h-px bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* System label */}
        <p className="hero-cta mb-8 font-mono text-[10px] uppercase tracking-[0.4em] text-[#00E5FF]/60 opacity-0">
          Clearwater Vision System · v2.4
        </p>

        {/* Title */}
        <h1
          ref={titleRef}
          className="flex flex-col items-center gap-1 leading-none"
          aria-label="Clearwater Vision"
        >
          <span className="block overflow-hidden">
            <span className="flex">
              {titleText.split('').map((ch, i) => (
                <span
                  key={i}
                  className="hero-char inline-block opacity-0"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(4rem, 12vw, 9rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#fff',
                  }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="flex">
              {titleText2.split('').map((ch, i) => (
                <span
                  key={i}
                  className="hero-char inline-block opacity-0"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(4rem, 12vw, 9rem)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    letterSpacing: '-0.02em',
                    color: '#00E5FF',
                    textShadow: '0 0 60px rgba(0,229,255,0.4)',
                  }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </span>
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="mt-8 max-w-md font-mono text-xs leading-relaxed tracking-widest text-slate-400 opacity-0"
        >
          Underwater image enhancement & object detection.
          <br />
          Deep-sea clarity through neural intelligence.
        </p>

        {/* CTAs */}
        <div className="hero-cta mt-12 flex items-center gap-4 opacity-0">
          <a
            href="#upload"
            className="group relative overflow-hidden rounded-full border border-[#00E5FF]/40 bg-[#00E5FF]/10 px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#00E5FF] backdrop-blur-sm transition-all duration-300 hover:bg-[#00E5FF]/20 hover:shadow-[0_0_30px_rgba(0,229,255,0.25)]"
          >
            <span className="relative z-10">Dive In</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#00E5FF]/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </a>
          <a
            href="#team"
            className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-slate-300"
          >
            Meet the Team ↓
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-slate-500">Scroll</span>
        <div className="h-10 w-px overflow-hidden bg-slate-800">
          <div className="h-full w-full animate-[scrollLine_1.8s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-[#00E5FF] to-transparent" />
        </div>
      </div>
    </section>
  );
}
