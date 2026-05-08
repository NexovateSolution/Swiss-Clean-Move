import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugBasel'}.meta` });
  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function UmzugBaselPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugBasel"
      locale={locale}
      service="umzug"
      city="Basel"
      isPillar={false}
      formService="relocation"
      noindex={false}
      mapQuery="Basel,Switzerland"
      areaCities={['Basel', 'Allschwil', 'Reinach', 'Muttenz', 'Binningen', 'Liestal']}
    />
  );
}
