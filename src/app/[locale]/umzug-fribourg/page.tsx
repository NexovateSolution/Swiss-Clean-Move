import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugFribourg'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzug-fribourg`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzug-fribourg',
        en: 'https://www.swisscleanmove.ch/en/umzug-fribourg',
        fr: 'https://www.swisscleanmove.ch/fr/umzug-fribourg',
        it: 'https://www.swisscleanmove.ch/it/umzug-fribourg',
        'x-default': 'https://www.swisscleanmove.ch/de/umzug-fribourg'
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

export default function UmzugFribourgPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugFribourg"
      locale={locale}
      service="umzug"
      city="Fribourg"
      isPillar={false}
      formService="relocation"
      noindex={false}
      mapQuery="Fribourg,Switzerland"
      areaCities={['Fribourg', 'Bulle', 'Murten', 'Düdingen', 'Villars-sur-Glâne']}
    />
  );
}
