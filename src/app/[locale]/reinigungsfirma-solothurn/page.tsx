import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'seoPages.reinigungsfirmaSolothurn.meta' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://swisscleanmove.ch/${locale}/reinigungsfirma-solothurn`,
      languages: {
        'de': 'https://swisscleanmove.ch/de/reinigungsfirma-solothurn',
        'en': 'https://swisscleanmove.ch/en/reinigungsfirma-solothurn',
        'fr': 'https://swisscleanmove.ch/fr/reinigungsfirma-solothurn',
        'it': 'https://swisscleanmove.ch/it/reinigungsfirma-solothurn',
      }
    }
  };
}

export default function ReinigungsfirmaSolothurnPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="reinigungsfirmaSolothurn"
      locale={locale}
      service="reinigungsfirma"
      city="Solothurn"
      isPillar={true}
      formService="house-cleaning"
      noindex={false}
      mapQuery="Solothurn,Switzerland"
      areaCities={['Solothurn', 'Grenchen', 'Olten', 'Zuchwil', 'Derendingen', 'Bettlach', 'Luterbach', 'Langendorf', 'Bellach', 'Selzach', 'Oensingen', 'Balsthal', 'Trimbach', 'Dulliken', 'Wangen bei Olten']}
    />
  );
}
