import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'facilityServiceSchweiz'}.meta` });
  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function FacilityServiceSchweizPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="facilityServiceSchweiz"
      locale={locale}
      service="facilityService"
      city="Schweiz"
      isPillar={true}
      formService="facility-services"
      noindex={false}
      mapQuery="Switzerland"
      areaCities={['Biel/Bienne', 'Bern', 'Zürich', 'Basel', 'Genf', 'Lausanne', 'Luzern', 'St. Gallen', 'Solothurn']}
    />
  );
}
