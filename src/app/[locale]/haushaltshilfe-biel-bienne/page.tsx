import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'haushaltshilfeBiel'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/haushaltshilfe-biel-bienne`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/haushaltshilfe-biel-bienne',
        en: 'https://www.swisscleanmove.ch/en/haushaltshilfe-biel-bienne',
        fr: 'https://www.swisscleanmove.ch/fr/haushaltshilfe-biel-bienne',
        it: 'https://www.swisscleanmove.ch/it/haushaltshilfe-biel-bienne',
        'x-default': 'https://www.swisscleanmove.ch/de/haushaltshilfe-biel-bienne'
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

export default function HaushaltshilfeBielPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="haushaltshilfeBiel"
      locale={locale}
      service="haushaltshilfe"
      city="Biel/Bienne"
      isPillar={true}
      formService="household-helping"
      noindex={false}
      mapQuery="Biel/Bienne,Seeland,Switzerland"
      areaCities={['Biel/Bienne', 'Nidau', 'Brügg', 'Ipsach', 'Port', 'Lyss', 'Aarberg', 'Pieterlen', 'Studen', 'Orpund']}
    />
  );
}
