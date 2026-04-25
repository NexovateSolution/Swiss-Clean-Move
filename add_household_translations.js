const fs = require('fs');
const path = require('path');

const locales = ['en', 'de', 'fr'];
const messagesDir = path.join(__dirname, 'messages');

const newTranslations = {
  en: {
    home: {
      services: {
        houseCleaning: {
          title: "Cleaning & Property Maintenance"
        }
      }
    },
    serviceForm: {
      wizard: {
        facilityServices: {
          specialNotes: "Special notes (optional)"
        },
        householdHelping: {
          step1Title: "STEP 1 – CLEANING & FREQUENCY",
          supportType: "What kind of support do you need?",
          supportTypes: {
            householdHelp: "Household help (daily support / assistance)",
            maintenanceCleaning: "Maintenance cleaning (regular)",
            combination: "Combination"
          },
          cleaningFrequency: "Cleaning frequency *",
          frequency: {
            oneTime: "One-time",
            weekly: "Weekly",
            twoThreePerWeek: "2–3 times per week",
            everyTwoWeeks: "Every 2 weeks",
            monthly: "Monthly",
            custom: "Custom"
          },
          preferredStart: "Preferred start *",
          date: "Date",
          time: "Time (optional)",
          flexibility: "Flexibility",
          flexibilityTypes: {
            fixed: "Fixed appointment",
            flexible: "Flexible"
          },
          step2Title: "STEP 2 – PROPERTY & HOUSEHOLD",
          address: "Address *",
          zipCity: "ZIP / City",
          streetNo: "Street / No.",
          propertyType: "Property type *",
          propertyTypes: {
            apartment: "Apartment",
            house: "House",
            sharedRoom: "Shared room (WG room)"
          },
          size: "Size",
          numberOfRooms: "Number of rooms",
          areaM2: "Area (m²)",
          floor: "Floor",
          elevatorAvailable: "Elevator available",
          yes: "Yes",
          no: "No",
          step3Title: "STEP 3 – CLEANING SCOPE",
          standardCleaning: "Standard cleaning",
          standardOptions: {
            vacuuming: "Vacuuming",
            moppingFloors: "Mopping floors",
            dusting: "Dusting",
            cleaningKitchen: "Cleaning the kitchen",
            cleaningBathroom: "Cleaning bathroom / toilet",
            cleaningSurfaces: "Cleaning surfaces"
          },
          additionalServices: "Additional services",
          additionalOptions: {
            windowsInside: "Windows (inside)",
            windowsOutside: "Windows (outside)",
            blindsShutters: "Blinds / shutters",
            cleaningRefrigerator: "Cleaning the refrigerator",
            cleaningOven: "Cleaning the oven",
            balconyTerrace: "Balcony / terrace"
          },
          householdHelpOptional: "Household help (optional)",
          householdHelpOptions: {
            laundry: "Laundry",
            ironing: "Ironing",
            changingBedLinen: "Changing bed linen",
            tidyingUp: "Tidying up / organizing",
            shopping: "Shopping / errands"
          },
          step4Title: "STEP 4 – ACCESS & DETAILS",
          accessApartment: "Access to the apartment",
          accessTypes: {
            inPerson: "In person",
            keyAvailable: "Key available",
            keyMailbox: "Key in mailbox",
            other: "Other"
          },
          otherSpecify: "Please specify:",
          pets: "Pets",
          specialNotes: "Special notes (optional)",
          step5Title: "STEP 5 – UPLOAD & CONTACT",
          uploadPhotos: "Upload photos",
          uploadHint: "For a faster & more accurate quote",
          contactDetails: "Contact Details",
          name: "Name / First Name",
          email: "E-mail",
          phone: "Phone"
        }
      }
    }
  },
  de: {
    home: {
      services: {
        houseCleaning: {
          title: "Reinigung und Hauswartung"
        }
      }
    },
    serviceForm: {
      wizard: {
        facilityServices: {
          specialNotes: "Besondere Hinweise (optional)"
        },
        householdHelping: {
          step1Title: "SCHRITT 1 – REINIGUNG & HÄUFIGKEIT",
          supportType: "Welche Art von Unterstützung benötigen Sie?",
          supportTypes: {
            householdHelp: "Haushaltshilfe (alltägliche Unterstützung / Betreuung)",
            maintenanceCleaning: "Unterhaltsreinigung (regelmäßig)",
            combination: "Kombination"
          },
          cleaningFrequency: "Reinigungsintervall *",
          frequency: {
            oneTime: "Einmalig",
            weekly: "Wöchentlich",
            twoThreePerWeek: "2–3 Mal pro Woche",
            everyTwoWeeks: "Alle 2 Wochen",
            monthly: "Monatlich",
            custom: "Individuell"
          },
          preferredStart: "Gewünschter Beginn *",
          date: "Datum",
          time: "Uhrzeit (optional)",
          flexibility: "Flexibilität",
          flexibilityTypes: {
            fixed: "Fester Termin",
            flexible: "Flexibel"
          },
          step2Title: "SCHRITT 2 – OBJEKT & HAUSHALT",
          address: "Adresse *",
          zipCity: "PLZ / Ort",
          streetNo: "Strasse / Nr.",
          propertyType: "Objektart *",
          propertyTypes: {
            apartment: "Wohnung",
            house: "Haus",
            sharedRoom: "WG-Zimmer"
          },
          size: "Größe",
          numberOfRooms: "Anzahl Zimmer",
          areaM2: "Fläche (m²)",
          floor: "Etage",
          elevatorAvailable: "Aufzug vorhanden",
          yes: "Ja",
          no: "Nein",
          step3Title: "SCHRITT 3 – REINIGUNGSUMFANG",
          standardCleaning: "Standardreinigung",
          standardOptions: {
            vacuuming: "Staubsaugen",
            moppingFloors: "Böden feucht aufnehmen",
            dusting: "Abstauben",
            cleaningKitchen: "Küche reinigen",
            cleaningBathroom: "Bad / WC reinigen",
            cleaningSurfaces: "Oberflächen reinigen"
          },
          additionalServices: "Zusatzleistungen",
          additionalOptions: {
            windowsInside: "Fenster (innen)",
            windowsOutside: "Fenster (außen)",
            blindsShutters: "Storen / Rollläden",
            cleaningRefrigerator: "Kühlschrank reinigen",
            cleaningOven: "Backofen reinigen",
            balconyTerrace: "Balkon / Terrasse"
          },
          householdHelpOptional: "Haushaltshilfe (optional)",
          householdHelpOptions: {
            laundry: "Wäsche waschen",
            ironing: "Bügeln",
            changingBedLinen: "Bettwäsche wechseln",
            tidyingUp: "Aufräumen / Organisieren",
            shopping: "Einkaufen / Botengänge"
          },
          step4Title: "SCHRITT 4 – ZUGANG & DETAILS",
          accessApartment: "Zugang zur Wohnung",
          accessTypes: {
            inPerson: "Persönlich vor Ort",
            keyAvailable: "Schlüssel vorhanden",
            keyMailbox: "Schlüssel im Briefkasten",
            other: "Sonstiges"
          },
          otherSpecify: "Bitte angeben:",
          pets: "Haustiere",
          specialNotes: "Besondere Hinweise (optional)",
          step5Title: "SCHRITT 5 – UPLOAD & KONTAKT",
          uploadPhotos: "Fotos hochladen",
          uploadHint: "Für eine schnellere & genauere Offerte",
          contactDetails: "Kontaktdaten",
          name: "Name / Vorname",
          email: "E-Mail",
          phone: "Telefon"
        }
      }
    }
  },
  fr: {
    home: {
      services: {
        houseCleaning: {
          title: "Nettoyage et Conciergerie"
        }
      }
    },
    serviceForm: {
      wizard: {
        facilityServices: {
          specialNotes: "Remarques particulières (optionnel)"
        },
        householdHelping: {
          step1Title: "ÉTAPE 1 – NETTOYAGE & FRÉQUENCE",
          supportType: "De quel type de soutien avez-vous besoin ?",
          supportTypes: {
            householdHelp: "Aide ménagère (soutien quotidien / assistance)",
            maintenanceCleaning: "Nettoyage d'entretien (régulier)",
            combination: "Combinaison"
          },
          cleaningFrequency: "Fréquence de nettoyage *",
          frequency: {
            oneTime: "Une fois",
            weekly: "Hebdomadaire",
            twoThreePerWeek: "2–3 fois par semaine",
            everyTwoWeeks: "Toutes les 2 semaines",
            monthly: "Mensuel",
            custom: "Sur mesure"
          },
          preferredStart: "Début souhaité *",
          date: "Date",
          time: "Heure (optionnel)",
          flexibility: "Flexibilité",
          flexibilityTypes: {
            fixed: "Rendez-vous fixe",
            flexible: "Flexible"
          },
          step2Title: "ÉTAPE 2 – PROPRIÉTÉ & MÉNAGE",
          address: "Adresse *",
          zipCity: "NPA / Localité",
          streetNo: "Rue / N°",
          propertyType: "Type de propriété *",
          propertyTypes: {
            apartment: "Appartement",
            house: "Maison",
            sharedRoom: "Chambre en colocation"
          },
          size: "Taille",
          numberOfRooms: "Nombre de pièces",
          areaM2: "Surface (m²)",
          floor: "Étage",
          elevatorAvailable: "Ascenseur disponible",
          yes: "Oui",
          no: "Non",
          step3Title: "ÉTAPE 3 – ÉTENDUE DU NETTOYAGE",
          standardCleaning: "Nettoyage standard",
          standardOptions: {
            vacuuming: "Passer l'aspirateur",
            moppingFloors: "Laver les sols",
            dusting: "Faire la poussière",
            cleaningKitchen: "Nettoyer la cuisine",
            cleaningBathroom: "Nettoyer salle de bain / WC",
            cleaningSurfaces: "Nettoyer les surfaces"
          },
          additionalServices: "Services supplémentaires",
          additionalOptions: {
            windowsInside: "Fenêtres (intérieur)",
            windowsOutside: "Fenêtres (extérieur)",
            blindsShutters: "Stores / volets",
            cleaningRefrigerator: "Nettoyer le réfrigérateur",
            cleaningOven: "Nettoyer le four",
            balconyTerrace: "Balcon / terrasse"
          },
          householdHelpOptional: "Aide ménagère (optionnel)",
          householdHelpOptions: {
            laundry: "Faire la lessive",
            ironing: "Repasser",
            changingBedLinen: "Changer les draps",
            tidyingUp: "Ranger / organiser",
            shopping: "Faire les courses / commissions"
          },
          step4Title: "ÉTAPE 4 – ACCÈS & DÉTAILS",
          accessApartment: "Accès à l'appartement",
          accessTypes: {
            inPerson: "En personne",
            keyAvailable: "Clé disponible",
            keyMailbox: "Clé dans la boîte aux lettres",
            other: "Autre"
          },
          otherSpecify: "Veuillez préciser :",
          pets: "Animaux domestiques",
          specialNotes: "Remarques particulières (optionnel)",
          step5Title: "ÉTAPE 5 – TÉLÉCHARGEMENT & CONTACT",
          uploadPhotos: "Télécharger des photos",
          uploadHint: "Pour un devis plus rapide & plus précis",
          contactDetails: "Coordonnées",
          name: "Nom / Prénom",
          email: "E-mail",
          phone: "Téléphone"
        }
      }
    }
  }
};

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && !Array.isArray(source[key]) && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

locales.forEach(locale => {
  const filePath = path.join(messagesDir, `${locale}.json`);
  let currentTranslations = {};
  if (fs.existsSync(filePath)) {
    currentTranslations = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  
  // Safe merge logic to avoid destroying data
  function mergeSafe(t, s) {
    let result = { ...t };
    for (let key in s) {
      if (s[key] && typeof s[key] === 'object' && !Array.isArray(s[key])) {
        result[key] = mergeSafe(result[key] || {}, s[key]);
      } else {
        result[key] = s[key];
      }
    }
    return result;
  }

  const mergedTranslations = mergeSafe(currentTranslations, newTranslations[locale]);
  fs.writeFileSync(filePath, JSON.stringify(mergedTranslations, null, 2), 'utf8');
  console.log(`Updated translations for ${locale}`);
});
