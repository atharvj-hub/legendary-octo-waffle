'use client';
 
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
 
type TeamNode = {
  detail: string;
  left: string;
  name: string;
  role: string;
  top: string;
  type: 'team';
  emoji?: string;
};
 
type TechNode = {
  left: string;
  name: string;
  top: string;
  type: 'tech';
};
 
type ConstellationNode = TeamNode | TechNode;
 
const nodes: ConstellationNode[] = [
  {
    type: 'team',
    name: 'Atharv Jandal',
    role: 'Vision Engineer',
    detail: 'Core ML Pipeline & Model Training',
    top: '20%',
    left: '15%',
    emoji: '🧠',
  },
  {
    type: 'team',
    name: 'Advitya Sharma',
    role: 'Vision Engineer',
    detail: 'SS-UIE Neural Architecture',
    top: '65%',
    left: '20%',
    emoji: '⚡',
  },
  {
    type: 'team',
    name: 'Darsh Dhawan',
    role: 'Vision Engineer',
    detail: 'DCP Physics Modeling',
    top: '30%',
    left: '65%',
    emoji: '🔭',
  },
  {
    type: 'team',
    name: 'Divij Singh Soodan',
    role: 'Vision Engineer',
    detail: 'Cross-class NMS & Detection',
    top: '75%',
    left: '70%',
    emoji: '🎯',
  },
  {
    type: 'tech',
    name: '/yolo-v8',
    top: '50%',
    left: '45%',
  },
  {
    type: 'tech',
    name: '/dark-channel',
    top: '25%',
    left: '40%',
  },
  {
    type: 'tech',
    name: '/u-net',
    top: '80%',
    left: '45%',
  },
];
 
const edges: Array<[number, number]> = [
  [0, 5], [1, 6], [2, 5], [3, 6],
  [4, 5], [4, 6], [5, 2], [0, 1],
  [1, 4], [2, 4], [3, 4],
];
 
const MAGNETIC_RADIUS = 180;
const MAX_SCALE = 1.6;
const MIN_SCALE = 0.75;

type PhysicsState = {
  ox: number;
  oy: number;
  parallaxFactor: number;
  radiusX: number;
  radiusY: number;
  speed: number;
  timeOffset: number;
};
 
export default function TeamConstellation() {
  const containerRef = useRef<HTMLElement>(null);
  const nodesRef = useRef<Array<HTMLDivElement | null>>([]);
  const linesRef = useRef<Array<SVGLineElement | null>>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const rafRef = useRef<number>(0);
 
  const physicsRef = useRef<PhysicsState[]>([]);
 
  const smoothMouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
 
  const updateLines = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
 
    edges.forEach(([si, ei], idx) => {
      const sNode = nodesRef.current[si];
      const eNode = nodesRef.current[ei];
      const line = linesRef.current[idx];
      if (!sNode || !eNode || !line) return;
 
      const sr = sNode.getBoundingClientRect();
      const er = eNode.getBoundingClientRect();
      line.setAttribute('x1', (sr.left + sr.width / 2 - containerRect.left).toString());
      line.setAttribute('y1', (sr.top + sr.height / 2 - containerRect.top).toString());
      line.setAttribute('x2', (er.left + er.width / 2 - containerRect.left).toString());
      line.setAttribute('y2', (er.top + er.height / 2 - containerRect.top).toString());
    });
  }, []);
 
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (physicsRef.current.length === 0) {
      physicsRef.current = nodes.map(() => ({
        timeOffset: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.3,
        radiusX: 15 + Math.random() * 15,
        radiusY: 15 + Math.random() * 15,
        parallaxFactor: 15 + Math.random() * 30,
        ox: 0,
        oy: 0,
      }));
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      targetMouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
 
    const tick = () => {
      // Smooth mouse for parallax
      smoothMouse.current.x += (targetMouse.current.x - smoothMouse.current.x) * 0.05;
      smoothMouse.current.y += (targetMouse.current.y - smoothMouse.current.y) * 0.05;
 
      const time = Date.now() / 1000;
      const containerRect = container.getBoundingClientRect();
 
      nodes.forEach((node, index) => {
        const el = nodesRef.current[index];
        const state = physicsRef.current[index];
        if (!el) return;
 
        const wX = Math.sin(time * state.speed + state.timeOffset) * state.radiusX;
        const wY = Math.cos(time * state.speed + state.timeOffset) * state.radiusY;
        const pX = -smoothMouse.current.x * state.parallaxFactor;
        const pY = -smoothMouse.current.y * state.parallaxFactor;
 
        state.ox = wX + pX;
        state.oy = wY + pY;
 
        // Base position in container coords
        const baseX =
          (parseFloat(node.left) / 100) * containerRect.width + state.ox;
        const baseY =
          (parseFloat(node.top) / 100) * containerRect.height + state.oy;
 
        // Magnetic scale based on distance from cursor
        const dx = mouseRef.current.x - containerRect.left - baseX;
        const dy = mouseRef.current.y - containerRect.top - baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
 
        let scale = 1;
        if (dist < MAGNETIC_RADIUS) {
          const t = 1 - dist / MAGNETIC_RADIUS; // 0 at edge, 1 at center
          if (node.type === 'team') {
            scale = 1 + (MAX_SCALE - 1) * Math.pow(t, 1.5);
          } else {
            scale = 1 + 0.4 * Math.pow(t, 2);
          }
        } else if (node.type === 'team' && hoveredIndex !== null && hoveredIndex !== index) {
          // Slightly shrink other team nodes when one is hovered
          scale = MIN_SCALE;
        }
 
        gsap.set(el, {
          x: state.ox,
          y: state.oy,
          scale,
          transformOrigin: '50% 50%',
        });
      });
 
      updateLines();
      rafRef.current = requestAnimationFrame(tick);
    };
 
    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(tick);
 
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [hoveredIndex, updateLines]);
 
  // Entry animation
  useEffect(() => {
    nodesRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'back.out(1.4)',
        },
      );
    });
  }, []);
 
  return (
    <section
      id="team"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden border-t border-white/5 bg-[#030712] py-24"
      style={{ cursor: 'none' }}
    >
      {/* Custom cursor glow */}
      <MagneticCursor />
 
      <p className="pointer-events-none absolute top-24 left-1/2 z-20 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-[#00E5FF]">
        The Architects
      </p>
 
      {/* Ambient radial gradient that follows mouse */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.04) 0%, transparent 70%)',
        }}
      />
 
      {/* SVG Lines */}
      <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" aria-hidden="true">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {edges.map((_, index) => (
          <line
            key={`line-${index}`}
            ref={(el) => { linesRef.current[index] = el; }}
            stroke="rgba(0,229,255,0.06)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
 
      {/* Nodes */}
      {nodes.map((node, index) => (
        <div
          key={`node-${index}`}
          ref={(el) => { nodesRef.current[index] = el; }}
          className="group absolute z-10 w-max -translate-x-1/2 -translate-y-1/2"
          style={{ top: node.top, left: node.left, opacity: 0 }}
          onMouseEnter={() => node.type === 'team' && setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {node.type === 'team' ? (
            <TeamNodeComponent node={node} isHovered={hoveredIndex === index} />
          ) : (
            <TechNodeComponent node={node} />
          )}
        </div>
      ))}
    </section>
  );
}
 
/* ─── Team Node ──────────────────────────────────────────────── */
 
function TeamNodeComponent({
  node,
  isHovered,
}: {
  node: TeamNode;
  isHovered: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
 
    if (isHovered) {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        ease: 'back.out(1.6)',
      });
    } else {
      gsap.to(card, {
        opacity: 0,
        y: 12,
        scale: 0.92,
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  }, [isHovered]);
 
  return (
    <div className="relative flex cursor-pointer flex-col items-center">
      {/* Hover ring glow */}
      {isHovered && (
        <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full opacity-30 ring-1 ring-[#00E5FF]" />
      )}
 
      {/* The label — font size is controlled by the parent's gsap scale */}
      <span
        className="font-serif text-3xl md:text-4xl transition-colors duration-200"
        style={{
          color: isHovered ? '#fff' : 'rgb(148,163,184)',
          textShadow: isHovered
            ? '0 0 40px rgba(0,229,255,0.6), 0 0 80px rgba(0,229,255,0.3)'
            : 'none',
        }}
      >
        /{node.name.toLowerCase().replaceAll(' ', '-')}
      </span>
 
      {/* Expanded card */}
      <div
        ref={cardRef}
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-5 flex w-72 -translate-x-1/2 flex-col items-start rounded-2xl border border-white/10 bg-[#080c14]/98 p-5 text-left shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_0_1px_rgba(0,229,255,0.08)] backdrop-blur-xl"
        style={{ opacity: 0, transform: 'translateY(12px) scale(0.92)' }}
      >
        {/* Connector arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#00E5FF]/20" />
        <div className="absolute top-full left-1/2 mt-px -translate-x-1/2 border-[7px] border-transparent border-t-[#080c14]" />
 
        {/* Accent line */}
        <div className="mb-4 h-px w-full bg-gradient-to-r from-[#00E5FF]/60 via-[#00E5FF]/20 to-transparent" />
 
        <div className="mb-1 flex items-center gap-2">
          <span className="text-lg">{node.emoji}</span>
          <p className="font-sans text-sm font-medium leading-relaxed text-slate-100">
            {node.detail}
          </p>
        </div>
 
        <p className="mb-4 text-xs text-slate-500">{node.name}</p>
 
        <div className="flex w-full items-center justify-between border-t border-white/8 pt-3">
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#00E5FF]/70">
            {node.role}
          </span>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00E5FF]/10 ring-1 ring-[#00E5FF]/20">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
 
/* ─── Tech Node ──────────────────────────────────────────────── */
 
function TechNodeComponent({ node }: { node: TechNode }) {
  return (
    <span className="cursor-default font-mono text-base text-slate-700 transition-colors duration-300 hover:text-slate-400">
      {node.name}
    </span>
  );
}
 
/* ─── Custom Cursor ──────────────────────────────────────────── */
 
function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
 
    let mx = 0, my = 0;
    let rx = 0, ry = 0;
 
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      gsap.set(dot, { x: mx, y: my });
    };
 
    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      gsap.set(ring, { x: rx, y: ry });
      requestAnimationFrame(tick);
    };
 
    window.addEventListener('mousemove', onMove);
    tick();
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
 
  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 6, height: 6,
          borderRadius: '50%',
          background: '#00E5FF',
          boxShadow: '0 0 12px #00E5FF',
          top: 0, left: 0,
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00E5FF]/40"
        style={{ width: 36, height: 36, top: 0, left: 0 }}
      />
    </>
  );
}
