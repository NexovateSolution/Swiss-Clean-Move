const fs = require('fs');
const files = [
  'src/components/admin/DeleteModal.tsx',
  'src/components/admin/InvoiceModal.tsx',
  'src/components/admin/PaymentModal.tsx',
  'src/components/admin/PhotoModal.tsx',
  'src/app/[locale]/dashboard/page.tsx', // fix_ui.js added useTranslations here, maybe missed import
  'src/components/RegionLandingPage.tsx' // fix_ui.js added useTranslations here, maybe missed import
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('useTranslations(') && !content.includes("import { useTranslations }")) {
      content = "import { useTranslations } from 'next-intl';\n" + content;
      fs.writeFileSync(file, content);
      console.log('Fixed', file);
    }
  }
}
