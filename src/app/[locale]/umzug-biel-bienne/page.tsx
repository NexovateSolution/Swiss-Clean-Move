import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugBiel'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzug-biel-bienne`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzug-biel-bienne',
        en: 'https://www.swisscleanmove.ch/en/umzug-biel-bienne',
        fr: 'https://www.swisscleanmove.ch/fr/umzug-biel-bienne',
        it: 'https://www.swisscleanmove.ch/it/umzug-biel-bienne',
        'x-default': 'https://www.swisscleanmove.ch/de/umzug-biel-bienne'
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

export default function UmzugBielPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugBiel"
      locale={locale}
      service="umzug"
      city="Biel/Bienne"
      isPillar={true}
      formService="relocation"
      noindex={false}
    />
  );
}
