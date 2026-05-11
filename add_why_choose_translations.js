const fs = require('fs');
const path = require('path');

const whyChooseEN = {
  badge: "Why Us",
  title: "Why Customers Choose SwissCleanMove",
  servicesTitle: "Our Services",
  tagline: "SwissCleanMove — Professional. Reliable. Swiss Quality.",
  closingText: "We combine modern services, efficient organization, and the highest quality standards to ensure your moving or cleaning project is simple, safe, and stress-free.",
  ctaButton: "Request Your Free Quote Now",
  benefits: {
    oneSource: {
      title: "Everything from One Source",
      description: "Moving, cleaning, disposal, and facility services — professionally coordinated by one reliable partner."
    },
    handoverGuarantee: {
      title: "Move-Out Cleaning with Handover Guarantee",
      description: "Professional end-of-tenancy cleaning for apartments, houses, offices, and commercial spaces."
    },
    swissQuality: {
      title: "Swiss Quality & Reliability",
      description: "Punctual teams, careful work, transparent communication, and professional execution."
    },
    transparentPricing: {
      title: "Transparent Pricing",
      description: "Clear and fair quotes with no hidden costs."
    },
    fastQuote: {
      title: "Fast & Easy Quote Requests",
      description: "Receive your personalized quote quickly and conveniently online."
    },
    flexible: {
      title: "Flexible Service Throughout Switzerland",
      description: "SwissCleanMove operates in Biel/Bienne, Bern, Zurich, the Seeland region, and throughout Switzerland."
    }
  },
  services: {
    moving: "Moving",
    moveOutCleaning: "Move-Out Cleaning",
    maintenanceCleaning: "Maintenance Cleaning",
    facilityServices: "Facility Services",
    propertyMaintenance: "Property Maintenance",
    constructionCleaning: "Construction Cleaning",
    restaurantCleaning: "Restaurant & Hospitality Cleaning",
    disposal: "Disposal & Clearance",
    windowCleaning: "Window Cleaning"
  }
};

const whyChooseDE = {
  badge: "Warum wir",
  title: "Warum Kunden SwissCleanMove wählen",
  servicesTitle: "Unsere Dienstleistungen",
  tagline: "SwissCleanMove — Professionell. Zuverlässig. Schweizer Qualität.",
  closingText: "Wir kombinieren moderne Dienstleistungen, effiziente Organisation und höchste Qualitätsstandards, damit Ihr Umzugs- oder Reinigungsprojekt einfach, sicher und stressfrei abläuft.",
  ctaButton: "Jetzt kostenloses Angebot anfordern",
  benefits: {
    oneSource: {
      title: "Alles aus einer Hand",
      description: "Umzug, Reinigung, Entsorgung und Facility Services — professionell koordiniert von einem zuverlässigen Partner."
    },
    handoverGuarantee: {
      title: "Endreinigung mit Abnahmegarantie",
      description: "Professionelle Endreinigung für Wohnungen, Häuser, Büros und Gewerbeflächen."
    },
    swissQuality: {
      title: "Schweizer Qualität & Zuverlässigkeit",
      description: "Pünktliche Teams, sorgfältige Arbeit, transparente Kommunikation und professionelle Ausführung."
    },
    transparentPricing: {
      title: "Transparente Preise",
      description: "Klare und faire Offerten ohne versteckte Kosten."
    },
    fastQuote: {
      title: "Schnelle & einfache Offertanfrage",
      description: "Erhalten Sie Ihre persönliche Offerte schnell und bequem online."
    },
    flexible: {
      title: "Flexibler Service in der ganzen Schweiz",
      description: "SwissCleanMove ist in Biel/Bienne, Bern, Zürich, im Seeland und in der ganzen Schweiz tätig."
    }
  },
  services: {
    moving: "Umzug",
    moveOutCleaning: "Endreinigung",
    maintenanceCleaning: "Unterhaltsreinigung",
    facilityServices: "Facility Services",
    propertyMaintenance: "Liegenschaftsunterhalt",
    constructionCleaning: "Baureinigung",
    restaurantCleaning: "Restaurant- & Gastronomiereinigung",
    disposal: "Entsorgung & Räumung",
    windowCleaning: "Fensterreinigung"
  }
};

const whyChooseFR = {
  badge: "Pourquoi nous",
  title: "Pourquoi les clients choisissent SwissCleanMove",
  servicesTitle: "Nos Services",
  tagline: "SwissCleanMove — Professionnel. Fiable. Qualité suisse.",
  closingText: "Nous combinons des services modernes, une organisation efficace et les plus hauts standards de qualité pour que votre projet de déménagement ou de nettoyage soit simple, sûr et sans stress.",
  ctaButton: "Demandez votre devis gratuit maintenant",
  benefits: {
    oneSource: {
      title: "Tout d'un seul prestataire",
      description: "Déménagement, nettoyage, élimination et services de facility — coordonnés professionnellement par un partenaire fiable."
    },
    handoverGuarantee: {
      title: "Nettoyage de fin de bail avec garantie de remise",
      description: "Nettoyage professionnel de fin de bail pour appartements, maisons, bureaux et espaces commerciaux."
    },
    swissQuality: {
      title: "Qualité & fiabilité suisse",
      description: "Équipes ponctuelles, travail soigné, communication transparente et exécution professionnelle."
    },
    transparentPricing: {
      title: "Prix transparents",
      description: "Devis clairs et équitables sans coûts cachés."
    },
    fastQuote: {
      title: "Demande de devis rapide & facile",
      description: "Recevez votre devis personnalisé rapidement et facilement en ligne."
    },
    flexible: {
      title: "Service flexible dans toute la Suisse",
      description: "SwissCleanMove opère à Biel/Bienne, Berne, Zurich, dans la région du Seeland et dans toute la Suisse."
    }
  },
  services: {
    moving: "Déménagement",
    moveOutCleaning: "Nettoyage de fin de bail",
    maintenanceCleaning: "Nettoyage d'entretien",
    facilityServices: "Services de Facility",
    propertyMaintenance: "Entretien immobilier",
    constructionCleaning: "Nettoyage de chantier",
    restaurantCleaning: "Nettoyage de restaurant & hôtellerie",
    disposal: "Élimination & débarras",
    windowCleaning: "Nettoyage de vitres"
  }
};

const langs = [
  { file: 'messages/en.json', data: whyChooseEN },
  { file: 'messages/de.json', data: whyChooseDE },
  { file: 'messages/fr.json', data: whyChooseFR }
];

langs.forEach(({ file, data }) => {
  const filePath = path.join(__dirname, file);
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!json.about) {
    json.about = {};
  }
  
  json.about.whyChoose = data;
  
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`✅ Updated ${file}`);
});

console.log('\nDone! All translation files updated with whyChoose section.');
