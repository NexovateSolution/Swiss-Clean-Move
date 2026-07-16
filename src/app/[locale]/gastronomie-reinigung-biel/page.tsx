import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'seoPages.gastronomieReinigungBiel.meta' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true }
  };
}

export default function GastronomieReinigungBielPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="gastronomieReinigungBiel"
      locale={locale}
      service="gastronomieReinigung"
      city="Biel/Bienne"
      isPillar={true}
      formService="facility-services"
      noindex={false}
      mapQuery="Biel/Bienne,Seeland,Switzerland"
      areaCities={['Biel/Bienne', 'Nidau', 'Brügg', 'Ipsach', 'Port', 'Lyss', 'Aarberg', 'Pieterlen', 'Studen', 'Orpund']}
    />
  );
}
