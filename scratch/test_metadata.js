// test_metadata.js
// Read the page.tsx file directly and extract the canonical path
const fs = require('fs');

const file = fs.readFileSync('src/app/[locale]/umzug-biel/page.tsx', 'utf8');
const match = file.match(/alternates:\s*\{\s*canonical:\s*([^}]+)\}/);
console.log('Umzug Biel Canonical match:', match ? match[1].trim() : 'No canonical found');

// Run it for all 4 locales by replacing the locale variable in the string
if (match) {
  let raw = match[1].trim();
  console.log('de:', raw.replace('${locale}', 'de').replace(/`/g, ''));
  console.log('en:', raw.replace('${locale}', 'en').replace(/`/g, ''));
  console.log('fr:', raw.replace('${locale}', 'fr').replace(/`/g, ''));
  console.log('it:', raw.replace('${locale}', 'it').replace(/`/g, ''));
}
