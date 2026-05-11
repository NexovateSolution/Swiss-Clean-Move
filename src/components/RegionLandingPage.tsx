'use client';

import Link from 'next/link';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import { useState } from 'react';
import {
  MapPin, Phone, ChevronDown, ArrowRight, CheckCircle,
  Truck, Home as HomeIcon, Building2, Sparkles, Package,
  Brush, Wind, UtensilsCrossed, Settings, Shield, Wrench,
  Trash2, PackageOpen, MessageCircle, Mail, Calendar
} from 'lucide-react';

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
  umzugTransport: { de: 'Umzug & Transport', en: 'Moving & Transport', fr: 'Déménagement & Transport' },
  privatumzug: { de: 'Privatumzug', en: 'Private Move', fr: 'Déménagement privé' },
  firmenumzug: { de: 'Firmenumzug', en: 'Office Move', fr: 'Déménagement d\'entreprise' },
  moebeltransport: { de: 'Möbeltransport', en: 'Furniture Transport', fr: 'Transport de meubles' },
  umzugsreinigung: { de: 'Umzugsreinigung mit Abnahmegarantie', en: 'Move-out Cleaning with Guarantee', fr: 'Nettoyage de fin de bail avec garantie' },
  endreinigung: { de: 'Endreinigung', en: 'Final Cleaning', fr: 'Nettoyage final' },
  unterhaltsreinigung: { de: 'Unterhaltsreinigung', en: 'Maintenance Cleaning', fr: 'Nettoyage d\'entretien' },
  bueroreinigung: { de: 'Büroreinigung', en: 'Office Cleaning', fr: 'Nettoyage de bureaux' },
  fensterreinigung: { de: 'Fensterreinigung', en: 'Window Cleaning', fr: 'Nettoyage de vitres' },
  gastroReinigung: { de: 'Gastronomie Reinigung', en: 'Restaurant Cleaning', fr: 'Nettoyage gastronomie' },
  facilityServices: { de: 'Facility Services', en: 'Facility Services', fr: 'Facility Services' },
  hauswartung: { de: 'Hauswartung', en: 'Property Maintenance', fr: 'Conciergerie' },
  gebaeudeunterhalt: { de: 'Gebäudeunterhalt', en: 'Building Maintenance', fr: 'Entretien d\'immeuble' },
  entsorgung: { de: 'Entsorgung', en: 'Disposal', fr: 'Débarras' },
  raeumung: { de: 'Räumung', en: 'Clearance', fr: 'Évacuation' },
};

function getCTAs(locale: string) {
  return [
    { label: locale === 'en' ? 'Request Free Quote' : locale === 'fr' ? 'Demander un devis gratuit' : 'Kostenlose Offerte anfordern', href: `/${locale}/free-offer`, icon: Mail, variant: 'primary' as const },
    { label: locale === 'en' ? 'Call Now' : locale === 'fr' ? 'Appeler maintenant' : 'Jetzt anrufen', href: 'tel:+41764883689', icon: Phone, variant: 'secondary' as const },
    { label: locale === 'en' ? 'WhatsApp Inquiry' : locale === 'fr' ? 'Demande WhatsApp' : 'WhatsApp Anfrage senden', href: 'https://wa.me/41764883689', icon: MessageCircle, variant: 'secondary' as const },
    { label: locale === 'en' ? 'Request Cleaning' : locale === 'fr' ? 'Demander un nettoyage' : 'Reinigung anfragen', href: `/${locale}/form?service=cleaning`, icon: Sparkles, variant: 'outline' as const },
    { label: locale === 'en' ? 'Plan Move' : locale === 'fr' ? 'Planifier déménagement' : 'Umzug planen', href: `/${locale}/form?service=relocation`, icon: Truck, variant: 'outline' as const },
    { label: locale === 'en' ? 'Request Facility Service' : locale === 'fr' ? 'Demander facility service' : 'Facility Service anfragen', href: `/${locale}/form?service=facility`, icon: Settings, variant: 'outline' as const },
  ];
}

function getInternalLinks(locale: string) {
  return [
    { label: locale === 'en' ? 'Moving Services' : locale === 'fr' ? 'Services de déménagement' : 'Umzug', href: `/${locale}/moving` },
    { label: locale === 'en' ? 'Move-out Cleaning' : locale === 'fr' ? 'Nettoyage de fin de bail' : 'Umzugsreinigung', href: `/${locale}/cleaning` },
    { label: locale === 'en' ? 'Maintenance Cleaning' : locale === 'fr' ? 'Nettoyage d\'entretien' : 'Unterhaltsreinigung', href: `/${locale}/cleaning` },
    { label: locale === 'en' ? 'Restaurant Cleaning' : locale === 'fr' ? 'Nettoyage gastronomie' : 'Gastronomie Reinigung', href: `/${locale}/services` },
    { label: locale === 'en' ? 'Facility Services' : locale === 'fr' ? 'Facility Services' : 'Facility Services', href: `/${locale}/services` },
    { label: locale === 'en' ? 'Property Maintenance' : locale === 'fr' ? 'Conciergerie' : 'Hauswartung', href: `/${locale}/property-maintenance` },
    { label: locale === 'en' ? 'Disposal' : locale === 'fr' ? 'Débarras' : 'Entsorgung', href: `/${locale}/services` },
    { label: locale === 'en' ? 'Contact' : locale === 'fr' ? 'Contact' : 'Kontakt', href: `/${locale}/contact` },
    { label: locale === 'en' ? 'Free Quote' : locale === 'fr' ? 'Devis gratuit' : 'Offerte', href: `/${locale}/free-offer` },
  ];
}

export default function RegionLandingPage({ data, locale }: { data: RegionPageData; locale: string }) {
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
        telephone: '+41 76 488 36 89',
        url: `https://swisscleanmove.ch/${locale}/${data.slug}`,
        areaServed: { '@type': 'Place', name: data.regionName },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '52', bestRating: '5', worstRating: '1' },
      },
      {
        '@type': 'Service',
        name: data.seoTitle,
        provider: { '@type': 'LocalBusiness', name: 'SwissCleanMove', telephone: '+41 76 488 36 89' },
        areaServed: { '@type': 'Place', name: data.regionName },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `https://swisscleanmove.ch/${locale}` },
          { '@type': 'ListItem', position: 2, name: locale === 'en' ? 'Regions' : locale === 'fr' ? 'Régions' : 'Regionen', item: `https://swisscleanmove.ch/${locale}/regions` },
          { '@type': 'ListItem', position: 3, name: data.regionName, item: `https://swisscleanmove.ch/${locale}/${data.slug}` },
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

      {/* Hero */}
      <SwissHero
        badge={data.regionName}
        title={<h1 className="text-[28px] leading-[1.2] md:text-[38px] md:leading-[1.15] font-bold text-swiss-text">{data.h1}</h1>}
        subtitle={data.metaDescription}
        cta={
          <div className="flex flex-col sm:flex-row gap-3 justify-start">
            <Link href={`/${locale}/free-offer`} className="btn-primary text-lg px-8 py-4">
              {locale === 'en' ? '📋 Request Free Quote' : locale === 'fr' ? '📋 Demander un devis' : '📋 Kostenlose Offerte anfordern'}
            </Link>
            <a href="tel:+41764883689" className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5 text-swiss-red" />
              <span>+41 76 488 36 89</span>
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

      {/* Intro */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto space-y-4">
            {data.introParagraphs.map((p, i) => (
              <p key={i} className="text-lg text-swiss-body leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Keywords Section */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* High SEO Keywords */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-swiss-text mb-4 text-center">
                {locale === 'en' ? `Our Services in ${data.regionName}` : locale === 'fr' ? `Nos services à ${data.regionName}` : `Unsere Leistungen in ${data.regionName}`}
              </h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {data.highSeoKeywords.map(kw => (
                  <span key={kw} className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-swiss-softRed text-swiss-red border border-swiss-red/20">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Local Keywords / Einsatzgebiete */}
            <div>
              <h3 className="text-xl font-bold text-swiss-text mb-4 text-center">
                {locale === 'en' ? 'Our Service Areas' : locale === 'fr' ? 'Nos zones d\'intervention' : 'Unsere Einsatzgebiete'}
              </h3>
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

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
              {locale === 'en' ? `SwissCleanMove Services in ${data.regionName}` : locale === 'fr' ? `Services SwissCleanMove à ${data.regionName}` : `SwissCleanMove Dienstleistungen in ${data.regionName}`}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {SERVICES.map(svc => {
              const Icon = svc.icon;
              return (
                <div key={svc.key} className="card p-4 text-center space-y-3 group hover:border-swiss-red/40 transition-all hover:shadow-medium">
                  <div className="w-11 h-11 bg-swiss-softRed rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-swiss-red" />
                  </div>
                  <p className="font-medium text-swiss-text text-sm leading-tight">{SERVICE_LABELS[svc.key][locale] || SERVICE_LABELS[svc.key].de}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="section-padding bg-swiss-softRed border-y border-swiss-border/50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
              {locale === 'en' ? 'Get Started Today' : locale === 'fr' ? 'Commencez aujourd\'hui' : 'Jetzt starten'}
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
              {locale === 'en' ? `${data.regionName} on the Map` : locale === 'fr' ? `${data.regionName} sur la carte` : `${data.regionName} auf der Karte`}
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

      {/* FAQ */}
      {data.faqs.length > 0 && (
        <section className="section-padding bg-swiss-section">
          <div className="container-max">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-swiss-text text-center">
                {locale === 'en' ? 'Frequently Asked Questions' : locale === 'fr' ? 'Questions fréquentes' : 'Häufig gestellte Fragen (FAQ)'}
              </h2>
              <div className="space-y-4">
                {data.faqs.map((faq, index) => (
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

      {/* Internal Links */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-swiss-text">
              {locale === 'en' ? 'More from SwissCleanMove' : locale === 'fr' ? 'Plus de SwissCleanMove' : 'Mehr von SwissCleanMove'}
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

      {/* Bottom CTA */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div className="card p-8 md:p-10 bg-swiss-softRed border border-swiss-border text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-swiss-text">
                {locale === 'en' ? `Your Partner in ${data.regionName}` : locale === 'fr' ? `Votre partenaire à ${data.regionName}` : `Ihr Partner in ${data.regionName}`}
              </h2>
              <p className="text-lg text-swiss-body">
                {locale === 'en' ? 'Contact us now for a free, no-obligation quote.' : locale === 'fr' ? 'Contactez-nous maintenant pour un devis gratuit et sans engagement.' : 'Kontaktieren Sie uns jetzt für eine kostenlose und unverbindliche Offerte.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/free-offer`} className="btn-primary text-lg px-8 py-4">
                  {locale === 'en' ? 'Request Free Quote' : locale === 'fr' ? 'Demander un devis' : 'Kostenlose Offerte anfordern'}
                </Link>
                <a href="tel:+41764883689" className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5 text-swiss-red" /><span>+41 76 488 36 89</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
