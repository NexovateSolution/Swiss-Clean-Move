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
const afterFiles = [26, 17, 18, 16, 23, 22, 24, 27, 28, 26, 20, 28, 29, 30];

const pairs = beforeFiles.map((bNum, i) => ({
    id: i + 1,
    before: `/Gallary/before/${bNum}.jpeg`,
    after: `/Gallary/after/${afterFiles[i]}.jpeg`,
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

    const openLightbox = (pairIndex: number, view: 'before' | 'after') =>
        setLightbox({ pairIndex, view });
    const closeLightbox = () => setLightbox(null);

    const currentPair = lightbox !== null ? pairs[lightbox.pairIndex] : null;

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
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="flex flex-col gap-10 lg:gap-14">
                        {pairs.map((pair, index) => (
                            <motion.div
                                key={pair.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-white rounded-2xl border border-swiss-border shadow-subtle overflow-hidden"
                            >
                                {/* Card header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-swiss-border bg-swiss-gray-50">
                                    <span className="text-sm font-bold text-swiss-text">
                                        #{pair.id}
                                    </span>
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
                                            alt={`${t('beforeLabel')} - ${t('imageAlt')} ${pair.id}`}
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
                                            alt={`${t('afterLabel')} - ${t('imageAlt')} ${pair.id}`}
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
