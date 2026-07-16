const fs = require('fs');

const files = [
  'src/components/admin/DeleteModal.tsx',
  'src/components/admin/PaymentModal.tsx',
  'src/components/admin/PhotoModal.tsx',
  'src/components/RegionLandingPage.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Remove any existing 'use client' directive (with or without semicolon, with surrounding whitespace)
  content = content.replace(/['"]use client['"];?\s*/g, '');
  
  // Remove any existing useTranslations import
  content = content.replace(/import\s*\{\s*useTranslations\s*\}\s*from\s*['"]next-intl['"];*;?\s*/g, '');
  
  // Prepend with proper 'use client' + blank line + useTranslations import, using CRLF
  content = "'use client';\r\n\r\nimport { useTranslations } from 'next-intl';\r\n" + content;
  
  // Normalize all line endings to CRLF
  content = content.replace(/\r?\n/g, '\r\n');
  
  fs.writeFileSync(f, content);
  
  // Verify
  const verify = fs.readFileSync(f, 'utf8');
  const firstLine = verify.split(/\r?\n/)[0];
  console.log(`${f}: first line = "${firstLine}" ✓`);
});
