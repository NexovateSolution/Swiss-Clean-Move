import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugNeuchatel'}.meta` });
  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function UmzugNeuchatelPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugNeuchatel"
      locale={locale}
      service="umzug"
      city="Neuchâtel"
      isPillar={false}
      formService="relocation"
      noindex={false}
      mapQuery="Neuchatel,Switzerland"
      areaCities={['Neuchâtel', 'La Chaux-de-Fonds', 'Le Locle', 'Boudry', 'Val-de-Travers']}
    />
  );
}
