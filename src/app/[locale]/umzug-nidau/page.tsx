import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugNidau'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzug-nidau`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzug-nidau',
        en: 'https://www.swisscleanmove.ch/en/umzug-nidau',
        fr: 'https://www.swisscleanmove.ch/fr/umzug-nidau',
        it: 'https://www.swisscleanmove.ch/it/umzug-nidau',
        'x-default': 'https://www.swisscleanmove.ch/de/umzug-nidau'
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

export default function UmzugNidauPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugNidau"
      locale={locale}
      service="umzug"
      city="Nidau"
      isPillar={false}
      formService="relocation"
      noindex={false}
    />
  );
}
