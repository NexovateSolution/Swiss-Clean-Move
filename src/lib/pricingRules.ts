/**
 * ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
 * SWISSCLEANMOVE ΓÇö CENTRALIZED PRICING RULES
 * ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
 *
 * SINGLE SOURCE OF TRUTH for ALL pricing across the entire platform.
 *
 * Every value comes EXCLUSIVELY from the official translated
 * pricing specifications. NO invented values. NO legacy carryover.
 *
 * null = "Individuelle Offerte" / "Price Upon Request"
 *
 * This file is consumed by:
 *   - src/utils/pricingEngine.ts (calculation logic)
 *   - Frontend live calculators
 *   - Backend quote generation
 *   - Email rendering
 *   - PDF generation
 *   - Admin dashboard
 * ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
 */

export const PRICING_RULES = {

  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  // 1. UMZUG & TRANSPORT
  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  moving: {
    baseRates: {
      'studio': 390,
      '1': 390,
      '1.5': 590,
      '2': 690,
      '2.5': 790,
      '3': 990,
      '3.5': 1090,
      '4': 1290,
      '4.5': 1390,
      '5': 1590,
      '5.5': 1690,
      '6': 1890,
      '6.5': 2090,
      '7': 2290,
      '8': 2690,
      '9': 3090,
      '10': 3490,
      '11': 3890,
      '12': 4290
    } as Record<string, number>,

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
      packingService: 180,
      unpackingService: 180,
      furnitureAssembly: 120,
      furnitureDisassembly: 120,
      packingMaterial: 50,       // ab CHF 50
      disposal: 150,             // ab CHF 150
      furnitureLift: 350
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
      additionalWorkerPerHour: 60,
      additionalVehicle: 180
    },

    dateSurcharges: {
      expressWithin48h: 0.20,    // +20%
      saturday: 0.20,            // +20%
      sunday: 0.30,              // +30%
      holiday: 0.30              // +30%
    }
  },

  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  // 2. UMZUGSREINIGUNG / ENDREINIGUNG
  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  cleaning: {
    apartment: {
      'studio': 350,
      '1': 350,
      '1.5': 490,
      '2': 550,
      '2.5': 620,
      '3': 750,
      '3.5': 820,
      '4': 950,
      '4.5': 1050,
      '5': 1150,
      '5.5': 1250,
      '6': 1390,
      '6.5': 1490,
      '7': 1650,
      '8': 1850,
      '9': 2050,
      '10': 2250,
      '11': 2450,
      '12': 2650
    } as Record<string, number>,

    house: {
      'studio': 590,
      '1': 590,
      '1.5': 750,
      '2': 750,
      '2.5': 850,
      '3': 950,
      '3.5': 1090,
      '4': 1250,
      '4.5': 1390,
      '5': 1490,
      '5.5': 1650,
      '6': 1790,
      '6.5': 1950,
      '7': 2150,
      '8': 2450,
      '9': 2750,
      '10': 3050,
      '11': 3350,
      '12': 3650
    } as Record<string, number>,

    surcharges: {
      balcony: 70,
      largeBalcony: 120,
      basement: 80,
      attic: 80,
      garage: 120,
      storageRoom: 50
    },

    windows: {
      standardWindow: 12,
      largeWindowBalconyDoor: 18,
      lamellaeBlinds: 8,
      rollerShutters: 10,
      heavilySoiledBlinds: 5
    },

    kitchen: {
      heavilySoiledKitchen: 120,
      heavilySoiledOven: 40,
      fridgeCleaning: 35,
      freezerCleaning: 35,
      extractorHoodFilter: 45
    },

    dirtLevel: {
      heavy: 0.15,               // +15%
      veryHeavy: 0.30,           // +30%
      extreme: null              // Individuelle Offerte
    }
    // NOTE: Bathroom counts are METADATA ONLY ΓÇö zero pricing impact
  },

  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  // 3. ENTSORGUNG & R├äUMUNG
  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  disposal: {
    volumePricing: {
      '1': 150,
      '2': 250,
      '3': 350,
      '5': 490,
      '8': 690,
      '10': 890,
      '15': 1290,
      '20': 1690
    } as Record<string, number>,
    // ├£ber 20 m┬│ = Individuelle Offerte
    over20: null as number | null,

    demontage: {
      min: 90,
      max: 350
    }
  },

  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  // 4. UNTERHALTSREINIGUNG
  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  maintenance: {
    hourlyRates: {
      residential: 45,           // Privatwohnung / Haus
      office: 50,                // B├╝ro / Praxis
      commercial: 55             // Restaurant / Gewerbe
    },

    windows: {
      inside: 60,
      insideAndOutside: 120
    },

    kitchen: {
      ovenCleaning: 40,
      fridgeCleaning: 35,
      microwaveCleaning: 20,
      extractorHoodCleaning: 45
    },

    addons: {
      cabinetsInside: 60,
      balconyCleaning: 70,
      terraceCleaning: 120,
      basementCleaning: 80,
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
      weekly: -0.05,             // ΓêÆ5%
      twicePerWeek: -0.08,       // ΓêÆ8%
      thricePerWeek: -0.10,      // ΓêÆ10%
      fiveTimesPerWeek: -0.15,   // ΓêÆ15%
      yearlyContract: -0.10      // ΓêÆ10%
    }
  },

  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  // 5. HAUSHALTSHILFE
  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  household: {
    // Customer-facing service tier rates (from translated pricing table)
    regular: 42,                 // Regelm├ñssige Haushaltshilfe (w├╢chentlich)
    fourteenDays: 45,            // Haushaltshilfe (14-t├ñglich)
    oneTime: 48,                 // Einmalige Haushaltshilfe
    premium: 49,                 // Premium Haushaltshilfe
    deepCleaning: 55,            // Grundreinigung / Fr├╝hlingsputz
    ironing: 42,                 // B├╝gelservice
    windowPerSqm: 7,             // Fensterreinigung ab CHF 7.ΓÇô / m┬▓
    minOrder: 120,               // Mindestauftrag

    hourlyRates: {
      weekday: 45,               // MontagΓÇôFreitag
      saturday: 55,              // Samstag
      sundayHoliday: 65          // Sonntag / Feiertag
    },

    addons: {
      windowsInside: 60,
      windowsInsideAndOutside: 120,
      ovenCleaning: 40,
      fridgeCleaning: 35,
      microwaveCleaning: 20,
      extractorHoodCleaning: 45,
      cabinetsInside: 60,
      ironingPerHour: 20,
      laundryWashing: 25,
      laundryFolding: 20,
      beddingChange: 20,
      petAreaCleaning: 30,
      balconyCleaning: 70,
      terraceCleaning: 120,
      basementCleaning: 80,
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
      weekly: -0.05,             // ΓêÆ5%
      twicePerWeek: -0.08,       // ΓêÆ8%
      thricePerWeek: -0.10,      // ΓêÆ10%
      fiveTimesPerWeek: -0.15,   // ΓêÆ15%
      monthlyContract: -0.10,    // ΓêÆ10%
      yearlyContract: -0.15      // ΓêÆ15%
    }
  },

  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  // 6. GASTRONOMIEREINIGUNG
  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  gastronomy: {
    basePricesBySqm: {
      '50': 690,                 // Bis 50 m┬▓
      '100': 890,                // 51ΓÇô100 m┬▓
      '150': 1190,               // 101ΓÇô150 m┬▓
      '200': 1490,               // 151ΓÇô200 m┬▓
      '300': 1990                // 201ΓÇô300 m┬▓
    } as Record<string, number>,
    // ├£ber 300 m┬▓ = Individuelle Offerte
    over300: null as number | null,

    discounts: {
      twicePerWeek: -0.05,       // ΓêÆ5%
      thricePerWeek: -0.08,      // ΓêÆ8%
      fiveTimesPerWeek: -0.10,   // ΓêÆ10%
      daily: -0.15               // ΓêÆ15%
    },

    addons: {
      intensiveKitchenCleaning: 290,
      greaseRemoval: 220,
      extractorHood: 120,
      filterCleaning: 60,
      ovenCleaning: 60,
      grillCleaning: 80,
      deepFryerCleaning: 70,
      fridgeCleaning: 40,
      freezerCleaning: 40,
      windowsInside: 60,
      windowsInsideAndOutside: 120,
      terraceCleaning: 120,
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

  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  // 7. FACILITY SERVICES / HAUSWARTUNG
  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  facilityService: {
    oneTime: {
      '200': 350,                // Bis 200 m┬▓
      '500': 590,                // 201ΓÇô500 m┬▓
      '1000': 890,               // 501ΓÇô1'000 m┬▓
      '2000': 1390               // 1'001ΓÇô2'000 m┬▓
    } as Record<string, number>,
    // ├£ber 2'000 m┬▓ = Individuelle Offerte
    oneTimeOver2000: null as number | null,

    monthly: {
      '200': 290,                // Bis 200 m┬▓ / Monat
      '500': 590,                // 201ΓÇô500 m┬▓ / Monat
      '1000': 990,               // 501ΓÇô1'000 m┬▓ / Monat
      '2000': 1590               // 1'001ΓÇô2'000 m┬▓ / Monat
    } as Record<string, number>,
    // ├£ber 2'000 m┬▓ = Individuelle Offerte
    monthlyOver2000: null as number | null,

    addons: {
      stairwellCleaningMonthly: 120,
      windowCleaning: 120,
      basementCleaning: 80,
      garageCleaning: 180,
      gardenMaintenance: 180,
      lawnMowing: 120,
      hedgeTrimming: 180,
      winterServiceMonthly: 250,
      snowRemovalPerService: 180,
      saltingPerService: 80,
      technicalMaintenancePerHour: 95,
      smallRepairsPerHour: 95,
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

// ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
// TYPE EXPORTS
// ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
export type PricingRules = typeof PRICING_RULES;
export type ServiceType = 'moving' | 'cleaning' | 'disposal' | 'maintenance' | 'household' | 'gastronomy' | 'facilityService';