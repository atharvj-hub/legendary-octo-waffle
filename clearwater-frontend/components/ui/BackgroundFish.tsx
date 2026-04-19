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
    if (!container) return;
 
    const ctx = gsap.context(() => {
      const select = gsap.utils.selector(container);
      const fish = select('.fish')[0] as HTMLElement | undefined;
      const fishHeadAndBody = gsap.utils.toArray<HTMLElement>(
        '.fish__head, .fish__body',
        container,
      );
 
      if (!fish) return;
 
      const rx = window.innerWidth < 1000 ? window.innerWidth / 1200 : 1;
      const ry = window.innerHeight < 700 ? window.innerHeight / 1200 : 1;
 
      // Path that swims across the entire page height as you scroll
      const path = [
        { x: 800 * rx, y: 200 * ry },
        { x: 900 * rx, y: 20 * ry },
        { x: 1100 * rx, y: 100 * ry },
        { x: 1000 * rx, y: 200 * ry },
        { x: 900 * rx, y: 20 * ry },
        { x: 10 * rx, y: 500 * ry },
        { x: 100 * rx, y: 300 * ry },
        { x: 500 * rx, y: 400 * ry },
        { x: 1000 * rx, y: 200 * ry },
        { x: 1100 * rx, y: 300 * ry },
        { x: 400 * rx, y: 400 * ry },
        { x: 200 * rx, y: 250 * ry },
        { x: 100 * rx, y: 300 * ry },
        { x: 500 * rx, y: 450 * ry },
        { x: 1100 * rx, y: 500 * ry },
      ];
 
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });
 
      timeline.to(fish, {
        motionPath: { path, autoRotate: true },
        duration: 10,
        immediateRender: true,
      }, 0);
 
      // Flip vertically at midpoints to simulate banking/turning
      timeline.to(fish, { rotateX: 180 }, 1);
      timeline.to(fish, { rotateX: 0 }, 2.5);
      timeline.to(fish, { z: -500, duration: 2 }, 2.5);
      timeline.to(fish, { rotateX: 180 }, 4);
      timeline.to(fish, { rotateX: 0 }, 5.5);
      timeline.to(fish, { z: -50, duration: 2 }, 5);
      timeline.to(fish, { rotate: 0, duration: 1 }, '-=1');
 
      // Skeleton flash effect — deep dive moment
      timeline.to('.fish__skeleton', { opacity: 0.6, duration: 0.1, repeat: 4 }, '-=3');
      timeline.to(fishHeadAndBody, { opacity: 0, duration: 0.1, repeat: 4 }, '-=3');
      timeline.to('.fish__inner', { opacity: 0.1, duration: 1 }, '-=1');
 
      // Ambient light drift
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
      {/* Ambient lights */}
      <div className="lights">
        <div className="lights__group">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="lights__light" />
          ))}
        </div>
      </div>
 
      {/* Fish */}
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
