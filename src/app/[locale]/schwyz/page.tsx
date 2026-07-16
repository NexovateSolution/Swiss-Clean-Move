import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  de: {
    slug: 'schwyz', regionName: 'Kanton Schwyz',
    seoTitle: 'Umzug Schwyz | Reinigungsfirma Schwyz | SwissCleanMove',
    metaDescription: 'Professioneller Umzug, Umzugsreinigung, Unterhaltsreinigung, Facility Services und Entsorgung im Kanton Schwyz.',
    h1: 'Umzug & Reinigungsfirma im Kanton Schwyz',
    highSeoKeywords: ['Umzug Schwyz','Umzugsfirma Schwyz','Reinigungsfirma Schwyz','Umzugsreinigung Schwyz','Endreinigung Schwyz','Unterhaltsreinigung Schwyz','Facility Services Schwyz','Hauswartung Schwyz','Entsorgung Schwyz'],
    localKeywords: ['Schwyz','Freienbach','Einsiedeln','Küssnacht','Wollerau','Pfäffikon','Lachen'],
    introParagraphs: [
      'SwissCleanMove bietet professionelle Umzüge, Endreinigung, Unterhaltsreinigung, Facility Services, Hauswartung und Entsorgung im Kanton Schwyz.',
      'Wir arbeiten in Schwyz, Freienbach, Einsiedeln, Küssnacht, Wollerau, Pfäffikon und Lachen. SwissCleanMove bietet zuverlässige Leistungen für Privatkunden, Firmen und Verwaltungen.'
    ],
    faqs: [
      { question: 'Bietet SwissCleanMove Umzug in Schwyz an?', answer: 'Ja, wir bieten professionelle Umzüge im Kanton Schwyz.' },
      { question: 'Gibt es Reinigung und Hauswartung?', answer: 'Ja, wir bieten Unterhaltsreinigung, Hauswartung und Facility Services.' },
      { question: 'Arbeitet SwissCleanMove auch in Pfäffikon und Lachen?', answer: 'Ja, wir arbeiten auch in Pfäffikon, Lachen und Umgebung.' }
    ],
    mapQuery: 'Canton+of+Schwyz,Switzerland'
  },
  en: {
    slug: 'schwyz', regionName: 'Canton of Schwyz',
    seoTitle: 'Moving Schwyz | Cleaning Company Schwyz | SwissCleanMove',
    metaDescription: 'Professional moving, move-out cleaning, maintenance cleaning, facility services and disposal in Canton Schwyz.',
    h1: 'Moving & Cleaning Company in Canton Schwyz',
    highSeoKeywords: ['Moving Schwyz','Cleaning company Schwyz'],
    localKeywords: ['Schwyz','Freienbach','Einsiedeln','Küssnacht','Wollerau','Pfäffikon','Lachen'],
    introParagraphs: [
      'SwissCleanMove offers professional moves, final cleaning, maintenance cleaning, facility services, property maintenance and disposal in the Canton of Schwyz.',
      'We work in Schwyz, Freienbach, Einsiedeln, Küssnacht, Wollerau, Pfäffikon and Lachen. SwissCleanMove provides reliable services for private clients, businesses and administrations.'
    ],
    faqs: [
      { question: 'Does SwissCleanMove offer moving in Schwyz?', answer: 'Yes, we offer professional moves in the Canton of Schwyz.' },
      { question: 'Is cleaning and property maintenance available?', answer: 'Yes, we offer maintenance cleaning, property maintenance and facility services.' },
      { question: 'Does SwissCleanMove work in Pfäffikon and Lachen?', answer: 'Yes, we also work in Pfäffikon, Lachen and surrounding areas.' }
    ],
    mapQuery: 'Canton+of+Schwyz,Switzerland'
  },
  fr: {
    slug: 'schwyz', regionName: 'Canton de Schwyz',
    seoTitle: 'Déménagement Schwyz | Nettoyage Schwyz | SwissCleanMove',
    metaDescription: 'Déménagement professionnel, nettoyage, facility services et débarras dans le canton de Schwyz.',
    h1: 'Déménagement & Nettoyage dans le Canton de Schwyz',
    highSeoKeywords: ['Déménagement Schwyz','Nettoyage Schwyz'],
    localKeywords: ['Schwyz','Freienbach','Einsiedeln','Küssnacht','Wollerau','Pfäffikon','Lachen'],
    introParagraphs: [
      'SwissCleanMove propose des déménagements professionnels, nettoyage de fin de bail, facility services et débarras dans le canton de Schwyz.',
      'Nous intervenons à Schwyz, Freienbach, Einsiedeln, Küssnacht, Wollerau, Pfäffikon et Lachen.'
    ],
    faqs: [
      { question: 'SwissCleanMove propose-t-il un déménagement à Schwyz?', answer: 'Oui, nous proposons des déménagements professionnels dans le canton de Schwyz.' },
      { question: 'Y a-t-il du nettoyage et de la conciergerie?', answer: 'Oui, nous proposons nettoyage d\'entretien, conciergerie et facility services.' },
      { question: 'Travaillez-vous à Pfäffikon et Lachen?', answer: 'Oui, nous travaillons aussi à Pfäffikon, Lachen et environs.' }
    ],
    mapQuery: 'Canton+of+Schwyz,Switzerland'
  }
,
  it: {
    slug: 'schwyz', regionName: 'Cantone di Svitto',
    seoTitle: 'Muoversi a Svitto | Impresa di pulizie Svitto | SwissCleanMove',
    metaDescription: 'Traslochi professionali, pulizie di trasloco, pulizie di manutenzione, servizi di strutture e smaltimento nel Canton Svitto.',
    h1: 'Impresa di traslochi e pulizie nel Canton Svitto',
    highSeoKeywords: ['Muoversi a Svitto','Impresa di pulizie Svitto'],
    localKeywords: ['Schwyz','Freienbach','Einsiedeln','Küssnacht','Wollerau','Pfäffikon','Lachen'],
    introParagraphs: [
      'SwissCleanMove offre traslochi professionali, pulizia finale, pulizia di manutenzione, servizi per strutture, manutenzione e smaltimento di immobili nel Canton Svitto.',
      'Lavoriamo a Svitto, Freienbach, Einsiedeln, Küssnacht, Wollerau, Pfäffikon e Lachen. SwissCleanMove offre servizi affidabili per clienti privati, aziende e amministrazioni.',
    ],
    faqs: [
      { question: 'SwissCleanMove offre traslochi a Svitto?', answer: 'Sì, offriamo traslochi professionali nel Canton Svitto.' },
      { question: 'Sono disponibili la pulizia e la manutenzione della proprietà?', answer: 'Sì, offriamo pulizie di manutenzione, manutenzione della proprietà e servizi per le strutture.' },
      { question: 'SwissCleanMove funziona a Pfäffikon e Lachen?', answer: 'Sì, lavoriamo anche a Pfäffikon, Lachen e dintorni.' },
    ],
    mapQuery: 'Canton+of+Schwyz,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.de;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/schwyz` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.de} locale={locale} />;
}
