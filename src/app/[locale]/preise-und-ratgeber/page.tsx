import { Metadata } from 'next';
import KnowledgeHubPage from '@/components/KnowledgeHubPage';
import data from '@/lib/knowledgeHubData';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const getL = (obj: any) => obj[locale as 'de' | 'fr' | 'en'] || obj.de;
  
  return {
    title: getL(data.meta.title),
    description: getL(data.meta.description),
    alternates: {
      canonical: `https://www.swisscleanmove.ch/${locale}/preise-und-ratgeber`,
      languages: {
        'de': '/de/preise-und-ratgeber',
        'fr': '/fr/prix-et-conseils',
        'en': '/en/pricing-and-guides',
      },
    },
    openGraph: {
      title: getL(data.meta.title),
      description: getL(data.meta.description),
      url: `https://www.swisscleanmove.ch/${locale}/preise-und-ratgeber`,
      type: 'website',
    }
  };
}

export default function PreiseUndRatgeber({ params: { locale } }: { params: { locale: string } }) {
  // Only render if DE, otherwise it will just display in DE anyway but ideally 
  // users navigate to the correct localized URL.
  return <KnowledgeHubPage locale={locale} />;
}
