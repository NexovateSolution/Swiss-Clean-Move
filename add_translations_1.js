const fs = require('fs');
const path = require('path');

const locales = ['en', 'de', 'fr'];
const files = locales.map(l => path.join(__dirname, 'messages', `${l}.json`));

const newData = {
  propertyMaintenance: {
    en: {
      companyOrManagement: "Company / Property Management *",
      contactPerson: "Contact person",
      phone: "Phone *",
      email: "Email *",
      address: "Address (Street, ZIP, City) *",
      propertyType: "Property type",
      types: {
        apartmentBuilding: "Apartment building",
        commercialProperty: "Commercial property",
        residentialComplex: "Residential complex",
        officeBuilding: "Office building"
      },
      units: "Units (number of apartments / offices)",
      floors: "Floors (number)",
      area: "Area (m², approx.)",
      scopeOfServices: "Scope of Services",
      cleaningMaintenance: "Cleaning & Maintenance",
      services: {
        stairwell: "Stairwell cleaning",
        elevator: "Elevator cleaning",
        garage: "Garage cleaning",
        basement: "Basement / utility rooms",
        outdoorMaintenance: "Outdoor maintenance",
        landscaping: "Landscapin (lawn / hedges)",
        outdoorCleaning: "Cleaning outdoor areas",
        parking: "Parking cleaning",
        snowRemoval: "Snow removal",
        grittingService: "Gritting service",
        techInspections: "Technical inspections",
        routineChecks: "Routine checks",
        minorRepairs: "Minor repairs",
        lightingChecks: "Lighting checks",
        wasteHandling: "Waste handling",
        containerCleaning: "Container cleaning",
        disposalRecycling: "Disposal / recycling"
      },
      outdoorSurroundings: "Outdoor & Surroundings",
      winterService: "Winter Service",
      technicalMaintenance: "Technical Maintenance",
      wasteManagement: "Waste Management",
      frequency: "Frequency",
      frequencies: {
        weekly: "Weekly",
        biweekly: "Bi-weekly",
        monthly: "Monthly",
        custom: "Custom / as needed"
      },
      propertyDetails: "Property Details",
      details: {
        staircases: "Staircases (number)",
        elevators: "Elevators (number)",
        entrances: "Entrances (number)",
        parkingSpaces: "Parking spaces (number)",
        specialReqs: "Special requirements (optional)"
      },
      orgAndAccess: "Organization & Access",
      org: {
        houseRules: "House rules available",
        keyAvailable: "Key available",
        contactOnSite: "Contact person on site",
        serviceSpecs: "Service specifications available"
      },
      access: "Access",
      accessTypes: {
        free: "Freely accessible",
        key: "With key",
        code: "With code / system"
      },
      serviceTimes: "Service Times",
      times: {
        daytime: "Daytime",
        earlyMorning: "Early morning",
        flexible: "Flexible"
      },
      start: "Start",
      desiredStart: "Desired start *",
      contractType: "Contract type",
      contracts: {
        ongoing: "Ongoing contract",
        trial: "Trial phase",
        oneTime: "One-time service"
      },
      additionalServices: "Additional Services",
      additional: {
        emergency: "Emergency service",
        availability24h: "24h availability",
        reports: "Reports / documentation",
        photoDoc: "Photo documentation"
      },
      upload: "Upload",
      uploads: {
        photos: "Photos",
        documents: "Documents (e.g. service specifications)"
      },
      notes: "Notes (optional)"
    },
    de: {
      companyOrManagement: "Firma / Verwaltung *",
      contactPerson: "Ansprechperson",
      phone: "Telefon *",
      email: "E-Mail *",
      address: "Adresse (Strasse, PLZ, Ort) *",
      propertyType: "Objektart",
      types: {
        apartmentBuilding: "Mehrfamilienhaus",
        commercialProperty: "Gewerbeobjekt",
        residentialComplex: "Überbauung",
        officeBuilding: "Bürogebäude"
      },
      units: "Einheiten (Anzahl Wohnungen / Büros)",
      floors: "Etagen (Anzahl)",
      area: "Fläche (m², ca.)",
      scopeOfServices: "Leistungsumfang",
      cleaningMaintenance: "Reinigung & Pflege",
      services: {
        stairwell: "Treppenhausreinigung",
        elevator: "Liftreinigung",
        garage: "Garagenreinigung",
        basement: "Keller / Nebenräume",
        outdoorMaintenance: "Umgebungspflege",
        landscaping: "Grünpflege (Rasen / Hecken)",
        outdoorCleaning: "Reinigung Aussenflächen",
        parking: "Parkplatzreinigung",
        snowRemoval: "Schneeräumung",
        grittingService: "Streudienst",
        techInspections: "Technische Kontrolle",
        routineChecks: "Kontrollgänge",
        minorRepairs: "Kleinreparaturen",
        lightingChecks: "Lichtkontrolle",
        wasteHandling: "Kehricht bereitstellen",
        containerCleaning: "Container reinigen",
        disposalRecycling: "Entsorgung / Recycling"
      },
      outdoorSurroundings: "Umgebung & Aussenbereich",
      winterService: "Winterdienst",
      technicalMaintenance: "Technische Betreuung",
      wasteManagement: "Abfallmanagement",
      frequency: "Intervall",
      frequencies: {
        weekly: "Wöchentlich",
        biweekly: "14-täglich",
        monthly: "Monatlich",
        custom: "Individuell / nach Bedarf"
      },
      propertyDetails: "Objekt-Details",
      details: {
        staircases: "Treppenhäuser (Anzahl)",
        elevators: "Lifte (Anzahl)",
        entrances: "Eingänge (Anzahl)",
        parkingSpaces: "Garagenplätze (Anzahl)",
        specialReqs: "Besondere Anforderungen (optional)"
      },
      orgAndAccess: "Organisation & Zugang",
      org: {
        houseRules: "Hausordnung vorhanden",
        keyAvailable: "Schlüssel vorhanden",
        contactOnSite: "Ansprechpartner vor Ort",
        serviceSpecs: "Pflichtenheft vorhanden"
      },
      access: "Zugang zum Objekt",
      accessTypes: {
        free: "Frei zugänglich",
        key: "Mit Schlüssel",
        code: "Mit Code / System"
      },
      serviceTimes: "Einsatzzeiten",
      times: {
        daytime: "Tagsüber",
        earlyMorning: "Früh morgens",
        flexible: "Flexibel"
      },
      start: "Start",
      desiredStart: "Gewünschter Start *",
      contractType: "Vertragsart",
      contracts: {
        ongoing: "Laufender Vertrag",
        trial: "Testphase",
        oneTime: "Einmaliger Einsatz"
      },
      additionalServices: "Zusatzleistungen",
      additional: {
        emergency: "Notfallservice",
        availability24h: "24h Bereitschaft",
        reports: "Rapport / Dokumentation",
        photoDoc: "Foto-Dokumentation"
      },
      upload: "Upload",
      uploads: {
        photos: "Fotos",
        documents: "Dokumente (z.B. Pflichtenheft)"
      },
      notes: "Bemerkungen (optional)"
    },
    fr: {
      companyOrManagement: "Entreprise / Gestion immobilière *",
      contactPerson: "Personne de contact",
      phone: "Téléphone *",
      email: "Email *",
      address: "Adresse (Rue, NPA, Ville) *",
      propertyType: "Type de bien",
      types: {
        apartmentBuilding: "Immeuble",
        commercialProperty: "Propriété commerciale",
        residentialComplex: "Complexe résidentiel",
        officeBuilding: "Immeuble de bureaux"
      },
      units: "Unités (nombre d'appartements / bureaux)",
      floors: "Étages (nombre)",
      area: "Surface (m², approx.)",
      scopeOfServices: "Étendue des services",
      cleaningMaintenance: "Nettoyage et entretien",
      services: {
        stairwell: "Nettoyage des cages d'escalier",
        elevator: "Nettoyage d'ascenseur",
        garage: "Nettoyage de garage",
        basement: "Sous-sol / pièces annexes",
        outdoorMaintenance: "Entretien extérieur",
        landscaping: "Entretien des espaces verts",
        outdoorCleaning: "Nettoyage des surfaces extérieures",
        parking: "Nettoyage des parkings",
        snowRemoval: "Déneigement",
        grittingService: "Service de sablage",
        techInspections: "Contrôles techniques",
        routineChecks: "Tournées d'inspection",
        minorRepairs: "Petites réparations",
        lightingChecks: "Contrôle de l'éclairage",
        wasteHandling: "Mise à disposition des déchets",
        containerCleaning: "Nettoyage des conteneurs",
        disposalRecycling: "Élimination / recyclage"
      },
      outdoorSurroundings: "Extérieur et alentours",
      winterService: "Service d'hiver",
      technicalMaintenance: "Maintenance technique",
      wasteManagement: "Gestion des déchets",
      frequency: "Fréquence",
      frequencies: {
        weekly: "Hebdomadaire",
        biweekly: "Toutes les 2 semaines",
        monthly: "Mensuel",
        custom: "Sur mesure / selon les besoins"
      },
      propertyDetails: "Détails du bien",
      details: {
        staircases: "Cages d'escalier (nombre)",
        elevators: "Ascenseurs (nombre)",
        entrances: "Entrées (nombre)",
        parkingSpaces: "Places de parking (nombre)",
        specialReqs: "Exigences particulières (facultatif)"
      },
      orgAndAccess: "Organisation et accès",
      org: {
        houseRules: "Règlement intérieur disponible",
        keyAvailable: "Clé disponible",
        contactOnSite: "Personne de contact sur place",
        serviceSpecs: "Cahier des charges disponible"
      },
      access: "Accès à la propriété",
      accessTypes: {
        free: "Librement accessible",
        key: "Avec clé",
        code: "Avec code / système"
      },
      serviceTimes: "Heures de service",
      times: {
        daytime: "En journée",
        earlyMorning: "Tôt le matin",
        flexible: "Flexible"
      },
      start: "Début",
      desiredStart: "Début souhaité *",
      contractType: "Type de contrat",
      contracts: {
        ongoing: "Contrat en cours",
        trial: "Phase de test",
        oneTime: "Intervention unique"
      },
      additionalServices: "Services supplémentaires",
      additional: {
        emergency: "Service d'urgence",
        availability24h: "Disponibilité 24h/24",
        reports: "Rapports / documentation",
        photoDoc: "Documentation photographique"
      },
      upload: "Téléchargement",
      uploads: {
        photos: "Photos",
        documents: "Documents (ex: cahier des charges)"
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
  
  // Inject specific categories
  Object.keys(newData).forEach(category => {
    data.serviceForm.wizard[category] = {
      ...(data.serviceForm.wizard[category] || {}), // preserve existing
      ...newData[category][loc] // mix in new translations
    };
  });
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`Wrote ${loc}`);
});
