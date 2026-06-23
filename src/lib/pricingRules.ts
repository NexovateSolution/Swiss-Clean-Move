export const PRICING_RULES = {
    // --- GLOBAL ---
    vatRate: 0.081, // 8.1% MwSt.
    expressMultiplier: 1.20, // 20% surcharge for express/urgent requests

    // --- CLEANING (Umzugsreinigung) ---
    cleaning: {
        basePriceByRooms: {
            1: 350,
            1.5: 420,
            2: 490,
            2.5: 590,
            3: 690,
            3.5: 790,
            4: 890,
            4.5: 990,
            5: 1190,
            5.5: 1390
        } as Record<number, number>,
        houseBasePrice: 1490,
        surcharges: {
            balcony: 70,
            terrace: 120,
            basement: 50,
            attic: 50,
            garage: 80,
            pressureWashing: 80, // starting from
            drillHolesPerHole: 6,
            heavilySoiledMultiplier: 1.3
        }
    },

    // --- MOVING (Umzug) ---
    moving: {
        basePriceByRooms: {
            1: 490,
            1.5: 490,
            2: 790,
            2.5: 790,
            3: 1190,
            3.5: 1190,
            4: 1590,
            4.5: 1590,
            5: 1990,
            5.5: 1990
        } as Record<number, number>,
        houseBasePrice: 2490,
        surcharges: {
            distance: {
                short: 0,        // 0-20km
                medium: 150,     // 20-50km
                long: 300        // >50km (Canton-to-Canton)
            },
            accessDistance: {    // Distance from door to parking
                direct: 0,
                d0_20: 0,
                d20_50: 50,
                d50plus: 100
            },
            noElevatorPerFloor: 30,
            narrowStairs: 100,
            longDistances: 80
        }
    },

    // --- TRANSPORT (Möbeltransport) ---
    transport: {
        basePrice: 250, // Minimum flat rate
        hourlyVanDriver: 140,
        hourlyTwoMen: 160,
        surcharges: {
            heavyItem: 150, // Pianos, safes
            assemblyHourly: 70
        }
    },

    // --- COMBO (Moving + Cleaning) ---
    combo: {
        basePriceByRooms: {
            1: 750,
            1.5: 850,
            2: 1150,
            2.5: 1350,
            3: 1650,
            3.5: 1850,
            4: 2250,
            4.5: 2450,
            5: 2850,
            5.5: 3150
        } as Record<number, number>,
        houseBasePrice: 3500
    },

    // --- DISPOSAL (Entsorgung) ---
    disposal: {
        perCubicMeter: 30,
        flatRates: {
            small: 150,
            furniture: 250,
            basement: 300,
            apartment: 690,
            house: 1490
        }
    }
};

/**
 * Calculates distance surcharge based on estimated kilometers
 * For future Google Maps API integration
 */
export function calculateDistanceSurcharge(km: number): number {
    if (km <= 20) return PRICING_RULES.moving.surcharges.distance.short;
    if (km <= 50) return PRICING_RULES.moving.surcharges.distance.medium;
    return PRICING_RULES.moving.surcharges.distance.long;
}

/**
 * Normalizes room string to a number for lookups
 */
export function normalizeRooms(roomStr: string | number | undefined | null): number {
    if (!roomStr) return 0;
    const num = typeof roomStr === 'string' ? parseFloat(roomStr.replace(/[^0-9.]/g, '')) : roomStr;
    if (isNaN(num)) return 0;
    return num;
}
