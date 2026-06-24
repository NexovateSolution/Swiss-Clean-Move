import { PRICING_RULES, calculateDistanceSurcharge, normalizeRooms } from '../lib/pricingRules';

export interface LineItem {
    description: string;
    descriptionDe?: string;
    descriptionFr?: string;
    price: number;
    isBase?: boolean;
}

export interface QuoteResult {
    adminNotes: string;
    totalPrice: number;
    adminOverride?: boolean;
    lineItems: LineItem[];
    quoteNumber: string;
}

function generateQuoteNumber(): string {
    const prefix = 'SCM';
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${year}${month}-${random}`;
}

// Very basic fallback distance estimation if no real API is connected
// For production, integrate Google Maps Distance Matrix API here
function estimateDistance(fromZipCity: string, toZipCity: string): number {
    if (!fromZipCity || !toZipCity) return 0;
    if (fromZipCity.trim().toLowerCase() === toZipCity.trim().toLowerCase()) return 10; // Same city
    
    // Very naive approximation for demo
    const fromZip = parseInt(fromZipCity.match(/\d{4}/)?.[0] || '0');
    const toZip = parseInt(toZipCity.match(/\d{4}/)?.[0] || '0');
    
    if (fromZip && toZip) {
        const diff = Math.abs(fromZip - toZip);
        if (diff < 100) return 15; // Same region
        if (diff < 1000) return 40; // Medium distance
        return 80; // Long distance (e.g. Bern to Zurich)
    }
    
    return 25; // fallback
}

export function generateQuote(formData: any): QuoteResult {
    let lineItems: LineItem[] = [];
    const requestType = formData.requestType || 'cleaning';
    const rooms = normalizeRooms(formData.sharedRooms);
    const isHouse = formData.sharedPropertyType === 'house';
    const isExpress = formData.isExpress === 'true' || formData.isExpress === true;

    // --- 1. BASE PRICE CALCULATION ---
    let basePrice = 0;

    if (requestType === 'moving') {
        basePrice = isHouse ? PRICING_RULES.moving.houseBasePrice : (PRICING_RULES.moving.basePriceByRooms[rooms] || 0);
        if (basePrice === 0 && !isHouse) basePrice = PRICING_RULES.moving.basePriceByRooms[1]; // fallback

        lineItems.push({
            description: `Moving Service Base Price (${isHouse ? 'House' : rooms + ' Rooms'})`,
            descriptionDe: `Umzug Grundpreis (${isHouse ? 'Haus' : rooms + ' Zimmer'})`,
            descriptionFr: `Prix de base déménagement (${isHouse ? 'Maison' : rooms + ' pièces'})`,
            price: basePrice,
            isBase: true
        });

    } else if (requestType === 'cleaning') {
        basePrice = isHouse ? PRICING_RULES.cleaning.houseBasePrice : (PRICING_RULES.cleaning.basePriceByRooms[rooms] || 0);
        if (basePrice === 0 && !isHouse) basePrice = PRICING_RULES.cleaning.basePriceByRooms[1];

        lineItems.push({
            description: `Move-Out Cleaning Base Price (${isHouse ? 'House' : rooms + ' Rooms'})`,
            descriptionDe: `Umzugsreinigung Grundpreis (${isHouse ? 'Haus' : rooms + ' Zimmer'})`,
            descriptionFr: `Prix de base nettoyage (${isHouse ? 'Maison' : rooms + ' pièces'})`,
            price: basePrice,
            isBase: true
        });

    } else if (requestType === 'combo') {
        basePrice = isHouse ? PRICING_RULES.combo.houseBasePrice : (PRICING_RULES.combo.basePriceByRooms[rooms] || 0);
        if (basePrice === 0 && !isHouse) basePrice = PRICING_RULES.combo.basePriceByRooms[1];

        lineItems.push({
            description: `Combo (Moving + Cleaning) Base Price (${isHouse ? 'House' : rooms + ' Rooms'})`,
            descriptionDe: `Komplettpaket (Umzug + Reinigung) (${isHouse ? 'Haus' : rooms + ' Zimmer'})`,
            descriptionFr: `Forfait complet (Déménagement + Nettoyage) (${isHouse ? 'Maison' : rooms + ' pièces'})`,
            price: basePrice,
            isBase: true
        });

    } else if (requestType === 'transport') {
        basePrice = PRICING_RULES.transport.basePrice;
        lineItems.push({
            description: `Transport Service Base Rate`,
            descriptionDe: `Transport Grundpauschale`,
            descriptionFr: `Forfait de base transport`,
            price: basePrice,
            isBase: true
        });
    }

    // --- 2. MOVING / TRANSPORT SURCHARGES ---
    if (['moving', 'combo', 'transport'].includes(requestType)) {
        // Distance calculation
        if (formData.moveFromZipCity && formData.moveToZipCity) {
            const distanceKm = estimateDistance(formData.moveFromZipCity, formData.moveToZipCity);
            const distSurcharge = calculateDistanceSurcharge(distanceKm);
            if (distSurcharge > 0) {
                lineItems.push({
                    description: `Distance Surcharge (~${distanceKm}km)`,
                    descriptionDe: `Distanzzuschlag (~${distanceKm}km)`,
                    descriptionFr: `Supplément distance (~${distanceKm}km)`,
                    price: distSurcharge
                });
            }
        }

        // Access distance from door to parking
        const fromAccess = formData.moveFromAccess || [];
        const toAccess = formData.moveToAccess || [];
        if (fromAccess.includes('d20_50') || toAccess.includes('d20_50')) {
            lineItems.push({
                description: `Long carrying distance (20-50m)`,
                descriptionDe: `Langer Tragweg (20-50m)`,
                descriptionFr: `Longue distance de portage (20-50m)`,
                price: PRICING_RULES.moving.surcharges.accessDistance.d20_50
            });
        }
        if (fromAccess.includes('d50plus') || toAccess.includes('d50plus')) {
            lineItems.push({
                description: `Extra long carrying distance (>50m)`,
                descriptionDe: `Extra langer Tragweg (>50m)`,
                descriptionFr: `Distance de portage très longue (>50m)`,
                price: PRICING_RULES.moving.surcharges.accessDistance.d50plus
            });
        }

        // Conditions
        const conditions = formData.moveFromConditions || [];
        if (conditions.includes('noElevator')) {
            lineItems.push({
                description: `No elevator surcharge`,
                descriptionDe: `Zuschlag ohne Aufzug`,
                descriptionFr: `Supplément sans ascenseur`,
                price: PRICING_RULES.moving.surcharges.noElevatorPerFloor * 2 // Estimate 2 floors if not specified
            });
        }
        if (conditions.includes('narrowStairs')) {
            lineItems.push({
                description: `Narrow stairs surcharge`,
                descriptionDe: `Zuschlag enges Treppenhaus`,
                descriptionFr: `Supplément escaliers étroits`,
                price: PRICING_RULES.moving.surcharges.narrowStairs
            });
        }
    }

    // --- 3. CLEANING SURCHARGES ---
    if (['cleaning', 'combo'].includes(requestType)) {
        // Balcony / Terrace
        const areas = formData.cleanAreas || [];
        const balconyCount = parseInt(formData.cleanBalconyCount) || 0;
        const terraceCount = parseInt(formData.cleanTerraceCount) || 0;

        if (areas.includes('balcony') || balconyCount > 0) {
            const count = Math.max(1, balconyCount);
            lineItems.push({
                description: `Balcony cleaning (${count}x)`,
                descriptionDe: `Balkonreinigung (${count}x)`,
                descriptionFr: `Nettoyage de balcon (${count}x)`,
                price: PRICING_RULES.cleaning.surcharges.balcony * count
            });
        }

        if (areas.includes('terrace') || terraceCount > 0) {
            const count = Math.max(1, terraceCount);
            lineItems.push({
                description: `Terrace cleaning (${count}x)`,
                descriptionDe: `Terrassenreinigung (${count}x)`,
                descriptionFr: `Nettoyage de terrasse (${count}x)`,
                price: PRICING_RULES.cleaning.surcharges.terrace * count
            });
        }

        if (areas.includes('basement')) {
            lineItems.push({
                description: `Basement cleaning`,
                descriptionDe: `Kellerreinigung`,
                descriptionFr: `Nettoyage de cave`,
                price: PRICING_RULES.cleaning.surcharges.basement
            });
        }

        if (areas.includes('attic')) {
            lineItems.push({
                description: `Attic cleaning`,
                descriptionDe: `Estrichreinigung`,
                descriptionFr: `Nettoyage de grenier`,
                price: PRICING_RULES.cleaning.surcharges.attic
            });
        }

        if (areas.includes('garage')) {
            lineItems.push({
                description: `Garage cleaning`,
                descriptionDe: `Garagenreinigung`,
                descriptionFr: `Nettoyage de garage`,
                price: PRICING_RULES.cleaning.surcharges.garage
            });
        }

        if (formData.cleanPressureWashing === 'yes') {
            lineItems.push({
                description: `Pressure washing`,
                descriptionDe: `Hochdruckreinigung`,
                descriptionFr: `Nettoyage haute pression`,
                price: PRICING_RULES.cleaning.surcharges.pressureWashing
            });
        }

        if (formData.cleanDrillHoles === 'yes') {
            const holes = parseInt(formData.cleanDrillHolesCount) || 10;
            lineItems.push({
                description: `Closing drill holes (~${holes} holes)`,
                descriptionDe: `Dübellöcher schliessen (~${holes} Löcher)`,
                descriptionFr: `Rebouchage trous (~${holes} trous)`,
                price: PRICING_RULES.cleaning.surcharges.drillHolesPerHole * holes
            });
        }
    }

    // --- 4. CALCULATE SUBTOTAL & EXPRESS ---
    let subtotal = lineItems.reduce((acc, item) => acc + item.price, 0);

    if (isExpress) {
        const expressFee = Math.round(subtotal * (PRICING_RULES.expressMultiplier - 1));
        lineItems.push({
            description: `Express Surcharge (20%)`,
            descriptionDe: `Expresszuschlag (20%)`,
            descriptionFr: `Supplément express (20%)`,
            price: expressFee
        });
        subtotal += expressFee;
    }

    // --- 5. Totals ---
    return {
        lineItems,
        totalPrice: subtotal,
        adminNotes: '',
        quoteNumber: generateQuoteNumber()
    };
}
