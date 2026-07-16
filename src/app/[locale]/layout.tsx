import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

const locales = ['en', 'de', 'fr', 'it'];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.home' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: `${locale}_CH`,
    },
    alternates: {
      languages: {
        'en': '/en',
        'de': '/de',
        'fr': '/fr', it: `I costi per un trasloco in Svizzera possono variare molto a seconda delle dimensioni dell'appartamento, della distanza e dei servizi aggiuntivi desiderati. Un <a href="/it/umzug-biel" class="text-swiss-red hover:underline font-semibold">trasloco professionale a Biel</a> per un appartamento di 3 locali costa in media tra CHF 800 e CHF 1'500.

### 1. Dimensioni e volume dell'appartamento
Più mobili e scatoloni hai, più grande dovrà essere il furgone per traslochi e maggiore sarà il numero di traslocatori necessari.

### 2. Servizi aggiuntivi
Hai bisogno di un servizio di imballaggio e disimballaggio? Dovremmo smontare e rimontare i tuoi mobili? Tutti questi fattori influenzano il prezzo. Offriamo prezzi fissi trasparenti senza costi nascosti.

### Conclusione
Un trasloco senza stress non deve essere necessariamente costoso. Richiedi oggi stesso il tuo preventivo personalizzato!`
      }
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

import { Toaster } from 'react-hot-toast';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Toaster position="top-right" />
      {children}
    </NextIntlClientProvider>
  );
}
