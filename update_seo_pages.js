const fs = require('fs');
const path = require('path');

const seoClusters = ['umzug', 'reinigung', 'endreinigung'];
const seelandCities = ['biel', 'nidau', 'lyss', 'bruegg', 'ipsach', 'aarberg', 'pieterlen'];

const cityMapping = {
  biel: 'Biel/Bienne',
  nidau: 'Nidau',
  lyss: 'Lyss',
  bruegg: 'Brügg',
  ipsach: 'Ipsach',
  aarberg: 'Aarberg',
  pieterlen: 'Pieterlen'
};

const formServiceMapping = {
  umzug: 'relocation',
  reinigung: 'house-cleaning',
  endreinigung: 'facility-services'
};

seoClusters.forEach(cluster => {
  seelandCities.forEach(city => {
    const slug = `${cluster}-${city}`;
    const pageKey = cluster + city.charAt(0).toUpperCase() + city.slice(1);
    const cityName = cityMapping[city];
    const formService = formServiceMapping[cluster];
    const isPillar = city === 'biel';
    
    // We can set noindex to true for non-pillar pages as part of phased rollout
    // But since user just wanted management, let's leave it as a toggle, default false (index=true)
    // Or we can set noindex=true for non-pillar to start with, as per phased rollout
    const noIndex = !isPillar; 

    const content = `import SeoLandingPage from '@/components/SeoLandingPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: \`seoPages.\${'${pageKey}'}.meta\` });
  return {
    title: t('title'),
    description: t('description'),
    // Phased rollout: noindex true for secondary cities temporarily
    robots: {
      index: ${!noIndex},
      follow: true
    }
  };
}

export default function ${pageKey.charAt(0).toUpperCase() + pageKey.slice(1)}Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <SeoLandingPage
      pageKey="${pageKey}"
      locale={locale}
      service="${cluster}"
      city="${cityName}"
      isPillar={${isPillar}}
      formService="${formService}"
      noindex={${noIndex}}
    />
  );
}
`;
    const dir = path.join(__dirname, 'src', 'app', '[locale]', slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'page.tsx'), content);
  });
});
console.log('Done generating pages with metadata');
