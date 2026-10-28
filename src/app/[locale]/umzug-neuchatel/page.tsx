import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugNeuchatel'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzug-neuchatel`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzug-neuchatel',
        en: 'https://www.swisscleanmove.ch/en/umzug-neuchatel',
        fr: 'https://www.swisscleanmove.ch/fr/umzug-neuchatel',
        it: 'https://www.swisscleanmove.ch/it/umzug-neuchatel',
        'x-default': 'https://www.swisscleanmove.ch/de/umzug-neuchatel'
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

export default function UmzugNeuchatelPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugNeuchatel"
      locale={locale}
      service="umzug"
      city="Neuchâtel"
      isPillar={false}
      formService="relocation"
      noindex={false}
      mapQuery="Neuchatel,Switzerland"
      areaCities={['Neuchâtel', 'La Chaux-de-Fonds', 'Le Locle', 'Boudry', 'Val-de-Travers']}
    />
  );
}
