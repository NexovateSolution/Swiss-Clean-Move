const fs = require('fs');

async function translateText(text) {
  if (!text || typeof text !== 'string' || text.trim() === '') return text;
  
  // Skip translating keys that look like pure HTML or interpolation chunks if possible
  if (text.match(/^[{}<>\s]+$/)) return text;
  
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=it&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data[0].map(x => x[0]).join('');
  } catch (err) {
    console.error(`Error translating "${text.substring(0, 20)}...":`, err.message);
    return text; // fallback to original
  }
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateObject(obj) {
  const result = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === 'string') {
      result[key] = await translateText(val);
      await delay(50); // Be gentle on the rate limits
    } else if (typeof val === 'object' && val !== null) {
      if (Array.isArray(val)) {
        result[key] = [];
        for (const item of val) {
          if (typeof item === 'string') {
            result[key].push(await translateText(item));
            await delay(50);
          } else if (typeof item === 'object') {
            result[key].push(await translateObject(item));
          } else {
            result[key].push(item);
          }
        }
      } else {
        result[key] = await translateObject(val);
      }
    } else {
      result[key] = val;
    }
  }
  return result;
}

async function main() {
  console.log('Reading en.json...');
  const enData = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
  
  // Try translating a tiny slice first to verify it works
  const tinySlice = {
    test: enData.home?.hero || { title: "Hello", subtitle: "World" }
  };
  
  console.log('Testing translation on a slice...');
  const testTrans = await translateObject(tinySlice);
  console.log('Test translation result:', testTrans);
  
  // We'll run the full script in the next step if this works
}

main().catch(console.error);
