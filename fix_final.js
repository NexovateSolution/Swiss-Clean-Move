const fs = require('fs');

['en', 'de', 'fr'].forEach(lang => {
  const f = `messages/${lang}.json`;
  let c = JSON.parse(fs.readFileSync(f, 'utf8'));

  // 1) Change "All" to "Several" in hero trust cantons
  if (c.home && c.home.hero && c.home.hero.trust) {
    c.home.hero.trust.all = lang === 'de' ? 'Mehrere' : (lang === 'fr' ? 'Plusieurs' : 'Several');
  }

  // 2) Add aargau regionData (copy structure from geneva, then delete geneva)
  if (c.regions && c.regions.regionData) {
    if (c.regions.regionData.geneva) {
      delete c.regions.regionData.geneva;
    }
    c.regions.regionData.aargau = {
      name: 'Aargau',
      description: lang === 'de' ? 'Professionelle Dienstleistungen im Kanton Aargau'
        : (lang === 'fr' ? 'Services professionnels dans le canton d\'Argovie'
        : 'Professional services in the canton of Aargau'),
      coverage: lang === 'de' ? 'Kanton Aargau und Umgebung'
        : (lang === 'fr' ? 'Canton d\'Argovie et environs'
        : 'Canton of Aargau and surrounding areas'),
      areas: lang === 'de' ? ['Aarau', 'Baden', 'Wettingen', 'Brugg', 'Lenzburg']
        : (lang === 'fr' ? ['Aarau', 'Baden', 'Wettingen', 'Brugg', 'Lenzburg']
        : ['Aarau', 'Baden', 'Wettingen', 'Brugg', 'Lenzburg'])
    };
  }

  fs.writeFileSync(f, JSON.stringify(c, null, 2));
  console.log(`Updated ${lang}.json`);
});
console.log('Done!');
