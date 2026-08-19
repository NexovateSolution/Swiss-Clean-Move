// Knowledge Hub - Trilingual Content Data
// All text content for the /preise-und-ratgeber, /pricing-and-guides, /prix-et-conseils pages
import { PRICING_RULES } from './pricingRules';

type Tri = { en: string; de: string; fr: string; it: string };

export interface KnowledgeHubContent {
  meta: { title: Tri; description: Tri };
  hero: { badge: Tri; h1: Tri; subtitle: Tri };
  tocSections: { id: string; label: Tri; icon: string }[];
  introText: Tri;
  avgPricesTitle: Tri;
  avgPricesIntro: Tri;
  avgPricesFactors: { label: Tri; desc: Tri }[];
  avgPricesNote: Tri;
  facilityTitle: Tri;
  facilitySubtitle: Tri;
  facilityCards: { title: Tri; desc: Tri; price: Tri }[];
  comparisons: {
    title: Tri;
    subtitle: Tri;
    items: {
      sectionTitle: Tri;
      left: { title: Tri; points: Tri[]; bestFor: Tri; price: Tri };
      right: { title: Tri; points: Tri[]; bestFor: Tri; price: Tri };
    }[];
  };
  preparation: {
    title: Tri;
    subtitle: Tri;
    steps: { phase: Tri; tasks: Tri[] }[];
  };
  qaCategories: {
    category: Tri;
    questions: { q: Tri; snippet: Tri; answer: Tri; links?: { label: string; href: string }[] }[];
  }[];
  eeat: {
    title: Tri;
    items: { icon: string; title: Tri; desc: Tri }[];
  };
  serviceLinks: {
    category: Tri;
    links: { label: Tri; href: string }[];
  }[];
  cta: { title: Tri; desc: Tri; btn: Tri };
}

const data: KnowledgeHubContent = {
  meta: {
    title: {
      de: 'Preise & Ratgeber - Umzug, Reinigung, Haushaltshilfe Schweiz | SwissCleanMove',
      en: 'Pricing & Guides - Moving, Cleaning, Household Help Switzerland | SwissCleanMove',
      fr: 'Prix & Conseils - DÃ©mÃ©nagement, Nettoyage, Aide MÃ©nagÃ¨re Suisse | SwissCleanMove', it: `Prezzi e guide - Traslochi, pulizie, aiuto domestico Svizzera | SwissCleanMove`
    },
    description: {
      de: 'Transparente Preise fÃ¼r Umzug, Umzugsreinigung, Haushaltshilfe, Facility Service und Entsorgung in der Schweiz. Ratgeber, Checklisten und Antworten auf hÃ¤ufige Fragen.',
      en: 'Transparent prices for moving, move-out cleaning, household help, facility services and disposal in Switzerland. Guides, checklists and answers to common questions.',
      fr: 'Prix transparents pour dÃ©mÃ©nagement, nettoyage de fin de bail, aide mÃ©nagÃ¨re, facility services et Ã©limination en Suisse. Guides, checklists et rÃ©ponses aux questions frÃ©quentes.', it: `Prezzi trasparenti per traslochi, pulizie di trasloco, aiuto domestico, servizi infrastrutturali e smaltimento in Svizzera. Guide, liste di controllo e risposte a domande comuni.`
    }
  },
  hero: {
    badge: {
      de: 'Preise & Ratgeber',
      en: 'Pricing & Guides',
      fr: 'Prix & Conseils', it: `Prezzi e guide`
    },
    h1: {
      de: 'SwissCleanMove - Preise, Dienstleistungen & Ratgeber Schweiz',
      en: 'SwissCleanMove - Pricing, Services & Guides Switzerland',
      fr: 'SwissCleanMove - Prix, Services & Guides Suisse', it: `SwissCleanMove - Prezzi, servizi e guide Svizzera`
    },
    subtitle: {
      de: 'Transparente Festpreise, professionelle Beratung und umfassende Informationen zu Umzug, Reinigung, Haushaltshilfe, Facility Service und Entsorgung in der ganzen Schweiz.',
      en: 'Transparent fixed prices, professional consultation and comprehensive information on moving, cleaning, household help, facility services and disposal throughout Switzerland.',
      fr: 'Prix fixes transparents, conseils professionnels et informations complÃ¨tes sur le dÃ©mÃ©nagement, le nettoyage, l\'aide mÃ©nagÃ¨re, les facility services et l\'Ã©limination dans toute la Suisse.', it: `Prezzi fissi trasparenti, consulenza professionale e informazioni complete su traslochi, pulizie, aiuto domestico, servizi di ristrutturazione e smaltimento in tutta la Svizzera.`
    }
  },
  tocSections: [
    { id: 'umzug-preise', label: { de: 'Umzug & Reinigung Preise', en: 'Moving & Cleaning Prices', fr: 'Prix DÃ©mÃ©nagement & Nettoyage', it: `Prezzi di trasloco e pulizia` }, icon: 'Truck' },
    { id: 'haushaltshilfe-preise', label: { de: 'Haushaltshilfe Preise', en: 'Household Help Prices', fr: 'Prix Aide MÃ©nagÃ¨re', it: `Prezzi degli aiuti domestici` }, icon: 'Heart' },
    { id: 'durchschnittspreise', label: { de: 'Durchschnittspreise Schweiz', en: 'Average Prices Switzerland', fr: 'Prix Moyens Suisse', it: `Prezzi medi Svizzera` }, icon: 'BarChart3' },
    { id: 'facility-service', label: { de: 'Facility Service & Hauswartung', en: 'Facility Service & Maintenance', fr: 'Facility Service & Conciergerie', it: `Assistenza e manutenzione della struttura` }, icon: 'Building2' },
    { id: 'vergleiche', label: { de: 'Service-Vergleiche', en: 'Service Comparisons', fr: 'Comparaisons de Services', it: `Confronti di servizi` }, icon: 'ArrowLeftRight' },
    { id: 'umzugsvorbereitung', label: { de: 'Umzugsvorbereitung', en: 'Moving Preparation', fr: 'PrÃ©paration au DÃ©mÃ©nagement', it: `Preparazione in movimento` }, icon: 'ClipboardList' },
    { id: 'fragen', label: { de: 'HÃ¤ufige Fragen', en: 'Common Questions', fr: 'Questions FrÃ©quentes', it: `Domande comuni` }, icon: 'HelpCircle' },
    { id: 'regionen', label: { de: 'Unsere Regionen', en: 'Our Regions', fr: 'Nos RÃ©gions', it: `Le nostre Regioni` }, icon: 'MapPin' },
  ],
  introText: {
    de: 'SwissCleanMove ist Ihr vertrauensvoller Partner fÃ¼r Premium-UmzÃ¼ge, Umzugsreinigungen mit 100% Abnahmegarantie, Haushaltshilfe, Facility Management und umfassende Entsorgungsdienste in der gesamten Schweiz. Hier finden Sie transparente Preise, detaillierte LeistungsÃ¼bersichten und kompetente Antworten auf Ihre wichtigsten Fragen rund um Umzug und Reinigung in der Schweiz.',
    en: 'SwissCleanMove is your trusted partner for premium moving services, move-out cleaning with a 100% handover guarantee, household help, facility management, and comprehensive disposal services across Switzerland. Here, you will find transparent pricing, detailed service overviews, and expert answers to your most pressing questions about moving and cleaning in Switzerland.',
    fr: 'SwissCleanMove est votre partenaire de confiance pour des services de dÃ©mÃ©nagement premium, le nettoyage de fin de bail avec garantie de remise Ã  100 %, l\'aide mÃ©nagÃ¨re, le facility management et des services d\'Ã©limination complets dans toute la Suisse. Vous y trouverez des prix transparents, des aperÃ§us dÃ©taillÃ©s de nos services et des rÃ©ponses d\'experts Ã  vos questions les plus importantes sur le dÃ©mÃ©nagement et le nettoyage en Suisse.', it: `SwissCleanMove è il tuo partner di fiducia per servizi di trasloco premium, pulizia di trasloco con garanzia di consegna al 100%, aiuto domestico, gestione delle strutture e servizi di smaltimento completi in tutta la Svizzera. Qui troverai prezzi trasparenti, panoramiche dettagliate dei servizi e risposte di esperti alle tue domande più urgenti sui traslochi e sulle pulizie in Svizzera.`
  },
  avgPricesTitle: {
    de: 'Durchschnittspreise in der Schweiz',
    en: 'Average Prices in Switzerland',
    fr: 'Prix Moyens en Suisse', it: `Prezzi medi in Svizzera`
  },
  avgPricesIntro: {
    de: 'Die Preise fÃ¼r Umzug und Reinigung in der Schweiz variieren je nach Anbieter, Region und Leistungsumfang. SwissCleanMove bietet transparente Festpreise, die alle wesentlichen Leistungen beinhalten - ohne versteckte Kosten.',
    en: 'Prices for moving and cleaning in Switzerland vary depending on the provider, region and scope of services. SwissCleanMove offers transparent fixed prices that include all essential services - with no hidden costs.',
    fr: 'Les prix pour le dÃ©mÃ©nagement et le nettoyage en Suisse varient selon le prestataire, la rÃ©gion et l\'Ã©tendue des services. SwissCleanMove propose des prix fixes transparents qui incluent tous les services essentiels - sans frais cachÃ©s.', it: `I prezzi per il trasloco e la pulizia in Svizzera variano a seconda del fornitore, della regione e della portata dei servizi. SwissCleanMove offre prezzi fissi trasparenti che includono tutti i servizi essenziali, senza costi nascosti.`
  },
  avgPricesFactors: [
    {
      label: { de: 'Umzug (3.5-Zimmer-Wohnung)', en: 'Moving (3.5-room apartment)', fr: 'DÃ©mÃ©nagement (3.5 piÃ¨ces)', it: `Trasloco (appartamento di 3,5 locali)` },
      desc: { de: `Schweizer Durchschnitt: CHF 1'200 - CHF 3'500. SwissCleanMove: ab CHF ${PRICING_RULES.moving.baseRates['3.5']}.- inkl. Transportversicherung, professionellem Team und Verpackungsmaterial.`, en: `Swiss average: CHF 1,200 - CHF 3,500. SwissCleanMove: from CHF ${PRICING_RULES.moving.baseRates['3.5']}.- incl. transport insurance, professional team and packing materials.`, fr: `Moyenne suisse : CHF 1'200 - CHF 3'500. SwissCleanMove : dÃ¨s CHF ${PRICING_RULES.moving.baseRates['3.5']}.- incl. assurance transport, Ã©quipe professionnelle et matÃ©riel d'emballage.`, it: `Media svizzera: CHF 1.200 - CHF 3.500. SwissCleanMove: da CHF \${PRICING_RULES.moving.baseRates['3.5']}.- incl. assicurazione di trasporto, squadra professionale e materiali di imballaggio.` }
    },
    {
      label: { de: 'Umzugsreinigung (3.5-Zimmer-Wohnung)', en: 'Move-out cleaning (3.5-room apt)', fr: 'Nettoyage fin de bail (3.5 piÃ¨ces)', it: `Pulizie di trasloco (app. 3,5 locali)` },
      desc: { de: `Schweizer Durchschnitt: CHF 800 - CHF 1'500. SwissCleanMove: ab CHF ${PRICING_RULES.cleaning.apartment['3.5']}.- mit 100% Abnahmegarantie und kostenloser Nachreinigung.`, en: `Swiss average: CHF 800 - CHF 1,500. SwissCleanMove: from CHF ${PRICING_RULES.cleaning.apartment['3.5']}.- with 100% handover guarantee and free re-cleaning.`, fr: `Moyenne suisse : CHF 800 - CHF 1'500. SwissCleanMove : dÃ¨s CHF ${PRICING_RULES.cleaning.apartment['3.5']}.- avec garantie de remise Ã  100% et nettoyage ultÃ©rieur gratuit.`, it: `Media svizzera: CHF 800 - CHF 1.500. SwissCleanMove: da CHF \${PRICING_RULES.cleaning.apartment['3.5']}.- con garanzia di consegna al 100% e nuova pulizia gratuita.` }
    },
    {
      label: { de: 'Haushaltshilfe', en: 'Household help', fr: 'Aide mÃ©nagÃ¨re', it: `Aiuto domestico` },
      desc: { de: `Schweizer Durchschnitt: CHF 35 - CHF 55 / Stunde. SwissCleanMove: ab CHF ${PRICING_RULES.household.regular}.- / Stunde fÃ¼r regelmÃ¤ssige EinsÃ¤tze. Versichert, professionell und zuverlÃ¤ssig.`, en: `Swiss average: CHF 35 - CHF 55 / hour. SwissCleanMove: from CHF ${PRICING_RULES.household.regular}.- / hour for regular appointments. Insured, professional and reliable.`, fr: `Moyenne suisse : CHF 35 - CHF 55 / heure. SwissCleanMove : dÃ¨s CHF ${PRICING_RULES.household.regular}.- / heure pour les interventions rÃ©guliÃ¨res. AssurÃ©, professionnel et fiable.`, it: `Media svizzera: CHF 35 - CHF 55 / ora. SwissCleanMove: da CHF \${PRICING_RULES.household.regular}.- / ora per appuntamenti regolari. Assicurato, professionale e affidabile.` }
    },
    {
      label: { de: 'Entsorgung & RÃ¤umung', en: 'Disposal & clearance', fr: 'Ã‰limination & dÃ©barras', it: `Smaltimento e sgombero` },
      desc: { de: `Schweizer Durchschnitt: CHF 500 - CHF 3'000 (WohnungsrÃ¤umung). SwissCleanMove: ab CHF ${PRICING_RULES.disposal.volumePricing['1']}.- inkl. fachgerechter Entsorgung und Recycling.`, en: `Swiss average: CHF 500 - CHF 3,000 (apartment clearance). SwissCleanMove: from CHF ${PRICING_RULES.disposal.volumePricing['1']}.- incl. professional disposal and recycling.`, fr: `Moyenne suisse : CHF 500 - CHF 3'000 (dÃ©barras d'appartement). SwissCleanMove : dÃ¨s CHF ${PRICING_RULES.disposal.volumePricing['1']}.- incl. Ã©limination professionnelle et recyclage.`, it: `Media svizzera: CHF 500 - CHF 3'000 (sgombero appartamento). SwissCleanMove: da CHF \${PRICING_RULES.disposal.volumePricing['1']}.- incl. smaltimento e riciclaggio professionale.` }
    }
  ],
  avgPricesNote: {
    de: 'Was beeinflusst die Preise? WohnungsgrÃ¶sse, Stockwerk, Lift, Distanz, Reinigungszustand, MÃ¶belmenge und regionale Unterschiede. GÃ¼nstige Anbieter sparen oft bei Versicherung, Material oder PersonalqualitÃ¤t. SwissCleanMove setzt auf Schweizer QualitÃ¤tsstandards, versicherte Leistungen und transparente Festpreise.',
    en: 'What influences prices? Apartment size, floor level, elevator, distance, cleaning condition, furniture quantity and regional differences. Cheap providers often cut costs on insurance, materials or staff quality. SwissCleanMove relies on Swiss quality standards, insured services and transparent fixed prices.',
    fr: 'Qu\'est-ce qui influence les prix ? Taille de l\'appartement, Ã©tage, ascenseur, distance, Ã©tat de propretÃ©, quantitÃ© de meubles et diffÃ©rences rÃ©gionales. Les prestataires bon marchÃ© Ã©conomisent souvent sur l\'assurance, le matÃ©riel ou la qualitÃ© du personnel. SwissCleanMove mise sur les standards de qualitÃ© suisses, des services assurÃ©s et des prix fixes transparents.', it: `Cosa influenza i prezzi? Dimensioni dell'appartamento, livello del piano, ascensore, distanza, condizioni di pulizia, quantità di mobili e differenze regionali. I fornitori economici spesso riducono i costi di assicurazione, materiali o qualità del personale. SwissCleanMove si basa su standard di qualità svizzeri, servizi assicurati e prezzi fissi trasparenti.`
  },
  facilityTitle: {
    de: 'Facility Service & Hauswartung',
    en: 'Facility Service & Property Maintenance',
    fr: 'Facility Service & Conciergerie', it: `Servizio di struttura e manutenzione della proprietà`
  },
  facilitySubtitle: {
    de: 'Professionelle GebÃ¤udeverwaltung und Objektbetreuung fÃ¼r Verwaltungen, Unternehmen und Liegenschaftsbesitzer.',
    en: 'Professional building management and property care for administrations, businesses and property owners.',
    fr: 'Gestion professionnelle de bÃ¢timents et entretien d\'immeubles pour administrations, entreprises et propriÃ©taires.', it: `Gestione professionale degli edifici e cura degli immobili per amministrazioni, imprese e proprietari immobiliari.`
  },
  facilityCards: [
    {
      title: { de: 'Hauswartung', en: 'Property Maintenance', fr: 'Conciergerie', it: `Manutenzione della proprietà` },
      desc: { de: 'RegelmÃ¤ssige GebÃ¤udereinigung, Aussenunterhalt, Winterdienst, GrÃ¼npflege und technische Objektbetreuung.', en: 'Regular building cleaning, exterior maintenance, winter service, green care and technical property management.', fr: 'Nettoyage rÃ©gulier de bÃ¢timents, entretien extÃ©rieur, service hivernal, entretien des espaces verts et gestion technique.', it: `Pulizie periodiche dell'edificio, manutenzione degli esterni, servizio invernale, cura del verde e gestione tecnica dell'immobile.` },
      price: { de: 'Auf Anfrage - individuell kalkuliert', en: 'Upon request - individually calculated', fr: 'Sur demande - calculÃ© individuellement', it: `Su richiesta - calcolato individualmente` }
    },
    {
      title: { de: 'Unterhaltsreinigung', en: 'Maintenance Cleaning', fr: 'Nettoyage d\'entretien', it: `Pulizia di manutenzione` },
      desc: { de: 'RegelmÃ¤ssige Treppenhausreinigung, BÃ¼roreinigung, GemeinschaftsrÃ¤ume und gewerbliche Objekte.', en: 'Regular stairwell cleaning, office cleaning, common areas and commercial properties.', fr: 'Nettoyage rÃ©gulier des cages d\'escalier, nettoyage de bureaux, espaces communs et locaux commerciaux.', it: `Pulizia regolare del vano scale, pulizia uffici, aree comuni e immobili commerciali.` },
      price: { de: `Ab CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.- / Stunde`, en: `From CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.- / hour`, fr: `DÃ¨s CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.- / heure`, it: `Da CHF \${PRICING_RULES.maintenance.hourlyRates.residential}.- / ora` }
    },
    {
      title: { de: 'Gastronomie Reinigung', en: 'Restaurant Cleaning', fr: 'Nettoyage Gastronomie', it: `Pulizia del ristorante` },
      desc: { de: 'Professionelle KÃ¼chenreinigung, Hygienestandards, regelmÃ¤ssige Grundreinigung fÃ¼r Restaurants und Hotels.', en: 'Professional kitchen cleaning, hygiene standards, regular deep cleaning for restaurants and hotels.', fr: 'Nettoyage professionnel de cuisine, normes d\'hygiÃ¨ne, nettoyage en profondeur rÃ©gulier pour restaurants et hÃ´tels.', it: `Pulizia professionale della cucina, norme igieniche, pulizia profonda periodica per ristoranti e hotel.` },
      price: { de: 'Auf Anfrage', en: 'Upon request', fr: 'Sur demande', it: `Su richiesta` }
    },
    {
      title: { de: 'Baureinigung', en: 'Construction Cleaning', fr: 'Nettoyage de chantier', it: `Pulizia della costruzione` },
      desc: { de: 'Bauendreinigung, Feinreinigung nach Renovierung, Neubau-Reinigung und Ãœbergabereinigung.', en: 'Post-construction cleaning, fine cleaning after renovation, new build cleaning and handover cleaning.', fr: 'Nettoyage de fin de chantier, nettoyage fin aprÃ¨s rÃ©novation, nettoyage de nouvelle construction et nettoyage de remise.', it: `Pulizie post-costruzione, pulizie finali dopo ristrutturazioni, pulizie di nuove costruzioni e pulizie di passaggio.` },
      price: { de: `Ab CHF ${PRICING_RULES.cleaning.house['3.5']}.- / Stunde`, en: `From CHF ${PRICING_RULES.cleaning.house['3.5']}.- / hour`, fr: `DÃ¨s CHF ${PRICING_RULES.cleaning.house['3.5']}.- / heure`, it: `A partire da CHF \${PRICING_RULES.cleaning.house['3.5']}.- / ora` }
    }
  ],
  comparisons: {
    title: { de: 'Service-Vergleiche', en: 'Service Comparisons', fr: 'Comparaisons de Services', it: `Confronti di servizi` },
    subtitle: { de: 'Welche Dienstleistung ist die richtige fÃ¼r Sie?', en: 'Which service is right for you?', fr: 'Quel service vous convient ?', it: `Qual è il servizio giusto per te?` },
    items: [
      {
        sectionTitle: { de: 'Endreinigung vs. Umzugsreinigung', en: 'Final Cleaning vs. Move-Out Cleaning', fr: 'Nettoyage final vs. Nettoyage de fin de bail', it: `Pulizia finale vs. pulizia di trasloco` },
        left: {
          title: { de: 'Endreinigung', en: 'Final Cleaning', fr: 'Nettoyage final', it: `Pulizia finale` },
          points: [
            { de: 'Allgemeine Grundreinigung', en: 'General deep cleaning', fr: 'Nettoyage en profondeur gÃ©nÃ©ral', it: `Pulizia profonda generale` },
            { de: 'Keine Abnahmegarantie', en: 'No handover guarantee', fr: 'Pas de garantie de remise', it: `Nessuna garanzia di consegna` },
            { de: 'FÃ¼r Zwischenreinigungen geeignet', en: 'Suitable for interim cleaning', fr: 'AdaptÃ© au nettoyage intermÃ©diaire', it: `Adatto per la pulizia intermedia` },
            { de: 'KÃ¼rzerer Arbeitsaufwand', en: 'Shorter work time', fr: 'DurÃ©e de travail plus courte', it: `Tempo di lavoro più breve` },
          ],
          bestFor: { de: 'Ideal fÃ¼r Renovierungen oder Zwischenreinigungen', en: 'Ideal for renovations or interim cleanings', fr: 'IdÃ©al pour rÃ©novations ou nettoyages intermÃ©diaires', it: `Ideale per ristrutturazioni o pulizie intermedie` },
          price: { de: 'Ab CHF 400.-', en: 'From CHF 400.-', fr: 'DÃ¨s CHF 400.-', it: `Da CHF 400.-` }
        },
        right: {
          title: { de: 'Umzugsreinigung', en: 'Move-Out Cleaning', fr: 'Nettoyage de fin de bail', it: `Pulizia del trasloco` },
          points: [
            { de: 'Komplette Wohnungsreinigung nach Mietrecht', en: 'Complete apartment cleaning per tenancy law', fr: 'Nettoyage complet selon droit du bail', it: `Pulizia completa dell'appartamento secondo la legge sulla locazione` },
            { de: '100% Abnahmegarantie inklusive', en: '100% handover guarantee included', fr: 'Garantie de remise Ã  100% incluse', it: `Garanzia di consegna al 100% inclusa` },
            { de: 'Nachreinigung bei Beanstandungen kostenlos', en: 'Free re-cleaning if complaints', fr: 'Nettoyage ultÃ©rieur gratuit en cas de rÃ©clamation', it: `Ripulitura gratuita in caso di reclami` },
            { de: 'Fenster, Storen, KÃ¼che, Bad komplett', en: 'Windows, blinds, kitchen, bathroom complete', fr: 'FenÃªtres, stores, cuisine, salle de bain complets', it: `Finestre, persiane, cucina, bagno completi` },
          ],
          bestFor: { de: 'Empfohlen bei WohnungsÃ¼bergabe an die Verwaltung', en: 'Recommended for property handover to management', fr: 'RecommandÃ© pour la remise de propriÃ©tÃ© Ã  la gÃ©rance', it: `Consigliato per la consegna dell'immobile alla direzione` },
          price: { de: `Ab CHF ${PRICING_RULES.moving.baseRates['1']}.-`, en: `From CHF ${PRICING_RULES.moving.baseRates['1']}.-`, fr: `DÃ¨s CHF ${PRICING_RULES.moving.baseRates['1']}.-`, it: `A partire da \${PRICING_RULES.moving.baseRates['1']}.- da CHF` }
        }
      },
      {
        sectionTitle: { de: 'Haushaltshilfe vs. Unterhaltsreinigung', en: 'Household Help vs. Maintenance Cleaning', fr: 'Aide mÃ©nagÃ¨re vs. Nettoyage d\'entretien', it: `Aiuto domestico vs. pulizia di manutenzione` },
        left: {
          title: { de: 'Haushaltshilfe', en: 'Household Help', fr: 'Aide mÃ©nagÃ¨re', it: `Aiuto domestico` },
          points: [
            { de: 'Individuelle HaushaltsunterstÃ¼tzung', en: 'Individual household support', fr: 'Soutien mÃ©nager individuel', it: `Sostegno familiare individuale` },
            { de: 'Kochen, Waschen, BÃ¼geln, Einkaufen', en: 'Cooking, washing, ironing, shopping', fr: 'Cuisine, lessive, repassage, courses', it: `Cucinare, lavare, stirare, fare la spesa` },
            { de: 'Flexible Einsatzzeiten', en: 'Flexible scheduling', fr: 'Horaires flexibles', it: `Pianificazione flessibile` },
            { de: 'FÃ¼r Privathaushalte und Senioren', en: 'For private households and seniors', fr: 'Pour mÃ©nages privÃ©s et personnes Ã¢gÃ©es', it: `Per famiglie private e anziani` },
          ],
          bestFor: { de: 'Ideal fÃ¼r Familien, BerufstÃ¤tige und Senioren', en: 'Ideal for families, professionals and seniors', fr: 'IdÃ©al pour familles, professionnels et personnes Ã¢gÃ©es', it: `Ideale per famiglie, professionisti e anziani` },
          price: { de: `Ab CHF ${PRICING_RULES.household.regular}.- / Stunde`, en: `From CHF ${PRICING_RULES.household.regular}.- / hour`, fr: `DÃ¨s CHF ${PRICING_RULES.household.regular}.- / heure`, it: `Da CHF \${PRICING_RULES.household.regular}.- / ora` }
        },
        right: {
          title: { de: 'Unterhaltsreinigung', en: 'Maintenance Cleaning', fr: 'Nettoyage d\'entretien', it: `Pulizia di manutenzione` },
          points: [
            { de: 'RegelmÃ¤ssige GebÃ¤ude- und BÃ¼roreinigung', en: 'Regular building and office cleaning', fr: 'Nettoyage rÃ©gulier de bÃ¢timents et bureaux', it: `Pulizie periodiche di edifici e uffici` },
            { de: 'TreppenhÃ¤user, EingÃ¤nge, GemeinschaftsrÃ¤ume', en: 'Stairwells, entrances, common areas', fr: 'Cages d\'escalier, entrÃ©es, espaces communs', it: `Vani scale, ingressi, aree comuni` },
            { de: 'Nach festem Reinigungsplan', en: 'According to fixed cleaning schedule', fr: 'Selon planning de nettoyage fixe', it: `Secondo il programma di pulizia fisso` },
            { de: 'FÃ¼r Verwaltungen und Gewerbe', en: 'For administrations and businesses', fr: 'Pour administrations et entreprises', it: `Per amministrazioni e imprese` },
          ],
          bestFor: { de: 'Ideal fÃ¼r Liegenschaftsverwaltungen und Firmen', en: 'Ideal for property managers and companies', fr: 'IdÃ©al pour gÃ©rants immobiliers et entreprises', it: `Ideale per amministratori immobiliari e aziende` },
          price: { de: `Ab CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.- / Stunde`, en: `From CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.- / hour`, fr: `DÃ¨s CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.- / heure`, it: `Da CHF \${PRICING_RULES.maintenance.hourlyRates.residential}.- / ora` }
        }
      },
      {
        sectionTitle: { de: 'Umzug selbst vs. professionelle Umzugsfirma', en: 'DIY Move vs. Professional Moving Company', fr: 'DÃ©mÃ©nagement seul vs. Entreprise professionnelle', it: `Trasloco fai da te contro azienda di traslochi professionale` },
        left: {
          title: { de: 'Selbst umziehen', en: 'DIY Moving', fr: 'DÃ©mÃ©nager seul', it: `Movimento fai da te` },
          points: [
            { de: 'Transporter selbst mieten (CHF 150-300/Tag)', en: 'Rent van yourself (CHF 150-300/day)', fr: 'Louer un utilitaire soi-mÃªme (CHF 150-300/jour)', it: `Noleggia tu stesso il furgone (CHF 150-300/giorno)` },
            { de: 'Helfer selbst organisieren', en: 'Organize helpers yourself', fr: 'Organiser ses propres aides', it: `Organizza tu stesso gli aiutanti` },
            { de: 'Risiko bei MÃ¶belschÃ¤den', en: 'Risk of furniture damage', fr: 'Risque de dommages aux meubles', it: `Rischio di danni ai mobili` },
            { de: 'Zeitaufwand: 1-3 Tage', en: 'Time: 1-3 days', fr: 'DurÃ©e : 1-3 jours', it: `Tempo: 1-3 giorni` },
          ],
          bestFor: { de: 'Nur bei kleinen Wohnungen und kurzen Distanzen', en: 'Only for small apartments and short distances', fr: 'Uniquement pour petits appartements et courtes distances', it: `Solo per piccoli appartamenti e brevi distanze` },
          price: { de: 'CHF 300 - CHF 800 (+ eigene Arbeitszeit)', en: 'CHF 300 - CHF 800 (+ own work time)', fr: 'CHF 300 - CHF 800 (+ temps de travail propre)', it: `CHF 300 - CHF 800 (+ tempo di lavoro proprio)` }
        },
        right: {
          title: { de: 'Professionelle Umzugsfirma', en: 'Professional Moving Company', fr: 'Entreprise de dÃ©mÃ©nagement pro', it: `Azienda di traslochi professionale` },
          points: [
            { de: 'Kompletter Service inkl. Verpackung', en: 'Complete service incl. packing', fr: 'Service complet incl. emballage', it: `Servizio completo incl. imballaggio` },
            { de: 'Transportversicherung inklusive', en: 'Transport insurance included', fr: 'Assurance transport incluse', it: `Assicurazione trasporto inclusa` },
            { de: 'Professioneller MÃ¶belschutz', en: 'Professional furniture protection', fr: 'Protection professionnelle des meubles', it: `Protezione professionale dei mobili` },
            { de: 'Erledigt in wenigen Stunden', en: 'Done in a few hours', fr: 'TerminÃ© en quelques heures', it: `Fatto in poche ore` },
          ],
          bestFor: { de: 'Empfohlen ab 2.5 Zimmer oder bei wertvollen MÃ¶beln', en: 'Recommended from 2.5 rooms or with valuable furniture', fr: 'RecommandÃ© dÃ¨s 2.5 piÃ¨ces ou avec meubles de valeur', it: `Consigliato da 2,5 locali o con arredamento di pregio` },
          price: { de: `Ab CHF ${PRICING_RULES.moving.baseRates['1']}.- (alles inklusive)`, en: `From CHF ${PRICING_RULES.moving.baseRates['1']}.- (everything included)`, fr: `DÃ¨s CHF ${PRICING_RULES.moving.baseRates['1']}.- (tout inclus)`, it: `A partire da \${PRICING_RULES.moving.baseRates['1']}.- CHF (tutto incluso)` }
        }
      },
      {
        sectionTitle: { de: 'Facility Service vs. Hauswartung', en: 'Facility Service vs. Property Maintenance', fr: 'Facility Service vs. Conciergerie', it: `Servizio della struttura e manutenzione della proprietà` },
        left: {
          title: { de: 'Facility Service', en: 'Facility Service', fr: 'Facility Service', it: `Servizio di struttura` },
          points: [
            { de: 'Ganzheitliches GebÃ¤udemanagement', en: 'Holistic building management', fr: 'Gestion globale de bÃ¢timent', it: `Gestione olistica dell'edificio` },
            { de: 'Reinigung, Technik, Sicherheit', en: 'Cleaning, technical, security', fr: 'Nettoyage, technique, sÃ©curitÃ©', it: `Pulizia, tecnica, sicurezza` },
            { de: 'FÃ¼r grosse Liegenschaften und Gewerbe', en: 'For large properties and commercial', fr: 'Pour grands immeubles et commerces', it: `Per grandi immobili e commerciali` },
            { de: 'Individuelle ServicevertrÃ¤ge', en: 'Individual service contracts', fr: 'Contrats de service individuels', it: `Contratti di servizio individuali` },
          ],
          bestFor: { de: 'Ideal fÃ¼r Verwaltungen mit mehreren Liegenschaften', en: 'Ideal for managers with multiple properties', fr: 'IdÃ©al pour gÃ©rants avec plusieurs immeubles', it: `Ideale per gestori con più proprietà` },
          price: { de: 'Individuell - auf Anfrage', en: 'Individual - upon request', fr: 'Individuel - sur demande', it: `Individuale - su richiesta` }
        },
        right: {
          title: { de: 'Hauswartung', en: 'Property Maintenance', fr: 'Conciergerie', it: `Manutenzione della proprietà` },
          points: [
            { de: 'Fokus auf Reinigung und Aussenunterhalt', en: 'Focus on cleaning and exterior maintenance', fr: 'Focus sur nettoyage et entretien extÃ©rieur', it: `Concentrarsi sulla pulizia e sulla manutenzione esterna` },
            { de: 'Winterdienst und GrÃ¼npflege', en: 'Winter service and green care', fr: 'Service hivernal et entretien des espaces verts', it: `Servizio invernale e cura del verde` },
            { de: 'FÃ¼r einzelne WohnhÃ¤user und KMU', en: 'For individual residential buildings and SMEs', fr: 'Pour immeubles rÃ©sidentiels et PME', it: `Per singoli edifici residenziali e PMI` },
            { de: 'RegelmÃ¤ssige Betreuung', en: 'Regular maintenance', fr: 'Entretien rÃ©gulier', it: `Manutenzione regolare` },
          ],
          bestFor: { de: 'Ideal fÃ¼r WohnhÃ¤user und kleine Gewerbeliegenschaften', en: 'Ideal for residential buildings and small commercial properties', fr: 'IdÃ©al pour immeubles rÃ©sidentiels et petites propriÃ©tÃ©s commerciales', it: `Ideale per edifici residenziali e piccoli immobili commerciali` },
          price: { de: `Ab CHF ${PRICING_RULES.facilityService.monthly['500']}.- / Monat`, en: `From CHF ${PRICING_RULES.facilityService.monthly['500']}.- / month`, fr: `DÃ¨s CHF ${PRICING_RULES.facilityService.monthly['500']}.- / mois`, it: `Da CHF \${PRICING_RULES.facilityService.monthly['500']}.- / mese` }
        }
      }
    ]
  },
  preparation: {
    title: { de: 'Umzugsvorbereitung - Ihre Checkliste', en: 'Moving Preparation - Your Checklist', fr: 'PrÃ©paration au DÃ©mÃ©nagement - Votre Checklist', it: `Preparazione al trasloco: la tua lista di controllo` },
    subtitle: { de: 'Schritt fÃ¼r Schritt zum stressfreien Umzug', en: 'Step by step to a stress-free move', fr: 'Ã‰tape par Ã©tape vers un dÃ©mÃ©nagement sans stress', it: `Passo dopo passo verso un trasloco senza stress` },
    steps: [
      {
        phase: { de: '4 Wochen vorher', en: '4 Weeks Before', fr: '4 Semaines Avant', it: `4 settimane prima` },
        tasks: [
          { de: 'Umzugsfirma beauftragen und Termin fixieren', en: 'Hire moving company and fix date', fr: 'Engager une entreprise de dÃ©mÃ©nagement et fixer la date', it: `Assumi una ditta di traslochi e fissa la data` },
          { de: 'Alte Wohnung kÃ¼ndigen oder Ãœbergabetermin vereinbaren', en: 'Cancel old apartment or arrange handover date', fr: 'RÃ©silier l\'ancien appartement ou convenir d\'une date de remise', it: `Disdire il vecchio appartamento o concordare la data di consegna` },
          { de: 'Umzugsreinigung buchen (mit Abnahmegarantie)', en: 'Book move-out cleaning (with handover guarantee)', fr: 'RÃ©server le nettoyage de fin de bail (avec garantie de remise)', it: `Prenotazione pulizia di trasloco (con garanzia di consegna)` },
          { de: 'AdressÃ¤nderungen vorbereiten (Post, Versicherung, Bank)', en: 'Prepare address changes (post, insurance, bank)', fr: 'PrÃ©parer les changements d\'adresse (poste, assurance, banque)', it: `Preparare i cambi di indirizzo (posta, assicurazione, banca)` },
        ]
      },
      {
        phase: { de: '1 Woche vorher', en: '1 Week Before', fr: '1 Semaine Avant', it: `1 settimana prima` },
        tasks: [
          { de: 'Nicht benÃ¶tigte GegenstÃ¤nde entsorgen oder spenden', en: 'Dispose of or donate unnecessary items', fr: 'Ã‰liminer ou donner les objets inutiles', it: `Smaltire o donare oggetti non necessari` },
          { de: 'Kartons packen und beschriften', en: 'Pack and label boxes', fr: 'Emballer et Ã©tiqueter les cartons', it: `Imballare ed etichettare le scatole` },
          { de: 'ZÃ¤hlerstÃ¤nde ablesen (Strom, Wasser, Gas)', en: 'Read meter readings (electricity, water, gas)', fr: 'Relever les compteurs (Ã©lectricitÃ©, eau, gaz)', it: `Leggere le letture dei contatori (elettricità, acqua, gas)` },
          { de: 'Parkplatzbewilligung fÃ¼r Umzugswagen organisieren', en: 'Arrange parking permit for moving truck', fr: 'Organiser un permis de stationnement pour le camion', it: `Organizzare il permesso di parcheggio per il camion in movimento` },
        ]
      },
      {
        phase: { de: 'Am Umzugstag', en: 'Moving Day', fr: 'Jour du DÃ©mÃ©nagement', it: `Giornata in movimento` },
        tasks: [
          { de: 'Wohnung vor dem Umzug fotografieren', en: 'Photograph apartment before moving', fr: 'Photographier l\'appartement avant le dÃ©mÃ©nagement', it: `Fotografa l'appartamento prima di traslocare` },
          { de: 'Umzugsteam koordinieren und einweisen', en: 'Coordinate and brief moving team', fr: 'Coordonner et briefer l\'Ã©quipe de dÃ©mÃ©nagement', it: `Coordinare e istruire la squadra in movimento` },
          { de: 'Alle RÃ¤ume auf vergessene GegenstÃ¤nde prÃ¼fen', en: 'Check all rooms for forgotten items', fr: 'VÃ©rifier toutes les piÃ¨ces pour objets oubliÃ©s', it: `Controlla tutte le stanze per verificare la presenza di oggetti dimenticati` },
          { de: 'SchlÃ¼ssel fÃ¼r Ãœbergabe bereitlegen', en: 'Prepare keys for handover', fr: 'PrÃ©parer les clÃ©s pour la remise', it: `Preparare le chiavi per la consegna` },
        ]
      },
      {
        phase: { de: 'Nach dem Umzug', en: 'After the Move', fr: 'AprÃ¨s le DÃ©mÃ©nagement', it: `Dopo il trasloco` },
        tasks: [
          { de: 'Umzugsreinigung durchfÃ¼hren lassen (Abnahmegarantie)', en: 'Have move-out cleaning done (handover guarantee)', fr: 'Faire exÃ©cuter le nettoyage de fin de bail (garantie de remise)', it: `Effettuare le pulizie di trasloco (garanzia di consegna)` },
          { de: 'WohnungsÃ¼bergabe mit Verwaltung und Protokoll', en: 'Property handover with management and protocol', fr: 'Remise de l\'appartement avec la gÃ©rance et protocole', it: `Consegna della proprietà con gestione e protocollo` },
          { de: 'Neue Wohnung einrichten und AdressÃ¤nderungen abschliessen', en: 'Set up new apartment and finalize address changes', fr: 'AmÃ©nager le nouvel appartement et finaliser les changements d\'adresse', it: `Configura il nuovo appartamento e finalizza i cambiamenti di indirizzo` },
          { de: 'Mietkaution der alten Wohnung zurÃ¼ckfordern', en: 'Reclaim rental deposit from old apartment', fr: 'RÃ©clamer la caution de l\'ancien appartement', it: `Recuperare il deposito cauzionale dal vecchio appartamento` },
        ]
      }
    ]
  },
  qaCategories: [
    {
      category: { de: 'Umzug & Kosten', en: 'Moving & Costs', fr: 'DÃ©mÃ©nagement & CoÃ»ts', it: `Trasloco e costi` },
      questions: [
        {
          q: { de: 'Was kostet ein Umzug in der Schweiz?', en: 'How much does a move cost in Switzerland?', fr: 'Combien coÃ»te un dÃ©mÃ©nagement en Suisse ?', it: `Quanto costa un trasloco in Svizzera?` },
          snippet: { de: `Ein professioneller Umzug in der Schweiz kostet je nach WohnungsgrÃ¶sse zwischen CHF ${PRICING_RULES.moving.baseRates['1']}.- und CHF ${PRICING_RULES.moving.baseRates['12']}.-. Die Preise hÃ¤ngen von Zimmerzahl, Stockwerk, Distanz und MÃ¶belmenge ab.`, en: `A professional move in Switzerland costs between CHF ${PRICING_RULES.moving.baseRates['1']} and CHF ${PRICING_RULES.moving.baseRates['12']} depending on apartment size. Prices depend on number of rooms, floor level, distance and quantity of furniture.`, fr: `Un dÃ©mÃ©nagement professionnel en Suisse coÃ»te entre CHF ${PRICING_RULES.moving.baseRates['1']}.- et CHF ${PRICING_RULES.moving.baseRates['12']}.- selon la taille de l'appartement. Les prix dÃ©pendent du nombre de piÃ¨ces, de l'Ã©tage, de la distance et de la quantitÃ© de meubles.`, it: `Un trasloco professionale in Svizzera costa tra CHF ${PRICING_RULES.moving.baseRates['1']} e CHF ${PRICING_RULES.moving.baseRates['12']} a seconda delle dimensioni dell'appartamento. I prezzi dipendono dal numero delle stanze, dal livello del pavimento, dalla distanza e dalla quantità di mobili.` },
          answer: { de: `Bei SwissCleanMove beginnen die Umzugspreise bei CHF ${PRICING_RULES.moving.baseRates['1']}.- fÃ¼r eine 1-Zimmer-Wohnung. Eine 3.5-Zimmer-Wohnung kostet ab CHF ${PRICING_RULES.moving.baseRates['3.5']}.-, ein Einfamilienhaus auf Anfrage. Im Preis inbegriffen sind ein professionelles Umzugsteam, modernes Transportfahrzeug, Transportversicherung, MÃ¶belschutz, Verpackungsmaterial sowie Be- und Entladen. ZusÃ¤tzliche Faktoren wie Stockwerk ohne Lift, besonders schwere GegenstÃ¤nde oder sehr lange Distanzen kÃ¶nnen den Preis beeinflussen. SwissCleanMove erstellt Ihnen eine kostenlose und unverbindliche Festpreisofferte nach einer persÃ¶nlichen Besichtigung oder auf Basis Ihrer Angaben.`, en: `At SwissCleanMove, moving prices start at CHF ${PRICING_RULES.moving.baseRates['1']} for a 1-room apartment. A 3.5-room apartment costs from CHF ${PRICING_RULES.moving.baseRates['3.5']}, a single-family house upon request. The price includes a professional moving team, modern transport vehicle, transport insurance, furniture protection, packing materials and loading/unloading. Additional factors such as floor without elevator, particularly heavy items or very long distances may affect the price. SwissCleanMove provides you with a free and non-binding fixed-price quote after a personal inspection or based on your details.`, fr: `Chez SwissCleanMove, les prix de dÃ©mÃ©nagement commencent Ã  CHF ${PRICING_RULES.moving.baseRates['1']}.- pour un appartement 1 piÃ¨ce. Un appartement 3.5 piÃ¨ces coÃ»te dÃ¨s CHF ${PRICING_RULES.moving.baseRates['3.5']}.-, une maison individuelle sur demande. Le prix comprend une Ã©quipe professionnelle, un vÃ©hicule de transport moderne, une assurance transport, la protection des meubles, le matÃ©riel d'emballage et le chargement/dÃ©chargement. Des facteurs supplÃ©mentaires comme l'Ã©tage sans ascenseur, des objets particuliÃ¨rement lourds ou de trÃ¨s longues distances peuvent influencer le prix. SwissCleanMove vous fournit un devis Ã  prix fixe gratuit et sans engagement.`, it: `Su SwissCleanMove, i prezzi del trasloco partono da CHF ${PRICING_RULES.moving.baseRates['1']} per un appartamento di 1 camera. Un appartamento di 3,5 locali costa da CHF ${PRICING_RULES.moving.baseRates['3.5']}, una casa unifamiliare su richiesta. Il prezzo comprende una squadra di traslochi professionale, un moderno veicolo di trasporto, un'assicurazione di trasporto, la protezione dei mobili, materiali di imballaggio e carico/scarico. Ulteriori fattori come piano senza ascensore, oggetti particolarmente pesanti o distanze molto lunghe possono influenzare il prezzo. SwissCleanMove vi offre un preventivo gratuito e non vincolante a prezzo fisso dopo un sopralluogo personale o in base ai vostri dati.` },
          links: [{ label: 'Umzug Schweiz', href: '/umzug-schweiz' }, { label: 'Umzug Biel', href: '/umzug-biel' }]
        },
        {
          q: { de: 'Wie bereitet man einen Umzug vor?', en: 'How do you prepare for a move?', fr: 'Comment prÃ©parer un dÃ©mÃ©nagement ?', it: `Come ti prepari per un trasloco?` },
          snippet: { de: 'Die Umzugsvorbereitung beginnt idealerweise 4 Wochen vor dem Umzugstermin. Wichtigste Schritte: Umzugsfirma buchen, Umzugsreinigung organisieren, AdressÃ¤nderungen einleiten und systematisch packen.', en: 'Moving preparation ideally starts 4 weeks before the move date. Most important steps: book a moving company, organize move-out cleaning, initiate address changes and pack systematically.', fr: 'La prÃ©paration du dÃ©mÃ©nagement commence idÃ©alement 4 semaines avant la date de dÃ©mÃ©nagement. Ã‰tapes les plus importantes : rÃ©server une entreprise de dÃ©mÃ©nagement, organiser le nettoyage, initier les changements d\'adresse et emballer systÃ©matiquement.', it: `La preparazione al trasloco inizia idealmente 4 settimane prima della data del trasloco. I passaggi più importanti: prenotare una ditta di traslochi, organizzare la pulizia del trasloco, avviare i cambi di indirizzo e fare le valigie in modo sistematico.` },
          answer: { de: 'Eine grÃ¼ndliche Vorbereitung spart Zeit, Geld und Nerven. Beginnen Sie 4 Wochen vorher mit der Buchung einer professionellen Umzugsfirma und der Umzugsreinigung mit Abnahmegarantie. Informieren Sie Post, Versicherungen und Bank Ã¼ber Ihre neue Adresse. Eine Woche vor dem Umzug sollten Sie systematisch Kartons packen, ZÃ¤hlerstÃ¤nde ablesen und eine Parkplatzbewilligung fÃ¼r den Umzugswagen organisieren. Am Umzugstag selbst fotografieren Sie die Wohnung fÃ¼r das Ãœbergabeprotokoll und koordinieren das Umzugsteam. Nach dem Umzug lassen Sie die professionelle Umzugsreinigung durchfÃ¼hren und erledigen die WohnungsÃ¼bergabe mit der Verwaltung. Mit SwissCleanMove kÃ¶nnen Sie Umzug, Reinigung und Entsorgung aus einer Hand buchen.', en: 'Thorough preparation saves time, money and stress. Start 4 weeks ahead by booking a professional moving company and move-out cleaning with handover guarantee. Inform the post office, insurance companies and bank of your new address. One week before the move, systematically pack boxes, read meter readings and arrange a parking permit for the moving truck. On moving day, photograph the apartment for the handover protocol and coordinate the moving team. After the move, have the professional move-out cleaning done and complete the property handover with management. With SwissCleanMove you can book moving, cleaning and disposal as a complete package.', fr: 'Une prÃ©paration minutieuse permet d\'Ã©conomiser du temps, de l\'argent et du stress. Commencez 4 semaines Ã  l\'avance en rÃ©servant une entreprise de dÃ©mÃ©nagement professionnelle et un nettoyage de fin de bail avec garantie de remise. Informez la poste, les assurances et la banque de votre nouvelle adresse. Une semaine avant le dÃ©mÃ©nagement, emballez systÃ©matiquement les cartons, relevez les compteurs et organisez un permis de stationnement pour le camion. Le jour du dÃ©mÃ©nagement, photographiez l\'appartement pour le protocole de remise et coordonnez l\'Ã©quipe. AprÃ¨s le dÃ©mÃ©nagement, faites exÃ©cuter le nettoyage professionnel et effectuez la remise avec la gÃ©rance. Avec SwissCleanMove, vous pouvez rÃ©server dÃ©mÃ©nagement, nettoyage et Ã©limination en un seul forfait.', it: `Una preparazione approfondita fa risparmiare tempo, denaro e stress. Inizia con 4 settimane di anticipo prenotando una ditta di traslochi professionale e pulizia del trasloco con garanzia di consegna. Comunica il tuo nuovo indirizzo all'ufficio postale, alle assicurazioni e alla banca. Una settimana prima del trasloco, imballate sistematicamente gli scatoloni, leggete le letture dei contatori e procuratevi un permesso di parcheggio per il camion in trasloco. Il giorno del trasloco fotografa l'appartamento per il protocollo di consegna e coordina la squadra del trasloco. Dopo il trasloco, fai eseguire la pulizia professionale e completa la consegna della proprietà con la direzione. Con SwissCleanMove potete prenotare il trasloco, la pulizia e lo smaltimento come un pacchetto completo.` },
          links: [{ label: 'Offerte anfordern', href: '/form' }]
        }
      ]
    },
    {
      category: { de: 'Umzugsreinigung & Endreinigung', en: 'Move-Out & End Cleaning', fr: 'Nettoyage de Fin de Bail', it: `Trasferimento e fine pulizia` },
      questions: [
        {
          q: { de: 'Was kostet eine Umzugsreinigung?', en: 'How much does move-out cleaning cost?', fr: 'Combien coÃ»te un nettoyage de fin de bail ?', it: `Quanto costano le pulizie di trasloco?` },
          snippet: { de: `Eine professionelle Umzugsreinigung mit Abnahmegarantie kostet in der Schweiz zwischen CHF ${PRICING_RULES.moving.baseRates['1']}.- (Studio) und CHF ${PRICING_RULES.cleaning.apartment['5']}.- (5-Zimmer-Wohnung). Bei SwissCleanMove ist die kostenlose Nachreinigung bei Beanstandungen im Preis inbegriffen.`, en: `A professional move-out cleaning with handover guarantee costs between CHF ${PRICING_RULES.moving.baseRates['1']} (studio) and CHF ${PRICING_RULES.cleaning.apartment['5']} (5-room apartment) in Switzerland. At SwissCleanMove, free re-cleaning in case of complaints is included.`, fr: `Un nettoyage de fin de bail professionnel avec garantie de remise coÃ»te entre CHF ${PRICING_RULES.moving.baseRates['1']}.- (studio) et CHF ${PRICING_RULES.cleaning.apartment['5']}.- (5 piÃ¨ces) en Suisse. Chez SwissCleanMove, le nettoyage ultÃ©rieur gratuit en cas de rÃ©clamation est inclus.`, it: `Una pulizia professionale di trasloco con garanzia di consegna costa tra CHF \${PRICING_RULES.moving.baseRates['1']} (monolocale) e CHF \${PRICING_RULES.cleaning.apartment['5']} (appartamento di 5 locali) in Svizzera. Presso SwissCleanMove è inclusa una nuova pulizia gratuita in caso di reclami.` },
          answer: { de: `Die Umzugsreinigung ist eine der wichtigsten Dienstleistungen beim Wohnungswechsel. Bei SwissCleanMove beginnen die Preise bei CHF ${PRICING_RULES.moving.baseRates['1']}.- fÃ¼r ein Studio und reichen bis CHF ${PRICING_RULES.cleaning.apartment['5']}.- fÃ¼r eine 5-Zimmer-Wohnung. HÃ¤user und Villen werden individuell kalkuliert. Im Preis inbegriffen sind: Fensterreinigung innen und aussen, Reinigung aller Storen, komplette KÃ¼chenreinigung inkl. Backofen und KÃ¼hlschrank, Entkalkung von Bad und SanitÃ¤ranlagen, Boden- und OberflÃ¤chenreinigung sowie die 100% Abnahmegarantie. Das bedeutet: Sollte die Verwaltung bei der Abnahme MÃ¤ngel feststellen, kommt SwissCleanMove kostenlos fÃ¼r eine Nachreinigung zurÃ¼ck. Dieses Versprechen gibt Ihnen volle Sicherheit fÃ¼r eine erfolgreiche WohnungsÃ¼bergabe.`, en: `Move-out cleaning is one of the most important services when changing apartments. At SwissCleanMove, prices start at CHF ${PRICING_RULES.moving.baseRates['1']} for a studio and go up to CHF ${PRICING_RULES.cleaning.apartment['5']} for a 5-room apartment. Houses and villas are calculated individually. Included in the price: interior and exterior window cleaning, cleaning of all blinds, complete kitchen cleaning incl. oven and fridge, descaling of bathroom and sanitary facilities, floor and surface cleaning and the 100% handover guarantee. This means: if the management identifies defects during the inspection, SwissCleanMove returns for a free re-cleaning. This promise gives you full security for a successful property handover.`, fr: `Le nettoyage de fin de bail est l'un des services les plus importants lors d'un changement d'appartement. Chez SwissCleanMove, les prix commencent Ã  CHF ${PRICING_RULES.moving.baseRates['1']}.- pour un studio et vont jusqu'Ã  CHF ${PRICING_RULES.cleaning.apartment['5']}.- pour un 5 piÃ¨ces. Maisons et villas sont calculÃ©es individuellement. Inclus dans le prix : nettoyage des vitres intÃ©rieur et extÃ©rieur, nettoyage de tous les stores, nettoyage complet de la cuisine incl. four et rÃ©frigÃ©rateur, dÃ©tartrage de la salle de bain et sanitaires, nettoyage des sols et surfaces et la garantie de remise Ã  100%. Cela signifie : si la gÃ©rance constate des dÃ©fauts lors de la remise, SwissCleanMove revient gratuitement pour un nettoyage ultÃ©rieur.`, it: `Le pulizie di trasloco sono uno dei servizi più importanti quando si cambia appartamento. Su SwissCleanMove, i prezzi partono da CHF \${PRICING_RULES.moving.baseRates['1']} per un monolocale e salgono a CHF \${PRICING_RULES.cleaning.apartment['5']} per un appartamento di 5 locali. Case e ville vengono calcolate individualmente. Incluso nel prezzo: pulizia delle finestre interne ed esterne, pulizia di tutte le persiane, pulizia completa della cucina incl. forno e frigorifero, decalcificazione del bagno e dei sanitari, pulizia dei pavimenti e delle superfici e garanzia di consegna al 100%. Ciò significa: se la direzione rileva difetti durante l'ispezione, SwissCleanMove ritorna per una nuova pulizia gratuita. Questa promessa ti dà piena sicurezza per una consegna immobiliare di successo.` },
          links: [{ label: 'Umzugsreinigung Schweiz', href: '/umzugsreinigung-schweiz' }, { label: 'Endreinigung Biel', href: '/endreinigung-biel' }]
        },
        {
          q: { de: 'Was bedeutet Abnahmegarantie?', en: 'What does handover guarantee mean?', fr: 'Que signifie la garantie de remise ?', it: `Cosa significa garanzia di consegna?` },
          snippet: { de: 'Die Abnahmegarantie bedeutet, dass SwissCleanMove garantiert, dass die Wohnung bei der Ãœbergabe an die Verwaltung den Reinigungsstandard erfÃ¼llt. Bei Beanstandungen wird kostenlos nachgereinigt.', en: 'The handover guarantee means that SwissCleanMove guarantees the apartment meets the cleaning standard during handover to management. Free re-cleaning is provided if there are complaints.', fr: 'La garantie de remise signifie que SwissCleanMove garantit que l\'appartement respecte les standards de propretÃ© lors de la remise Ã  la gÃ©rance. Un nettoyage ultÃ©rieur gratuit est effectuÃ© en cas de rÃ©clamation.', it: `La garanzia di consegna significa che SwissCleanMove garantisce che l'appartamento soddisfa gli standard di pulizia durante la consegna alla direzione. In caso di reclami è prevista una nuova pulizia gratuita.` },
          answer: { de: 'Die Abnahmegarantie ist ein QualitÃ¤tsversprechen von SwissCleanMove. Sie bedeutet, dass unsere professionelle Umzugsreinigung den strengen Standards entspricht, die Hausverwaltungen bei der WohnungsÃ¼bergabe verlangen. Konkret umfasst dies die vollstÃ¤ndige Reinigung aller RÃ¤ume, Fenster (innen und aussen), Storen, KÃ¼che inklusive Backofen, KÃ¼hlschrank und Abzugshaube, Bad und SanitÃ¤ranlagen sowie aller BÃ¶den und OberflÃ¤chen. Sollte die Verwaltung bei der Abnahme Beanstandungen haben, kommt unser Team kostenlos zurÃ¼ck und bessert nach. Dieses Versprechen schÃ¼tzt Sie vor Nachforderungen und gibt Ihnen die Sicherheit, dass Ihre Mietkaution nicht wegen ReinigungsmÃ¤ngeln einbehalten wird. Die Abnahmegarantie ist bei jeder Umzugsreinigung von SwissCleanMove automatisch im Preis enthalten.', en: 'The handover guarantee is a quality promise from SwissCleanMove. It means our professional move-out cleaning meets the strict standards that property managers require during apartment handover. Specifically, this includes the complete cleaning of all rooms, windows (interior and exterior), blinds, kitchen including oven, fridge and extractor hood, bathroom and sanitary facilities and all floors and surfaces. If management has complaints during the inspection, our team returns free of charge to make corrections. This promise protects you from additional claims and gives you the certainty that your rental deposit will not be withheld due to cleaning deficiencies. The handover guarantee is automatically included in the price of every SwissCleanMove move-out cleaning.', fr: 'La garantie de remise est une promesse de qualitÃ© de SwissCleanMove. Elle signifie que notre nettoyage professionnel de fin de bail respecte les standards stricts que les gÃ©rances exigent lors de la remise. Cela comprend le nettoyage complet de toutes les piÃ¨ces, fenÃªtres (intÃ©rieur et extÃ©rieur), stores, cuisine y compris four, rÃ©frigÃ©rateur et hotte, salle de bain et sanitaires ainsi que tous les sols et surfaces. Si la gÃ©rance a des rÃ©clamations lors de la remise, notre Ã©quipe revient gratuitement pour corriger. Cette promesse vous protÃ¨ge contre les rÃ©clamations et vous donne la certitude que votre caution ne sera pas retenue en raison de dÃ©fauts de nettoyage. La garantie de remise est automatiquement incluse dans le prix de chaque nettoyage de fin de bail SwissCleanMove.', it: `La garanzia di consegna è una promessa di qualità di SwissCleanMove. Ciò significa che la nostra pulizia professionale dei traslochi soddisfa i rigorosi standard richiesti dai gestori delle proprietà durante la consegna dell'appartamento. Nello specifico si tratta della pulizia completa di tutte le stanze, delle finestre (interne ed esterne), delle persiane, della cucina comprensiva di forno, frigorifero e cappa aspirante, del bagno e dei sanitari e di tutti i pavimenti e superfici. Se la direzione presenta reclami durante l'ispezione, il nostro team ritorna gratuitamente per apportare correzioni. Questa promessa vi protegge da ulteriori pretese e vi dà la certezza che la vostra cauzione d'affitto non verrà trattenuta a causa di carenze di pulizia. La garanzia di consegna è automaticamente inclusa nel prezzo di ogni pulizia di trasloco SwissCleanMove.` },
          links: [{ label: 'Reinigungsfirma Schweiz', href: '/reinigungsfirma-schweiz' }]
        },
        {
          q: { de: 'Was ist der Unterschied zwischen Endreinigung und Umzugsreinigung?', en: 'What is the difference between end cleaning and move-out cleaning?', fr: 'Quelle est la diffÃ©rence entre nettoyage final et nettoyage de fin de bail ?', it: `Qual è la differenza tra pulizia finale e pulizia trasloco?` },
          snippet: { de: 'Die Umzugsreinigung ist eine vollstÃ¤ndige Wohnungsreinigung mit Abnahmegarantie speziell fÃ¼r die WohnungsÃ¼bergabe. Die Endreinigung ist eine allgemeine Grundreinigung ohne Ãœbergabegarantie.', en: 'Move-out cleaning is a complete apartment cleaning with handover guarantee specifically for property handover. End cleaning is a general deep cleaning without handover guarantee.', fr: 'Le nettoyage de fin de bail est un nettoyage complet avec garantie de remise spÃ©cifiquement pour la remise. Le nettoyage final est un nettoyage en profondeur gÃ©nÃ©ral sans garantie.', it: `La pulizia di trasloco è una pulizia completa dell'appartamento con garanzia di consegna specifica per la consegna della proprietà. La pulizia finale è una pulizia generale profonda senza garanzia di consegna.` },
          answer: { de: 'Obwohl die Begriffe oft synonym verwendet werden, gibt es einen wichtigen Unterschied. Die Umzugsreinigung (auch Abgabereinigung genannt) ist speziell auf die Anforderungen des Schweizer Mietrechts ausgerichtet und beinhaltet die 100% Abnahmegarantie. Sie umfasst alle Bereiche, die bei einer offiziellen Wohnungsabnahme geprÃ¼ft werden: Fenster innen und aussen, Storen, KÃ¼che komplett, SanitÃ¤ranlagen und alle BÃ¶den. Bei Beanstandungen wird kostenlos nachgereinigt. Eine allgemeine Endreinigung oder Grundreinigung hingegen ist eine intensive Reinigung ohne spezifischen Bezug zur Mietrecht-Abnahme und ohne Garantie. Wenn Sie umziehen und die Wohnung der Verwaltung Ã¼bergeben mÃ¼ssen, empfehlen wir immer die Umzugsreinigung mit Abnahmegarantie - fÃ¼r Ihre Sicherheit und fÃ¼r einen stressfreien Auszug.', en: 'Although the terms are often used interchangeably, there is an important difference. Move-out cleaning (also called handover cleaning) is specifically tailored to Swiss tenancy law requirements and includes the 100% handover guarantee. It covers all areas checked during an official apartment inspection: windows inside and outside, blinds, complete kitchen, sanitary facilities and all floors. Free re-cleaning is provided if there are complaints. A general end cleaning or deep cleaning, on the other hand, is an intensive cleaning without specific reference to tenancy law inspection and without guarantee. When moving and handing over the apartment to management, we always recommend move-out cleaning with handover guarantee - for your security and a stress-free move-out.', fr: 'Bien que les termes soient souvent utilisÃ©s de maniÃ¨re interchangeable, il existe une diffÃ©rence importante. Le nettoyage de fin de bail est spÃ©cifiquement adaptÃ© aux exigences du droit du bail suisse et inclut la garantie de remise Ã  100%. Il couvre tous les domaines vÃ©rifiÃ©s lors d\'une inspection officielle : fenÃªtres intÃ©rieur et extÃ©rieur, stores, cuisine complÃ¨te, sanitaires et tous les sols. Un nettoyage ultÃ©rieur gratuit est effectuÃ© en cas de rÃ©clamation. Un nettoyage final ou nettoyage en profondeur gÃ©nÃ©ral est un nettoyage intensif sans rÃ©fÃ©rence spÃ©cifique au droit du bail et sans garantie. Lors d\'un dÃ©mÃ©nagement et de la remise de l\'appartement Ã  la gÃ©rance, nous recommandons toujours le nettoyage de fin de bail avec garantie de remise.', it: `Sebbene i termini siano spesso usati in modo intercambiabile, esiste una differenza importante. La pulizia di trasloco (chiamata anche pulizia di riconsegna) è specificatamente adattata ai requisiti del diritto svizzero sulla locazione e comprende la garanzia di consegna al 100%. Copre tutte le aree controllate durante un'ispezione ufficiale dell'appartamento: finestre interne ed esterne, persiane, cucina completa, servizi igienici e tutti i pavimenti. In caso di reclami è prevista una nuova pulizia gratuita. La pulizia finale generale o pulizia profonda è invece una pulizia intensiva senza riferimento specifico al controllo del diritto di locazione e senza garanzia. In caso di trasloco e di consegna dell'appartamento alla direzione, consigliamo sempre la pulizia di trasloco con garanzia di consegna - per la vostra sicurezza e per un trasloco senza stress.` },
          links: [{ label: 'Endreinigung Biel', href: '/endreinigung-biel' }, { label: 'Umzugsreinigung Schweiz', href: '/umzugsreinigung-schweiz' }]
        }
      ]
    },
    {
      category: { de: 'Haushaltshilfe & Putzfrau', en: 'Household Help & Cleaning Lady', fr: 'Aide MÃ©nagÃ¨re & Femme de MÃ©nage', it: `Aiuto domestico e donna delle pulizie` },
      questions: [
        {
          q: { de: 'Was kostet eine Haushaltshilfe?', en: 'How much does a household helper cost?', fr: 'Combien coÃ»te une aide mÃ©nagÃ¨re ?', it: `Quanto costa un aiuto domestico?` },
          snippet: { de: `Eine professionelle Haushaltshilfe kostet bei SwissCleanMove ab CHF ${PRICING_RULES.household.regular}.- pro Stunde bei wÃ¶chentlichen EinsÃ¤tzen. Einmalige EinsÃ¤tze beginnen ab CHF ${PRICING_RULES.household.oneTime}.- pro Stunde. Mindestauftrag: CHF ${PRICING_RULES.household.minOrder}.-.`, en: `A professional household helper costs from CHF ${PRICING_RULES.household.regular} per hour for weekly appointments at SwissCleanMove. One-time appointments start from CHF ${PRICING_RULES.household.oneTime} per hour. Minimum order: CHF ${PRICING_RULES.household.minOrder}.`, fr: `Une aide mÃ©nagÃ¨re professionnelle coÃ»te dÃ¨s CHF ${PRICING_RULES.household.regular}.- par heure pour les interventions hebdomadaires chez SwissCleanMove. Les interventions ponctuelles commencent Ã  CHF ${PRICING_RULES.household.oneTime}.- par heure. Commande minimum : CHF ${PRICING_RULES.household.minOrder}.-.`, it: `Un aiutante domestico professionista costa da CHF \${PRICING_RULES.household.regular} all'ora per appuntamenti settimanali presso SwissCleanMove. Gli appuntamenti una tantum partono da CHF \${PRICING_RULES.household.oneTime} all'ora. Ordine minimo: CHF \${PRICING_RULES.household.minOrder}.` },
          answer: { de: `SwissCleanMove bietet professionelle Haushaltshilfe fÃ¼r Privathaushalte, Familien, Senioren und BerufstÃ¤tige. Bei regelmÃ¤ssigen wÃ¶chentlichen EinsÃ¤tzen liegt der Preis bei CHF ${PRICING_RULES.household.regular}.- pro Stunde. Haushaltshilfe im 14-tÃ¤gigen Rhythmus kostet CHF ${PRICING_RULES.household.fourteenDays}.- pro Stunde, einmalige EinsÃ¤tze CHF ${PRICING_RULES.household.oneTime}.- pro Stunde. Unsere Premium Haushaltshilfe (CHF ${PRICING_RULES.household.premium}.- / Stunde) bietet zusÃ¤tzliche Leistungen wie Grundreinigung und spezielle WÃ¼nsche. Im Service enthalten sind Staubsaugen, Bodenreinigung, KÃ¼chen- und Badreinigung, Abstauben, Betten beziehen, WÃ¤sche waschen und auf Wunsch BÃ¼gelservice. Alle unsere Haushaltshilfen sind versichert, geschult und arbeiten nach Schweizer QualitÃ¤tsstandards. Der Mindestauftrag betrÃ¤gt CHF ${PRICING_RULES.household.minOrder}.-.`, en: `SwissCleanMove offers professional household help for private households, families, seniors and busy professionals. For regular weekly appointments, the price is CHF ${PRICING_RULES.household.regular} per hour. Household help every two weeks costs CHF ${PRICING_RULES.household.fourteenDays} per hour, one-time appointments CHF ${PRICING_RULES.household.oneTime} per hour. Our premium household help (CHF ${PRICING_RULES.household.premium} / hour) offers additional services like deep cleaning and special requests. Services include vacuuming, floor cleaning, kitchen and bathroom cleaning, dusting, bed making, laundry washing and ironing on request. All our household helpers are insured, trained and work according to Swiss quality standards. Minimum order is CHF ${PRICING_RULES.household.minOrder}.`, fr: `SwissCleanMove propose une aide mÃ©nagÃ¨re professionnelle pour les mÃ©nages privÃ©s, familles, personnes Ã¢gÃ©es et professionnels. Pour les interventions hebdomadaires rÃ©guliÃ¨res, le prix est de CHF ${PRICING_RULES.household.regular}.- par heure. L'aide mÃ©nagÃ¨re toutes les deux semaines coÃ»te CHF ${PRICING_RULES.household.fourteenDays}.- par heure, les interventions ponctuelles CHF ${PRICING_RULES.household.oneTime}.- par heure. Notre aide mÃ©nagÃ¨re premium (CHF ${PRICING_RULES.household.premium}.- / heure) offre des prestations supplÃ©mentaires. Les services incluent l'aspirateur, nettoyage des sols, cuisine et salle de bain, dÃ©poussiÃ©rage, lits, lessive et repassage sur demande. Toutes nos aides mÃ©nagÃ¨res sont assurÃ©es, formÃ©es et travaillent selon les standards suisses. Commande minimum : CHF ${PRICING_RULES.household.minOrder}.-.`, it: `SwissCleanMove offre un aiuto domestico professionale per nuclei familiari, famiglie, anziani e professionisti impegnati. Per gli appuntamenti settimanali regolari, il prezzo è di CHF \${PRICING_RULES.household.regular} all'ora. L'aiuto domestico ogni due settimane costa CHF \${PRICING_RULES.household.fourteenDays} all'ora, appuntamenti una tantum CHF \${PRICING_RULES.household.oneTime} all'ora. Il nostro aiuto domestico premium (CHF \${PRICING_RULES.household.premium} / ora) offre servizi aggiuntivi come pulizie approfondite e richieste speciali. I servizi comprendono l'aspirazione, la pulizia dei pavimenti, la pulizia della cucina e del bagno, spolveratura, rifacimento dei letti, lavaggio della biancheria e stiratura su richiesta. Tutti i nostri collaboratori domestici sono assicurati, formati e lavorano secondo gli standard di qualità svizzeri. L'ordine minimo è di CHF \${PRICING_RULES.household.minOrder}.` },
          links: [{ label: 'Haushaltshilfe Biel', href: '/haushaltshilfe-biel' }]
        },
        {
          q: { de: 'Wie viel kostet eine Putzfrau pro Stunde?', en: 'How much does a cleaning lady cost per hour?', fr: 'Combien coÃ»te une femme de mÃ©nage par heure ?', it: `Quanto costa all'ora una donna delle pulizie?` },
          snippet: { de: `Eine professionelle Putzfrau kostet in der Schweiz durchschnittlich CHF 35 - CHF 55 pro Stunde. Bei SwissCleanMove beginnen die Preise bei CHF ${PRICING_RULES.household.regular}.- pro Stunde - versichert und mit Schweizer QualitÃ¤tsstandard.`, en: `A professional cleaning lady in Switzerland costs on average CHF 35 - CHF 55 per hour. At SwissCleanMove, prices start at CHF ${PRICING_RULES.household.regular} per hour - insured and with Swiss quality standards.`, fr: `Une femme de mÃ©nage professionnelle en Suisse coÃ»te en moyenne CHF 35 - CHF 55 par heure. Chez SwissCleanMove, les prix commencent Ã  CHF ${PRICING_RULES.household.regular}.- par heure - assurÃ©e et avec des standards de qualitÃ© suisses.`, it: `Una donna delle pulizie professionista in Svizzera costa in media dai 35 ai 55 franchi l'ora. Su SwissCleanMove i prezzi partono da CHF \${PRICING_RULES.household.regular} l'ora - assicurati e con standard di qualità svizzeri.` },
          answer: { de: `Der Stundensatz fÃ¼r eine Putzfrau in der Schweiz variiert stark. Privat engagierte ReinigungskrÃ¤fte ohne Versicherung kosten oft CHF 25 - CHF 35 pro Stunde, bergen aber Risiken bei SchÃ¤den oder UnfÃ¤llen. Professionelle Reinigungsfirmen berechnen CHF 35 - CHF 55 pro Stunde, bieten dafÃ¼r aber Versicherungsschutz, geschultes Personal und garantierte QualitÃ¤t. Bei SwissCleanMove zahlen Sie ab CHF ${PRICING_RULES.household.regular}.- pro Stunde fÃ¼r regelmÃ¤ssige EinsÃ¤tze. Unsere ReinigungskrÃ¤fte sind vollstÃ¤ndig versichert, professionell geschult und verwenden umweltfreundliche Reinigungsmittel. Im Unterschied zu privat angestellten Putzfrauen Ã¼bernehmen wir die komplette Abwicklung inkl. Ersatz bei Krankheit und QualitÃ¤tskontrolle.`, en: `The hourly rate for a cleaning lady in Switzerland varies widely. Privately hired cleaners without insurance often cost CHF 25 - CHF 35 per hour, but carry risks regarding damage or accidents. Professional cleaning companies charge CHF 35 - CHF 55 per hour but offer insurance coverage, trained staff and guaranteed quality. At SwissCleanMove you pay from CHF ${PRICING_RULES.household.regular} per hour for regular appointments. Our cleaning staff are fully insured, professionally trained and use environmentally friendly cleaning products. Unlike privately employed cleaners, we handle the complete administration including replacement in case of illness and quality control.`, fr: `Le tarif horaire pour une femme de mÃ©nage en Suisse varie considÃ©rablement. Les personnes de mÃ©nage engagÃ©es privÃ©ment sans assurance coÃ»tent souvent CHF 25 - CHF 35 par heure, mais comportent des risques en cas de dommages ou accidents. Les entreprises de nettoyage professionnelles facturent CHF 35 - CHF 55 par heure mais offrent une couverture d'assurance, du personnel formÃ© et une qualitÃ© garantie. Chez SwissCleanMove, vous payez dÃ¨s CHF ${PRICING_RULES.household.regular}.- par heure pour les interventions rÃ©guliÃ¨res. Notre personnel est entiÃ¨rement assurÃ©, formÃ© professionnellement et utilise des produits Ã©cologiques.`, it: `La tariffa oraria per una donna delle pulizie in Svizzera varia notevolmente. Gli addetti alle pulizie assunti privatamente senza assicurazione costano spesso dai 25 ai 35 franchi l'ora, ma comportano rischi di danni o incidenti. Le imprese di pulizia professionali addebitano dai 35 ai 55 franchi l'ora ma offrono copertura assicurativa, personale qualificato e qualità garantita. Su SwissCleanMove paghi da CHF \${PRICING_RULES.household.regular} all'ora per appuntamenti regolari. Il nostro personale addetto alle pulizie è completamente assicurato, formato professionalmente e utilizza prodotti per la pulizia rispettosi dell'ambiente. A differenza degli addetti alle pulizie privati, ci occupiamo dell'intera amministrazione, compresa la sostituzione in caso di malattia e il controllo di qualità.` },
          links: [{ label: 'Haushaltshilfe Biel', href: '/haushaltshilfe-biel' }]
        }
      ]
    },
    {
      category: { de: 'Facility Service & Hauswartung', en: 'Facility Service & Maintenance', fr: 'Facility Service & Conciergerie', it: `Assistenza e manutenzione della struttura` },
      questions: [
        {
          q: { de: 'Was kostet Facility Service in der Schweiz?', en: 'How much does facility service cost in Switzerland?', fr: 'Combien coÃ»te le facility service en Suisse ?', it: `Quanto costa il servizio facility in Svizzera?` },
          snippet: { de: `Facility Service wird individuell kalkuliert und richtet sich nach ObjektgrÃ¶sse, Leistungsumfang und EinsatzhÃ¤ufigkeit. Unterhaltsreinigung beginnt ab CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.- / Stunde, umfassende Hauswartung ab CHF ${PRICING_RULES.facilityService.monthly['500']}.- / Monat.`, en: `Facility service is individually calculated based on property size, scope of services and frequency. Maintenance cleaning starts from CHF ${PRICING_RULES.maintenance.hourlyRates.residential} / hour, comprehensive property maintenance from CHF ${PRICING_RULES.facilityService.monthly['500']} / month.`, fr: `Le facility service est calculÃ© individuellement selon la taille de la propriÃ©tÃ©, l'Ã©tendue des services et la frÃ©quence. Le nettoyage d'entretien commence dÃ¨s CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.- / heure, la conciergerie complÃ¨te dÃ¨s CHF ${PRICING_RULES.facilityService.monthly['500']}.- / mois.`, it: `Il servizio della struttura viene calcolato individualmente in base alle dimensioni della proprietà, alla portata dei servizi e alla frequenza. La pulizia di manutenzione inizia da CHF \${PRICING_RULES.maintenance.hourlyRates.residential} / ora, la manutenzione completa della proprietà da CHF \${PRICING_RULES.facilityService.monthly['500']} / mese.` },
          answer: { de: `Der Facility Service von SwissCleanMove umfasst ein ganzheitliches GebÃ¤udemanagement: Reinigung, Hauswartung, Aussenunterhalt, Winterdienst, GrÃ¼npflege und technische Betreuung. Die Kosten werden individuell auf Basis von ObjektgrÃ¶sse, gewÃ¼nschtem Leistungsumfang und EinsatzhÃ¤ufigkeit berechnet. FÃ¼r die reine Unterhaltsreinigung (TreppenhÃ¤user, GemeinschaftsrÃ¤ume) beginnen die Preise ab CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.- pro Stunde. Umfassende Hauswartungspakete mit regelmÃ¤ssiger GebÃ¤udebetreuung starten ab CHF ${PRICING_RULES.facilityService.monthly['500']}.- pro Monat. SwissCleanMove betreut Verwaltungen, Gewerbebetriebe und Liegenschaftsbesitzer in der ganzen Schweiz und erstellt massgeschneiderte ServicevertrÃ¤ge.`, en: `SwissCleanMove's facility service includes holistic building management: cleaning, property maintenance, exterior upkeep, winter service, green care and technical support. Costs are individually calculated based on property size, desired scope of services and frequency. For maintenance cleaning only (stairwells, common areas), prices start from CHF ${PRICING_RULES.maintenance.hourlyRates.residential} per hour. Comprehensive property maintenance packages with regular building care start from CHF ${PRICING_RULES.facilityService.monthly['500']} per month. SwissCleanMove serves property managers, businesses and property owners throughout Switzerland with tailored service contracts.`, fr: `Le facility service de SwissCleanMove comprend une gestion globale de bÃ¢timent : nettoyage, conciergerie, entretien extÃ©rieur, service hivernal, entretien des espaces verts et support technique. Les coÃ»ts sont calculÃ©s individuellement selon la taille de la propriÃ©tÃ©, l'Ã©tendue souhaitÃ©e des services et la frÃ©quence. Pour le nettoyage d'entretien seul (cages d'escalier, espaces communs), les prix commencent dÃ¨s CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.- par heure. Les forfaits de conciergerie complets avec entretien rÃ©gulier commencent dÃ¨s CHF ${PRICING_RULES.facilityService.monthly['500']}.- par mois.`, it: `Il servizio per le strutture di SwissCleanMove comprende la gestione olistica degli edifici: pulizia, manutenzione della proprietà, manutenzione degli esterni, servizio invernale, cura del verde e supporto tecnico. I costi vengono calcolati individualmente in base alle dimensioni della proprietà, alla portata dei servizi desiderati e alla frequenza. Solo per le pulizie di manutenzione (scale, aree comuni), i prezzi partono da CHF \${PRICING_RULES.maintenance.hourlyRates.residential} all'ora. I pacchetti completi di manutenzione della proprietà con cura regolare dell'edificio partono da CHF \${PRICING_RULES.facilityService.monthly['500']} al mese. SwissCleanMove serve gestori immobiliari, aziende e proprietari immobiliari in tutta la Svizzera con contratti di servizio su misura.` },
          links: [{ label: 'Facility Service Schweiz', href: '/facility-service-schweiz' }, { label: 'Hauswartung Schweiz', href: '/hauswartung-schweiz' }]
        },
        {
          q: { de: 'Was kostet eine Unterhaltsreinigung?', en: 'How much does maintenance cleaning cost?', fr: 'Combien coÃ»te un nettoyage d\'entretien ?', it: `Quanto costa la pulizia di manutenzione?` },
          snippet: { de: `Unterhaltsreinigung kostet bei SwissCleanMove ab CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.- pro Stunde. Die Kosten richten sich nach ObjektgrÃ¶sse, Reinigungsumfang und -hÃ¤ufigkeit.`, en: `Maintenance cleaning costs from CHF ${PRICING_RULES.maintenance.hourlyRates.residential} per hour at SwissCleanMove. Costs depend on property size, cleaning scope and frequency.`, fr: `Le nettoyage d'entretien coÃ»te dÃ¨s CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.- par heure chez SwissCleanMove. Les coÃ»ts dÃ©pendent de la taille de la propriÃ©tÃ©, de l'Ã©tendue et de la frÃ©quence du nettoyage.`, it: `Costi di pulizia di manutenzione a partire da CHF \${PRICING_RULES.maintenance.hourlyRates.residential} all'ora presso SwissCleanMove. I costi dipendono dalle dimensioni della proprietà, dall’ambito della pulizia e dalla frequenza.` },
          answer: { de: `Die Unterhaltsreinigung umfasst die regelmÃ¤ssige Reinigung von TreppenhÃ¤usern, Eingangsbereichen, GemeinschaftsrÃ¤umen und gewerblichen Objekten. Bei SwissCleanMove beginnt der Preis bei CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.- pro Stunde. Die Gesamtkosten hÃ¤ngen von der GrÃ¶sse des Objekts, dem gewÃ¼nschten Reinigungsumfang und der HÃ¤ufigkeit der EinsÃ¤tze ab. Ein typisches Wohnhaus mit 10 Wohneinheiten und wÃ¶chentlicher Treppenhausreinigung kann beispielsweise CHF 200 - CHF 400 pro Monat kosten. SwissCleanMove erstellt individuelle Angebote nach einer Objektbesichtigung. Unsere ReinigungskrÃ¤fte arbeiten nach einem festgelegten Reinigungsplan und garantieren gleichbleibend hohe QualitÃ¤t.`, en: `Maintenance cleaning covers the regular cleaning of stairwells, entrance areas, common rooms and commercial properties. At SwissCleanMove, the price starts from CHF ${PRICING_RULES.maintenance.hourlyRates.residential} per hour. Total costs depend on the property size, desired cleaning scope and frequency of service. A typical residential building with 10 units and weekly stairwell cleaning may cost CHF 200 - CHF 400 per month. SwissCleanMove creates individual offers after a property inspection. Our cleaning staff work according to a fixed schedule and guarantee consistently high quality.`, fr: `Le nettoyage d'entretien couvre le nettoyage rÃ©gulier des cages d'escalier, entrÃ©es, espaces communs et locaux commerciaux. Chez SwissCleanMove, le prix commence dÃ¨s CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.- par heure. Les coÃ»ts totaux dÃ©pendent de la taille de la propriÃ©tÃ©, de l'Ã©tendue souhaitÃ©e et de la frÃ©quence. Un immeuble rÃ©sidentiel typique de 10 unitÃ©s avec nettoyage hebdomadaire peut coÃ»ter CHF 200 - CHF 400 par mois.`, it: `La pulizia di manutenzione comprende la pulizia ordinaria delle scale, degli ingressi, delle sale comuni e degli immobili commerciali. Su SwissCleanMove, il prezzo parte da CHF \${PRICING_RULES.maintenance.hourlyRates.residential} all'ora. I costi totali dipendono dalle dimensioni della proprietà, dall'entità della pulizia desiderata e dalla frequenza del servizio. Una tipica palazzina residenziale con 10 unità abitative e pulizia settimanale delle scale può costare dai 200 ai 400 franchi al mese. SwissCleanMove crea offerte individuali dopo un'ispezione dell'immobile. Il nostro personale addetto alle pulizie lavora secondo un programma fisso e garantisce una qualità costantemente elevata.` },
          links: [{ label: 'Unterhaltsreinigung Biel', href: '/unterhaltsreinigung-biel' }]
        }
      ]
    },
    {
      category: { de: 'Entsorgung & RÃ¤umung', en: 'Disposal & Clearance', fr: 'Ã‰limination & DÃ©barras', it: `Smaltimento e liquidazione` },
      questions: [
        {
          q: { de: 'Was kostet eine WohnungsrÃ¤umung?', en: 'How much does apartment clearance cost?', fr: 'Combien coÃ»te un dÃ©barras d\'appartement ?', it: `Quanto costa lo sgombero dell'appartamento?` },
          snippet: { de: `Eine professionelle WohnungsrÃ¤umung kostet bei SwissCleanMove ab CHF ${PRICING_RULES.disposal.volumePricing['10']}.-. Kleinere Entsorgungen beginnen ab CHF ${PRICING_RULES.disposal.volumePricing['1']}.-, HausrÃ¤umungen ab CHF ${PRICING_RULES.disposal.volumePricing['20']}.-.`, en: `Professional apartment clearance costs from CHF ${PRICING_RULES.disposal.volumePricing['10']} at SwissCleanMove. Smaller disposals start from CHF ${PRICING_RULES.disposal.volumePricing['1']}, house clearances from CHF ${PRICING_RULES.disposal.volumePricing['20']}.`, fr: `Un dÃ©barras d'appartement professionnel coÃ»te dÃ¨s CHF ${PRICING_RULES.disposal.volumePricing['10']}.- chez SwissCleanMove. Les petites Ã©liminations commencent dÃ¨s CHF ${PRICING_RULES.disposal.volumePricing['1']}.-, les dÃ©barras de maison dÃ¨s CHF ${PRICING_RULES.disposal.volumePricing['20']}.-.`, it: `Costi di sgombero professionale dell'appartamento da CHF \${PRICING_RULES.disposal.volumePricing['10']} presso SwissCleanMove. Le cessioni più piccole partono da CHF \${PRICING_RULES.disposal.volumePricing['1']}, le liquidazioni domestiche da CHF \${PRICING_RULES.disposal.volumePricing['20']}.` },
          answer: { de: `SwissCleanMove bietet professionelle Entsorgung und RÃ¤umung in der ganzen Schweiz. Eine vollstÃ¤ndige WohnungsrÃ¤umung kostet ab CHF ${PRICING_RULES.disposal.volumePricing['10']}.- und umfasst das AusrÃ¤umen aller MÃ¶bel, GegenstÃ¤nde und Abfall, die fachgerechte Entsorgung nach Schweizer Standards, Recycling wiederverwertbarer Materialien, Verladung und Abtransport sowie eine besenreine Ãœbergabe. FÃ¼r kleinere Entsorgungen (ab CHF ${PRICING_RULES.disposal.volumePricing['1']}.-) und Keller- oder EstrichrÃ¤umungen (ab CHF ${PRICING_RULES.disposal.volumePricing['5']}.-) bieten wir ebenfalls flexible LÃ¶sungen. HausrÃ¤umungen und GeschÃ¤ftsauflÃ¶sungen werden individuell kalkuliert. Alle Entsorgungen erfolgen umweltgerecht und nach den geltenden Vorschriften.`, en: `SwissCleanMove offers professional disposal and clearance throughout Switzerland. A complete apartment clearance costs from CHF ${PRICING_RULES.disposal.volumePricing['10']} and includes clearing all furniture, items and waste, professional disposal according to Swiss standards, recycling of reusable materials, loading and transport and a swept-clean handover. For smaller disposals (from CHF ${PRICING_RULES.disposal.volumePricing['1']}) and basement or attic clearances (from CHF ${PRICING_RULES.disposal.volumePricing['5']}), we also offer flexible solutions. House clearances and business liquidations are calculated individually. All disposals are carried out in an environmentally friendly manner and according to applicable regulations.`, fr: `SwissCleanMove propose l'Ã©limination et le dÃ©barras professionnels dans toute la Suisse. Un dÃ©barras d'appartement complet coÃ»te dÃ¨s CHF ${PRICING_RULES.disposal.volumePricing['10']}.- et comprend le vidage de tous les meubles, objets et dÃ©chets, l'Ã©limination professionnelle selon les normes suisses, le recyclage des matÃ©riaux rÃ©utilisables, le chargement et transport et une remise balayÃ©e. Pour les petites Ã©liminations (dÃ¨s CHF ${PRICING_RULES.disposal.volumePricing['1']}.-) et les dÃ©barras de cave ou grenier (dÃ¨s CHF ${PRICING_RULES.disposal.volumePricing['5']}.-), nous proposons Ã©galement des solutions flexibles.`, it: `SwissCleanMove offre smaltimento e sgombero professionali in tutta la Svizzera. Lo sgombero completo dell'appartamento costa da CHF \${PRICING_RULES.disposal.volumePricing['10']} e comprende lo sgombero di tutti i mobili, oggetti e rifiuti, lo smaltimento professionale secondo gli standard svizzeri, il riciclaggio dei materiali riutilizzabili, il carico e il trasporto e una consegna pulita. Per le cessioni più piccole (a partire da CHF \${PRICING_RULES.disposal.volumePricing['1']}) e per gli sgomberi di scantinati o mansarde (a partire da CHF \${PRICING_RULES.disposal.volumePricing['5']}), offriamo anche soluzioni flessibili. Le liquidazioni immobiliari e le liquidazioni aziendali vengono calcolate individualmente. Tutti gli smaltimenti vengono effettuati nel rispetto dell'ambiente e secondo le normative vigenti.` },
          links: [{ label: 'Entsorgung Biel', href: '/entsorgung-biel' }]
        }
      ]
    },
    {
      category: { de: 'Service & Vertrauen', en: 'Service & Trust', fr: 'Service & Confiance', it: `Servizio e fiducia` },
      questions: [
        {
          q: { de: 'Welche Regionen betreut SwissCleanMove?', en: 'Which regions does SwissCleanMove serve?', fr: 'Quelles rÃ©gions SwissCleanMove dessert-il ?', it: `Quali regioni serve SwissCleanMove?` },
          snippet: { de: 'SwissCleanMove ist schweizweit tÃ¤tig mit Fokus auf die Regionen Biel/Bienne, Seeland, Bern, Solothurn, Basel, ZÃ¼rich, Fribourg, NeuchÃ¢tel und weitere Kantone.', en: 'SwissCleanMove operates Switzerland-wide with focus on Biel/Bienne, Seeland, Bern, Solothurn, Basel, Zurich, Fribourg, NeuchÃ¢tel and other cantons.', fr: 'SwissCleanMove opÃ¨re dans toute la Suisse avec un focus sur Bienne, Seeland, Berne, Soleure, BÃ¢le, Zurich, Fribourg, NeuchÃ¢tel et d\'autres cantons.', it: `SwissCleanMove opera in tutta la Svizzera con particolare attenzione a Biel/Bienne, Seeland, Berna, Soletta, Basilea, Zurigo, Friburgo, Neuchâtel e altri cantoni.` },
          answer: { de: 'SwissCleanMove bietet alle Dienstleistungen - Umzug, Umzugsreinigung, Haushaltshilfe, Facility Service, Hauswartung und Entsorgung - schweizweit an. Unser Hauptstandort ist in Biel/Bienne (Orpundstrasse 31, 2504 Biel). Von dort bedienen wir besonders intensiv das Seeland (Nidau, BrÃ¼gg, Ipsach, Lyss, Aarberg, Pieterlen) sowie die Kantone Bern, Solothurn, Basel, ZÃ¼rich, Aargau, Fribourg, NeuchÃ¢tel, Luzern, St. Gallen, Thurgau, Schwyz, Zug, Jura, Genf, Lausanne/Waadt und Wallis/Valais. FÃ¼r jeden Standort passen wir unsere Dienstleistungen an die regionalen Anforderungen an und bieten lokale Ansprechpartner.', en: 'SwissCleanMove offers all services - moving, move-out cleaning, household help, facility service, property maintenance and disposal - throughout Switzerland. Our headquarters is in Biel/Bienne (Orpundstrasse 31, 2504 Biel). From there we intensively serve the Seeland region (Nidau, BrÃ¼gg, Ipsach, Lyss, Aarberg, Pieterlen) as well as the cantons of Bern, Solothurn, Basel, Zurich, Aargau, Fribourg, NeuchÃ¢tel, Lucerne, St. Gallen, Thurgau, Schwyz, Zug, Jura, Geneva, Lausanne/Vaud and Wallis/Valais. For each location we adapt our services to regional requirements and provide local contacts.', fr: 'SwissCleanMove propose tous les services - dÃ©mÃ©nagement, nettoyage de fin de bail, aide mÃ©nagÃ¨re, facility service, conciergerie et Ã©limination - dans toute la Suisse. Notre siÃ¨ge est Ã  Bienne (Orpundstrasse 31, 2504 Biel). De lÃ , nous desservons intensivement le Seeland (Nidau, BrÃ¼gg, Ipsach, Lyss, Aarberg, Pieterlen) ainsi que les cantons de Berne, Soleure, BÃ¢le, Zurich, Argovie, Fribourg, NeuchÃ¢tel, Lucerne, Saint-Gall, Thurgovie, Schwyz, Zoug, Jura, GenÃ¨ve, Lausanne/Vaud et Valais.', it: `SwissCleanMove offre tutti i servizi - traslochi, pulizie di trasloco, aiuto domestico, servizi per strutture, manutenzione e smaltimento di immobili - in tutta la Svizzera. La nostra sede è a Bienne/Bienne (Orpundstrasse 31, 2504 Bienne). Da lì serviamo intensamente la regione del Seeland (Nidau, Brügg, Ipsach, Lyss, Aarberg, Pieterlen) nonché i cantoni di Berna, Soletta, Basilea, Zurigo, Argovia, Friburgo, Neuchâtel, Lucerna, San Gallo, Turgovia, Svitto, Zugo, Giura, Ginevra, Losanna/Vaud e Vallese/Vallese. Per ogni località adattiamo i nostri servizi ai requisiti regionali e forniamo contatti locali.` },
          links: [{ label: 'Alle Regionen', href: '/regions' }]
        }
      ]
    }
  ],
  eeat: {
    title: { de: 'Warum SwissCleanMove vertrauen?', en: 'Why Trust SwissCleanMove?', fr: 'Pourquoi Faire Confiance Ã  SwissCleanMove ?', it: `Perché affidarsi a SwissCleanMove?` },
    items: [
      { icon: 'Shield', title: { de: 'Versicherte Leistungen', en: 'Insured Services', fr: 'Services AssurÃ©s', it: `Servizi assicurati` }, desc: { de: 'Alle UmzÃ¼ge und Reinigungen sind vollstÃ¤ndig versichert. Ihre MÃ¶bel und Ihr Eigentum sind bei uns in sicheren HÃ¤nden.', en: 'All moves and cleanings are fully insured. Your furniture and property are in safe hands with us.', fr: 'Tous les dÃ©mÃ©nagements et nettoyages sont entiÃ¨rement assurÃ©s. Vos meubles et vos biens sont entre de bonnes mains.', it: `Tutti i traslochi e le pulizie sono completamente assicurati. Con noi i tuoi mobili e i tuoi beni sono in buone mani.` } },
      { icon: 'Users', title: { de: 'Geschulte Teams', en: 'Trained Teams', fr: 'Ã‰quipes FormÃ©es', it: `Squadre addestrate` }, desc: { de: 'Unsere Mitarbeiter werden professionell geschult und arbeiten nach Schweizer QualitÃ¤tsstandards. RegelmÃ¤ssige Weiterbildung sichert gleichbleibend hohe QualitÃ¤t.', en: 'Our staff are professionally trained and work according to Swiss quality standards. Regular training ensures consistently high quality.', fr: 'Notre personnel est formÃ© professionnellement et travaille selon les standards de qualitÃ© suisses. Une formation continue garantit une qualitÃ© constamment Ã©levÃ©e.', it: `Il nostro personale è formato professionalmente e lavora secondo gli standard di qualità svizzeri. La formazione regolare garantisce una qualità costantemente elevata.` } },
      { icon: 'CheckCircle', title: { de: '100% Abnahmegarantie', en: '100% Handover Guarantee', fr: 'Garantie de Remise 100%', it: `Garanzia di consegna al 100%.` }, desc: { de: 'Bei jeder Umzugsreinigung garantieren wir die erfolgreiche Wohnungsabnahme. Kostenlose Nachreinigung bei Beanstandungen.', en: 'We guarantee successful apartment handover with every move-out cleaning. Free re-cleaning in case of complaints.', fr: 'Nous garantissons la remise rÃ©ussie de l\'appartement avec chaque nettoyage. Nettoyage ultÃ©rieur gratuit en cas de rÃ©clamation.', it: `Garantiamo la corretta consegna dell'appartamento ad ogni pulizia di trasloco. Ripulitura gratuita in caso di reclami.` } },
      { icon: 'Clock', title: { de: 'Schnelle Terminvergabe', en: 'Fast Scheduling', fr: 'Planification Rapide', it: `Pianificazione veloce` }, desc: { de: 'Flexible und schnelle Terminvergabe - auch kurzfristig. Wir passen uns Ihrem Zeitplan an und sind auch am Wochenende verfÃ¼gbar.', en: 'Flexible and fast scheduling - even on short notice. We adapt to your schedule and are available on weekends.', fr: 'Planification flexible et rapide - mÃªme Ã  court terme. Nous nous adaptons Ã  votre emploi du temps et sommes disponibles le week-end.', it: `Pianificazione flessibile e veloce, anche con breve preavviso. Ci adattiamo al tuo programma e siamo disponibili nei fine settimana.` } },
      { icon: 'Star', title: { de: 'Transparente Festpreise', en: 'Transparent Fixed Prices', fr: 'Prix Fixes Transparents', it: `Prezzi fissi trasparenti` }, desc: { de: 'Keine versteckten Kosten, keine Ãœberraschungen. Sie erhalten eine verbindliche Festpreisofferte vor Auftragserteilung.', en: 'No hidden costs, no surprises. You receive a binding fixed-price quote before placing the order.', fr: 'Pas de frais cachÃ©s, pas de surprises. Vous recevez un devis Ã  prix fixe contraignant avant la commande.', it: `Nessun costo nascosto, nessuna sorpresa. Riceverete un preventivo vincolante a prezzo fisso prima di effettuare l'ordine.` } },
      { icon: 'MapPin', title: { de: 'Lokale Schweizer Expertise', en: 'Local Swiss Expertise', fr: 'Expertise Suisse Locale', it: `Competenza locale svizzera` }, desc: { de: 'Mit Sitz in Biel/Bienne kennen wir die lokalen Anforderungen und arbeiten eng mit Verwaltungen in der ganzen Schweiz zusammen.', en: 'Based in Biel/Bienne, we know local requirements and work closely with property managers throughout Switzerland.', fr: 'BasÃ©s Ã  Bienne, nous connaissons les exigences locales et collaborons Ã©troitement avec les gÃ©rances dans toute la Suisse.', it: `Con sede a Biel/Bienne, conosciamo le esigenze locali e lavoriamo a stretto contatto con gestori immobiliari in tutta la Svizzera.` } }
    ]
  },
  serviceLinks: [
    {
      category: { de: 'Umzug', en: 'Moving', fr: 'DÃ©mÃ©nagement', it: `In movimento` },
      links: [
        { label: { de: 'Umzug Schweiz', en: 'Moving Switzerland', fr: 'DÃ©mÃ©nagement Suisse', it: `Muovere la Svizzera` }, href: '/umzug-schweiz' },
        { label: { de: 'Umzug Biel', en: 'Moving Biel', fr: 'DÃ©mÃ©nagement Bienne', it: `Bienne in movimento` }, href: '/umzug-biel' },
        { label: { de: 'Umzug Bern', en: 'Moving Bern', fr: 'DÃ©mÃ©nagement Berne', it: `Berna in movimento` }, href: '/umzug-bern' },
        { label: { de: 'Umzug ZÃ¼rich', en: 'Moving Zurich', fr: 'DÃ©mÃ©nagement Zurich', it: `Muoversi a Zurigo` }, href: '/umzug-zurich' },
        { label: { de: 'Umzug Basel', en: 'Moving Basel', fr: 'DÃ©mÃ©nagement BÃ¢le', it: `Basilea in movimento` }, href: '/umzug-basel' },
        { label: { de: 'Umzugsfirma Biel', en: 'Moving Company Biel', fr: 'Entreprise Bienne', it: `Ditta di traslochi Bienne` }, href: '/umzugsfirma-biel' },
      ]
    },
    {
      category: { de: 'Reinigung', en: 'Cleaning', fr: 'Nettoyage', it: `Pulizia` },
      links: [
        { label: { de: 'Umzugsreinigung Schweiz', en: 'Move-Out Cleaning CH', fr: 'Nettoyage Fin de Bail CH', it: `Pulizia trasloco CH` }, href: '/umzugsreinigung-schweiz' },
        { label: { de: 'Reinigungsfirma Schweiz', en: 'Cleaning Company CH', fr: 'Entreprise Nettoyage CH', it: `Impresa di pulizie CH` }, href: '/reinigungsfirma-schweiz' },
        { label: { de: 'Endreinigung Biel', en: 'End Cleaning Biel', fr: 'Nettoyage Final Bienne', it: `Fine pulizia Bienne` }, href: '/endreinigung-biel' },
        { label: { de: 'Reinigung Biel', en: 'Cleaning Biel', fr: 'Nettoyage Bienne', it: `Pulizia Bienne` }, href: '/reinigung-biel' },
        { label: { de: 'Fensterreinigung Biel', en: 'Window Cleaning Biel', fr: 'Nettoyage Vitres Bienne', it: `Pulizia delle finestre Bienne` }, href: '/fensterreinigung-biel' },
      ]
    },
    {
      category: { de: 'Haushalt & Facility', en: 'Household & Facility', fr: 'MÃ©nage & Facility', it: `Famiglia e struttura` },
      links: [
        { label: { de: 'Haushaltshilfe Biel', en: 'Household Help Biel', fr: 'Aide MÃ©nagÃ¨re Bienne', it: `Aiuto domestico Bienne` }, href: '/haushaltshilfe-biel' },
        { label: { de: 'Facility Service Schweiz', en: 'Facility Service CH', fr: 'Facility Service CH', it: `Servizio strutture CH` }, href: '/facility-service-schweiz' },
        { label: { de: 'Hauswartung Schweiz', en: 'Maintenance CH', fr: 'Conciergerie CH', it: `Manutenzione CAP` }, href: '/hauswartung-schweiz' },
        { label: { de: 'Unterhaltsreinigung Biel', en: 'Maintenance Cleaning Biel', fr: 'Nettoyage Entretien Bienne', it: `Manutenzione Pulizia Bienne` }, href: '/unterhaltsreinigung-biel' },
        { label: { de: 'Entsorgung Biel', en: 'Disposal Biel', fr: 'Ã‰limination Bienne', it: `Smaltimento Bienne` }, href: '/entsorgung-biel' },
      ]
    },
    {
      category: { de: 'Regionen', en: 'Regions', fr: 'RÃ©gions', it: `Regioni` },
      links: [
        { label: { de: 'Kanton Bern', en: 'Canton Bern', fr: 'Canton de Berne', it: `Canton Berna` }, href: '/bern' },
        { label: { de: 'Kanton ZÃ¼rich', en: 'Canton Zurich', fr: 'Canton de Zurich', it: `Cantone Zurigo` }, href: '/zuerich' },
        { label: { de: 'Kanton Basel', en: 'Canton Basel', fr: 'Canton de BÃ¢le', it: `Canton Basilea` }, href: '/basel' },
        { label: { de: 'Kanton Solothurn', en: 'Canton Solothurn', fr: 'Canton de Soleure', it: `Canton Soletta` }, href: '/solothurn' },
        { label: { de: 'Alle Regionen', en: 'All Regions', fr: 'Toutes les RÃ©gions', it: `Tutte le regioni` }, href: '/regions' },
      ]
    }
  ],
  cta: {
    title: { de: 'Kostenlose Offerte anfordern', en: 'Request a Free Quote', fr: 'Demander un Devis Gratuit', it: `Richiedi un preventivo gratuito` },
    desc: { de: 'Planen Sie einen Umzug, eine Umzugsreinigung, Haushaltshilfe oder Entsorgung? Kontaktieren Sie uns fÃ¼r eine kostenlose Beratung und eine unverbindliche Festpreisofferte.', en: 'Planning a move, move-out cleaning, household help or disposal? Contact us for a free consultation and a non-binding fixed-price quote.', fr: 'Vous planifiez un dÃ©mÃ©nagement, un nettoyage de fin de bail, une aide mÃ©nagÃ¨re ou un dÃ©barras ? Contactez-nous pour une consultation gratuite et un devis Ã  prix fixe sans engagement.', it: `Stai pianificando un trasloco, una pulizia di trasloco, un aiuto domestico o uno smaltimento? Contattaci per una consulenza gratuita e un preventivo a prezzo fisso senza impegno.` },
    btn: { de: 'Offerte anfordern', en: 'Request Quote', fr: 'Demander un Devis', it: `Richiedi preventivo` }
  }
};

export default data;
