const fs = require('fs');
const path = require('path');
const componentsDir = path.join(process.cwd(), 'src/components');

function searchFiles(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      searchFiles(fullPath, files);
    } else if (fullPath.endsWith('.tsx')) {
      files.push(fullPath);
    }
  });
  return files;
}

const files = searchFiles(componentsDir);
const formStateKeys = new Set();
const optionValues = new Set();

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  
  // Find state variables like const [cleanBathrooms, setCleanBathrooms]
  const stateRegex = /const\s+\[([a-zA-Z0-9_]+),\s*set[A-Z][a-zA-Z0-9_]*\]\s*=\s*useState/g;
  let match;
  while ((match = stateRegex.exec(content)) !== null) {
    formStateKeys.add(match[1]);
  }
  
  // Find option values like value="terrace" or value='terrace'
  const valueRegex = /value=["']([^"']+)["']/g;
  while ((match = valueRegex.exec(content)) !== null) {
    if (!match[1].includes('{') && !match[1].includes('/') && !match[1].includes(' ')) {
        optionValues.add(match[1]);
    }
  }
});

console.log('--- KEYS ---');
console.log(Array.from(formStateKeys).sort().join('\n'));
console.log('--- VALUES ---');
console.log(Array.from(optionValues).sort().join('\n'));
