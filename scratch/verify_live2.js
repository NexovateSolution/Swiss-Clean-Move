const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  const urls = [
    'https://www.swisscleanmove.ch/de/umzug-biel',
    'https://www.swisscleanmove.ch/de/umzugsreinigung-biel',
    'https://www.swisscleanmove.ch/de/reinigungsfirma-biel',
    'https://www.swisscleanmove.ch/de/umzug-biel?verification=b848c99',
    'https://www.swisscleanmove.ch/de/umzugsreinigung-biel?verification=b848c99'
  ];

  for (const u of urls) {
    console.log(`\n--- Fetching ${u} ---`);
    const res = await fetchUrl(u);
    console.log(`Status: ${res.status}`);
    console.log(`x-vercel-id: ${res.headers['x-vercel-id']}`);
    console.log(`x-vercel-cache: ${res.headers['x-vercel-cache']}`);
    console.log(`cache-control: ${res.headers['cache-control']}`);
    console.log(`age: ${res.headers['age']}`);
    
    if (res.body.includes('CHF 490')) console.log('FOUND: CHF 490');
    if (res.body.includes('Schweizer Qualität')) console.log('FOUND: Schweizer Qualität');
    if (res.body.includes('100% Abnahmegarantie')) console.log('FOUND: 100% Abnahmegarantie');
    if (res.body.includes('HACCP')) console.log('FOUND: HACCP');
    if (res.body.includes('ratingValue')) console.log('FOUND: ratingValue');
  }

  // Check Google Ads in JS files on homepage
  console.log(`\n--- Checking JS files for Google Ads ---`);
  const home = await fetchUrl('https://www.swisscleanmove.ch/');
  const jsMatches = home.body.match(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g) || [];
  for (const match of jsMatches) {
    const jsPath = match.match(/"([^"]+)"/)[1];
    const jsUrl = `https://www.swisscleanmove.ch${jsPath}`;
    const jsRes = await fetchUrl(jsUrl);
    if (jsRes.body.includes('AW-18285523751') || jsRes.body.includes('jBUQCJ6q8gcEKfmm49E')) {
      console.log(`Google Ads found in: ${jsUrl}`);
    }
  }
  console.log(`Done checking JS files.`);
}

run().catch(console.error);
