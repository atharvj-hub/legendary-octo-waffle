'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type TeamNode = {
  detail: string;
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
    name: 'Atharv Jandal',
    role: 'Vision Engineer',
    detail: 'Core ML Pipeline & Model Training',
    top: '20%',
    left: '15%',
  },
  {
    type: 'team',
    name: 'Advitya Sharma',
    role: 'Vision Engineer',
    detail: 'SS-UIE Neural Architecture',
    top: '65%',
    left: '20%',
  },
  {
    type: 'team',
    name: 'Darsh Dhawan',
    role: 'Vision Engineer',
    detail: 'DCP Physics Modeling',
    top: '30%',
    left: '65%',
  },
  {
    type: 'team',
    name: 'Divij Singh Soodan',
    role: 'Vision Engineer',
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
  const nodesRef = useRef<Array<HTMLDivElement | null>>([]);
  const linesRef = useRef<Array<SVGLineElement | null>>([]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const ctx = gsap.context(() => {
      const physicsState = nodes.map(() => ({
        timeOffset: Math.random() * Math.PI * 2,
        speed: gsap.utils.random(0.3, 0.6),
        radiusX: gsap.utils.random(15, 30),
        radiusY: gsap.utils.random(15, 30),
        parallaxFactor: gsap.utils.random(15, 45),
      }));

      const targetMouse = { x: 0, y: 0 };
      const smoothMouse = { x: 0, y: 0 };

      const handleMouseMove = (event: MouseEvent) => {
        targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        targetMouse.y = (event.clientY / window.innerHeight) * 2 - 1;
      };

      const xSetters = nodesRef.current.map((element) =>
        element ? gsap.quickSetter(element, 'x', 'px') : null,
      );
      const ySetters = nodesRef.current.map((element) =>
        element ? gsap.quickSetter(element, 'y', 'px') : null,
      );

      const renderPhysics = () => {
        smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.05;
        smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.05;

        const time = Date.now() / 1000;
        const containerRect = container.getBoundingClientRect();

        physicsState.forEach((state, index) => {
          const element = nodesRef.current[index];
          const xSetter = xSetters[index];
          const ySetter = ySetters[index];

          if (!element || !xSetter || !ySetter) {
            return;
          }

          const wanderX = Math.sin(time * state.speed + state.timeOffset) * state.radiusX;
          const wanderY = Math.cos(time * state.speed + state.timeOffset) * state.radiusY;
          const parallaxX = -smoothMouse.x * state.parallaxFactor;
          const parallaxY = -smoothMouse.y * state.parallaxFactor;

          xSetter(wanderX + parallaxX);
          ySetter(wanderY + parallaxY);
        });

        edges.forEach(([startIndex, endIndex], index) => {
          const startNode = nodesRef.current[startIndex];
          const endNode = nodesRef.current[endIndex];
          const line = linesRef.current[index];

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
      renderPhysics();
      gsap.ticker.add(renderPhysics);

      return () => {
        gsap.ticker.remove(renderPhysics);
        window.removeEventListener('mousemove', handleMouseMove);
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
      <p className="pointer-events-none absolute top-24 left-1/2 z-20 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-[#00E5FF]">
        The Architects
      </p>

      <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" aria-hidden="true">
        {edges.map((_, index) => (
          <line
            key={`line-${index}`}
            ref={(element) => {
              linesRef.current[index] = element;
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
            nodesRef.current[index] = element;
          }}
          className="group absolute z-10 w-max -translate-x-1/2 -translate-y-1/2"
          style={{ top: node.top, left: node.left }}
        >
          {node.type === 'team' ? (
            <div className="flex cursor-pointer flex-col items-center">
              <span className="font-serif text-3xl text-slate-300 transition-colors duration-300 group-hover:text-white md:text-4xl">
                /{node.name.toLowerCase().replaceAll(' ', '-')}
              </span>

              <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-4 flex w-64 -translate-x-1/2 translate-y-4 flex-col items-start rounded-xl border border-white/10 bg-[#0a0a0a]/95 p-5 text-left opacity-0 shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <div className="absolute top-full left-1/2 -mt-[1px] -translate-x-1/2 border-8 border-transparent border-t-white/10" />
                <div className="absolute top-full left-1/2 -mt-[2px] -translate-x-1/2 border-8 border-transparent border-t-[#0a0a0a]" />

                <p className="mb-4 font-sans text-sm text-slate-200">{node.detail}</p>

                <div className="flex w-full items-center justify-between border-t border-white/10 pt-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                    {node.role}
                  </span>

                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/5">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00E5FF"
                      strokeWidth="2"
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
