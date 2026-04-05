'use client';

import React, { useRef, useState } from 'react';
import { useStore } from '../../store/useStore';

export default function UploadZone() {
  const setLabState = useStore(state => state.setLabState);
  const zRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zRef.current) return;
    const r = zRef.current.getBoundingClientRect();
    setCoords({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  const startPipeline = () => {
    setLabState('processing');
  };

  return (
    <div 
      className="upload-z" 
      ref={zRef}
      onMouseMove={handleMouseMove}
      style={{ '--mx': `${coords.x}%`, '--my': `${coords.y}%` } as React.CSSProperties}
    >
      <div className="up-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 16V8m0 0L9 11m3-3 3 3M6 20h12"/>
        </svg>
      </div>
      <div className="up-title">Drop an underwater image</div>
      <p className="up-hint">PNG &bull; JPG &bull; WEBP &mdash; up to 10MB</p>
      <input type="file" accept="image/*" onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) startPipeline();
      }} />
      <br />
      <button className="demo-btn" onClick={(e) => {
         e.stopPropagation();
         startPipeline();
      }}>Try demo</button>
    </div>
  );
}
