import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugAarberg'}.meta` });
  return {
    title: t('title'),
    description: t('description'),
    // Phased rollout: noindex true for secondary cities temporarily
    robots: {
      index: false,
      follow: true
    }
  };
}

export default function UmzugAarbergPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugAarberg"
      locale={locale}
      service="umzug"
      city="Aarberg"
      isPillar={false}
      formService="relocation"
      noindex={true}
    />
  );
}
