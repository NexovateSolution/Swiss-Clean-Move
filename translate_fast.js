const fs = require('fs');

async function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function translateBatch(texts, sourceLang = 'en') {
  if (texts.length === 0) return [];
  
  let retries = 3;
  while(retries > 0) {
    try {
      const url = new URL('https://translate.googleapis.com/translate_a/single');
      url.searchParams.append('client', 'gtx');
      url.searchParams.append('sl', sourceLang);
      url.searchParams.append('tl', 'it');
      url.searchParams.append('dt', 't');
      texts.forEach(t => url.searchParams.append('q', t));
      
      const res = await fetch(url.toString());
      if (res.status === 429) {
        await delay(2000);
        retries--;
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      // data[0] contains the translations. But because we sent multiple 'q', 
      // the structure is slightly different. Actually, with multiple 'q', google translate concatenates them or handles them weirdly.
      // A safer way is to join texts with a separator, e.g. " ||| "
      return [];
    } catch (err) {
      retries--;
      await delay(1000);
    }
  }
  return texts; // fallback to original
}

async function translateBatchSafe(texts, sourceLang = 'en') {
    if (texts.length === 0) return [];
    const separator = '\n\n|||\n\n';
    const joined = texts.join(separator);
    
    let retries = 3;
    while(retries > 0) {
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=it&dt=t&q=${encodeURIComponent(joined)}`;
        const res = await fetch(url);
        if (res.status === 429) {
          await delay(2000);
          retries--;
          continue;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        // Combine chunks
        let fullTranslation = data[0].map(x => x[0]).join('');
        const splitTranslation = fullTranslation.split(/\|\|\|/g).map(s => s.trim());
        
        if (splitTranslation.length === texts.length) {
            return splitTranslation;
        } else {
            throw new Error("Mismatch in batch split length.");
        }
      } catch (err) {
        retries--;
        await delay(1000);
      }
    }
    return texts; // fallback to original
}


let result = {};
let missingKeys = [];

function collectMissingKeys(enObj, deObj, resObj, path = []) {
  const keys = new Set([...Object.keys(enObj || {}), ...Object.keys(deObj || {})]);
  for (const key of keys) {
    const enVal = (enObj && enObj[key]) !== undefined ? enObj[key] : null;
    const deVal = (deObj && deObj[key]) !== undefined ? deObj[key] : null;
    const isObject = (val) => typeof val === 'object' && val !== null && !Array.isArray(val);
    
    if (isObject(enVal) || isObject(deVal)) {
      resObj[key] = resObj[key] || {};
      collectMissingKeys(enVal || {}, deVal || {}, resObj[key], [...path, key]);
    } else if (Array.isArray(enVal) || Array.isArray(deVal)) {
      if (!resObj[key] || resObj[key].length === 0) {
         const arr = Array.isArray(enVal) ? enVal : deVal;
         resObj[key] = [];
         for (let i = 0; i < arr.length; i++) {
           const item = arr[i];
           if (typeof item === 'string' && item.match(/[a-zA-Z]/)) {
              missingKeys.push({
                 obj: resObj[key],
                 index: i,
                 text: item,
                 lang: Array.isArray(enVal) ? 'en' : 'de'
              });
              resObj[key].push(item); // placeholder
           } else {
              resObj[key].push(item);
           }
         }
      }
    } else {
      if (resObj[key] === undefined || resObj[key] === null || resObj[key] === '') {
        const textToTranslate = enVal !== null ? enVal : deVal;
        const sourceLang = enVal !== null ? 'en' : 'de';
        if (typeof textToTranslate === 'string' && textToTranslate.match(/[a-zA-Z]/)) {
           missingKeys.push({
              obj: resObj,
              index: key,
              text: textToTranslate,
              lang: sourceLang
           });
           resObj[key] = textToTranslate; // placeholder
        } else {
           resObj[key] = textToTranslate;
        }
      }
    }
  }
}

async function main() {
  console.log('Reading dictionaries...');
  const enData = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
  const deData = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
  
  if (fs.existsSync('messages/it.json')) {
    result = JSON.parse(fs.readFileSync('messages/it.json', 'utf8'));
  }
  
  collectMissingKeys(enData, deData, result);
  console.log(`Found ${missingKeys.length} strings to translate.`);
  
  const batchSize = 15;
  for (let i = 0; i < missingKeys.length; i += batchSize) {
     const batch = missingKeys.slice(i, i + batchSize);
     const texts = batch.map(b => b.text);
     process.stdout.write(`Translating ${i} to ${i + batch.length} ... `);
     
     const translated = await translateBatchSafe(texts, batch[0].lang);
     
     for (let j = 0; j < batch.length; j++) {
        batch[j].obj[batch[j].index] = translated[j] || batch[j].text;
     }
     console.log('OK');
     
     if (i % (batchSize * 5) === 0) {
        fs.writeFileSync('messages/it.json', JSON.stringify(result, null, 2));
     }
  }
  
  fs.writeFileSync('messages/it.json', JSON.stringify(result, null, 2));
  console.log('Done! Wrote messages/it.json');
}

main().catch(console.error);
