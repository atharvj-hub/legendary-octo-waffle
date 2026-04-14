'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function BackgroundFish() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const ctx = gsap.context(() => {
      const select = gsap.utils.selector(container);
      const fish = select('.fish')[0] as HTMLElement | undefined;
      const fishHeadAndBody = gsap.utils.toArray<HTMLElement>(
        '.fish__head, .fish__body',
        container,
      );

      if (!fish) {
        return;
      }

      const rx = window.innerWidth < 1000 ? window.innerWidth / 1200 : 1;
      const ry = window.innerHeight < 700 ? window.innerHeight / 1200 : 1;

      const path = [
        { x: 800, y: 200 },
        { x: 900, y: 20 },
        { x: 1100, y: 100 },
        { x: 1000, y: 200 },
        { x: 900, y: 20 },
        { x: 10, y: 500 },
        { x: 100, y: 300 },
        { x: 500, y: 400 },
        { x: 1000, y: 200 },
        { x: 1100, y: 300 },
        { x: 400, y: 400 },
        { x: 200, y: 250 },
        { x: 100, y: 300 },
        { x: 500, y: 450 },
        { x: 1100, y: 500 },
      ].map((point) => ({ x: point.x * rx, y: point.y * ry }));

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });

      timeline.to(
        fish,
        {
          motionPath: {
            path,
            autoRotate: true,
          },
          duration: 10,
          immediateRender: true,
        },
        0,
      );

      timeline.to(fish, { rotateX: 180 }, 1);
      timeline.to(fish, { rotateX: 0 }, 2.5);
      timeline.to(fish, { z: -500, duration: 2 }, 2.5);
      timeline.to(fish, { rotateX: 180 }, 4);
      timeline.to(fish, { rotateX: 0 }, 5.5);
      timeline.to(fish, { z: -50, duration: 2 }, 5);
      timeline.to(fish, { rotate: 0, duration: 1 }, '-=1');
      timeline.to('.fish__skeleton', { opacity: 0.6, duration: 0.1, repeat: 4 }, '-=3');
      timeline.to(fishHeadAndBody, { opacity: 0, duration: 0.1, repeat: 4 }, '-=3');
      timeline.to('.fish__inner', { opacity: 0.1, duration: 1 }, '-=1');

      gsap.to('.lights__light', {
        x: () => gsap.utils.random(-100, 100),
        y: () => gsap.utils.random(-100, 100),
        duration: () => gsap.utils.random(5, 10),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        repeatRefresh: true,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0">
      <div className="lights">
        <div className="lights__group">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="lights__light" />
          ))}
        </div>
      </div>

      <div className="fish-wrapper">
        <div className="fish">
          <div className="fish__skeleton" />
          <div className="fish__inner">
            <div className="fish__body" />
            <div className="fish__body" />
            <div className="fish__body" />
            <div className="fish__body" />

            <div className="fish__head" />
            <div className="fish__head fish__head--2" />
            <div className="fish__head fish__head--3" />
            <div className="fish__head fish__head--4" />

            <div className="fish__tail-main" />
            <div className="fish__tail-fork" />

            <div className="fish__fin" />
            <div className="fish__fin fish__fin--2" />
          </div>
        </div>
      </div>
    </div>
  );
}
