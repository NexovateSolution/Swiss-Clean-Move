import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugPieterlen'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzug-pieterlen`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzug-pieterlen',
        en: 'https://www.swisscleanmove.ch/en/umzug-pieterlen',
        fr: 'https://www.swisscleanmove.ch/fr/umzug-pieterlen',
        it: 'https://www.swisscleanmove.ch/it/umzug-pieterlen',
        'x-default': 'https://www.swisscleanmove.ch/de/umzug-pieterlen'
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

export default function UmzugPieterlenPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugPieterlen"
      locale={locale}
      service="umzug"
      city="Pieterlen"
      isPillar={false}
      formService="relocation"
      noindex={false}
    />
  );
}
