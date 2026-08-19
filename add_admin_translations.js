const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fr', 'it'];

locales.forEach(locale => {
  const filePath = path.join('C:\\Users\\user\\Desktop\\SwissCleanMove_Website\\messages', `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!data.admin) data.admin = {};
  data.admin.finalizingProjectSetup = 
    locale === 'de' ? 'Projektabschluss' :
    locale === 'fr' ? 'Finalisation du projet' :
    locale === 'it' ? 'Finalizzazione del progetto' :
    'Finalizing Project Setup';

  if (!data.admin.newProjectPage) data.admin.newProjectPage = {};
  if (!data.admin.newProjectPage.services) data.admin.newProjectPage.services = {};
  data.admin.newProjectPage.services.householdHelping = 
    locale === 'de' ? 'Haushaltshilfe' :
    locale === 'fr' ? 'Aide ménagère' :
    locale === 'it' ? 'Aiuto domestico' :
    'Household Helping';

  if (!data.quote) data.quote = {};
  if (!data.quote.items) data.quote.items = {};
  if (!data.quote.items.household) data.quote.items.household = {};
  data.quote.items.household.base = 
    locale === 'de' ? 'Haushaltshilfe Grundpreis' :
    locale === 'fr' ? 'Aide ménagère prix de base' :
    locale === 'it' ? 'Aiuto domestico prezzo base' :
    'Household Helping Base Price';

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${locale}.json`);
});
