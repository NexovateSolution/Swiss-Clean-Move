const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'messages/en.json');
const dePath = path.join(__dirname, 'messages/de.json');
const frPath = path.join(__dirname, 'messages/fr.json');

const enDict = {
  step1: {
    title: "SERVICE & APPOINTMENT",
    requestType: "What would you like to request? *",
    options: {
      moving: "Moving",
      cleaning: "Move-out cleaning",
      combo: "Moving + cleaning"
    },
    preferredDateTitle: "Preferred date *",
    date: "Date",
    time: "Time (optional)",
    flexible: "I am flexible",
    express: "Express request (short notice)"
  },
  step2: {
    title: "JOB DETAILS",
    sharedPropertyDesc: "SHARED PROPERTY DETAILS (ALWAYS SHOWN ONCE)",
    propertyType: "Property type",
    types: {
      apartment: "Apartment",
      house: "House",
      studio: "Studio",
      wgRoom: "Shared room (WG room)",
      office: "Office",
      commercial: "Commercial"
    },
    rooms: "Number of rooms *",
    livingArea: "Living area (m²)",
    floor: "Floor",
    floors: {
      "ground": "Ground floor",
      "f1_2": "1–2",
      "f3_4": "3–4",
      "f5_6": "5–6",
      "f7plus": "7+"
    },
    elevator: "Elevator available",
    yes: "Yes",
    no: "No",
    parkingTitle: "Parking",
    available: "Available",
    distance: "Distance",
    distances: {
      direct: "Directly in front",
      d0_20: "0–20 m",
      d20_50: "20–50 m",
      d50plus: "More than 50 m"
    }
  },
  moving: {
    title: "MOVING",
    fromTitle: "Move-out address (FROM)",
    toTitle: "Move-in address (TO)",
    streetNo: "Street / No.",
    zipCity: "ZIP / City *",
    accessParkingTitle: "Access & Parking",
    specialConditions: "Special conditions",
    conditions: {
      narrowStairs: "Narrow stairs",
      noElevator: "No usable elevator",
      longDistances: "Long carrying distances",
      limitedAccess: "Limited access"
    },
    volumeTitle: "Moving volume",
    volumes: {
      small: "Small (studio / few items)",
      medium: "Medium (normal apartment)",
      large: "Large (house / many items)"
    },
    inventoryTitle: "Inventory & details (optional)",
    boxesTitle: "Boxes",
    boxes: {
      "b0_20": "0–20",
      "b20_50": "20–50",
      "b50_100": "50–100",
      "b100plus": "100+"
    },
    furnitureTitle: "Furniture / appliances",
    furniture: {
      sofa: "Sofa",
      bed: "Bed",
      wardrobe: "Wardrobe",
      tableChairs: "Table / chairs",
      tv: "TV",
      washingMachine: "Washing machine",
      refrigerator: "Refrigerator"
    },
    specialItemsTitle: "Special items",
    specialItems: {
      piano: "Piano",
      safe: "Safe",
      aquarium: "Aquarium",
      fitness: "Fitness equipment",
      fragile: "Fragile furniture"
    },
    servicesTitle: "Additional moving services",
    services: {
      assembly: "Furniture disassembly / assembly",
      packingService: "Packing service",
      packingMaterials: "Supply packing materials",
      disposal: "Disposal / clearance",
      storage: "Temporary storage",
      cleaningRequested: "Move-out cleaning requested"
    }
  },
  cleaning: {
    title: "MOVE-OUT CLEANING / END CLEANING",
    addressTitle: "Address",
    addressHintCombo: "(If Moving + Cleaning: using Move-out (FROM) address automatically)",
    sanitaryTitle: "Sanitary",
    bathrooms: "Bathrooms",
    toilets: "Toilets",
    kitchenTitle: "Kitchen",
    available: "Available",
    kitchenState: {
      normal: "Normal",
      heavilySoiled: "Heavily soiled"
    },
    windowsTitle: "Windows & Glass Areas",
    windowsCount: "Number of windows",
    windowTypes: "Types",
    types: {
      standard: "Standard",
      floorToCeiling: "Floor-to-ceiling",
      roof: "Roof windows"
    },
    balconyDoorsTitle: "Balcony doors",
    balconyDoors: {
      "d0": "0", "d1_2": "1–2", "d3_5": "3–5", "d5plus": "5+"
    },
    specialGlass: "Special glass surfaces (optional)",
    specialGlassTypes: {
      sliding: "Sliding windows",
      glassFront: "Glass front",
      winterGarden: "Winter garden"
    },
    conditionTitle: "Condition",
    conditions: {
      normal: "Normal",
      heavilySoiled: "Heavily soiled",
      nicotine: "Nicotine residue",
      afterRenovation: "After renovation"
    },
    petsTitle: "Pets",
    additionalAreasTitle: "Additional areas",
    areas: {
      balcony: "Balcony",
      basement: "Basement",
      garage: "Garage",
      attic: "Attic"
    }
  },
  access: {
    title: "ACCESS (CLEANING ONLY)",
    keyTitle: "Access",
    keys: {
      personal: "Personal",
      mailbox: "Key in mailbox",
      keySafe: "Key safe",
      caretaker: "Property manager / caretaker",
      undecided: "Not decided"
    },
    independentAccess: "Independent access possible",
    independent: {
      yes: "Yes",
      no: "No",
      undecided: "Not decided"
    },
    handoverTitle: "Handover",
    handoverDate: "Handover date *",
    options: {
      inspection: "Inspection with property management",
      guarantee: "Handover guarantee"
    }
  },
  upload: {
    title: "UPLOAD (RECOMMENDED)",
    uploadTitle: "Upload photos / videos",
    hint1: "Photos help us assess your request faster and more accurately.",
    hint2: "Uploading photos increases quote accuracy and response speed."
  },
  contact: {
    title: "CONTACT",
    detailsTitle: "Contact details",
    nameCompany: "Name / Company *",
    phone: "Phone *",
    email: "Email *",
    methodTitle: "Preferred contact method",
    methods: {
      phone: "Phone",
      whatsapp: "WhatsApp",
      email: "Email"
    },
    notes: "Notes (optional)",
    privacy: "DATA PROTECTION",
    acceptPrivacy: "I accept the privacy policy",
    button: "Request a quote",
    confirmationTitle: "CONFIRMATION",
    thankYou: "Thank you for your request.",
    reviewing: "Our team will review your details and get back to you shortly with a suitable offer."
  }
};

const deDict = {
  step1: {
    title: "DIENSTLEISTUNG & TERMIN",
    requestType: "Was möchten Sie anfragen? *",
    options: {
      moving: "Umzug",
      cleaning: "Umzugsreinigung",
      combo: "Umzug + Reinigung"
    },
    preferredDateTitle: "Gewünschter Termin *",
    date: "Datum",
    time: "Uhrzeit (optional)",
    flexible: "Ich bin flexibel",
    express: "Express-Anfrage (kurzfristig)"
  },
  step2: {
    title: "ANGABEN ZUM AUFTRAG",
    sharedPropertyDesc: "OBJEKTANGABEN (NUR EINMAL ANZEIGEN)",
    propertyType: "Objektart",
    types: {
      apartment: "Wohnung",
      house: "Haus",
      studio: "Studio",
      wgRoom: "WG-Zimmer",
      office: "Büro",
      commercial: "Gewerbe"
    },
    rooms: "Anzahl Zimmer *",
    livingArea: "Wohnfläche (m²)",
    floor: "Etage",
    floors: {
      "ground": "EG",
      "f1_2": "1–2",
      "f3_4": "3–4",
      "f5_6": "5–6",
      "f7plus": "7+"
    },
    elevator: "Lift vorhanden",
    yes: "Ja",
    no: "Nein",
    parkingTitle: "Parkplatz",
    available: "Vorhanden",
    distance: "Distanz",
    distances: {
      direct: "Direkt vor dem Gebäude",
      d0_20: "0–20 m",
      d20_50: "20–50 m",
      d50plus: "Mehr als 50 m"
    }
  },
  moving: {
    title: "UMZUG",
    fromTitle: "Auszugsadresse (VON)",
    toTitle: "Einzugsadresse (NACH)",
    streetNo: "Strasse / Nr.",
    zipCity: "PLZ / Ort *",
    accessParkingTitle: "Zugang & Parkplatz",
    specialConditions: "Besonderheiten",
    conditions: {
      narrowStairs: "Enge Treppen",
      noElevator: "Kein nutzbarer Lift",
      longDistances: "Lange Tragewege",
      limitedAccess: "Zufahrt eingeschränkt"
    },
    volumeTitle: "Umzugsvolumen",
    volumes: {
      small: "Klein (Studio / wenig Möbel)",
      medium: "Mittel (normale Wohnung)",
      large: "Gross (Haus / viel Inventar)"
    },
    inventoryTitle: "Inventar & Angaben (optional)",
    boxesTitle: "Kartons",
    boxes: {
      "b0_20": "0–20",
      "b20_50": "20–50",
      "b50_100": "50–100",
      "b100plus": "100+"
    },
    furnitureTitle: "Möbel / Geräte",
    furniture: {
      sofa: "Sofa",
      bed: "Bett",
      wardrobe: "Kleiderschrank",
      tableChairs: "Tisch / Stühle",
      tv: "TV",
      washingMachine: "Waschmaschine",
      refrigerator: "Kühlschrank"
    },
    specialItemsTitle: "Spezialgegenstände",
    specialItems: {
      piano: "Klavier",
      safe: "Safe / Tresor",
      aquarium: "Aquarium",
      fitness: "Fitnessgeräte",
      fragile: "Empfindliche Möbel"
    },
    servicesTitle: "Zusatzleistungen",
    services: {
      assembly: "Möbel Demontage / Montage",
      packingService: "Verpackungsservice",
      packingMaterials: "Verpackungsmaterial liefern",
      disposal: "Entsorgung / Räumung",
      storage: "Zwischenlagerung",
      cleaningRequested: "Umzugsreinigung gewünscht"
    }
  },
  cleaning: {
    title: "UMZUGSREINIGUNG / ENDREINIGUNG",
    addressTitle: "Adresse",
    addressHintCombo: "(Bei «Umzug + Reinigung»: automatisch VON-Adresse verwenden)",
    sanitaryTitle: "Sanitär",
    bathrooms: "Badezimmer",
    toilets: "WC",
    kitchenTitle: "Küche",
    available: "Vorhanden",
    kitchenState: {
      normal: "Normal",
      heavilySoiled: "Stark verschmutzt"
    },
    windowsTitle: "Fenster & Glasflächen",
    windowsCount: "Anzahl Fenster",
    windowTypes: "Typ",
    types: {
      standard: "Standard",
      floorToCeiling: "Bodentief",
      roof: "Dachfenster"
    },
    balconyDoorsTitle: "Balkontüren",
    balconyDoors: {
      "d0": "0", "d1_2": "1–2", "d3_5": "3–5", "d5plus": "5+"
    },
    specialGlass: "Spezielle Glasflächen (optional)",
    specialGlassTypes: {
      sliding: "Schiebefenster",
      glassFront: "Glasfront",
      winterGarden: "Wintergarten"
    },
    conditionTitle: "Zustand",
    conditions: {
      normal: "Normal",
      heavilySoiled: "Stark verschmutzt",
      nicotine: "Nikotinbelastung",
      afterRenovation: "Nach Renovation"
    },
    petsTitle: "Haustiere",
    additionalAreasTitle: "Zusatzbereiche",
    areas: {
      balcony: "Balkon",
      basement: "Keller",
      garage: "Garage",
      attic: "Estrich"
    }
  },
  access: {
    title: "ZUGANG (NUR FÜR REINIGUNG)",
    keyTitle: "Zugang",
    keys: {
      personal: "Persönlich",
      mailbox: "Schlüssel im Briefkasten",
      keySafe: "Schlüsselsafe",
      caretaker: "Verwaltung / Hauswart",
      undecided: "Noch offen"
    },
    independentAccess: "Selbstständiger Zugang möglich",
    independent: {
      yes: "Ja",
      no: "Nein",
      undecided: "Noch offen"
    },
    handoverTitle: "Abgabe",
    handoverDate: "Abgabetermin *",
    options: {
      inspection: "Abnahme mit Verwaltung",
      guarantee: "Abnahmegarantie"
    }
  },
  upload: {
    title: "UPLOAD (EMPFOHLEN)",
    uploadTitle: "Fotos / Videos hochladen",
    hint1: "Fotos helfen uns, Ihre Anfrage schneller und genauer zu beurteilen.",
    hint2: "Fotos erhöhen die Genauigkeit und beschleunigen die Offerte."
  },
  contact: {
    title: "KONTAKT",
    detailsTitle: "Kontaktdaten",
    nameCompany: "Name / Firma *",
    phone: "Telefon *",
    email: "E-Mail *",
    methodTitle: "Kontaktwunsch",
    methods: {
      phone: "Telefon",
      whatsapp: "WhatsApp",
      email: "E-Mail"
    },
    notes: "Bemerkungen (optional)",
    privacy: "DATENSCHUTZ",
    acceptPrivacy: "Ich akzeptiere die Datenschutzbestimmungen",
    button: "Kostenlose Offerte anfordern",
    confirmationTitle: "BESTÄTIGUNG",
    thankYou: "Vielen Dank für Ihre Anfrage.",
    reviewing: "Unser Team prüft Ihre Angaben und meldet sich in Kürze mit einer passenden Offerte."
  }
};

const frDict = {
  step1: {
    title: "SERVICE ET RENDEZ-VOUS",
    requestType: "Que souhaitez-vous demander ? *",
    options: {
      moving: "Déménagement",
      cleaning: "Nettoyage de fin de bail",
      combo: "Déménagement + Nettoyage"
    },
    preferredDateTitle: "Date souhaitée *",
    date: "Date",
    time: "Heure (facultatif)",
    flexible: "Je suis flexible",
    express: "Demande express (à court terme)"
  },
  step2: {
    title: "DÉTAILS DE LA PROPRIÉTÉ",
    sharedPropertyDesc: "DÉTAILS DE LA PROPRIÉTÉ (AFFICHER UNE SEULE FOIS)",
    propertyType: "Type de bien",
    types: {
      apartment: "Appartement",
      house: "Maison",
      studio: "Studio",
      wgRoom: "Chambre en colocation",
      office: "Bureau",
      commercial: "Commerce"
    },
    rooms: "Nombre de pièces *",
    livingArea: "Surface habitable (m²)",
    floor: "Étage",
    floors: {
      "ground": "Rez-de-chaussée",
      "f1_2": "1–2",
      "f3_4": "3–4",
      "f5_6": "5–6",
      "f7plus": "7+"
    },
    elevator: "Ascenseur disponible",
    yes: "Oui",
    no: "Non",
    parkingTitle: "Parking",
    available: "Disponible",
    distance: "Distance",
    distances: {
      direct: "Directement devant le bâtiment",
      d0_20: "0–20 m",
      d20_50: "20–50 m",
      d50plus: "Plus de 50 m"
    }
  },
  moving: {
    title: "DÉMÉNAGEMENT",
    fromTitle: "Adresse de départ (DE)",
    toTitle: "Adresse d'arrivée (À)",
    streetNo: "Rue / No",
    zipCity: "NPA / Localité *",
    accessParkingTitle: "Accès & Parking",
    specialConditions: "Conditions spéciales",
    conditions: {
      narrowStairs: "Escaliers étroits",
      noElevator: "Pas d'ascenseur utilisable",
      longDistances: "Longues distances de portage",
      limitedAccess: "Accès limité"
    },
    volumeTitle: "Volume du déménagement",
    volumes: {
      small: "Petit (studio / peu de meubles)",
      medium: "Moyen (appartement normal)",
      large: "Grand (maison / beaucoup d'articles)"
    },
    inventoryTitle: "Inventaire et détails (facultatif)",
    boxesTitle: "Cartons",
    boxes: {
      "b0_20": "0–20",
      "b20_50": "20–50",
      "b50_100": "50–100",
      "b100plus": "100+"
    },
    furnitureTitle: "Meubles / appareils",
    furniture: {
      sofa: "Canapé",
      bed: "Lit",
      wardrobe: "Armoire",
      tableChairs: "Table / chaises",
      tv: "TV",
      washingMachine: "Lave-linge",
      refrigerator: "Réfrigérateur"
    },
    specialItemsTitle: "Objets spéciaux",
    specialItems: {
      piano: "Piano",
      safe: "Coffre-fort",
      aquarium: "Aquarium",
      fitness: "Appareils de fitness",
      fragile: "Meubles fragiles"
    },
    servicesTitle: "Services supplémentaires",
    services: {
      assembly: "Démontage / montage de meubles",
      packingService: "Service d'emballage",
      packingMaterials: "Fournir des matériaux d'emballage",
      disposal: "Élimination / débarras",
      storage: "Stockage temporaire",
      cleaningRequested: "Nettoyage de remise demandé"
    }
  },
  cleaning: {
    title: "NETTOYAGE DE FIN DE BAIL",
    addressTitle: "Adresse",
    addressHintCombo: "(Si Déménagement + Nettoyage : utilise automatiquement l'adresse de départ)",
    sanitaryTitle: "Sanitaires",
    bathrooms: "Salles de bain",
    toilets: "Toilettes",
    kitchenTitle: "Cuisine",
    available: "Disponible",
    kitchenState: {
      normal: "Normale",
      heavilySoiled: "Très sale"
    },
    windowsTitle: "Fenêtres & surfaces vitrées",
    windowsCount: "Nombre de fenêtres",
    windowTypes: "Type",
    types: {
      standard: "Standard",
      floorToCeiling: "Du sol au plafond",
      roof: "Fenêtres de toit"
    },
    balconyDoorsTitle: "Portes de balcon",
    balconyDoors: {
      "d0": "0", "d1_2": "1–2", "d3_5": "3–5", "d5plus": "5+"
    },
    specialGlass: "Surfaces vitrées spéciales (facultatif)",
    specialGlassTypes: {
      sliding: "Fenêtres coulissantes",
      glassFront: "Façade en verre",
      winterGarden: "Jardin d'hiver"
    },
    conditionTitle: "État",
    conditions: {
      normal: "Normal",
      heavilySoiled: "Très sale",
      nicotine: "Résidus de nicotine",
      afterRenovation: "Après rénovation"
    },
    petsTitle: "Animaux de compagnie",
    additionalAreasTitle: "Zones supplémentaires",
    areas: {
      balcony: "Balcon",
      basement: "Cave",
      garage: "Garage",
      attic: "Grenier"
    }
  },
  access: {
    title: "ACCÈS (NETTOYAGE UNIQUEMENT)",
    keyTitle: "Accès",
    keys: {
      personal: "Personnel",
      mailbox: "Clé dans la boîte aux lettres",
      keySafe: "Boîte à clés",
      caretaker: "Régie / Concierge",
      undecided: "Pas encore décidé"
    },
    independentAccess: "Accès indépendant possible",
    independent: {
      yes: "Oui",
      no: "Non",
      undecided: "Pas encore décidé"
    },
    handoverTitle: "Remise",
    handoverDate: "Date de remise *",
    options: {
      inspection: "Inspection avec la gérance",
      guarantee: "Garantie de remise"
    }
  },
  upload: {
    title: "TÉLÉCHARGER (RECOMMANDÉ)",
    uploadTitle: "Téléchargez des photos / vidéos",
    hint1: "Les photos nous aident à évaluer votre demande plus rapidement et avec plus de précision.",
    hint2: "Télécharger des photos augmente la précision de votre devis et accélère le processus."
  },
  contact: {
    title: "CONTACT",
    detailsTitle: "Détails de contact",
    nameCompany: "Nom / Entreprise *",
    phone: "Téléphone *",
    email: "Email *",
    methodTitle: "Méthode de contact préférée",
    methods: {
      phone: "Téléphone",
      whatsapp: "WhatsApp",
      email: "Email"
    },
    notes: "Remarques (facultatif)",
    privacy: "PROTECTION DES DONNÉES",
    acceptPrivacy: "J'accepte la politique de confidentialité",
    button: "Demander un devis gratuit",
    confirmationTitle: "CONFIRMATION",
    thankYou: "Merci pour votre demande.",
    reviewing: "Notre équipe va examiner vos détails et vous recontactera rapidement avec une offre adaptée."
  }
};

function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

function updateFile(file, dict) {
  let content = fs.readFileSync(file, 'utf8');
  let json = JSON.parse(content);
  // inject into wizard.unified
  if (!json.serviceForm) json.serviceForm = {};
  if (!json.serviceForm.wizard) json.serviceForm.wizard = {};
  
  if (json.serviceForm.wizard.unified) {
     json.serviceForm.wizard.unified = deepMerge(json.serviceForm.wizard.unified, dict);
  } else {
     json.serviceForm.wizard.unified = dict;
  }
  
  fs.writeFileSync(file, JSON.stringify(json, null, 2));
  console.log(`Updated ${file}`);
}

updateFile(enPath, enDict);
updateFile(dePath, deDict);
updateFile(frPath, frDict);
