const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fr', 'it'];

const translations = {
  de: {
    photosLabel: "Fotos / Pläne (optional)",
    photosDesc: "Dateien auswählen (Bilder/PDFs)",
    yes: "Ja",
    no: "Nein"
  },
  en: {
    photosLabel: "Photos / Plans (optional)",
    photosDesc: "Select files (Images/PDFs)",
    yes: "Yes",
    no: "No"
  },
  fr: {
    photosLabel: "Photos / Plans (facultatif)",
    photosDesc: "Sélectionner des fichiers (Images/PDFs)",
    yes: "Oui",
    no: "Non"
  },
  it: {
    photosLabel: "Foto / Piani (opzionale)",
    photosDesc: "Seleziona file (Immagini/PDF)",
    yes: "Sì",
    no: "No"
  }
};

locales.forEach(locale => {
  const filePath = path.join(__dirname, 'messages', `${locale}.json`);
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.universalForm) data.universalForm = {};
  if (!data.universalForm.review) data.universalForm.review = {};
  if (!data.universalForm.common) data.universalForm.common = {};
  
  data.universalForm.review.photosLabel = translations[locale].photosLabel;
  data.universalForm.review.photosDesc = translations[locale].photosDesc;
  
  data.universalForm.common.yes = translations[locale].yes;
  data.universalForm.common.no = translations[locale].no;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Added missing keys to ${locale}.json`);
});
