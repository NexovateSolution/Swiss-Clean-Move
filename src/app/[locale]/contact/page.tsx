import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactClient from './ContactClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' });
  const title = `${t('title')} | SwissCleanMove`;
  const description = t('subtitle');

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/contact`,
      languages: {
        de: 'https://www.swisscleanmove.ch/de/contact',
        en: 'https://www.swisscleanmove.ch/en/contact',
        fr: 'https://www.swisscleanmove.ch/fr/contact',
        it: 'https://www.swisscleanmove.ch/it/contact',
        'x-default': 'https://www.swisscleanmove.ch/de/contact',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.swisscleanmove.ch/${locale}/contact`,
      type: 'website',
    },
  };
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  return <ContactClient locale={locale} />;
}
