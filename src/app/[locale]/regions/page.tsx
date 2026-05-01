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
  
  // Switzerland-wide Einsatzgebiete
  const globalLocations = ['Bern', 'Zürich', 'Solothurn', 'Neuchâtel', 'Fribourg', 'Basel', 'Aargau', 'Ganze Schweiz'];

  const customRegions = [
    {
      id: 'biel',
      name: 'Biel / Bienne',
      keywords: 'Umzug Biel | Umzugsfirma Biel | Umzugsreinigung Biel mit Abnahmegarantie',
      desc: locale === 'en' ? 'Professional moves and cleaning in Biel and Seeland. Reliable, fast, and local.' : locale === 'fr' ? 'Déménagements et nettoyages professionnels à Bienne et dans le Seeland. Fiable, rapide et local.' : 'Professionelle Umzüge und Reinigungen in Biel und Seeland. Zuverlässig, schnell und lokal.',
      link: `/${locale}/umzug-biel`
    },
    {
      id: 'seeland',
      name: 'Seeland (Nidau, Lyss, Aarberg)',
      keywords: 'Umzug Seeland | Zügelfirma Seeland | Endreinigung Seeland',
      desc: locale === 'en' ? 'We cover the entire Seeland region with our relocation and cleaning teams. Ready for action in 24h.' : locale === 'fr' ? 'Nous couvrons toute la région du Seeland avec nos équipes de déménagement et de nettoyage. Prêts à intervenir en 24h.' : 'Wir decken das gesamte Seeland mit unseren Zügel- und Reinigungsteams ab. Einsatzbereit in 24h.',
      link: `/${locale}/umzug-nidau`
    },
    {
      id: 'bern',
      name: 'Kanton Bern',
      keywords: 'Umzug Bern | Reinigungsfirma Bern | Wohnungsreinigung Bern',
      desc: locale === 'en' ? 'Your partner for moves across the entire canton of Bern. Fixed prices and transport insurance included.' : locale === 'fr' ? 'Votre partenaire pour les déménagements dans tout le canton de Berne. Prix fixes et assurance transport inclus.' : 'Ihr Partner für Umzüge im gesamten Kanton Bern. Fixpreise und Transportversicherung inklusive.',
      link: `/${locale}/contact`
    },
    {
      id: 'zurich',
      name: 'Zürich & Aargau',
      keywords: 'Umzugsfirma Zürich | Umzug Aargau | Zügelunternehmen',
      desc: locale === 'en' ? 'Long-distance moves to and from Zurich. We organize your move smoothly and safely.' : locale === 'fr' ? 'Déménagements longue distance de et vers Zurich. Nous organisons votre déménagement en douceur et en toute sécurité.' : 'Fernumzüge von und nach Zürich. Wir organisieren Ihren Umzug reibungslos und sicher.',
      link: `/${locale}/contact`
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
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {customRegions.map((region, index) => (
              <div key={index} className="card p-8 flex flex-col space-y-6 hover:shadow-medium transition-shadow">
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-bold text-swiss-text mb-2 border-b-2 border-swiss-red pb-2 inline-block">
                    {region.name}
                  </h3>
                  <MapPin className="w-8 h-8 text-swiss-red flex-shrink-0" />
                </div>
                
                <div className="bg-swiss-softRed p-3 rounded-lg border border-swiss-red/20">
                  <p className="text-sm font-semibold text-swiss-red">
                    {region.keywords}
                  </p>
                </div>

                <p className="text-swiss-body flex-grow">
                  {region.desc}
                </p>

                <div className="pt-4 border-t border-swiss-border">
                  <Link href={region.link} className="inline-flex items-center space-x-2 text-swiss-red font-bold hover:text-red-700 transition-colors group">
                    <span>👉 {locale === 'en' ? 'View Page' : locale === 'fr' ? 'Voir la page' : 'Seite ansehen'}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Switzerland-wide Einsatzgebiete */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
              {locale === 'en' ? 'Operational Throughout Switzerland' : locale === 'fr' ? 'Opérationnel dans toute la Suisse' : 'Schweizweit im Einsatz'}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {globalLocations.map((loc, i) => (
                <span key={i} className="px-5 py-2.5 bg-white border border-swiss-border rounded-xl shadow-subtle font-medium text-swiss-text flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-swiss-red" />
                  <span>{loc}</span>
                </span>
              ))}
            </div>
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
