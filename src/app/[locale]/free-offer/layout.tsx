import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'seo.freeQuote' });
    return {
        title: t('title'),
        description: t('description'),
        openGraph: { title: t('title'), description: t('description'), type: 'website', locale: `${locale}_CH` },
    };
}

export default function FreeOfferLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
