import MagneticButton from '../components/ui/MagneticButton';
import {
  detailPages,
  heroSignals,
  homeStats,
  labOutputs,
  pipelineSteps,
} from '../lib/site-content';

export default function Home() {
  return (
    <main className="page-home">
      <section className="hero-block frame">
        <div className="hero-copy surface-panel">
          <p className="eyebrow">Underwater image reconstruction</p>
          <h1 className="hero-title">Reveal what the water concealed.</h1>
          <p className="hero-body">
            A research-grade computer vision system. Clearwater combines Dark Channel Prior physics with a
            custom U-Net architecture to restore clarity, color, and detail to degraded underwater imagery.
          </p>
          <div className="hero-actions">
            <MagneticButton href="/architecture">Open Architecture</MagneticButton>
            <MagneticButton href="/lab" variant="secondary">
              Enter Lab
            </MagneticButton>
          </div>
        </div>

        <div className="hero-aside surface-panel">
          <div className="hero-aside__header">
            <p className="eyebrow">Underwater degradations</p>
            <h2 className="surface-title">Three physical failures define the problem.</h2>
          </div>
          <div className="signal-list">
            {heroSignals.map((signal) => (
              <article key={signal.label} className="signal-card">
                <span className="signal-card__label">{signal.label}</span>
                <p>{signal.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="frame section-block">
        <div className="section-heading">
          <p className="eyebrow">Core facts</p>
          <h2 className="section-title">The recovery stack is designed for underwater physics, not cosmetic filtering.</h2>
        </div>
        <div className="stat-grid">
          {homeStats.map((stat) => (
            <article key={stat.label} className="stat-card surface-panel">
              <div className="stat-card__value">{stat.value}</div>
              <div className="stat-card__label">{stat.label}</div>
              <p className="stat-card__detail">{stat.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="frame section-block">
        <div className="section-heading">
          <p className="eyebrow">Detailed pages</p>
          <h2 className="section-title">Open the technical spec behind each core subsystem.</h2>
          <p className="section-copy">
            Architecture, enhancement, and detection each have their own route so the science, not the
            interface scaffolding, carries the narrative.
          </p>
        </div>

        <div className="detail-grid">
          {detailPages.map((page) => (
            <article key={page.slug} className="detail-card surface-panel">
              <div className="detail-card__top">
                <p className="detail-card__eyebrow">{page.eyebrow}</p>
                <h3 className="detail-card__title">{page.navLabel}</h3>
                <p className="detail-card__body">{page.summary}</p>
              </div>
              <div className="detail-card__stats">
                {page.stats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="detail-mini-stat">
                    <span>{stat.value}</span>
                    <small>{stat.label}</small>
                  </div>
                ))}
              </div>
              <div className="detail-card__action">
                <MagneticButton href={`/${page.slug}`} size="sm" variant="secondary">
                  Open {page.navLabel}
                </MagneticButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="frame section-block">
        <div className="section-heading">
          <p className="eyebrow">Pipeline snapshot</p>
          <h2 className="section-title">Clearwater moves from raw signal to structured review in four steps.</h2>
        </div>
        <div className="pipeline-grid">
          {pipelineSteps.map((step) => (
            <article key={step.step} className="pipeline-card surface-panel">
              <span className="pipeline-card__step">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="frame section-block section-block--last">
        <div className="section-heading">
          <p className="eyebrow">Lab output</p>
          <h2 className="section-title">The lab is where restored imagery and species evidence resolve into one surface.</h2>
        </div>
        <div className="phase-grid">
          {labOutputs.map((output) => (
            <article key={output.title} className="phase-card surface-panel">
              <h3>{output.title}</h3>
              <p>{output.body}</p>
            </article>
          ))}
        </div>
        <div className="section-actions">
          <MagneticButton href="/lab">Enter Lab</MagneticButton>
          <MagneticButton href="/detection" variant="ghost">
            Detection details
          </MagneticButton>
          <MagneticButton href="/enhancement" variant="secondary">
            Enhancement details
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
