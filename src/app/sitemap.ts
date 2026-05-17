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

  // Local SEO pages (21 pages total)
  const seoClusters = ['umzug', 'reinigung', 'endreinigung'];
  const seelandCities = ['biel', 'nidau', 'lyss', 'bruegg', 'ipsach', 'aarberg', 'pieterlen'];

  const localPages = seoClusters.flatMap(cluster => 
    seelandCities.map(city => `/${cluster}-${city}`)
  );

  // Haushaltshilfe landing page
  const householdPages = ['/haushaltshilfe-biel'];

  // Authority SEO pages (Biel Focus)
  const authorityPages = [
    '/reinigungsfirma-biel',
    '/umzugsfirma-biel',
    '/unterhaltsreinigung-biel',
    '/fensterreinigung-biel',
    '/transportfirma-biel',
    '/entsorgung-biel',
    '/facility-service-biel',
    '/hauswartung-biel',
    '/baureinigung-biel',
    '/gastronomie-reinigung-biel'
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

  const allPaths = [...staticPages, ...localPages, ...householdPages, ...authorityPages, ...blogPages];

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
