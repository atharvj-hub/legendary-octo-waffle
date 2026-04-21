'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { CustomWiggle } from 'gsap/CustomWiggle';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    ScrollTrigger,
    MotionPathPlugin,
    CustomEase,
    CustomWiggle,
    Physics2DPlugin,
  );
  CustomWiggle.create('tailWiggle', { wiggles: 7, type: 'easeOut' });
  CustomWiggle.create('finWiggle', { wiggles: 4, type: 'uniform' });
}

const BUBBLE_COUNT = 6;

export default function BackgroundFish() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubblePoolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bubblePool = bubblePoolRef.current;

    if (!container || !bubblePool) {
      return;
    }

    const ctx = gsap.context(() => {
      const select = gsap.utils.selector(container);
      const fish = select('.fish')[0] as HTMLElement | undefined;
      const fishHeadAndBody = gsap.utils.toArray<HTMLElement>(
        '.fish__head, .fish__body',
        container,
      );
      const fishSkeleton = select('.fish__skeleton')[0] as HTMLElement | undefined;
      const fishInner = select('.fish__inner')[0] as HTMLElement | undefined;
      const tailFork = select('.fish__tail-fork')[0] as HTMLElement | undefined;
      const finPrimary = select('.fish__fin:not(.fish__fin--2)')[0] as HTMLElement | undefined;
      const finSecondary = select('.fish__fin--2')[0] as HTMLElement | undefined;
      const lights = gsap.utils.toArray<HTMLElement>('.lights__light', container);

      if (!fish) {
        return;
      }

      const rx = window.innerWidth < 1000 ? window.innerWidth / 1200 : 1;
      const ry = window.innerHeight < 700 ? window.innerHeight / 1200 : 1;

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

      timeline
        .to(
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
        )
        .to(fish, { rotateX: 180 }, 1)
        .to(fish, { rotateX: 0 }, 2.5)
        .to(fish, { z: -500, duration: 2 }, 2.5)
        .to(fish, { rotateX: 180 }, 4)
        .to(fish, { rotateX: 0 }, 5.5)
        .to(fish, { z: -50, duration: 2 }, 5)
        .to(fish, { rotate: 0, duration: 1 }, '-=1');

      if (fishSkeleton) {
        timeline.to(fishSkeleton, { opacity: 0.6, duration: 0.1, repeat: 4 }, '-=3');
      }

      timeline.to(fishHeadAndBody, { opacity: 0, duration: 0.1, repeat: 4 }, '-=3');

      if (fishInner) {
        timeline.to(fishInner, { opacity: 0.1, duration: 1 }, '-=1');
      }

      if (fishSkeleton) {
        timeline.to(fishSkeleton, { opacity: 0.1, duration: 1 }, '-=1');
      }

      if (tailFork) {
        gsap.to(tailFork, {
          rotateX: 38,
          duration: 1.1,
          ease: 'tailWiggle',
          repeat: -1,
          yoyo: true,
          transformOrigin: 'top center',
        });
      }

      if (finPrimary) {
        gsap.to(finPrimary, {
          rotateY: 12,
          rotateX: 22,
          rotate: -12,
          duration: 1.8,
          ease: 'finWiggle',
          repeat: -1,
          yoyo: true,
          transformOrigin: 'top center',
        });
      }

      if (finSecondary) {
        gsap.to(finSecondary, {
          rotateY: -12,
          rotateX: -22,
          rotate: -12,
          duration: 1.8,
          ease: 'finWiggle',
          repeat: -1,
          yoyo: true,
          delay: 0.3,
          transformOrigin: 'top center',
        });
      }

      const sectionTriggers = document.querySelectorAll<HTMLElement>('#hero, #story, #upload, #team');

      sectionTriggers.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 60%',
          onEnter: () => spawnBubbleBurst(fish, bubblePool),
          onEnterBack: () => spawnBubbleBurst(fish, bubblePool),
        });
      });

      gsap.to(lights, {
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
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[1]">
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

      <div
        ref={bubblePoolRef}
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      />
    </div>
  );
}

function spawnBubbleBurst(fish: HTMLElement, bubblePool: HTMLElement) {
  const { left, top, width, height } = fish.getBoundingClientRect();
  const originX = left + width / 2;
  const originY = top + height / 2;

  for (let index = 0; index < BUBBLE_COUNT; index += 1) {
    const size = gsap.utils.random(6, 18);
    const bubble = document.createElement('div');

    Object.assign(bubble.style, {
      position: 'fixed',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      border: '1px solid rgba(0,229,255,0.55)',
      background:
        'radial-gradient(circle at 35% 35%, rgba(0,229,255,0.18), transparent 70%)',
      left: `${originX}px`,
      top: `${originY}px`,
      transform: 'translate(-50%,-50%)',
      opacity: '0',
      pointerEvents: 'none',
    });

    bubblePool.appendChild(bubble);

    const angle = 270 + gsap.utils.random(-35, 35);
    const velocity = gsap.utils.random(80, 220);

    gsap
      .timeline({ onComplete: () => bubble.remove() })
      .set(bubble, { opacity: gsap.utils.random(0.5, 0.9) })
      .to(
        bubble,
        {
          physics2D: {
            angle,
            velocity,
            gravity: -180,
            friction: 0.15,
          },
          rotation: gsap.utils.random(-60, 60),
          scale: gsap.utils.random(0.8, 1.4),
          duration: gsap.utils.random(2.5, 4),
        },
        0,
      )
      .to(
        bubble,
        {
          opacity: 0,
          scale: 0.2,
          duration: 0.6,
          ease: 'power1.in',
        },
        '-=0.8',
      );
  }
}
