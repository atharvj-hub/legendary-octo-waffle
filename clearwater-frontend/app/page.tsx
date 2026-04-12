import Link from 'next/link';
import MagneticButton from '../components/ui/MagneticButton';
import {
  detailPages,
  frontendPhases,
  homeStats,
  pipelineSteps,
} from '../lib/site-content';

export default function Home() {
  return (
    <main className="page-home">
      <section className="hero-block frame">
        <div className="hero-copy surface-panel">
          <p className="eyebrow">PRD aligned interface</p>
          <h1 className="hero-title">
            A clean frontend for underwater restoration, enhancement, and detection.
          </h1>
          <p className="hero-body">
            The current app now reflects the actual product requirements instead of a fragile animation
            prototype. The structure below matches the PRD, keeps every key screen reachable, and sets
            up the next phase of backend integration.
          </p>
          <div className="hero-actions">
            <MagneticButton href="/architecture">Open Architecture</MagneticButton>
            <MagneticButton href="/integration" variant="secondary">
              Review Backend Plan
            </MagneticButton>
          </div>
        </div>

        <div className="hero-aside surface-panel">
          <div className="hero-aside__header">
            <p className="eyebrow">Current build reality</p>
            <h2 className="surface-title">What this UI now optimizes for</h2>
          </div>
          <div className="signal-list">
            <article className="signal-card">
              <span className="signal-card__label">Stable interactions</span>
              <p>Loader races and invisible click traps are removed from the root experience.</p>
            </article>
            <article className="signal-card">
              <span className="signal-card__label">Route-based detail</span>
              <p>Architecture, enhancement, detection, and integration each live on dedicated pages.</p>
            </article>
            <article className="signal-card">
              <span className="signal-card__label">Backend-ready content</span>
              <p>The UI is driven by structured PRD data instead of one-off animated scene copy.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="frame section-block">
        <div className="section-heading">
          <p className="eyebrow">Core facts</p>
          <h2 className="section-title">The product story is now visible at a glance.</h2>
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
          <h2 className="section-title">Every major PRD topic has its own route.</h2>
          <p className="section-copy">
            These pages replace the old story scenes. They are simpler, clickable, and written around the
            actual system instead of decorative motion.
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
          <h2 className="section-title">The frontend now mirrors the real processing order.</h2>
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
          <p className="eyebrow">Execution plan</p>
          <h2 className="section-title">The architecture is staged so backend wiring is the next clean move.</h2>
        </div>
        <div className="phase-grid">
          {frontendPhases.map((phase) => (
            <article key={phase.title} className="phase-card surface-panel">
              <h3>{phase.title}</h3>
              <p>{phase.body}</p>
            </article>
          ))}
        </div>
        <div className="section-actions">
          <MagneticButton href="/detection" variant="ghost">
            Detection details
          </MagneticButton>
          <MagneticButton href="/enhancement" variant="secondary">
            Enhancement details
          </MagneticButton>
          <Link href="/integration" className="inline-link">
            See the full integration route
          </Link>
        </div>
      </section>
    </main>
  );
}
