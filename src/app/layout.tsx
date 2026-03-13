import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';

export const metadata: Metadata = {
  title: {
    default: 'SwissCleanMove – Moving & Cleaning Company Switzerland',
    template: '%s',
  },
  description: 'SwissCleanMove is your professional moving and cleaning company in Biel/Bienne, Bern, Zurich and across Switzerland.',
  keywords: 'Moving Company Switzerland, End-of-Lease Cleaning, Maintenance Cleaning, Office Cleaning, Facility Service, Gastronomy Cleaning, Construction Cleaning, Clearance, Biel, Bern, Zurich, SwissCleanMove',
  openGraph: {
    title: 'SwissCleanMove – Moving & Cleaning Company Switzerland',
    description: 'Professional moving services, end-of-lease cleaning with guarantee, maintenance cleaning and facility service across Switzerland.',
    type: 'website',
    siteName: 'SwissCleanMove',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.ico', sizes: '96x96' },
      { url: '/favicon.ico', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0066CC'
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="font-inter antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
