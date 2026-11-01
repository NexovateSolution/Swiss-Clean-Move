import React from 'react';
import Link from 'next/link';
import { CheckCircle, UtensilsCrossed, ShieldCheck, Award } from 'lucide-react';
import { PRICING_RULES } from '@/lib/pricingRules';

interface GastronomyPricingOnlyProps {
  locale: string;
  formService?: string;
  handleCtaClick: (ctaName: string) => void;
}

export default function GastronomyPricingOnly({ locale, formService = 'facility-services', handleCtaClick }: GastronomyPricingOnlyProps) {
  const isEn = locale === 'en';
  const isFr = locale === 'fr';
  const isIt = locale === 'it';

  const t = {
    badge: isEn
      ? 'HACCP Restaurant & Commercial Kitchen Cleaning'
      : isFr
      ? 'Nettoyage professionnel de restaurants & cuisines'
      : isIt
      ? 'Pulizia professionale ristoranti & cucine HACCP'
      : 'Gastronomie & Grossküchenreinigung',
    title: isEn
      ? 'Prices for Restaurant & Kitchen Deep Cleaning'
      : isFr
      ? 'Prix pour Nettoyage de restaurants et cuisines'
      : isIt
      ? 'Prezzi per Pulizia ristoranti e cucine professionali'
      : 'Preise für Gastronomie- & Küchenreinigung',
    subtitle: isEn
      ? 'Strict compliance with Swiss food hygiene standards (HACCP). Fixed rates by square meters.'
      : isFr
      ? 'Conformité stricte aux normes d’hygiène suisses (HACCP). Forfaits transparents au m².'
      : isIt
      ? 'Rigoroso rispetto delle norme igieniche alimentari svizzere (HACCP). Tariffe fisse a m².'
      : 'Einhaltung strengster Schweizer Lebensmittelhygiene-Standards (HACCP). Festpreise nach Quadratmetern.',
    desc: isEn
      ? 'SwissCleanMove is your certified partner for deep hygiene in restaurants, hotel kitchens, bakeries, and food establishments. We remove stubborn grease, clean exhaust systems, and disinfect all food preparation zones.'
      : isFr
      ? 'SwissCleanMove est votre partenaire certifié pour l’hygiène de vos restaurants, cuisines d’hôtels, boulangeries et traiteurs. Nous éliminons les graisses cuites, dégraissons les hottes et désinfectons les zones de travail.'
      : isIt
      ? 'SwissCleanMove è il vostro partner certificato per l’igiene profonda in ristoranti, cucine d’albergo, panetterie e laboratori alimentari. Rimuoviamo grassi incrostati, sgrassiamo le cappe e disinfettiamo ogni area.'
      : 'SwissCleanMove ist Ihr zertifizierter Partner für Tiefenhygiene in Restaurants, Hotelküchen, Bäckereien und Gastrobetrieben. Wir lösen hartnäckigste Fettfilme, reinigen Dunstabzugsanlagen und desinfizieren sämtliche Zubereitungsbereiche.',
    tableHeaderArea: isEn ? 'Kitchen / Restaurant Area' : isFr ? 'Surface cuisine / salle' : isIt ? 'Superficie cucina / sala' : 'Fläche (Küche / Gastrofläche)',
    tableHeaderPrice: isEn ? 'Fixed Price from' : isFr ? 'Prix fixe dès' : isIt ? 'Prezzo fisso da' : 'Festpreis ab',
    includedTitle: isEn ? 'Included in Gastronomy Deep Clean' : isFr ? 'Prestations de nettoyage incluses' : isIt ? 'Prestazioni incluse nel servizio' : 'Inbegriffene Gastronomie-Leistungen',
    whyTitle: isEn ? 'Why Gastronomy Managers Trust Us' : isFr ? 'Pourquoi les restaurateurs nous font confiance' : isIt ? 'Perché i ristoratori ci scelgono' : 'Ihre Gastro-Vorteile',
    ctaTitle: isEn ? 'Request a Free Kitchen Cleaning Quote' : isFr ? 'Demander un devis pour votre restaurant' : isIt ? 'Richiedi un preventivo per il tuo ristorante' : 'Kostenlose Gastro-Offerte anfordern',
    ctaDesc: isEn
      ? 'Get an immediate fixed-price offer or schedule a discrete on-site inspection outside your service hours.'
      : isFr
      ? 'Recevez une offre ferme à prix fixe ou planifiez une visite discrète en dehors de vos heures de service.'
      : isIt
      ? 'Ricevete un preventivo a prezzo fisso o concordate un sopralluogo discreto fuori dagli orari di servizio.'
      : 'Erhalten Sie ein verbindliches Festpreisangebot oder vereinbaren Sie eine diskrete Besichtigung ausserhalb Ihrer Öffnungszeiten.',
    ctaBtn: isEn ? 'Calculate Kitchen Quote' : isFr ? 'Calculer mon devis restaurant' : isIt ? 'Calcola preventivo ristorante' : 'Jetzt Gastro-Offerte anfordern',
    uponRequest: isEn ? 'Upon request' : isFr ? 'Sur demande' : isIt ? 'Su richiesta' : 'auf Anfrage'
  };

  const g = PRICING_RULES.gastronomy.basePricesBySqm;

  const gastroRows = [
    { label: isEn ? 'Up to 50 m²' : isFr ? 'Jusqu’à 50 m²' : isIt ? 'Fino a 50 m²' : 'Bis 50 m²', price: `CHF ${g['50']}.–` },
    { label: isEn ? '51 to 100 m²' : isFr ? 'De 51 à 100 m²' : isIt ? 'Da 51 a 100 m²' : '51 – 100 m²', price: `CHF ${g['100']}.–` },
    { label: isEn ? '101 to 150 m²' : isFr ? 'De 101 à 150 m²' : isIt ? 'Da 101 a 150 m²' : '101 – 150 m²', price: `CHF ${g['150']}.–` },
    { label: isEn ? '151 to 200 m²' : isFr ? 'De 151 à 200 m²' : isIt ? 'Da 151 a 200 m²' : '151 – 200 m²', price: `CHF ${g['200']}.–` },
    { label: isEn ? '201 to 300 m²' : isFr ? 'De 201 à 300 m²' : isIt ? 'Da 201 a 300 m²' : '201 – 300 m²', price: `CHF ${g['300']}.–` },
    { label: isEn ? 'Over 300 m² / Hotel Kitchens' : isFr ? 'Plus de 300 m² / Cuisines d’hôtels' : isIt ? 'Oltre 300 m² / Grandi cucine' : 'Über 300 m² / Grossküchen & Hotels', price: t.uponRequest }
  ];

  const inclusions = [
    isEn ? 'Intensive degreasing and cleaning of cooking blocks, stoves, and grills' : isFr ? 'Dégraissage intensif des pianos de cuisson, grills et friteuses' : isIt ? 'Sgrassaggio intensivo blocchi cottura, piani, piastre e friggitrici' : 'Intensive Küchenreinigung und rückstandslose Entfettung aller Kochstellen',
    isEn ? 'Thorough cleaning and degreasing of exhaust hoods and grease filters' : isFr ? 'Nettoyage méticuleux des hottes d’extraction et filtres à graisse' : isIt ? 'Pulizia profonda delle cappe aspiranti e dei filtri antigrasso' : 'Dampfabzug-, Fettfilter- und Lüftungs-Tiefenreinigung',
    isEn ? 'Deep cleaning of ovens, combi-steamers, and deep fryers' : isFr ? 'Décapage et nettoyage des fours, cuiseurs vapeur et friteuses' : isIt ? 'Pulizia approfondita di forni, forni a vapore e friggitrici' : 'Grill-, Ofen-, Kombidämpfer- und Fritteusen-Tiefenreinigung',
    isEn ? 'Hygienic disinfection of all stainless steel and food preparation zones' : isFr ? 'Désinfection hygiénique de tous les plans de travail en inox' : isIt ? 'Disinfezione igienica di tutti i piani di lavoro in acciaio inox' : 'Hygienische Desinfektion aller Edelstahlflächen und Arbeitsbereiche',
    isEn ? 'Wall tile degreasing and deep floor scrubbing with certified chemicals' : isFr ? 'Dégraissage des carrelages muraux et décapage mécanique des sols' : isIt ? 'Sgrassaggio piastrelle murali e lavaggio meccanico dei pavimenti' : 'Wandfliesen-Entfettung und maschinelle Bodenreinigung mit Fettlösern',
    isEn ? 'Cleaning of walk-in coolers, refrigerators, and food storages' : isFr ? 'Nettoyage des chambres froides, réfrigérateurs et réserves' : isIt ? 'Pulizia e sanificazione celle frigorifere, frigo e dispense' : 'Reinigung von Kühlzellen, Kühlschränken und Trockenlagern',
    isEn ? 'Strict compliance with official Swiss food inspection standards (HACCP)' : isFr ? 'Conformité totale avec les contrôles d’hygiène cantonaux (HACCP)' : isIt ? 'Piena conformità con i controlli sanitari cantonali (HACCP)' : 'Dokumentierte Hygiene nach amtlichen Lebensmittelkontrollen (HACCP)',
    isEn ? 'Flexible scheduling on closing days or night shifts without business interruption' : isFr ? 'Interventions de nuit ou les jours de fermeture sans gêner le service' : isIt ? 'Interventi notturni o nei giorni di riposo senza bloccare l’attività' : 'Flexible Ausführung an Ruhetagen oder nachts ohne Störung des Gästebetriebs'
  ];

  const advantages = [
    {
      title: isEn ? 'HACCP Hygiene Compliant' : isFr ? 'Conformité HACCP' : isIt ? 'Standard HACCP garantito' : 'HACCP-Konformität',
      desc: isEn ? 'Pass your official food inspection without stress or sanitation warnings.' : isFr ? 'Passez les contrôles du chimiste cantonal en toute sérénité.' : isIt ? 'Superate le ispezioni sanitarie cantonali senza alcuna preoccupazione.' : 'Bestehen Sie die kantonale Lebensmittelkontrolle jederzeit anstandslos.'
    },
    {
      title: isEn ? 'Specialized Machinery' : isFr ? 'Matériel spécialisé' : isIt ? 'Attrezzature professionali' : 'Spezial-Maschinen',
      desc: isEn ? 'High-temperature steam cleaners and industrial degreasers for food safety.' : isFr ? 'Nettoyeurs vapeur haute température et dégraissants agréés contact alimentaire.' : isIt ? 'Vapore ad alta temperatura e sgrassanti industriali idonei all’alimentare.' : 'Hochtemperatur-Dampfreiniger und lebensmittelechte Profi-Fettlöser.'
    },
    {
      title: isEn ? 'Zero Business Interruption' : isFr ? 'Aucun arrêt d’activité' : isIt ? 'Nessun fermo attività' : 'Kein Betriebsausfall',
      desc: isEn ? 'We clean while your kitchen is closed, ready for prep by morning.' : isFr ? 'Nous intervenons pendant vos heures de fermeture pour un service prêt à l’aube.' : isIt ? 'Lavoriamo mentre la cucina è chiusa per farvi trovare tutto pronto al mattino.' : 'Wir arbeiten diskret in den Ruhezeiten, damit Sie morgens direkt starten können.'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-max max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-swiss-softRed text-swiss-red text-sm font-semibold border border-swiss-red/20">
            <UtensilsCrossed className="w-4 h-4" />
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
                  {isEn ? 'Gastronomy Kitchen & Floor Rates' : isFr ? 'Tarifs cuisines et sols de restaurants' : isIt ? 'Tariffe cucine e pavimenti ristoranti' : 'Festpreise für Gastronomieküchen'}
                </h3>
                <p className="text-sm text-swiss-body mt-1">
                  {isEn ? 'HACCP deep clean including ventilation & degreasing' : isFr ? 'Nettoyage approfondi HACCP avec hottes et dégraissage' : isIt ? 'Pulizia profonda HACCP inclusi sgrassaggio e cappe' : 'Inklusive professioneller Entfettung, Geräten und Dokumentation'}
                </p>
              </div>
              <UtensilsCrossed className="w-8 h-8 text-swiss-red opacity-80 hidden sm:block" />
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
                  {gastroRows.map((row, i) => (
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
                ? '* Regular cleaning intervals (monthly, quarterly, or bi-annual) qualify for attractive long-term contract discounts.'
                : isFr
                ? '* Les fréquences régulières (mensuelles, trimestrielles) bénéficient de remises avantageuses sur contrat.'
                : isIt
                ? '* Gli interventi periodici (mensili, trimestrali) beneficiano di sconti dedicati su contratto.'
                : '* Bei regelmässigen Reinigungsintervallen (z.B. monatlich oder quartalsweise) gewähren wir attraktive Dauerrabatte.'}
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

        {/* Gastronomy Dedicated CTA Card */}
        <div className="card p-8 md:p-10 bg-swiss-softRed border border-swiss-border text-center space-y-6 rounded-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-swiss-text">{t.ctaTitle}</h3>
          <p className="text-swiss-body max-w-2xl mx-auto leading-relaxed">{t.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/form?service=facility`}
              className="btn-primary text-base md:text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
              onClick={() => handleCtaClick('gastronomy_pricing_quote_btn')}
            >
              <span>{t.ctaBtn}</span>
            </Link>
            <a
              href="tel:+41782158030"
              className="btn-secondary text-base md:text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
              onClick={() => handleCtaClick('gastronomy_pricing_phone_btn')}
            >
              <span>+41 78 215 80 30</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
