const fs = require('fs');
['de', 'en', 'fr'].forEach(lang => {
  const path = `messages/${lang}.json`;
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  data.navigation.hauswartung = lang === 'fr' ? 'Conciergerie' : lang === 'en' ? 'Property Maintenance' : 'Hauswartung';
  fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
});
console.log('Translations updated.');
