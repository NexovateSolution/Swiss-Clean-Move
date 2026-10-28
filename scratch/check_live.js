const https = require('https');

function check(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<title>([^<]*)<\/title>/i);
        const htmlMatch = data.match(/<html[^>]*>/i);
        const canonicalMatch = data.match(/<link[^>]*rel="canonical"[^>]*>/i);
        const hreflangMatches = [...data.matchAll(/<link[^>]*hreflang="([^"]*)"[^>]*href="([^"]*)"[^>]*>/gi)].map(m => m[1] + ' -> ' + m[2]);
        console.log(`=== ${url} (status: ${res.statusCode}) ===`);
        console.log('html tag:', htmlMatch ? htmlMatch[0] : 'none');
        console.log('title:', titleMatch ? titleMatch[1] : 'none');
        console.log('canonical:', canonicalMatch ? canonicalMatch[0] : 'none');
        console.log('hreflang count:', hreflangMatches.length);
        if (hreflangMatches.length > 0) console.log(hreflangMatches);
        resolve();
      });
    }).on('error', err => {
      console.error(url, err.message);
      resolve();
    });
  });
}

async function run() {
  await check('https://www.swisscleanmove.ch/de');
  await check('https://www.swisscleanmove.ch/de/bueroreinigung-biel-bienne');
  await check('https://www.swisscleanmove.ch/en/bueroreinigung-biel-bienne');
}

run();
