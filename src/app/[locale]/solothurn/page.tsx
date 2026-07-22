import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  de: {
    slug: 'solothurn', regionName: 'Solothurn',
    seoTitle: 'Umzug Solothurn | Reinigungsfirma Solothurn | SwissCleanMove',
    metaDescription: 'Umzug, Umzugsreinigung, Unterhaltsreinigung, Facility Services, Hauswartung und Entsorgung in Solothurn.',
    h1: 'Umzug & Reinigungsfirma in Solothurn',
    highSeoKeywords: ['Umzug Solothurn','Umzugsfirma Solothurn','Reinigungsfirma Solothurn','Umzugsreinigung Solothurn','Endreinigung Solothurn','Unterhaltsreinigung Solothurn','Facility Services Solothurn','Hauswartung Solothurn','Entsorgung Solothurn'],
    localKeywords: ['Solothurn','Grenchen','Olten','Zuchwil','Derendingen','Oensingen'],
    introParagraphs: [
      'SwissCleanMove bietet Umzug, Reinigung, Unterhaltsreinigung, Facility Services, Hauswartung und Entsorgung in Solothurn und Umgebung.',
      'Wir arbeiten in Solothurn, Grenchen, Olten, Zuchwil, Derendingen und Oensingen. SwissCleanMove unterstützt Sie bei Privatumzügen, Firmenumzügen, Endreinigung, Büroreinigung, Gebäudeunterhalt und fachgerechter Entsorgung.',
      'Suchen Sie eine professionelle Reinigungsfirma in Solothurn? Besuchen Sie unsere Seite Reinigungsfirma Solothurn für alle Details zu Endreinigung, Unterhaltsreinigung und Spezialreinigung im Kanton Solothurn.'
    ],
    faqs: [
      { question: 'Bietet SwissCleanMove Umzug in Solothurn an?', answer: 'Ja, wir bieten professionelle Umzüge in Solothurn und Umgebung.' },
      { question: 'Gibt es Reinigung nach dem Umzug?', answer: 'Ja, wir bieten Umzugsreinigung und Endreinigung.' },
      { question: 'Arbeitet SwissCleanMove auch in Grenchen und Olten?', answer: 'Ja, wir arbeiten in Grenchen, Olten und weiteren Orten im Kanton Solothurn.' }
    ],
    mapQuery: 'Solothurn,Switzerland'
  },
  en: {
    slug: 'solothurn', regionName: 'Solothurn',
    seoTitle: 'Moving Solothurn | Cleaning Company Solothurn | SwissCleanMove',
    metaDescription: 'Moving, move-out cleaning, maintenance cleaning, facility services, property maintenance and disposal in Solothurn.',
    h1: 'Moving & Cleaning Company in Solothurn',
    highSeoKeywords: ['Moving Solothurn','Cleaning company Solothurn'],
    localKeywords: ['Solothurn','Grenchen','Olten','Zuchwil','Derendingen','Oensingen'],
    introParagraphs: [
      'SwissCleanMove offers moving, cleaning, maintenance cleaning, facility services, property maintenance and disposal in Solothurn and surrounding areas.',
      'We work in Solothurn, Grenchen, Olten, Zuchwil, Derendingen and Oensingen. SwissCleanMove supports you with private moves, office relocations, final cleaning, office cleaning, building maintenance and professional disposal.',
      'Looking for a professional cleaning company in Solothurn? Visit our Cleaning Company Solothurn page for all details on end-of-tenancy cleaning, maintenance cleaning and specialist cleaning in Canton Solothurn.'
    ],
    faqs: [
      { question: 'Does SwissCleanMove offer moving in Solothurn?', answer: 'Yes, we offer professional moves in Solothurn and surrounding areas.' },
      { question: 'Is there cleaning after a move?', answer: 'Yes, we offer move-out cleaning and final cleaning.' },
      { question: 'Does SwissCleanMove work in Grenchen and Olten?', answer: 'Yes, we work in Grenchen, Olten and other locations in Canton Solothurn.' }
    ],
    mapQuery: 'Solothurn,Switzerland'
  },
  fr: {
    slug: 'solothurn', regionName: 'Soleure',
    seoTitle: 'Déménagement Soleure | Nettoyage Soleure | SwissCleanMove',
    metaDescription: 'Déménagement, nettoyage de fin de bail, facility services et débarras à Soleure.',
    h1: 'Déménagement & Nettoyage à Soleure',
    highSeoKeywords: ['Déménagement Soleure','Nettoyage Soleure'],
    localKeywords: ['Solothurn','Grenchen','Olten','Zuchwil','Derendingen','Oensingen'],
    introParagraphs: [
      'SwissCleanMove propose déménagement, nettoyage, facility services et débarras à Soleure et environs.',
      'Nous intervenons à Soleure, Granges, Olten, Zuchwil, Derendingen et Oensingen.',
      'Vous recherchez une entreprise de nettoyage professionnelle à Soleure ? Visitez notre page Entreprise de nettoyage Soleure pour tous les détails sur le nettoyage de fin de bail, le nettoyage d\'entretien et le nettoyage spécialisé dans le canton de Soleure.'
    ],
    faqs: [
      { question: 'SwissCleanMove propose-t-il un déménagement à Soleure?', answer: 'Oui, nous proposons des déménagements professionnels à Soleure et environs.' },
      { question: 'Y a-t-il un nettoyage après le déménagement?', answer: 'Oui, nous proposons le nettoyage de fin de bail et le nettoyage final.' },
      { question: 'Travaillez-vous à Granges et Olten?', answer: 'Oui, nous travaillons à Granges, Olten et dans tout le canton de Soleure.' }
    ],
    mapQuery: 'Solothurn,Switzerland'
  },
  it: {
    slug: 'solothurn', regionName: 'Soletta',
    seoTitle: 'Muoversi a Soletta | Impresa di pulizie Soletta | SwissCleanMove',
    metaDescription: 'Traslochi, pulizie di trasloco, pulizie di manutenzione, servizi di strutture, manutenzione e smaltimento immobili a Soletta.',
    h1: 'Impresa di traslochi e pulizie a Soletta',
    highSeoKeywords: ['Movimento a Soletta','Impresa di pulizie Soletta'],
    localKeywords: ['Solothurn','Grenchen','Olten','Zuchwil','Derendingen','Oensingen'],
    introParagraphs: [
      'SwissCleanMove offre traslochi, pulizie, pulizie manutentive, servizi per strutture, manutenzione e smaltimento di immobili a Soletta e dintorni.',
      'Lavoriamo a Soletta, Grenchen, Olten, Zuchwil, Derendingen e Oensingen. SwissCleanMove vi supporta con traslochi privati, traslochi di uffici, pulizie finali, pulizie di uffici, manutenzione di edifici e smaltimento professionale.',
      'Cercate un\'impresa di pulizie professionale a Soletta? Visitate la nostra pagina Impresa di pulizie Soletta per tutti i dettagli sulla pulizia di fine locazione, pulizia di manutenzione e pulizia specializzata nel Canton Soletta.'
    ],
    faqs: [
      { question: 'SwissCleanMove offre traslochi a Soletta?', answer: 'Sì, offriamo traslochi professionali a Soletta e dintorni.' },
      { question: 'È prevista la pulizia dopo un trasloco?', answer: 'Sì, offriamo la pulizia di trasloco e la pulizia finale.' },
      { question: 'SwissCleanMove funziona a Grenchen e Olten?', answer: 'Sì, lavoriamo a Grenchen, Olten e in altre località del Canton Soletta.' },
    ],
    mapQuery: 'Solothurn,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.de;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/solothurn` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.de} locale={locale} />;
}
