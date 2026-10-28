import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugZurich'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzug-zurich`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzug-zurich',
        en: 'https://www.swisscleanmove.ch/en/umzug-zurich',
        fr: 'https://www.swisscleanmove.ch/fr/umzug-zurich',
        it: 'https://www.swisscleanmove.ch/it/umzug-zurich',
        'x-default': 'https://www.swisscleanmove.ch/de/umzug-zurich'
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

export default function UmzugZurichPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugZurich"
      locale={locale}
      service="umzug"
      city="Zürich"
      isPillar={false}
      formService="relocation"
      noindex={false}
      mapQuery="Zurich,Switzerland"
      areaCities={['Zürich', 'Winterthur', 'Baden', 'Aarau', 'Dietikon', 'Uster', 'Wädenswil']}
    />
  );
}
