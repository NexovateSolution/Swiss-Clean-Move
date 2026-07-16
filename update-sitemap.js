const fs = require('fs');
const path = require('path');

const localePath = path.join(__dirname, 'src', 'app', '[locale]');
const folders = fs.readdirSync(localePath).filter(f => fs.statSync(path.join(localePath, f)).isDirectory());

const exclude = [
  'about', 'admin', 'blog', 'cleaning', 'contact', 'dashboard', 'faq', 'form', 
  'free-offer', 'gallery', 'legal', 'moving', 'preise-und-ratgeber', 'pricing', 
  'pricing-and-guides', 'prix-et-conseils', 'property-maintenance', 'regions', 'services'
];

const seoPages = folders.filter(f => !exclude.includes(f));

let sitemapCode = `import { MetadataRoute } from 'next';

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

  // Auto-discovered SEO Landing Pages (${seoPages.length} pages)
  const seoPages = [
${seoPages.map(p => `    '/${p}'`).join(',\n')}
  ];

  const allPaths = [...staticPages, ...blogPages, ...seoPages];

  return allPaths.map((path) => {
    // Generate alternate languages
    const alternates = {
      languages: locales.reduce((acc, locale) => {
        acc[locale] = \`\${baseUrl}/\${locale}\${path}\`;
        return acc;
      }, {} as Record<string, string>),
    };

    return {
      url: \`\${baseUrl}\${path}\`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.8,
      alternates,
    };
  });
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'app', 'sitemap.ts'), sitemapCode, 'utf8');
console.log('Successfully updated sitemap.ts with all SEO pages.');
