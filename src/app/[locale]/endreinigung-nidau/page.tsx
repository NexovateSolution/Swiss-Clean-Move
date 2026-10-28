import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'endreinigungNidau'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/endreinigung-nidau`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/endreinigung-nidau',
        en: 'https://www.swisscleanmove.ch/en/endreinigung-nidau',
        fr: 'https://www.swisscleanmove.ch/fr/endreinigung-nidau',
        it: 'https://www.swisscleanmove.ch/it/endreinigung-nidau',
        'x-default': 'https://www.swisscleanmove.ch/de/endreinigung-nidau'
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

export default function EndreinigungNidauPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="endreinigungNidau"
      locale={locale}
      service="endreinigung"
      city="Nidau"
      isPillar={false}
      formService="facility-services"
      noindex={false}
    />
  );
}
