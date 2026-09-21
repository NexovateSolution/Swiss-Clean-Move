const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fr', 'it'];

const translations = {
  de: "{count} Dienstleistung(en) ausgewählt",
  en: "{count} service(s) selected",
  fr: "{count} service(s) sélectionné(s)",
  it: "{count} servizio(i) selezionato(i)"
};

locales.forEach(locale => {
  const filePath = path.join(__dirname, 'messages', `${locale}.json`);
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.universalForm) data.universalForm = {};
  if (!data.universalForm.services) data.universalForm.services = {};
  
  data.universalForm.services.selectedCount = translations[locale];
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${locale}.json`);
});
