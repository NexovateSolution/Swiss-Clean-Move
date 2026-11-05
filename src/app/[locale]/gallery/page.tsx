import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import GalleryClient from './GalleryClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'gallery' });
  const title = `${t('title')} | SwissCleanMove`;
  const description = t('description');

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/gallery`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/gallery',
        en: 'https://www.swisscleanmove.ch/en/gallery',
        fr: 'https://www.swisscleanmove.ch/fr/gallery',
        it: 'https://www.swisscleanmove.ch/it/gallery',
        'x-default': 'https://www.swisscleanmove.ch/de/gallery',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.swisscleanmove.ch/${locale}/gallery`,
      type: 'website',
    },
  };
}

export default function GalleryPage() {
  return <GalleryClient />;
}
