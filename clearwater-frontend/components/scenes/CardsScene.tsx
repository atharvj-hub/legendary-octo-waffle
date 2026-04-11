'use client';

import type { CSSProperties, MouseEvent } from 'react';
import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

const cards = [
  {
    number: '01 · Physics',
    title: 'Dark Channel Prior',
    body: 'Explicit physical modeling of light scattering and attenuation. Fast, deterministic, GPU-free.',
    cue: 'Water pathfinding',
  },
  {
    number: '02 · Learning',
    title: 'U-Net Encoder',
    body: '64→128→256→512→1024 channel progression. Skip connections preserve spatial detail.',
    cue: 'Semantic recovery',
  },
  {
    number: '03 · Fusion',
    title: '6-ch Hybrid',
    body: 'Raw signal and DCP output concatenated into a 6-channel tensor, arbitrated at every pixel.',
    cue: 'Human-grade finish',
  },
];

import { SplitWords } from '../../lib/splitText';

export default function CardsScene() {
  const compRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(compRef.current);
      gsap.set(cardRefs.current, { scale: 0.96, rotateX: 8 });
      gsap.set(q(".cards-split-word"), { opacity: 0, y: 24, rotateX: 20, transformOrigin: "50% 100%" });
      gsap.set(q(".card-spec-float"), { opacity: 0, y: 16, scale: 0.9 });
    }, compRef);
    return () => ctx.revert();
  }, []);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    const rotateY = ((x - 50) / 50) * 5;
    const rotateX = ((50 - y) / 50) * 4;
    target.style.setProperty('--mx', `${x}%`);
    target.style.setProperty('--my', `${y}%`);
    target.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
    target.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
  };

  const resetTilt = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    target.style.setProperty('--rx', '0deg');
    target.style.setProperty('--ry', '0deg');
    target.style.setProperty('--mx', '50%');
    target.style.setProperty('--my', '50%');
  };

  return (
    <section className="cards-section" ref={compRef} id="cards-section">
      {/* Procedural gradient — no images */}
      <div className="scene-gradient cards-gradient" aria-hidden="true" />
      <div className="scene-grid" aria-hidden="true" />

      <div className="cards-copy">
        <p className="cards-eyebrow">Dive protocol</p>
        <h2 className="cards-title" data-breathe>
          <SplitWords text="A restoration pipeline that behaves like an expedition." className="cards-split-word" />
        </h2>
        <p className="cards-body">Each chapter moves deeper into the image: physics for water behavior, learning for scene understanding, and fusion for a premium final frame.</p>
      </div>
      <div className="cards-grid">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="card"
            ref={(el) => { if (el) cardRefs.current[index] = el; }}
            onMouseMove={handleMove}
            onMouseLeave={resetTilt}
            style={{ '--mx': '50%', '--my': '50%', '--rx': '0deg', '--ry': '0deg' } as CSSProperties}
          >
            {/* No image — procedural card background */}
            <div className="card-gradient" aria-hidden="true" />
            <div className="card-inner">
              <div className="card-head">
                <div className="card-num">{card.number}</div>
                <div className="card-cue card-spec-float">{card.cue}</div>
              </div>
              <div className="card-title">{card.title}</div>
              <div className="card-body">{card.body}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
