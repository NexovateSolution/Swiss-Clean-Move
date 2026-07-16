const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.{ts,tsx,js,jsx}');
const data = JSON.parse(fs.readFileSync('to_translate.json', 'utf8'));

let injectedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Find blocks that have en, de, fr but NO it
  const regex = /(\{[^}]*(?:de|en|fr)\s*:[^}]*\})/g;
  content = content.replace(regex, (match) => {
    if (match.includes('en:') && match.includes('de:') && match.includes('fr:') && !match.includes('it:')) {
      const enMatch = match.match(/en\s*:\s*([`"'])(.*?)\1/s);
      if (enMatch) {
        let str = enMatch[2].replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
        if (data[str] && data[str].it) {
          // Escape quotes for the output
          let translated = data[str].it.replace(/'/g, "\\'").replace(/"/g, '\\"');
          // Insert the Italian string before the closing brace
          // Assuming the format is `{ de: '...', en: '...', fr: '...' }`
          changed = true;
          injectedCount++;
          return match.replace(/\s*\}$/, `, it: '${translated}' }`);
        }
      }
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log(`Injected ${injectedCount} translations.`);
