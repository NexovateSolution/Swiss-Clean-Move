const fs = require('fs');

const seoLandingData = {
  de: {
    operationalAreas: "Einsatzgebiete",
    teamsDailyOperation: "Unsere Teams sind täglich im Einsatz in:",
    fastAvailability: "Schnelle Verfügbarkeit in der Region {city}",
    onTheMap: "{city} auf der Karte",
    faq: "Häufig gestellte Fragen (FAQ)",
    faqShort: "Häufige Fragen (FAQ)",
    allRegions: "Alle Regionen",
    serviceThroughoutCh: "Service schweizweit"
  },
  en: {
    operationalAreas: "Service Areas",
    teamsDailyOperation: "Our teams operate daily in:",
    fastAvailability: "Fast availability in the {city} region",
    onTheMap: "{city} on the map",
    faq: "Frequently Asked Questions (FAQ)",
    faqShort: "FAQ",
    allRegions: "All Regions",
    serviceThroughoutCh: "Service throughout Switzerland"
  },
  fr: {
    operationalAreas: "Zones d'intervention",
    teamsDailyOperation: "Nos équipes interviennent quotidiennement à :",
    fastAvailability: "Disponibilité rapide dans la région de {city}",
    onTheMap: "{city} sur la carte",
    faq: "Foire Aux Questions (FAQ)",
    faqShort: "FAQ",
    allRegions: "Toutes les régions",
    serviceThroughoutCh: "Service dans toute la Suisse"
  },
  it: {
    operationalAreas: "Aree di intervento",
    teamsDailyOperation: "I nostri team operano quotidianamente a:",
    fastAvailability: "Disponibilità rapida nella regione di {city}",
    onTheMap: "{city} sulla mappa",
    faq: "Domande Frequenti (FAQ)",
    faqShort: "FAQ",
    allRegions: "Tutte le regioni",
    serviceThroughoutCh: "Servizio in tutta la Svizzera"
  }
};

const langs = ['de', 'en', 'fr', 'it'];
for (const lang of langs) {
  const filePath = `messages/${lang}.json`;
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data.seoLanding) {
      data.seoLanding = seoLandingData[lang];
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Added seoLanding to ${lang}.json`);
    } else {
      console.log(`seoLanding already exists in ${lang}.json`);
    }
  }
}
