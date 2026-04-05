'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

export default function CardsScene() {
  const compRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.card');
      cards.forEach((card: any, i) => {
        gsap.to(card, {
          opacity: 1, y: 0, duration: 0.75, delay: i * 0.14,
          scrollTrigger: { trigger: '.cards-section', start: 'top 72%' }
        });
      });
    }, compRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cards-section" ref={compRef}>
      <div className="cards-grid">
        <div className="card">
          <div className="card-num">01 &mdash; Physics</div>
          <div className="card-title">Dark Channel Prior</div>
          <div className="card-body">Explicit physical modeling of light scattering and attenuation. Fast, deterministic, GPU-free — the first stage of every restoration run.</div>
        </div>
        <div className="card">
          <div className="card-num">02 &mdash; Learning</div>
          <div className="card-title">U-Net Encoder</div>
          <div className="card-body">64 → 128 → 256 → 512 → 1024 channel progression. Skip connections preserve spatial detail the encoder would otherwise discard.</div>
        </div>
        <div className="card">
          <div className="card-num">03 &mdash; Fusion</div>
          <div className="card-title">6-ch Hybrid</div>
          <div className="card-body">Raw signal and DCP output are concatenated into a 6-channel tensor. The network learns to arbitrate between both at every pixel.</div>
        </div>
      </div>
    </section>
  );
}
