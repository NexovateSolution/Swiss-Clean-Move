const http = require('http');

function testUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const canonicalMatch = data.match(/<link[^>]*rel="canonical"[^>]*>/i);
        const hreflangMatches = [...data.matchAll(/<link[^>]*hreflang="([^"]*)"[^>]*href="([^"]*)"[^>]*>/gi)].map(m => m[1] + ' -> ' + m[2]);
        console.log(`=== ${url} ===`);
        console.log('Status:', res.statusCode);
        console.log('Canonical:', canonicalMatch ? canonicalMatch[0] : 'none');
        console.log('Hreflangs count:', hreflangMatches.length);
        if (hreflangMatches.length > 0) console.log(hreflangMatches);
        resolve();
      });
    }).on('error', e => {
      console.error(e.message);
      resolve();
    });
  });
}

async function run() {
  await testUrl('http://localhost:3000/de/reinigungsfirma-biel-bienne');
  await testUrl('http://localhost:3000/de/haushaltshilfe-biel-bienne');
}
run();
