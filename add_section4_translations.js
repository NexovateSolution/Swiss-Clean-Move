const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fr', 'it'];

const translations = {
  de: {
    section4ACleaning: "Reinigung - Art und Bereiche",
    section4BCleaning: "Fenster, Storen & Sanitär",
    section4CCleaning: "Böden, Aussenbereiche & Zusatzarbeiten",
    section4DCleaning: "Zustand & Besonderheiten",
    section4BMoving: "Umfang & gewünschte Leistungen",
    section4CMoving: "Spezialgut, Entsorgung & Organisation",
    mainCatCleaning: "Reinigung",
    mainCatMoving: "Umzug / Transport",
    mainCatFacility: "Hauswartung / Facility",
    mainCatOther: "Sonstiges"
  },
  en: {
    section4ACleaning: "Cleaning - type and areas",
    section4BCleaning: "Windows, blinds & sanitary",
    section4CCleaning: "Floors, outdoor areas & additional work",
    section4DCleaning: "Condition & special features",
    section4BMoving: "Scope & requested services",
    section4CMoving: "Special items, disposal & organization",
    mainCatCleaning: "Cleaning",
    mainCatMoving: "Moving / Transport",
    mainCatFacility: "Facility Management",
    mainCatOther: "Other"
  },
  fr: {
    section4ACleaning: "Nettoyage - type et zones",
    section4BCleaning: "Fenêtres, stores & sanitaires",
    section4CCleaning: "Sols, extérieurs & travaux supplémentaires",
    section4DCleaning: "État & particularités",
    section4BMoving: "Étendue & services souhaités",
    section4CMoving: "Objets spéciaux, élimination & organisation",
    mainCatCleaning: "Nettoyage",
    mainCatMoving: "Déménagement / Transport",
    mainCatFacility: "Conciergerie / Facility",
    mainCatOther: "Autre"
  },
  it: {
    section4ACleaning: "Pulizia - tipo e aree",
    section4BCleaning: "Finestre, tende e sanitari",
    section4CCleaning: "Pavimenti, esterni e lavori aggiuntivi",
    section4DCleaning: "Condizione e particolarità",
    section4BMoving: "Ambito e servizi richiesti",
    section4CMoving: "Oggetti speciali, smaltimento e organizzazione",
    mainCatCleaning: "Pulizia",
    mainCatMoving: "Trasloco / Trasporto",
    mainCatFacility: "Custodia / Facility",
    mainCatOther: "Altro"
  }
};

locales.forEach(locale => {
  const filePath = path.join(__dirname, 'messages', `${locale}.json`);
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.universalForm) data.universalForm = {};
  if (!data.universalForm.sectionTitles) data.universalForm.sectionTitles = {};
  if (!data.universalForm.mainCategories) data.universalForm.mainCategories = {};
  
  const trans = translations[locale];
  
  data.universalForm.sectionTitles = {
    ...data.universalForm.sectionTitles,
    cleaning4A: trans.section4ACleaning,
    cleaning4B: trans.section4BCleaning,
    cleaning4C: trans.section4CCleaning,
    cleaning4D: trans.section4DCleaning,
    moving4B: trans.section4BMoving,
    moving4C: trans.section4CMoving
  };

  data.universalForm.mainCategories = {
    cleaning: trans.mainCatCleaning,
    moving: trans.mainCatMoving,
    facility: trans.mainCatFacility,
    other: trans.mainCatOther
  };
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${locale}.json`);
});
