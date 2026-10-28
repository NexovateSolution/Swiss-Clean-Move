import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'endreinigungIpsach'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/endreinigung-ipsach`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/endreinigung-ipsach',
        en: 'https://www.swisscleanmove.ch/en/endreinigung-ipsach',
        fr: 'https://www.swisscleanmove.ch/fr/endreinigung-ipsach',
        it: 'https://www.swisscleanmove.ch/it/endreinigung-ipsach',
        'x-default': 'https://www.swisscleanmove.ch/de/endreinigung-ipsach'
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

export default function EndreinigungIpsachPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="endreinigungIpsach"
      locale={locale}
      service="endreinigung"
      city="Ipsach"
      isPillar={false}
      formService="facility-services"
      noindex={false}
    />
  );
}
