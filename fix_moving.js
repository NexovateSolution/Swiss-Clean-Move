const fs = require('fs');
['en','de','fr'].forEach(l => {
  const f = `messages/${l}.json`;
  const c = JSON.parse(fs.readFileSync(f, 'utf8'));
  c.home.serviceCategories.moving.title = l === 'de' ? 'Umzug & Transport' : (l === 'fr' ? 'Déménagement & Transport' : 'Moving and Transportation');
  c.home.serviceCategories.moving.description = l === 'de' ? 'Komplette Umzugs- und Transportlösungen' : (l === 'fr' ? 'Solutions complètes de déménagement et transport' : 'Complete moving and transportation solutions');
  fs.writeFileSync(f, JSON.stringify(c, null, 2));
  console.log('Updated ' + l);
});
console.log('Done');
