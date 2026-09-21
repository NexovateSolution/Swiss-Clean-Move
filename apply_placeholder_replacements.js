const fs = require('fs');

function replaceFile(path, replacements) {
  let content = fs.readFileSync(path, 'utf8');
  let original = content;
  
  for (const [search, replace] of replacements) {
    // If search is a string, replace all instances of it
    if (typeof search === 'string') {
      content = content.split(search).join(replace);
    } else {
      content = content.replace(search, replace);
    }
  }
  
  if (content !== original) {
    fs.writeFileSync(path, content);
    console.log(`Updated ${path}`);
  }
}

// 1. ServiceSelectionSlice.tsx
replaceFile('src/components/universal-form/slices/ServiceSelectionSlice.tsx', [
  ['Wählen Sie eine oder mehrere Dienstleistungen / Select one or more services', "{t('universalForm.services.subtitle')}"],
  ["✅ {data.services.length} {data.services.length === 1 ? 'Dienstleistung' : 'Dienstleistungen'} ausgewählt", "✅ {t('universalForm.services.selectedCount').replace('{count}', data.services.length.toString())}"]
]);

// 2. PropertyLocationSlice.tsx
replaceFile('src/components/universal-form/slices/PropertyLocationSlice.tsx', [
  ["'Bitte geben Sie die Start- und Zieladresse an / Please provide the collection and delivery addresses'", "t('universalForm.property.subtitleMoving')"],
  ["'Bitte geben Sie den Einsatzort an / Please provide the service location'", "t('universalForm.property.subtitleSingle')"],
  ['placeholder="z.B. Parkplatz vorhanden / Zufahrt eingeschränkt"', 'placeholder={t("universalForm.placeholders.parking")}'],
  ['placeholder="z.B. 20m"', 'placeholder={t("universalForm.placeholders.distance")}']
]);

// 3. MovingDetailsSlice.tsx
replaceFile('src/components/universal-form/slices/MovingDetailsSlice.tsx', [
  ['placeholder="z.B. Waschmaschine, Trockner, Aquarium..."', 'placeholder={t("universalForm.placeholders.movingItems")}'],
  ['placeholder="z.B. 2"', 'placeholder={t("universalForm.placeholders.number")}']
]);

// 4. DateContactSlice.tsx
replaceFile('src/components/universal-form/slices/DateContactSlice.tsx', [
  ['placeholder="z.B. 08:00–12:00 / vormittags"', 'placeholder={t("universalForm.placeholders.timeWindow")}']
]);

// 5. CleaningDetailsSlice.tsx
replaceFile('src/components/universal-form/slices/CleaningDetailsSlice.tsx', [
  ['placeholder="z.B. Küche, Bad, Wohnzimmer, Schlafzimmer..."', 'placeholder={t("universalForm.placeholders.cleaningRooms")}'],
  ['placeholder="z.B. 12"', 'placeholder={t("universalForm.placeholders.number")}'],
  ['placeholder="z.B. 5"', 'placeholder={t("universalForm.placeholders.number")}']
]);
