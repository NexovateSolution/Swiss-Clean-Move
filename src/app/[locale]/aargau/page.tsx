import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  de: {
    slug: 'aargau', regionName: 'Kanton Aargau',
    seoTitle: 'Umzug Aargau | Reinigungsfirma Aargau | SwissCleanMove',
    metaDescription: 'Professioneller Umzug, Umzugsreinigung, Unterhaltsreinigung, Facility Services und Entsorgung im Kanton Aargau.',
    h1: 'Umzug & Reinigungsfirma im Kanton Aargau',
    highSeoKeywords: ['Umzug Aargau','Umzugsfirma Aargau','Reinigungsfirma Aargau','Umzugsreinigung Aargau','Endreinigung Aargau','Unterhaltsreinigung Aargau','Büroreinigung Aargau','Facility Services Aargau','Hauswartung Aargau','Entsorgung Aargau'],
    localKeywords: ['Aarau','Baden','Wettingen','Brugg','Lenzburg','Wohlen','Rheinfelden','Zofingen'],
    introParagraphs: [
      'SwissCleanMove bietet professionelle Umzüge, Reinigungen, Umzugsreinigung mit Abnahmegarantie, Unterhaltsreinigung, Facility Services, Hauswartung und Entsorgung im Kanton Aargau.',
      'Wir bedienen Aarau, Baden, Wettingen, Brugg, Lenzburg, Wohlen, Rheinfelden und Zofingen. Für Privatkunden, Firmen und Verwaltungen bietet SwissCleanMove zuverlässige Dienstleistungen rund um Umzug, Reinigung, Gebäudeunterhalt und Entsorgung.'
    ],
    faqs: [
      { question: 'Bietet SwissCleanMove Umzug im Aargau an?', answer: 'Ja, SwissCleanMove bietet Umzüge im ganzen Kanton Aargau.' },
      { question: 'Gibt es Umzugsreinigung mit Abnahmegarantie?', answer: 'Ja, wir bieten Endreinigung mit Abnahmegarantie.' },
      { question: 'Welche Orte werden bedient?', answer: 'Aarau, Baden, Wettingen, Brugg, Lenzburg, Wohlen, Rheinfelden und Zofingen.' }
    ],
    mapQuery: 'Canton+of+Aargau,Switzerland'
  },
  en: {
    slug: 'aargau', regionName: 'Canton of Aargau',
    seoTitle: 'Moving Aargau | Cleaning Company Aargau | SwissCleanMove',
    metaDescription: 'Professional moving, move-out cleaning, maintenance cleaning, facility services and disposal in the Canton of Aargau.',
    h1: 'Moving & Cleaning Company in the Canton of Aargau',
    highSeoKeywords: ['Moving Aargau','Cleaning company Aargau'],
    localKeywords: ['Aarau','Baden','Wettingen','Brugg','Lenzburg','Wohlen','Rheinfelden','Zofingen'],
    introParagraphs: [
      'SwissCleanMove offers professional moves, cleaning, move-out cleaning with handover guarantee, maintenance cleaning, facility services, property maintenance and disposal in the Canton of Aargau.',
      'We serve Aarau, Baden, Wettingen, Brugg, Lenzburg, Wohlen, Rheinfelden and Zofingen. SwissCleanMove provides reliable services for moving, cleaning, building maintenance and disposal.'
    ],
    faqs: [
      { question: 'Does SwissCleanMove offer moving in Aargau?', answer: 'Yes, SwissCleanMove offers moves throughout the Canton of Aargau.' },
      { question: 'Is move-out cleaning with guarantee available?', answer: 'Yes, we offer final cleaning with handover guarantee.' },
      { question: 'Which locations are served?', answer: 'Aarau, Baden, Wettingen, Brugg, Lenzburg, Wohlen, Rheinfelden and Zofingen.' }
    ],
    mapQuery: 'Canton+of+Aargau,Switzerland'
  },
  fr: {
    slug: 'aargau', regionName: 'Canton d\'Argovie',
    seoTitle: 'Déménagement Argovie | Nettoyage Argovie | SwissCleanMove',
    metaDescription: 'Déménagement professionnel, nettoyage, facility services et débarras dans le canton d\'Argovie.',
    h1: 'Déménagement & Nettoyage dans le Canton d\'Argovie',
    highSeoKeywords: ['Déménagement Argovie','Nettoyage Argovie'],
    localKeywords: ['Aarau','Baden','Wettingen','Brugg','Lenzburg','Wohlen','Rheinfelden','Zofingen'],
    introParagraphs: [
      'SwissCleanMove propose des déménagements professionnels, nettoyage de fin de bail, facility services et débarras dans le canton d\'Argovie.',
      'Nous desservons Aarau, Baden, Wettingen, Brugg, Lenzburg, Wohlen, Rheinfelden et Zofingen.'
    ],
    faqs: [
      { question: 'SwissCleanMove propose-t-il un déménagement en Argovie?', answer: 'Oui, SwissCleanMove propose des déménagements dans tout le canton d\'Argovie.' },
      { question: 'Y a-t-il un nettoyage de fin de bail avec garantie?', answer: 'Oui, nous proposons le nettoyage de fin de bail avec garantie de remise.' },
      { question: 'Quels lieux sont desservis?', answer: 'Aarau, Baden, Wettingen, Brugg, Lenzburg, Wohlen, Rheinfelden et Zofingen.' }
    ],
    mapQuery: 'Canton+of+Aargau,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.de;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/aargau` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.de} locale={locale} />;
}
