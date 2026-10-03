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
      canonical: `https://www.swisscleanmove.ch/${locale}/umzugsreinigung-biel`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzugsreinigung-biel',
        en: 'https://www.swisscleanmove.ch/en/umzugsreinigung-biel',
        fr: 'https://www.swisscleanmove.ch/fr/umzugsreinigung-biel',
        it: 'https://www.swisscleanmove.ch/it/umzugsreinigung-biel',
        'x-default': 'https://www.swisscleanmove.ch/de/umzugsreinigung-biel'
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
