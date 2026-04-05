'use client';

import React from 'react';
import { useStore } from '../../store/useStore';
import UploadZone from '../lab/UploadZone';
import ProcessingState from '../lab/ProcessingState';
import BeforeAfterSlider from '../lab/BeforeAfterSlider';

export default function LabScene() {
  const labState = useStore((state) => state.labState);

  return (
    <section className="lab-section" id="lab-section">
      <div className="lab-hdr">
        <div className="lab-ey">Clearwater Lab</div>
        <h2 className="lab-ttl">Restoration Studio</h2>
      </div>
      <div className="lab-wrap">
        {labState === 'upload' && <UploadZone />}
        {labState === 'processing' && <ProcessingState />}
        {labState === 'result' && <BeforeAfterSlider />}
      </div>
    </section>
  );
}
