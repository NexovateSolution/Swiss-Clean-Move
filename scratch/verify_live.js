const fs = require('fs');
const https = require('https');

function fetchUrl(url, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method, headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data,
          location: res.headers.location
        });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function verify() {
  console.log("=== 1. DEPLOYMENT / VERSION ===");
  const home = await fetchUrl('https://www.swisscleanmove.ch/');
  // Try to find Next.js build ID or git commit hash
  const buildIdMatch = home.body.match(/"buildId":"([^"]+)"/);
  console.log(`Build ID: ${buildIdMatch ? buildIdMatch[1] : 'Unknown'}`);
  console.log(`x-vercel-id header: ${home.headers['x-vercel-id'] || 'None'}`);
  console.log(`Server: ${home.headers['server'] || 'None'}`);

  console.log("\n=== 2. STRUCTURED DATA & 3. UNSUPPORTED CLAIMS ===");
  const pages = [
    'https://www.swisscleanmove.ch/de/biel-bienne-seeland',
    'https://www.swisscleanmove.ch/de/umzug-biel',
    'https://www.swisscleanmove.ch/de/umzugsreinigung-biel',
    'https://www.swisscleanmove.ch/de/reinigungsfirma-biel'
  ];
  
  for (const url of pages) {
    const res = await fetchUrl(url);
    console.log(`\nPage: ${url} (Status: ${res.status})`);
    
    // Check structured data
    const jsonLdMatches = res.body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    if (jsonLdMatches) {
       console.log(`Found ${jsonLdMatches.length} JSON-LD blocks.`);
       let hasLocalBusiness = false;
       let hasAggregateRating = false;
       for (const block of jsonLdMatches) {
         if (block.includes('LocalBusiness')) hasLocalBusiness = true;
         if (block.includes('AggregateRating')) hasAggregateRating = true;
         if (block.includes('ratingValue') || block.includes('reviewCount')) hasAggregateRating = true;
       }
       console.log(`LocalBusiness: ${hasLocalBusiness}, AggregateRating/Fake: ${hasAggregateRating}`);
    } else {
       console.log("No JSON-LD found.");
    }
    
    // Check unsupported claims
    const unsupported = ['CHF 490', 'Schweizer Qualität', '100% Abnahmegarantie', 'HACCP', 'hohen Qualitätsstandards', 'high quality standards'];
    for (const term of unsupported) {
      if (res.body.includes(term)) console.log(`UNEXPECTED CLAIM FOUND: ${term}`);
    }
    const supported = ['Abnahmegarantie', 'handover guarantee', 'garantie de remise', 'garanzia di consegna'];
    const foundSupported = supported.filter(t => res.body.includes(t));
    if (foundSupported.length > 0) console.log(`Legitimate claims found: ${foundSupported.join(', ')}`);
  }

  console.log("\n=== 4. BUEROREINIGUNG LOCALIZATION & 6. CANONICALS/HREFLANG ===");
  const locales = ['de', 'en', 'fr', 'it'];
  for (const loc of locales) {
    const url = `https://www.swisscleanmove.ch/${loc}/bueroreinigung-biel`;
    const res = await fetchUrl(url);
    console.log(`\nPage: ${url} (Status: ${res.status})`);
    
    const titleMatch = res.body.match(/<title>([^<]+)<\/title>/);
    console.log(`Title: ${titleMatch ? titleMatch[1] : 'MISSING'}`);
    
    const descMatch = res.body.match(/<meta name="description" content="([^"]+)"/);
    console.log(`Description: ${descMatch ? descMatch[1] : 'MISSING'}`);
    
    const canonMatch = res.body.match(/<link rel="canonical" href="([^"]+)"/);
    console.log(`Canonical: ${canonMatch ? canonMatch[1] : 'MISSING'}`);
    
    const hreflangs = res.body.match(/<link rel="alternate" hreflang="[^"]+" href="[^"]+"/g);
    console.log(`Hreflangs found: ${hreflangs ? hreflangs.length : 0}`);
    
    if (res.body.includes('MISSING_MESSAGE')) console.log('ERROR: MISSING_MESSAGE found!');
  }

  console.log("\n=== 5. INDEXABILITY ===");
  const robots = await fetchUrl('https://www.swisscleanmove.ch/robots.txt');
  console.log(`robots.txt Status: ${robots.status}`);
  const sitemap = await fetchUrl('https://www.swisscleanmove.ch/sitemap.xml');
  console.log(`sitemap.xml Status: ${sitemap.status}`);
  
  const tyRes = await fetchUrl('https://www.swisscleanmove.ch/de/thank-you');
  if (tyRes.body.includes('noindex')) console.log('/thank-you has noindex: TRUE');
  
  console.log("\n=== 7. REDIRECTS ===");
  const endRes = await fetchUrl('https://www.swisscleanmove.ch/de/endreinigung-biel', 'GET');
  console.log(`Redirect /de/endreinigung-biel -> Status: ${endRes.status}, Final URL (simulated): ${endRes.location || 'none (handled by next router?)'}`);
  // If next router does it client-side or next.config.js does 308
  if (endRes.status >= 300 && endRes.status < 400) {
     console.log(`Redirects to: ${endRes.headers.location}`);
  } else if (endRes.body.includes('meta http-equiv="Refresh"')) {
     const redirectMatch = endRes.body.match(/meta http-equiv="Refresh" content="0; url=([^"]+)"/);
     console.log(`Meta refresh to: ${redirectMatch ? redirectMatch[1] : 'Unknown'}`);
  }
  
  console.log("\n=== 8. CONTACT INFO ===");
  if (home.body.includes('SwissCleanMove')) console.log('SwissCleanMove: Found');
  if (home.body.includes('Dawit Gebrekristos')) console.log('Dawit Gebrekristos: Found');
  if (home.body.includes('CHE-457.949.122')) console.log('CHE-457.949.122: Found');
  if (home.body.includes('CH-036.1.098.153-4')) console.log('CH-036.1.098.153-4: Found');
  if (home.body.includes('Orpundstrasse 31')) console.log('Orpundstrasse 31: Found');
  if (home.body.includes('+41 78 215 80 30')) console.log('+41 78 215 80 30: Found');
  if (home.body.includes('+41 76 488 36 89')) console.log('WARNING: +41 76 488 36 89 (OLD PHONE) FOUND!');
  
  console.log("\n=== 10. GOOGLE ADS TRACKING ===");
  const scripts = home.body.match(/<script[\s\S]*?<\/script>/g) || [];
  let trackingFound = 0;
  if (home.body.includes('AW-18285523751/jBUQCJ6q8gcEKfmm49E')) trackingFound++; // Quote
  if (home.body.includes('AW-18285523751/qUgiCMODrY4dEKfmm49E')) trackingFound++; // Phone
  if (home.body.includes('AW-18285523751/2DBdCPTFnY8dEKfmm49E')) trackingFound++; // WhatsApp
  if (home.body.includes('AW-18285523751/HOvHCPuz1o8dEKfmm49E')) trackingFound++; // Email
  
  console.log(`Found ${trackingFound}/4 Google Ads conversion targets on homepage source (or via script tags).`);
  
}

verify().catch(console.error);
