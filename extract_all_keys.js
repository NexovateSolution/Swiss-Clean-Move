const fs = require('fs');
const path = require('path');

const translationKeys = new Set();
const translationValues = new Set();

function searchFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      searchFiles(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // 1. Extract all state variables (keys)
      const stateRegex = /const\s+\[([a-zA-Z0-9_]+),\s*set[A-Z]/g;
      let match;
      while ((match = stateRegex.exec(content)) !== null) {
          translationKeys.add(match[1]);
      }

      // 2. Extract values from <option value="xyz">
      const optionRegex = /<option[^>]*value=["']([^"']+)["']/g;
      while ((match = optionRegex.exec(content)) !== null) {
          translationValues.add(match[1]);
      }

      // 3. Extract values from input type="radio" value="xyz"
      const radioRegex = /type=["']radio["'][^>]*value=["']([^"']+)["']/g;
      while ((match = radioRegex.exec(content)) !== null) {
          translationValues.add(match[1]);
      }
      
      const radioRegex2 = /value=["']([^"']+)["'][^>]*type=["']radio["']/g;
      while ((match = radioRegex2.exec(content)) !== null) {
          translationValues.add(match[1]);
      }
    }
  }
}

searchFiles(path.join(process.cwd(), 'src', 'components'));
searchFiles(path.join(process.cwd(), 'src', 'app'));

// Load current translations to see what's missing
const translationsContent = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'translations.ts'), 'utf8');

const missingKeys = [];
for (const key of translationKeys) {
    if (!translationsContent.includes(key + ': {') && !translationsContent.includes("'" + key + "': {")) {
        missingKeys.push(key);
    }
}

const missingValues = [];
for (const val of translationValues) {
    if (!translationsContent.includes(val + ': {') && !translationsContent.includes("'" + val + "': {")) {
        missingValues.push(val);
    }
}

fs.writeFileSync('missing_translations.json', JSON.stringify({
    missingKeys: missingKeys.sort(),
    missingValues: missingValues.sort()
}, null, 2));
console.log('Written to missing_translations.json');
