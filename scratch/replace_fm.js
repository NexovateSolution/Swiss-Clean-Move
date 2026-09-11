const fs = require('fs');

const langs = ['de', 'en', 'fr', 'it'];

function replaceFacilityManagement(obj) {
  if (typeof obj === 'string') {
    return obj
      .replace(/Facility Management/g, 'Facility Service')
      .replace(/facility management/g, 'facility service');
  } else if (Array.isArray(obj)) {
    return obj.map(item => replaceFacilityManagement(item));
  } else if (typeof obj === 'object' && obj !== null) {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = replaceFacilityManagement(obj[key]);
    }
    return newObj;
  }
  return obj;
}

langs.forEach(lang => {
  const path = `messages/${lang}.json`;
  try {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    const updatedData = replaceFacilityManagement(data);
    fs.writeFileSync(path, JSON.stringify(updatedData, null, 2) + '\n');
    console.log(`Updated ${path}`);
  } catch (err) {
    console.error(`Error processing ${path}:`, err);
  }
});
