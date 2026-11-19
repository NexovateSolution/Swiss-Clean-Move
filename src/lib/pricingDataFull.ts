/**
 * SWISSCLEANMOVE — COMPREHENSIVE MULTILINGUAL PRICING DATA (11 SERVICES)
 * Source of truth: SwissCleanMove_Preisliste_Neues_Design.pdf
 * Complete translations for DE, EN, FR, IT.
 */

export type SupportedLocale = 'de' | 'en' | 'fr' | 'it';

export interface PriceRow {
  name: Record<SupportedLocale, string>;
  price: string;
}

export interface ServiceCategory {
  id: string;
  number: string;
  serviceQuery: string;
  pillar: 'cleaning' | 'moving' | 'commercial' | 'facility';
  icon: string;
  title: Record<SupportedLocale, string>;
  subtitle: Record<SupportedLocale, string>;
  headerCol1: Record<SupportedLocale, string>;
  headerCol2: Record<SupportedLocale, string>;
  items: PriceRow[];
  note: Record<SupportedLocale, string>;
  quickPrice: string;
}

export const ALL_PRICING_CATEGORIES: ServiceCategory[] = [
  // ── 01 UMZUGSREINIGUNG ──
  {
    id: '01-umzugsreinigung',
    number: '01',
    serviceQuery: 'move-out-cleaning',
    pillar: 'cleaning',
    icon: 'Sparkles',
    title: {
      de: 'Umzugsreinigung & Endreinigung mit Abnahmegarantie',
      en: 'Move-out & Final Cleaning with Acceptance Guarantee',
      fr: 'Nettoyage de fin de bail avec garantie de remise',
      it: 'Pulizia di fine locazione con garanzia di consegna',
    },
    subtitle: {
      de: 'Wohnungsübergabe ohne Stress – inklusive 100% Abnahmegarantie & persönlicher Übergabebegleitung.',
      en: 'Stress-free apartment handover – 100% acceptance guarantee & presence at handover included.',
      fr: 'État des lieux sans souci – garantie de remise 100% et présence sur place incluses.',
      it: 'Riconsegna dell’appartamento senza stress – garanzia di consegna al 100% e presenza incluse.',
    },
    headerCol1: {
      de: 'WOHNUNGSGRÖSSE',
      en: 'APARTMENT SIZE',
      fr: 'TAILLE DU LOGEMENT',
      it: 'DIMENSIONE APPARTAMENTO',
    },
    headerCol2: {
      de: 'PREIS AB',
      en: 'PRICE FROM',
      fr: 'PRIX DÈS',
      it: 'PREZZO DA',
    },
    quickPrice: 'ab CHF 450.–',
    items: [
      {
        name: {
          de: 'Studio / 1 Zimmer',
          en: 'Studio / 1 room',
          fr: 'Studio / 1 pièce',
          it: 'Monolocale / 1 locale',
        },
        price: 'CHF 450.–',
      },
      {
        name: {
          de: '1.5 Zimmer',
          en: '1.5 rooms',
          fr: '1.5 pièce',
          it: '1.5 locali',
        },
        price: 'CHF 550.–',
      },
      {
        name: {
          de: '2.5 Zimmer',
          en: '2.5 rooms',
          fr: '2.5 pièces',
          it: '2.5 locali',
        },
        price: 'CHF 650.–',
      },
      {
        name: {
          de: '3.5 Zimmer',
          en: '3.5 rooms',
          fr: '3.5 pièces',
          it: '3.5 locali',
        },
        price: 'CHF 850.–',
      },
      {
        name: {
          de: '4.5 Zimmer',
          en: '4.5 rooms',
          fr: '4.5 pièces',
          it: '4.5 locali',
        },
        price: 'CHF 1’050.–',
      },
      {
        name: {
          de: '5.5 Zimmer',
          en: '5.5 rooms',
          fr: '5.5 pièces',
          it: '5.5 locali',
        },
        price: 'CHF 1’250.–',
      },
      {
        name: {
          de: 'Einfamilienhaus',
          en: 'Detached single-family house',
          fr: 'Maison individuelle / Villa',
          it: 'Casa unifamiliare / Villa',
        },
        price: 'CHF 1’490.–',
      },
    ],
    note: {
      de: 'Leistungen: Küche, Bad, Sanitäranlagen, Böden, Oberflächen, Fenster und Storen im vereinbarten Umfang. Abnahmegarantie: kostenlose Nachreinigung bei berechtigten Beanstandungen innerhalb der vereinbarten Leistungen.',
      en: 'Included: Kitchen, bathroom, sanitary facilities, floors, surfaces, windows, and blinds as agreed. Acceptance guarantee: free touch-up cleaning for any justified objections within the agreed scope.',
      fr: 'Prestations : Cuisine, salle de bain, sanitaires, sols, surfaces, vitres et stores selon convention. Garantie de remise : retouche gratuite immédiate en cas de remarque de la gérance.',
      it: 'Prestazioni: Cucina, bagno, sanitari, pavimenti, superfici, finestre e rolladen concordati. Garanzia di consegna: pulizia correttiva gratuita per eventuali contestazioni.',
    },
  },

  // ── 02 HAUSHALTSREINIGUNG ──
  {
    id: '02-haushaltsreinigung',
    number: '02',
    serviceQuery: 'household-helping',
    pillar: 'cleaning',
    icon: 'Home',
    title: {
      de: 'Putzfrau & regelmässige Haushaltsreinigung',
      en: 'Housekeeper & Regular Domestic Cleaning',
      fr: 'Femme de ménage & entretien régulier du domicile',
      it: 'Colf & pulizia domestica regolare',
    },
    subtitle: {
      de: 'Zuverlässige, diskrete und vertrauenswürdige Unterstützung für Privathaushalte.',
      en: 'Reliable, discreet, and trustworthy assistance for private households.',
      fr: 'Aide ménagère fiable, discrète et déclarée pour votre foyer.',
      it: 'Assistenza affidabile, discreta e professionale per la casa.',
    },
    headerCol1: {
      de: 'DIENSTLEISTUNG / UMFANG',
      en: 'SERVICE / SCOPE',
      fr: 'PRESTATION / FRÉQUENCE',
      it: 'SERVIZIO / FREQUENZA',
    },
    headerCol2: {
      de: 'PREIS AB',
      en: 'PRICE FROM',
      fr: 'PRIX DÈS',
      it: 'PREZZO DA',
    },
    quickPrice: 'ab CHF 42.–/Std.',
    items: [
      {
        name: {
          de: 'Wöchentliche Reinigung',
          en: 'Weekly cleaning',
          fr: 'Ménage hebdomadaire',
          it: 'Pulizia settimanale',
        },
        price: 'CHF 42.–/Std.',
      },
      {
        name: {
          de: 'Reinigung alle zwei Wochen',
          en: 'Bi-weekly cleaning (every 2 weeks)',
          fr: 'Ménage toutes les deux semaines',
          it: 'Pulizia quindicinale (ogni 2 settimane)',
        },
        price: 'CHF 45.–/Std.',
      },
      {
        name: {
          de: 'Einmalige Haushaltsreinigung',
          en: 'One-time domestic cleaning',
          fr: 'Ménage ponctuel à domicile',
          it: 'Pulizia domestica una tantum',
        },
        price: 'CHF 48.–/Std.',
      },
      {
        name: {
          de: 'Grundreinigung',
          en: 'Deep / Spring cleaning',
          fr: 'Grand nettoyage de fond',
          it: 'Pulizia di fondo / pulizie di primavera',
        },
        price: 'CHF 55.–/Std.',
      },
      {
        name: {
          de: 'Mindestauftragswert',
          en: 'Minimum order value',
          fr: 'Montant minimum par intervention',
          it: 'Ordine minimo per intervento',
        },
        price: 'CHF 120.–',
      },
    ],
    note: {
      de: 'Leistungen: Staubsaugen, Böden, Badezimmer, Küche, Staubwischen und Haushaltsreinigung nach Absprache. Alle Reinigungskräfte sind legal angemeldet und unfall- sowie haftpflichtversichert.',
      en: 'Included: Vacuuming, floors, bathroom, kitchen, dusting, and general domestic chores as agreed. All staff are legally registered and fully insured.',
      fr: 'Prestations : Aspiration, sols, salle de bain, cuisine, dépoussiérage et ménage selon accord. Personnel déclaré et assuré.',
      it: 'Prestazioni: Aspirapolvere, pavimenti, bagno, cucina, spolvero e pulizie secondo accordi. Personale in regola e assicurato.',
    },
  },

  // ── 03 BÜROREINIGUNG ──
  {
    id: '03-bueroreinigung',
    number: '03',
    serviceQuery: 'office-cleaning',
    pillar: 'commercial',
    icon: 'Briefcase',
    title: {
      de: 'Büro-, Praxis- & Gewerbereinigung',
      en: 'Office, Medical Practice & Commercial Cleaning',
      fr: 'Nettoyage de bureaux, cabinets médicaux & commerces',
      it: 'Pulizia uffici, studi medici & spazi commerciali',
    },
    subtitle: {
      de: 'Repräsentative Sauberkeit und Hygiene für Unternehmen, Praxen und Liegenschaften.',
      en: 'Professional cleanliness and hygiene for businesses, medical clinics, and properties.',
      fr: 'Propreté soignée et normes d’hygiène pour entreprises, cabinets et locaux.',
      it: 'Igiene impeccabile per aziende, studi medici e locali commerciali.',
    },
    headerCol1: {
      de: 'DIENSTLEISTUNG / UMFANG',
      en: 'SERVICE / SCOPE',
      fr: 'PRESTATION / TYPE',
      it: 'SERVIZIO / TIPOLOGIA',
    },
    headerCol2: {
      de: 'PREIS AB',
      en: 'PRICE FROM',
      fr: 'PRIX DÈS',
      it: 'PREZZO DA',
    },
    quickPrice: 'ab CHF 45.–/Std.',
    items: [
      {
        name: {
          de: 'Regelmässige Büroreinigung',
          en: 'Regular office cleaning',
          fr: 'Nettoyage régulier de bureaux',
          it: 'Pulizia regolare uffici',
        },
        price: 'CHF 45.–/Std.',
      },
      {
        name: {
          de: 'Praxisreinigung',
          en: 'Medical practice cleaning (enhanced hygiene)',
          fr: 'Cabinets médicaux & dentaires',
          it: 'Pulizia studi medici e ambulatori',
        },
        price: 'CHF 50.–/Std.',
      },
      {
        name: {
          de: 'Gewerbereinigung',
          en: 'Commercial & retail premises',
          fr: 'Locaux commerciaux et magasins',
          it: 'Locali commerciali e negozi',
        },
        price: 'CHF 48.–/Std.',
      },
      {
        name: {
          de: 'Treppenhausreinigung',
          en: 'Stairwell cleaning (commercial / residential)',
          fr: 'Cages d’escaliers (bureaux / copropriétés)',
          it: 'Pulizia vano scale',
        },
        price: 'CHF 45.–/Std.',
      },
      {
        name: {
          de: 'Intensive Grundreinigung',
          en: 'Intensive commercial deep cleaning',
          fr: 'Grand nettoyage approfondi',
          it: 'Pulizia di fondo intensiva',
        },
        price: 'CHF 60.–/Std.',
      },
    ],
    note: {
      de: 'Für grössere Objekte und laufende Reinigungsverträge erstellen wir individuelle Offerten mit Pauschalpreisen. Flexible Einsatzzeiten vor oder nach Geschäftszeiten.',
      en: 'For larger facilities and ongoing cleaning contracts, we provide tailored fixed-rate quotes. Flexible hours outside business operation.',
      fr: 'Offres forfaitaires sur mesure pour grands volumes et contrats d’entretien. Horaires adaptés à votre activité.',
      it: 'Preventivi a forfait per grandi strutture e contratti continuativi. Orari flessibili prima o dopo l’apertura.',
    },
  },

  // ── 04 FENSTERREINIGUNG ──
  {
    id: '04-fensterreinigung',
    number: '04',
    serviceQuery: 'window-cleaning',
    pillar: 'cleaning',
    icon: 'Maximize',
    title: {
      de: 'Fenster- & Glasreinigung',
      en: 'Window & Glass Cleaning',
      fr: 'Nettoyage de vitres & surfaces vitrées',
      it: 'Pulizia vetri e vetrate',
    },
    subtitle: {
      de: 'Streifenfreier Glanz für Fenster, Schaufenster, Wintergärten und Glasfassaden.',
      en: 'Streak-free clarity for windows, shopfronts, conservatories, and glass facades.',
      fr: 'Transparence parfaite sans traces pour fenêtres, vitrines, vérandas et verrières.',
      it: 'Brillantezza senza aloni per finestre, vetrine, verande e facciate continue.',
    },
    headerCol1: {
      de: 'DIENSTLEISTUNG / UMFANG',
      en: 'SERVICE / SCOPE',
      fr: 'PRESTATION / FORMAT',
      it: 'SERVIZIO / FORMATO',
    },
    headerCol2: {
      de: 'PREIS AB',
      en: 'PRICE FROM',
      fr: 'PRIX DÈS',
      it: 'PREZZO DA',
    },
    quickPrice: 'ab CHF 15.–',
    items: [
      {
        name: {
          de: 'Kleines Fenster, beidseitig',
          en: 'Small window, both sides',
          fr: 'Petite fenêtre, 2 faces',
          it: 'Finestra piccola, entrambi i lati',
        },
        price: 'CHF 15.–',
      },
      {
        name: {
          de: 'Standardfenster, beidseitig',
          en: 'Standard window, both sides (incl. frames)',
          fr: 'Fenêtre standard, 2 faces (cadres inclus)',
          it: 'Finestra standard, 2 lati (telaio incl.)',
        },
        price: 'CHF 20.–',
      },
      {
        name: {
          de: 'Grosses Fenster',
          en: 'Large window / Sliding sash',
          fr: 'Grande fenêtre / Baie vitrée',
          it: 'Finestra grande / scorrevole',
        },
        price: 'CHF 30.–',
      },
      {
        name: {
          de: 'Balkontür / Glastür',
          en: 'Balcony / Glass door',
          fr: 'Porte-fenêtre / Porte vitrée',
          it: 'Portafinestra / Porta a vetri',
        },
        price: 'CHF 35.–',
      },
      {
        name: {
          de: 'Schaufenster',
          en: 'Shopfront window (per linear meter / agreed)',
          fr: 'Vitrines de magasin',
          it: 'Vetrine commerciali',
        },
        price: 'CHF 45.–',
      },
      {
        name: {
          de: 'Glasfassaden',
          en: 'Glass facades & high-reach surfaces',
          fr: 'Façades vitrées & accès difficile',
          it: 'Facciate continue in vetro',
        },
        price: 'Auf Anfrage',
      },
      {
        name: {
          de: 'Storenreinigung',
          en: 'Blinds / Shutters cleaning',
          fr: 'Nettoyage des stores et volets',
          it: 'Pulizia lamelle e persiane',
        },
        price: 'Nach Aufwand',
      },
    ],
    note: {
      de: 'Einzelpreise, soweit angegeben. Abhängig von Grösse, Zugänglichkeit und Verschmutzung. Inklusive Reinigung von Rahmen und Fensterbänken.',
      en: 'Unit prices where listed. Depending on dimensions, accessibility, and dirt level. Includes frames and sills.',
      fr: 'Tarifs unitaires indiqués. Selon dimensions, accès et salissure. Cadres et rebords inclus.',
      it: 'Prezzi unitari indicati. In base a dimensioni, accesso e sporco. Telai e davanzali inclusi.',
    },
  },

  // ── 05 BAUREINIGUNG ──
  {
    id: '05-baureinigung',
    number: '05',
    serviceQuery: 'construction-cleaning',
    pillar: 'commercial',
    icon: 'HardHat',
    title: {
      de: 'Bau- & Spezialreinigung',
      en: 'Post-Construction & Deep Cleaning',
      fr: 'Nettoyage de chantier & fin de travaux',
      it: 'Pulizia post-cantiere e di fondo',
    },
    subtitle: {
      de: 'Gründliche Reinigung nach Neu-, Umbau- oder Renovationsarbeiten.',
      en: 'Thorough cleaning following new builds, remodels, or renovations.',
      fr: 'Remise en état impeccable après construction, rénovation ou travaux.',
      it: 'Pulizia approfondita al termine di nuove costruzioni o ristrutturazioni.',
    },
    headerCol1: {
      de: 'DIENSTLEISTUNG / UMFANG',
      en: 'SERVICE / SCOPE',
      fr: 'PRESTATION / SURFACE',
      it: 'SERVIZIO / AMBITO',
    },
    headerCol2: {
      de: 'PREIS AB',
      en: 'PRICE FROM',
      fr: 'PRIX DÈS',
      it: 'PREZZO DA',
    },
    quickPrice: 'ab CHF 8.–/m²',
    items: [
      {
        name: {
          de: 'Baureinigung',
          en: 'Rough construction cleaning (during works)',
          fr: 'Nettoyage en cours de chantier (gros œuvre)',
          it: 'Pulizia grezza di cantiere',
        },
        price: 'CHF 8.–/m²',
      },
      {
        name: {
          de: 'Bauendreinigung',
          en: 'Final move-in ready handover clean',
          fr: 'Nettoyage fin de chantier (prêt à emménager)',
          it: 'Pulizia finale di fine cantiere (consegna)',
        },
        price: 'CHF 12.–/m²',
      },
      {
        name: {
          de: 'Grundreinigung',
          en: 'Intensive deep clean by hour',
          fr: 'Nettoyage approfondi horaire',
          it: 'Pulizia intensiva a ore',
        },
        price: 'CHF 55.–/Std.',
      },
      {
        name: {
          de: 'Teppichreinigung',
          en: 'Carpet deep cleaning (spray extraction)',
          fr: 'Nettoyage moquette et tapis',
          it: 'Lavaggio moquette e tappeti',
        },
        price: 'CHF 12.–/m²',
      },
      {
        name: {
          de: 'Garagenreinigung',
          en: 'Garage & parking area clean',
          fr: 'Nettoyage de garage',
          it: 'Pulizia garage e box',
        },
        price: 'CHF 100.–',
      },
      {
        name: {
          de: 'Kellerreinigung',
          en: 'Basement & cellar clearance/clean',
          fr: 'Nettoyage de cave',
          it: 'Pulizia cantina',
        },
        price: 'CHF 80.–',
      },
      {
        name: {
          de: 'Spezialreinigung',
          en: 'Specialized remediation / restoration',
          fr: 'Nettoyage spécialisé (sinistres, etc.)',
          it: 'Pulizie speciali (danni da acqua, ecc.)',
        },
        price: 'Auf Anfrage',
      },
    ],
    note: {
      de: 'Der Preis richtet sich nach Fläche, Zustand und vereinbartem Arbeitsumfang. Kostenlose Besichtigung vor Ort für eine verbindliche Offerte.',
      en: 'Pricing depends on floor area, condition, and agreed workload. Free on-site inspection for binding fixed quotation.',
      fr: 'Tarifs selon surface, état initial et cahier des charges. Visite gratuite pour devis forfaitaire.',
      it: 'Prezzo calcolato su metratura, condizioni e lavoro richiesto. Sopralluogo gratuito per preventivo vincolante.',
    },
  },

  // ── 06 UMZUG & TRANSPORT ──
  {
    id: '06-umzug-transport',
    number: '06',
    serviceQuery: 'relocation',
    pillar: 'moving',
    icon: 'Truck',
    title: {
      de: 'Umzug & Transport',
      en: 'Moving & Transport',
      fr: 'Déménagement & transport',
      it: 'Traslochi & trasporti',
    },
    subtitle: {
      de: 'Professioneller Umzugsservice – zuverlässig, versichert und pünktlich.',
      en: 'Professional moving services – fully insured, careful, and punctual.',
      fr: 'Déménagements soignés pour particuliers et entreprises – assurés et ponctuels.',
      it: 'Servizi di trasloco professionali – assicurati, precisi e puntuali.',
    },
    headerCol1: {
      de: 'WOHNUNGSGRÖSSE',
      en: 'APARTMENT SIZE',
      fr: 'TAILLE DU LOGEMENT',
      it: 'DIMENSIONE APPARTAMENTO',
    },
    headerCol2: {
      de: 'PREIS AB',
      en: 'PRICE FROM',
      fr: 'PRIX DÈS',
      it: 'PREZZO DA',
    },
    quickPrice: 'ab CHF 490.–',
    items: [
      {
        name: {
          de: '1–1.5 Zimmer',
          en: '1–1.5 rooms (2 movers + van)',
          fr: '1–1.5 pièce (2 déménageurs + véhicule)',
          it: '1–1.5 locali (2 traslocatori + furgone)',
        },
        price: 'CHF 490.–',
      },
      {
        name: {
          de: '2–2.5 Zimmer',
          en: '2–2.5 rooms (2-3 movers + van)',
          fr: '2–2.5 pièces (2-3 déménageurs + véhicule)',
          it: '2–2.5 locali (2-3 traslocatori + furgone)',
        },
        price: 'CHF 790.–',
      },
      {
        name: {
          de: '3–3.5 Zimmer',
          en: '3–3.5 rooms (3 movers + van/truck)',
          fr: '3–3.5 pièces (3 déménageurs + camionnette/camion)',
          it: '3–3.5 locali (3 traslocatori + mezzo)',
        },
        price: 'CHF 1’090.–',
      },
      {
        name: {
          de: '4–4.5 Zimmer',
          en: '4–4.5 rooms (3-4 movers + truck)',
          fr: '4–4.5 pièces (3-4 déménageurs + camion)',
          it: '4–4.5 locali (3-4 traslocatori + camion)',
        },
        price: 'CHF 1’490.–',
      },
      {
        name: {
          de: '5–5.5 Zimmer',
          en: '5–5.5 rooms (4 movers + truck)',
          fr: '5–5.5 pièces (4 déménageurs + camion)',
          it: '5–5.5 locali (4 traslocatori + camion)',
        },
        price: 'CHF 1’890.–',
      },
      {
        name: {
          de: 'Einfamilienhaus',
          en: 'Detached house / Villa',
          fr: 'Maison individuelle / Villa',
          it: 'Casa unifamiliare / Villa',
        },
        price: 'Auf Anfrage',
      },
    ],
    note: {
      de: 'Richtpreise für lokale Umzüge bei normalen Zugängen: Fahrzeug, Personal, Be- und Entladen gemäss Offerte. Möbelmontage, Verpackung und längere Strecken separat. Kombi-Rabatt bei gleichzeitiger Endreinigung: -10%!',
      en: 'Reference prices for local moves with standard access: vehicle, team, loading & unloading as quoted. Assembly, packing, and long distances separate. Combined package deal with cleaning: -10% discount!',
      fr: 'Prix indicatifs pour transferts locaux avec accès normal : véhicule, équipe, chargement et déchargement. Montage et longues distances en sus. Remise combinée avec nettoyage : -10% !',
      it: 'Prezzi indicativi per traslochi locali con accesso standard: mezzo, squadra, carico e scarico. Montaggio e lunghe distanze a parte. Sconto combinato con pulizie: -10% !',
    },
  },

  // ── 07 ENTSORGUNG ──
  {
    id: '07-entsorgung',
    number: '07',
    serviceQuery: 'disposal',
    pillar: 'moving',
    icon: 'Trash2',
    title: {
      de: 'Entsorgung & Räumung',
      en: 'Disposal & Clearance',
      fr: 'Débarras & évacuation',
      it: 'Sgombero & smaltimento',
    },
    subtitle: {
      de: 'Fachgerechtes Recycling und besenreine Räumung von Möbeln, Hausrat und Sperrgut.',
      en: 'Professional recycling and broom-clean clearance of bulky goods, furniture, and rooms.',
      fr: 'Évacuation conforme et débarras balayé propre d’encombrants, caves et logements.',
      it: 'Smaltimento ecologico e sgombero pulito a scopa di arredi e cantine.',
    },
    headerCol1: {
      de: 'DIENSTLEISTUNG / UMFANG',
      en: 'SERVICE / SCOPE',
      fr: 'PRESTATION / VOLUME',
      it: 'SERVIZIO / VOLUME',
    },
    headerCol2: {
      de: 'PREIS AB',
      en: 'PRICE FROM',
      fr: 'PRIX DÈS',
      it: 'PREZZO DA',
    },
    quickPrice: 'ab CHF 180.–',
    items: [
      {
        name: {
          de: '1–2 m³ Sperrgut',
          en: '1–2 m³ bulky items',
          fr: '1–2 m³ encombrants',
          it: '1–2 m³ ingombranti',
        },
        price: 'CHF 180.–',
      },
      {
        name: {
          de: '3–5 m³',
          en: '3–5 m³',
          fr: '3–5 m³',
          it: '3–5 m³',
        },
        price: 'CHF 390.–',
      },
      {
        name: {
          de: '6–10 m³',
          en: '6–10 m³',
          fr: '6–10 m³',
          it: '6–10 m³',
        },
        price: 'CHF 790.–',
      },
      {
        name: {
          de: '11–20 m³',
          en: '11–20 m³',
          fr: '11–20 m³',
          it: '11–20 m³',
        },
        price: 'CHF 1’490.–',
      },
      {
        name: {
          de: 'Wohnungsräumung',
          en: 'Complete apartment clearance (broom-clean)',
          fr: 'Débarras complet de logement',
          it: 'Sgombero completo appartamento',
        },
        price: 'Auf Anfrage',
      },
      {
        name: {
          de: 'Kellerräumung',
          en: 'Cellar / attic clearance',
          fr: 'Débarras de cave / grenier',
          it: 'Sgombero cantina / solaio',
        },
        price: 'CHF 180.–',
      },
      {
        name: {
          de: 'Büro- oder Geschäftsauflösung',
          en: 'Office / commercial clearance',
          fr: 'Débarras professionnel de bureaux',
          it: 'Sgombero uffici o attività commerciali',
        },
        price: 'Auf Anfrage',
      },
    ],
    note: {
      de: 'Transport und Entsorgung je nach Materialart und Aufwand. Offizielle Werkhofgebühren sind inbegriffen. Sonderabfälle separat auf Anfrage.',
      en: 'Transport and disposal depending on material composition and effort. Official municipal depot fees are included. Special hazardous waste separate on request.',
      fr: 'Transport et déchetterie selon nature des matières. Taxes officielles de déchetterie incluses. Déchets spéciaux sur devis.',
      it: 'Trasporto e smaltimento in base ai materiali. Tasse ufficiali di discarica incluse. Rifiuti speciali separati su richiesta.',
    },
  },

  // ── 08 HAUSWARTUNG ──
  {
    id: '08-hauswartung',
    number: '08',
    serviceQuery: 'building-maintenance',
    pillar: 'facility',
    icon: 'Building',
    title: {
      de: 'Hauswartung & Gebäudeunterhalt',
      en: 'Caretaking & Building Maintenance',
      fr: 'Conciergerie & entretien d\'immeuble',
      it: 'Custodia & manutenzione stabili',
    },
    subtitle: {
      de: 'Zuverlässige Betreuung Ihrer Liegenschaft – von der Pflege bis zum Winterdienst.',
      en: 'Reliable property maintenance – from stairwells to grounds care and snow clearing.',
      fr: 'Gestion soignée de vos biens immobiliers – de l’entretien courant au déneigement.',
      it: 'Cura affidabile del vostro immobile – dalle scale alla manutenzione e sgombero neve.',
    },
    headerCol1: {
      de: 'DIENSTLEISTUNG / UMFANG',
      en: 'SERVICE / SCOPE',
      fr: 'PRESTATION / FORFAIT',
      it: 'SERVIZIO / FORFAIT',
    },
    headerCol2: {
      de: 'PREIS AB',
      en: 'PRICE FROM',
      fr: 'PRIX DÈS',
      it: 'PREZZO DA',
    },
    quickPrice: 'ab CHF 65.–/Std.',
    items: [
      {
        name: {
          de: 'Hauswartung nach Stunden',
          en: 'Caretaker service by hour',
          fr: 'Conciergerie au tarif horaire',
          it: 'Custodia / manutenzione a ore',
        },
        price: 'CHF 65.–/Std.',
      },
      {
        name: {
          de: 'Treppenhausreinigung',
          en: 'Stairwell cleaning (weekly / bi-weekly)',
          fr: 'Nettoyage des cages d’escaliers',
          it: 'Pulizia vano scale',
        },
        price: 'CHF 45.–/Std.',
      },
      {
        name: {
          de: 'Gebäudeunterhalt',
          en: 'Technical building maintenance & small repairs',
          fr: 'Entretien technique & réparations courantes',
          it: 'Manutenzione stabile & piccole riparazioni',
        },
        price: 'CHF 70.–/Std.',
      },
      {
        name: {
          de: 'Aussenreinigung',
          en: 'Outdoor areas & basic grounds upkeep',
          fr: 'Nettoyage des abords & espaces extérieurs',
          it: 'Pulizia aree esterne & cura del verde',
        },
        price: 'CHF 65.–/Std.',
      },
      {
        name: {
          de: 'Winterdienst',
          en: 'Winter service (snow removal & salting)',
          fr: 'Service hivernal (déneigement & salage)',
          it: 'Servizio invernale (sgombero neve e sale)',
        },
        price: 'CHF 75.–/Std.',
      },
      {
        name: {
          de: 'Kleine Liegenschaft',
          en: 'Small property monthly flat rate (up to 6 units)',
          fr: 'Petit immeuble (forfait mensuel jusqu’à 6 lots)',
          it: 'Piccolo condominio (forfait mensile fino a 6 unità)',
        },
        price: 'CHF 450.–/Monat',
      },
      {
        name: {
          de: 'Mittlere Liegenschaft',
          en: 'Medium property monthly flat rate (7–15 units)',
          fr: 'Immeuble moyen (forfait mensuel 7–15 lots)',
          it: 'Medio condominio (forfait mensile 7–15 unità)',
        },
        price: 'CHF 750.–/Monat',
      },
      {
        name: {
          de: 'Grössere Liegenschaft',
          en: 'Large property (> 15 units)',
          fr: 'Grand ensemble (> 15 lots)',
          it: 'Grande condominio (> 15 unità)',
        },
        price: 'Auf Anfrage',
      },
    ],
    note: {
      de: 'Pauschalen hängen von Objektgrösse, Häufigkeit und vereinbartem Pflichtenheft ab. 24h-Pikettdienst auf Anfrage.',
      en: 'Flat rates depend on building dimensions, frequency, and custom checklist. 24/7 on-call service available on request.',
      fr: 'Forfaits fixés selon taille de l’immeuble, fréquence et cahier des charges. Piquet d’urgence sur demande.',
      it: 'Forfait calcolati su dimensioni, frequenza e mansioni concordate. Servizio di picchetto 24h su richiesta.',
    },
  },

  // ── 09 GASTRONOMIE ──
  {
    id: '09-gastronomie',
    number: '09',
    serviceQuery: 'gastronomy-cleaning',
    pillar: 'commercial',
    icon: 'Utensils',
    title: {
      de: 'Gastronomie- & Restaurantreinigung',
      en: 'Gastronomy & Restaurant Cleaning',
      fr: 'Nettoyage pour restaurants & gastronomie',
      it: 'Pulizia ristorazione & gastronomia',
    },
    subtitle: {
      de: 'Höchste Hygiene gemäss HACCP-Standards für Restaurants, Grossküchen und Bars.',
      en: 'Highest hygiene standards compliant with HACCP for restaurants, commercial kitchens, and bars.',
      fr: 'Hygiène certifiée conforme aux normes HACCP pour restaurants, cuisines et bars.',
      it: 'Igiene conforme alle norme HACCP per ristoranti, cucine professionali e locali.',
    },
    headerCol1: {
      de: 'DIENSTLEISTUNG / UMFANG',
      en: 'SERVICE / SCOPE',
      fr: 'PRESTATION / ZONE',
      it: 'SERVIZIO / ZONA',
    },
    headerCol2: {
      de: 'PREIS AB',
      en: 'PRICE FROM',
      fr: 'PRIX DÈS',
      it: 'PREZZO DA',
    },
    quickPrice: 'ab CHF 50.–/Std.',
    items: [
      {
        name: {
          de: 'Regelmässige Gastronomiereinigung',
          en: 'Regular gastronomy cleaning',
          fr: 'Entretien régulier pour la restauration',
          it: 'Pulizia continuativa per la ristorazione',
        },
        price: 'CHF 55.–/Std.',
      },
      {
        name: {
          de: 'Restaurant & Gastraum',
          en: 'Dining room & guest areas',
          fr: 'Salle de restaurant et espaces convives',
          it: 'Sala ristorante e spazi clienti',
        },
        price: 'CHF 50.–/Std.',
      },
      {
        name: {
          de: 'Gastroküche, Oberflächen & Böden',
          en: 'Kitchen surfaces & heavy flooring',
          fr: 'Cuisine professionnelle, plans et sols',
          it: 'Cucina professionale, piani lavoro e pavimenti',
        },
        price: 'CHF 65.–/Std.',
      },
      {
        name: {
          de: 'Intensive Küchen-Grundreinigung',
          en: 'Deep kitchen degreasing & descaling',
          fr: 'Grand dégraissage intensif de cuisine',
          it: 'Sgrassaggio profondo cucina professionale',
        },
        price: 'CHF 70.–/Std.',
      },
      {
        name: {
          de: 'Bar-, Theken- & Buffetbereiche',
          en: 'Bar, counter, and buffet counters',
          fr: 'Bar, comptoirs et buffets',
          it: 'Aree bar, banconi e buffet',
        },
        price: 'CHF 55.–/Std.',
      },
      {
        name: {
          de: 'Sanitär- & Personalräume',
          en: 'Restrooms & staff quarters',
          fr: 'Sanitaires et vestiaires du personnel',
          it: 'Servizi igienici e spogliatoi personale',
        },
        price: 'CHF 50.–/Std.',
      },
      {
        name: {
          de: 'Zugängliche Fettfilter / Abzugshauben',
          en: 'Accessible grease filters & hoods',
          fr: 'Filtres à graisse et hottes d’aspiration',
          it: 'Filtri antigrasso e cappe aspiranti',
        },
        price: 'CHF 90.–/Einsatz',
      },
      {
        name: {
          de: 'Reinigung nach Veranstaltungen',
          en: 'Post-event & banquet clean',
          fr: 'Nettoyage après banquets et soirées',
          it: 'Pulizia post-eventi e banchetti',
        },
        price: 'CHF 60.–/Std.',
      },
    ],
    note: {
      de: 'Für Restaurants, Cafés, Bars und Take-aways. Reinigung gemäss vereinbartem Hygieneplan; Lüftungskanalreinigung nicht enthalten. Nacht- und Frühschichten ohne Aufpreis.',
      en: 'For restaurants, cafés, bars, and takeaways. Cleaning following agreed HACCP plan; air duct cleaning excluded. Night and early morning shifts with zero surcharge.',
      fr: 'Pour restaurants, cafés, bars et take-aways. Selon plan HACCP ; gaines non incluses. Interventions nocturnes sans surcoût.',
      it: 'Per ristoranti, bar e locali. Secondo piano HACCP; condotti esclusi. Turni notturni o mattutini senza supplemento.',
    },
  },

  // ── 10 WEITERE REINIGUNGSSERVICES ──
  {
    id: '10-weitere-services',
    number: '10',
    serviceQuery: 'special-cleaning',
    pillar: 'cleaning',
    icon: 'Layers',
    title: {
      de: 'Weitere Reinigungs- & Pflegeservices',
      en: 'Additional Cleaning & Care Services',
      fr: 'Autres services de nettoyage spécialisé',
      it: 'Ulteriori servizi di pulizia e cura',
    },
    subtitle: {
      de: 'Gezielte Einzelleistungen für Privathaushalte, Liegenschaften und Firmen.',
      en: 'Targeted standalone services for private homes, offices, and residential properties.',
      fr: 'Prestations ciblées pour particuliers, résidences et entreprises.',
      it: 'Interventi mirati per privati, condomini e aziende.',
    },
    headerCol1: {
      de: 'DIENSTLEISTUNG / UMFANG',
      en: 'SERVICE / SCOPE',
      fr: 'PRESTATION / APPAREIL',
      it: 'SERVIZIO / ELEMENTO',
    },
    headerCol2: {
      de: 'PREIS AB',
      en: 'PRICE FROM',
      fr: 'PRIX DÈS',
      it: 'PREZZO DA',
    },
    quickPrice: 'ab CHF 45.–',
    items: [
      {
        name: {
          de: 'Backofen-Innenreinigung',
          en: 'Oven interior deep cleaning',
          fr: 'Nettoyage intérieur de four',
          it: 'Pulizia interna forno',
        },
        price: 'CHF 60.–/Gerät',
      },
      {
        name: {
          de: 'Kühlschrank-Innenreinigung',
          en: 'Fridge interior cleaning & sanitize',
          fr: 'Nettoyage & désinfection réfrigérateur',
          it: 'Pulizia interna frigorifero',
        },
        price: 'CHF 45.–/Gerät',
      },
      {
        name: {
          de: 'Sofa- / Polsterreinigung',
          en: 'Sofa & upholstery wet extraction',
          fr: 'Nettoyage canapé & tissus d’ameublement',
          it: 'Lavaggio divani & imbottiti',
        },
        price: 'CHF 90.–',
      },
      {
        name: {
          de: 'Matratzenreinigung',
          en: 'Mattress sanitize & mite removal',
          fr: 'Nettoyage matelas & anti-acariens',
          it: 'Igienizzazione materassi & antiacaro',
        },
        price: 'CHF 70.–',
      },
      {
        name: {
          de: 'Balkon- / Terrassenreinigung',
          en: 'Balcony / terrace wash',
          fr: 'Nettoyage balcon & terrasse',
          it: 'Pulizia balcone e terrazza',
        },
        price: 'CHF 80.–',
      },
      {
        name: {
          de: 'Hochdruckreinigung Aussenflächen',
          en: 'High-pressure wash for walkways & slabs',
          fr: 'Nettoyage haute pression terrasses & dalles',
          it: 'Lavaggio alta pressione esterni',
        },
        price: 'CHF 8.–/m²',
      },
      {
        name: {
          de: 'Sanitär-Intensivreinigung / Entkalken',
          en: 'Sanitary descaling & intensive lime removal',
          fr: 'Détartrage intensif des sanitaires',
          it: 'Disincrostazione e decalcificazione bagni',
        },
        price: 'CHF 55.–/Std.',
      },
      {
        name: {
          de: 'Individuelle Spezialreinigung',
          en: 'Customized specialty cleaning',
          fr: 'Nettoyage spécialisé sur mesure',
          it: 'Pulizia speciale su misura',
        },
        price: 'Auf Anfrage',
      },
    ],
    note: {
      de: 'Geeignete Materialien, Zugänglichkeit und Verschmutzung werden vor Auftragserteilung abgeklärt. Kann einzeln oder zusammen mit jedem Hauptpaket gebucht werden.',
      en: 'Appropriate methods, accessibility, and condition are clarified in advance. Can be booked standalone or combined with any service.',
      fr: 'Matériaux, accès et niveau de saleté validés avant intervention. Réservable à l’unité ou en complément.',
      it: 'Modalità, accessibilità e sporco concordati preventivamente. Prenotabile singolarmente o abbinato.',
    },
  },

  // ── 11 ZUSATZSERVICES ──
  {
    id: '11-zusatzservices',
    number: '11',
    serviceQuery: 'relocation',
    pillar: 'moving',
    icon: 'Wrench',
    title: {
      de: 'Zusatzservices für Umzug, Haus & Garten',
      en: 'Extra Services for Moving, Home & Garden',
      fr: 'Services complémentaires déménagement & extérieur',
      it: 'Servizi extra per trasloco, casa e giardino',
    },
    subtitle: {
      de: 'Praktische Unterstützung, die Ihnen wertvolle Zeit, Mühe und Kraft spart.',
      en: 'Practical extras that save you time, heavy lifting, and effort.',
      fr: 'Services pratiques d’appoint pour vous simplifier la vie.',
      it: 'Servizi pratici e manodopera per risparmiare tempo e fatica.',
    },
    headerCol1: {
      de: 'DIENSTLEISTUNG / UMFANG',
      en: 'SERVICE / SCOPE',
      fr: 'PRESTATION / CORPS DE MÉTIER',
      it: 'SERVIZIO / TIPO INTERVENTO',
    },
    headerCol2: {
      de: 'PREIS AB',
      en: 'PRICE FROM',
      fr: 'PRIX DÈS',
      it: 'PREZZO DA',
    },
    quickPrice: 'ab CHF 45.–/Std.',
    items: [
      {
        name: {
          de: 'Einpackservice / Packhilfe',
          en: 'Packing assistance (boxes available)',
          fr: 'Aide à l’emballage (cartons fournis sur demande)',
          it: 'Servizio imballaggio (scatole su richiesta)',
        },
        price: 'CHF 45.–/Std./Pers.',
      },
      {
        name: {
          de: 'Möbelmontage / -demontage',
          en: 'Furniture disassembly & assembly',
          fr: 'Montage et démontage de meubles',
          it: 'Montaggio e smontaggio mobili',
        },
        price: 'CHF 65.–/Std./Pers.',
      },
      {
        name: {
          de: 'Tragehilfe',
          en: 'Manpower / carrying assistance without vehicle',
          fr: 'Main-d\'œuvre de portage (sans véhicule)',
          it: 'Manodopera e facchinaggio (senza furgone)',
        },
        price: 'CHF 55.–/Std./Pers.',
      },
      {
        name: {
          de: 'Kleintransport',
          en: 'Small transport (single furniture, couch delivery)',
          fr: 'Petit transport (meuble isolé, canapé, etc.)',
          it: 'Piccolo trasporto (singolo mobile, divano, ecc.)',
        },
        price: 'CHF 150.–',
      },
      {
        name: {
          de: 'Abholung einzelner Möbel',
          en: 'Single furniture pickup & delivery',
          fr: 'Enlèvement de meuble individuel',
          it: 'Ritiro singolo mobile',
        },
        price: 'CHF 120.–',
      },
      {
        name: {
          de: 'Rasenmähen / einfache Gartenpflege',
          en: 'Lawn mowing & simple grounds upkeep',
          fr: 'Tonte de pelouse & entretien de jardin',
          it: 'Taglio erba & cura del verde',
        },
        price: 'CHF 65.–/Std.',
      },
      {
        name: {
          de: 'Laubbeseitigung & Aussenpflege',
          en: 'Leaf removal & seasonal outdoor care',
          fr: 'Ramassage de feuilles & nettoyage extérieur',
          it: 'Raccolta foglie & cura aree esterne',
        },
        price: 'CHF 65.–/Std.',
      },
      {
        name: {
          de: 'Express- und Sondereinsätze',
          en: 'Express / weekend & holiday callouts',
          fr: 'Interventions urgentes & week-end',
          it: 'Interventi urgenti / festivi',
        },
        price: 'Auf Anfrage',
      },
    ],
    note: {
      de: 'Einsatzzeit, Personal, Fahrzeug, Anfahrt und allfällige Materialkosten gemäss Offerte. Transparent abgerechnet nach Aufwand oder zum vereinbarten Festpreis.',
      en: 'Duration, crew, vehicle, travel, and any materials billed as quoted. Fair transparent billing by time or fixed price.',
      fr: 'Temps effectif, équipe, véhicule, déplacement et matériel selon devis. Facturation claire au temps passé ou au forfait.',
      it: 'Tempo impiegato, personale, mezzo, trasferta ed eventuali materiali come da offerta. Fatturazione trasparente a ore o a forfait.',
    },
  },
];

export const PRICING_PAGE_UI = {
  heroBadge: {
    de: 'Offizielle Schweizer Preisliste • November 2026',
    en: 'Official Swiss Price List • November 2026',
    fr: 'Grille tarifaire officielle Suisse • Novembre 2026',
    it: 'Listino prezzi ufficiale Svizzero • Novembre 2026',
  },
  heroTitle: {
    de: 'Transparente Preise für Reinigung, Umzug & Liegenschaften',
    en: 'Transparent Pricing for Cleaning, Moving & Facilities',
    fr: 'Tarifs transparents pour nettoyage, déménagement & conciergerie',
    it: 'Prezzi trasparenti per pulizie, traslochi e custodia stabili',
  },
  heroSubtitle: {
    de: 'Verbindliche Festpreise ohne versteckte Kosten. Wählen Sie einfach Ihre gewünschte Dienstleistung aus oder laden Sie die vollständige Druckversion herunter.',
    en: 'Binding fixed prices with zero hidden fees. Select your desired service below or download the complete printable price list.',
    fr: 'Tarifs forfaitaires garantis sans frais cachés. Sélectionnez votre service ci-dessous ou téléchargez la version officielle imprimable.',
    it: 'Prezzi fissi garantiti senza costi nascosti. Seleziona il servizio desiderato o scarica la versione stampabile.',
  },
  downloadPdfButton: {
    de: 'Offizielle Preisliste als PDF herunterladen (1.2 MB)',
    en: 'Download Official Price List PDF (1.2 MB)',
    fr: 'Télécharger la liste de prix officielle en PDF (1.2 Mo)',
    it: 'Scarica il listino ufficiale in PDF (1.2 MB)',
  },
  requestQuoteButton: {
    de: 'Kostenlose Festpreisofferte anfordern',
    en: 'Request Free Binding Quote',
    fr: 'Demander un devis forfaitaire gratuit',
    it: 'Richiedi un preventivo gratuito',
  },
  callButton: {
    de: 'Telefonische Beratung',
    en: 'Telephone consultation',
    fr: 'Conseil par téléphone',
    it: 'Consulenza telefonica',
  },
  searchPlaceholder: {
    de: 'Dienstleistung oder Preis suchen (z. B. Fenster, 3.5 Zi, Sofa, Umzug, Büro)...',
    en: 'Search service or price (e.g. window, 3.5 rooms, sofa, moving, office)...',
    fr: 'Rechercher un service ou prix (ex. vitres, 3.5 pièces, canapé, déménagement)...',
    it: 'Cerca servizio o prezzo (es. finestre, 3.5 locali, divano, trasloco)...',
  },
  filterPillars: {
    all: { de: 'Alle 11 Tarife', en: 'All 11 Services', fr: 'Tous les 11 services', it: 'Tutti gli 11 servizi' },
    cleaning: { de: 'Reinigung & Haushalt', en: 'Cleaning & Domestic', fr: 'Nettoyage & Ménage', it: 'Pulizie & Casa' },
    moving: { de: 'Umzug & Entsorgung', en: 'Moving & Disposal', fr: 'Déménagement & Débarras', it: 'Trasloco & Sgombero' },
    commercial: { de: 'Büro, Bau & Gastro', en: 'Commercial, Post-Build & Gastro', fr: 'Bureaux, Chantiers & Gastro', it: 'Uffici, Cantiere & Ristorazione' },
    facility: { de: 'Hauswartung', en: 'Facility Services', fr: 'Conciergerie', it: 'Custodia stabili' },
  },
  comboPromo: {
    badge: { de: 'Bestseller Vorteil', en: 'Bestseller Deal', fr: 'Avantage Bestseller', it: 'Miglior offerta' },
    title: {
      de: 'Kombi-Angebot: Umzug + Endreinigung',
      en: 'Combo Offer: Moving + Final Cleaning',
      fr: 'Offre combinée : Déménagement + Nettoyage fin de bail',
      it: 'Offerta combinata: Trasloco + Pulizia finale',
    },
    text: {
      de: 'Buchen Sie Umzug und Endreinigung zusammen und sparen Sie volle 10% auf das Gesamtpaket inklusive 100% Abnahmegarantie!',
      en: 'Book moving and move-out cleaning together and save a full 10% on the entire package including 100% acceptance guarantee!',
      fr: 'Réservez votre déménagement et votre nettoyage de remise ensemble et bénéficiez de 10% de réduction avec garantie de remise !',
      it: 'Prenota trasloco e pulizia finale insieme e risparmia il 10% sul pacchetto completo con garanzia di consegna al 100%!',
    },
    cta: { de: 'Kombi-Offerte berechnen', en: 'Calculate Combo Quote', fr: 'Calculer le devis combiné', it: 'Calcola preventivo combinato' },
  },
  termsSection: {
    badge: { de: 'Konditionen & Zahlungsbedingungen', en: 'Terms & Payment Conditions', fr: 'Conditions tarifaires & Paiement', it: 'Condizioni & Pagamenti' },
    title: {
      de: 'Preis- & Zahlungsbedingungen',
      en: 'Pricing & Payment Terms',
      fr: 'Conditions de prix et de règlement',
      it: 'Condizioni di prezzo e pagamento',
    },
    subtitle: {
      de: 'Transparenz, Verlässlichkeit und Sicherheit stehen bei SwissCleanMove an erster Stelle.',
      en: 'Transparency, reliability, and security are our top priorities at SwissCleanMove.',
      fr: 'Transparence, fiabilité et confiance sont les priorités de SwissCleanMove.',
      it: 'Trasparenza, affidabilità e sicurezza sono le priorità di SwissCleanMove.',
    },
    bullets: [
      {
        de: 'Alle angegebenen Preise sind unverbindliche Richtpreise in CHF. Verbindlich ist die individuelle Festpreisofferte.',
        en: 'All listed prices are non-binding reference prices in CHF. The customized quote is binding.',
        fr: 'Tous les tarifs indiqués sont des prix indicatifs en CHF. Seule l’offre personnalisée est contractuelle.',
        it: 'Tutti i prezzi indicati sono orientativi in CHF. Il preventivo personalizzato è vincolante.',
      },
      {
        de: 'Der Endpreis richtet sich nach Objektgrösse, aktuellem Zustand, Zugang/Stockwerk, Entfernung und Arbeitsumfang.',
        en: 'The final price depends on dimensions, initial condition, floor access/elevator, distance, and scope of work.',
        fr: 'Le montant final dépend de la surface, de l’état des lieux, de l’accès/étage, de la distance et des prestations requises.',
        it: 'Il prezzo finale dipende dalla metratura, dalle condizioni, dall’accesso/piano, dalla distanza e dall’impegno richiesto.',
      },
      {
        de: 'Kostenlose und unverbindliche Offerte nach Ihren Angaben oder einer Vor-Ort-Besichtigung.',
        en: 'Free, no-obligation quote based on your details or a complimentary on-site viewing.',
        fr: 'Devis gratuit et sans engagement d’après vos informations ou après visite sur place.',
        it: 'Preventivo gratuito e senza impegno in base ai vostri dati o a un sopralluogo sul posto.',
      },
      {
        de: 'Bequeme Zahlung bar nach Abschluss an die Teamleitung gegen Quittung; TWINT nach Vereinbarung.',
        en: 'Convenient payment in cash upon job completion to team leader against receipt; TWINT by arrangement.',
        fr: 'Paiement simple en espèces lors de la finalisation contre quittance ; TWINT selon accord.',
        it: 'Pagamento agevole in contanti al caposquadra con ricevuta; TWINT previo accordo.',
      },
    ],
  },
  bottomCta: {
    title: {
      de: 'Bereit für Ihre massgeschneiderte Festpreisofferte?',
      en: 'Ready for your customized fixed-price quote?',
      fr: 'Prêt pour votre devis forfaitaire sur mesure ?',
      it: 'Pronto per il tuo preventivo personalizzato a prezzo fisso?',
    },
    desc: {
      de: 'Füllen Sie unser kurzes Formular in 2 Minuten aus. Wir prüfen Ihren Auftrag und senden Ihnen innert 24 Stunden eine transparente Offerte.',
      en: 'Fill in our 2-minute request form. We review your specifications and send you a transparent quote within 24 hours.',
      fr: 'Complétez notre formulaire en 2 minutes. Nous étudions votre demande et vous transmettons une offre claire sous 24 heures.',
      it: 'Compila il nostro modulo in 2 minuti. Valutiamo la richiesta e ti inviamo un preventivo trasparente entro 24 ore.',
    },
    requestOffer: { de: 'Jetzt kostenlose Offerte anfordern', en: 'Request Free Quote Now', fr: 'Demander mon devis gratuit', it: 'Richiedi subito il preventivo' },
  },
  cardAction: {
    de: 'Offerte für diesen Service anfordern',
    en: 'Request quote for this service',
    fr: 'Demander un devis pour ce service',
    it: 'Richiedi preventivo per questo servizio',
  },
};
