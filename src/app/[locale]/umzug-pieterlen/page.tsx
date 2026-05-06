import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugPieterlen'}.meta` });
  return {
    title: t('title'),
    description: t('description'),
    // Phased rollout: noindex true for secondary cities temporarily
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function UmzugPieterlenPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugPieterlen"
      locale={locale}
      service="umzug"
      city="Pieterlen"
      isPillar={false}
      formService="relocation"
      noindex={false}
    />
  );
}
