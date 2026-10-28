import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugBasel'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzug-basel`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzug-basel',
        en: 'https://www.swisscleanmove.ch/en/umzug-basel',
        fr: 'https://www.swisscleanmove.ch/fr/umzug-basel',
        it: 'https://www.swisscleanmove.ch/it/umzug-basel',
        'x-default': 'https://www.swisscleanmove.ch/de/umzug-basel'
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

export default function UmzugBaselPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugBasel"
      locale={locale}
      service="umzug"
      city="Basel"
      isPillar={false}
      formService="relocation"
      noindex={false}
      mapQuery="Basel,Switzerland"
      areaCities={['Basel', 'Allschwil', 'Reinach', 'Muttenz', 'Binningen', 'Liestal']}
    />
  );
}
