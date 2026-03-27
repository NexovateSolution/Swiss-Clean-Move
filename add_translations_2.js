const fs = require('fs');
const path = require('path');

const locales = ['en', 'de', 'fr'];
const files = locales.map(l => path.join(__dirname, 'messages', `${l}.json`));

const newData = {
  finalCleaning: {
    en: {
      contact: "Contact",
      nameCompany: "Name / Company *",
      phone: "Phone *",
      email: "Email *",
      property: "Property",
      address: "Address (Street, ZIP, City) *",
      propertyType: "Property type",
      roomsLabel: "Rooms *",
      livingArea: "Living area (m²)",
      layout: "Layout",
      bedrooms: "Bedrooms (number)",
      livingRooms: "Living rooms (number)",
      bathrooms: "Bathrooms (number)",
      separateWc: "Separate WC (number)",
      kitchens: "Kitchens (number)",
      sanitary: "Sanitary",
      sanitaryItems: {
        shower: "Shower",
        bathtub: "Bathtub",
        doubleSink: "Double sink",
        guestWc: "Guest WC",
        glassShowerWall: "Glass shower wall",
        mirrors: "Mirrors",
        fittings: "Fittings"
      },
      kitchen: "Kitchen",
      kitchenItems: {
        oven: "Oven (intensive)",
        cooktop: "Cooktop",
        refrigerator: "Refrigerator (inside)",
        freezer: "Freezer",
        dishwasher: "Dishwasher",
        extractorHood: "Extractor hood / filter",
        cabinetsInside: "Cabinets inside",
        cabinetsOutside: "Cabinets outside",
        workSurfaces: "Work surfaces"
      },
      laundryRoom: "Laundry Room",
      laundryItems: {
        washingMachine: "Clean washing machine",
        dryer: "Clean dryer"
      },
      location: "Location",
      locationTypes: {
        apartment: "Apartment",
        basement: "Basement",
        sharedRoom: "Shared room"
      },
      additionalRooms: "Additional Rooms & Outdoor Areas",
      additionalItems: {
        balcony: "Balcony",
        terrace: "Terrace"
      },
      area: "Area (m²)",
      cleaning: "Cleaning",
      cleaningTypes: {
        machine: "Machine",
        manual: "Manual"
      },
      otherRooms: "Other Rooms",
      otherRoomItems: {
        basement: "Basement",
        attic: "Attic",
        garage: "Garage",
        storageRoom: "Storage room"
      },
      windowsShading: "Windows & Shading",
      windowsInfo: "Windows (number)",
      windowTypes: {
        standard: "Standard",
        floorToCeiling: "Floor-to-ceiling",
        roofWindows: "Roof windows",
        largeSurfaces: "Large surfaces",
        hardToAccess: "Hard to access"
      },
      shading: "Shading",
      shadingTypes: {
        venetian: "Venetian blinds",
        rollerShutters: "Roller shutters",
        windowShutters: "Window shutters"
      },
      floorTypes: "Floor Types",
      floors: {
        parquet: "Parquet",
        laminate: "Laminate",
        tiles: "Tiles",
        stone: "Stone",
        carpet: "Carpet",
        pvc: "PVC"
      },
      cleaningScope: "Cleaning Scope",
      scopeItems: {
        full: "Full (handover standard)"
      },
      general: "General",
      generalItems: {
        floors: "Floors",
        doors: "Doors",
        frames: "Frames",
        windows: "Windows",
        cabinets: "Cabinets",
        sockets: "Sockets",
        lightSwitches: "Light switches"
      },
      sanitaryScope: "Sanitary",
      sanitaryScopeItems: {
        limescale: "Limescale removal",
        grout: "Grout cleaning",
        descaling: "Descaling"
      },
      condition: "Condition",
      conditions: {
        normal: "Normal",
        heavilySoiled: "Heavily soiled",
        nicotine: "Nicotine contamination",
        construction: "Construction / renovation"
      },
      pets: "Pets",
      handoverManagement: "Handover / Management",
      handoverDate: "Handover date *",
      handoverOptions: {
        inspection: "Inspection with property management",
        guarantee: "Acceptance guarantee"
      },
      managementContact: "Management / contact (optional)",
      accessLogistics: "Access & Logistics",
      floor: "Floor",
      elevatorSizes: {
        small: "Small",
        medium: "Medium",
        large: "Large"
      },
      parkingStatus: "Parking",
      reserved: "Reserved",
      distanceParking: "Distance parking → entrance (m)",
      accessPossible: {
        possible: "Possible",
        restricted: "Restricted"
      },
      keyHandover: "Key Handover",
      keyOptions: {
        inPerson: "In person",
        mailbox: "Mailbox",
        neighbor: "Neighbor",
        management: "Property management",
        keyBox: "Key box"
      },
      schedule: "Schedule",
      cleaningDate: "Cleaning date *",
      from: "From *",
      to: "To *",
      scheduleOptions: {
        flexible: "Flexible",
        express: "Express"
      },
      additionalServices: "Additional Services",
      additionalOptions: {
        recleaning: "Re-cleaning after inspection",
        guarantee: "Guarantee until handover",
        disposal: "Disposal",
        movingCombo: "Moving combined"
      },
      upload: "Upload",
      uploads: {
        photos: "Photos",
        videos: "Videos",
        documents: "Documents"
      },
      notes: "Notes (optional)"
    },
    de: {
      contact: "Kontakt",
      nameCompany: "Name / Firma *",
      phone: "Telefon *",
      email: "E-Mail *",
      property: "Objekt",
      address: "Adresse (Strasse, PLZ, Ort) *",
      propertyType: "Objektart",
      roomsLabel: "Zimmer *",
      livingArea: "Wohnfläche (m²)",
      layout: "Raumstruktur",
      bedrooms: "Schlafzimmer (Anzahl)",
      livingRooms: "Wohnzimmer (Anzahl)",
      bathrooms: "Badezimmer (Anzahl)",
      separateWc: "WC separat (Anzahl)",
      kitchens: "Küche (Anzahl)",
      sanitary: "Sanitär",
      sanitaryItems: {
        shower: "Dusche",
        bathtub: "Badewanne",
        doubleSink: "Doppellavabo",
        guestWc: "Gäste-WC",
        glassShowerWall: "Glasduschwand",
        mirrors: "Spiegel",
        fittings: "Armaturen"
      },
      kitchen: "Küche",
      kitchenItems: {
        oven: "Backofen (intensiv)",
        cooktop: "Kochfeld",
        refrigerator: "Kühlschrank innen",
        freezer: "Tiefkühler",
        dishwasher: "Geschirrspüler",
        extractorHood: "Dunstabzug / Filter",
        cabinetsInside: "Schränke innen",
        cabinetsOutside: "Schränke aussen",
        workSurfaces: "Arbeitsflächen"
      },
      laundryRoom: "Waschküche",
      laundryItems: {
        washingMachine: "Waschmaschine reinigen",
        dryer: "Tumbler reinigen"
      },
      location: "Standort",
      locationTypes: {
        apartment: "Wohnung",
        basement: "Keller",
        sharedRoom: "Allgemeinraum"
      },
      additionalRooms: "Nebenräume & Aussenflächen",
      additionalItems: {
        balcony: "Balkon",
        terrace: "Terrasse"
      },
      area: "Fläche (m²)",
      cleaning: "Reinigung",
      cleaningTypes: {
        machine: "Maschine",
        manual: "Manuell"
      },
      otherRooms: "Nebenräume",
      otherRoomItems: {
        basement: "Keller",
        attic: "Estrich",
        garage: "Garage",
        storageRoom: "Reduit"
      },
      windowsShading: "Fenster & Beschattung",
      windowsInfo: "Fenster (Anzahl)",
      windowTypes: {
        standard: "Standard",
        floorToCeiling: "Bodentief",
        roofWindows: "Dachfenster",
        largeSurfaces: "Grossflächen",
        hardToAccess: "Schwer zugänglich"
      },
      shading: "Beschattung",
      shadingTypes: {
        venetian: "Lamellenstoren",
        rollerShutters: "Rollläden",
        windowShutters: "Fensterläden"
      },
      floorTypes: "Bodenbeläge",
      floors: {
        parquet: "Parkett",
        laminate: "Laminat",
        tiles: "Fliesen",
        stone: "Stein",
        carpet: "Teppich",
        pvc: "PVC"
      },
      cleaningScope: "Reinigungsumfang",
      scopeItems: {
        full: "Komplett (Abgabestandard)"
      },
      general: "Allgemein",
      generalItems: {
        floors: "Böden",
        doors: "Türen",
        frames: "Rahmen",
        windows: "Fenster",
        cabinets: "Schränke",
        sockets: "Steckdosen",
        lightSwitches: "Lichtschalter"
      },
      sanitaryScope: "Sanitär",
      sanitaryScopeItems: {
        limescale: "Kalk entfernen",
        grout: "Fugen reinigen",
        descaling: "Entkalkung"
      },
      condition: "Zustand",
      conditions: {
        normal: "Normal",
        heavilySoiled: "Stark verschmutzt",
        nicotine: "Nikotinbelastung",
        construction: "Baustelle / Renovation"
      },
      pets: "Haustiere",
      handoverManagement: "Abgabe / Verwaltung",
      handoverDate: "Abgabetermin *",
      handoverOptions: {
        inspection: "Abnahme mit Verwaltung",
        guarantee: "Abnahmegarantie"
      },
      managementContact: "Verwaltung / Kontakt (optional)",
      accessLogistics: "Zugang & Logistik",
      floor: "Etage",
      elevatorSizes: {
        small: "Klein",
        medium: "Mittel",
        large: "Gross"
      },
      parkingStatus: "Parkplatz",
      reserved: "Reserviert",
      distanceParking: "Distanz Parkplatz → Eingang (m)",
      accessPossible: {
        possible: "Möglich",
        restricted: "Eingeschränkt"
      },
      keyHandover: "Schlüsselübergabe",
      keyOptions: {
        inPerson: "Persönlich",
        mailbox: "Briefkasten",
        neighbor: "Nachbar",
        management: "Verwaltung",
        keyBox: "Schlüsselbox"
      },
      schedule: "Termin",
      cleaningDate: "Reinigungsdatum *",
      from: "Von *",
      to: "Bis *",
      scheduleOptions: {
        flexible: "Flexibel",
        express: "Express"
      },
      additionalServices: "Zusatzleistungen",
      additionalOptions: {
        recleaning: "Nachreinigung bei Abnahme",
        guarantee: "Garantie bis Übergabe",
        disposal: "Entsorgung",
        movingCombo: "Umzug kombiniert"
      },
      upload: "Upload",
      uploads: {
        photos: "Fotos",
        videos: "Videos",
        documents: "Dokumente"
      },
      notes: "Bemerkungen (optional)"
    },
    fr: {
      contact: "Contact",
      nameCompany: "Nom / Entreprise *",
      phone: "Téléphone *",
      email: "Email *",
      property: "Propriété",
      address: "Adresse (Rue, NPA, Ville) *",
      propertyType: "Type de bien",
      roomsLabel: "Pièces *",
      livingArea: "Surface habitable (m²)",
      layout: "Disposition",
      bedrooms: "Chambres (nombre)",
      livingRooms: "Salons (nombre)",
      bathrooms: "Salles de bain (nombre)",
      separateWc: "WC séparés (nombre)",
      kitchens: "Cuisines (nombre)",
      sanitary: "Sanitaires",
      sanitaryItems: {
        shower: "Douche",
        bathtub: "Baignoire",
        doubleSink: "Double lavabo",
        guestWc: "WC visiteurs",
        glassShowerWall: "Paroi de douche en verre",
        mirrors: "Miroirs",
        fittings: "Robinetterie"
      },
      kitchen: "Cuisine",
      kitchenItems: {
        oven: "Four (intensif)",
        cooktop: "Plaque de cuisson",
        refrigerator: "Réfrigérateur (intérieur)",
        freezer: "Congélateur",
        dishwasher: "Lave-vaisselle",
        extractorHood: "Hotte aspirante / filtre",
        cabinetsInside: "Armoires intérieur",
        cabinetsOutside: "Armoires extérieur",
        workSurfaces: "Plans de travail"
      },
      laundryRoom: "Buanderie",
      laundryItems: {
        washingMachine: "Nettoyer la machine à laver",
        dryer: "Nettoyer le sèche-linge"
      },
      location: "Emplacement",
      locationTypes: {
        apartment: "Appartement",
        basement: "Sous-sol",
        sharedRoom: "Salle commune"
      },
      additionalRooms: "Pièces supplémentaires et espaces extérieurs",
      additionalItems: {
        balcony: "Balcon",
        terrace: "Terrasse"
      },
      area: "Surface (m²)",
      cleaning: "Nettoyage",
      cleaningTypes: {
        machine: "Machine",
        manual: "Manuel"
      },
      otherRooms: "Autres Éléments",
      otherRoomItems: {
        basement: "Sous-sol",
        attic: "Grenier",
        garage: "Garage",
        storageRoom: "Réduit"
      },
      windowsShading: "Fenêtres et Ombrage",
      windowsInfo: "Fenêtres (nombre)",
      windowTypes: {
        standard: "Standard",
        floorToCeiling: "Fenêtres du sol au plafond",
        roofWindows: "Fenêtres de toit",
        largeSurfaces: "Grandes surfaces",
        hardToAccess: "Difficiles d'accès"
      },
      shading: "Ombrage",
      shadingTypes: {
        venetian: "Stores à lamelles",
        rollerShutters: "Volets roulants",
        windowShutters: "Volets de fenêtres"
      },
      floorTypes: "Revêtements de sol",
      floors: {
        parquet: "Parquet",
        laminate: "Stratifié",
        tiles: "Carrelage",
        stone: "Pierre",
        carpet: "Tapis",
        pvc: "PVC"
      },
      cleaningScope: "Portée du nettoyage",
      scopeItems: {
        full: "Complet (standard de remise)"
      },
      general: "Général",
      generalItems: {
        floors: "Sols",
        doors: "Portes",
        frames: "Cadres",
        windows: "Fenêtres",
        cabinets: "Armoires",
        sockets: "Prises de courant",
        lightSwitches: "Interrupteurs"
      },
      sanitaryScope: "Sanitaires",
      sanitaryScopeItems: {
        limescale: "Détartrage",
        grout: "Nettoyage des joints",
        descaling: "Élimination du calcaire"
      },
      condition: "État",
      conditions: {
        normal: "Normal",
        heavilySoiled: "Très sale",
        nicotine: "Contamination à la nicotine",
        construction: "Chantier / rénovation"
      },
      pets: "Animaux de compagnie",
      handoverManagement: "Remise / Gestion",
      handoverDate: "Date de remise *",
      handoverOptions: {
        inspection: "Visite avec la gérance",
        guarantee: "Garantie d'acceptation"
      },
      managementContact: "Gérance / contact (facultatif)",
      accessLogistics: "Accès et Logistique",
      floor: "Étage",
      elevatorSizes: {
        small: "Petit",
        medium: "Moyen",
        large: "Grand"
      },
      parkingStatus: "Parking",
      reserved: "Réservé",
      distanceParking: "Distance parking → entrée (m)",
      accessPossible: {
        possible: "Possible",
        restricted: "Restreint"
      },
      keyHandover: "Remise des clés",
      keyOptions: {
        inPerson: "En personne",
        mailbox: "Boîte aux lettres",
        neighbor: "Voisin",
        management: "Gérance",
        keyBox: "Boîte à clés"
      },
      schedule: "Calendrier",
      cleaningDate: "Date de nettoyage *",
      from: "De *",
      to: "À *",
      scheduleOptions: {
        flexible: "Flexible",
        express: "Express"
      },
      additionalServices: "Services supplémentaires",
      additionalOptions: {
        recleaning: "Nouveau nettoyage après inspection",
        guarantee: "Garantie jusqu'à la remise",
        disposal: "Élimination",
        movingCombo: "Déménagement combiné"
      },
      upload: "Téléchargement",
      uploads: {
        photos: "Photos",
        videos: "Vidéos",
        documents: "Documents"
      },
      notes: "Remarques (facultatif)"
    }
  },

  maintenanceCleaning: {
    en: {
      contact: "Contact",
      nameCompany: "Name / Company *",
      contactPerson: "Contact person",
      phone: "Phone *",
      email: "Email *",
      property: "Property",
      address: "Address (Street, ZIP, City) *",
      propertyType: "Property type",
      types: {
        apartment: "Apartment",
        house: "House",
        office: "Office",
        practice: "Practice",
        commercial: "Commercial",
        stairwell: "Stairwell",
        retailStore: "Retail store"
      },
      area: "Area (m², approx.) *",
      rooms: "Rooms (number)",
      sanitary: "Sanitary facilities (number)",
      usage: "Usage",
      usages: {
        private: "Private",
        commercial: "Commercial",
        highTraffic: "High traffic"
      },
      floorTypes: "Floor Types",
      floors: {
        parquet: "Parquet",
        laminate: "Laminate",
        tiles: "Tiles",
        stone: "Stone",
        carpet: "Carpet",
        pvc: "PVC"
      },
      scopeOfServices: "Scope of Services",
      services: {
        vacuuming: "Vacuuming",
        wetMopping: "Wet mopping",
        dusting: "Dusting",
        sanitary: "Sanitary",
        kitchen: "Kitchen",
        officesRooms: "Offices / rooms",
        windows: "Windows",
        stairwell: "Stairwell",
        waste: "Waste"
      },
      frequency: "Frequency",
      frequencies: {
        daily: "Daily",
        twoThreeTimes: "2–3x per week",
        weekly: "Weekly",
        biweekly: "Bi-weekly",
        monthly: "Monthly",
        custom: "Custom"
      },
      serviceTimes: "Service Times",
      times: {
        earlyMorning: "Early morning",
        morning: "Morning",
        afternoon: "Afternoon",
        evening: "Evening",
        duringOperation: "During operation",
        afterOperation: "After operation",
        flexible: "Flexible"
      },
      cleaningDuration: "Cleaning Duration (important for pricing)",
      durations: {
        hours12: "1–2 hours",
        hours23: "2–3 hours",
        hours35: "3–5 hours",
        halfDay: "Half day",
        fullDay: "Full day",
        custom: "Custom"
      },
      startPlanning: "Start & Planning",
      startDate: "Start date *",
      orgAndAccess: "Access & Organization",
      org: {
        keyAvailable: "Key available",
        codeSystem: "Code / system",
        clientOnSite: "Client on site"
      },
      special: "Special",
      specialItems: {
        pets: "Pets",
        children: "Children",
        alarmSystem: "Alarm system"
      },
      additionalServices: "Additional Services",
      additional: {
        disinfection: "Disinfection",
        deepCleaning: "Deep cleaning",
        specialCleaning: "Special cleaning"
      },
      upload: "Upload",
      uploads: {
        photos: "Photos",
        documents: "Documents"
      },
      notes: "Notes (optional)"
    },
    de: {
      contact: "Kontakt",
      nameCompany: "Name / Firma *",
      contactPerson: "Ansprechperson",
      phone: "Telefon *",
      email: "E-Mail *",
      property: "Objekt",
      address: "Adresse (Strasse, PLZ, Ort) *",
      propertyType: "Objektart",
      types: {
        apartment: "Wohnung",
        house: "Haus",
        office: "Büro",
        practice: "Praxis",
        commercial: "Gewerbe",
        stairwell: "Treppenhaus",
        retailStore: "Ladenlokal"
      },
      area: "Fläche (m², ca.) *",
      rooms: "Räume (Anzahl)",
      sanitary: "Sanitär (Anzahl)",
      usage: "Nutzung",
      usages: {
        private: "Privat",
        commercial: "Geschäftlich",
        highTraffic: "Stark frequentiert"
      },
      floorTypes: "Bodenarten",
      floors: {
        parquet: "Parkett",
        laminate: "Laminat",
        tiles: "Fliesen",
        stone: "Stein",
        carpet: "Teppich",
        pvc: "PVC"
      },
      scopeOfServices: "Leistungsumfang",
      services: {
        vacuuming: "Staubsaugen",
        wetMopping: "Nass wischen",
        dusting: "Abstauben",
        sanitary: "Sanitär",
        kitchen: "Küche",
        officesRooms: "Büro / Räume",
        windows: "Fenster",
        stairwell: "Treppenhaus",
        waste: "Abfall"
      },
      frequency: "Intervall",
      frequencies: {
        daily: "Täglich",
        twoThreeTimes: "2–3x pro Woche",
        weekly: "Wöchentlich",
        biweekly: "14-täglich",
        monthly: "Monatlich",
        custom: "Individuell"
      },
      serviceTimes: "Einsatzzeiten (Zeitfenster)",
      times: {
        earlyMorning: "Früh morgens",
        morning: "Vormittag",
        afternoon: "Nachmittag",
        evening: "Abends",
        duringOperation: "Während Betrieb",
        afterOperation: "Nach Betrieb",
        flexible: "Flexibel"
      },
      cleaningDuration: "Reinigungsdauer (sehr wichtig für Preis)",
      durations: {
        hours12: "1–2 Stunden",
        hours23: "2–3 Stunden",
        hours35: "3–5 Stunden",
        halfDay: "Halbtags",
        fullDay: "Ganztags",
        custom: "Individuell"
      },
      startPlanning: "Start & Planung",
      startDate: "Startdatum *",
      orgAndAccess: "Organisation & Zugang",
      org: {
        keyAvailable: "Schlüssel vorhanden",
        codeSystem: "Code / System",
        clientOnSite: "Kunde vor Ort"
      },
      special: "Besonderes",
      specialItems: {
        pets: "Haustiere",
        children: "Kinder",
        alarmSystem: "Alarmanlage"
      },
      additionalServices: "Zusatzservices",
      additional: {
        disinfection: "Desinfektion",
        deepCleaning: "Grundreinigung",
        specialCleaning: "Spezialreinigung"
      },
      upload: "Upload",
      uploads: {
        photos: "Fotos",
        documents: "Dokumente"
      },
      notes: "Bemerkungen (optional)"
    },
    fr: {
      contact: "Contact",
      nameCompany: "Nom / Entreprise *",
      contactPerson: "Personne de contact",
      phone: "Téléphone *",
      email: "Email *",
      property: "Propriété",
      address: "Adresse (Rue, NPA, Ville) *",
      propertyType: "Type de bien",
      types: {
        apartment: "Appartement",
        house: "Maison",
        office: "Bureau",
        practice: "Cabinet médical",
        commercial: "Local commercial",
        stairwell: "Cage d'escalier",
        retailStore: "Magasin"
      },
      area: "Surface (m², approx.) *",
      rooms: "Pièces (nombre)",
      sanitary: "Sanitaires (nombre)",
      usage: "Utilisation",
      usages: {
        private: "Privé",
        commercial: "Commercial",
        highTraffic: "Très fréquenté"
      },
      floorTypes: "Types de sol",
      floors: {
        parquet: "Parquet",
        laminate: "Stratifié",
        tiles: "Carrelage",
        stone: "Pierre",
        carpet: "Moquette",
        pvc: "PVC"
      },
      scopeOfServices: "Étendue des services",
      services: {
        vacuuming: "Passer l'aspirateur",
        wetMopping: "Nettoyage humide",
        dusting: "Dépoussiérage",
        sanitary: "Sanitaires",
        kitchen: "Cuisine",
        officesRooms: "Bureaux / pièces",
        windows: "Fenêtres",
        stairwell: "Cage d'escalier",
        waste: "Déchets"
      },
      frequency: "Fréquence",
      frequencies: {
        daily: "Tous les jours",
        twoThreeTimes: "2–3x par semaine",
        weekly: "Hebdomadaire",
        biweekly: "Toutes les 2 semaines",
        monthly: "Mensuel",
        custom: "Individuel"
      },
      serviceTimes: "Heures de service",
      times: {
        earlyMorning: "Tôt le matin",
        morning: "Matin",
        afternoon: "Après-midi",
        evening: "Soir",
        duringOperation: "Pendant l'exploitation",
        afterOperation: "Après l'exploitation",
        flexible: "Flexible"
      },
      cleaningDuration: "Durée de nettoyage",
      durations: {
        hours12: "1–2 heures",
        hours23: "2–3 heures",
        hours35: "3–5 heures",
        halfDay: "Demi-journée",
        fullDay: "Journée entière",
        custom: "Individuel"
      },
      startPlanning: "Début et Planification",
      startDate: "Date de début *",
      orgAndAccess: "Organisation et Accès",
      org: {
        keyAvailable: "Clé disponible",
        codeSystem: "Code / système",
        clientOnSite: "Client sur place"
      },
      special: "Spécial",
      specialItems: {
        pets: "Animaux de compagnie",
        children: "Enfants",
        alarmSystem: "Système d'alarme"
      },
      additionalServices: "Services supplémentaires",
      additional: {
        disinfection: "Désinfection",
        deepCleaning: "Nettoyage de base",
        specialCleaning: "Nettoyage spécial"
      },
      upload: "Téléchargement",
      uploads: {
        photos: "Photos",
        documents: "Documents"
      },
      notes: "Remarques (facultatif)"
    }
  }
};

files.forEach((file, index) => {
  const loc = locales[index];
  let data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  if (!data.serviceForm) data.serviceForm = {};
  if (!data.serviceForm.wizard) data.serviceForm.wizard = {};
  
  Object.keys(newData).forEach(category => {
    data.serviceForm.wizard[category] = {
      ...(data.serviceForm.wizard[category] || {}), // preserve existing
      ...newData[category][loc]
    };
  });
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`Wrote ${loc}`);
});
