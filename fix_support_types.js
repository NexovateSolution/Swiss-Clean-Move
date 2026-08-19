const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fr', 'it'];

locales.forEach(locale => {
  const filePath = path.join('C:\\Users\\user\\Desktop\\SwissCleanMove_Website\\messages', `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (data.serviceForm && data.serviceForm.wizard && data.serviceForm.wizard.householdHelping && data.serviceForm.wizard.householdHelping.supportTypes) {
    const supportTypes = data.serviceForm.wizard.householdHelping.supportTypes;
    
    // Copy the support types directly to the root for pdfGenerator
    data['householdHelp'] = supportTypes.householdHelp;
    data['maintenanceCleaning'] = supportTypes.maintenanceCleaning;
    data['combination'] = supportTypes.combination;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${locale}.json (support types to root)`);
  } else {
    console.log(`Could not find supportTypes in ${locale}.json`);
  }
});
