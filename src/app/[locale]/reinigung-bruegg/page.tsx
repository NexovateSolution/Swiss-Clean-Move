import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'reinigungBruegg'}.meta` });
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

export default function ReinigungBrueggPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="reinigungBruegg"
      locale={locale}
      service="reinigung"
      city="Brügg"
      isPillar={false}
      formService="house-cleaning"
      noindex={false}
    />
  );
}
