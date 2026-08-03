const fs = require('fs');

async function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function translateBatchSafe(texts, sourceLang, targetLang) {
    if (texts.length === 0) return [];
    const separator = '\n\n|||\n\n';
    const joined = texts.join(separator);
    
    let retries = 3;
    while(retries > 0) {
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(joined)}`;
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

async function translateObject(obj, sourceLang, targetLang) {
    const stringsToTranslate = [];
    
    function collect(node) {
        if (typeof node === 'string') {
            if (node.trim().length > 0) {
                stringsToTranslate.push(node);
            }
        } else if (Array.isArray(node)) {
            node.forEach(collect);
        } else if (typeof node === 'object' && node !== null) {
            Object.values(node).forEach(collect);
        }
    }
    
    collect(obj);
    
    console.log(`Found ${stringsToTranslate.length} strings to translate to ${targetLang}`);
    
    // Batch translate
    const batchSize = 10;
    const translatedStrings = [];
    
    for (let i = 0; i < stringsToTranslate.length; i += batchSize) {
        const batch = stringsToTranslate.slice(i, i + batchSize);
        process.stdout.write(`Translating ${i} to ${i + batch.length} for ${targetLang}... `);
        const translatedBatch = await translateBatchSafe(batch, sourceLang, targetLang);
        translatedStrings.push(...translatedBatch);
        console.log('OK');
    }
    
    let pointer = 0;
    function applyTranslation(node) {
        if (typeof node === 'string') {
            if (node.trim().length > 0) {
                return translatedStrings[pointer++];
            }
            return node;
        } else if (Array.isArray(node)) {
            return node.map(applyTranslation);
        } else if (typeof node === 'object' && node !== null) {
            const newObj = {};
            for (const key of Object.keys(node)) {
                newObj[key] = applyTranslation(node[key]);
            }
            return newObj;
        }
        return node;
    }
    
    return applyTranslation(obj);
}

async function main() {
    const deData = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
    const seoData = deData.seoPages; // The source of truth is German
    
    const targets = [
        { file: 'messages/en.json', lang: 'en' },
        { file: 'messages/fr.json', lang: 'fr' },
        { file: 'messages/it.json', lang: 'it' }
    ];
    
    for (const target of targets) {
        console.log(`\nStarting translation for ${target.lang}...`);
        const targetData = JSON.parse(fs.readFileSync(target.file, 'utf8'));
        
        // Translate the seoPages object
        const translatedSeo = await translateObject(seoData, 'de', target.lang);
        
        // Merge it back
        targetData.seoPages = translatedSeo;
        
        fs.writeFileSync(target.file, JSON.stringify(targetData, null, 2));
        console.log(`Saved ${target.file}`);
    }
}

main().catch(console.error);
