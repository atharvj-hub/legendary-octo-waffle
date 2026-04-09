'use client';

import Image from 'next/image';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { campaignAssets } from '../../lib/assets/manifest';
import { useStore } from '../../store/useStore';

export default function BeforeAfterSlider() {
  const resetLab = useStore(state => state.resetLab);
  const wrapRef = useRef<HTMLDivElement>(null);
  
  const [sliderPct, setSliderPct] = useState(50);
  const [dragging, setDragging] = useState(false);

  const setPos = (clientX: number) => {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const pct = Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100));
    setSliderPct(pct);
  };

  useEffect(() => {
    const handleMouseUp = () => setDragging(false);
    const handleMouseMove = (e: MouseEvent) => { if (dragging) setPos(e.clientX); };
    const handleTouchEnd = () => setDragging(false);
    const handleTouchMove = (e: TouchEvent) => { if (dragging) setPos(e.touches[0].clientX); };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [dragging]);

  /* ── Fix 10.7: Keyboard accessibility ── */
  const handleRangeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPct(Number(e.target.value));
  }, []);

  /* ── Fix 10.4: Canvas-based download ── */
  const handleDownload = useCallback(async () => {
    try {
      const imgSrc = campaignAssets.lab.afterDemo.path;
      const res = await fetch(imgSrc);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'clearwater-restored.webp';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open image in new tab
      window.open(campaignAssets.lab.afterDemo.path, '_blank');
    }
  }, []);

  return (
    <div className="result-z" style={{ display: 'block' }}>
      <div 
        className="slider-wrap" 
        ref={wrapRef}
        onMouseDown={(e) => { setDragging(true); setPos(e.clientX); }}
        onTouchStart={(e) => { setDragging(true); setPos(e.touches[0].clientX); }}
      >
        <div className="img-after">
          <Image
            src={campaignAssets.lab.afterDemo.path}
            alt={campaignAssets.lab.afterDemo.alt}
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            className="slider-img"
          />
          <div className="after-particles"></div>
          <span className="img-label lbl-a">Enhanced</span>
        </div>
        
        <div 
          className="img-before" 
          style={{ clipPath: `inset(0 ${(100 - sliderPct).toFixed(1)}% 0 0)` }}
        >
          <Image
            src={campaignAssets.lab.beforeDemo.path}
            alt={campaignAssets.lab.beforeDemo.alt}
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            className="slider-img"
          />
          <div className="before-haze"></div>
          <div className="before-scatter"></div>
          <span className="img-label lbl-b">Original</span>
        </div>
        
        <div className="slider-div" style={{ left: `${sliderPct.toFixed(1)}%` }}>
          <div className="slider-hdl">&#8596;</div>
        </div>

        {/* Fix 10.7: Keyboard-accessible range input mapped to slider */}
        <input
          type="range"
          min={2}
          max={98}
          step={1}
          value={sliderPct}
          onChange={handleRangeChange}
          className="slider-range-input"
          aria-label="Before and after comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPct)}
          aria-valuetext={`${Math.round(sliderPct)}% original, ${Math.round(100 - sliderPct)}% enhanced`}
        />
      </div>
      
      {/* Fix 10.3: Demo-only label on result */}
      <div className="result-demo-notice">
        <span className="demo-badge">Sample output — demo only</span>
      </div>

      <div className="result-bar">
        <span className="result-meta">PSNR &nbsp;28.4 dB &nbsp;&bull;&nbsp; SSIM &nbsp;0.871 &nbsp;&bull;&nbsp; 512 &times; 512</span>
        <div className="result-btns">
          <button className="btn-new" onClick={resetLab}>New image</button>
          {/* Fix 10.4: Download button wired up */}
          <button className="btn-dl" onClick={handleDownload}>Download</button>
        </div>
      </div>
    </div>
  );
}
