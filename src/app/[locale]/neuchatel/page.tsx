import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  fr: {
    slug: 'neuchatel', regionName: 'Neuchâtel',
    seoTitle: 'Déménagement Neuchâtel | Nettoyage Neuchâtel | SwissCleanMove',
    metaDescription: 'Déménagement professionnel, nettoyage de fin de bail, nettoyage d\'entretien, facility services et débarras à Neuchâtel.',
    h1: 'Déménagement & Nettoyage professionnel à Neuchâtel',
    highSeoKeywords: ['Déménagement Neuchâtel','entreprise de déménagement Neuchâtel','nettoyage Neuchâtel','nettoyage fin de bail Neuchâtel','nettoyage bureaux Neuchâtel','facility services Neuchâtel','débarras Neuchâtel'],
    localKeywords: ['Neuchâtel','La Chaux-de-Fonds','Le Locle','Boudry','Val-de-Ruz','Cortaillod'],
    introParagraphs: [
      'SwissCleanMove propose des déménagements professionnels, le nettoyage de fin de bail, le nettoyage d\'entretien, les facility services, l\'entretien d\'immeubles et le débarras dans le canton de Neuchâtel.',
      'Nous intervenons à Neuchâtel, La Chaux-de-Fonds, Le Locle, Boudry, Val-de-Ruz et Cortaillod. SwissCleanMove accompagne les particuliers, entreprises, restaurants et régies avec des services fiables, soignés et professionnels.'
    ],
    faqs: [
      { question: 'SwissCleanMove propose-t-il un déménagement à Neuchâtel?', answer: 'Oui, nous proposons des déménagements professionnels à Neuchâtel.' },
      { question: 'Proposez-vous le nettoyage de fin de bail?', answer: 'Oui, nous proposons le nettoyage de fin de bail avec garantie de remise.' },
      { question: 'Travaillez-vous à La Chaux-de-Fonds?', answer: 'Oui, nous travaillons à La Chaux-de-Fonds, Le Locle et dans tout le canton.' }
    ],
    mapQuery: 'Neuchatel,Switzerland'
  },
  de: {
    slug: 'neuchatel', regionName: 'Neuenburg',
    seoTitle: 'Umzug Neuenburg | Reinigungsfirma Neuenburg | SwissCleanMove',
    metaDescription: 'Professioneller Umzug, Endreinigung, Unterhaltsreinigung, Facility Services und Entsorgung im Kanton Neuenburg.',
    h1: 'Umzug & Reinigungsfirma im Kanton Neuenburg',
    highSeoKeywords: ['Umzug Neuenburg','Umzugsfirma Neuenburg','Reinigungsfirma Neuenburg','Endreinigung Neuenburg','Facility Services Neuenburg'],
    localKeywords: ['Neuchâtel','La Chaux-de-Fonds','Le Locle','Boudry','Val-de-Ruz','Cortaillod'],
    introParagraphs: [
      'SwissCleanMove bietet professionelle Umzüge, Endreinigung, Unterhaltsreinigung, Facility Services und Entsorgung im Kanton Neuenburg.',
      'Wir arbeiten in Neuenburg, La Chaux-de-Fonds, Le Locle, Boudry, Val-de-Ruz und Cortaillod. Zweisprachiger Service in Französisch und Deutsch.'
    ],
    faqs: [
      { question: 'Bietet SwissCleanMove Umzug in Neuenburg an?', answer: 'Ja, wir bieten professionelle Umzüge in Neuenburg an.' },
      { question: 'Gibt es Endreinigung mit Abnahmegarantie?', answer: 'Ja, wir bieten Endreinigung mit Abnahmegarantie.' },
      { question: 'Arbeitet SwissCleanMove in La Chaux-de-Fonds?', answer: 'Ja, wir arbeiten in La Chaux-de-Fonds, Le Locle und im ganzen Kanton.' }
    ],
    mapQuery: 'Neuchatel,Switzerland'
  },
  en: {
    slug: 'neuchatel', regionName: 'Neuchâtel',
    seoTitle: 'Moving Neuchâtel | Cleaning Company Neuchâtel | SwissCleanMove',
    metaDescription: 'Professional moving, end-of-lease cleaning, maintenance cleaning, facility services and disposal in Neuchâtel.',
    h1: 'Moving & Professional Cleaning in Neuchâtel',
    highSeoKeywords: ['Moving Neuchâtel','Cleaning Neuchâtel'],
    localKeywords: ['Neuchâtel','La Chaux-de-Fonds','Le Locle','Boudry','Val-de-Ruz','Cortaillod'],
    introParagraphs: [
      'SwissCleanMove offers professional moves, end-of-lease cleaning, maintenance cleaning, facility services, building maintenance and disposal in the Canton of Neuchâtel.',
      'We work in Neuchâtel, La Chaux-de-Fonds, Le Locle, Boudry, Val-de-Ruz and Cortaillod. Bilingual service in French and German.'
    ],
    faqs: [
      { question: 'Does SwissCleanMove offer moving in Neuchâtel?', answer: 'Yes, we offer professional moves in Neuchâtel.' },
      { question: 'Do you offer end-of-lease cleaning?', answer: 'Yes, we offer end-of-lease cleaning with handover guarantee.' },
      { question: 'Do you work in La Chaux-de-Fonds?', answer: 'Yes, we work in La Chaux-de-Fonds, Le Locle and throughout the canton.' }
    ],
    mapQuery: 'Neuchatel,Switzerland'
  },
  it: {
    slug: 'neuchatel', regionName: 'Neuchâtel',
    seoTitle: 'Trasloco Neuchâtel | Impresa di pulizie Neuchâtel | SwissCleanMove',
    metaDescription: 'Traslochi professionali, pulizie di fine locazione, pulizie di manutenzione, facility services e smaltimento a Neuchâtel.',
    h1: 'Traslochi & Pulizie professionali a Neuchâtel',
    highSeoKeywords: ['Trasloco Neuchâtel','Pulizie Neuchâtel'],
    localKeywords: ['Neuchâtel','La Chaux-de-Fonds','Le Locle','Boudry','Val-de-Ruz','Cortaillod'],
    introParagraphs: [
      'SwissCleanMove offre traslochi professionali, pulizie di fine locazione, pulizie di manutenzione, facility services, manutenzione immobili e smaltimento nel Canton Neuchâtel.',
      'Operiamo a Neuchâtel, La Chaux-de-Fonds, Le Locle, Boudry, Val-de-Ruz e Cortaillod. Servizio bilingue in francese e tedesco.'
    ],
    faqs: [
      { question: 'SwissCleanMove offre traslochi a Neuchâtel?', answer: 'Sì, offriamo traslochi professionali a Neuchâtel.' },
      { question: 'Offrite pulizie di fine locazione?', answer: 'Sì, offriamo pulizie di fine locazione con garanzia di consegna.' },
      { question: 'Lavorate a La Chaux-de-Fonds?', answer: 'Sì, lavoriamo a La Chaux-de-Fonds, Le Locle e in tutto il cantone.' }
    ],
    mapQuery: 'Neuchatel,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.fr;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/neuchatel` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.fr} locale={locale} />;
}
