import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'endreinigungLyss'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/endreinigung-lyss`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/endreinigung-lyss',
        en: 'https://www.swisscleanmove.ch/en/endreinigung-lyss',
        fr: 'https://www.swisscleanmove.ch/fr/endreinigung-lyss',
        it: 'https://www.swisscleanmove.ch/it/endreinigung-lyss',
        'x-default': 'https://www.swisscleanmove.ch/de/endreinigung-lyss'
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

export default function EndreinigungLyssPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="endreinigungLyss"
      locale={locale}
      service="endreinigung"
      city="Lyss"
      isPillar={false}
      formService="facility-services"
      noindex={false}
    />
  );
}
