const fs = require('fs');
const langs = ['en', 'de', 'fr', 'it'];

const topText = {
  en: 'CLEANING • MOVING • FACILITY SERVICES',
  de: 'REINIGUNG • UMZUG • HAUSWARTUNG',
  fr: 'NETTOYAGE • DÉMÉNAGEMENT • CONCIERGERIE',
  it: 'PULIZIA • TRASLOCHI • CUSTODIA'
};

const title = {
  en: 'Your Cleaning & Moving Company in Switzerland',
  de: 'Ihre Reinigungs- & Umzugsfirma in der Schweiz',
  fr: 'Votre Entreprise de Nettoyage & Déménagement en Suisse',
  it: 'La Vostra Impresa di Pulizie e Traslochi in Svizzera'
};

const subtitle = {
  en: 'Move-out cleaning with handover guarantee, moving, transport & facility services – professional from a single source.',
  de: 'Umzugsreinigung mit Abnahmegarantie, Umzug, Transport & Hauswartung - professionell aus einer Hand.',
  fr: 'Nettoyage de fin de bail avec garantie de remise, déménagement, transport & conciergerie - un service professionnel complet.',
  it: 'Pulizia di fine locazione con garanzia di consegna, traslochi, trasporti e custodia - un servizio professionale completo.'
};

const contactBtn = {
  en: 'Contact',
  de: 'Kontakt',
  fr: 'Contact',
  it: 'Contatto'
};

langs.forEach(lang => {
  const path = `messages/${lang}.json`;
  let data = JSON.parse(fs.readFileSync(path, 'utf8'));
  
  if (!data.home.newDesign.hero) data.home.newDesign.hero = {};
  data.home.newDesign.hero.topText = topText[lang];
  data.home.newDesign.hero.title = title[lang];
  data.home.newDesign.hero.subtitle = subtitle[lang];
  data.home.newDesign.hero.contactBtn = contactBtn[lang];
  
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
});
console.log('Translations updated.');
