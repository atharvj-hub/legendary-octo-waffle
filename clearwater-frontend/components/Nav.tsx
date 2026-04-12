import Link from 'next/link';
import MagneticButton from './ui/MagneticButton';
import { detailPages } from '../lib/site-content';

export default function Nav() {
  return (
    <header className="site-nav">
      <div className="frame site-nav__inner">
        <Link href="/" className="site-brand">
          <span className="site-brand__mark">Clearwater</span>
          <span className="site-brand__meta">Underwater vision system</span>
        </Link>

        <nav className="site-nav__links" aria-label="Primary">
          {detailPages.map((page) => (
            <Link key={page.slug} href={`/${page.slug}`} className="site-nav__link">
              {page.navLabel}
            </Link>
          ))}
        </nav>

        <div className="site-nav__actions">
          <MagneticButton href="/lab" size="sm" variant="secondary">
            Enter Lab
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
