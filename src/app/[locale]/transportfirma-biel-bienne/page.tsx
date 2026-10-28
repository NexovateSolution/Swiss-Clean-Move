import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'seoPages.transportfirmaBiel.meta' });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/transportfirma-biel-bienne`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/transportfirma-biel-bienne',
        en: 'https://www.swisscleanmove.ch/en/transportfirma-biel-bienne',
        fr: 'https://www.swisscleanmove.ch/fr/transportfirma-biel-bienne',
        it: 'https://www.swisscleanmove.ch/it/transportfirma-biel-bienne',
        'x-default': 'https://www.swisscleanmove.ch/de/transportfirma-biel-bienne'
      }
    },
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true }
  };
}

export default function TransportfirmaBielPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="transportfirmaBiel"
      locale={locale}
      service="transport"
      city="Biel/Bienne"
      isPillar={true}
      formService="relocation"
      noindex={false}
      mapQuery="Biel/Bienne,Seeland,Switzerland"
      areaCities={['Biel/Bienne', 'Nidau', 'Brügg', 'Ipsach', 'Port', 'Lyss', 'Aarberg', 'Pieterlen', 'Studen', 'Orpund']}
    />
  );
}
