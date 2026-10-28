import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugAarberg'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzug-aarberg`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzug-aarberg',
        en: 'https://www.swisscleanmove.ch/en/umzug-aarberg',
        fr: 'https://www.swisscleanmove.ch/fr/umzug-aarberg',
        it: 'https://www.swisscleanmove.ch/it/umzug-aarberg',
        'x-default': 'https://www.swisscleanmove.ch/de/umzug-aarberg'
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

export default function UmzugAarbergPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugAarberg"
      locale={locale}
      service="umzug"
      city="Aarberg"
      isPillar={false}
      formService="relocation"
      noindex={false}
    />
  );
}
