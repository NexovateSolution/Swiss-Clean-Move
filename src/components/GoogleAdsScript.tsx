/**
 * GoogleAdsScript — Loads the Google Ads global tag (gtag.js) once
 * across the entire application.
 *
 * - Uses native script tags to ensure it appears in the initial HTML View Source.
 * - Injected in the root layout's <head> so it covers every locale and route.
 */

import { GA_ADS_ID } from '@/lib/gtag';

export default function GoogleAdsScript() {
  return (
    <>
      {/* 1. Load gtag.js library */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ADS_ID}`}></script>

      {/* 2. Initialize dataLayer + gtag config */}
      <script
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
