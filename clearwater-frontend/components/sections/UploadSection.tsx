'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type UploadState = 'idle' | 'dragging' | 'loaded' | 'processing' | 'done';

export default function UploadSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const dropzoneRef  = useRef<HTMLDivElement>(null);
  const resultsRef   = useRef<HTMLDivElement>(null);
  const [state, setState]   = useState<UploadState>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const [mode, setMode]     = useState<'enhance' | 'detect' | null>(null);
  const dragCounter = useRef(0);

  /* ─── Section entrance ─────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.upload-reveal',
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ─── Processing animation ─────────────────────────── */
  const runProcessing = useCallback((selectedMode: 'enhance' | 'detect') => {
    setMode(selectedMode);
    setState('processing');

    // Pulse the dropzone while processing
    const pulseTween = gsap.to(dropzoneRef.current, {
      boxShadow: '0 0 0 4px rgba(0,229,255,0.3), 0 0 60px rgba(0,229,255,0.15)',
      duration: 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });

    // Simulate async — replace with real API call
    setTimeout(() => {
      pulseTween.kill();
      gsap.to(dropzoneRef.current, { boxShadow: 'none', duration: 0.3 });
      setState('done');
      // Animate results in
      gsap.fromTo(
        resultsRef.current,
        { opacity: 0, y: 32, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', delay: 0.1 },
      );
    }, 2400);
  }, []);

  /* ─── Drag & drop handlers ─────────────────────────── */
  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    if (dragCounter.current === 1) setState('dragging');
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setState(prev => prev === 'dragging' ? 'idle' : prev);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current = 0;
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setState('loaded');
    gsap.fromTo(dropzoneRef.current, { scale: 0.97 }, { scale: 1, duration: 0.5, ease: 'back.out(1.6)' });
  }, []);

  const onFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setState('loaded');
  }, []);

  const reset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setState('idle');
    setMode(null);
    gsap.to(resultsRef.current, { opacity: 0, y: 16, duration: 0.35, ease: 'power2.in' });
  }, [preview]);

  const isDragging   = state === 'dragging';
  const isLoaded     = state === 'loaded' || state === 'processing' || state === 'done';
  const isProcessing = state === 'processing';
  const isDone       = state === 'done';

  return (
    <section
      ref={sectionRef}
      id="upload"
      className="relative w-full bg-[#030712] py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-[#00E5FF]/[0.03] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="upload-reveal mb-16 opacity-0">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#00E5FF]/60">
            Processing Engine
          </p>
          <h2
            className="text-4xl font-light text-white md:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Drop a frame.<br />
            <em className="text-[#00E5FF]">Watch it transform.</em>
          </h2>
        </div>

        {/* Drop Zone */}
        <div
          ref={dropzoneRef}
          className={`upload-reveal relative overflow-hidden rounded-3xl border transition-all duration-300 opacity-0 ${
            isDragging
              ? 'border-[#00E5FF]/60 bg-[#00E5FF]/[0.06] shadow-[0_0_40px_rgba(0,229,255,0.12)]'
              : isLoaded
              ? 'border-[#00E5FF]/20 bg-[#04121e]/80'
              : 'border-dashed border-white/10 bg-[#04121e]/60 hover:border-white/20'
          }`}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          style={{ minHeight: 280 }}
        >
          {!isLoaded ? (
            /* Empty state */
            <label className="flex h-full min-h-[280px] cursor-pointer flex-col items-center justify-center gap-5 p-10">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={onFileInput}
              />
              <div className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300 ${isDragging ? 'border-[#00E5FF]/60 bg-[#00E5FF]/15' : 'border-white/15 bg-white/5'}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isDragging ? '#00E5FF' : '#64748b'} strokeWidth="1.5" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div className="text-center">
                <p className={`font-mono text-sm uppercase tracking-widest transition-colors ${isDragging ? 'text-[#00E5FF]' : 'text-slate-400'}`}>
                  {isDragging ? 'Release to upload' : 'Drop degraded frame here'}
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-600">
                  PNG · JPG · WEBP
                </p>
              </div>
            </label>
          ) : (
            /* Loaded state */
            <div className="flex min-h-[280px] items-center gap-6 p-6">
              {preview && (
                <div className="relative h-48 w-64 flex-shrink-0 overflow-hidden rounded-xl border border-white/10">
                  <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                  {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-transparent border-t-[#00E5FF]" />
                    </div>
                  )}
                  {isDone && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#00E5FF]/10">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" aria-label="Done">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                  )}
                </div>
              )}
              <div className="flex-1">
                <p className="mb-1 font-mono text-xs text-slate-400">
                  {isProcessing
                    ? `Running ${mode === 'enhance' ? 'enhancement' : 'detection'}…`
                    : isDone
                    ? `${mode === 'enhance' ? 'Enhancement' : 'Detection'} complete`
                    : 'Frame loaded — select an operation'}
                </p>
                {isDone && (
                  <button
                    onClick={reset}
                    className="mt-4 font-mono text-[10px] uppercase tracking-widest text-slate-600 underline transition-colors hover:text-slate-400"
                  >
                    Upload another
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        {(state === 'loaded' || isProcessing) && (
          <div className="upload-reveal mt-8 flex items-center justify-center gap-4 opacity-100">
            <MagBtn
              accent="#00E5FF"
              label="Run Enhancement"
              loading={isProcessing && mode === 'enhance'}
              disabled={isProcessing}
              onClick={() => runProcessing('enhance')}
            />
            <MagBtn
              accent="rgba(255,255,255,0.12)"
              label="Run Detection"
              loading={isProcessing && mode === 'detect'}
              disabled={isProcessing}
              border
              onClick={() => runProcessing('detect')}
            />
          </div>
        )}

        {/* Results placeholder */}
        <div ref={resultsRef} className="mt-12 opacity-0">
          {isDone && (
            <div className="overflow-hidden rounded-3xl border border-white/8 bg-[#04121e]/80 p-1">
              <div className="flex min-h-[300px] items-center justify-center rounded-2xl bg-[#020a10]">
                <div className="text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
                    Comparison slider placeholder
                  </p>
                  <p className="mt-2 font-mono text-[9px] text-slate-700">
                    ← Connect results component here
                  </p>
                </div>
              </div>
              {/* Detection mode — bounding box hint */}
              {mode === 'detect' && (
                <div className="flex gap-2 p-4">
                  {['Marine Life', 'Coral', 'Debris'].map((cls) => (
                    <span key={cls} className="rounded-full border border-[#00E5FF]/20 bg-[#00E5FF]/5 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-[#00E5FF]/70">
                      {cls}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Inline Magnetic Button ──────────────────────────────── */
function MagBtn({
  label,
  accent,
  border = false,
  loading = false,
  disabled = false,
  onClick,
}: {
  label:    string;
  accent:   string;
  border?:  boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick:  () => void;
}) {
  const zoneRef   = useRef<HTMLSpanElement>(null);
  const btnRef    = useRef<HTMLButtonElement>(null);
  const labelRef  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect();
      const x = gsap.utils.mapRange(r.left, r.right, -r.width / 2, r.width / 2, e.clientX);
      const y = gsap.utils.mapRange(r.top, r.bottom, -r.height / 2, r.height / 2, e.clientY);
      gsap.to(btnRef.current,   { x: x * 0.38, y: y * 0.38, duration: 0.28, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(labelRef.current, { x: x * 0.15, y: y * 0.15, duration: 0.28, ease: 'power3.out', overwrite: 'auto' });
    };

    const onLeave = () => {
      gsap.to([btnRef.current, labelRef.current], { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' });
    };

    zone.addEventListener('pointermove', onMove);
    zone.addEventListener('pointerleave', onLeave);
    return () => { zone.removeEventListener('pointermove', onMove); zone.removeEventListener('pointerleave', onLeave); };
  }, []);

  return (
    <span ref={zoneRef} className="inline-block cursor-pointer p-4">
      <button
        ref={btnRef}
        disabled={disabled}
        onClick={onClick}
        className={`relative overflow-hidden rounded-full px-8 py-3.5 font-mono text-xs uppercase tracking-[0.2em] transition-opacity duration-200 ${disabled ? 'opacity-50' : 'opacity-100'}`}
        style={border
          ? { background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', color: '#e2e8f0' }
          : { background: accent, color: '#020a10', fontWeight: 600 }
        }
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
            Processing…
          </span>
        ) : (
          <span ref={labelRef} className="block">
            {label}
          </span>
        )}
        {/* Shimmer */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 hover:translate-x-full" />
      </button>
    </span>
  );
}
