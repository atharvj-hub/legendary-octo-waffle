'use client';

import React, { useRef, useState } from 'react';
import { useStore } from '../../store/useStore';

const prompts = [
  '/recover reef pigments',
  '/clarify diver portrait',
  '/restore twilight kelp',
];

export default function UploadZone() {
  const setLabState = useStore((state) => state.setLabState);
  const zoneRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [activePrompt, setActivePrompt] = useState(prompts[0]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!zoneRef.current) {
      return;
    }

    const bounds = zoneRef.current.getBoundingClientRect();
    setCoords({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    });
  };

  const startPipeline = () => {
    setLabState('processing');
  };

  return (
    <div
      className="upload-z"
      ref={zoneRef}
      onMouseMove={handleMouseMove}
      style={{ '--mx': `${coords.x}%`, '--my': `${coords.y}%` } as React.CSSProperties}
    >
      <div className="up-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 16V8m0 0L9 11m3-3 3 3M6 20h12" />
        </svg>
      </div>
      <div className="up-title">Drop an underwater image</div>
      <p className="up-hint">PNG - JPG - WEBP - up to 10MB</p>
      <div className="up-signal">Ask Clearwater</div>
      <p className="up-active">{activePrompt}</p>
      <div className="up-prompts">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className={`up-chip${activePrompt === prompt ? ' is-active' : ''}`}
            onClick={(event) => {
              event.stopPropagation();
              setActivePrompt(prompt);
            }}
          >
            {prompt}
          </button>
        ))}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          if (event.target.files && event.target.files.length > 0) {
            startPipeline();
          }
        }}
      />
      <br />
      <button
        className="demo-btn"
        onClick={(event) => {
          event.stopPropagation();
          startPipeline();
        }}
      >
        Try demo
      </button>
    </div>
  );
}
