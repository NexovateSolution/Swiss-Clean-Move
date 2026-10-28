import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'endreinigungBruegg'}.meta` });
  return {
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/endreinigung-bruegg`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/endreinigung-bruegg',
        en: 'https://www.swisscleanmove.ch/en/endreinigung-bruegg',
        fr: 'https://www.swisscleanmove.ch/fr/endreinigung-bruegg',
        it: 'https://www.swisscleanmove.ch/it/endreinigung-bruegg',
        'x-default': 'https://www.swisscleanmove.ch/de/endreinigung-bruegg'
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

export default function EndreinigungBrueggPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="endreinigungBruegg"
      locale={locale}
      service="endreinigung"
      city="Brügg"
      isPillar={false}
      formService="facility-services"
      noindex={false}
    />
  );
}
