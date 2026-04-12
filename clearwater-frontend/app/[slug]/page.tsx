import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MagneticButton from '../../components/ui/MagneticButton';
import { detailPages, getDetailPage } from '../../lib/site-content';

type DetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return detailPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: DetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getDetailPage(slug);

  if (!page) {
    return {
      title: 'Not Found | Clearwater',
    };
  }

  return {
    title: `${page.navLabel} | Clearwater`,
    description: page.summary,
  };
}

export default async function DetailPage({
  params,
}: DetailPageProps) {
  const { slug } = await params;
  const page = getDetailPage(slug);

  if (!page) {
    notFound();
  }

  const currentIndex = detailPages.findIndex((entry) => entry.slug === slug);
  const nextPage = detailPages[(currentIndex + 1) % detailPages.length];

  return (
    <main className="detail-page">
      <section className="frame detail-hero">
        <div className="detail-hero__copy surface-panel">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 className="detail-title">{page.title}</h1>
          <p className="detail-intro">{page.intro}</p>
          <p className="detail-summary">{page.summary}</p>
          <div className="detail-actions">
            <MagneticButton href="/">Back Home</MagneticButton>
            <MagneticButton href={`/${nextPage.slug}`} variant="secondary">
              Next: {nextPage.navLabel}
            </MagneticButton>
          </div>
        </div>

        <aside className="detail-hero__stats surface-panel" aria-label="Key metrics">
          <p className="eyebrow">Key metrics</p>
          <div className="detail-stat-list">
            {page.stats.map((stat) => (
              <article key={stat.label} className="detail-stat">
                <span className="detail-stat__value">{stat.value}</span>
                <strong className="detail-stat__label">{stat.label}</strong>
                <p className="detail-stat__detail">{stat.detail}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="frame detail-sections">
        {page.sections.map((section, index) => (
          <article key={section.title} className="detail-section surface-panel">
            <div className="detail-section__index">0{index + 1}</div>
            <div className="detail-section__body">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              <ul className="detail-bullets">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
