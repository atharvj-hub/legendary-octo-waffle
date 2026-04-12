import MagneticButton from '../components/ui/MagneticButton';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="frame not-found-card surface-panel">
        <p className="eyebrow">Route missing</p>
        <h1 className="detail-title">That page is not part of the Clearwater information architecture.</h1>
        <p className="detail-intro">
          Use the architecture, enhancement, detection, and lab routes to move through the system.
        </p>
        <div className="detail-actions">
          <MagneticButton href="/">Go Home</MagneticButton>
          <MagneticButton href="/lab" variant="secondary">
            Enter Lab
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
