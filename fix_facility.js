const fs = require('fs');

let f1 = 'src/lib/translations.ts';
if (fs.existsSync(f1)) {
  let t1 = fs.readFileSync(f1, 'utf8');
  t1 = t1.replace(/de: 'Facility-Service Typ'/g, "de: 'Hauswartung Art'")
         .replace(/de: 'Facility Services'/g, "de: 'Hauswartung & Gebäudeunterhalt'");
  fs.writeFileSync(f1, t1);
  console.log('Fixed src/lib/translations.ts');
}

let f2 = 'src/utils/pdfGenerator.ts';
if (fs.existsSync(f2)) {
  let t2 = fs.readFileSync(f2, 'utf8');
  t2 = t2.replace(/receiptFooterServices: 'Reinigung • Umzug • Facility Services',/g, "receiptFooterServices: 'Reinigung • Umzug • Hauswartung',")
         .replace(/de: 'Facility Services'/g, "de: 'Hauswartung & Gebäudeunterhalt'")
         .replace(/de: 'Facility Service Art'/g, "de: 'Hauswartung Art'");
  fs.writeFileSync(f2, t2);
  console.log('Fixed src/utils/pdfGenerator.ts');
}

let f3 = 'src/lib/knowledgeHubData.ts';
if (fs.existsSync(f3)) {
  let t3 = fs.readFileSync(f3, 'utf8');
  t3 = t3.replace(/de: 'Facility Service & Hauswartung'/g, "de: 'Hauswartung & Gebäudeunterhalt'")
         .replace(/de: 'Facility Service'/g, "de: 'Hauswartung'");
  fs.writeFileSync(f3, t3);
  console.log('Fixed src/lib/knowledgeHubData.ts');
}

let f4 = 'src/components/RegionLandingPage.tsx';
if (fs.existsSync(f4)) {
  let t4 = fs.readFileSync(f4, 'utf8');
  t4 = t4.replace(/de: 'Facility Services'/g, "de: 'Hauswartung'")
         .replace(/: 'Facility Service anfragen'/g, ": 'Hauswartung anfragen'")
         .replace(/: 'Facility Service Schweiz'/g, ": 'Hauswartung Schweiz'");
  fs.writeFileSync(f4, t4);
  console.log('Fixed src/components/RegionLandingPage.tsx');
}
