const fs = require('fs');
const path = require('path');

function makePageData(city, cityDE, cityFR, nearbyEN, nearbyDE, nearbyFR, extraEN, extraDE, extraFR) {
  return {
    en: {
      meta: { title: `Moving Company ${city} | SwissCleanMove`, description: `SwissCleanMove – your professional moving company in ${city}. Relocation, cleaning & facility services. Request a free quote now.` },
      badge: `Moving Company ${city}`,
      h1: `Moving Company ${city} – Relocation, Cleaning & Moving Services`,
      heroSubtitle: `Professional moves in ${city} – carefully planned, efficiently executed and fairly priced.`,
      ctaSoft: 'Request free quote now',
      intro: `Planning a move in ${city}? SwissCleanMove is your reliable partner for relocations and cleaning services. ${extraEN} Our experienced team ensures your move is stress-free, on time and at a transparent price.`,
      sections: [
        { heading: `Moving in ${city} – Our Services`, body: `As a moving company serving ${city}, we offer a complete package tailored to your needs. Whether private move, company relocation or office move – we take care of the entire process.`, bullets: ['Private and family moves', 'Company and office relocations', 'Packing and unpacking service', 'Furniture assembly and disassembly', 'Transport insurance included', 'End-of-tenancy cleaning available'] },
        { heading: 'How Your Move Works', body: 'A well-organized move starts with clear planning. You receive a free consultation, then a detailed quote with a flat rate – no hidden costs. On moving day, our team arrives punctually and handles everything professionally.', bullets: ['Step 1: Free consultation', 'Step 2: Individual quote with flat rate', 'Step 3: Professional packing and transport', 'Step 4: Setup at the new location'] },
        { heading: `Why Choose SwissCleanMove in ${city}?`, body: `We are a Swiss company based in Biel/Bienne, serving ${city} and the surrounding region with professional moving and cleaning services. Our prices are fair and transparent, our movers experienced and careful.`, bullets: [] }
      ],
      serviceBulletsHeading: 'Our Moving Services at a Glance',
      serviceBullets: ['3.5t and 7.5t moving vehicles', '2–4 experienced movers', 'Packing material included', 'Furniture lift available', 'Transport insurance included', 'Disposal of old furniture on request'],
      trustPoints: ['Swiss Quality Standards', 'Transparent Flat Rates', 'Available within 48h'],
      ctaMidHeading: `Planning a Move in ${city}?`,
      ctaMidBody: 'Request your free, no-obligation quote now. We will get back to you within 24 hours.',
      ctaMid: 'Get your quote now',
      internalLinksHeading: 'More Services',
      internalLinks: [
        { label: 'End-of-tenancy cleaning with handover guarantee', href: 'endreinigung-biel' },
        { label: 'All regions overview', href: 'regions' },
        { label: 'Moving service Biel/Bienne', href: 'umzug-biel' }
      ],
      ctaStrongHeading: 'Request Your Moving Quote – Free',
      ctaStrongBody: `Call us or fill out our form. We prepare a transparent quote for your move in ${city} within 24 hours.`,
      ctaStrong: 'Fast feedback within 24h',
      testimonial: { quote: `Great service for our move in ${city}! Very professional.`, author: 'SwissCleanMove Customer', trust: 'Trusted Swiss quality' },
      faqs: [
        { question: `How much does a move cost in ${city}?`, answer: `The cost depends on apartment size and distance. We offer transparent flat rates starting from CHF 490. Contact us for a free quote.` },
        { question: `Are you available on short notice in ${city}?`, answer: `Yes, we can often arrange moves within 48 hours. Contact us to check availability.` }
      ]
    },
    de: {
      meta: { title: `Umzugsfirma ${cityDE} | SwissCleanMove`, description: `SwissCleanMove – Ihre professionelle Umzugsfirma in ${cityDE}. Umzug, Reinigung & Facility Services. Jetzt kostenlose Offerte anfordern.` },
      badge: `Umzugsfirma ${cityDE}`,
      h1: `Umzugsfirma ${cityDE} – Umzug, Reinigung & Zügelservice`,
      heroSubtitle: `Professionelle Umzüge in ${cityDE} – sorgfältig geplant, effizient durchgeführt und fair bepreist.`,
      ctaSoft: 'Jetzt kostenlose Offerte anfordern',
      intro: `Planen Sie einen Umzug in ${cityDE}? SwissCleanMove ist Ihr zuverlässiger Partner für Umzüge und Reinigungen. ${extraDE} Unser erfahrenes Team sorgt dafür, dass Ihr Umzug stressfrei, pünktlich und zu einem transparenten Preis abläuft.`,
      sections: [
        { heading: `Umzug in ${cityDE} – Unsere Leistungen`, body: `Als Umzugsfirma für ${cityDE} bieten wir Ihnen ein Komplettpaket nach Ihren Bedürfnissen. Ob Privatumzug, Firmenumzug oder Büroumzug – wir kümmern uns um den gesamten Ablauf.`, bullets: ['Privat- und Familienumzüge', 'Firmen- und Büroumzüge', 'Ein- und Auspackservice', 'Möbelmontage und -demontage', 'Transportversicherung inklusive', 'Endreinigung auf Wunsch'] },
        { heading: 'So läuft Ihr Umzug ab', body: 'Ein gut organisierter Umzug beginnt mit klarer Planung. Sie erhalten eine kostenlose Beratung, dann eine detaillierte Offerte zum Fixpreis – ohne versteckte Kosten.', bullets: ['Schritt 1: Kostenlose Beratung', 'Schritt 2: Individuelle Offerte zum Fixpreis', 'Schritt 3: Professionelles Packen und Transport', 'Schritt 4: Aufbau am neuen Standort'] },
        { heading: `Warum SwissCleanMove in ${cityDE}?`, body: `Wir sind ein Schweizer Unternehmen mit Sitz in Biel/Bienne und bedienen ${cityDE} und die umliegende Region mit professionellen Umzugs- und Reinigungsdiensten. Unsere Preise sind fair und transparent.`, bullets: [] }
      ],
      serviceBulletsHeading: 'Unsere Umzugsleistungen im Überblick',
      serviceBullets: ['3.5t und 7.5t Umzugsfahrzeuge', '2–4 erfahrene Umzugshelfer', 'Packmaterial inklusive', 'Möbellift verfügbar', 'Transportversicherung inklusive', 'Entsorgung alter Möbel auf Wunsch'],
      trustPoints: ['Schweizer Qualitätsstandards', 'Transparente Fixpreise', 'Verfügbar innert 48h'],
      ctaMidHeading: `Planen Sie einen Umzug in ${cityDE}?`,
      ctaMidBody: 'Fordern Sie jetzt Ihre kostenlose, unverbindliche Offerte an. Wir melden uns innerhalb von 24 Stunden.',
      ctaMid: 'Jetzt Offerte sichern',
      internalLinksHeading: 'Weitere Dienstleistungen',
      internalLinks: [
        { label: 'Endreinigung mit Abnahmegarantie', href: 'endreinigung-biel' },
        { label: 'Alle Regionen im Überblick', href: 'regions' },
        { label: 'Umzugsfirma Biel/Bienne', href: 'umzug-biel' }
      ],
      ctaStrongHeading: 'Umzugsofferte anfordern – Kostenlos',
      ctaStrongBody: `Rufen Sie uns an oder füllen Sie unser Formular aus. Wir erstellen Ihnen innerhalb von 24 Stunden eine transparente Offerte für Ihren Umzug in ${cityDE}.`,
      ctaStrong: 'Schnelle Rückmeldung innert 24h',
      testimonial: { quote: `Toller Service für unseren Umzug in ${cityDE}! Sehr professionell.`, author: 'SwissCleanMove Kunde', trust: 'Vertrauenswürdige Schweizer Qualität' },
      faqs: [
        { question: `Was kostet ein Umzug in ${cityDE}?`, answer: `Die Kosten hängen von Wohnungsgrösse und Distanz ab. Wir bieten transparente Fixpreise ab CHF 490. Kontaktieren Sie uns für eine kostenlose Offerte.` },
        { question: `Sind Sie kurzfristig in ${cityDE} verfügbar?`, answer: `Ja, oft können wir Umzüge innerhalb von 48 Stunden organisieren. Kontaktieren Sie uns zur Verfügbarkeitsprüfung.` }
      ]
    },
    fr: {
      meta: { title: `Entreprise de déménagement ${cityFR} | SwissCleanMove`, description: `SwissCleanMove – votre entreprise de déménagement professionnelle à ${cityFR}. Déménagement, nettoyage & facility services. Demandez un devis gratuit.` },
      badge: `Déménagement ${cityFR}`,
      h1: `Entreprise de déménagement ${cityFR} – Déménagement, Nettoyage & Services`,
      heroSubtitle: `Déménagements professionnels à ${cityFR} – soigneusement planifiés, efficacement exécutés et à prix équitable.`,
      ctaSoft: 'Demander un devis gratuit',
      intro: `Vous planifiez un déménagement à ${cityFR} ? SwissCleanMove est votre partenaire fiable pour les déménagements et le nettoyage. ${extraFR} Notre équipe expérimentée garantit un déménagement sans stress, ponctuel et à un prix transparent.`,
      sections: [
        { heading: `Déménagement à ${cityFR} – Nos Services`, body: `En tant qu'entreprise de déménagement pour ${cityFR}, nous offrons un package complet adapté à vos besoins. Déménagement privé, d'entreprise ou de bureau – nous gérons tout le processus.`, bullets: ['Déménagements privés et familiaux', 'Déménagements d\'entreprise et de bureau', 'Service d\'emballage et déballage', 'Montage et démontage de meubles', 'Assurance transport incluse', 'Nettoyage de fin de bail disponible'] },
        { heading: 'Comment se déroule votre déménagement', body: 'Un déménagement bien organisé commence par une planification claire. Vous recevez une consultation gratuite, puis un devis détaillé à prix fixe – sans coûts cachés.', bullets: ['Étape 1 : Consultation gratuite', 'Étape 2 : Devis individuel à prix fixe', 'Étape 3 : Emballage et transport professionnels', 'Étape 4 : Installation au nouveau lieu'] },
        { heading: `Pourquoi choisir SwissCleanMove à ${cityFR} ?`, body: `Nous sommes une entreprise suisse basée à Biel/Bienne, desservant ${cityFR} et la région environnante avec des services professionnels de déménagement et de nettoyage. Nos prix sont équitables et transparents.`, bullets: [] }
      ],
      serviceBulletsHeading: 'Nos services de déménagement en un coup d\'œil',
      serviceBullets: ['Véhicules de 3.5t et 7.5t', '2–4 déménageurs expérimentés', 'Matériel d\'emballage inclus', 'Monte-meubles disponible', 'Assurance transport incluse', 'Élimination d\'anciens meubles sur demande'],
      trustPoints: ['Standards de qualité suisses', 'Prix fixes transparents', 'Disponible sous 48h'],
      ctaMidHeading: `Vous planifiez un déménagement à ${cityFR} ?`,
      ctaMidBody: 'Demandez votre devis gratuit et sans engagement. Nous vous répondons sous 24 heures.',
      ctaMid: 'Obtenir un devis maintenant',
      internalLinksHeading: 'Autres services',
      internalLinks: [
        { label: 'Nettoyage de fin de bail avec garantie', href: 'endreinigung-biel' },
        { label: 'Toutes les régions', href: 'regions' },
        { label: 'Déménagement Biel/Bienne', href: 'umzug-biel' }
      ],
      ctaStrongHeading: 'Demandez votre devis – Gratuit',
      ctaStrongBody: `Appelez-nous ou remplissez notre formulaire. Nous préparons un devis transparent pour votre déménagement à ${cityFR} sous 24 heures.`,
      ctaStrong: 'Réponse rapide sous 24h',
      testimonial: { quote: `Excellent service pour notre déménagement à ${cityFR} ! Très professionnel.`, author: 'Client SwissCleanMove', trust: 'Qualité suisse de confiance' },
      faqs: [
        { question: `Combien coûte un déménagement à ${cityFR} ?`, answer: `Le coût dépend de la taille de l'appartement et de la distance. Nous offrons des prix fixes transparents à partir de CHF 490. Contactez-nous pour un devis gratuit.` },
        { question: `Êtes-vous disponible rapidement à ${cityFR} ?`, answer: `Oui, nous pouvons souvent organiser des déménagements sous 48 heures. Contactez-nous pour vérifier la disponibilité.` }
      ]
    }
  };
}

const regions = [
  { key: 'umzugBern', en: 'Bern', de: 'Bern', fr: 'Berne',
    extraEN: 'We serve the entire Canton of Bern – from the city center to Thun, Burgdorf, and Langenthal.',
    extraDE: 'Wir bedienen den gesamten Kanton Bern – von der Innenstadt bis Thun, Burgdorf und Langenthal.',
    extraFR: 'Nous desservons tout le canton de Berne – du centre-ville à Thoune, Berthoud et Langenthal.' },
  { key: 'umzugZurich', en: 'Zürich', de: 'Zürich', fr: 'Zurich',
    extraEN: 'We coordinate long-distance relocations between Seeland and the greater Zurich area, including Winterthur, Baden, and Aarau.',
    extraDE: 'Wir koordinieren Fernumzüge zwischen dem Seeland und dem Grossraum Zürich, inkl. Winterthur, Baden und Aarau.',
    extraFR: 'Nous coordonnons les déménagements longue distance entre le Seeland et la grande région de Zurich, y compris Winterthour, Baden et Aarau.' },
  { key: 'umzugSolothurn', en: 'Solothurn', de: 'Solothurn', fr: 'Soleure',
    extraEN: 'As a neighboring region to our base in Biel, we offer fast deployment times in Solothurn, Olten, and Grenchen.',
    extraDE: 'Als Nachbarregion unseres Standorts in Biel bieten wir schnelle Einsatzzeiten in Solothurn, Olten und Grenchen.',
    extraFR: 'En tant que région voisine de notre base à Bienne, nous offrons des délais rapides à Soleure, Olten et Granges.' },
  { key: 'umzugNeuchatel', en: 'Neuchâtel', de: 'Neuenburg', fr: 'Neuchâtel',
    extraEN: 'We serve Neuchâtel, La Chaux-de-Fonds, and Le Locle with bilingual service in French and German.',
    extraDE: 'Wir bedienen Neuenburg, La Chaux-de-Fonds und Le Locle mit zweisprachigem Service in Französisch und Deutsch.',
    extraFR: 'Nous desservons Neuchâtel, La Chaux-de-Fonds et Le Locle avec un service bilingue en français et en allemand.' },
  { key: 'umzugFribourg', en: 'Fribourg', de: 'Freiburg', fr: 'Fribourg',
    extraEN: 'We provide complete services in Fribourg city, Bulle, and Murten with bilingual French and German teams.',
    extraDE: 'Wir bieten komplette Dienstleistungen in der Stadt Freiburg, Bulle und Murten mit zweisprachigen Teams.',
    extraFR: 'Nous offrons des services complets à Fribourg ville, Bulle et Morat avec des équipes bilingues.' },
  { key: 'umzugBasel', en: 'Basel', de: 'Basel', fr: 'Bâle',
    extraEN: 'We handle relocations in Basel-Stadt and Basel-Landschaft, including cross-border moves to Germany and France.',
    extraDE: 'Wir übernehmen Umzüge in Basel-Stadt und Basel-Landschaft, inkl. grenzüberschreitende Umzüge nach Deutschland und Frankreich.',
    extraFR: 'Nous gérons les déménagements à Bâle-Ville et Bâle-Campagne, y compris les déménagements transfrontaliers.' },
  { key: 'umzugSchweiz', en: 'Switzerland', de: 'Schweiz', fr: 'Suisse',
    extraEN: 'From Biel to Geneva, Lugano to St. Gallen — we coordinate relocations nationwide across Switzerland.',
    extraDE: 'Von Biel bis Genf, Lugano bis St. Gallen — wir koordinieren Umzüge landesweit in der ganzen Schweiz.',
    extraFR: 'De Bienne à Genève, Lugano à Saint-Gall — nous coordonnons les déménagements dans toute la Suisse.' }
];

// Load and update all 3 language files
['en', 'de', 'fr'].forEach(lang => {
  const filePath = path.join(__dirname, `messages/${lang}.json`);
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  regions.forEach(r => {
    const cityEN = r.en, cityDE = r.de, cityFR = r.fr;
    const data = makePageData(cityEN, cityDE, cityFR, '', '', '', r.extraEN, r.extraDE, r.extraFR);
    json.seoPages[r.key] = data[lang];
  });
  
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`✅ Updated ${lang}.json with ${regions.length} new region pages`);
});

console.log('\nDone! All translations added.');
