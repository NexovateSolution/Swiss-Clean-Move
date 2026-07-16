const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.{ts,tsx,js,jsx}');
let toTranslate = {};

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const blocks = content.match(/\{[^}]*(?:de|en|fr)\s*:[^}]*\}/g);
  if (blocks) {
    blocks.forEach(b => {
      if (b.includes('en:') && b.includes('de:') && b.includes('fr:') && !b.includes('it:')) {
        // Try to extract the English string
        const enMatch = b.match(/en\s*:\s*([`"'])(.*?)\1/s);
        if (enMatch) {
          // Normalize string (remove newlines and excess whitespace for the key)
          let str = enMatch[2].replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
          toTranslate[str] = {
            original: enMatch[2],
            it: ''
          };
        }
      }
    });
  }
});

console.log('Unique strings to translate:', Object.keys(toTranslate).length);
fs.writeFileSync('to_translate.json', JSON.stringify(toTranslate, null, 2));
