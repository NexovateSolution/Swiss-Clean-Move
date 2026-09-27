const fs = require('fs');

const deJsonPath = 'messages/de.json';
const data = JSON.parse(fs.readFileSync(deJsonPath, 'utf8'));

// 1. Replace Facility Service globally in de.json values
function replaceFacilityService(obj) {
  for (let k in obj) {
    if (typeof obj[k] === 'string') {
      obj[k] = obj[k].replace(/Facility Services/g, 'Hauswartung & Gebäudeunterhalt')
                     .replace(/Facility Service/g, 'Hauswartung & Gebäudeunterhalt');
    } else if (typeof obj[k] === 'object') {
      replaceFacilityService(obj[k]);
    }
  }
}
replaceFacilityService(data);

// 2. Rebuild seoPages.reinigungsfirmaBiel
data.seoPages.reinigungsfirmaBiel = {
  meta: {
    title: "Reinigungsfirma Biel | Reinigung & Hauswartung | SwissCleanMove",
    description: "Professionelle Reinigungsfirma in Biel und im Seeland für Haushalte, Büros, Praxen, Umzugsreinigungen und Hauswartung. Kostenlose Offerte anfordern."
  },
  h1: "Reinigungsfirma Biel – Professionelle Reinigung im Seeland",
  heroSubtitle: "Ihre zuverlässige Reinigungsfirma in Biel/Bienne und im gesamten Seeland. Wir bieten massgeschneiderte Reinigungslösungen für Privatpersonen, Unternehmen und Liegenschaftsverwaltungen.",
  trustPoints: [
    "Kostenlose & transparente Offerten",
    "Geschultes & fest angestelltes Personal",
    "Umfassende Haftpflichtversicherung"
  ],
  ctaPrimary: "Kostenlose Offerte anfordern",
  ctaSecondary: "Jetzt anrufen: +41 78 215 80 30",
  ctaWhatsapp: "WhatsApp Nachricht senden",
  sections: [
    {
      heading: "Ihre zuverlässige Reinigungsfirma in Biel/Bienne",
      body: "SwissCleanMove ist Ihr verlässlicher Partner für alle Anliegen rund um die Reinigung in Biel/Bienne und im gesamten Seeland. Wir verstehen, dass Sauberkeit eine Vertrauenssache ist. Deshalb setzen wir ausschliesslich auf fest angestelltes, sorgfältig geschultes Personal und umweltschonende Reinigungsmittel. Ob für Ihren Privathaushalt, Ihr Büro oder eine komplette Liegenschaft – wir reinigen mit höchster Präzision und garantieren Ihnen einwandfreie Ergebnisse. Zählen Sie auf Schweizer Qualität und eine professionelle Betreuung von der ersten kostenlosen Besichtigung bis zum Abschluss der Arbeiten."
    },
    {
      heading: "Unsere Reinigungsleistungen in Biel und im Seeland",
      body: "Wir bieten ein umfassendes Spektrum an professionellen Reinigungsdienstleistungen, die exakt auf Ihre Bedürfnisse abgestimmt werden können. Entdecken Sie unser Angebot:"
    },
    {
      heading: "Warum SwissCleanMove in Biel?",
      body: "Als lokal verankerte Reinigungsfirma in Biel/Bienne profitieren Sie von kurzen Wegen, hoher Flexibilität und einer starken Verbundenheit mit der Region. Wir sind rasch vor Ort, wenn Sie uns brauchen – sei es für geplante Unterhaltsreinigungen oder kurzfristige Notfälle im Seeland. Wir legen grossen Wert auf eine transparente Preisgestaltung ohne versteckte Kosten und einen persönlichen Ansprechpartner, der Ihre individuellen Anforderungen genau kennt."
    }
  ],
  serviceBulletsHeading: "Unsere Reinigungsleistungen im Überblick",
  serviceBullets: [
    "Umzugsreinigung mit Abnahmegarantie",
    "Unterhaltsreinigung",
    "Haushaltsreinigung",
    "Büro- und Praxisreinigung",
    "Fenster- und Storenreinigung",
    "Gastronomiereinigung",
    "Treppenhausreinigung und Hauswartung",
    "Bau- und Spezialreinigung"
  ],
  internalLinksHeading: "Weitere Dienstleistungen in Biel",
  internalLinks: [
    { label: "Unterhaltsreinigung Biel", href: "unterhaltsreinigung-biel" },
    { label: "Umzugsreinigung Biel", href: "endreinigung-biel" },
    { label: "Fensterreinigung Biel", href: "fensterreinigung-biel" },
    { label: "Baureinigung Biel", href: "baureinigung-biel" },
    { label: "Gastronomiereinigung Biel", href: "gastronomie-reinigung-biel" },
    { label: "Hauswartung Biel", href: "hauswartung-biel" },
    { label: "Haushaltshilfe", href: "haushaltshilfe-biel" }
  ],
  ctaMidHeading: "Reinigungsfirma in Biel gesucht?",
  ctaMidBody: "Fordern Sie jetzt Ihre kostenlose und unverbindliche Offerte an. Wir beraten Sie gerne persönlich vor Ort.",
  ctaMid: "Offerte anfordern",
  ctaStrongHeading: "Kontaktieren Sie Ihre Reinigungsfirma in Biel",
  ctaStrongBody: "Wir sind gerne für Sie da. Rufen Sie uns an oder füllen Sie das Kontaktformular aus, um ein massgeschneidertes Angebot für Ihre Reinigung im Seeland zu erhalten.",
  ctaStrong: "Jetzt Offerte anfordern",
  faqs: [
    {
      "question": "Welche Reinigungsdienstleistungen bieten Sie in Biel an?",
      "answer": "Wir bieten eine breite Palette an Dienstleistungen: Umzugsreinigung mit Abnahmegarantie, regelmässige Unterhalts- und Büroreinigung, Fensterreinigung, Baureinigung sowie umfassende Hauswartung für Liegenschaften in Biel und dem gesamten Seeland."
    },
    {
      "question": "Ist die Erstellung einer Offerte kostenlos?",
      "answer": "Ja, wir führen in der Region Biel gerne eine kostenlose Besichtigung vor Ort durch und erstellen Ihnen daraufhin eine unverbindliche, transparente Offerte ohne versteckte Kosten."
    },
    {
      "question": "Bieten Sie bei der Umzugsreinigung eine Abnahmegarantie?",
      "answer": "Selbstverständlich. Unsere Umzugsreinigungen in Biel beinhalten stets eine 100% Abnahmegarantie. Wir sind bei der Wohnungsübergabe anwesend und reinigen falls nötig sofort und kostenlos nach."
    },
    {
      "question": "Bringen Sie das Reinigungsmaterial und die Ausrüstung selbst mit?",
      "answer": "Ja, unsere Reinigungsteams sind vollständig mit professionellen, umweltschonenden Reinigungsmitteln und modernsten Geräten ausgestattet. Sie müssen sich um nichts kümmern."
    },
    {
      "question": "Bieten Sie auch regelmässige Reinigungen an?",
      "answer": "Ja, wir bieten regelmässige Unterhaltsreinigungen (z.B. wöchentlich oder zweiwöchentlich) für Privathaushalte, Büros und Praxen in Biel an. Die Intervalle passen wir flexibel Ihren Wünschen an."
    },
    {
      "question": "In welchen Regionen sind Sie tätig?",
      "answer": "Unser Hauptfokus liegt auf Biel/Bienne und dem gesamten Seeland. Dazu gehören auch umliegende Gemeinden wie Nidau, Brügg, Ipsach, Port, Lyss, Aarberg, Pieterlen und Orpund."
    },
    {
      "question": "Wie setzen sich Ihre Preise zusammen?",
      "answer": "Unsere Preise basieren auf dem effektiven Aufwand oder festgelegten Fixpreisen nach einer Besichtigung. Sie erhalten eine transparente Offerte, in der alle Kosten (Material, Fahrspesen, Versicherungen, Sozialleistungen) bereits enthalten sind."
    },
    {
      "question": "Wie kann ich SwissCleanMove kontaktieren?",
      "answer": "Sie können uns telefonisch unter +41 78 215 80 30 erreichen, eine E-Mail an info@swisscleanmove.ch senden oder ganz einfach unser Kontaktformular auf der Website ausfüllen."
    }
  ]
};

// Also fix company details if old number is anywhere
function fixCompanyDetails(obj) {
  for (let k in obj) {
    if (typeof obj[k] === 'string') {
      obj[k] = obj[k].replace(/\+41 76 488 36 89/g, ''); // Remove old number if it exists
    } else if (typeof obj[k] === 'object') {
      fixCompanyDetails(obj[k]);
    }
  }
}
fixCompanyDetails(data);

fs.writeFileSync(deJsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated messages/de.json successfully.');
