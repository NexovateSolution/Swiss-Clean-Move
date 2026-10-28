import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'reinigungAarberg'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/reinigung-aarberg`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/reinigung-aarberg',
        en: 'https://www.swisscleanmove.ch/en/reinigung-aarberg',
        fr: 'https://www.swisscleanmove.ch/fr/reinigung-aarberg',
        it: 'https://www.swisscleanmove.ch/it/reinigung-aarberg',
        'x-default': 'https://www.swisscleanmove.ch/de/reinigung-aarberg'
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

export default function ReinigungAarbergPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="reinigungAarberg"
      locale={locale}
      service="reinigung"
      city="Aarberg"
      isPillar={false}
      formService="house-cleaning"
      noindex={false}
    />
  );
}
