const fs = require('fs');

const deData = {
  "meta": {
    "title": "Hauswartung & Facility Service Biel | B2B Liegenschaftsservice",
    "description": "Premium Facility Service & Hauswartung in Biel/Bienne. Professioneller Gebäudeunterhalt für Immobilienverwaltungen, Gewerbeliegenschaften und Bürogebäude im Seeland."
  },
  "badge": "Premium Hauswartung Biel",
  "h1": "Facility Service & Hauswartung Biel — Premium Liegenschaftsbetreuung",
  "heroSubtitle": "Als Schweizer Qualitätsanbieter für Facility Management betreuen wir Immobilienverwaltungen, Wohnüberbauungen und Gewerbeliegenschaften im gesamten Seeland.",
  "ctaSoft": "B2B Beratung anfordern",
  "intro": "Eine professionell betreute Liegenschaft sichert den Werterhalt und garantiert höchste Zufriedenheit bei Mietern und Stockwerkeigentümergemeinschaften. SwissCleanMove ist Ihr verlässlicher Partner für Facility Service und Hauswartung in Biel/Bienne. Wir bieten massgeschneiderte Lösungen für Immobilienverwaltungen, Bürogebäude und Mehrfamilienhäuser – mit Schweizer Qualitätsstandard, transparenten Prozessen und dedizierten Ansprechpartnern im Seeland.",
  "sections": [
    {
      "heading": "Ganzheitlicher Facility Service & Gebäudeunterhalt",
      "body": "Unser Gebäudeservice richtet sich an professionelle Ansprüche. Wir übernehmen den kompletten technischen Hausdienst, koordinieren Kontrollgänge und stellen sicher, dass die Gebäudetechnik einwandfrei funktioniert. Ob in Nidau, Brügg oder Lyss – wir betreuen Ihre Gewerbeliegenschaften und Wohnanlagen vorausschauend und zuverlässig.",
      "bullets": [
        "Technischer Hausdienst & Anlagenkontrolle",
        "Regelmässige Kontrollgänge & Sicherheitsüberprüfung",
        "Koordination von Handwerkern",
        "24/7 Pikettdienst für Notfälle"
      ]
    },
    {
      "heading": "Professionelle Treppenhausreinigung & Unterhalt",
      "body": "Der erste Eindruck Ihrer Immobilie zählt. Unsere Fachkräfte sorgen für makellose Sauberkeit in allen Gemeinschaftszonen. Dies umfasst die sorgfältige Treppenhausreinigung, schonende Liftreinigung sowie die systematische Garagenreinigung in grossen Einstellhallen.",
      "bullets": [
        "Treppenhausreinigung & Unterhaltsreinigung",
        "Liftreinigung & Fensterfronten",
        "Garagenreinigung (maschinell)",
        "Pflege von Eingangsbereichen & Foyers"
      ]
    },
    {
      "heading": "Umgebungspflege & Winterdienst im Seeland",
      "body": "Die Aussenanlagen sind die Visitenkarte Ihrer Liegenschaft. Wir übernehmen die professionelle Umgebungspflege in Biel, Ipsach und Port. In der kalten Jahreszeit garantiert unser zuverlässiger Winterdienst sichere Zugangswege und zugefrorene Parkflächen – pünktlich und gesetzeskonform.",
      "bullets": [
        "Umgebungspflege & Grünflächenunterhalt",
        "Winterdienst & Schneeräumung",
        "Schwarzflächenreinigung",
        "Abfallbewirtschaftung & Entsorgung"
      ]
    }
  ],
  "serviceBulletsHeading": "Unsere B2B Facility Services",
  "serviceBullets": [
    "Hauswartung & Gebäudeservice",
    "Treppenhausreinigung",
    "Technischer Hausdienst",
    "Winterdienst & Schneeräumung",
    "Umgebungspflege",
    "Liftreinigung & Garagenreinigung",
    "Unterhaltsreinigung",
    "Liegenschaftsservice"
  ],
  "trustPoints": [
    "Partner für Verwaltungen",
    "Schweizer Qualitätsstandard",
    "Pünktlich & Diskret"
  ],
  "ctaMidHeading": "Facility Management für Ihre Immobilien?",
  "ctaMidBody": "Gerne erstellen wir ein massgeschneidertes Pflichtenheft für Ihre Liegenschaften in der Region Biel.",
  "ctaMid": "Offerte für Verwaltungen",
  "internalLinksHeading": "Verwandte Services für Verwaltungen",
  "internalLinks": [
    {
      "label": "Facility Service Biel",
      "href": "facility-service-biel"
    },
    {
      "label": "Unterhaltsreinigung Biel",
      "href": "unterhaltsreinigung-biel"
    },
    {
      "label": "Fensterreinigung Biel",
      "href": "fensterreinigung-biel"
    },
    {
      "label": "Umzugsreinigung Biel",
      "href": "umzugsreinigung-biel"
    }
  ],
  "ctaStrongHeading": "Ihr Premium Partner für Liegenschaftsservice",
  "ctaStrongBody": "Kontaktieren Sie SwissCleanMove für professionelle Hauswartung und Facility Service in Biel, Aarberg, Pieterlen, Studen und dem gesamten Seeland.",
  "ctaStrong": "Projektanfrage starten",
  "testimonial": {
    "quote": "Seit wir unsere Gewerbegebäude im Seeland von SwissCleanMove betreuen lassen, haben sich die Reklamationen der Mieter auf null reduziert. Ein extrem professioneller Liegenschaftsservice.",
    "author": "Immobilienverwaltung, Biel/Bienne",
    "trust": "Verifizierter B2B Partner"
  },
  "faqs": [
    {
      "question": "Bietet SwissCleanMove Facility Service für Verwaltungen?",
      "answer": "Ja, wir sind spezialisiert auf die Zusammenarbeit mit Immobilienverwaltungen, Stockwerkeigentümergemeinschaften und Eigentümern von Gewerbeliegenschaften im Seeland."
    },
    {
      "question": "Was gehört zur Hauswartung?",
      "answer": "Unser Service umfasst Treppenhausreinigung, Unterhaltsreinigung, Umgebungspflege, Winterdienst, Liftreinigung, Garagenreinigung sowie den technischen Hausdienst und regelmässige Kontrollgänge."
    },
    {
      "question": "Bietet SwissCleanMove Winterdienst an?",
      "answer": "Ja, wir bieten professionellen Winterdienst inklusive Schneeräumung und Salzung für Wohnüberbauungen und Bürogebäude, um die Sicherheit bei Eis und Schnee zu gewährleisten."
    },
    {
      "question": "Welche Regionen betreut SwissCleanMove?",
      "answer": "Unser Liegenschaftsservice deckt Biel/Bienne und das gesamte Seeland ab, einschliesslich Nidau, Brügg, Ipsach, Lyss, Aarberg, Pieterlen, Port, Studen und Orpund."
    },
    {
      "question": "Wie oft kann die Hauswartung durchgeführt werden?",
      "answer": "Die Frequenz wird individuell nach den Bedürfnissen Ihrer Immobilie festgelegt. Wir bieten tägliche, wöchentliche oder massgeschneiderte Intervalle für die Unterhaltsreinigung und den Gebäudeunterhalt."
    }
  ]
};

const enData = {
  "meta": {
    "title": "Property Maintenance & Facility Service Biel | B2B Services",
    "description": "Premium Facility Service & Property Maintenance in Biel/Bienne. Professional building maintenance for property managers, commercial buildings and offices in Seeland."
  },
  "badge": "Premium Property Maintenance Biel",
  "h1": "Facility Service & Property Maintenance Biel — Premium Care",
  "heroSubtitle": "As a Swiss quality provider for Facility Management, we serve property managers, residential complexes and commercial buildings throughout the Seeland.",
  "ctaSoft": "Request B2B Consultation",
  "intro": "A professionally maintained property ensures value retention and guarantees the highest satisfaction among tenants and condominium owners' associations. SwissCleanMove is your reliable partner for facility service and property maintenance in Biel/Bienne. We offer tailored solutions for property management companies, office buildings, and apartment complexes – with Swiss quality standards, transparent processes, and dedicated contact persons in the Seeland.",
  "sections": [
    {
      "heading": "Holistic Facility Service & Building Maintenance",
      "body": "Our building service is designed for professional requirements. We take over the complete technical building service, coordinate inspection rounds, and ensure that the building technology functions flawlessly. Whether in Nidau, Brügg, or Lyss – we manage your commercial properties and residential complexes proactively and reliably.",
      "bullets": [
        "Technical building service & system control",
        "Regular inspection rounds & security checks",
        "Coordination of tradesmen",
        "24/7 on-call service for emergencies"
      ]
    },
    {
      "heading": "Professional Stairwell Cleaning & Maintenance",
      "body": "The first impression of your property counts. Our specialists ensure immaculate cleanliness in all common areas. This includes careful stairwell cleaning, gentle elevator cleaning, and systematic garage cleaning in large parking halls.",
      "bullets": [
        "Stairwell cleaning & maintenance cleaning",
        "Elevator cleaning & window fronts",
        "Garage cleaning (mechanical)",
        "Care of entrance areas & foyers"
      ]
    },
    {
      "heading": "Grounds Maintenance & Winter Service in Seeland",
      "body": "The outdoor facilities are the calling card of your property. We take over the professional grounds maintenance in Biel, Ipsach, and Port. In the cold season, our reliable winter service guarantees safe access paths and ice-free parking areas – on time and in compliance with the law.",
      "bullets": [
        "Grounds maintenance & green area upkeep",
        "Winter service & snow removal",
        "Asphalt surface cleaning",
        "Waste management & disposal"
      ]
    }
  ],
  "serviceBulletsHeading": "Our B2B Facility Services",
  "serviceBullets": [
    "Property Maintenance & Building Service",
    "Stairwell Cleaning",
    "Technical Building Service",
    "Winter Service & Snow Removal",
    "Grounds Maintenance",
    "Elevator & Garage Cleaning",
    "Maintenance Cleaning",
    "Real Estate Service"
  ],
  "trustPoints": [
    "Partner for Property Managers",
    "Swiss Quality Standard",
    "Punctual & Discreet"
  ],
  "ctaMidHeading": "Facility Management for Your Properties?",
  "ctaMidBody": "We would be happy to create a tailored service specification for your properties in the Biel region.",
  "ctaMid": "Quote for Property Managers",
  "internalLinksHeading": "Related Services for Property Managers",
  "internalLinks": [
    {
      "label": "Facility Service Biel",
      "href": "facility-service-biel"
    },
    {
      "label": "Maintenance Cleaning Biel",
      "href": "unterhaltsreinigung-biel"
    },
    {
      "label": "Window Cleaning Biel",
      "href": "fensterreinigung-biel"
    },
    {
      "label": "Cleaning Company Biel",
      "href": "reinigungsfirma-biel"
    }
  ],
  "ctaStrongHeading": "Your Premium Partner for Property Services",
  "ctaStrongBody": "Contact SwissCleanMove for professional property maintenance and facility service in Biel, Aarberg, Pieterlen, Studen, and the entire Seeland.",
  "ctaStrong": "Start Project Inquiry",
  "testimonial": {
    "quote": "Since we have had our commercial buildings in Seeland managed by SwissCleanMove, tenant complaints have reduced to zero. An extremely professional property service.",
    "author": "Property Management, Biel/Bienne",
    "trust": "Verified B2B Partner"
  },
  "faqs": [
    {
      "question": "Does SwissCleanMove offer Facility Service for property managers?",
      "answer": "Yes, we specialize in working with property management companies, condominium owners' associations, and owners of commercial properties in Seeland."
    },
    {
      "question": "What is included in property maintenance?",
      "answer": "Our service includes stairwell cleaning, maintenance cleaning, grounds maintenance, winter service, elevator cleaning, garage cleaning, as well as technical building service and regular inspection rounds."
    },
    {
      "question": "Does SwissCleanMove offer winter service?",
      "answer": "Yes, we offer professional winter service including snow removal and salting for residential complexes and office buildings to ensure safety during ice and snow."
    },
    {
      "question": "Which regions does SwissCleanMove serve?",
      "answer": "Our property service covers Biel/Bienne and the entire Seeland, including Nidau, Brügg, Ipsach, Lyss, Aarberg, Pieterlen, Port, Studen, and Orpund."
    },
    {
      "question": "How often can the property maintenance be performed?",
      "answer": "The frequency is determined individually according to the needs of your property. We offer daily, weekly, or customized intervals for maintenance cleaning and building upkeep."
    }
  ]
};

const frData = {
  "meta": {
    "title": "Conciergerie & Facility Service Bienne | Service B2B",
    "description": "Facility Service Premium & Conciergerie à Bienne/Biel. Entretien de bâtiments professionnel pour gérances immobilières, locaux commerciaux et immeubles de bureaux dans le Seeland."
  },
  "badge": "Conciergerie Premium Bienne",
  "h1": "Facility Service & Conciergerie Bienne — Entretien Immobilier Premium",
  "heroSubtitle": "En tant que prestataire suisse de qualité en Facility Management, nous gérons les immeubles de bureaux, les complexes résidentiels et les locaux commerciaux dans tout le Seeland.",
  "ctaSoft": "Demander un conseil B2B",
  "intro": "Un immeuble entretenu de manière professionnelle garantit le maintien de sa valeur et la plus haute satisfaction des locataires et des copropriétaires. SwissCleanMove est votre partenaire fiable pour le Facility Service et la conciergerie à Bienne/Biel. Nous offrons des solutions sur mesure pour les gérances immobilières, les immeubles de bureaux et les immeubles locatifs - avec la norme de qualité suisse, des processus transparents et des interlocuteurs dédiés dans le Seeland.",
  "sections": [
    {
      "heading": "Facility Service Global & Entretien de Bâtiments",
      "body": "Notre service de conciergerie est conçu pour des exigences professionnelles. Nous prenons en charge le service technique complet du bâtiment, coordonnons les rondes de contrôle et veillons à ce que la technique du bâtiment fonctionne parfaitement. Que ce soit à Nidau, Brügg ou Lyss – nous gérons vos locaux commerciaux et complexes résidentiels de manière proactive et fiable.",
      "bullets": [
        "Service technique & contrôle des installations",
        "Rondes de contrôle régulières & vérification de sécurité",
        "Coordination des artisans",
        "Service de piquet 24/7 pour les urgences"
      ]
    },
    {
      "heading": "Nettoyage Professionnel des Cages d'Escalier & Entretien",
      "body": "La première impression de votre immeuble compte. Nos spécialistes assurent une propreté immaculée dans toutes les zones communes. Cela comprend le nettoyage minutieux des cages d'escalier, le nettoyage en douceur des ascenseurs et le nettoyage systématique des garages dans les grands parkings.",
      "bullets": [
        "Nettoyage de cage d'escalier & nettoyage d'entretien",
        "Nettoyage d'ascenseurs & façades vitrées",
        "Nettoyage de garage (mécanique)",
        "Entretien des zones d'entrée & foyers"
      ]
    },
    {
      "heading": "Entretien Extérieur & Service Hivernal dans le Seeland",
      "body": "Les installations extérieures sont la carte de visite de votre immeuble. Nous prenons en charge l'entretien professionnel des espaces verts à Bienne, Ipsach et Port. Pendant la saison froide, notre service hivernal fiable garantit des voies d'accès sûres et des parkings déneigés – à l'heure et conformément à la loi.",
      "bullets": [
        "Entretien extérieur & espaces verts",
        "Service hivernal & déneigement",
        "Nettoyage des surfaces goudronnées",
        "Gestion des déchets & élimination"
      ]
    }
  ],
  "serviceBulletsHeading": "Nos Services Facility B2B",
  "serviceBullets": [
    "Conciergerie & Service de bâtiment",
    "Nettoyage de cage d'escalier",
    "Service technique du bâtiment",
    "Service hivernal & déneigement",
    "Entretien des espaces verts",
    "Nettoyage d'ascenseurs & de garages",
    "Nettoyage d'entretien",
    "Service immobilier"
  ],
  "trustPoints": [
    "Partenaire des gérances",
    "Standard de qualité suisse",
    "Ponctuel & Discret"
  ],
  "ctaMidHeading": "Facility Management pour vos Immeubles ?",
  "ctaMidBody": "Nous établissons volontiers un cahier des charges sur mesure pour vos immeubles dans la région de Bienne.",
  "ctaMid": "Offre pour Gérances",
  "internalLinksHeading": "Services associés pour les Gérances",
  "internalLinks": [
    {
      "label": "Facility Service Bienne",
      "href": "facility-service-biel"
    },
    {
      "label": "Nettoyage d'entretien Bienne",
      "href": "unterhaltsreinigung-biel"
    },
    {
      "label": "Nettoyage de vitres Bienne",
      "href": "fensterreinigung-biel"
    },
    {
      "label": "Entreprise de nettoyage Bienne",
      "href": "reinigungsfirma-biel"
    }
  ],
  "ctaStrongHeading": "Votre Partenaire Premium pour le Service Immobilier",
  "ctaStrongBody": "Contactez SwissCleanMove pour une conciergerie et un Facility Service professionnels à Bienne, Aarberg, Pieterlen, Studen et dans tout le Seeland.",
  "ctaStrong": "Démarrer un projet",
  "testimonial": {
    "quote": "Depuis que nous avons confié la gestion de nos bâtiments commerciaux dans le Seeland à SwissCleanMove, les réclamations des locataires ont été réduites à zéro. Un service immobilier extrêmement professionnel.",
    "author": "Gérance immobilière, Bienne/Biel",
    "trust": "Partenaire B2B Vérifié"
  },
  "faqs": [
    {
      "question": "SwissCleanMove propose-t-il un Facility Service pour les gérances ?",
      "answer": "Oui, nous sommes spécialisés dans la collaboration avec les gérances immobilières, les communautés de copropriétaires et les propriétaires d'immeubles commerciaux dans le Seeland."
    },
    {
      "question": "Que comprend la conciergerie ?",
      "answer": "Notre service comprend le nettoyage des cages d'escalier, le nettoyage d'entretien, l'entretien des espaces verts, le service hivernal, le nettoyage des ascenseurs, le nettoyage des garages ainsi que le service technique du bâtiment et des rondes de contrôle régulières."
    },
    {
      "question": "SwissCleanMove offre-t-il un service hivernal ?",
      "answer": "Oui, nous offrons un service hivernal professionnel incluant le déneigement et le salage pour les complexes résidentiels et les immeubles de bureaux, afin d'assurer la sécurité en cas de glace et de neige."
    },
    {
      "question": "Quelles régions couvre SwissCleanMove ?",
      "answer": "Notre service immobilier couvre Bienne/Biel et tout le Seeland, y compris Nidau, Brügg, Ipsach, Lyss, Aarberg, Pieterlen, Port, Studen et Orpund."
    },
    {
      "question": "À quelle fréquence la conciergerie peut-elle être effectuée ?",
      "answer": "La fréquence est déterminée individuellement selon les besoins de votre immeuble. Nous proposons des interventions quotidiennes, hebdomadaires ou sur mesure pour le nettoyage d'entretien et l'entretien du bâtiment."
    }
  ]
};

const updateFile = (filename, newData) => {
  const path = `messages/${filename}`;
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  data.seoPages.hauswartungBiel = newData;
  fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${filename}`);
};

updateFile('de.json', deData);
updateFile('en.json', enData);
updateFile('fr.json', frData);
