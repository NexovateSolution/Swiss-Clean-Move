const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'messages', 'de.json');
const enPath = path.join(__dirname, 'messages', 'en.json');
const frPath = path.join(__dirname, 'messages', 'fr.json');

const deData = JSON.parse(fs.readFileSync(dePath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const frData = JSON.parse(fs.readFileSync(frPath, 'utf8'));

const keysToSync = [
  'haushaltshilfeBiel', 'reinigungsfirmaBiel', 'umzugsfirmaBiel', 
  'unterhaltsreinigungBiel', 'fensterreinigungBiel', 'transportfirmaBiel', 
  'entsorgungBiel', 'facilityServiceBiel', 'hauswartungBiel', 
  'baureinigungBiel', 'gastronomieReinigungBiel', 'reinigungsfirmaSchweiz', 
  'umzugsreinigungSchweiz', 'facilityServiceSchweiz', 'hauswartungSchweiz'
];

keysToSync.forEach(key => {
  enData.seoPages[key] = JSON.parse(JSON.stringify(deData.seoPages[key]));
  frData.seoPages[key] = JSON.parse(JSON.stringify(deData.seoPages[key]));
});

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(frPath, JSON.stringify(frData, null, 2), 'utf8');

console.log('Successfully synced structure and content for the 15 keys to en.json and fr.json');
