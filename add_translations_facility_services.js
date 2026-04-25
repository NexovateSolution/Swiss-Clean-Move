const fs = require('fs');
const path = require('path');

const locales = ['en', 'de', 'fr'];
const messagesDir = path.join(__dirname, 'messages');

const newTranslations = {
  en: {
    serviceForm: {
      wizard: {
        facilityServices: {
          step1Title: "Step 1 – Service & Appointment",
          whichService: "Which service do you need? *",
          serviceTypes: {
            maintenanceCleaning: "Maintenance cleaning (regular)",
            propertyMaintenance: "Property maintenance",
            facilityServices: "Facility services",
            constructionCleaning: "Construction cleaning",
            specialCleaning: "Special cleaning",
            gastronomyCleaning: "Gastronomy cleaning (restaurant, kitchen)",
            pharmacyMedical: "Pharmacy & medical practice cleaning (hygiene cleaning)",
            shopRetail: "Shop / retail area cleaning",
            combination: "Combination of multiple services"
          },
          preferredStart: "Preferred start / appointment *",
          date: "Date:",
          time: "Time (optional):",
          frequencyTitle: "Cleaning frequency (important for maintenance cleaning)",
          frequency: {
            oneTime: "One-time",
            daily: "Daily",
            weekly: "Weekly",
            twoThreePerWeek: "2–3 times per week",
            monthly: "Monthly",
            custom: "Custom"
          },
          flexibilityTitle: "Flexibility",
          flexibility: {
            fixed: "Fixed appointment",
            flexible: "Flexible"
          },
          step2Title: "Step 2 – Property & Location",
          zipCity: "ZIP / City:",
          streetNo: "Street / No.:",
          propertyTypeTitle: "Property type *",
          propertyTypes: {
            apartment: "Apartment",
            house: "House",
            office: "Office",
            medicalPractice: "Medical practice",
            pharmacy: "Pharmacy",
            restaurant: "Restaurant / gastronomy",
            shopRetail: "Shop / retail space",
            commercial: "Commercial property",
            constructionSite: "Construction site",
            other: "Other:",
            otherSpecify: "Please specify:"
          },
          area: "Area",
          rooms: "Rooms / spaces (optional)",
          floor: "Floor",
          elevator: "Elevator available",
          yes: "Yes",
          no: "No",
          generalCleaning: {
            title: "General cleaning",
            floors: "Floors (vacuum / mop / machine cleaning)",
            sanitary: "Sanitary (toilet / shower / bathroom)",
            kitchenBreakRoom: "Kitchen / break room",
            windowsInsideOutside: "Windows inside / outside",
            windowFrames: "Window frames",
            blindsShutters: "Blinds / shutters",
            doorsFrames: "Doors & frames",
            wallsCeilings: "Walls / ceilings",
            staircaseEntrance: "Staircase / entrance area",
            elevatorCleaning: "Elevator cleaning",
            basementAtticGarage: "Basement / attic / garage",
            balconyTerrace: "Balcony / terrace"
          },
          maintenanceCleaningSection: {
            title: "Maintenance cleaning (regular)",
            officeCleaning: "Office cleaning",
            practiceCleaning: "Practice cleaning",
            staircaseCleaning: "Staircase cleaning",
            commercialCleaning: "Commercial cleaning",
            wasteDisposal: "Waste disposal",
            refillConsumables: "Refill consumables"
          },
          pharmacyMedicalSection: {
            title: "Pharmacy / medical practice (hygiene)",
            surfaceDisinfection: "Surface disinfection",
            hygieneRegulations: "Hygiene cleaning according to regulations",
            receptionCounter: "Reception / sales counter",
            treatmentRooms: "Treatment rooms",
            floorDisinfection: "Floor disinfection",
            medicalAreas: "Medical areas"
          },
          gastronomySection: {
            title: "Restaurant / gastronomy",
            intensiveKitchen: "Intensive kitchen cleaning",
            appliances: "Appliances (oven, refrigerator, etc.)",
            extractorHoodFilters: "Extractor hood / filters",
            greaseRemoval: "Grease removal",
            diningAreaFloors: "Dining area / floors / tables",
            toilets: "Toilets",
            storageBackRooms: "Storage / back rooms"
          },
          retailSection: {
            title: "Retail areas",
            salesFloor: "Sales floor / floors",
            shopWindows: "Shop windows",
            shelvesDisplays: "Shelves / displays",
            checkoutArea: "Checkout area",
            storageBackRooms: "Storage / back rooms"
          },
          constructionSection: {
            title: "Construction cleaning",
            roughCleaning: "Rough cleaning",
            intermediateCleaning: "Intermediate cleaning",
            finalConstructionCleaning: "Final construction cleaning"
          },
          specialSection: {
            title: "Special cleaning",
            highPressure: "High-pressure cleaning (balcony / terrace)",
            carpetCleaning: "Carpet cleaning",
            hardToReachWindows: "Hard-to-reach windows",
            disinfection: "Disinfection",
            nicotineCleaning: "Nicotine cleaning",
            glassFacade: "Glass / facade cleaning",
            other: "Other:",
            otherSpecify: "Please specify:"
          },
          accessLogistics: {
            title: "Access & Logistics",
            accessProperty: "Access to the property",
            keyInPerson: "Key handover in person",
            keyMailbox: "Key in mailbox",
            propertyManagement: "Handover via property management",
            other: "Other:",
            otherSpecify: "Please specify:",
            parkingAvailable: "Parking available",
            parkingAccess: "Parking / access",
            mustReserve: "Parking must be reserved",
            assistReservation: "Assistance with reservation required",
            noParkingZone: "No-parking zone required",
            restrictedAccess: "Restricted access",
            distance: "Distance parking → entrance"
          },
          upload: {
            title: "Upload (recommended)",
            hint: "Upload photos / videos for a fast & accurate quote"
          },
          contact: {
            title: "Contact details",
            name: "Name / First name:",
            email: "E-mail:",
            phone: "Phone:"
          }
        }
      }
    },
    home: {
      services: {
        facilityServices: {
          title: "Facility Services",
          description: "Comprehensive cleaning solutions for all types of properties and businesses."
        }
      }
    },
    services: {
      features: {
        facilityServices: [
          "Customizable service plans",
          "Professional equipment and staff",
          "Highest hygiene standards",
          "Flexible scheduling"
        ]
      }
    }
  },
  de: {
    serviceForm: {
      wizard: {
        facilityServices: {
          step1Title: "Schritt 1 – Service & Termin",
          whichService: "Welchen Service benötigen Sie? *",
          serviceTypes: {
            maintenanceCleaning: "Unterhaltsreinigung (regelmäßig)",
            propertyMaintenance: "Hauswartung",
            facilityServices: "Facility Services",
            constructionCleaning: "Baureinigung",
            specialCleaning: "Spezialreinigung",
            gastronomyCleaning: "Gastronomiereinigung (Restaurant, Küche)",
            pharmacyMedical: "Apotheken- & Praxisreinigung (Hygienereinigung)",
            shopRetail: "Laden- / Verkaufsflächenreinigung",
            combination: "Kombination mehrerer Services"
          },
          preferredStart: "Gewünschter Beginn / Termin *",
          date: "Datum:",
          time: "Uhrzeit (optional):",
          frequencyTitle: "Reinigungsintervall (wichtig bei Unterhaltsreinigung)",
          frequency: {
            oneTime: "Einmalig",
            daily: "Täglich",
            weekly: "Wöchentlich",
            twoThreePerWeek: "2–3 Mal pro Woche",
            monthly: "Monatlich",
            custom: "Individuell"
          },
          flexibilityTitle: "Flexibilität",
          flexibility: {
            fixed: "Fester Termin",
            flexible: "Flexibel"
          },
          step2Title: "Schritt 2 – Objekt & Standort",
          zipCity: "PLZ / Ort:",
          streetNo: "Strasse / Nr.:",
          propertyTypeTitle: "Objektart *",
          propertyTypes: {
            apartment: "Wohnung",
            house: "Haus",
            office: "Büro",
            medicalPractice: "Arztpraxis",
            pharmacy: "Apotheke",
            restaurant: "Restaurant / Gastronomie",
            shopRetail: "Laden- / Verkaufsfläche",
            commercial: "Gewerbeobjekt",
            constructionSite: "Baustelle",
            other: "Sonstiges:",
            otherSpecify: "Bitte angeben:"
          },
          area: "Fläche",
          rooms: "Zimmer / Räume (optional)",
          floor: "Etage",
          elevator: "Aufzug vorhanden",
          yes: "Ja",
          no: "Nein",
          generalCleaning: {
            title: "Allgemeine Reinigung",
            floors: "Böden (saugen / feucht / maschinell)",
            sanitary: "Sanitär (WC / Dusche / Bad)",
            kitchenBreakRoom: "Küche / Pausenraum",
            windowsInsideOutside: "Fenster innen / außen",
            windowFrames: "Fensterrahmen",
            blindsShutters: "Storen / Rollläden",
            doorsFrames: "Türen & Rahmen",
            wallsCeilings: "Wände / Decken",
            staircaseEntrance: "Treppenhaus / Eingangsbereich",
            elevatorCleaning: "Liftreinigung",
            basementAtticGarage: "Keller / Estrich / Garage",
            balconyTerrace: "Balkon / Terrasse"
          },
          maintenanceCleaningSection: {
            title: "Unterhaltsreinigung (regelmäßig)",
            officeCleaning: "Büroreinigung",
            practiceCleaning: "Praxisreinigung",
            staircaseCleaning: "Treppenhausreinigung",
            commercialCleaning: "Gewerbereinigung",
            wasteDisposal: "Abfallentsorgung",
            refillConsumables: "Verbrauchsmaterial auffüllen"
          },
          pharmacyMedicalSection: {
            title: "Apotheken- / Praxisreinigung (Hygiene)",
            surfaceDisinfection: "Flächendesinfektion",
            hygieneRegulations: "Hygienereinigung nach Vorschrift",
            receptionCounter: "Empfang / Verkaufstheke",
            treatmentRooms: "Behandlungszimmer",
            floorDisinfection: "Bodendesinfektion",
            medicalAreas: "Medizinische Bereiche"
          },
          gastronomySection: {
            title: "Restaurant / Gastronomie",
            intensiveKitchen: "Intensive Küchenreinigung",
            appliances: "Geräte (Ofen, Kühlschrank etc.)",
            extractorHoodFilters: "Dunstabzug / Filter",
            greaseRemoval: "Fettentfernung",
            diningAreaFloors: "Gastraum / Böden / Tische",
            toilets: "Toiletten",
            storageBackRooms: "Lager- / Nebenräume"
          },
          retailSection: {
            title: "Laden- / Verkaufsflächen",
            salesFloor: "Verkaufsfläche / Böden",
            shopWindows: "Schaufenster",
            shelvesDisplays: "Regale / Auslagen",
            checkoutArea: "Kassenbereich",
            storageBackRooms: "Lager- / Nebenräume"
          },
          constructionSection: {
            title: "Baureinigung",
            roughCleaning: "Baugrobreinigung",
            intermediateCleaning: "Bauzwischenreinigung",
            finalConstructionCleaning: "Bauendreinigung"
          },
          specialSection: {
            title: "Spezialreinigung",
            highPressure: "Hochdruckreinigung (Balkon / Terrasse)",
            carpetCleaning: "Teppichreinigung",
            hardToReachWindows: "Schwer zugängliche Fenster",
            disinfection: "Desinfektion",
            nicotineCleaning: "Nikotinreinigung",
            glassFacade: "Glas- / Fassadenreinigung",
            other: "Sonstiges:",
            otherSpecify: "Bitte angeben:"
          },
          accessLogistics: {
            title: "Zugang & Logistik",
            accessProperty: "Zugang zum Objekt",
            keyInPerson: "Schlüsselübergabe persönlich",
            keyMailbox: "Schlüssel im Briefkasten",
            propertyManagement: "Übergabe via Verwaltung",
            other: "Sonstiges:",
            otherSpecify: "Bitte angeben:",
            parkingAvailable: "Parkplatz vorhanden",
            parkingAccess: "Parkplatz / Zufahrt",
            mustReserve: "Parkplatz muss reserviert werden",
            assistReservation: "Hilfe bei Reservierung nötig",
            noParkingZone: "Halteverbotszone erforderlich",
            restrictedAccess: "Erschwerte Zufahrt",
            distance: "Distanz Parkplatz → Eingang"
          },
          upload: {
            title: "Upload (empfohlen)",
            hint: "Laden Sie Fotos / Videos für eine schnelle & genaue Offerte hoch"
          },
          contact: {
            title: "Kontaktdaten",
            name: "Name / Vorname:",
            email: "E-Mail:",
            phone: "Telefon:"
          }
        }
      }
    },
    home: {
      services: {
        facilityServices: {
          title: "Facility Services",
          description: "Umfassende Reinigungslösungen für alle Arten von Immobilien und Unternehmen."
        }
      }
    },
    services: {
      features: {
        facilityServices: [
          "Individuelle Servicepläne",
          "Professionelles Equipment und Personal",
          "Höchste Hygienestandards",
          "Flexible Terminplanung"
        ]
      }
    }
  },
  fr: {
    serviceForm: {
      wizard: {
        facilityServices: {
          step1Title: "Étape 1 – Service & Rendez-vous",
          whichService: "De quel service avez-vous besoin ? *",
          serviceTypes: {
            maintenanceCleaning: "Nettoyage d'entretien (régulier)",
            propertyMaintenance: "Conciergerie",
            facilityServices: "Facility services",
            constructionCleaning: "Nettoyage de fin de chantier",
            specialCleaning: "Nettoyage spécial",
            gastronomyCleaning: "Nettoyage gastronomie (restaurant, cuisine)",
            pharmacyMedical: "Nettoyage cabinets médicaux & pharmacies (hygiène)",
            shopRetail: "Nettoyage de surfaces de vente / magasins",
            combination: "Combinaison de plusieurs services"
          },
          preferredStart: "Début / rendez-vous souhaité *",
          date: "Date :",
          time: "Heure (optionnel) :",
          frequencyTitle: "Fréquence de nettoyage (important pour l'entretien)",
          frequency: {
            oneTime: "Une fois",
            daily: "Quotidien",
            weekly: "Hebdomadaire",
            twoThreePerWeek: "2-3 fois par semaine",
            monthly: "Mensuel",
            custom: "Sur mesure"
          },
          flexibilityTitle: "Flexibilité",
          flexibility: {
            fixed: "Rendez-vous fixe",
            flexible: "Flexible"
          },
          step2Title: "Étape 2 – Propriété & Localisation",
          zipCity: "NPA / Localité :",
          streetNo: "Rue / N° :",
          propertyTypeTitle: "Type de propriété *",
          propertyTypes: {
            apartment: "Appartement",
            house: "Maison",
            office: "Bureau",
            medicalPractice: "Cabinet médical",
            pharmacy: "Pharmacie",
            restaurant: "Restaurant / Gastronomie",
            shopRetail: "Magasin / Surface de vente",
            commercial: "Local commercial",
            constructionSite: "Chantier",
            other: "Autre :",
            otherSpecify: "Veuillez préciser :"
          },
          area: "Surface",
          rooms: "Pièces / Espaces (optionnel)",
          floor: "Étage",
          elevator: "Ascenseur disponible",
          yes: "Oui",
          no: "Non",
          generalCleaning: {
            title: "Nettoyage général",
            floors: "Sols (aspirer / humide / machine)",
            sanitary: "Sanitaires (WC / douche / bain)",
            kitchenBreakRoom: "Cuisine / salle de pause",
            windowsInsideOutside: "Fenêtres intérieur / extérieur",
            windowFrames: "Cadres de fenêtres",
            blindsShutters: "Stores / volets",
            doorsFrames: "Portes & cadres",
            wallsCeilings: "Murs / plafonds",
            staircaseEntrance: "Cage d'escalier / entrée",
            elevatorCleaning: "Nettoyage d'ascenseur",
            basementAtticGarage: "Cave / grenier / garage",
            balconyTerrace: "Balcon / terrasse"
          },
          maintenanceCleaningSection: {
            title: "Nettoyage d'entretien (régulier)",
            officeCleaning: "Nettoyage de bureaux",
            practiceCleaning: "Nettoyage de cabinet",
            staircaseCleaning: "Nettoyage de cage d'escalier",
            commercialCleaning: "Nettoyage commercial",
            wasteDisposal: "Élimination des déchets",
            refillConsumables: "Recharge des consommables"
          },
          pharmacyMedicalSection: {
            title: "Pharmacie / cabinet médical (hygiène)",
            surfaceDisinfection: "Désinfection des surfaces",
            hygieneRegulations: "Nettoyage d'hygiène selon les normes",
            receptionCounter: "Réception / comptoir de vente",
            treatmentRooms: "Salles de traitement",
            floorDisinfection: "Désinfection des sols",
            medicalAreas: "Zones médicales"
          },
          gastronomySection: {
            title: "Restaurant / Gastronomie",
            intensiveKitchen: "Nettoyage intensif de la cuisine",
            appliances: "Appareils (four, réfrigérateur, etc.)",
            extractorHoodFilters: "Hotte / filtres",
            greaseRemoval: "Dégraissage",
            diningAreaFloors: "Salle à manger / sols / tables",
            toilets: "Toilettes",
            storageBackRooms: "Stockage / locaux annexes"
          },
          retailSection: {
            title: "Surfaces de vente",
            salesFloor: "Surface de vente / sols",
            shopWindows: "Vitrines",
            shelvesDisplays: "Étagères / présentoirs",
            checkoutArea: "Zone de caisse",
            storageBackRooms: "Stockage / locaux annexes"
          },
          constructionSection: {
            title: "Nettoyage de fin de chantier",
            roughCleaning: "Nettoyage grossier",
            intermediateCleaning: "Nettoyage intermédiaire",
            finalConstructionCleaning: "Nettoyage final de chantier"
          },
          specialSection: {
            title: "Nettoyage spécial",
            highPressure: "Nettoyage haute pression (balcon / terrasse)",
            carpetCleaning: "Nettoyage de tapis",
            hardToReachWindows: "Fenêtres difficiles d'accès",
            disinfection: "Désinfection",
            nicotineCleaning: "Nettoyage de nicotine",
            glassFacade: "Nettoyage de vitres / façades",
            other: "Autre :",
            otherSpecify: "Veuillez préciser :"
          },
          accessLogistics: {
            title: "Accès & Logistique",
            accessProperty: "Accès à la propriété",
            keyInPerson: "Remise des clés en personne",
            keyMailbox: "Clé dans la boîte aux lettres",
            propertyManagement: "Remise via la gérance",
            other: "Autre :",
            otherSpecify: "Veuillez préciser :",
            parkingAvailable: "Parking disponible",
            parkingAccess: "Parking / accès",
            mustReserve: "Le parking doit être réservé",
            assistReservation: "Aide à la réservation nécessaire",
            noParkingZone: "Zone d'interdiction de stationnement requise",
            restrictedAccess: "Accès restreint",
            distance: "Distance parking → entrée"
          },
          upload: {
            title: "Upload (recommandé)",
            hint: "Téléchargez des photos / vidéos pour un devis rapide & précis"
          },
          contact: {
            title: "Coordonnées",
            name: "Nom / Prénom :",
            email: "E-mail :",
            phone: "Téléphone :"
          }
        }
      }
    },
    home: {
      services: {
        facilityServices: {
          title: "Facility Services",
          description: "Solutions de nettoyage complètes pour tous types de propriétés et entreprises."
        }
      }
    },
    services: {
      features: {
        facilityServices: [
          "Plans de service sur mesure",
          "Équipement et personnel professionnels",
          "Normes d'hygiène les plus élevées",
          "Planification flexible"
        ]
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
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      currentTranslations = JSON.parse(fileContent);
    } catch (err) {
      console.error(`Error reading ${locale}.json:`, err);
    }
  }

  const mergedTranslations = deepMerge(currentTranslations, newTranslations[locale]);

  fs.writeFileSync(filePath, JSON.stringify(mergedTranslations, null, 2), 'utf8');
  console.log(`Updated translations for ${locale}`);
});
