const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fr', 'it'];

const translations = {
  de: {
    name: "Bitte Name angeben",
    email: "Bitte E-Mail angeben",
    phone: "Bitte Telefon angeben",
    services: "Bitte mindestens eine Dienstleistung wählen",
    terms: "Bitte Einwilligung bestätigen"
  },
  en: {
    name: "Please provide your name",
    email: "Please provide your email",
    phone: "Please provide your phone number",
    services: "Please select at least one service",
    terms: "Please confirm your consent"
  },
  fr: {
    name: "Veuillez indiquer votre nom",
    email: "Veuillez indiquer votre adresse e-mail",
    phone: "Veuillez indiquer votre numéro de téléphone",
    services: "Veuillez sélectionner au moins un service",
    terms: "Veuillez confirmer votre consentement"
  },
  it: {
    name: "Si prega di fornire il proprio nome",
    email: "Si prega di fornire la propria email",
    phone: "Si prega di fornire il proprio numero di telefono",
    services: "Si prega di selezionare almeno un servizio",
    terms: "Si prega di confermare il proprio consenso"
  }
};

locales.forEach(locale => {
  const filePath = path.join(__dirname, 'messages', `${locale}.json`);
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.universalForm) data.universalForm = {};
  if (!data.universalForm.validation) data.universalForm.validation = {};
  
  data.universalForm.validation = translations[locale];
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Added validation keys to ${locale}.json`);
});
