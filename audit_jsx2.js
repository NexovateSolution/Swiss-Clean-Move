const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        walk(filePath, fileList);
      }
    } else if (file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = walk('src');
let totalIssues = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(' + '\n'');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Simple heuristic for hardcoded text:
    // Matches > Text < but ignores > < and >{...}<
    const matches = line.match(/>([^<{}]+)</g);
    if (matches) {
      for (const m of matches) {
        const text = m.slice(1, -1).trim();
        // Ignore empty strings, numbers, punctuation, short common things
        if (text && !text.match(/^[\d\s.,:;!?&%€$-]+$/) && text.length > 2) {
          // Ignore imports, class names, etc (shouldn't be in > < but just in case)
          fs.appendFileSync('audit_output.txt', `[${file}:${i+1}] Hardcoded text: "${text}"`);
          totalIssues++;
        }
      }
    }
    
    // Look for ternary translation patterns
    if (line.includes("locale ===") && line.includes(" ? ") && !line.includes("next-intl")) {
       console.log(`[${file}:${i+1}] Ternary translation: ${line.trim()}`);
       totalIssues++;
    }
  }
}

console.log(`Total potential hardcoded strings found: ${totalIssues}`);
