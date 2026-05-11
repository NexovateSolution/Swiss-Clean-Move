import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  de: {
    slug: 'jura', regionName: 'Kanton Jura',
    seoTitle: 'Umzug Jura | Reinigungsfirma Jura | SwissCleanMove',
    metaDescription: 'Professioneller Umzug, Reinigung, Facility Services, Hauswartung und Entsorgung im Kanton Jura.',
    h1: 'Umzug & Reinigungsfirma im Kanton Jura',
    highSeoKeywords: ['Umzug Jura','Umzugsfirma Jura','Reinigungsfirma Jura','Umzugsreinigung Jura','Endreinigung Jura','Unterhaltsreinigung Jura','Facility Services Jura','Hauswartung Jura','Entsorgung Jura'],
    localKeywords: ['Delémont','Porrentruy','Saignelégier','Courgenay','Bassecourt'],
    introParagraphs: [
      'SwissCleanMove bietet Umzug, Reinigung, Unterhaltsreinigung, Facility Services, Hauswartung und Entsorgung im Kanton Jura.',
      'Wir bedienen Delémont, Porrentruy, Saignelégier, Courgenay und Bassecourt. SwissCleanMove bietet professionelle Unterstützung für Umzüge, Endreinigung, Gebäudeunterhalt, Räumung und Entsorgung.'
    ],
    faqs: [
      { question: 'Bietet SwissCleanMove Umzug im Jura an?', answer: 'Ja, wir bieten professionelle Umzüge im Kanton Jura.' },
      { question: 'Gibt es Reinigungsfirma Jura?', answer: 'Ja, SwissCleanMove bietet Reinigung, Endreinigung und Unterhaltsreinigung.' },
      { question: 'Arbeitet SwissCleanMove in Delémont und Porrentruy?', answer: 'Ja, wir arbeiten in Delémont, Porrentruy und Umgebung.' }
    ],
    mapQuery: 'Canton+of+Jura,Switzerland'
  },
  en: {
    slug: 'jura', regionName: 'Canton of Jura',
    seoTitle: 'Moving Jura | Cleaning Company Jura | SwissCleanMove',
    metaDescription: 'Professional moving, cleaning, facility services, property maintenance and disposal in Canton Jura.',
    h1: 'Moving & Cleaning Company in Canton Jura',
    highSeoKeywords: ['Moving Jura','Cleaning Jura'],
    localKeywords: ['Delémont','Porrentruy','Saignelégier','Courgenay','Bassecourt'],
    introParagraphs: [
      'SwissCleanMove offers moving, cleaning, maintenance cleaning, facility services, property maintenance and disposal in the Canton of Jura.',
      'We serve Delémont, Porrentruy, Saignelégier, Courgenay and Bassecourt.'
    ],
    faqs: [
      { question: 'Does SwissCleanMove offer moving in Jura?', answer: 'Yes, we offer professional moves in the Canton of Jura.' },
      { question: 'Is there a cleaning company in Jura?', answer: 'Yes, SwissCleanMove offers cleaning, final cleaning and maintenance cleaning.' },
      { question: 'Does SwissCleanMove work in Delémont and Porrentruy?', answer: 'Yes, we work in Delémont, Porrentruy and surrounding areas.' }
    ],
    mapQuery: 'Canton+of+Jura,Switzerland'
  },
  fr: {
    slug: 'jura', regionName: 'Canton du Jura',
    seoTitle: 'Déménagement Jura | Nettoyage Jura | SwissCleanMove',
    metaDescription: 'Déménagement professionnel, nettoyage, facility services et débarras dans le canton du Jura.',
    h1: 'Déménagement & Nettoyage dans le Canton du Jura',
    highSeoKeywords: ['Déménagement Jura','Nettoyage Jura'],
    localKeywords: ['Delémont','Porrentruy','Saignelégier','Courgenay','Bassecourt'],
    introParagraphs: [
      'SwissCleanMove propose déménagement, nettoyage, facility services et débarras dans le canton du Jura.',
      'Nous desservons Delémont, Porrentruy, Saignelégier, Courgenay et Bassecourt.'
    ],
    faqs: [
      { question: 'SwissCleanMove propose-t-il un déménagement dans le Jura?', answer: 'Oui, nous proposons des déménagements professionnels dans le canton du Jura.' },
      { question: 'Y a-t-il une entreprise de nettoyage dans le Jura?', answer: 'Oui, SwissCleanMove propose nettoyage, nettoyage de fin de bail et nettoyage d\'entretien.' },
      { question: 'Travaillez-vous à Delémont et Porrentruy?', answer: 'Oui, nous travaillons à Delémont, Porrentruy et environs.' }
    ],
    mapQuery: 'Canton+of+Jura,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.de;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/jura` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.de} locale={locale} />;
}
