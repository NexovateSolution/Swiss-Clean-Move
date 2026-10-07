import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.endreinigungBiel.meta` });
  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzugsreinigung-biel-bienne`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzugsreinigung-biel-bienne',
        en: 'https://www.swisscleanmove.ch/en/umzugsreinigung-biel-bienne',
        fr: 'https://www.swisscleanmove.ch/fr/umzugsreinigung-biel-bienne',
        it: 'https://www.swisscleanmove.ch/it/umzugsreinigung-biel-bienne',
        'x-default': 'https://www.swisscleanmove.ch/de/umzugsreinigung-biel-bienne'
      }
    }
  };
}

export default function UmzugsreinigungBielPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="endreinigungBiel"
      locale={locale}
      service="endreinigung"
      city="Biel/Bienne"
      isPillar={true}
      formService="facility-services"
      noindex={false}
    />
  );
}
