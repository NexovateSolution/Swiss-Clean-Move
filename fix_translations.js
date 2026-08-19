const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fr', 'it'];

locales.forEach(locale => {
  const filePath = path.join('C:\\Users\\user\\Desktop\\SwissCleanMove_Website\\messages', `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Put admin translations under serviceForm
  if (!data.serviceForm) data.serviceForm = {};
  if (!data.serviceForm.admin) data.serviceForm.admin = {};
  data.serviceForm.admin.finalizingProjectSetup = 
    locale === 'de' ? 'Projektabschluss' :
    locale === 'fr' ? 'Finalisation du projet' :
    locale === 'it' ? 'Finalizzazione del progetto' :
    'Finalizing Project Setup';

  // Ensure household helping is translated in admin.newProjectPage.services (it already is, but let's make sure it's correct)
  if (!data.admin) data.admin = {};
  if (!data.admin.newProjectPage) data.admin.newProjectPage = {};
  if (!data.admin.newProjectPage.services) data.admin.newProjectPage.services = {};
  data.admin.newProjectPage.services.householdHelping = 
    locale === 'de' ? 'Haushaltshilfe' :
    locale === 'fr' ? 'Aide ménagère' :
    locale === 'it' ? 'Aiuto domestico' :
    'Household Helping';

  // Also add 'Household Helping' mapping to serviceForm so pdfGenerator can translate the raw English string
  data.serviceForm['Household Helping'] = data.admin.newProjectPage.services.householdHelping;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${locale}.json`);
});
