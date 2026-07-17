'use client';

/**
 * GoogleAdsScript — Loads the Google Ads global tag (gtag.js) once
 * across the entire application using next/script.
 *
 * - Uses `afterInteractive` strategy so it never blocks initial paint.
 * - Injected in the root layout so it covers every locale and route.
 * - Deduplication is handled by next/script (same `id` = loaded once).
 */

import Script from 'next/script';
import { GA_ADS_ID } from '@/lib/gtag';

export default function GoogleAdsScript() {
  return (
    <>
      {/* 1. Load gtag.js library */}
      <Script
        id="google-ads-gtag-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ADS_ID}`}
      />

      {/* 2. Initialize dataLayer + gtag config */}
      <Script
        id="google-ads-gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ADS_ID}');
          `,
        }}
      />
    </>
  );
}
