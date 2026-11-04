'use client';

import { trackPhoneClick, trackWhatsAppClick } from '@/lib/gtag';
import Link from 'next/link';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import { useState } from 'react';
import {
  MapPin, Phone, ChevronDown, ArrowRight, CheckCircle,
  Truck, Home as HomeIcon, Building2, Sparkles, Package,
  Brush, Wind, UtensilsCrossed, Settings, Shield, Wrench,
  Trash2, PackageOpen, MessageCircle, Mail, Calendar,
  Star, ClipboardList, Search, BookOpen, Clock, Award
} from 'lucide-react';

export type RegionServiceCard = {
  key?: string;
  title: string;
  description: string;
  href?: string;
  badge?: string;
};

export type RegionLocalArea = {
  name: string;
  description: string;
};

export type RegionWhyChoosePoint = {
  title: string;
  description: string;
};

export type RegionProcessStep = {
  step: number;
  title: string;
  description: string;
};

export type RegionPageData = {
  slug: string;
  regionName: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  highSeoKeywords: string[];
  localKeywords: string[];
  introParagraphs: string[];
  faqs: { question: string; answer: string }[];
  mapQuery: string;

  // Rich Structured Content Sections
  introHeading?: string;
  servicesSection?: {
    heading: string;
    intro?: string;
    items: RegionServiceCard[];
  };
  localInfoSection?: {
    heading: string;
    intro?: string;
    areas: RegionLocalArea[];
  };
  whyChooseUsSection?: {
    heading: string;
    intro?: string;
    points: RegionWhyChoosePoint[];
  };
  processSection?: {
    heading: string;
    intro?: string;
    steps: RegionProcessStep[];
  };
  customFaqTitle?: string;
  finalCtaSection?: {
    title: string;
    subtitle?: string;
    buttonText: string;
  };
  showGoogleReviews?: boolean;

  // Legacy compatibility fields
  descriptionSections?: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  testimonials?: {
    quote: string;
    author: string;
    city: string;
  }[];
  costInfo?: {
    heading: string;
    body: string;
    factors?: string[];
  };
  regionFacts?: {
    heading: string;
    body: string;
  };
  whyChooseUs?: string[];
};

const SERVICES = [
  { key: 'umzugTransport', icon: Truck },
  { key: 'privatumzug', icon: HomeIcon },
  { key: 'firmenumzug', icon: Building2 },
  { key: 'moebeltransport', icon: Package },
  { key: 'umzugsreinigung', icon: Sparkles },
  { key: 'endreinigung', icon: Sparkles },
  { key: 'unterhaltsreinigung', icon: Brush },
  { key: 'bueroreinigung', icon: Building2 },
  { key: 'fensterreinigung', icon: Wind },
  { key: 'gastroReinigung', icon: UtensilsCrossed },
  { key: 'facilityServices', icon: Settings },
  { key: 'hauswartung', icon: Shield },
  { key: 'gebaeudeunterhalt', icon: Wrench },
  { key: 'entsorgung', icon: Trash2 },
  { key: 'raeumung', icon: PackageOpen },
];

const SERVICE_LABELS: Record<string, Record<string, string>> = {
  umzugTransport: { de: 'Umzug & Transport', en: 'Moving & Transport', fr: 'Déménagement & Transport', it: 'Traslochi e trasporti' },
  privatumzug: { de: 'Privatumzug', en: 'Private Move', fr: 'Déménagement privé', it: 'Trasloco privato' },
  firmenumzug: { de: 'Firmenumzug', en: 'Office Move', fr: "Déménagement d'entreprise", it: "Trasloco d'ufficio" },
  moebeltransport: { de: 'Möbeltransport', en: 'Furniture Transport', fr: 'Transport de meubles', it: 'Trasporto Mobili' },
  umzugsreinigung: { de: 'Umzugsreinigung mit Abnahmegarantie', en: 'Move-out Cleaning with Guarantee', fr: 'Nettoyage de fin de bail avec garantie', it: 'Pulizie di trasloco con garanzia' },
  endreinigung: { de: 'Endreinigung', en: 'Final Cleaning', fr: 'Nettoyage final', it: 'Pulizia finale' },
  unterhaltsreinigung: { de: 'Unterhaltsreinigung', en: 'Maintenance Cleaning', fr: "Nettoyage d'entretien", it: 'Pulizia di manutenzione' },
  bueroreinigung: { de: 'Büroreinigung', en: 'Office Cleaning', fr: 'Nettoyage de bureaux', it: "Pulizie d'ufficio" },
  fensterreinigung: { de: 'Fensterreinigung', en: 'Window Cleaning', fr: 'Nettoyage de vitres', it: 'Pulizia delle finestre' },
  gastroReinigung: { de: 'Gastronomie Reinigung', en: 'Restaurant Cleaning', fr: 'Nettoyage gastronomie', it: 'Pulizia del ristorante' },
  facilityServices: { de: 'Hauswartung & Gebäudeunterhalt', en: 'Facility Services', fr: 'Facility Services', it: 'Servizi della struttura' },
  hauswartung: { de: 'Hauswartung', en: 'Property Maintenance', fr: 'Conciergerie', it: 'Manutenzione della proprietà' },
  gebaeudeunterhalt: { de: 'Gebäudeunterhalt', en: 'Building Maintenance', fr: "Entretien d'immeuble", it: "Manutenzione dell'edificio" },
  entsorgung: { de: 'Entsorgung', en: 'Disposal', fr: 'Débarras', it: 'Disposizione' },
  raeumung: { de: 'Räumung', en: 'Clearance', fr: 'Évacuation', it: 'Liquidazione' },
};

function getServiceHref(key: string, locale: string, slug?: string): string {
  if (key === 'umzugTransport' || key === 'privatumzug' || key === 'firmenumzug' || key === 'moebeltransport') {
    if (slug === 'bern') return `/${locale}/umzug-bern`;
    if (slug === 'basel') return `/${locale}/umzug-basel`;
    if (slug === 'zuerich') return `/${locale}/umzug-zurich`;
    if (slug === 'solothurn') return `/${locale}/umzug-solothurn`;
    if (slug === 'fribourg') return `/${locale}/umzug-fribourg`;
    if (slug === 'neuchatel') return `/${locale}/umzug-neuchatel`;
    return `/${locale}/umzug-schweiz`;
  }
  if (key === 'umzugsreinigung' || key === 'endreinigung') {
    return slug === 'biel-bienne-seeland' ? `/${locale}/umzugsreinigung-biel-bienne` : `/${locale}/umzugsreinigung-schweiz`;
  }
  if (key === 'facilityServices' || key === 'hauswartung' || key === 'gebaeudeunterhalt') {
    return slug === 'biel-bienne-seeland' ? `/${locale}/facility-service-biel-bienne` : `/${locale}/facility-service-schweiz`;
  }
  if (key === 'entsorgung' || key === 'raeumung') {
    return `/${locale}/services/disposal`;
  }
  if (key === 'unterhaltsreinigung' || key === 'bueroreinigung') {
    return `/${locale}/unterhaltsreinigung-biel-bienne`;
  }
  if (key === 'fensterreinigung') {
    return `/${locale}/services/window-cleaning`;
  }
  if (key === 'gastroReinigung') {
    return `/${locale}/gastronomie-reinigung-biel-bienne`;
  }
  return `/${locale}/free-offer`;
}

function getCTAs(locale: string) {
  return [
    { label: locale === 'en' ? 'Request Free Quote' : locale === 'fr' ? 'Demander un devis gratuit' : 'Kostenlose Offerte anfordern', href: `/${locale}/free-offer`, icon: Mail, variant: 'primary' as const },
    { label: locale === 'en' ? 'Call Now' : locale === 'fr' ? 'Appeler maintenant' : 'Jetzt anrufen', href: 'tel:+41782158030', icon: Phone, variant: 'secondary' as const },
    { label: locale === 'en' ? 'WhatsApp Inquiry' : locale === 'fr' ? 'Demande WhatsApp' : 'WhatsApp Anfrage senden', href: 'https://wa.me/41782158030', icon: MessageCircle, variant: 'secondary' as const },
    { label: locale === 'en' ? 'Request Cleaning' : locale === 'fr' ? 'Demander un nettoyage' : 'Reinigung anfragen', href: `/${locale}/form?service=cleaning`, icon: Sparkles, variant: 'outline' as const },
    { label: locale === 'en' ? 'Plan Move' : locale === 'fr' ? 'Planifier déménagement' : 'Umzug planen', href: `/${locale}/form?service=relocation`, icon: Truck, variant: 'outline' as const },
    { label: locale === 'en' ? 'Request Property Care' : locale === 'fr' ? 'Demander conciergerie' : 'Hauswartung anfragen', href: `/${locale}/form?service=facility`, icon: Settings, variant: 'outline' as const },
  ];
}

function getInternalLinks(locale: string) {
  return [
    { label: locale === 'en' ? 'Moving Switzerland' : locale === 'fr' ? 'Déménagement Suisse' : 'Umzug Schweiz', href: `/${locale}/umzug-schweiz` },
    { label: locale === 'en' ? 'Cleaning Switzerland' : locale === 'fr' ? 'Nettoyage Suisse' : 'Reinigungsfirma Schweiz', href: `/${locale}/reinigungsfirma-schweiz` },
    { label: locale === 'en' ? 'Facility Services Switzerland' : locale === 'fr' ? 'Facility Services Suisse' : 'Hauswartung Schweiz', href: `/${locale}/facility-service-schweiz` },
    { label: locale === 'en' ? 'Property Maintenance Switzerland' : locale === 'fr' ? 'Conciergerie Suisse' : 'Hauswartung Schweiz', href: `/${locale}/hauswartung-schweiz` },
    { label: locale === 'en' ? 'Move-out Cleaning Switzerland' : locale === 'fr' ? 'Nettoyage de fin de bail Suisse' : 'Umzugsreinigung Schweiz', href: `/${locale}/umzugsreinigung-schweiz` },
    { label: locale === 'en' ? 'Frequently Asked Questions' : locale === 'fr' ? 'Foire aux questions' : 'Häufige Fragen (FAQ)', href: `/${locale}/faq` },
  ];
}

export default function RegionLandingPage({ data, locale }: { data: RegionPageData; locale: string }) {
  const t = (key: string, vars?: any) => {
    const texts: Record<string, Record<string, string>> = {
      'regionLanding.requestQuote': { de: 'Kostenlose Offerte anfordern', en: 'Request Free Quote', fr: 'Demander un devis gratuit', it: 'Richiedi preventivo gratuito' },
      'regionLanding.ourServicesIn': { de: `Unsere Dienstleistungen in ${vars?.region}`, en: `Our Services in ${vars?.region}`, fr: `Nos services à ${vars?.region}`, it: `I nostri servizi a ${vars?.region}` },
      'regionLanding.ourServiceAreas': { de: 'Unsere Einsatzgebiete', en: 'Our Service Areas', fr: 'Nos zones d\'intervention', it: 'Le nostre aree di servizio' },
      'regionLanding.scmServicesIn': { de: `Unsere Dienstleistungen in ${vars?.region}`, en: `Our Services in ${vars?.region}`, fr: `Nos services à ${vars?.region}`, it: `I nostri servizi a ${vars?.region}` },
      'regionLanding.getStartedToday': { de: 'Jetzt starten', en: 'Get Started Today', fr: 'Commencez aujourd\'hui', it: 'Inizia oggi' },
      'regionLanding.onTheMap': { de: `${vars?.region} auf der Karte`, en: `${vars?.region} on the Map`, fr: `${vars?.region} sur la carte`, it: `${vars?.region} sulla mappa` },
      'regionLanding.faq': { de: 'Häufige Fragen', en: 'Frequently Asked Questions', fr: 'Foire aux questions', it: 'Domande frequenti' },
      'regionLanding.moreFromScm': { de: 'Mehr von SwissCleanMove', en: 'More from SwissCleanMove', fr: 'Plus de SwissCleanMove', it: 'Altro da SwissCleanMove' },
      'regionLanding.yourPartnerIn': { de: `Ihr Partner in ${vars?.region}`, en: `Your Partner in ${vars?.region}`, fr: `Votre partenaire à ${vars?.region}`, it: `Il tuo partner a ${vars?.region}` },
      'regionLanding.contactUsNow': { de: 'Kontaktieren Sie uns jetzt für eine kostenlose und unverbindliche Offerte.', en: 'Contact us now for a free and non-binding quote.', fr: 'Contactez-nous maintenant pour un devis gratuit et sans engagement.', it: 'Contattaci ora per un preventivo gratuito e senza impegno.' },
      'regionLanding.requestQuoteBtn': { de: 'Kostenlose Offerte anfordern', en: 'Request Free Quote', fr: 'Demander un devis gratuit', it: 'Richiedi preventivo gratuito' }
    };
    return texts[key]?.[locale] || texts[key]?.de || key;
  };

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const ctas = getCTAs(locale);
  const internalLinks = getInternalLinks(locale);

  // JSON-LD Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        name: 'SwissCleanMove',
        address: { '@type': 'PostalAddress', streetAddress: 'Orpundstrasse 31', addressLocality: 'Biel/Bienne', postalCode: '2504', addressCountry: 'CH' },
        telephone: '+41 78 215 80 30',
        url: `https://www.swisscleanmove.ch/${locale}/${data.slug}`,
        areaServed: { '@type': 'Place', name: data.regionName },
      },
      {
        '@type': 'Service',
        name: data.seoTitle,
        provider: { '@type': 'LocalBusiness', name: 'SwissCleanMove', telephone: '+41 78 215 80 30' },
        areaServed: { '@type': 'Place', name: data.regionName },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `https://www.swisscleanmove.ch/${locale}` },
          { '@type': 'ListItem', position: 2, name: locale === 'en' ? 'Regions' : locale === 'fr' ? 'Régions' : 'Regionen', item: `https://www.swisscleanmove.ch/${locale}/regions` },
          { '@type': 'ListItem', position: 3, name: data.regionName, item: `https://www.swisscleanmove.ch/${locale}/${data.slug}` },
        ],
      },
      data.faqs.length > 0 ? {
        '@type': 'FAQPage',
        mainEntity: data.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      } : null,
    ].filter(Boolean),
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Hero with Single H1 and Complete CTAs (Quote, Phone, WhatsApp) */}
      <SwissHero
        badge={data.regionName}
        title={<h1 className="text-[28px] leading-[1.2] md:text-[38px] md:leading-[1.15] font-bold text-swiss-text">{data.h1}</h1>}
        subtitle={data.metaDescription}
        cta={
          <div className="flex flex-col sm:flex-row gap-3 justify-start">
            <Link href={`/${locale}/free-offer`} className="btn-primary text-base md:text-lg px-6 md:px-8 py-3.5 md:py-4 flex items-center justify-center">
              {t('regionLanding.requestQuote')}
            </Link>
            <a onClick={trackPhoneClick} href="tel:+41782158030" className="btn-secondary text-base md:text-lg px-5 md:px-7 py-3.5 md:py-4 inline-flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5 text-swiss-red" />
              <span>+41 78 215 80 30</span>
            </a>
            <a
              onClick={trackWhatsAppClick}
              href="https://wa.me/41782158030"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base md:text-lg px-5 md:px-7 py-3.5 md:py-4 inline-flex items-center justify-center space-x-2 border-[#25D366]/40 hover:bg-[#25D366]/10 text-swiss-text"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>
        }
        right={
          <div className="w-full h-[340px] md:h-[420px] relative rounded-2xl overflow-hidden shadow-subtle border border-swiss-border">
            <iframe
              title={`Map of ${data.regionName}`}
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(data.mapQuery)}&zoom=10`}
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        }
      />

      {/* Neutral Google Reviews Trust Bar */}
      <section className="section-padding bg-swiss-softRed border-y border-swiss-border/50">
        <div className="container-max">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow-subtle border border-swiss-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-swiss-text text-base">
                  {locale === 'en' ? 'Google Reviews' : locale === 'fr' ? 'Avis clients sur Google' : locale === 'it' ? 'Recensioni clienti su Google' : 'Google Kundenbewertungen'}
                </p>
                <p className="text-xs text-swiss-body mt-0.5">
                  {locale === 'en' ? 'Verified customer feedback for moving & cleaning' : locale === 'fr' ? 'Avis clients vérifiés pour déménagement & nettoyage' : locale === 'it' ? 'Feedback clienti verificato per traslochi e pulizie' : 'Verifizierte Kundenstimmen für Umzug & Reinigung'}
                </p>
              </div>
            </div>
            <a
              href="https://g.page/r/CaR3s0KCpz1O/review"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm px-5 py-2.5 inline-flex items-center space-x-2 rounded-full whitespace-nowrap"
            >
              <span>{locale === 'en' ? 'View Google Reviews' : locale === 'fr' ? 'Voir sur Google' : locale === 'it' ? 'Vedi su Google' : 'Auf Google ansehen'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Intro Section (H2: data.introHeading or fallback) */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto space-y-4">
            {data.introHeading && (
              <h2 className="text-2xl md:text-3xl font-bold text-swiss-text mb-4">
                {data.introHeading}
              </h2>
            )}
            {data.introParagraphs.map((p, i) => (
              <p key={i} className="text-lg text-swiss-body leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section (H2: data.servicesSection.heading or standard grid) */}
      {data.servicesSection ? (
        <section className="section-padding bg-swiss-section">
          <div className="container-max">
            <div className="max-w-4xl mx-auto text-center space-y-4 mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                {data.servicesSection.heading}
              </h2>
              {data.servicesSection.intro && (
                <p className="text-lg text-swiss-body max-w-2xl mx-auto">
                  {data.servicesSection.intro}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {data.servicesSection.items.map((svc, i) => (
                <div key={i} className="card p-6 bg-white rounded-2xl border border-swiss-border shadow-subtle hover:shadow-medium hover:border-swiss-red/30 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-swiss-softRed flex items-center justify-center text-swiss-red">
                        <Truck className="w-5 h-5" />
                      </div>
                      {svc.badge && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-swiss-softRed text-swiss-red">
                          {svc.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-swiss-text">{svc.title}</h3>
                    <p className="text-sm text-swiss-body leading-relaxed">{svc.description}</p>
                  </div>
                  {svc.href && (
                    <div className="pt-4 mt-2 border-t border-swiss-border/50">
                      <Link href={svc.href} className="text-sm font-semibold text-swiss-red inline-flex items-center space-x-1 group hover:underline">
                        <span>{locale === 'en' ? 'More information' : locale === 'fr' ? 'En savoir plus' : 'Mehr erfahren'}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="section-padding">
          <div className="container-max">
            <div className="text-center space-y-4 mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                {t('regionLanding.scmServicesIn', { region: data.regionName })}
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {SERVICES.map(svc => {
                const Icon = svc.icon;
                return (
                  <Link
                    key={svc.key}
                    href={getServiceHref(svc.key, locale, data.slug)}
                    className="card p-4 text-center space-y-3 group hover:border-swiss-red/40 transition-all hover:shadow-medium block"
                  >
                    <div className="w-11 h-11 bg-swiss-softRed rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-swiss-red" />
                    </div>
                    <p className="font-medium text-swiss-text text-sm leading-tight group-hover:text-swiss-red transition-colors">
                      {SERVICE_LABELS[svc.key][locale] || SERVICE_LABELS[svc.key].de}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Local Regional Information (H2: data.localInfoSection.heading) */}
      {data.localInfoSection ? (
        <section className="section-padding">
          <div className="container-max">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                  {data.localInfoSection.heading}
                </h2>
                {data.localInfoSection.intro && (
                  <p className="text-lg text-swiss-body max-w-2xl mx-auto leading-relaxed">
                    {data.localInfoSection.intro}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.localInfoSection.areas.map((area, i) => (
                  <div key={i} className="p-5 rounded-xl border border-swiss-border bg-white shadow-subtle hover:border-swiss-red/20 transition-all space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-swiss-red flex-shrink-0" />
                      <h3 className="font-bold text-swiss-text">{area.name}</h3>
                    </div>
                    <p className="text-sm text-swiss-body leading-relaxed">{area.description}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <p className="text-xs font-semibold text-swiss-body uppercase tracking-wider text-center mb-3">
                  {t('regionLanding.ourServiceAreas')}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {data.localKeywords.map(kw => (
                    <span key={kw} className="px-3.5 py-1.5 rounded-full text-xs font-medium border bg-white text-swiss-body border-swiss-border">
                      <MapPin className="w-3 h-3 inline mr-1 text-swiss-red" />{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="section-padding bg-swiss-section">
          <div className="container-max">
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-swiss-text mb-4 text-center">
                  {t('regionLanding.ourServiceAreas')}
                </h2>
                <div className="flex flex-wrap gap-2 justify-center">
                  {data.localKeywords.map(kw => (
                    <span key={kw} className="px-4 py-2 rounded-full text-sm font-medium border bg-white text-swiss-body border-swiss-border hover:border-swiss-red/30 hover:bg-swiss-softRed transition-colors">
                      <MapPin className="w-3.5 h-3.5 inline mr-1 text-swiss-red" />{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why SwissCleanMove (H2: data.whyChooseUsSection.heading) */}
      {data.whyChooseUsSection && (
        <section className="section-padding bg-swiss-section">
          <div className="container-max">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                  {data.whyChooseUsSection.heading}
                </h2>
                {data.whyChooseUsSection.intro && (
                  <p className="text-lg text-swiss-body max-w-2xl mx-auto">
                    {data.whyChooseUsSection.intro}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {data.whyChooseUsSection.points.map((pt, i) => (
                  <div key={i} className="p-6 bg-white rounded-2xl border border-swiss-border shadow-subtle flex items-start space-x-4">
                    <div className="w-9 h-9 rounded-xl bg-swiss-softRed flex items-center justify-center text-swiss-red flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-swiss-text text-base">{pt.title}</h3>
                      <p className="text-sm text-swiss-body leading-relaxed">{pt.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quotation Process Section (H2: data.processSection.heading) */}
      {data.processSection && (
        <section className="section-padding">
          <div className="container-max">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                  {data.processSection.heading}
                </h2>
                {data.processSection.intro && (
                  <p className="text-lg text-swiss-body max-w-2xl mx-auto">
                    {data.processSection.intro}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {data.processSection.steps.map((st) => (
                  <div key={st.step} className="p-5 bg-white rounded-2xl border border-swiss-border shadow-subtle space-y-3 text-center sm:text-left flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 rounded-full bg-swiss-red text-white font-bold flex items-center justify-center text-sm mb-3 mx-auto sm:mx-0">
                        {st.step}
                      </div>
                      <h3 className="font-bold text-swiss-text text-base leading-tight mb-2">{st.title}</h3>
                      <p className="text-xs text-swiss-body leading-relaxed">{st.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Action Buttons ("Jetzt starten") */}
      <section className="section-padding bg-swiss-softRed border-y border-swiss-border/50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
              {t('regionLanding.getStartedToday')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ctas.map((cta, i) => {
                const Icon = cta.icon;
                const isExternal = cta.href.startsWith('tel:') || cta.href.startsWith('https://wa.me');
                const cls = cta.variant === 'primary'
                  ? 'btn-primary text-base px-6 py-4'
                  : cta.variant === 'secondary'
                  ? 'btn-secondary text-base px-6 py-4'
                  : 'bg-white border-2 border-swiss-border text-swiss-text font-semibold rounded-xl px-6 py-4 hover:border-swiss-red/40 hover:shadow-sm transition-all';
                const inner = (
                  <span className="inline-flex items-center justify-center space-x-2">
                    <Icon className="w-5 h-5" />
                    <span>{cta.label}</span>
                  </span>
                );
                return isExternal ? (
                  <a key={i} href={cta.href} className={cls} target={cta.href.startsWith('https') ? '_blank' : undefined} rel={cta.href.startsWith('https') ? 'noopener noreferrer' : undefined}>{inner}</a>
                ) : (
                  <Link key={i} href={cta.href} className={cls}>{inner}</Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-swiss-text text-center">
              {t('regionLanding.onTheMap', { region: data.regionName })}
            </h2>
            <div className="rounded-2xl overflow-hidden border border-swiss-border shadow-sm">
              <iframe
                title={`Map of ${data.regionName}`}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(data.mapQuery)}&zoom=11`}
                width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion (H2: data.customFaqTitle || t('regionLanding.faq')) */}
      {data.faqs.length > 0 && (
        <section className="section-padding bg-swiss-section">
          <div className="container-max">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-swiss-text text-center">
                {data.customFaqTitle || t('regionLanding.faq')}
              </h2>
              <div className="space-y-4">
                {data.faqs.map((faq, index) => (
                  <div key={index} className="bg-white border border-swiss-border rounded-xl overflow-hidden shadow-subtle">
                    <button
                      className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-swiss-text hover:bg-swiss-gray-50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <span className="pr-4">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-swiss-body transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4 pt-2 text-swiss-body border-t border-swiss-border/50 bg-swiss-gray-50 leading-relaxed">
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

      {/* Internal Links */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-swiss-text">
              {t('regionLanding.moreFromScm')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {internalLinks.map((link, i) => (
                <Link key={i} href={link.href} className="flex items-center space-x-3 p-4 bg-white border border-swiss-border rounded-xl hover:border-swiss-red/30 hover:shadow-sm transition-all group">
                  <ArrowRight className="w-5 h-5 text-swiss-red group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  <span className="font-medium text-swiss-text group-hover:text-swiss-red transition-colors">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Final CTA */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div className="card p-8 md:p-10 bg-swiss-softRed border border-swiss-border text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                {data.finalCtaSection?.title || t('regionLanding.yourPartnerIn', { region: data.regionName })}
              </h2>
              <p className="text-lg text-swiss-body">
                {data.finalCtaSection?.subtitle || t('regionLanding.contactUsNow')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/free-offer`} className="btn-primary text-lg px-8 py-4">
                  {data.finalCtaSection?.buttonText || t('regionLanding.requestQuoteBtn')}
                </Link>
                <a onClick={trackPhoneClick} href="tel:+41782158030" className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center space-x-2">
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
