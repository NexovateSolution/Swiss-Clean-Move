import { Metadata } from 'next';
import KnowledgeHubPage from '@/components/KnowledgeHubPage';
import data from '@/lib/knowledgeHubData';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const getL = (obj: any) => obj[locale as 'de' | 'fr' | 'en'] || obj.de;
  
  return {
    title: getL(data.meta.title),
    description: getL(data.meta.description),
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/pricing-and-guides`,
      languages: {
        'de': '/de/preise-und-ratgeber',
        'fr': '/fr/prix-et-conseils',
        'en': '/en/pricing-and-guides',
      },
    },
    openGraph: {
      title: getL(data.meta.title),
      description: getL(data.meta.description),
      url: `https://www.swisscleanmove.ch/${locale}/pricing-and-guides`,
      type: 'website',
    }
  };
}

export default function PricingAndGuides({ params: { locale } }: { params: { locale: string } }) {
  return <KnowledgeHubPage locale={locale} />;
}
