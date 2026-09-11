const fs = require('fs');
const langs = ['en', 'de', 'fr', 'it'];

const offerteBtn = {
  en: 'Request a free offer',
  de: 'Kostenlose Offerte anfordern',
  fr: 'Demander une offre gratuite',
  it: "Richiedi un'offerta gratuita"
};

langs.forEach(lang => {
  const path = `messages/${lang}.json`;
  let data = JSON.parse(fs.readFileSync(path, 'utf8'));
  
  if (!data.home.newDesign.hero) data.home.newDesign.hero = {};
  data.home.newDesign.hero.offerteBtn = offerteBtn[lang];
  
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
});
console.log('Translations for offerteBtn updated.');
