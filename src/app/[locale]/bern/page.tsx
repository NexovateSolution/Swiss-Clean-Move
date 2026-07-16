import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  de: {
    slug: 'bern', regionName: 'Kanton Bern',
    seoTitle: 'Umzug Bern | Reinigungsfirma Bern | SwissCleanMove',
    metaDescription: 'Professioneller Umzug, Umzugsreinigung, Endreinigung mit Abnahmegarantie, Unterhaltsreinigung, Facility Services und Entsorgung im Kanton Bern.',
    h1: 'Umzug & Reinigungsfirma im Kanton Bern',
    highSeoKeywords: ['Umzug Bern','Umzugsfirma Bern','Umzugsunternehmen Bern','Reinigungsfirma Bern','Umzugsreinigung Bern','Endreinigung Bern','Unterhaltsreinigung Bern','Büroreinigung Bern','Gastronomie Reinigung Bern','Facility Services Bern','Hauswartung Bern','Entsorgung Bern','Räumung Bern'],
    localKeywords: ['Bern','Biel/Bienne','Thun','Lyss','Burgdorf','Langenthal','Nidau','Brügg','Ipsach','Aarberg','Pieterlen'],
    introParagraphs: [
      'SwissCleanMove ist Ihr professioneller Partner für Umzug, Reinigung, Umzugsreinigung mit Abnahmegarantie, Unterhaltsreinigung, Gastronomie Reinigung, Facility Services, Hauswartung und Entsorgung im gesamten Kanton Bern.',
      'Wir unterstützen Privatkunden, Unternehmen, Verwaltungen und Gastronomiebetriebe in Bern, Biel/Bienne, Thun, Burgdorf, Langenthal, Lyss, Nidau, Brügg, Ipsach, Aarberg und Pieterlen. Mit zuverlässigem Service, sauberer Planung und Schweizer Qualitätsstandard bietet SwissCleanMove professionelle Lösungen für Umzug, Reinigung und Gebäudeunterhalt.'
    ],
    faqs: [
      { question: 'Was kostet ein Umzug im Kanton Bern?', answer: 'Die Kosten hängen von Wohnungsgrösse, Distanz, Stockwerk, Lift und Aufwand ab.' },
      { question: 'Bietet SwissCleanMove Reinigung in Bern an?', answer: 'Ja, wir bieten Umzugsreinigung, Endreinigung, Unterhaltsreinigung, Büroreinigung und Gastronomie Reinigung.' },
      { question: 'Gibt es Facility Services im Kanton Bern?', answer: 'Ja, SwissCleanMove bietet Hauswartung, Gebäudeunterhalt und Facility Services im Kanton Bern.' }
    ],
    mapQuery: 'Canton+of+Bern,Switzerland'
  },
  en: {
    slug: 'bern', regionName: 'Canton of Bern',
    seoTitle: 'Moving Bern | Cleaning Company Bern | SwissCleanMove',
    metaDescription: 'Professional moving, move-out cleaning with guarantee, maintenance cleaning, facility services and disposal in the Canton of Bern.',
    h1: 'Moving & Cleaning Company in the Canton of Bern',
    highSeoKeywords: ['Moving Bern','Moving company Bern','Cleaning company Bern'],
    localKeywords: ['Bern','Biel/Bienne','Thun','Lyss','Burgdorf','Langenthal','Nidau','Brügg','Ipsach','Aarberg','Pieterlen'],
    introParagraphs: [
      'SwissCleanMove is your professional partner for moving, cleaning, move-out cleaning with handover guarantee, maintenance cleaning, restaurant cleaning, facility services, property maintenance and disposal throughout the Canton of Bern.',
      'We support private clients, businesses, administrations and restaurants in Bern, Biel/Bienne, Thun, Burgdorf, Langenthal, Lyss, Nidau, Brügg, Ipsach, Aarberg and Pieterlen.'
    ],
    faqs: [
      { question: 'How much does a move in Canton Bern cost?', answer: 'Costs depend on apartment size, distance, floor, elevator and effort required.' },
      { question: 'Does SwissCleanMove offer cleaning in Bern?', answer: 'Yes, we offer move-out cleaning, final cleaning, maintenance cleaning, office cleaning and restaurant cleaning.' },
      { question: 'Are facility services available in Canton Bern?', answer: 'Yes, SwissCleanMove offers property maintenance, building upkeep and facility services in Canton Bern.' }
    ],
    mapQuery: 'Canton+of+Bern,Switzerland'
  },
  fr: {
    slug: 'bern', regionName: 'Canton de Berne',
    seoTitle: 'Déménagement Berne | Nettoyage Berne | SwissCleanMove',
    metaDescription: 'Déménagement professionnel, nettoyage de fin de bail, nettoyage d\'entretien, facility services et débarras dans le canton de Berne.',
    h1: 'Déménagement & Nettoyage dans le Canton de Berne',
    highSeoKeywords: ['Déménagement Berne','Nettoyage Berne'],
    localKeywords: ['Bern','Biel/Bienne','Thun','Lyss','Burgdorf','Langenthal','Nidau','Brügg','Ipsach','Aarberg','Pieterlen'],
    introParagraphs: [
      'SwissCleanMove est votre partenaire professionnel pour le déménagement, le nettoyage, le nettoyage de fin de bail avec garantie, le nettoyage d\'entretien, le nettoyage gastronomie, les facility services et le débarras dans tout le canton de Berne.',
      'Nous accompagnons les particuliers, entreprises et administrations à Berne, Bienne, Thoune, Berthoud, Langenthal, Lyss, Nidau, Brügg, Ipsach, Aarberg et Pieterlen.'
    ],
    faqs: [
      { question: 'Combien coûte un déménagement dans le canton de Berne?', answer: 'Les coûts dépendent de la taille de l\'appartement, de la distance, de l\'étage et de l\'effort requis.' },
      { question: 'SwissCleanMove propose-t-il du nettoyage à Berne?', answer: 'Oui, nous proposons le nettoyage de fin de bail, nettoyage d\'entretien, nettoyage de bureaux et nettoyage gastronomie.' },
      { question: 'Y a-t-il des facility services dans le canton de Berne?', answer: 'Oui, SwissCleanMove propose conciergerie, entretien d\'immeuble et facility services dans le canton de Berne.' }
    ],
    mapQuery: 'Canton+of+Bern,Switzerland'
  }
,
  it: {
    slug: 'bern', regionName: 'Cantone di Berna',
    seoTitle: 'Muoversi a Berna | Impresa di pulizie Berna | SwissCleanMove',
    metaDescription: 'Traslochi professionali, pulizie di trasloco con garanzia, pulizie di manutenzione, servizi di strutture e smaltimento nel Canton Berna.',
    h1: 'Impresa di traslochi e pulizie nel Canton Berna',
    highSeoKeywords: ['Berna in movimento','Ditta di traslochi Berna','Impresa di pulizie Berna'],
    localKeywords: ['Bern','Biel/Bienne','Thun','Lyss','Burgdorf','Langenthal','Nidau','Brügg','Ipsach','Aarberg','Pieterlen'],
    introParagraphs: [
      'SwissCleanMove è il vostro partner professionale per traslochi, pulizie, pulizie di trasloco con garanzia di consegna, pulizie di manutenzione, pulizie di ristoranti, servizi di strutture, manutenzione e smaltimento di immobili in tutto il Canton Berna.',
      'Supportiamo clienti privati, aziende, amministrazioni e ristoranti a Berna, Biel/Bienne, Thun, Burgdorf, Langenthal, Lyss, Nidau, Brügg, Ipsach, Aarberg e Pieterlen.',
    ],
    faqs: [
      { question: 'Quanto costa un trasloco nel Canton Berna?', answer: 'I costi dipendono dalle dimensioni dell\'appartamento, dalla distanza, dal piano, dall\'ascensore e dallo sforzo richiesto.' },
      { question: 'SwissCleanMove offre pulizie a Berna?', answer: 'Sì, offriamo pulizia di trasloco, pulizia finale, pulizia di manutenzione, pulizia di uffici e pulizia di ristoranti.' },
      { question: 'Sono disponibili servizi per le strutture nel Canton Berna?', answer: 'Sì, SwissCleanMove offre servizi di manutenzione immobiliare, manutenzione degli edifici e strutture nel Canton Berna.' },
    ],
    mapQuery: 'Canton+of+Bern,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.de;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/bern` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.de} locale={locale} />;
}
