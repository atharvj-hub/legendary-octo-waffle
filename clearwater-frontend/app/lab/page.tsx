import type { Metadata } from 'next';
import MagneticButton from '../../components/ui/MagneticButton';
import { labFlow, labOutputs } from '../../lib/site-content';

const labStats = [
  {
    value: 'Compare image',
    label: 'Primary artifact',
    detail: 'Each run resolves into a raw-versus-enhanced review surface with detection overlays.',
  },
  {
    value: 'Raw-first detection',
    label: 'Signal discipline',
    detail: 'Enhancement is display-only while the detector remains anchored to the untouched source frame.',
  },
  {
    value: 'Object metrics',
    label: 'Review layer',
    detail: 'Confidence, area, diameter, and circularity-style geometry travel with every reported object.',
  },
];

export const metadata: Metadata = {
  title: 'Lab | Clearwater',
  description:
    'The Clearwater lab route presents the restoration flow, compare surface, and marine detection output model.',
};

export default function LabPage() {
  return (
    <main className="detail-page">
      <section className="frame detail-hero">
        <div className="detail-hero__copy surface-panel">
          <p className="eyebrow">Clearwater lab</p>
          <h1 className="detail-title">The lab is where raw signal becomes a recovered scene and a species report.</h1>
          <p className="detail-intro">
            Clearwater is built to move from degraded underwater imagery into a finished comparison output
            that restores color, recovers structure, and localizes marine species without sacrificing the
            original optical signal.
          </p>
          <p className="detail-summary">
            Inside the lab, restoration and detection converge into one review surface: a side-by-side
            image artifact, a declared model path, and a structured object report built for interpretation.
          </p>
          <div className="detail-actions">
            <MagneticButton href="/enhancement">Enhancement spec</MagneticButton>
            <MagneticButton href="/detection" variant="secondary">
              Detection spec
            </MagneticButton>
          </div>
        </div>

        <aside className="detail-hero__stats surface-panel" aria-label="Lab metrics">
          <p className="eyebrow">Lab priorities</p>
          <div className="detail-stat-list">
            {labStats.map((stat) => (
              <article key={stat.label} className="detail-stat">
                <span className="detail-stat__value">{stat.value}</span>
                <strong className="detail-stat__label">{stat.label}</strong>
                <p className="detail-stat__detail">{stat.detail}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="frame section-block">
        <div className="section-heading">
          <p className="eyebrow">Lab sequence</p>
          <h2 className="section-title">A complete run moves through three deliberate stages.</h2>
        </div>
        <div className="phase-grid">
          {labFlow.map((item) => (
            <article key={item.title} className="phase-card surface-panel">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="frame section-block section-block--last">
        <div className="section-heading">
          <p className="eyebrow">Output surface</p>
          <h2 className="section-title">What leaves the lab is meant to be inspected, not merely viewed.</h2>
        </div>
        <div className="phase-grid">
          {labOutputs.map((item) => (
            <article key={item.title} className="phase-card surface-panel">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="section-actions">
          <MagneticButton href="/">Back Home</MagneticButton>
          <MagneticButton href="/architecture" variant="ghost">
            Architecture
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
