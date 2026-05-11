const fs = require('fs');
const path = require('path');

// ============================================================
// 1) UPDATE ABOUT US STORY TEXT
// ============================================================

const storyEN = {
  title: "About us",
  description: "SwissCleanMove is your professional partner for moving, move-out cleaning with handover guarantee, maintenance cleaning, and facility services in Switzerland.\n\nBased in Biel/Bienne, we serve private clients, businesses, and administrations in Bern, Zurich, and throughout Switzerland with reliable services according to Swiss quality standards.\n\nProfessional. Reliable. Nationwide.",
  qualityBadge: "Swiss Quality since 2024",
  teamImage: "Our professional team"
};

const storyDE = {
  title: "Über uns",
  description: "SwissCleanMove ist Ihr professioneller Partner für Umzug, Umzugsreinigung mit Abnahmegarantie, Unterhaltsreinigung und Facility Services in der Schweiz.\n\nMit Sitz in Biel/Bienne betreuen wir Privatkunden, Unternehmen und Verwaltungen in Bern, Zürich und der ganzen Schweiz mit zuverlässigen Dienstleistungen nach Schweizer Qualitätsstandards.\n\nProfessionell. Zuverlässig. Schweizweit.",
  qualityBadge: "Schweizer Qualität seit 2024",
  teamImage: "Unser professionelles Team"
};

const storyFR = {
  title: "À propos de nous",
  description: "SwissCleanMove est votre partenaire professionnel pour le déménagement, le nettoyage de fin de bail avec garantie de remise, le nettoyage d'entretien et les services de facility en Suisse.\n\nBasés à Biel/Bienne, nous accompagnons les particuliers, les entreprises et les administrations à Berne, Zurich et dans toute la Suisse avec des prestations fiables selon les standards de qualité suisses.\n\nProfessionnel. Fiable. Dans toute la Suisse.",
  qualityBadge: "Qualité suisse depuis 2024",
  teamImage: "Notre équipe professionnelle"
};

const langs = [
  { file: 'messages/en.json', story: storyEN },
  { file: 'messages/de.json', story: storyDE },
  { file: 'messages/fr.json', story: storyFR }
];

langs.forEach(({ file, story }) => {
  const filePath = path.join(__dirname, file);
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  json.about.story = story;
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`✅ Updated about.story in ${file}`);
});

console.log('\nDone! About Us story text updated in all languages.');
