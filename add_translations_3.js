const fs = require('fs');
const path = require('path');

const locales = ['en', 'de', 'fr'];
const files = locales.map(l => path.join(__dirname, 'messages', `${l}.json`));

const newData = {
  disposal: {
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
        basement: "Basement",
        attic: "Attic",
        garage: "Garage",
        office: "Office",
        commercial: "Commercial"
      },
      areaOptional: "Area (m², optional)",
      typeOfClearance: "Type of Clearance",
      clearanceTypes: {
        singlePickup: "Single pickup (few items)",
        partial: "Partial clearance",
        full: "Full clearance",
        apartmentLiquidation: "Apartment liquidation",
        afterMoving: "Clearance after moving",
        afterDeath: "Clearance after death"
      },
      volume: "Volume",
      volumes: {
        small: "Small (1–3 m³)",
        medium: "Medium (4–10 m³)",
        large: "Large (10–20 m³)",
        veryLarge: "Very large (20+ m³)"
      },
      estimatedVolume: "Estimated volume (m³):",
      materials: "Materials / Content (Detail)",
      materialItems: {
        furniture: "Furniture",
        sofa: "Sofa",
        bed: "Bed",
        wardrobe: "Wardrobe",
        table: "Table",
        electronics: "Electronics",
        fridge: "Fridge",
        washingMachine: "Washing machine",
        tv: "TV",
        wood: "Wood",
        metal: "Metal",
        glass: "Glass",
        cardboard: "Cardboard",
        paper: "Paper",
        textiles: "Textiles",
        bulkyWaste: "Bulky waste",
        mixedWaste: "Mixed waste"
      },
      hazardous: "Hazardous Materials",
      hazardousItems: {
        paint: "Paint",
        chemicals: "Chemicals",
        batteries: "Batteries",
        electronicWaste: "Electronic waste"
      },
      demontagePreparation: "Demontage & Preparation",
      prepItems: {
        furnitureDemontage: "Furniture must be disassembled",
        kitchenDemontage: "Dismantle kitchen / built-ins",
        allReady: "Everything already set up",
        sortingHelp: "Support needed with sorting"
      },
      accessLogistics: "Access & Logistics",
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
        timeConstraints: "Time constraints (management)"
      },
      additionalServices: "Additional Services",
      additionalOptions: {
        demontage: "Demontage",
        cleaningAfter: "Cleaning after clearance",
        endCleaningGuarantee: "End cleaning with guarantee",
        transportNew: "Transport to new location",
        recycling: "Professional recycling / disposal"
      },
      schedule: "Term",
      date: "Date *",
      timeWindow: "Time window (optional)",
      from: "From",
      to: "To",
      scheduleOptions: {
        flexible: "Flexible",
        express: "Express / urgent"
      },
      workDuration: "Work Duration (for planning & price)",
      durations: {
        hours12: "1–2 hours",
        halfDay: "Half day",
        fullDay: "Full day",
        multiday: "Multi-day",
        custom: "Custom"
      },
      accessKey: "Access / Key",
      accessOptions: {
        inPerson: "Personally on site",
        keyAvailable: "Key available",
        mailbox: "Mailbox",
        neighbor: "Neighbor",
        management: "Property management",
        keyBox: "Key box"
      },
      upload: "Upload (very important)",
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
        basement: "Keller",
        attic: "Estrich",
        garage: "Garage",
        office: "Büro",
        commercial: "Gewerbe"
      },
      areaOptional: "Fläche (m², optional)",
      typeOfClearance: "Art der Räumung",
      clearanceTypes: {
        singlePickup: "Einzelabholung (wenige Gegenstände)",
        partial: "Teilräumung",
        full: "Komplett Räumung",
        apartmentLiquidation: "Wohnungsauflösung",
        afterMoving: "Räumung nach Umzug",
        afterDeath: "Räumung nach Todesfall"
      },
      volume: "Umfang / Volumen",
      volumes: {
        small: "Klein (1–3 m³)",
        medium: "Mittel (4–10 m³)",
        large: "Gross (10–20 m³)",
        veryLarge: "Sehr gross (20+ m³)"
      },
      estimatedVolume: "Geschätztes Volumen (m³):",
      materials: "Material / Inhalt (Detail)",
      materialItems: {
        furniture: "Möbel",
        sofa: "Sofa",
        bed: "Bett",
        wardrobe: "Schrank",
        table: "Tisch",
        electronics: "Elektrogeräte",
        fridge: "Kühlschrank",
        washingMachine: "Waschmaschine",
        tv: "TV",
        wood: "Holz",
        metal: "Metall",
        glass: "Glas",
        cardboard: "Karton",
        paper: "Papier",
        textiles: "Textilien",
        bulkyWaste: "Sperrgut",
        mixedWaste: "Mischabfall"
      },
      hazardous: "Sonderabfälle",
      hazardousItems: {
        paint: "Farbe",
        chemicals: "Chemikalien",
        batteries: "Batterien",
        electronicWaste: "Elektro-Sondermüll"
      },
      demontagePreparation: "Demontage & Vorbereitung",
      prepItems: {
        furnitureDemontage: "Möbel müssen demontiert werden",
        kitchenDemontage: "Küche / Einbauten demontieren",
        allReady: "Alles bereits bereitgestellt",
        sortingHelp: "Unterstützung beim Sortieren nötig"
      },
      accessLogistics: "Zugang & Logistik",
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
        timeConstraints: "Zeitvorgaben (Verwaltung)"
      },
      additionalServices: "Zusatzleistungen",
      additionalOptions: {
        demontage: "Demontage",
        cleaningAfter: "Reinigung nach Räumung",
        endCleaningGuarantee: "Endreinigung mit Abnahmegarantie",
        transportNew: "Transport zu neuem Standort",
        recycling: "Recycling / fachgerechte Entsorgung"
      },
      schedule: "Termin",
      date: "Datum *",
      timeWindow: "Zeitfenster (optional)",
      from: "Von",
      to: "Bis",
      scheduleOptions: {
        flexible: "Flexibel",
        express: "Express / dringend"
      },
      workDuration: "Arbeitsdauer (für Planung & Preis)",
      durations: {
        hours12: "1–2 Stunden",
        halfDay: "Halbtags",
        fullDay: "Ganztags",
        multiday: "Mehrtägig",
        custom: "Individuell"
      },
      accessKey: "Zugang / Schlüssel",
      accessOptions: {
        inPerson: "Persönlich vor Ort",
        keyAvailable: "Schlüssel vorhanden",
        mailbox: "Briefkasten",
        neighbor: "Nachbar",
        management: "Verwaltung",
        keyBox: "Schlüsselbox"
      },
      upload: "Upload (sehr wichtig)",
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
        basement: "Sous-sol",
        attic: "Grenier",
        garage: "Garage",
        office: "Bureau",
        commercial: "Commercial"
      },
      areaOptional: "Surface (m², facultatif)",
      typeOfClearance: "Type de débarras",
      clearanceTypes: {
        singlePickup: "Enlèvement unique (quelques objets)",
        partial: "Débarras partiel",
        full: "Débarras complet",
        apartmentLiquidation: "Liquidation d'appartement",
        afterMoving: "Débarras après déménagement",
        afterDeath: "Débarras après décès"
      },
      volume: "Volume",
      volumes: {
        small: "Petit (1–3 m³)",
        medium: "Moyen (4–10 m³)",
        large: "Grand (10–20 m³)",
        veryLarge: "Très grand (20+ m³)"
      },
      estimatedVolume: "Volume estimé (m³) :",
      materials: "Matériaux / Contenu (Détail)",
      materialItems: {
        furniture: "Meubles",
        sofa: "Canapé",
        bed: "Lit",
        wardrobe: "Armoire",
        table: "Table",
        electronics: "Électronique",
        fridge: "Réfrigérateur",
        washingMachine: "Lave-linge",
        tv: "Télévision",
        wood: "Bois",
        metal: "Métal",
        glass: "Verre",
        cardboard: "Carton",
        paper: "Papier",
        textiles: "Textiles",
        bulkyWaste: "Encombrants",
        mixedWaste: "Déchets mixtes"
      },
      hazardous: "Déchets dangereux",
      hazardousItems: {
        paint: "Peinture",
        chemicals: "Produits chimiques",
        batteries: "Batteries",
        electronicWaste: "Déchets électroniques spéciaux"
      },
      demontagePreparation: "Démontage & Préparation",
      prepItems: {
        furnitureDemontage: "Les meubles doivent être démontés",
        kitchenDemontage: "Démonter la cuisine / installations",
        allReady: "Tout est déjà prêt",
        sortingHelp: "Aide au tri nécessaire"
      },
      accessLogistics: "Accès & Logistique",
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
        timeConstraints: "Contraintes de temps (gérance)"
      },
      additionalServices: "Services supplémentaires",
      additionalOptions: {
        demontage: "Démontage",
        cleaningAfter: "Nettoyage après débarras",
        endCleaningGuarantee: "Nettoyage final avec garantie",
        transportNew: "Transport vers un nouveau site",
        recycling: "Recyclage professionnel / élimination"
      },
      schedule: "Calendrier",
      date: "Date *",
      timeWindow: "Fenêtre de temps (facultatif)",
      from: "De",
      to: "À",
      scheduleOptions: {
        flexible: "Flexible",
        express: "Express / urgent"
      },
      workDuration: "Durée du travail (pour prix & planification)",
      durations: {
        hours12: "1–2 heures",
        halfDay: "Demi-journée",
        fullDay: "Journée entière",
        multiday: "Plusieurs jours",
        custom: "Individuel"
      },
      accessKey: "Accès / Clés",
      accessOptions: {
        inPerson: "Personnellement sur place",
        keyAvailable: "Clé disponible",
        mailbox: "Boîte aux lettres",
        neighbor: "Voisin",
        management: "Gérance",
        keyBox: "Boîte à clés"
      },
      upload: "Upload (très important)",
      uploads: {
        photos: "Photos",
        videos: "Vidéos"
      },
      notes: "Remarques (facultatif)"
    }
  },

  constructionCleaning: {
    en: {
      contact: "Contact",
      companyManagement: "Company / Site management *",
      contactPerson: "Contact person",
      phone: "Phone *",
      email: "Email *",
      property: "Property",
      address: "Address (Street, ZIP, City) *",
      propertyType: "Property type",
      types: {
        newBuild: "New build",
        renovation: "Remodel / Renovation",
        commercial: "Commercial building",
        residential: "Residential building",
        industry: "Industry"
      },
      area: "Area (m², approx.) *",
      floors: "Floors (number)",
      constructionPhase: "Construction Phase / Cleaning Type",
      phases: {
        rough: "Rough cleaning (intermediate)",
        fine: "Fine cleaning (before handover)",
        final: "Final construction cleaning (incl. handover)",
        partial: "Partial cleaning after phase"
      },
      cleaningAreas: "Cleaning Areas",
      interior: "Interior",
      interiorItems: {
        floors: "Floors",
        walls: "Walls",
        ceilings: "Ceilings",
        doors: "Doors / Frames",
        windows: "Windows"
      },
      sanitary: "Sanitary",
      sanitaryItems: {
        wc: "WC",
        sink: "Sink",
        showers: "Showers / Baths"
      },
      kitchen: "Kitchen / Fitted kitchen",
      kitchenItems: {
        appliances: "Appliances",
        surfaces: "Surfaces",
        cabinets: "Cabinets"
      },
      exterior: "Exterior",
      exteriorItems: {
        balcony: "Balcony",
        terrace: "Terrace",
        facade: "Facade",
        surroundings: "Surroundings"
      },
      contaminationLevel: "Contamination Level",
      levels: {
        light: "Light (dust)",
        normal: "Normal (construction dirt)",
        heavy: "Heavy (cement / paint / glue residue)"
      },
      specialContamination: "Special Contamination",
      specialItems: {
        cement: "Cement residue",
        paint: "Paint splashes",
        silicone: "Silicone residue",
        glue: "Glue",
        dust: "Intensive dust"
      },
      windowsGlass: "Windows & Glass",
      windowsCount: "Windows (number)",
      windowTypes: {
        standard: "Standard",
        large: "Large surfaces",
        facade: "Glass facade",
        hardToAccess: "Hard to access"
      },
      floorTypes: "Floor Types",
      floorsOptions: {
        concrete: "Concrete",
        tiles: "Tiles",
        parquet: "Parquet",
        stone: "Stone",
        pvc: "PVC / Vinyl"
      },
      machinesTech: "Machines / Technology",
      techItems: {
        floorMachine: "Floor machine required",
        highPressure: "High-pressure cleaner",
        specialEquip: "Special equipment necessary"
      },
      accessLogistics: "Access & Logistics",
      floorInfo: "Floor",
      elevatorSizes: {
        yes: "Yes",
        no: "No"
      },
      parking: "Parking",
      accessPossible: {
        possible: "Possible",
        restricted: "Restricted"
      },
      powerWater: {
        powerYes: "Power available - Yes",
        powerNo: "Power available - No",
        waterYes: "Water available - Yes",
        waterNo: "Water available - No"
      },
      difficulties: "Difficulties",
      difficultyItems: {
        noElevator: "No elevator",
        activeSite: "Active construction site",
        hardAccess: "Hard to access areas",
        timePressure: "Time pressure / Deadline"
      },
      additionalServices: "Additional Services",
      additionalOptions: {
        disposal: "Disposal of building material",
        tradesman: "Cleaning after craftsman",
        endGuarantee: "Final cleaning with guarantee",
        removeFoil: "Remove protective foils"
      },
      schedule: "Term",
      date: "Date *",
      from: "From",
      to: "To",
      scheduleOptions: {
        flexible: "Flexible",
        express: "Express / urgent"
      },
      projectPlanning: "Project Planning",
      planningOptions: {
        oneTime: "One-time cleaning",
        multiple: "Multiple assignments",
        ongoing: "Ongoing site cleaning"
      },
      upload: "Upload",
      uploads: {
        photos: "Photos",
        plans: "Construction plans",
        documents: "Documents"
      },
      notes: "Notes (optional)"
    },
    de: {
      contact: "Kontakt",
      companyManagement: "Firma / Bauleitung *",
      contactPerson: "Ansprechperson",
      phone: "Telefon *",
      email: "E-Mail *",
      property: "Objekt",
      address: "Adresse (Strasse, PLZ, Ort) *",
      propertyType: "Objektart",
      types: {
        newBuild: "Neubau",
        renovation: "Umbau / Renovation",
        commercial: "Gewerbebau",
        residential: "Wohnbau",
        industry: "Industrie"
      },
      area: "Fläche (m², ca.) *",
      floors: "Etagen (Anzahl)",
      constructionPhase: "Bauphase / Reinigungsart",
      phases: {
        rough: "Grobreinigung (Bauzwischenreinigung)",
        fine: "Feinreinigung (vor Übergabe)",
        final: "Bauendreinigung (inkl. Abgabe)",
        partial: "Teilreinigung nach Bauphase"
      },
      cleaningAreas: "Reinigungsbereiche",
      interior: "Innenbereich",
      interiorItems: {
        floors: "Böden",
        walls: "Wände",
        ceilings: "Decken",
        doors: "Türen / Rahmen",
        windows: "Fenster"
      },
      sanitary: "Sanitär",
      sanitaryItems: {
        wc: "WC",
        sink: "Lavabo",
        showers: "Duschen / Bäder"
      },
      kitchen: "Küche / Einbauküche",
      kitchenItems: {
        appliances: "Geräte",
        surfaces: "Oberflächen",
        cabinets: "Schränke"
      },
      exterior: "Aussenbereich",
      exteriorItems: {
        balcony: "Balkon",
        terrace: "Terrasse",
        facade: "Fassade",
        surroundings: "Umgebung"
      },
      contaminationLevel: "Verschmutzungsgrad",
      levels: {
        light: "Leicht (Staub)",
        normal: "Normal (Bauschmutz)",
        heavy: "Stark (Zement / Farbe / Kleberreste)"
      },
      specialContamination: "Spezielle Verschmutzungen",
      specialItems: {
        cement: "Zementreste",
        paint: "Farbflecken",
        silicone: "Silikonreste",
        glue: "Kleber",
        dust: "Staub intensiv"
      },
      windowsGlass: "Fenster & Glas",
      windowsCount: "Fenster (Anzahl)",
      windowTypes: {
        standard: "Standard",
        large: "Grossflächen",
        facade: "Glasfassade",
        hardToAccess: "Schwer zugänglich"
      },
      floorTypes: "Bodenarten",
      floorsOptions: {
        concrete: "Beton",
        tiles: "Fliesen",
        parquet: "Parkett",
        stone: "Stein",
        pvc: "PVC / Vinyl"
      },
      machinesTech: "Maschinen / Technik",
      techItems: {
        floorMachine: "Bodenmaschine erforderlich",
        highPressure: "Hochdruckreiniger",
        specialEquip: "Spezialgeräte notwendig"
      },
      accessLogistics: "Zugang & Logistik",
      floorInfo: "Etage",
      elevatorSizes: {
        yes: "Ja",
        no: "Nein"
      },
      parking: "Parkplatz",
      accessPossible: {
        possible: "Möglich",
        restricted: "Eingeschränkt"
      },
      powerWater: {
        powerYes: "Strom vorhanden - Ja",
        powerNo: "Strom vorhanden - Nein",
        waterYes: "Wasser vorhanden - Ja",
        waterNo: "Wasser vorhanden - Nein"
      },
      difficulties: "Erschwernisse",
      difficultyItems: {
        noElevator: "Kein Lift",
        activeSite: "Baustelle aktiv",
        hardAccess: "Schwer zugängliche Bereiche",
        timePressure: "Zeitdruck / Termin"
      },
      additionalServices: "Zusatzleistungen",
      additionalOptions: {
        disposal: "Entsorgung von Baumaterial",
        tradesman: "Reinigung nach Handwerker",
        endGuarantee: "Endreinigung mit Abnahme",
        removeFoil: "Schutzfolien entfernen"
      },
      schedule: "Termin",
      date: "Datum *",
      from: "Von",
      to: "Bis",
      scheduleOptions: {
        flexible: "Flexibel",
        express: "Express / dringend"
      },
      projectPlanning: "Projektplanung",
      planningOptions: {
        oneTime: "Einmalige Reinigung",
        multiple: "Mehrere Einsätze",
        ongoing: "Laufende Baustellenreinigung"
      },
      upload: "Upload",
      uploads: {
        photos: "Fotos",
        plans: "Baupläne",
        documents: "Dokumente"
      },
      notes: "Bemerkungen (optional)"
    },
    fr: {
      contact: "Contact",
      companyManagement: "Entreprise / Direction des travaux *",
      contactPerson: "Personne de contact",
      phone: "Téléphone *",
      email: "Email *",
      property: "Propriété",
      address: "Adresse (Rue, NPA, Ville) *",
      propertyType: "Type de bien",
      types: {
        newBuild: "Nouvelle construction",
        renovation: "Transformation / Rénovation",
        commercial: "Bâtiment commercial",
        residential: "Bâtiment résidentiel",
        industry: "Industrie"
      },
      area: "Surface (m², env.) *",
      floors: "Étages (nombre)",
      constructionPhase: "Phase de construction / Type",
      phases: {
        rough: "Nettoyage grossier (intermédiaire)",
        fine: "Nettoyage fin (avant remise)",
        final: "Nettoyage de fin de chantier (remise incluse)",
        partial: "Nettoyage partiel après phase"
      },
      cleaningAreas: "Zones de nettoyage",
      interior: "Intérieur",
      interiorItems: {
        floors: "Sols",
        walls: "Murs",
        ceilings: "Plafonds",
        doors: "Portes / Cadres",
        windows: "Fenêtres"
      },
      sanitary: "Sanitaires",
      sanitaryItems: {
        wc: "WC",
        sink: "Lavabo",
        showers: "Douches / Bains"
      },
      kitchen: "Cuisine / Équipée",
      kitchenItems: {
        appliances: "Appareils",
        surfaces: "Surfaces",
        cabinets: "Armoires"
      },
      exterior: "Extérieur",
      exteriorItems: {
        balcony: "Balcon",
        terrace: "Terrasse",
        facade: "Façade",
        surroundings: "Environs"
      },
      contaminationLevel: "Degré de salissure",
      levels: {
        light: "Léger (poussière)",
        normal: "Normal (saleté de chantier)",
        heavy: "Fort (ciment / peinture / restes de colle)"
      },
      specialContamination: "Salissures spéciales",
      specialItems: {
        cement: "Restes de ciment",
        paint: "Taches de peinture",
        silicone: "Restes de silicone",
        glue: "Colle",
        dust: "Poussière intensive"
      },
      windowsGlass: "Fenêtres et Vitres",
      windowsCount: "Fenêtres (nombre)",
      windowTypes: {
        standard: "Standard",
        large: "Grandes surfaces",
        facade: "Façade en verre",
        hardToAccess: "Difficile d'accès"
      },
      floorTypes: "Types de sols",
      floorsOptions: {
        concrete: "Béton",
        tiles: "Carrelage",
        parquet: "Parquet",
        stone: "Pierre",
        pvc: "PVC / Vinyle"
      },
      machinesTech: "Machines / Technique",
      techItems: {
        floorMachine: "Machine pour sol requise",
        highPressure: "Nettoyeur haute pression",
        specialEquip: "Équipement spécial nécessaire"
      },
      accessLogistics: "Accès & Logistique",
      floorInfo: "Étage",
      elevatorSizes: {
        yes: "Oui",
        no: "Non"
      },
      parking: "Parking",
      accessPossible: {
        possible: "Possible",
        restricted: "Restreint"
      },
      powerWater: {
        powerYes: "Électricité disponible - Oui",
        powerNo: "Électricité disponible - Non",
        waterYes: "Eau disponible - Oui",
        waterNo: "Eau disponible - Non"
      },
      difficulties: "Difficultés",
      difficultyItems: {
        noElevator: "Pas d'ascenseur",
        activeSite: "Chantier actif",
        hardAccess: "Zones difficiles d'accès",
        timePressure: "Pression de temps / Délais"
      },
      additionalServices: "Services supplémentaires",
      additionalOptions: {
        disposal: "Élimination de matériaux",
        tradesman: "Nettoyage après artisan",
        endGuarantee: "Nettoyage final avec garantie",
        removeFoil: "Enlever les films de protection"
      },
      schedule: "Calendrier",
      date: "Date *",
      from: "De",
      to: "À",
      scheduleOptions: {
        flexible: "Flexible",
        express: "Express / urgent"
      },
      projectPlanning: "Planification de projet",
      planningOptions: {
        oneTime: "Nettoyage unique",
        multiple: "Plusieurs interventions",
        ongoing: "Nettoyage continu du chantier"
      },
      upload: "Téléchargement",
      uploads: {
        photos: "Photos",
        plans: "Plans de construction",
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
