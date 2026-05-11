import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  de: {
    slug: 'basel', regionName: 'Basel',
    seoTitle: 'Umzug Basel | Reinigungsfirma Basel | SwissCleanMove',
    metaDescription: 'Professioneller Umzug, Reinigung, Unterhaltsreinigung, Facility Services, Hauswartung und Entsorgung in Basel-Stadt und Basel-Landschaft.',
    h1: 'Umzug & Reinigungsfirma in Basel',
    highSeoKeywords: ['Umzug Basel','Umzugsfirma Basel','Reinigungsfirma Basel','Umzugsreinigung Basel','Endreinigung Basel','Unterhaltsreinigung Basel','Büroreinigung Basel','Gastronomie Reinigung Basel','Facility Services Basel','Hauswartung Basel','Entsorgung Basel'],
    localKeywords: ['Basel','Basel-Stadt','Basel-Landschaft','Allschwil','Binningen','Bottmingen','Muttenz','Münchenstein','Reinach','Pratteln'],
    introParagraphs: [
      'SwissCleanMove bietet Umzug, Endreinigung, Reinigungsservice, Unterhaltsreinigung, Gastronomie Reinigung, Facility Services, Hauswartung und Entsorgung in Basel und Umgebung.',
      'Wir sind für Kunden in Basel-Stadt, Basel-Landschaft, Allschwil, Binningen, Bottmingen, Muttenz, Münchenstein, Reinach und Pratteln im Einsatz. SwissCleanMove verbindet professionelle Umzugsplanung mit gründlicher Reinigung und zuverlässigem Facility Service.'
    ],
    faqs: [
      { question: 'Bietet SwissCleanMove Umzüge in Basel an?', answer: 'Ja, wir bieten Umzug, Möbeltransport und Firmenumzug in Basel.' },
      { question: 'Gibt es Reinigungsservice in Basel?', answer: 'Ja, wir bieten Endreinigung, Unterhaltsreinigung, Büroreinigung und Gastronomie Reinigung.' },
      { question: 'Arbeitet SwissCleanMove in Basel-Stadt und Basel-Landschaft?', answer: 'Ja, wir arbeiten in beiden Regionen.' }
    ],
    mapQuery: 'Basel,Switzerland'
  },
  en: {
    slug: 'basel', regionName: 'Basel',
    seoTitle: 'Moving Basel | Cleaning Company Basel | SwissCleanMove',
    metaDescription: 'Professional moving, cleaning, maintenance cleaning, facility services, property maintenance and disposal in Basel-Stadt and Basel-Landschaft.',
    h1: 'Moving & Cleaning Company in Basel',
    highSeoKeywords: ['Moving Basel','Cleaning company Basel'],
    localKeywords: ['Basel','Basel-Stadt','Basel-Landschaft','Allschwil','Binningen','Bottmingen','Muttenz','Münchenstein','Reinach','Pratteln'],
    introParagraphs: [
      'SwissCleanMove offers moving, final cleaning, cleaning services, maintenance cleaning, restaurant cleaning, facility services, property maintenance and disposal in Basel and surrounding areas.',
      'We serve clients in Basel-Stadt, Basel-Landschaft, Allschwil, Binningen, Bottmingen, Muttenz, Münchenstein, Reinach and Pratteln. SwissCleanMove combines professional move planning with thorough cleaning and reliable facility services.'
    ],
    faqs: [
      { question: 'Does SwissCleanMove offer moves in Basel?', answer: 'Yes, we offer moving, furniture transport and office relocations in Basel.' },
      { question: 'Is cleaning service available in Basel?', answer: 'Yes, we offer final cleaning, maintenance cleaning, office cleaning and restaurant cleaning.' },
      { question: 'Does SwissCleanMove work in Basel-Stadt and Basel-Landschaft?', answer: 'Yes, we work in both regions.' }
    ],
    mapQuery: 'Basel,Switzerland'
  },
  fr: {
    slug: 'basel', regionName: 'Bâle',
    seoTitle: 'Déménagement Bâle | Nettoyage Bâle | SwissCleanMove',
    metaDescription: 'Déménagement professionnel, nettoyage, facility services et débarras à Bâle-Ville et Bâle-Campagne.',
    h1: 'Déménagement & Nettoyage à Bâle',
    highSeoKeywords: ['Déménagement Bâle','Nettoyage Bâle'],
    localKeywords: ['Basel','Basel-Stadt','Basel-Landschaft','Allschwil','Binningen','Bottmingen','Muttenz','Münchenstein','Reinach','Pratteln'],
    introParagraphs: [
      'SwissCleanMove propose déménagement, nettoyage de fin de bail, nettoyage d\'entretien, facility services et débarras à Bâle et environs.',
      'Nous intervenons à Bâle-Ville, Bâle-Campagne, Allschwil, Binningen, Bottmingen, Muttenz, Münchenstein, Reinach et Pratteln.'
    ],
    faqs: [
      { question: 'SwissCleanMove propose-t-il des déménagements à Bâle?', answer: 'Oui, nous proposons déménagement, transport de meubles et déménagement d\'entreprise à Bâle.' },
      { question: 'Y a-t-il un service de nettoyage à Bâle?', answer: 'Oui, nous proposons nettoyage de fin de bail, nettoyage d\'entretien et nettoyage de bureaux.' },
      { question: 'Travaillez-vous à Bâle-Ville et Bâle-Campagne?', answer: 'Oui, nous travaillons dans les deux régions.' }
    ],
    mapQuery: 'Basel,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.de;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/basel` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.de} locale={locale} />;
}
