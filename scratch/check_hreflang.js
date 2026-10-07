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
    'https://www.swisscleanmove.ch/en/umzug-biel',
    'https://www.swisscleanmove.ch/fr/umzug-biel',
    'https://www.swisscleanmove.ch/it/umzug-biel'
  ];

  for (const u of urls) {
    console.log(`\n--- Fetching ${u} ---`);
    const res = await fetchUrl(u);
    console.log(`Status: ${res.status}`);
    console.log(`Link header: ${res.headers['link']}`);
    
    // Check for hreflang in HTML
    const hreflangRegex = /<link[^>]*hreflang[^>]*>/gi;
    let match;
    let foundHtml = false;
    while ((match = hreflangRegex.exec(res.body)) !== null) {
      console.log(`HTML Match: ${match[0]}`);
      foundHtml = true;
    }
    if (!foundHtml) {
      console.log('No hreflang tags found in HTML payload.');
    }
  }
}

run().catch(console.error);
