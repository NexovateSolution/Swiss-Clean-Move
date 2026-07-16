const fs = require('fs');
const file = 'src/lib/knowledgeHubData.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace mojibake long dash with real hyphen or em-dash
content = content.replace(/â€“/g, '-');
content = content.replace(/â€”/g, '-');
content = content.replace(/â‚¬/g, 'CHF');
content = content.replace(/â€™/g, "'");
content = content.replace(/â€/g, "");

fs.writeFileSync(file, content);
console.log('Fixed encoding in knowledgeHubData.ts');
