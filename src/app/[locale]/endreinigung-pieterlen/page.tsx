import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'endreinigungPieterlen'}.meta` });
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

export default function EndreinigungPieterlenPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="endreinigungPieterlen"
      locale={locale}
      service="endreinigung"
      city="Pieterlen"
      isPillar={false}
      formService="facility-services"
      noindex={false}
    />
  );
}
