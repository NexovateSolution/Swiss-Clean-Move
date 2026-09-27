const fs = require('fs');
const path = require('path');

const locales = ['en', 'de', 'fr', 'it'];
const translations = {
  en: 'Submit Request',
  de: 'Anfrage senden',
  fr: 'Soumettre la demande',
  it: 'Invia richiesta'
};

locales.forEach(loc => {
  const filePath = path.join(__dirname, 'messages', `${loc}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (!data.universalForm) data.universalForm = {};
    if (!data.universalForm.buttons) data.universalForm.buttons = {};
    
    data.universalForm.buttons.submitRequest = translations[loc];
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Updated ${loc}.json`);
  }
});
