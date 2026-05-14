'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import { MapPin, ArrowRight, Phone } from 'lucide-react';

const REGIONS = [
  { slug: 'biel-bienne-seeland', de: 'Biel/Bienne & Seeland', en: 'Biel/Bienne & Seeland', fr: 'Bienne & Seeland', keywords: ['Biel','Bienne','Nidau','Brügg','Lyss','Aarberg','Seeland'] },
  { slug: 'bern', de: 'Kanton Bern', en: 'Canton of Bern', fr: 'Canton de Berne', keywords: ['Bern','Thun','Burgdorf','Langenthal','Lyss'] },
  { slug: 'zuerich', de: 'Kanton Zürich', en: 'Canton of Zurich', fr: 'Canton de Zurich', keywords: ['Zürich','Winterthur','Uster','Dübendorf','Dietikon'] },
  { slug: 'basel', de: 'Kanton Basel', en: 'Canton of Basel', fr: 'Canton de Bâle', keywords: ['Basel','Allschwil','Binningen','Muttenz','Reinach'] },
  { slug: 'aargau', de: 'Kanton Aargau', en: 'Canton of Aargau', fr: 'Canton d\'Argovie', keywords: ['Aarau','Baden','Wettingen','Brugg','Lenzburg'] },
  { slug: 'solothurn', de: 'Kanton Solothurn', en: 'Canton of Solothurn', fr: 'Canton de Soleure', keywords: ['Solothurn','Grenchen','Olten','Zuchwil'] },
  { slug: 'luzern', de: 'Kanton Luzern', en: 'Canton of Lucerne', fr: 'Canton de Lucerne', keywords: ['Luzern','Emmen','Kriens','Horw','Sursee'] },
  { slug: 'zug', de: 'Kanton Zug', en: 'Canton of Zug', fr: 'Canton de Zoug', keywords: ['Zug','Baar','Cham','Hünenberg','Steinhausen'] },
  { slug: 'st-gallen', de: 'Kanton St. Gallen', en: 'Canton of St. Gallen', fr: 'Canton de Saint-Gall', keywords: ['St. Gallen','Rapperswil-Jona','Wil','Gossau'] },
  { slug: 'thurgau', de: 'Kanton Thurgau', en: 'Canton of Thurgau', fr: 'Canton de Thurgovie', keywords: ['Frauenfeld','Kreuzlingen','Weinfelden','Amriswil'] },
  { slug: 'schwyz', de: 'Kanton Schwyz', en: 'Canton of Schwyz', fr: 'Canton de Schwyz', keywords: ['Schwyz','Freienbach','Einsiedeln','Pfäffikon'] },
  { slug: 'neuchatel', de: 'Kanton Neuenburg', en: 'Canton of Neuchâtel', fr: 'Canton de Neuchâtel', keywords: ['Neuchâtel','La Chaux-de-Fonds','Le Locle'] },
  { slug: 'fribourg', de: 'Kanton Fribourg', en: 'Canton of Fribourg', fr: 'Canton de Fribourg', keywords: ['Fribourg','Bulle','Murten','Düdingen'] },
  { slug: 'lausanne-vaud', de: 'Kanton Waadt', en: 'Canton of Vaud', fr: 'Canton de Vaud', keywords: ['Lausanne','Vevey','Montreux','Nyon','Morges'] },
  { slug: 'jura', de: 'Kanton Jura', en: 'Canton of Jura', fr: 'Canton du Jura', keywords: ['Delémont','Porrentruy','Saignelégier'] },
  { slug: 'wallis-valais', de: 'Wallis / Valais', en: 'Valais', fr: 'Valais', keywords: ['Sion','Sierre','Martigny','Monthey','Brig'] },
];

export default function RegionsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();

  return (
    <Layout>
      {/* Hero */}
      <SwissHero
        badge={locale === 'en' ? 'Our Regions' : locale === 'fr' ? 'Nos Régions' : 'Unsere Regionen'}
        title={
          <h1 className="text-[28px] leading-[1.2] md:text-[38px] md:leading-[1.15] font-bold text-swiss-text">
            {locale === 'en' ? 'Moving & Cleaning Company Switzerland – All Regions' : locale === 'fr' ? 'Déménagement & Nettoyage Suisse – Toutes les régions' : 'Umzugsfirma & Reinigungsfirma Schweiz – Alle Regionen'}
          </h1>
        }
        subtitle={locale === 'en' ? 'Professional moving and cleaning services across 16 Swiss cantons and regions.' : locale === 'fr' ? 'Services professionnels de déménagement et de nettoyage dans 16 cantons et régions suisses.' : 'Professionelle Umzugs- und Reinigungsdienste in 16 Schweizer Kantonen und Regionen.'}
        right={
          <div className="w-full h-[340px] md:h-[420px] relative rounded-2xl overflow-hidden shadow-subtle border border-swiss-border">
            <iframe
              title="SwissCleanMove Regions"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Switzerland&zoom=7`}
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        }
      />

      {/* SEO Intro */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg text-swiss-body leading-relaxed">
              {locale === 'en'
                ? 'SwissCleanMove is your reliable partner for moving, cleaning, facility services and disposal throughout Switzerland. Our professional teams are active in 16 cantons and regions — from Biel/Bienne to Zurich, Basel to Valais. Whether you need a private move, office relocation, end-of-tenancy cleaning with handover guarantee, maintenance cleaning, restaurant cleaning, property maintenance or disposal — we deliver Swiss quality at transparent prices.'
                : locale === 'fr'
                ? 'SwissCleanMove est votre partenaire fiable pour le déménagement, le nettoyage, les facility services et le débarras dans toute la Suisse. Nos équipes professionnelles sont actives dans 16 cantons et régions — de Bienne à Zurich, de Bâle au Valais. Que vous ayez besoin d\'un déménagement privé, d\'un déménagement de bureau, d\'un nettoyage de fin de bail avec garantie, d\'un nettoyage d\'entretien, d\'un nettoyage gastronomie, d\'une conciergerie ou d\'un débarras — nous offrons la qualité suisse à des prix transparents.'
                : 'SwissCleanMove ist Ihr zuverlässiger Partner für Umzug, Reinigung, Facility Services und Entsorgung in der ganzen Schweiz. Unsere professionellen Teams sind in 16 Kantonen und Regionen aktiv — von Biel/Bienne bis Zürich, Basel bis Wallis. Ob Privatumzug, Firmenumzug, Umzugsreinigung mit Abnahmegarantie, Unterhaltsreinigung, Gastronomie Reinigung, Hauswartung oder Entsorgung — wir liefern Schweizer Qualität zu transparenten Preisen.'}
            </p>
          </div>
        </div>
      </section>

      {/* Region Cards Grid */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {locale === 'en' ? '16 Regions — One Partner' : locale === 'fr' ? '16 Régions — Un Partenaire' : '16 Regionen — Ein Partner'}
            </h2>
            <p className="text-lg text-swiss-body max-w-2xl mx-auto">
              {locale === 'en' ? 'Click on any region for detailed information about our local services.' : locale === 'fr' ? 'Cliquez sur une région pour des informations détaillées sur nos services locaux.' : 'Klicken Sie auf eine Region für detaillierte Informationen zu unseren lokalen Dienstleistungen.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONS.map((region) => (
              <Link
                key={region.slug}
                href={`/${locale}/${region.slug}`}
                className="card p-6 space-y-4 group hover:border-swiss-red/40 hover:shadow-medium transition-all"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-swiss-text group-hover:text-swiss-red transition-colors">
                    {region[locale as 'de' | 'en' | 'fr'] || region.de}
                  </h3>
                  <MapPin className="w-6 h-6 text-swiss-red flex-shrink-0 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {region.keywords.map(kw => (
                    <span key={kw} className="px-2.5 py-1 rounded-full text-xs font-medium bg-swiss-softRed text-swiss-red border border-swiss-red/10">
                      {kw}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-swiss-red font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  <span>{locale === 'en' ? 'View Region' : locale === 'fr' ? 'Voir la région' : 'Region ansehen'}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div className="card p-8 md:p-10 bg-swiss-softRed border border-swiss-border text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                {locale === 'en' ? 'Your Region Not Listed?' : locale === 'fr' ? 'Votre région n\'est pas listée ?' : 'Ihre Region nicht dabei?'}
              </h2>
              <p className="text-lg text-swiss-body">
                {locale === 'en' ? 'Contact us — we operate throughout Switzerland and can help you anywhere.' : locale === 'fr' ? 'Contactez-nous — nous opérons dans toute la Suisse et pouvons vous aider partout.' : 'Kontaktieren Sie uns — wir sind schweizweit im Einsatz und können Ihnen überall helfen.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/free-offer`} className="btn-primary text-lg px-8 py-4">
                  {locale === 'en' ? 'Request Free Quote' : locale === 'fr' ? 'Demander un devis' : 'Kostenlose Offerte anfordern'}
                </Link>
                <a href="tel:+41782158030" className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5 text-swiss-red" /><span>+41 78 215 80 30</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
