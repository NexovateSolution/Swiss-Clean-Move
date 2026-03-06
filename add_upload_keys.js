const fs = require('fs');

const langs = ['en', 'de', 'fr'];

langs.forEach(lang => {
    const file = `messages/${lang}.json`;
    let data;
    try {
        data = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (err) {
        console.error(`Error reading ${file}:`, err);
        return;
    }

    // ensure serviceForm exists
    if (!data.serviceForm) {
        data.serviceForm = {};
    }

    // assign upload keys based on language
    if (lang === 'en') {
        data.serviceForm.upload = {
            title: "Upload Pictures (Optional)",
            description: "Attach photos of your property to help us provide a more accurate quote.",
            button: "Click to select images"
        };
    } else if (lang === 'de') {
        data.serviceForm.upload = {
            title: "Bilder hochladen (Optional)",
            description: "Hängen Sie Fotos Ihrer Immobilie an, damit wir ein genaueres Angebot erstellen können.",
            button: "Klicken Sie, um Bilder auszuwählen"
        };
    } else if (lang === 'fr') {
        data.serviceForm.upload = {
            title: "Télécharger des photos (Optionnel)",
            description: "Joignez des photos de votre propriété pour nous aider à vous fournir un devis plus précis.",
            button: "Cliquez pour sélectionner des images"
        };
    }

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${file}`);
});
console.log('Finished updating translations.');
