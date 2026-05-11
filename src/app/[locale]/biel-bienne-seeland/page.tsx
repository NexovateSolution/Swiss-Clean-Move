import RegionLandingPage from '@/components/RegionLandingPage';
import type { RegionPageData } from '@/components/RegionLandingPage';
import type { Metadata } from 'next';

const DATA: Record<string, RegionPageData> = {
  de: {
    slug: 'biel-bienne-seeland',
    regionName: 'Biel/Bienne & Seeland',
    seoTitle: 'Umzug Biel/Bienne | Reinigungsfirma Biel | SwissCleanMove',
    metaDescription: 'Professioneller Umzug, Umzugsreinigung mit Abnahmegarantie, Unterhaltsreinigung, Gastronomie Reinigung, Facility Services, Hauswartung und Entsorgung in Biel/Bienne und Seeland.',
    h1: 'Umzug & Reinigungsfirma in Biel/Bienne und Seeland',
    highSeoKeywords: ['Umzug Biel','Umzug Biel/Bienne','Umzugsfirma Biel','Reinigungsfirma Biel','Umzugsreinigung Biel','Endreinigung Biel','Unterhaltsreinigung Biel','Büroreinigung Biel','Gastronomie Reinigung Biel','Facility Services Biel','Hauswartung Biel','Entsorgung Biel','Räumung Biel'],
    localKeywords: ['Biel','Bienne','Nidau','Brügg','Ipsach','Port','Bellmund','Studen','Lyss','Pieterlen','Aarberg','Orpund','Seeland'],
    introParagraphs: [
      'SwissCleanMove ist Ihre professionelle Umzugsfirma und Reinigungsfirma in Biel/Bienne und der gesamten Seeland Region. Wir bieten Umzug, Umzugsreinigung mit Abnahmegarantie, Endreinigung, Unterhaltsreinigung, Büroreinigung, Gastronomie Reinigung, Facility Services, Hauswartung, Entsorgung und Räumung aus einer Hand.',
      'Unser Team arbeitet zuverlässig in Biel, Bienne, Nidau, Brügg, Ipsach, Port, Bellmund, Studen, Lyss, Pieterlen, Aarberg, Orpund und der gesamten Region Seeland. Ob Privatumzug, Firmenumzug, Wohnungsreinigung, Hauswartung oder Gebäudeunterhalt — SwissCleanMove steht für Schweizer Qualität, transparente Preise und professionelle Ausführung.'
    ],
    faqs: [
      { question: 'Bietet SwissCleanMove Umzug in Biel/Bienne an?', answer: 'Ja, SwissCleanMove bietet professionelle Umzüge in Biel/Bienne und der gesamten Seeland Region an.' },
      { question: 'Gibt es Umzugsreinigung mit Abnahmegarantie?', answer: 'Ja, wir bieten Umzugsreinigung und Endreinigung mit Abnahmegarantie.' },
      { question: 'Arbeitet SwissCleanMove auch in Nidau, Brügg und Lyss?', answer: 'Ja, wir arbeiten in Biel/Bienne, Nidau, Brügg, Ipsach, Lyss, Aarberg und Umgebung.' }
    ],
    mapQuery: 'Biel/Bienne,Seeland,Switzerland'
  },
  en: {
    slug: 'biel-bienne-seeland',
    regionName: 'Biel/Bienne & Seeland',
    seoTitle: 'Moving Biel/Bienne | Cleaning Company Biel | SwissCleanMove',
    metaDescription: 'Professional moving, move-out cleaning with handover guarantee, maintenance cleaning, restaurant cleaning, facility services, property maintenance and disposal in Biel/Bienne and Seeland.',
    h1: 'Moving & Cleaning Company in Biel/Bienne and Seeland',
    highSeoKeywords: ['Moving Biel','Moving Biel/Bienne','Moving company Biel','Cleaning company Biel','Move-out cleaning Biel','Final cleaning Biel'],
    localKeywords: ['Biel','Bienne','Nidau','Brügg','Ipsach','Port','Bellmund','Studen','Lyss','Pieterlen','Aarberg','Orpund','Seeland'],
    introParagraphs: [
      'SwissCleanMove is your professional moving and cleaning company in Biel/Bienne and the entire Seeland region. We offer moving, move-out cleaning with handover guarantee, final cleaning, maintenance cleaning, office cleaning, restaurant cleaning, facility services, property maintenance, disposal and clearance — all from one provider.',
      'Our team works reliably in Biel, Bienne, Nidau, Brügg, Ipsach, Port, Bellmund, Studen, Lyss, Pieterlen, Aarberg, Orpund and the entire Seeland region. Whether private move, office relocation, apartment cleaning, property maintenance or building upkeep — SwissCleanMove stands for Swiss quality, transparent prices and professional execution.'
    ],
    faqs: [
      { question: 'Does SwissCleanMove offer moving in Biel/Bienne?', answer: 'Yes, SwissCleanMove offers professional moves in Biel/Bienne and the entire Seeland region.' },
      { question: 'Is move-out cleaning with handover guarantee available?', answer: 'Yes, we offer move-out cleaning and final cleaning with handover guarantee.' },
      { question: 'Does SwissCleanMove work in Nidau, Brügg and Lyss?', answer: 'Yes, we work in Biel/Bienne, Nidau, Brügg, Ipsach, Lyss, Aarberg and surrounding areas.' }
    ],
    mapQuery: 'Biel/Bienne,Seeland,Switzerland'
  },
  fr: {
    slug: 'biel-bienne-seeland',
    regionName: 'Biel/Bienne & Seeland',
    seoTitle: 'Déménagement Bienne | Nettoyage Bienne | SwissCleanMove',
    metaDescription: 'Déménagement professionnel, nettoyage de fin de bail avec garantie, nettoyage d\'entretien, nettoyage gastronomie, facility services et débarras à Bienne et Seeland.',
    h1: 'Déménagement & Nettoyage à Bienne et Seeland',
    highSeoKeywords: ['Déménagement Bienne','Entreprise de déménagement Bienne','Nettoyage Bienne','Nettoyage fin de bail Bienne'],
    localKeywords: ['Biel','Bienne','Nidau','Brügg','Ipsach','Port','Bellmund','Studen','Lyss','Pieterlen','Aarberg','Orpund','Seeland'],
    introParagraphs: [
      'SwissCleanMove est votre entreprise professionnelle de déménagement et de nettoyage à Bienne et dans toute la région du Seeland. Nous proposons déménagement, nettoyage de fin de bail avec garantie de remise, nettoyage final, nettoyage d\'entretien, nettoyage de bureaux, nettoyage gastronomie, facility services, conciergerie, débarras et évacuation.',
      'Notre équipe travaille de manière fiable à Biel, Bienne, Nidau, Brügg, Ipsach, Port, Bellmund, Studen, Lyss, Pieterlen, Aarberg, Orpund et dans toute la région du Seeland.'
    ],
    faqs: [
      { question: 'SwissCleanMove propose-t-il un déménagement à Bienne?', answer: 'Oui, SwissCleanMove propose des déménagements professionnels à Bienne et dans toute la région du Seeland.' },
      { question: 'Proposez-vous le nettoyage de fin de bail avec garantie?', answer: 'Oui, nous proposons le nettoyage de fin de bail avec garantie de remise.' },
      { question: 'Travaillez-vous aussi à Nidau, Brügg et Lyss?', answer: 'Oui, nous travaillons à Bienne, Nidau, Brügg, Ipsach, Lyss, Aarberg et environs.' }
    ],
    mapQuery: 'Biel/Bienne,Seeland,Switzerland'
  }
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const d = DATA[locale] || DATA.de;
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `https://swisscleanmove.ch/${locale}/biel-bienne-seeland` } };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  const d = DATA[locale] || DATA.de;
  return <RegionLandingPage data={d} locale={locale} />;
}
