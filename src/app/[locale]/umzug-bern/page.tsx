import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugBern'}.meta` });
  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function UmzugBernPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugBern"
      locale={locale}
      service="umzug"
      city="Bern"
      isPillar={false}
      formService="relocation"
      noindex={false}
      mapQuery="Bern,Switzerland"
      areaCities={['Bern', 'Thun', 'Burgdorf', 'Langenthal', 'Biel/Bienne', 'Köniz', 'Ostermundigen']}
    />
  );
}
