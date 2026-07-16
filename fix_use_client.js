const fs = require('fs');

const files = [
  'src/components/admin/DeleteModal.tsx',
  'src/components/admin/InvoiceModal.tsx',
  'src/components/admin/PaymentModal.tsx',
  'src/components/admin/PhotoModal.tsx',
  'src/components/RegionLandingPage.tsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // If we have import before 'use client'
    if (content.startsWith("import { useTranslations } from 'next-intl';\n'use client'")) {
       content = content.replace(
         "import { useTranslations } from 'next-intl';\n'use client'",
         "'use client';\nimport { useTranslations } from 'next-intl';"
       );
       fs.writeFileSync(file, content);
       console.log('Fixed use client in', file);
    } else if (content.startsWith("import { useTranslations } from 'next-intl';\n\"use client\"")) {
       content = content.replace(
         "import { useTranslations } from 'next-intl';\n\"use client\"",
         "\"use client\";\nimport { useTranslations } from 'next-intl';"
       );
       fs.writeFileSync(file, content);
       console.log('Fixed use client in', file);
    } else if (content.match(/^import \{ useTranslations \} from 'next-intl';\n\s*['"]use client['"]/)) {
        // More robust regex
        content = content.replace(/^import \{ useTranslations \} from 'next-intl';\n\s*(['"]use client['"];?)/, "$1\nimport { useTranslations } from 'next-intl';");
        fs.writeFileSync(file, content);
        console.log('Fixed use client via regex in', file);
    }
  }
}
