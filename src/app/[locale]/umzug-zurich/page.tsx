import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugZurich'}.meta` });
  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function UmzugZurichPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugZurich"
      locale={locale}
      service="umzug"
      city="Zürich"
      isPillar={false}
      formService="relocation"
      noindex={false}
      mapQuery="Zurich,Switzerland"
      areaCities={['Zürich', 'Winterthur', 'Baden', 'Aarau', 'Dietikon', 'Uster', 'Wädenswil']}
    />
  );
}
