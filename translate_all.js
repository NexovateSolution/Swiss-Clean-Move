const fs = require('fs');

async function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

const cache = new Map();

async function translateText(text, sourceLang = 'en') {
  if (!text || typeof text !== 'string' || text.trim() === '') return text;
  if (text.match(/^[{}<>\s]+$/)) return text;
  if (cache.has(text)) return cache.get(text);
  
  const chunks = text.split(/(\{.*?\})/g);
  let translatedText = '';
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    if (chunk.match(/^\{.*?\}$/)) { translatedText += chunk; continue; }
    if (chunk.trim() === '') { translatedText += chunk; continue; }
    
    let retries = 3;
    let success = false;
    while(retries > 0 && !success) {
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=it&dt=t&q=${encodeURIComponent(chunk)}`;
        const res = await fetch(url);
        if (res.status === 429) {
          await delay(2000);
          retries--;
          continue;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        translatedText += data[0].map(x => x[0]).join('');
        success = true;
      } catch (err) {
        retries--;
        if (retries === 0) { translatedText += chunk; }
        else { await delay(1000); }
      }
    }
    await delay(30);
  }
  cache.set(text, translatedText);
  return translatedText;
}

let result = {};
let saveTimeout = null;

function queueSave() {
  if (!saveTimeout) {
    saveTimeout = setTimeout(() => {
      fs.writeFileSync('messages/it.json', JSON.stringify(result, null, 2));
      saveTimeout = null;
    }, 2000);
  }
}

async function mergeAndTranslate(enObj, deObj, resObj) {
  const keys = new Set([...Object.keys(enObj || {}), ...Object.keys(deObj || {})]);
  for (const key of keys) {
    const enVal = (enObj && enObj[key]) !== undefined ? enObj[key] : null;
    const deVal = (deObj && deObj[key]) !== undefined ? deObj[key] : null;
    const isObject = (val) => typeof val === 'object' && val !== null && !Array.isArray(val);
    
    if (isObject(enVal) || isObject(deVal)) {
      resObj[key] = resObj[key] || {};
      await mergeAndTranslate(enVal || {}, deVal || {}, resObj[key]);
    } else if (Array.isArray(enVal) || Array.isArray(deVal)) {
      if (!resObj[key] || resObj[key].length === 0) {
         const arr = Array.isArray(enVal) ? enVal : deVal;
         resObj[key] = [];
         for (const item of arr) {
           if (typeof item === 'string') {
              resObj[key].push(await translateText(item, Array.isArray(enVal) ? 'en' : 'de'));
           } else {
              resObj[key].push(item);
           }
         }
         queueSave();
      }
    } else {
      if (resObj[key] === undefined || resObj[key] === null || resObj[key] === '') {
        const textToTranslate = enVal !== null ? enVal : deVal;
        const sourceLang = enVal !== null ? 'en' : 'de';
        if (typeof textToTranslate === 'string') {
           resObj[key] = await translateText(textToTranslate, sourceLang);
           queueSave();
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
    console.log('Loaded existing progress from it.json');
  }
  
  console.log('Starting translation to Italian...');
  await mergeAndTranslate(enData, deData, result);
  
  if (saveTimeout) clearTimeout(saveTimeout);
  fs.writeFileSync('messages/it.json', JSON.stringify(result, null, 2));
  console.log('Done! Wrote messages/it.json');
}

main().catch(console.error);
