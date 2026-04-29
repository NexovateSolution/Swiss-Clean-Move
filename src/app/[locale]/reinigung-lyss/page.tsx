import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'reinigungLyss'}.meta` });
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

export default function ReinigungLyssPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="reinigungLyss"
      locale={locale}
      service="reinigung"
      city="Lyss"
      isPillar={false}
      formService="house-cleaning"
      noindex={true}
    />
  );
}
