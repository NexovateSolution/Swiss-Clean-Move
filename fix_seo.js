const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'messages', 'de.json');
const enPath = path.join(__dirname, 'messages', 'en.json');
const frPath = path.join(__dirname, 'messages', 'fr.json');

const deData = JSON.parse(fs.readFileSync(dePath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const frData = JSON.parse(fs.readFileSync(frPath, 'utf8'));

const keys = Object.keys(deData.seoPages);

const introVariations = [
  "Willkommen bei SwissCleanMove. Wenn Sie auf der Suche nach höchster Schweizer Qualität, absoluter Zuverlässigkeit und transparenten Preisen in dieser Region sind, dann sind Sie hier genau richtig. Wir verstehen, dass Dienstleistungen im Bereich Reinigung, Umzug und Facility Management Vertrauenssache sind.",
  "Herzlich willkommen bei SwissCleanMove – Ihrem Premium-Partner vor Ort. Wir bieten Ihnen Dienstleistungen nach strengsten Schweizer Massstäben. Bei uns stehen Transparenz, Pünktlichkeit und höchste Sorgfalt an erster Stelle. Vertrauen Sie auf unser fest angestelltes, kompetentes Team für eine reibungslose Abwicklung.",
  "Grüezi bei SwissCleanMove! Als Ihr lokaler Experte wissen wir genau, worauf es ankommt. Wir verzichten ganz bewusst auf Subunternehmer und setzen stattdessen auf unser eigenes, hervorragend geschultes Fachpersonal. Geniessen Sie absolute Kostentransparenz und Schweizer Premium-Qualität.",
  "Ihr zuverlässiger Partner in der Region – SwissCleanMove. Ob für Privat oder Gewerbe, wir setzen branchenweit neue Standards in Sachen Sauberkeit und Transport. Mit unserer langjährigen Erfahrung garantieren wir Ihnen ein absolut stressfreies Erlebnis von der ersten Offerte bis zur finalen Abnahme.",
  "Willkommen bei den Experten von SwissCleanMove. Wir sind stolz darauf, unseren Kunden in dieser Region Dienstleistungen auf höchstem Schweizer Niveau anzubieten. Unsere Firmenphilosophie basiert auf echter Kundennähe, klaren Preisen ohne versteckte Kosten und 100% Zuverlässigkeit bei jedem Einsatz."
];

const removeAiWording = (text) => {
  return text
    .replace(/in today's world/gi, 'aktuell')
    .replace(/whether you're/gi, 'ob Sie')
    .replace(/look no further/gi, 'sind wir Ihr idealer Partner');
};

keys.forEach((key, index) => {
  const page = deData.seoPages[key];
  if (!page) return;

  // Fix Repetitive Intro
  if (page.intro) {
    const originalIntro = page.intro.split("Wenn Sie auf der Suche")[0]; // extract the very first part if preserved
    const variation = introVariations[index % introVariations.length];
    if (page.intro.includes("Wenn Sie auf der Suche nach höchster Schweizer Qualität")) {
        page.intro = originalIntro + variation + " " + page.intro.split("Wir decken das gesamte Spektrum ab.")[1];
        if(page.intro.includes("undefined")) {
            // fallback if split failed
            page.intro = originalIntro + variation + " Ob für Privatpersonen oder Unternehmen, wir bieten massgeschneiderte Lösungen. Kontaktieren Sie uns für eine kostenlose Offerte.";
        }
    }
    page.intro = removeAiWording(page.intro);
  }

  // Remove AI wording in sections
  if (page.sections) {
    page.sections.forEach(sec => {
      if (sec.body) sec.body = removeAiWording(sec.body);
    });
  }

  // Fix FAQ overuse by slightly rephrasing the standard FAQs per batch of 5
  if (page.faqs) {
    page.faqs.forEach((faq, fIndex) => {
      // Modify question to make it distinct
      if (faq.question.includes("Wie wird der genaue Preis")) {
        const qVars = [
          "Wie wird der genaue Preis für diese Dienstleistung berechnet?",
          "Wie kalkulieren Sie die Kosten für diesen Service?",
          "Welche Faktoren bestimmen den Endpreis?",
          "Auf welcher Basis erstellen Sie die Offerten?",
          "Sind Ihre Preise für diese Dienstleistung fix?"
        ];
        faq.question = qVars[index % 5];
      }
      if (faq.question.includes("Bringen Sie Ihr eigenes")) {
        const qVars = [
          "Bringen Sie Ihr eigenes, professionelles Equipment mit?",
          "Stellen Sie die benötigten Reinigungsmittel und Geräte?",
          "Muss ich für den Einsatz Werkzeug bereitstellen?",
          "Arbeiten Sie mit eigenem Material?",
          "Sind Maschinen und Putzmittel im Service inbegriffen?"
        ];
        faq.question = qVars[index % 5];
      }
      if (faq.question.includes("Wie schnell können Sie für einen Einsatz vor Ort sein?")) {
        const qVars = [
          "Wie schnell können Sie für einen Einsatz vor Ort sein?",
          "Wie kurzfristig sind Terminbuchungen möglich?",
          "Bieten Sie auch Notfalleinsätze an?",
          "Wie lange im Voraus sollte ich buchen?",
          "Sind Sie auch für spontane Einsätze verfügbar?"
        ];
        faq.question = qVars[index % 5];
      }
    });
  }

  enData.seoPages[key] = JSON.parse(JSON.stringify(page));
  frData.seoPages[key] = JSON.parse(JSON.stringify(page));
});

fs.writeFileSync(dePath, JSON.stringify(deData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(frPath, JSON.stringify(frData, null, 2), 'utf8');

console.log("Variations applied successfully.");
