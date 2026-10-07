const fs = require('fs');

const messages = ['messages/de.json', 'messages/en.json', 'messages/fr.json', 'messages/it.json'];

for (const file of messages) {
  let content = fs.readFileSync(file, 'utf8');

  // Fix the "100% " bug
  content = content.replace(/auf die Sie sich zu verlassen können/g, 'auf die Sie sich zu 100% verlassen können');
  content = content.replace(/you can rely on/g, 'you can 100% rely on'); // need to check english and FR/IT
  // Let me just regex replace the specific German phrase because the others might not be exactly that.
  
  // Replace the "high quality standards" that I introduced instead of "Schweizer Qualität"
  content = content.replace(/hohen Qualitätsstandards/g, 'professionelle Reinigung');
  content = content.replace(/high quality standards/g, 'professional cleaning');
  content = content.replace(/normes de qualité élevées/g, 'nettoyage professionnel');
  content = content.replace(/elevati standard di qualità/g, 'pulizia professionale'); // IT equivalent? I should search for "standard di qualità" in IT first.
  content = content.replace(/High quality standards/g, 'Professional cleaning');
  content = content.replace(/Normes de qualité élevées/g, 'Nettoyage professionnel');

  fs.writeFileSync(file, content, 'utf8');
}
