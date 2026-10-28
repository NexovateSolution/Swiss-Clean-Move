import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'seoPages.facilityServiceBiel.meta' });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/facility-service-biel-bienne`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/facility-service-biel-bienne',
        en: 'https://www.swisscleanmove.ch/en/facility-service-biel-bienne',
        fr: 'https://www.swisscleanmove.ch/fr/facility-service-biel-bienne',
        it: 'https://www.swisscleanmove.ch/it/facility-service-biel-bienne',
        'x-default': 'https://www.swisscleanmove.ch/de/facility-service-biel-bienne'
      }
    },
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true }
  };
}

export default function FacilityServiceBielPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="facilityServiceBiel"
      locale={locale}
      service="facilityService"
      city="Biel/Bienne"
      isPillar={true}
      formService="facility-services"
      noindex={false}
      mapQuery="Biel/Bienne,Seeland,Switzerland"
      areaCities={['Biel/Bienne', 'Nidau', 'Brügg', 'Ipsach', 'Port', 'Lyss', 'Aarberg', 'Pieterlen', 'Studen', 'Orpund']}
    />
  );
}
