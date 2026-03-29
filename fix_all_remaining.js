const fs = require('fs');
const path = require('path');

// ── DE fixes: key path → German value ──
const deFixes = {
  // cleaning.areas
  "serviceForm.wizard.cleaning.areas.completeAll": "Alles komplett",
  "serviceForm.wizard.cleaning.areas.conservatory": "Wintergarten",

  // relocation – volumes
  "serviceForm.wizard.relocation.volume": "Volumen",
  "serviceForm.wizard.relocation.volumes.veryLarge": "Sehr gross",
  "serviceForm.wizard.relocation.volumes.dontKnow": "Weiss nicht",

  // relocation – heavy
  "serviceForm.wizard.relocation.heavy.piano": "Klavier",
  "serviceForm.wizard.relocation.heavy.safe": "Tresor",
  "serviceForm.wizard.relocation.heavy.fitness": "Fitnessgerät",
  "serviceForm.wizard.relocation.heavy.none": "Keine",
  "serviceForm.wizard.relocation.heavy.aquarium": "Aquarium",

  // relocation – services
  "serviceForm.wizard.relocation.services": "Dienstleistungen",
  "serviceForm.wizard.relocation.serviceOptions.packing": "Verpackungsservice",
  "serviceForm.wizard.relocation.serviceOptions.unpacking": "Auspackservice",
  "serviceForm.wizard.relocation.serviceOptions.dismantling": "Demontage",
  "serviceForm.wizard.relocation.serviceOptions.assembly": "Montage",
  "serviceForm.wizard.relocation.serviceOptions.lampInstallation": "Lampen-/Leuchteninstallation",
  "serviceForm.wizard.relocation.serviceOptions.furnitureLift": "Möbellift",

  // relocation – desired date & flexibility
  "serviceForm.wizard.relocation.desiredDate": "Wunschdatum *",
  "serviceForm.wizard.relocation.flexibilities.exact": "Genau an diesem Tag",
  "serviceForm.wizard.relocation.flexibilities.plusMinus1Day": "± 1 Tag",
  "serviceForm.wizard.relocation.flexibilities.plusMinus3Days": "± 3 Tage",
  "serviceForm.wizard.relocation.flexibilities.plusMinus1Week": "± 1 Woche",

  // disposal
  "serviceForm.wizard.disposal.pleaseChoose": "Bitte wählen",
  "serviceForm.wizard.disposal.disposalTypes.eviction": "Räumung",
  "serviceForm.wizard.disposal.disposalTypes.disposalClearance": "Entsorgung & Räumung",

  "serviceForm.wizard.disposal.wasteTitle": "Abfallarten",
  "serviceForm.wizard.disposal.wasteItems.electrical": "Elektrogeräte",
  "serviceForm.wizard.disposal.wasteItems.cardboard": "Karton / Papier",
  "serviceForm.wizard.disposal.wasteItems.garden": "Gartenabfälle",
  "serviceForm.wizard.disposal.wasteItems.textiles": "Textilien",

  "serviceForm.wizard.disposal.otherDisposalItems": "Andere Entsorgungsgegenstände",
  "serviceForm.wizard.disposal.disassemblyNeeded": "Demontage erforderlich?",
  "serviceForm.wizard.disposal.materialAmount": "Materialmenge",
  "serviceForm.wizard.disposal.materialAmounts.little": "Wenig (kleiner Raum)",
  "serviceForm.wizard.disposal.materialAmounts.lots": "Viel (ganze Wohnung / Haus / Lager)",
  "serviceForm.wizard.disposal.estimatedVolume": "Geschätztes Volumen",
  "serviceForm.wizard.disposal.materials": "Materialien",
  "serviceForm.wizard.disposal.additionalOptions.broomCleaning": "Besenreine Reinigung",
  "serviceForm.wizard.disposal.desiredDate": "Wunschdatum *",

  // disposal volumes (repeated block)
  "serviceForm.wizard.disposal.volume": "Volumen",
  "serviceForm.wizard.disposal.volumes.veryLarge": "Sehr gross",
  "serviceForm.wizard.disposal.volumes.dontKnow": "Weiss nicht",

  // disposal heavy
  "serviceForm.wizard.disposal.heavy.piano": "Klavier",
  "serviceForm.wizard.disposal.heavy.safe": "Tresor",
  "serviceForm.wizard.disposal.heavy.fitness": "Fitnessgerät",
  "serviceForm.wizard.disposal.heavy.none": "Keine",
  "serviceForm.wizard.disposal.heavy.aquarium": "Aquarium",

  // disposal accessibility & access
  "serviceForm.wizard.disposal.accessibility": "Zugänglichkeit",
  "serviceForm.wizard.disposal.access.directAccess": "Direkter Zugang",
  "serviceForm.wizard.disposal.access.narrowStairs": "Enge Treppen",
  "serviceForm.wizard.disposal.access.parkingAvailable": "Parkplatz vorhanden",

  // disposal materialTypes
  "serviceForm.wizard.disposal.materialTypes.electronic": "Elektrogeräte",
  "serviceForm.wizard.disposal.materialTypes.wood": "Holz",
  "serviceForm.wizard.disposal.materialTypes.metal": "Metall",
  "serviceForm.wizard.disposal.materialTypes.paper": "Papier",
  "serviceForm.wizard.disposal.materialTypes.garden": "Gartenabfälle",
  "serviceForm.wizard.disposal.materialTypes.hazardous": "Sonderabfälle",

  // disposal extra services
  "serviceForm.wizard.disposal.extraServices": "Zusatzleistungen",
  "serviceForm.wizard.disposal.services.demolition": "Abbruch / Rückbau",
  "serviceForm.wizard.disposal.services.packing": "Verpacken",
  "serviceForm.wizard.disposal.services.cleaning": "Reinigung",
  "serviceForm.wizard.disposal.services.painting": "Malerarbeiten",

  // disposal urgency
  "serviceForm.wizard.disposal.urgency": "Dringlichkeit",
  "serviceForm.wizard.disposal.urgencies.immediate": "Sofort",
  "serviceForm.wizard.disposal.urgencies.thisWeek": "Diese Woche",
  "serviceForm.wizard.disposal.urgencies.thisMonth": "Diesen Monat",

  // relocation – other leftover English
  "serviceForm.wizard.relocation.movingFrom": "Auszugsadresse",
  "serviceForm.wizard.relocation.currentLiving": "Aktuelle Wohnsituation",
  "serviceForm.wizard.relocation.elevatorAvailable": "Aufzug vorhanden?",
  "serviceForm.wizard.relocation.yes": "Ja",
  "serviceForm.wizard.relocation.no": "Nein",
  "serviceForm.wizard.relocation.currentLivingSpace": "Aktuelle Wohnfläche (m²)",
  "serviceForm.wizard.relocation.movingTo": "Einzugsadresse",
  "serviceForm.wizard.relocation.movingToOptions.storage": "Lager / Zwischenlagerung",
  "serviceForm.wizard.relocation.newElevator": "Aufzug am neuen Ort?",
  "serviceForm.wizard.relocation.newLivingSpace": "Neue Wohnfläche (m²)",
  "serviceForm.wizard.relocation.peopleMoving": "Personen im Haushalt",
  "serviceForm.wizard.relocation.peopleMovingHint": "Anzahl",
  "serviceForm.wizard.relocation.movingBoxes": "Umzugskartons (Schätzung)",
  "serviceForm.wizard.relocation.movingBoxesHint": "Anzahl Kartons",
  "serviceForm.wizard.relocation.additionalSuppliesTitle": "Zusätzliches Verpackungsmaterial benötigt?",
  "serviceForm.wizard.relocation.supplies.movingBox": "Standard Umzugskarton",
  "serviceForm.wizard.relocation.supplies.wardrobeBox": "Kleiderbox",
  "serviceForm.wizard.relocation.supplies.bottleCarton": "Gläser-/Flaschenkarton",
  "serviceForm.wizard.relocation.supplies.adhesiveTape": "Klebeband",
  "serviceForm.wizard.relocation.otherAreas.cellar": "Keller",
  "serviceForm.wizard.relocation.otherAreas.atticScreed": "Estrich / Dachboden",
  "serviceForm.wizard.relocation.otherAreas.garageParkingSpace": "Garage / Parkplatz",
  "serviceForm.wizard.relocation.otherAreas.conservatoryBalcony": "Wintergarten / Balkon",
  "serviceForm.wizard.relocation.additionalAreas.stairs": "Treppenhaus",
  "serviceForm.wizard.relocation.additionalAreas.corridor": "Korridor / Flur",
  "serviceForm.wizard.relocation.preferredMoveDate": "Bevorzugtes Umzugsdatum",
  "serviceForm.wizard.relocation.nameFirstName": "Name & Vorname *",
  "serviceForm.wizard.relocation.company": "Firma",
  "serviceForm.wizard.relocation.telephoneNumber": "Telefonnummer *",
  "serviceForm.wizard.relocation.parkingDistance": "Distanz zum Parkplatz",
  "serviceForm.wizard.relocation.newFloor": "Etage (neuer Ort)"
};

// ── FR fixes ──
const frFixes = {
  // cleaning.areas
  "serviceForm.wizard.cleaning.areas.completeAll": "Tout complet",
  "serviceForm.wizard.cleaning.areas.conservatory": "Véranda / Jardin d'hiver",

  // relocation – volumes
  "serviceForm.wizard.relocation.volume": "Volume",
  "serviceForm.wizard.relocation.volumes.veryLarge": "Très grand",
  "serviceForm.wizard.relocation.volumes.dontKnow": "Ne sait pas",

  // relocation – heavy
  "serviceForm.wizard.relocation.heavy.piano": "Piano",
  "serviceForm.wizard.relocation.heavy.safe": "Coffre-fort",
  "serviceForm.wizard.relocation.heavy.fitness": "Appareil de fitness",
  "serviceForm.wizard.relocation.heavy.none": "Aucun",
  "serviceForm.wizard.relocation.heavy.aquarium": "Aquarium",

  // relocation – services
  "serviceForm.wizard.relocation.services": "Services",
  "serviceForm.wizard.relocation.serviceOptions.packing": "Service d'emballage",
  "serviceForm.wizard.relocation.serviceOptions.unpacking": "Service de déballage",
  "serviceForm.wizard.relocation.serviceOptions.dismantling": "Démontage",
  "serviceForm.wizard.relocation.serviceOptions.assembly": "Montage",
  "serviceForm.wizard.relocation.serviceOptions.lampInstallation": "Installation de luminaires",
  "serviceForm.wizard.relocation.serviceOptions.furnitureLift": "Monte-meubles",

  // relocation – desired date & flexibility
  "serviceForm.wizard.relocation.desiredDate": "Date souhaitée *",
  "serviceForm.wizard.relocation.flexibilities.exact": "Exactement ce jour",
  "serviceForm.wizard.relocation.flexibilities.plusMinus1Day": "± 1 jour",
  "serviceForm.wizard.relocation.flexibilities.plusMinus3Days": "± 3 jours",
  "serviceForm.wizard.relocation.flexibilities.plusMinus1Week": "± 1 semaine",

  // disposal
  "serviceForm.wizard.disposal.pleaseChoose": "Veuillez choisir",
  "serviceForm.wizard.disposal.disposalTypes.eviction": "Débarras",
  "serviceForm.wizard.disposal.disposalTypes.disposalClearance": "Élimination & Débarras",

  "serviceForm.wizard.disposal.wasteTitle": "Types de déchets",
  "serviceForm.wizard.disposal.wasteItems.electrical": "Appareils électriques",
  "serviceForm.wizard.disposal.wasteItems.cardboard": "Carton / Papier",
  "serviceForm.wizard.disposal.wasteItems.garden": "Déchets de jardin",
  "serviceForm.wizard.disposal.wasteItems.textiles": "Textiles",

  "serviceForm.wizard.disposal.otherDisposalItems": "Autres objets à éliminer",
  "serviceForm.wizard.disposal.disassemblyNeeded": "Démontage nécessaire?",
  "serviceForm.wizard.disposal.materialAmount": "Quantité de matériel",
  "serviceForm.wizard.disposal.materialAmounts.little": "Peu (petite pièce)",
  "serviceForm.wizard.disposal.materialAmounts.lots": "Beaucoup (tout l'appartement / maison / dépôt)",
  "serviceForm.wizard.disposal.estimatedVolume": "Volume estimé",
  "serviceForm.wizard.disposal.materials": "Matériaux",
  "serviceForm.wizard.disposal.additionalOptions.broomCleaning": "Nettoyage en fin de chantier",
  "serviceForm.wizard.disposal.desiredDate": "Date souhaitée *",

  // disposal volumes
  "serviceForm.wizard.disposal.volume": "Volume",
  "serviceForm.wizard.disposal.volumes.veryLarge": "Très grand",
  "serviceForm.wizard.disposal.volumes.dontKnow": "Ne sait pas",

  // disposal heavy
  "serviceForm.wizard.disposal.heavy.piano": "Piano",
  "serviceForm.wizard.disposal.heavy.safe": "Coffre-fort",
  "serviceForm.wizard.disposal.heavy.fitness": "Appareil de fitness",
  "serviceForm.wizard.disposal.heavy.none": "Aucun",
  "serviceForm.wizard.disposal.heavy.aquarium": "Aquarium",

  // disposal accessibility & access
  "serviceForm.wizard.disposal.accessibility": "Accessibilité",
  "serviceForm.wizard.disposal.access.directAccess": "Accès direct",
  "serviceForm.wizard.disposal.access.narrowStairs": "Escaliers étroits",
  "serviceForm.wizard.disposal.access.parkingAvailable": "Parking disponible",

  // disposal materialTypes
  "serviceForm.wizard.disposal.materialTypes.electronic": "Appareils électriques",
  "serviceForm.wizard.disposal.materialTypes.wood": "Bois",
  "serviceForm.wizard.disposal.materialTypes.metal": "Métal",
  "serviceForm.wizard.disposal.materialTypes.paper": "Papier",
  "serviceForm.wizard.disposal.materialTypes.garden": "Déchets de jardin",
  "serviceForm.wizard.disposal.materialTypes.hazardous": "Déchets dangereux",

  // disposal extra services
  "serviceForm.wizard.disposal.extraServices": "Services supplémentaires",
  "serviceForm.wizard.disposal.services.demolition": "Démolition / Déconstruction",
  "serviceForm.wizard.disposal.services.packing": "Emballage",
  "serviceForm.wizard.disposal.services.cleaning": "Nettoyage",
  "serviceForm.wizard.disposal.services.painting": "Travaux de peinture",

  // disposal urgency
  "serviceForm.wizard.disposal.urgency": "Urgence",
  "serviceForm.wizard.disposal.urgencies.immediate": "Immédiat",
  "serviceForm.wizard.disposal.urgencies.thisWeek": "Cette semaine",
  "serviceForm.wizard.disposal.urgencies.thisMonth": "Ce mois-ci",

  // relocation – other leftover English
  "serviceForm.wizard.relocation.movingFrom": "Adresse de départ",
  "serviceForm.wizard.relocation.currentLiving": "Logement actuel",
  "serviceForm.wizard.relocation.elevatorAvailable": "Ascenseur disponible?",
  "serviceForm.wizard.relocation.yes": "Oui",
  "serviceForm.wizard.relocation.no": "Non",
  "serviceForm.wizard.relocation.currentLivingSpace": "Surface habitable actuelle (m²)",
  "serviceForm.wizard.relocation.movingTo": "Adresse d'arrivée",
  "serviceForm.wizard.relocation.movingToOptions.storage": "Garde-meubles / Stockage",
  "serviceForm.wizard.relocation.newElevator": "Nouvel ascenseur?",
  "serviceForm.wizard.relocation.newLivingSpace": "Nouvelle surface habitable (m²)",
  "serviceForm.wizard.relocation.peopleMoving": "Personnes dans le ménage",
  "serviceForm.wizard.relocation.peopleMovingHint": "Nombre",
  "serviceForm.wizard.relocation.movingBoxes": "Cartons de déménagement (estimation)",
  "serviceForm.wizard.relocation.movingBoxesHint": "Nombre de cartons",
  "serviceForm.wizard.relocation.additionalSuppliesTitle": "Matériel d'emballage supplémentaire requis?",
  "serviceForm.wizard.relocation.supplies.movingBox": "Carton standard",
  "serviceForm.wizard.relocation.supplies.wardrobeBox": "Penderie portable",
  "serviceForm.wizard.relocation.supplies.bottleCarton": "Carton pour verres/bouteilles",
  "serviceForm.wizard.relocation.supplies.adhesiveTape": "Ruban adhésif",
  "serviceForm.wizard.relocation.otherAreas.cellar": "Cave",
  "serviceForm.wizard.relocation.otherAreas.atticScreed": "Galetas / Grenier",
  "serviceForm.wizard.relocation.otherAreas.garageParkingSpace": "Garage / Place de parc",
  "serviceForm.wizard.relocation.otherAreas.conservatoryBalcony": "Jardin d'hiver / Balcon",
  "serviceForm.wizard.relocation.additionalAreas.stairs": "Escaliers",
  "serviceForm.wizard.relocation.additionalAreas.corridor": "Couloir",
  "serviceForm.wizard.relocation.preferredMoveDate": "Date de déménagement privilégiée",
  "serviceForm.wizard.relocation.nameFirstName": "Nom et Prénom *",
  "serviceForm.wizard.relocation.company": "Entreprise",
  "serviceForm.wizard.relocation.telephoneNumber": "Numéro de téléphone *",
  "serviceForm.wizard.relocation.parkingDistance": "Distance du parking",
  "serviceForm.wizard.relocation.newFloor": "Étage (nouveau logement)"
};

function setNestedValue(obj, dotPath, value) {
  const parts = dotPath.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

function applyFixes(filePath, fixes) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  let count = 0;
  for (const [dotPath, value] of Object.entries(fixes)) {
    setNestedValue(data, dotPath, value);
    count++;
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`Applied ${count} fixes to ${path.basename(filePath)}`);
}

const messagesDir = path.join(__dirname, 'messages');
applyFixes(path.join(messagesDir, 'de.json'), deFixes);
applyFixes(path.join(messagesDir, 'fr.json'), frFixes);

console.log('All remaining translations fixed!');
