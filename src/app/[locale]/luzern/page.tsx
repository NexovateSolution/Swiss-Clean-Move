import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  de: {
    slug: 'luzern', regionName: 'Luzern',
    seoTitle: 'Umzug Luzern | Reinigungsfirma Luzern | SwissCleanMove',
    metaDescription: 'Professioneller Umzug, Reinigung, Umzugsreinigung, Unterhaltsreinigung, Facility Services und Entsorgung in Luzern.',
    h1: 'Umzug & Reinigungsfirma in Luzern',
    highSeoKeywords: ['Umzug Luzern','Umzugsfirma Luzern','Reinigungsfirma Luzern','Umzugsreinigung Luzern','Endreinigung Luzern','Unterhaltsreinigung Luzern','Büroreinigung Luzern','Gastronomie Reinigung Luzern','Facility Services Luzern','Hauswartung Luzern','Entsorgung Luzern'],
    localKeywords: ['Luzern','Emmen','Kriens','Horw','Sursee','Ebikon','Rothenburg'],
    introParagraphs: [
      'SwissCleanMove bietet professionelle Umzüge, Umzugsreinigung mit Abnahmegarantie, Unterhaltsreinigung, Büroreinigung, Facility Services, Hauswartung und Entsorgung in Luzern und Umgebung.',
      'Wir bedienen Luzern, Emmen, Kriens, Horw, Sursee, Ebikon und Rothenburg. Mit SwissCleanMove erhalten Kunden professionelle Unterstützung für Umzug, Reinigung und Gebäudeunterhalt aus einer Hand.'
    ],
    faqs: [
      { question: 'Bietet SwissCleanMove Umzug in Luzern an?', answer: 'Ja, wir bieten Umzug, Transport und Firmenumzug in Luzern.' },
      { question: 'Gibt es Reinigungsfirma Luzern?', answer: 'Ja, SwissCleanMove bietet professionelle Reinigung in Luzern.' },
      { question: 'Welche Dienstleistungen gibt es?', answer: 'Umzug, Umzugsreinigung, Unterhaltsreinigung, Facility Services, Hauswartung und Entsorgung.' }
    ],
    mapQuery: 'Lucerne,Switzerland'
  },
  en: {
    slug: 'luzern', regionName: 'Lucerne',
    seoTitle: 'Moving Lucerne | Cleaning Company Lucerne | SwissCleanMove',
    metaDescription: 'Professional moving, cleaning, move-out cleaning, maintenance cleaning, facility services and disposal in Lucerne.',
    h1: 'Moving & Cleaning Company in Lucerne',
    highSeoKeywords: ['Moving Lucerne','Cleaning company Lucerne'],
    localKeywords: ['Luzern','Emmen','Kriens','Horw','Sursee','Ebikon','Rothenburg'],
    introParagraphs: [
      'SwissCleanMove offers professional moves, move-out cleaning with handover guarantee, maintenance cleaning, office cleaning, facility services, property maintenance and disposal in Lucerne and surrounding areas.',
      'We serve Lucerne, Emmen, Kriens, Horw, Sursee, Ebikon and Rothenburg. With SwissCleanMove, clients receive professional support for moving, cleaning and building maintenance from one provider.'
    ],
    faqs: [
      { question: 'Does SwissCleanMove offer moving in Lucerne?', answer: 'Yes, we offer moving, transport and office relocations in Lucerne.' },
      { question: 'Is there a cleaning company in Lucerne?', answer: 'Yes, SwissCleanMove offers professional cleaning in Lucerne.' },
      { question: 'What services are available?', answer: 'Moving, move-out cleaning, maintenance cleaning, facility services, property maintenance and disposal.' }
    ],
    mapQuery: 'Lucerne,Switzerland'
  },
  fr: {
    slug: 'luzern', regionName: 'Lucerne',
    seoTitle: 'Déménagement Lucerne | Nettoyage Lucerne | SwissCleanMove',
    metaDescription: 'Déménagement professionnel, nettoyage, facility services et débarras à Lucerne.',
    h1: 'Déménagement & Nettoyage à Lucerne',
    highSeoKeywords: ['Déménagement Lucerne','Nettoyage Lucerne'],
    localKeywords: ['Luzern','Emmen','Kriens','Horw','Sursee','Ebikon','Rothenburg'],
    introParagraphs: [
      'SwissCleanMove propose des déménagements professionnels, nettoyage de fin de bail, facility services et débarras à Lucerne et environs.',
      'Nous desservons Lucerne, Emmen, Kriens, Horw, Sursee, Ebikon et Rothenburg.'
    ],
    faqs: [
      { question: 'SwissCleanMove propose-t-il un déménagement à Lucerne?', answer: 'Oui, nous proposons déménagement, transport et déménagement d\'entreprise à Lucerne.' },
      { question: 'Y a-t-il une entreprise de nettoyage à Lucerne?', answer: 'Oui, SwissCleanMove propose du nettoyage professionnel à Lucerne.' },
      { question: 'Quels services sont disponibles?', answer: 'Déménagement, nettoyage de fin de bail, nettoyage d\'entretien, facility services et débarras.' }
    ],
    mapQuery: 'Lucerne,Switzerland'
  }
,
  it: {
    slug: 'luzern', regionName: 'Lucerna',
    seoTitle: 'Muoversi a Lucerna | Impresa di pulizie Lucerna | SwissCleanMove',
    metaDescription: 'Traslochi professionali, pulizie, pulizie di trasloco, pulizie di manutenzione, servizi di strutture e smaltimento a Lucerna.',
    h1: 'Impresa di traslochi e pulizie a Lucerna',
    highSeoKeywords: ['Spostamento di Lucerna','Impresa di pulizie Lucerna'],
    localKeywords: ['Luzern','Emmen','Kriens','Horw','Sursee','Ebikon','Rothenburg'],
    introParagraphs: [
      'SwissCleanMove offre traslochi professionali, pulizie di trasloco con garanzia di consegna, pulizie di mantenimento, pulizie di uffici, servizi di strutture, manutenzione e smaltimento di immobili a Lucerna e dintorni.',
      'Serviamo Lucerna, Emmen, Kriens, Horw, Sursee, Ebikon e Rothenburg. Con SwissCleanMove i clienti ricevono supporto professionale per traslochi, pulizia e manutenzione degli edifici da un unico fornitore.',
    ],
    faqs: [
      { question: 'SwissCleanMove offre traslochi a Lucerna?', answer: 'Sì, offriamo traslochi, trasporti e traslochi di uffici a Lucerna.' },
      { question: 'Esiste un\'impresa di pulizie a Lucerna?', answer: 'Sì, SwissCleanMove offre pulizie professionali a Lucerna.' },
      { question: 'Quali servizi sono disponibili?', answer: 'Traslochi, pulizie di trasloco, pulizie di manutenzione, servizi di struttura, manutenzione e smaltimento immobili.' },
    ],
    mapQuery: 'Lucerne,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.de;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/luzern` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.de} locale={locale} />;
}
