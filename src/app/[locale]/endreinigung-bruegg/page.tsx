import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: `seoPages.${'endreinigungBruegg'}.meta` });
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

export default function EndreinigungBrueggPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="endreinigungBruegg"
      locale={locale}
      service="endreinigung"
      city="Brügg"
      isPillar={false}
      formService="facility-services"
      noindex={false}
    />
  );
}
