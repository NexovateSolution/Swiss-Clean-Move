const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.{ts,tsx,js,jsx}');
let filesWithMissingIt = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const blocks = content.match(/\{[^}]*(?:de|en|fr)\s*:[^}]*\}/g);
  if (blocks) {
    let hasMissing = false;
    blocks.forEach(b => {
      // Very naive check for objects containing en, de, fr but missing it
      if (b.includes('en:') && b.includes('de:') && b.includes('fr:') && !b.includes('it:')) {
        hasMissing = true;
      }
    });
    if (hasMissing) {
      filesWithMissingIt.push(file);
    }
  }
});

console.log('Files with {en, de, fr} objects missing it:', filesWithMissingIt.length);
console.log(filesWithMissingIt.join('\n'));
