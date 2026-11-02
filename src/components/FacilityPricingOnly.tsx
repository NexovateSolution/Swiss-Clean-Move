import React from 'react';
import Link from 'next/link';
import { CheckCircle, Building2, Wrench, ShieldCheck, Clock } from 'lucide-react';
import { PRICING_RULES } from '@/lib/pricingRules';

interface FacilityPricingOnlyProps {
  locale: string;
  formService?: string;
  handleCtaClick: (ctaName: string) => void;
}

export default function FacilityPricingOnly({ locale, formService = 'facility-services', handleCtaClick }: FacilityPricingOnlyProps) {
  const isEn = locale === 'en';
  const isFr = locale === 'fr';
  const isIt = locale === 'it';

  const t = {
    badge: isEn
      ? 'Facility Services & Property Maintenance'
      : isFr
      ? 'Conciergerie & Facility Services'
      : isIt
      ? 'Facility Services & Manutenzione Immobili'
      : 'Hauswartung & Gebäudeunterhalt',
    title: isEn
      ? 'Prices for Facility Services & Caretaking'
      : isFr
      ? 'Prix pour Conciergerie & Entretien d’immeubles'
      : isIt
      ? 'Prezzi per Manutenzione Immobili & Custodia'
      : 'Preise für Hauswartung & Gebäudeunterhalt',
    subtitle: isEn
      ? 'Transparent monthly retainers and one-off maintenance for residential and commercial buildings.'
      : isFr
      ? 'Forfaits mensuels transparents et interventions ponctuelles pour immeubles et locaux commerciaux.'
      : isIt
      ? 'Canoni mensili trasparenti e interventi singoli per condomini e spazi commerciali.'
      : 'Transparente Monatspauschalen und Einzeleinsätze für Liegenschaften, Verwaltungen und Gewerbe.',
    desc: isEn
      ? 'SwissCleanMove offers professional property management and caretaking throughout Switzerland. We ensure value retention, immaculate cleanliness, technical security, and smooth operation of your real estate.'
      : isFr
      ? 'SwissCleanMove assure un entretien immobilier professionnel dans toute la Suisse. Nous garantissons la valorisation de votre patrimoine, une propreté irréprochable et le bon fonctionnement technique de vos bâtiments.'
      : isIt
      ? 'SwissCleanMove offre una gestione immobiliare professionale in tutta la Svizzera. Garantiamo il mantenimento del valore, pulizia impeccabile e perfetto funzionamento degli impianti del vostro immobile.'
      : 'SwissCleanMove bietet professionelle Liegenschaftsbetreuung und Gebäudeunterhalt in der gesamten Schweiz. Wir sichern den langfristigen Werterhalt, makellose Sauberkeit und reibungslose technische Abläufe Ihrer Immobilie.',
    monthlyTitle: isEn ? 'Monthly Maintenance Retainer' : isFr ? 'Forfait mensuel d’entretien' : isIt ? 'Canone mensile di manutenzione' : 'Monatliche Liegenschaftsbetreuung',
    oneTimeTitle: isEn ? 'One-Time Deep Maintenance' : isFr ? 'Intervention ponctuelle' : isIt ? 'Intervento singolo straordinario' : 'Einzeleinsatz / Grundreinigung',
    tableHeaderArea: isEn ? 'Property Area' : isFr ? 'Surface du bien' : isIt ? 'Superficie' : 'Gebäudefläche',
    tableHeaderPrice: isEn ? 'Price from' : isFr ? 'Prix dès' : isIt ? 'Prezzo da' : 'Preis ab',
    includedTitle: isEn ? 'Included Caretaking Services' : isFr ? 'Prestations de conciergerie incluses' : isIt ? 'Servizi di custodia inclusi' : 'Leistungsumfang Hauswartung',
    ctaTitle: isEn ? 'Request a Customized Facility Offer' : isFr ? 'Demander un devis de conciergerie' : isIt ? 'Richiedi un preventivo per la manutenzione' : 'Kostenlose Hauswartungsofferte anfordern',
    ctaDesc: isEn
      ? 'We create a tailored service catalog tailored to your property requirements and inspection intervals.'
      : isFr
      ? 'Nous établissons un cahier des charges sur mesure adapté à votre bien et à vos fréquences de passage.'
      : isIt
      ? 'Elaboriamo un capitolato personalizzato per il vostro immobile con frequenze su misura.'
      : 'Wir erstellen ein massgeschneidertes Pflichtenheft exakt passend zu Ihrer Liegenschaft und Ihren Wunschintervallen.',
    ctaBtn: isEn ? 'Request Facility Quote' : isFr ? 'Demander mon devis conciergerie' : isIt ? 'Richiedi preventivo custodia' : 'Jetzt Hauswartungsofferte anfordern',
    uponRequest: isEn ? 'Upon request' : isFr ? 'Sur demande' : isIt ? 'Su richiesta' : 'auf Anfrage',
    perMonth: isEn ? '/ month' : isFr ? '/ mois' : isIt ? '/ mese' : '/ Monat'
  };

  const r = PRICING_RULES.facilityService;

  const monthlyRows = [
    { label: isEn ? 'Up to 200 m²' : isFr ? 'Jusqu’à 200 m²' : isIt ? 'Fino a 200 m²' : 'Bis 200 m²', price: `CHF ${r.monthly['200']}.– ${t.perMonth}` },
    { label: isEn ? '201 to 500 m²' : isFr ? 'De 201 à 500 m²' : isIt ? 'Da 201 a 500 m²' : '201 – 500 m²', price: `CHF ${r.monthly['500']}.– ${t.perMonth}` },
    { label: isEn ? '501 to 1’000 m²' : isFr ? 'De 501 à 1’000 m²' : isIt ? 'Da 501 a 1’000 m²' : '501 – 1’000 m²', price: `CHF ${r.monthly['1000']}.– ${t.perMonth}` },
    { label: isEn ? '1’001 to 2’000 m²' : isFr ? 'De 1’001 à 2’000 m²' : isIt ? 'Da 1’001 a 2’000 m²' : '1’001 – 2’000 m²', price: `CHF ${r.monthly['2000']}.– ${t.perMonth}` },
    { label: isEn ? 'Over 2’000 m² / Commercial Parks' : isFr ? 'Plus de 2’000 m² / Parcs d’activités' : isIt ? 'Oltre 2’000 m² / Complessi' : 'Über 2’000 m² / Gewerbeparks', price: t.uponRequest }
  ];

  const oneTimeRows = [
    { label: isEn ? 'Up to 200 m²' : isFr ? 'Jusqu’à 200 m²' : isIt ? 'Fino a 200 m²' : 'Bis 200 m²', price: `CHF ${r.oneTime['200']}.–` },
    { label: isEn ? '201 to 500 m²' : isFr ? 'De 201 à 500 m²' : isIt ? 'Da 201 a 500 m²' : '201 – 500 m²', price: `CHF ${r.oneTime['500']}.–` },
    { label: isEn ? '501 to 1’000 m²' : isFr ? 'De 501 à 1’000 m²' : isIt ? 'Da 501 a 1’000 m²' : '501 – 1’000 m²', price: `CHF ${r.oneTime['1000']}.–` },
    { label: isEn ? '1’001 to 2’000 m²' : isFr ? 'De 1’001 à 2’000 m²' : isIt ? 'Da 1’001 a 2’000 m²' : '1’001 – 2’000 m²', price: `CHF ${r.oneTime['2000']}.–` }
  ];

  const inclusions = [
    isEn ? 'Regular stairwell, entrance, and elevator cleaning' : isFr ? 'Nettoyage régulier de la cage d’escalier, hall et ascenseur' : isIt ? 'Pulizia regolare vano scale, atrio d’ingresso e ascensore' : 'Regelmässige Treppenhaus-, Eingangs- und Liftreinigung',
    isEn ? 'Technical building inspections and heating system monitoring' : isFr ? 'Surveillance technique, contrôle des installations et chaufferie' : isIt ? 'Monitoraggio tecnico degli impianti e della centrale termica' : 'Technische Kontrollgänge und Überwachung der Haustechnik',
    isEn ? 'Lighting inspections and immediate bulb replacements' : isFr ? 'Contrôle des éclairages et remplacement d’ampoules défectueuses' : isIt ? 'Controllo illuminazione e sostituzione lampadine' : 'Beleuchtungskontrolle und sofortiger Leuchtmitteltausch',
    isEn ? 'Care of outdoor pathways, parking lots, and garden areas' : isFr ? 'Entretien des extérieurs, chemins d’accès et parkings' : isIt ? 'Cura delle aree esterne, vialetti di accesso e parcheggi' : 'Pflege von Aussenanlagen, Vorplätzen, Gehwegen und Rasen',
    isEn ? 'Waste bin management and timely roadside container provision' : isFr ? 'Gestion des conteneurs poubelles et sortie selon calendrier' : isIt ? 'Gestione e posizionamento dei cassonetti rifiuti' : 'Abfallbewirtschaftung und Bereitstellung der Container',
    isEn ? 'Winter services: snow clearance and path salting/grit' : isFr ? 'Service hivernal : déneigement et salage sécurisé' : isIt ? 'Servizio invernale: sgombero neve e spargimento sale' : 'Winterdienst: Schneeräumung und Glatteisbekämpfung',
    isEn ? '24/7 Emergency on-call service for owners and administrations' : isFr ? 'Service d’urgence 24/7 pour gérances et copropriétaires' : isIt ? 'Pronto intervento 24/7 per amministrazioni e condomini' : '24/7 Notfall-Pikettdienst für Verwaltungen und Eigentümer',
    isEn ? 'Minor repairs and fast handyman interventions on site' : isFr ? 'Petites réparations et bricolage technique sur place' : isIt ? 'Piccole riparazioni tecniche e interventi sul posto' : 'Kleinreparaturen und technische Instandhaltung vor Ort'
  ];

  const advantages = [
    {
      title: isEn ? 'Comprehensive Care' : isFr ? 'Entretien 360°' : isIt ? 'Servizio completo 360°' : 'Rundum-Betreuung',
      desc: isEn ? 'One single point of contact for cleaning, technical checks, and outdoor care.' : isFr ? 'Un interlocuteur unique pour le ménage, la technique et les espaces verts.' : isIt ? 'Un unico referente per pulizia, verifiche tecniche e aree verdi.' : 'Ein einziger Ansprechpartner für Reinigung, Technik, Garten und Winterdienst.'
    },
    {
      title: isEn ? 'Permanent Staff' : isFr ? 'Personnel fixe salarié' : isIt ? 'Personale qualificato fisso' : 'Fest angestellte Fachkräfte',
      desc: isEn ? 'No subcontracting. Dedicated, trustworthy caretakers assigned to your building.' : isFr ? 'Pas de sous-traitance. Des concierges de confiance dédiés à votre immeuble.' : isIt ? 'Nessun subappalto. Custodi dedicati e affidabili per il vostro stabile.' : 'Keine Subunternehmer. Feste Bezugspersonen mit hoher Verantwortlichkeit.'
    },
    {
      title: isEn ? 'Value Retention' : isFr ? 'Pérennité du patrimoine' : isIt ? 'Valore dell’immobile' : 'Werterhalt Ihrer Immobilie',
      desc: isEn ? 'Proactive maintenance avoids costly repair damage and satisfies tenants.' : isFr ? 'L’entretien préventif évite des rénovations lourdes et fidélise les locataires.' : isIt ? 'La manutenzione preventiva evita danni costosi e tutela il capitale.' : 'Vorbeugende Instandhaltung verhindert teure Folgeschäden und erfreut Mieter.'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-max max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-swiss-softRed text-swiss-red text-sm font-semibold border border-swiss-red/20">
            <Building2 className="w-4 h-4" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">{t.title}</h2>
          <p className="text-lg font-medium text-swiss-red">{t.subtitle}</p>
          <p className="text-swiss-body max-w-3xl mx-auto leading-relaxed">{t.desc}</p>
        </div>

        {/* Pricing Tables & Inclusions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Tables */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Monthly Retainers */}
            <div className="bg-white rounded-2xl border border-swiss-border shadow-subtle overflow-hidden">
              <div className="p-6 border-b border-swiss-border bg-swiss-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-swiss-text">{t.monthlyTitle}</h3>
                  <p className="text-sm text-swiss-body mt-1">
                    {isEn ? 'Regular continuous caretaking based on building size' : isFr ? 'Entretien régulier selon la surface de l’immeuble' : isIt ? 'Manutenzione periodica in base alla metratura' : 'Regelmässiger Hauswartungsdienst nach Quadratmetern'}
                  </p>
                </div>
                <Building2 className="w-8 h-8 text-swiss-red opacity-80 hidden sm:block" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-swiss-softRed">
                      <th className="p-4 border-b border-swiss-border font-bold text-swiss-text">{t.tableHeaderArea}</th>
                      <th className="p-4 border-b border-swiss-border font-bold text-swiss-text text-right">{t.tableHeaderPrice}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-swiss-border">
                    {monthlyRows.map((row, i) => (
                      <tr key={i} className="hover:bg-swiss-gray-50 transition-colors">
                        <td className="p-4 text-swiss-text font-medium">{row.label}</td>
                        <td className="p-4 text-swiss-text font-semibold text-right">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* One-Time Maintenance */}
            <div className="bg-white rounded-2xl border border-swiss-border shadow-subtle overflow-hidden">
              <div className="p-6 border-b border-swiss-border bg-swiss-gray-50">
                <h3 className="text-xl font-bold text-swiss-text">{t.oneTimeTitle}</h3>
                <p className="text-sm text-swiss-body mt-1">
                  {isEn ? 'One-off comprehensive property inspection and deep cleaning' : isFr ? 'Intervention complète et nettoyage en profondeur' : isIt ? 'Intervento singolo di pulizia profonda e controllo' : 'Einmalige Tiefenreinigung und technische Überprüfung'}
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-swiss-softRed">
                      <th className="p-4 border-b border-swiss-border font-bold text-swiss-text">{t.tableHeaderArea}</th>
                      <th className="p-4 border-b border-swiss-border font-bold text-swiss-text text-right">{t.tableHeaderPrice}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-swiss-border">
                    {oneTimeRows.map((row, i) => (
                      <tr key={i} className="hover:bg-swiss-gray-50 transition-colors">
                        <td className="p-4 text-swiss-text font-medium">{row.label}</td>
                        <td className="p-4 text-swiss-text font-semibold text-right">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

        {/* Facility Dedicated CTA Card */}
        <div className="card p-8 md:p-10 bg-swiss-softRed border border-swiss-border text-center space-y-6 rounded-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-swiss-text">{t.ctaTitle}</h3>
          <p className="text-swiss-body max-w-2xl mx-auto leading-relaxed">{t.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/form?service=facility`}
              className="btn-primary text-base md:text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
              onClick={() => handleCtaClick('facility_pricing_quote_btn')}
            >
              <span>{t.ctaBtn}</span>
            </Link>
            <a
              href="tel:+41782158030"
              className="btn-secondary text-base md:text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
              onClick={() => handleCtaClick('facility_pricing_phone_btn')}
            >
              <span>+41 78 215 80 30</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
