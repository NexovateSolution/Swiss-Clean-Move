import React from 'react';
import Link from 'next/link';
import { CheckCircle, Phone, Mail } from 'lucide-react';
import { PRICING_RULES } from '@/lib/pricingRules';

interface UmzugPricingProps {
  locale: string;
  formService: string;
  handleCtaClick: (ctaName: string) => void;
}

export default function UmzugPricing({ locale, formService, handleCtaClick }: UmzugPricingProps) {
  const t = {
    title: {
      en: 'Prices for Moving, Move-Out Cleaning & Disposal',
      de: 'Preise für Umzug, Umzugsreinigung & Entsorgung',
      fr: 'Prix pour Déménagement, Nettoyage de fin de bail & Élimination'
    },
    subtitle: {
      en: 'Transparent fixed prices. Professional service. Available throughout Switzerland.',
      de: 'Transparente Festpreise. Professioneller Service. Schweizweit.',
      fr: 'Prix fixes transparents. Service professionnel. Dans toute la Suisse.'
    },
    desc: {
      en: 'SwissCleanMove is your reliable partner for professional moving services, move-out cleaning with handover guarantee, transport, disposal, and clearance services across Switzerland. Our experienced teams ensure a smooth, efficient, and stress-free execution of your project.',
      de: 'SwissCleanMove ist Ihr zuverlässiger Partner für professionelle Umzüge, Umzugsreinigungen mit Abnahmegarantie, Transporte, Entsorgungen und Räumungen in der ganzen Schweiz. Unsere erfahrenen Teams sorgen für eine reibungslose, effiziente und stressfreie Durchführung Ihres Auftrags.',
      fr: 'SwissCleanMove est votre partenaire fiable pour les déménagements professionnels, les nettoyages de fin de bail avec garantie de remise, les transports, les éliminations et les débarras dans toute la Suisse. Nos équipes expérimentées assurent une exécution fluide, efficace et sans stress de votre projet.'
    },
    movingTitle: {
      en: 'Moving Prices',
      de: 'Umzug Preise',
      fr: 'Déménagement - Prix'
    },
    movingSubtitle: {
      en: 'Professional moving service for private and business clients',
      de: 'Professioneller Umzugsservice für Privat- und Geschäftskunden',
      fr: 'Service de déménagement professionnel pour clients privés et commerciaux'
    },
    cleaningTitle: {
      en: 'Move-Out Cleaning with Handover Guarantee',
      de: 'Umzugsreinigung mit Abnahmegarantie',
      fr: 'Nettoyage de fin de bail avec garantie de remise'
    },
    cleaningSubtitle: {
      en: 'Professional end-of-tenancy cleaning for a stress-free property handover',
      de: 'Professionelle Endreinigung für eine sorgenfreie Wohnungsübergabe',
      fr: 'Nettoyage de fin de bail professionnel pour une remise de propriété sans stress'
    },
    disposalTitle: {
      en: 'Disposal & Clearance Services',
      de: 'Entsorgung & Räumung',
      fr: 'Services d\'Élimination & Débarras'
    },
    disposalSubtitle: {
      en: 'Fast, reliable, and environmentally friendly',
      de: 'Schnell, zuverlässig und umweltgerecht',
      fr: 'Rapide, fiable et respectueux de l\'environnement'
    },
    popularTitle: {
      en: 'Popular Complete Packages',
      de: 'Beliebte Komplettpakete',
      fr: 'Forfaits Complets Populaires'
    },
    whyTitle: {
      en: 'Why SwissCleanMove?',
      de: 'Warum SwissCleanMove?',
      fr: 'Pourquoi SwissCleanMove ?'
    },
    ctaTitle: {
      en: 'Request a Free Quote Today',
      de: 'Kostenlose Offerte anfordern',
      fr: 'Demander un devis gratuit'
    },
    ctaDesc: {
      en: 'Planning a move, move-out cleaning, or disposal service? Contact us for a free consultation and a non-binding fixed-price quotation.',
      de: 'Planen Sie einen Umzug, eine Umzugsreinigung oder eine Entsorgung? Kontaktieren Sie uns für eine kostenlose Beratung und eine unverbindliche Festpreisofferte.',
      fr: 'Vous planifiez un déménagement, un nettoyage de fin de bail ou un service d\'élimination ? Contactez-nous pour une consultation gratuite et un devis à prix fixe sans engagement.'
    },
    ctaBtn: {
      en: 'Request Quote',
      de: 'Offerte anfordern',
      fr: 'Demander un devis'
    },
    footerDesc: {
      en: 'SwissCleanMove – Your partner for moving, move-out cleaning, disposal, and transport services throughout Switzerland.',
      de: 'SwissCleanMove – Ihr Partner für Umzug, Umzugsreinigung, Entsorgung und Transport in der ganzen Schweiz.',
      fr: 'SwissCleanMove – Votre partenaire pour le déménagement, le nettoyage de fin de bail, l\'élimination et le transport dans toute la Suisse.'
    },
    from: {
      en: 'from',
      de: 'ab',
      fr: 'dès'
    },
    uponRequest: {
      en: 'Upon request',
      de: 'auf Anfrage',
      fr: 'Sur demande'
    },
    priceFrom: {
      en: 'Price from',
      de: 'Preis ab',
      fr: 'Prix à partir de'
    },
    included: {
      en: 'Included in the Price',
      de: 'Im Preis inbegriffen',
      fr: 'Inclus dans le prix'
    },
    includedServices: {
      en: 'Included Services',
      de: 'Inklusive Leistungen',
      fr: 'Services Inclus'
    }
  };

  const getT = (key: keyof typeof t) => t[key][locale as 'en'|'de'|'fr'] || t[key].de;

  const movingPrices = [
    { label: { en: '1 – 1.5 room apartment', de: '1 – 1.5 Zimmer Wohnung', fr: 'Appartement 1 – 1.5 pièces' }, price: `CHF ${PRICING_RULES.moving.basePriceByRooms[1]}.–` },
    { label: { en: '2 – 2.5 room apartment', de: '2 – 2.5 Zimmer Wohnung', fr: 'Appartement 2 – 2.5 pièces' }, price: `CHF ${PRICING_RULES.moving.basePriceByRooms[2]}.–` },
    { label: { en: '3 – 3.5 room apartment', de: '3 – 3.5 Zimmer Wohnung', fr: 'Appartement 3 – 3.5 pièces' }, price: `CHF ${PRICING_RULES.moving.basePriceByRooms[3].toLocaleString('de-CH')}.–` },
    { label: { en: '4 – 4.5 room apartment', de: '4 – 4.5 Zimmer Wohnung', fr: 'Appartement 4 – 4.5 pièces' }, price: `CHF ${PRICING_RULES.moving.basePriceByRooms[4].toLocaleString('de-CH')}.–` },
    { label: { en: '5 – 5.5 room apartment', de: '5 – 5.5 Zimmer Wohnung', fr: 'Appartement 5 – 5.5 pièces' }, price: `CHF ${PRICING_RULES.moving.basePriceByRooms[5].toLocaleString('de-CH')}.–` },
    { label: { en: 'Single-family house', de: 'Einfamilienhaus', fr: 'Maison individuelle' }, price: `${getT('from')} CHF ${PRICING_RULES.moving.houseBasePrice.toLocaleString('de-CH')}.–` },
    { label: { en: 'Single furniture transport', de: 'Einzelmöbel-Transport', fr: 'Transport de meuble individuel' }, price: `${getT('from')} CHF ${PRICING_RULES.transport.basePrice}.–` },
  ];

  const movingIncluded = [
    { en: 'Professional moving team', de: 'Professionelles Umzugsteam', fr: 'Équipe de déménagement professionnelle' },
    { en: 'Modern transport vehicle', de: 'Modernes Transportfahrzeug', fr: 'Véhicule de transport moderne' },
    { en: 'Transport insurance', de: 'Transportversicherung', fr: 'Assurance transport' },
    { en: 'Furniture protection and packing materials', de: 'Möbelschutz und Verpackungsmaterial', fr: 'Protection des meubles et matériel d\'emballage' },
    { en: 'Loading and unloading', de: 'Be- und Entladen', fr: 'Chargement et déchargement' },
    { en: 'Careful furniture transportation', de: 'Sorgfältiger Möbeltransport', fr: 'Transport soigneux des meubles' },
    { en: 'Planning and coordination', de: 'Planung und Koordination', fr: 'Planification et coordination' }
  ];

  const cleaningPrices = [
    { label: { en: 'Studio / 1 room', de: 'Studio / 1 Zimmer', fr: 'Studio / 1 pièce' }, price: `CHF ${PRICING_RULES.cleaning.basePriceByRooms[1]}.–` },
    { label: { en: '2 room apartment', de: '2 Zimmer Wohnung', fr: 'Appartement 2 pièces' }, price: `CHF ${PRICING_RULES.cleaning.basePriceByRooms[2]}.–` },
    { label: { en: '2.5 room apartment', de: '2.5 Zimmer Wohnung', fr: 'Appartement 2.5 pièces' }, price: `CHF ${PRICING_RULES.cleaning.basePriceByRooms[2.5]}.–` },
    { label: { en: '3 room apartment', de: '3 Zimmer Wohnung', fr: 'Appartement 3 pièces' }, price: `CHF ${PRICING_RULES.cleaning.basePriceByRooms[3]}.–` },
    { label: { en: '3.5 room apartment', de: '3.5 Zimmer Wohnung', fr: 'Appartement 3.5 pièces' }, price: `CHF ${PRICING_RULES.cleaning.basePriceByRooms[3.5]}.–` },
    { label: { en: '4 room apartment', de: '4 Zimmer Wohnung', fr: 'Appartement 4 pièces' }, price: `CHF ${PRICING_RULES.cleaning.basePriceByRooms[4]}.–` },
    { label: { en: '4.5 room apartment', de: '4.5 Zimmer Wohnung', fr: 'Appartement 4.5 pièces' }, price: `CHF ${PRICING_RULES.cleaning.basePriceByRooms[4.5].toLocaleString('de-CH')}.–` },
    { label: { en: '5 room apartment', de: '5 Zimmer Wohnung', fr: 'Appartement 5 pièces' }, price: `CHF ${PRICING_RULES.cleaning.basePriceByRooms[5].toLocaleString('de-CH')}.–` },
    { label: { en: 'House / Villa', de: 'Haus / Villa', fr: 'Maison / Villa' }, price: getT('uponRequest') },
  ];

  const cleaningIncluded = [
    { en: '100% handover guarantee', de: '100 % Abnahmegarantie', fr: 'Garantie de remise à 100 %' },
    { en: 'Interior and exterior window cleaning', de: 'Fensterreinigung innen und aussen', fr: 'Nettoyage des vitres intérieur et extérieur' },
    { en: 'Cleaning of all blinds/shutters', de: 'Reinigung aller Storen', fr: 'Nettoyage de tous les stores/volets' },
    { en: 'Complete kitchen cleaning', de: 'Komplette Küchenreinigung', fr: 'Nettoyage complet de la cuisine' },
    { en: 'Descaling of bathrooms and sanitary facilities', de: 'Entkalkung von Bad und Sanitäranlagen', fr: 'Détartrage des salles de bains et sanitaires' },
    { en: 'Floor and surface cleaning', de: 'Boden- und Oberflächenreinigung', fr: 'Nettoyage des sols et surfaces' },
    { en: 'Re-cleaning in case of complaints', de: 'Nachreinigung bei Beanstandungen', fr: 'Nettoyage ultérieur en cas de réclamation' }
  ];

  const disposalPrices = [
    { label: { en: 'Small disposal service', de: 'Kleine Entsorgung', fr: 'Petit service d\'élimination' }, price: `CHF ${PRICING_RULES.disposal.flatRates.small}.–` },
    { label: { en: 'Furniture disposal', de: 'Möbelentsorgung', fr: 'Élimination de meubles' }, price: `CHF ${PRICING_RULES.disposal.flatRates.furniture}.–` },
    { label: { en: 'Basement or attic clearance', de: 'Keller- oder Estrichräumung', fr: 'Débarras de cave ou grenier' }, price: `CHF ${PRICING_RULES.disposal.flatRates.basement}.–` },
    { label: { en: 'Apartment clearance', de: 'Wohnungsräumung', fr: 'Débarras d\'appartement' }, price: `CHF ${PRICING_RULES.disposal.flatRates.apartment}.–` },
    { label: { en: 'House clearance', de: 'Hausräumung', fr: 'Débarras de maison' }, price: `CHF ${PRICING_RULES.disposal.flatRates.house.toLocaleString('de-CH')}.–` },
    { label: { en: 'Business liquidation', de: 'Geschäftsauflösung', fr: 'Liquidation d\'entreprise' }, price: getT('uponRequest') },
  ];

  const disposalIncluded = [
    { en: 'Professional disposal', de: 'Fachgerechte Entsorgung', fr: 'Élimination professionnelle' },
    { en: 'Recycling according to Swiss standards', de: 'Recycling nach Schweizer Standards', fr: 'Recyclage selon les normes suisses' },
    { en: 'Loading and transportation', de: 'Verladung und Abtransport', fr: 'Chargement et transport' },
    { en: 'Swept-clean handover', de: 'Besenreine Übergabe', fr: 'Remise balayée' }
  ];

  const packages = [
    {
      title: { en: 'Moving + Move-Out Cleaning', de: 'Umzug + Umzugsreinigung', fr: 'Déménagement + Nettoyage de fin de bail' },
      price: `${getT('from')} CHF 1'190.–`
    },
    {
      title: { en: 'Cleaning + Disposal', de: 'Reinigung + Entsorgung', fr: 'Nettoyage + Élimination' },
      price: `${getT('from')} CHF 790.–`
    },
    {
      title: { en: 'Moving + Disposal', de: 'Umzug + Entsorgung', fr: 'Déménagement + Élimination' },
      price: `${getT('from')} CHF 990.–`
    },
    {
      title: { en: 'Premium Complete Package', de: 'Premium Komplettpaket', fr: 'Forfait Complet Premium' },
      subtitle: { en: 'Moving + Move-Out Cleaning + Disposal', de: 'Umzug + Umzugsreinigung + Entsorgung', fr: 'Déménagement + Nettoyage + Élimination' },
      price: `${getT('from')} CHF 1'690.–`,
      highlight: true
    }
  ];

  const whyUs = [
    { en: 'Free and non-binding quotation', de: 'Kostenlose und unverbindliche Offerte', fr: 'Devis gratuit et sans engagement' },
    { en: 'Transparent prices with no hidden costs', de: 'Transparente Preise ohne versteckte Kosten', fr: 'Prix transparents sans frais cachés' },
    { en: 'Professional and experienced teams', de: 'Professionelle und erfahrene Teams', fr: 'Équipes professionnelles et expérimentées' },
    { en: 'Move-out cleaning with handover guarantee', de: 'Umzugsreinigung mit Abnahmegarantie', fr: 'Nettoyage de fin de bail avec garantie de remise' },
    { en: 'Fast appointment scheduling', de: 'Schnelle Terminvergabe', fr: 'Prise de rendez-vous rapide' },
    { en: 'Switzerland-wide service', de: 'Schweizweiter Service', fr: 'Service dans toute la Suisse' },
    { en: 'Highest quality standards', de: 'Höchste Qualitätsstandards', fr: 'Normes de qualité les plus élevées' },
    { en: 'Personal consultation and on-site inspection', de: 'Persönliche Beratung und Besichtigung vor Ort', fr: 'Conseil personnel et visite sur place' }
  ];

  const renderTable = (title: string, subtitle: string, items: any[], col1Label: string) => (
    <div className="bg-white rounded-2xl border border-swiss-border shadow-subtle overflow-hidden mb-8">
      <div className="p-6 border-b border-swiss-border bg-swiss-gray-50">
        <h3 className="text-xl font-bold text-swiss-text">{title}</h3>
        <p className="text-sm text-swiss-body mt-1">{subtitle}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-swiss-softRed">
              <th className="p-4 border-b border-swiss-border font-bold text-swiss-text">{col1Label}</th>
              <th className="p-4 border-b border-swiss-border font-bold text-swiss-text">{getT('priceFrom')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-swiss-border">
            {items.map((row, i) => (
              <tr key={i} className="hover:bg-swiss-gray-50 transition-colors">
                <td className="p-4 text-swiss-text font-medium">{row.label[locale as 'en'|'de'|'fr'] || row.label.de}</td>
                <td className="p-4 text-swiss-text">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderIncluded = (title: string, items: any[]) => (
    <div className="bg-swiss-gray-50 p-6 rounded-2xl border border-swiss-border">
      <h4 className="text-lg font-bold text-swiss-text mb-4">{title}</h4>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-swiss-red flex-shrink-0 mt-0.5" />
            <span className="text-swiss-body leading-relaxed">{item[locale as 'en'|'de'|'fr'] || item.de}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="section-padding bg-white">
      <div className="container-max max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-swiss-text">{getT('title')}</h2>
          <p className="text-lg font-medium text-swiss-red">{getT('subtitle')}</p>
          <p className="text-swiss-body max-w-3xl mx-auto">{getT('desc')}</p>
        </div>

        {/* 1. Moving */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {renderTable(
              getT('movingTitle'), 
              getT('movingSubtitle'), 
              movingPrices, 
              locale === 'en' ? 'Apartment Size' : locale === 'fr' ? 'Taille de l\'appartement' : 'Wohnungsgrösse'
            )}
          </div>
          <div className="lg:col-span-1">
            {renderIncluded(getT('included'), movingIncluded)}
          </div>
        </div>

        {/* 2. Cleaning */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {renderTable(
              getT('cleaningTitle'), 
              getT('cleaningSubtitle'), 
              cleaningPrices, 
              locale === 'en' ? 'Property Size' : locale === 'fr' ? 'Taille de la propriété' : 'Objektgrösse'
            )}
          </div>
          <div className="lg:col-span-1">
            {renderIncluded(getT('includedServices'), cleaningIncluded)}
          </div>
        </div>

        {/* 3. Disposal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {renderTable(
              getT('disposalTitle'), 
              getT('disposalSubtitle'), 
              disposalPrices, 
              locale === 'en' ? 'Service' : locale === 'fr' ? 'Service' : 'Dienstleistung'
            )}
          </div>
          <div className="lg:col-span-1">
            {renderIncluded(getT('includedServices'), disposalIncluded)}
          </div>
        </div>

        {/* 4. Packages */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-swiss-text text-center">{getT('popularTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <div key={i} className={`p-6 rounded-2xl border text-center flex flex-col justify-between ${pkg.highlight ? 'bg-swiss-red border-swiss-red text-white shadow-lg transform md:-translate-y-2' : 'bg-white border-swiss-border shadow-subtle'}`}>
                <div>
                  {pkg.highlight && <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">{getT('popularTitle')}</div>}
                  <h4 className={`text-lg font-bold mb-2 ${pkg.highlight ? 'text-white' : 'text-swiss-text'}`}>
                    {pkg.title[locale as 'en'|'de'|'fr'] || pkg.title.de}
                  </h4>
                  {pkg.subtitle && (
                    <p className={`text-sm mb-4 ${pkg.highlight ? 'text-red-100' : 'text-swiss-body'}`}>
                      {pkg.subtitle[locale as 'en'|'de'|'fr'] || pkg.subtitle.de}
                    </p>
                  )}
                </div>
                <div className={`text-xl font-bold mt-4 pt-4 border-t ${pkg.highlight ? 'border-red-400' : 'border-swiss-border'}`}>
                  {pkg.price}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Why Us */}
        <div className="bg-swiss-gray-50 p-8 rounded-2xl border border-swiss-border mt-12">
          <h3 className="text-2xl font-bold text-swiss-text text-center mb-8">{getT('whyTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto">
            {whyUs.map((item, i) => (
              <div key={i} className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm border border-swiss-border">
                <CheckCircle className="w-5 h-5 text-swiss-red flex-shrink-0" />
                <span className="text-swiss-text font-medium">{item[locale as 'en'|'de'|'fr'] || item.de}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-swiss-softRed p-8 md:p-12 rounded-2xl border border-swiss-border text-center space-y-6 mt-12">
          <h3 className="text-2xl md:text-3xl font-bold text-swiss-text">{getT('ctaTitle')}</h3>
          <p className="text-swiss-body text-lg max-w-2xl mx-auto leading-relaxed">
            {getT('ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href={`/${locale}/form?service=${formService}`}
              className="btn-primary text-lg px-8 py-4"
              onClick={() => handleCtaClick('pricing_form_btn')}
            >
              {getT('ctaBtn')}
            </Link>
            <a
              href="tel:+41782158030"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center space-x-2 bg-white"
              onClick={() => handleCtaClick('pricing_phone_btn')}
            >
              <Phone className="w-5 h-5 text-swiss-red" />
              <span>+41 78 215 80 30</span>
            </a>
          </div>
          <div className="pt-6 border-t border-red-100 mt-6 space-y-4">
            <p className="font-medium text-swiss-text">{getT('footerDesc')}</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-swiss-body">
              <a href="tel:+41764883689" className="flex items-center space-x-2 hover:text-swiss-red transition-colors">
                <Phone className="w-4 h-4" />
                <span>+41 76 488 36 89</span>
              </a>
              <a href="mailto:info@swisscleanmove.ch" className="flex items-center space-x-2 hover:text-swiss-red transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@swisscleanmove.ch</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
