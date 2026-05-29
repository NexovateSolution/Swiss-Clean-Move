'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';

// ── Image pairs ──────────────────────────────────────────────────────
// before/  has: 2.jpeg – 14.jpeg  (13 images)
// after/   has: 15.jpeg – 30.jpeg (16 images)
// We pair them in order: before/2 ↔ after/15, before/3 ↔ after/16, etc.
// The last 3 "after" images (28-30) have no matching "before", so they're excluded.
const beforeFiles = [2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14];
const afterFiles = [26, 17, 18, 16, 23, 22, 24, 27, 28, 26, 20];

// Adding metadata for SEO and filtering
const projectMetadata = [
  { city: 'Bern', service: 'umzugsreinigung', rating: 5 },
  { city: 'Zürich', service: 'unterhaltsreinigung', rating: 5 },
  { city: 'Biel/Bienne', service: 'umzugsreinigung', rating: 5 },
  { city: 'Basel', service: 'baureinigung', rating: 5 },
  { city: 'Solothurn', service: 'umzugsreinigung', rating: 5 },
  { city: 'Lyss', service: 'unterhaltsreinigung', rating: 5 },
  { city: 'Neuchâtel', service: 'umzugsreinigung', rating: 5 },
  { city: 'Bern', service: 'baureinigung', rating: 5 },
  { city: 'Zürich', service: 'umzugsreinigung', rating: 5 },
  { city: 'Biel/Bienne', service: 'unterhaltsreinigung', rating: 5 },
  { city: 'Basel', service: 'umzugsreinigung', rating: 5 },
];

const pairs = beforeFiles.map((bNum, i) => ({
    id: i + 1,
    before: `/Gallary/before/${bNum}.jpeg`,
    after: `/Gallary/after/${afterFiles[i]}.jpeg`,
    city: projectMetadata[i].city,
    service: projectMetadata[i].service,
    rating: projectMetadata[i].rating,
}));

// ── Lightbox state ───────────────────────────────────────────────────
type LightboxState = {
    pairIndex: number;
    view: 'before' | 'after';
} | null;

// ── Main page component ──────────────────────────────────────────────
export default function GalleryPage() {
    const t = useTranslations('gallery');
    const { locale } = useParams();
    const [lightbox, setLightbox] = useState<LightboxState>(null);
    const [selectedService, setSelectedService] = useState<string>('all');
    const [selectedCity, setSelectedCity] = useState<string>('all');

    const openLightbox = (pairIndex: number, view: 'before' | 'after') =>
        setLightbox({ pairIndex, view });
    const closeLightbox = () => setLightbox(null);

    const filteredPairs = pairs.filter(p => 
      (selectedService === 'all' || p.service === selectedService) &&
      (selectedCity === 'all' || p.city === selectedCity)
    );

    const currentPair = lightbox !== null ? pairs[lightbox.pairIndex] : null;

    const uniqueCities = Array.from(new Set(pairs.map(p => p.city)));
    const uniqueServices = Array.from(new Set(pairs.map(p => p.service)));

    const getServiceLabel = (serviceId: string) => {
      const loc = typeof locale === 'string' ? locale : 'de';
      const labels: Record<string, Record<string, string>> = {
        'umzugsreinigung': { 'en': 'Move-out Cleaning', 'fr': 'Nettoyage de fin de bail', 'de': 'Umzugsreinigung' },
        'unterhaltsreinigung': { 'en': 'Maintenance Cleaning', 'fr': 'Nettoyage d\'entretien', 'de': 'Unterhaltsreinigung' },
        'baureinigung': { 'en': 'Construction Cleaning', 'fr': 'Nettoyage de chantier', 'de': 'Baureinigung' }
      };
      return labels[serviceId]?.[loc] || (serviceId.charAt(0).toUpperCase() + serviceId.slice(1));
    };

    return (
        <Layout>
            <main className="min-h-screen bg-swiss-section">
                {/* ── Hero section ──────────────────────────────────────────── */}
                <section className="relative overflow-hidden bg-swiss-section border-b border-swiss-border pt-32 pb-16 lg:pt-40 lg:pb-24">
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-swiss-softRed text-swiss-red text-sm font-semibold mb-6 border border-swiss-border">
                                <Sparkles className="w-4 h-4" />
                                {t('badge')}
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-swiss-text mb-5 tracking-tight">
                                {t('title')}
                            </h1>
                            <p className="text-lg md:text-xl text-swiss-body max-w-2xl mx-auto leading-relaxed">
                                {t('description')}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ── Gallery grid (side-by-side) ─────────────────────────── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    
                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 justify-center mb-12">
                      <select 
                        className="px-4 py-2 bg-white border border-swiss-border rounded-lg shadow-subtle focus:outline-none focus:border-swiss-red"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                      >
                        <option value="all">{locale === 'en' ? 'All Services' : locale === 'fr' ? 'Tous les services' : 'Alle Dienstleistungen'}</option>
                        {uniqueServices.map(s => (
                          <option key={s} value={s}>{getServiceLabel(s)}</option>
                        ))}
                      </select>

                      <select 
                        className="px-4 py-2 bg-white border border-swiss-border rounded-lg shadow-subtle focus:outline-none focus:border-swiss-red"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                      >
                        <option value="all">{locale === 'en' ? 'All Cities' : locale === 'fr' ? 'Toutes les villes' : 'Alle Städte'}</option>
                        {uniqueCities.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-10 lg:gap-14">
                        {filteredPairs.map((pair, index) => (
                            <motion.div
                                key={pair.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-white rounded-2xl border border-swiss-border shadow-subtle overflow-hidden"
                            >
                                {/* Card header */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b border-swiss-border bg-swiss-gray-50 gap-4">
                                    <div className="flex flex-col">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-bold text-swiss-text">Projekt #{pair.id}</span>
                                        <div className="flex">
                                          {[...Array(pair.rating)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="text-xs text-swiss-body font-medium flex items-center gap-2">
                                        <span className="bg-white px-2 py-1 rounded border border-swiss-border">{pair.city}</span>
                                        <span className="bg-white px-2 py-1 rounded border border-swiss-border">{getServiceLabel(pair.service)}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider">
                                        <span className="text-swiss-body">{t('beforeLabel')}</span>
                                        <span className="text-swiss-red">{t('afterLabel')}</span>
                                    </div>
                                </div>

                                {/* Side-by-side images */}
                                <div className="grid grid-cols-2">
                                    {/* Before */}
                                    <div
                                        className="relative aspect-[4/3] cursor-pointer group overflow-hidden"
                                        onClick={() => openLightbox(index, 'before')}
                                    >
                                        <Image
                                            src={pair.before}
                                            alt={`${t('beforeLabel')} - ${pair.service} in ${pair.city}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 40vw, 560px"
                                        />
                                        {/* Before label overlay */}
                                        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-gray-900/70 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                            {t('beforeLabel')}
                                        </div>
                                    </div>

                                    {/* After */}
                                    <div
                                        className="relative aspect-[4/3] cursor-pointer group overflow-hidden border-l border-swiss-border"
                                        onClick={() => openLightbox(index, 'after')}
                                    >
                                        <Image
                                            src={pair.after}
                                            alt={`${t('afterLabel')} - ${pair.service} in ${pair.city} - Cleaned`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 40vw, 560px"
                                        />
                                        {/* After label overlay */}
                                        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-swiss-red/80 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                            {t('afterLabel')}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── CTA section (matches website theme) ─────────────────── */}
                <section className="section-padding bg-swiss-section text-swiss-text border-y border-swiss-border">
                    <div className="container-max">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <div className="inline-flex items-center space-x-2 bg-swiss-softRed border border-swiss-border text-swiss-text rounded-full px-4 py-2 text-sm font-medium">
                                <Sparkles className="w-4 h-4 text-swiss-red" />
                                <span>{t('cta.badge')}</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                                {t('cta.title')}
                            </h2>

                            <p className="text-xl text-swiss-body max-w-2xl mx-auto leading-relaxed">
                                {t('cta.subtitle')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link
                                    href={`/${locale}/free-offer`}
                                    className="inline-flex items-center justify-center btn-primary px-8 py-4"
                                >
                                    <span className="flex items-center justify-center space-x-2">
                                        <Calendar className="w-5 h-5" />
                                        <span>{t('cta.button')}</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </span>
                                </Link>
                            </div>

                            <div className="flex flex-wrap justify-center items-center gap-8 pt-4 text-swiss-body">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-swiss-red" />
                                    <span className="text-sm">{t('cta.trust.freeQuote')}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-swiss-red" />
                                    <span className="text-sm">{t('cta.trust.noObligation')}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-swiss-red" />
                                    <span className="text-sm">{t('cta.trust.fastResponse')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Lightbox (full-size image view) ─────────────────────── */}
                <AnimatePresence>
                    {lightbox !== null && currentPair && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                            onClick={closeLightbox}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="relative w-full max-w-5xl max-h-[85vh] flex flex-col items-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Image */}
                                <div className="relative w-full aspect-[4/3] max-h-[75vh] rounded-2xl overflow-hidden bg-black">
                                    <Image
                                        src={
                                            lightbox.view === 'before'
                                                ? currentPair.before
                                                : currentPair.after
                                        }
                                        alt={`${t('imageAlt')} ${currentPair.id} - ${lightbox.view === 'before' ? t('beforeLabel') : t('afterLabel')}`}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 1280px) 92vw, 1280px"
                                        priority
                                    />
                                </div>

                                {/* Before / After toggle */}
                                <div className="mt-4 flex items-center gap-3">
                                    <button
                                        onClick={() => setLightbox({ ...lightbox, view: 'before' })}
                                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                                            ${lightbox.view === 'before'
                                                ? 'bg-white text-gray-900 shadow-lg'
                                                : 'bg-white/15 text-white/70 hover:bg-white/25 hover:text-white'
                                            }`}
                                    >
                                        {t('beforeLabel')}
                                    </button>
                                    <button
                                        onClick={() => setLightbox({ ...lightbox, view: 'after' })}
                                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                                            ${lightbox.view === 'after'
                                                ? 'bg-swiss-red text-white shadow-lg shadow-swiss-red/40'
                                                : 'bg-white/15 text-white/70 hover:bg-white/25 hover:text-white'
                                            }`}
                                    >
                                        {t('afterLabel')}
                                    </button>
                                </div>

                                {/* Close */}
                                <button
                                    onClick={closeLightbox}
                                    className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2"
                                    aria-label="Close"
                                >
                                    <X className="w-7 h-7" />
                                </button>

                                {/* Counter */}
                                <div className="mt-3 text-white/60 text-sm font-medium">
                                    #{currentPair.id} · {lightbox.view === 'before' ? t('beforeLabel') : t('afterLabel')}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </Layout>
    );
}
