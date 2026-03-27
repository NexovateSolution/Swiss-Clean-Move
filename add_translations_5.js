const fs = require('fs');
const path = require('path');

const locales = ['en', 'de', 'fr'];
const files = locales.map(l => path.join(__dirname, 'messages', `${l}.json`));

const newData = {
  householdHelping: {
    en: {
      contact: "Contact",
      nameCompany: "Name / Company *",
      contactPerson: "Contact person",
      phone: "Phone *",
      email: "Email *",
      addressTitle: "Address",
      address: "Street, ZIP, City *",
      serviceSelection: "Select Service",
      services: {
        householdPrivate: "Household helping (Private)",
        maintenanceBoth: "Maintenance cleaning (Private / Commercial)"
      },
      property: "Property",
      propertyType: "Property type",
      types: {
        apartment: "Apartment",
        house: "House",
        office: "Office",
        practice: "Practice",
        commercial: "Commercial",
        stairwell: "Stairwell"
      },
      area: "Area (m²)",
      rooms: "Rooms (number)",
      sanitary: "Sanitary (number)",
      usage: "Usage",
      usages: {
        private: "Private",
        commercial: "Commercial",
        highTraffic: "High traffic"
      },
      servicesProvided: "Services",
      cleaning: "Cleaning",
      cleaningItems: {
        vacuuming: "Vacuuming",
        wetMopping: "Wet mopping",
        dusting: "Dusting",
        kitchen: "Clean kitchen",
        bathroom: "Clean bathroom / WC"
      },
      maintenanceOffice: "Maintenance / Office",
      officeItems: {
        workplaces: "Workplaces",
        furniture: "Furniture",
        appliances: "Appliances"
      },
      householdHelping: "Household Helping",
      householdItems: {
        laundry: "Wash clothing",
        ironing: "Ironing",
        beds: "Change beds",
        tidying: "Tidying up",
        shopping: "Shopping"
      },
      additionalServices: "Additional Services",
      additionalOptions: {
        windows: "Windows",
        stairwell: "Stairwell",
        waste: "Waste",
        disinfection: "Disinfection"
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
      specialNeeds: "Special Needs",
      specialItems: {
        pets: "Pets",
        children: "Children",
        allergies: "Allergies",
        heavySoiling: "Heavily soiled",
        highHygiene: "High hygiene standard"
      },
      interval: "Interval",
      intervals: {
        oneTime: "One-time",
        weekly: "Weekly",
        multipleWeek: "2–3x per week",
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
      duration: "Duration",
      durations: {
        hours12: "1–2 hours",
        hours23: "2–3 hours",
        hours35: "3–5 hours",
        halfDay: "Half day",
        fullDay: "Full day",
        custom: "Custom"
      },
      start: "Start",
      startDate: "Start date *",
      accessOrganization: "Access & Organization",
      orgOptions: {
        key: "Key available",
        code: "Code / Access system",
        clientOnSite: "Client / Staff on site"
      },
      specialOrg: "Special",
      specialOrgItems: {
        alarm: "Alarm system",
        houseRules: "House rules",
        cleaningPlan: "Cleaning plan available"
      },
      additionalOrgServices: "Additional Services",
      additionalOrgOptions: {
        deepCleaning: "Deep cleaning",
        disinfectionService: "Disinfection service",
        specialCleaning: "Special cleaning",
        replacement: "Replacement in case of absence"
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
      addressTitle: "Adresse",
      address: "Strasse, PLZ, Ort *",
      serviceSelection: "Service auswählen",
      services: {
        householdPrivate: "Haushaltshilfe (Privat)",
        maintenanceBoth: "Unterhaltsreinigung (Privat / Geschäftlich)"
      },
      property: "Objekt",
      propertyType: "Objektart",
      types: {
        apartment: "Wohnung",
        house: "Haus",
        office: "Büro",
        practice: "Praxis",
        commercial: "Gewerbe",
        stairwell: "Treppenhaus"
      },
      area: "Fläche (m²)",
      rooms: "Zimmer / Räume (Anzahl)",
      sanitary: "Sanitär (Anzahl)",
      usage: "Nutzung",
      usages: {
        private: "Privat",
        commercial: "Geschäftlich",
        highTraffic: "Stark frequentiert"
      },
      servicesProvided: "Leistungen",
      cleaning: "Reinigung",
      cleaningItems: {
        vacuuming: "Staubsaugen",
        wetMopping: "Nass wischen",
        dusting: "Abstauben",
        kitchen: "Küche reinigen",
        bathroom: "Bad / WC reinigen"
      },
      maintenanceOffice: "Unterhalt / Büro",
      officeItems: {
        workplaces: "Arbeitsplätze",
        furniture: "Möbel",
        appliances: "Geräte"
      },
      householdHelping: "Haushaltshilfe",
      householdItems: {
        laundry: "Wäsche waschen",
        ironing: "Bügeln",
        beds: "Betten wechseln",
        tidying: "Aufräumen",
        shopping: "Einkaufen"
      },
      additionalServices: "Zusatzleistungen",
      additionalOptions: {
        windows: "Fenster",
        stairwell: "Treppenhaus",
        waste: "Abfall",
        disinfection: "Desinfektion"
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
      specialNeeds: "Besonderes",
      specialItems: {
        pets: "Haustiere",
        children: "Kinder",
        allergies: "Allergien",
        heavySoiling: "Stark verschmutzt",
        highHygiene: "Hoher Hygieneanspruch"
      },
      interval: "Intervall",
      intervals: {
        oneTime: "Einmalig",
        weekly: "Wöchentlich",
        multipleWeek: "2–3x pro Woche",
        biweekly: "14-täglich",
        monthly: "Monatlich",
        custom: "Individuell"
      },
      serviceTimes: "Einsatzzeiten",
      times: {
        earlyMorning: "Früh morgens",
        morning: "Vormittag",
        afternoon: "Nachmittag",
        evening: "Abends",
        duringOperation: "Während Betrieb",
        afterOperation: "Nach Betrieb",
        flexible: "Flexibel"
      },
      duration: "Einsatzdauer",
      durations: {
        hours12: "1–2 Stunden",
        hours23: "2–3 Stunden",
        hours35: "3–5 Stunden",
        halfDay: "Halbtags",
        fullDay: "Ganztags",
        custom: "Individuell"
      },
      start: "Start",
      startDate: "Startdatum *",
      accessOrganization: "Zugang & Organisation",
      orgOptions: {
        key: "Schlüssel vorhanden",
        code: "Code / Zugangssystem",
        clientOnSite: "Kunde / Personal vor Ort"
      },
      specialOrg: "Besonderes",
      specialOrgItems: {
        alarm: "Alarmanlage",
        houseRules: "Hausordnung",
        cleaningPlan: "Reinigungsplan vorhanden"
      },
      additionalOrgServices: "Zusatzservices",
      additionalOrgOptions: {
        deepCleaning: "Grundreinigung",
        disinfectionService: "Desinfektionsservice",
        specialCleaning: "Spezialreinigung",
        replacement: "Ersatz bei Ausfall"
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
      addressTitle: "Adresse",
      address: "Rue, NPA, Ville *",
      serviceSelection: "Sélectionner le service",
      services: {
        householdPrivate: "Aide au ménage (Privé)",
        maintenanceBoth: "Nettoyage d'entretien (Privé / Commercial)"
      },
      property: "Propriété",
      propertyType: "Type de bien",
      types: {
        apartment: "Appartement",
        house: "Maison",
        office: "Bureau",
        practice: "Cabinet médical",
        commercial: "Local commercial",
        stairwell: "Cage d'escalier"
      },
      area: "Surface (m²)",
      rooms: "Pièces (nombre)",
      sanitary: "Sanitaires (nombre)",
      usage: "Utilisation",
      usages: {
        private: "Privé",
        commercial: "Commercial",
        highTraffic: "Très fréquenté"
      },
      servicesProvided: "Prestations",
      cleaning: "Nettoyage",
      cleaningItems: {
        vacuuming: "Passer l'aspirateur",
        wetMopping: "Nettoyage humide",
        dusting: "Dépoussiérage",
        kitchen: "Nettoyer la cuisine",
        bathroom: "Nettoyer la salle de bain / WC"
      },
      maintenanceOffice: "Entretien / Bureau",
      officeItems: {
        workplaces: "Places de travail",
        furniture: "Meubles",
        appliances: "Appareils"
      },
      householdHelping: "Aide au ménage",
      householdItems: {
        laundry: "Laver le linge",
        ironing: "Repassage",
        beds: "Changer les lits",
        tidying: "Ranger",
        shopping: "Faire les courses"
      },
      additionalServices: "Services supplémentaires",
      additionalOptions: {
        windows: "Fenêtres",
        stairwell: "Cage d'escalier",
        waste: "Déchets",
        disinfection: "Désinfection"
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
      specialNeeds: "Besoins particuliers",
      specialItems: {
        pets: "Animaux",
        children: "Enfants",
        allergies: "Allergies",
        heavySoiling: "Très sale",
        highHygiene: "Hautes exigences d'hygiène"
      },
      interval: "Intervalle",
      intervals: {
        oneTime: "Une fois",
        weekly: "Hebdomadaire",
        multipleWeek: "2–3x par semaine",
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
      duration: "Durée d'intervention",
      durations: {
        hours12: "1–2 heures",
        hours23: "2–3 heures",
        hours35: "3–5 heures",
        halfDay: "Demi-journée",
        fullDay: "Journée entière",
        custom: "Individuel"
      },
      start: "Début",
      startDate: "Date de début *",
      accessOrganization: "Accès & Organisation",
      orgOptions: {
        key: "Clé disponible",
        code: "Code / Système",
        clientOnSite: "Client / Personnel sur place"
      },
      specialOrg: "Spécial",
      specialOrgItems: {
        alarm: "Système d'alarme",
        houseRules: "Règlement intérieur",
        cleaningPlan: "Plan de nettoyage disponible"
      },
      additionalOrgServices: "Services supplémentaires",
      additionalOrgOptions: {
        deepCleaning: "Nettoyage de base",
        disinfectionService: "Service de désinfection",
        specialCleaning: "Nettoyage spécial",
        replacement: "Remplacement en cas d'absence"
      },
      upload: "Upload",
      uploads: {
        photos: "Photos",
        documents: "Documents"
      },
      notes: "Remarques (facultatif)"
    }
  },

  comboService: {
    en: {
      contact: "Contact",
      nameCompany: "Name / Company *",
      contactPerson: "Contact person",
      phone: "Phone *",
      email: "Email *",
      addressesTitle: "Addresses",
      pickupAddress: "Pickup address (Street, ZIP, City) *",
      deliveryAddress: "Delivery address (Street, ZIP, City) *",
      service: "Service",
      services: {
        moving: "Moving",
        transport: "Transport",
        cleaning: "Cleaning (End cleaning)",
        combo: "Complete package (Moving + Cleaning)"
      },
      movingDetails: "MOVING – DETAIL INFO",
      objectFromTo: "Property (Pickup / Delivery)",
      propertyType: "Property type",
      objectTypes: {
        apartment: "Apartment",
        house: "House",
        office: "Office",
        commercial: "Commercial"
      },
      roomsFromTo: "Rooms (from / to)",
      livingArea: "Living area (m²)",
      householdSize: "Household (persons / workplaces)",
      scope: "Scope",
      scopes: {
        small: "Small (1–2 rooms)",
        medium: "Medium (3–4 rooms)",
        large: "Large (5+ rooms)",
        veryLarge: "Very large / extensive"
      },
      inventory: "Inventory (Detail)",
      inventoryItems: {
        sofa: "Sofa",
        bed: "Bed",
        wardrobe: "Wardrobe",
        table: "Table",
        chairs: "Chairs",
        washingMachine: "Washing machine",
        dryer: "Dryer",
        fridge: "Fridge",
        tv: "TV",
        boxes: "Boxes",
        plants: "Plants",
        bulky: "Bulky goods"
      },
      furtherDetails: "Further details",
      specialTransport: "Special Transport",
      specialItems: {
        piano: "Piano",
        safe: "Safe",
        aquarium: "Aquarium",
        art: "Art",
        sensitive: "Sensitive",
        heavy: "Very heavy (>100kg)"
      },
      accessLogistics: "Access & Logistics (from / to)",
      floor: "Floor",
      elevatorSizes: {
        small: "Small",
        medium: "Medium",
        large: "Large"
      },
      parking: "Parking",
      reservedParking: "Reserved parking",
      distanceParking: "Distance parking → entrance (m)",
      accessPossible: {
        yes: "Yes",
        no: "No"
      },
      stairwell: "Stairwell",
      stairwellTypes: {
        narrow: "Narrow",
        normal: "Normal",
        large: "Large"
      },
      difficulties: "Difficulties",
      difficultyItems: {
        noElevator: "No elevator",
        longPaths: "Long paths",
        narrowStairs: "Narrow stairs",
        difficultAccess: "Difficult access",
        timeConstraints: "Time constraints (management)",
        hardAccess: "Hard to access rooms"
      },
      servicesProvided: "Services",
      serviceOptions: {
        transport: "Transport",
        packing: "Packing service",
        unpacking: "Packing / unpacking",
        demontage: "Furniture demontage",
        assembly: "Furniture assembly",
        disposal: "Disposal",
        cleaning: "Cleaning"
      },
      material: "Material",
      materialItems: {
        boxes: "Moving boxes",
        packaging: "Packaging material",
        foilBlankets: "Protective foil / blankets"
      },
      cleaningDetails: "CLEANING – DETAIL INFO",
      cleaningObject: "Property",
      rooms: "Rooms",
      roomLayout: "Room Layout",
      roomItems: {
        bedrooms: "Bedrooms (number)",
        livingRooms: "Living rooms (number)",
        bathrooms: "Bathrooms (number)",
        separateWc: "Separate WC (number)",
        kitchens: "Kitchens (number)"
      },
      sanitary: "Sanitary",
      sanitaryItems: {
        shower: "Shower",
        bathtub: "Bathtub",
        doubleSink: "Double sink",
        guestWc: "Guest WC",
        glassShowerWall: "Glass shower wall"
      },
      kitchen: "Kitchen",
      kitchenItems: {
        oven: "Oven intensive",
        cooktop: "Cooktop",
        refrigerator: "Refrigerator inside",
        freezer: "Freezer",
        dishwasher: "Dishwasher",
        extractorHood: "Extractor hood / filter",
        cabinets: "Cabinets inside & outside"
      },
      laundryRoom: "Laundry Room",
      laundryItems: {
        washingMachine: "Washing machine",
        dryer: "Dryer"
      },
      location: "Location",
      locationTypes: {
        apartment: "Apartment",
        basement: "Basement"
      },
      roomsAndSideRooms: "Rooms & Side Rooms",
      additionalItems: {
        balcony: "Balcony",
        terrace: "Terrace"
      },
      cleaningTypes: {
        machine: "Cleaning with machine",
        manual: "Manual"
      },
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
        full: "Full (handover standard)",
        floors: "Floors",
        doors: "Doors",
        windows: "Windows",
        cabinets: "Cabinets",
        limescale: "Limescale removal",
        grout: "Grout cleaning"
      },
      condition: "Condition",
      conditions: {
        normal: "Normal",
        heavilySoiled: "Heavily soiled",
        nicotine: "Nicotine",
        construction: "Construction site"
      },
      pets: "Pets",
      handoverDate: "Handover / acceptance",
      handoverOptions: {
        inspection: "Inspection with property management",
        guarantee: "Acceptance guarantee"
      },
      scheduleAndPlanning: "SCHEDULE & PLANNING",
      movingDate: "Moving date *",
      cleaningDate: "Cleaning date *",
      timeWindow: "Time window",
      from: "From",
      to: "To",
      scheduleOptions: {
        flexible: "Flexible",
        express: "Express / urgent"
      },
      workDuration: "Work Duration",
      durations: {
        hours24: "2–4 hours",
        halfDay: "Half day",
        fullDay: "Full day",
        multiday: "Multi-day"
      },
      accessKey: "Access / Key",
      accessOptions: {
        inPerson: "In person",
        key: "Key",
        management: "Property management",
        neighbor: "Neighbor",
        keyBox: "Key box"
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
      contactPerson: "Ansprechperson",
      phone: "Telefon *",
      email: "E-Mail *",
      addressesTitle: "Adressen",
      pickupAddress: "Abholadresse (Strasse, PLZ, Ort) *",
      deliveryAddress: "Lieferadresse (Strasse, PLZ, Ort) *",
      service: "Service",
      services: {
        moving: "Umzug",
        transport: "Transport",
        cleaning: "Umzugsreinigung (Endreinigung)",
        combo: "Komplettpaket (Umzug + Reinigung)"
      },
      movingDetails: "UMZUG – DETAILANGABEN",
      objectFromTo: "Objekt (Abholung / Lieferung)",
      propertyType: "Objektart",
      objectTypes: {
        apartment: "Wohnung",
        house: "Haus",
        office: "Büro",
        commercial: "Gewerbe"
      },
      roomsFromTo: "Zimmer (von / nach)",
      livingArea: "Wohnfläche (m²)",
      householdSize: "Haushalt (Personen / Arbeitsplätze)",
      scope: "Umfang",
      scopes: {
        small: "Klein (1–2 Zimmer)",
        medium: "Mittel (3–4 Zimmer)",
        large: "Gross (5+ Zimmer)",
        veryLarge: "Sehr gross / umfangreich"
      },
      inventory: "Inventar (Detail)",
      inventoryItems: {
        sofa: "Sofa",
        bed: "Bett",
        wardrobe: "Schrank",
        table: "Tisch",
        chairs: "Stühle",
        washingMachine: "Waschmaschine",
        dryer: "Tumbler",
        fridge: "Kühlschrank",
        tv: "TV",
        boxes: "Kartons",
        plants: "Pflanzen",
        bulky: "Sperrgut"
      },
      furtherDetails: "Weitere Angaben",
      specialTransport: "Spezialtransport",
      specialItems: {
        piano: "Klavier",
        safe: "Safe",
        aquarium: "Aquarium",
        art: "Kunst",
        sensitive: "Empfindlich",
        heavy: "Sehr schwer (>100kg)"
      },
      accessLogistics: "Zugang & Logistik (von / nach)",
      floor: "Etage",
      elevatorSizes: {
        small: "Klein",
        medium: "Mittel",
        large: "Gross"
      },
      parking: "Parkplatz",
      reservedParking: "Reservierter Parkplatz",
      distanceParking: "Distanz Parkplatz → Eingang (m)",
      accessPossible: {
        yes: "Ja",
        no: "Nein"
      },
      stairwell: "Treppenhaus",
      stairwellTypes: {
        narrow: "Eng",
        normal: "Normal",
        large: "Gross"
      },
      difficulties: "Erschwernisse",
      difficultyItems: {
        noElevator: "Kein Lift",
        longPaths: "Lange Wege",
        narrowStairs: "Enge Treppen",
        difficultAccess: "Schwierige Zufahrt",
        timeConstraints: "Zeitvorgaben (Verwaltung)",
        hardAccess: "Schwer zugängliche Räume"
      },
      servicesProvided: "Leistungen",
      serviceOptions: {
        transport: "Transport",
        packing: "Verpackungsservice",
        unpacking: "Ein- / Auspacken",
        demontage: "Möbel Demontage",
        assembly: "Möbel Montage",
        disposal: "Entsorgung",
        cleaning: "Reinigung"
      },
      material: "Material",
      materialItems: {
        boxes: "Umzugskartons",
        packaging: "Verpackungsmaterial",
        foilBlankets: "Schutzfolie / Decken"
      },
      cleaningDetails: "REINIGUNG – DETAILANGABEN",
      cleaningObject: "Objekt",
      rooms: "Zimmer",
      roomLayout: "Raumaufteilung",
      roomItems: {
        bedrooms: "Schlafzimmer (Anzahl)",
        livingRooms: "Wohnzimmer (Anzahl)",
        bathrooms: "Badezimmer (Anzahl)",
        separateWc: "WC separat (Anzahl)",
        kitchens: "Küche (Anzahl)"
      },
      sanitary: "Sanitär",
      sanitaryItems: {
        shower: "Dusche",
        bathtub: "Badewanne",
        doubleSink: "Doppellavabo",
        guestWc: "Gäste-WC",
        glassShowerWall: "Glasduschwand"
      },
      kitchen: "Küche",
      kitchenItems: {
        oven: "Backofen intensiv",
        cooktop: "Kochfeld",
        refrigerator: "Kühlschrank innen",
        freezer: "Tiefkühler",
        dishwasher: "Geschirrspüler",
        extractorHood: "Dunstabzug / Filter",
        cabinets: "Schränke innen & aussen"
      },
      laundryRoom: "Waschküche",
      laundryItems: {
        washingMachine: "Waschmaschine",
        dryer: "Tumbler"
      },
      location: "Standort",
      locationTypes: {
        apartment: "Wohnung",
        basement: "Keller"
      },
      roomsAndSideRooms: "Räume & Nebenräume",
      additionalItems: {
        balcony: "Balkon",
        terrace: "Terrasse"
      },
      cleaningTypes: {
        machine: "Reinigung mit Maschine",
        manual: "Manuell"
      },
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
      shadingTypes: {
        venetian: "Lamellen",
        rollerShutters: "Rollläden",
        windowShutters: "Fensterläden"
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
      cleaningScope: "Reinigungsumfang",
      scopeItems: {
        full: "Komplett (Abgabestandard)",
        floors: "Böden",
        doors: "Türen",
        windows: "Fenster",
        cabinets: "Schränke",
        limescale: "Kalk entfernen",
        grout: "Fugen reinigen"
      },
      condition: "Zustand",
      conditions: {
        normal: "Normal",
        heavilySoiled: "Stark verschmutzt",
        nicotine: "Nikotin",
        construction: "Baustelle"
      },
      pets: "Haustiere",
      handoverDate: "Abgabetermin",
      handoverOptions: {
        inspection: "Abnahme mit Verwaltung",
        guarantee: "Abnahmegarantie"
      },
      scheduleAndPlanning: "TERMIN & PLANUNG",
      movingDate: "Umzugsdatum *",
      cleaningDate: "Reinigungsdatum *",
      timeWindow: "Zeitfenster",
      from: "Von",
      to: "Bis",
      scheduleOptions: {
        flexible: "Flexibel",
        express: "Express / dringend"
      },
      workDuration: "Arbeitsdauer",
      durations: {
        hours24: "2–4 Stunden",
        halfDay: "Halbtags",
        fullDay: "Ganztags",
        multiday: "Mehrtägig"
      },
      accessKey: "Zugang / Schlüssel",
      accessOptions: {
        inPerson: "Persönlich",
        key: "Schlüssel",
        management: "Verwaltung",
        neighbor: "Nachbar",
        keyBox: "Schlüsselbox"
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
      contactPerson: "Personne de contact",
      phone: "Téléphone *",
      email: "Email *",
      addressesTitle: "Adresses",
      pickupAddress: "Adresse de retrait (Rue, NPA, Ville) *",
      deliveryAddress: "Adresse de livraison (Rue, NPA, Ville) *",
      service: "Service",
      services: {
        moving: "Déménagement",
        transport: "Transport",
        cleaning: "Nettoyage final",
        combo: "Forfait complet (Déménagement + Nettoyage)"
      },
      movingDetails: "DÉMÉNAGEMENT – DÉTAILS",
      objectFromTo: "Propriété (Retrait / Livraison)",
      propertyType: "Type de bien",
      objectTypes: {
        apartment: "Appartement",
        house: "Maison",
        office: "Bureau",
        commercial: "Commercial"
      },
      roomsFromTo: "Pièces (de / vers)",
      livingArea: "Surface habitable (m²)",
      householdSize: "Ménage (personnes / postes de travail)",
      scope: "Ampleur",
      scopes: {
        small: "Petit (1–2 pièces)",
        medium: "Moyen (3–4 pièces)",
        large: "Grand (5+ pièces)",
        veryLarge: "Très grand / vaste"
      },
      inventory: "Inventaire (Détail)",
      inventoryItems: {
        sofa: "Canapé",
        bed: "Lit",
        wardrobe: "Armoire",
        table: "Table",
        chairs: "Chaises",
        washingMachine: "Lave-linge",
        dryer: "Sèche-linge",
        fridge: "Réfrigérateur",
        tv: "TV",
        boxes: "Cartons",
        plants: "Plantes",
        bulky: "Encombrants"
      },
      furtherDetails: "Autres détails",
      specialTransport: "Transports spéciaux",
      specialItems: {
        piano: "Piano",
        safe: "Coffre-fort",
        aquarium: "Aquarium",
        art: "Art",
        sensitive: "Sensible",
        heavy: "Très lourd (>100kg)"
      },
      accessLogistics: "Accès & Logistique (de / vers)",
      floor: "Étage",
      elevatorSizes: {
        small: "Petit",
        medium: "Moyen",
        large: "Grand"
      },
      parking: "Parking",
      reservedParking: "Parking réservé",
      distanceParking: "Distance parking → entrée (m)",
      accessPossible: {
        yes: "Oui",
        no: "Non"
      },
      stairwell: "Cage d'escalier",
      stairwellTypes: {
        narrow: "Étroite",
        normal: "Normale",
        large: "Grande"
      },
      difficulties: "Difficultés",
      difficultyItems: {
        noElevator: "Pas d'ascenseur",
        longPaths: "Longs trajets",
        narrowStairs: "Escaliers étroits",
        difficultAccess: "Accès difficile",
        timeConstraints: "Contraintes de temps (gérance)",
        hardAccess: "Pièces difficiles d'accès"
      },
      servicesProvided: "Prestations",
      serviceOptions: {
        transport: "Transport",
        packing: "Service d'emballage",
        unpacking: "Emballage / Déballage",
        demontage: "Démontage de meubles",
        assembly: "Montage de meubles",
        disposal: "Élimination",
        cleaning: "Nettoyage"
      },
      material: "Matériel",
      materialItems: {
        boxes: "Cartons de déménagement",
        packaging: "Matériel d'emballage",
        foilBlankets: "Film de protection / couvertures"
      },
      cleaningDetails: "NETTOYAGE – DÉTAILS",
      cleaningObject: "Propriété",
      rooms: "Pièces",
      roomLayout: "Disposition",
      roomItems: {
        bedrooms: "Chambres (nombre)",
        livingRooms: "Salons (nombre)",
        bathrooms: "Salles de bain (nombre)",
        separateWc: "WC séparés (nombre)",
        kitchens: "Cuisines (nombre)"
      },
      sanitary: "Sanitaires",
      sanitaryItems: {
        shower: "Douche",
        bathtub: "Baignoire",
        doubleSink: "Double lavabo",
        guestWc: "WC visiteurs",
        glassShowerWall: "Paroi de douche en verre"
      },
      kitchen: "Cuisine",
      kitchenItems: {
        oven: "Four intensif",
        cooktop: "Plaque de cuisson",
        refrigerator: "Réfrigérateur intérieur",
        freezer: "Congélateur",
        dishwasher: "Lave-vaisselle",
        extractorHood: "Hotte / filtre",
        cabinets: "Armoires intérieur & extérieur"
      },
      laundryRoom: "Buanderie",
      laundryItems: {
        washingMachine: "Lave-linge",
        dryer: "Sèche-linge"
      },
      location: "Emplacement",
      locationTypes: {
        apartment: "Appartement",
        basement: "Sous-sol"
      },
      roomsAndSideRooms: "Pièces & Pièces annexes",
      additionalItems: {
        balcony: "Balcon",
        terrace: "Terrasse"
      },
      cleaningTypes: {
        machine: "Nettoyage avec machine",
        manual: "Manuel"
      },
      otherRoomItems: {
        basement: "Sous-sol",
        attic: "Grenier",
        garage: "Garage",
        storageRoom: "Réduit"
      },
      windowsShading: "Fenêtres & Ombrage",
      windowsInfo: "Fenêtres (nombre)",
      windowTypes: {
        standard: "Standard",
        floorToCeiling: "Fenêtres du sol au plafond",
        roofWindows: "Fenêtres de toit",
        largeSurfaces: "Grandes surfaces",
        hardToAccess: "Difficiles d'accès"
      },
      shadingTypes: {
        venetian: "Stores à lamelles",
        rollerShutters: "Volets roulants",
        windowShutters: "Volets de fenêtres"
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
      cleaningScope: "Portée du nettoyage",
      scopeItems: {
        full: "Complet (standard de remise)",
        floors: "Sols",
        doors: "Portes",
        windows: "Fenêtres",
        cabinets: "Armoires",
        limescale: "Enlever le calcaire",
        grout: "Nettoyer les joints"
      },
      condition: "État",
      conditions: {
        normal: "Normal",
        heavilySoiled: "Très sale",
        nicotine: "Nicotine",
        construction: "Chantier"
      },
      pets: "Animaux de compagnie",
      handoverDate: "Remise",
      handoverOptions: {
        inspection: "Visite avec la gérance",
        guarantee: "Garantie de remise"
      },
      scheduleAndPlanning: "CALENDRIER & PLANIFICATION",
      movingDate: "Date de déménagement *",
      cleaningDate: "Date de nettoyage *",
      timeWindow: "Fenêtre horaire",
      from: "De",
      to: "À",
      scheduleOptions: {
        flexible: "Flexible",
        express: "Express / urgent"
      },
      workDuration: "Durée du travail",
      durations: {
        hours24: "2–4 heures",
        halfDay: "Demi-journée",
        fullDay: "Journée entière",
        multiday: "Plusieurs jours"
      },
      accessKey: "Accès / Clés",
      accessOptions: {
        inPerson: "En personne",
        key: "Clé",
        management: "Gérance",
        neighbor: "Voisin",
        keyBox: "Boîte à clés"
      },
      upload: "Upload",
      uploads: {
        photos: "Photos",
        videos: "Vidéos",
        documents: "Documents"
      },
      notes: "Remarques (facultatif)"
    }
  },

  specialCleaning: {
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
        commercial: "Commercial",
        constructionSite: "Construction site",
        gastronomy: "Gastronomy"
      },
      area: "Area (m², approx.)",
      typeOfSpecialCleaning: "Type of Special Cleaning",
      cleaningTypes: {
        deepCleaning: "Deep cleaning (intensive)",
        afterRenovation: "After renovation",
        afterConstruction: "After construction work",
        nicotineCleaning: "Nicotine cleaning",
        messieApartment: "Messie apartment",
        disinfection: "Disinfection",
        odorNeutralization: "Odor neutralization"
      },
      cleaningAreas: "Cleaning Areas",
      areas: {
        floors: "Floors",
        walls: "Walls",
        ceilings: "Ceilings",
        doorsFrames: "Doors / Frames",
        windows: "Windows",
        kitchen: "Kitchen",
        sanitary: "Sanitary"
      },
      specialContamination: "Special Contamination",
      contaminationItems: {
        nicotine: "Nicotine",
        grease: "Grease",
        mold: "Mold",
        limescale: "Limescale",
        cement: "Cement / Construction dirt",
        paintGlue: "Paint / Glue residue",
        heavyGeneral: "Heavy contamination in general"
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
      cleaningMethods: "Cleaning Methods",
      methods: {
        machine: "Machine cleaning",
        highPressure: "High pressure",
        specialChemistry: "Special chemistry",
        disinfection: "Disinfection"
      },
      contaminationLevel: "Contamination Level",
      levels: {
        normal: "Normal",
        heavy: "Heavy",
        veryHeavy: "Very heavy"
      },
      accessLogistics: "Access & Logistics",
      floor: "Floor",
      elevatorSizes: {
        yes: "Yes",
        no: "No"
      },
      parking: "Parking",
      accessPossible: {
        possible: "Possible",
        restricted: "Restricted"
      },
      difficulties: "Difficulties",
      difficultyItems: {
        noElevator: "No elevator",
        longPaths: "Long paths",
        narrowRooms: "Narrow rooms",
        hardAccess: "Difficult access"
      },
      schedule: "Schedule",
      date: "Date *",
      from: "From",
      to: "To",
      scheduleOptions: {
        flexible: "Flexible",
        express: "Express"
      },
      workDuration: "Work Duration",
      durations: {
        halfDay: "Half day",
        fullDay: "Full day",
        multiday: "Multi-day",
        custom: "Custom"
      },
      additionalServices: "Additional Services",
      additionalOptions: {
        disposal: "Disposal",
        disinfection: "Disinfection",
        odorTreatment: "Odor treatment",
        protectiveMeasures: "Protective measures"
      },
      upload: "Upload",
      uploads: {
        photos: "Photos",
        videos: "Videos"
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
        commercial: "Gewerbe",
        constructionSite: "Baustelle",
        gastronomy: "Gastronomie"
      },
      area: "Fläche (m², ca.)",
      typeOfSpecialCleaning: "Art der Spezialreinigung",
      cleaningTypes: {
        deepCleaning: "Grundreinigung (intensiv)",
        afterRenovation: "Nach Renovation",
        afterConstruction: "Nach Bauarbeiten",
        nicotineCleaning: "Nikotinreinigung",
        messieApartment: "Messie-Wohnung",
        disinfection: "Desinfektion",
        odorNeutralization: "Geruchsneutralisation"
      },
      cleaningAreas: "Reinigungsbereiche",
      areas: {
        floors: "Böden",
        walls: "Wände",
        ceilings: "Decken",
        doorsFrames: "Türen / Rahmen",
        windows: "Fenster",
        kitchen: "Küche",
        sanitary: "Sanitär"
      },
      specialContamination: "Spezielle Verschmutzungen",
      contaminationItems: {
        nicotine: "Nikotin",
        grease: "Fett",
        mold: "Schimmel",
        limescale: "Kalk",
        cement: "Zement / Bauverschmutzung",
        paintGlue: "Farbe / Kleberreste",
        heavyGeneral: "Starke Verschmutzung allgemein"
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
      cleaningMethods: "Reinigungsmethoden",
      methods: {
        machine: "Maschinenreinigung",
        highPressure: "Hochdruck",
        specialChemistry: "Spezialchemie",
        disinfection: "Desinfektion"
      },
      contaminationLevel: "Verschmutzungsgrad",
      levels: {
        normal: "Normal",
        heavy: "Stark",
        veryHeavy: "Sehr stark"
      },
      accessLogistics: "Zugang & Logistik",
      floor: "Etage",
      elevatorSizes: {
        yes: "Ja",
        no: "Nein"
      },
      parking: "Parkplatz",
      accessPossible: {
        possible: "Möglich",
        restricted: "Eingeschränkt"
      },
      difficulties: "Erschwernisse",
      difficultyItems: {
        noElevator: "Kein Lift",
        longPaths: "Lange Wege",
        narrowRooms: "Enge Räume",
        hardAccess: "Schwieriger Zugang"
      },
      schedule: "Termin",
      date: "Datum *",
      from: "Von",
      to: "Bis",
      scheduleOptions: {
        flexible: "Flexibel",
        express: "Express"
      },
      workDuration: "Arbeitsdauer",
      durations: {
        halfDay: "Halbtags",
        fullDay: "Ganztags",
        multiday: "Mehrtägig",
        custom: "Individuell"
      },
      additionalServices: "Zusatzleistungen",
      additionalOptions: {
        disposal: "Entsorgung",
        disinfection: "Desinfektion",
        odorTreatment: "Geruchsbehandlung",
        protectiveMeasures: "Schutzmassnahmen"
      },
      upload: "Upload",
      uploads: {
        photos: "Fotos",
        videos: "Videos"
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
        commercial: "Local commercial",
        constructionSite: "Chantier",
        gastronomy: "Gastronomie"
      },
      area: "Surface (m², env.)",
      typeOfSpecialCleaning: "Type de Nettoyage Spécial",
      cleaningTypes: {
        deepCleaning: "Nettoyage en profondeur (intensif)",
        afterRenovation: "Après rénovation",
        afterConstruction: "Après travaux de construction",
        nicotineCleaning: "Nettoyage nicotine",
        messieApartment: "Appartement syndrome de Diogène",
        disinfection: "Désinfection",
        odorNeutralization: "Neutralisation des odeurs"
      },
      cleaningAreas: "Zones de Nettoyage",
      areas: {
        floors: "Sols",
        walls: "Murs",
        ceilings: "Plafonds",
        doorsFrames: "Portes / Cadres",
        windows: "Fenêtres",
        kitchen: "Cuisine",
        sanitary: "Sanitaires"
      },
      specialContamination: "Salissures Spéciales",
      contaminationItems: {
        nicotine: "Nicotine",
        grease: "Graisse",
        mold: "Moisissure",
        limescale: "Calcaire",
        cement: "Ciment / Saleté de chantier",
        paintGlue: "Peinture / Restes de colle",
        heavyGeneral: "Forte salissure en général"
      },
      floorTypes: "Types de Sol",
      floors: {
        parquet: "Parquet",
        laminate: "Stratifié",
        tiles: "Carrelage",
        stone: "Pierre",
        carpet: "Moquette",
        pvc: "PVC"
      },
      cleaningMethods: "Méthodes de Nettoyage",
      methods: {
        machine: "Nettoyage à la machine",
        highPressure: "Haute pression",
        specialChemistry: "Chimie spéciale",
        disinfection: "Désinfection"
      },
      contaminationLevel: "Degré de Salissure",
      levels: {
        normal: "Normal",
        heavy: "Fort",
        veryHeavy: "Très fort"
      },
      accessLogistics: "Accès & Logistique",
      floor: "Étage",
      elevatorSizes: {
        yes: "Oui",
        no: "Non"
      },
      parking: "Parking",
      accessPossible: {
        possible: "Possible",
        restricted: "Restreint"
      },
      difficulties: "Difficultés",
      difficultyItems: {
        noElevator: "Pas d'ascenseur",
        longPaths: "Longs trajets",
        narrowRooms: "Pièces étroites",
        hardAccess: "Accès difficile"
      },
      schedule: "Calendrier",
      date: "Date *",
      from: "De",
      to: "À",
      scheduleOptions: {
        flexible: "Flexible",
        express: "Express"
      },
      workDuration: "Durée du Travail",
      durations: {
        halfDay: "Demi-journée",
        fullDay: "Journée entière",
        multiday: "Plusieurs jours",
        custom: "Individuel"
      },
      additionalServices: "Services Supplémentaires",
      additionalOptions: {
        disposal: "Élimination",
        disinfection: "Désinfection",
        odorTreatment: "Traitement des odeurs",
        protectiveMeasures: "Mesures de protection"
      },
      upload: "Upload",
      uploads: {
        photos: "Photos",
        videos: "Vidéos"
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
