import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugBern'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzug-bern`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzug-bern',
        en: 'https://www.swisscleanmove.ch/en/umzug-bern',
        fr: 'https://www.swisscleanmove.ch/fr/umzug-bern',
        it: 'https://www.swisscleanmove.ch/it/umzug-bern',
        'x-default': 'https://www.swisscleanmove.ch/de/umzug-bern'
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

export default function UmzugBernPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugBern"
      locale={locale}
      service="umzug"
      city="Bern"
      isPillar={false}
      formService="relocation"
      noindex={false}
      mapQuery="Bern,Switzerland"
      areaCities={['Bern', 'Thun', 'Burgdorf', 'Langenthal', 'Biel/Bienne', 'Köniz', 'Ostermundigen']}
    />
  );
}
