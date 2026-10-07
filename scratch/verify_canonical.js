const fs = require('fs');

const pages = [
  'de/umzug-biel',
  'en/umzug-biel',
  'fr/umzug-biel',
  'it/umzug-biel'
];

pages.forEach(p => {
  const file = `.next/server/app/${p}.html`;
  if (fs.existsSync(file)) {
    const html = fs.readFileSync(file, 'utf8');
    const match = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (match) {
      console.log(`[${p}] Canonical: ${match[1]}`);
    } else {
      console.log(`[${p}] No canonical found!`);
    }
  } else {
    console.log(`[${p}] File not found!`);
  }
});
