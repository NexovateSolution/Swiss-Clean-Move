const fs = require('fs');

const path = 'src/utils/pdfGenerator.ts';
let content = fs.readFileSync(path, 'utf8');

// Add floor translations to dictionaries
content = content.replace(/area: 'Fläche:',/, "area: 'Fläche:',\n      floor: 'Etage:',");
content = content.replace(/area: 'Area:',/, "area: 'Area:',\n      floor: 'Floor:',");
content = content.replace(/area: 'Surface:',/, "area: 'Surface:',\n      floor: 'Étage:',");
content = content.replace(/area: 'Superficie:',/, "area: 'Superficie:',\n      floor: 'Piano:',");

// Add sharedLivingArea and floor to HTML template
const areaTemplateRegex = /\$\{customer\.livingSpaceInM2 \|\| customer\.areaInM2 \|\| customer\.area \|\| customer\.squareMeters \? \`<div><strong>\$\{locDict\.area\}<\/strong> ca\. \$\{customer\.livingSpaceInM2 \|\| customer\.areaInM2 \|\| customer\.area \|\| customer\.squareMeters\} m²<\/div>\` : ''\}/;

const newAreaTemplate = `\${customer.livingSpaceInM2 || customer.areaInM2 || customer.area || customer.squareMeters || customer.sharedLivingArea ? \`<div><strong>\${locDict.area}</strong> ca. \${customer.livingSpaceInM2 || customer.areaInM2 || customer.area || customer.squareMeters || customer.sharedLivingArea} m²</div>\` : ''}
          \${customer.floor || customer.floorsLevel || customer.sharedFloor ? \`<div><strong>\${locDict.floor}</strong> \${customer.floor || customer.floorsLevel || customer.sharedFloor}</div>\` : ''}`;

content = content.replace(areaTemplateRegex, newAreaTemplate);

fs.writeFileSync(path, content);
console.log('pdfGenerator.ts updated with floor and sharedLivingArea.');
