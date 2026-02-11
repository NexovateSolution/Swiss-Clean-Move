import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';

export const metadata: Metadata = {
  title: 'SwissCleanMove - Professional Cleaning & Moving Services Switzerland',
  description: 'Reliable cleaning services and moving assistance in Switzerland with 100% satisfaction guarantee. Move-out cleaning, office cleaning, restaurant cleaning and more.',
  keywords: 'Cleaning Switzerland, Moving Switzerland, End of tenancy cleaning, Office cleaning, Restaurant cleaning, Property maintenance, Disposal',
  openGraph: {
    title: 'SwissCleanMove - Professional Cleaning & Moving Services',
    description: 'Reliable cleaning services and moving assistance in Switzerland',
    type: 'website',
    locale: 'en_CH',
    alternateLocale: ['de_CH', 'fr_CH'],
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
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
