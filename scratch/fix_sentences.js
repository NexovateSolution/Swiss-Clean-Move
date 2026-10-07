const fs = require('fs');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  for (const r of replacements) {
    content = content.replace(r.target, r.replacement);
  }
  
  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

replaceInFile('messages/de.json', [
  { target: /auf die Sie sich zu verlassen können/g, replacement: 'auf die Sie sich verlassen können' }
]);

replaceInFile('messages/fr.json', [
  { target: /sur laquelle vous pouvez compter à/g, replacement: 'sur laquelle vous pouvez compter' }
]);

replaceInFile('messages/it.json', [
  { target: /su cui puoi fare affidamento al/g, replacement: 'su cui puoi fare affidamento' }
]);

console.log('Fixed sentences in JSON files.');
