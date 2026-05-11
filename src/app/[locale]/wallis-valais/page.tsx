import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  de: {
    slug: 'wallis-valais', regionName: 'Wallis / Valais',
    seoTitle: 'Umzug Wallis | Reinigung Wallis | SwissCleanMove',
    metaDescription: 'Professioneller Umzug, Reinigung, Facility Services und Entsorgung im Wallis / Valais.',
    h1: 'Umzug & Reinigung im Wallis / Valais',
    highSeoKeywords: ['Umzug Wallis','Reinigungsfirma Wallis','Umzugsreinigung Wallis','Endreinigung Wallis','Unterhaltsreinigung Wallis','Facility Services Wallis','Hauswartung Wallis','Entsorgung Wallis','Déménagement Valais','Nettoyage Valais'],
    localKeywords: ['Sion','Sierre','Martigny','Monthey','Brig','Visp','Naters'],
    introParagraphs: [
      'SwissCleanMove bietet Umzug, Reinigung, Unterhaltsreinigung, Facility Services, Hauswartung und Entsorgung im Wallis / Valais.',
      'Wir bedienen Sion, Sierre, Martigny, Monthey, Brig, Visp und Naters. SwissCleanMove unterstützt Privatkunden, Unternehmen und Verwaltungen mit professionellen Dienstleistungen für Umzug, Reinigung, Gebäudeunterhalt und Entsorgung.'
    ],
    faqs: [
      { question: 'Bietet SwissCleanMove Umzug im Wallis an?', answer: 'Ja, wir bieten Umzüge im Wallis / Valais.' },
      { question: 'Gibt es Reinigung im Wallis?', answer: 'Ja, wir bieten Umzugsreinigung, Endreinigung, Unterhaltsreinigung und Büroreinigung.' },
      { question: 'Arbeitet SwissCleanMove auch in Sion und Martigny?', answer: 'Ja, wir arbeiten in Sion, Martigny, Sierre, Monthey, Brig und Umgebung.' }
    ],
    mapQuery: 'Canton+of+Valais,Switzerland'
  },
  en: {
    slug: 'wallis-valais', regionName: 'Valais',
    seoTitle: 'Moving Valais | Cleaning Valais | SwissCleanMove',
    metaDescription: 'Professional moving, cleaning, facility services and disposal in Valais.',
    h1: 'Moving & Cleaning in Valais',
    highSeoKeywords: ['Moving Valais','Cleaning Valais'],
    localKeywords: ['Sion','Sierre','Martigny','Monthey','Brig','Visp','Naters'],
    introParagraphs: [
      'SwissCleanMove offers moving, cleaning, maintenance cleaning, facility services, property maintenance and disposal in Valais.',
      'We serve Sion, Sierre, Martigny, Monthey, Brig, Visp and Naters.'
    ],
    faqs: [
      { question: 'Does SwissCleanMove offer moving in Valais?', answer: 'Yes, we offer moves in Valais.' },
      { question: 'Is cleaning available in Valais?', answer: 'Yes, we offer move-out cleaning, final cleaning, maintenance cleaning and office cleaning.' },
      { question: 'Does SwissCleanMove work in Sion and Martigny?', answer: 'Yes, we work in Sion, Martigny, Sierre, Monthey, Brig and surrounding areas.' }
    ],
    mapQuery: 'Canton+of+Valais,Switzerland'
  },
  fr: {
    slug: 'wallis-valais', regionName: 'Valais',
    seoTitle: 'Déménagement Valais | Nettoyage Valais | SwissCleanMove',
    metaDescription: 'Déménagement professionnel, nettoyage, facility services et débarras en Valais.',
    h1: 'Déménagement & Nettoyage en Valais',
    highSeoKeywords: ['Déménagement Valais','Nettoyage Valais'],
    localKeywords: ['Sion','Sierre','Martigny','Monthey','Brig','Visp','Naters'],
    introParagraphs: [
      'SwissCleanMove propose déménagement, nettoyage, facility services et débarras en Valais.',
      'Nous desservons Sion, Sierre, Martigny, Monthey, Brigue, Viège et Naters.'
    ],
    faqs: [
      { question: 'SwissCleanMove propose-t-il un déménagement en Valais?', answer: 'Oui, nous proposons des déménagements en Valais.' },
      { question: 'Y a-t-il du nettoyage en Valais?', answer: 'Oui, nous proposons nettoyage de fin de bail, nettoyage d\'entretien et nettoyage de bureaux.' },
      { question: 'Travaillez-vous à Sion et Martigny?', answer: 'Oui, nous travaillons à Sion, Martigny, Sierre, Monthey, Brigue et environs.' }
    ],
    mapQuery: 'Canton+of+Valais,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.de;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/wallis-valais` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.de} locale={locale} />;
}
