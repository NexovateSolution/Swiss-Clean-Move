import React from 'react';
import Link from 'next/link';
import { CheckCircle, Truck, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { PRICING_RULES } from '@/lib/pricingRules';

interface MovingPricingOnlyProps {
  locale: string;
  formService?: string;
  city?: string;
  handleCtaClick: (ctaName: string) => void;
}

export default function MovingPricingOnly({ locale, formService = 'relocation', city, handleCtaClick }: MovingPricingOnlyProps) {
  const isEn = locale === 'en';
  const isFr = locale === 'fr';
  const isIt = locale === 'it';

  const t = {
    title: isEn
      ? 'Transparent Moving Prices'
      : isFr
      ? 'Prix transparents pour votre déménagement'
      : isIt
      ? 'Prezzi trasparenti per il vostro trasloco'
      : 'Transparente Umzugspreise',
    subtitle: isEn
      ? 'Fair fixed rates. Professional moving team. Guaranteed Swiss quality.'
      : isFr
      ? 'Tarifs forfaitaires équitables. Équipe qualifiée. Qualité suisse garantie.'
      : isIt
      ? 'Tariffe fisse e trasparenti. Squadra professionale. Qualità svizzera garantita.'
      : 'Faire Festpreise. Professionelles Zügelteam. Schweizer Qualitätsstandards.',
    desc: isEn
      ? 'SwissCleanMove is your reliable partner for stress-free moves for private individuals and companies. All prices include modern moving trucks, qualified staff, furniture protection, and transport insurance.'
      : isFr
      ? 'SwissCleanMove est votre partenaire de confiance pour des déménagements sans stress pour particuliers et entreprises. Tous les prix incluent véhicule adapté, personnel qualifié, protection du mobilier et assurance transport.'
      : isIt
      ? 'SwissCleanMove è il vostro partner di fiducia per traslochi sereni per privati e aziende. Tutti i prezzi comprendono veicolo moderno, personale qualificato, protezione dei mobili e assicurazione trasporto.'
      : 'SwissCleanMove ist Ihr zuverlässiger Partner für stressfreie Privatumzüge und Firmenumzüge. Sämtliche Tarife verstehen sich inklusive modernen Zügelwagen, qualifizierten Zügelmännern, Möbelschutz und Transportversicherung.',
    tableHeaderSize: isEn ? 'Apartment Size' : isFr ? "Taille de l'appartement" : isIt ? "Dimensione dell'appartamento" : 'Wohnungsgrösse',
    tableHeaderPrice: isEn ? 'Fixed Price from' : isFr ? 'Prix fixe dès' : isIt ? 'Prezzo fisso da' : 'Festpreis ab',
    includedTitle: isEn ? 'Included in every Move' : isFr ? 'Inclus dans chaque déménagement' : isIt ? 'Incluso in ogni trasloco' : 'Bei jedem Umzug inklusive',
    whyTitle: isEn ? 'Your Moving Advantages' : isFr ? 'Vos avantages déménagement' : isIt ? 'I vostri vantaggi' : 'Ihre Umzugsvorteile auf einen Blick',
    ctaTitle: isEn ? 'Request a Free Moving Quote' : isFr ? 'Demander un devis de déménagement gratuit' : isIt ? 'Richiedi un preventivo gratuito per il trasloco' : 'Kostenlose Umzugsofferte anfordern',
    ctaDesc: isEn
      ? 'Get your customized fixed-price offer within 24 hours – completely free and non-binding.'
      : isFr
      ? 'Recevez votre offre personnalisée à prix fixe sous 24h – gratuit et sans engagement.'
      : isIt
      ? 'Ricevete la vostra offerta personalizzata a prezzo fisso entro 24 ore – gratuita e senza impegno.'
      : 'Erhalten Sie innerhalb von 24 Stunden Ihr individuelles Festpreisangebot – garantiert kostenlos & unverbindlich.',
    ctaBtn: isEn ? 'Request Moving Quote' : isFr ? 'Demander mon devis déménagement' : isIt ? 'Richiedi preventivo trasloco' : 'Jetzt Umzugsofferte berechnen',
    uponRequest: isEn ? 'Upon request' : isFr ? 'Sur demande' : isIt ? 'Su richiesta' : 'auf Anfrage'
  };

  const movingRows = [
    { label: isEn ? 'Studio / 1 room' : isFr ? 'Studio / 1 pièce' : isIt ? 'Monolocale / 1 locale' : 'Studio / 1 Zimmer', price: `CHF ${PRICING_RULES.moving.baseRates['1']}.–` },
    { label: isEn ? '1.5 room apartment' : isFr ? 'Appartement 1.5 pièce' : isIt ? 'Appartamento 1.5 locali' : '1.5 Zimmer Wohnung', price: `CHF ${PRICING_RULES.moving.baseRates['1.5']}.–` },
    { label: isEn ? '2 room apartment' : isFr ? 'Appartement 2 pièces' : isIt ? 'Appartamento 2 locali' : '2 Zimmer Wohnung', price: `CHF ${PRICING_RULES.moving.baseRates['2']}.–` },
    { label: isEn ? '2.5 room apartment' : isFr ? 'Appartement 2.5 pièces' : isIt ? 'Appartamento 2.5 locali' : '2.5 Zimmer Wohnung', price: `CHF ${PRICING_RULES.moving.baseRates['2.5']}.–` },
    { label: isEn ? '3 room apartment' : isFr ? 'Appartement 3 pièces' : isIt ? 'Appartamento 3 locali' : '3 Zimmer Wohnung', price: `CHF ${PRICING_RULES.moving.baseRates['3']}.–` },
    { label: isEn ? '3.5 room apartment' : isFr ? 'Appartement 3.5 pièces' : isIt ? 'Appartamento 3.5 locali' : '3.5 Zimmer Wohnung', price: `CHF ${PRICING_RULES.moving.baseRates['3.5']}.–` },
    { label: isEn ? '4 room apartment' : isFr ? 'Appartement 4 pièces' : isIt ? 'Appartamento 4 locali' : '4 Zimmer Wohnung', price: `CHF ${PRICING_RULES.moving.baseRates['4']}.–` },
    { label: isEn ? '4.5 room apartment' : isFr ? 'Appartement 4.5 pièces' : isIt ? 'Appartamento 4.5 locali' : '4.5 Zimmer Wohnung', price: `CHF ${PRICING_RULES.moving.baseRates['4.5']}.–` },
    { label: isEn ? '5.5 room apartment' : isFr ? 'Appartement 5.5 pièces' : isIt ? 'Appartamento 5.5 locali' : '5.5 Zimmer Wohnung', price: `CHF ${PRICING_RULES.moving.baseRates['5.5']}.–` },
    { label: isEn ? 'Single-family house / Villa' : isFr ? 'Maison individuelle / Villa' : isIt ? 'Casa unifamiliare / Villa' : 'Einfamilienhaus / Villa', price: t.uponRequest }
  ];

  const inclusions = [
    isEn ? 'Qualified and friendly moving team' : isFr ? 'Équipe de déménageurs qualifiée et expérimentée' : isIt ? 'Squadra di traslocatori qualificata ed esperta' : 'Erfahrenes, fest angestelltes Zügelteam',
    isEn ? 'Modern, fully equipped transport vehicle' : isFr ? 'Véhicule de transport moderne et capitonné' : isIt ? 'Veicolo di trasporto moderno e imbottito' : 'Moderner, voll ausgerüsteter Zügelwagen',
    isEn ? 'Comprehensive transport & liability insurance' : isFr ? 'Assurance transport et responsabilité civile complète' : isIt ? 'Assicurazione trasporto e responsabilità civile' : 'Vollumfängliche Transport- und Betriebshaftpflichtversicherung',
    isEn ? 'Professional furniture protection (blankets, straps, wrap)' : isFr ? 'Protection professionnelle du mobilier (couvertures, sangles, films)' : isIt ? 'Protezione professionale dei mobili (coperte, cinghie, pellicole)' : 'Professioneller Möbelschutz (Zügeldecken, Spanngurte, Schutzfolie)',
    isEn ? 'Careful loading, secured transport, and unloading' : isFr ? 'Chargement méticuleux, arrimage sécurisé et déchargement' : isIt ? 'Carico accurato, trasporto sicuro e scarico' : 'Fachgerechtes Be- und Entladen sowie Ladungssicherung',
    isEn ? 'Furniture placement in the desired rooms' : isFr ? 'Mise en place des meubles dans les pièces souhaitées' : isIt ? 'Posizionamento dei mobili nelle stanze desiderate' : 'Platzierung der Möbel direkt in den gewünschten Räumen',
    isEn ? 'Assembly and disassembly service available' : isFr ? 'Montage et démontage de meubles disponible' : isIt ? 'Montaggio e smontaggio mobili disponibile' : 'Möbel-Demontage & Montage durch Handwerker zubuchbar',
    isEn ? 'Disposal of old furniture on moving day upon request' : isFr ? 'Élimination des vieux meubles le jour même sur demande' : isIt ? 'Smaltimento vecchi mobili il giorno stesso su richiesta' : 'Fachgerechte Entsorgung von Altmöbeln direkt kombinierbar'
  ];

  const advantages = [
    {
      title: isEn ? 'Guaranteed Fixed Price' : isFr ? 'Prix fixe garanti' : isIt ? 'Prezzo fisso garantito' : 'Garantierter Festpreis',
      desc: isEn ? 'No hidden costs, no surprises. What we quote is what you pay.' : isFr ? 'Pas de frais cachés. Le prix du devis est garanti.' : isIt ? 'Nessun costo nascosto. Il prezzo preventivato è definitivo.' : 'Keine versteckten Gebühren. Unsere Offerte gilt als verbindlicher Festpreis.'
    },
    {
      title: isEn ? 'Punctual & Reliable' : isFr ? 'Ponctuel et fiable' : isIt ? 'Puntuale e affidabile' : 'Pünktlich & Zuverlässig',
      desc: isEn ? 'Your moving date is set in stone. We arrive on time with the right crew.' : isFr ? 'Votre date est réservée. Nous arrivons à l’heure avec l’équipe requise.' : isIt ? 'La data concordata è garantita. Arriviamo puntuali con la squadra.' : 'Verlässliche Terminabsprache und minutiöse logistische Vorbereitung.'
    },
    {
      title: isEn ? 'Swiss Quality Standard' : isFr ? 'Standard de qualité suisse' : isIt ? 'Standard svizzero di qualità' : 'Schweizer Qualitätsstandard',
      desc: isEn ? 'Trained staff treating your precious belongings with the utmost care.' : isFr ? 'Personnel soigné manipulant vos biens les plus précieux avec respect.' : isIt ? 'Personale attento che tratta i vostri beni con la massima cura.' : 'Sorgfältigster Umgang mit Ihrem Mobiliar und persönlichem Hausrat.'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-max max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-swiss-softRed text-swiss-red text-sm font-semibold border border-swiss-red/20">
            <Truck className="w-4 h-4" />
            <span>{isEn ? 'Moving Services' : isFr ? 'Services Déménagement' : isIt ? 'Servizio Traslochi' : 'Umzugsdienstleistungen'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">{t.title}</h2>
          <p className="text-lg font-medium text-swiss-red">{t.subtitle}</p>
          <p className="text-swiss-body max-w-3xl mx-auto leading-relaxed">{t.desc}</p>
        </div>

        {/* Pricing Grid: Table & Inclusions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-swiss-border shadow-subtle overflow-hidden">
            <div className="p-6 border-b border-swiss-border bg-swiss-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-swiss-text">
                  {isEn ? 'Apartment & House Moving Rates' : isFr ? 'Tarifs pour appartements et maisons' : isIt ? 'Tariffe per appartamenti e case' : 'Richtpreise nach Wohnungsgrösse'}
                </h3>
                <p className="text-sm text-swiss-body mt-1">
                  {isEn ? 'Standard moves including vehicle and team' : isFr ? 'Déménagements standards avec camion et équipe' : isIt ? 'Traslochi standard con furgone e squadra' : 'Inklusive Transportfahrzeug, Umzugsteam und Basisschutz'}
                </p>
              </div>
              <Truck className="w-8 h-8 text-swiss-red opacity-80 hidden sm:block" />
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
                  {movingRows.map((row, i) => (
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
                ? '* Final quote depends on floor level, elevator availability, carrying distance, and heavy items (e.g. piano).'
                : isFr
                ? "* L'offre finale dépend de l'étage, de l'ascenseur, de la distance de portage et des objets lourds (ex. piano)."
                : isIt
                ? "* L'offerta definitiva dipende da piano, ascensore, distanza di trasporto e oggetti pesanti (es. pianoforte)."
                : '* Verbindlicher Endpreis abhängig von Stockwerk, Liftverfügbarkeit, Tragweg und allfälligem Spezialtransport (z.B. Klavier).'}
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

        {/* Moving Dedicated CTA Card */}
        <div className="card p-8 md:p-10 bg-swiss-softRed border border-swiss-border text-center space-y-6 rounded-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-swiss-text">{t.ctaTitle}</h3>
          <p className="text-swiss-body max-w-2xl mx-auto leading-relaxed">{t.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/form?service=relocation`}
              className="btn-primary text-base md:text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
              onClick={() => handleCtaClick('moving_pricing_quote_btn')}
            >
              <span>{t.ctaBtn}</span>
            </Link>
            <a
              href="tel:+41782158030"
              className="btn-secondary text-base md:text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
              onClick={() => handleCtaClick('moving_pricing_phone_btn')}
            >
              <span>+41 78 215 80 30</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
