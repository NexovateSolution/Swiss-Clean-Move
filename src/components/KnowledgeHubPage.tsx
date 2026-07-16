'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import UmzugPricing from '@/components/UmzugPricing';
import HaushaltshilfePricing from '@/components/HaushaltshilfePricing';
import data from '@/lib/knowledgeHubData';
import {
  Truck, Heart, BarChart3, Building2, ArrowLeftRight, ClipboardList,
  HelpCircle, MapPin, CheckCircle, Clock, Shield, Users, Star,
  ChevronDown, ChevronUp, Mail, Phone, ExternalLink, ArrowRight
} from 'lucide-react';

const icons: Record<string, any> = {
  Truck, Heart, BarChart3, Building2, ArrowLeftRight, ClipboardList,
  HelpCircle, MapPin, CheckCircle, Clock, Shield, Users, Star
};

interface KnowledgeHubPageProps {
  locale: string;
}

export default function KnowledgeHubPage({ locale }: KnowledgeHubPageProps) {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  // Helper to extract translation
  const L = (obj: { en: string; de: string; fr: string; it?: string }) => {
    if (!obj) return '';
    return obj[locale as keyof typeof obj] || obj.de;
  };

  const handleCtaClick = (ctaName: string) => {
    // Analytics placeholder
    console.log(`Clicked: ${ctaName}`);
  };

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  // Generate schemas
  const schemas = [
    // 1. FAQ Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.qaCategories.flatMap(cat => cat.questions.map(q => ({
        "@type": "Question",
        "name": L(q.q),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${L(q.snippet)} ${L(q.answer)}`
        }
      })))
    },
    // 2. HowTo Schema (Moving Preparation)
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": L(data.preparation.title),
      "description": L(data.preparation.subtitle),
      "step": data.preparation.steps.map((step, i) => ({
        "@type": "HowToStep",
        "name": L(step.phase),
        "text": step.tasks.map(t => L(t)).join(". ")
      }))
    },
    // 3. BreadcrumbList Schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "SwissCleanMove",
          "item": `https://www.swisscleanmove.ch/${locale}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": L(data.hero.badge),
          "item": `https://www.swisscleanmove.ch/${locale}/preise-und-ratgeber`
        }
      ]
    },
    // 4. LocalBusiness Schema
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "SwissCleanMove",
      "url": `https://www.swisscleanmove.ch/${locale}`,
      "telephone": "+41782158030",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Orpundstrasse 31",
        "addressLocality": "Biel/Bienne",
        "postalCode": "2504",
        "addressCountry": "CH"
      }
    },
    // 5. WebPage Schema
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": L(data.hero.h1),
      "description": L(data.hero.subtitle)
    }
  ];

  return (
    <Layout>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Hero Section */}
      <SwissHero
        badge={L(data.hero.badge)}
        title={L(data.hero.h1)}
        subtitle={L(data.hero.subtitle)}
        right={
          <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-soft">
            <img src="/Gallary/1.jpeg" alt="SwissCleanMove" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        }
      />

      {/* Intro & Table of Contents */}
      <section className="section-padding bg-swiss-gray-50 border-b border-swiss-border">
        <div className="container-max">
          <div className="max-w-4xl mx-auto mb-12 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-swiss-border flex flex-col md:flex-row items-center md:items-start md:space-x-8 text-center md:text-left">
            <div className="bg-swiss-softRed p-4 rounded-full flex-shrink-0 mb-6 md:mb-0">
              <Star className="w-8 h-8 text-swiss-red" />
            </div>
            <div>
              <p className="text-lg md:text-xl text-swiss-text leading-relaxed">
                {L(data.introText)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {data.tocSections.map((toc, i) => {
              const Icon = icons[toc.icon] || CheckCircle;
              return (
                <a key={i} href={`#${toc.id}`} className="bg-white border border-swiss-border p-4 rounded-xl shadow-sm hover:shadow-md hover:border-swiss-red transition-all flex flex-col items-center text-center group">
                  <Icon className="w-6 h-6 text-swiss-red mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-swiss-text">{L(toc.label)}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Moving & Cleaning Prices (Using existing UmzugPricing component) */}
      <div id="umzug-preise">
        <UmzugPricing locale={locale} formService="umzug" handleCtaClick={handleCtaClick} />
      </div>

      {/* Household Help Prices */}
      <div id="haushaltshilfe-preise">
        <HaushaltshilfePricing locale={locale} formService="haushaltshilfe" handleCtaClick={handleCtaClick} />
      </div>

      {/* Average Prices Section */}
      <section id="durchschnittspreise" className="section-padding bg-swiss-section">
        <div className="container-max max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-swiss-text mb-4">{L(data.avgPricesTitle)}</h2>
            <p className="text-lg text-swiss-body max-w-3xl mx-auto">{L(data.avgPricesIntro)}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {data.avgPricesFactors.map((factor, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-subtle border border-swiss-border flex items-start space-x-4">
                <div className="bg-swiss-softRed p-3 rounded-full flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-swiss-red" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-swiss-text mb-2">{L(factor.label)}</h3>
                  <p className="text-swiss-body">{L(factor.desc)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white border-l-4 border-swiss-red p-6 rounded-r-xl shadow-sm">
            <p className="text-swiss-text font-medium">{L(data.avgPricesNote)}</p>
          </div>
        </div>
      </section>

      {/* Facility Service */}
      <section id="facility-service" className="section-padding bg-white">
        <div className="container-max max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-swiss-text mb-4">{L(data.facilityTitle)}</h2>
            <p className="text-lg text-swiss-body max-w-3xl mx-auto">{L(data.facilitySubtitle)}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.facilityCards.map((card, i) => (
              <div key={i} className="border border-swiss-border rounded-2xl overflow-hidden hover:shadow-soft transition-shadow">
                <div className="bg-swiss-gray-50 p-6 border-b border-swiss-border">
                  <h3 className="text-xl font-bold text-swiss-text">{L(card.title)}</h3>
                </div>
                <div className="p-6 bg-white space-y-4">
                  <p className="text-swiss-body h-16">{L(card.desc)}</p>
                  <div className="pt-4 border-t border-swiss-border flex items-center justify-between">
                    <span className="font-semibold text-swiss-red">{L(card.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Comparisons */}
      <section id="vergleiche" className="section-padding bg-swiss-gray-50">
        <div className="container-max max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-swiss-text mb-4">{L(data.comparisons.title)}</h2>
            <p className="text-lg text-swiss-body">{L(data.comparisons.subtitle)}</p>
          </div>

          <div className="space-y-12">
            {data.comparisons.items.map((comp, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-subtle border border-swiss-border overflow-hidden">
                <div className="bg-swiss-text text-white p-4 text-center">
                  <h3 className="text-xl font-bold">{L(comp.sectionTitle)}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-swiss-border">
                  {/* Left Side */}
                  <div className="p-8">
                    <h4 className="text-2xl font-bold text-swiss-text mb-6 pb-4 border-b border-swiss-border">{L(comp.left.title)}</h4>
                    <ul className="space-y-4 mb-8">
                      {comp.left.points.map((p, j) => (
                        <li key={j} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-swiss-body flex-shrink-0" />
                          <span className="text-swiss-text">{L(p)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-swiss-gray-50 p-4 rounded-xl border border-swiss-border mb-4">
                      <p className="text-sm font-semibold text-swiss-text mb-1">{locale === 'en' ? 'Best for:' : locale === 'fr' ? 'Idéal pour:' : locale === 'it' ? 'Ideale per:' : 'Ideal für:'}</p>
                      <p className="text-swiss-body text-sm">{L(comp.left.bestFor)}</p>
                    </div>
                    <div className="text-xl font-bold text-swiss-text">{L(comp.left.price)}</div>
                  </div>

                  {/* Right Side */}
                  <div className="p-8 bg-swiss-softRed/30">
                    <h4 className="text-2xl font-bold text-swiss-red mb-6 pb-4 border-b border-swiss-border">{L(comp.right.title)}</h4>
                    <ul className="space-y-4 mb-8">
                      {comp.right.points.map((p, j) => (
                        <li key={j} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-swiss-red flex-shrink-0" />
                          <span className="text-swiss-text font-medium">{L(p)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-white p-4 rounded-xl border border-swiss-border mb-4 shadow-sm">
                      <p className="text-sm font-semibold text-swiss-text mb-1">{locale === 'en' ? 'Best for:' : locale === 'fr' ? 'Idéal pour:' : locale === 'it' ? 'Ideale per:' : 'Ideal für:'}</p>
                      <p className="text-swiss-body text-sm">{L(comp.right.bestFor)}</p>
                    </div>
                    <div className="text-xl font-bold text-swiss-red">{L(comp.right.price)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Moving Preparation Timeline */}
      <section id="umzugsvorbereitung" className="section-padding bg-white">
        <div className="container-max max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-swiss-text mb-4">{L(data.preparation.title)}</h2>
            <p className="text-lg text-swiss-body">{L(data.preparation.subtitle)}</p>
          </div>

          <div className="relative ml-4 md:ml-8 space-y-10 py-4">
            <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-swiss-red"></div>
            {data.preparation.steps.map((step, i) => (
              <div key={i} className="relative pl-8 md:pl-12">
                <div className="absolute w-6 h-6 bg-swiss-red rounded-full -left-[11px] top-1 border-4 border-white shadow-sm z-10"></div>
                <h3 className="text-xl font-bold text-swiss-text mb-4">{L(step.phase)}</h3>
                <div className="bg-swiss-gray-50 border border-swiss-border rounded-xl p-6 shadow-subtle">
                  <ul className="space-y-3">
                    {step.tasks.map((task, j) => (
                      <li key={j} className="flex items-start space-x-3">
                        <ArrowRight className="w-5 h-5 text-swiss-red flex-shrink-0 mt-0.5" />
                        <span className="text-swiss-body">{L(task)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-Tail Q&A Hub */}
      <section id="fragen" className="section-padding bg-swiss-section border-t border-b border-swiss-border">
        <div className="container-max max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text mb-4">Häufige Fragen & Ratgeber</h2>
            <p className="text-xl text-swiss-body">Ausführliche Antworten auf Ihre wichtigsten Fragen.</p>
          </div>

          <div className="space-y-10">
            {data.qaCategories.map((cat, i) => (
              <div key={i}>
                <h3 className="text-2xl font-bold text-swiss-red mb-6 border-b border-swiss-border pb-2">{L(cat.category)}</h3>
                <div className="space-y-6">
                  {cat.questions.map((q, j) => {
                    const id = `q-${i}-${j}`;
                    const isOpen = openFAQ === id;
                    return (
                      <div key={j} className="bg-white border border-swiss-border rounded-2xl overflow-hidden shadow-subtle transition-all duration-300">
                        <button 
                          onClick={() => toggleFAQ(id)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-swiss-gray-50 focus:outline-none"
                        >
                          <h4 className="text-lg font-bold text-swiss-text pr-4">{L(q.q)}</h4>
                          {isOpen ? <ChevronUp className="w-6 h-6 text-swiss-red flex-shrink-0" /> : <ChevronDown className="w-6 h-6 text-swiss-body flex-shrink-0" />}
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-6 pt-2 border-t border-swiss-border">
                            <p className="font-bold text-swiss-text text-lg mb-4 leading-relaxed">{L(q.snippet)}</p>
                            <p className="text-swiss-body leading-relaxed mb-6">{L(q.answer)}</p>
                            
                            {q.links && q.links.length > 0 && (
                              <div className="flex flex-wrap gap-3">
                                {q.links.map((link, k) => (
                                  <Link key={k} href={`/${locale}${link.href.startsWith('/') ? link.href : `/${link.href}`}`} className="inline-flex items-center text-sm font-medium text-swiss-red bg-swiss-softRed px-4 py-2 rounded-full hover:bg-swiss-red hover:text-white transition-colors">
                                    {link.label}
                                    <ExternalLink className="w-4 h-4 ml-2" />
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EEAT Trust Signals */}
      <section className="section-padding bg-white">
        <div className="container-max max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-swiss-text mb-4">{L(data.eeat.title)}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.eeat.items.map((item, i) => {
              const Icon = icons[item.icon] || Shield;
              return (
                <div key={i} className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-swiss-softRed rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-swiss-red" />
                  </div>
                  <h3 className="text-xl font-bold text-swiss-text">{L(item.title)}</h3>
                  <p className="text-swiss-body">{L(item.desc)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Internal Links Map */}
      <section id="regionen" className="section-padding bg-swiss-gray-50 border-t border-swiss-border">
        <div className="container-max max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.serviceLinks.map((col, i) => (
              <div key={i}>
                <h3 className="font-bold text-swiss-text text-lg mb-4">{L(col.category)}</h3>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link href={`/${locale}${link.href}`} className="text-swiss-body hover:text-swiss-red transition-colors flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-swiss-red opacity-0 -ml-6 transition-all group-hover:opacity-100 group-hover:ml-0" />
                        {L(link.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-white">
        <div className="container-max max-w-4xl mx-auto">
          <div className="bg-swiss-red rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{L(data.cta.title)}</h2>
            <p className="text-lg md:text-xl text-red-50 max-w-2xl mx-auto mb-8">
              {L(data.cta.desc)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/form`}
                className="bg-white text-swiss-red font-bold py-4 px-8 rounded-xl hover:bg-swiss-gray-50 transition-colors shadow-soft"
              >
                {L(data.cta.btn)}
              </Link>
              <a
                href="tel:+41782158030"
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>+41 78 215 80 30</span>
              </a>
            </div>
            <p className="mt-8 text-sm text-red-200">
              SwissCleanMove – Orpundstrasse 31, 2504 Biel/Bienne
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
