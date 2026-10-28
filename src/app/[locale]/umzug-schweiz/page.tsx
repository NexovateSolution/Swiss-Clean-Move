import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugSchweiz'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzug-schweiz`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzug-schweiz',
        en: 'https://www.swisscleanmove.ch/en/umzug-schweiz',
        fr: 'https://www.swisscleanmove.ch/fr/umzug-schweiz',
        it: 'https://www.swisscleanmove.ch/it/umzug-schweiz',
        'x-default': 'https://www.swisscleanmove.ch/de/umzug-schweiz'
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

export default function UmzugSchweizPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugSchweiz"
      locale={locale}
      service="umzug"
      city="Schweiz"
      isPillar={true}
      formService="relocation"
      noindex={false}
      mapQuery="Switzerland"
      areaCities={['Biel/Bienne', 'Bern', 'Zürich', 'Basel', 'Genf', 'Lausanne', 'Luzern', 'St. Gallen']}
    />
  );
}
