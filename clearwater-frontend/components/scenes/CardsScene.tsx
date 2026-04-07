'use client';

import Image from 'next/image';
import type { CSSProperties, MouseEvent } from 'react';
import { useEffect, useRef } from 'react';
import { campaignAssets } from '../../lib/assets/manifest';
import { gsap } from '../../lib/gsap';

const cards = [
  {
    number: '01 - Physics',
    title: 'Dark Channel Prior',
    body: 'Explicit physical modeling of light scattering and attenuation. Fast, deterministic, GPU-free - the first stage of every restoration run.',
    cue: 'Water pathfinding',
    image: campaignAssets.cards.reefMemory,
  },
  {
    number: '02 - Learning',
    title: 'U-Net Encoder',
    body: '64 to 128 to 256 to 512 to 1024 channel progression. Skip connections preserve spatial detail the encoder would otherwise discard.',
    cue: 'Semantic recovery',
    image: campaignAssets.cards.diverLens,
  },
  {
    number: '03 - Fusion',
    title: '6-ch Hybrid',
    body: 'Raw signal and DCP output are concatenated into a 6-channel tensor. The network learns to arbitrate between both at every pixel.',
    cue: 'Human-grade finish',
    image: campaignAssets.cards.sonarAbyss,
  },
];

export default function CardsScene() {
  const compRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardRefs.current, { scale: 0.96, rotateX: 8 });
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
      <div className="cards-copy" ref={copyRef}>
        <p className="cards-eyebrow">Dive protocol</p>
        <h2 className="cards-title">A restoration pipeline that behaves like an expedition.</h2>
        <p className="cards-body">Each chapter moves deeper into the image: physics for water behavior, learning for scene understanding, and fusion for a premium final frame.</p>
      </div>
      <div className="cards-grid">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="card"
            ref={(element) => {
              if (element) {
                cardRefs.current[index] = element;
              }
            }}
            onMouseMove={handleMove}
            onMouseLeave={resetTilt}
            style={{ '--mx': '50%', '--my': '50%', '--rx': '0deg', '--ry': '0deg' } as CSSProperties}
          >
            <Image
              src={card.image.path}
              alt={card.image.alt}
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
              className="card-plate"
            />
            <div className="card-inner">
              <div className="card-head">
                <div className="card-num">{card.number}</div>
                <div className="card-cue">{card.cue}</div>
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
