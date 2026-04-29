import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'reinigungIpsach'}.meta` });
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

export default function ReinigungIpsachPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="reinigungIpsach"
      locale={locale}
      service="reinigung"
      city="Ipsach"
      isPillar={false}
      formService="house-cleaning"
      noindex={true}
    />
  );
}
