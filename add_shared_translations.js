const fs = require('fs');
const path = require('path');

const locales = ['en', 'de', 'fr'];
const baseDir = path.join(__dirname, 'messages');

const translations = {
  en: {
    accessAndOrg: "Access & Organization",
    workingHours: "Working Hours",
    propertyInformation: "Property Information",
    propertyType: "Property Type",
    propertyLocation: "Property Location",
    access: {
      keysAvailable: "Keys available",
      accessSystemCode: "Access system / Code",
      caretakerOnSite: "Caretaker on-site",
      adminOnSite: "Administration on-site",
      alarmSystem: "Alarm system",
      houseRulesAvailable: "House rules available",
      cleaningPlanAvailable: "Cleaning plan available"
    },
    hours: {
      earlyMorning: "Early morning",
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
      duringBusinessHours: "During business hours",
      afterBusinessHours: "After business hours",
      flexible: "Flexible"
    },
    info: {
      units: "Number of units (apartments / offices)",
      floors: "Number of floors",
      totalArea: "Total area (m²)",
      outdoorArea: "Outdoor area (m²)"
    },
    types: {
      multiFamily: "Multi-family house",
      residentialComplex: "Residential complex",
      officeBuilding: "Office building",
      commercialProperty: "Commercial property",
      industrialProperty: "Industrial property",
      practiceClinic: "Practice / Clinic",
      specialProperty: "Special property"
    },
    location: {
      streetZipCity: "Street, ZIP, City*"
    }
  },
  de: {
    accessAndOrg: "Zugang & Organisation",
    workingHours: "Arbeitszeiten",
    propertyInformation: "Objektinformationen",
    propertyType: "Objektart",
    propertyLocation: "Objektstandort",
    access: {
      keysAvailable: "Schlüssel vorhanden",
      accessSystemCode: "Zugangssystem / Code",
      caretakerOnSite: "Hauswart vor Ort",
      adminOnSite: "Verwaltung vor Ort",
      alarmSystem: "Alarmanlage",
      houseRulesAvailable: "Hausordnung vorhanden",
      cleaningPlanAvailable: "Reinigungsplan vorhanden"
    },
    hours: {
      earlyMorning: "Frühmorgens",
      morning: "Vormittags",
      afternoon: "Nachmittags",
      evening: "Abends",
      duringBusinessHours: "Während Bürozeiten",
      afterBusinessHours: "Ausserhalb Bürozeiten",
      flexible: "Flexibel"
    },
    info: {
      units: "Anzahl Einheiten (Wohnungen / Büros)",
      floors: "Anzahl Etagen",
      totalArea: "Gesamtfläche (m²)",
      outdoorArea: "Aussenfläche (m²)"
    },
    types: {
      multiFamily: "Mehrfamilienhaus",
      residentialComplex: "Überbauung/Wohnkomplex",
      officeBuilding: "Bürogebäude",
      commercialProperty: "Gewerbeobjekt",
      industrialProperty: "Industrieobjekt",
      practiceClinic: "Praxis / Klinik",
      specialProperty: "Spezialobjekt"
    },
    location: {
      streetZipCity: "Strasse, PLZ, Ort*"
    }
  },
  fr: {
    accessAndOrg: "Accès & Organisation",
    workingHours: "Heures de travail",
    propertyInformation: "Informations sur la propriété",
    propertyType: "Type de propriété",
    propertyLocation: "Lieu de la propriété",
    access: {
      keysAvailable: "Clés disponibles",
      accessSystemCode: "Système d'accès / Code",
      caretakerOnSite: "Concierge sur place",
      adminOnSite: "Administration sur place",
      alarmSystem: "Système d'alarme",
      houseRulesAvailable: "Règlement intérieur disponible",
      cleaningPlanAvailable: "Plan de nettoyage disponible"
    },
    hours: {
      earlyMorning: "Tôt le matin",
      morning: "Matin",
      afternoon: "Après-midi",
      evening: "Soir",
      duringBusinessHours: "Pendant les heures de bureau",
      afterBusinessHours: "Après les heures de bureau",
      flexible: "Flexible"
    },
    info: {
      units: "Nombre d'unités (appartements / bureaux)",
      floors: "Nombre d'étages",
      totalArea: "Superficie totale (m²)",
      outdoorArea: "Superficie extérieure (m²)"
    },
    types: {
      multiFamily: "Maison multifamiliale",
      residentialComplex: "Complexe résidentiel",
      officeBuilding: "Immeuble de bureaux",
      commercialProperty: "Immobilier commercial",
      industrialProperty: "Propriété industrielle",
      practiceClinic: "Cabinet / Clinique",
      specialProperty: "Propriété spéciale"
    },
    location: {
      streetZipCity: "Rue, NPA, Lieu*"
    }
  }
};

for (const loc of locales) {
  const filePath = path.join(baseDir, `${loc}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.serviceForm.wizard.sharedCleaning) {
    data.serviceForm.wizard.sharedCleaning = {};
  }
  
  Object.assign(data.serviceForm.wizard.sharedCleaning, translations[loc]);
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

console.log("Translations updated");
