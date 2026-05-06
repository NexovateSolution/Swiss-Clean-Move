import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'reinigungNidau'}.meta` });
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

export default function ReinigungNidauPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="reinigungNidau"
      locale={locale}
      service="reinigung"
      city="Nidau"
      isPillar={false}
      formService="house-cleaning"
      noindex={false}
    />
  );
}
