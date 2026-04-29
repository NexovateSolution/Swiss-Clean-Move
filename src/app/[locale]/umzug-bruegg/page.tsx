import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'umzugBruegg'}.meta` });
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

export default function UmzugBrueggPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="umzugBruegg"
      locale={locale}
      service="umzug"
      city="Brügg"
      isPillar={false}
      formService="relocation"
      noindex={true}
    />
  );
}
