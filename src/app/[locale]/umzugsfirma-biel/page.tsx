import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'seoPages.umzugsfirmaBiel.meta' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzugsfirma-biel`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzugsfirma-biel',
        en: 'https://www.swisscleanmove.ch/en/umzugsfirma-biel',
        fr: 'https://www.swisscleanmove.ch/fr/umzugsfirma-biel',
        it: 'https://www.swisscleanmove.ch/it/umzugsfirma-biel',
        'x-default': 'https://www.swisscleanmove.ch/de/umzugsfirma-biel'
      }
    }
  };
}

export default function UmzugsfirmaBielPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugsfirmaBiel"
      locale={locale}
      service="umzugsfirma"
      city="Biel/Bienne"
      isPillar={true}
      formService="relocation"
      noindex={false}
      mapQuery="Biel/Bienne,Seeland,Switzerland"
      areaCities={['Biel/Bienne', 'Nidau', 'Brügg', 'Ipsach', 'Port', 'Lyss', 'Aarberg', 'Pieterlen', 'Studen', 'Orpund']}
    />
  );
}
