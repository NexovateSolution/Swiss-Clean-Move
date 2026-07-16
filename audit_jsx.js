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
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = walk('src');
let out = '';
let totalIssues = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Look for JSX text (simplified heuristic)
    if (file.endsWith('.tsx')) {
      const matches = line.match(/>([^<{}]+)</g);
      if (matches) {
        for (const m of matches) {
          const text = m.slice(1, -1).trim();
          if (text && !text.match(/^[\d\s.,:;!?&%€$-]+$/) && text.length > 2) {
            out += `[${file}:${i+1}] Hardcoded text: "${text}"\n`;
            totalIssues++;
          }
        }
      }
    }
    
    // Look for ternary translation patterns
    if (line.includes("locale ===") && line.includes(" ? ") && !line.includes("next-intl")) {
       out += `[${file}:${i+1}] Ternary translation: ${line.trim()}\n`;
       totalIssues++;
    }
  }
}

out += `Total potential hardcoded strings found: ${totalIssues}\n`;
fs.writeFileSync('audit_output.txt', out);
