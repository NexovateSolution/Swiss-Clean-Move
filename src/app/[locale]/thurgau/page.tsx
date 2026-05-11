import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  de: {
    slug: 'thurgau', regionName: 'Kanton Thurgau',
    seoTitle: 'Umzug Thurgau | Reinigungsfirma Thurgau | SwissCleanMove',
    metaDescription: 'Umzug, Reinigung, Umzugsreinigung, Unterhaltsreinigung, Facility Services und Entsorgung im Kanton Thurgau.',
    h1: 'Umzug & Reinigungsfirma im Kanton Thurgau',
    highSeoKeywords: ['Umzug Thurgau','Umzugsfirma Thurgau','Reinigungsfirma Thurgau','Umzugsreinigung Thurgau','Endreinigung Thurgau','Unterhaltsreinigung Thurgau','Facility Services Thurgau','Hauswartung Thurgau','Entsorgung Thurgau'],
    localKeywords: ['Frauenfeld','Kreuzlingen','Weinfelden','Amriswil','Romanshorn','Arbon'],
    introParagraphs: [
      'SwissCleanMove bietet Umzug, Reinigung, Unterhaltsreinigung, Facility Services, Hauswartung und Entsorgung im Kanton Thurgau.',
      'Wir bedienen Frauenfeld, Kreuzlingen, Weinfelden, Amriswil, Romanshorn und Arbon. SwissCleanMove ist Ihr Partner für professionelle Umzüge, gründliche Reinigung, Gebäudeunterhalt und zuverlässige Entsorgung.'
    ],
    faqs: [
      { question: 'Bietet SwissCleanMove Umzug im Thurgau an?', answer: 'Ja, wir bieten Umzüge im gesamten Kanton Thurgau.' },
      { question: 'Gibt es Umzugsreinigung mit Abnahmegarantie?', answer: 'Ja, SwissCleanMove bietet Endreinigung mit Abnahmegarantie.' },
      { question: 'Welche Städte werden bedient?', answer: 'Frauenfeld, Kreuzlingen, Weinfelden, Amriswil, Romanshorn und Arbon.' }
    ],
    mapQuery: 'Canton+of+Thurgau,Switzerland'
  },
  en: {
    slug: 'thurgau', regionName: 'Canton of Thurgau',
    seoTitle: 'Moving Thurgau | Cleaning Company Thurgau | SwissCleanMove',
    metaDescription: 'Moving, cleaning, move-out cleaning, maintenance cleaning, facility services and disposal in Canton Thurgau.',
    h1: 'Moving & Cleaning Company in Canton Thurgau',
    highSeoKeywords: ['Moving Thurgau','Cleaning company Thurgau'],
    localKeywords: ['Frauenfeld','Kreuzlingen','Weinfelden','Amriswil','Romanshorn','Arbon'],
    introParagraphs: [
      'SwissCleanMove offers moving, cleaning, maintenance cleaning, facility services, property maintenance and disposal in the Canton of Thurgau.',
      'We serve Frauenfeld, Kreuzlingen, Weinfelden, Amriswil, Romanshorn and Arbon. SwissCleanMove is your partner for professional moves, thorough cleaning, building maintenance and reliable disposal.'
    ],
    faqs: [
      { question: 'Does SwissCleanMove offer moving in Thurgau?', answer: 'Yes, we offer moves throughout the Canton of Thurgau.' },
      { question: 'Is move-out cleaning with guarantee available?', answer: 'Yes, SwissCleanMove offers final cleaning with handover guarantee.' },
      { question: 'Which cities are served?', answer: 'Frauenfeld, Kreuzlingen, Weinfelden, Amriswil, Romanshorn and Arbon.' }
    ],
    mapQuery: 'Canton+of+Thurgau,Switzerland'
  },
  fr: {
    slug: 'thurgau', regionName: 'Canton de Thurgovie',
    seoTitle: 'Déménagement Thurgovie | Nettoyage Thurgovie | SwissCleanMove',
    metaDescription: 'Déménagement, nettoyage, facility services et débarras dans le canton de Thurgovie.',
    h1: 'Déménagement & Nettoyage dans le Canton de Thurgovie',
    highSeoKeywords: ['Déménagement Thurgovie','Nettoyage Thurgovie'],
    localKeywords: ['Frauenfeld','Kreuzlingen','Weinfelden','Amriswil','Romanshorn','Arbon'],
    introParagraphs: [
      'SwissCleanMove propose déménagement, nettoyage, facility services et débarras dans le canton de Thurgovie.',
      'Nous desservons Frauenfeld, Kreuzlingen, Weinfelden, Amriswil, Romanshorn et Arbon.'
    ],
    faqs: [
      { question: 'SwissCleanMove propose-t-il un déménagement en Thurgovie?', answer: 'Oui, nous proposons des déménagements dans tout le canton de Thurgovie.' },
      { question: 'Y a-t-il un nettoyage de fin de bail avec garantie?', answer: 'Oui, SwissCleanMove propose le nettoyage de fin de bail avec garantie de remise.' },
      { question: 'Quelles villes sont desservies?', answer: 'Frauenfeld, Kreuzlingen, Weinfelden, Amriswil, Romanshorn et Arbon.' }
    ],
    mapQuery: 'Canton+of+Thurgau,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.de;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/thurgau` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.de} locale={locale} />;
}
