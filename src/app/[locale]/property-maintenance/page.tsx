import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PropertyMaintenanceClient from './PropertyMaintenanceClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home.services.propertyMaintenance' });
  const title = `${t('title')} | SwissCleanMove`;
  const description = t('description');

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/property-maintenance`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/property-maintenance',
        en: 'https://www.swisscleanmove.ch/en/property-maintenance',
        fr: 'https://www.swisscleanmove.ch/fr/property-maintenance',
        it: 'https://www.swisscleanmove.ch/it/property-maintenance',
        'x-default': 'https://www.swisscleanmove.ch/de/property-maintenance',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.swisscleanmove.ch/${locale}/property-maintenance`,
      type: 'website',
    },
  };
}

export default function PropertyMaintenancePage({ params: { locale } }: { params: { locale: string } }) {
  return <PropertyMaintenanceClient locale={locale} />;
}
