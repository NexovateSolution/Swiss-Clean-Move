import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'seoPages.hauswartungBiel.meta' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/hauswartung-biel-bienne`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/hauswartung-biel-bienne',
        en: 'https://www.swisscleanmove.ch/en/hauswartung-biel-bienne',
        fr: 'https://www.swisscleanmove.ch/fr/hauswartung-biel-bienne',
        it: 'https://www.swisscleanmove.ch/it/hauswartung-biel-bienne',
        'x-default': 'https://www.swisscleanmove.ch/de/hauswartung-biel-bienne'
      }
    }
  };
}

export default function HauswartungBielPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="hauswartungBiel"
      locale={locale}
      service="hauswartung"
      city="Biel/Bienne"
      isPillar={true}
      formService="facility-services"
      noindex={false}
      mapQuery="Biel/Bienne,Seeland,Switzerland"
      areaCities={['Biel/Bienne', 'Nidau', 'Brügg', 'Ipsach', 'Port', 'Lyss', 'Aarberg', 'Pieterlen', 'Studen', 'Orpund']}
    />
  );
}
