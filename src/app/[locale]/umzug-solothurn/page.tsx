import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugSolothurn'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzug-solothurn`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzug-solothurn',
        en: 'https://www.swisscleanmove.ch/en/umzug-solothurn',
        fr: 'https://www.swisscleanmove.ch/fr/umzug-solothurn',
        it: 'https://www.swisscleanmove.ch/it/umzug-solothurn',
        'x-default': 'https://www.swisscleanmove.ch/de/umzug-solothurn'
      }
    },
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function UmzugSolothurnPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugSolothurn"
      locale={locale}
      service="umzug"
      city="Solothurn"
      isPillar={false}
      formService="relocation"
      noindex={false}
      mapQuery="Solothurn,Switzerland"
      areaCities={['Solothurn', 'Olten', 'Grenchen', 'Zuchwil', 'Bettlach', 'Biel/Bienne']}
    />
  );
}
