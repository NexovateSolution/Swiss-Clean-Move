export interface UniversalFormData {
  // 1. Customer Details
  salutation: 'Mister' | 'Woman' | '';
  firstName: string;
  name: string;
  company: string;
  emailAddress: string;
  telephone: string;

  // 2. Services (multi-select keys matching translation keys)
  services: string[];

  // 3. Property Location (Collection / Service address)
  streetAndNumber: string;
  postalCodeAndCity: string;
  propertyType: string;
  numberOfRooms: string;
  livingSpaceInM2: string;
  floors: string;
  lift: string;
  parking: string;

  // 3b. Delivery address (Moving)
  unloadingStreetAndNumber: string;
  unloadingPostalCodeAndCity: string;
  unloadingFloors: string;
  unloadingLift: string;
  unloadingParking: string;

  // 4. Date & Contact
  preferredDate: string;
  timeWindow: string;
  propertyHandover: string;
  contactPreferredVia: string;
  photosVia: string;

  // 5. Cleaning Details
  cleaningTypes: string[];
  recurringFrequency: string;
  areasToClean: string;
  windowStandard: string;
  windowFloorToCeiling: string;
  windowRoof: string;
  windowGlassDoors: string;
  blindVenetian: string;
  blindRoller: string;
  blindShutters: string;
  blindAwnings: string;
  sanitaryToilets: string;
  sanitaryBathtubs: string;
  sanitaryShowers: string;
  sanitaryWashbasins: string;
  sanitaryKitchens: string;
  floorTypes: string[];
  vacuumCarpetOnly: boolean;
  deepCarpetCleaning: boolean;
  balconyCleaning: boolean;
  balconyArea: string;
  highPressureCleaning: boolean;
  repairWallHoles: boolean;
  holesCount: string;
  propertyCondition: string[];
  additionalDetails: string;

  // 6. Moving Details
  movingScope: string[];
  inventoryBoxes: string;
  inventoryWardrobes: string;
  inventoryBeds: string;
  inventorySofas: string;
  inventoryTables: string;
  inventoryChairs: string;
  inventoryDressers: string;
  inventoryLargeAppliances: string;
  additionalInventory: string;
  specialItems: string[];
  specialItemsDetails: string;
  noParkingCollection: boolean;
  noParkingDelivery: boolean;
  movingDateFlexible: boolean;
  staffCount: string;

  // 7. Review
  agreeToTerms: boolean;

  // Legacy compat: viewingIsWelcome from old ServiceForm
  viewingIsWelcome: string;
  remark: string;

  // 8. Admin Pricing Fields
  totalPrice?: string;
  paidAmount?: string;
  fromDate?: string;
  untilDate?: string;
  accessHandoverDate?: string;
  accessHandoverTime?: string;
  calcFrequency?: string;
  calcHours?: string;
}

export const initialUniversalFormData: UniversalFormData = {
  salutation: '',
  firstName: '',
  name: '',
  company: '',
  emailAddress: '',
  telephone: '',
  services: [],
  streetAndNumber: '',
  postalCodeAndCity: '',
  propertyType: 'apartment',
  numberOfRooms: '',
  livingSpaceInM2: '',
  floors: '',
  lift: '',
  parking: '',
  unloadingStreetAndNumber: '',
  unloadingPostalCodeAndCity: '',
  unloadingFloors: '',
  unloadingLift: '',
  unloadingParking: '',
  preferredDate: '',
  timeWindow: '',
  propertyHandover: '',
  contactPreferredVia: '',
  photosVia: '',
  cleaningTypes: [],
  recurringFrequency: '',
  areasToClean: '',
  windowStandard: '',
  windowFloorToCeiling: '',
  windowRoof: '',
  windowGlassDoors: '',
  blindVenetian: '',
  blindRoller: '',
  blindShutters: '',
  blindAwnings: '',
  sanitaryToilets: '',
  sanitaryBathtubs: '',
  sanitaryShowers: '',
  sanitaryWashbasins: '',
  sanitaryKitchens: '',
  floorTypes: [],
  vacuumCarpetOnly: false,
  deepCarpetCleaning: false,
  balconyCleaning: false,
  balconyArea: '',
  highPressureCleaning: false,
  repairWallHoles: false,
  holesCount: '',
  propertyCondition: [],
  additionalDetails: '',
  movingScope: [],
  inventoryBoxes: '',
  inventoryWardrobes: '',
  inventoryBeds: '',
  inventorySofas: '',
  inventoryTables: '',
  inventoryChairs: '',
  inventoryDressers: '',
  inventoryLargeAppliances: '',
  additionalInventory: '',
  specialItems: [],
  specialItemsDetails: '',
  noParkingCollection: false,
  noParkingDelivery: false,
  movingDateFlexible: false,
  staffCount: '',
  agreeToTerms: false,
  viewingIsWelcome: '',
  remark: ''
};

export interface FormSliceProps {
  data: UniversalFormData;
  updateData: (updates: Partial<UniversalFormData>) => void;
  t: (key: string, values?: any) => string;
}

// Services that trigger the "Cleaning Details" step
export const CLEANING_SERVICE_KEYS = [
  'movingOutCleaning',
  'maintenanceCleaning',
  'officeCleaning',
  'restaurantCleaning',
  'windowCleaning',
  'constructionCleaning',
  'caretaking',
  'highPressureCleaning',
  'stairwellCleaning',
  'specialistCleaning'
];

// Services that trigger the "Moving Details" step
export const MOVING_SERVICE_KEYS = [
  'movingTransport',
  'packingService',
  'furnitureAssembly',
  'disposalClearance'
];

export function hasCleaningService(services: string[]): boolean {
  return services.some(s => CLEANING_SERVICE_KEYS.includes(s));
}

export function hasMovingService(services: string[]): boolean {
  return services.some(s => MOVING_SERVICE_KEYS.includes(s));
}
