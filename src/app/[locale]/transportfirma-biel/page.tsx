import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'seoPages.transportfirmaBiel.meta' });
  return {
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
