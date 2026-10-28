import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'endreinigungBiel'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/endreinigung-biel-bienne`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/endreinigung-biel-bienne',
        en: 'https://www.swisscleanmove.ch/en/endreinigung-biel-bienne',
        fr: 'https://www.swisscleanmove.ch/fr/endreinigung-biel-bienne',
        it: 'https://www.swisscleanmove.ch/it/endreinigung-biel-bienne',
        'x-default': 'https://www.swisscleanmove.ch/de/endreinigung-biel-bienne'
      }
    },
    title: t('title'),
    description: t('description'),
    // Phased rollout: noindex true for secondary cities temporarily
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function EndreinigungBielPage({ params: { locale } }: { params: { locale: string } }) {
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
