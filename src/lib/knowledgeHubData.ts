// Knowledge Hub — Trilingual Content Data
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
      de: 'Preise & Ratgeber – Umzug, Reinigung, Haushaltshilfe Schweiz | SwissCleanMove',
      en: 'Pricing & Guides – Moving, Cleaning, Household Help Switzerland | SwissCleanMove',
      fr: 'Prix & Conseils – Déménagement, Nettoyage, Aide Ménagère Suisse | SwissCleanMove'
    },
    description: {
      de: 'Transparente Preise für Umzug, Umzugsreinigung, Haushaltshilfe, Facility Service und Entsorgung in der Schweiz. Ratgeber, Checklisten und Antworten auf häufige Fragen.',
      en: 'Transparent prices for moving, move-out cleaning, household help, facility services and disposal in Switzerland. Guides, checklists and answers to common questions.',
      fr: 'Prix transparents pour déménagement, nettoyage de fin de bail, aide ménagère, facility services et élimination en Suisse. Guides, checklists et réponses aux questions fréquentes.'
    }
  },
  hero: {
    badge: {
      de: 'Preise & Ratgeber',
      en: 'Pricing & Guides',
      fr: 'Prix & Conseils'
    },
    h1: {
      de: 'SwissCleanMove – Preise, Dienstleistungen & Ratgeber Schweiz',
      en: 'SwissCleanMove – Pricing, Services & Guides Switzerland',
      fr: 'SwissCleanMove – Prix, Services & Guides Suisse'
    },
    subtitle: {
      de: 'Transparente Festpreise, professionelle Beratung und umfassende Informationen zu Umzug, Reinigung, Haushaltshilfe, Facility Service und Entsorgung in der ganzen Schweiz.',
      en: 'Transparent fixed prices, professional consultation and comprehensive information on moving, cleaning, household help, facility services and disposal throughout Switzerland.',
      fr: 'Prix fixes transparents, conseils professionnels et informations complètes sur le déménagement, le nettoyage, l\'aide ménagère, les facility services et l\'élimination dans toute la Suisse.'
    }
  },
  tocSections: [
    { id: 'umzug-preise', label: { de: 'Umzug & Reinigung Preise', en: 'Moving & Cleaning Prices', fr: 'Prix Déménagement & Nettoyage' }, icon: 'Truck' },
    { id: 'haushaltshilfe-preise', label: { de: 'Haushaltshilfe Preise', en: 'Household Help Prices', fr: 'Prix Aide Ménagère' }, icon: 'Heart' },
    { id: 'durchschnittspreise', label: { de: 'Durchschnittspreise Schweiz', en: 'Average Prices Switzerland', fr: 'Prix Moyens Suisse' }, icon: 'BarChart3' },
    { id: 'facility-service', label: { de: 'Facility Service & Hauswartung', en: 'Facility Service & Maintenance', fr: 'Facility Service & Conciergerie' }, icon: 'Building2' },
    { id: 'vergleiche', label: { de: 'Service-Vergleiche', en: 'Service Comparisons', fr: 'Comparaisons de Services' }, icon: 'ArrowLeftRight' },
    { id: 'umzugsvorbereitung', label: { de: 'Umzugsvorbereitung', en: 'Moving Preparation', fr: 'Préparation au Déménagement' }, icon: 'ClipboardList' },
    { id: 'fragen', label: { de: 'Häufige Fragen', en: 'Common Questions', fr: 'Questions Fréquentes' }, icon: 'HelpCircle' },
    { id: 'regionen', label: { de: 'Unsere Regionen', en: 'Our Regions', fr: 'Nos Régions' }, icon: 'MapPin' },
  ],
  introText: {
    de: 'SwissCleanMove ist Ihr vertrauensvoller Partner für Premium-Umzüge, Umzugsreinigungen mit 100% Abnahmegarantie, Haushaltshilfe, Facility Management und umfassende Entsorgungsdienste in der gesamten Schweiz. Hier finden Sie transparente Preise, detaillierte Leistungsübersichten und kompetente Antworten auf Ihre wichtigsten Fragen rund um Umzug und Reinigung in der Schweiz.',
    en: 'SwissCleanMove is your trusted partner for premium moving services, move-out cleaning with a 100% handover guarantee, household help, facility management, and comprehensive disposal services across Switzerland. Here, you will find transparent pricing, detailed service overviews, and expert answers to your most pressing questions about moving and cleaning in Switzerland.',
    fr: 'SwissCleanMove est votre partenaire de confiance pour des services de déménagement premium, le nettoyage de fin de bail avec garantie de remise à 100 %, l\'aide ménagère, le facility management et des services d\'élimination complets dans toute la Suisse. Vous y trouverez des prix transparents, des aperçus détaillés de nos services et des réponses d\'experts à vos questions les plus importantes sur le déménagement et le nettoyage en Suisse.'
  },
  avgPricesTitle: {
    de: 'Durchschnittspreise in der Schweiz',
    en: 'Average Prices in Switzerland',
    fr: 'Prix Moyens en Suisse'
  },
  avgPricesIntro: {
    de: 'Die Preise für Umzug und Reinigung in der Schweiz variieren je nach Anbieter, Region und Leistungsumfang. SwissCleanMove bietet transparente Festpreise, die alle wesentlichen Leistungen beinhalten – ohne versteckte Kosten.',
    en: 'Prices for moving and cleaning in Switzerland vary depending on the provider, region and scope of services. SwissCleanMove offers transparent fixed prices that include all essential services – with no hidden costs.',
    fr: 'Les prix pour le déménagement et le nettoyage en Suisse varient selon le prestataire, la région et l\'étendue des services. SwissCleanMove propose des prix fixes transparents qui incluent tous les services essentiels – sans frais cachés.'
  },
  avgPricesFactors: [
    {
      label: { de: 'Umzug (3.5-Zimmer-Wohnung)', en: 'Moving (3.5-room apartment)', fr: 'Déménagement (3.5 pièces)' },
      desc: { de: `Schweizer Durchschnitt: CHF 1'200 – CHF 3'500. SwissCleanMove: ab CHF ${PRICING_RULES.moving.baseRates['3.5']}.– inkl. Transportversicherung, professionellem Team und Verpackungsmaterial.`, en: `Swiss average: CHF 1,200 – CHF 3,500. SwissCleanMove: from CHF ${PRICING_RULES.moving.baseRates['3.5']}.– incl. transport insurance, professional team and packing materials.`, fr: `Moyenne suisse : CHF 1'200 – CHF 3'500. SwissCleanMove : dès CHF ${PRICING_RULES.moving.baseRates['3.5']}.– incl. assurance transport, équipe professionnelle et matériel d'emballage.` }
    },
    {
      label: { de: 'Umzugsreinigung (3.5-Zimmer-Wohnung)', en: 'Move-out cleaning (3.5-room apt)', fr: 'Nettoyage fin de bail (3.5 pièces)' },
      desc: { de: `Schweizer Durchschnitt: CHF 800 – CHF 1'500. SwissCleanMove: ab CHF ${PRICING_RULES.cleaning.apartment['3.5']}.– mit 100% Abnahmegarantie und kostenloser Nachreinigung.`, en: `Swiss average: CHF 800 – CHF 1,500. SwissCleanMove: from CHF ${PRICING_RULES.cleaning.apartment['3.5']}.– with 100% handover guarantee and free re-cleaning.`, fr: `Moyenne suisse : CHF 800 – CHF 1'500. SwissCleanMove : dès CHF ${PRICING_RULES.cleaning.apartment['3.5']}.– avec garantie de remise à 100% et nettoyage ultérieur gratuit.` }
    },
    {
      label: { de: 'Haushaltshilfe', en: 'Household help', fr: 'Aide ménagère' },
      desc: { de: `Schweizer Durchschnitt: CHF 35 – CHF 55 / Stunde. SwissCleanMove: ab CHF ${PRICING_RULES.household.regular}.– / Stunde für regelmässige Einsätze. Versichert, professionell und zuverlässig.`, en: `Swiss average: CHF 35 – CHF 55 / hour. SwissCleanMove: from CHF ${PRICING_RULES.household.regular}.– / hour for regular appointments. Insured, professional and reliable.`, fr: `Moyenne suisse : CHF 35 – CHF 55 / heure. SwissCleanMove : dès CHF ${PRICING_RULES.household.regular}.– / heure pour les interventions régulières. Assuré, professionnel et fiable.` }
    },
    {
      label: { de: 'Entsorgung & Räumung', en: 'Disposal & clearance', fr: 'Élimination & débarras' },
      desc: { de: `Schweizer Durchschnitt: CHF 500 – CHF 3'000 (Wohnungsräumung). SwissCleanMove: ab CHF ${PRICING_RULES.disposal.volumePricing['1']}.– inkl. fachgerechter Entsorgung und Recycling.`, en: `Swiss average: CHF 500 – CHF 3,000 (apartment clearance). SwissCleanMove: from CHF ${PRICING_RULES.disposal.volumePricing['1']}.– incl. professional disposal and recycling.`, fr: `Moyenne suisse : CHF 500 – CHF 3'000 (débarras d'appartement). SwissCleanMove : dès CHF ${PRICING_RULES.disposal.volumePricing['1']}.– incl. élimination professionnelle et recyclage.` }
    }
  ],
  avgPricesNote: {
    de: 'Was beeinflusst die Preise? Wohnungsgrösse, Stockwerk, Lift, Distanz, Reinigungszustand, Möbelmenge und regionale Unterschiede. Günstige Anbieter sparen oft bei Versicherung, Material oder Personalqualität. SwissCleanMove setzt auf Schweizer Qualitätsstandards, versicherte Leistungen und transparente Festpreise.',
    en: 'What influences prices? Apartment size, floor level, elevator, distance, cleaning condition, furniture quantity and regional differences. Cheap providers often cut costs on insurance, materials or staff quality. SwissCleanMove relies on Swiss quality standards, insured services and transparent fixed prices.',
    fr: 'Qu\'est-ce qui influence les prix ? Taille de l\'appartement, étage, ascenseur, distance, état de propreté, quantité de meubles et différences régionales. Les prestataires bon marché économisent souvent sur l\'assurance, le matériel ou la qualité du personnel. SwissCleanMove mise sur les standards de qualité suisses, des services assurés et des prix fixes transparents.'
  },
  facilityTitle: {
    de: 'Facility Service & Hauswartung',
    en: 'Facility Service & Property Maintenance',
    fr: 'Facility Service & Conciergerie'
  },
  facilitySubtitle: {
    de: 'Professionelle Gebäudeverwaltung und Objektbetreuung für Verwaltungen, Unternehmen und Liegenschaftsbesitzer.',
    en: 'Professional building management and property care for administrations, businesses and property owners.',
    fr: 'Gestion professionnelle de bâtiments et entretien d\'immeubles pour administrations, entreprises et propriétaires.'
  },
  facilityCards: [
    {
      title: { de: 'Hauswartung', en: 'Property Maintenance', fr: 'Conciergerie' },
      desc: { de: 'Regelmässige Gebäudereinigung, Aussenunterhalt, Winterdienst, Grünpflege und technische Objektbetreuung.', en: 'Regular building cleaning, exterior maintenance, winter service, green care and technical property management.', fr: 'Nettoyage régulier de bâtiments, entretien extérieur, service hivernal, entretien des espaces verts et gestion technique.' },
      price: { de: 'Auf Anfrage – individuell kalkuliert', en: 'Upon request – individually calculated', fr: 'Sur demande – calculé individuellement' }
    },
    {
      title: { de: 'Unterhaltsreinigung', en: 'Maintenance Cleaning', fr: 'Nettoyage d\'entretien' },
      desc: { de: 'Regelmässige Treppenhausreinigung, Büroreinigung, Gemeinschaftsräume und gewerbliche Objekte.', en: 'Regular stairwell cleaning, office cleaning, common areas and commercial properties.', fr: 'Nettoyage régulier des cages d\'escalier, nettoyage de bureaux, espaces communs et locaux commerciaux.' },
      price: { de: `Ab CHF ${PRICING_RULES.maintenance.regular}.– / Stunde`, en: `From CHF ${PRICING_RULES.maintenance.regular}.– / hour`, fr: `Dès CHF ${PRICING_RULES.maintenance.regular}.– / heure` }
    },
    {
      title: { de: 'Gastronomie Reinigung', en: 'Restaurant Cleaning', fr: 'Nettoyage Gastronomie' },
      desc: { de: 'Professionelle Küchenreinigung, Hygienestandards, regelmässige Grundreinigung für Restaurants und Hotels.', en: 'Professional kitchen cleaning, hygiene standards, regular deep cleaning for restaurants and hotels.', fr: 'Nettoyage professionnel de cuisine, normes d\'hygiène, nettoyage en profondeur régulier pour restaurants et hôtels.' },
      price: { de: 'Auf Anfrage', en: 'Upon request', fr: 'Sur demande' }
    },
    {
      title: { de: 'Baureinigung', en: 'Construction Cleaning', fr: 'Nettoyage de chantier' },
      desc: { de: 'Bauendreinigung, Feinreinigung nach Renovierung, Neubau-Reinigung und Übergabereinigung.', en: 'Post-construction cleaning, fine cleaning after renovation, new build cleaning and handover cleaning.', fr: 'Nettoyage de fin de chantier, nettoyage fin après rénovation, nettoyage de nouvelle construction et nettoyage de remise.' },
      price: { de: `Ab CHF ${PRICING_RULES.constructionCleaning.postConstruction}.– / Stunde`, en: `From CHF ${PRICING_RULES.constructionCleaning.postConstruction}.– / hour`, fr: `Dès CHF ${PRICING_RULES.constructionCleaning.postConstruction}.– / heure` }
    }
  ],
  comparisons: {
    title: { de: 'Service-Vergleiche', en: 'Service Comparisons', fr: 'Comparaisons de Services' },
    subtitle: { de: 'Welche Dienstleistung ist die richtige für Sie?', en: 'Which service is right for you?', fr: 'Quel service vous convient ?' },
    items: [
      {
        sectionTitle: { de: 'Endreinigung vs. Umzugsreinigung', en: 'Final Cleaning vs. Move-Out Cleaning', fr: 'Nettoyage final vs. Nettoyage de fin de bail' },
        left: {
          title: { de: 'Endreinigung', en: 'Final Cleaning', fr: 'Nettoyage final' },
          points: [
            { de: 'Allgemeine Grundreinigung', en: 'General deep cleaning', fr: 'Nettoyage en profondeur général' },
            { de: 'Keine Abnahmegarantie', en: 'No handover guarantee', fr: 'Pas de garantie de remise' },
            { de: 'Für Zwischenreinigungen geeignet', en: 'Suitable for interim cleaning', fr: 'Adapté au nettoyage intermédiaire' },
            { de: 'Kürzerer Arbeitsaufwand', en: 'Shorter work time', fr: 'Durée de travail plus courte' },
          ],
          bestFor: { de: 'Ideal für Renovierungen oder Zwischenreinigungen', en: 'Ideal for renovations or interim cleanings', fr: 'Idéal pour rénovations ou nettoyages intermédiaires' },
          price: { de: 'Ab CHF 400.–', en: 'From CHF 400.–', fr: 'Dès CHF 400.–' }
        },
        right: {
          title: { de: 'Umzugsreinigung', en: 'Move-Out Cleaning', fr: 'Nettoyage de fin de bail' },
          points: [
            { de: 'Komplette Wohnungsreinigung nach Mietrecht', en: 'Complete apartment cleaning per tenancy law', fr: 'Nettoyage complet selon droit du bail' },
            { de: '100% Abnahmegarantie inklusive', en: '100% handover guarantee included', fr: 'Garantie de remise à 100% incluse' },
            { de: 'Nachreinigung bei Beanstandungen kostenlos', en: 'Free re-cleaning if complaints', fr: 'Nettoyage ultérieur gratuit en cas de réclamation' },
            { de: 'Fenster, Storen, Küche, Bad komplett', en: 'Windows, blinds, kitchen, bathroom complete', fr: 'Fenêtres, stores, cuisine, salle de bain complets' },
          ],
          bestFor: { de: 'Empfohlen bei Wohnungsübergabe an die Verwaltung', en: 'Recommended for property handover to management', fr: 'Recommandé pour la remise de propriété à la gérance' },
          price: { de: `Ab CHF ${PRICING_RULES.moving.baseRates['1']}.–`, en: `From CHF ${PRICING_RULES.moving.baseRates['1']}.–`, fr: `Dès CHF ${PRICING_RULES.moving.baseRates['1']}.–` }
        }
      },
      {
        sectionTitle: { de: 'Haushaltshilfe vs. Unterhaltsreinigung', en: 'Household Help vs. Maintenance Cleaning', fr: 'Aide ménagère vs. Nettoyage d\'entretien' },
        left: {
          title: { de: 'Haushaltshilfe', en: 'Household Help', fr: 'Aide ménagère' },
          points: [
            { de: 'Individuelle Haushaltsunterstützung', en: 'Individual household support', fr: 'Soutien ménager individuel' },
            { de: 'Kochen, Waschen, Bügeln, Einkaufen', en: 'Cooking, washing, ironing, shopping', fr: 'Cuisine, lessive, repassage, courses' },
            { de: 'Flexible Einsatzzeiten', en: 'Flexible scheduling', fr: 'Horaires flexibles' },
            { de: 'Für Privathaushalte und Senioren', en: 'For private households and seniors', fr: 'Pour ménages privés et personnes âgées' },
          ],
          bestFor: { de: 'Ideal für Familien, Berufstätige und Senioren', en: 'Ideal for families, professionals and seniors', fr: 'Idéal pour familles, professionnels et personnes âgées' },
          price: { de: `Ab CHF ${PRICING_RULES.household.regular}.– / Stunde`, en: `From CHF ${PRICING_RULES.household.regular}.– / hour`, fr: `Dès CHF ${PRICING_RULES.household.regular}.– / heure` }
        },
        right: {
          title: { de: 'Unterhaltsreinigung', en: 'Maintenance Cleaning', fr: 'Nettoyage d\'entretien' },
          points: [
            { de: 'Regelmässige Gebäude- und Büroreinigung', en: 'Regular building and office cleaning', fr: 'Nettoyage régulier de bâtiments et bureaux' },
            { de: 'Treppenhäuser, Eingänge, Gemeinschaftsräume', en: 'Stairwells, entrances, common areas', fr: 'Cages d\'escalier, entrées, espaces communs' },
            { de: 'Nach festem Reinigungsplan', en: 'According to fixed cleaning schedule', fr: 'Selon planning de nettoyage fixe' },
            { de: 'Für Verwaltungen und Gewerbe', en: 'For administrations and businesses', fr: 'Pour administrations et entreprises' },
          ],
          bestFor: { de: 'Ideal für Liegenschaftsverwaltungen und Firmen', en: 'Ideal for property managers and companies', fr: 'Idéal pour gérants immobiliers et entreprises' },
          price: { de: `Ab CHF ${PRICING_RULES.maintenance.regular}.– / Stunde`, en: `From CHF ${PRICING_RULES.maintenance.regular}.– / hour`, fr: `Dès CHF ${PRICING_RULES.maintenance.regular}.– / heure` }
        }
      },
      {
        sectionTitle: { de: 'Umzug selbst vs. professionelle Umzugsfirma', en: 'DIY Move vs. Professional Moving Company', fr: 'Déménagement seul vs. Entreprise professionnelle' },
        left: {
          title: { de: 'Selbst umziehen', en: 'DIY Moving', fr: 'Déménager seul' },
          points: [
            { de: 'Transporter selbst mieten (CHF 150–300/Tag)', en: 'Rent van yourself (CHF 150–300/day)', fr: 'Louer un utilitaire soi-même (CHF 150–300/jour)' },
            { de: 'Helfer selbst organisieren', en: 'Organize helpers yourself', fr: 'Organiser ses propres aides' },
            { de: 'Risiko bei Möbelschäden', en: 'Risk of furniture damage', fr: 'Risque de dommages aux meubles' },
            { de: 'Zeitaufwand: 1–3 Tage', en: 'Time: 1–3 days', fr: 'Durée : 1–3 jours' },
          ],
          bestFor: { de: 'Nur bei kleinen Wohnungen und kurzen Distanzen', en: 'Only for small apartments and short distances', fr: 'Uniquement pour petits appartements et courtes distances' },
          price: { de: 'CHF 300 – CHF 800 (+ eigene Arbeitszeit)', en: 'CHF 300 – CHF 800 (+ own work time)', fr: 'CHF 300 – CHF 800 (+ temps de travail propre)' }
        },
        right: {
          title: { de: 'Professionelle Umzugsfirma', en: 'Professional Moving Company', fr: 'Entreprise de déménagement pro' },
          points: [
            { de: 'Kompletter Service inkl. Verpackung', en: 'Complete service incl. packing', fr: 'Service complet incl. emballage' },
            { de: 'Transportversicherung inklusive', en: 'Transport insurance included', fr: 'Assurance transport incluse' },
            { de: 'Professioneller Möbelschutz', en: 'Professional furniture protection', fr: 'Protection professionnelle des meubles' },
            { de: 'Erledigt in wenigen Stunden', en: 'Done in a few hours', fr: 'Terminé en quelques heures' },
          ],
          bestFor: { de: 'Empfohlen ab 2.5 Zimmer oder bei wertvollen Möbeln', en: 'Recommended from 2.5 rooms or with valuable furniture', fr: 'Recommandé dès 2.5 pièces ou avec meubles de valeur' },
          price: { de: `Ab CHF ${PRICING_RULES.moving.baseRates['1']}.– (alles inklusive)`, en: `From CHF ${PRICING_RULES.moving.baseRates['1']}.– (everything included)`, fr: `Dès CHF ${PRICING_RULES.moving.baseRates['1']}.– (tout inclus)` }
        }
      },
      {
        sectionTitle: { de: 'Facility Service vs. Hauswartung', en: 'Facility Service vs. Property Maintenance', fr: 'Facility Service vs. Conciergerie' },
        left: {
          title: { de: 'Facility Service', en: 'Facility Service', fr: 'Facility Service' },
          points: [
            { de: 'Ganzheitliches Gebäudemanagement', en: 'Holistic building management', fr: 'Gestion globale de bâtiment' },
            { de: 'Reinigung, Technik, Sicherheit', en: 'Cleaning, technical, security', fr: 'Nettoyage, technique, sécurité' },
            { de: 'Für grosse Liegenschaften und Gewerbe', en: 'For large properties and commercial', fr: 'Pour grands immeubles et commerces' },
            { de: 'Individuelle Serviceverträge', en: 'Individual service contracts', fr: 'Contrats de service individuels' },
          ],
          bestFor: { de: 'Ideal für Verwaltungen mit mehreren Liegenschaften', en: 'Ideal for managers with multiple properties', fr: 'Idéal pour gérants avec plusieurs immeubles' },
          price: { de: 'Individuell – auf Anfrage', en: 'Individual – upon request', fr: 'Individuel – sur demande' }
        },
        right: {
          title: { de: 'Hauswartung', en: 'Property Maintenance', fr: 'Conciergerie' },
          points: [
            { de: 'Fokus auf Reinigung und Aussenunterhalt', en: 'Focus on cleaning and exterior maintenance', fr: 'Focus sur nettoyage et entretien extérieur' },
            { de: 'Winterdienst und Grünpflege', en: 'Winter service and green care', fr: 'Service hivernal et entretien des espaces verts' },
            { de: 'Für einzelne Wohnhäuser und KMU', en: 'For individual residential buildings and SMEs', fr: 'Pour immeubles résidentiels et PME' },
            { de: 'Regelmässige Betreuung', en: 'Regular maintenance', fr: 'Entretien régulier' },
          ],
          bestFor: { de: 'Ideal für Wohnhäuser und kleine Gewerbeliegenschaften', en: 'Ideal for residential buildings and small commercial properties', fr: 'Idéal pour immeubles résidentiels et petites propriétés commerciales' },
          price: { de: `Ab CHF ${PRICING_RULES.facility.houseMaintenanceMin}.– / Monat`, en: `From CHF ${PRICING_RULES.facility.houseMaintenanceMin}.– / month`, fr: `Dès CHF ${PRICING_RULES.facility.houseMaintenanceMin}.– / mois` }
        }
      }
    ]
  },
  preparation: {
    title: { de: 'Umzugsvorbereitung – Ihre Checkliste', en: 'Moving Preparation – Your Checklist', fr: 'Préparation au Déménagement – Votre Checklist' },
    subtitle: { de: 'Schritt für Schritt zum stressfreien Umzug', en: 'Step by step to a stress-free move', fr: 'Étape par étape vers un déménagement sans stress' },
    steps: [
      {
        phase: { de: '4 Wochen vorher', en: '4 Weeks Before', fr: '4 Semaines Avant' },
        tasks: [
          { de: 'Umzugsfirma beauftragen und Termin fixieren', en: 'Hire moving company and fix date', fr: 'Engager une entreprise de déménagement et fixer la date' },
          { de: 'Alte Wohnung kündigen oder Übergabetermin vereinbaren', en: 'Cancel old apartment or arrange handover date', fr: 'Résilier l\'ancien appartement ou convenir d\'une date de remise' },
          { de: 'Umzugsreinigung buchen (mit Abnahmegarantie)', en: 'Book move-out cleaning (with handover guarantee)', fr: 'Réserver le nettoyage de fin de bail (avec garantie de remise)' },
          { de: 'Adressänderungen vorbereiten (Post, Versicherung, Bank)', en: 'Prepare address changes (post, insurance, bank)', fr: 'Préparer les changements d\'adresse (poste, assurance, banque)' },
        ]
      },
      {
        phase: { de: '1 Woche vorher', en: '1 Week Before', fr: '1 Semaine Avant' },
        tasks: [
          { de: 'Nicht benötigte Gegenstände entsorgen oder spenden', en: 'Dispose of or donate unnecessary items', fr: 'Éliminer ou donner les objets inutiles' },
          { de: 'Kartons packen und beschriften', en: 'Pack and label boxes', fr: 'Emballer et étiqueter les cartons' },
          { de: 'Zählerstände ablesen (Strom, Wasser, Gas)', en: 'Read meter readings (electricity, water, gas)', fr: 'Relever les compteurs (électricité, eau, gaz)' },
          { de: 'Parkplatzbewilligung für Umzugswagen organisieren', en: 'Arrange parking permit for moving truck', fr: 'Organiser un permis de stationnement pour le camion' },
        ]
      },
      {
        phase: { de: 'Am Umzugstag', en: 'Moving Day', fr: 'Jour du Déménagement' },
        tasks: [
          { de: 'Wohnung vor dem Umzug fotografieren', en: 'Photograph apartment before moving', fr: 'Photographier l\'appartement avant le déménagement' },
          { de: 'Umzugsteam koordinieren und einweisen', en: 'Coordinate and brief moving team', fr: 'Coordonner et briefer l\'équipe de déménagement' },
          { de: 'Alle Räume auf vergessene Gegenstände prüfen', en: 'Check all rooms for forgotten items', fr: 'Vérifier toutes les pièces pour objets oubliés' },
          { de: 'Schlüssel für Übergabe bereitlegen', en: 'Prepare keys for handover', fr: 'Préparer les clés pour la remise' },
        ]
      },
      {
        phase: { de: 'Nach dem Umzug', en: 'After the Move', fr: 'Après le Déménagement' },
        tasks: [
          { de: 'Umzugsreinigung durchführen lassen (Abnahmegarantie)', en: 'Have move-out cleaning done (handover guarantee)', fr: 'Faire exécuter le nettoyage de fin de bail (garantie de remise)' },
          { de: 'Wohnungsübergabe mit Verwaltung und Protokoll', en: 'Property handover with management and protocol', fr: 'Remise de l\'appartement avec la gérance et protocole' },
          { de: 'Neue Wohnung einrichten und Adressänderungen abschliessen', en: 'Set up new apartment and finalize address changes', fr: 'Aménager le nouvel appartement et finaliser les changements d\'adresse' },
          { de: 'Mietkaution der alten Wohnung zurückfordern', en: 'Reclaim rental deposit from old apartment', fr: 'Réclamer la caution de l\'ancien appartement' },
        ]
      }
    ]
  },
  qaCategories: [
    {
      category: { de: 'Umzug & Kosten', en: 'Moving & Costs', fr: 'Déménagement & Coûts' },
      questions: [
        {
          q: { de: 'Was kostet ein Umzug in der Schweiz?', en: 'How much does a move cost in Switzerland?', fr: 'Combien coûte un déménagement en Suisse ?' },
          snippet: { de: `Ein professioneller Umzug in der Schweiz kostet je nach Wohnungsgrösse zwischen CHF ${PRICING_RULES.moving.baseRates['1']}.– und CHF ${PRICING_RULES.moving.baseRates['house']}.–. Die Preise hängen von Zimmerzahl, Stockwerk, Distanz und Möbelmenge ab.`, en: `A professional move in Switzerland costs between CHF ${PRICING_RULES.moving.baseRates['1']} and CHF ${PRICING_RULES.moving.baseRates['house']} depending on apartment size. Prices depend on number of rooms, floor level, distance and quantity of furniture.`, fr: `Un déménagement professionnel en Suisse coûte entre CHF ${PRICING_RULES.moving.baseRates['1']}.– et CHF ${PRICING_RULES.moving.baseRates['house']}.– selon la taille de l'appartement. Les prix dépendent du nombre de pièces, de l'étage, de la distance et de la quantité de meubles.` },
          answer: { de: `Bei SwissCleanMove beginnen die Umzugspreise bei CHF ${PRICING_RULES.moving.baseRates['1']}.– für eine 1-Zimmer-Wohnung. Eine 3.5-Zimmer-Wohnung kostet ab CHF ${PRICING_RULES.moving.baseRates['3.5']}.–, ein Einfamilienhaus ab CHF ${PRICING_RULES.moving.baseRates['house']}.–. Im Preis inbegriffen sind ein professionelles Umzugsteam, modernes Transportfahrzeug, Transportversicherung, Möbelschutz, Verpackungsmaterial sowie Be- und Entladen. Zusätzliche Faktoren wie Stockwerk ohne Lift, besonders schwere Gegenstände oder sehr lange Distanzen können den Preis beeinflussen. SwissCleanMove erstellt Ihnen eine kostenlose und unverbindliche Festpreisofferte nach einer persönlichen Besichtigung oder auf Basis Ihrer Angaben.`, en: `At SwissCleanMove, moving prices start at CHF ${PRICING_RULES.moving.baseRates['1']} for a 1-room apartment. A 3.5-room apartment costs from CHF ${PRICING_RULES.moving.baseRates['3.5']}, a single-family house from CHF ${PRICING_RULES.moving.baseRates['house']}. The price includes a professional moving team, modern transport vehicle, transport insurance, furniture protection, packing materials and loading/unloading. Additional factors such as floor without elevator, particularly heavy items or very long distances may affect the price. SwissCleanMove provides you with a free and non-binding fixed-price quote after a personal inspection or based on your details.`, fr: `Chez SwissCleanMove, les prix de déménagement commencent à CHF ${PRICING_RULES.moving.baseRates['1']}.– pour un appartement 1 pièce. Un appartement 3.5 pièces coûte dès CHF ${PRICING_RULES.moving.baseRates['3.5']}.–, une maison individuelle dès CHF ${PRICING_RULES.moving.baseRates['house']}.–. Le prix comprend une équipe professionnelle, un véhicule de transport moderne, une assurance transport, la protection des meubles, le matériel d'emballage et le chargement/déchargement. Des facteurs supplémentaires comme l'étage sans ascenseur, des objets particulièrement lourds ou de très longues distances peuvent influencer le prix. SwissCleanMove vous fournit un devis à prix fixe gratuit et sans engagement.` },
          links: [{ label: 'Umzug Schweiz', href: '/umzug-schweiz' }, { label: 'Umzug Biel', href: '/umzug-biel' }]
        },
        {
          q: { de: 'Wie bereitet man einen Umzug vor?', en: 'How do you prepare for a move?', fr: 'Comment préparer un déménagement ?' },
          snippet: { de: 'Die Umzugsvorbereitung beginnt idealerweise 4 Wochen vor dem Umzugstermin. Wichtigste Schritte: Umzugsfirma buchen, Umzugsreinigung organisieren, Adressänderungen einleiten und systematisch packen.', en: 'Moving preparation ideally starts 4 weeks before the move date. Most important steps: book a moving company, organize move-out cleaning, initiate address changes and pack systematically.', fr: 'La préparation du déménagement commence idéalement 4 semaines avant la date de déménagement. Étapes les plus importantes : réserver une entreprise de déménagement, organiser le nettoyage, initier les changements d\'adresse et emballer systématiquement.' },
          answer: { de: 'Eine gründliche Vorbereitung spart Zeit, Geld und Nerven. Beginnen Sie 4 Wochen vorher mit der Buchung einer professionellen Umzugsfirma und der Umzugsreinigung mit Abnahmegarantie. Informieren Sie Post, Versicherungen und Bank über Ihre neue Adresse. Eine Woche vor dem Umzug sollten Sie systematisch Kartons packen, Zählerstände ablesen und eine Parkplatzbewilligung für den Umzugswagen organisieren. Am Umzugstag selbst fotografieren Sie die Wohnung für das Übergabeprotokoll und koordinieren das Umzugsteam. Nach dem Umzug lassen Sie die professionelle Umzugsreinigung durchführen und erledigen die Wohnungsübergabe mit der Verwaltung. Mit SwissCleanMove können Sie Umzug, Reinigung und Entsorgung aus einer Hand buchen.', en: 'Thorough preparation saves time, money and stress. Start 4 weeks ahead by booking a professional moving company and move-out cleaning with handover guarantee. Inform the post office, insurance companies and bank of your new address. One week before the move, systematically pack boxes, read meter readings and arrange a parking permit for the moving truck. On moving day, photograph the apartment for the handover protocol and coordinate the moving team. After the move, have the professional move-out cleaning done and complete the property handover with management. With SwissCleanMove you can book moving, cleaning and disposal as a complete package.', fr: 'Une préparation minutieuse permet d\'économiser du temps, de l\'argent et du stress. Commencez 4 semaines à l\'avance en réservant une entreprise de déménagement professionnelle et un nettoyage de fin de bail avec garantie de remise. Informez la poste, les assurances et la banque de votre nouvelle adresse. Une semaine avant le déménagement, emballez systématiquement les cartons, relevez les compteurs et organisez un permis de stationnement pour le camion. Le jour du déménagement, photographiez l\'appartement pour le protocole de remise et coordonnez l\'équipe. Après le déménagement, faites exécuter le nettoyage professionnel et effectuez la remise avec la gérance. Avec SwissCleanMove, vous pouvez réserver déménagement, nettoyage et élimination en un seul forfait.' },
          links: [{ label: 'Offerte anfordern', href: '/form' }]
        }
      ]
    },
    {
      category: { de: 'Umzugsreinigung & Endreinigung', en: 'Move-Out & End Cleaning', fr: 'Nettoyage de Fin de Bail' },
      questions: [
        {
          q: { de: 'Was kostet eine Umzugsreinigung?', en: 'How much does move-out cleaning cost?', fr: 'Combien coûte un nettoyage de fin de bail ?' },
          snippet: { de: `Eine professionelle Umzugsreinigung mit Abnahmegarantie kostet in der Schweiz zwischen CHF ${PRICING_RULES.moving.baseRates['1']}.– (Studio) und CHF ${PRICING_RULES.cleaning.apartment['5']}.– (5-Zimmer-Wohnung). Bei SwissCleanMove ist die kostenlose Nachreinigung bei Beanstandungen im Preis inbegriffen.`, en: `A professional move-out cleaning with handover guarantee costs between CHF ${PRICING_RULES.moving.baseRates['1']} (studio) and CHF ${PRICING_RULES.cleaning.apartment['5']} (5-room apartment) in Switzerland. At SwissCleanMove, free re-cleaning in case of complaints is included.`, fr: `Un nettoyage de fin de bail professionnel avec garantie de remise coûte entre CHF ${PRICING_RULES.moving.baseRates['1']}.– (studio) et CHF ${PRICING_RULES.cleaning.apartment['5']}.– (5 pièces) en Suisse. Chez SwissCleanMove, le nettoyage ultérieur gratuit en cas de réclamation est inclus.` },
          answer: { de: `Die Umzugsreinigung ist eine der wichtigsten Dienstleistungen beim Wohnungswechsel. Bei SwissCleanMove beginnen die Preise bei CHF ${PRICING_RULES.moving.baseRates['1']}.– für ein Studio und reichen bis CHF ${PRICING_RULES.cleaning.apartment['5']}.– für eine 5-Zimmer-Wohnung. Häuser und Villen werden individuell kalkuliert. Im Preis inbegriffen sind: Fensterreinigung innen und aussen, Reinigung aller Storen, komplette Küchenreinigung inkl. Backofen und Kühlschrank, Entkalkung von Bad und Sanitäranlagen, Boden- und Oberflächenreinigung sowie die 100% Abnahmegarantie. Das bedeutet: Sollte die Verwaltung bei der Abnahme Mängel feststellen, kommt SwissCleanMove kostenlos für eine Nachreinigung zurück. Dieses Versprechen gibt Ihnen volle Sicherheit für eine erfolgreiche Wohnungsübergabe.`, en: `Move-out cleaning is one of the most important services when changing apartments. At SwissCleanMove, prices start at CHF ${PRICING_RULES.moving.baseRates['1']} for a studio and go up to CHF ${PRICING_RULES.cleaning.apartment['5']} for a 5-room apartment. Houses and villas are calculated individually. Included in the price: interior and exterior window cleaning, cleaning of all blinds, complete kitchen cleaning incl. oven and fridge, descaling of bathroom and sanitary facilities, floor and surface cleaning and the 100% handover guarantee. This means: if the management identifies defects during the inspection, SwissCleanMove returns for a free re-cleaning. This promise gives you full security for a successful property handover.`, fr: `Le nettoyage de fin de bail est l'un des services les plus importants lors d'un changement d'appartement. Chez SwissCleanMove, les prix commencent à CHF ${PRICING_RULES.moving.baseRates['1']}.– pour un studio et vont jusqu'à CHF ${PRICING_RULES.cleaning.apartment['5']}.– pour un 5 pièces. Maisons et villas sont calculées individuellement. Inclus dans le prix : nettoyage des vitres intérieur et extérieur, nettoyage de tous les stores, nettoyage complet de la cuisine incl. four et réfrigérateur, détartrage de la salle de bain et sanitaires, nettoyage des sols et surfaces et la garantie de remise à 100%. Cela signifie : si la gérance constate des défauts lors de la remise, SwissCleanMove revient gratuitement pour un nettoyage ultérieur.` },
          links: [{ label: 'Umzugsreinigung Schweiz', href: '/umzugsreinigung-schweiz' }, { label: 'Endreinigung Biel', href: '/endreinigung-biel' }]
        },
        {
          q: { de: 'Was bedeutet Abnahmegarantie?', en: 'What does handover guarantee mean?', fr: 'Que signifie la garantie de remise ?' },
          snippet: { de: 'Die Abnahmegarantie bedeutet, dass SwissCleanMove garantiert, dass die Wohnung bei der Übergabe an die Verwaltung den Reinigungsstandard erfüllt. Bei Beanstandungen wird kostenlos nachgereinigt.', en: 'The handover guarantee means that SwissCleanMove guarantees the apartment meets the cleaning standard during handover to management. Free re-cleaning is provided if there are complaints.', fr: 'La garantie de remise signifie que SwissCleanMove garantit que l\'appartement respecte les standards de propreté lors de la remise à la gérance. Un nettoyage ultérieur gratuit est effectué en cas de réclamation.' },
          answer: { de: 'Die Abnahmegarantie ist ein Qualitätsversprechen von SwissCleanMove. Sie bedeutet, dass unsere professionelle Umzugsreinigung den strengen Standards entspricht, die Hausverwaltungen bei der Wohnungsübergabe verlangen. Konkret umfasst dies die vollständige Reinigung aller Räume, Fenster (innen und aussen), Storen, Küche inklusive Backofen, Kühlschrank und Abzugshaube, Bad und Sanitäranlagen sowie aller Böden und Oberflächen. Sollte die Verwaltung bei der Abnahme Beanstandungen haben, kommt unser Team kostenlos zurück und bessert nach. Dieses Versprechen schützt Sie vor Nachforderungen und gibt Ihnen die Sicherheit, dass Ihre Mietkaution nicht wegen Reinigungsmängeln einbehalten wird. Die Abnahmegarantie ist bei jeder Umzugsreinigung von SwissCleanMove automatisch im Preis enthalten.', en: 'The handover guarantee is a quality promise from SwissCleanMove. It means our professional move-out cleaning meets the strict standards that property managers require during apartment handover. Specifically, this includes the complete cleaning of all rooms, windows (interior and exterior), blinds, kitchen including oven, fridge and extractor hood, bathroom and sanitary facilities and all floors and surfaces. If management has complaints during the inspection, our team returns free of charge to make corrections. This promise protects you from additional claims and gives you the certainty that your rental deposit will not be withheld due to cleaning deficiencies. The handover guarantee is automatically included in the price of every SwissCleanMove move-out cleaning.', fr: 'La garantie de remise est une promesse de qualité de SwissCleanMove. Elle signifie que notre nettoyage professionnel de fin de bail respecte les standards stricts que les gérances exigent lors de la remise. Cela comprend le nettoyage complet de toutes les pièces, fenêtres (intérieur et extérieur), stores, cuisine y compris four, réfrigérateur et hotte, salle de bain et sanitaires ainsi que tous les sols et surfaces. Si la gérance a des réclamations lors de la remise, notre équipe revient gratuitement pour corriger. Cette promesse vous protège contre les réclamations et vous donne la certitude que votre caution ne sera pas retenue en raison de défauts de nettoyage. La garantie de remise est automatiquement incluse dans le prix de chaque nettoyage de fin de bail SwissCleanMove.' },
          links: [{ label: 'Reinigungsfirma Schweiz', href: '/reinigungsfirma-schweiz' }]
        },
        {
          q: { de: 'Was ist der Unterschied zwischen Endreinigung und Umzugsreinigung?', en: 'What is the difference between end cleaning and move-out cleaning?', fr: 'Quelle est la différence entre nettoyage final et nettoyage de fin de bail ?' },
          snippet: { de: 'Die Umzugsreinigung ist eine vollständige Wohnungsreinigung mit Abnahmegarantie speziell für die Wohnungsübergabe. Die Endreinigung ist eine allgemeine Grundreinigung ohne Übergabegarantie.', en: 'Move-out cleaning is a complete apartment cleaning with handover guarantee specifically for property handover. End cleaning is a general deep cleaning without handover guarantee.', fr: 'Le nettoyage de fin de bail est un nettoyage complet avec garantie de remise spécifiquement pour la remise. Le nettoyage final est un nettoyage en profondeur général sans garantie.' },
          answer: { de: 'Obwohl die Begriffe oft synonym verwendet werden, gibt es einen wichtigen Unterschied. Die Umzugsreinigung (auch Abgabereinigung genannt) ist speziell auf die Anforderungen des Schweizer Mietrechts ausgerichtet und beinhaltet die 100% Abnahmegarantie. Sie umfasst alle Bereiche, die bei einer offiziellen Wohnungsabnahme geprüft werden: Fenster innen und aussen, Storen, Küche komplett, Sanitäranlagen und alle Böden. Bei Beanstandungen wird kostenlos nachgereinigt. Eine allgemeine Endreinigung oder Grundreinigung hingegen ist eine intensive Reinigung ohne spezifischen Bezug zur Mietrecht-Abnahme und ohne Garantie. Wenn Sie umziehen und die Wohnung der Verwaltung übergeben müssen, empfehlen wir immer die Umzugsreinigung mit Abnahmegarantie – für Ihre Sicherheit und für einen stressfreien Auszug.', en: 'Although the terms are often used interchangeably, there is an important difference. Move-out cleaning (also called handover cleaning) is specifically tailored to Swiss tenancy law requirements and includes the 100% handover guarantee. It covers all areas checked during an official apartment inspection: windows inside and outside, blinds, complete kitchen, sanitary facilities and all floors. Free re-cleaning is provided if there are complaints. A general end cleaning or deep cleaning, on the other hand, is an intensive cleaning without specific reference to tenancy law inspection and without guarantee. When moving and handing over the apartment to management, we always recommend move-out cleaning with handover guarantee – for your security and a stress-free move-out.', fr: 'Bien que les termes soient souvent utilisés de manière interchangeable, il existe une différence importante. Le nettoyage de fin de bail est spécifiquement adapté aux exigences du droit du bail suisse et inclut la garantie de remise à 100%. Il couvre tous les domaines vérifiés lors d\'une inspection officielle : fenêtres intérieur et extérieur, stores, cuisine complète, sanitaires et tous les sols. Un nettoyage ultérieur gratuit est effectué en cas de réclamation. Un nettoyage final ou nettoyage en profondeur général est un nettoyage intensif sans référence spécifique au droit du bail et sans garantie. Lors d\'un déménagement et de la remise de l\'appartement à la gérance, nous recommandons toujours le nettoyage de fin de bail avec garantie de remise.' },
          links: [{ label: 'Endreinigung Biel', href: '/endreinigung-biel' }, { label: 'Umzugsreinigung Schweiz', href: '/umzugsreinigung-schweiz' }]
        }
      ]
    },
    {
      category: { de: 'Haushaltshilfe & Putzfrau', en: 'Household Help & Cleaning Lady', fr: 'Aide Ménagère & Femme de Ménage' },
      questions: [
        {
          q: { de: 'Was kostet eine Haushaltshilfe?', en: 'How much does a household helper cost?', fr: 'Combien coûte une aide ménagère ?' },
          snippet: { de: `Eine professionelle Haushaltshilfe kostet bei SwissCleanMove ab CHF ${PRICING_RULES.household.regular}.– pro Stunde bei wöchentlichen Einsätzen. Einmalige Einsätze beginnen ab CHF ${PRICING_RULES.household.oneTime}.– pro Stunde. Mindestauftrag: CHF ${PRICING_RULES.household.minOrder}.–.`, en: `A professional household helper costs from CHF ${PRICING_RULES.household.regular} per hour for weekly appointments at SwissCleanMove. One-time appointments start from CHF ${PRICING_RULES.household.oneTime} per hour. Minimum order: CHF ${PRICING_RULES.household.minOrder}.`, fr: `Une aide ménagère professionnelle coûte dès CHF ${PRICING_RULES.household.regular}.– par heure pour les interventions hebdomadaires chez SwissCleanMove. Les interventions ponctuelles commencent à CHF ${PRICING_RULES.household.oneTime}.– par heure. Commande minimum : CHF ${PRICING_RULES.household.minOrder}.–.` },
          answer: { de: `SwissCleanMove bietet professionelle Haushaltshilfe für Privathaushalte, Familien, Senioren und Berufstätige. Bei regelmässigen wöchentlichen Einsätzen liegt der Preis bei CHF ${PRICING_RULES.household.regular}.– pro Stunde. Haushaltshilfe im 14-tägigen Rhythmus kostet CHF ${PRICING_RULES.household.fourteenDays}.– pro Stunde, einmalige Einsätze CHF ${PRICING_RULES.household.oneTime}.– pro Stunde. Unsere Premium Haushaltshilfe (CHF ${PRICING_RULES.household.premium}.– / Stunde) bietet zusätzliche Leistungen wie Grundreinigung und spezielle Wünsche. Im Service enthalten sind Staubsaugen, Bodenreinigung, Küchen- und Badreinigung, Abstauben, Betten beziehen, Wäsche waschen und auf Wunsch Bügelservice. Alle unsere Haushaltshilfen sind versichert, geschult und arbeiten nach Schweizer Qualitätsstandards. Der Mindestauftrag beträgt CHF ${PRICING_RULES.household.minOrder}.–.`, en: `SwissCleanMove offers professional household help for private households, families, seniors and busy professionals. For regular weekly appointments, the price is CHF ${PRICING_RULES.household.regular} per hour. Household help every two weeks costs CHF ${PRICING_RULES.household.fourteenDays} per hour, one-time appointments CHF ${PRICING_RULES.household.oneTime} per hour. Our premium household help (CHF ${PRICING_RULES.household.premium} / hour) offers additional services like deep cleaning and special requests. Services include vacuuming, floor cleaning, kitchen and bathroom cleaning, dusting, bed making, laundry washing and ironing on request. All our household helpers are insured, trained and work according to Swiss quality standards. Minimum order is CHF ${PRICING_RULES.household.minOrder}.`, fr: `SwissCleanMove propose une aide ménagère professionnelle pour les ménages privés, familles, personnes âgées et professionnels. Pour les interventions hebdomadaires régulières, le prix est de CHF ${PRICING_RULES.household.regular}.– par heure. L'aide ménagère toutes les deux semaines coûte CHF ${PRICING_RULES.household.fourteenDays}.– par heure, les interventions ponctuelles CHF ${PRICING_RULES.household.oneTime}.– par heure. Notre aide ménagère premium (CHF ${PRICING_RULES.household.premium}.– / heure) offre des prestations supplémentaires. Les services incluent l'aspirateur, nettoyage des sols, cuisine et salle de bain, dépoussiérage, lits, lessive et repassage sur demande. Toutes nos aides ménagères sont assurées, formées et travaillent selon les standards suisses. Commande minimum : CHF ${PRICING_RULES.household.minOrder}.–.` },
          links: [{ label: 'Haushaltshilfe Biel', href: '/haushaltshilfe-biel' }]
        },
        {
          q: { de: 'Wie viel kostet eine Putzfrau pro Stunde?', en: 'How much does a cleaning lady cost per hour?', fr: 'Combien coûte une femme de ménage par heure ?' },
          snippet: { de: `Eine professionelle Putzfrau kostet in der Schweiz durchschnittlich CHF 35 – CHF 55 pro Stunde. Bei SwissCleanMove beginnen die Preise bei CHF ${PRICING_RULES.household.regular}.– pro Stunde – versichert und mit Schweizer Qualitätsstandard.`, en: `A professional cleaning lady in Switzerland costs on average CHF 35 – CHF 55 per hour. At SwissCleanMove, prices start at CHF ${PRICING_RULES.household.regular} per hour – insured and with Swiss quality standards.`, fr: `Une femme de ménage professionnelle en Suisse coûte en moyenne CHF 35 – CHF 55 par heure. Chez SwissCleanMove, les prix commencent à CHF ${PRICING_RULES.household.regular}.– par heure – assurée et avec des standards de qualité suisses.` },
          answer: { de: `Der Stundensatz für eine Putzfrau in der Schweiz variiert stark. Privat engagierte Reinigungskräfte ohne Versicherung kosten oft CHF 25 – CHF 35 pro Stunde, bergen aber Risiken bei Schäden oder Unfällen. Professionelle Reinigungsfirmen berechnen CHF 35 – CHF 55 pro Stunde, bieten dafür aber Versicherungsschutz, geschultes Personal und garantierte Qualität. Bei SwissCleanMove zahlen Sie ab CHF ${PRICING_RULES.household.regular}.– pro Stunde für regelmässige Einsätze. Unsere Reinigungskräfte sind vollständig versichert, professionell geschult und verwenden umweltfreundliche Reinigungsmittel. Im Unterschied zu privat angestellten Putzfrauen übernehmen wir die komplette Abwicklung inkl. Ersatz bei Krankheit und Qualitätskontrolle.`, en: `The hourly rate for a cleaning lady in Switzerland varies widely. Privately hired cleaners without insurance often cost CHF 25 – CHF 35 per hour, but carry risks regarding damage or accidents. Professional cleaning companies charge CHF 35 – CHF 55 per hour but offer insurance coverage, trained staff and guaranteed quality. At SwissCleanMove you pay from CHF ${PRICING_RULES.household.regular} per hour for regular appointments. Our cleaning staff are fully insured, professionally trained and use environmentally friendly cleaning products. Unlike privately employed cleaners, we handle the complete administration including replacement in case of illness and quality control.`, fr: `Le tarif horaire pour une femme de ménage en Suisse varie considérablement. Les personnes de ménage engagées privément sans assurance coûtent souvent CHF 25 – CHF 35 par heure, mais comportent des risques en cas de dommages ou accidents. Les entreprises de nettoyage professionnelles facturent CHF 35 – CHF 55 par heure mais offrent une couverture d'assurance, du personnel formé et une qualité garantie. Chez SwissCleanMove, vous payez dès CHF ${PRICING_RULES.household.regular}.– par heure pour les interventions régulières. Notre personnel est entièrement assuré, formé professionnellement et utilise des produits écologiques.` },
          links: [{ label: 'Haushaltshilfe Biel', href: '/haushaltshilfe-biel' }]
        }
      ]
    },
    {
      category: { de: 'Facility Service & Hauswartung', en: 'Facility Service & Maintenance', fr: 'Facility Service & Conciergerie' },
      questions: [
        {
          q: { de: 'Was kostet Facility Service in der Schweiz?', en: 'How much does facility service cost in Switzerland?', fr: 'Combien coûte le facility service en Suisse ?' },
          snippet: { de: `Facility Service wird individuell kalkuliert und richtet sich nach Objektgrösse, Leistungsumfang und Einsatzhäufigkeit. Unterhaltsreinigung beginnt ab CHF ${PRICING_RULES.maintenance.regular}.– / Stunde, umfassende Hauswartung ab CHF ${PRICING_RULES.facility.houseMaintenanceMin}.– / Monat.`, en: `Facility service is individually calculated based on property size, scope of services and frequency. Maintenance cleaning starts from CHF ${PRICING_RULES.maintenance.regular} / hour, comprehensive property maintenance from CHF ${PRICING_RULES.facility.houseMaintenanceMin} / month.`, fr: `Le facility service est calculé individuellement selon la taille de la propriété, l'étendue des services et la fréquence. Le nettoyage d'entretien commence dès CHF ${PRICING_RULES.maintenance.regular}.– / heure, la conciergerie complète dès CHF ${PRICING_RULES.facility.houseMaintenanceMin}.– / mois.` },
          answer: { de: `Der Facility Service von SwissCleanMove umfasst ein ganzheitliches Gebäudemanagement: Reinigung, Hauswartung, Aussenunterhalt, Winterdienst, Grünpflege und technische Betreuung. Die Kosten werden individuell auf Basis von Objektgrösse, gewünschtem Leistungsumfang und Einsatzhäufigkeit berechnet. Für die reine Unterhaltsreinigung (Treppenhäuser, Gemeinschaftsräume) beginnen die Preise ab CHF ${PRICING_RULES.maintenance.regular}.– pro Stunde. Umfassende Hauswartungspakete mit regelmässiger Gebäudebetreuung starten ab CHF ${PRICING_RULES.facility.houseMaintenanceMin}.– pro Monat. SwissCleanMove betreut Verwaltungen, Gewerbebetriebe und Liegenschaftsbesitzer in der ganzen Schweiz und erstellt massgeschneiderte Serviceverträge.`, en: `SwissCleanMove's facility service includes holistic building management: cleaning, property maintenance, exterior upkeep, winter service, green care and technical support. Costs are individually calculated based on property size, desired scope of services and frequency. For maintenance cleaning only (stairwells, common areas), prices start from CHF ${PRICING_RULES.maintenance.regular} per hour. Comprehensive property maintenance packages with regular building care start from CHF ${PRICING_RULES.facility.houseMaintenanceMin} per month. SwissCleanMove serves property managers, businesses and property owners throughout Switzerland with tailored service contracts.`, fr: `Le facility service de SwissCleanMove comprend une gestion globale de bâtiment : nettoyage, conciergerie, entretien extérieur, service hivernal, entretien des espaces verts et support technique. Les coûts sont calculés individuellement selon la taille de la propriété, l'étendue souhaitée des services et la fréquence. Pour le nettoyage d'entretien seul (cages d'escalier, espaces communs), les prix commencent dès CHF ${PRICING_RULES.maintenance.regular}.– par heure. Les forfaits de conciergerie complets avec entretien régulier commencent dès CHF ${PRICING_RULES.facility.houseMaintenanceMin}.– par mois.` },
          links: [{ label: 'Facility Service Schweiz', href: '/facility-service-schweiz' }, { label: 'Hauswartung Schweiz', href: '/hauswartung-schweiz' }]
        },
        {
          q: { de: 'Was kostet eine Unterhaltsreinigung?', en: 'How much does maintenance cleaning cost?', fr: 'Combien coûte un nettoyage d\'entretien ?' },
          snippet: { de: `Unterhaltsreinigung kostet bei SwissCleanMove ab CHF ${PRICING_RULES.maintenance.regular}.– pro Stunde. Die Kosten richten sich nach Objektgrösse, Reinigungsumfang und -häufigkeit.`, en: `Maintenance cleaning costs from CHF ${PRICING_RULES.maintenance.regular} per hour at SwissCleanMove. Costs depend on property size, cleaning scope and frequency.`, fr: `Le nettoyage d'entretien coûte dès CHF ${PRICING_RULES.maintenance.regular}.– par heure chez SwissCleanMove. Les coûts dépendent de la taille de la propriété, de l'étendue et de la fréquence du nettoyage.` },
          answer: { de: `Die Unterhaltsreinigung umfasst die regelmässige Reinigung von Treppenhäusern, Eingangsbereichen, Gemeinschaftsräumen und gewerblichen Objekten. Bei SwissCleanMove beginnt der Preis bei CHF ${PRICING_RULES.maintenance.regular}.– pro Stunde. Die Gesamtkosten hängen von der Grösse des Objekts, dem gewünschten Reinigungsumfang und der Häufigkeit der Einsätze ab. Ein typisches Wohnhaus mit 10 Wohneinheiten und wöchentlicher Treppenhausreinigung kann beispielsweise CHF 200 – CHF 400 pro Monat kosten. SwissCleanMove erstellt individuelle Angebote nach einer Objektbesichtigung. Unsere Reinigungskräfte arbeiten nach einem festgelegten Reinigungsplan und garantieren gleichbleibend hohe Qualität.`, en: `Maintenance cleaning covers the regular cleaning of stairwells, entrance areas, common rooms and commercial properties. At SwissCleanMove, the price starts from CHF ${PRICING_RULES.maintenance.regular} per hour. Total costs depend on the property size, desired cleaning scope and frequency of service. A typical residential building with 10 units and weekly stairwell cleaning may cost CHF 200 – CHF 400 per month. SwissCleanMove creates individual offers after a property inspection. Our cleaning staff work according to a fixed schedule and guarantee consistently high quality.`, fr: `Le nettoyage d'entretien couvre le nettoyage régulier des cages d'escalier, entrées, espaces communs et locaux commerciaux. Chez SwissCleanMove, le prix commence dès CHF ${PRICING_RULES.maintenance.regular}.– par heure. Les coûts totaux dépendent de la taille de la propriété, de l'étendue souhaitée et de la fréquence. Un immeuble résidentiel typique de 10 unités avec nettoyage hebdomadaire peut coûter CHF 200 – CHF 400 par mois.` },
          links: [{ label: 'Unterhaltsreinigung Biel', href: '/unterhaltsreinigung-biel' }]
        }
      ]
    },
    {
      category: { de: 'Entsorgung & Räumung', en: 'Disposal & Clearance', fr: 'Élimination & Débarras' },
      questions: [
        {
          q: { de: 'Was kostet eine Wohnungsräumung?', en: 'How much does apartment clearance cost?', fr: 'Combien coûte un débarras d\'appartement ?' },
          snippet: { de: `Eine professionelle Wohnungsräumung kostet bei SwissCleanMove ab CHF ${PRICING_RULES.disposal.apartmentClearance.apartment}.–. Kleinere Entsorgungen beginnen ab CHF ${PRICING_RULES.disposal.volumePricing['1']}.–, Hausräumungen ab CHF ${PRICING_RULES.disposal.apartmentClearance.house}.–.`, en: `Professional apartment clearance costs from CHF ${PRICING_RULES.disposal.apartmentClearance.apartment} at SwissCleanMove. Smaller disposals start from CHF ${PRICING_RULES.disposal.volumePricing['1']}, house clearances from CHF ${PRICING_RULES.disposal.apartmentClearance.house}.`, fr: `Un débarras d'appartement professionnel coûte dès CHF ${PRICING_RULES.disposal.apartmentClearance.apartment}.– chez SwissCleanMove. Les petites éliminations commencent dès CHF ${PRICING_RULES.disposal.volumePricing['1']}.–, les débarras de maison dès CHF ${PRICING_RULES.disposal.apartmentClearance.house}.–.` },
          answer: { de: `SwissCleanMove bietet professionelle Entsorgung und Räumung in der ganzen Schweiz. Eine vollständige Wohnungsräumung kostet ab CHF ${PRICING_RULES.disposal.apartmentClearance.apartment}.– und umfasst das Ausräumen aller Möbel, Gegenstände und Abfall, die fachgerechte Entsorgung nach Schweizer Standards, Recycling wiederverwertbarer Materialien, Verladung und Abtransport sowie eine besenreine Übergabe. Für kleinere Entsorgungen (ab CHF ${PRICING_RULES.disposal.volumePricing['1']}.–) und Keller- oder Estrichräumungen (ab CHF ${PRICING_RULES.disposal.basementClearance}.–) bieten wir ebenfalls flexible Lösungen. Hausräumungen und Geschäftsauflösungen werden individuell kalkuliert. Alle Entsorgungen erfolgen umweltgerecht und nach den geltenden Vorschriften.`, en: `SwissCleanMove offers professional disposal and clearance throughout Switzerland. A complete apartment clearance costs from CHF ${PRICING_RULES.disposal.apartmentClearance.apartment} and includes clearing all furniture, items and waste, professional disposal according to Swiss standards, recycling of reusable materials, loading and transport and a swept-clean handover. For smaller disposals (from CHF ${PRICING_RULES.disposal.volumePricing['1']}) and basement or attic clearances (from CHF ${PRICING_RULES.disposal.basementClearance}), we also offer flexible solutions. House clearances and business liquidations are calculated individually. All disposals are carried out in an environmentally friendly manner and according to applicable regulations.`, fr: `SwissCleanMove propose l'élimination et le débarras professionnels dans toute la Suisse. Un débarras d'appartement complet coûte dès CHF ${PRICING_RULES.disposal.apartmentClearance.apartment}.– et comprend le vidage de tous les meubles, objets et déchets, l'élimination professionnelle selon les normes suisses, le recyclage des matériaux réutilisables, le chargement et transport et une remise balayée. Pour les petites éliminations (dès CHF ${PRICING_RULES.disposal.volumePricing['1']}.–) et les débarras de cave ou grenier (dès CHF ${PRICING_RULES.disposal.basementClearance}.–), nous proposons également des solutions flexibles.` },
          links: [{ label: 'Entsorgung Biel', href: '/entsorgung-biel' }]
        }
      ]
    },
    {
      category: { de: 'Service & Vertrauen', en: 'Service & Trust', fr: 'Service & Confiance' },
      questions: [
        {
          q: { de: 'Welche Regionen betreut SwissCleanMove?', en: 'Which regions does SwissCleanMove serve?', fr: 'Quelles régions SwissCleanMove dessert-il ?' },
          snippet: { de: 'SwissCleanMove ist schweizweit tätig mit Fokus auf die Regionen Biel/Bienne, Seeland, Bern, Solothurn, Basel, Zürich, Fribourg, Neuchâtel und weitere Kantone.', en: 'SwissCleanMove operates Switzerland-wide with focus on Biel/Bienne, Seeland, Bern, Solothurn, Basel, Zurich, Fribourg, Neuchâtel and other cantons.', fr: 'SwissCleanMove opère dans toute la Suisse avec un focus sur Bienne, Seeland, Berne, Soleure, Bâle, Zurich, Fribourg, Neuchâtel et d\'autres cantons.' },
          answer: { de: 'SwissCleanMove bietet alle Dienstleistungen – Umzug, Umzugsreinigung, Haushaltshilfe, Facility Service, Hauswartung und Entsorgung – schweizweit an. Unser Hauptstandort ist in Biel/Bienne (Orpundstrasse 31, 2504 Biel). Von dort bedienen wir besonders intensiv das Seeland (Nidau, Brügg, Ipsach, Lyss, Aarberg, Pieterlen) sowie die Kantone Bern, Solothurn, Basel, Zürich, Aargau, Fribourg, Neuchâtel, Luzern, St. Gallen, Thurgau, Schwyz, Zug, Jura, Genf, Lausanne/Waadt und Wallis/Valais. Für jeden Standort passen wir unsere Dienstleistungen an die regionalen Anforderungen an und bieten lokale Ansprechpartner.', en: 'SwissCleanMove offers all services – moving, move-out cleaning, household help, facility service, property maintenance and disposal – throughout Switzerland. Our headquarters is in Biel/Bienne (Orpundstrasse 31, 2504 Biel). From there we intensively serve the Seeland region (Nidau, Brügg, Ipsach, Lyss, Aarberg, Pieterlen) as well as the cantons of Bern, Solothurn, Basel, Zurich, Aargau, Fribourg, Neuchâtel, Lucerne, St. Gallen, Thurgau, Schwyz, Zug, Jura, Geneva, Lausanne/Vaud and Wallis/Valais. For each location we adapt our services to regional requirements and provide local contacts.', fr: 'SwissCleanMove propose tous les services – déménagement, nettoyage de fin de bail, aide ménagère, facility service, conciergerie et élimination – dans toute la Suisse. Notre siège est à Bienne (Orpundstrasse 31, 2504 Biel). De là, nous desservons intensivement le Seeland (Nidau, Brügg, Ipsach, Lyss, Aarberg, Pieterlen) ainsi que les cantons de Berne, Soleure, Bâle, Zurich, Argovie, Fribourg, Neuchâtel, Lucerne, Saint-Gall, Thurgovie, Schwyz, Zoug, Jura, Genève, Lausanne/Vaud et Valais.' },
          links: [{ label: 'Alle Regionen', href: '/regions' }]
        }
      ]
    }
  ],
  eeat: {
    title: { de: 'Warum SwissCleanMove vertrauen?', en: 'Why Trust SwissCleanMove?', fr: 'Pourquoi Faire Confiance à SwissCleanMove ?' },
    items: [
      { icon: 'Shield', title: { de: 'Versicherte Leistungen', en: 'Insured Services', fr: 'Services Assurés' }, desc: { de: 'Alle Umzüge und Reinigungen sind vollständig versichert. Ihre Möbel und Ihr Eigentum sind bei uns in sicheren Händen.', en: 'All moves and cleanings are fully insured. Your furniture and property are in safe hands with us.', fr: 'Tous les déménagements et nettoyages sont entièrement assurés. Vos meubles et vos biens sont entre de bonnes mains.' } },
      { icon: 'Users', title: { de: 'Geschulte Teams', en: 'Trained Teams', fr: 'Équipes Formées' }, desc: { de: 'Unsere Mitarbeiter werden professionell geschult und arbeiten nach Schweizer Qualitätsstandards. Regelmässige Weiterbildung sichert gleichbleibend hohe Qualität.', en: 'Our staff are professionally trained and work according to Swiss quality standards. Regular training ensures consistently high quality.', fr: 'Notre personnel est formé professionnellement et travaille selon les standards de qualité suisses. Une formation continue garantit une qualité constamment élevée.' } },
      { icon: 'CheckCircle', title: { de: '100% Abnahmegarantie', en: '100% Handover Guarantee', fr: 'Garantie de Remise 100%' }, desc: { de: 'Bei jeder Umzugsreinigung garantieren wir die erfolgreiche Wohnungsabnahme. Kostenlose Nachreinigung bei Beanstandungen.', en: 'We guarantee successful apartment handover with every move-out cleaning. Free re-cleaning in case of complaints.', fr: 'Nous garantissons la remise réussie de l\'appartement avec chaque nettoyage. Nettoyage ultérieur gratuit en cas de réclamation.' } },
      { icon: 'Clock', title: { de: 'Schnelle Terminvergabe', en: 'Fast Scheduling', fr: 'Planification Rapide' }, desc: { de: 'Flexible und schnelle Terminvergabe – auch kurzfristig. Wir passen uns Ihrem Zeitplan an und sind auch am Wochenende verfügbar.', en: 'Flexible and fast scheduling – even on short notice. We adapt to your schedule and are available on weekends.', fr: 'Planification flexible et rapide – même à court terme. Nous nous adaptons à votre emploi du temps et sommes disponibles le week-end.' } },
      { icon: 'Star', title: { de: 'Transparente Festpreise', en: 'Transparent Fixed Prices', fr: 'Prix Fixes Transparents' }, desc: { de: 'Keine versteckten Kosten, keine Überraschungen. Sie erhalten eine verbindliche Festpreisofferte vor Auftragserteilung.', en: 'No hidden costs, no surprises. You receive a binding fixed-price quote before placing the order.', fr: 'Pas de frais cachés, pas de surprises. Vous recevez un devis à prix fixe contraignant avant la commande.' } },
      { icon: 'MapPin', title: { de: 'Lokale Schweizer Expertise', en: 'Local Swiss Expertise', fr: 'Expertise Suisse Locale' }, desc: { de: 'Mit Sitz in Biel/Bienne kennen wir die lokalen Anforderungen und arbeiten eng mit Verwaltungen in der ganzen Schweiz zusammen.', en: 'Based in Biel/Bienne, we know local requirements and work closely with property managers throughout Switzerland.', fr: 'Basés à Bienne, nous connaissons les exigences locales et collaborons étroitement avec les gérances dans toute la Suisse.' } }
    ]
  },
  serviceLinks: [
    {
      category: { de: 'Umzug', en: 'Moving', fr: 'Déménagement' },
      links: [
        { label: { de: 'Umzug Schweiz', en: 'Moving Switzerland', fr: 'Déménagement Suisse' }, href: '/umzug-schweiz' },
        { label: { de: 'Umzug Biel', en: 'Moving Biel', fr: 'Déménagement Bienne' }, href: '/umzug-biel' },
        { label: { de: 'Umzug Bern', en: 'Moving Bern', fr: 'Déménagement Berne' }, href: '/umzug-bern' },
        { label: { de: 'Umzug Zürich', en: 'Moving Zurich', fr: 'Déménagement Zurich' }, href: '/umzug-zurich' },
        { label: { de: 'Umzug Basel', en: 'Moving Basel', fr: 'Déménagement Bâle' }, href: '/umzug-basel' },
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
      category: { de: 'Haushalt & Facility', en: 'Household & Facility', fr: 'Ménage & Facility' },
      links: [
        { label: { de: 'Haushaltshilfe Biel', en: 'Household Help Biel', fr: 'Aide Ménagère Bienne' }, href: '/haushaltshilfe-biel' },
        { label: { de: 'Facility Service Schweiz', en: 'Facility Service CH', fr: 'Facility Service CH' }, href: '/facility-service-schweiz' },
        { label: { de: 'Hauswartung Schweiz', en: 'Maintenance CH', fr: 'Conciergerie CH' }, href: '/hauswartung-schweiz' },
        { label: { de: 'Unterhaltsreinigung Biel', en: 'Maintenance Cleaning Biel', fr: 'Nettoyage Entretien Bienne' }, href: '/unterhaltsreinigung-biel' },
        { label: { de: 'Entsorgung Biel', en: 'Disposal Biel', fr: 'Élimination Bienne' }, href: '/entsorgung-biel' },
      ]
    },
    {
      category: { de: 'Regionen', en: 'Regions', fr: 'Régions' },
      links: [
        { label: { de: 'Kanton Bern', en: 'Canton Bern', fr: 'Canton de Berne' }, href: '/bern' },
        { label: { de: 'Kanton Zürich', en: 'Canton Zurich', fr: 'Canton de Zurich' }, href: '/zuerich' },
        { label: { de: 'Kanton Basel', en: 'Canton Basel', fr: 'Canton de Bâle' }, href: '/basel' },
        { label: { de: 'Kanton Solothurn', en: 'Canton Solothurn', fr: 'Canton de Soleure' }, href: '/solothurn' },
        { label: { de: 'Alle Regionen', en: 'All Regions', fr: 'Toutes les Régions' }, href: '/regions' },
      ]
    }
  ],
  cta: {
    title: { de: 'Kostenlose Offerte anfordern', en: 'Request a Free Quote', fr: 'Demander un Devis Gratuit' },
    desc: { de: 'Planen Sie einen Umzug, eine Umzugsreinigung, Haushaltshilfe oder Entsorgung? Kontaktieren Sie uns für eine kostenlose Beratung und eine unverbindliche Festpreisofferte.', en: 'Planning a move, move-out cleaning, household help or disposal? Contact us for a free consultation and a non-binding fixed-price quote.', fr: 'Vous planifiez un déménagement, un nettoyage de fin de bail, une aide ménagère ou un débarras ? Contactez-nous pour une consultation gratuite et un devis à prix fixe sans engagement.' },
    btn: { de: 'Offerte anfordern', en: 'Request Quote', fr: 'Demander un Devis' }
  }
};

export default data;
