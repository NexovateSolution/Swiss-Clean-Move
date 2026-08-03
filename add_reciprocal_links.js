const fs = require('fs');

// Add reciprocal internal links to related Solothurn pages
const files = ['messages/de.json', 'messages/en.json', 'messages/fr.json', 'messages/it.json'];

const linkLabels = {
  de: 'Reinigungsfirma Solothurn',
  en: 'Cleaning Company Solothurn',
  fr: 'Entreprise de nettoyage Soleure',
  it: 'Impresa di pulizie Soletta'
};

const langs = ['de', 'en', 'fr', 'it'];

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const lang = langs[i];
  console.log(`Processing ${file}...`);
  
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  // Add link to reinigungsfirma-solothurn from umzugSolothurn
  if (data.seoPages?.umzugSolothurn?.internalLinks) {
    const existing = data.seoPages.umzugSolothurn.internalLinks;
    const alreadyHas = existing.some(l => l.href === 'reinigungsfirma-solothurn');
    if (!alreadyHas) {
      existing.push({
        label: linkLabels[lang],
        href: 'reinigungsfirma-solothurn'
      });
      console.log(`  ✅ Added link to umzugSolothurn.internalLinks`);
    } else {
      console.log(`  ⏭ umzugSolothurn already has the link`);
    }
  }
  
  // Add link to reinigungsfirma-solothurn from reinigungsfirmaSchweiz
  if (data.seoPages?.reinigungsfirmaSchweiz?.internalLinks) {
    const existing = data.seoPages.reinigungsfirmaSchweiz.internalLinks;
    const alreadyHas = existing.some(l => l.href === 'reinigungsfirma-solothurn');
    if (!alreadyHas) {
      existing.push({
        label: linkLabels[lang],
        href: 'reinigungsfirma-solothurn'
      });
      console.log(`  ✅ Added link to reinigungsfirmaSchweiz.internalLinks`);
    } else {
      console.log(`  ⏭ reinigungsfirmaSchweiz already has the link`);
    }
  }
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

console.log('\nDone! Reciprocal links added.');
