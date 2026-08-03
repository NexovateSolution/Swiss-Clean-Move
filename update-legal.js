const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fr', 'it'];

const termsScope = {
  de: "Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen SwissCleanMove und ihren Kunden über die Erbringung von Reinigungs-, Umzugs- und Facility-Services.",
  en: "These Terms and Conditions apply to all contracts between SwissCleanMove and its customers for the provision of cleaning, moving, and facility services.",
  fr: "Ces conditions générales s'appliquent à tous les contrats entre SwissCleanMove et ses clients pour la fourniture de services de nettoyage, de déménagement et de facility services.",
  it: "Le presenti Condizioni generali si applicano a tutti i contratti tra SwissCleanMove e i suoi clienti per la fornitura di servizi di pulizia, trasloco e facility."
};

const termsPayment = {
  de: "Die Zahlung erfolgt in bar direkt an den Teamleiter nach erfolgreichem Abschluss der vereinbarten Dienstleistungen, sofern nicht schriftlich etwas anderes vereinbart wurde.",
  en: "Payment is made in cash directly to the team leader after the successful completion of the agreed services, unless otherwise agreed in writing.",
  fr: "Le paiement s'effectue en espèces directement au chef d'équipe après la réalisation réussie des services convenus, sauf accord contraire par écrit.",
  it: "Il pagamento viene effettuato in contanti direttamente al caposquadra dopo il completamento con successo dei servizi concordati, se non diversamente concordato per iscritto."
};

async function updateLegalFiles() {
  for (const locale of locales) {
    const filePath = path.join(__dirname, 'messages', `${locale}.json`);
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${locale}, file not found.`);
      continue;
    }

    let raw = fs.readFileSync(filePath, 'utf8');
    
    // Global replace for "SwissCleanMove GmbH"
    raw = raw.replace(/SwissCleanMove GmbH/g, 'SwissCleanMove');
    
    const data = JSON.parse(raw);

    // Update the Terms of Scope
    if (data.legal && data.legal.terms && data.legal.terms.scopeText) {
      data.legal.terms.scopeText = termsScope[locale];
    }

    // Update the Payment Terms (pricingText1) and remove pricingText2 (since the new policy replaces it entirely)
    if (data.legal && data.legal.terms && data.legal.terms.pricingText1) {
      data.legal.terms.pricingText1 = termsPayment[locale];
      delete data.legal.terms.pricingText2;
    }

    // Remove the orphaned manager and authority keys just to be clean
    if (data.legal && data.legal.impressum) {
      delete data.legal.impressum.manager;
      delete data.legal.impressum.authority;
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`Successfully updated legal texts in ${locale}.json`);
  }
}

updateLegalFiles().catch(console.error);
