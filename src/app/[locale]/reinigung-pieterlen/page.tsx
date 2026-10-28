import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'reinigungPieterlen'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/reinigung-pieterlen`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/reinigung-pieterlen',
        en: 'https://www.swisscleanmove.ch/en/reinigung-pieterlen',
        fr: 'https://www.swisscleanmove.ch/fr/reinigung-pieterlen',
        it: 'https://www.swisscleanmove.ch/it/reinigung-pieterlen',
        'x-default': 'https://www.swisscleanmove.ch/de/reinigung-pieterlen'
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

export default function ReinigungPieterlenPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="reinigungPieterlen"
      locale={locale}
      service="reinigung"
      city="Pieterlen"
      isPillar={false}
      formService="house-cleaning"
      noindex={false}
    />
  );
}
