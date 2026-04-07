'use client';

import { useEffect, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap';

const sections = [
  { id: 'surface-section', label: 'Surface / Descent', numeral: 'I' },
  { id: 'hero-section', label: 'System', numeral: 'II' },
  { id: 'cards-section', label: 'Pipeline', numeral: 'III' },
  { id: 'lab-section', label: 'Lab', numeral: 'IV' },
];

export default function CampaignRail() {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const triggers = sections.map((section) => ScrollTrigger.create({
      trigger: `#${section.id}`,
      start: 'top 55%',
      end: 'bottom 45%',
      onToggle: (self) => {
        if (self.isActive) {
          setActiveId(section.id);
        }
      },
    }));

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <aside className="campaign-rail" aria-label="Story chapters">
      <p className="campaign-rail-label">Depth index</p>
      <div className="campaign-rail-line" />
      <div className="campaign-rail-list">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`campaign-rail-link${activeId === section.id ? ' is-active' : ''}`}
          >
            <span className="campaign-rail-num">{section.numeral}</span>
            <span className="campaign-rail-text">{section.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
