const fs = require('fs');

const deCards = {
  "serviceCardsHeading": "Unsere Premium B2B Services",
  "serviceCards": [
    {
      "title": "Technischer Hausdienst",
      "description": "Umfassende Kontrolle und Instandhaltung der Gebäudetechnik.",
      "features": [
        "Regelmässige Kontrollgänge",
        "Sicherheitsüberprüfung",
        "Koordination von Handwerkern"
      ]
    },
    {
      "title": "Treppenhausreinigung",
      "description": "Makellose Sauberkeit in allen Gemeinschaftszonen und Treppenhäusern.",
      "features": [
        "Reinigung von Treppen & Böden",
        "Fenster- und Liftreinigung",
        "Pflege von Eingangsbereichen"
      ]
    },
    {
      "title": "Winterdienst",
      "description": "Sichere Zugangswege und eisfeie Parkplätze in der kalten Jahreszeit.",
      "features": [
        "Zuverlässige Schneeräumung",
        "Salzung & Schwarzräumung",
        "Gesetzeskonforme Ausführung"
      ]
    },
    {
      "title": "Umgebungspflege",
      "description": "Pflege der Aussenanlagen und Grünflächen als Visitenkarte Ihrer Immobilie.",
      "features": [
        "Grünflächenunterhalt",
        "Abfallbewirtschaftung",
        "Sauberkeit im Aussenbereich"
      ]
    }
  ]
};

const enCards = {
  "serviceCardsHeading": "Our Premium B2B Services",
  "serviceCards": [
    {
      "title": "Technical Building Service",
      "description": "Comprehensive control and maintenance of building technology.",
      "features": [
        "Regular inspection rounds",
        "Security checks",
        "Coordination of tradesmen"
      ]
    },
    {
      "title": "Stairwell Cleaning",
      "description": "Immaculate cleanliness in all common areas and stairwells.",
      "features": [
        "Cleaning of stairs & floors",
        "Window and elevator cleaning",
        "Care of entrance areas"
      ]
    },
    {
      "title": "Winter Service",
      "description": "Safe access paths and ice-free parking areas in the cold season.",
      "features": [
        "Reliable snow removal",
        "Salting & ice clearance",
        "Legally compliant execution"
      ]
    },
    {
      "title": "Grounds Maintenance",
      "description": "Care of outdoor facilities and green areas as the calling card of your property.",
      "features": [
        "Green area upkeep",
        "Waste management",
        "Cleanliness in outdoor areas"
      ]
    }
  ]
};

const frCards = {
  "serviceCardsHeading": "Nos Services Premium B2B",
  "serviceCards": [
    {
      "title": "Service Technique du Bâtiment",
      "description": "Contrôle complet et entretien de la technique du bâtiment.",
      "features": [
        "Rondes de contrôle régulières",
        "Vérifications de sécurité",
        "Coordination des artisans"
      ]
    },
    {
      "title": "Nettoyage de Cages d'Escalier",
      "description": "Propreté immaculée dans toutes les zones communes et les cages d'escalier.",
      "features": [
        "Nettoyage des escaliers et sols",
        "Nettoyage des fenêtres et ascenseurs",
        "Entretien des zones d'entrée"
      ]
    },
    {
      "title": "Service Hivernal",
      "description": "Voies d'accès sûres et parkings déneigés pendant la saison froide.",
      "features": [
        "Déneigement fiable",
        "Salage et déglaçage",
        "Exécution conforme à la loi"
      ]
    },
    {
      "title": "Entretien Extérieur",
      "description": "Entretien des espaces extérieurs et des espaces verts comme carte de visite de votre bien.",
      "features": [
        "Entretien des espaces verts",
        "Gestion des déchets",
        "Propreté des espaces extérieurs"
      ]
    }
  ]
};

['de', 'en', 'fr'].forEach(lang => {
  const path = `messages/${lang}.json`;
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  
  if(lang === 'de') {
    data.seoPages.hauswartungBiel = { ...data.seoPages.hauswartungBiel, ...deCards };
  } else if(lang === 'en') {
    data.seoPages.hauswartungBiel = { ...data.seoPages.hauswartungBiel, ...enCards };
  } else if(lang === 'fr') {
    data.seoPages.hauswartungBiel = { ...data.seoPages.hauswartungBiel, ...frCards };
  }

  // Remove the navigation addition to clean up
  if (data.navigation.hauswartung) {
    delete data.navigation.hauswartung;
  }

  fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
});

console.log('Cards added to Hauswartung translations.');
