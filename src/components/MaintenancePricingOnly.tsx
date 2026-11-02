import React from 'react';
import Link from 'next/link';
import { CheckCircle, Building2, Brush, ShieldCheck, Clock } from 'lucide-react';
import { PRICING_RULES } from '@/lib/pricingRules';

interface MaintenancePricingOnlyProps {
  locale: string;
  formService?: string;
  handleCtaClick: (ctaName: string) => void;
}

export default function MaintenancePricingOnly({ locale, formService = 'facility-services', handleCtaClick }: MaintenancePricingOnlyProps) {
  const isEn = locale === 'en';
  const isFr = locale === 'fr';
  const isIt = locale === 'it';

  const t = {
    badge: isEn
      ? 'Office & Commercial Maintenance Cleaning'
      : isFr
      ? 'Nettoyage d’entretien & Bureaux'
      : isIt
      ? 'Pulizia di uffici & Manutenzione'
      : 'Unterhalts- & Büroreinigung',
    title: isEn
      ? 'Prices for Office & Maintenance Cleaning'
      : isFr
      ? 'Prix pour Nettoyage de bureaux & Entretien'
      : isIt
      ? 'Prezzi per Pulizie uffici e Manutenzione'
      : 'Preise für Unterhalts- & Büroreinigung',
    subtitle: isEn
      ? 'Flexible hourly rates and custom cleaning plans for offices, practices, and commercial spaces.'
      : isFr
      ? 'Tarifs horaires flexibles et plans d’entretien sur mesure pour bureaux, cabinets et locaux commerciaux.'
      : isIt
      ? 'Tariffe orarie flessibili e programmi personalizzati per uffici, studi medici e spazi commerciali.'
      : 'Transparente Stundensätze und massgeschneiderte Reinigungspläne für Büros, Praxen und Gewerbe.',
    desc: isEn
      ? 'SwissCleanMove ensures a clean, representative, and hygienic work environment. Whether daily, weekly, or bi-weekly – our discreet and reliable cleaning staff adapts flexibly to your operating schedule.'
      : isFr
      ? 'SwissCleanMove garantit un cadre de travail propre, accueillant et sain. Quotidien, hebdomadaire ou bimensuel – notre personnel de nettoyage discret et rigoureux s’adapte avec souplesse à vos horaires d’ouverture.'
      : isIt
      ? 'SwissCleanMove garantisce un ambiente di lavoro pulito, rappresentativo e igienico. Quotidiano, settimanale o quindicinale – il nostro personale affidabile e discreto si adatta con flessibilità ai vostri orari aziendali.'
      : 'SwissCleanMove sorgt für ein sauberes, repräsentatives und hygienisches Arbeitsumfeld. Ob täglich, wöchentlich oder 14-täglich – unsere diskreten und zuverlässigen Reinigungskräfte passen sich flexibel Ihren Geschäftszeiten an.',
    tableHeaderSector: isEn ? 'Premises Category' : isFr ? 'Catégorie de locaux' : isIt ? 'Categoria locali' : 'Einsatzbereich / Objektart',
    tableHeaderRate: isEn ? 'Rate from' : isFr ? 'Tarif dès' : isIt ? 'Tariffa da' : 'Stundensatz ab',
    includedTitle: isEn ? 'Included in Office Cleaning' : isFr ? 'Prestations d’entretien incluses' : isIt ? 'Prestazioni incluse' : 'Inbegriffene Leistungen',
    whyTitle: isEn ? 'Why SwissCleanMove' : isFr ? 'Vos avantages entreprise' : isIt ? 'I vantaggi aziendali' : 'Ihre Vorteile',
    ctaTitle: isEn ? 'Request a Free Office Cleaning Quote' : isFr ? 'Demander un devis de nettoyage de bureau' : isIt ? 'Richiedi un preventivo pulizie uffici' : 'Kostenlose Büroreinigungsofferte anfordern',
    ctaDesc: isEn
      ? 'We perform a free on-site consultation to define your custom cleaning schedule and interval.'
      : isFr
      ? 'Visite sur place gratuite pour définir ensemble le cahier des charges et la fréquence idéale.'
      : isIt
      ? 'Sopralluogo gratuito per definire insieme il capitolato d’oneri e la frequenza ideale.'
      : 'Vereinbaren Sie eine kostenlose Besichtigung vor Ort zur Erstellung Ihres massgeschneiderten Pflichtenhefts.',
    ctaBtn: isEn ? 'Calculate Cleaning Offer' : isFr ? 'Calculer mon devis de bureau' : isIt ? 'Calcola preventivo uffici' : 'Jetzt Büroreinigung anfragen',
    perHour: isEn ? '/ hour' : isFr ? '/ heure' : isIt ? '/ ora' : '/ Std.'
  };

  const m = PRICING_RULES.maintenance;

  const rateRows = [
    { label: isEn ? 'Offices, Medical Practices & Consultancies' : isFr ? 'Bureaux, Cabinets médicaux & Études' : isIt ? 'Uffici, Studi medici & Consulenze' : 'Büros, Praxen & Kanzleien', price: `CHF ${m.hourlyRates.office}.– ${t.perHour}` },
    { label: isEn ? 'Commercial premises, Boutiques & Showrooms' : isFr ? 'Locaux commerciaux, Boutiques & Showrooms' : isIt ? 'Locali commerciali, Negozi & Showroom' : 'Gewerbeflächen, Boutiquen & Showrooms', price: `CHF ${m.hourlyRates.commercial}.– ${t.perHour}` },
    { label: isEn ? 'Private Residences & Luxury Apartments' : isFr ? 'Résidences privées & Appartements de standing' : isIt ? 'Residenze private & Appartamenti' : 'Privatwohnungen & Residenzen', price: `CHF ${m.hourlyRates.residential}.– ${t.perHour}` },
    { label: isEn ? 'Weekly cleaning frequency discount' : isFr ? 'Remise fréquence hebdomadaire' : isIt ? 'Sconto frequenza settimanale' : 'Rabatt bei wöchentlicher Reinigung', price: '-5%' },
    { label: isEn ? '2–3 times per week frequency discount' : isFr ? 'Remise 2 à 3 fois par semaine' : isIt ? 'Sconto 2–3 volte a settimana' : 'Rabatt bei 2–3 Einsätzen pro Woche', price: '-8% bis -10%' },
    { label: isEn ? 'Daily / Annual corporate contract' : isFr ? 'Contrat annuel / Quotidien' : isIt ? 'Contratto annuale / Giornaliero' : 'Jahresvertrag / Täglicher Einsatz', price: '-10% bis -15%' }
  ];

  const inclusions = [
    isEn ? 'Cleaning and sanitization of workstations, desks, screens, and phones' : isFr ? 'Nettoyage et désinfection des postes de travail, claviers et téléphones' : isIt ? 'Pulizia e sanificazione postazioni di lavoro, scrivanie e telefoni' : 'Reinigung und Desinfektion von Schreibtischen, Tastaturen und Bildschirmen',
    isEn ? 'Complete sanitary hygiene: descaling, disinfection, refill of supplies' : isFr ? 'Hygiène sanitaire totale : détartrage, désinfection, réassort consommables' : isIt ? 'Igiene completa dei bagni: disincrostazione, disinfezione e ricariche' : 'Hygienische Desinfektion von WCs, Waschbecken und Auffüllen von Seife/Papier',
    isEn ? 'Kitchen and coffee lounge care (dishwashers, sinks, counter tops)' : isFr ? 'Entretien de la kitchenette et coin pause (lave-vaisselle, évier)' : isIt ? 'Cura dell’area caffè e cucina (lavastoviglie, lavello, superfici)' : 'Kaffeeküchen-Pflege: Geschirrspüler einräumen, Spüle und Tische reinigen',
    isEn ? 'Thorough vacuuming of carpets and damp mopping of hard floors' : isFr ? 'Aspiration minutieuse des moquettes et lavage des sols durs' : isIt ? 'Aspirazione accurata moquette e lavaggio pavimenti duri' : 'Gründliches Saugen von Teppichen und feuchtes Wischen aller Hartbeläge',
    isEn ? 'Waste bin emptying and correct waste segregation' : isFr ? 'Vidage de toutes les poubelles et tri sélectif rigoureux' : isIt ? 'Svuotamento cestini e rigorosa raccolta differenziata' : 'Entleerung aller Papierkörbe, Mülleimer und fachgerechte Abfalltrennung',
    isEn ? 'Trained cleaning staff with high reliability and discretion' : isFr ? 'Personnel qualifié et discret respectant la confidentialité de vos locaux' : isIt ? 'Personale qualificato e discreto nel rispetto della riservatezza' : 'Geschulte Reinigungskräfte mit hoher Zuverlässigkeit und Diskretion',
    isEn ? 'Eco-certified Swiss professional detergents and equipment included' : isFr ? 'Produits d’entretien écologiques professionnels suisses inclus' : isIt ? 'Detergenti professionali svizzeri ecologici e attrezzature inclusi' : 'Ökologische Schweizer Profi-Reinigungsmittel und Geräte inklusive',
    isEn ? 'Flexible operating hours (early mornings, evenings, or weekends)' : isFr ? 'Horaires flexibles (tôt le matin, en soirée ou le week-end)' : isIt ? 'Orari flessibili (mattina presto, sera o fine settimana)' : 'Einsatzzeiten flexibel vor oder nach Ihren Bürozeiten oder am Wochenende'
  ];

  const advantages = [
    {
      title: isEn ? 'Meticulous Execution' : isFr ? 'Exécution soignée' : isIt ? 'Esecuzione accurata' : 'Sorgfältige Ausführung',
      desc: isEn ? 'Reliable cleaners with a sharp eye for cleanliness, order, and discretion in your premises.' : isFr ? 'Des agents attentifs à la propreté, à l’ordre et à la discrétion dans vos locaux.' : isIt ? 'Addetti attenti alla pulizia, all’ordine e alla riservatezza nei vostri spazi.' : 'Verlässliche Reinigungskräfte mit Sinn für Sauberkeit, Ordnung und Diskretion in Ihren Räumen.'
    },
    {
      title: isEn ? 'Clear Arrangements' : isFr ? 'Accords clairs' : isIt ? 'Accordi chiari' : 'Klare Absprachen',
      desc: isEn ? 'Fixed cleaning schedules and an individually tailored service specification for your premises.' : isFr ? 'Créneaux fixes et cahier des charges personnalisé adapté exactement à votre bâtiment.' : isIt ? 'Orari concordati e capitolato d’oneri su misura per la vostra struttura.' : 'Feste Einsatzzeiten und ein individuell abgestimmtes Pflichtenheft für Ihr Objekt.'
    },
    {
      title: isEn ? 'Quality Guarantee' : isFr ? 'Contrôle qualité' : isIt ? 'Controllo qualità' : 'Garantierte Qualität',
      desc: isEn ? 'Regular supervisor inspections ensure continuously high cleaning standards.' : isFr ? 'Passages réguliers du responsable pour contrôler le niveau de propreté.' : isIt ? 'Verifiche periodiche per garantire costantemente standard elevati.' : 'Regelmässige Qualitätsaudits und ein persönlicher Ansprechpartner vor Ort.'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-max max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-swiss-softRed text-swiss-red text-sm font-semibold border border-swiss-red/20">
            <Brush className="w-4 h-4" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">{t.title}</h2>
          <p className="text-lg font-medium text-swiss-red">{t.subtitle}</p>
          <p className="text-swiss-body max-w-3xl mx-auto leading-relaxed">{t.desc}</p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-swiss-border shadow-subtle overflow-hidden">
            <div className="p-6 border-b border-swiss-border bg-swiss-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-swiss-text">
                  {isEn ? 'Hourly Rates & Frequency Discounts' : isFr ? 'Tarifs horaires et remises de fréquence' : isIt ? 'Tariffe orarie e sconti frequenza' : 'Stundensätze & Frequenzrabatte'}
                </h3>
                <p className="text-sm text-swiss-body mt-1">
                  {isEn ? 'Transparent rates per operating hour, cleaning supplies included' : isFr ? 'Tarifs clairs à l’heure, matériel et produits inclus' : isIt ? 'Tariffe orarie chiare, materiali e detergenti inclusi' : 'Inklusive professioneller Reinigungsmittel, moderner Geräte und Qualitätskontrolle'}
                </p>
              </div>
              <Building2 className="w-8 h-8 text-swiss-red opacity-80 hidden sm:block" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-swiss-softRed">
                    <th className="p-4 border-b border-swiss-border font-bold text-swiss-text">{t.tableHeaderSector}</th>
                    <th className="p-4 border-b border-swiss-border font-bold text-swiss-text text-right">{t.tableHeaderRate}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-swiss-border">
                  {rateRows.map((row, i) => (
                    <tr key={i} className="hover:bg-swiss-gray-50 transition-colors">
                      <td className="p-4 text-swiss-text font-medium">{row.label}</td>
                      <td className="p-4 text-swiss-text font-semibold text-right">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-swiss-gray-50 border-t border-swiss-border text-xs text-swiss-body">
              {isEn
                ? '* Minimum order per visit is 2 hours. Monthly itemized invoicing with net 30 payment terms.'
                : isFr
                ? '* Commande minimum de 2 heures par passage. Facturation mensuelle détaillée à 30 jours.'
                : isIt
                ? '* Intervento minimo di 2 ore per uscita. Fatturazione mensile dettagliata con pagamento a 30 giorni.'
                : '* Mindesteinsatzdauer beträgt 2 Stunden pro Termin. Übersichtliche monatliche Sammelrechnung mit 30 Tagen Zahlungsziel.'}
            </div>
          </div>

          {/* Inclusions Card */}
          <div className="lg:col-span-1 bg-swiss-gray-50 p-6 rounded-2xl border border-swiss-border space-y-4">
            <h4 className="text-lg font-bold text-swiss-text flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-swiss-red" />
              <span>{t.includedTitle}</span>
            </h4>
            <ul className="space-y-3">
              {inclusions.map((item, i) => (
                <li key={i} className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-swiss-red flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-swiss-body leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3 Advantage Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-swiss-border shadow-subtle space-y-2 text-center sm:text-left">
              <h4 className="font-bold text-swiss-text text-base">{adv.title}</h4>
              <p className="text-sm text-swiss-body leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>

        {/* Maintenance Dedicated CTA Card */}
        <div className="card p-8 md:p-10 bg-swiss-softRed border border-swiss-border text-center space-y-6 rounded-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-swiss-text">{t.ctaTitle}</h3>
          <p className="text-swiss-body max-w-2xl mx-auto leading-relaxed">{t.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/form?service=facility`}
              className="btn-primary text-base md:text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
              onClick={() => handleCtaClick('maintenance_pricing_quote_btn')}
            >
              <span>{t.ctaBtn}</span>
            </Link>
            <a
              href="tel:+41782158030"
              className="btn-secondary text-base md:text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
              onClick={() => handleCtaClick('maintenance_pricing_phone_btn')}
            >
              <span>+41 78 215 80 30</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
