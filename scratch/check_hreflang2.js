async function run() {
  const urls = [
    'https://www.swisscleanmove.ch/de/umzug-biel',
    'https://www.swisscleanmove.ch/en/umzug-biel',
    'https://www.swisscleanmove.ch/fr/umzug-biel',
    'https://www.swisscleanmove.ch/it/umzug-biel'
  ];

  for (const u of urls) {
    console.log(`\n--- Fetching ${u} ---`);
    try {
      const res = await fetch(u, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        cache: 'no-store'
      });
      console.log(`Status: ${res.status}`);
      console.log(`Link header: ${res.headers.get('link') || 'None'}`);
      
      const body = await res.text();
      
      // Check for hreflang in HTML
      const hreflangRegex = /<link[^>]*hreflang[^>]*>/gi;
      let match;
      let foundHtml = false;
      while ((match = hreflangRegex.exec(body)) !== null) {
        console.log(`HTML Match: ${match[0]}`);
        foundHtml = true;
      }
      if (!foundHtml) {
        console.log('No hreflang tags found in HTML payload.');
      }
    } catch (e) {
      console.error('Error fetching:', e.message);
    }
  }
}

run().catch(console.error);
