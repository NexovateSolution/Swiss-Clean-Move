import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'seoPages.fensterreinigungBiel.meta' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/fensterreinigung-biel-bienne`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/fensterreinigung-biel-bienne',
        en: 'https://www.swisscleanmove.ch/en/fensterreinigung-biel-bienne',
        fr: 'https://www.swisscleanmove.ch/fr/fensterreinigung-biel-bienne',
        it: 'https://www.swisscleanmove.ch/it/fensterreinigung-biel-bienne',
        'x-default': 'https://www.swisscleanmove.ch/de/fensterreinigung-biel-bienne'
      }
    }
  };
}

export default function FensterreinigungBielPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="fensterreinigungBiel"
      locale={locale}
      service="fensterreinigung"
      city="Biel/Bienne"
      isPillar={true}
      formService="house-cleaning"
      noindex={false}
      mapQuery="Biel/Bienne,Seeland,Switzerland"
      areaCities={['Biel/Bienne', 'Nidau', 'Brügg', 'Ipsach', 'Port', 'Lyss', 'Aarberg', 'Pieterlen', 'Studen', 'Orpund']}
    />
  );
}
