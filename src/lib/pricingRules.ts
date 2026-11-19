/**
 * SWISSCLEANMOVE — CENTRALIZED PRICING RULES
 * Edition: November 2026 (Updated per SwissCleanMove_Preisliste_Neues_Design.pdf)
 *
 * SINGLE SOURCE OF TRUTH for ALL pricing across the entire platform.
 * Every value comes EXCLUSIVELY from the official translated pricing specifications.
 *
 * null = "Individuelle Offerte" / "Auf Anfrage"
 */

export const PRICING_RULES = {

  // ─────────────────────────────────────────────────────────────
  // 1. UMZUG & TRANSPORT (PDF S. 03, Nr. 06 + S. 05, Nr. 11)
  // ─────────────────────────────────────────────────────────────
  moving: {
    baseRates: {
      'studio': 490,
      '1': 490,
      '1.5': 490,
      '2': 790,
      '2.5': 790,
      '3': 1090,
      '3.5': 1090,
      '4': 1490,
      '4.5': 1490,
      '5': 1890,
      '5.5': 1890,
      '6': 2090,
      '6.5': 2290,
      '7': 2490,
      '8': 2890,
      '9': 3290,
      '10': 3690,
      '11': 4090,
      '12': 4490
    } as Record<string, number>,
    houseBaseRate: null, // Einfamilienhaus: Auf Anfrage

    distance: {
      '11-30': 80,
      '31-50': 150,
      '51-100': 250,
      perKmOver100: 2.50
    },

    floorWithoutElevator: {
      // Ab 2. Etage ohne Lift = + CHF 60 pro Etage
      thresholdFloor: 2,
      perFloor: 60
    },

    carryingDistance: {
      '20-50': 80,
      'over50': 150
    },

    additionalServices: {
      packingService: 45,             // CHF 45.–/Std./Pers. (Einpackservice / Packhilfe)
      unpackingService: 45,           // CHF 45.–/Std./Pers.
      furnitureAssembly: 65,          // CHF 65.–/Std./Pers. (Möbelmontage / -demontage)
      furnitureDisassembly: 65,        // CHF 65.–/Std./Pers.
      carryingAssistance: 55,         // CHF 55.–/Std./Pers. (Tragehilfe)
      smallTransport: 150,            // CHF 150.– (Kleintransport)
      furniturePickup: 120,           // CHF 120.– (Abholung einzelner Möbel)
      packingMaterial: 50,            // ab CHF 50.–
      disposal: 180,                  // ab CHF 180.–
      furnitureLift: 350,             // CHF 350.–
      lawnMowing: 65,                 // CHF 65.–/Std. (Rasenmähen / einfache Gartenpflege)
      foliageRemoval: 65              // CHF 65.–/Std. (Laubbeseitigung & Aussenpflege)
    },

    heavyItems: {
      piano: 350,
      grandPiano: 650,
      safe: 350,
      aquarium: 180,
      fitnessEquipment: 120,
      sideBySideFridge: 80
    },

    extraStaff: {
      additionalWorkerPerHour: 55,    // Tragehilfe CHF 55.–/Std./Pers.
      additionalVehicle: 180
    },

    dateSurcharges: {
      expressWithin48h: 0.20,         // +20%
      saturday: 0.20,                 // +20%
      sunday: 0.30,                   // +30%
      holiday: 0.30                   // +30%
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 2. UMZUGSREINIGUNG / ENDREINIGUNG (PDF S. 02, Nr. 01 + S. 03 & 05)
  // ─────────────────────────────────────────────────────────────
  cleaning: {
    apartment: {
      'studio': 450,
      '1': 450,
      '1.5': 550,
      '2': 650,
      '2.5': 650,
      '3': 850,
      '3.5': 850,
      '4': 1050,
      '4.5': 1050,
      '5': 1250,
      '5.5': 1250,
      '6': 1450,
      '6.5': 1550,
      '7': 1750,
      '8': 1950,
      '9': 2150,
      '10': 2350,
      '11': 2550,
      '12': 2750,
      'house': 1490                   // Einfamilienhaus ab CHF 1'490.–
    } as Record<string, number>,

    house: {
      'studio': 1490,
      '1': 1490,
      '1.5': 1490,
      '2': 1490,
      '2.5': 1490,
      '3': 1490,
      '3.5': 1490,
      '4': 1690,
      '4.5': 1840,
      '5': 1990,
      '5.5': 2190,
      '6': 2390,
      '6.5': 2590,
      '7': 2790,
      '8': 3090,
      '9': 3390,
      '10': 3690,
      '11': 3990,
      '12': 4290
    } as Record<string, number>,

    surcharges: {
      balcony: 80,                    // CHF 80.– (Balkon- / Terrassenreinigung)
      largeBalcony: 120,
      basement: 80,                   // CHF 80.– (Kellerreinigung)
      attic: 80,
      garage: 100,                    // CHF 100.– (Garagenreinigung)
      storageRoom: 50
    },

    windows: {
      smallWindow: 15,                // CHF 15.– (Kleines Fenster, beidseitig)
      standardWindow: 20,             // CHF 20.– (Standardfenster, beidseitig)
      largeWindow: 30,                // CHF 30.– (Grosses Fenster)
      largeWindowBalconyDoor: 35,      // CHF 35.– (Balkontür / Glastür)
      shopWindow: 45,                 // CHF 45.– (Schaufenster)
      glassFacades: null,             // Glasfassaden: Auf Anfrage
      blinds: null,                   // Storenreinigung: Nach Aufwand
      lamellaeBlinds: 8,
      rollerShutters: 10,
      heavilySoiledBlinds: 5
    },

    kitchen: {
      heavilySoiledKitchen: 120,
      heavilySoiledOven: 60,          // CHF 60.–/Gerät (Backofen-Innenreinigung)
      ovenCleaning: 60,               // CHF 60.–/Gerät
      fridgeCleaning: 45,             // CHF 45.–/Gerät (Kühlschrank-Innenreinigung)
      freezerCleaning: 35,
      extractorHoodFilter: 90         // CHF 90.–/Einsatz (Zugängliche Fettfilter / Abzugshauben)
    },

    specialCleaning: {
      constructionCleaningPerSqm: 8,        // CHF 8.–/m² (Baureinigung)
      constructionFinalCleaningPerSqm: 12,  // CHF 12.–/m² (Bauendreinigung)
      deepCleaningPerHour: 55,              // CHF 55.–/Std. (Grundreinigung)
      carpetCleaningPerSqm: 12,             // CHF 12.–/m² (Teppichreinigung)
      garageCleaning: 100,                  // CHF 100.– (Garagenreinigung)
      cellarCleaning: 80,                   // CHF 80.– (Kellerreinigung)
      sofaCleaning: 90,                     // CHF 90.– (Sofa- / Polsterreinigung)
      mattressCleaning: 70,                 // CHF 70.– (Matratzenreinigung)
      balconyTerraceCleaning: 80,           // CHF 80.– (Balkon- / Terrassenreinigung)
      pressureWashingPerSqm: 8,             // CHF 8.–/m² (Hochdruckreinigung Aussenflächen)
      sanitaryIntensivePerHour: 55          // CHF 55.–/Std. (Sanitär-Intensivreinigung / Entkalken)
    },

    dirtLevel: {
      heavy: 0.15,               // +15%
      veryHeavy: 0.30,           // +30%
      extreme: null              // Individuelle Offerte
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 3. ENTSORGUNG & RÄUMUNG (PDF S. 04, Nr. 07)
  // ─────────────────────────────────────────────────────────────
  disposal: {
    volumePricing: {
      '1': 180,                  // 1–2 m³: CHF 180.–
      '2': 180,                  // 1–2 m³: CHF 180.–
      '3': 390,                  // 3–5 m³: CHF 390.–
      '5': 390,                  // 3–5 m³: CHF 390.–
      '8': 790,                  // 6–10 m³: CHF 790.–
      '10': 790,                 // 6–10 m³: CHF 790.–
      '15': 1490,                // 11–20 m³: CHF 1'490.–
      '20': 1490                 // 11–20 m³: CHF 1'490.–
    } as Record<string, number>,
    // Über 20 m³ = Individuelle Offerte / Auf Anfrage
    over20: null as number | null,

    basementClearance: 180,      // CHF 180.– (Kellerräumung)
    apartmentClearance: {
      apartment: null,           // Wohnungsräumung: Auf Anfrage
      house: null                // Büro- oder Geschäftsauflösung: Auf Anfrage
    },

    demontage: {
      min: 90,
      max: 350
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 4. UNTERHALTSREINIGUNG (PDF S. 02, Nr. 03)
  // ─────────────────────────────────────────────────────────────
  maintenance: {
    hourlyRates: {
      residential: 45,           // Privatwohnung / Haus: CHF 45.–/Std.
      office: 45,                // Regelmässige Büroreinigung: CHF 45.–/Std.
      praxis: 50,                // Praxisreinigung: CHF 50.–/Std.
      commercial: 48,            // Gewerbereinigung: CHF 48.–/Std.
      stairwell: 45,             // Treppenhausreinigung: CHF 45.–/Std.
      intensiveDeepCleaning: 60   // Intensive Grundreinigung: CHF 60.–/Std.
    },

    windows: {
      inside: 60,
      insideAndOutside: 120
    },

    kitchen: {
      ovenCleaning: 60,          // CHF 60.–/Gerät
      fridgeCleaning: 45,        // CHF 45.–/Gerät
      microwaveCleaning: 20,
      extractorHoodCleaning: 90  // CHF 90.–/Einsatz
    },

    addons: {
      cabinetsInside: 60,
      balconyCleaning: 80,       // CHF 80.–
      terraceCleaning: 80,       // CHF 80.–
      basementCleaning: 80,      // CHF 80.–
      atticCleaning: 80,
      ironingPerHour: 20,
      laundryService: 25
    },

    dirtLevel: {
      heavy: 0.15,               // +15%
      veryHeavy: 0.30            // +30%
    },

    access: {
      noElevatorPerFloor: 40,    // ab 2. Etage
      noParking: 50
    },

    dateSurcharges: {
      expressWithin48h: 0.20,    // +20%
      saturday: 0.20,            // +20%
      sunday: 0.30,              // +30%
      holiday: 0.30              // +30%
    },

    discounts: {
      weekly: -0.05,             // −5%
      twicePerWeek: -0.08,       // −8%
      thricePerWeek: -0.10,      // −10%
      fiveTimesPerWeek: -0.15,   // −15%
      yearlyContract: -0.10      // −10%
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 5. HAUSHALTSHILFE (PDF S. 02, Nr. 02)
  // ─────────────────────────────────────────────────────────────
  household: {
    // Customer-facing service tier rates (PDF 02 Putzfrau & regelmässige Haushaltsreinigung)
    regular: 42,                 // Wöchentliche Reinigung: CHF 42.–/Std.
    fourteenDays: 45,            // Reinigung alle zwei Wochen: CHF 45.–/Std.
    oneTime: 48,                 // Einmalige Haushaltsreinigung: CHF 48.–/Std.
    premium: 49,                 // Premium Haushaltshilfe
    deepCleaning: 55,            // Grundreinigung: CHF 55.–/Std.
    ironing: 42,                 // Bügelservice ab CHF 42.–/Std.
    windowPerSqm: 7,             // Fensterreinigung ab CHF 7.– / m²
    minOrder: 120,               // Mindestauftragswert: CHF 120.–

    hourlyRates: {
      weekday: 42,               // Montag–Freitag
      saturday: 55,              // Samstag
      sundayHoliday: 65          // Sonntag / Feiertag
    },

    addons: {
      windowsInside: 60,
      windowsInsideAndOutside: 120,
      ovenCleaning: 60,          // CHF 60.–/Gerät
      fridgeCleaning: 45,        // CHF 45.–/Gerät
      microwaveCleaning: 20,
      extractorHoodCleaning: 90, // CHF 90.–/Einsatz
      cabinetsInside: 60,
      ironingPerHour: 20,
      laundryWashing: 25,
      laundryFolding: 20,
      beddingChange: 20,
      petAreaCleaning: 30,
      balconyCleaning: 80,       // CHF 80.–
      terraceCleaning: 80,       // CHF 80.–
      basementCleaning: 80,      // CHF 80.–
      atticCleaning: 80,
      shoppingServicePerHour: 45
    },

    dirtLevel: {
      heavy: 0.15,               // +15%
      veryHeavy: 0.30            // +30%
    },

    access: {
      noElevatorPerFloor: 40,    // ab 2. Etage
      noParking: 50
    },

    dateSurcharges: {
      expressWithin48h: 0.20,    // +20%
      saturday: 0.20,            // +20%
      sunday: 0.30,              // +30%
      holiday: 0.30              // +30%
    },

    discounts: {
      weekly: -0.05,             // −5%
      twicePerWeek: -0.08,       // −8%
      thricePerWeek: -0.10,      // −10%
      fiveTimesPerWeek: -0.15,   // −15%
      monthlyContract: -0.10,    // −10%
      yearlyContract: -0.15      // −15%
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 6. GASTRONOMIEREINIGUNG (PDF S. 04, Nr. 09)
  // ─────────────────────────────────────────────────────────────
  gastronomy: {
    hourlyRates: {
      regular: 55,               // Regelmässige Gastronomiereinigung: CHF 55.–/Std.
      diningArea: 50,            // Restaurant & Gastraum: CHF 50.–/Std.
      kitchenSurfaces: 65,       // Gastroküche, Oberflächen & Böden: CHF 65.–/Std.
      intensiveKitchen: 70,      // Intensive Küchen-Grundreinigung: CHF 70.–/Std.
      barBuffet: 55,             // Bar-, Theken- & Buffetbereiche: CHF 55.–/Std.
      sanitaryStaff: 50,         // Sanitär- & Personalräume: CHF 50.–/Std.
      eventCleaning: 60          // Reinigung nach Veranstaltungen: CHF 60.–/Std.
    },

    greaseFilterPerService: 90,   // Zugängliche Fettfilter / Abzugshauben: CHF 90.–/Einsatz

    basePricesBySqm: {
      '50': 690,                 // Bis 50 m²
      '100': 890,                // 51–100 m²
      '150': 1190,               // 101–150 m²
      '200': 1490,               // 151–200 m²
      '300': 1990                // 201–300 m²
    } as Record<string, number>,
    over300: null as number | null,

    discounts: {
      twicePerWeek: -0.05,       // −5%
      thricePerWeek: -0.08,      // −8%
      fiveTimesPerWeek: -0.10,   // −10%
      daily: -0.15               // −15%
    },

    addons: {
      intensiveKitchenCleaning: 290,
      greaseRemoval: 220,
      extractorHood: 90,         // CHF 90.–/Einsatz
      filterCleaning: 90,        // CHF 90.–/Einsatz
      ovenCleaning: 60,          // CHF 60.–/Gerät
      grillCleaning: 80,
      deepFryerCleaning: 70,
      fridgeCleaning: 45,        // CHF 45.–/Gerät
      freezerCleaning: 40,
      windowsInside: 60,
      windowsInsideAndOutside: 120,
      terraceCleaning: 80,
      storageCleaning: 80,
      wasteRoomCleaning: 80,
      disinfection: 120
    },

    dirtLevel: {
      heavy: 0.20,               // +20%
      veryHeavy: 0.35            // +35%
    },

    access: {
      noElevatorPerFloor: 60,    // ab 2. Etage
      noParking: 80
    },

    dateSurcharges: {
      expressWithin48h: 0.20,    // +20%
      saturday: 0.20,            // +20%
      sunday: 0.30,              // +30%
      holiday: 0.30,             // +30%
      nightShift: 0.15           // +15%
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 7. FACILITY SERVICES / HAUSWARTUNG (PDF S. 04, Nr. 08)
  // ─────────────────────────────────────────────────────────────
  facilityService: {
    hourlyRates: {
      caretaker: 65,             // Hauswartung nach Stunden: CHF 65.–/Std.
      stairwellCleaning: 45,     // Treppenhausreinigung: CHF 45.–/Std.
      buildingMaintenance: 70,   // Gebäudeunterhalt: CHF 70.–/Std.
      outdoorCleaning: 65,       // Aussenreinigung: CHF 65.–/Std.
      winterService: 75,         // Winterdienst: CHF 75.–/Std.
      lawnMowing: 65,            // Rasenmähen / einfache Gartenpflege: CHF 65.–/Std.
      foliageRemoval: 65         // Laubbeseitigung & Aussenpflege: CHF 65.–/Std.
    },

    houseMaintenanceMin: 450,    // Kleine Liegenschaft: CHF 450.–/Monat

    oneTime: {
      '200': 350,                // Bis 200 m²
      '500': 590,                // 201–500 m²
      '1000': 890,               // 501–1'000 m²
      '2000': 1390               // 1'001–2'000 m²
    } as Record<string, number>,
    oneTimeOver2000: null as number | null,

    monthly: {
      '200': 450,                // Kleine Liegenschaft: CHF 450.–/Monat (bis 200 m²)
      '500': 750,                // Mittlere Liegenschaft: CHF 750.–/Monat (201–500 m²)
      '1000': 990,               // 501–1'000 m² / Monat
      '2000': 1590               // 1'001–2'000 m² / Monat
    } as Record<string, number>,
    monthlyOver2000: null as number | null,

    addons: {
      stairwellCleaningMonthly: 120,
      windowCleaning: 120,
      basementCleaning: 80,
      garageCleaning: 100,       // CHF 100.–
      gardenMaintenance: 180,
      lawnMowing: 65,            // CHF 65.–/Std.
      hedgeTrimming: 180,
      winterServiceMonthly: 250,
      snowRemovalPerService: 180,
      saltingPerService: 80,
      technicalMaintenancePerHour: 70, // Gebäudeunterhalt CHF 70.–/Std.
      smallRepairsPerHour: 70,
      inspectionRoundsMonthly: 80
    },

    dirtLevel: {
      heavy: 0.15,               // +15%
      veryHeavy: 0.30            // +30%
    },

    dateSurcharges: {
      expressWithin48h: 0.20,    // +20%
      saturday: 0.20,            // +20%
      sunday: 0.30,              // +30%
      holiday: 0.30              // +30%
    }
  }

} as const;

export type PricingRules = typeof PRICING_RULES;
export type ServiceType = 'moving' | 'cleaning' | 'disposal' | 'maintenance' | 'household' | 'gastronomy' | 'facilityService';
