const fs = require('fs');

const enFile = 'messages/en.json';
const deFile = 'messages/de.json';
const frFile = 'messages/fr.json';

const newKeys = {
  admin: {
    calendar: {
      titleLabel: "Title *",
      serviceType: "Service Type *",
      clientLabel: "Client *",
      addressLabel: "Address *",
      dateLabel: "Date *",
      startLabel: "Start *",
      endLabel: "End *",
      phoneLabel: "Phone",
      emailLabel: "Email",
      statusLabel: "Status",
      notesLabel: "Notes"
    },
    clients: {
      printSendEmail: "Print & Send Email",
      downloadSendEmail: "Download PDF & Send Email",
      downloadOnly: "Download PDF Only"
    },
    serviceForms: {
      descriptionLabel: "Description",
      priceLabel: "Price (CHF)",
      totalEstimate: "Total Estimate:",
      noAutomatedQuote: "No automated quote was generated for this submission.",
      adminNotes: "Admin Notes",
      noAdditionalData: "No additional data submitted."
    },
    deleteModal: {
      deleteClient: "Delete Client",
      clientInfo: "Client information and project details",
      allPayment: "All payment records",
      allPhotos: "All uploaded photos",
      allInvoices: "All invoices",
      projectDetails: "Project Details",
      clientLabel: "Client:",
      phoneLabel: "Phone:",
      emailLabel: "Email:",
      totalPrice: "Total Price:",
      outstandingBalance: "Outstanding Balance:",
      outstandingWarning: "Outstanding Balance Warning"
    },
    invoiceModal: {
      createInvoice: "Create Invoice",
      clientInfo: "Client Information",
      clientLabel: "Client:",
      phoneLabel: "Phone:",
      emailLabel: "Email:",
      serviceLabel: "Service:",
      addressLabel: "Address:",
      locationLabel: "Location:",
      invoiceDetails: "Invoice Details",
      invoicePreview: "Invoice Preview",
      subtotal: "Subtotal:",
      vat: "VAT (7.7%):",
      total: "Total:"
    },
    paymentModal: {
      addPayment: "Add Payment",
      projectDetails: "Project Details",
      clientLabel: "Client:",
      phoneLabel: "Phone:",
      emailLabel: "Email:",
      totalPrice: "Total Price:",
      paidAmount: "Paid Amount:",
      balance: "Balance:",
      paymentDetails: "Payment Details",
      cash: "Cash",
      bankTransfer: "Bank Transfer",
      creditCard: "Credit Card",
      payPal: "PayPal",
      paymentSummary: "Payment Summary",
      paymentAmount: "Payment Amount:",
      remainingBalance: "Remaining Balance:"
    },
    photoModal: {
      photoAlbum: "Photo Album",
      uploadPhotos: "Upload Photos",
      dragDrop: "Drag and drop photos here, or click to select",
      noPhotos: "No Photos Yet",
      uploadSome: "Upload some photos to get started"
    }
  },
  components: {
    serviceForm: {
      approx10m2: "ca. 10 m2",
      approx25m2: "ca. 25 m2",
      approx50m2: "ca. 50 m2",
      approx75m2: "ca. 75 m2",
      approx100m2: "ca. 100 m2",
      approx150m2: "ca. 150 m2",
      approx200m2: "ca. 200+ m2",
      room1: "1 Room",
      room2: "2 Rooms",
      room3: "3 Rooms",
      room4: "4 Rooms",
      room5: "5+ Rooms"
    },
    serviceWizard: {
      finalizingProject: "Admin Dashboard: Finalizing Project Setup",
      totalPrice: "Total Price (CHF) *",
      paidAmount: "Paid Amount (CHF)",
      executionStart: "Project Execution Start *",
      executionEnd: "Project Execution End *",
      handoverDate: "Handover Date",
      handoverTime: "Handover Time"
    },
    footer: {
      cleaningCompany: "Cleaning Company",
      movingCompany: "Moving Company",
      maintenanceCleaning: "Maintenance Cleaning",
      windowCleaning: "Window Cleaning",
      constructionCleaning: "Construction Cleaning",
      gastroCleaning: "Gastro Cleaning",
      transportCompany: "Transport Company",
      disposal: "Disposal",
      facilityService: "Facility Service",
      propertyMaintenance: "Property Maintenance"
    },
    header: {
      language: "Language"
    },
    knowledgeHub: {
      bestFor: "Best for:",
      faqAndGuides: "Frequently Asked Questions & Guides",
      detailedAnswers: "Detailed answers to your most important questions."
    },
    loadingSpinner: {
      loading: "Loading..."
    }
  }
};

const deTranslations = {
  admin: {
    calendar: {
      titleLabel: "Titel *",
      serviceType: "Dienstleistungsart *",
      clientLabel: "Kunde *",
      addressLabel: "Adresse *",
      dateLabel: "Datum *",
      startLabel: "Start *",
      endLabel: "Ende *",
      phoneLabel: "Telefon",
      emailLabel: "E-Mail",
      statusLabel: "Status",
      notesLabel: "Notizen"
    },
    clients: {
      printSendEmail: "Drucken & E-Mail senden",
      downloadSendEmail: "PDF herunterladen & E-Mail senden",
      downloadOnly: "Nur PDF herunterladen"
    },
    serviceForms: {
      descriptionLabel: "Beschreibung",
      priceLabel: "Preis (CHF)",
      totalEstimate: "Gesamtschätzung:",
      noAutomatedQuote: "Für diese Anfrage wurde keine automatische Offerte erstellt.",
      adminNotes: "Admin-Notizen",
      noAdditionalData: "Keine zusätzlichen Daten übermittelt."
    },
    deleteModal: {
      deleteClient: "Kunde löschen",
      clientInfo: "Kundeninformationen und Projektdetails",
      allPayment: "Alle Zahlungsaufzeichnungen",
      allPhotos: "Alle hochgeladenen Fotos",
      allInvoices: "Alle Rechnungen",
      projectDetails: "Projektdetails",
      clientLabel: "Kunde:",
      phoneLabel: "Telefon:",
      emailLabel: "E-Mail:",
      totalPrice: "Gesamtpreis:",
      outstandingBalance: "Offener Betrag:",
      outstandingWarning: "Warnung offener Betrag"
    },
    invoiceModal: {
      createInvoice: "Rechnung erstellen",
      clientInfo: "Kundeninformationen",
      clientLabel: "Kunde:",
      phoneLabel: "Telefon:",
      emailLabel: "E-Mail:",
      serviceLabel: "Dienstleistung:",
      addressLabel: "Adresse:",
      locationLabel: "Ort:",
      invoiceDetails: "Rechnungsdetails",
      invoicePreview: "Rechnungsvorschau",
      subtotal: "Zwischensumme:",
      vat: "MwSt. (7.7%):",
      total: "Gesamt:"
    },
    paymentModal: {
      addPayment: "Zahlung hinzufügen",
      projectDetails: "Projektdetails",
      clientLabel: "Kunde:",
      phoneLabel: "Telefon:",
      emailLabel: "E-Mail:",
      totalPrice: "Gesamtpreis:",
      paidAmount: "Bezahlter Betrag:",
      balance: "Restbetrag:",
      paymentDetails: "Zahlungsdetails",
      cash: "Bar",
      bankTransfer: "Banküberweisung",
      creditCard: "Kreditkarte",
      payPal: "PayPal",
      paymentSummary: "Zahlungszusammenfassung",
      paymentAmount: "Zahlungsbetrag:",
      remainingBalance: "Verbleibender Restbetrag:"
    },
    photoModal: {
      photoAlbum: "Fotoalbum",
      uploadPhotos: "Fotos hochladen",
      dragDrop: "Fotos hierher ziehen und ablegen oder zum Auswählen klicken",
      noPhotos: "Noch keine Fotos",
      uploadSome: "Laden Sie einige Fotos hoch, um zu beginnen"
    }
  },
  components: {
    serviceForm: {
      approx10m2: "ca. 10 m2",
      approx25m2: "ca. 25 m2",
      approx50m2: "ca. 50 m2",
      approx75m2: "ca. 75 m2",
      approx100m2: "ca. 100 m2",
      approx150m2: "ca. 150 m2",
      approx200m2: "ca. 200+ m2",
      room1: "1 Zimmer",
      room2: "2 Zimmer",
      room3: "3 Zimmer",
      room4: "4 Zimmer",
      room5: "5+ Zimmer"
    },
    serviceWizard: {
      finalizingProject: "Admin-Dashboard: Projekteinrichtung abschliessen",
      totalPrice: "Gesamtpreis (CHF) *",
      paidAmount: "Bezahlter Betrag (CHF)",
      executionStart: "Projektausführung Start *",
      executionEnd: "Projektausführung Ende *",
      handoverDate: "Übergabedatum",
      handoverTime: "Übergabezeit"
    },
    footer: {
      cleaningCompany: "Reinigungsfirma",
      movingCompany: "Umzugsfirma",
      maintenanceCleaning: "Unterhaltsreinigung",
      windowCleaning: "Fensterreinigung",
      constructionCleaning: "Baureinigung",
      gastroCleaning: "Gastro Reinigung",
      transportCompany: "Transportfirma",
      disposal: "Entsorgung",
      facilityService: "Facility Service",
      propertyMaintenance: "Hauswartung"
    },
    header: {
      language: "Sprache"
    },
    knowledgeHub: {
      bestFor: "Ideal für:",
      faqAndGuides: "Häufige Fragen & Ratgeber",
      detailedAnswers: "Ausführliche Antworten auf Ihre wichtigsten Fragen."
    },
    loadingSpinner: {
      loading: "Laden..."
    }
  }
};

const frTranslations = {
  admin: {
    calendar: {
      titleLabel: "Titre *",
      serviceType: "Type de service *",
      clientLabel: "Client *",
      addressLabel: "Adresse *",
      dateLabel: "Date *",
      startLabel: "Début *",
      endLabel: "Fin *",
      phoneLabel: "Téléphone",
      emailLabel: "E-Mail",
      statusLabel: "Statut",
      notesLabel: "Notes"
    },
    clients: {
      printSendEmail: "Imprimer & Envoyer E-Mail",
      downloadSendEmail: "Télécharger PDF & Envoyer E-Mail",
      downloadOnly: "Télécharger PDF uniquement"
    },
    serviceForms: {
      descriptionLabel: "Description",
      priceLabel: "Prix (CHF)",
      totalEstimate: "Estimation totale:",
      noAutomatedQuote: "Aucune offre automatique n'a été générée pour cette demande.",
      adminNotes: "Notes d'admin",
      noAdditionalData: "Aucune donnée supplémentaire soumise."
    },
    deleteModal: {
      deleteClient: "Supprimer Client",
      clientInfo: "Informations client et détails du projet",
      allPayment: "Tous les enregistrements de paiement",
      allPhotos: "Toutes les photos téléchargées",
      allInvoices: "Toutes les factures",
      projectDetails: "Détails du projet",
      clientLabel: "Client:",
      phoneLabel: "Téléphone:",
      emailLabel: "E-Mail:",
      totalPrice: "Prix total:",
      outstandingBalance: "Solde impayé:",
      outstandingWarning: "Avertissement de solde impayé"
    },
    invoiceModal: {
      createInvoice: "Créer une facture",
      clientInfo: "Informations Client",
      clientLabel: "Client:",
      phoneLabel: "Téléphone:",
      emailLabel: "E-Mail:",
      serviceLabel: "Service:",
      addressLabel: "Adresse:",
      locationLabel: "Lieu:",
      invoiceDetails: "Détails de la facture",
      invoicePreview: "Aperçu de la facture",
      subtotal: "Sous-total:",
      vat: "TVA (7.7%):",
      total: "Total:"
    },
    paymentModal: {
      addPayment: "Ajouter un paiement",
      projectDetails: "Détails du projet",
      clientLabel: "Client:",
      phoneLabel: "Téléphone:",
      emailLabel: "E-Mail:",
      totalPrice: "Prix total:",
      paidAmount: "Montant payé:",
      balance: "Solde:",
      paymentDetails: "Détails de paiement",
      cash: "Espèces",
      bankTransfer: "Virement bancaire",
      creditCard: "Carte de crédit",
      payPal: "PayPal",
      paymentSummary: "Résumé de paiement",
      paymentAmount: "Montant du paiement:",
      remainingBalance: "Solde restant:"
    },
    photoModal: {
      photoAlbum: "Album photo",
      uploadPhotos: "Télécharger des photos",
      dragDrop: "Faites glisser et déposez des photos ici, ou cliquez pour sélectionner",
      noPhotos: "Pas encore de photos",
      uploadSome: "Téléchargez quelques photos pour commencer"
    }
  },
  components: {
    serviceForm: {
      approx10m2: "env. 10 m2",
      approx25m2: "env. 25 m2",
      approx50m2: "env. 50 m2",
      approx75m2: "env. 75 m2",
      approx100m2: "env. 100 m2",
      approx150m2: "env. 150 m2",
      approx200m2: "env. 200+ m2",
      room1: "1 Pièce",
      room2: "2 Pièces",
      room3: "3 Pièces",
      room4: "4 Pièces",
      room5: "5+ Pièces"
    },
    serviceWizard: {
      finalizingProject: "Tableau de bord Admin: Finalisation de la configuration du projet",
      totalPrice: "Prix total (CHF) *",
      paidAmount: "Montant payé (CHF)",
      executionStart: "Début de l'exécution du projet *",
      executionEnd: "Fin de l'exécution du projet *",
      handoverDate: "Date de remise",
      handoverTime: "Heure de remise"
    },
    footer: {
      cleaningCompany: "Entreprise de nettoyage",
      movingCompany: "Entreprise de déménagement",
      maintenanceCleaning: "Nettoyage d'entretien",
      windowCleaning: "Nettoyage de vitres",
      constructionCleaning: "Nettoyage de fin de chantier",
      gastroCleaning: "Nettoyage Gastro",
      transportCompany: "Entreprise de transport",
      disposal: "Élimination",
      facilityService: "Facility Service",
      propertyMaintenance: "Conciergerie"
    },
    header: {
      language: "Langue"
    },
    knowledgeHub: {
      bestFor: "Idéal pour:",
      faqAndGuides: "Questions fréquentes & Guides",
      detailedAnswers: "Des réponses détaillées à vos questions les plus importantes."
    },
    loadingSpinner: {
      loading: "Chargement..."
    }
  }
};

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

const enObj = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const deObj = JSON.parse(fs.readFileSync(deFile, 'utf8'));
const frObj = JSON.parse(fs.readFileSync(frFile, 'utf8'));

deepMerge(enObj, newKeys);
deepMerge(deObj, deTranslations);
deepMerge(frObj, frTranslations);

fs.writeFileSync(enFile, JSON.stringify(enObj, null, 2));
fs.writeFileSync(deFile, JSON.stringify(deObj, null, 2));
fs.writeFileSync(frFile, JSON.stringify(frObj, null, 2));

console.log("Successfully added hardcoded keys to EN, DE, and FR.");
