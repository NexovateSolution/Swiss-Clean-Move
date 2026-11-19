'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { trackPhoneClick, trackWhatsAppClick } from '@/lib/gtag';
import {
  ALL_PRICING_CATEGORIES,
  PRICING_PAGE_UI,
  SupportedLocale,
} from '@/lib/pricingDataFull';
import {
  Sparkles,
  Search,
  ArrowRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  Calendar,
  RotateCcw,
  Info,
} from 'lucide-react';

export default function PricingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const currentLocale: SupportedLocale =
    locale === 'fr' || locale === 'en' || locale === 'it' ? locale : 'de';

  const [selectedPillar, setSelectedPillar] = useState<
    'all' | 'cleaning' | 'moving' | 'commercial' | 'facility'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return ALL_PRICING_CATEGORIES.filter((category) => {
      // Pillar filter
      if (selectedPillar !== 'all' && category.pillar !== selectedPillar) {
        return false;
      }

      // Search filter
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const title = category.title[currentLocale]?.toLowerCase() || '';
      const subtitle = category.subtitle[currentLocale]?.toLowerCase() || '';
      const note = category.note[currentLocale]?.toLowerCase() || '';
      const hasItemMatch = category.items.some(
        (item) =>
          item.name[currentLocale]?.toLowerCase().includes(q) ||
          item.price.toLowerCase().includes(q)
      );

      return (
        title.includes(q) ||
        subtitle.includes(q) ||
        note.includes(q) ||
        category.number.includes(q) ||
        hasItemMatch
      );
    });
  }, [selectedPillar, searchQuery, currentLocale]);

  // Smooth scroll to category
  const scrollToCategory = (id: string) => {
    setActiveCategoryId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      {/* ── 1. HERO SECTION (Consistent with Website Theme) ── */}
      <section className="relative overflow-hidden bg-swiss-section border-b border-swiss-border py-12 md:py-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-swiss-softRed text-swiss-red border border-swiss-red/20">
              <Sparkles className="w-3.5 h-3.5 text-swiss-red" />
              {PRICING_PAGE_UI.heroBadge[currentLocale]}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Abnahmegarantie & Schweizer Qualität
            </span>
          </div>

          {/* Heading & Subtitle */}
          <div className="max-w-3xl space-y-4 mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-swiss-text tracking-tight leading-tight">
              {PRICING_PAGE_UI.heroTitle[currentLocale]}
            </h1>
            <p className="text-base sm:text-lg text-swiss-body leading-relaxed max-w-2xl">
              {PRICING_PAGE_UI.heroSubtitle[currentLocale]}
            </p>
          </div>

          {/* Hero Action Buttons: Free Quote + Phone */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              href={`/${locale}/free-offer`}
              className="btn-primary inline-flex items-center space-x-2 text-base font-semibold shadow-soft hover:shadow-soft"
            >
              <Calendar className="w-5 h-5" />
              <span>{PRICING_PAGE_UI.requestQuoteButton[currentLocale]}</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>

            <a
              href="tel:+41782158030"
              onClick={trackPhoneClick}
              className="btn-secondary inline-flex items-center space-x-2 text-base font-semibold"
            >
              <Phone className="w-5 h-5 text-swiss-red" />
              <span>+41 78 215 80 30</span>
            </a>
          </div>

          {/* ── 2. INTERACTIVE CATEGORY DOCK ── */}
          <div className="pt-2">
            <p className="text-xs font-bold text-swiss-body tracking-wider uppercase mb-3.5">
              Direkt zu Ihrem gewünschten Service springen:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {ALL_PRICING_CATEGORIES.map((cat) => {
                const isActive = activeCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    className={`group text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                      isActive
                        ? 'bg-white border-swiss-red shadow-soft ring-2 ring-swiss-red/20'
                        : 'bg-white hover:bg-white border-swiss-border hover:border-swiss-red shadow-subtle hover:shadow-soft transform hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-2.5">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs group-hover:bg-swiss-red group-hover:text-white transition-colors">
                        {cat.number}
                      </span>
                      <span className="text-xs font-bold text-swiss-text">
                        {cat.quickPrice}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-semibold text-swiss-text text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-swiss-red transition-colors">
                        {cat.title[currentLocale].split('(')[0].replace(/^\d+\s*/, '')}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. STICKY FILTER & SEARCH CONTROLS ── */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-swiss-border py-3 shadow-subtle">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Live Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-swiss-body" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={PRICING_PAGE_UI.searchPlaceholder[currentLocale]}
                className="w-full pl-10 pr-9 py-2 rounded-xl border border-swiss-border text-sm text-swiss-text bg-swiss-gray-50 focus:bg-white focus:outline-none focus:border-swiss-red focus:ring-2 focus:ring-swiss-red/20 transition-all placeholder:text-swiss-body"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-swiss-body hover:text-swiss-text p-0.5"
                  title="Clear"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Pillar Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {(
                [
                  'all',
                  'cleaning',
                  'moving',
                  'commercial',
                  'facility',
                ] as const
              ).map((pKey) => (
                <button
                  key={pKey}
                  onClick={() => setSelectedPillar(pKey)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedPillar === pKey
                      ? 'bg-swiss-red text-white shadow-subtle'
                      : 'bg-white text-swiss-body hover:text-swiss-text hover:bg-swiss-gray-50 border border-swiss-border'
                  }`}
                >
                  {PRICING_PAGE_UI.filterPillars[pKey][currentLocale]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. THE 11 NUMBERED SERVICE CARDS ── */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max space-y-8">
          {filteredCategories.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-swiss-border max-w-lg mx-auto shadow-subtle">
              <Search className="w-12 h-12 text-swiss-body mx-auto mb-3" />
              <h3 className="text-lg font-bold text-swiss-text mb-1">
                Keine Treffer für &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-xs text-swiss-body mb-4">
                Versuchen Sie einen anderen Begriff wie Umzug, Fenster, Büro oder Reinigung.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedPillar('all');
                }}
                className="btn-secondary inline-flex items-center space-x-1.5 text-xs py-2 px-4"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Filter zurücksetzen</span>
              </button>
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <article
                key={cat.id}
                id={cat.id}
                className="scroll-mt-24 card overflow-hidden border border-swiss-border"
              >
                {/* Category Card Header */}
                <div className="p-6 sm:p-7 border-b border-swiss-border bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-3.5">
                      {/* Number Badge (Neutral dark numbers) */}
                      <span className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-100 text-slate-800 font-bold text-lg tracking-wider flex-shrink-0 border border-slate-200">
                        {cat.number}
                      </span>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-swiss-text tracking-tight">
                          {cat.title[currentLocale]}
                        </h2>
                        <p className="text-xs sm:text-sm text-swiss-body mt-1 max-w-2xl leading-relaxed">
                          {cat.subtitle[currentLocale]}
                        </p>
                      </div>
                    </div>

                    {/* Card Action Link */}
                    <div className="flex-shrink-0 self-end sm:self-center">
                      <Link
                        href={`/${locale}/form?service=${cat.serviceQuery}`}
                        className="btn-primary text-xs sm:text-sm py-2 px-4 inline-flex items-center space-x-1.5"
                      >
                        <span>{PRICING_PAGE_UI.cardAction[currentLocale]}</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Structured Pricing Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-swiss-section border-b border-swiss-border text-[11px] font-bold text-swiss-text tracking-wider uppercase">
                        <th className="py-3 px-6 sm:px-7">
                          {cat.headerCol1[currentLocale]}
                        </th>
                        <th className="py-3 px-6 sm:px-7 text-right">
                          {cat.headerCol2[currentLocale]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-swiss-border text-sm">
                      {cat.items.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="hover:bg-swiss-gray-50 transition-colors"
                        >
                          <td className="py-3.5 px-6 sm:px-7 font-medium text-swiss-text">
                            {row.name[currentLocale]}
                          </td>
                          {/* Price in clean bold dark font (not red) */}
                          <td className="py-3.5 px-6 sm:px-7 text-right whitespace-nowrap font-bold text-swiss-text">
                            <span className="text-base sm:text-lg">
                              {row.price}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Under-Table Scope Note Box */}
                <div className="px-6 sm:px-7 py-3.5 bg-swiss-section border-t border-swiss-border text-xs text-swiss-body">
                  <p className="flex items-start gap-2 leading-relaxed">
                    <Info className="w-4 h-4 text-swiss-body mt-0.5 flex-shrink-0" />
                    <span>{cat.note[currentLocale]}</span>
                  </p>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* ── 5. BOTTOM CTA BANNER (Consistent with Website Theme) ── */}
      <section className="relative overflow-hidden bg-gray-900 py-16 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="SwissCleanMove Quality"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>

        <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-left max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white border border-white/20 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                100% Kostenlos & unverbindlich
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                {PRICING_PAGE_UI.bottomCta.title[currentLocale]}
              </h2>
              <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
                {PRICING_PAGE_UI.bottomCta.desc[currentLocale]}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-start lg:justify-end gap-4 w-full lg:w-auto">
              <Link
                href={`/${locale}/free-offer`}
                className="btn-primary py-3.5 px-6 font-bold flex items-center space-x-2 text-base shadow-soft hover:shadow-soft"
              >
                <span>{PRICING_PAGE_UI.bottomCta.requestOffer[currentLocale]}</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>

              <a
                onClick={trackPhoneClick}
                href="tel:+41782158030"
                className="flex items-center space-x-2 px-5 py-3 border-2 border-white/20 rounded-xl text-white font-bold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5 text-swiss-red" />
                <div className="text-left leading-tight">
                  <div className="text-xs font-medium text-gray-300">Mo–Sa 07:00–20:00</div>
                  <div className="text-sm">+41 78 215 80 30</div>
                </div>
              </a>

              <a
                onClick={trackWhatsAppClick}
                href="https://wa.me/41782158030"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-5 py-3 bg-[#25D366]/10 border-2 border-[#25D366] rounded-xl text-white font-bold hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <div className="text-left leading-tight">
                  <div className="text-xs font-medium text-[#25D366]">Schnell & direkt</div>
                  <div className="text-sm">WhatsApp</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
