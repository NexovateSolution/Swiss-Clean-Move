const fs = require('fs');

const replacements = [
  // admin/calendar/page.tsx
  {
    file: 'src/app/admin/calendar/page.tsx',
    find: 'Title *',
    replace: '{t("titleLabel")}'
  },
  {
    file: 'src/app/admin/calendar/page.tsx',
    find: 'Service Type *',
    replace: '{t("serviceType")}'
  },
  {
    file: 'src/app/admin/calendar/page.tsx',
    find: 'Client *',
    replace: '{t("clientLabel")}'
  },
  {
    file: 'src/app/admin/calendar/page.tsx',
    find: '>Address *<',
    replace: '>{t("addressLabel")}<'
  },
  {
    file: 'src/app/admin/calendar/page.tsx',
    find: '>Date *<',
    replace: '>{t("dateLabel")}<'
  },
  {
    file: 'src/app/admin/calendar/page.tsx',
    find: '>Start *<',
    replace: '>{t("startLabel")}<'
  },
  {
    file: 'src/app/admin/calendar/page.tsx',
    find: '>End *<',
    replace: '>{t("endLabel")}<'
  },
  {
    file: 'src/app/admin/calendar/page.tsx',
    find: '>Phone<',
    replace: '>{t("phoneLabel")}<'
  },
  {
    file: 'src/app/admin/calendar/page.tsx',
    find: '>Email<',
    replace: '>{t("emailLabel")}<'
  },
  {
    file: 'src/app/admin/calendar/page.tsx',
    find: '>Status<',
    replace: '>{t("statusLabel")}<'
  },
  {
    file: 'src/app/admin/calendar/page.tsx',
    find: '>Notes<',
    replace: '>{t("notesLabel")}<'
  },
  // admin/clients/page.tsx
  {
    file: 'src/app/admin/clients/page.tsx',
    find: 'Print & Send Email',
    replace: '{t("printSendEmail")}'
  },
  {
    file: 'src/app/admin/clients/page.tsx',
    find: 'Download PDF & Send Email',
    replace: '{t("downloadSendEmail")}'
  },
  {
    file: 'src/app/admin/clients/page.tsx',
    find: 'Download PDF Only',
    replace: '{t("downloadOnly")}'
  },
  // admin/service-forms/page.tsx
  {
    file: 'src/app/admin/service-forms/page.tsx',
    find: '>Description<',
    replace: '>{t("descriptionLabel")}<'
  },
  {
    file: 'src/app/admin/service-forms/page.tsx',
    find: '>Price (CHF)<',
    replace: '>{t("priceLabel")}<'
  },
  {
    file: 'src/app/admin/service-forms/page.tsx',
    find: 'Total Estimate:',
    replace: '{t("totalEstimate")}'
  },
  {
    file: 'src/app/admin/service-forms/page.tsx',
    find: 'No automated quote was generated for this submission.',
    replace: '{t("noAutomatedQuote")}'
  },
  {
    file: 'src/app/admin/service-forms/page.tsx',
    find: 'Admin Notes',
    replace: '{t("adminNotes")}'
  },
  {
    file: 'src/app/admin/service-forms/page.tsx',
    find: 'No additional data submitted.',
    replace: '{t("noAdditionalData")}'
  },
  
  // admin/DeleteModal.tsx
  {
    file: 'src/components/admin/DeleteModal.tsx',
    find: 'Delete Client',
    replace: '{t("deleteClient")}'
  },
  {
    file: 'src/components/admin/DeleteModal.tsx',
    find: '>Client information and project details<',
    replace: '>{t("clientInfo")}<'
  },
  {
    file: 'src/components/admin/DeleteModal.tsx',
    find: '>All payment records<',
    replace: '>{t("allPayment")}<'
  },
  {
    file: 'src/components/admin/DeleteModal.tsx',
    find: '>All uploaded photos<',
    replace: '>{t("allPhotos")}<'
  },
  {
    file: 'src/components/admin/DeleteModal.tsx',
    find: '>All invoices<',
    replace: '>{t("allInvoices")}<'
  },
  {
    file: 'src/components/admin/DeleteModal.tsx',
    find: '>Project Details<',
    replace: '>{t("projectDetails")}<'
  },
  {
    file: 'src/components/admin/DeleteModal.tsx',
    find: '>Client:<',
    replace: '>{t("clientLabel")}<'
  },
  {
    file: 'src/components/admin/DeleteModal.tsx',
    find: '>Phone:<',
    replace: '>{t("phoneLabel")}<'
  },
  {
    file: 'src/components/admin/DeleteModal.tsx',
    find: '>Email:<',
    replace: '>{t("emailLabel")}<'
  },
  {
    file: 'src/components/admin/DeleteModal.tsx',
    find: '>Total Price:<',
    replace: '>{t("totalPrice")}<'
  },
  {
    file: 'src/components/admin/DeleteModal.tsx',
    find: '>Outstanding Balance:<',
    replace: '>{t("outstandingBalance")}<'
  },
  {
    file: 'src/components/admin/DeleteModal.tsx',
    find: 'Outstanding Balance Warning',
    replace: '{t("outstandingWarning")}'
  },
  
  // InvoiceModal.tsx
  {
    file: 'src/components/admin/InvoiceModal.tsx',
    find: '>Create Invoice<',
    replace: '>{t("createInvoice")}<'
  },
  {
    file: 'src/components/admin/InvoiceModal.tsx',
    find: '>Client Information<',
    replace: '>{t("clientInfo")}<'
  },
  {
    file: 'src/components/admin/InvoiceModal.tsx',
    find: '>Client:<',
    replace: '>{t("clientLabel")}<'
  },
  {
    file: 'src/components/admin/InvoiceModal.tsx',
    find: '>Phone:<',
    replace: '>{t("phoneLabel")}<'
  },
  {
    file: 'src/components/admin/InvoiceModal.tsx',
    find: '>Email:<',
    replace: '>{t("emailLabel")}<'
  },
  {
    file: 'src/components/admin/InvoiceModal.tsx',
    find: '>Service:<',
    replace: '>{t("serviceLabel")}<'
  },
  {
    file: 'src/components/admin/InvoiceModal.tsx',
    find: '>Address:<',
    replace: '>{t("addressLabel")}<'
  },
  {
    file: 'src/components/admin/InvoiceModal.tsx',
    find: '>Location:<',
    replace: '>{t("locationLabel")}<'
  },
  {
    file: 'src/components/admin/InvoiceModal.tsx',
    find: '>Invoice Details<',
    replace: '>{t("invoiceDetails")}<'
  },
  {
    file: 'src/components/admin/InvoiceModal.tsx',
    find: '>Invoice Preview<',
    replace: '>{t("invoicePreview")}<'
  },
  {
    file: 'src/components/admin/InvoiceModal.tsx',
    find: '>Subtotal:<',
    replace: '>{t("subtotal")}<'
  },
  {
    file: 'src/components/admin/InvoiceModal.tsx',
    find: '>VAT (7.7%):<',
    replace: '>{t("vat")}<'
  },
  {
    file: 'src/components/admin/InvoiceModal.tsx',
    find: '>Total:<',
    replace: '>{t("total")}<'
  },
  
  // PaymentModal.tsx
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>Add Payment<',
    replace: '>{t("addPayment")}<'
  },
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>Project Details<',
    replace: '>{t("projectDetails")}<'
  },
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>Client:<',
    replace: '>{t("clientLabel")}<'
  },
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>Phone:<',
    replace: '>{t("phoneLabel")}<'
  },
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>Email:<',
    replace: '>{t("emailLabel")}<'
  },
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>Total Price:<',
    replace: '>{t("totalPrice")}<'
  },
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>Paid Amount:<',
    replace: '>{t("paidAmount")}<'
  },
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>Balance:<',
    replace: '>{t("balance")}<'
  },
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>Payment Details<',
    replace: '>{t("paymentDetails")}<'
  },
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>Cash<',
    replace: '>{t("cash")}<'
  },
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>Bank Transfer<',
    replace: '>{t("bankTransfer")}<'
  },
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>Credit Card<',
    replace: '>{t("creditCard")}<'
  },
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>PayPal<',
    replace: '>{t("payPal")}<'
  },
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>Payment Summary<',
    replace: '>{t("paymentSummary")}<'
  },
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>Payment Amount:<',
    replace: '>{t("paymentAmount")}<'
  },
  {
    file: 'src/components/admin/PaymentModal.tsx',
    find: '>Remaining Balance:<',
    replace: '>{t("remainingBalance")}<'
  },
  
  // PhotoModal.tsx
  {
    file: 'src/components/admin/PhotoModal.tsx',
    find: '>Photo Album<',
    replace: '>{t("photoAlbum")}<'
  },
  {
    file: 'src/components/admin/PhotoModal.tsx',
    find: '>Upload Photos<',
    replace: '>{t("uploadPhotos")}<'
  },
  {
    file: 'src/components/admin/PhotoModal.tsx',
    find: 'Drag and drop photos here, or click to select',
    replace: '{t("dragDrop")}'
  },
  {
    file: 'src/components/admin/PhotoModal.tsx',
    find: '>No Photos Yet<',
    replace: '>{t("noPhotos")}<'
  },
  {
    file: 'src/components/admin/PhotoModal.tsx',
    find: 'Upload some photos to get started',
    replace: '{t("uploadSome")}'
  },
  
  // ServiceFormWizard.tsx
  {
    file: 'src/components/ServiceFormWizard.tsx',
    find: '>Admin Dashboard: Finalizing Project Setup<',
    replace: '>{tl("admin.finalizingProjectSetup")}<' // need to see if tl exists and passes admin key. Actually we added it to `components.serviceWizard`
  },
  
  // ServiceForm.tsx
  {
    file: 'src/components/ServiceForm.tsx',
    find: '>1 Zimmer<',
    replace: '>{t("room1")}<'
  },
  {
    file: 'src/components/ServiceForm.tsx',
    find: '>2 Zimmer<',
    replace: '>{t("room2")}<'
  },
  {
    file: 'src/components/ServiceForm.tsx',
    find: '>3 Zimmer<',
    replace: '>{t("room3")}<'
  },
  {
    file: 'src/components/ServiceForm.tsx',
    find: '>4 Zimmer<',
    replace: '>{t("room4")}<'
  },
  {
    file: 'src/components/ServiceForm.tsx',
    find: '>5+ Zimmer<',
    replace: '>{t("room5")}<'
  },
  
  // Footer.tsx
  {
    file: 'src/components/Footer.tsx',
    find: '>Reinigungsfirma<',
    replace: '>{t("cleaningCompany")}<'
  },
  {
    file: 'src/components/Footer.tsx',
    find: '>Umzugsfirma<',
    replace: '>{t("movingCompany")}<'
  },
  {
    file: 'src/components/Footer.tsx',
    find: '>Unterhaltsreinigung<',
    replace: '>{t("maintenanceCleaning")}<'
  },
  {
    file: 'src/components/Footer.tsx',
    find: '>Fensterreinigung<',
    replace: '>{t("windowCleaning")}<'
  },
  {
    file: 'src/components/Footer.tsx',
    find: '>Baureinigung<',
    replace: '>{t("constructionCleaning")}<'
  },
  {
    file: 'src/components/Footer.tsx',
    find: '>Gastro Reinigung<',
    replace: '>{t("gastroCleaning")}<'
  },
  {
    file: 'src/components/Footer.tsx',
    find: '>Transportfirma<',
    replace: '>{t("transportCompany")}<'
  },
  {
    file: 'src/components/Footer.tsx',
    find: '>Entsorgung<',
    replace: '>{t("disposal")}<'
  },
  {
    file: 'src/components/Footer.tsx',
    find: '>Facility Service<',
    replace: '>{t("facilityService")}<'
  },
  {
    file: 'src/components/Footer.tsx',
    find: '>Hauswartung<',
    replace: '>{t("propertyMaintenance")}<'
  }
];

// Special replacements for ternary translation lines
const ternaries = [
  // we will leave ternaries to be replaced by another script or multi_replace
];

for (const r of replacements) {
  let content = fs.readFileSync(r.file, 'utf8');
  content = content.replace(new RegExp(r.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), r.replace);
  
  // Add missing useTranslations for modals
  if (r.file.includes('admin/') && !r.file.includes('page.tsx')) {
    if (!content.includes("const t = useTranslations(")) {
       let ns = "admin";
       if (r.file.includes('DeleteModal')) ns = "admin.deleteModal";
       if (r.file.includes('InvoiceModal')) ns = "admin.invoiceModal";
       if (r.file.includes('PaymentModal')) ns = "admin.paymentModal";
       if (r.file.includes('PhotoModal')) ns = "admin.photoModal";
       
       if (content.includes("export default function")) {
          content = content.replace(/export default function\s+\w+\s*\([^)]*\)\s*\{/, `$& \n  const t = useTranslations('${ns}');\n`);
       } else if (content.includes("export function")) {
          content = content.replace(/export function\s+\w+\s*\([^)]*\)\s*\{/, `$& \n  const t = useTranslations('${ns}');\n`);
       } else if (content.includes("const ") && content.includes(" = ({")) {
          content = content.replace(/(const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*\{)/, `$1\n  const t = useTranslations('${ns}');\n`);
       }
       if (!content.includes("useTranslations")) {
          content = "import { useTranslations } from 'next-intl';\n" + content;
       }
    }
  } else if (r.file.includes('Footer.tsx')) {
    if (!content.includes("const t = useTranslations(")) {
       content = content.replace(/export default function Footer\(\)\s*\{/, `$& \n  const t = useTranslations('components.footer');\n`);
    }
  } else if (r.file.includes('ServiceForm.tsx')) {
    if (!content.includes("const t = useTranslations(")) {
       content = content.replace(/export default function ServiceForm\([^)]*\)\s*\{/, `$& \n  const t = useTranslations('components.serviceForm');\n`);
    }
  }
  
  fs.writeFileSync(r.file, content);
}

console.log("Successfully replaced hardcoded strings.");
