// Knowledge Hub â€” Trilingual Content Data
// All text content for the /preise-und-ratgeber, /pricing-and-guides, /prix-et-conseils pages
import { PRICING_RULES } from './pricingRules';

type Tri = { en: string; de: string; fr: string };

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
      de: 'Preise & Ratgeber â€“ Umzug, Reinigung, Haushaltshilfe Schweiz | SwissCleanMove',
      en: 'Pricing & Guides â€“ Moving, Cleaning, Household Help Switzerland | SwissCleanMove',
      fr: 'Prix & Conseils â€“ DÃ©mÃ©nagement, Nettoyage, Aide MÃ©nagÃ¨re Suisse | SwissCleanMove'
    },
    description: {
      de: 'Transparente Preise fÃ¼r Umzug, Umzugsreinigung, Haushaltshilfe, Facility Service und Entsorgung in der Schweiz. Ratgeber, Checklisten und Antworten auf hÃ¤ufige Fragen.',
      en: 'Transparent prices for moving, move-out cleaning, household help, facility services and disposal in Switzerland. Guides, checklists and answers to common questions.',
      fr: 'Prix transparents pour dÃ©mÃ©nagement, nettoyage de fin de bail, aide mÃ©nagÃ¨re, facility services et Ã©limination en Suisse. Guides, checklists et rÃ©ponses aux questions frÃ©quentes.'
    }
  },
  hero: {
    badge: {
      de: 'Preise & Ratgeber',
      en: 'Pricing & Guides',
      fr: 'Prix & Conseils'
    },
    h1: {
      de: 'SwissCleanMove â€“ Preise, Dienstleistungen & Ratgeber Schweiz',
      en: 'SwissCleanMove â€“ Pricing, Services & Guides Switzerland',
      fr: 'SwissCleanMove â€“ Prix, Services & Guides Suisse'
    },
    subtitle: {
      de: 'Transparente Festpreise, professionelle Beratung und umfassende Informationen zu Umzug, Reinigung, Haushaltshilfe, Facility Service und Entsorgung in der ganzen Schweiz.',
      en: 'Transparent fixed prices, professional consultation and comprehensive information on moving, cleaning, household help, facility services and disposal throughout Switzerland.',
      fr: 'Prix fixes transparents, conseils professionnels et informations complÃ¨tes sur le dÃ©mÃ©nagement, le nettoyage, l\'aide mÃ©nagÃ¨re, les facility services et l\'Ã©limination dans toute la Suisse.'
    }
  },
  tocSections: [
    { id: 'umzug-preise', label: { de: 'Umzug & Reinigung Preise', en: 'Moving & Cleaning Prices', fr: 'Prix DÃ©mÃ©nagement & Nettoyage' }, icon: 'Truck' },
    { id: 'haushaltshilfe-preise', label: { de: 'Haushaltshilfe Preise', en: 'Household Help Prices', fr: 'Prix Aide MÃ©nagÃ¨re' }, icon: 'Heart' },
    { id: 'durchschnittspreise', label: { de: 'Durchschnittspreise Schweiz', en: 'Average Prices Switzerland', fr: 'Prix Moyens Suisse' }, icon: 'BarChart3' },
    { id: 'facility-service', label: { de: 'Facility Service & Hauswartung', en: 'Facility Service & Maintenance', fr: 'Facility Service & Conciergerie' }, icon: 'Building2' },
    { id: 'vergleiche', label: { de: 'Service-Vergleiche', en: 'Service Comparisons', fr: 'Comparaisons de Services' }, icon: 'ArrowLeftRight' },
    { id: 'umzugsvorbereitung', label: { de: 'Umzugsvorbereitung', en: 'Moving Preparation', fr: 'PrÃ©paration au DÃ©mÃ©nagement' }, icon: 'ClipboardList' },
    { id: 'fragen', label: { de: 'HÃ¤ufige Fragen', en: 'Common Questions', fr: 'Questions FrÃ©quentes' }, icon: 'HelpCircle' },
    { id: 'regionen', label: { de: 'Unsere Regionen', en: 'Our Regions', fr: 'Nos RÃ©gions' }, icon: 'MapPin' },
  ],
  introText: {
    de: 'SwissCleanMove ist Ihr vertrauensvoller Partner fÃ¼r Premium-UmzÃ¼ge, Umzugsreinigungen mit 100% Abnahmegarantie, Haushaltshilfe, Facility Management und umfassende Entsorgungsdienste in der gesamten Schweiz. Hier finden Sie transparente Preise, detaillierte LeistungsÃ¼bersichten und kompetente Antworten auf Ihre wichtigsten Fragen rund um Umzug und Reinigung in der Schweiz.',
    en: 'SwissCleanMove is your trusted partner for premium moving services, move-out cleaning with a 100% handover guarantee, household help, facility management, and comprehensive disposal services across Switzerland. Here, you will find transparent pricing, detailed service overviews, and expert answers to your most pressing questions about moving and cleaning in Switzerland.',
    fr: 'SwissCleanMove est votre partenaire de confiance pour des services de dÃ©mÃ©nagement premium, le nettoyage de fin de bail avec garantie de remise Ã  100 %, l\'aide mÃ©nagÃ¨re, le facility management et des services d\'Ã©limination complets dans toute la Suisse. Vous y trouverez des prix transparents, des aperÃ§us dÃ©taillÃ©s de nos services et des rÃ©ponses d\'experts Ã  vos questions les plus importantes sur le dÃ©mÃ©nagement et le nettoyage en Suisse.'
  },
  avgPricesTitle: {
    de: 'Durchschnittspreise in der Schweiz',
    en: 'Average Prices in Switzerland',
    fr: 'Prix Moyens en Suisse'
  },
  avgPricesIntro: {
    de: 'Die Preise fÃ¼r Umzug und Reinigung in der Schweiz variieren je nach Anbieter, Region und Leistungsumfang. SwissCleanMove bietet transparente Festpreise, die alle wesentlichen Leistungen beinhalten â€“ ohne versteckte Kosten.',
    en: 'Prices for moving and cleaning in Switzerland vary depending on the provider, region and scope of services. SwissCleanMove offers transparent fixed prices that include all essential services â€“ with no hidden costs.',
    fr: 'Les prix pour le dÃ©mÃ©nagement et le nettoyage en Suisse varient selon le prestataire, la rÃ©gion et l\'Ã©tendue des services. SwissCleanMove propose des prix fixes transparents qui incluent tous les services essentiels â€“ sans frais cachÃ©s.'
  },
  avgPricesFactors: [
    {
      label: { de: 'Umzug (3.5-Zimmer-Wohnung)', en: 'Moving (3.5-room apartment)', fr: 'DÃ©mÃ©nagement (3.5 piÃ¨ces)' },
      desc: { de: `Schweizer Durchschnitt: CHF 1'200 â€“ CHF 3'500. SwissCleanMove: ab CHF ${PRICING_RULES.moving.baseRates['3.5']}.â€“ inkl. Transportversicherung, professionellem Team und Verpackungsmaterial.`, en: `Swiss average: CHF 1,200 â€“ CHF 3,500. SwissCleanMove: from CHF ${PRICING_RULES.moving.baseRates['3.5']}.â€“ incl. transport insurance, professional team and packing materials.`, fr: `Moyenne suisse : CHF 1'200 â€“ CHF 3'500. SwissCleanMove : dÃ¨s CHF ${PRICING_RULES.moving.baseRates['3.5']}.â€“ incl. assurance transport, Ã©quipe professionnelle et matÃ©riel d'emballage.` }
    },
    {
      label: { de: 'Umzugsreinigung (3.5-Zimmer-Wohnung)', en: 'Move-out cleaning (3.5-room apt)', fr: 'Nettoyage fin de bail (3.5 piÃ¨ces)' },
      desc: { de: `Schweizer Durchschnitt: CHF 800 â€“ CHF 1'500. SwissCleanMove: ab CHF ${PRICING_RULES.cleaning.apartment['3.5']}.â€“ mit 100% Abnahmegarantie und kostenloser Nachreinigung.`, en: `Swiss average: CHF 800 â€“ CHF 1,500. SwissCleanMove: from CHF ${PRICING_RULES.cleaning.apartment['3.5']}.â€“ with 100% handover guarantee and free re-cleaning.`, fr: `Moyenne suisse : CHF 800 â€“ CHF 1'500. SwissCleanMove : dÃ¨s CHF ${PRICING_RULES.cleaning.apartment['3.5']}.â€“ avec garantie de remise Ã  100% et nettoyage ultÃ©rieur gratuit.` }
    },
    {
      label: { de: 'Haushaltshilfe', en: 'Household help', fr: 'Aide mÃ©nagÃ¨re' },
      desc: { de: `Schweizer Durchschnitt: CHF 35 â€“ CHF 55 / Stunde. SwissCleanMove: ab CHF ${PRICING_RULES.household.regular}.â€“ / Stunde fÃ¼r regelmÃ¤ssige EinsÃ¤tze. Versichert, professionell und zuverlÃ¤ssig.`, en: `Swiss average: CHF 35 â€“ CHF 55 / hour. SwissCleanMove: from CHF ${PRICING_RULES.household.regular}.â€“ / hour for regular appointments. Insured, professional and reliable.`, fr: `Moyenne suisse : CHF 35 â€“ CHF 55 / heure. SwissCleanMove : dÃ¨s CHF ${PRICING_RULES.household.regular}.â€“ / heure pour les interventions rÃ©guliÃ¨res. AssurÃ©, professionnel et fiable.` }
    },
    {
      label: { de: 'Entsorgung & RÃ¤umung', en: 'Disposal & clearance', fr: 'Ã‰limination & dÃ©barras' },
      desc: { de: `Schweizer Durchschnitt: CHF 500 â€“ CHF 3'000 (WohnungsrÃ¤umung). SwissCleanMove: ab CHF ${PRICING_RULES.disposal.volumePricing['1']}.â€“ inkl. fachgerechter Entsorgung und Recycling.`, en: `Swiss average: CHF 500 â€“ CHF 3,000 (apartment clearance). SwissCleanMove: from CHF ${PRICING_RULES.disposal.volumePricing['1']}.â€“ incl. professional disposal and recycling.`, fr: `Moyenne suisse : CHF 500 â€“ CHF 3'000 (dÃ©barras d'appartement). SwissCleanMove : dÃ¨s CHF ${PRICING_RULES.disposal.volumePricing['1']}.â€“ incl. Ã©limination professionnelle et recyclage.` }
    }
  ],
  avgPricesNote: {
    de: 'Was beeinflusst die Preise? WohnungsgrÃ¶sse, Stockwerk, Lift, Distanz, Reinigungszustand, MÃ¶belmenge und regionale Unterschiede. GÃ¼nstige Anbieter sparen oft bei Versicherung, Material oder PersonalqualitÃ¤t. SwissCleanMove setzt auf Schweizer QualitÃ¤tsstandards, versicherte Leistungen und transparente Festpreise.',
    en: 'What influences prices? Apartment size, floor level, elevator, distance, cleaning condition, furniture quantity and regional differences. Cheap providers often cut costs on insurance, materials or staff quality. SwissCleanMove relies on Swiss quality standards, insured services and transparent fixed prices.',
    fr: 'Qu\'est-ce qui influence les prix ? Taille de l\'appartement, Ã©tage, ascenseur, distance, Ã©tat de propretÃ©, quantitÃ© de meubles et diffÃ©rences rÃ©gionales. Les prestataires bon marchÃ© Ã©conomisent souvent sur l\'assurance, le matÃ©riel ou la qualitÃ© du personnel. SwissCleanMove mise sur les standards de qualitÃ© suisses, des services assurÃ©s et des prix fixes transparents.'
  },
  facilityTitle: {
    de: 'Facility Service & Hauswartung',
    en: 'Facility Service & Property Maintenance',
    fr: 'Facility Service & Conciergerie'
  },
  facilitySubtitle: {
    de: 'Professionelle GebÃ¤udeverwaltung und Objektbetreuung fÃ¼r Verwaltungen, Unternehmen und Liegenschaftsbesitzer.',
    en: 'Professional building management and property care for administrations, businesses and property owners.',
    fr: 'Gestion professionnelle de bÃ¢timents et entretien d\'immeubles pour administrations, entreprises et propriÃ©taires.'
  },
  facilityCards: [
    {
      title: { de: 'Hauswartung', en: 'Property Maintenance', fr: 'Conciergerie' },
      desc: { de: 'RegelmÃ¤ssige GebÃ¤udereinigung, Aussenunterhalt, Winterdienst, GrÃ¼npflege und technische Objektbetreuung.', en: 'Regular building cleaning, exterior maintenance, winter service, green care and technical property management.', fr: 'Nettoyage rÃ©gulier de bÃ¢timents, entretien extÃ©rieur, service hivernal, entretien des espaces verts et gestion technique.' },
      price: { de: 'Auf Anfrage â€“ individuell kalkuliert', en: 'Upon request â€“ individually calculated', fr: 'Sur demande â€“ calculÃ© individuellement' }
    },
    {
      title: { de: 'Unterhaltsreinigung', en: 'Maintenance Cleaning', fr: 'Nettoyage d\'entretien' },
      desc: { de: 'RegelmÃ¤ssige Treppenhausreinigung, BÃ¼roreinigung, GemeinschaftsrÃ¤ume und gewerbliche Objekte.', en: 'Regular stairwell cleaning, office cleaning, common areas and commercial properties.', fr: 'Nettoyage rÃ©gulier des cages d\'escalier, nettoyage de bureaux, espaces communs et locaux commerciaux.' },
      price: { de: `Ab CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.â€“ / Stunde`, en: `From CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.â€“ / hour`, fr: `DÃ¨s CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.â€“ / heure` }
    },
    {
      title: { de: 'Gastronomie Reinigung', en: 'Restaurant Cleaning', fr: 'Nettoyage Gastronomie' },
      desc: { de: 'Professionelle KÃ¼chenreinigung, Hygienestandards, regelmÃ¤ssige Grundreinigung fÃ¼r Restaurants und Hotels.', en: 'Professional kitchen cleaning, hygiene standards, regular deep cleaning for restaurants and hotels.', fr: 'Nettoyage professionnel de cuisine, normes d\'hygiÃ¨ne, nettoyage en profondeur rÃ©gulier pour restaurants et hÃ´tels.' },
      price: { de: 'Auf Anfrage', en: 'Upon request', fr: 'Sur demande' }
    },
    {
      title: { de: 'Baureinigung', en: 'Construction Cleaning', fr: 'Nettoyage de chantier' },
      desc: { de: 'Bauendreinigung, Feinreinigung nach Renovierung, Neubau-Reinigung und Ãœbergabereinigung.', en: 'Post-construction cleaning, fine cleaning after renovation, new build cleaning and handover cleaning.', fr: 'Nettoyage de fin de chantier, nettoyage fin aprÃ¨s rÃ©novation, nettoyage de nouvelle construction et nettoyage de remise.' },
      price: { de: `Ab CHF ${PRICING_RULES.cleaning.house['3.5']}.â€“ / Stunde`, en: `From CHF ${PRICING_RULES.cleaning.house['3.5']}.â€“ / hour`, fr: `DÃ¨s CHF ${PRICING_RULES.cleaning.house['3.5']}.â€“ / heure` }
    }
  ],
  comparisons: {
    title: { de: 'Service-Vergleiche', en: 'Service Comparisons', fr: 'Comparaisons de Services' },
    subtitle: { de: 'Welche Dienstleistung ist die richtige fÃ¼r Sie?', en: 'Which service is right for you?', fr: 'Quel service vous convient ?' },
    items: [
      {
        sectionTitle: { de: 'Endreinigung vs. Umzugsreinigung', en: 'Final Cleaning vs. Move-Out Cleaning', fr: 'Nettoyage final vs. Nettoyage de fin de bail' },
        left: {
          title: { de: 'Endreinigung', en: 'Final Cleaning', fr: 'Nettoyage final' },
          points: [
            { de: 'Allgemeine Grundreinigung', en: 'General deep cleaning', fr: 'Nettoyage en profondeur gÃ©nÃ©ral' },
            { de: 'Keine Abnahmegarantie', en: 'No handover guarantee', fr: 'Pas de garantie de remise' },
            { de: 'FÃ¼r Zwischenreinigungen geeignet', en: 'Suitable for interim cleaning', fr: 'AdaptÃ© au nettoyage intermÃ©diaire' },
            { de: 'KÃ¼rzerer Arbeitsaufwand', en: 'Shorter work time', fr: 'DurÃ©e de travail plus courte' },
          ],
          bestFor: { de: 'Ideal fÃ¼r Renovierungen oder Zwischenreinigungen', en: 'Ideal for renovations or interim cleanings', fr: 'IdÃ©al pour rÃ©novations ou nettoyages intermÃ©diaires' },
          price: { de: 'Ab CHF 400.â€“', en: 'From CHF 400.â€“', fr: 'DÃ¨s CHF 400.â€“' }
        },
        right: {
          title: { de: 'Umzugsreinigung', en: 'Move-Out Cleaning', fr: 'Nettoyage de fin de bail' },
          points: [
            { de: 'Komplette Wohnungsreinigung nach Mietrecht', en: 'Complete apartment cleaning per tenancy law', fr: 'Nettoyage complet selon droit du bail' },
            { de: '100% Abnahmegarantie inklusive', en: '100% handover guarantee included', fr: 'Garantie de remise Ã  100% incluse' },
            { de: 'Nachreinigung bei Beanstandungen kostenlos', en: 'Free re-cleaning if complaints', fr: 'Nettoyage ultÃ©rieur gratuit en cas de rÃ©clamation' },
            { de: 'Fenster, Storen, KÃ¼che, Bad komplett', en: 'Windows, blinds, kitchen, bathroom complete', fr: 'FenÃªtres, stores, cuisine, salle de bain complets' },
          ],
          bestFor: { de: 'Empfohlen bei WohnungsÃ¼bergabe an die Verwaltung', en: 'Recommended for property handover to management', fr: 'RecommandÃ© pour la remise de propriÃ©tÃ© Ã  la gÃ©rance' },
          price: { de: `Ab CHF ${PRICING_RULES.moving.baseRates['1']}.â€“`, en: `From CHF ${PRICING_RULES.moving.baseRates['1']}.â€“`, fr: `DÃ¨s CHF ${PRICING_RULES.moving.baseRates['1']}.â€“` }
        }
      },
      {
        sectionTitle: { de: 'Haushaltshilfe vs. Unterhaltsreinigung', en: 'Household Help vs. Maintenance Cleaning', fr: 'Aide mÃ©nagÃ¨re vs. Nettoyage d\'entretien' },
        left: {
          title: { de: 'Haushaltshilfe', en: 'Household Help', fr: 'Aide mÃ©nagÃ¨re' },
          points: [
            { de: 'Individuelle HaushaltsunterstÃ¼tzung', en: 'Individual household support', fr: 'Soutien mÃ©nager individuel' },
            { de: 'Kochen, Waschen, BÃ¼geln, Einkaufen', en: 'Cooking, washing, ironing, shopping', fr: 'Cuisine, lessive, repassage, courses' },
            { de: 'Flexible Einsatzzeiten', en: 'Flexible scheduling', fr: 'Horaires flexibles' },
            { de: 'FÃ¼r Privathaushalte und Senioren', en: 'For private households and seniors', fr: 'Pour mÃ©nages privÃ©s et personnes Ã¢gÃ©es' },
          ],
          bestFor: { de: 'Ideal fÃ¼r Familien, BerufstÃ¤tige und Senioren', en: 'Ideal for families, professionals and seniors', fr: 'IdÃ©al pour familles, professionnels et personnes Ã¢gÃ©es' },
          price: { de: `Ab CHF ${PRICING_RULES.household.regular}.â€“ / Stunde`, en: `From CHF ${PRICING_RULES.household.regular}.â€“ / hour`, fr: `DÃ¨s CHF ${PRICING_RULES.household.regular}.â€“ / heure` }
        },
        right: {
          title: { de: 'Unterhaltsreinigung', en: 'Maintenance Cleaning', fr: 'Nettoyage d\'entretien' },
          points: [
            { de: 'RegelmÃ¤ssige GebÃ¤ude- und BÃ¼roreinigung', en: 'Regular building and office cleaning', fr: 'Nettoyage rÃ©gulier de bÃ¢timents et bureaux' },
            { de: 'TreppenhÃ¤user, EingÃ¤nge, GemeinschaftsrÃ¤ume', en: 'Stairwells, entrances, common areas', fr: 'Cages d\'escalier, entrÃ©es, espaces communs' },
            { de: 'Nach festem Reinigungsplan', en: 'According to fixed cleaning schedule', fr: 'Selon planning de nettoyage fixe' },
            { de: 'FÃ¼r Verwaltungen und Gewerbe', en: 'For administrations and businesses', fr: 'Pour administrations et entreprises' },
          ],
          bestFor: { de: 'Ideal fÃ¼r Liegenschaftsverwaltungen und Firmen', en: 'Ideal for property managers and companies', fr: 'IdÃ©al pour gÃ©rants immobiliers et entreprises' },
          price: { de: `Ab CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.â€“ / Stunde`, en: `From CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.â€“ / hour`, fr: `DÃ¨s CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.â€“ / heure` }
        }
      },
      {
        sectionTitle: { de: 'Umzug selbst vs. professionelle Umzugsfirma', en: 'DIY Move vs. Professional Moving Company', fr: 'DÃ©mÃ©nagement seul vs. Entreprise professionnelle' },
        left: {
          title: { de: 'Selbst umziehen', en: 'DIY Moving', fr: 'DÃ©mÃ©nager seul' },
          points: [
            { de: 'Transporter selbst mieten (CHF 150â€“300/Tag)', en: 'Rent van yourself (CHF 150â€“300/day)', fr: 'Louer un utilitaire soi-mÃªme (CHF 150â€“300/jour)' },
            { de: 'Helfer selbst organisieren', en: 'Organize helpers yourself', fr: 'Organiser ses propres aides' },
            { de: 'Risiko bei MÃ¶belschÃ¤den', en: 'Risk of furniture damage', fr: 'Risque de dommages aux meubles' },
            { de: 'Zeitaufwand: 1â€“3 Tage', en: 'Time: 1â€“3 days', fr: 'DurÃ©e : 1â€“3 jours' },
          ],
          bestFor: { de: 'Nur bei kleinen Wohnungen und kurzen Distanzen', en: 'Only for small apartments and short distances', fr: 'Uniquement pour petits appartements et courtes distances' },
          price: { de: 'CHF 300 â€“ CHF 800 (+ eigene Arbeitszeit)', en: 'CHF 300 â€“ CHF 800 (+ own work time)', fr: 'CHF 300 â€“ CHF 800 (+ temps de travail propre)' }
        },
        right: {
          title: { de: 'Professionelle Umzugsfirma', en: 'Professional Moving Company', fr: 'Entreprise de dÃ©mÃ©nagement pro' },
          points: [
            { de: 'Kompletter Service inkl. Verpackung', en: 'Complete service incl. packing', fr: 'Service complet incl. emballage' },
            { de: 'Transportversicherung inklusive', en: 'Transport insurance included', fr: 'Assurance transport incluse' },
            { de: 'Professioneller MÃ¶belschutz', en: 'Professional furniture protection', fr: 'Protection professionnelle des meubles' },
            { de: 'Erledigt in wenigen Stunden', en: 'Done in a few hours', fr: 'TerminÃ© en quelques heures' },
          ],
          bestFor: { de: 'Empfohlen ab 2.5 Zimmer oder bei wertvollen MÃ¶beln', en: 'Recommended from 2.5 rooms or with valuable furniture', fr: 'RecommandÃ© dÃ¨s 2.5 piÃ¨ces ou avec meubles de valeur' },
          price: { de: `Ab CHF ${PRICING_RULES.moving.baseRates['1']}.â€“ (alles inklusive)`, en: `From CHF ${PRICING_RULES.moving.baseRates['1']}.â€“ (everything included)`, fr: `DÃ¨s CHF ${PRICING_RULES.moving.baseRates['1']}.â€“ (tout inclus)` }
        }
      },
      {
        sectionTitle: { de: 'Facility Service vs. Hauswartung', en: 'Facility Service vs. Property Maintenance', fr: 'Facility Service vs. Conciergerie' },
        left: {
          title: { de: 'Facility Service', en: 'Facility Service', fr: 'Facility Service' },
          points: [
            { de: 'Ganzheitliches GebÃ¤udemanagement', en: 'Holistic building management', fr: 'Gestion globale de bÃ¢timent' },
            { de: 'Reinigung, Technik, Sicherheit', en: 'Cleaning, technical, security', fr: 'Nettoyage, technique, sÃ©curitÃ©' },
            { de: 'FÃ¼r grosse Liegenschaften und Gewerbe', en: 'For large properties and commercial', fr: 'Pour grands immeubles et commerces' },
            { de: 'Individuelle ServicevertrÃ¤ge', en: 'Individual service contracts', fr: 'Contrats de service individuels' },
          ],
          bestFor: { de: 'Ideal fÃ¼r Verwaltungen mit mehreren Liegenschaften', en: 'Ideal for managers with multiple properties', fr: 'IdÃ©al pour gÃ©rants avec plusieurs immeubles' },
          price: { de: 'Individuell â€“ auf Anfrage', en: 'Individual â€“ upon request', fr: 'Individuel â€“ sur demande' }
        },
        right: {
          title: { de: 'Hauswartung', en: 'Property Maintenance', fr: 'Conciergerie' },
          points: [
            { de: 'Fokus auf Reinigung und Aussenunterhalt', en: 'Focus on cleaning and exterior maintenance', fr: 'Focus sur nettoyage et entretien extÃ©rieur' },
            { de: 'Winterdienst und GrÃ¼npflege', en: 'Winter service and green care', fr: 'Service hivernal et entretien des espaces verts' },
            { de: 'FÃ¼r einzelne WohnhÃ¤user und KMU', en: 'For individual residential buildings and SMEs', fr: 'Pour immeubles rÃ©sidentiels et PME' },
            { de: 'RegelmÃ¤ssige Betreuung', en: 'Regular maintenance', fr: 'Entretien rÃ©gulier' },
          ],
          bestFor: { de: 'Ideal fÃ¼r WohnhÃ¤user und kleine Gewerbeliegenschaften', en: 'Ideal for residential buildings and small commercial properties', fr: 'IdÃ©al pour immeubles rÃ©sidentiels et petites propriÃ©tÃ©s commerciales' },
          price: { de: `Ab CHF ${PRICING_RULES.facilityService.monthly['500']}.â€“ / Monat`, en: `From CHF ${PRICING_RULES.facilityService.monthly['500']}.â€“ / month`, fr: `DÃ¨s CHF ${PRICING_RULES.facilityService.monthly['500']}.â€“ / mois` }
        }
      }
    ]
  },
  preparation: {
    title: { de: 'Umzugsvorbereitung â€“ Ihre Checkliste', en: 'Moving Preparation â€“ Your Checklist', fr: 'PrÃ©paration au DÃ©mÃ©nagement â€“ Votre Checklist' },
    subtitle: { de: 'Schritt fÃ¼r Schritt zum stressfreien Umzug', en: 'Step by step to a stress-free move', fr: 'Ã‰tape par Ã©tape vers un dÃ©mÃ©nagement sans stress' },
    steps: [
      {
        phase: { de: '4 Wochen vorher', en: '4 Weeks Before', fr: '4 Semaines Avant' },
        tasks: [
          { de: 'Umzugsfirma beauftragen und Termin fixieren', en: 'Hire moving company and fix date', fr: 'Engager une entreprise de dÃ©mÃ©nagement et fixer la date' },
          { de: 'Alte Wohnung kÃ¼ndigen oder Ãœbergabetermin vereinbaren', en: 'Cancel old apartment or arrange handover date', fr: 'RÃ©silier l\'ancien appartement ou convenir d\'une date de remise' },
          { de: 'Umzugsreinigung buchen (mit Abnahmegarantie)', en: 'Book move-out cleaning (with handover guarantee)', fr: 'RÃ©server le nettoyage de fin de bail (avec garantie de remise)' },
          { de: 'AdressÃ¤nderungen vorbereiten (Post, Versicherung, Bank)', en: 'Prepare address changes (post, insurance, bank)', fr: 'PrÃ©parer les changements d\'adresse (poste, assurance, banque)' },
        ]
      },
      {
        phase: { de: '1 Woche vorher', en: '1 Week Before', fr: '1 Semaine Avant' },
        tasks: [
          { de: 'Nicht benÃ¶tigte GegenstÃ¤nde entsorgen oder spenden', en: 'Dispose of or donate unnecessary items', fr: 'Ã‰liminer ou donner les objets inutiles' },
          { de: 'Kartons packen und beschriften', en: 'Pack and label boxes', fr: 'Emballer et Ã©tiqueter les cartons' },
          { de: 'ZÃ¤hlerstÃ¤nde ablesen (Strom, Wasser, Gas)', en: 'Read meter readings (electricity, water, gas)', fr: 'Relever les compteurs (Ã©lectricitÃ©, eau, gaz)' },
          { de: 'Parkplatzbewilligung fÃ¼r Umzugswagen organisieren', en: 'Arrange parking permit for moving truck', fr: 'Organiser un permis de stationnement pour le camion' },
        ]
      },
      {
        phase: { de: 'Am Umzugstag', en: 'Moving Day', fr: 'Jour du DÃ©mÃ©nagement' },
        tasks: [
          { de: 'Wohnung vor dem Umzug fotografieren', en: 'Photograph apartment before moving', fr: 'Photographier l\'appartement avant le dÃ©mÃ©nagement' },
          { de: 'Umzugsteam koordinieren und einweisen', en: 'Coordinate and brief moving team', fr: 'Coordonner et briefer l\'Ã©quipe de dÃ©mÃ©nagement' },
          { de: 'Alle RÃ¤ume auf vergessene GegenstÃ¤nde prÃ¼fen', en: 'Check all rooms for forgotten items', fr: 'VÃ©rifier toutes les piÃ¨ces pour objets oubliÃ©s' },
          { de: 'SchlÃ¼ssel fÃ¼r Ãœbergabe bereitlegen', en: 'Prepare keys for handover', fr: 'PrÃ©parer les clÃ©s pour la remise' },
        ]
      },
      {
        phase: { de: 'Nach dem Umzug', en: 'After the Move', fr: 'AprÃ¨s le DÃ©mÃ©nagement' },
        tasks: [
          { de: 'Umzugsreinigung durchfÃ¼hren lassen (Abnahmegarantie)', en: 'Have move-out cleaning done (handover guarantee)', fr: 'Faire exÃ©cuter le nettoyage de fin de bail (garantie de remise)' },
          { de: 'WohnungsÃ¼bergabe mit Verwaltung und Protokoll', en: 'Property handover with management and protocol', fr: 'Remise de l\'appartement avec la gÃ©rance et protocole' },
          { de: 'Neue Wohnung einrichten und AdressÃ¤nderungen abschliessen', en: 'Set up new apartment and finalize address changes', fr: 'AmÃ©nager le nouvel appartement et finaliser les changements d\'adresse' },
          { de: 'Mietkaution der alten Wohnung zurÃ¼ckfordern', en: 'Reclaim rental deposit from old apartment', fr: 'RÃ©clamer la caution de l\'ancien appartement' },
        ]
      }
    ]
  },
  qaCategories: [
    {
      category: { de: 'Umzug & Kosten', en: 'Moving & Costs', fr: 'DÃ©mÃ©nagement & CoÃ»ts' },
      questions: [
        {
          q: { de: 'Was kostet ein Umzug in der Schweiz?', en: 'How much does a move cost in Switzerland?', fr: 'Combien coÃ»te un dÃ©mÃ©nagement en Suisse ?' },
          snippet: { de: `Ein professioneller Umzug in der Schweiz kostet je nach WohnungsgrÃ¶sse zwischen CHF ${PRICING_RULES.moving.baseRates['1']}.â€“ und CHF ${PRICING_RULES.moving.baseRates['house']}.â€“. Die Preise hÃ¤ngen von Zimmerzahl, Stockwerk, Distanz und MÃ¶belmenge ab.`, en: `A professional move in Switzerland costs between CHF ${PRICING_RULES.moving.baseRates['1']} and CHF ${PRICING_RULES.moving.baseRates['house']} depending on apartment size. Prices depend on number of rooms, floor level, distance and quantity of furniture.`, fr: `Un dÃ©mÃ©nagement professionnel en Suisse coÃ»te entre CHF ${PRICING_RULES.moving.baseRates['1']}.â€“ et CHF ${PRICING_RULES.moving.baseRates['house']}.â€“ selon la taille de l'appartement. Les prix dÃ©pendent du nombre de piÃ¨ces, de l'Ã©tage, de la distance et de la quantitÃ© de meubles.` },
          answer: { de: `Bei SwissCleanMove beginnen die Umzugspreise bei CHF ${PRICING_RULES.moving.baseRates['1']}.â€“ fÃ¼r eine 1-Zimmer-Wohnung. Eine 3.5-Zimmer-Wohnung kostet ab CHF ${PRICING_RULES.moving.baseRates['3.5']}.â€“, ein Einfamilienhaus ab CHF ${PRICING_RULES.moving.baseRates['house']}.â€“. Im Preis inbegriffen sind ein professionelles Umzugsteam, modernes Transportfahrzeug, Transportversicherung, MÃ¶belschutz, Verpackungsmaterial sowie Be- und Entladen. ZusÃ¤tzliche Faktoren wie Stockwerk ohne Lift, besonders schwere GegenstÃ¤nde oder sehr lange Distanzen kÃ¶nnen den Preis beeinflussen. SwissCleanMove erstellt Ihnen eine kostenlose und unverbindliche Festpreisofferte nach einer persÃ¶nlichen Besichtigung oder auf Basis Ihrer Angaben.`, en: `At SwissCleanMove, moving prices start at CHF ${PRICING_RULES.moving.baseRates['1']} for a 1-room apartment. A 3.5-room apartment costs from CHF ${PRICING_RULES.moving.baseRates['3.5']}, a single-family house from CHF ${PRICING_RULES.moving.baseRates['house']}. The price includes a professional moving team, modern transport vehicle, transport insurance, furniture protection, packing materials and loading/unloading. Additional factors such as floor without elevator, particularly heavy items or very long distances may affect the price. SwissCleanMove provides you with a free and non-binding fixed-price quote after a personal inspection or based on your details.`, fr: `Chez SwissCleanMove, les prix de dÃ©mÃ©nagement commencent Ã  CHF ${PRICING_RULES.moving.baseRates['1']}.â€“ pour un appartement 1 piÃ¨ce. Un appartement 3.5 piÃ¨ces coÃ»te dÃ¨s CHF ${PRICING_RULES.moving.baseRates['3.5']}.â€“, une maison individuelle dÃ¨s CHF ${PRICING_RULES.moving.baseRates['house']}.â€“. Le prix comprend une Ã©quipe professionnelle, un vÃ©hicule de transport moderne, une assurance transport, la protection des meubles, le matÃ©riel d'emballage et le chargement/dÃ©chargement. Des facteurs supplÃ©mentaires comme l'Ã©tage sans ascenseur, des objets particuliÃ¨rement lourds ou de trÃ¨s longues distances peuvent influencer le prix. SwissCleanMove vous fournit un devis Ã  prix fixe gratuit et sans engagement.` },
          links: [{ label: 'Umzug Schweiz', href: '/umzug-schweiz' }, { label: 'Umzug Biel', href: '/umzug-biel' }]
        },
        {
          q: { de: 'Wie bereitet man einen Umzug vor?', en: 'How do you prepare for a move?', fr: 'Comment prÃ©parer un dÃ©mÃ©nagement ?' },
          snippet: { de: 'Die Umzugsvorbereitung beginnt idealerweise 4 Wochen vor dem Umzugstermin. Wichtigste Schritte: Umzugsfirma buchen, Umzugsreinigung organisieren, AdressÃ¤nderungen einleiten und systematisch packen.', en: 'Moving preparation ideally starts 4 weeks before the move date. Most important steps: book a moving company, organize move-out cleaning, initiate address changes and pack systematically.', fr: 'La prÃ©paration du dÃ©mÃ©nagement commence idÃ©alement 4 semaines avant la date de dÃ©mÃ©nagement. Ã‰tapes les plus importantes : rÃ©server une entreprise de dÃ©mÃ©nagement, organiser le nettoyage, initier les changements d\'adresse et emballer systÃ©matiquement.' },
          answer: { de: 'Eine grÃ¼ndliche Vorbereitung spart Zeit, Geld und Nerven. Beginnen Sie 4 Wochen vorher mit der Buchung einer professionellen Umzugsfirma und der Umzugsreinigung mit Abnahmegarantie. Informieren Sie Post, Versicherungen und Bank Ã¼ber Ihre neue Adresse. Eine Woche vor dem Umzug sollten Sie systematisch Kartons packen, ZÃ¤hlerstÃ¤nde ablesen und eine Parkplatzbewilligung fÃ¼r den Umzugswagen organisieren. Am Umzugstag selbst fotografieren Sie die Wohnung fÃ¼r das Ãœbergabeprotokoll und koordinieren das Umzugsteam. Nach dem Umzug lassen Sie die professionelle Umzugsreinigung durchfÃ¼hren und erledigen die WohnungsÃ¼bergabe mit der Verwaltung. Mit SwissCleanMove kÃ¶nnen Sie Umzug, Reinigung und Entsorgung aus einer Hand buchen.', en: 'Thorough preparation saves time, money and stress. Start 4 weeks ahead by booking a professional moving company and move-out cleaning with handover guarantee. Inform the post office, insurance companies and bank of your new address. One week before the move, systematically pack boxes, read meter readings and arrange a parking permit for the moving truck. On moving day, photograph the apartment for the handover protocol and coordinate the moving team. After the move, have the professional move-out cleaning done and complete the property handover with management. With SwissCleanMove you can book moving, cleaning and disposal as a complete package.', fr: 'Une prÃ©paration minutieuse permet d\'Ã©conomiser du temps, de l\'argent et du stress. Commencez 4 semaines Ã  l\'avance en rÃ©servant une entreprise de dÃ©mÃ©nagement professionnelle et un nettoyage de fin de bail avec garantie de remise. Informez la poste, les assurances et la banque de votre nouvelle adresse. Une semaine avant le dÃ©mÃ©nagement, emballez systÃ©matiquement les cartons, relevez les compteurs et organisez un permis de stationnement pour le camion. Le jour du dÃ©mÃ©nagement, photographiez l\'appartement pour le protocole de remise et coordonnez l\'Ã©quipe. AprÃ¨s le dÃ©mÃ©nagement, faites exÃ©cuter le nettoyage professionnel et effectuez la remise avec la gÃ©rance. Avec SwissCleanMove, vous pouvez rÃ©server dÃ©mÃ©nagement, nettoyage et Ã©limination en un seul forfait.' },
          links: [{ label: 'Offerte anfordern', href: '/form' }]
        }
      ]
    },
    {
      category: { de: 'Umzugsreinigung & Endreinigung', en: 'Move-Out & End Cleaning', fr: 'Nettoyage de Fin de Bail' },
      questions: [
        {
          q: { de: 'Was kostet eine Umzugsreinigung?', en: 'How much does move-out cleaning cost?', fr: 'Combien coÃ»te un nettoyage de fin de bail ?' },
          snippet: { de: `Eine professionelle Umzugsreinigung mit Abnahmegarantie kostet in der Schweiz zwischen CHF ${PRICING_RULES.moving.baseRates['1']}.â€“ (Studio) und CHF ${PRICING_RULES.cleaning.apartment['5']}.â€“ (5-Zimmer-Wohnung). Bei SwissCleanMove ist die kostenlose Nachreinigung bei Beanstandungen im Preis inbegriffen.`, en: `A professional move-out cleaning with handover guarantee costs between CHF ${PRICING_RULES.moving.baseRates['1']} (studio) and CHF ${PRICING_RULES.cleaning.apartment['5']} (5-room apartment) in Switzerland. At SwissCleanMove, free re-cleaning in case of complaints is included.`, fr: `Un nettoyage de fin de bail professionnel avec garantie de remise coÃ»te entre CHF ${PRICING_RULES.moving.baseRates['1']}.â€“ (studio) et CHF ${PRICING_RULES.cleaning.apartment['5']}.â€“ (5 piÃ¨ces) en Suisse. Chez SwissCleanMove, le nettoyage ultÃ©rieur gratuit en cas de rÃ©clamation est inclus.` },
          answer: { de: `Die Umzugsreinigung ist eine der wichtigsten Dienstleistungen beim Wohnungswechsel. Bei SwissCleanMove beginnen die Preise bei CHF ${PRICING_RULES.moving.baseRates['1']}.â€“ fÃ¼r ein Studio und reichen bis CHF ${PRICING_RULES.cleaning.apartment['5']}.â€“ fÃ¼r eine 5-Zimmer-Wohnung. HÃ¤user und Villen werden individuell kalkuliert. Im Preis inbegriffen sind: Fensterreinigung innen und aussen, Reinigung aller Storen, komplette KÃ¼chenreinigung inkl. Backofen und KÃ¼hlschrank, Entkalkung von Bad und SanitÃ¤ranlagen, Boden- und OberflÃ¤chenreinigung sowie die 100% Abnahmegarantie. Das bedeutet: Sollte die Verwaltung bei der Abnahme MÃ¤ngel feststellen, kommt SwissCleanMove kostenlos fÃ¼r eine Nachreinigung zurÃ¼ck. Dieses Versprechen gibt Ihnen volle Sicherheit fÃ¼r eine erfolgreiche WohnungsÃ¼bergabe.`, en: `Move-out cleaning is one of the most important services when changing apartments. At SwissCleanMove, prices start at CHF ${PRICING_RULES.moving.baseRates['1']} for a studio and go up to CHF ${PRICING_RULES.cleaning.apartment['5']} for a 5-room apartment. Houses and villas are calculated individually. Included in the price: interior and exterior window cleaning, cleaning of all blinds, complete kitchen cleaning incl. oven and fridge, descaling of bathroom and sanitary facilities, floor and surface cleaning and the 100% handover guarantee. This means: if the management identifies defects during the inspection, SwissCleanMove returns for a free re-cleaning. This promise gives you full security for a successful property handover.`, fr: `Le nettoyage de fin de bail est l'un des services les plus importants lors d'un changement d'appartement. Chez SwissCleanMove, les prix commencent Ã  CHF ${PRICING_RULES.moving.baseRates['1']}.â€“ pour un studio et vont jusqu'Ã  CHF ${PRICING_RULES.cleaning.apartment['5']}.â€“ pour un 5 piÃ¨ces. Maisons et villas sont calculÃ©es individuellement. Inclus dans le prix : nettoyage des vitres intÃ©rieur et extÃ©rieur, nettoyage de tous les stores, nettoyage complet de la cuisine incl. four et rÃ©frigÃ©rateur, dÃ©tartrage de la salle de bain et sanitaires, nettoyage des sols et surfaces et la garantie de remise Ã  100%. Cela signifie : si la gÃ©rance constate des dÃ©fauts lors de la remise, SwissCleanMove revient gratuitement pour un nettoyage ultÃ©rieur.` },
          links: [{ label: 'Umzugsreinigung Schweiz', href: '/umzugsreinigung-schweiz' }, { label: 'Endreinigung Biel', href: '/endreinigung-biel' }]
        },
        {
          q: { de: 'Was bedeutet Abnahmegarantie?', en: 'What does handover guarantee mean?', fr: 'Que signifie la garantie de remise ?' },
          snippet: { de: 'Die Abnahmegarantie bedeutet, dass SwissCleanMove garantiert, dass die Wohnung bei der Ãœbergabe an die Verwaltung den Reinigungsstandard erfÃ¼llt. Bei Beanstandungen wird kostenlos nachgereinigt.', en: 'The handover guarantee means that SwissCleanMove guarantees the apartment meets the cleaning standard during handover to management. Free re-cleaning is provided if there are complaints.', fr: 'La garantie de remise signifie que SwissCleanMove garantit que l\'appartement respecte les standards de propretÃ© lors de la remise Ã  la gÃ©rance. Un nettoyage ultÃ©rieur gratuit est effectuÃ© en cas de rÃ©clamation.' },
          answer: { de: 'Die Abnahmegarantie ist ein QualitÃ¤tsversprechen von SwissCleanMove. Sie bedeutet, dass unsere professionelle Umzugsreinigung den strengen Standards entspricht, die Hausverwaltungen bei der WohnungsÃ¼bergabe verlangen. Konkret umfasst dies die vollstÃ¤ndige Reinigung aller RÃ¤ume, Fenster (innen und aussen), Storen, KÃ¼che inklusive Backofen, KÃ¼hlschrank und Abzugshaube, Bad und SanitÃ¤ranlagen sowie aller BÃ¶den und OberflÃ¤chen. Sollte die Verwaltung bei der Abnahme Beanstandungen haben, kommt unser Team kostenlos zurÃ¼ck und bessert nach. Dieses Versprechen schÃ¼tzt Sie vor Nachforderungen und gibt Ihnen die Sicherheit, dass Ihre Mietkaution nicht wegen ReinigungsmÃ¤ngeln einbehalten wird. Die Abnahmegarantie ist bei jeder Umzugsreinigung von SwissCleanMove automatisch im Preis enthalten.', en: 'The handover guarantee is a quality promise from SwissCleanMove. It means our professional move-out cleaning meets the strict standards that property managers require during apartment handover. Specifically, this includes the complete cleaning of all rooms, windows (interior and exterior), blinds, kitchen including oven, fridge and extractor hood, bathroom and sanitary facilities and all floors and surfaces. If management has complaints during the inspection, our team returns free of charge to make corrections. This promise protects you from additional claims and gives you the certainty that your rental deposit will not be withheld due to cleaning deficiencies. The handover guarantee is automatically included in the price of every SwissCleanMove move-out cleaning.', fr: 'La garantie de remise est une promesse de qualitÃ© de SwissCleanMove. Elle signifie que notre nettoyage professionnel de fin de bail respecte les standards stricts que les gÃ©rances exigent lors de la remise. Cela comprend le nettoyage complet de toutes les piÃ¨ces, fenÃªtres (intÃ©rieur et extÃ©rieur), stores, cuisine y compris four, rÃ©frigÃ©rateur et hotte, salle de bain et sanitaires ainsi que tous les sols et surfaces. Si la gÃ©rance a des rÃ©clamations lors de la remise, notre Ã©quipe revient gratuitement pour corriger. Cette promesse vous protÃ¨ge contre les rÃ©clamations et vous donne la certitude que votre caution ne sera pas retenue en raison de dÃ©fauts de nettoyage. La garantie de remise est automatiquement incluse dans le prix de chaque nettoyage de fin de bail SwissCleanMove.' },
          links: [{ label: 'Reinigungsfirma Schweiz', href: '/reinigungsfirma-schweiz' }]
        },
        {
          q: { de: 'Was ist der Unterschied zwischen Endreinigung und Umzugsreinigung?', en: 'What is the difference between end cleaning and move-out cleaning?', fr: 'Quelle est la diffÃ©rence entre nettoyage final et nettoyage de fin de bail ?' },
          snippet: { de: 'Die Umzugsreinigung ist eine vollstÃ¤ndige Wohnungsreinigung mit Abnahmegarantie speziell fÃ¼r die WohnungsÃ¼bergabe. Die Endreinigung ist eine allgemeine Grundreinigung ohne Ãœbergabegarantie.', en: 'Move-out cleaning is a complete apartment cleaning with handover guarantee specifically for property handover. End cleaning is a general deep cleaning without handover guarantee.', fr: 'Le nettoyage de fin de bail est un nettoyage complet avec garantie de remise spÃ©cifiquement pour la remise. Le nettoyage final est un nettoyage en profondeur gÃ©nÃ©ral sans garantie.' },
          answer: { de: 'Obwohl die Begriffe oft synonym verwendet werden, gibt es einen wichtigen Unterschied. Die Umzugsreinigung (auch Abgabereinigung genannt) ist speziell auf die Anforderungen des Schweizer Mietrechts ausgerichtet und beinhaltet die 100% Abnahmegarantie. Sie umfasst alle Bereiche, die bei einer offiziellen Wohnungsabnahme geprÃ¼ft werden: Fenster innen und aussen, Storen, KÃ¼che komplett, SanitÃ¤ranlagen und alle BÃ¶den. Bei Beanstandungen wird kostenlos nachgereinigt. Eine allgemeine Endreinigung oder Grundreinigung hingegen ist eine intensive Reinigung ohne spezifischen Bezug zur Mietrecht-Abnahme und ohne Garantie. Wenn Sie umziehen und die Wohnung der Verwaltung Ã¼bergeben mÃ¼ssen, empfehlen wir immer die Umzugsreinigung mit Abnahmegarantie â€“ fÃ¼r Ihre Sicherheit und fÃ¼r einen stressfreien Auszug.', en: 'Although the terms are often used interchangeably, there is an important difference. Move-out cleaning (also called handover cleaning) is specifically tailored to Swiss tenancy law requirements and includes the 100% handover guarantee. It covers all areas checked during an official apartment inspection: windows inside and outside, blinds, complete kitchen, sanitary facilities and all floors. Free re-cleaning is provided if there are complaints. A general end cleaning or deep cleaning, on the other hand, is an intensive cleaning without specific reference to tenancy law inspection and without guarantee. When moving and handing over the apartment to management, we always recommend move-out cleaning with handover guarantee â€“ for your security and a stress-free move-out.', fr: 'Bien que les termes soient souvent utilisÃ©s de maniÃ¨re interchangeable, il existe une diffÃ©rence importante. Le nettoyage de fin de bail est spÃ©cifiquement adaptÃ© aux exigences du droit du bail suisse et inclut la garantie de remise Ã  100%. Il couvre tous les domaines vÃ©rifiÃ©s lors d\'une inspection officielle : fenÃªtres intÃ©rieur et extÃ©rieur, stores, cuisine complÃ¨te, sanitaires et tous les sols. Un nettoyage ultÃ©rieur gratuit est effectuÃ© en cas de rÃ©clamation. Un nettoyage final ou nettoyage en profondeur gÃ©nÃ©ral est un nettoyage intensif sans rÃ©fÃ©rence spÃ©cifique au droit du bail et sans garantie. Lors d\'un dÃ©mÃ©nagement et de la remise de l\'appartement Ã  la gÃ©rance, nous recommandons toujours le nettoyage de fin de bail avec garantie de remise.' },
          links: [{ label: 'Endreinigung Biel', href: '/endreinigung-biel' }, { label: 'Umzugsreinigung Schweiz', href: '/umzugsreinigung-schweiz' }]
        }
      ]
    },
    {
      category: { de: 'Haushaltshilfe & Putzfrau', en: 'Household Help & Cleaning Lady', fr: 'Aide MÃ©nagÃ¨re & Femme de MÃ©nage' },
      questions: [
        {
          q: { de: 'Was kostet eine Haushaltshilfe?', en: 'How much does a household helper cost?', fr: 'Combien coÃ»te une aide mÃ©nagÃ¨re ?' },
          snippet: { de: `Eine professionelle Haushaltshilfe kostet bei SwissCleanMove ab CHF ${PRICING_RULES.household.regular}.â€“ pro Stunde bei wÃ¶chentlichen EinsÃ¤tzen. Einmalige EinsÃ¤tze beginnen ab CHF ${PRICING_RULES.household.oneTime}.â€“ pro Stunde. Mindestauftrag: CHF ${PRICING_RULES.household.minOrder}.â€“.`, en: `A professional household helper costs from CHF ${PRICING_RULES.household.regular} per hour for weekly appointments at SwissCleanMove. One-time appointments start from CHF ${PRICING_RULES.household.oneTime} per hour. Minimum order: CHF ${PRICING_RULES.household.minOrder}.`, fr: `Une aide mÃ©nagÃ¨re professionnelle coÃ»te dÃ¨s CHF ${PRICING_RULES.household.regular}.â€“ par heure pour les interventions hebdomadaires chez SwissCleanMove. Les interventions ponctuelles commencent Ã  CHF ${PRICING_RULES.household.oneTime}.â€“ par heure. Commande minimum : CHF ${PRICING_RULES.household.minOrder}.â€“.` },
          answer: { de: `SwissCleanMove bietet professionelle Haushaltshilfe fÃ¼r Privathaushalte, Familien, Senioren und BerufstÃ¤tige. Bei regelmÃ¤ssigen wÃ¶chentlichen EinsÃ¤tzen liegt der Preis bei CHF ${PRICING_RULES.household.regular}.â€“ pro Stunde. Haushaltshilfe im 14-tÃ¤gigen Rhythmus kostet CHF ${PRICING_RULES.household.fourteenDays}.â€“ pro Stunde, einmalige EinsÃ¤tze CHF ${PRICING_RULES.household.oneTime}.â€“ pro Stunde. Unsere Premium Haushaltshilfe (CHF ${PRICING_RULES.household.premium}.â€“ / Stunde) bietet zusÃ¤tzliche Leistungen wie Grundreinigung und spezielle WÃ¼nsche. Im Service enthalten sind Staubsaugen, Bodenreinigung, KÃ¼chen- und Badreinigung, Abstauben, Betten beziehen, WÃ¤sche waschen und auf Wunsch BÃ¼gelservice. Alle unsere Haushaltshilfen sind versichert, geschult und arbeiten nach Schweizer QualitÃ¤tsstandards. Der Mindestauftrag betrÃ¤gt CHF ${PRICING_RULES.household.minOrder}.â€“.`, en: `SwissCleanMove offers professional household help for private households, families, seniors and busy professionals. For regular weekly appointments, the price is CHF ${PRICING_RULES.household.regular} per hour. Household help every two weeks costs CHF ${PRICING_RULES.household.fourteenDays} per hour, one-time appointments CHF ${PRICING_RULES.household.oneTime} per hour. Our premium household help (CHF ${PRICING_RULES.household.premium} / hour) offers additional services like deep cleaning and special requests. Services include vacuuming, floor cleaning, kitchen and bathroom cleaning, dusting, bed making, laundry washing and ironing on request. All our household helpers are insured, trained and work according to Swiss quality standards. Minimum order is CHF ${PRICING_RULES.household.minOrder}.`, fr: `SwissCleanMove propose une aide mÃ©nagÃ¨re professionnelle pour les mÃ©nages privÃ©s, familles, personnes Ã¢gÃ©es et professionnels. Pour les interventions hebdomadaires rÃ©guliÃ¨res, le prix est de CHF ${PRICING_RULES.household.regular}.â€“ par heure. L'aide mÃ©nagÃ¨re toutes les deux semaines coÃ»te CHF ${PRICING_RULES.household.fourteenDays}.â€“ par heure, les interventions ponctuelles CHF ${PRICING_RULES.household.oneTime}.â€“ par heure. Notre aide mÃ©nagÃ¨re premium (CHF ${PRICING_RULES.household.premium}.â€“ / heure) offre des prestations supplÃ©mentaires. Les services incluent l'aspirateur, nettoyage des sols, cuisine et salle de bain, dÃ©poussiÃ©rage, lits, lessive et repassage sur demande. Toutes nos aides mÃ©nagÃ¨res sont assurÃ©es, formÃ©es et travaillent selon les standards suisses. Commande minimum : CHF ${PRICING_RULES.household.minOrder}.â€“.` },
          links: [{ label: 'Haushaltshilfe Biel', href: '/haushaltshilfe-biel' }]
        },
        {
          q: { de: 'Wie viel kostet eine Putzfrau pro Stunde?', en: 'How much does a cleaning lady cost per hour?', fr: 'Combien coÃ»te une femme de mÃ©nage par heure ?' },
          snippet: { de: `Eine professionelle Putzfrau kostet in der Schweiz durchschnittlich CHF 35 â€“ CHF 55 pro Stunde. Bei SwissCleanMove beginnen die Preise bei CHF ${PRICING_RULES.household.regular}.â€“ pro Stunde â€“ versichert und mit Schweizer QualitÃ¤tsstandard.`, en: `A professional cleaning lady in Switzerland costs on average CHF 35 â€“ CHF 55 per hour. At SwissCleanMove, prices start at CHF ${PRICING_RULES.household.regular} per hour â€“ insured and with Swiss quality standards.`, fr: `Une femme de mÃ©nage professionnelle en Suisse coÃ»te en moyenne CHF 35 â€“ CHF 55 par heure. Chez SwissCleanMove, les prix commencent Ã  CHF ${PRICING_RULES.household.regular}.â€“ par heure â€“ assurÃ©e et avec des standards de qualitÃ© suisses.` },
          answer: { de: `Der Stundensatz fÃ¼r eine Putzfrau in der Schweiz variiert stark. Privat engagierte ReinigungskrÃ¤fte ohne Versicherung kosten oft CHF 25 â€“ CHF 35 pro Stunde, bergen aber Risiken bei SchÃ¤den oder UnfÃ¤llen. Professionelle Reinigungsfirmen berechnen CHF 35 â€“ CHF 55 pro Stunde, bieten dafÃ¼r aber Versicherungsschutz, geschultes Personal und garantierte QualitÃ¤t. Bei SwissCleanMove zahlen Sie ab CHF ${PRICING_RULES.household.regular}.â€“ pro Stunde fÃ¼r regelmÃ¤ssige EinsÃ¤tze. Unsere ReinigungskrÃ¤fte sind vollstÃ¤ndig versichert, professionell geschult und verwenden umweltfreundliche Reinigungsmittel. Im Unterschied zu privat angestellten Putzfrauen Ã¼bernehmen wir die komplette Abwicklung inkl. Ersatz bei Krankheit und QualitÃ¤tskontrolle.`, en: `The hourly rate for a cleaning lady in Switzerland varies widely. Privately hired cleaners without insurance often cost CHF 25 â€“ CHF 35 per hour, but carry risks regarding damage or accidents. Professional cleaning companies charge CHF 35 â€“ CHF 55 per hour but offer insurance coverage, trained staff and guaranteed quality. At SwissCleanMove you pay from CHF ${PRICING_RULES.household.regular} per hour for regular appointments. Our cleaning staff are fully insured, professionally trained and use environmentally friendly cleaning products. Unlike privately employed cleaners, we handle the complete administration including replacement in case of illness and quality control.`, fr: `Le tarif horaire pour une femme de mÃ©nage en Suisse varie considÃ©rablement. Les personnes de mÃ©nage engagÃ©es privÃ©ment sans assurance coÃ»tent souvent CHF 25 â€“ CHF 35 par heure, mais comportent des risques en cas de dommages ou accidents. Les entreprises de nettoyage professionnelles facturent CHF 35 â€“ CHF 55 par heure mais offrent une couverture d'assurance, du personnel formÃ© et une qualitÃ© garantie. Chez SwissCleanMove, vous payez dÃ¨s CHF ${PRICING_RULES.household.regular}.â€“ par heure pour les interventions rÃ©guliÃ¨res. Notre personnel est entiÃ¨rement assurÃ©, formÃ© professionnellement et utilise des produits Ã©cologiques.` },
          links: [{ label: 'Haushaltshilfe Biel', href: '/haushaltshilfe-biel' }]
        }
      ]
    },
    {
      category: { de: 'Facility Service & Hauswartung', en: 'Facility Service & Maintenance', fr: 'Facility Service & Conciergerie' },
      questions: [
        {
          q: { de: 'Was kostet Facility Service in der Schweiz?', en: 'How much does facility service cost in Switzerland?', fr: 'Combien coÃ»te le facility service en Suisse ?' },
          snippet: { de: `Facility Service wird individuell kalkuliert und richtet sich nach ObjektgrÃ¶sse, Leistungsumfang und EinsatzhÃ¤ufigkeit. Unterhaltsreinigung beginnt ab CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.â€“ / Stunde, umfassende Hauswartung ab CHF ${PRICING_RULES.facilityService.monthly['500']}.â€“ / Monat.`, en: `Facility service is individually calculated based on property size, scope of services and frequency. Maintenance cleaning starts from CHF ${PRICING_RULES.maintenance.hourlyRates.residential} / hour, comprehensive property maintenance from CHF ${PRICING_RULES.facilityService.monthly['500']} / month.`, fr: `Le facility service est calculÃ© individuellement selon la taille de la propriÃ©tÃ©, l'Ã©tendue des services et la frÃ©quence. Le nettoyage d'entretien commence dÃ¨s CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.â€“ / heure, la conciergerie complÃ¨te dÃ¨s CHF ${PRICING_RULES.facilityService.monthly['500']}.â€“ / mois.` },
          answer: { de: `Der Facility Service von SwissCleanMove umfasst ein ganzheitliches GebÃ¤udemanagement: Reinigung, Hauswartung, Aussenunterhalt, Winterdienst, GrÃ¼npflege und technische Betreuung. Die Kosten werden individuell auf Basis von ObjektgrÃ¶sse, gewÃ¼nschtem Leistungsumfang und EinsatzhÃ¤ufigkeit berechnet. FÃ¼r die reine Unterhaltsreinigung (TreppenhÃ¤user, GemeinschaftsrÃ¤ume) beginnen die Preise ab CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.â€“ pro Stunde. Umfassende Hauswartungspakete mit regelmÃ¤ssiger GebÃ¤udebetreuung starten ab CHF ${PRICING_RULES.facilityService.monthly['500']}.â€“ pro Monat. SwissCleanMove betreut Verwaltungen, Gewerbebetriebe und Liegenschaftsbesitzer in der ganzen Schweiz und erstellt massgeschneiderte ServicevertrÃ¤ge.`, en: `SwissCleanMove's facility service includes holistic building management: cleaning, property maintenance, exterior upkeep, winter service, green care and technical support. Costs are individually calculated based on property size, desired scope of services and frequency. For maintenance cleaning only (stairwells, common areas), prices start from CHF ${PRICING_RULES.maintenance.hourlyRates.residential} per hour. Comprehensive property maintenance packages with regular building care start from CHF ${PRICING_RULES.facilityService.monthly['500']} per month. SwissCleanMove serves property managers, businesses and property owners throughout Switzerland with tailored service contracts.`, fr: `Le facility service de SwissCleanMove comprend une gestion globale de bÃ¢timent : nettoyage, conciergerie, entretien extÃ©rieur, service hivernal, entretien des espaces verts et support technique. Les coÃ»ts sont calculÃ©s individuellement selon la taille de la propriÃ©tÃ©, l'Ã©tendue souhaitÃ©e des services et la frÃ©quence. Pour le nettoyage d'entretien seul (cages d'escalier, espaces communs), les prix commencent dÃ¨s CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.â€“ par heure. Les forfaits de conciergerie complets avec entretien rÃ©gulier commencent dÃ¨s CHF ${PRICING_RULES.facilityService.monthly['500']}.â€“ par mois.` },
          links: [{ label: 'Facility Service Schweiz', href: '/facility-service-schweiz' }, { label: 'Hauswartung Schweiz', href: '/hauswartung-schweiz' }]
        },
        {
          q: { de: 'Was kostet eine Unterhaltsreinigung?', en: 'How much does maintenance cleaning cost?', fr: 'Combien coÃ»te un nettoyage d\'entretien ?' },
          snippet: { de: `Unterhaltsreinigung kostet bei SwissCleanMove ab CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.â€“ pro Stunde. Die Kosten richten sich nach ObjektgrÃ¶sse, Reinigungsumfang und -hÃ¤ufigkeit.`, en: `Maintenance cleaning costs from CHF ${PRICING_RULES.maintenance.hourlyRates.residential} per hour at SwissCleanMove. Costs depend on property size, cleaning scope and frequency.`, fr: `Le nettoyage d'entretien coÃ»te dÃ¨s CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.â€“ par heure chez SwissCleanMove. Les coÃ»ts dÃ©pendent de la taille de la propriÃ©tÃ©, de l'Ã©tendue et de la frÃ©quence du nettoyage.` },
          answer: { de: `Die Unterhaltsreinigung umfasst die regelmÃ¤ssige Reinigung von TreppenhÃ¤usern, Eingangsbereichen, GemeinschaftsrÃ¤umen und gewerblichen Objekten. Bei SwissCleanMove beginnt der Preis bei CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.â€“ pro Stunde. Die Gesamtkosten hÃ¤ngen von der GrÃ¶sse des Objekts, dem gewÃ¼nschten Reinigungsumfang und der HÃ¤ufigkeit der EinsÃ¤tze ab. Ein typisches Wohnhaus mit 10 Wohneinheiten und wÃ¶chentlicher Treppenhausreinigung kann beispielsweise CHF 200 â€“ CHF 400 pro Monat kosten. SwissCleanMove erstellt individuelle Angebote nach einer Objektbesichtigung. Unsere ReinigungskrÃ¤fte arbeiten nach einem festgelegten Reinigungsplan und garantieren gleichbleibend hohe QualitÃ¤t.`, en: `Maintenance cleaning covers the regular cleaning of stairwells, entrance areas, common rooms and commercial properties. At SwissCleanMove, the price starts from CHF ${PRICING_RULES.maintenance.hourlyRates.residential} per hour. Total costs depend on the property size, desired cleaning scope and frequency of service. A typical residential building with 10 units and weekly stairwell cleaning may cost CHF 200 â€“ CHF 400 per month. SwissCleanMove creates individual offers after a property inspection. Our cleaning staff work according to a fixed schedule and guarantee consistently high quality.`, fr: `Le nettoyage d'entretien couvre le nettoyage rÃ©gulier des cages d'escalier, entrÃ©es, espaces communs et locaux commerciaux. Chez SwissCleanMove, le prix commence dÃ¨s CHF ${PRICING_RULES.maintenance.hourlyRates.residential}.â€“ par heure. Les coÃ»ts totaux dÃ©pendent de la taille de la propriÃ©tÃ©, de l'Ã©tendue souhaitÃ©e et de la frÃ©quence. Un immeuble rÃ©sidentiel typique de 10 unitÃ©s avec nettoyage hebdomadaire peut coÃ»ter CHF 200 â€“ CHF 400 par mois.` },
          links: [{ label: 'Unterhaltsreinigung Biel', href: '/unterhaltsreinigung-biel' }]
        }
      ]
    },
    {
      category: { de: 'Entsorgung & RÃ¤umung', en: 'Disposal & Clearance', fr: 'Ã‰limination & DÃ©barras' },
      questions: [
        {
          q: { de: 'Was kostet eine WohnungsrÃ¤umung?', en: 'How much does apartment clearance cost?', fr: 'Combien coÃ»te un dÃ©barras d\'appartement ?' },
          snippet: { de: `Eine professionelle WohnungsrÃ¤umung kostet bei SwissCleanMove ab CHF ${PRICING_RULES.disposal.volumePricing['10']}.â€“. Kleinere Entsorgungen beginnen ab CHF ${PRICING_RULES.disposal.volumePricing['1']}.â€“, HausrÃ¤umungen ab CHF ${PRICING_RULES.disposal.volumePricing['20']}.â€“.`, en: `Professional apartment clearance costs from CHF ${PRICING_RULES.disposal.volumePricing['10']} at SwissCleanMove. Smaller disposals start from CHF ${PRICING_RULES.disposal.volumePricing['1']}, house clearances from CHF ${PRICING_RULES.disposal.volumePricing['20']}.`, fr: `Un dÃ©barras d'appartement professionnel coÃ»te dÃ¨s CHF ${PRICING_RULES.disposal.volumePricing['10']}.â€“ chez SwissCleanMove. Les petites Ã©liminations commencent dÃ¨s CHF ${PRICING_RULES.disposal.volumePricing['1']}.â€“, les dÃ©barras de maison dÃ¨s CHF ${PRICING_RULES.disposal.volumePricing['20']}.â€“.` },
          answer: { de: `SwissCleanMove bietet professionelle Entsorgung und RÃ¤umung in der ganzen Schweiz. Eine vollstÃ¤ndige WohnungsrÃ¤umung kostet ab CHF ${PRICING_RULES.disposal.volumePricing['10']}.â€“ und umfasst das AusrÃ¤umen aller MÃ¶bel, GegenstÃ¤nde und Abfall, die fachgerechte Entsorgung nach Schweizer Standards, Recycling wiederverwertbarer Materialien, Verladung und Abtransport sowie eine besenreine Ãœbergabe. FÃ¼r kleinere Entsorgungen (ab CHF ${PRICING_RULES.disposal.volumePricing['1']}.â€“) und Keller- oder EstrichrÃ¤umungen (ab CHF ${PRICING_RULES.disposal.volumePricing['5']}.â€“) bieten wir ebenfalls flexible LÃ¶sungen. HausrÃ¤umungen und GeschÃ¤ftsauflÃ¶sungen werden individuell kalkuliert. Alle Entsorgungen erfolgen umweltgerecht und nach den geltenden Vorschriften.`, en: `SwissCleanMove offers professional disposal and clearance throughout Switzerland. A complete apartment clearance costs from CHF ${PRICING_RULES.disposal.volumePricing['10']} and includes clearing all furniture, items and waste, professional disposal according to Swiss standards, recycling of reusable materials, loading and transport and a swept-clean handover. For smaller disposals (from CHF ${PRICING_RULES.disposal.volumePricing['1']}) and basement or attic clearances (from CHF ${PRICING_RULES.disposal.volumePricing['5']}), we also offer flexible solutions. House clearances and business liquidations are calculated individually. All disposals are carried out in an environmentally friendly manner and according to applicable regulations.`, fr: `SwissCleanMove propose l'Ã©limination et le dÃ©barras professionnels dans toute la Suisse. Un dÃ©barras d'appartement complet coÃ»te dÃ¨s CHF ${PRICING_RULES.disposal.volumePricing['10']}.â€“ et comprend le vidage de tous les meubles, objets et dÃ©chets, l'Ã©limination professionnelle selon les normes suisses, le recyclage des matÃ©riaux rÃ©utilisables, le chargement et transport et une remise balayÃ©e. Pour les petites Ã©liminations (dÃ¨s CHF ${PRICING_RULES.disposal.volumePricing['1']}.â€“) et les dÃ©barras de cave ou grenier (dÃ¨s CHF ${PRICING_RULES.disposal.volumePricing['5']}.â€“), nous proposons Ã©galement des solutions flexibles.` },
          links: [{ label: 'Entsorgung Biel', href: '/entsorgung-biel' }]
        }
      ]
    },
    {
      category: { de: 'Service & Vertrauen', en: 'Service & Trust', fr: 'Service & Confiance' },
      questions: [
        {
          q: { de: 'Welche Regionen betreut SwissCleanMove?', en: 'Which regions does SwissCleanMove serve?', fr: 'Quelles rÃ©gions SwissCleanMove dessert-il ?' },
          snippet: { de: 'SwissCleanMove ist schweizweit tÃ¤tig mit Fokus auf die Regionen Biel/Bienne, Seeland, Bern, Solothurn, Basel, ZÃ¼rich, Fribourg, NeuchÃ¢tel und weitere Kantone.', en: 'SwissCleanMove operates Switzerland-wide with focus on Biel/Bienne, Seeland, Bern, Solothurn, Basel, Zurich, Fribourg, NeuchÃ¢tel and other cantons.', fr: 'SwissCleanMove opÃ¨re dans toute la Suisse avec un focus sur Bienne, Seeland, Berne, Soleure, BÃ¢le, Zurich, Fribourg, NeuchÃ¢tel et d\'autres cantons.' },
          answer: { de: 'SwissCleanMove bietet alle Dienstleistungen â€“ Umzug, Umzugsreinigung, Haushaltshilfe, Facility Service, Hauswartung und Entsorgung â€“ schweizweit an. Unser Hauptstandort ist in Biel/Bienne (Orpundstrasse 31, 2504 Biel). Von dort bedienen wir besonders intensiv das Seeland (Nidau, BrÃ¼gg, Ipsach, Lyss, Aarberg, Pieterlen) sowie die Kantone Bern, Solothurn, Basel, ZÃ¼rich, Aargau, Fribourg, NeuchÃ¢tel, Luzern, St. Gallen, Thurgau, Schwyz, Zug, Jura, Genf, Lausanne/Waadt und Wallis/Valais. FÃ¼r jeden Standort passen wir unsere Dienstleistungen an die regionalen Anforderungen an und bieten lokale Ansprechpartner.', en: 'SwissCleanMove offers all services â€“ moving, move-out cleaning, household help, facility service, property maintenance and disposal â€“ throughout Switzerland. Our headquarters is in Biel/Bienne (Orpundstrasse 31, 2504 Biel). From there we intensively serve the Seeland region (Nidau, BrÃ¼gg, Ipsach, Lyss, Aarberg, Pieterlen) as well as the cantons of Bern, Solothurn, Basel, Zurich, Aargau, Fribourg, NeuchÃ¢tel, Lucerne, St. Gallen, Thurgau, Schwyz, Zug, Jura, Geneva, Lausanne/Vaud and Wallis/Valais. For each location we adapt our services to regional requirements and provide local contacts.', fr: 'SwissCleanMove propose tous les services â€“ dÃ©mÃ©nagement, nettoyage de fin de bail, aide mÃ©nagÃ¨re, facility service, conciergerie et Ã©limination â€“ dans toute la Suisse. Notre siÃ¨ge est Ã  Bienne (Orpundstrasse 31, 2504 Biel). De lÃ , nous desservons intensivement le Seeland (Nidau, BrÃ¼gg, Ipsach, Lyss, Aarberg, Pieterlen) ainsi que les cantons de Berne, Soleure, BÃ¢le, Zurich, Argovie, Fribourg, NeuchÃ¢tel, Lucerne, Saint-Gall, Thurgovie, Schwyz, Zoug, Jura, GenÃ¨ve, Lausanne/Vaud et Valais.' },
          links: [{ label: 'Alle Regionen', href: '/regions' }]
        }
      ]
    }
  ],
  eeat: {
    title: { de: 'Warum SwissCleanMove vertrauen?', en: 'Why Trust SwissCleanMove?', fr: 'Pourquoi Faire Confiance Ã  SwissCleanMove ?' },
    items: [
      { icon: 'Shield', title: { de: 'Versicherte Leistungen', en: 'Insured Services', fr: 'Services AssurÃ©s' }, desc: { de: 'Alle UmzÃ¼ge und Reinigungen sind vollstÃ¤ndig versichert. Ihre MÃ¶bel und Ihr Eigentum sind bei uns in sicheren HÃ¤nden.', en: 'All moves and cleanings are fully insured. Your furniture and property are in safe hands with us.', fr: 'Tous les dÃ©mÃ©nagements et nettoyages sont entiÃ¨rement assurÃ©s. Vos meubles et vos biens sont entre de bonnes mains.' } },
      { icon: 'Users', title: { de: 'Geschulte Teams', en: 'Trained Teams', fr: 'Ã‰quipes FormÃ©es' }, desc: { de: 'Unsere Mitarbeiter werden professionell geschult und arbeiten nach Schweizer QualitÃ¤tsstandards. RegelmÃ¤ssige Weiterbildung sichert gleichbleibend hohe QualitÃ¤t.', en: 'Our staff are professionally trained and work according to Swiss quality standards. Regular training ensures consistently high quality.', fr: 'Notre personnel est formÃ© professionnellement et travaille selon les standards de qualitÃ© suisses. Une formation continue garantit une qualitÃ© constamment Ã©levÃ©e.' } },
      { icon: 'CheckCircle', title: { de: '100% Abnahmegarantie', en: '100% Handover Guarantee', fr: 'Garantie de Remise 100%' }, desc: { de: 'Bei jeder Umzugsreinigung garantieren wir die erfolgreiche Wohnungsabnahme. Kostenlose Nachreinigung bei Beanstandungen.', en: 'We guarantee successful apartment handover with every move-out cleaning. Free re-cleaning in case of complaints.', fr: 'Nous garantissons la remise rÃ©ussie de l\'appartement avec chaque nettoyage. Nettoyage ultÃ©rieur gratuit en cas de rÃ©clamation.' } },
      { icon: 'Clock', title: { de: 'Schnelle Terminvergabe', en: 'Fast Scheduling', fr: 'Planification Rapide' }, desc: { de: 'Flexible und schnelle Terminvergabe â€“ auch kurzfristig. Wir passen uns Ihrem Zeitplan an und sind auch am Wochenende verfÃ¼gbar.', en: 'Flexible and fast scheduling â€“ even on short notice. We adapt to your schedule and are available on weekends.', fr: 'Planification flexible et rapide â€“ mÃªme Ã  court terme. Nous nous adaptons Ã  votre emploi du temps et sommes disponibles le week-end.' } },
      { icon: 'Star', title: { de: 'Transparente Festpreise', en: 'Transparent Fixed Prices', fr: 'Prix Fixes Transparents' }, desc: { de: 'Keine versteckten Kosten, keine Ãœberraschungen. Sie erhalten eine verbindliche Festpreisofferte vor Auftragserteilung.', en: 'No hidden costs, no surprises. You receive a binding fixed-price quote before placing the order.', fr: 'Pas de frais cachÃ©s, pas de surprises. Vous recevez un devis Ã  prix fixe contraignant avant la commande.' } },
      { icon: 'MapPin', title: { de: 'Lokale Schweizer Expertise', en: 'Local Swiss Expertise', fr: 'Expertise Suisse Locale' }, desc: { de: 'Mit Sitz in Biel/Bienne kennen wir die lokalen Anforderungen und arbeiten eng mit Verwaltungen in der ganzen Schweiz zusammen.', en: 'Based in Biel/Bienne, we know local requirements and work closely with property managers throughout Switzerland.', fr: 'BasÃ©s Ã  Bienne, nous connaissons les exigences locales et collaborons Ã©troitement avec les gÃ©rances dans toute la Suisse.' } }
    ]
  },
  serviceLinks: [
    {
      category: { de: 'Umzug', en: 'Moving', fr: 'DÃ©mÃ©nagement' },
      links: [
        { label: { de: 'Umzug Schweiz', en: 'Moving Switzerland', fr: 'DÃ©mÃ©nagement Suisse' }, href: '/umzug-schweiz' },
        { label: { de: 'Umzug Biel', en: 'Moving Biel', fr: 'DÃ©mÃ©nagement Bienne' }, href: '/umzug-biel' },
        { label: { de: 'Umzug Bern', en: 'Moving Bern', fr: 'DÃ©mÃ©nagement Berne' }, href: '/umzug-bern' },
        { label: { de: 'Umzug ZÃ¼rich', en: 'Moving Zurich', fr: 'DÃ©mÃ©nagement Zurich' }, href: '/umzug-zurich' },
        { label: { de: 'Umzug Basel', en: 'Moving Basel', fr: 'DÃ©mÃ©nagement BÃ¢le' }, href: '/umzug-basel' },
        { label: { de: 'Umzugsfirma Biel', en: 'Moving Company Biel', fr: 'Entreprise Bienne' }, href: '/umzugsfirma-biel' },
      ]
    },
    {
      category: { de: 'Reinigung', en: 'Cleaning', fr: 'Nettoyage' },
      links: [
        { label: { de: 'Umzugsreinigung Schweiz', en: 'Move-Out Cleaning CH', fr: 'Nettoyage Fin de Bail CH' }, href: '/umzugsreinigung-schweiz' },
        { label: { de: 'Reinigungsfirma Schweiz', en: 'Cleaning Company CH', fr: 'Entreprise Nettoyage CH' }, href: '/reinigungsfirma-schweiz' },
        { label: { de: 'Endreinigung Biel', en: 'End Cleaning Biel', fr: 'Nettoyage Final Bienne' }, href: '/endreinigung-biel' },
        { label: { de: 'Reinigung Biel', en: 'Cleaning Biel', fr: 'Nettoyage Bienne' }, href: '/reinigung-biel' },
        { label: { de: 'Fensterreinigung Biel', en: 'Window Cleaning Biel', fr: 'Nettoyage Vitres Bienne' }, href: '/fensterreinigung-biel' },
      ]
    },
    {
      category: { de: 'Haushalt & Facility', en: 'Household & Facility', fr: 'MÃ©nage & Facility' },
      links: [
        { label: { de: 'Haushaltshilfe Biel', en: 'Household Help Biel', fr: 'Aide MÃ©nagÃ¨re Bienne' }, href: '/haushaltshilfe-biel' },
        { label: { de: 'Facility Service Schweiz', en: 'Facility Service CH', fr: 'Facility Service CH' }, href: '/facility-service-schweiz' },
        { label: { de: 'Hauswartung Schweiz', en: 'Maintenance CH', fr: 'Conciergerie CH' }, href: '/hauswartung-schweiz' },
        { label: { de: 'Unterhaltsreinigung Biel', en: 'Maintenance Cleaning Biel', fr: 'Nettoyage Entretien Bienne' }, href: '/unterhaltsreinigung-biel' },
        { label: { de: 'Entsorgung Biel', en: 'Disposal Biel', fr: 'Ã‰limination Bienne' }, href: '/entsorgung-biel' },
      ]
    },
    {
      category: { de: 'Regionen', en: 'Regions', fr: 'RÃ©gions' },
      links: [
        { label: { de: 'Kanton Bern', en: 'Canton Bern', fr: 'Canton de Berne' }, href: '/bern' },
        { label: { de: 'Kanton ZÃ¼rich', en: 'Canton Zurich', fr: 'Canton de Zurich' }, href: '/zuerich' },
        { label: { de: 'Kanton Basel', en: 'Canton Basel', fr: 'Canton de BÃ¢le' }, href: '/basel' },
        { label: { de: 'Kanton Solothurn', en: 'Canton Solothurn', fr: 'Canton de Soleure' }, href: '/solothurn' },
        { label: { de: 'Alle Regionen', en: 'All Regions', fr: 'Toutes les RÃ©gions' }, href: '/regions' },
      ]
    }
  ],
  cta: {
    title: { de: 'Kostenlose Offerte anfordern', en: 'Request a Free Quote', fr: 'Demander un Devis Gratuit' },
    desc: { de: 'Planen Sie einen Umzug, eine Umzugsreinigung, Haushaltshilfe oder Entsorgung? Kontaktieren Sie uns fÃ¼r eine kostenlose Beratung und eine unverbindliche Festpreisofferte.', en: 'Planning a move, move-out cleaning, household help or disposal? Contact us for a free consultation and a non-binding fixed-price quote.', fr: 'Vous planifiez un dÃ©mÃ©nagement, un nettoyage de fin de bail, une aide mÃ©nagÃ¨re ou un dÃ©barras ? Contactez-nous pour une consultation gratuite et un devis Ã  prix fixe sans engagement.' },
    btn: { de: 'Offerte anfordern', en: 'Request Quote', fr: 'Demander un Devis' }
  }
};

export default data;
