'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import UmzugPricing from '@/components/UmzugPricing';
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
  Building2,
  Heart,
  Trash2,
  UtensilsCrossed,
  Wrench,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';

type SeoLandingPageProps = {
  pageKey: string;
  locale: string;
  service: 'umzug' | 'endreinigung' | 'reinigung' | 'haushaltshilfe' | 'reinigungsfirma' | 'umzugsfirma' | 'unterhaltsreinigung' | 'fensterreinigung' | 'transport' | 'entsorgung' | 'facilityService' | 'hauswartung' | 'baureinigung' | 'gastronomieReinigung';
  city: string;
  isPillar?: boolean;
  noindex?: boolean;
  formService: string;
  mapQuery?: string;
  areaCities?: string[];
};

const serviceIcons = {
  umzug: Truck,
  endreinigung: Sparkles,
  reinigung: Building2,
  haushaltshilfe: Heart,
  reinigungsfirma: Building2,
  umzugsfirma: Truck,
  unterhaltsreinigung: Building2,
  fensterreinigung: Sparkles,
  transport: Truck,
  entsorgung: Trash2,
  facilityService: Building2,
  hauswartung: Wrench,
  baureinigung: Sparkles,
  gastronomieReinigung: UtensilsCrossed,
};

export default function SeoLandingPage({
  pageKey,
  locale,
  service,
  city,
  isPillar = false,
  noindex = false,
  formService,
  mapQuery,
  areaCities,
}: SeoLandingPageProps) {
  const t = useTranslations();
  const p = (key: string) => t(`seoPages.${pageKey}.${key}` as any);
  const pRaw = (key: string) => t.raw(`seoPages.${pageKey}.${key}` as any);

  const IconComponent = serviceIcons[service];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Parse FAQs
  let faqs: { question: string; answer: string }[] = [];
  try {
    const rawFaqs = pRaw('faqs');
    if (Array.isArray(rawFaqs)) faqs = rawFaqs;
  } catch {
    faqs = [];
  }

  // Parse testimonial
  let testimonial: { quote: string; author: string; trust: string } | null = null;
  try {
    const rawTestimonial = pRaw('testimonial');
    if (typeof rawTestimonial === 'object' && rawTestimonial !== null && !Array.isArray(rawTestimonial)) {
      testimonial = rawTestimonial as any;
    }
  } catch {
    testimonial = null;
  }

  // Structured Data (JSON-LD)
  const baseSchema = isPillar
    ? {
        '@type': 'LocalBusiness',
        name: 'SwissCleanMove',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Orpundstrasse 31',
          addressLocality: 'Biel/Bienne',
          postalCode: '2504',
          addressCountry: 'CH',
        },
        telephone: '+41 78 215 80 30',
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
        '@type': 'Service',
        name: p('meta.title'),
        provider: {
          '@type': 'LocalBusiness',
          name: 'SwissCleanMove',
          telephone: '+41 78 215 80 30',
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
      };

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      baseSchema,
      faqs.length > 0 && {
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    ].filter(Boolean)
  };

  // Parse sections from translations
  let sections: { heading: string; body: string; bullets?: string[] }[] = [];
  try {
    const rawSections = pRaw('sections');
    if (Array.isArray(rawSections)) sections = rawSections;
  } catch {
    sections = [];
  }

  // Parse internal links
  let internalLinks: { label: string; href: string }[] = [];
  try {
    const rawLinks = pRaw('internalLinks');
    if (Array.isArray(rawLinks)) internalLinks = rawLinks;
  } catch {
    internalLinks = [];
  }

  // Parse trust points
  let trustPoints: string[] = [];
  try {
    const rawTrust = pRaw('trustPoints');
    if (Array.isArray(rawTrust)) trustPoints = rawTrust;
  } catch {
    trustPoints = [];
  }

  // Parse service bullets
  let serviceBullets: string[] = [];
  try {
    const rawBullets = pRaw('serviceBullets');
    if (Array.isArray(rawBullets)) serviceBullets = rawBullets;
  } catch {
    serviceBullets = [];
  }

  // Parse premium service cards (for haushaltshilfe pages)
  let serviceCards: { title: string; description: string; features: string[] }[] = [];
  try {
    const rawCards = pRaw('serviceCards');
    if (Array.isArray(rawCards)) serviceCards = rawCards;
  } catch {
    serviceCards = [];
  }

  // Conversion Tracking
  const handleCtaClick = (ctaName: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_cta', {
        event_category: 'engagement',
        event_label: ctaName,
        value: 1
      });
    }
  };

  const getOptimizedAlt = (baseService: string, locCity: string, isHero = false) => {
    if (baseService === 'hauswartung') {
      return isHero 
        ? `Professionelle Hauswartung & Facility Service in ${locCity}`
        : `Hauswartung und Objektbetreuung ${locCity}`;
    }
    if (baseService === 'facilityService') {
      return isHero
        ? `Facility Service & Gebäudeservice in ${locCity}`
        : `Gebäudeunterhalt und Liegenschaftsservice ${locCity}`;
    }
    return isHero ? `${baseService} in ${locCity}` : `${baseService} ${locCity}`;
  };

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
              onClick={() => handleCtaClick('hero_form_btn')}
            >
              {p('ctaSoft')}
            </Link>
            <a
              href="tel:+41782158030"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
              onClick={() => handleCtaClick('hero_phone_btn')}
            >
              <Phone className="w-5 h-5 text-swiss-red" />
              <span>+41 78 215 80 30</span>
            </a>
          </div>
        }
        right={
          <div className="w-full h-[340px] md:h-[420px] bg-swiss-section flex items-center justify-center relative rounded-2xl overflow-hidden shadow-subtle border border-swiss-border">
            <Image 
              src={service === 'umzug' ? '/images/transportation.jpg' : '/Gallary/2.jpeg'} 
              alt={getOptimizedAlt(service, city, true)}
              fill
              className="object-cover opacity-90"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto border border-white/50 shadow-soft relative z-10">
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

      {/* Testimonial Section */}
      {testimonial && (
        <section className="section-padding bg-swiss-softRed border-y border-swiss-border/50">
          <div className="container-max">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl font-medium text-swiss-text italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="space-y-2">
                <p className="font-bold text-swiss-text text-lg">— {testimonial.author}</p>
                <div className="flex items-center justify-center space-x-2 text-sm text-swiss-red font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>{testimonial.trust}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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

      {/* Premium Service Cards (for haushaltshilfe pages) */}
      {serviceCards.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-swiss-text">
                  {p('serviceCardsHeading')}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {serviceCards.map((card, i) => {
                  const cardIcons = [Sparkles, HomeIcon, Star, Heart];
                  const CardIcon = cardIcons[i % cardIcons.length];
                  return (
                    <div key={i} className="card p-6 space-y-4 bg-white border border-swiss-border">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-swiss-softRed border border-swiss-border rounded-xl flex items-center justify-center flex-shrink-0">
                          <CardIcon className="w-6 h-6 text-swiss-red" />
                        </div>
                        <h3 className="text-lg font-bold text-swiss-text">{card.title}</h3>
                      </div>
                      <p className="text-swiss-body text-sm">{card.description}</p>
                      <div className="space-y-2">
                        {card.features.map((feat, fi) => (
                          <div key={fi} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-swiss-red flex-shrink-0" />
                            <span className="text-sm text-swiss-body">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Real-World Proof Section ("Unsere Arbeit") or Pricing for Haushaltshilfe */}
      {service === 'haushaltshilfe' ? (
        <section className="section-padding bg-white">
          <div className="container-max max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-swiss-text">
                {locale === 'en' ? 'Household Help & Cleaning Lady Prices' : locale === 'fr' ? 'Prix d\'aide ménagère et femme de ménage' : 'Haushaltshilfe & Putzfrau Preise'}
              </h2>
              <p className="text-swiss-body max-w-2xl mx-auto">
                {locale === 'en' ? 'Professional household help for private households, families, seniors, and busy professionals. Transparent pricing, reliable service, and the highest quality standards.' : locale === 'fr' ? 'Aide ménagère professionnelle pour les ménages privés, les familles, les personnes âgées et les professionnels très occupés. Prix transparents, service fiable et les plus hauts standards de qualité.' : 'Professionelle Haushaltshilfe für Privathaushalte, Familien, Senioren und Berufstätige. Transparente Preise, zuverlässiger Service und höchste Qualitätsstandards.'}
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-swiss-gray-50 rounded-xl overflow-hidden shadow-subtle border border-swiss-border">
                <thead>
                  <tr className="bg-swiss-softRed">
                    <th className="p-4 border-b border-swiss-border font-bold text-swiss-text">{locale === 'en' ? 'Service' : locale === 'fr' ? 'Service' : 'Dienstleistung'}</th>
                    <th className="p-4 border-b border-swiss-border font-bold text-swiss-text">{locale === 'en' ? 'Price from' : locale === 'fr' ? 'Prix à partir de' : 'Preis ab'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-swiss-border">
                  {[
                    {
                      en: 'Regular Household Help (weekly)', fr: 'Aide ménagère régulière (hebdomadaire)', de: 'Regelmässige Haushaltshilfe (wöchentlich)', price: 'CHF 42.– / Stunde'
                    },
                    {
                      en: 'Household Help (every 2 weeks)', fr: 'Aide ménagère (toutes les 2 semaines)', de: 'Haushaltshilfe (14-täglich)', price: 'CHF 45.– / Stunde'
                    },
                    {
                      en: 'One-Time Household Help', fr: 'Aide ménagère ponctuelle', de: 'Einmalige Haushaltshilfe', price: 'CHF 48.– / Stunde'
                    },
                    {
                      en: 'Premium Household Help', fr: 'Aide ménagère premium', de: 'Premium Haushaltshilfe', price: 'CHF 49.– / Stunde'
                    },
                    {
                      en: 'Deep Cleaning / Spring Cleaning', fr: 'Nettoyage en profondeur / Nettoyage de printemps', de: 'Grundreinigung / Frühlingsputz', price: 'CHF 55.– / Stunde'
                    },
                    {
                      en: 'Ironing Service', fr: 'Service de repassage', de: 'Bügelservice', price: 'CHF 42.– / Stunde'
                    },
                    {
                      en: 'Window Cleaning', fr: 'Nettoyage de vitres', de: 'Fensterreinigung', price: locale === 'en' ? 'from CHF 7.– / m²' : locale === 'fr' ? 'à partir de CHF 7.– / m²' : 'ab CHF 7.– / m²'
                    },
                    {
                      en: 'Minimum Order', fr: 'Commande minimum', de: 'Mindestauftrag', price: 'CHF 120.–'
                    }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white transition-colors">
                      <td className="p-4 text-swiss-text font-medium">{row[locale as 'en'|'fr'|'de'] || row.de}</td>
                      <td className="p-4 text-swiss-text">{row.price.replace('Stunde', locale === 'en' ? 'hour' : locale === 'fr' ? 'heure' : 'Stunde')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-swiss-text">{locale === 'en' ? 'Included Services' : locale === 'fr' ? 'Services Inclus' : 'Inbegriffen'}</h3>
                <ul className="space-y-2">
                  {[
                    { en: 'Vacuuming and floor cleaning', fr: 'Passage de l\'aspirateur et nettoyage des sols', de: 'Staubsaugen und Bodenreinigung' },
                    { en: 'Kitchen and bathroom cleaning', fr: 'Nettoyage de la cuisine et de la salle de bain', de: 'Reinigung von Küche und Badezimmer' },
                    { en: 'Toilet cleaning and disinfection', fr: 'Nettoyage et désinfection des toilettes', de: 'WC-Reinigung und Desinfektion' },
                    { en: 'Dusting all surfaces', fr: 'Dépoussiérage de toutes les surfaces', de: 'Abstauben aller Oberflächen' },
                    { en: 'Bed making and changing linens', fr: 'Faire les lits et changer les draps', de: 'Betten beziehen' },
                    { en: 'Laundry washing and hanging', fr: 'Laver et étendre le linge', de: 'Wäsche waschen und aufhängen' },
                    { en: 'Ironing service upon request', fr: 'Service de repassage sur demande', de: 'Bügelservice auf Wunsch' },
                    { en: 'Tidying and household assistance', fr: 'Rangement et aide au ménage', de: 'Aufräum- und Haushaltshilfe' },
                    { en: 'Additional customized services as needed', fr: 'Services personnalisés supplémentaires selon les besoins', de: 'Individuelle Zusatzleistungen nach Bedarf' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-swiss-red flex-shrink-0 mt-0.5" />
                      <span className="text-swiss-body">{item[locale as 'en'|'fr'|'de'] || item.de}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-swiss-text">{locale === 'en' ? 'Your Benefits' : locale === 'fr' ? 'Vos Avantages' : 'Ihre Vorteile'}</h3>
                <ul className="space-y-2">
                  {[
                    { en: 'Reliable and experienced household helpers', fr: 'Aides ménagères fiables et expérimentées', de: 'Zuverlässige und erfahrene Haushaltshilfen' },
                    { en: 'Flexible appointment scheduling', fr: 'Prise de rendez-vous flexible', de: 'Flexible Terminvereinbarung' },
                    { en: 'Transparent pricing with no hidden costs', fr: 'Prix transparents sans frais cachés', de: 'Transparente Preise ohne versteckte Kosten' },
                    { en: 'Environmentally friendly cleaning products', fr: 'Produits de nettoyage écologiques', de: 'Umweltfreundliche Reinigungsmittel' },
                    { en: 'Personal and professional service', fr: 'Service personnel et professionnel', de: 'Persönlicher und professioneller Service' },
                    { en: 'Suitable for apartments, houses, and senior households', fr: 'Convient aux appartements, maisons et ménages de personnes âgées', de: 'Für Wohnungen, Häuser und Seniorenhaushalte' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Star className="w-5 h-5 text-swiss-red flex-shrink-0 mt-0.5 fill-current" />
                      <span className="text-swiss-body">{item[locale as 'en'|'fr'|'de'] || item.de}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-swiss-softRed p-6 md:p-8 rounded-2xl border border-swiss-border text-center space-y-4 mt-8">
              <h3 className="text-xl font-bold text-swiss-text">
                {locale === 'en' ? 'Request a Free Quote Today' : locale === 'fr' ? 'Demandez un devis gratuit aujourd\'hui' : 'Jetzt unverbindliche Offerte anfordern'}
              </h3>
              <p className="text-swiss-body max-w-xl mx-auto">
                {locale === 'en' ? 'Request a non-binding quote and book your personal household helper today.' : locale === 'fr' ? 'Demandez un devis sans engagement et réservez votre aide ménagère personnelle dès aujourd\'hui.' : 'Jetzt unverbindliche Offerte anfordern und Ihre persönliche Haushaltshilfe buchen.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href={`/${locale}/form?service=${formService}`}
                  className="btn-primary"
                  onClick={() => handleCtaClick('pricing_form_btn')}
                >
                  {locale === 'en' ? 'Request Quote' : locale === 'fr' ? 'Demander un devis' : 'Offerte anfordern'}
                </Link>
                <a
                  href="tel:+41782158030"
                  className="btn-secondary inline-flex items-center justify-center space-x-2"
                  onClick={() => handleCtaClick('pricing_phone_btn')}
                >
                  <Phone className="w-4 h-4 text-swiss-red" />
                  <span>+41 78 215 80 30</span>
                </a>
              </div>
              <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-medium text-swiss-body">
                <a href="mailto:info@swisscleanmove.ch" className="flex items-center space-x-2 hover:text-swiss-red transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@swisscleanmove.ch</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <UmzugPricing locale={locale} formService={formService} handleCtaClick={handleCtaClick} />
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
                onClick={() => handleCtaClick('mid_form_btn')}
              >
                {p('ctaMid')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section & Einsatzgebiete */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto space-y-12">
            
            {/* Einsatzgebiete */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                {locale === 'en' ? 'Operational Areas' : locale === 'fr' ? 'Zones d\'intervention' : 'Einsatzgebiete'}
              </h2>
              <div className="bg-swiss-section p-6 md:p-8 rounded-2xl border border-swiss-border">
                <p className="text-swiss-text font-medium mb-4">
                  {locale === 'en' ? 'Our teams are in daily operation in:' : locale === 'fr' ? 'Nos équipes interviennent quotidiennement à :' : 'Unsere Teams sind täglich im Einsatz in:'}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(areaCities || ['Biel/Bienne', 'Nidau', 'Lyss', 'Brügg', 'Ipsach', 'Aarberg', 'Pieterlen']).map(areaCity => (
                    <span
                      key={areaCity}
                      className={`px-4 py-2 rounded-full text-sm font-medium border ${
                        areaCity.toLowerCase().includes(city.toLowerCase())
                          ? 'bg-swiss-red text-white border-swiss-red'
                          : 'bg-white text-swiss-body border-swiss-border'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 inline mr-1" />
                      {areaCity}
                    </span>
                  ))}
                </div>
                <div className="flex items-start space-x-3 text-swiss-text font-medium bg-white p-4 rounded-xl border border-swiss-border shadow-subtle">
                  <span className="text-xl">👉</span>
                  <p>
                    {locale === 'en' ? `Fast availability in the ${city} region` : locale === 'fr' ? `Disponibilité rapide dans la région de ${city}` : `Schnelle Verfügbarkeit in der Region ${city}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Region Map */}
            {mapQuery && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                  {locale === 'en' ? `${city} on the Map` : locale === 'fr' ? `${city} sur la carte` : `${city} auf der Karte`}
                </h2>
                <div className="rounded-2xl overflow-hidden border border-swiss-border shadow-sm">
                  <iframe
                    title={`Map of ${city}`}
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(mapQuery)}&zoom=11`}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="section-padding bg-swiss-section">
          <div className="container-max">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-swiss-text">
                  {locale === 'en' ? 'Frequently Asked Questions' : locale === 'fr' ? 'Questions Fréquentes' : 'Häufig gestellte Fragen (FAQ)'}
                </h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white border border-swiss-border rounded-xl overflow-hidden shadow-subtle">
                    <button
                      className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-swiss-text hover:bg-swiss-gray-50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-swiss-body transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4 pt-2 text-swiss-body border-t border-swiss-border/50 bg-swiss-gray-50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Internal Links Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-swiss-text">
              {p('internalLinksHeading') || (locale === 'en' ? 'Related Links' : locale === 'fr' ? 'Liens Connexes' : 'Weiterführende Links')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {internalLinks.map((link, i) => (
                <Link
                  key={`t-${i}`}
                  href={`/${locale}/${link.href}`}
                  className="flex items-center space-x-3 p-4 bg-white border border-swiss-border rounded-xl hover:border-swiss-red/30 hover:shadow-sm transition-all group"
                >
                  <ArrowRight className="w-5 h-5 text-swiss-red group-hover:translate-x-1 transition-transform" />
                  <span className="font-medium text-swiss-text group-hover:text-swiss-red transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
              
              {/* Dynamic Contextual Links */}
              {!isPillar && (
                <Link
                  href={`/${locale}/${service === 'umzug' ? 'umzug-schweiz' : service === 'reinigungsfirma' ? 'reinigungsfirma-schweiz' : service === 'facilityService' ? 'facility-service-schweiz' : service === 'hauswartung' ? 'hauswartung-schweiz' : 'umzugsreinigung-schweiz'}`}
                  className="flex items-center space-x-3 p-4 bg-white border border-swiss-border rounded-xl hover:border-swiss-red/30 hover:shadow-sm transition-all group"
                >
                  <ArrowRight className="w-5 h-5 text-swiss-red group-hover:translate-x-1 transition-transform" />
                  <span className="font-medium text-swiss-text group-hover:text-swiss-red transition-colors">
                    {locale === 'en' ? 'Service throughout Switzerland' : locale === 'fr' ? 'Service dans toute la Suisse' : 'Service schweizweit'}
                  </span>
                </Link>
              )}
              <Link
                href={`/${locale}/faq`}
                className="flex items-center space-x-3 p-4 bg-white border border-swiss-border rounded-xl hover:border-swiss-red/30 hover:shadow-sm transition-all group"
              >
                <ArrowRight className="w-5 h-5 text-swiss-red group-hover:translate-x-1 transition-transform" />
                <span className="font-medium text-swiss-text group-hover:text-swiss-red transition-colors">
                  {locale === 'en' ? 'FAQ' : locale === 'fr' ? 'FAQ' : 'Häufige Fragen (FAQ)'}
                </span>
              </Link>
              <Link
                href={`/${locale}/regions`}
                className="flex items-center space-x-3 p-4 bg-white border border-swiss-border rounded-xl hover:border-swiss-red/30 hover:shadow-sm transition-all group"
              >
                <ArrowRight className="w-5 h-5 text-swiss-red group-hover:translate-x-1 transition-transform" />
                <span className="font-medium text-swiss-text group-hover:text-swiss-red transition-colors">
                  {locale === 'en' ? 'All Regions' : locale === 'fr' ? 'Toutes les Régions' : 'Alle Regionen'}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Strong CTA Section (Bottom) */}
      <section className="section-padding bg-swiss-section">
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
                  onClick={() => handleCtaClick('footer_form_btn')}
                >
                  {p('ctaStrong')}
                </Link>
                <a
                  href="tel:+41782158030"
                  className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
                  onClick={() => handleCtaClick('footer_phone_btn')}
                >
                  <Phone className="w-5 h-5 text-swiss-red" />
                  <span>+41 78 215 80 30</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
