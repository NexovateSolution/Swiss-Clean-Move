const fs = require('fs');

const langs = ['en', 'de', 'fr'];
const translations = {
    en: {
        createContract: 'Create Contract',
        createInvoice: 'Create Invoice'
    },
    de: {
        createContract: 'Vertrag erstellen',
        createInvoice: 'Rechnung erstellen'
    },
    fr: {
        createContract: 'Créer un contrat',
        createInvoice: 'Créer une facture'
    }
};

for (const lang of langs) {
    const file = `messages/${lang}.json`;
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    
    // Update createInvoice -> Create Contract
    data.admin.clients.actions.createInvoice = translations[lang].createContract;
    
    // Add createReceipt -> Create Invoice
    data.admin.clients.actions.createReceipt = translations[lang].createInvoice;
    
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}
console.log('Translations updated.');
