'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import {
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  Shield,
  Clock,
  Star,
  MapPin,
  Users,
  Truck,
  Home as HomeIcon,
  Sparkles,
  Building2
} from 'lucide-react';

type SeoLandingPageProps = {
  pageKey: string;
  locale: string;
  service: 'umzug' | 'endreinigung' | 'reinigung';
  city: string;
  isPillar?: boolean;
  noindex?: boolean;
  formService: string;
};

const serviceIcons = {
  umzug: Truck,
  endreinigung: Sparkles,
  reinigung: Building2,
};

export default function SeoLandingPage({
  pageKey,
  locale,
  service,
  city,
  isPillar = false,
  noindex = false,
  formService,
}: SeoLandingPageProps) {
  const t = useTranslations();
  const p = (key: string) => t(`seoPages.${pageKey}.${key}` as any);
  const pRaw = (key: string) => t.raw(`seoPages.${pageKey}.${key}` as any);

  const IconComponent = serviceIcons[service];

  // Structured Data (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': isPillar ? 'LocalBusiness' : 'Service',
    ...(isPillar
      ? {
          name: 'SwissCleanMove',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Orpundstrasse 31',
            addressLocality: 'Biel/Bienne',
            postalCode: '2504',
            addressCountry: 'CH',
          },
          telephone: '+41 76 488 36 89',
          url: `https://swisscleanmove.ch/${locale}/${pageKey}`,
          areaServed: {
            '@type': 'Place',
            name: `${city}, Seeland, Schweiz`,
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '52',
            bestRating: '5',
            worstRating: '1'
          }
        }
      : {
          name: p('meta.title'),
          provider: {
            '@type': 'LocalBusiness',
            name: 'SwissCleanMove',
            telephone: '+41 76 488 36 89',
          },
          areaServed: {
            '@type': 'City',
            name: city,
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '28',
            bestRating: '5',
            worstRating: '1'
          }
        }),
  };

  // Parse sections from translations
  let sections: { heading: string; body: string; bullets?: string[] }[] = [];
  try {
    sections = pRaw('sections') as any;
  } catch {
    sections = [];
  }

  // Parse internal links
  let internalLinks: { label: string; href: string }[] = [];
  try {
    internalLinks = pRaw('internalLinks') as any;
  } catch {
    internalLinks = [];
  }

  // Parse trust points
  let trustPoints: string[] = [];
  try {
    trustPoints = pRaw('trustPoints') as any;
  } catch {
    trustPoints = [];
  }

  // Parse service bullets
  let serviceBullets: string[] = [];
  try {
    serviceBullets = pRaw('serviceBullets') as any;
  } catch {
    serviceBullets = [];
  }

  return (
    <Layout>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section with H1 */}
      <SwissHero
        badge={p('badge')}
        title={<h1 className="text-[28px] leading-[1.2] md:text-[38px] md:leading-[1.15] font-bold text-swiss-text">{p('h1')}</h1>}
        subtitle={p('heroSubtitle')}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <Link
              href={`/${locale}/form?service=${formService}`}
              className="btn-secondary text-lg px-8 py-4"
            >
              {p('ctaSoft')}
            </Link>
            <a
              href="tel:+41764883689"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5 text-swiss-red" />
              <span>+41 76 488 36 89</span>
            </a>
          </div>
        }
        right={
          <div className="w-full h-[340px] md:h-[420px] bg-swiss-section flex items-center justify-center">
            <div className="w-20 h-20 bg-swiss-softRed rounded-3xl flex items-center justify-center mx-auto border border-swiss-border shadow-subtle">
              <IconComponent className="w-10 h-10 text-swiss-red" />
            </div>
          </div>
        }
      />

      {/* Intro Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-swiss-body leading-relaxed">
              {p('intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      {sections.map((section, index) => (
        <section
          key={index}
          className={`section-padding ${index % 2 === 0 ? 'bg-swiss-section' : ''}`}
        >
          <div className="container-max">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                {section.heading}
              </h2>
              <p className="text-lg text-swiss-body leading-relaxed">
                {section.body}
              </p>
              {section.bullets && section.bullets.length > 0 && (
                <div className="space-y-3 mt-4">
                  {section.bullets.map((bullet: string, bi: number) => (
                    <div key={bi} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-swiss-red flex-shrink-0 mt-0.5" />
                      <span className="text-swiss-body">{bullet}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Service Bullets Section */}
      {serviceBullets.length > 0 && (
        <section className="section-padding">
          <div className="container-max">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                {p('serviceBulletsHeading')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceBullets.map((bullet, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-swiss-red flex-shrink-0 mt-0.5" />
                    <span className="text-swiss-body">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mid-Page CTA with Trust Block */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            {/* Trust Points */}
            {trustPoints.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {trustPoints.map((point, i) => {
                  const icons = [Shield, Clock, Star];
                  const TrustIcon = icons[i % icons.length];
                  return (
                    <div key={i} className="card p-5 text-center space-y-3">
                      <div className="w-12 h-12 bg-swiss-softRed border border-swiss-border rounded-full flex items-center justify-center mx-auto">
                        <TrustIcon className="w-6 h-6 text-swiss-red" />
                      </div>
                      <p className="text-sm font-medium text-swiss-text">{point}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Mid CTA */}
            <div className="card p-8 bg-white border border-swiss-border text-center space-y-4">
              <h3 className="text-xl font-bold text-swiss-text">{p('ctaMidHeading')}</h3>
              <p className="text-swiss-body">{p('ctaMidBody')}</p>
              <Link
                href={`/${locale}/form?service=${formService}`}
                className="btn-primary text-lg px-8 py-4 inline-block"
              >
                {p('ctaMid')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
              {p('serviceAreaHeading')}
            </h2>
            <p className="text-lg text-swiss-body leading-relaxed">
              {p('serviceAreaBody')}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['Biel/Bienne', 'Nidau', 'Brügg', 'Lyss', 'Ipsach', 'Aarberg', 'Pieterlen'].map(
                (areaCity) => (
                  <span
                    key={areaCity}
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${
                      areaCity.toLowerCase().includes(city.toLowerCase())
                        ? 'bg-swiss-softRed text-swiss-red border-swiss-red/20'
                        : 'bg-white text-swiss-body border-swiss-border'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 inline mr-1" />
                    {areaCity}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      {internalLinks.length > 0 && (
        <section className="section-padding bg-swiss-section">
          <div className="container-max">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-swiss-text">
                {p('internalLinksHeading')}
              </h2>
              <div className="space-y-3">
                {internalLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={`/${locale}/${link.href}`}
                    className="flex items-center space-x-3 p-4 bg-white border border-swiss-border rounded-xl hover:border-swiss-red/30 hover:shadow-sm transition-all group"
                  >
                    <ArrowRight className="w-5 h-5 text-swiss-red group-hover:translate-x-1 transition-transform" />
                    <span className="font-medium text-swiss-text group-hover:text-swiss-red transition-colors">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Strong CTA Section (Bottom) */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div className="card p-8 md:p-10 bg-swiss-softRed border border-swiss-border text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                {p('ctaStrongHeading')}
              </h2>
              <p className="text-lg text-swiss-body">
                {p('ctaStrongBody')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/form?service=${formService}`}
                  className="btn-primary text-lg px-8 py-4"
                >
                  {p('ctaStrong')}
                </Link>
                <a
                  href="tel:+41764883689"
                  className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5 text-swiss-red" />
                  <span>+41 76 488 36 89</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
