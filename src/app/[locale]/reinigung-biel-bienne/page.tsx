import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'reinigungBiel'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/reinigung-biel-bienne`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/reinigung-biel-bienne',
        en: 'https://www.swisscleanmove.ch/en/reinigung-biel-bienne',
        fr: 'https://www.swisscleanmove.ch/fr/reinigung-biel-bienne',
        it: 'https://www.swisscleanmove.ch/it/reinigung-biel-bienne',
        'x-default': 'https://www.swisscleanmove.ch/de/reinigung-biel-bienne'
      }
    },
    title: t('title'),
    description: t('description'),
    // Phased rollout: noindex true for secondary cities temporarily
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function ReinigungBielPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="reinigungBiel"
      locale={locale}
      service="reinigung"
      city="Biel/Bienne"
      isPillar={true}
      formService="house-cleaning"
      noindex={false}
    />
  );
}
