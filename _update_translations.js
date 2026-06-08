const fs = require('fs');
const content = fs.readFileSync('src/lib/translations.ts', 'utf8');

const newKeys = {
  isFlexible: { en: 'Is Flexible', de: 'Ist flexibel', fr: 'Est flexible' },
  moveVolume: { en: 'Move Volume', de: 'Umzugsvolumen', fr: 'Volume de déménagement' },
  requestType: { en: 'Request Type', de: 'Anfrageart', fr: 'Type de demande' },
  sharedFloor: { en: 'Floor', de: 'Stockwerk', fr: 'Étage' },
  sharedRooms: { en: 'Rooms', de: 'Zimmer', fr: 'Pièces' },
  moveBoxTypes: { en: 'Box Types', de: 'Kartonarten', fr: 'Types de cartons' },
  moveServices: { en: 'Move Services', de: 'Umzugsservices', fr: 'Services de déménagement' },
  moveToAccess: { en: 'Access (Destination)', de: 'Zugang (Zielort)', fr: 'Accès (Destination)' },
  moveToStreet: { en: 'Street (Destination)', de: 'Strasse (Zielort)', fr: 'Rue (Destination)' },
  acceptPrivacy: { en: 'Privacy Accepted', de: 'Datenschutz akzeptiert', fr: 'Confidentialité acceptée' },
  moveFurniture: { en: 'Furniture', de: 'Möbel', fr: 'Meubles' },
  moveToZipCity: { en: 'ZIP/City (Destination)', de: 'PLZ/Ort (Zielort)', fr: 'NPA/Lieu (Destination)' },
  preferredDate: { en: 'Preferred Date', de: 'Bevorzugtes Datum', fr: 'Date préférée' },
  bevorzugteZeit: { en: 'Preferred Time', de: 'Bevorzugte Zeit', fr: 'Heure préférée' },
  sharedParking: { en: 'Parking', de: 'Parkplatz', fr: 'Parking' },
  contactMethods: { en: 'Contact Methods', de: 'Kontaktmethoden', fr: 'Méthodes de contact' },
  moveFromAccess: { en: 'Access (Origin)', de: 'Zugang (Startort)', fr: 'Accès (Origine)' },
  moveFromStreet: { en: 'Street (Origin)', de: 'Strasse (Startort)', fr: 'Rue (Origine)' },
  sharedElevator: { en: 'Elevator', de: 'Aufzug', fr: 'Ascenseur' },
  weitereWünsche: { en: 'Further Requests', de: 'Weitere Wünsche', fr: 'Autres souhaits' },
  moveFromZipCity: { en: 'ZIP/City (Origin)', de: 'PLZ/Ort (Startort)', fr: 'NPA/Lieu (Origine)' },
  moveSpecialItems: { en: 'Special Items', de: 'Spezielle Gegenstände', fr: 'Objets spéciaux' },
  moveToConditions: { en: 'Conditions (Destination)', de: 'Bedingungen (Zielort)', fr: 'Conditions (Destination)' },
  sharedLivingArea: { en: 'Living Area (m²)', de: 'Wohnfläche (m²)', fr: 'Surface habitable (m²)' },
  moveFromConditions: { en: 'Conditions (Origin)', de: 'Bedingungen (Startort)', fr: 'Conditions (Origine)' },
  sharedPropertyType: { en: 'Property Type', de: 'Objekttyp', fr: 'Type d\\'objet' },
  moveBoxQtyStandard: { en: 'Standard Box Qty', de: 'Anzahl Standardkartons', fr: 'Qté cartons standard' },
  movePackingMaterials: { en: 'Packing Materials', de: 'Verpackungsmaterial', fr: 'Matériel d\\'emballage' },
  sharedParkingDistance: { en: 'Parking Distance', de: 'Parkplatz-Distanz', fr: 'Distance parking' },
  moveBoxQtyClothes: { en: 'Clothes Box Qty', de: 'Anzahl Kleiderboxen', fr: 'Qté boîtes vêtements' },
  moveBoxQtyFragile: { en: 'Fragile Box Qty', de: 'Anzahl Zerbrechliches-Kartons', fr: 'Qté cartons fragiles' },
  assemblyItems: { en: 'Items for Assembly', de: 'Gegenstände zur Montage', fr: 'Objets à monter' },
  disassemblyItems: { en: 'Items for Disassembly', de: 'Gegenstände zur Demontage', fr: 'Objets à démonter' }
};

const newVals = {
  moving: { en: 'Moving', de: 'Umzug', fr: 'Déménagement' },
  cleaning: { en: 'Cleaning', de: 'Reinigung', fr: 'Nettoyage' },
  combo: { en: 'Moving & Cleaning', de: 'Umzug & Reinigung', fr: 'Déménagement & Nettoyage' },
  assembly: { en: 'Assembly/Disassembly', de: 'Montage/Demontage', fr: 'Montage/Démontage' },
  direct: { en: 'Direct', de: 'Direkt', fr: 'Direct' },
  d0_20: { en: '0-20m', de: '0-20m', fr: '0-20m' },
  d20_50: { en: '20-50m', de: '20-50m', fr: '20-50m' },
  d50_plus: { en: 'More than 50m', de: 'Mehr als 50m', fr: 'Plus de 50m' },
  phone: { en: 'Phone', de: 'Telefon', fr: 'Téléphone' },
  email: { en: 'Email', de: 'E-Mail', fr: 'Email' },
  longDistances: { en: 'Long Distances', de: 'Lange Laufwege', fr: 'Longues distances' },
  provideBoxes: { en: 'Provide Boxes', de: 'Kartons bereitstellen', fr: 'Fournir des cartons' },
  true: { en: 'Yes', de: 'Ja', fr: 'Oui' },
  false: { en: 'No', de: 'Nein', fr: 'Non' },
  sofa: { en: 'Sofa', de: 'Sofa', fr: 'Canapé' },
  wardrobe: { en: 'Wardrobe', de: 'Schrank', fr: 'Armoire' },
  tv: { en: 'TV', de: 'Fernseher', fr: 'TV' },
  aquarium: { en: 'Aquarium', de: 'Aquarium', fr: 'Aquarium' },
  piano: { en: 'Piano', de: 'Klavier', fr: 'Piano' },
  safe: { en: 'Safe', de: 'Tresor', fr: 'Coffre-fort' },
  fitness: { en: 'Fitness Equipment', de: 'Fitnessgeräte', fr: 'Équipement fitness' },
  Haus: { en: 'House', de: 'Haus', fr: 'Maison' },
  Wohnung: { en: 'Apartment', de: 'Wohnung', fr: 'Appartement' },
  'Enge Treppen': { en: 'Narrow Stairs', de: 'Enge Treppen', fr: 'Escaliers étroits' },
  Ja: { en: 'Yes', de: 'Ja', fr: 'Oui' },
  Nein: { en: 'No', de: 'Nein', fr: 'Non' },
  Mittel: { en: 'Medium', de: 'Mittel', fr: 'Moyen' },
  Gross: { en: 'Large', de: 'Gross', fr: 'Grand' },
  Klein: { en: 'Small', de: 'Klein', fr: 'Petit' },
  Standard: { en: 'Standard', de: 'Standard', fr: 'Standard' }
};

let keyLabelsStr = '';
for (const [k, v] of Object.entries(newKeys)) {
  keyLabelsStr += `            ${k}: { en: '${v.en}', de: '${v.de}', fr: '${v.fr}' },\n`;
}

let valLabelsStr = '';
for (const [k, v] of Object.entries(newVals)) {
  valLabelsStr += `            '${k}': { en: '${v.en}', de: '${v.de}', fr: '${v.fr}' },\n`;
}

const updatedContent = content
  .replace('export const keyLabels: Record<string, Record<string, string>> = {\n', 'export const keyLabels: Record<string, Record<string, string>> = {\n' + keyLabelsStr)
  .replace('export const valLabels: Record<string, Record<string, string>> = {\n', 'export const valLabels: Record<string, Record<string, string>> = {\n' + valLabelsStr);

fs.writeFileSync('src/lib/translations.ts', updatedContent);
console.log('Translations updated!');
