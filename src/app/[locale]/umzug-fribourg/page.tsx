import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugFribourg'}.meta` });
  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function UmzugFribourgPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugFribourg"
      locale={locale}
      service="umzug"
      city="Fribourg"
      isPillar={false}
      formService="relocation"
      noindex={false}
      mapQuery="Fribourg,Switzerland"
      areaCities={['Fribourg', 'Bulle', 'Murten', 'Düdingen', 'Villars-sur-Glâne']}
    />
  );
}
