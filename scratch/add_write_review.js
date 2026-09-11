const fs = require('fs');
const langs = ['en', 'de', 'fr', 'it'];
const writeReview = {
  en: 'Write a review',
  de: 'Bewertung schreiben',
  fr: 'Écrire un avis',
  it: 'Scrivi una recensione'
};

langs.forEach(lang => {
  const path = `messages/${lang}.json`;
  let data = JSON.parse(fs.readFileSync(path, 'utf8'));
  
  if (!data.home.newDesign.reviews.writeReview) {
    data.home.newDesign.reviews.writeReview = writeReview[lang];
    fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
  }
});
console.log('Added writeReview translations.');
