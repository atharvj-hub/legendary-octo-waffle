'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type TeamNode = {
  detail: string;
  id: string;
  left: string;
  name: string;
  role: string;
  top: string;
  type: 'team';
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
    name: 'Atharv Jandial',
    role: 'Vision Engineer',
    id: '25BEMNC15',
    detail: 'Core ML Pipeline & Model Training',
    top: '20%',
    left: '15%',
  },
  {
    type: 'team',
    name: 'Advitya Sharma',
    role: 'Vision Engineer',
    id: '25BEMNC05',
    detail: 'SS-UIE Neural Architecture',
    top: '65%',
    left: '20%',
  },
  {
    type: 'team',
    name: 'Darsh Dhawan',
    role: 'Vision Engineer',
    id: '25BECCS22',
    detail: 'DCP Physics Modeling',
    top: '30%',
    left: '65%',
  },
  {
    type: 'team',
    name: 'Divij Singh Soodan',
    role: 'Vision Engineer',
    id: '25BECSE26',
    detail: 'Cross-class NMS & Detection',
    top: '75%',
    left: '70%',
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
  [0, 5],
  [1, 6],
  [2, 5],
  [3, 6],
  [4, 5],
  [4, 6],
  [5, 2],
  [0, 1],
  [1, 4],
  [2, 4],
  [3, 4],
];

export default function TeamConstellation() {
  const containerRef = useRef<HTMLElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lineRefs = useRef<Array<SVGLineElement | null>>([]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const ctx = gsap.context(() => {
      const physicsState = nodes.map(() => ({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        wanderTheta: Math.random() * Math.PI * 2,
      }));

      const mouse = { x: -1000, y: -1000 };

      const handleMouseMove = (event: MouseEvent) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
      };

      const handleResize = () => {
        renderPhysics();
      };

      const xSetters = nodeRefs.current.map((element) =>
        element ? gsap.quickSetter(element, 'x', 'px') : null,
      );
      const ySetters = nodeRefs.current.map((element) =>
        element ? gsap.quickSetter(element, 'y', 'px') : null,
      );

      const renderPhysics = () => {
        const containerRect = container.getBoundingClientRect();

        physicsState.forEach((state, index) => {
          const element = nodeRefs.current[index];
          const xSetter = xSetters[index];
          const ySetter = ySetters[index];

          if (!element || !xSetter || !ySetter) {
            return;
          }

          state.wanderTheta += 0.015;
          state.vx += Math.cos(state.wanderTheta) * 0.05;
          state.vy += Math.sin(state.wanderTheta) * 0.05;

          const rect = element.getBoundingClientRect();
          const elementCenterX = rect.left + rect.width / 2;
          const elementCenterY = rect.top + rect.height / 2;
          const dx = elementCenterX - mouse.x;
          const dy = elementCenterY - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const safeDistance = Math.max(distance, 0.001);
          const repelRadius = 250;

          if (distance < repelRadius) {
            const force = (repelRadius - distance) / repelRadius;

            state.vx += (dx / safeDistance) * force * 1.5;
            state.vy += (dy / safeDistance) * force * 1.5;
          }

          const springForce = 0.01;
          state.vx += (0 - state.x) * springForce;
          state.vy += (0 - state.y) * springForce;

          const friction = 0.92;
          state.vx *= friction;
          state.vy *= friction;

          state.x += state.vx;
          state.y += state.vy;

          xSetter(state.x);
          ySetter(state.y);
        });

        edges.forEach(([startIndex, endIndex], index) => {
          const startNode = nodeRefs.current[startIndex];
          const endNode = nodeRefs.current[endIndex];
          const line = lineRefs.current[index];

          if (!startNode || !endNode || !line) {
            return;
          }

          const startRect = startNode.getBoundingClientRect();
          const endRect = endNode.getBoundingClientRect();
          const x1 = startRect.left + startRect.width / 2 - containerRect.left;
          const y1 = startRect.top + startRect.height / 2 - containerRect.top;
          const x2 = endRect.left + endRect.width / 2 - containerRect.left;
          const y2 = endRect.top + endRect.height / 2 - containerRect.top;

          line.setAttribute('x1', x1.toString());
          line.setAttribute('y1', y1.toString());
          line.setAttribute('x2', x2.toString());
          line.setAttribute('y2', y2.toString());
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      renderPhysics();
      gsap.ticker.add(renderPhysics);

      return () => {
        gsap.ticker.remove(renderPhysics);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden border-t border-white/5 bg-[#030712] py-24"
    >
      <p className="absolute top-24 left-1/2 z-20 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-[#00E5FF]">
        The Architects
      </p>

      <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" aria-hidden="true">
        {edges.map((_, index) => (
          <line
            key={`line-${index}`}
            ref={(element) => {
              lineRefs.current[index] = element;
            }}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {nodes.map((node, index) => (
        <div
          key={`node-${index}`}
          ref={(element) => {
            nodeRefs.current[index] = element;
          }}
          className="group absolute z-10 w-max -translate-x-1/2 -translate-y-1/2"
          style={{ top: node.top, left: node.left }}
        >
          {node.type === 'team' ? (
            <div className="flex cursor-crosshair flex-col items-center">
              <span className="font-serif text-3xl text-slate-300 transition-colors duration-300 group-hover:text-white md:text-4xl">
                /{node.name.toLowerCase().replaceAll(' ', '-')}
              </span>

              <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-4 flex w-64 -translate-x-1/2 translate-y-4 flex-col items-start rounded-xl border border-white/10 bg-[#0a0a0a]/95 p-5 text-left opacity-0 shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <div className="absolute top-full left-1/2 -mt-[1px] -translate-x-1/2 border-8 border-transparent border-t-white/10" />
                <div className="absolute top-full left-1/2 -mt-[2px] -translate-x-1/2 border-8 border-transparent border-t-[#0a0a0a]" />

                <p className="mb-4 font-sans text-sm text-slate-200">{node.detail}</p>

                <div className="flex w-full items-center justify-between border-t border-white/10 pt-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#00E5FF]">
                      {node.id}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-slate-500">
                      {node.role}
                    </span>
                  </div>

                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/5">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00E5FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <span className="cursor-default font-serif text-xl text-slate-600 transition-colors duration-300 group-hover:text-slate-400">
              {node.name}
            </span>
          )}
        </div>
      ))}
    </section>
  );
}
