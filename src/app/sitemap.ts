import { MetadataRoute } from 'next';

const locales = ['de', 'fr', 'en'];
const baseUrl = 'https://swisscleanmove.ch';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base static pages
  const staticPages = [
    '',
    '/about',
    '/services',
    '/services/final-cleaning',
    '/services/house-cleaning',
    '/services/apartment-cleaning',
    '/services/office-cleaning',
    '/services/window-cleaning',
    '/services/stairwell-cleaning',
    '/services/disposal',
    '/services/relocation',
    '/contact',
    '/free-offer',
    '/pricing',
    '/faq',
    '/regions',
    '/legal'
  ];

  // Blog pages
  const blogPages = [
    '/blog',
    '/blog/umzug-kosten-schweiz',
    '/blog/umzug-checkliste',
    '/blog/endreinigung-tipps',
    '/blog/reinigungsfirma-finden',
    '/blog/umzugskartons-packen',
    '/blog/abgabegarantie-erklaert'
  ];

  // Auto-discovered SEO Landing Pages (60 pages)
  const seoPages = [
    '/aargau',
    '/basel',
    '/baureinigung-biel',
    '/bern',
    '/biel-bienne-seeland',
    '/endreinigung-aarberg',
    '/endreinigung-biel',
    '/endreinigung-bruegg',
    '/endreinigung-ipsach',
    '/endreinigung-lyss',
    '/endreinigung-nidau',
    '/endreinigung-pieterlen',
    '/entsorgung-biel',
    '/facility-service-biel',
    '/facility-service-schweiz',
    '/fensterreinigung-biel',
    '/fribourg',
    '/gastronomie-reinigung-biel',
    '/geneve',
    '/haushaltshilfe-biel',
    '/hauswartung-biel',
    '/hauswartung-schweiz',
    '/jura',
    '/lausanne-vaud',
    '/luzern',
    '/neuchatel',
    '/reinigung-aarberg',
    '/reinigung-biel',
    '/reinigung-bruegg',
    '/reinigung-ipsach',
    '/reinigung-lyss',
    '/reinigung-nidau',
    '/reinigung-pieterlen',
    '/reinigungsfirma-biel',
    '/reinigungsfirma-schweiz',
    '/schwyz',
    '/solothurn',
    '/st-gallen',
    '/thurgau',
    '/transportfirma-biel',
    '/umzug-aarberg',
    '/umzug-basel',
    '/umzug-bern',
    '/umzug-biel',
    '/umzug-bruegg',
    '/umzug-fribourg',
    '/umzug-ipsach',
    '/umzug-lyss',
    '/umzug-neuchatel',
    '/umzug-nidau',
    '/umzug-pieterlen',
    '/umzug-schweiz',
    '/umzug-solothurn',
    '/umzug-zurich',
    '/umzugsfirma-biel',
    '/umzugsreinigung-schweiz',
    '/unterhaltsreinigung-biel',
    '/wallis-valais',
    '/zuerich',
    '/zug'
  ];

  const allPaths = [...staticPages, ...blogPages, ...seoPages];

  return allPaths.map((path) => {
    // Generate alternate languages
    const alternates = {
      languages: locales.reduce((acc, locale) => {
        acc[locale] = `${baseUrl}/${locale}${path}`;
        return acc;
      }, {} as Record<string, string>),
    };

    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.8,
      alternates,
    };
  });
}
