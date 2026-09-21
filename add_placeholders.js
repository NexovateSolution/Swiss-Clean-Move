const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fr', 'it'];

const translations = {
  de: {
    servicesSubtitle: "Wählen Sie eine oder mehrere Dienstleistungen",
    servicesSelected: "{count} Dienstleistung(en) ausgewählt",
    propertySubtitleSingle: "Bitte geben Sie den Einsatzort an",
    propertySubtitleMoving: "Bitte geben Sie die Start- und Zieladresse an",
    placeholderParking: "z.B. Parkplatz vorhanden / Zufahrt eingeschränkt",
    placeholderDistance: "z.B. 20m",
    placeholderMovingItems: "z.B. Waschmaschine, Trockner, Aquarium...",
    placeholderNumber: "z.B. 2",
    placeholderTimeWindow: "z.B. 08:00–12:00 / vormittags",
    placeholderCleaningRooms: "z.B. Küche, Bad, Wohnzimmer, Schlafzimmer..."
  },
  en: {
    servicesSubtitle: "Select one or more services",
    servicesSelected: "{count} service(s) selected",
    propertySubtitleSingle: "Please provide the service location",
    propertySubtitleMoving: "Please provide the collection and delivery addresses",
    placeholderParking: "e.g. Parking available / Limited access",
    placeholderDistance: "e.g. 20m",
    placeholderMovingItems: "e.g. Washing machine, dryer, aquarium...",
    placeholderNumber: "e.g. 2",
    placeholderTimeWindow: "e.g. 08:00–12:00 / mornings",
    placeholderCleaningRooms: "e.g. Kitchen, bathroom, living room, bedroom..."
  },
  fr: {
    servicesSubtitle: "Sélectionnez un ou plusieurs services",
    servicesSelected: "{count} service(s) sélectionné(s)",
    propertySubtitleSingle: "Veuillez indiquer le lieu d'intervention",
    propertySubtitleMoving: "Veuillez indiquer les adresses de départ et de destination",
    placeholderParking: "ex. Parking disponible / Accès limité",
    placeholderDistance: "ex. 20m",
    placeholderMovingItems: "ex. Lave-linge, sèche-linge, aquarium...",
    placeholderNumber: "ex. 2",
    placeholderTimeWindow: "ex. 08:00–12:00 / matins",
    placeholderCleaningRooms: "ex. Cuisine, salle de bain, salon, chambre..."
  },
  it: {
    servicesSubtitle: "Seleziona uno o più servizi",
    servicesSelected: "{count} servizio/i selezionato/i",
    propertySubtitleSingle: "Si prega di indicare il luogo di intervento",
    propertySubtitleMoving: "Si prega di indicare gli indirizzi di partenza e di destinazione",
    placeholderParking: "es. Parcheggio disponibile / Accesso limitato",
    placeholderDistance: "es. 20m",
    placeholderMovingItems: "es. Lavatrice, asciugatrice, acquario...",
    placeholderNumber: "es. 2",
    placeholderTimeWindow: "es. 08:00–12:00 / mattina",
    placeholderCleaningRooms: "es. Cucina, bagno, soggiorno, camera da letto..."
  }
};

locales.forEach(locale => {
  const filePath = path.join(__dirname, 'messages', `${locale}.json`);
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.universalForm) data.universalForm = {};
  if (!data.universalForm.placeholders) data.universalForm.placeholders = {};
  
  const trans = translations[locale];
  
  data.universalForm.services = data.universalForm.services || {};
  data.universalForm.services.subtitle = trans.servicesSubtitle;
  data.universalForm.services.selectedCount = trans.servicesSelected;
  
  data.universalForm.property = data.universalForm.property || {};
  data.universalForm.property.subtitleSingle = trans.propertySubtitleSingle;
  data.universalForm.property.subtitleMoving = trans.propertySubtitleMoving;
  
  data.universalForm.placeholders = {
    parking: trans.placeholderParking,
    distance: trans.placeholderDistance,
    movingItems: trans.placeholderMovingItems,
    number: trans.placeholderNumber,
    timeWindow: trans.placeholderTimeWindow,
    cleaningRooms: trans.placeholderCleaningRooms
  };
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Added placeholders to ${locale}.json`);
});
