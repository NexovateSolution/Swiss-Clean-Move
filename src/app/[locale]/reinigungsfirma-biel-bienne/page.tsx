import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'seoPages.reinigungsfirmaBiel.meta' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/reinigungsfirma-biel-bienne`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/reinigungsfirma-biel-bienne',
        en: 'https://www.swisscleanmove.ch/en/reinigungsfirma-biel-bienne',
        fr: 'https://www.swisscleanmove.ch/fr/reinigungsfirma-biel-bienne',
        it: 'https://www.swisscleanmove.ch/it/reinigungsfirma-biel-bienne',
        'x-default': 'https://www.swisscleanmove.ch/de/reinigungsfirma-biel-bienne'
      }
    }
  };
}

export default function ReinigungsfirmaBielPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="reinigungsfirmaBiel"
      locale={locale}
      service="reinigungsfirma"
      city="Biel/Bienne"
      isPillar={true}
      formService="house-cleaning"
      noindex={false}
      mapQuery="Biel/Bienne,Seeland,Switzerland"
      areaCities={['Biel/Bienne', 'Nidau', 'Brügg', 'Ipsach', 'Port', 'Lyss', 'Aarberg', 'Pieterlen', 'Studen', 'Orpund']}
    />
  );
}
