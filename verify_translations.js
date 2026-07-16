const fs = require('fs');

function countKeys(obj, path = '') {
  let count = 0;
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      count += countKeys(obj[key], path ? `${path}.${key}` : key);
    } else if (Array.isArray(obj[key])) {
       count += obj[key].length;
    } else {
      count++;
    }
  }
  return count;
}

function checkMissingKeys(sourceObj, targetObj, path = '', missing = []) {
  for (const key in sourceObj) {
    const currentPath = path ? `${path}.${key}` : key;
    if (targetObj[key] === undefined) {
      missing.push(currentPath);
    } else if (typeof sourceObj[key] === 'object' && sourceObj[key] !== null && !Array.isArray(sourceObj[key])) {
      checkMissingKeys(sourceObj[key], targetObj[key], currentPath, missing);
    } else if (Array.isArray(sourceObj[key])) {
      if (!Array.isArray(targetObj[key]) || targetObj[key].length < sourceObj[key].length) {
         missing.push(currentPath);
      }
    }
  }
  return missing;
}

function checkIdenticalValues(enObj, itObj, path = '', identical = []) {
  for (const key in enObj) {
    const currentPath = path ? `${path}.${key}` : key;
    if (typeof enObj[key] === 'object' && enObj[key] !== null && !Array.isArray(enObj[key])) {
      checkIdenticalValues(enObj[key], itObj[key] || {}, currentPath, identical);
    } else if (Array.isArray(enObj[key])) {
      for(let i = 0; i < enObj[key].length; i++) {
        const enVal = enObj[key][i];
        const itVal = (itObj[key] && itObj[key][i]) ? itObj[key][i] : null;
        if (typeof enVal === 'string' && enVal === itVal && enVal.match(/[a-zA-Z]/)) {
          // exclude brand names
          if (!["SwissCleanMove", "Google", "WhatsApp", "Biel/Bienne"].includes(enVal)) {
            identical.push({path: `${currentPath}[${i}]`, value: enVal});
          }
        }
      }
    } else {
      const enVal = enObj[key];
      const itVal = itObj[key];
      if (typeof enVal === 'string' && enVal === itVal && enVal.match(/[a-zA-Z]/)) {
        if (!["SwissCleanMove", "Google", "WhatsApp", "Biel/Bienne", "CHF"].includes(enVal)) {
            identical.push({path: currentPath, value: enVal});
        }
      }
    }
  }
  return identical;
}

function main() {
  console.log("=== TRANSLATION AUDIT REPORT ===\\n");

  const exists = fs.existsSync('messages/it.json');
  console.log(`1. messages/it.json exists: ${exists ? 'YES' : 'NO'}`);
  
  if (!exists) return;
  
  const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
  const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
  const fr = JSON.parse(fs.readFileSync('messages/fr.json', 'utf8'));
  const it = JSON.parse(fs.readFileSync('messages/it.json', 'utf8'));

  const enKeys = countKeys(en);
  const deKeys = countKeys(de);
  const frKeys = countKeys(fr);
  const itKeys = countKeys(it);

  console.log(`\n3. Total number of translation keys:`);
  console.log(`   - EN: ${enKeys}`);
  console.log(`   - DE: ${deKeys}`);
  console.log(`   - FR: ${frKeys}`);
  console.log(`   - IT: ${itKeys}`);

  const missingFromIt = checkMissingKeys(en, it);
  console.log(`\n2 & 4. Nested Key Structure & Missing Keys:`);
  if (missingFromIt.length === 0) {
    console.log(`   YES, exact same structure. ZERO missing keys in Italian.`);
  } else {
    console.log(`   NO. There are ${missingFromIt.length} missing keys in Italian.`);
  }

  const identical = checkIdenticalValues(en, it);
  console.log(`\n5. Identical to English (excluding products/brands):`);
  if (identical.length === 0) {
     console.log(`   None! All Italian values are distinct translated strings.`);
  } else {
     console.log(`   WARNING: ${identical.length} values are still identical to English.`);
  }
}

main();
