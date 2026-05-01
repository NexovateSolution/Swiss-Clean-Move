const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fr'];
const clusters = ['umzug', 'reinigung', 'endreinigung'];
const cities = ['biel', 'nidau', 'lyss', 'bruegg', 'ipsach', 'aarberg', 'pieterlen'];

const cityMapping = {
  biel: 'Biel/Bienne',
  nidau: 'Nidau',
  lyss: 'Lyss',
  bruegg: 'Brügg',
  ipsach: 'Ipsach',
  aarberg: 'Aarberg',
  pieterlen: 'Pieterlen'
};

const serviceMappingDe = {
  umzug: 'Umzug',
  reinigung: 'Reinigung',
  endreinigung: 'Endreinigung'
};

const serviceMappingEn = {
  umzug: 'Relocation',
  reinigung: 'Cleaning',
  endreinigung: 'End-of-tenancy Cleaning'
};

const serviceMappingFr = {
  umzug: 'Déménagement',
  reinigung: 'Nettoyage',
  endreinigung: 'Nettoyage de fin de bail'
};

const getMappings = (locale) => {
  if (locale === 'en') return serviceMappingEn;
  if (locale === 'fr') return serviceMappingFr;
  return serviceMappingDe;
};

// Trust signals for testimonials
const trustSignals = {
  de: ["Über 50 zufriedene Kunden im Seeland", "Seit Jahren in der Region tätig"],
  en: ["Over 50 satisfied customers in Seeland", "Operating in the region for years"],
  fr: ["Plus de 50 clients satisfaits dans le Seeland", "Actif dans la région depuis des années"]
};

// EEAT signals
const eeatSignals = {
  umzug: {
    de: "ab CHF 490. 2–4 Zügelhelfer. Transportversicherung inklusive. 1–2 Tage Umzugsdauer.",
    en: "from CHF 490. 2-4 movers. Transport insurance included. 1-2 days relocation duration.",
    fr: "dès CHF 490. 2-4 déménageurs. Assurance transport incluse. Durée de déménagement 1-2 jours."
  },
  endreinigung: {
    de: "100% Abnahmegarantie. ab CHF 350. 4–8 Stunden Dauer.",
    en: "100% handover guarantee. from CHF 350. 4-8 hours duration.",
    fr: "Garantie de remise à 100%. dès CHF 350. Durée 4-8 heures."
  },
  reinigung: {
    de: "ab CHF 35/Stunde. Regelmässig wöchentlich oder monatlich. Umweltfreundliche Reinigungsmittel.",
    en: "from CHF 35/hour. Regular weekly or monthly. Eco-friendly cleaning products.",
    fr: "dès CHF 35/heure. Régulier hebdomadaire ou mensuel. Produits de nettoyage écologiques."
  }
};

const localMicroSignals = {
  biel: { de: "direkt am Bielersee", en: "right on Lake Biel", fr: "directement au bord du lac de Bienne" },
  nidau: { de: "im Herzen von Nidau", en: "in the heart of Nidau", fr: "au coeur de Nidau" },
  lyss: { de: "zentral in Lyss", en: "centrally located in Lyss", fr: "au centre de Lyss" },
  bruegg: { de: "schnell in Brügg", en: "fast in Brügg", fr: "rapide à Brügg" },
  ipsach: { de: "zuverlässig in Ipsach", en: "reliable in Ipsach", fr: "fiable à Ipsach" },
  aarberg: { de: "historisches Aarberg", en: "historic Aarberg", fr: "Aarberg historique" },
  pieterlen: { de: "direkt in Pieterlen", en: "directly in Pieterlen", fr: "directement à Pieterlen" }
};

const travelTimes = [
  { de: "Innerhalb 24 Stunden verfügbar.", en: "Available within 24 hours.", fr: "Disponible sous 24 heures." },
  { de: "Kurzfristige Termine möglich.", en: "Short-term appointments possible.", fr: "Rendez-vous à court terme possibles." },
  { de: "Schnelle Reaktionszeit garantiert.", en: "Fast response time guaranteed.", fr: "Temps de réponse rapide garanti." }
];

const ctaVariations = {
  de: [
    "Jetzt kostenlose Offerte anfordern",
    "Offerte in 2 Minuten sichern",
    "Schnelle Rückmeldung innerhalb 24h",
    "Unverbindlich anfragen"
  ],
  en: [
    "Request free quote now",
    "Secure quote in 2 minutes",
    "Fast feedback within 24h",
    "Inquire without obligation"
  ],
  fr: [
    "Demander un devis gratuit",
    "Obtenir un devis en 2 minutes",
    "Retour rapide sous 24h",
    "Demande sans engagement"
  ]
};

const emotionalTriggers = {
  de: ["Schnell & zuverlässig", "Mit Garantie", "Stressfrei", "Professionell", "Zum Fixpreis"],
  en: ["Fast & reliable", "With guarantee", "Stress-free", "Professional", "Fixed price"],
  fr: ["Rapide et fiable", "Avec garantie", "Sans stress", "Professionnel", "Prix fixe"]
};

// Generate unique FAQs
const generateFaqs = (cluster, city, locale) => {
  const service = getMappings(locale)[cluster];
  const cityName = cityMapping[city];
  
  if (locale === 'de') {
    return [
      {
        question: `Was kostet ein ${service} in ${cityName}?`,
        answer: `Die Kosten für Ihren ${service} in ${cityName} hängen von der Wohnungsgrösse ab. ${eeatSignals[cluster].de} Wir bieten transparente Pauschalpreise.`
      },
      {
        question: `Sind Sie auch kurzfristig für einen ${service} in ${cityName} verfügbar?`,
        answer: `Ja, ${travelTimes[Math.floor(Math.random() * travelTimes.length)].de} Wir sind eine lokale Firma und schnell in ${cityName} vor Ort.`
      }
    ];
  } else if (locale === 'en') {
    return [
      {
        question: `How much does a ${service} cost in ${cityName}?`,
        answer: `The costs for your ${service} in ${cityName} depend on the size of the apartment. ${eeatSignals[cluster].en} We offer transparent flat rates.`
      },
      {
        question: `Are you available on short notice for a ${service} in ${cityName}?`,
        answer: `Yes, ${travelTimes[Math.floor(Math.random() * travelTimes.length)].en} We are a local company and quickly on site in ${cityName}.`
      }
    ];
  } else {
    return [
      {
        question: `Combien coûte un ${service} à ${cityName}?`,
        answer: `Les coûts de votre ${service} à ${cityName} dépendent de la taille de l'appartement. ${eeatSignals[cluster].fr} Nous proposons des tarifs forfaitaires transparents.`
      },
      {
        question: `Êtes-vous disponible à court terme pour un ${service} à ${cityName}?`,
        answer: `Oui, ${travelTimes[Math.floor(Math.random() * travelTimes.length)].fr} Nous sommes une entreprise locale et rapidement sur place à ${cityName}.`
      }
    ];
  }
};

const processFiles = () => {
  locales.forEach(locale => {
    const filePath = path.join(__dirname, 'messages', `${locale}.json`);
    if (!fs.existsSync(filePath)) return;
    
    let data;
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      console.error(`Error parsing ${locale}.json`, e);
      return;
    }

    if (!data.seoPages) data.seoPages = {};

    clusters.forEach(cluster => {
      cities.forEach((city, index) => {
        const pageKey = cluster + city.charAt(0).toUpperCase() + city.slice(1);
        const cityName = cityMapping[city];
        const serviceName = getMappings(locale)[cluster];
        
        if (!data.seoPages[pageKey]) data.seoPages[pageKey] = {};
        const pageData = data.seoPages[pageKey];

        // 1. H1 Upgrade
        if (locale === 'de') {
          pageData.h1 = `${serviceName}sfirma ${cityName} – ${serviceName}, ${cluster === 'umzug' ? 'Umzugsreinigung' : 'Wohnungsreinigung'} & Reinigung in ${cityName}`;
        } else if (locale === 'en') {
          pageData.h1 = `${serviceName} Company ${cityName} – ${serviceName}, Cleaning & Moving in ${cityName}`;
        } else if (locale === 'fr') {
          pageData.h1 = `Entreprise de ${serviceName} ${cityName} – ${serviceName}, Nettoyage & Déménagement à ${cityName}`;
        }

        // 2. EEAT Signals + Local Signals
        const eeat = eeatSignals[cluster][locale];
        const microSignal = localMicroSignals[city][locale];
        const travelTime = travelTimes[index % travelTimes.length][locale];
        
        // Append to intro if not already there
        if (pageData.intro && !pageData.intro.includes(eeat)) {
          pageData.intro = `${pageData.intro} ${eeat} ${microSignal}. ${travelTime}`;
        }

        // 3. Testimonials
        if (!pageData.testimonial) {
          const names = ['Lukas M.', 'Sarah K.', 'Michael B.', 'Anna S.', 'Thomas W.', 'Elena R.', 'David P.'];
          const author = names[(index + cluster.length) % names.length];
          const trust = trustSignals[locale][index % 2];
          
          let quote = "";
          if (locale === 'de') quote = `Super ${serviceName} in ${cityName}! Sehr professionell und pünktlich.`;
          if (locale === 'en') quote = `Great ${serviceName} in ${cityName}! Very professional and punctual.`;
          if (locale === 'fr') quote = `Super ${serviceName} à ${cityName}! Très professionnel et ponctuel.`;

          pageData.testimonial = { quote, author, trust };
        }

        // 4. CTA Upgrades
        const ctas = ctaVariations[locale];
        pageData.ctaSoft = ctas[(index) % ctas.length];
        pageData.ctaMid = ctas[(index + 1) % ctas.length];
        pageData.ctaStrong = ctas[(index + 2) % ctas.length];

        // 5. CTR Optimization (Meta variants)
        const trigger = emotionalTriggers[locale][index % emotionalTriggers[locale].length];
        if (!pageData.meta) pageData.meta = {};
        if (locale === 'de') {
          pageData.meta.title = `${serviceName} in ${cityName} | ${trigger} | SwissCleanMove`;
          pageData.meta.titleVariant = `${cityName} ${serviceName} gesucht? ${trigger}`;
        } else if (locale === 'en') {
          pageData.meta.title = `${serviceName} in ${cityName} | ${trigger} | SwissCleanMove`;
          pageData.meta.titleVariant = `Looking for ${serviceName} in ${cityName}? ${trigger}`;
        } else {
          pageData.meta.title = `${serviceName} à ${cityName} | ${trigger} | SwissCleanMove`;
          pageData.meta.titleVariant = `Besoin d'un ${serviceName} à ${cityName}? ${trigger}`;
        }

        // 6. FAQs
        if (!pageData.faqs) {
          pageData.faqs = generateFaqs(cluster, city, locale);
        }
      });
    });

    // Write back
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${locale}.json`);
  });
};

processFiles();
