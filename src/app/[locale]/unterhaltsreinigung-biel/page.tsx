import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'seoPages.unterhaltsreinigungBiel.meta' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/unterhaltsreinigung-biel`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/unterhaltsreinigung-biel',
        en: 'https://www.swisscleanmove.ch/en/unterhaltsreinigung-biel',
        fr: 'https://www.swisscleanmove.ch/fr/unterhaltsreinigung-biel',
        it: 'https://www.swisscleanmove.ch/it/unterhaltsreinigung-biel',
        'x-default': 'https://www.swisscleanmove.ch/de/unterhaltsreinigung-biel'
      }
    }
  };
}

export default function UnterhaltsreinigungBielPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="unterhaltsreinigungBiel"
      locale={locale}
      service="unterhaltsreinigung"
      city="Biel/Bienne"
      isPillar={true}
      formService="facility-services"
      noindex={false}
      mapQuery="Biel/Bienne,Seeland,Switzerland"
      areaCities={['Biel/Bienne', 'Nidau', 'Brügg', 'Ipsach', 'Port', 'Lyss', 'Aarberg', 'Pieterlen', 'Studen', 'Orpund']}
    />
  );
}
