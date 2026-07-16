const fs = require('fs');

const file = 'src/lib/translations.ts';
let content = fs.readFileSync(file, 'utf8');

const missing = {
    keyInPerson: "{ en: 'Key handover in person', de: 'Schlüsselübergabe persönlich', fr: 'Remise des clés en personne' }",
    keyMailbox: "{ en: 'Key in mailbox', de: 'Schlüssel im Briefkasten', fr: 'Clé dans la boîte aux lettres' }",
    propertyManagement: "{ en: 'Key at property management', de: 'Schlüssel bei der Verwaltung', fr: 'Clé à la gérance' }",
    other: "{ en: 'Other', de: 'Andere', fr: 'Autre' }",
    intensiveKitchen: "{ en: 'Intensive kitchen cleaning', de: 'Intensive Küchenreinigung', fr: 'Nettoyage intensif de la cuisine' }",
    gastronomyCleaning: "{ en: 'Gastronomy cleaning', de: 'Gastronomiereinigung', fr: 'Nettoyage gastronomique' }",
    fixed: "{ en: 'Fixed', de: 'Fix', fr: 'Fixe' }",
    oneTime: "{ en: 'One-time', de: 'Einmalig', fr: 'Unique' }",
    greaseRemoval: "{ en: 'Grease removal', de: 'Fettentfernung', fr: 'Élimination des graisses' }",
    hoodCleaning: "{ en: 'Hood cleaning', de: 'Dunstabzugsreinigung', fr: 'Nettoyage de hotte' }",
    deepFryer: "{ en: 'Deep fryer cleaning', de: 'Fritteusenreinigung', fr: 'Nettoyage de friteuse' }",
    storageBackRooms: "{ en: 'Storage / Back rooms', de: 'Lager / Hinterzimmer', fr: 'Stockage / Arrière-salles' }",
    highPressure: "{ en: 'High pressure cleaning', de: 'Hochdruckreinigung', fr: 'Nettoyage haute pression' }",
    nicotineCleaning: "{ en: 'Nicotine cleaning', de: 'Nikotinreinigung', fr: 'Nettoyage nicotine' }",
    glassFacade: "{ en: 'Glass facade', de: 'Glasfassade', fr: 'Façade en verre' }",
    mustReserve: "{ en: 'Must reserve parking', de: 'Parkplatz muss reserviert werden', fr: 'Doit réserver un parking' }",
    assistReservation: "{ en: 'Assist with reservation', de: 'Hilfe bei Reservierung benötigt', fr: 'Aide à la réservation' }",
    noParkingZone: "{ en: 'No parking zone', de: 'Parkverbot', fr: 'Zone sans stationnement' }",
    restrictedAccess: "{ en: 'Restricted access', de: 'Eingeschränkter Zugang', fr: 'Accès restreint' }",
    salesFloor: "{ en: 'Sales floor', de: 'Verkaufsfläche', fr: 'Surface de vente' }",
    shopWindows: "{ en: 'Shop windows', de: 'Schaufenster', fr: 'Vitrines' }",
    shelvesDisplays: "{ en: 'Shelves and displays', de: 'Regale und Displays', fr: 'Étagères et présentoirs' }",
    checkoutArea: "{ en: 'Checkout area', de: 'Kassenbereich', fr: 'Zone de caisse' }",
    roughCleaning: "{ en: 'Rough cleaning', de: 'Grobreinigung', fr: 'Nettoyage grossier' }",
    intermediateCleaning: "{ en: 'Intermediate cleaning', de: 'Zwischenreinigung', fr: 'Nettoyage intermédiaire' }",
    finalConstructionCleaning: "{ en: 'Final construction cleaning', de: 'Bauendreinigung', fr: 'Nettoyage final de chantier' }",
    carpetCleaning: "{ en: 'Carpet cleaning', de: 'Teppichreinigung', fr: 'Nettoyage de tapis' }",
    hardToReachWindows: "{ en: 'Hard to reach windows', de: 'Schwer zugängliche Fenster', fr: 'Fenêtres difficiles d\\'accès' }",
    disinfection: "{ en: 'Disinfection', de: 'Desinfektion', fr: 'Désinfection' }"
};

// Insert into valLabels
let insertion = '';
for (const [k, v] of Object.entries(missing)) {
    if (!content.includes(k + ': {')) {
        insertion += `            ${k}: ${v},\n`;
    }
}

if (insertion) {
    content = content.replace('export const valLabels: Record<string, Record<string, string>> = {', 'export const valLabels: Record<string, Record<string, string>> = {\n' + insertion);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Inserted missing translations successfully.');
} else {
    console.log('No missing translations to insert.');
}
