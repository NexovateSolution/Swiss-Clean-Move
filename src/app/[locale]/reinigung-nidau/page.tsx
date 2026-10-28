import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'reinigungNidau'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/reinigung-nidau`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/reinigung-nidau',
        en: 'https://www.swisscleanmove.ch/en/reinigung-nidau',
        fr: 'https://www.swisscleanmove.ch/fr/reinigung-nidau',
        it: 'https://www.swisscleanmove.ch/it/reinigung-nidau',
        'x-default': 'https://www.swisscleanmove.ch/de/reinigung-nidau'
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

export default function ReinigungNidauPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="reinigungNidau"
      locale={locale}
      service="reinigung"
      city="Nidau"
      isPillar={false}
      formService="house-cleaning"
      noindex={false}
    />
  );
}
