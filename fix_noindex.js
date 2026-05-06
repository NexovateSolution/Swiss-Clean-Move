const fs = require('fs');
const path = require('path');

const seoClusters = ['umzug', 'reinigung', 'endreinigung'];
const seelandCities = ['biel', 'nidau', 'lyss', 'bruegg', 'ipsach', 'aarberg', 'pieterlen'];

const basePath = path.join(__dirname, 'src', 'app', '[locale]');

let updatedCount = 0;

seoClusters.forEach(cluster => {
  seelandCities.forEach(city => {
    const filePath = path.join(basePath, `${cluster}-${city}`, 'page.tsx');
    
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Update the generateMetadata to set index: true
      // We will look for `index: false,` or `index: false`
      content = content.replace(/index:\s*false/g, 'index: true');
      
      // Also change noindex={true} to noindex={false}
      content = content.replace(/noindex=\{true\}/g, 'noindex={false}');
      
      fs.writeFileSync(filePath, content, 'utf-8');
      updatedCount++;
    }
  });
});

console.log(`Successfully updated ${updatedCount} SEO regional pages to be indexable.`);
