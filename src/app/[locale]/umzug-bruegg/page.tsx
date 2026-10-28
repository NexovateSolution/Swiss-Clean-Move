import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugBruegg'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzug-bruegg`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzug-bruegg',
        en: 'https://www.swisscleanmove.ch/en/umzug-bruegg',
        fr: 'https://www.swisscleanmove.ch/fr/umzug-bruegg',
        it: 'https://www.swisscleanmove.ch/it/umzug-bruegg',
        'x-default': 'https://www.swisscleanmove.ch/de/umzug-bruegg'
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

export default function UmzugBrueggPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugBruegg"
      locale={locale}
      service="umzug"
      city="Brügg"
      isPillar={false}
      formService="relocation"
      noindex={false}
    />
  );
}
