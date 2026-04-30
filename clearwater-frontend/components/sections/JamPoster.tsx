'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function JamPoster() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const jamTime = 6;
    const jamDist = 700;
    const master = gsap.timeline({ delay: 1 });

    function animateJam() {
        const tl = gsap.timeline({ 
            defaults: {
                duration: jamTime,
                ease: "power4"
            },
            repeat: -1
        });
        tl.from('.jam-a', { x: jamDist*1 })
        .from('.jam-jm', { x: -jamDist*1.5 }, 0)
        .from('.jam-dot', { x: -jamDist/1.4 }, 0)
        .to('.jam-a', { x: -jamDist*2, ease: "power4.in" }, jamTime)
        .to('.jam-jm', { x: jamDist*2, ease: "power4.in" }, jamTime)
        .to('.jam-dot', { x: jamDist*1.1, ease: "power4.in" }, jamTime)
        
        return tl;
    }

    function animateText() {
        return gsap.from('.jam-text-span', {
            x: -100,
            opacity: 0,
            stagger: 0.1,
            duration: 4,
            ease: "power4"
        });
    }

    if (containerRef.current) {
        gsap.set(containerRef.current, { autoAlpha: 1 });
    }
    master.add(animateJam()).add(animateText(), 0);

    const handleResize = () => {
        if (!containerRef.current) return;
        const vh = window.innerHeight;
        const sh = 1008;
        const scaleFactor = vh/sh;
        if(scaleFactor < 1) {
            gsap.set(containerRef.current, { scale: scaleFactor });
        } else {
            gsap.set(containerRef.current, { scale: 1 });
        }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, { scope: containerRef });

  return (
    <div className="flex justify-center items-center w-full min-h-screen overflow-hidden py-12 relative z-10">
      <div 
        ref={containerRef} 
        className="relative w-[716px] h-[1008px] origin-center cursor-pointer shadow-[20px_20px_0px_#000] border-[12px] border-black bg-[#DDE1D4]"
        onClick={() => {
            gsap.globalTimeline.restart();
        }}
      >
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 716 1008">
              <defs>
                  <mask id="jm-mask">
                      <rect width="100%" height="100%" fill="#fff" x="0" y="0" />
                      <path transform="translate(-14.18 394)" className="jam-jm" fill="#000" d="M58.032,583.856 C91.884,583.856 120.9,576.602 142.662,557.258 C161.2,540.332 173.29,513.734 173.29,464.568 L173.29,11.596 L70.928,11.596 L70.928,460.538 C70.928,491.166 57.226,501.644 30.628,503.256 C22.568,504.062 13.702,503.256 4.03,503.256 L-1.13686838e-13,503.256 L-1.13686838e-13,578.214 C15.314,581.438 37.882,583.856 58.032,583.856 Z M333.148,442 L333.148,187.304 C333.148,126.854 375.06,84.942 422.614,84.942 C465.332,84.942 490.318,114.764 490.318,163.93 L490.318,442 L592.68,442 L592.68,187.304 C592.68,126.854 629.756,84.942 679.728,84.942 C721.64,84.942 749.85,114.764 749.85,163.93 L749.85,442 L852.212,442 L852.212,150.228 C852.212,57.538 800.628,0.312 712.774,0.312 C659.578,0.312 611.218,25.298 577.366,80.912 L575.754,80.912 C556.41,27.716 515.304,0.312 461.302,0.312 C402.464,0.312 359.746,28.522 332.342,76.882 L329.924,76.882 L329.924,11.596 L230.786,11.596 L230.786,442 L333.148,442 Z"/>
                  </mask>
              </defs>
              <g fill="none" fillRule="evenodd">
                  <rect className="bg" width="750" height="1008" fill="#DDE1D4" />
                  <g transform="translate(-14.18 394)">
                      <path className="jam-a" fill="#00000A" fillRule="nonzero" d="M221.052,454.284 C287.144,454.284 322.608,430.104 350.818,390.61 L352.43,390.61 C354.848,414.79 360.49,433.328 366.938,443 L490.256,443 L490.256,435.746 C478.972,428.492 474.136,409.954 474.136,376.102 L474.136,156.064 C474.136,98.032 453.18,53.702 408.85,27.91 C379.028,10.178 340.34,2.118 285.532,2.118 C158.184,2.118 98.54,70.628 95.316,143.974 L212.186,143.974 C215.41,110.122 238.784,87.554 287.144,87.554 C330.668,87.554 350.818,108.51 350.818,139.138 C350.818,171.378 319.384,183.468 242.814,193.946 C149.318,205.23 74.36,229.41 74.36,324.518 C74.36,409.148 136.422,454.284 221.052,454.284 Z M260.546,371.266 C225.888,371.266 197.678,357.564 197.678,320.488 C197.678,283.412 224.276,269.71 279.89,257.62 L282.058274,257.123918 C309.499504,250.838154 335.979333,244.434667 354.042,233.44 L354.042,289.054 C354.042,335.802 316.966,371.266 260.546,371.266 Z"/>
                  </g>
                  <rect className="stage" width="716" height="1020" fill="red" mask="url(#jm-mask)"/>
                  <rect className="jam-dot" width="102.35" height="105" x="56.75" y="233.14" fill="#DDE1D4"/>
              </g>
          </svg>
          <div className="absolute inset-0 flex flex-col justify-between p-16 text-[#00000A] font-mono uppercase tracking-tight pointer-events-none">
              <div className="flex flex-col space-y-6">
                  <h1 className="leading-none flex flex-col m-0 p-0 text-left w-full items-start">
                    <span className="jam-text-span text-3xl font-bold tracking-[0.2em] text-red-600 mb-2">Clearwater Interface</span>
                    <span className="jam-text-span font-display text-[12rem] text-[#00000A]">THE JAM</span>
                  </h1>
                  <p className="flex flex-col text-3xl font-bold mt-12 bg-white/80 w-fit p-4 border-4 border-black">
                    <span className="jam-text-span">underwater vision enhancement</span>
                    <span className="jam-text-span text-red-600">from zero visibility to pristine</span>
                  </p>
                  <p className="flex flex-col text-2xl font-bold mt-4 bg-black text-white w-fit p-4">
                    <span className="jam-text-span">max brutalist edition</span>
                    <span className="jam-text-span">with gsao & three.js</span>
                  </p>
              </div>
              
              <p className="flex flex-col text-4xl font-display font-bold text-red-600 bg-white border-8 border-black p-6 w-fit transform -rotate-2">
                <span className="jam-text-span">powered by next.js</span>
                <span className="jam-text-span">the jam / vol 1</span>
              </p>
          </div>
      </div>
    </div>
  );
}
