import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'endreinigungAarberg'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/endreinigung-aarberg`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/endreinigung-aarberg',
        en: 'https://www.swisscleanmove.ch/en/endreinigung-aarberg',
        fr: 'https://www.swisscleanmove.ch/fr/endreinigung-aarberg',
        it: 'https://www.swisscleanmove.ch/it/endreinigung-aarberg',
        'x-default': 'https://www.swisscleanmove.ch/de/endreinigung-aarberg'
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

export default function EndreinigungAarbergPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="endreinigungAarberg"
      locale={locale}
      service="endreinigung"
      city="Aarberg"
      isPillar={false}
      formService="facility-services"
      noindex={false}
    />
  );
}
