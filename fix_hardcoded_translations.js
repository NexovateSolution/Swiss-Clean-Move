const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/universal-form/slices/*.tsx');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  content = content.replace(/>Ja \/ Yes</g, ">{t('universalForm.common.yes')}<");
  content = content.replace(/>Nein \/ No</g, ">{t('universalForm.common.no')}<");
  
  content = content.replace(/Fotos \/ Pläne \(optional\)/g, "{t('universalForm.review.photosLabel')}");
  content = content.replace(/Dateien auswählen \(Bilder\/PDFs\)/g, "{t('universalForm.review.photosDesc')}");
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed translations in ' + file);
  }
});
