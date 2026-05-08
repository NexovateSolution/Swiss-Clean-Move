import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugSolothurn'}.meta` });
  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function UmzugSolothurnPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugSolothurn"
      locale={locale}
      service="umzug"
      city="Solothurn"
      isPillar={false}
      formService="relocation"
      noindex={false}
      mapQuery="Solothurn,Switzerland"
      areaCities={['Solothurn', 'Olten', 'Grenchen', 'Zuchwil', 'Bettlach', 'Biel/Bienne']}
    />
  );
}
