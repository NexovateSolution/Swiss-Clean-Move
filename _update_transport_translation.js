const fs = require('fs');
const path = require('path');

const locales = ['en', 'de', 'fr'];
const translations = {
  en: "Transport",
  de: "Transport",
  fr: "Transport"
};

for (const locale of locales) {
  const filePath = path.join(__dirname, 'messages', `${locale}.json`);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find the exact spot to insert.
  // We want to find `"combo": "..."` and insert `"transport": "Transport"` after it.
  const regex = /("combo"\s*:\s*"[^"]*")/;
  
  if (regex.test(content)) {
    const newContent = content.replace(regex, `$1,\n            "transport": "${translations[locale]}"`);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${locale}.json`);
  } else {
    console.log(`Could not find 'combo' in ${locale}.json`);
  }
}
