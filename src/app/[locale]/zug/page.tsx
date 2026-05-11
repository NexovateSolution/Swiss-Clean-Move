import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  de: {
    slug: 'zug', regionName: 'Zug',
    seoTitle: 'Umzug Zug | Reinigungsfirma Zug | SwissCleanMove',
    metaDescription: 'Professioneller Umzug, Reinigung, Facility Services, Hauswartung und Entsorgung in Zug.',
    h1: 'Umzug & Reinigungsfirma in Zug',
    highSeoKeywords: ['Umzug Zug','Umzugsfirma Zug','Reinigungsfirma Zug','Umzugsreinigung Zug','Endreinigung Zug','Unterhaltsreinigung Zug','Büroreinigung Zug','Facility Services Zug','Hauswartung Zug','Entsorgung Zug'],
    localKeywords: ['Zug','Baar','Cham','Hünenberg','Steinhausen','Rotkreuz','Risch'],
    introParagraphs: [
      'SwissCleanMove bietet Umzug, Umzugsreinigung, Endreinigung mit Abnahmegarantie, Unterhaltsreinigung, Facility Services, Hauswartung und Entsorgung in Zug und Umgebung.',
      'Wir arbeiten in Zug, Baar, Cham, Hünenberg, Steinhausen, Rotkreuz und Risch. SwissCleanMove steht für professionelle Planung, zuverlässige Ausführung und saubere Resultate bei Umzug, Reinigung und Facility Services.'
    ],
    faqs: [
      { question: 'Bietet SwissCleanMove Umzug in Zug an?', answer: 'Ja, wir bieten professionelle Umzüge in Zug und Umgebung.' },
      { question: 'Gibt es Facility Services in Zug?', answer: 'Ja, wir bieten Facility Services, Hauswartung und Gebäudeunterhalt.' },
      { question: 'Kann ich eine kostenlose Offerte erhalten?', answer: 'Ja, Kunden können kostenlos eine Offerte anfordern.' }
    ],
    mapQuery: 'Zug,Switzerland'
  },
  en: {
    slug: 'zug', regionName: 'Zug',
    seoTitle: 'Moving Zug | Cleaning Company Zug | SwissCleanMove',
    metaDescription: 'Professional moving, cleaning, facility services, property maintenance and disposal in Zug.',
    h1: 'Moving & Cleaning Company in Zug',
    highSeoKeywords: ['Moving Zug','Cleaning company Zug'],
    localKeywords: ['Zug','Baar','Cham','Hünenberg','Steinhausen','Rotkreuz','Risch'],
    introParagraphs: [
      'SwissCleanMove offers moving, move-out cleaning, final cleaning with handover guarantee, maintenance cleaning, facility services, property maintenance and disposal in Zug and surrounding areas.',
      'We work in Zug, Baar, Cham, Hünenberg, Steinhausen, Rotkreuz and Risch. SwissCleanMove stands for professional planning, reliable execution and clean results.'
    ],
    faqs: [
      { question: 'Does SwissCleanMove offer moving in Zug?', answer: 'Yes, we offer professional moves in Zug and surrounding areas.' },
      { question: 'Are facility services available in Zug?', answer: 'Yes, we offer facility services, property maintenance and building upkeep.' },
      { question: 'Can I get a free quote?', answer: 'Yes, clients can request a free quote.' }
    ],
    mapQuery: 'Zug,Switzerland'
  },
  fr: {
    slug: 'zug', regionName: 'Zoug',
    seoTitle: 'Déménagement Zoug | Nettoyage Zoug | SwissCleanMove',
    metaDescription: 'Déménagement professionnel, nettoyage, facility services et débarras à Zoug.',
    h1: 'Déménagement & Nettoyage à Zoug',
    highSeoKeywords: ['Déménagement Zoug','Nettoyage Zoug'],
    localKeywords: ['Zug','Baar','Cham','Hünenberg','Steinhausen','Rotkreuz','Risch'],
    introParagraphs: [
      'SwissCleanMove propose déménagement, nettoyage de fin de bail, facility services et débarras à Zoug et environs.',
      'Nous intervenons à Zoug, Baar, Cham, Hünenberg, Steinhausen, Rotkreuz et Risch.'
    ],
    faqs: [
      { question: 'SwissCleanMove propose-t-il un déménagement à Zoug?', answer: 'Oui, nous proposons des déménagements professionnels à Zoug et environs.' },
      { question: 'Y a-t-il des facility services à Zoug?', answer: 'Oui, nous proposons facility services, conciergerie et entretien d\'immeuble.' },
      { question: 'Puis-je obtenir un devis gratuit?', answer: 'Oui, les clients peuvent demander un devis gratuit.' }
    ],
    mapQuery: 'Zug,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.de;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/zug` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.de} locale={locale} />;
}
