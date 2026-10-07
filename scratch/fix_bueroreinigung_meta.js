const fs = require('fs');

const data = {
  en: {
    title: "Office Cleaning Biel | Practice & Commercial Cleaning | SwissCleanMove",
    description: "Professional office cleaning in Biel/Bienne. We clean your commercial premises, practices and offices in the Seeland region reliably and discreetly."
  },
  fr: {
    title: "Nettoyage de bureau Bienne | Nettoyage de cabinet & commercial | SwissCleanMove",
    description: "Nettoyage de bureau professionnel à Bienne/Biel. Nous nettoyons vos locaux commerciaux, cabinets et bureaux dans le Seeland de manière fiable et discrète."
  },
  it: {
    title: "Pulizia uffici Bienne | Pulizia studi & commerciale | SwissCleanMove",
    description: "Pulizia professionale di uffici a Biel/Bienne. Puliamo i vostri locali commerciali, studi e uffici nel Seeland in modo affidabile e discreto."
  }
};

for (const lang of ['en', 'fr', 'it']) {
  const file = `messages/${lang}.json`;
  let obj = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  if (!obj.seoPages) obj.seoPages = {};
  if (!obj.seoPages.bueroreinigungBiel) obj.seoPages.bueroreinigungBiel = {};
  
  obj.seoPages.bueroreinigungBiel.meta = data[lang];
  
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

// Now replace "high quality standards" across all files
const messages = ['messages/de.json', 'messages/en.json', 'messages/fr.json', 'messages/it.json'];
for (const file of messages) {
  let content = fs.readFileSync(file, 'utf8');

  // We are replacing only the occurrences that were introduced in place of Schweizer Qualität
  content = content.replace(/hohen Qualitätsstandards/g, 'professionelle Reinigung');
  content = content.replace(/high quality standards/g, 'professional cleaning');
  content = content.replace(/High quality standards/g, 'Professional cleaning');
  content = content.replace(/normes de qualité élevées/g, 'nettoyage professionnel');
  content = content.replace(/Normes de qualité élevées/g, 'Nettoyage professionnel');
  content = content.replace(/elevati standard di qualità/g, 'pulizia professionale');
  
  fs.writeFileSync(file, content, 'utf8');
}
