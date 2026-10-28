import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'hauswartungSchweiz'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/hauswartung-schweiz`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/hauswartung-schweiz',
        en: 'https://www.swisscleanmove.ch/en/hauswartung-schweiz',
        fr: 'https://www.swisscleanmove.ch/fr/hauswartung-schweiz',
        it: 'https://www.swisscleanmove.ch/it/hauswartung-schweiz',
        'x-default': 'https://www.swisscleanmove.ch/de/hauswartung-schweiz'
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

export default function HauswartungSchweizPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="hauswartungSchweiz"
      locale={locale}
      service="hauswartung"
      city="Schweiz"
      isPillar={true}
      formService="facility-services"
      noindex={false}
      mapQuery="Switzerland"
      areaCities={['Biel/Bienne', 'Bern', 'Zürich', 'Basel', 'Genf', 'Lausanne', 'Luzern', 'St. Gallen', 'Solothurn']}
    />
  );
}
