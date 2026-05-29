const fs = require('fs');

function updateJsonFile(filePath, updateFn) {
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  updateFn(data);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// ============================================================
// GERMAN (de.json) — Primary SEO Authority
// ============================================================
updateJsonFile('messages/de.json', (data) => {
  const page = data.seoPages.hauswartungBiel;

  // --- Meta ---
  page.meta.title = "Hauswartung Biel/Bienne | Facility Service & Gebäudeunterhalt | SwissCleanMove";
  page.meta.description = "Professionelle Hauswartung & Facility Service in Biel/Bienne. Objektbetreuung, Gebäudeservice, Treppenhausreinigung & Winterdienst für Immobilienverwaltungen im Seeland.";

  // --- H1 (user specified) ---
  page.h1 = "Hauswartung reinigung Biel/Bienne";

  // --- Hero Subtitle (REMOVE "Facility Management") ---
  page.heroSubtitle = "Als Schweizer Qualitätsanbieter für Hauswartung und Facility Service betreuen wir Immobilienverwaltungen, Wohnüberbauungen und Gewerbeliegenschaften im gesamten Seeland.";

  // --- Badge ---
  page.badge = "Premium Hauswartung & Objektbetreuung Biel";

  // --- Intro (enriched with new keywords, no duplication) ---
  page.intro = "Eine professionell betreute Liegenschaft sichert den Werterhalt und garantiert höchste Zufriedenheit bei Mietern und Stockwerkeigentümergemeinschaften. SwissCleanMove ist Ihr verlässlicher Partner für Hauswartung Biel/Bienne, Objektbetreuung und Gebäudeunterhalt. Wir bieten massgeschneiderten Liegenschaftsservice für Immobilienverwaltungen, Bürogebäude und Wohnanlagen — mit Schweizer Qualitätsstandard, festen Ansprechpartnern und langfristigen Betreuungskonzepten im Seeland.";

  // --- Section 1 (enriched, not duplicated) ---
  page.sections[0].heading = "Technischer Hausdienst in Biel/Bienne";
  page.sections[0].body = "Unser technischer Hausdienst richtet sich an Immobilienverwaltungen und Eigentümer von Gewerbeimmobilien. Wir übernehmen die professionelle Objektbetreuung, koordinieren Kontrollgänge und stellen sicher, dass Ihre Gebäudetechnik einwandfrei funktioniert. Ob Mehrfamilienhaus in Nidau, Bürogebäude in Brügg oder Gewerbefläche in Lyss — unser Hauswartservice Biel gewährleistet schnelle Reaktionszeiten und zuverlässige Objektkontrollen.";
  page.sections[0].bullets = [
    "Technischer Hausdienst & Anlagenkontrolle",
    "Regelmässige Kontrollgänge & Sicherheitsüberprüfung",
    "Koordination von Handwerkern & Instandhaltung",
    "Schnelle Reaktionszeiten & 24/7 Pikettdienst"
  ];

  // --- Section 2 (enriched) ---
  page.sections[1].heading = "Gebäudereinigung & Treppenhausreinigung Biel";
  page.sections[1].body = "Der erste Eindruck Ihrer Liegenschaft zählt. Unser Gebäudeservice Biel umfasst die professionelle Treppenhausreinigung, schonende Liftreinigung sowie systematische Garagenreinigung. Wir betreuen Wohnanlagen, Mehrfamilienhäuser und Stockwerkeigentümergemeinschaften mit einem festen Reinigungsteam und flexiblen Serviceplänen.";
  page.sections[1].bullets = [
    "Treppenhausreinigung & Unterhaltsreinigung",
    "Liftreinigung & Fensterfronten",
    "Garagenreinigung (maschinell)",
    "Pflege von Eingangsbereichen & Foyers"
  ];

  // --- Section 3 (enriched with new geo signals) ---
  page.sections[2].heading = "Umgebungspflege & Winterdienst im Seeland";
  page.sections[2].body = "Die Aussenanlagen sind die Visitenkarte Ihrer Immobilie. SwissCleanMove übernimmt den professionellen Gebäudeunterhalt in Biel, Ipsach, Port, Täuffelen und Studen. In der kalten Jahreszeit garantiert unser zuverlässiger Winterdienst sichere Zugangswege — pünktlich und gesetzeskonform für Wohnanlagen und Gewerbeimmobilien.";
  page.sections[2].bullets = [
    "Umgebungspflege & Grünflächenunterhalt",
    "Winterdienst & Schneeräumung",
    "Schwarzflächenreinigung & Salzung",
    "Abfallbewirtschaftung & Entsorgung"
  ];

  // --- ADD new Section 4 (NEW — not existing) ---
  if (page.sections.length === 3) {
    page.sections.push({
      heading: "Hauswartung für Immobilienverwaltungen",
      body: "Immobilienverwaltungen in Biel/Bienne, Aarberg, Pieterlen und Orpund vertrauen auf SwissCleanMove als zuverlässigen Partner für professionelle Objektbetreuung. Wir erstellen massgeschneiderte Pflichtenhefte und übernehmen den kompletten Liegenschaftsservice — von der Unterhaltsreinigung über den technischen Hausdienst bis zur saisonalen Umgebungspflege. Feste Ansprechpartner, flexible Servicepläne und transparente Abrechnungen garantieren eine langfristige, vertrauensvolle Zusammenarbeit.",
      bullets: [
        "Massgeschneiderte Pflichtenhefte für Verwaltungen",
        "Feste Ansprechpartner & dedizierte Objektleitung",
        "Flexible Servicepläne & transparente Abrechnung",
        "Langfristige Betreuungskonzepte für Liegenschaften"
      ]
    });
  }

  // --- ADD new Section 5 (NEW — B2B Gewerbe focus) ---
  if (page.sections.length === 4) {
    page.sections.push({
      heading: "Professioneller Gebäudeunterhalt für Unternehmen",
      body: "Gewerbekunden und Unternehmen in Biel/Bienne profitieren von unserem umfassenden Immobilienservice. Ob Bürogebäude in Lyss, Praxisräumlichkeiten in Brügg oder Geschäftsliegenschaften in Ipsach — wir übernehmen die professionelle Betreuung von Wohn- und Gewerbeliegenschaften nach Schweizer Qualitätsstandard. Unser Objektservice für Unternehmen umfasst technische Kontrollen, Reinigungsdienstleistungen und saisonale Aussenarbeiten aus einer Hand.",
      bullets: [
        "Objektservice für Bürogebäude & Gewerbeliegenschaften",
        "Professionelle Betreuung von Wohn- & Gewerbeliegenschaften",
        "Schweizer Qualitätsstandard & versicherte Mitarbeitende",
        "Regionale Präsenz in Biel, Nidau, Lyss & Umgebung"
      ]
    });
  }

  // --- Service Bullets (enriched) ---
  page.serviceBulletsHeading = "Unser Hauswartung & Facility Service Leistungsangebot";
  page.serviceBullets = [
    "Hauswartung & Objektbetreuung",
    "Treppenhausreinigung & Unterhaltsreinigung",
    "Technischer Hausdienst & Anlagenkontrolle",
    "Winterdienst & Schneeräumung",
    "Umgebungspflege & Grünflächenunterhalt",
    "Liftreinigung & Garagenreinigung",
    "Gebäudeunterhalt & Liegenschaftsservice",
    "Immobilienservice für Verwaltungen"
  ];

  // --- Trust Points (enriched with B2B signals) ---
  page.trustPoints = [
    "Feste Ansprechpartner für Verwaltungen",
    "Schweizer Qualitätsstandard",
    "Schnelle Reaktionszeiten & flexible Servicepläne"
  ];

  // --- CTA Mid (REMOVE "Facility Management") ---
  page.ctaMidHeading = "Hauswartung & Objektbetreuung für Ihre Liegenschaften?";
  page.ctaMidBody = "Gerne erstellen wir ein massgeschneidertes Pflichtenheft für Ihre Immobilien in Biel/Bienne und der Region Seeland.";

  // --- CTA Strong (enriched) ---
  page.ctaStrongHeading = "Ihr Premium Partner für Hauswartung & Liegenschaftsservice";
  page.ctaStrongBody = "Kontaktieren Sie SwissCleanMove für professionelle Hauswartung, Objektbetreuung und Gebäudeunterhalt in Biel/Bienne, Nidau, Brügg, Aarberg, Pieterlen und dem gesamten Seeland.";

  // --- Testimonial (keep but enrich trust label) ---
  page.testimonial.trust = "Verifizierter B2B Liegenschaftspartner";

  // --- FAQs (enrich existing + add new non-duplicate ones) ---
  page.faqs = [
    {
      question: "Bietet SwissCleanMove Hauswartung für Immobilienverwaltungen?",
      answer: "Ja, wir sind auf die professionelle Zusammenarbeit mit Immobilienverwaltungen, Stockwerkeigentümergemeinschaften und Eigentümern von Gewerbeliegenschaften im Seeland spezialisiert. Unser Liegenschaftsservice umfasst technischen Hausdienst, Treppenhausreinigung, Winterdienst und Umgebungspflege."
    },
    {
      question: "Was umfasst der Hauswartservice von SwissCleanMove?",
      answer: "Unser Hauswartservice beinhaltet Treppenhausreinigung, Unterhaltsreinigung, technische Kontrollgänge, Winterdienst mit Schneeräumung, Umgebungspflege, Liftreinigung und Garagenreinigung — alles aus einer Hand mit festen Ansprechpartnern."
    },
    {
      question: "Bietet SwissCleanMove Winterdienst in Biel an?",
      answer: "Ja, unser professioneller Winterdienst in Biel/Bienne und dem Seeland umfasst Schneeräumung und Salzung für Wohnanlagen, Bürogebäude und Gewerbeliegenschaften — zuverlässig, pünktlich und gesetzeskonform."
    },
    {
      question: "In welchen Orten rund um Biel ist SwissCleanMove tätig?",
      answer: "Unser Hauswartung und Facility Service deckt Biel/Bienne und das gesamte Seeland ab: Nidau, Brügg, Ipsach, Port, Lyss, Aarberg, Pieterlen, Studen, Orpund und Täuffelen."
    },
    {
      question: "Wie oft kann die Hauswartung durchgeführt werden?",
      answer: "Die Frequenz wird individuell nach Ihren Bedürfnissen festgelegt. Wir bieten tägliche, wöchentliche oder massgeschneiderte Intervalle für Unterhaltsreinigung, Gebäudeunterhalt und Objektkontrollen."
    },
    {
      question: "Was unterscheidet SwissCleanMove von anderen Hauswartungsfirmen?",
      answer: "Wir bieten Premium Hauswartung mit festen Ansprechpartnern, langfristigen Betreuungskonzepten und Schweizer Qualitätsstandard. Keine anonyme Vermittlung — sondern professionelle Objektbetreuung mit transparenter Abrechnung und schnellen Reaktionszeiten."
    },
    {
      question: "Bietet SwissCleanMove Objektbetreuung für Gewerbeimmobilien?",
      answer: "Ja, wir betreuen Bürogebäude, Praxisräumlichkeiten und Gewerbeliegenschaften in Biel/Bienne und Umgebung. Unser Objektservice für Unternehmen umfasst technische Kontrollen, Reinigungsdienstleistungen und saisonale Aussenarbeiten."
    }
  ];

  // --- Service Cards (add Objektbetreuung card) ---
  page.serviceCardsHeading = "Unsere Premium Hauswartung & Facility Services";
  page.serviceCards = [
    {
      title: "Technischer Hausdienst",
      description: "Umfassende Kontrolle und Instandhaltung der Gebäudetechnik für Ihre Liegenschaften.",
      features: [
        "Regelmässige Kontrollgänge & Sicherheitsüberprüfung",
        "Koordination von Handwerkern & Instandhaltung",
        "Schnelle Reaktionszeiten bei Störungen"
      ]
    },
    {
      title: "Treppenhausreinigung & Gebäudeservice",
      description: "Makellose Sauberkeit in allen Gemeinschaftszonen — für einen gepflegten Gesamteindruck.",
      features: [
        "Reinigung von Treppen, Böden & Foyers",
        "Fenster- und Liftreinigung",
        "Pflege von Eingangsbereichen"
      ]
    },
    {
      title: "Winterdienst & Schneeräumung",
      description: "Sichere Zugangswege und eisfreie Parkflächen — zuverlässig und gesetzeskonform.",
      features: [
        "Zuverlässige Schneeräumung & Salzung",
        "Schwarzflächenreinigung & Enteissung",
        "Gesetzeskonforme Ausführung"
      ]
    },
    {
      title: "Objektbetreuung & Liegenschaftsservice",
      description: "Ganzheitliche Betreuung Ihrer Immobilien — von der Umgebungspflege bis zur Abfallbewirtschaftung.",
      features: [
        "Grünflächenunterhalt & Umgebungspflege",
        "Abfallbewirtschaftung & Entsorgung",
        "Flexible Servicepläne nach Pflichtenheft"
      ]
    }
  ];

  // --- Internal Links (enriched labels) ---
  page.internalLinksHeading = "Verwandte Dienstleistungen für Verwaltungen & Unternehmen";
  page.internalLinks = [
    { label: "Facility Service Biel — Gebäudeservice", href: "facility-service-biel" },
    { label: "Unterhaltsreinigung Biel — Regelmässige Reinigung", href: "unterhaltsreinigung-biel" },
    { label: "Fensterreinigung Biel — Professionell & Streifenfrei", href: "fensterreinigung-biel" },
    { label: "Reinigungsfirma Biel — Ihr lokaler Partner", href: "reinigungsfirma-biel" }
  ];
});


// ============================================================
// ENGLISH (en.json) — International SEO Layer
// ============================================================
updateJsonFile('messages/en.json', (data) => {
  const page = data.seoPages.hauswartungBiel;

  // --- Meta ---
  page.meta.title = "Property Maintenance Biel/Bienne | Facility Service & Building Care | SwissCleanMove";
  page.meta.description = "Professional property maintenance, facility service, and building care in Biel/Bienne & Seeland. Caretaker service, building cleaning, and property supervision for B2B property managers.";

  // --- H1 (REMOVE "Facility Management") ---
  page.h1 = "Property Maintenance Biel/Bienne — Facility Service & Building Care";

  // --- Hero Subtitle (REMOVE "Facility Management") ---
  page.heroSubtitle = "As a Swiss quality provider for property maintenance and facility service, we serve property managers, residential complexes and commercial buildings throughout the Seeland.";

  // --- Badge ---
  page.badge = "Premium Property Maintenance & Building Care Biel";

  // --- Intro (enriched, no "Facility Management") ---
  page.intro = "A professionally maintained property ensures value retention and guarantees the highest satisfaction among tenants and condominium associations. SwissCleanMove is your reliable partner for property maintenance in Biel/Bienne — offering comprehensive facility service, building care, and caretaker service. We provide tailored property supervision for property managers, office buildings, and residential complexes — with premium Swiss quality standards, dedicated contact persons, and long-term service concepts across the Seeland.";

  // --- Sections (enriched) ---
  page.sections[0].heading = "Technical Building Service & Property Supervision Biel";
  page.sections[0].body = "Our technical building service and caretaker service is designed for professional B2B requirements. We take over complete property supervision, coordinate inspection rounds, and ensure that building technology functions flawlessly. Whether apartment buildings in Nidau, office properties in Brügg, or commercial buildings in Lyss — our property maintenance in Biel guarantees fast response times and reliable building inspections.";
  page.sections[0].bullets = [
    "Technical building service & system control",
    "Regular inspection rounds & security checks",
    "Coordination of tradesmen & maintenance",
    "Fast response times & 24/7 on-call service"
  ];

  page.sections[1].heading = "Building Cleaning & Stairwell Cleaning Biel";
  page.sections[1].body = "The first impression of your property counts. Our building care service in Biel covers professional stairwell cleaning, gentle elevator cleaning, and systematic garage cleaning. We serve residential complexes, apartment buildings, and condominium associations with a dedicated cleaning team and flexible service plans.";
  page.sections[1].bullets = [
    "Stairwell cleaning & maintenance cleaning",
    "Elevator cleaning & window fronts",
    "Garage cleaning (mechanical)",
    "Care of entrance areas & foyers"
  ];

  page.sections[2].heading = "Grounds Maintenance & Winter Service in the Seeland";
  page.sections[2].body = "The outdoor facilities are the calling card of your property. SwissCleanMove provides professional building care in Biel, Ipsach, Port, Täuffelen, and Studen. In the cold season, our reliable winter service guarantees safe access paths — on time and legally compliant for residential complexes and commercial properties.";
  page.sections[2].bullets = [
    "Grounds maintenance & green area upkeep",
    "Winter service & snow removal",
    "Asphalt surface cleaning & salting",
    "Waste management & disposal"
  ];

  // --- ADD Section 4 (NEW) ---
  if (page.sections.length === 3) {
    page.sections.push({
      heading: "Property Maintenance for Property Managers",
      body: "Property managers in Biel/Bienne, Aarberg, Pieterlen, and Orpund trust SwissCleanMove as a reliable partner for professional property supervision. We create tailored service specifications and handle the complete property care — from maintenance cleaning and technical building service to seasonal grounds maintenance. Dedicated contact persons, flexible service plans, and transparent billing ensure a long-term, trusted partnership.",
      bullets: [
        "Tailored service specifications for property managers",
        "Dedicated contact persons & property supervision",
        "Flexible service plans & transparent billing",
        "Long-term service concepts for properties"
      ]
    });
  }

  // --- ADD Section 5 (NEW) ---
  if (page.sections.length === 4) {
    page.sections.push({
      heading: "Professional Building Care for Commercial Properties",
      body: "Commercial clients and businesses in Biel/Bienne benefit from our comprehensive property maintenance service. Whether office buildings in Lyss, medical practices in Brügg, or commercial properties in Ipsach — we provide professional care for residential and commercial properties to Swiss quality standards. Our property service for businesses covers technical inspections, cleaning services, and seasonal outdoor work — all from a single source.",
      bullets: [
        "Property service for office buildings & commercial properties",
        "Professional care for residential & commercial buildings",
        "Swiss quality standard & insured staff",
        "Regional presence in Biel, Nidau, Lyss & surrounding areas"
      ]
    });
  }

  // --- Service Bullets ---
  page.serviceBulletsHeading = "Our Property Maintenance & Facility Service Portfolio";
  page.serviceBullets = [
    "Property Maintenance & Building Supervision",
    "Stairwell Cleaning & Maintenance Cleaning",
    "Technical Building Service & System Control",
    "Winter Service & Snow Removal",
    "Grounds Maintenance & Green Area Upkeep",
    "Elevator & Garage Cleaning",
    "Building Care & Property Service",
    "Property Supervision for Property Managers"
  ];

  // --- Trust Points ---
  page.trustPoints = [
    "Dedicated Contact Persons for Property Managers",
    "Swiss Quality Standard",
    "Fast Response Times & Flexible Service Plans"
  ];

  // --- CTA Mid (REMOVE "Facility Management") ---
  page.ctaMidHeading = "Property Maintenance & Building Care for Your Properties?";
  page.ctaMidBody = "We are happy to create a tailored service specification for your properties in Biel/Bienne and the Seeland region.";

  // --- CTA Strong ---
  page.ctaStrongHeading = "Your Premium Partner for Property Maintenance & Facility Service";
  page.ctaStrongBody = "Contact SwissCleanMove for professional property maintenance, building care, and caretaker service in Biel/Bienne, Nidau, Brügg, Aarberg, Pieterlen, and the entire Seeland.";

  // --- Testimonial ---
  page.testimonial.trust = "Verified B2B Property Service Partner";

  // --- FAQs ---
  page.faqs = [
    {
      question: "Does SwissCleanMove offer property maintenance for property managers?",
      answer: "Yes, we specialize in working with property managers, condominium associations, and owners of commercial properties in the Seeland. Our property service includes technical building service, stairwell cleaning, winter service, and grounds maintenance."
    },
    {
      question: "What is included in the caretaker service?",
      answer: "Our caretaker service includes stairwell cleaning, maintenance cleaning, technical inspection rounds, winter service with snow removal, grounds maintenance, elevator cleaning, and garage cleaning — all from a single source with dedicated contact persons."
    },
    {
      question: "Does SwissCleanMove offer winter service in Biel?",
      answer: "Yes, our professional winter service in Biel/Bienne and the Seeland includes snow removal and salting for residential complexes, office buildings, and commercial properties — reliable, punctual, and legally compliant."
    },
    {
      question: "Which areas around Biel does SwissCleanMove serve?",
      answer: "Our property maintenance and facility service covers Biel/Bienne and the entire Seeland: Nidau, Brügg, Ipsach, Port, Lyss, Aarberg, Pieterlen, Studen, Orpund, and Täuffelen."
    },
    {
      question: "How often can property maintenance be performed?",
      answer: "The frequency is determined individually according to your property's needs. We offer daily, weekly, or customized intervals for maintenance cleaning, building care, and property inspections."
    },
    {
      question: "What distinguishes SwissCleanMove from other property maintenance providers?",
      answer: "We offer premium property maintenance with dedicated contact persons, long-term service concepts, and Swiss quality standards. No anonymous outsourcing — but professional property supervision with transparent billing and fast response times."
    },
    {
      question: "Does SwissCleanMove offer building care for commercial properties?",
      answer: "Yes, we serve office buildings, medical practices, and commercial properties in Biel/Bienne and the surrounding area. Our property service for businesses covers technical inspections, cleaning services, and seasonal outdoor work."
    }
  ];

  // --- Service Cards ---
  page.serviceCardsHeading = "Our Premium Property Maintenance & Facility Services";
  page.serviceCards = [
    {
      title: "Technical Building Service",
      description: "Comprehensive inspection and maintenance of building technology for your properties.",
      features: [
        "Regular inspection rounds & security checks",
        "Coordination of tradesmen & maintenance",
        "Fast response times for disruptions"
      ]
    },
    {
      title: "Stairwell Cleaning & Building Service",
      description: "Immaculate cleanliness in all common areas — for a well-maintained overall impression.",
      features: [
        "Cleaning of stairs, floors & foyers",
        "Window and elevator cleaning",
        "Care of entrance areas"
      ]
    },
    {
      title: "Winter Service & Snow Removal",
      description: "Safe access paths and ice-free parking areas — reliable and legally compliant.",
      features: [
        "Reliable snow removal & salting",
        "Asphalt surface cleaning & de-icing",
        "Legally compliant execution"
      ]
    },
    {
      title: "Property Supervision & Building Care",
      description: "Holistic care of your properties — from grounds maintenance to waste management.",
      features: [
        "Green area upkeep & grounds maintenance",
        "Waste management & disposal",
        "Flexible service plans per specification"
      ]
    }
  ];

  // --- Internal Links ---
  page.internalLinksHeading = "Related Services for Property Managers & Businesses";
  page.internalLinks = [
    { label: "Facility Service Biel — Building Service", href: "facility-service-biel" },
    { label: "Maintenance Cleaning Biel — Regular Cleaning", href: "unterhaltsreinigung-biel" },
    { label: "Window Cleaning Biel — Professional & Streak-Free", href: "fensterreinigung-biel" },
    { label: "Cleaning Company Biel — Your Local Partner", href: "reinigungsfirma-biel" }
  ];
});


// ============================================================
// FRENCH (fr.json) — Francophone SEO Layer
// ============================================================
updateJsonFile('messages/fr.json', (data) => {
  const page = data.seoPages.hauswartungBiel;

  // --- Meta ---
  page.meta.title = "Conciergerie Bienne/Biel | Facility Service & Entretien de Bâtiments | SwissCleanMove";
  page.meta.description = "Conciergerie professionnelle & Facility Service à Bienne/Biel. Entretien de bâtiments, nettoyage de cages d'escalier & service hivernal pour gérances immobilières dans le Seeland.";

  // --- H1 (REMOVE "Gestion de Bâtiments", REMOVE "Facility Management") ---
  page.h1 = "Conciergerie Bienne/Biel — Facility Service & Entretien de Bâtiments";

  // --- Hero Subtitle (REMOVE "Facility Management") ---
  page.heroSubtitle = "En tant que prestataire suisse de qualité pour la conciergerie et le facility service, nous gérons les immeubles de bureaux, les complexes résidentiels et les locaux commerciaux dans tout le Seeland.";

  // --- Badge ---
  page.badge = "Conciergerie & Entretien Premium Bienne";

  // --- Intro ---
  page.intro = "Un immeuble entretenu de manière professionnelle garantit le maintien de sa valeur et la plus haute satisfaction des locataires et des copropriétaires. SwissCleanMove est votre partenaire fiable pour la conciergerie à Bienne/Biel — avec un facility service complet, un entretien de bâtiments professionnel et un service de gardiennage dédié. Nous offrons des solutions sur mesure pour les gérances immobilières, les immeubles de bureaux et les complexes résidentiels — avec des standards de qualité suisses, des interlocuteurs dédiés et des concepts d'entretien à long terme dans le Seeland.";

  // --- Sections (enriched) ---
  page.sections[0].heading = "Service Technique & Surveillance de Propriétés Bienne";
  page.sections[0].body = "Notre service technique et de gardiennage est conçu pour les exigences professionnelles B2B. Nous prenons en charge la surveillance complète des propriétés, coordonnons les rondes d'inspection et veillons au bon fonctionnement technique. Que ce soit des immeubles à Nidau, des bureaux à Brügg ou des locaux commerciaux à Lyss — notre conciergerie à Bienne garantit des temps de réaction rapides et des contrôles fiables.";
  page.sections[0].bullets = [
    "Service technique & contrôle des installations",
    "Rondes de contrôle régulières & vérification de sécurité",
    "Coordination des artisans & maintenance",
    "Temps de réaction rapides & service de piquet 24/7"
  ];

  page.sections[1].heading = "Nettoyage de Bâtiments & Cages d'Escalier Bienne";
  page.sections[1].body = "La première impression de votre immeuble compte. Notre service d'entretien de bâtiments à Bienne comprend le nettoyage professionnel des cages d'escalier, le nettoyage en douceur des ascenseurs et le nettoyage systématique des garages. Nous entretenons les complexes résidentiels et les copropriétés avec une équipe de nettoyage dédiée et des plans de service flexibles.";
  page.sections[1].bullets = [
    "Nettoyage de cage d'escalier & nettoyage d'entretien",
    "Nettoyage d'ascenseurs & façades vitrées",
    "Nettoyage de garage (mécanique)",
    "Entretien des zones d'entrée & foyers"
  ];

  page.sections[2].heading = "Entretien Extérieur & Service Hivernal dans le Seeland";
  page.sections[2].body = "Les installations extérieures sont la carte de visite de votre propriété. SwissCleanMove assure l'entretien professionnel des bâtiments à Bienne, Ipsach, Port, Täuffelen et Studen. Pendant la saison froide, notre service hivernal fiable garantit des voies d'accès sûres — à l'heure et conformément à la loi pour les complexes résidentiels et les immeubles commerciaux.";
  page.sections[2].bullets = [
    "Entretien extérieur & espaces verts",
    "Service hivernal & déneigement",
    "Nettoyage des surfaces & salage",
    "Gestion des déchets & élimination"
  ];

  // --- ADD Section 4 (NEW) ---
  if (page.sections.length === 3) {
    page.sections.push({
      heading: "Conciergerie pour Gérances Immobilières",
      body: "Les gérances immobilières à Bienne/Biel, Aarberg, Pieterlen et Orpund font confiance à SwissCleanMove comme partenaire fiable pour la surveillance professionnelle de propriétés. Nous créons des cahiers des charges sur mesure et prenons en charge l'ensemble du service immobilier — du nettoyage d'entretien au service technique en passant par l'entretien saisonnier. Des interlocuteurs dédiés, des plans de service flexibles et une facturation transparente garantissent un partenariat de confiance à long terme.",
      bullets: [
        "Cahiers des charges sur mesure pour les gérances",
        "Interlocuteurs dédiés & supervision de propriétés",
        "Plans de service flexibles & facturation transparente",
        "Concepts d'entretien à long terme"
      ]
    });
  }

  // --- ADD Section 5 (NEW) ---
  if (page.sections.length === 4) {
    page.sections.push({
      heading: "Entretien Professionnel pour Immeubles Commerciaux",
      body: "Les entreprises et clients commerciaux à Bienne/Biel bénéficient de notre service immobilier complet. Que ce soit des immeubles de bureaux à Lyss, des cabinets à Brügg ou des locaux commerciaux à Ipsach — nous assurons l'entretien professionnel des propriétés résidentielles et commerciales selon les standards de qualité suisses. Notre service pour entreprises comprend des contrôles techniques, des services de nettoyage et des travaux extérieurs saisonniers.",
      bullets: [
        "Service pour immeubles de bureaux & locaux commerciaux",
        "Entretien professionnel de propriétés résidentielles & commerciales",
        "Standard de qualité suisse & personnel assuré",
        "Présence régionale à Bienne, Nidau, Lyss & environs"
      ]
    });
  }

  // --- Service Bullets ---
  page.serviceBulletsHeading = "Notre Offre de Conciergerie & Facility Service";
  page.serviceBullets = [
    "Conciergerie & Surveillance de Propriétés",
    "Nettoyage de cages d'escalier & d'entretien",
    "Service technique & Contrôle des installations",
    "Service hivernal & Déneigement",
    "Entretien extérieur & Espaces verts",
    "Nettoyage d'ascenseurs & de garages",
    "Entretien de bâtiments & Service immobilier",
    "Supervision de propriétés pour gérances"
  ];

  // --- Trust Points ---
  page.trustPoints = [
    "Interlocuteurs dédiés pour les gérances",
    "Standard de qualité suisse",
    "Temps de réaction rapides & plans de service flexibles"
  ];

  // --- CTA Mid (REMOVE "Facility Management") ---
  page.ctaMidHeading = "Conciergerie & Entretien pour vos Immeubles ?";
  page.ctaMidBody = "Nous établissons volontiers un cahier des charges sur mesure pour vos immeubles à Bienne/Biel et dans la région du Seeland.";

  // --- CTA Strong ---
  page.ctaStrongHeading = "Votre Partenaire Premium pour la Conciergerie & le Facility Service";
  page.ctaStrongBody = "Contactez SwissCleanMove pour une conciergerie professionnelle, un entretien de bâtiments et un service de gardiennage à Bienne/Biel, Nidau, Brügg, Aarberg, Pieterlen et dans tout le Seeland.";

  // --- Testimonial ---
  page.testimonial.trust = "Partenaire B2B Immobilier Vérifié";

  // --- FAQs ---
  page.faqs = [
    {
      question: "SwissCleanMove propose-t-il une conciergerie pour les gérances ?",
      answer: "Oui, nous sommes spécialisés dans la collaboration avec les gérances immobilières, les copropriétaires et les propriétaires d'immeubles commerciaux dans le Seeland. Notre service immobilier comprend le service technique, le nettoyage de cages d'escalier, le service hivernal et l'entretien extérieur."
    },
    {
      question: "Que comprend le service de conciergerie ?",
      answer: "Notre conciergerie comprend le nettoyage de cages d'escalier, le nettoyage d'entretien, les rondes d'inspection technique, le service hivernal avec déneigement, l'entretien extérieur, le nettoyage d'ascenseurs et de garages — le tout avec des interlocuteurs dédiés."
    },
    {
      question: "SwissCleanMove offre-t-il un service hivernal à Bienne ?",
      answer: "Oui, notre service hivernal professionnel à Bienne/Biel et dans le Seeland comprend le déneigement et le salage pour les complexes résidentiels, les immeubles de bureaux et les locaux commerciaux — fiable, ponctuel et conforme à la loi."
    },
    {
      question: "Quelles régions autour de Bienne couvre SwissCleanMove ?",
      answer: "Notre conciergerie et facility service couvre Bienne/Biel et tout le Seeland : Nidau, Brügg, Ipsach, Port, Lyss, Aarberg, Pieterlen, Studen, Orpund et Täuffelen."
    },
    {
      question: "À quelle fréquence la conciergerie peut-elle être effectuée ?",
      answer: "La fréquence est déterminée individuellement selon les besoins de votre immeuble. Nous proposons des interventions quotidiennes, hebdomadaires ou sur mesure pour le nettoyage d'entretien, l'entretien de bâtiments et les contrôles de propriétés."
    },
    {
      question: "Qu'est-ce qui distingue SwissCleanMove des autres prestataires ?",
      answer: "Nous offrons une conciergerie premium avec des interlocuteurs dédiés, des concepts d'entretien à long terme et des standards de qualité suisses. Pas de sous-traitance anonyme — mais une surveillance professionnelle avec facturation transparente et temps de réaction rapides."
    },
    {
      question: "SwissCleanMove propose-t-il un entretien pour les immeubles commerciaux ?",
      answer: "Oui, nous entretenons les immeubles de bureaux, les cabinets et les locaux commerciaux à Bienne/Biel et environs. Notre service pour entreprises comprend des contrôles techniques, des services de nettoyage et des travaux extérieurs saisonniers."
    }
  ];

  // --- Service Cards ---
  page.serviceCardsHeading = "Nos Services Premium de Conciergerie & Facility Service";
  page.serviceCards = [
    {
      title: "Service Technique du Bâtiment",
      description: "Inspection complète et maintenance de la technique du bâtiment pour vos propriétés.",
      features: [
        "Rondes de contrôle régulières & vérifications de sécurité",
        "Coordination des artisans & maintenance",
        "Temps de réaction rapides"
      ]
    },
    {
      title: "Nettoyage de Cages d'Escalier & Service de Bâtiment",
      description: "Propreté immaculée dans toutes les zones communes — pour une impression soignée.",
      features: [
        "Nettoyage des escaliers, sols & foyers",
        "Nettoyage des fenêtres et ascenseurs",
        "Entretien des zones d'entrée"
      ]
    },
    {
      title: "Service Hivernal & Déneigement",
      description: "Voies d'accès sûres et parkings déglacés — fiable et conforme à la loi.",
      features: [
        "Déneigement fiable & salage",
        "Nettoyage des surfaces & déglaçage",
        "Exécution conforme à la loi"
      ]
    },
    {
      title: "Surveillance de Propriétés & Service Immobilier",
      description: "Entretien global de vos propriétés — de l'entretien extérieur à la gestion des déchets.",
      features: [
        "Entretien des espaces verts & extérieurs",
        "Gestion des déchets & élimination",
        "Plans de service flexibles"
      ]
    }
  ];

  // --- Internal Links ---
  page.internalLinksHeading = "Services associés pour Gérances & Entreprises";
  page.internalLinks = [
    { label: "Facility Service Bienne — Service de Bâtiment", href: "facility-service-biel" },
    { label: "Nettoyage d'entretien Bienne — Nettoyage Régulier", href: "unterhaltsreinigung-biel" },
    { label: "Nettoyage de vitres Bienne — Professionnel", href: "fensterreinigung-biel" },
    { label: "Entreprise de nettoyage Bienne — Votre Partenaire Local", href: "reinigungsfirma-biel" }
  ];
});

console.log('✅ SEO enrichment v2 complete — all 3 languages updated.');
console.log('  - Removed all "Facility Management" references');
console.log('  - Added 2 new H2 sections per language (5 total)');
console.log('  - Added 2 new FAQs per language (7 total)');
console.log('  - Enriched all keywords, trust points, CTAs, service cards');
console.log('  - Added Täuffelen to geo signals');
