'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Shield,
  CheckCircle,
  Search
} from 'lucide-react';

export default function FAQPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    { id: 'general', title: t('faq.categories.general'), faqs: t.raw('faq.questions.general') || [] },
    { id: 'umzug', title: t('faq.categories.moving'), faqs: t.raw('faq.questions.umzug') || [] },
    { id: 'reinigung', title: t('faq.categories.cleaning'), faqs: t.raw('faq.questions.reinigung') || [] },
    { id: 'umzugsreinigung', title: t('faq.categories.umzugsreinigung'), faqs: t.raw('faq.questions.umzugsreinigung') || [] },
    { id: 'hauswartung', title: t('faq.categories.hauswartung'), faqs: t.raw('faq.questions.hauswartung') || [] },
    { id: 'facility', title: t('faq.categories.facility'), faqs: t.raw('faq.questions.facility') || [] },
    { id: 'pricing', title: t('faq.categories.pricing'), faqs: t.raw('faq.questions.pricing') || [] },
    { id: 'guarantees', title: t('faq.categories.guarantees'), faqs: t.raw('faq.questions.guarantees') || [] }
  ];

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    faqs: cat.faqs.filter((faq: any) => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => (activeCategory ? cat.id === activeCategory : true) && cat.faqs.length > 0);

  // Generate FAQ Schema
  const allFaqs = faqCategories.flatMap(cat => cat.faqs);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero Section */}
      <SwissHero
        badge={t('faq.title')}
        title={t('faq.title')}
        subtitle={t('faq.subtitle')}
        right={
          <img
            src="/Gallary/5.jpeg"
            alt={t('faq.title')}
            className="w-full h-[340px] md:h-[420px] object-cover"
          />
        }
      />

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            {/* Search and Filters */}
            <div className="mb-10 space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-swiss-body" />
                </div>
                <input
                  type="text"
                  placeholder="Suchen Sie nach einer Frage..."
                  className="block w-full pl-11 pr-4 py-4 border border-swiss-border rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-swiss-red focus:border-swiss-red transition duration-150 ease-in-out sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === null ? 'bg-swiss-red text-white' : 'bg-swiss-gray-50 text-swiss-text hover:bg-swiss-gray-100 border border-swiss-border'}`}
                >
                  Alle
                </button>
                {faqCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-swiss-red text-white' : 'bg-swiss-gray-50 text-swiss-text hover:bg-swiss-gray-100 border border-swiss-border'}`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold text-swiss-text mb-6 pb-2 border-b border-swiss-border">
                  {category.title}
                </h2>
                <div className="space-y-4">
                  {category.faqs.map((faq: any, faqIndex: number) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    return (
                      <div key={faqIndex} className="bg-white rounded-xl shadow-subtle border border-swiss-border overflow-hidden">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className={`w-full px-6 py-4 text-left flex justify-between items-center hover:bg-swiss-gray-50 transition-colors ${openFAQ === globalIndex ? 'text-swiss-red' : 'text-swiss-text'}`}
                        >
                          <h3 className={`font-semibold pr-4 ${openFAQ === globalIndex ? 'text-swiss-red' : 'text-swiss-text'}`}>{faq.question}</h3>
                          {openFAQ === globalIndex ? (
                            <ChevronUp className="w-5 h-5 text-swiss-red flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-swiss-body flex-shrink-0" />
                          )}
                        </button>
                        {openFAQ === globalIndex && (
                          <div className="px-6 pb-4">
                            <p className="text-swiss-body leading-relaxed">{faq.answer}</p>
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

      {/* Quick Facts */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text mb-4">
              {t('faq.quickFacts')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('faq.keyInfo')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-swiss-border rounded-full flex items-center justify-center mx-auto mb-4 shadow-subtle">
                <Clock className="w-8 h-8 text-swiss-body" />
              </div>
              <h3 className="font-semibold text-swiss-text mb-2">{t('faq.responseTime')}</h3>
              <p className="text-swiss-body">{t('faq.responseTimeDesc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-swiss-border rounded-full flex items-center justify-center mx-auto mb-4 shadow-subtle">
                <Shield className="w-8 h-8 text-swiss-body" />
              </div>
              <h3 className="font-semibold text-swiss-text mb-2">{t('faq.insurance')}</h3>
              <p className="text-swiss-body">{t('faq.insuranceDesc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-swiss-border rounded-full flex items-center justify-center mx-auto mb-4 shadow-subtle">
                <CheckCircle className="w-8 h-8 text-swiss-body" />
              </div>
              <h3 className="font-semibold text-swiss-text mb-2">{t('faq.guarantee')}</h3>
              <p className="text-swiss-body">{t('faq.guaranteeDesc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-swiss-border rounded-full flex items-center justify-center mx-auto mb-4 shadow-subtle">
                <HelpCircle className="w-8 h-8 text-swiss-body" />
              </div>
              <h3 className="font-semibold text-swiss-text mb-2">{t('faq.support')}</h3>
              <p className="text-swiss-body">{t('faq.supportDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('faq.stillQuestions')}
            </h2>
            <p className="text-xl text-swiss-body max-w-2xl mx-auto">
              {t('faq.teamHelp')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a
                href="tel:+41782158030"
                className="bg-white hover:bg-swiss-gray-50 border border-swiss-border rounded-xl p-6 transition-all duration-200 shadow-subtle hover:shadow-soft"
              >
                <Phone className="w-8 h-8 text-swiss-red mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-swiss-text">{t('faq.callUs')}</h3>
                <p className="text-swiss-body">+41 78 215 80 30</p>
              </a>

              <a
                href="mailto:info@swisscleanmove.ch"
                className="bg-white hover:bg-swiss-gray-50 border border-swiss-border rounded-xl p-6 transition-all duration-200 shadow-subtle hover:shadow-soft"
              >
                <Mail className="w-8 h-8 text-swiss-red mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-swiss-text">{t('faq.emailUs')}</h3>
                <p className="text-swiss-body">info@swisscleanmove.ch</p>
              </a>

              <a
                href={`/${locale}/contact`}
                className="bg-white hover:bg-swiss-gray-50 border border-swiss-border rounded-xl p-6 transition-all duration-200 shadow-subtle hover:shadow-soft"
              >
                <MessageCircle className="w-8 h-8 text-swiss-red mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-swiss-text">{t('faq.contactForm')}</h3>
                <p className="text-swiss-body">{t('faq.sendMessage')}</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
