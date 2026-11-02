import React from 'react';
import Link from 'next/link';
import { CheckCircle, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { PRICING_RULES } from '@/lib/pricingRules';

interface CleaningPricingOnlyProps {
  locale: string;
  formService?: string;
  isEndreinigung?: boolean;
  handleCtaClick: (ctaName: string) => void;
}

export default function CleaningPricingOnly({ locale, formService = 'house-cleaning', isEndreinigung = true, handleCtaClick }: CleaningPricingOnlyProps) {
  const isEn = locale === 'en';
  const isFr = locale === 'fr';
  const isIt = locale === 'it';

  const t = {
    badge: isEn
      ? 'Move-Out Cleaning & Handover Guarantee'
      : isFr
      ? 'Nettoyage de fin de bail & Garantie de remise'
      : isIt
      ? 'Pulizia di trasloco e Garanzia di consegna'
      : 'Umzugsreinigung & Abnahmegarantie',
    title: isEn
      ? 'Move-Out Cleaning with 100% Handover Guarantee'
      : isFr
      ? 'Prix pour Nettoyage de fin de bail avec garantie'
      : isIt
      ? 'Prezzi pulizie di trasloco con garanzia'
      : 'Preise für Umzugsreinigung mit Abnahmegarantie',
    subtitle: isEn
      ? 'Fixed prices. Personal presence at the handover. Free re-cleaning guaranteed.'
      : isFr
      ? 'Prix fixes. Présence personnelle lors de l’état des lieux. Re-nettoyage gratuit garanti.'
      : isIt
      ? 'Prezzi fissi. Presenza personale alla riconsegna. Pulizia correttiva gratuita garantita.'
      : 'Garantierte Festpreise. Persönliche Begleitung bei der Übergabe. Kostenlose Nachreinigung garantiert.',
    desc: isEn
      ? 'SwissCleanMove guarantees a completely stress-free property handover. Our experienced cleaning team cleans your apartment strictly according to Swiss property management standards. If the inspector finds any imperfection, we rectify it immediately on the spot for free.'
      : isFr
      ? 'SwissCleanMove garantit une remise de logement sans aucun stress. Nos équipes nettoient votre bien selon les normes strictes des gérances suisses. En cas de remarque lors de l’état des lieux, nous rectifions immédiatement et gratuitement sur place.'
      : isIt
      ? 'SwissCleanMove garantisce una consegna dell’immobile completamente priva di stress. Il nostro team pulisce l’appartamento secondo i rigorosi standard delle amministrazioni svizzere. In caso di contestazioni, interveniamo gratuitamente sul posto.'
      : 'SwissCleanMove garantiert Ihnen eine vollkommen sorgenfreie Wohnungsabgabe. Unser eingespieltes Reinigungsteam reinigt Ihre Immobilie penibel nach Schweizer Verwalterstandards. Sollte bei der Übergabe ein Detail beanstandet werden, bessern wir sofort kostenlos vor Ort nach.',
    tableHeaderSize: isEn ? 'Apartment Size' : isFr ? "Taille de l'appartement" : isIt ? "Dimensione appartamento" : 'Wohnungsgrösse',
    tableHeaderPrice: isEn ? 'Fixed Price from' : isFr ? 'Prix fixe dès' : isIt ? 'Prezzo fisso da' : 'Festpreis ab',
    includedTitle: isEn ? 'Included Handover Scope' : isFr ? 'Prestations incluses' : isIt ? 'Prestazioni incluse' : 'Leistungsumfang mit Abnahmegarantie',
    whyTitle: isEn ? 'Why choose our Cleaning' : isFr ? 'Pourquoi choisir SwissCleanMove' : isIt ? 'Perché scegliere noi' : 'Ihre Reinigungsvorteile',
    ctaTitle: isEn ? 'Request a Free Cleaning Quote' : isFr ? 'Demander une offre de nettoyage gratuite' : isIt ? 'Richiedi un preventivo gratuito per la pulizia' : 'Kostenlose Reinigungsofferte anfordern',
    ctaDesc: isEn
      ? 'Get your binding fixed-price quote with 100% handover guarantee within 24 hours.'
      : isFr
      ? 'Obtenez votre devis à prix fixe avec garantie de remise à 100% sous 24h.'
      : isIt
      ? 'Ricevete il vostro preventivo a prezzo fisso con garanzia di consegna al 100% entro 24 ore.'
      : 'Sichern Sie sich Ihre verbindliche Festpreisofferte mit 100% Abnahmegarantie innerhalb von 24 Stunden.',
    ctaBtn: isEn ? 'Calculate Cleaning Quote' : isFr ? 'Calculer mon devis nettoyage' : isIt ? 'Calcola preventivo pulizia' : 'Jetzt Reinigungsofferte berechnen',
    uponRequest: isEn ? 'Upon request' : isFr ? 'Sur demande' : isIt ? 'Su richiesta' : 'auf Anfrage'
  };

  const cleaningRows = [
    { label: isEn ? 'Studio / 1 room' : isFr ? 'Studio / 1 pièce' : isIt ? 'Monolocale / 1 locale' : 'Studio / 1 Zimmer', price: `CHF ${PRICING_RULES.cleaning.apartment['1']}.–` },
    { label: isEn ? '1.5 room apartment' : isFr ? 'Appartement 1.5 pièce' : isIt ? 'Appartamento 1.5 locali' : '1.5 Zimmer Wohnung', price: `CHF ${PRICING_RULES.cleaning.apartment['1.5']}.–` },
    { label: isEn ? '2 room apartment' : isFr ? 'Appartement 2 pièces' : isIt ? 'Appartamento 2 locali' : '2 Zimmer Wohnung', price: `CHF ${PRICING_RULES.cleaning.apartment['2']}.–` },
    { label: isEn ? '2.5 room apartment' : isFr ? 'Appartement 2.5 pièces' : isIt ? 'Appartamento 2.5 locali' : '2.5 Zimmer Wohnung', price: `CHF ${PRICING_RULES.cleaning.apartment['2.5']}.–` },
    { label: isEn ? '3 room apartment' : isFr ? 'Appartement 3 pièces' : isIt ? 'Appartamento 3 locali' : '3 Zimmer Wohnung', price: `CHF ${PRICING_RULES.cleaning.apartment['3']}.–` },
    { label: isEn ? '3.5 room apartment' : isFr ? 'Appartement 3.5 pièces' : isIt ? 'Appartamento 3.5 locali' : '3.5 Zimmer Wohnung', price: `CHF ${PRICING_RULES.cleaning.apartment['3.5']}.–` },
    { label: isEn ? '4 room apartment' : isFr ? 'Appartement 4 pièces' : isIt ? 'Appartamento 4 locali' : '4 Zimmer Wohnung', price: `CHF ${PRICING_RULES.cleaning.apartment['4']}.–` },
    { label: isEn ? '4.5 room apartment' : isFr ? 'Appartement 4.5 pièces' : isIt ? 'Appartamento 4.5 locali' : '4.5 Zimmer Wohnung', price: `CHF ${PRICING_RULES.cleaning.apartment['4.5']}.–` },
    { label: isEn ? '5.5 room apartment' : isFr ? 'Appartement 5.5 pièces' : isIt ? 'Appartamento 5.5 locali' : '5.5 Zimmer Wohnung', price: `CHF ${PRICING_RULES.cleaning.apartment['5.5']}.–` },
    { label: isEn ? 'House / Villa' : isFr ? 'Maison / Villa' : isIt ? 'Casa unifamiliare / Villa' : 'Haus / Villa', price: t.uponRequest }
  ];

  const inclusions = [
    isEn ? '100% Handover guarantee with free re-cleaning' : isFr ? 'Garantie de remise à 100% avec re-nettoyage gratuit' : isIt ? 'Garanzia di consegna al 100% con pulizia correttiva gratuita' : '100% Abnahmegarantie mit kostenloser Nachreinigung',
    isEn ? 'Personal presence of our team leader at the official handover' : isFr ? 'Présence personnelle de notre responsable lors de l’état des lieux' : isIt ? 'Presenza personale del nostro caposquadra alla riconsegna' : 'Persönliche Anwesenheit bei der Wohnungsübergabe',
    isEn ? 'Complete kitchen deep cleaning (oven, hob, extractor hood, fridge)' : isFr ? 'Nettoyage approfondi de la cuisine (four, plaques, hotte, réfrigérateur)' : isIt ? 'Pulizia profonda della cucina (forno, piano cottura, cappa, frigo)' : 'Komplette Küchen-Tiefenreinigung (Backofen, Herd, Dunstabzug, Kühlschrank)',
    isEn ? 'Bathroom and sanitary descaling, cleaning and disinfection' : isFr ? 'Détartrage, nettoyage et désinfection des salles de bains et sanitaires' : isIt ? 'Disincrostazione, pulizia e disinfezione bagni e sanitari' : 'Entkalkung und hygienische Desinfektion von Bad und Sanitäranlagen',
    isEn ? 'Window cleaning inside and outside including frames and sills' : isFr ? 'Nettoyage des vitres intérieur et extérieur avec cadres et rebords' : isIt ? 'Pulizia vetri interni ed esterni inclusi telai e davanzali' : 'Fensterreinigung innen und aussen inkl. Rahmen, Fälze und Simse',
    isEn ? 'Cleaning of all blinds, shutters and guide rails' : isFr ? 'Nettoyage de tous les stores, volets et rails de guidage' : isIt ? 'Pulizia di tutte le persiane, tapparelle e guide' : 'Gründliche Reinigung aller Lamellenstoren und Rollläden',
    isEn ? 'Floors, skirting boards, built-in wardrobes, doors and light switches' : isFr ? 'Sols, plinthes, armoires murales, portes et interrupteurs' : isIt ? 'Pavimenti, battiscopa, armadi a muro, porte e interruttori' : 'Böden, Sockelleisten, Einbauschränke, Türen, Rahmen und Schalter',
    isEn ? 'Professional eco-friendly cleaning agents, equipment and travel included' : isFr ? 'Produits écologiques professionnels, matériel moderne et déplacement inclus' : isIt ? 'Detergenti ecologici professionali, attrezzature moderne e trasporto inclusi' : 'Ökologische Profi-Reinigungsmittel, moderne Maschinen und Fahrspesen inklusive'
  ];

  const advantages = [
    {
      title: isEn ? '100% Handover Guarantee' : isFr ? 'Garantie de remise à 100%' : isIt ? 'Garanzia di consegna al 100%' : '100% Abnahmegarantie',
      desc: isEn ? 'We accompany you during the handover. If anything is criticized, we fix it immediately.' : isFr ? 'Nous vous accompagnons à l’état des lieux. Tout point critiqué est rectifié sans délai.' : isIt ? 'Vi accompagniamo alla consegna. Qualsiasi contestazione viene risolta sul momento.' : 'Wir sind bei der Abnahme dabei und garantieren eine mängelfreie Schlüsselübergabe.'
    },
    {
      title: isEn ? 'Fixed Price Guarantee' : isFr ? 'Prix fixe garanti' : isIt ? 'Prezzo fisso garantito' : 'Garantierter Festpreis',
      desc: isEn ? 'All-inclusive package prices. No extra charge for cleaning products or travel.' : isFr ? 'Forfait tout compris. Aucun supplément pour produits ou déplacements.' : isIt ? 'Pacchetto tutto incluso. Nessun costo extra per detergenti o trasferte.' : 'Verbindlicher Pauschalpreis ohne versteckte Kosten oder böse Überraschungen.'
    },
    {
      title: isEn ? 'Experienced Cleaning Team' : isFr ? 'Équipe expérimentée' : isIt ? 'Squadra esperta' : 'Erfahrenes Reinigungsteam',
      desc: isEn ? 'Experienced cleaning professionals with an eye for the exact handover details required by property managers.' : isFr ? 'Des professionnels du nettoyage attentifs aux critères précis des gérances immobilières.' : isIt ? 'Professionisti della pulizia attenti ai dettagli richiesti dalle amministrazioni.' : 'Erfahrene Reinigungskräfte mit genauem Blick für die Abnahmekriterien der Verwaltungen.'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-max max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-swiss-softRed text-swiss-red text-sm font-semibold border border-swiss-red/20">
            <Sparkles className="w-4 h-4" />
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
                  {isEn ? 'Cleaning Rates with Handover Guarantee' : isFr ? 'Tarifs avec garantie de remise' : isIt ? 'Tariffe con garanzia di consegna' : 'Festpreise für Wohnungsreinigung'}
                </h3>
                <p className="text-sm text-swiss-body mt-1">
                  {isEn ? 'Standard move-out cleaning including guarantee & presence' : isFr ? 'Nettoyage complet avec garantie et présence lors de l’état des lieux' : isIt ? 'Pulizia completa con garanzia e presenza alla riconsegna' : 'Inklusive Abnahmegarantie, Begleitung bei Übergabe und Nachreinigung'}
                </p>
              </div>
              <Award className="w-8 h-8 text-swiss-red opacity-80 hidden sm:block" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-swiss-softRed">
                    <th className="p-4 border-b border-swiss-border font-bold text-swiss-text">{t.tableHeaderSize}</th>
                    <th className="p-4 border-b border-swiss-border font-bold text-swiss-text text-right">{t.tableHeaderPrice}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-swiss-border">
                  {cleaningRows.map((row, i) => (
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
                ? '* Baseline price for studio/1-room starts at CHF 600.–. Balconies, basements, heavily soiled kitchens/blinds may carry minor standard surcharges.'
                : isFr
                ? '* Prix de base pour studio/1 pièce à partir de CHF 600.–. Balcons, caves ou encrassement important font l’objet de suppléments standards.'
                : isIt
                ? '* Prezzo base per monolocale/1 locale a partire da CHF 600.–. Balconi, cantine o forte sporcizia prevedono supplementi standard.'
                : '* Basis-Festpreis für Studio/Einzimmerwohnung ab CHF 600.–. Zusätzliche Nebenräume (z.B. Balkon, Keller) oder extremer Verschmutzungsgrad gemäss Festpreisofferte.'}
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

        {/* Cleaning Dedicated CTA Card */}
        <div className="card p-8 md:p-10 bg-swiss-softRed border border-swiss-border text-center space-y-6 rounded-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-swiss-text">{t.ctaTitle}</h3>
          <p className="text-swiss-body max-w-2xl mx-auto leading-relaxed">{t.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/form?service=cleaning`}
              className="btn-primary text-base md:text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
              onClick={() => handleCtaClick('cleaning_pricing_quote_btn')}
            >
              <span>{t.ctaBtn}</span>
            </Link>
            <a
              href="tel:+41782158030"
              className="btn-secondary text-base md:text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
              onClick={() => handleCtaClick('cleaning_pricing_phone_btn')}
            >
              <span>+41 78 215 80 30</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
