const fs = require('fs');
const files = ['messages/en.json', 'messages/de.json', 'messages/fr.json', 'messages/nl.json'];
files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        JSON.parse(content);
        console.log(`${file}: VALID`);
    } catch (e) {
        console.error(`${file}: INVALID - ${e.message}`);
    }
});
