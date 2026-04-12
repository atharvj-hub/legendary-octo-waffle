import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Nav from '../components/Nav';
import './globals.css';

const geistSans = localFont({
  src: '../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2',
  variable: '--font-display',
});

const geistMono = localFont({
  src: '../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2',
  variable: '--font-mono',
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="site-shell">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
