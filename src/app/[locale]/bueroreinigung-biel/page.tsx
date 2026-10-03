import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.bueroreinigungBiel.meta` });
  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/bueroreinigung-biel`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/bueroreinigung-biel',
        en: 'https://www.swisscleanmove.ch/en/bueroreinigung-biel',
        fr: 'https://www.swisscleanmove.ch/fr/bueroreinigung-biel',
        it: 'https://www.swisscleanmove.ch/it/bueroreinigung-biel',
        'x-default': 'https://www.swisscleanmove.ch/de/bueroreinigung-biel'
      }
    }
  };
}

export default function BueroreinigungBielPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="bueroreinigungBiel"
      locale={locale}
      service="unterhaltsreinigung"
      city="Biel/Bienne"
      isPillar={true}
      formService="facility-services"
      noindex={false}
      mapQuery="Biel/Bienne,Seeland,Switzerland"
    />
  );
}
