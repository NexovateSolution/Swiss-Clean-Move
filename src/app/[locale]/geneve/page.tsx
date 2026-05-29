import { getTranslations } from 'next-intl/server';
import RegionLandingPage, { RegionPageData } from '@/components/RegionLandingPage';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'regions.geneve.meta' });
  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function GenevePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'regions.geneve' });
  
  const regionData: RegionPageData = {
    slug: 'geneve',
    regionName: 'Genève',
    seoTitle: t('meta.title'),
    metaDescription: t('meta.description'),
    h1: t('h1'),
    highSeoKeywords: [
      'Entreprise de nettoyage Genève',
      'Déménagement Genève',
      'Nettoyage fin de bail Genève',
      'Facility Services Genève',
      'Conciergerie Genève'
    ],
    localKeywords: [
      'Genève centre',
      'Carouge',
      'Lancy',
      'Meyrin',
      'Vernier',
      'Eaux-Vives',
      'Plainpalais',
      'Grand-Saconnex'
    ],
    introParagraphs: t.raw('introParagraphs') || [],
    faqs: t.raw('faqs') || [],
    mapQuery: 'Geneva, Switzerland',
    descriptionSections: [
      {
        heading: t('sections.services.heading'),
        paragraphs: t.raw('sections.services.paragraphs') || [],
        bullets: t.raw('sections.services.bullets') || []
      },
      {
        heading: t('sections.quality.heading'),
        paragraphs: t.raw('sections.quality.paragraphs') || [],
      }
    ],
    whyChooseUs: t.raw('whyChooseUs') || [
      'Qualité suisse garantie',
      'Disponibilité rapide',
      'Personnel qualifié',
      'Garantie de remise de bail'
    ]
  };

  return <RegionLandingPage data={regionData} locale={locale} />;
}
