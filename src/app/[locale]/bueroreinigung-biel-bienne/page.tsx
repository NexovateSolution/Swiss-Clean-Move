import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.bueroreinigungBiel.meta` });
  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/bueroreinigung-biel-bienne`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/bueroreinigung-biel-bienne',
        en: 'https://www.swisscleanmove.ch/en/bueroreinigung-biel-bienne',
        fr: 'https://www.swisscleanmove.ch/fr/bueroreinigung-biel-bienne',
        it: 'https://www.swisscleanmove.ch/it/bueroreinigung-biel-bienne',
        'x-default': 'https://www.swisscleanmove.ch/de/bueroreinigung-biel-bienne'
      }
    }
  };
}

export default function BueroreinigungBielPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="bueroreinigungBiel"
      locale={locale}
      service="unterhaltsreinigung"
      city="Biel/Bienne"
      isPillar={true}
      formService="facility-services"
      noindex={false}
      mapQuery="Biel/Bienne,Seeland,Switzerland"
    />
  );
}
