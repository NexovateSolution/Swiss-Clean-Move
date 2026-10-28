import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'seoPages.baureinigungBiel.meta' });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/baureinigung-biel-bienne`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/baureinigung-biel-bienne',
        en: 'https://www.swisscleanmove.ch/en/baureinigung-biel-bienne',
        fr: 'https://www.swisscleanmove.ch/fr/baureinigung-biel-bienne',
        it: 'https://www.swisscleanmove.ch/it/baureinigung-biel-bienne',
        'x-default': 'https://www.swisscleanmove.ch/de/baureinigung-biel-bienne'
      }
    },
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true }
  };
}

export default function BaureinigungBielPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="baureinigungBiel"
      locale={locale}
      service="baureinigung"
      city="Biel/Bienne"
      isPillar={true}
      formService="house-cleaning"
      noindex={false}
      mapQuery="Biel/Bienne,Seeland,Switzerland"
      areaCities={['Biel/Bienne', 'Nidau', 'Brügg', 'Ipsach', 'Port', 'Lyss', 'Aarberg', 'Pieterlen', 'Studen', 'Orpund']}
    />
  );
}
