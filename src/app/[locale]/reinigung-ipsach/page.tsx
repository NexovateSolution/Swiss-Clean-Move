import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'reinigungIpsach'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/reinigung-ipsach`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/reinigung-ipsach',
        en: 'https://www.swisscleanmove.ch/en/reinigung-ipsach',
        fr: 'https://www.swisscleanmove.ch/fr/reinigung-ipsach',
        it: 'https://www.swisscleanmove.ch/it/reinigung-ipsach',
        'x-default': 'https://www.swisscleanmove.ch/de/reinigung-ipsach'
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

export default function ReinigungIpsachPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="reinigungIpsach"
      locale={locale}
      service="reinigung"
      city="Ipsach"
      isPillar={false}
      formService="house-cleaning"
      noindex={false}
    />
  );
}
