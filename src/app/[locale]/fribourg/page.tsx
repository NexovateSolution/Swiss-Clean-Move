import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  de: {
    slug: 'fribourg', regionName: 'Fribourg/Freiburg',
    seoTitle: 'Umzug Fribourg | Reinigung Fribourg | SwissCleanMove',
    metaDescription: 'Professioneller Umzug, Reinigung, Unterhaltsreinigung, Facility Services und Entsorgung in Fribourg/Freiburg.',
    h1: 'Umzug & Reinigung in Fribourg/Freiburg',
    highSeoKeywords: ['Umzug Fribourg','Umzugsfirma Fribourg','Reinigungsfirma Fribourg','Umzugsreinigung Fribourg','Endreinigung Fribourg','Unterhaltsreinigung Fribourg','Facility Services Fribourg','Hauswartung Fribourg','Entsorgung Fribourg'],
    localKeywords: ['Fribourg','Freiburg','Bulle','Murten','Düdingen','Tafers','Estavayer'],
    introParagraphs: [
      'SwissCleanMove bietet Umzug, Reinigung, Endreinigung mit Abnahmegarantie, Unterhaltsreinigung, Facility Services, Hauswartung und Entsorgung im Kanton Fribourg/Freiburg.',
      'Wir bedienen Fribourg, Freiburg, Bulle, Murten, Düdingen, Tafers und Estavayer. SwissCleanMove unterstützt Kunden mit professioneller Planung, gründlicher Reinigung und zuverlässigen Services für Gebäude und Objekte.'
    ],
    faqs: [
      { question: 'Bietet SwissCleanMove Umzug in Fribourg an?', answer: 'Ja, wir bieten Umzüge in Fribourg/Freiburg und Umgebung.' },
      { question: 'Gibt es Reinigungsservice in Freiburg?', answer: 'Ja, wir bieten Umzugsreinigung, Endreinigung, Unterhaltsreinigung und Büroreinigung.' },
      { question: 'Arbeitet SwissCleanMove auch in Bulle und Murten?', answer: 'Ja, wir arbeiten auch in Bulle, Murten und Umgebung.' }
    ],
    mapQuery: 'Fribourg,Switzerland'
  },
  en: {
    slug: 'fribourg', regionName: 'Fribourg',
    seoTitle: 'Moving Fribourg | Cleaning Fribourg | SwissCleanMove',
    metaDescription: 'Professional moving, cleaning, maintenance cleaning, facility services and disposal in Fribourg.',
    h1: 'Moving & Cleaning in Fribourg',
    highSeoKeywords: ['Moving Fribourg','Cleaning Fribourg'],
    localKeywords: ['Fribourg','Freiburg','Bulle','Murten','Düdingen','Tafers','Estavayer'],
    introParagraphs: [
      'SwissCleanMove offers moving, cleaning, final cleaning with handover guarantee, maintenance cleaning, facility services, property maintenance and disposal in the Canton of Fribourg.',
      'We serve Fribourg, Bulle, Murten, Düdingen, Tafers and Estavayer. Bilingual teams for French and German-speaking clients.'
    ],
    faqs: [
      { question: 'Does SwissCleanMove offer moving in Fribourg?', answer: 'Yes, we offer moves in Fribourg and surrounding areas.' },
      { question: 'Is cleaning service available in Fribourg?', answer: 'Yes, we offer move-out cleaning, final cleaning, maintenance cleaning and office cleaning.' },
      { question: 'Does SwissCleanMove work in Bulle and Murten?', answer: 'Yes, we also work in Bulle, Murten and surrounding areas.' }
    ],
    mapQuery: 'Fribourg,Switzerland'
  },
  fr: {
    slug: 'fribourg', regionName: 'Fribourg',
    seoTitle: 'Déménagement Fribourg | Nettoyage Fribourg | SwissCleanMove',
    metaDescription: 'Déménagement professionnel, nettoyage, facility services et débarras à Fribourg.',
    h1: 'Déménagement & Nettoyage à Fribourg',
    highSeoKeywords: ['Déménagement Fribourg','Nettoyage Fribourg'],
    localKeywords: ['Fribourg','Freiburg','Bulle','Murten','Düdingen','Tafers','Estavayer'],
    introParagraphs: [
      'SwissCleanMove propose déménagement, nettoyage de fin de bail avec garantie, nettoyage d\'entretien, facility services et débarras dans le canton de Fribourg.',
      'Nous desservons Fribourg, Bulle, Morat, Düdingen, Tafers et Estavayer. Équipes bilingues français-allemand.'
    ],
    faqs: [
      { question: 'SwissCleanMove propose-t-il un déménagement à Fribourg?', answer: 'Oui, nous proposons des déménagements à Fribourg et environs.' },
      { question: 'Y a-t-il un service de nettoyage à Fribourg?', answer: 'Oui, nous proposons nettoyage de fin de bail, nettoyage d\'entretien et nettoyage de bureaux.' },
      { question: 'Travaillez-vous à Bulle et Morat?', answer: 'Oui, nous travaillons aussi à Bulle, Morat et environs.' }
    ],
    mapQuery: 'Fribourg,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.de;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/fribourg` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.de} locale={locale} />;
}
