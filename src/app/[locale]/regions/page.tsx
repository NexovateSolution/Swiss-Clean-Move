'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import {
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  Star,
  Users,
  Home as HomeIcon,
  Building2,
  Trash2,
  Heart,
  Truck,
  ArrowRight
} from 'lucide-react';

export default function RegionsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();

  const companyPhone = '+41 76 488 36 89';
  


    const customRegions = [
    {
      id: 'biel',
      name: 'Biel / Bienne',
      keywords: 'Umzug Biel | Umzugsfirma Biel | Umzugsreinigung Biel mit Abnahmegarantie',
      desc: locale === 'en' ? 'Professional moves and cleaning in Biel/Bienne and the surrounding Seeland region. As our home base, we offer the fastest response times, local expertise, and comprehensive services including move-out cleaning with handover guarantee. Reliable, fast, and local.' : locale === 'fr' ? 'Déménagements et nettoyages professionnels à Bienne et dans la région du Seeland. En tant que notre base, nous offrons les délais de réponse les plus rapides, une expertise locale et des services complets, y compris le nettoyage de fin de bail avec garantie de remise. Fiable, rapide et local.' : 'Professionelle Umzüge und Reinigungen in Biel/Bienne und der umliegenden Seeland-Region. Als unser Hauptsitz bieten wir die schnellsten Reaktionszeiten, lokale Expertise und umfassende Dienstleistungen inkl. Endreinigung mit Abnahmegarantie. Zuverlässig, schnell und lokal.',
      link: `/${locale}/umzug-biel`,
      mapQuery: 'Biel/Bienne,Switzerland'
    },
    {
      id: 'seeland',
      name: 'Seeland (Nidau, Lyss, Aarberg)',
      keywords: 'Umzug Seeland | Zügelfirma Seeland | Endreinigung Seeland',
      desc: locale === 'en' ? 'We cover the entire Seeland region — Nidau, Lyss, Aarberg, Brügg, Ipsach, and Pieterlen — with dedicated moving and cleaning teams. Whether private apartments or commercial spaces, we guarantee professional execution with transport insurance and handover guarantee. Ready for action in 24h.' : locale === 'fr' ? 'Nous couvrons toute la région du Seeland — Nidau, Lyss, Aarberg, Brügg, Ipsach et Pieterlen — avec des équipes spécialisées en déménagement et nettoyage. Que ce soit pour des appartements privés ou des locaux commerciaux, nous garantissons une exécution professionnelle avec assurance transport et garantie de remise. Prêts à intervenir en 24h.' : 'Wir decken das gesamte Seeland ab — Nidau, Lyss, Aarberg, Brügg, Ipsach und Pieterlen — mit spezialisierten Umzugs- und Reinigungsteams. Ob Privatwohnung oder Geschäftsräume, wir garantieren professionelle Ausführung mit Transportversicherung und Abnahmegarantie. Einsatzbereit in 24h.',
      link: `/${locale}/umzug-nidau`,
      mapQuery: 'Seeland,Bern,Switzerland'
    },
    {
      id: 'bern',
      name: 'Kanton Bern',
      keywords: 'Umzug Bern | Reinigungsfirma Bern | Wohnungsreinigung Bern',
      desc: locale === 'en' ? 'Your reliable partner for moves and cleaning across the entire Canton of Bern. We handle private relocations, office moves, and end-of-tenancy cleaning with fixed prices and transport insurance included. From the city of Bern to Thun, Burgdorf, and beyond — SwissCleanMove delivers Swiss quality throughout the canton.' : locale === 'fr' ? 'Votre partenaire fiable pour les déménagements et le nettoyage dans tout le canton de Berne. Nous gérons les déménagements privés, les déménagements de bureaux et le nettoyage de fin de bail avec des prix fixes et une assurance transport incluse. De la ville de Berne à Thoune, Berthoud et au-delà — SwissCleanMove livre la qualité suisse dans tout le canton.' : 'Ihr zuverlässiger Partner für Umzüge und Reinigungen im gesamten Kanton Bern. Wir übernehmen Privatumzüge, Büroumzüge und Endreinigungen mit Fixpreisen und Transportversicherung inklusive. Von der Stadt Bern über Thun, Burgdorf und darüber hinaus — SwissCleanMove liefert Schweizer Qualität im ganzen Kanton.',
      link: `/${locale}/free-offer`,
      mapQuery: 'Canton+of+Bern,Switzerland'
    },
    {
      id: 'zurich',
      name: 'Zürich & Aargau',
      keywords: 'Umzugsfirma Zürich | Umzug Aargau | Zügelunternehmen',
      desc: locale === 'en' ? 'Long-distance moves to and from Zurich and Aargau, organized smoothly and safely. We coordinate relocations between the Seeland region and the greater Zurich area, including Winterthur, Baden, and Aarau. Full packing service, furniture assembly, and move-out cleaning available on request.' : locale === 'fr' ? 'Déménagements longue distance de et vers Zurich et Argovie, organisés en douceur et en toute sécurité. Nous coordonnons les relocalisations entre la région du Seeland et la grande région de Zurich, y compris Winterthour, Baden et Aarau. Service d\'emballage complet, montage de meubles et nettoyage de fin de bail disponibles sur demande.' : 'Fernumzüge von und nach Zürich und Aargau — reibungslos und sicher organisiert. Wir koordinieren Umzüge zwischen der Region Seeland und dem Grossraum Zürich, inkl. Winterthur, Baden und Aarau. Kompletter Packservice, Möbelmontage und Endreinigung auf Wunsch verfügbar.',
      link: `/${locale}/free-offer`,
      mapQuery: 'Zurich,Switzerland'
    },
    {
      id: 'solothurn',
      name: 'Solothurn',
      keywords: 'Umzug Solothurn | Reinigungsfirma Solothurn | Zügeln',
      desc: locale === 'en' ? 'Professional moving and cleaning services in the Canton of Solothurn. As a neighboring region to our base in Biel, we offer fast deployment times for relocations, end-of-tenancy cleaning, and maintenance services in Solothurn, Olten, Grenchen, and surrounding areas.' : locale === 'fr' ? 'Services professionnels de déménagement et de nettoyage dans le canton de Soleure. En tant que région voisine de notre base à Bienne, nous offrons des délais d\'intervention rapides pour les déménagements, le nettoyage de fin de bail et les services d\'entretien à Soleure, Olten, Granges et les environs.' : 'Professionelle Umzugs- und Reinigungsdienste im Kanton Solothurn. Als Nachbarregion unseres Standorts in Biel bieten wir schnelle Einsatzzeiten für Umzüge, Endreinigungen und Unterhaltsreinigungen in Solothurn, Olten, Grenchen und Umgebung.',
      link: `/${locale}/free-offer`,
      mapQuery: 'Solothurn,Switzerland'
    },
    {
      id: 'neuchatel',
      name: 'Neuchâtel',
      keywords: 'Déménagement Neuchâtel | Nettoyage Neuchâtel',
      desc: locale === 'en' ? 'Reliable relocation and cleaning services in the Neuchâtel region. We serve the cities of Neuchâtel, La Chaux-de-Fonds, and Le Locle with professional moving, end-of-tenancy cleaning, and facility management. Bilingual service in French and German.' : locale === 'fr' ? 'Services fiables de déménagement et de nettoyage dans la région de Neuchâtel. Nous desservons les villes de Neuchâtel, La Chaux-de-Fonds et Le Locle avec des déménagements professionnels, du nettoyage de fin de bail et de la gestion de facility. Service bilingue en français et en allemand.' : 'Zuverlässige Umzugs- und Reinigungsdienste in der Region Neuenburg. Wir bedienen die Städte Neuenburg, La Chaux-de-Fonds und Le Locle mit professionellen Umzügen, Endreinigungen und Facility Management. Zweisprachiger Service in Französisch und Deutsch.',
      link: `/${locale}/free-offer`,
      mapQuery: 'Neuchatel,Switzerland'
    },
    {
      id: 'fribourg',
      name: 'Fribourg',
      keywords: 'Umzug Fribourg | Déménagement Fribourg | Nettoyage',
      desc: locale === 'en' ? 'Your trusted partner for moves and cleaning in the Canton of Fribourg. Whether relocating within Fribourg city, Bulle, or Murten — we provide complete moving services, professional cleaning, and disposal. Bilingual teams available for French and German-speaking clients.' : locale === 'fr' ? 'Votre partenaire de confiance pour les déménagements et le nettoyage dans le canton de Fribourg. Que vous déménagiez à Fribourg ville, Bulle ou Morat — nous proposons des services de déménagement complets, un nettoyage professionnel et l\'élimination. Équipes bilingues disponibles pour les clients francophones et germanophones.' : 'Ihr verlässlicher Partner für Umzüge und Reinigungen im Kanton Freiburg. Ob Umzug innerhalb der Stadt Freiburg, Bulle oder Murten — wir bieten komplette Umzugsservices, professionelle Reinigung und Entsorgung. Zweisprachige Teams für deutsch- und französischsprachige Kunden verfügbar.',
      link: `/${locale}/free-offer`,
      mapQuery: 'Fribourg,Switzerland'
    },
    {
      id: 'basel',
      name: 'Basel',
      keywords: 'Umzug Basel | Reinigungsfirma Basel | Zügelfirma',
      desc: locale === 'en' ? 'Stress-free moving and cleaning services in the Basel area. We handle relocations to and from Basel-Stadt and Basel-Landschaft, including cross-border moves. End-of-tenancy cleaning, office relocations, and disposal services available with transparent pricing and no hidden costs.' : locale === 'fr' ? 'Services de déménagement et de nettoyage sans stress dans la région de Bâle. Nous gérons les déménagements de et vers Bâle-Ville et Bâle-Campagne, y compris les déménagements transfrontaliers. Nettoyage de fin de bail, déménagements de bureaux et services d\'élimination disponibles avec des prix transparents et sans coûts cachés.' : 'Stressfreier Umzug und Reinigung im Raum Basel. Wir übernehmen Umzüge von und nach Basel-Stadt und Basel-Landschaft, inkl. grenzüberschreitende Umzüge. Endreinigung, Büroumzüge und Entsorgung mit transparenten Preisen ohne versteckte Kosten.',
      link: `/${locale}/free-offer`,
      mapQuery: 'Basel,Switzerland'
    },
    {
      id: 'ganze-schweiz',
      name: locale === 'en' ? 'All of Switzerland' : locale === 'fr' ? 'Toute la Suisse' : 'Ganze Schweiz',
      keywords: 'Umzugsfirma Schweiz | Schweizweit umziehen | Reinigung',
      desc: locale === 'en' ? 'SwissCleanMove operates throughout Switzerland for all your moving and cleaning needs. From Biel to Geneva, Lugano to St. Gallen — we coordinate long-distance relocations, corporate moves, and professional cleaning nationwide. One partner for everything, wherever you are in Switzerland.' : locale === 'fr' ? 'SwissCleanMove opère dans toute la Suisse pour tous vos besoins de déménagement et de nettoyage. De Bienne à Genève, Lugano à Saint-Gall — nous coordonnons les déménagements longue distance, les déménagements d\'entreprise et le nettoyage professionnel dans tout le pays. Un seul partenaire pour tout, où que vous soyez en Suisse.' : 'SwissCleanMove ist schweizweit für alle Ihre Umzugs- und Reinigungsbedürfnisse im Einsatz. Von Biel bis Genf, Lugano bis St. Gallen — wir koordinieren Fernumzüge, Firmenumzüge und professionelle Reinigungen landesweit. Ein Partner für alles, egal wo Sie in der Schweiz sind.',
      link: `/${locale}/free-offer`,
      mapQuery: 'Switzerland'
    }
  ];

  const services = [
    { id: 'houseCleaning', icon: HomeIcon, href: `/${locale}/services/house-cleaning` },
    { id: 'relocation', icon: Truck, href: `/${locale}/services/relocation` },
    { id: 'disposal', icon: Trash2, href: `/${locale}/services/disposal` },
    { id: 'householdHelping', icon: Heart, href: `/${locale}/services/household-helping` },
    { id: 'facilityServices', icon: Building2, href: `/${locale}/services#facilityServices` }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <SwissHero
        badge={locale === 'en' ? 'Our Regions' : locale === 'fr' ? 'Nos Régions' : 'Unsere Regionen'}
        title={<h1 className="text-[28px] leading-[1.2] md:text-[38px] md:leading-[1.15] font-bold text-swiss-text">
          {locale === 'en' ? 'Moving & Cleaning Company Switzerland – All Regions | SwissCleanMove' : locale === 'fr' ? 'Entreprise de déménagement et nettoyage Suisse – Toutes les régions | SwissCleanMove' : 'Umzugsfirma & Reinigungsfirma Schweiz – Alle Regionen | SwissCleanMove'}
        </h1>}
        subtitle={locale === 'en' ? 'Professional moving and cleaning services across Switzerland.' : locale === 'fr' ? 'Services professionnels de déménagement et de nettoyage dans toute la Suisse.' : 'Professionelle Umzugs- und Reinigungsdienste in der ganzen Schweiz.'}
        right={
          <div className="w-full h-[340px] md:h-[420px] relative rounded-2xl overflow-hidden shadow-subtle border border-swiss-border">
            <Image
              src="/images/transportation.jpg"
              alt="SwissCleanMove Regions"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        }
      />

      {/* SEO Intro Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg text-swiss-body leading-relaxed">
              {locale === 'en' 
                ? 'Are you planning a move in Switzerland? SwissCleanMove is your reliable partner for relocation and cleaning. Whether you need a moving company in Switzerland or an end-of-tenancy cleaning company in Switzerland, our experienced teams are ready to assist you nationwide. We specialize in stress-free moves, including transport insurance and handover guarantee.' 
                : locale === 'fr' 
                ? 'Prévoyez-vous un déménagement en Suisse ? SwissCleanMove est votre partenaire fiable pour le déménagement et le nettoyage. Que vous ayez besoin d\'une entreprise de déménagement en Suisse ou d\'une entreprise de nettoyage de fin de bail en Suisse, nos équipes expérimentées sont prêtes à vous aider dans tout le pays. Nous sommes spécialisés dans les déménagements sans stress, avec assurance transport et garantie de remise.' 
                : 'Planen Sie einen Umzug Schweiz? SwissCleanMove ist Ihr zuverlässiger Partner für Umzüge und Reinigungen. Egal ob Sie eine Umzugsfirma Schweiz oder eine Reinigungsfirma Schweiz für die Wohnungsabgabe suchen – unsere erfahrenen Teams sind national für Sie im Einsatz. Wir garantieren einen stressfreien Ablauf, faire Preise inklusive Transportversicherung und eine 100% Abnahmegarantie bei Endreinigungen.'}
            </p>
          </div>
        </div>
      </section>

      {/* Region Grid (Upgraded) */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {locale === 'en' ? 'Our Core Regions' : locale === 'fr' ? 'Nos Régions Principales' : 'Unsere Kernregionen'}
            </h2>
            <p className="text-lg text-swiss-body max-w-2xl mx-auto">
              {locale === 'en' ? 'Click on any region to learn more or request a free quote directly.' : locale === 'fr' ? 'Cliquez sur une région pour en savoir plus ou demandez un devis gratuit directement.' : 'Klicken Sie auf eine Region, um mehr zu erfahren, oder fordern Sie direkt eine kostenlose Offerte an.'}
            </p>
          </div>

          <div className="space-y-8">
            {customRegions.map((region, index) => (
              <div key={index} className="card overflow-hidden hover:shadow-medium transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Map */}
                  <div className="lg:col-span-1 h-64 lg:h-auto min-h-[250px]">
                    <iframe
                      title={`Map of ${region.name}`}
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(region.mapQuery)}&zoom=${region.id === 'ganze-schweiz' ? 7 : 10}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: '250px' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-2 p-8 flex flex-col space-y-5">
                    <div className="flex items-start justify-between">
                      <h3 className="text-2xl font-bold text-swiss-text border-b-2 border-swiss-red pb-2 inline-block">
                        {region.name}
                      </h3>
                      <MapPin className="w-8 h-8 text-swiss-red flex-shrink-0" />
                    </div>
                    
                    <div className="bg-swiss-softRed p-3 rounded-lg border border-swiss-red/20">
                      <p className="text-sm font-semibold text-swiss-red">
                        {region.keywords}
                      </p>
                    </div>

                    <p className="text-swiss-body flex-grow leading-relaxed">
                      {region.desc}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-swiss-border">
                      <Link
                        href={`/${locale}/free-offer`}
                        className="inline-flex items-center justify-center space-x-2 btn-primary px-6 py-3"
                      >
                        <span>{locale === 'en' ? '📋 Request a Quote' : locale === 'fr' ? '📋 Demander un devis' : '📋 Offerte anfordern'}</span>
                      </Link>
                      {region.link !== `/${locale}/free-offer` && (
                        <Link href={region.link} className="inline-flex items-center space-x-2 text-swiss-red font-bold hover:text-red-700 transition-colors group px-6 py-3">
                          <span>👉 {locale === 'en' ? 'View Page' : locale === 'fr' ? 'Voir la page' : 'Seite ansehen'}</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Available Services */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('regions.servicesAvailable')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {services.map((service, index) => (
              (() => {
                const IconComponent = service.icon;
                return (
                  <Link
                    key={index}
                    href={service.href}
                    className="card p-6 text-center space-y-4 group hover:border-swiss-red transition-all"
                  >
                    <div className="w-12 h-12 bg-swiss-softRed rounded-xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                      <IconComponent className="w-6 h-6 text-swiss-red" />
                    </div>
                    <h3 className="font-semibold text-swiss-text text-sm">
                      {t(`regions.services.${service.id}`)}
                    </h3>
                  </Link>
                );
              })()
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
}
