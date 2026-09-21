const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fr', 'it'];

const translations = {
  de: "Reinigungsart (Mehrfachauswahl möglich)",
  en: "Type of cleaning (multiple selections possible)",
  fr: "Type de nettoyage (sélections multiples possibles)",
  it: "Tipo di pulizia (più selezioni possibili)"
};

locales.forEach(locale => {
  const filePath = path.join(__dirname, 'messages', `${locale}.json`);
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.universalForm) data.universalForm = {};
  if (!data.universalForm.cleaning) data.universalForm.cleaning = {};
  
  data.universalForm.cleaning.typeSubtitle = translations[locale];
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${locale}.json`);
});
