import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  fr: {
    slug: 'lausanne-vaud', regionName: 'Lausanne & Vaud',
    seoTitle: 'Déménagement Lausanne | Nettoyage Lausanne | SwissCleanMove',
    metaDescription: 'Déménagement professionnel, nettoyage de fin de bail, nettoyage d\'entretien, facility services et débarras à Lausanne et Vaud.',
    h1: 'Déménagement & Nettoyage à Lausanne et Vaud',
    highSeoKeywords: ['Déménagement Lausanne','déménagement Vaud','entreprise de déménagement Lausanne','nettoyage Lausanne','nettoyage fin de bail Lausanne','nettoyage bureaux Lausanne','facility services Lausanne','débarras Lausanne'],
    localKeywords: ['Lausanne','Vaud','Vevey','Montreux','Nyon','Yverdon-les-Bains','Morges','Renens'],
    introParagraphs: [
      'SwissCleanMove propose déménagement, nettoyage de fin de bail, nettoyage d\'entretien, nettoyage de bureaux, facility services, entretien d\'immeubles et débarras à Lausanne et dans le canton de Vaud.',
      'Nous intervenons à Lausanne, Vevey, Montreux, Nyon, Yverdon-les-Bains, Morges et Renens. SwissCleanMove offre un service professionnel pour les particuliers, entreprises, restaurants et régies immobilières.'
    ],
    faqs: [
      { question: 'SwissCleanMove propose-t-il un déménagement à Lausanne?', answer: 'Oui, nous proposons des déménagements professionnels à Lausanne et dans le canton de Vaud.' },
      { question: 'Proposez-vous le nettoyage de fin de bail?', answer: 'Oui, nous proposons un nettoyage de fin de bail professionnel.' },
      { question: 'Travaillez-vous aussi à Vevey, Montreux et Nyon?', answer: 'Oui, nous intervenons à Vevey, Montreux, Nyon et dans toute la région.' }
    ],
    mapQuery: 'Lausanne,Vaud,Switzerland'
  },
  de: {
    slug: 'lausanne-vaud', regionName: 'Lausanne & Waadt',
    seoTitle: 'Umzug Lausanne | Reinigung Lausanne | SwissCleanMove',
    metaDescription: 'Professioneller Umzug, Reinigung, Facility Services und Entsorgung in Lausanne und Waadt.',
    h1: 'Umzug & Reinigung in Lausanne und Waadt',
    highSeoKeywords: ['Umzug Lausanne','Umzug Waadt','Reinigung Lausanne'],
    localKeywords: ['Lausanne','Vaud','Vevey','Montreux','Nyon','Yverdon-les-Bains','Morges','Renens'],
    introParagraphs: [
      'SwissCleanMove bietet Umzug, Endreinigung, Unterhaltsreinigung, Facility Services und Entsorgung in Lausanne und im Kanton Waadt.',
      'Wir arbeiten in Lausanne, Vevey, Montreux, Nyon, Yverdon-les-Bains, Morges und Renens.'
    ],
    faqs: [
      { question: 'Bietet SwissCleanMove Umzug in Lausanne an?', answer: 'Ja, wir bieten Umzüge in Lausanne und im Kanton Waadt.' },
      { question: 'Gibt es Endreinigung mit Abnahmegarantie?', answer: 'Ja, wir bieten professionelle Endreinigung.' },
      { question: 'Arbeitet SwissCleanMove in Vevey und Montreux?', answer: 'Ja, wir arbeiten in Vevey, Montreux, Nyon und der ganzen Region.' }
    ],
    mapQuery: 'Lausanne,Vaud,Switzerland'
  },
  en: {
    slug: 'lausanne-vaud', regionName: 'Lausanne & Vaud',
    seoTitle: 'Moving Lausanne | Cleaning Lausanne | SwissCleanMove',
    metaDescription: 'Professional moving, end-of-lease cleaning, facility services and disposal in Lausanne and Vaud.',
    h1: 'Moving & Cleaning in Lausanne and Vaud',
    highSeoKeywords: ['Moving Lausanne','Cleaning Lausanne'],
    localKeywords: ['Lausanne','Vaud','Vevey','Montreux','Nyon','Yverdon-les-Bains','Morges','Renens'],
    introParagraphs: [
      'SwissCleanMove offers moving, end-of-lease cleaning, maintenance cleaning, office cleaning, facility services, building maintenance and disposal in Lausanne and Canton Vaud.',
      'We work in Lausanne, Vevey, Montreux, Nyon, Yverdon-les-Bains, Morges and Renens.'
    ],
    faqs: [
      { question: 'Does SwissCleanMove offer moving in Lausanne?', answer: 'Yes, we offer professional moves in Lausanne and Canton Vaud.' },
      { question: 'Do you offer end-of-lease cleaning?', answer: 'Yes, we offer professional end-of-lease cleaning.' },
      { question: 'Do you work in Vevey, Montreux and Nyon?', answer: 'Yes, we work in Vevey, Montreux, Nyon and throughout the region.' }
    ],
    mapQuery: 'Lausanne,Vaud,Switzerland'
  },
  it: {
    slug: 'lausanne-vaud', regionName: 'Losanna & Vaud',
    seoTitle: 'Trasloco Losanna | Pulizie Losanna | SwissCleanMove',
    metaDescription: 'Traslochi professionali, pulizie di fine locazione, servizi di facility e smaltimento a Losanna e Vaud.',
    h1: 'Traslochi & Pulizie a Losanna e Vaud',
    highSeoKeywords: ['Trasloco Losanna','Pulizie Losanna'],
    localKeywords: ['Lausanne','Vaud','Vevey','Montreux','Nyon','Yverdon-les-Bains','Morges','Renens'],
    introParagraphs: [
      'SwissCleanMove offre traslochi, pulizie di fine locazione, pulizie di manutenzione, pulizie uffici, facility services, manutenzione immobili e smaltimento a Losanna e nel Canton Vaud.',
      'Operiamo a Losanna, Vevey, Montreux, Nyon, Yverdon-les-Bains, Morges e Renens.'
    ],
    faqs: [
      { question: 'SwissCleanMove offre traslochi a Losanna?', answer: 'Sì, offriamo traslochi professionali a Losanna e nel Canton Vaud.' },
      { question: 'Offrite pulizie di fine locazione?', answer: 'Sì, offriamo pulizie di fine locazione professionali.' },
      { question: 'Lavorate anche a Vevey, Montreux e Nyon?', answer: 'Sì, operiamo a Vevey, Montreux, Nyon e in tutta la regione.' }
    ],
    mapQuery: 'Lausanne,Vaud,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.fr;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/lausanne-vaud` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.fr} locale={locale} />;
}
