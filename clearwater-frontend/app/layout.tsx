import type { Metadata } from 'next';
import { Cormorant_Garamond, JetBrains_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import Nav from '../components/Nav';
import OceanLoader from '../components/OceanLoader';
import SmoothScroll from '../components/SmoothScroll';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--fd' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['300', '400'], variable: '--fm' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--fb' });

export const metadata: Metadata = {
  title: 'Clearwater — Underwater Vision',
  description: 'Underwater Image Restoration & Enhancement',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jetbrains.variable} ${dmSans.variable}`}>
        <SmoothScroll>
          <OceanLoader />
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
