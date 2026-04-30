import type { Metadata } from 'next';
import { Bebas_Neue, Space_Grotesk } from 'next/font/google';
import BackgroundBrutalist from '../components/ui/BackgroundBrutalist';
import Nav from '../components/ui/Nav';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: '--font-display',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Clearwater | Underwater Vision Interface',
  description:
    'PRD-aligned frontend for underwater image restoration, enhancement, and marine object detection.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${spaceGrotesk.variable}`}>
      <body>
        <div className="site-shell">
          <BackgroundBrutalist />
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
