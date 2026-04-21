const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src/lib/translations.ts');
let content = fs.readFileSync(p, 'utf8');

const newKeys = {
  requestType: { en: 'Request Type', de: 'Anfrage Typ', fr: 'Type de demande' },
  preferredDate: { en: 'Preferred Date', de: 'Gewünschtes Datum', fr: 'Date souhaitée' },
  preferredTime: { en: 'Preferred Time', de: 'Bevorzugte Uhrzeit', fr: 'Heure souhaitée' },
  isFlexible: { en: 'Date is Flexible', de: 'Termin ist flexibel', fr: 'Date flexible' },
  isExpress: { en: 'Express Request', de: 'Express-Anfrage', fr: 'Demande express' },
  sharedPropertyType: { en: 'Property Type', de: 'Objektart', fr: 'Type de bien' },
  sharedRooms: { en: 'Number of Rooms', de: 'Anzahl Zimmer', fr: 'Nombre de pièces' },
  sharedLivingArea: { en: 'Living Area (m²)', de: 'Wohnfläche (m²)', fr: 'Surface habitable' },
  sharedFloor: { en: 'Floor', de: 'Etage', fr: 'Étage' },
  sharedElevator: { en: 'Elevator', de: 'Lift', fr: 'Ascenseur' },
  sharedParking: { en: 'Parking', de: 'Parkplatz', fr: 'Parking' },
  sharedParkingDistance: { en: 'Parking Distance', de: 'Distanz zum Parkplatz', fr: 'Distance du parking' },
  moveFromStreet: { en: 'Move-out Street/No', de: 'Auszugsadresse Strasse/Nr', fr: 'Rue de départ' },
  moveFromZipCity: { en: 'Move-out ZIP/City', de: 'Auszugsadresse PLZ/Ort', fr: 'NPA/Localité de départ' },
  moveFromAccess: { en: 'Move-out Parking Distance', de: 'Auszug: Distanz Parkplatz', fr: 'Départ: Distance parking' },
  moveFromConditions: { en: 'Move-out Special Conditions', de: 'Auszug: Besonderheiten', fr: 'Départ: Conditions spéciales' },
  moveToStreet: { en: 'Move-in Street/No', de: 'Einzugsadresse Strasse/Nr', fr: "Rue d'arrivée" },
  moveToZipCity: { en: 'Move-in ZIP/City', de: 'Einzugsadresse PLZ/Ort', fr: "NPA/Localité d'arrivée" },
  moveToAccess: { en: 'Move-in Parking Distance', de: 'Einzug: Distanz Parkplatz', fr: 'Arrivée: Distance parking' },
  moveToConditions: { en: 'Move-in Special Conditions', de: 'Einzug: Besonderheiten', fr: 'Arrivée: Conditions spéciales' },
  moveVolume: { en: 'Moving Volume', de: 'Umzugsvolumen', fr: 'Volume du déménagement' },
  moveBoxes: { en: 'Moving Boxes', de: 'Umzugskartons', fr: 'Cartons' },
  moveFurniture: { en: 'Furniture / Appliances', de: 'Möbel / Geräte', fr: 'Meubles / Appareils' },
  moveSpecialItems: { en: 'Special Items', de: 'Spezialgegenstände', fr: 'Objets spéciaux' },
  moveServices: { en: 'Moving Services', de: 'Zusatzleistungen', fr: 'Services de déménagement' },
  cleanStreet: { en: 'Cleaning Street/No', de: 'Reinigungsadresse Strasse/Nr', fr: 'Rue de nettoyage' },
  cleanZipCity: { en: 'Cleaning ZIP/City', de: 'Reinigungsadresse PLZ/Ort', fr: 'NPA/Localité de nettoyage' },
  cleanBathrooms: { en: 'Bathrooms', de: 'Badezimmer', fr: 'Salles de bain' },
  cleanToilets: { en: 'Toilets', de: 'WC', fr: 'Toilettes' },
  cleanKitchen: { en: 'Kitchen Available', de: 'Küche vorhanden', fr: 'Cuisine' },
  cleanKitchenState: { en: 'Kitchen State', de: 'Zustand der Küche', fr: 'État de cuisine' },
  cleanWindowsCount: { en: 'Number of Windows', de: 'Anzahl Fenster', fr: 'Nombre de fenêtres' },
  cleanBalconyDoors: { en: 'Balcony Doors', de: 'Balkontüren', fr: 'Portes de balcon' },
  cleanWindowTypes: { en: 'Window Types', de: 'Fenstertypen', fr: 'Types de fenêtres' },
  cleanSpecialGlass: { en: 'Special Glass Surfaces', de: 'Spezielle Glasflächen', fr: 'Surfaces vitrées spéciales' },
  cleanCondition: { en: 'Property Condition', de: 'Zustand', fr: 'État de propreté' },
  cleanPets: { en: 'Pets', de: 'Haustiere', fr: 'Animaux domestiques' },
  cleanAreas: { en: 'Additional Areas', de: 'Zusatzbereiche', fr: 'Zones supplémentaires' },
  accessKey: { en: 'Access Method', de: 'Zugangsart', fr: "Méthode d'accès" },
  accessIndependent: { en: 'Independent Access', de: 'Selbstständiger Zugang', fr: 'Accès indépendant' },
  accessHandoverDate: { en: 'Handover Date', de: 'Abgabetermin', fr: 'Date de remise' },
  accessOptions: { en: 'Handover Options', de: 'Abnahmeoptionen', fr: 'Options de remise' },
  contactMethods: { en: 'Preferred Contact Method', de: 'Kontaktwunsch', fr: 'Méthode de contact' },
  acceptPrivacy: { en: 'Privacy Policy Accepted', de: 'Datenschutz akzeptiert', fr: 'Confidentialité acceptée' }
};

const newVals = {
  moving: { en: 'Moving', de: 'Umzug', fr: 'Déménagement' },
  cleaning: { en: 'Cleaning', de: 'Reinigung', fr: 'Nettoyage' },
  combo: { en: 'Moving + Cleaning', de: 'Umzug + Reinigung', fr: 'Déménagement + Nettoyage' },
  wgRoom: { en: 'Shared Room (WG)', de: 'WG-Zimmer', fr: 'Chambre en colocation' },
  f1_2: { en: '1-2', de: '1-2', fr: '1-2' },
  f3_4: { en: '3-4', de: '3-4', fr: '3-4' },
  f5_6: { en: '5-6', de: '5-6', fr: '5-6' },
  f7plus: { en: '7+', de: '7+', fr: '7+' },
  direct: { en: 'Directly in front', de: 'Direkt vor dem Gebäude', fr: 'Directement devant' },
  d0_20: { en: '0-20m', de: '0-20m', fr: '0-20m' },
  d20_50: { en: '20-50m', de: '20-50m', fr: '20-50m' },
  d50plus: { en: '50m+', de: 'Mehr als 50m', fr: 'Plus de 50m' },
  narrowStairs: { en: 'Narrow Stairs', de: 'Enge Treppen', fr: 'Escaliers étroits' },
  noElevator: { en: 'No Usable Elevator', de: 'Kein nutzbarer Lift', fr: "Pas d'ascenseur" },
  longDistances: { en: 'Long Distances', de: 'Lange Tragewege', fr: 'Longues distances' },
  limitedAccess: { en: 'Limited Access', de: 'Zufahrt eingeschränkt', fr: 'Accès limité' },
  b0_20: { en: '0-20', de: '0-20', fr: '0-20' },
  b20_50: { en: '20-50', de: '20-50', fr: '20-50' },
  b50_100: { en: '50-100', de: '50-100', fr: '50-100' },
  b100plus: { en: '100+', de: '100+', fr: '100+' },
  assembly: { en: 'Assembly/Disassembly', de: 'Montage/Demontage', fr: 'Montage/Démontage' },
  packingService: { en: 'Packing Service', de: 'Verpackungsservice', fr: "Service d'emballage" },
  packingMaterials: { en: 'Packing Materials', de: 'Verpackungsmaterial', fr: "Matériel d'emballage" },
  disposal: { en: 'Disposal', de: 'Entsorgung', fr: 'Élimination' },
  storage: { en: 'Storage', de: 'Zwischenlagerung', fr: 'Stockage' },
  cleaningRequested: { en: 'Cleaning Requested', de: 'Umzugsreinigung gewünscht', fr: 'Nettoyage demandé' },
  d0: { en: '0', de: '0', fr: '0' },
  d1_2: { en: '1-2', de: '1-2', fr: '1-2' },
  d3_5: { en: '3-5', de: '3-5', fr: '3-5' },
  d5plus: { en: '5+', de: '5+', fr: '5+' },
  sliding: { en: 'Sliding Windows', de: 'Schiebefenster', fr: 'Fenêtres coulissantes' },
  glassFront: { en: 'Glass Front', de: 'Glasfront', fr: 'Façade en verre' },
  winterGarden: { en: 'Winter Garden', de: 'Wintergarten', fr: "Jardin d'hiver" },
  afterRenovation: { en: 'After Renovation', de: 'Nach Renovation', fr: 'Après rénovation' },
  personal: { en: 'Personal', de: 'Persönlich', fr: 'Personnel' },
  keySafe: { en: 'Key Safe', de: 'Schlüsselsafe', fr: 'Boîte à clés' },
  caretaker: { en: 'Caretaker', de: 'Hauswart/Verwaltung', fr: 'Concierge' },
  undecided: { en: 'Undecided', de: 'Noch offen', fr: 'Indécis' },
};

let keyStr = '';
for (const [k, v] of Object.entries(newKeys)) {
  keyStr += `            ${k}: { en: '${v.en.replace(/'/g, "\\'")}', de: '${v.de.replace(/'/g, "\\'")}', fr: '${v.fr.replace(/'/g, "\\'")}' },\n`;
}

let valStr = '';
for (const [k, v] of Object.entries(newVals)) {
  valStr += `            ${k.includes('-') || ['public', 'private'].includes(k) ? `'${k}'` : k}: { en: '${v.en.replace(/'/g, "\\'")}', de: '${v.de.replace(/'/g, "\\'")}', fr: '${v.fr.replace(/'/g, "\\'")}' },\n`;
}

content = content.replace('export const keyLabels: Record<string, Record<string, string>> = {\n', 'export const keyLabels: Record<string, Record<string, string>> = {\n' + keyStr);
content = content.replace('export const valLabels: Record<string, Record<string, string>> = {\n', 'export const valLabels: Record<string, Record<string, string>> = {\n' + valStr);

fs.writeFileSync(p, content);
console.log('Admin translations injected successfully.');
