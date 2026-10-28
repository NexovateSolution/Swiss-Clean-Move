import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugIpsach'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/umzug-ipsach`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/umzug-ipsach',
        en: 'https://www.swisscleanmove.ch/en/umzug-ipsach',
        fr: 'https://www.swisscleanmove.ch/fr/umzug-ipsach',
        it: 'https://www.swisscleanmove.ch/it/umzug-ipsach',
        'x-default': 'https://www.swisscleanmove.ch/de/umzug-ipsach'
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

export default function UmzugIpsachPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugIpsach"
      locale={locale}
      service="umzug"
      city="Ipsach"
      isPillar={false}
      formService="relocation"
      noindex={false}
    />
  );
}
