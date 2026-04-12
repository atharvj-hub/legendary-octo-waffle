import MagneticButton from '../components/ui/MagneticButton';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="frame not-found-card surface-panel">
        <p className="eyebrow">Route missing</p>
        <h1 className="detail-title">That page is not part of the Clearwater information architecture.</h1>
        <p className="detail-intro">
          The old animation sandbox and scene fragments have been removed. Use the routes below to stay on
          the current PRD-driven flow.
        </p>
        <div className="detail-actions">
          <MagneticButton href="/">Go Home</MagneticButton>
          <MagneticButton href="/architecture" variant="secondary">
            Open Architecture
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
