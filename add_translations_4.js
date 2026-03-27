const fs = require('fs');
const path = require('path');

const locales = ['en', 'de', 'fr'];
const files = locales.map(l => path.join(__dirname, 'messages', `${l}.json`));

const newData = {
  gastronomyCleaning: {
    en: {
      contact: "Contact",
      company: "Business / Company *",
      contactPerson: "Contact person",
      phone: "Phone *",
      email: "Email *",
      property: "Property",
      address: "Address (Street, ZIP, City) *",
      businessType: "Business type",
      types: {
        restaurant: "Restaurant",
        cafeBar: "Café / Bar",
        hotel: "Hotel",
        canteen: "Canteen / Large kitchen",
        catering: "Catering",
        takeAway: "Take-away"
      },
      area: "Area (m², approx.)",
      cleaningAreas: "Cleaning Areas",
      kitchenMain: "Kitchen (Main area)",
      kitchenItems: {
        floor: "Kitchen floor",
        surfaces: "Work surfaces",
        stations: "Cooking stations",
        appliances: "Appliances / Machines",
        fridges: "Refrigerators / Cold rooms"
      },
      appliancesTech: "Appliances & Technology",
      appliancesItems: {
        oven: "Oven",
        grill: "Grill / Stove",
        fryer: "Fryer",
        extractorHook: "Extractor hood / Grease filter"
      },
      diningRoom: "Dining Room",
      diningItems: {
        tablesChairs: "Tables / Chairs",
        floor: "Floor",
        barArea: "Bar area"
      },
      sanitary: "Sanitary Facilities",
      sanitaryItems: {
        wc: "WC",
        sink: "Sink",
        mirrors: "Mirrors"
      },
      sideRooms: "Side Rooms",
      sideItems: {
        storage: "Storage",
        coldRoom: "Cold room",
        staffRooms: "Staff rooms"
      },
      floorTypes: "Floor Type",
      floors: {
        tiles: "Tiles",
        stone: "Stone",
        pvc: "PVC / Vinyl",
        other: "Other"
      },
      contaminationLevel: "Contamination Level",
      levels: {
        normal: "Normal",
        grease: "Grease contamination",
        heavy: "Heavily soiled",
        intensive: "Intensive kitchen cleaning"
      },
      hygieneRequirements: "Hygiene & Requirements",
      hygieneItems: {
        haccp: "HACCP required",
        disinfection: "Disinfection required",
        foodSensitve: "Food area sensitive",
        documentation: "Documentation / Protocol needed"
      },
      interval: "Interval",
      intervals: {
        daily: "Daily",
        multipleTimes: "Multiple times per week",
        weekly: "Weekly",
        custom: "Custom"
      },
      serviceTimes: "Service Times",
      times: {
        earlyMorning: "Early morning",
        duringOperation: "During operation",
        afterOperation: "After operation",
        night: "Night",
        flexible: "Flexible"
      },
      additionalServices: "Additional Services",
      additionalOptions: {
        greaseFilter: "Grease filter cleaning",
        extractorCleaning: "Extractor cleaning",
        deepCleaning: "Deep cleaning kitchen",
        glassWindow: "Glass / Windows",
        floorMachine: "Floor machine / Special cleaning"
      },
      accessOrganization: "Access & Organization",
      accessToProperty: "Access to the property",
      accessOptions: {
        key: "Key available",
        code: "Code / Access system",
        staffOnSite: "Staff on site"
      },
      parking: "Parking",
      parkingOptions: {
        yes: "Yes",
        no: "No"
      },
      start: "Start",
      startDate: "Start date *",
      contractType: "Contract Type",
      contracts: {
        ongoing: "Ongoing",
        trial: "Trial phase",
        oneTime: "One-time"
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
      company: "Betrieb / Firma *",
      contactPerson: "Ansprechperson",
      phone: "Telefon *",
      email: "E-Mail *",
      property: "Objekt",
      address: "Adresse (Strasse, PLZ, Ort) *",
      businessType: "Betriebsart",
      types: {
        restaurant: "Restaurant",
        cafeBar: "Café / Bar",
        hotel: "Hotel",
        canteen: "Grossküche",
        catering: "Catering",
        takeAway: "Take-away"
      },
      area: "Fläche (m², ca.)",
      cleaningAreas: "Reinigungsbereiche",
      kitchenMain: "Küche (Hauptbereich)",
      kitchenItems: {
        floor: "Küchenboden",
        surfaces: "Arbeitsflächen",
        stations: "Kochstationen",
        appliances: "Geräte / Maschinen",
        fridges: "Kühlschränke / Kühlräume"
      },
      appliancesTech: "Geräte & Technik",
      appliancesItems: {
        oven: "Backofen",
        grill: "Grill / Herd",
        fryer: "Fritteuse",
        extractorHook: "Dunstabzug / Fettfilter"
      },
      diningRoom: "Gastraum",
      diningItems: {
        tablesChairs: "Tische / Stühle",
        floor: "Boden",
        barArea: "Barbereich"
      },
      sanitary: "Sanitäranlagen",
      sanitaryItems: {
        wc: "WC",
        sink: "Lavabo",
        mirrors: "Spiegel"
      },
      sideRooms: "Nebenräume",
      sideItems: {
        storage: "Lager",
        coldRoom: "Kühlraum",
        staffRooms: "Personalräume"
      },
      floorTypes: "Bodenart",
      floors: {
        tiles: "Fliesen",
        stone: "Stein",
        pvc: "PVC / Vinyl",
        other: "Andere"
      },
      contaminationLevel: "Verschmutzungsgrad",
      levels: {
        normal: "Normal",
        grease: "Fettverschmutzung",
        heavy: "Stark verschmutzt",
        intensive: "Intensive Küchenreinigung"
      },
      hygieneRequirements: "Hygiene & Anforderungen",
      hygieneItems: {
        haccp: "HACCP erforderlich",
        disinfection: "Desinfektion erforderlich",
        foodSensitve: "Lebensmittelbereich sensibel",
        documentation: "Dokumentation / Protokoll nötig"
      },
      interval: "Intervall",
      intervals: {
        daily: "Täglich",
        multipleTimes: "Mehrmals pro Woche",
        weekly: "Wöchentlich",
        custom: "Individuell"
      },
      serviceTimes: "Einsatzzeiten",
      times: {
        earlyMorning: "Früh morgens",
        duringOperation: "Während Betrieb",
        afterOperation: "Nach Betrieb",
        night: "Nacht",
        flexible: "Flexibel"
      },
      additionalServices: "Zusatzleistungen",
      additionalOptions: {
        greaseFilter: "Fettfilter Reinigung",
        extractorCleaning: "Dunstabzug Reinigung",
        deepCleaning: "Tiefenreinigung Küche",
        glassWindow: "Glas / Fenster",
        floorMachine: "Bodenmaschine / Spezialreinigung"
      },
      accessOrganization: "Zugang & Organisation",
      accessToProperty: "Zugang zum Objekt",
      accessOptions: {
        key: "Schlüssel vorhanden",
        code: "Code / Zugangssystem",
        staffOnSite: "Personal vor Ort"
      },
      parking: "Parkplatz",
      parkingOptions: {
        yes: "Ja",
        no: "Nein"
      },
      start: "Start",
      startDate: "Startdatum *",
      contractType: "Vertragsart",
      contracts: {
        ongoing: "Laufend",
        trial: "Testphase",
        oneTime: "Einmalig"
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
      company: "Établissement / Entreprise *",
      contactPerson: "Personne de contact",
      phone: "Téléphone *",
      email: "Email *",
      property: "Propriété",
      address: "Adresse (Rue, NPA, Ville) *",
      businessType: "Type d'établissement",
      types: {
        restaurant: "Restaurant",
        cafeBar: "Café / Bar",
        hotel: "Hôtel",
        canteen: "Cuisine industrielle",
        catering: "Traiteur",
        takeAway: "Take-away"
      },
      area: "Surface (m², env.)",
      cleaningAreas: "Zones de nettoyage",
      kitchenMain: "Cuisine (Zone principale)",
      kitchenItems: {
        floor: "Sol de la cuisine",
        surfaces: "Plans de travail",
        stations: "Stations de cuisson",
        appliances: "Appareils / Machines",
        fridges: "Réfrigérateurs / Chambres froides"
      },
      appliancesTech: "Appareils et Technique",
      appliancesItems: {
        oven: "Four",
        grill: "Grill / Cuisinière",
        fryer: "Friteuse",
        extractorHook: "Hotte / Filtre à graisse"
      },
      diningRoom: "Salle de restaurant",
      diningItems: {
        tablesChairs: "Tables / Chaises",
        floor: "Sol",
        barArea: "Espace bar"
      },
      sanitary: "Sanitaires",
      sanitaryItems: {
        wc: "WC",
        sink: "Lavabo",
        mirrors: "Miroirs"
      },
      sideRooms: "Pièces annexes",
      sideItems: {
        storage: "Stockage",
        coldRoom: "Chambre froide",
        staffRooms: "Salles du personnel"
      },
      floorTypes: "Type de sol",
      floors: {
        tiles: "Carrelage",
        stone: "Pierre",
        pvc: "PVC / Vinyle",
        other: "Autres"
      },
      contaminationLevel: "Degré de salissure",
      levels: {
        normal: "Normal",
        grease: "Salissures grasses",
        heavy: "Très sale",
        intensive: "Nettoyage intensif de cuisine"
      },
      hygieneRequirements: "Hygiène et Exigences",
      hygieneItems: {
        haccp: "HACCP requis",
        disinfection: "Désinfection requise",
        foodSensitve: "Zone alimentaire sensible",
        documentation: "Documentation / Protocole nécessaire"
      },
      interval: "Intervalle",
      intervals: {
        daily: "Quotidien",
        multipleTimes: "Plusieurs fois par semaine",
        weekly: "Hebdomadaire",
        custom: "Individuel"
      },
      serviceTimes: "Heures de service",
      times: {
        earlyMorning: "Tôt le matin",
        duringOperation: "Pendant l'exploitation",
        afterOperation: "Après l'exploitation",
        night: "La nuit",
        flexible: "Flexible"
      },
      additionalServices: "Services supplémentaires",
      additionalOptions: {
        greaseFilter: "Nettoyage filtre à graisse",
        extractorCleaning: "Nettoyage hotte",
        deepCleaning: "Nettoyage en profondeur cuisine",
        glassWindow: "Verre / Fenêtres",
        floorMachine: "Machine pour sol / Nettoyage spécial"
      },
      accessOrganization: "Accès & Organisation",
      accessToProperty: "Accès à la propriété",
      accessOptions: {
        key: "Clé disponible",
        code: "Code / Système d'accès",
        staffOnSite: "Personnel sur place"
      },
      parking: "Parking",
      parkingOptions: {
        yes: "Oui",
        no: "Non"
      },
      start: "Début",
      startDate: "Date de début *",
      contractType: "Type de contrat",
      contracts: {
        ongoing: "En cours",
        trial: "Phase de test",
        oneTime: "Unique"
      },
      upload: "Upload",
      uploads: {
        photos: "Photos",
        documents: "Documents"
      },
      notes: "Remarques (facultatif)"
    }
  },
  relocation: {
    en: {
      contact: "Contact",
      nameCompany: "Name / Company *",
      contactPerson: "Contact person",
      phone: "Phone *",
      email: "Email *",
      addressesTitle: "Addresses",
      pickupAddress: "Pickup address (Street, ZIP, City) *",
      deliveryAddress: "Delivery address (Street, ZIP, City) *",
      movingType: "Moving Type",
      types: {
        private: "Private moving",
        office: "Office moving",
        transport: "Transport (single items)",
        internal: "Internal moving",
        company: "Company moving"
      },
      objectfromTo: "Property (from / to)",
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
      scope: "Scope (for price calculation)",
      scopes: {
        small: "Small (1–2 rooms)",
        medium: "Medium (3–4 rooms)",
        large: "Large (5+ rooms)",
        veryLarge: "Very large / extensive"
      },
      inventory: "Inventory / Goods to transport",
      inventoryItems: {
        furniture: "Furniture",
        boxes: "Boxes",
        appliances: "Electrical appliances",
        washingMachine: "Washing machine",
        dryer: "Dryer",
        fridge: "Fridge",
        sofa: "Sofa",
        bed: "Bed",
        wardrobe: "Wardrobe",
        table: "Table",
        plants: "Plants",
        bulky: "Bulky goods"
      },
      furtherDetails: "Further details",
      specialTransport: "Special Transport",
      specialItems: {
        piano: "Piano",
        safe: "Safe",
        aquarium: "Aquarium",
        art: "Art / sensitive",
        heavy: "Very heavy furniture (>100 kg)"
      },
      accessLogistics: "Access & Logistics (from / to)",
      floorPickupDeliv: "Floor (pickup / delivery)",
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
      additionalServices: "Additional Services",
      additionalOptions: {
        packing: "Packing service",
        unpacking: "Packing / unpacking",
        demontage: "Furniture demontage",
        assembly: "Furniture assembly",
        disposal: "Disposal",
        endCleaning: "End cleaning (with guarantee)"
      },
      material: "Material",
      materialItems: {
        boxes: "Moving boxes",
        packaging: "Packaging material",
        foilBlankets: "Protective foil / blankets"
      },
      schedule: "Schedule",
      movingDate: "Moving date *",
      timeWindow: "Time window",
      from: "From *",
      to: "To *",
      scheduleOptions: {
        flexible: "Flexible",
        express: "Express / urgent"
      },
      workDuration: "Work Duration / Deployment",
      durations: {
        hours24: "2–4 hours",
        halfDay: "Half day",
        fullDay: "Full day",
        multiday: "Multi-day",
        custom: "Custom"
      },
      accessKey: "Access / Key",
      accessOptions: {
        client: "Client on site",
        keyAvailable: "Key available",
        management: "Property management",
        neighbor: "Neighbor"
      },
      upload: "Upload (very important)",
      uploads: {
        photos: "Photos",
        videos: "Videos",
        inventory: "Inventory list"
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
      movingType: "Umzugsart",
      types: {
        private: "Privatumzug",
        office: "Büroumzug",
        transport: "Transport (Einzelstücke)",
        internal: "Interner Umzug",
        company: "Firmenumzug"
      },
      objectfromTo: "Objekt (von / nach)",
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
      scope: "Umfang (für Preisberechnung)",
      scopes: {
        small: "Klein (1–2 Zimmer)",
        medium: "Mittel (3–4 Zimmer)",
        large: "Gross (5+ Zimmer)",
        veryLarge: "Sehr gross / umfangreich"
      },
      inventory: "Inventar / Transportgut",
      inventoryItems: {
        furniture: "Möbel",
        boxes: "Kartons",
        appliances: "Elektrogeräte",
        washingMachine: "Waschmaschine",
        dryer: "Tumbler",
        fridge: "Kühlschrank",
        sofa: "Sofa",
        bed: "Bett",
        wardrobe: "Schrank",
        table: "Tisch",
        plants: "Pflanzen",
        bulky: "Sperrgut"
      },
      furtherDetails: "Weitere Angaben",
      specialTransport: "Spezialtransport",
      specialItems: {
        piano: "Klavier",
        safe: "Safe",
        aquarium: "Aquarium",
        art: "Kunst / empfindlich",
        heavy: "Sehr schwere Möbel (>100 kg)"
      },
      accessLogistics: "Zugang & Logistik (von / nach)",
      floorPickupDeliv: "Etage (Abholung / Lieferung)",
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
      additionalServices: "Zusatzleistungen",
      additionalOptions: {
        packing: "Verpackungsservice",
        unpacking: "Ein- / Auspacken",
        demontage: "Möbel Demontage",
        assembly: "Möbel Montage",
        disposal: "Entsorgung",
        endCleaning: "Endreinigung (mit Abnahmegarantie)"
      },
      material: "Material",
      materialItems: {
        boxes: "Umzugskartons",
        packaging: "Verpackungsmaterial",
        foilBlankets: "Schutzfolie / Decken"
      },
      schedule: "Termin",
      movingDate: "Umzugsdatum *",
      timeWindow: "Zeitfenster",
      from: "Von *",
      to: "Bis *",
      scheduleOptions: {
        flexible: "Flexibel",
        express: "Express / dringend"
      },
      workDuration: "Arbeitsdauer / Einsatz",
      durations: {
        hours24: "2–4 Stunden",
        halfDay: "Halbtags",
        fullDay: "Ganztags",
        multiday: "Mehrtägig",
        custom: "Individuell"
      },
      accessKey: "Zugang / Schlüssel",
      accessOptions: {
        client: "Kunde vor Ort",
        keyAvailable: "Schlüssel vorhanden",
        management: "Verwaltung",
        neighbor: "Nachbar"
      },
      upload: "Upload (sehr wichtig)",
      uploads: {
        photos: "Fotos",
        videos: "Videos",
        inventory: "Inventarliste"
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
      movingType: "Type de déménagement",
      types: {
        private: "Déménagement privé",
        office: "Déménagement de bureau",
        transport: "Transport (pièces individuelles)",
        internal: "Déménagement interne",
        company: "Déménagement d'entreprise"
      },
      objectfromTo: "Propriété (de / vers)",
      propertyType: "Type de bien",
      objectTypes: {
        apartment: "Appartement",
        house: "Maison",
        office: "Bureau",
        commercial: "Local commercial"
      },
      roomsFromTo: "Pièces (de / vers)",
      livingArea: "Surface habitable (m²)",
      householdSize: "Ménage (personnes / postes de travail)",
      scope: "Ampleur (pour calcul du prix)",
      scopes: {
        small: "Petit (1–2 pièces)",
        medium: "Moyen (3–4 pièces)",
        large: "Grand (5+ pièces)",
        veryLarge: "Très grand / vaste"
      },
      inventory: "Inventaire / Biens à transporter",
      inventoryItems: {
        furniture: "Meubles",
        boxes: "Cartons",
        appliances: "Appareils électriques",
        washingMachine: "Lave-linge",
        dryer: "Sèche-linge",
        fridge: "Réfrigérateur",
        sofa: "Canapé",
        bed: "Lit",
        wardrobe: "Armoire",
        table: "Table",
        plants: "Plantes",
        bulky: "Encombrants"
      },
      furtherDetails: "Autres détails",
      specialTransport: "Transports spéciaux",
      specialItems: {
        piano: "Piano",
        safe: "Coffre-fort",
        aquarium: "Aquarium",
        art: "Art / sensible",
        heavy: "Meubles très lourds (>100 kg)"
      },
      accessLogistics: "Accès & Logistique (de / vers)",
      floorPickupDeliv: "Étage (retrait / livraison)",
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
        timeConstraints: "Contraintes horaires (gérance)",
        hardAccess: "Pièces difficiles d'accès"
      },
      additionalServices: "Services supplémentaires",
      additionalOptions: {
        packing: "Service d'emballage",
        unpacking: "Emballage / Déballage",
        demontage: "Démontage de meubles",
        assembly: "Montage de meubles",
        disposal: "Élimination",
        endCleaning: "Nettoyage final (avec garantie de remise)"
      },
      material: "Matériel",
      materialItems: {
        boxes: "Cartons de déménagement",
        packaging: "Matériel d'emballage",
        foilBlankets: "Film de protection / couvertures"
      },
      schedule: "Calendrier",
      movingDate: "Date du déménagement *",
      timeWindow: "Fenêtre horaire",
      from: "De *",
      to: "À *",
      scheduleOptions: {
        flexible: "Flexible",
        express: "Express / urgent"
      },
      workDuration: "Durée du travail / Intervention",
      durations: {
        hours24: "2–4 heures",
        halfDay: "Demi-journée",
        fullDay: "Journée entière",
        multiday: "Plusieurs jours",
        custom: "Individuel"
      },
      accessKey: "Accès / Clés",
      accessOptions: {
        client: "Client sur place",
        keyAvailable: "Clé disponible",
        management: "Gérance",
        neighbor: "Voisin"
      },
      upload: "Upload (très important)",
      uploads: {
        photos: "Photos",
        videos: "Vidéos",
        inventory: "Liste d'inventaire"
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
