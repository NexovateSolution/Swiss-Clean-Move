import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugLyss'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzug-lyss`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzug-lyss',
        en: 'https://www.swisscleanmove.ch/en/umzug-lyss',
        fr: 'https://www.swisscleanmove.ch/fr/umzug-lyss',
        it: 'https://www.swisscleanmove.ch/it/umzug-lyss',
        'x-default': 'https://www.swisscleanmove.ch/de/umzug-lyss'
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

export default function UmzugLyssPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugLyss"
      locale={locale}
      service="umzug"
      city="Lyss"
      isPillar={false}
      formService="relocation"
      noindex={false}
    />
  );
}
