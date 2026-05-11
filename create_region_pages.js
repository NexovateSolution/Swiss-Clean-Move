const fs = require('fs');
const path = require('path');

// Page definitions
const pages = [
  {
    slug: 'umzug-bern',
    pageKey: 'umzugBern',
    city: 'Bern',
    mapQuery: 'Bern,Switzerland',
    areaCities: "['Bern', 'Thun', 'Burgdorf', 'Langenthal', 'Biel/Bienne', 'Köniz', 'Ostermundigen']"
  },
  {
    slug: 'umzug-zurich',
    pageKey: 'umzugZurich',
    city: 'Zürich',
    mapQuery: 'Zurich,Switzerland',
    areaCities: "['Zürich', 'Winterthur', 'Baden', 'Aarau', 'Dietikon', 'Uster', 'Wädenswil']"
  },
  {
    slug: 'umzug-solothurn',
    pageKey: 'umzugSolothurn',
    city: 'Solothurn',
    mapQuery: 'Solothurn,Switzerland',
    areaCities: "['Solothurn', 'Olten', 'Grenchen', 'Zuchwil', 'Bettlach', 'Biel/Bienne']"
  },
  {
    slug: 'umzug-neuchatel',
    pageKey: 'umzugNeuchatel',
    city: 'Neuchâtel',
    mapQuery: 'Neuchatel,Switzerland',
    areaCities: "['Neuchâtel', 'La Chaux-de-Fonds', 'Le Locle', 'Boudry', 'Val-de-Travers']"
  },
  {
    slug: 'umzug-fribourg',
    pageKey: 'umzugFribourg',
    city: 'Fribourg',
    mapQuery: 'Fribourg,Switzerland',
    areaCities: "['Fribourg', 'Bulle', 'Murten', 'Düdingen', 'Villars-sur-Glâne']"
  },
  {
    slug: 'umzug-basel',
    pageKey: 'umzugBasel',
    city: 'Basel',
    mapQuery: 'Basel,Switzerland',
    areaCities: "['Basel', 'Allschwil', 'Reinach', 'Muttenz', 'Binningen', 'Liestal']"
  },
  {
    slug: 'umzug-schweiz',
    pageKey: 'umzugSchweiz',
    city: 'Schweiz',
    mapQuery: 'Switzerland',
    areaCities: "['Biel/Bienne', 'Bern', 'Zürich', 'Basel', 'Genf', 'Lausanne', 'Luzern', 'St. Gallen']"
  }
];

// Create page.tsx files
pages.forEach(p => {
  const dir = path.join(__dirname, 'src', 'app', '[locale]', p.slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const content = `import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: \`seoPages.\${'${p.pageKey}'}.meta\` });
  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function ${p.pageKey.charAt(0).toUpperCase() + p.pageKey.slice(1)}Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="${p.pageKey}"
      locale={locale}
      service="umzug"
      city="${p.city}"
      isPillar={false}
      formService="relocation"
      noindex={false}
      mapQuery="${p.mapQuery}"
      areaCities={${p.areaCities}}
    />
  );
}
`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), content, 'utf8');
  console.log(`✅ Created ${p.slug}/page.tsx`);
});

console.log('\nAll page files created!');
