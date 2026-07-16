import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  de: {
    slug: 'st-gallen', regionName: 'St. Gallen',
    seoTitle: 'Umzug St. Gallen | Reinigungsfirma St. Gallen | SwissCleanMove',
    metaDescription: 'Professioneller Umzug, Reinigung, Unterhaltsreinigung, Facility Services und Entsorgung in St. Gallen.',
    h1: 'Umzug & Reinigungsfirma in St. Gallen',
    highSeoKeywords: ['Umzug St. Gallen','Umzugsfirma St. Gallen','Reinigungsfirma St. Gallen','Umzugsreinigung St. Gallen','Endreinigung St. Gallen','Unterhaltsreinigung St. Gallen','Büroreinigung St. Gallen','Facility Services St. Gallen','Hauswartung St. Gallen','Entsorgung St. Gallen'],
    localKeywords: ['St. Gallen','Rapperswil-Jona','Wil','Gossau','Buchs','Uzwil','Wattwil'],
    introParagraphs: [
      'SwissCleanMove bietet professionelle Umzüge, Reinigungen, Unterhaltsreinigung, Facility Services, Hauswartung und Entsorgung im Kanton St. Gallen.',
      'Wir arbeiten in St. Gallen, Rapperswil-Jona, Wil, Gossau, Buchs, Uzwil und Wattwil. Unsere Dienstleistungen eignen sich für Privatpersonen, Unternehmen, Verwaltungen und Gewerbebetriebe.'
    ],
    faqs: [
      { question: 'Bietet SwissCleanMove Umzug in St. Gallen an?', answer: 'Ja, wir bieten Umzüge im Kanton St. Gallen.' },
      { question: 'Gibt es Reinigungsservice in St. Gallen?', answer: 'Ja, wir bieten Endreinigung, Büroreinigung und Unterhaltsreinigung.' },
      { question: 'Arbeitet SwissCleanMove auch in Wil und Gossau?', answer: 'Ja, wir arbeiten auch in Wil, Gossau und Umgebung.' }
    ],
    mapQuery: 'St.+Gallen,Switzerland'
  },
  en: {
    slug: 'st-gallen', regionName: 'St. Gallen',
    seoTitle: 'Moving St. Gallen | Cleaning Company St. Gallen | SwissCleanMove',
    metaDescription: 'Professional moving, cleaning, maintenance cleaning, facility services and disposal in St. Gallen.',
    h1: 'Moving & Cleaning Company in St. Gallen',
    highSeoKeywords: ['Moving St. Gallen','Cleaning company St. Gallen'],
    localKeywords: ['St. Gallen','Rapperswil-Jona','Wil','Gossau','Buchs','Uzwil','Wattwil'],
    introParagraphs: [
      'SwissCleanMove offers professional moves, cleaning, maintenance cleaning, facility services, property maintenance and disposal in the Canton of St. Gallen.',
      'We work in St. Gallen, Rapperswil-Jona, Wil, Gossau, Buchs, Uzwil and Wattwil. Our services are suitable for private individuals, companies, administrations and commercial businesses.'
    ],
    faqs: [
      { question: 'Does SwissCleanMove offer moving in St. Gallen?', answer: 'Yes, we offer moves in the Canton of St. Gallen.' },
      { question: 'Is cleaning service available in St. Gallen?', answer: 'Yes, we offer final cleaning, office cleaning and maintenance cleaning.' },
      { question: 'Does SwissCleanMove work in Wil and Gossau?', answer: 'Yes, we also work in Wil, Gossau and surrounding areas.' }
    ],
    mapQuery: 'St.+Gallen,Switzerland'
  },
  fr: {
    slug: 'st-gallen', regionName: 'Saint-Gall',
    seoTitle: 'Déménagement Saint-Gall | Nettoyage Saint-Gall | SwissCleanMove',
    metaDescription: 'Déménagement professionnel, nettoyage, facility services et débarras à Saint-Gall.',
    h1: 'Déménagement & Nettoyage à Saint-Gall',
    highSeoKeywords: ['Déménagement Saint-Gall','Nettoyage Saint-Gall'],
    localKeywords: ['St. Gallen','Rapperswil-Jona','Wil','Gossau','Buchs','Uzwil','Wattwil'],
    introParagraphs: [
      'SwissCleanMove propose des déménagements professionnels, nettoyage, facility services et débarras dans le canton de Saint-Gall.',
      'Nous intervenons à Saint-Gall, Rapperswil-Jona, Wil, Gossau, Buchs, Uzwil et Wattwil.'
    ],
    faqs: [
      { question: 'SwissCleanMove propose-t-il un déménagement à Saint-Gall?', answer: 'Oui, nous proposons des déménagements dans le canton de Saint-Gall.' },
      { question: 'Y a-t-il un service de nettoyage à Saint-Gall?', answer: 'Oui, nous proposons nettoyage de fin de bail, nettoyage de bureaux et nettoyage d\'entretien.' },
      { question: 'Travaillez-vous à Wil et Gossau?', answer: 'Oui, nous travaillons aussi à Wil, Gossau et environs.' }
    ],
    mapQuery: 'St.+Gallen,Switzerland'
  }
,
  it: {
    slug: 'st-gallen', regionName: 'San Gallo',
    seoTitle: 'Trasloco a San Gallo | Impresa di pulizie San Gallo | SwissCleanMove',
    metaDescription: 'Traslochi, pulizie, pulizie manutentive, servizi di strutture e smaltimento professionali a San Gallo.',
    h1: 'Impresa di traslochi e pulizie a San Gallo',
    highSeoKeywords: ['Trasloco a San Gallo','Impresa di pulizie San Gallo'],
    localKeywords: ['St. Gallen','Rapperswil-Jona','Wil','Gossau','Buchs','Uzwil','Wattwil'],
    introParagraphs: [
      'SwissCleanMove offre traslochi professionali, pulizie, pulizie di manutenzione, servizi per strutture, manutenzione e smaltimento di immobili nel Canton San Gallo.',
      'Lavoriamo a San Gallo, Rapperswil-Jona, Wil, Gossau, Buchs, Uzwil e Wattwil. I nostri servizi sono adatti a privati, aziende, amministrazioni ed esercizi commerciali.',
    ],
    faqs: [
      { question: 'SwissCleanMove offre traslochi a San Gallo?', answer: 'Sì, offriamo traslochi nel Canton San Gallo.' },
      { question: 'È disponibile il servizio di pulizia a San Gallo?', answer: 'Sì, offriamo pulizia finale, pulizia uffici e pulizia di manutenzione.' },
      { question: 'SwissCleanMove funziona a Wil e Gossau?', answer: 'Sì, lavoriamo anche a Wil, Gossau e dintorni.' },
    ],
    mapQuery: 'St.+Gallen,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.de;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/st-gallen` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.de} locale={locale} />;
}
