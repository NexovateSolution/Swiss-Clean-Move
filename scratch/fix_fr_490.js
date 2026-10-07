const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../messages/fr.json');
let content = fs.readFileSync(filePath, 'utf8');

// The phrases we want to replace based on the previous audit:
// "à partir de 490 CHF" -> "à des prix forfaitaires équitables"
// "dès 490 CHF" -> "à des prix forfaitaires équitables"
// "Prix forfaitaires équitables à partir de 490 CHF" -> "Prix forfaitaires équitables"
// "Prix tout compris équitables à partir de 490 CHF" -> "Prix forfaitaires équitables"
// "Prix forfaitaires transparents à partir de 490 CHF" -> "Prix forfaitaires transparents"
// "Prix forfaitaires fixes à partir de 490 CHF" -> "Prix forfaitaires fixes"

const rules = [
  {
    regex: /Prix forfaitaires équitables à partir de 490 CHF/g,
    replace: 'Prix forfaitaires équitables'
  },
  {
    regex: /Prix tout compris équitables à partir de 490 CHF/g,
    replace: 'Prix forfaitaires équitables'
  },
  {
    regex: /Prix forfaitaires transparents à partir de 490 CHF( \(pas de frais cachés\))?/g,
    replace: (match, p1) => 'Prix forfaitaires transparents' + (p1 || '')
  },
  {
    regex: /Prix forfaitaires fixes à partir de 490 CHF sans surprise/g,
    replace: 'Prix forfaitaires fixes sans surprise'
  },
  {
    regex: /Prix forfaitaires fixes à partir de 490 CHF/g,
    replace: 'Prix forfaitaires fixes'
  },
  {
    regex: /à partir de 490 CHF/g,
    replace: 'à des prix forfaitaires équitables'
  },
  {
    regex: /dès 490 CHF/g,
    replace: 'à des prix forfaitaires équitables'
  },
  {
    regex: /déménagements à des prix forfaitaires équitables\),/g,
    replace: 'déménagements),' // Fix double replacement in FAQ texts: "déménagements à partir de 490 CHF)" -> "déménagements à des prix forfaitaires équitables)" which sounds clunky when followed by "avec des tarifs horaires", but wait, let's look at the exact texts!
  }
];

// Let's just do a custom replace function to be more natural.
const originalJson = JSON.parse(content);
let replacements = 0;

function traverse(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      let val = obj[key];
      if (val.includes('490')) {
        let newVal = val;
        
        // Custom replacements
        newVal = newVal.replace(/Prix forfaitaires équitables à partir de 490 CHF/g, 'Prix forfaitaires équitables');
        newVal = newVal.replace(/Prix tout compris équitables à partir de 490 CHF/g, 'Prix forfaitaires équitables');
        newVal = newVal.replace(/Prix forfaitaires transparents à partir de 490 CHF \(pas de frais cachés\)/g, 'Prix forfaitaires transparents (pas de frais cachés)');
        newVal = newVal.replace(/Prix forfaitaires transparents à partir de 490 CHF/g, 'Prix forfaitaires transparents');
        newVal = newVal.replace(/Prix forfaitaires fixes à partir de 490 CHF sans surprise/g, 'Prix forfaitaires fixes sans surprise');
        newVal = newVal.replace(/Prix forfaitaires fixes à partir de 490 CHF/g, 'Prix forfaitaires fixes');
        
        // "déménagements à partir de 490 CHF)" -> "déménagements à des prix forfaitaires équitables)"
        // Let's replace the whole sentence for the FAQ:
        newVal = newVal.replace(/nettoyage final à partir de 350 CHF ou déménagements à partir de 490 CHF\)/g, 'nettoyage final ou déménagements à des prix forfaitaires équitables)');
        
        // "à partir de 350 CHF pour les petits appartements\. Un appartement typique de 3,5 pièces coûte à partir de 490 CHF, un appartement de 4,5 pièces à partir de 690 CHF" 
        // We need to replace all these pricing examples.
        newVal = newVal.replace(/à partir de 350 CHF pour les petits appartements\. Un appartement typique de 3,5 pièces coûte à partir de 490 CHF, un appartement de 4,5 pièces à partir de 690 CHF/g, 'à des prix forfaitaires équitables pour chaque taille d\'appartement');
        
        newVal = newVal.replace(/un appartement de 2,5 pièces à partir de 350 CHF, un appartement de 3,5 pièces à partir de 490 CHF et un appartement de 4,5 pièces à partir de 690 CHF/g, 'les appartements à des prix forfaitaires équitables');
        newVal = newVal.replace(/un petit appartement à partir de 350 CHF\. Un appartement moyen de 3,5 pièces coûte à partir de 490 CHF, un appartement de 4,5 pièces à partir de 690 CHF/g, 'les appartements à des prix forfaitaires équitables selon leur taille');
        
        // General fallback
        newVal = newVal.replace(/à partir de 490 CHF/g, 'à des prix forfaitaires équitables');
        newVal = newVal.replace(/dès 490 CHF/g, 'à des prix forfaitaires équitables');

        if (newVal !== val) {
          obj[key] = newVal;
          replacements++;
        } else if (newVal.includes('490')) {
          console.log('UNMATCHED:', newVal);
        }
      }
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      traverse(obj[key]);
    }
  }
}

traverse(originalJson);

fs.writeFileSync(filePath, JSON.stringify(originalJson, null, 2) + '\n', 'utf8');
console.log('Replacements made:', replacements);
