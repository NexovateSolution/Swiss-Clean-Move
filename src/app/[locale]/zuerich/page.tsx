import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const D: Record<string, RegionPageData> = {
  de: {
    slug: 'zuerich', regionName: 'Zürich',
    seoTitle: 'Umzug Zürich | Reinigungsfirma Zürich | SwissCleanMove',
    metaDescription: 'Professioneller Umzug, Umzugsreinigung mit Abnahmegarantie, Unterhaltsreinigung, Facility Services und Entsorgung in Zürich.',
    h1: 'Umzug & Reinigungsfirma in Zürich',
    highSeoKeywords: ['Umzug Zürich','Umzugsfirma Zürich','Umzugsunternehmen Zürich','Reinigungsfirma Zürich','Umzugsreinigung Zürich','Endreinigung Zürich','Unterhaltsreinigung Zürich','Büroreinigung Zürich','Gastronomie Reinigung Zürich','Facility Services Zürich','Hauswartung Zürich','Entsorgung Zürich'],
    localKeywords: ['Zürich','Winterthur','Uster','Dübendorf','Dietikon','Kloten','Schlieren','Horgen','Wädenswil'],
    introParagraphs: [
      'SwissCleanMove bietet professionelle Umzüge, Reinigung, Umzugsreinigung mit Abnahmegarantie, Büroreinigung, Unterhaltsreinigung, Gastronomie Reinigung, Facility Services, Hauswartung und Entsorgung in Zürich und Umgebung.',
      'Wir arbeiten in Zürich, Winterthur, Uster, Dübendorf, Dietikon, Kloten, Schlieren, Horgen und Wädenswil. Ob Privatumzug, Firmenumzug, Endreinigung, Büroreinigung oder Gebäudeunterhalt — SwissCleanMove sorgt für saubere Abläufe, zuverlässige Termine und professionelle Qualität.'
    ],
    faqs: [
      { question: 'Bietet SwissCleanMove Umzug in Zürich an?', answer: 'Ja, wir bieten Privatumzüge, Firmenumzüge und Möbeltransport in Zürich.' },
      { question: 'Gibt es Endreinigung mit Abnahmegarantie in Zürich?', answer: 'Ja, wir bieten Umzugsreinigung mit Abnahmegarantie.' },
      { question: 'Arbeitet SwissCleanMove auch in Winterthur und Uster?', answer: 'Ja, wir arbeiten in Zürich, Winterthur, Uster und Umgebung.' }
    ],
    mapQuery: 'Zurich,Switzerland'
  },
  en: {
    slug: 'zuerich', regionName: 'Zurich',
    seoTitle: 'Moving Zurich | Cleaning Company Zurich | SwissCleanMove',
    metaDescription: 'Professional moving, move-out cleaning with guarantee, maintenance cleaning, facility services and disposal in Zurich.',
    h1: 'Moving & Cleaning Company in Zurich',
    highSeoKeywords: ['Moving Zurich','Moving company Zurich','Cleaning company Zurich'],
    localKeywords: ['Zürich','Winterthur','Uster','Dübendorf','Dietikon','Kloten','Schlieren','Horgen','Wädenswil'],
    introParagraphs: [
      'SwissCleanMove offers professional moves, cleaning, move-out cleaning with handover guarantee, office cleaning, maintenance cleaning, restaurant cleaning, facility services, property maintenance and disposal in Zurich and surrounding areas.',
      'We work in Zurich, Winterthur, Uster, Dübendorf, Dietikon, Kloten, Schlieren, Horgen and Wädenswil. Whether private move, office relocation, final cleaning or building maintenance — SwissCleanMove ensures smooth processes and professional quality.'
    ],
    faqs: [
      { question: 'Does SwissCleanMove offer moving in Zurich?', answer: 'Yes, we offer private moves, office relocations and furniture transport in Zurich.' },
      { question: 'Is final cleaning with guarantee available in Zurich?', answer: 'Yes, we offer move-out cleaning with handover guarantee.' },
      { question: 'Does SwissCleanMove work in Winterthur and Uster?', answer: 'Yes, we work in Zurich, Winterthur, Uster and surrounding areas.' }
    ],
    mapQuery: 'Zurich,Switzerland'
  },
  fr: {
    slug: 'zuerich', regionName: 'Zurich',
    seoTitle: 'Déménagement Zurich | Nettoyage Zurich | SwissCleanMove',
    metaDescription: 'Déménagement professionnel, nettoyage de fin de bail, facility services et débarras à Zurich.',
    h1: 'Déménagement & Nettoyage à Zurich',
    highSeoKeywords: ['Déménagement Zurich','Nettoyage Zurich'],
    localKeywords: ['Zürich','Winterthur','Uster','Dübendorf','Dietikon','Kloten','Schlieren','Horgen','Wädenswil'],
    introParagraphs: [
      'SwissCleanMove propose des déménagements professionnels, nettoyage de fin de bail avec garantie, nettoyage d\'entretien, facility services et débarras à Zurich et environs.',
      'Nous intervenons à Zurich, Winterthur, Uster, Dübendorf, Dietikon, Kloten, Schlieren, Horgen et Wädenswil.'
    ],
    faqs: [
      { question: 'SwissCleanMove propose-t-il un déménagement à Zurich?', answer: 'Oui, nous proposons des déménagements privés, d\'entreprise et du transport de meubles à Zurich.' },
      { question: 'Y a-t-il un nettoyage de fin de bail avec garantie à Zurich?', answer: 'Oui, nous proposons le nettoyage de fin de bail avec garantie de remise.' },
      { question: 'Travaillez-vous à Winterthur et Uster?', answer: 'Oui, nous travaillons à Zurich, Winterthur, Uster et environs.' }
    ],
    mapQuery: 'Zurich,Switzerland'
  }
,
  it: {
    slug: 'zuerich', regionName: 'Zurigo',
    seoTitle: 'Muoversi a Zurigo | Impresa di pulizie Zurigo | SwissCleanMove',
    metaDescription: 'Traslochi professionali, pulizie di trasloco con garanzia, pulizie di manutenzione, servizi di struttura e smaltimento a Zurigo.',
    h1: 'Impresa di traslochi e pulizie a Zurigo',
    highSeoKeywords: ['Muoversi a Zurigo','Ditta di traslochi Zurigo','Impresa di pulizie Zurigo'],
    localKeywords: ['Zürich','Winterthur','Uster','Dübendorf','Dietikon','Kloten','Schlieren','Horgen','Wädenswil'],
    introParagraphs: [
      'SwissCleanMove offre traslochi professionali, pulizie, pulizie di trasloco con garanzia di consegna, pulizie di uffici, pulizie di mantenimento, pulizie di ristoranti, servizi di strutture, manutenzione e smaltimento di immobili a Zurigo e dintorni.',
      'Lavoriamo a Zurigo, Winterthur, Uster, Dübendorf, Dietikon, Kloten, Schlieren, Horgen e Wädenswil. Che si tratti di traslochi privati, traslochi di uffici, pulizie finali o manutenzione di edifici, SwissCleanMove garantisce processi fluidi e qualità professionale.',
    ],
    faqs: [
      { question: 'SwissCleanMove offre traslochi a Zurigo?', answer: 'Sì, offriamo traslochi privati, traslochi di uffici e trasporto di mobili a Zurigo.' },
      { question: 'La pulizia finale con garanzia è disponibile a Zurigo?', answer: 'Sì, offriamo la pulizia del trasloco con garanzia di consegna.' },
      { question: 'SwissCleanMove funziona a Winterthur e Uster?', answer: 'Sì, lavoriamo a Zurigo, Winterthur, Uster e dintorni.' },
    ],
    mapQuery: 'Zurich,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = D[locale] || D.de;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/zuerich` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <RegionLandingPage data={D[locale] || D.de} locale={locale} />;
}
