const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fr', 'it'];
const messagesDir = path.join(__dirname, '../messages');

const translations = {
  de: {
    "universalForm": {
      "title": "Offertanfrage",
      "subtitle": "Kostenlos & unverbindlich",
      "steps": {
        "customer": "Kundendaten",
        "services": "Dienstleistungen",
        "property": "Objekt & Einsatzort",
        "dateContact": "Termin & Kontakt",
        "cleaning": "Reinigung",
        "moving": "Umzug / Transport / Entsorgung",
        "review": "Prüfen & absenden"
      },
      "customer": {
        "firstName": "Vorname / Nachname *",
        "company": "Firma (optional)",
        "email": "E-Mail *",
        "phone": "Telefon / Mobile *"
      },
      "services": {
        "movingOutCleaning": "Umzugs-/Endreinigung",
        "maintenanceCleaning": "Unterhalts-/Haushaltsreinigung",
        "officeCleaning": "Büro-/Praxisreinigung",
        "restaurantCleaning": "Gastronomiereinigung",
        "windowCleaning": "Fenster-/Storenreinigung",
        "constructionCleaning": "Bau-/Grundreinigung",
        "caretaking": "Hauswartung",
        "movingTransport": "Umzug & Transport",
        "packingService": "Ein-/Auspackservice",
        "furnitureAssembly": "Möbelmontage/-demontage",
        "disposalClearance": "Entsorgung & Räumung",
        "highPressureCleaning": "Hochdruckreinigung",
        "stairwellCleaning": "Treppenhausreinigung",
        "specialistCleaning": "Spezialreinigung",
        "otherService": "Andere Dienstleistung"
      },
      "property": {
        "streetNo": "Strasse / Nr. *",
        "postcodeCity": "PLZ / Ort *",
        "type": "Objektart",
        "types": {
          "apartment": "Wohnung",
          "house": "Haus",
          "office": "Büro",
          "commercial": "Gewerbe",
          "restaurant": "Gastronomie",
          "other": "Andere"
        },
        "rooms": "Zimmer",
        "area": "Wohn-/Nutzfläche (m²)",
        "floor": "Etage",
        "lift": "Lift (Ja/Nein)",
        "parking": "Parkplatz/Zufahrt"
      },
      "dateContact": {
        "preferredDate": "Gewünschtes Datum",
        "timeWindow": "Uhrzeit / Zeitraum",
        "handover": "Wohnungs-/Objektabgabe",
        "preferredContact": "Bevorzugte Kontaktart",
        "contactOptions": {
          "phone": "Telefon",
          "email": "E-Mail",
          "whatsapp": "WhatsApp"
        },
        "photosVia": "Fotos / Pläne werden gesendet per",
        "photosOptions": {
          "email": "E-Mail",
          "whatsapp": "WhatsApp",
          "none": "Keine"
        }
      },
      "cleaning": {
        "type": "Reinigungsart (Mehrfachauswahl möglich)",
        "frequency": "Turnus für wiederkehrende Einsätze",
        "frequencies": {
          "daily": "Täglich",
          "weekly": "1x/Woche",
          "twiceWeekly": "2x/Woche",
          "threeWeekly": "3x/Woche",
          "fiveWeekly": "5x/Woche",
          "monthly": "Monatlich",
          "other": "Andere"
        },
        "areas": "Räume / Bereiche, die gereinigt werden sollen",
        "windows": "Fenster – Anzahl und Ausführung",
        "windowTypes": {
          "standard": "Fenster (Standard)",
          "floorToCeiling": "Bodentiefe Fenster",
          "roof": "Dachfenster",
          "glassDoors": "Glas-/Balkontüren"
        },
        "blinds": "Storen / Sonnenschutz – Art und Anzahl",
        "blindTypes": {
          "venetian": "Lamellenstoren",
          "roller": "Rollläden",
          "shutters": "Fensterläden",
          "awnings": "Markisen"
        },
        "sanitary": "Sanitär – Anzahl",
        "sanitaryTypes": {
          "toilets": "Toiletten (WC)",
          "bathtubs": "Badewannen",
          "showers": "Duschen",
          "washbasins": "Lavabos",
          "kitchens": "Küchen"
        },
        "floors": "Bodenarten",
        "floorTypes": {
          "parquet": "Parkett",
          "laminate": "Laminat",
          "tiles": "Platten",
          "carpet": "Teppich",
          "pvc": "PVC/Vinyl",
          "naturalStone": "Naturstein"
        },
        "vacuumCarpetOnly": "Teppich nur staubsaugen",
        "deepCarpetCleaning": "Teppich-Tiefenreinigung",
        "balconyCleaning": "Balkon-/Terrassenreinigung",
        "balconyArea": "Fläche Balkon/Terrasse (m²)",
        "highPressure": "Hochdruckreinigung",
        "repairWallHoles": "Wandlöcher ausbessern",
        "holesCount": "Anzahl Löcher",
        "condition": "Zustand & Besonderheiten",
        "conditions": {
          "empty": "Objekt leer",
          "furnished": "Möbliert",
          "petHair": "Tierhaare",
          "nicotine": "Nikotin",
          "heavilySoiled": "Stark verschmutzt",
          "mould": "Schimmel/Feuchtigkeit"
        },
        "additionalDetails": "Weitere Angaben (Zugang, Schlüssel, besondere Verschmutzungen oder Wünsche)"
      },
      "moving": {
        "collectionAddress": "Startadresse (Strasse, PLZ, Ort)",
        "deliveryAddress": "Zieladresse (Strasse, PLZ, Ort)",
        "floorCollection": "Etage Start",
        "liftCollection": "Lift Start",
        "distanceCollection": "Tragweg Start (m)",
        "floorDelivery": "Etage Ziel",
        "liftDelivery": "Lift Ziel",
        "distanceDelivery": "Tragweg Ziel (m)",
        "scope": "Umfang & gewünschte Leistungen",
        "scopes": {
          "transport": "Transport",
          "packing": "Einpackservice",
          "unpacking": "Auspackservice",
          "dismantling": "Demontage",
          "assembly": "Montage",
          "boxes": "Umzugskartons",
          "disposal": "Entsorgung",
          "clearance": "Räumung",
          "storage": "Zwischenlagerung"
        },
        "inventory": "Inventar – ungefähre Anzahl",
        "inventories": {
          "boxes": "Kartons",
          "wardrobes": "Schränke",
          "beds": "Betten",
          "sofas": "Sofas",
          "tables": "Tische",
          "chairs": "Stühle",
          "dressers": "Kommoden",
          "largeAppliances": "Grossgeräte"
        },
        "additionalInventory": "Weitere Möbel / Inventarliste",
        "specialItems": "Spezialgut, Entsorgung & Organisation",
        "specialItemTypes": {
          "piano": "Klavier/Flügel",
          "safe": "Tresor",
          "aquarium": "Aquarium",
          "antiques": "Kunst/Antiquitäten",
          "heavy": "Gegenstand über 100 kg",
          "none": "Kein Spezialgut"
        },
        "specialItemsDetails": "Spezialgut / Entsorgung - Details, Gewicht und Masse",
        "noParkingCollection": "Halteverbotszone am Start nötig",
        "noParkingDelivery": "Halteverbotszone am Ziel nötig",
        "preferredDate": "Gewünschtes Umzugsdatum",
        "dateFlexible": "Datum flexibel?",
        "staffCount": "Gewünschte Anzahl Mitarbeitende"
      },
      "review": {
        "consent": "Ich bestätige, dass meine Angaben zur Bearbeitung dieser unverbindlichen Anfrage verwendet werden dürfen.",
        "placeDate": "Ort / Datum",
        "signature": "Unterschrift (bei Ausdruck)",
        "note": "Hinweis: Die definitive Offerte wird nach Prüfung der Angaben und gegebenenfalls der Fotos erstellt.",
        "back": "Zurück",
        "next": "Weiter",
        "submit": "Formular absenden",
        "submitting": "Wird gesendet..."
      }
    }
  },
  en: {
    "universalForm": {
      "title": "Quote Request",
      "subtitle": "Free & non-binding",
      "steps": {
        "customer": "Customer Details",
        "services": "Services",
        "property": "Property & Location",
        "dateContact": "Schedule & Contact",
        "cleaning": "Cleaning",
        "moving": "Moving / Transport / Disposal",
        "review": "Review & Submit"
      },
      "customer": {
        "firstName": "First name / Last name *",
        "company": "Company (optional)",
        "email": "Email *",
        "phone": "Telephone / Mobile *"
      },
      "services": {
        "movingOutCleaning": "Moving / end-of-tenancy cleaning",
        "maintenanceCleaning": "Maintenance / household cleaning",
        "officeCleaning": "Office / medical practice cleaning",
        "restaurantCleaning": "Restaurant cleaning",
        "windowCleaning": "Window / blind cleaning",
        "constructionCleaning": "Construction / deep cleaning",
        "caretaking": "Caretaking / property maintenance",
        "movingTransport": "Moving & transport",
        "packingService": "Packing / unpacking service",
        "furnitureAssembly": "Furniture assembly / dismantling",
        "disposalClearance": "Disposal & clearance",
        "highPressureCleaning": "High-pressure cleaning",
        "stairwellCleaning": "Stairwell cleaning",
        "specialistCleaning": "Specialist cleaning",
        "otherService": "Other service"
      },
      "property": {
        "streetNo": "Street / No. *",
        "postcodeCity": "Postcode / City *",
        "type": "Property type",
        "types": {
          "apartment": "Apartment",
          "house": "House",
          "office": "Office",
          "commercial": "Commercial",
          "restaurant": "Restaurant",
          "other": "Other"
        },
        "rooms": "Rooms",
        "area": "Living / usable area (m²)",
        "floor": "Floor",
        "lift": "Lift (Yes/No)",
        "parking": "Parking / access"
      },
      "dateContact": {
        "preferredDate": "Preferred date",
        "timeWindow": "Time / time window",
        "handover": "Property handover",
        "preferredContact": "Preferred contact method",
        "contactOptions": {
          "phone": "Telephone",
          "email": "Email",
          "whatsapp": "WhatsApp"
        },
        "photosVia": "Photos / plans will be sent by",
        "photosOptions": {
          "email": "Email",
          "whatsapp": "WhatsApp",
          "none": "None"
        }
      },
      "cleaning": {
        "type": "Type of cleaning (multiple selections possible)",
        "frequency": "Recurring service frequency",
        "frequencies": {
          "daily": "Daily",
          "weekly": "Weekly",
          "twiceWeekly": "2x weekly",
          "threeWeekly": "3x weekly",
          "fiveWeekly": "5x weekly",
          "monthly": "Monthly",
          "other": "Other"
        },
        "areas": "Rooms / areas to be cleaned",
        "windows": "Windows - quantity and type",
        "windowTypes": {
          "standard": "Standard windows",
          "floorToCeiling": "Floor-to-ceiling windows",
          "roof": "Roof windows",
          "glassDoors": "Glass / balcony doors"
        },
        "blinds": "Blinds / sun protection - type and quantity",
        "blindTypes": {
          "venetian": "Venetian blinds",
          "roller": "Roller shutters",
          "shutters": "Window shutters",
          "awnings": "Awnings"
        },
        "sanitary": "Sanitary facilities - quantity",
        "sanitaryTypes": {
          "toilets": "Toilets",
          "bathtubs": "Bathtubs",
          "showers": "Showers",
          "washbasins": "Washbasins",
          "kitchens": "Kitchens"
        },
        "floors": "Floor types",
        "floorTypes": {
          "parquet": "Parquet",
          "laminate": "Laminate",
          "tiles": "Tiles",
          "carpet": "Carpet",
          "pvc": "PVC/Vinyl",
          "naturalStone": "Natural stone"
        },
        "vacuumCarpetOnly": "Vacuum carpet only",
        "deepCarpetCleaning": "Deep carpet cleaning",
        "balconyCleaning": "Balcony / terrace cleaning",
        "balconyArea": "Balcony / terrace area (m²)",
        "highPressure": "High-pressure cleaning",
        "repairWallHoles": "Repair wall holes",
        "holesCount": "Number of holes",
        "condition": "Condition & special requirements",
        "conditions": {
          "empty": "Property empty",
          "furnished": "Furnished",
          "petHair": "Pet hair",
          "nicotine": "Nicotine",
          "heavilySoiled": "Heavily soiled",
          "mould": "Mould / moisture"
        },
        "additionalDetails": "Additional details (access, keys, special dirt or requests)"
      },
      "moving": {
        "collectionAddress": "Collection address (street, postcode, city)",
        "deliveryAddress": "Delivery address (street, postcode, city)",
        "floorCollection": "Floor - collection",
        "liftCollection": "Lift - collection",
        "distanceCollection": "Carry distance start (m)",
        "floorDelivery": "Floor - delivery",
        "liftDelivery": "Lift - delivery",
        "distanceDelivery": "Carry distance end (m)",
        "scope": "Scope & requested services",
        "scopes": {
          "transport": "Transport",
          "packing": "Packing service",
          "unpacking": "Unpacking service",
          "dismantling": "Dismantling",
          "assembly": "Assembly",
          "boxes": "Moving boxes",
          "disposal": "Disposal",
          "clearance": "Clearance",
          "storage": "Temporary storage"
        },
        "inventory": "Inventory - approximate quantity",
        "inventories": {
          "boxes": "Boxes",
          "wardrobes": "Wardrobes",
          "beds": "Beds",
          "sofas": "Sofas",
          "tables": "Tables",
          "chairs": "Chairs",
          "dressers": "Dressers",
          "largeAppliances": "Large appliances"
        },
        "additionalInventory": "Additional furniture / inventory list",
        "specialItems": "Special items, disposal & organisation",
        "specialItemTypes": {
          "piano": "Piano / grand piano",
          "safe": "Safe",
          "aquarium": "Aquarium",
          "antiques": "Art / antiques",
          "heavy": "Item over 100 kg",
          "none": "No special items"
        },
        "specialItemsDetails": "Special items / disposal - details, weight and dimensions",
        "noParkingCollection": "No-parking zone required at collection",
        "noParkingDelivery": "No-parking zone required at delivery",
        "preferredDate": "Preferred moving date",
        "dateFlexible": "Date flexible?",
        "staffCount": "Preferred number of staff"
      },
      "review": {
        "consent": "I agree that my information may be used to process this non-binding request.",
        "placeDate": "Place / Date",
        "signature": "Signature (for printed form)",
        "note": "Note: The final quote will be prepared after reviewing the information and, where necessary, the photos.",
        "back": "Back",
        "next": "Next",
        "submit": "Submit Request",
        "submitting": "Submitting..."
      }
    }
  },
  fr: {
    "universalForm": {
      "title": "Demande de Devis",
      "subtitle": "Gratuit & sans engagement",
      "steps": {
        "customer": "Détails du Client",
        "services": "Services",
        "property": "Lieu & Propriété",
        "dateContact": "Date & Contact",
        "cleaning": "Nettoyage",
        "moving": "Déménagement / Transport",
        "review": "Vérifier & Envoyer"
      },
      "customer": {
        "firstName": "Prénom / Nom *",
        "company": "Entreprise (optionnel)",
        "email": "E-mail *",
        "phone": "Téléphone / Mobile *"
      },
      "services": {
        "movingOutCleaning": "Nettoyage de déménagement",
        "maintenanceCleaning": "Nettoyage d'entretien",
        "officeCleaning": "Nettoyage de bureaux",
        "restaurantCleaning": "Nettoyage gastronomie",
        "windowCleaning": "Nettoyage de vitres/stores",
        "constructionCleaning": "Nettoyage de fin de chantier",
        "caretaking": "Conciergerie",
        "movingTransport": "Déménagement & Transport",
        "packingService": "Service d'emballage",
        "furnitureAssembly": "Montage/démontage de meubles",
        "disposalClearance": "Élimination & Débarras",
        "highPressureCleaning": "Nettoyage haute pression",
        "stairwellCleaning": "Nettoyage cage d'escalier",
        "specialistCleaning": "Nettoyage spécial",
        "otherService": "Autre service"
      },
      "property": {
        "streetNo": "Rue / N° *",
        "postcodeCity": "NPA / Localité *",
        "type": "Type de propriété",
        "types": {
          "apartment": "Appartement",
          "house": "Maison",
          "office": "Bureau",
          "commercial": "Commerce",
          "restaurant": "Restaurant",
          "other": "Autre"
        },
        "rooms": "Pièces",
        "area": "Surface habitable (m²)",
        "floor": "Étage",
        "lift": "Ascenseur (Oui/Non)",
        "parking": "Parking / Accès"
      },
      "dateContact": {
        "preferredDate": "Date souhaitée",
        "timeWindow": "Heure / Créneau horaire",
        "handover": "Remise de la propriété",
        "preferredContact": "Mode de contact préféré",
        "contactOptions": {
          "phone": "Téléphone",
          "email": "E-mail",
          "whatsapp": "WhatsApp"
        },
        "photosVia": "Photos / plans envoyés par",
        "photosOptions": {
          "email": "E-mail",
          "whatsapp": "WhatsApp",
          "none": "Aucun"
        }
      },
      "cleaning": {
        "type": "Type de nettoyage (plusieurs sélections possibles)",
        "frequency": "Fréquence des services",
        "frequencies": {
          "daily": "Quotidien",
          "weekly": "Hebdomadaire",
          "twiceWeekly": "2x par semaine",
          "threeWeekly": "3x par semaine",
          "fiveWeekly": "5x par semaine",
          "monthly": "Mensuel",
          "other": "Autre"
        },
        "areas": "Pièces / zones à nettoyer",
        "windows": "Fenêtres - quantité et type",
        "windowTypes": {
          "standard": "Fenêtres standard",
          "floorToCeiling": "Fenêtres du sol au plafond",
          "roof": "Fenêtres de toit",
          "glassDoors": "Portes vitrées"
        },
        "blinds": "Stores / protections solaires",
        "blindTypes": {
          "venetian": "Stores à lamelles",
          "roller": "Volets roulants",
          "shutters": "Volets",
          "awnings": "Stores bannes"
        },
        "sanitary": "Installations sanitaires",
        "sanitaryTypes": {
          "toilets": "Toilettes",
          "bathtubs": "Baignoires",
          "showers": "Douches",
          "washbasins": "Lavabos",
          "kitchens": "Cuisines"
        },
        "floors": "Types de sols",
        "floorTypes": {
          "parquet": "Parquet",
          "laminate": "Stratifié",
          "tiles": "Carrelage",
          "carpet": "Tapis",
          "pvc": "PVC/Vinyle",
          "naturalStone": "Pierre naturelle"
        },
        "vacuumCarpetOnly": "Aspirer le tapis uniquement",
        "deepCarpetCleaning": "Nettoyage en profondeur des tapis",
        "balconyCleaning": "Nettoyage de balcon / terrasse",
        "balconyArea": "Surface balcon / terrasse (m²)",
        "highPressure": "Nettoyage haute pression",
        "repairWallHoles": "Réparation des trous",
        "holesCount": "Nombre de trous",
        "condition": "État & exigences particulières",
        "conditions": {
          "empty": "Propriété vide",
          "furnished": "Meublé",
          "petHair": "Poils d'animaux",
          "nicotine": "Nicotine",
          "heavilySoiled": "Très sale",
          "mould": "Moisissure"
        },
        "additionalDetails": "Détails supplémentaires (accès, saleté spéciale, etc.)"
      },
      "moving": {
        "collectionAddress": "Adresse de départ (rue, NPA, ville)",
        "deliveryAddress": "Adresse d'arrivée (rue, NPA, ville)",
        "floorCollection": "Étage de départ",
        "liftCollection": "Ascenseur de départ",
        "distanceCollection": "Distance de portage départ (m)",
        "floorDelivery": "Étage d'arrivée",
        "liftDelivery": "Ascenseur d'arrivée",
        "distanceDelivery": "Distance de portage arrivée (m)",
        "scope": "Étendue des services",
        "scopes": {
          "transport": "Transport",
          "packing": "Emballage",
          "unpacking": "Déballage",
          "dismantling": "Démontage",
          "assembly": "Montage",
          "boxes": "Cartons",
          "disposal": "Élimination",
          "clearance": "Débarras",
          "storage": "Stockage temporaire"
        },
        "inventory": "Inventaire - quantité approximative",
        "inventories": {
          "boxes": "Cartons",
          "wardrobes": "Armoires",
          "beds": "Lits",
          "sofas": "Canapés",
          "tables": "Tables",
          "chairs": "Chaises",
          "dressers": "Commodes",
          "largeAppliances": "Gros électroménager"
        },
        "additionalInventory": "Mobilier supplémentaire / liste d'inventaire",
        "specialItems": "Objets spéciaux, élimination & organisation",
        "specialItemTypes": {
          "piano": "Piano",
          "safe": "Coffre-fort",
          "aquarium": "Aquarium",
          "antiques": "Antiquités",
          "heavy": "Objet de plus de 100 kg",
          "none": "Aucun objet spécial"
        },
        "specialItemsDetails": "Objets spéciaux - détails, poids et dimensions",
        "noParkingCollection": "Zone d'interdiction de stationnement au départ",
        "noParkingDelivery": "Zone d'interdiction de stationnement à l'arrivée",
        "preferredDate": "Date de déménagement souhaitée",
        "dateFlexible": "Date flexible ?",
        "staffCount": "Nombre d'employés souhaité"
      },
      "review": {
        "consent": "J'accepte que mes données soient utilisées pour traiter cette demande sans engagement.",
        "placeDate": "Lieu / Date",
        "signature": "Signature",
        "note": "Note : L'offre définitive sera préparée après examen des informations et, si nécessaire, des photos.",
        "back": "Retour",
        "next": "Suivant",
        "submit": "Soumettre",
        "submitting": "Envoi en cours..."
      }
    }
  },
  it: {
    "universalForm": {
      "title": "Richiesta Preventivo",
      "subtitle": "Gratuito & senza impegno",
      "steps": {
        "customer": "Dettagli Cliente",
        "services": "Servizi",
        "property": "Luogo & Proprietà",
        "dateContact": "Data & Contatto",
        "cleaning": "Pulizia",
        "moving": "Trasloco / Trasporto",
        "review": "Rivedi & Invia"
      },
      "customer": {
        "firstName": "Nome / Cognome *",
        "company": "Azienda (opzionale)",
        "email": "E-mail *",
        "phone": "Telefono / Cellulare *"
      },
      "services": {
        "movingOutCleaning": "Pulizia di trasloco",
        "maintenanceCleaning": "Pulizia di manutenzione",
        "officeCleaning": "Pulizia uffici",
        "restaurantCleaning": "Pulizia ristorante",
        "windowCleaning": "Pulizia vetri/tapparelle",
        "constructionCleaning": "Pulizia di fine cantiere",
        "caretaking": "Custodia",
        "movingTransport": "Trasloco & Trasporto",
        "packingService": "Servizio di imballaggio",
        "furnitureAssembly": "Montaggio/smontaggio mobili",
        "disposalClearance": "Smaltimento & Sgombero",
        "highPressureCleaning": "Pulizia ad alta pressione",
        "stairwellCleaning": "Pulizia scale",
        "specialistCleaning": "Pulizia speciale",
        "otherService": "Altro servizio"
      },
      "property": {
        "streetNo": "Via / N° *",
        "postcodeCity": "CAP / Città *",
        "type": "Tipo di proprietà",
        "types": {
          "apartment": "Appartamento",
          "house": "Casa",
          "office": "Ufficio",
          "commercial": "Commerciale",
          "restaurant": "Ristorante",
          "other": "Altro"
        },
        "rooms": "Stanze",
        "area": "Superficie abitabile (m²)",
        "floor": "Piano",
        "lift": "Ascensore (Sì/No)",
        "parking": "Parcheggio / Accesso"
      },
      "dateContact": {
        "preferredDate": "Data preferita",
        "timeWindow": "Orario / Fascia oraria",
        "handover": "Consegna proprietà",
        "preferredContact": "Metodo di contatto preferito",
        "contactOptions": {
          "phone": "Telefono",
          "email": "E-mail",
          "whatsapp": "WhatsApp"
        },
        "photosVia": "Foto / planimetrie inviate tramite",
        "photosOptions": {
          "email": "E-mail",
          "whatsapp": "WhatsApp",
          "none": "Nessuno"
        }
      },
      "cleaning": {
        "type": "Tipo di pulizia (più selezioni possibili)",
        "frequency": "Frequenza del servizio",
        "frequencies": {
          "daily": "Giornaliero",
          "weekly": "Settimanale",
          "twiceWeekly": "2x a settimana",
          "threeWeekly": "3x a settimana",
          "fiveWeekly": "5x a settimana",
          "monthly": "Mensile",
          "other": "Altro"
        },
        "areas": "Stanze / aree da pulire",
        "windows": "Finestre - quantità e tipo",
        "windowTypes": {
          "standard": "Finestre standard",
          "floorToCeiling": "Finestre a tutta altezza",
          "roof": "Finestre da tetto",
          "glassDoors": "Porte a vetri"
        },
        "blinds": "Tapparelle / protezioni solari",
        "blindTypes": {
          "venetian": "Tende veneziane",
          "roller": "Tapparelle",
          "shutters": "Imposte",
          "awnings": "Tende da sole"
        },
        "sanitary": "Impianti sanitari",
        "sanitaryTypes": {
          "toilets": "Servizi igienici",
          "bathtubs": "Vasche da bagno",
          "showers": "Docce",
          "washbasins": "Lavatesta",
          "kitchens": "Cucine"
        },
        "floors": "Tipi di pavimento",
        "floorTypes": {
          "parquet": "Parquet",
          "laminate": "Laminato",
          "tiles": "Piastrelle",
          "carpet": "Tappeto",
          "pvc": "PVC/Vinyle",
          "naturalStone": "Pietra naturale"
        },
        "vacuumCarpetOnly": "Solo aspirazione tappeto",
        "deepCarpetCleaning": "Pulizia profonda tappeto",
        "balconyCleaning": "Pulizia balcone / terrazza",
        "balconyArea": "Superficie balcone / terrazza (m²)",
        "highPressure": "Pulizia ad alta pressione",
        "repairWallHoles": "Riparazione buchi nei muri",
        "holesCount": "Numero di buchi",
        "condition": "Condizioni & requisiti speciali",
        "conditions": {
          "empty": "Proprietà vuota",
          "furnished": "Arredata",
          "petHair": "Peli di animali",
          "nicotine": "Nicotina",
          "heavilySoiled": "Molto sporco",
          "mould": "Muffa"
        },
        "additionalDetails": "Dettagli aggiuntivi (accesso, sporco speciale, ecc.)"
      },
      "moving": {
        "collectionAddress": "Indirizzo di ritiro (via, CAP, città)",
        "deliveryAddress": "Indirizzo di consegna (via, CAP, città)",
        "floorCollection": "Piano di ritiro",
        "liftCollection": "Ascensore ritiro",
        "distanceCollection": "Distanza trasporto ritiro (m)",
        "floorDelivery": "Piano di consegna",
        "liftDelivery": "Ascensore consegna",
        "distanceDelivery": "Distanza trasporto consegna (m)",
        "scope": "Ambito dei servizi",
        "scopes": {
          "transport": "Trasporto",
          "packing": "Imballaggio",
          "unpacking": "Disimballaggio",
          "dismantling": "Smontaggio",
          "assembly": "Montaggio",
          "boxes": "Scatole",
          "disposal": "Smaltimento",
          "clearance": "Sgombero",
          "storage": "Stoccaggio temporaneo"
        },
        "inventory": "Inventario - quantità approssimativa",
        "inventories": {
          "boxes": "Scatole",
          "wardrobes": "Armadi",
          "beds": "Letti",
          "sofas": "Divani",
          "tables": "Tavoli",
          "chairs": "Sedie",
          "dressers": "Cassettiere",
          "largeAppliances": "Grandi elettrodomestici"
        },
        "additionalInventory": "Mobili aggiuntivi / lista inventario",
        "specialItems": "Oggetti speciali, smaltimento & organizzazione",
        "specialItemTypes": {
          "piano": "Pianoforte",
          "safe": "Cassaforte",
          "aquarium": "Acquario",
          "antiques": "Antiquariato",
          "heavy": "Oggetto oltre 100 kg",
          "none": "Nessun oggetto speciale"
        },
        "specialItemsDetails": "Oggetti speciali - dettagli, peso e dimensioni",
        "noParkingCollection": "Zona di divieto di sosta al ritiro",
        "noParkingDelivery": "Zona di divieto di sosta alla consegna",
        "preferredDate": "Data di trasloco preferita",
        "dateFlexible": "Data flessibile?",
        "staffCount": "Numero di addetti desiderato"
      },
      "review": {
        "consent": "Accetto che i miei dati vengano utilizzati per elaborare questa richiesta senza impegno.",
        "placeDate": "Luogo / Data",
        "signature": "Firma",
        "note": "Nota: L'offerta finale verrà preparata dopo aver esaminato le informazioni e, se necessario, le foto.",
        "back": "Indietro",
        "next": "Avanti",
        "submit": "Invia",
        "submitting": "Invio in corso..."
      }
    }
  }
};

for (const lang of locales) {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) continue;
  const rawData = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(rawData);

  json.universalForm = translations[lang].universalForm;

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Updated translations for ${lang}`);
}
