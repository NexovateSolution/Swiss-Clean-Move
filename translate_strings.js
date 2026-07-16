const fs = require('fs');
const translate = require('translate').default;

translate.engine = 'google';

async function run() {
  const data = JSON.parse(fs.readFileSync('to_translate.json', 'utf8'));
  const keys = Object.keys(data);
  console.log(`Translating ${keys.length} strings...`);
  
  // We should do it in chunks to avoid rate limits or timeouts, or one by one
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (data[key].it) continue; // Skip if already translated
    try {
      // Small delay to prevent rate limits
      await new Promise(r => setTimeout(r, 100));
      const text = await translate(data[key].original, { from: 'en', to: 'it' });
      data[key].it = text;
      
      // Save progress occasionally
      if (i % 20 === 0) {
        fs.writeFileSync('to_translate.json', JSON.stringify(data, null, 2));
        console.log(`Translated ${i}/${keys.length}`);
      }
    } catch (e) {
      console.error(`Error translating ${key}:`, e.message);
      break;
    }
  }
  
  fs.writeFileSync('to_translate.json', JSON.stringify(data, null, 2));
  console.log('Done translating!');
}

run();
