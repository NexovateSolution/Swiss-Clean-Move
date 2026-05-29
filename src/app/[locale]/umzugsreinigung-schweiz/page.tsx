import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugsreinigungSchweiz'}.meta` });
  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function UmzugsreinigungSchweizPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugsreinigungSchweiz"
      locale={locale}
      service="endreinigung"
      city="Schweiz"
      isPillar={true}
      formService="house-cleaning"
      noindex={false}
      mapQuery="Switzerland"
      areaCities={['Biel/Bienne', 'Bern', 'Zürich', 'Basel', 'Genf', 'Lausanne', 'Luzern', 'St. Gallen', 'Solothurn']}
    />
  );
}
