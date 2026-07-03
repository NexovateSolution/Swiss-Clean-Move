import { PRICING_RULES } from '../lib/pricingRules';

export interface QuoteLineItem {
  id: string; // Translation key
  price: number;
  description?: string;
  isSurcharge?: boolean;
  isDiscount?: boolean;
  isFallback?: boolean;
  descriptionEn?: string;
  descriptionDe?: string;
  descriptionFr?: string;
}

export interface QuoteResult {
  totalEstimatedPrice: number | null;
  isFallback: boolean; // True if price says "On Request" or "Individuelle Offerte"
  lineItems: QuoteLineItem[];
  quoteNumber?: string;
}

/**
 * Extracts a numeric value from a string, or returns null.
 */
const extractNumber = (val: string | number | undefined): number | null => {
  if (!val) return null;
  if (typeof val === 'number') return val;
  const match = val.toString().match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
};

/**
 * Helper to get room key for lookup objects
 */
const getRoomKey = (rooms: number): string => {
  const r = Math.max(1, Math.min(12, rooms));
  // Round to nearest 0.5
  const rounded = Math.round(r * 2) / 2;
  return rounded === Math.floor(rounded) ? rounded.toString() : rounded.toString();
};

/**
 * Normalizes service types from different parts of the app to the core 7 services
 */
const normalizeServiceType = (serviceType: string): string => {
  const type = serviceType.toLowerCase();
  if (type.includes('umzug') || type.includes('moving') || type.includes('relocation')) return 'moving';
  if (type.includes('reinigung') && !type.includes('unterhalt') && !type.includes('gastronomie') && !type.includes('bau')) return 'cleaning';
  if (type.includes('entsorgung') || type.includes('disposal') || type.includes('clearance')) return 'disposal';
  if (type.includes('unterhaltsreinigung') || type.includes('maintenance')) return 'maintenance';
  if (type.includes('haushaltshilfe') || type.includes('household')) return 'household';
  if (type.includes('gastronomie') || type.includes('restaurant')) return 'gastronomy';
  if (type.includes('facility') || type.includes('hauswartung')) return 'facilityService';
  return type;
};

export function calculateQuote(rawServiceType: string, formData: any): QuoteResult {
  const result: QuoteResult = {
    totalEstimatedPrice: 0,
    isFallback: false,
    lineItems: []
  };

  const serviceType = normalizeServiceType(rawServiceType);
  const propertyType = (formData.propertyType || formData.typeOfProperty || formData.objectType || 'apartment').toLowerCase();
  const isHouse = propertyType.includes('haus') || propertyType.includes('house') || propertyType.includes('villa');
  const rooms = extractNumber(formData.numberOfRooms || formData.rooms);
  const squareMeters = extractNumber(formData.squareMeters || formData.area || formData.livingSpace);
  
  // Generic Modifiers
  const dirtLevel = formData.dirtLevel || formData.condition || 'normal';
  const noElevator = formData.elevator === false || formData.elevator === 'no' || formData.hasElevator === false;
  const floor = extractNumber(formData.floor || formData.floorsLevel) || 0;
  const noParking = formData.parking === false || formData.parking === 'no';
  
  // Date Modifiers
  const isExpress = formData.isExpress === true || formData.urgency === 'express';
  const isSaturday = formData.isSaturday === true || (formData.dayOfWeek && formData.dayOfWeek.toLowerCase() === 'saturday');
  const isSunday = formData.isSunday === true || (formData.dayOfWeek && formData.dayOfWeek.toLowerCase() === 'sunday');
  const isHoliday = formData.isHoliday === true;

  // Generic function to apply Date Surcharges
  const applyDateSurcharges = (basePrice: number, ruleset: any) => {
    let subtotal = 0;
    if (isExpress && ruleset.expressWithin48h) {
      const surcharge = basePrice * ruleset.expressWithin48h;
      result.lineItems.push({ id: 'quote.items.surcharge.express', price: surcharge, isSurcharge: true });
      subtotal += surcharge;
    }
    if (isSaturday && ruleset.saturday) {
      const surcharge = basePrice * ruleset.saturday;
      result.lineItems.push({ id: 'quote.items.surcharge.saturday', price: surcharge, isSurcharge: true });
      subtotal += surcharge;
    }
    if (isSunday && ruleset.sunday) {
      const surcharge = basePrice * ruleset.sunday;
      result.lineItems.push({ id: 'quote.items.surcharge.sunday', price: surcharge, isSurcharge: true });
      subtotal += surcharge;
    }
    if (isHoliday && ruleset.holiday && !isSunday) { // Don't double charge sunday/holiday usually
      const surcharge = basePrice * ruleset.holiday;
      result.lineItems.push({ id: 'quote.items.surcharge.holiday', price: surcharge, isSurcharge: true });
      subtotal += surcharge;
    }
    return subtotal;
  };

  switch (serviceType) {
    case 'moving': {
      const rules = PRICING_RULES.moving;
      const roomKey = getRoomKey(rooms || 1); // Defaults to 1 room if undefined, but we should probably require it. However, the UI might send 1.

      
      const basePrice = rules.baseRates[roomKey];
      if (!basePrice) {
        result.isFallback = true;
        break;
      }

      result.lineItems.push({ id: 'quote.items.moving.base', price: basePrice });
      result.totalEstimatedPrice! += basePrice;

      // Distance
      const distance = extractNumber(formData.distance) || 0;
      if (distance > 10 && distance <= 30) {
        result.lineItems.push({ id: 'quote.items.moving.distance.11_30', price: rules.distance['11-30'], isSurcharge: true });
        result.totalEstimatedPrice! += rules.distance['11-30'];
      } else if (distance > 30 && distance <= 50) {
        result.lineItems.push({ id: 'quote.items.moving.distance.31_50', price: rules.distance['31-50'], isSurcharge: true });
        result.totalEstimatedPrice! += rules.distance['31-50'];
      } else if (distance > 50 && distance <= 100) {
        result.lineItems.push({ id: 'quote.items.moving.distance.51_100', price: rules.distance['51-100'], isSurcharge: true });
        result.totalEstimatedPrice! += rules.distance['51-100'];
      } else if (distance > 100) {
        const extraKm = distance - 100;
        const distCost = rules.distance['51-100'] + (extraKm * rules.distance.perKmOver100);
        result.lineItems.push({ id: 'quote.items.moving.distance.over100', price: distCost, isSurcharge: true });
        result.totalEstimatedPrice! += distCost;
      }

      // Floors without elevator
      if (noElevator && floor >= rules.floorWithoutElevator.thresholdFloor) {
        const floorCost = floor * rules.floorWithoutElevator.perFloor;
        result.lineItems.push({ id: 'quote.items.surcharge.floor', price: floorCost, isSurcharge: true });
        result.totalEstimatedPrice! += floorCost;
      }

      // Carrying distance
      const carryingDistance = extractNumber(formData.carryingDistance) || 0;
      if (carryingDistance >= 20 && carryingDistance <= 50) {
        result.lineItems.push({ id: 'quote.items.moving.carry.20_50', price: rules.carryingDistance['20-50'], isSurcharge: true });
        result.totalEstimatedPrice! += rules.carryingDistance['20-50'];
      } else if (carryingDistance > 50) {
        result.lineItems.push({ id: 'quote.items.moving.carry.over50', price: rules.carryingDistance.over50, isSurcharge: true });
        result.totalEstimatedPrice! += rules.carryingDistance.over50;
      }

      // Additional Services
      if (formData.packingService) { result.lineItems.push({ id: 'quote.items.moving.addon.packing', price: rules.additionalServices.packingService, isSurcharge: true }); result.totalEstimatedPrice! += rules.additionalServices.packingService; }
      if (formData.unpackingService) { result.lineItems.push({ id: 'quote.items.moving.addon.unpacking', price: rules.additionalServices.unpackingService, isSurcharge: true }); result.totalEstimatedPrice! += rules.additionalServices.unpackingService; }
      if (formData.furnitureAssembly) { result.lineItems.push({ id: 'quote.items.moving.addon.assembly', price: rules.additionalServices.furnitureAssembly, isSurcharge: true }); result.totalEstimatedPrice! += rules.additionalServices.furnitureAssembly; }
      if (formData.furnitureDisassembly) { result.lineItems.push({ id: 'quote.items.moving.addon.disassembly', price: rules.additionalServices.furnitureDisassembly, isSurcharge: true }); result.totalEstimatedPrice! += rules.additionalServices.furnitureDisassembly; }
      if (formData.furnitureLift) { result.lineItems.push({ id: 'quote.items.moving.addon.lift', price: rules.additionalServices.furnitureLift, isSurcharge: true }); result.totalEstimatedPrice! += rules.additionalServices.furnitureLift; }

      // Heavy Items
      if (formData.heavyItems && Array.isArray(formData.heavyItems)) {
        formData.heavyItems.forEach((item: string) => {
          const key = item as keyof typeof rules.heavyItems;
          if (rules.heavyItems[key]) {
            result.lineItems.push({ id: `quote.items.moving.heavy.${key}`, price: rules.heavyItems[key], isSurcharge: true });
            result.totalEstimatedPrice! += rules.heavyItems[key];
          }
        });
      }

      // Extra Staff
      const extraWorkers = extractNumber(formData.extraWorkers) || 0;
      const extraHours = extractNumber(formData.extraHours) || 1;
      if (extraWorkers > 0) {
        const staffCost = extraWorkers * rules.extraStaff.additionalWorkerPerHour * extraHours;
        result.lineItems.push({ id: 'quote.items.moving.extraStaff', price: staffCost, isSurcharge: true });
        result.totalEstimatedPrice! += staffCost;
      }

      result.totalEstimatedPrice! += applyDateSurcharges(basePrice, rules.dateSurcharges);
      break;
    }

    case 'cleaning': {
      const rules = PRICING_RULES.cleaning;
      const roomKey = getRoomKey(rooms || 1);
      
      const basePrice = isHouse ? rules.house[roomKey] : rules.apartment[roomKey];

      if (!basePrice) {
        result.isFallback = true;
        break;
      }

      result.lineItems.push({ id: 'quote.items.cleaning.base', price: basePrice });
      result.totalEstimatedPrice! += basePrice;

      // Surcharges
      if (formData.hasBalcony) {
        const price = formData.largeBalcony ? rules.surcharges.largeBalcony : rules.surcharges.balcony;
        result.lineItems.push({ id: 'quote.items.cleaning.addon.balcony', price, isSurcharge: true });
        result.totalEstimatedPrice! += price;
      }
      if (formData.hasBasement) { result.lineItems.push({ id: 'quote.items.cleaning.addon.basement', price: rules.surcharges.basement, isSurcharge: true }); result.totalEstimatedPrice! += rules.surcharges.basement; }
      if (formData.hasAttic) { result.lineItems.push({ id: 'quote.items.cleaning.addon.attic', price: rules.surcharges.attic, isSurcharge: true }); result.totalEstimatedPrice! += rules.surcharges.attic; }
      if (formData.hasGarage) { result.lineItems.push({ id: 'quote.items.cleaning.addon.garage', price: rules.surcharges.garage, isSurcharge: true }); result.totalEstimatedPrice! += rules.surcharges.garage; }

      // Dirt Level
      if (dirtLevel === 'extreme' || dirtLevel === 'extrem') {
        result.isFallback = true;
        break;
      } else if (dirtLevel === 'veryHeavy' || dirtLevel === 'sehr_stark') {
        const dirtCost = basePrice * rules.dirtLevel.veryHeavy;
        result.lineItems.push({ id: 'quote.items.cleaning.dirtLevel.veryHeavy', price: dirtCost, isSurcharge: true });
        result.totalEstimatedPrice! += dirtCost;
      } else if (dirtLevel === 'heavy' || dirtLevel === 'stark') {
        const dirtCost = basePrice * rules.dirtLevel.heavy;
        result.lineItems.push({ id: 'quote.items.cleaning.dirtLevel.heavy', price: dirtCost, isSurcharge: true });
        result.totalEstimatedPrice! += dirtCost;
      }
      
      break;
    }

    case 'disposal': {
      const rules = PRICING_RULES.disposal;
      const volume = extractNumber(formData.volume) || 1;
      
      let basePrice = 0;
      if (volume <= 1) basePrice = rules.volumePricing['1'];
      else if (volume <= 2) basePrice = rules.volumePricing['2'];
      else if (volume <= 3) basePrice = rules.volumePricing['3'];
      else if (volume <= 5) basePrice = rules.volumePricing['5'];
      else if (volume <= 8) basePrice = rules.volumePricing['8'];
      else if (volume <= 10) basePrice = rules.volumePricing['10'];
      else if (volume <= 15) basePrice = rules.volumePricing['15'];
      else if (volume <= 20) basePrice = rules.volumePricing['20'];
      else {
        result.isFallback = true;
        break;
      }

      result.lineItems.push({ id: 'quote.items.disposal.base', price: basePrice });
      result.totalEstimatedPrice! += basePrice;
      break;
    }

    case 'maintenance': {
      const rules = PRICING_RULES.maintenance;
      const hours = extractNumber(formData.hours);
      
      if (!hours) {
        result.isFallback = true;
        break;
      }
      
      let hourlyRate: number = rules.hourlyRates.residential;
      if (propertyType.includes('office') || propertyType.includes('büro') || propertyType.includes('praxis')) hourlyRate = rules.hourlyRates.office;
      if (propertyType.includes('commercial') || propertyType.includes('restaurant') || propertyType.includes('gewerbe')) hourlyRate = rules.hourlyRates.commercial;

      const basePrice = hourlyRate * hours;
      result.lineItems.push({ id: `quote.items.maintenance.base`, price: basePrice });
      result.totalEstimatedPrice! += basePrice;
      
      // Access surcharges
      if (noElevator && floor >= 2) {
        const floorCost = floor * rules.access.noElevatorPerFloor;
        result.lineItems.push({ id: 'quote.items.surcharge.floor', price: floorCost, isSurcharge: true });
        result.totalEstimatedPrice! += floorCost;
      }
      if (noParking) {
        result.lineItems.push({ id: 'quote.items.surcharge.noParking', price: rules.access.noParking, isSurcharge: true });
        result.totalEstimatedPrice! += rules.access.noParking;
      }

      result.totalEstimatedPrice! += applyDateSurcharges(basePrice, rules.dateSurcharges);
      break;
    }

    case 'household': {
      const rules = PRICING_RULES.household;
      const hours = extractNumber(formData.hours);
      
      if (!hours) {
        result.isFallback = true;
        break;
      }
      
      let hourlyRate: number = rules.hourlyRates.weekday;
      if (isSaturday) hourlyRate = rules.hourlyRates.saturday;
      if (isSunday || isHoliday) hourlyRate = rules.hourlyRates.sundayHoliday;

      const basePrice = hourlyRate * hours;
      result.lineItems.push({ id: `quote.items.household.base`, price: basePrice });
      result.totalEstimatedPrice! += basePrice;
      
      // Access surcharges
      if (noElevator && floor >= 2) {
        const floorCost = floor * rules.access.noElevatorPerFloor;
        result.lineItems.push({ id: 'quote.items.surcharge.floor', price: floorCost, isSurcharge: true });
        result.totalEstimatedPrice! += floorCost;
      }
      if (noParking) {
        result.lineItems.push({ id: 'quote.items.surcharge.noParking', price: rules.access.noParking, isSurcharge: true });
        result.totalEstimatedPrice! += rules.access.noParking;
      }

      result.totalEstimatedPrice! += applyDateSurcharges(basePrice, rules.dateSurcharges);
      break;
    }

    case 'gastronomy': {
      const rules = PRICING_RULES.gastronomy;
      
      if (!squareMeters) {
        result.isFallback = true;
        break;
      }
      
      let basePrice = 0;
      if (squareMeters <= 50) basePrice = rules.basePricesBySqm['50'];
      else if (squareMeters <= 100) basePrice = rules.basePricesBySqm['100'];
      else if (squareMeters <= 150) basePrice = rules.basePricesBySqm['150'];
      else if (squareMeters <= 200) basePrice = rules.basePricesBySqm['200'];
      else if (squareMeters <= 300) basePrice = rules.basePricesBySqm['300'];
      else {
        result.isFallback = true;
        break;
      }

      result.lineItems.push({ id: 'quote.items.gastronomy.base', price: basePrice });
      result.totalEstimatedPrice! += basePrice;

      // Access surcharges
      if (noElevator && floor >= 2) {
        const floorCost = floor * rules.access.noElevatorPerFloor;
        result.lineItems.push({ id: 'quote.items.surcharge.floor', price: floorCost, isSurcharge: true });
        result.totalEstimatedPrice! += floorCost;
      }
      if (noParking) {
        result.lineItems.push({ id: 'quote.items.surcharge.noParking', price: rules.access.noParking, isSurcharge: true });
        result.totalEstimatedPrice! += rules.access.noParking;
      }

      result.totalEstimatedPrice! += applyDateSurcharges(basePrice, rules.dateSurcharges);
      break;
    }

    case 'facilityService': {
      const rules = PRICING_RULES.facilityService;
      const frequency = (formData.frequency || 'onetime').toLowerCase();
      const isOneTime = frequency.includes('one') || frequency.includes('einmalig');
      const priceTable = isOneTime ? rules.oneTime : rules.monthly;

      if (!squareMeters) {
        result.isFallback = true;
        break;
      }

      let basePrice = 0;
      if (squareMeters <= 200) basePrice = priceTable['200'];
      else if (squareMeters <= 500) basePrice = priceTable['500'];
      else if (squareMeters <= 1000) basePrice = priceTable['1000'];
      else if (squareMeters <= 2000) basePrice = priceTable['2000'];
      else {
        result.isFallback = true;
        break;
      }

      result.lineItems.push({ id: 'quote.items.facilityService.base', price: basePrice });
      result.totalEstimatedPrice! += basePrice;
      result.totalEstimatedPrice! += applyDateSurcharges(basePrice, rules.dateSurcharges);
      break;
    }

    default:
      result.isFallback = true;
  }

  // If at any point it was marked as fallback, clear the total price
  if (result.isFallback) {
    result.totalEstimatedPrice = null;
  } else {
    // Apply automatic 5% discount
    const discountAmount = result.totalEstimatedPrice! * 0.05;
    result.lineItems.push({ 
      id: 'quote.items.discount', 
      price: -discountAmount,
      isDiscount: true 
    });
    result.totalEstimatedPrice! -= discountAmount;

    // Round to nearest integer (or .50) for clean display, but let's keep it exact for now and format in UI
    result.totalEstimatedPrice = Math.round(result.totalEstimatedPrice! * 100) / 100;
  }

  return result;
}