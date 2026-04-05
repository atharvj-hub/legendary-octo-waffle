'use client';

import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';

const msgs = [
  'Estimating light absorption\u2026',
  'Running dark channel prior\u2026',
  'Computing transmission map\u2026',
  'Stacking 6-channel input tensor\u2026',
  'U-Net encoder pass\u2026',
  'Applying skip connections\u2026',
  'Decoding feature maps\u2026',
  'Calibrating white balance\u2026',
  'Finalising restoration\u2026',
];

export default function ProcessingState() {
  const setLabState = useStore(state => state.setLabState);
  const labState = useStore(state => state.labState);
  
  const [msgIdx, setMsgIdx] = useState(0);
  const [prog, setProg] = useState(0);
  const [msgOpacity, setMsgOpacity] = useState(1);

  useEffect(() => {
    if (labState !== 'processing') return;

    let localProg = 0;
    
    // Cycle messages
    const msgTimer = setInterval(() => {
      setMsgOpacity(0);
      setTimeout(() => {
        setMsgIdx((prev) => (prev + 1) % msgs.length);
        setMsgOpacity(1);
      }, 350);
    }, 1800);

    // Progress bar
    const progTimer = setInterval(() => {
      localProg = Math.min(localProg + Math.random() * 6, 92);
      setProg(localProg);
    }, 300);

    // Finish pipeline after 5.5s
    const finishTimer = setTimeout(() => {
      clearInterval(msgTimer);
      clearInterval(progTimer);
      setProg(100);
      setTimeout(() => setLabState('result'), 400);
    }, 5500);

    return () => {
      clearInterval(msgTimer);
      clearInterval(progTimer);
      clearTimeout(finishTimer);
    };
  }, [labState, setLabState]);

  return (
    <div className="proc-z">
      <div className="proc-spin"></div>
      <div className="proc-msg" style={{ opacity: msgOpacity }}>
        {msgs[msgIdx]}
      </div>
      <div className="proc-sub">Typically 4&ndash;8 seconds on CPU</div>
      <div className="prog-bar" style={{ marginTop: '32px' }}>
        <div className="prog-fill" style={{ width: `${prog}%` }}></div>
      </div>
    </div>
  );
}
