const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fr', 'it'];

locales.forEach(locale => {
  const filePath = path.join('C:\\Users\\user\\Desktop\\SwissCleanMove_Website\\messages', `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Put at the root for pdfGenerator.ts
  data['Household Helping'] = data.admin.newProjectPage.services.householdHelping;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${locale}.json (root string)`);
});
