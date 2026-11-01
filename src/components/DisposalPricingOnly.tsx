import React from 'react';
import Link from 'next/link';
import { CheckCircle, Trash2, ShieldCheck, Recycle } from 'lucide-react';
import { PRICING_RULES } from '@/lib/pricingRules';

interface DisposalPricingOnlyProps {
  locale: string;
  formService?: string;
  handleCtaClick: (ctaName: string) => void;
}

export default function DisposalPricingOnly({ locale, formService = 'disposal', handleCtaClick }: DisposalPricingOnlyProps) {
  const isEn = locale === 'en';
  const isFr = locale === 'fr';
  const isIt = locale === 'it';

  const t = {
    badge: isEn
      ? 'Eco-friendly Disposal & Clearance'
      : isFr
      ? 'Élimination écologique & Débarras'
      : isIt
      ? 'Smaltimento ecologico & Sgombero'
      : 'Entsorgung & Räumung',
    title: isEn
      ? 'Prices for Disposal & Clearance'
      : isFr
      ? 'Prix pour Débarras & Élimination'
      : isIt
      ? 'Prezzi per Smaltimento & Sgombero'
      : 'Preise für Entsorgung & Räumung',
    subtitle: isEn
      ? 'Eco-friendly recycling. All official tipping fees included. Broom-clean handover.'
      : isFr
      ? 'Recyclage écologique. Toutes taxes de décharge incluses. Remise balayée.'
      : isIt
      ? 'Riciclaggio ecologico. Tasse di discarica incluse. Consegna pulita a scopa.'
      : 'Umweltgerechte Mülltrennung. Sämtliche Deponiegebühren inklusive. Besenreine Übergabe.',
    desc: isEn
      ? 'SwissCleanMove takes care of complete apartment clearances, attic and basement decluttering, bulky waste disposal, and business liquidations. We recycle strictly according to Swiss environmental standards and hand over the cleared premises swept clean.'
      : isFr
      ? 'SwissCleanMove prend en charge le débarras complet de logements, caves, greniers, l’évacuation d’encombrants et les liquidations d’entreprises. Nous recyclons dans le respect strict des normes suisses et laissons les lieux balayés.'
      : isIt
      ? 'SwissCleanMove si occupa di sgomberi completi di appartamenti, cantine, solai, smaltimento mobili ingombranti e liquidazioni aziendali. Ricicliamo secondo le norme ambientali svizzere e consegniamo i locali puliti a scopa.'
      : 'SwissCleanMove übernimmt komplette Wohnungsräumungen, Keller- und Estrich-Entrümpelungen, Sperrgut-Entsorgungen und Geschäftsauflösungen. Wir trennen und recyclen strikt nach Schweizer Umweltstandards und übergeben alle Räumlichkeiten besenrein.',
    tableHeaderVolume: isEn ? 'Disposal Volume' : isFr ? "Volume d'élimination" : isIt ? 'Volume di smaltimento' : 'Entsorgungsvolumen',
    tableHeaderPrice: isEn ? 'Fixed Price from' : isFr ? 'Prix fixe dès' : isIt ? 'Prezzo fisso da' : 'Festpreis ab',
    includedTitle: isEn ? 'Included in Disposal Services' : isFr ? 'Prestations de débarras incluses' : isIt ? 'Incluso nel servizio di smaltimento' : 'Inbegriffene Leistungen',
    whyTitle: isEn ? 'Your Disposal Advantages' : isFr ? 'Vos avantages débarras' : isIt ? 'I vostri vantaggi' : 'Ihre Vorteile',
    ctaTitle: isEn ? 'Request a Free Disposal Quote' : isFr ? 'Demander un devis de débarras' : isIt ? 'Richiedi un preventivo per lo smaltimento' : 'Kostenlose Entsorgungsofferte anfordern',
    ctaDesc: isEn
      ? 'Send us a brief description or photos of the items to be cleared for an immediate fixed-price offer.'
      : isFr
      ? 'Envoyez-nous une description ou des photos de vos encombrants pour une offre à prix fixe immédiate.'
      : isIt
      ? 'Inviateci una breve descrizione o foto del materiale da sgomberare per un’offerta a prezzo fisso immediata.'
      : 'Senden Sie uns eine kurze Beschreibung oder Fotos der zu räumenden Gegenstände für ein sofortiges Festpreisangebot.',
    ctaBtn: isEn ? 'Calculate Disposal Quote' : isFr ? 'Calculer mon devis débarras' : isIt ? 'Calcola preventivo smaltimento' : 'Jetzt Entsorgungsofferte anfordern',
    uponRequest: isEn ? 'Upon request' : isFr ? 'Sur demande' : isIt ? 'Su richiesta' : 'auf Anfrage'
  };

  const v = PRICING_RULES.disposal.volumePricing;

  const disposalRows = [
    { label: isEn ? 'Up to 1 m³ (Small items, single furniture)' : isFr ? 'Jusqu’à 1 m³ (Petits objets, meuble isolé)' : isIt ? 'Fino a 1 m³ (Piccoli oggetti, singolo mobile)' : 'Bis 1 m³ (Einzelne Möbelstücke / Kleinsperrgut)', price: `CHF ${v['1']}.–` },
    { label: isEn ? 'Up to 2 m³' : isFr ? 'Jusqu’à 2 m³' : isIt ? 'Fino a 2 m³' : 'Bis 2 m³', price: `CHF ${v['2']}.–` },
    { label: isEn ? 'Up to 3 m³' : isFr ? 'Jusqu’à 3 m³' : isIt ? 'Fino a 3 m³' : 'Bis 3 m³', price: `CHF ${v['3']}.–` },
    { label: isEn ? 'Up to 5 m³ (Small room / Basement compartment)' : isFr ? 'Jusqu’à 5 m³ (Petite pièce / Cave)' : isIt ? 'Fino a 5 m³ (Piccola stanza / Cantina)' : 'Bis 5 m³ (Kleines Zimmer / Kellerabteil)', price: `CHF ${v['5']}.–` },
    { label: isEn ? 'Up to 8 m³' : isFr ? 'Jusqu’à 8 m³' : isIt ? 'Fino a 8 m³' : 'Bis 8 m³', price: `CHF ${v['8']}.–` },
    { label: isEn ? 'Up to 10 m³ (Half apartment clearance)' : isFr ? 'Jusqu’à 10 m³ (Demi-appartement)' : isIt ? 'Fino a 10 m³ (Mezzo appartamento)' : 'Bis 10 m³ (Teilräumung / Halbe Wohnung)', price: `CHF ${v['10']}.–` },
    { label: isEn ? 'Up to 15 m³' : isFr ? 'Jusqu’à 15 m³' : isIt ? 'Fino a 15 m³' : 'Bis 15 m³', price: `CHF ${v['15']}.–` },
    { label: isEn ? 'Up to 20 m³ (Full apartment clearance)' : isFr ? 'Jusqu’à 20 m³ (Appartement complet)' : isIt ? 'Fino a 20 m³ (Sgombero appartamento completo)' : 'Bis 20 m³ (Komplette Wohnungsräumung)', price: `CHF ${v['20']}.–` },
    { label: isEn ? 'Over 20 m³ / Complete liquidation' : isFr ? 'Plus de 20 m³ / Liquidation totale' : isIt ? 'Oltre 20 m³ / Liquidazione totale' : 'Über 20 m³ / Geschäfts- & Hausauflösung', price: t.uponRequest }
  ];

  const inclusions = [
    isEn ? 'Professional disassembly, carrying, and loading by our team' : isFr ? 'Démontage, portage et chargement par nos soins' : isIt ? 'Smontaggio professionale, trasporto e carico' : 'Fachgerechte Demontage, Tragen und Verladen durch unser Team',
    isEn ? 'Eco-friendly sorting and certified Swiss recycling' : isFr ? 'Tri écologique rigoureux et recyclage suisse certifié' : isIt ? 'Separazione ecologica accurata e riciclaggio svizzero certificato' : 'Umweltgerechte Mülltrennung und zertifiziertes Recycling',
    isEn ? 'All official landfill and recycling tipping fees included' : isFr ? 'Toutes les taxes de décharge et de recyclage incluses' : isIt ? 'Tutte le tasse ufficiali di discarica e smaltimento incluse' : 'Sämtliche behördlichen Entsorgungs- und Deponiegebühren inklusive',
    isEn ? 'Transport vehicle, fuel, and travel expenses included' : isFr ? 'Véhicule utilitaire, carburant et frais de déplacement inclus' : isIt ? 'Furgone, carburante e spese di trasporto inclusi' : 'Passendes Transportfahrzeug, Treibstoff und Fahrspesen inklusive',
    isEn ? 'Broom-clean handover of all cleared rooms' : isFr ? 'Remise des locaux rigoureusement balayés' : isIt ? 'Consegna dei locali perfettamente puliti a scopa' : 'Besenreine Übergabe der geräumten Räumlichkeiten',
    isEn ? 'Fast express scheduling available within 24–48 hours' : isFr ? 'Intervention rapide possible sous 24 à 48 heures' : isIt ? 'Intervento express disponibile entro 24–48 ore' : 'Schnelle Terminvergabe auch kurzfristig innerhalb von 24–48 Stunden'
  ];

  const advantages = [
    {
      title: isEn ? 'Certified Recycling' : isFr ? 'Recyclage certifié' : isIt ? 'Riciclaggio certificato' : 'Zertifiziertes Recycling',
      desc: isEn ? 'We collaborate with official recycling centers ensuring ecological waste disposal.' : isFr ? 'Collaboration avec les déchetteries officielles pour valoriser les matières.' : isIt ? 'Collaboriamo con i centri di riciclaggio ufficiali per il recupero ecologico.' : 'Zusammenarbeit mit regionalen Wertstoffhöfen für maximale Wiederverwertung.'
    },
    {
      title: isEn ? 'All Fees Included' : isFr ? 'Toutes taxes comprises' : isIt ? 'Tutto compreso' : 'Gebühren inklusive',
      desc: isEn ? 'Our fixed quote already includes all municipal weight and disposal charges.' : isFr ? 'Notre forfait intègre déjà le poids et les redevances cantonales.' : isIt ? 'Il nostro prezzo fisso comprende già peso e tariffe cantonali.' : 'Keine nachträglichen Wiegegebühren oder überraschenden Deponiezuschläge.'
    },
    {
      title: isEn ? 'Broom-Clean Finish' : isFr ? 'Finition balayée' : isIt ? 'Consegna a scopa' : 'Besenreine Übergabe',
      desc: isEn ? 'We leave your basement, attic, or apartment spotless and ready to return.' : isFr ? 'Vos caves, greniers ou bureaux sont rendus impeccables et nets.' : isIt ? 'Cantine, solai o uffici vengono riconsegnati in ordine e puliti.' : 'Wir hinterlassen Ihre Räume sauber ausgefegt und abgabefertig.'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-max max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-swiss-softRed text-swiss-red text-sm font-semibold border border-swiss-red/20">
            <Recycle className="w-4 h-4" />
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
                  {isEn ? 'Disposal Rates by Volume (m³)' : isFr ? 'Tarifs selon le volume (m³)' : isIt ? 'Tariffe in base al volume (m³)' : 'Festpreise nach Volumen (m³)'}
                </h3>
                <p className="text-sm text-swiss-body mt-1">
                  {isEn ? 'All official disposal fees and transport included' : isFr ? 'Toutes taxes de décharge et transport inclus' : isIt ? 'Tutte le tasse di smaltimento e trasporto incluse' : 'Inklusive Arbeitsaufwand, LKW und offizieller Entsorgungsgebühren'}
                </p>
              </div>
              <Trash2 className="w-8 h-8 text-swiss-red opacity-80 hidden sm:block" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-swiss-softRed">
                    <th className="p-4 border-b border-swiss-border font-bold text-swiss-text">{t.tableHeaderVolume}</th>
                    <th className="p-4 border-b border-swiss-border font-bold text-swiss-text text-right">{t.tableHeaderPrice}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-swiss-border">
                  {disposalRows.map((row, i) => (
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
                ? '* Special items (hazardous waste, chemical paints, large quantities of tires) are calculated individually upon request.'
                : isFr
                ? '* Déchets spéciaux (peintures, solvants, produits chimiques) font l’objet d’une offre individuelle.'
                : isIt
                ? '* Rifiuti speciali (vernici, solventi, pneumatici) vengono conteggiati separatamente su richiesta.'
                : '* Sonderabfälle (z.B. Farben, Lacke, Chemikalien, Pneus) werden auf Anfrage transparent separat offeriert.'}
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

        {/* Disposal Dedicated CTA Card */}
        <div className="card p-8 md:p-10 bg-swiss-softRed border border-swiss-border text-center space-y-6 rounded-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-swiss-text">{t.ctaTitle}</h3>
          <p className="text-swiss-body max-w-2xl mx-auto leading-relaxed">{t.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/form?service=disposal`}
              className="btn-primary text-base md:text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
              onClick={() => handleCtaClick('disposal_pricing_quote_btn')}
            >
              <span>{t.ctaBtn}</span>
            </Link>
            <a
              href="tel:+41782158030"
              className="btn-secondary text-base md:text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
              onClick={() => handleCtaClick('disposal_pricing_phone_btn')}
            >
              <span>+41 78 215 80 30</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
