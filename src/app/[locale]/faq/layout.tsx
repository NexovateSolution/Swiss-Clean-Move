import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'seo.faq' });
    return {
        title: t('title'),
        description: t('description'),
        openGraph: { title: t('title'), description: t('description'), type: 'website', locale: `${locale}_CH` },
    };
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
