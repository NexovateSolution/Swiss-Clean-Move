const fs = require('fs');
const path = require('path');

const locales = ['de', 'en', 'fr', 'it'];

// Define the natural local enhancements per language for the Homepage
const homepageEnhancements = {
  de: " Ihre professionelle Reinigungsfirma in Biel/Bienne, Bern und der ganzen Schweiz.",
  en: " Your professional cleaning company in Biel/Bienne, Bern and across Switzerland.",
  fr: " Votre entreprise de nettoyage professionnelle à Bienne, Berne et dans toute la Suisse.",
  it: " La tua impresa di pulizie professionale a Biel/Bienne, Berna e in tutta la Svizzera."
};

// Define the natural section additions per language for the Biel SEO Page
const bielSeoEnhancements = {
  de: "Als führende Reinigungsfirma in Biel/Bienne und dem gesamten Seeland bieten wir Ihnen massgeschneiderte Dienstleistungen. Egal ob Sie eine professionelle Gebäudereinigung, Wohnungsreinigung oder Privatreinigung in Biel benötigen – wir sind Ihr Ansprechpartner. Unser Angebot umfasst zudem zuverlässige Haushaltshilfe, regelmässige Unterhaltsreinigung und Büroreinigung für Unternehmen. Für streifenfreie Sicht sorgen wir mit unserer Fensterreinigung und Storenreinigung. Steht ein Umzug an? Vertrauen Sie auf unsere Umzugsreinigung, Endreinigung und Wohnungsendreinigung mit 100% Abnahmegarantie. Auch bei komplexen Aufgaben wie Baureinigung, Treppenhausreinigung, Praxisreinigung, Apothekenreinigung und Gastronomie-Reinigung liefern wir höchste Qualität. Abgerundet wird unser Portfolio durch professionelle Hauswartung, Facility Service, Gebäudeunterhalt und Objektbetreuung im ganzen Seeland.",
  en: "As a leading cleaning company in Biel/Bienne and the entire Seeland region, we offer tailored services. Whether you need professional facility cleaning, apartment cleaning, or private cleaning in Biel – we are your partner. Our services also include reliable household help, regular maintenance cleaning, and office cleaning for businesses. We ensure a streak-free view with our window and blind cleaning. Moving soon? Rely on our move-out cleaning and end-of-tenancy cleaning with a 100% handover guarantee. We also deliver top quality for complex tasks like construction cleaning, stairwell cleaning, medical practice cleaning, pharmacy cleaning, and gastronomy cleaning. Our portfolio is rounded off by professional property maintenance, facility services, and building management throughout Seeland.",
  fr: "En tant qu'entreprise de nettoyage leader à Bienne et dans tout le Seeland, nous vous proposons des services sur mesure. Que vous ayez besoin d'un nettoyage professionnel de bâtiments, de nettoyage d'appartement ou de nettoyage privé à Bienne, nous sommes votre partenaire. Notre offre comprend également une aide ménagère fiable, un nettoyage d'entretien régulier et le nettoyage de bureaux pour les entreprises. Nous assurons une vue sans traces grâce à notre nettoyage de vitres et de stores. Un déménagement de prévu ? Faites confiance à notre nettoyage de déménagement et nettoyage de fin de bail avec une garantie de remise à 100%. Nous fournissons également une qualité irréprochable pour des tâches complexes telles que le nettoyage de fin de chantier, le nettoyage de cages d'escalier, le nettoyage de cabinets médicaux, le nettoyage de pharmacies et le nettoyage pour la gastronomie. Notre portefeuille est complété par la conciergerie professionnelle, le facility service, et l'entretien de bâtiments dans tout le Seeland.",
  it: "Come impresa di pulizie leader a Biel/Bienne e in tutto il Seeland, offriamo servizi su misura. Che abbiate bisogno di pulizie professionali di edifici, pulizie di appartamenti o pulizie private a Biel, siamo il vostro partner. La nostra offerta include anche un aiuto domestico affidabile, pulizie di manutenzione regolari e pulizie di uffici per aziende. Garantiamo una vista senza aloni con la nostra pulizia di vetri e tapparelle. Dovete traslocare? Affidatevi alle nostre pulizie di trasloco e pulizie di fine locazione con garanzia di consegna al 100%. Offriamo altissima qualità anche per compiti complessi come pulizie di fine cantiere, pulizie di scale, pulizie di studi medici, pulizie di farmacie e pulizie per la gastronomie. Il nostro portfolio si completa con manutenzione professionale di immobili, facility service e gestione di edifici in tutto il Seeland."
};

// Define enhanced Internal Links per language
const enhancedLinks = {
  de: [
    { label: "Professionelle Umzüge & Möbeltransport Biel", href: "umzugsfirma-biel" },
    { label: "Umzugsreinigung mit 100% Abnahmegarantie", href: "endreinigung-biel" },
    { label: "Gebäudeunterhalt & Facility Service Seeland", href: "hauswartung-biel" },
    { label: "Kostenlose Reinigungs-Offerte anfordern", href: "reinigungsfirma-biel" }
  ],
  en: [
    { label: "Professional Moving & Furniture Transport Biel", href: "umzugsfirma-biel" },
    { label: "End of Tenancy Cleaning with 100% Guarantee", href: "endreinigung-biel" },
    { label: "Property Maintenance & Facility Service Seeland", href: "hauswartung-biel" },
    { label: "Request a Free Cleaning Quote", href: "reinigungsfirma-biel" }
  ],
  fr: [
    { label: "Déménagement professionnel et transport de meubles Bienne", href: "umzugsfirma-biel" },
    { label: "Nettoyage de fin de bail avec garantie à 100%", href: "endreinigung-biel" },
    { label: "Entretien de bâtiments et Facility Service Seeland", href: "hauswartung-biel" },
    { label: "Demander un devis de nettoyage gratuit", href: "reinigungsfirma-biel" }
  ],
  it: [
    { label: "Traslochi professionali e trasporto mobili Biel", href: "umzugsfirma-biel" },
    { label: "Pulizie di fine locazione con garanzia al 100%", href: "endreinigung-biel" },
    { label: "Manutenzione edifici e Facility Service Seeland", href: "hauswartung-biel" },
    { label: "Richiedi un preventivo di pulizia gratuito", href: "reinigungsfirma-biel" }
  ]
};

// Define Alt Text enhancements for the Slides (used as alts in page.tsx)
const altEnhancements = {
  de: {
    final: "Umzugsreinigung Biel mit Abnahmegarantie",
    houseCleaning: "Reinigungsfirma Biel SwissCleanMove",
    office: "Professionelle Büroreinigung Biel"
  },
  en: {
    final: "End of tenancy cleaning Biel with guarantee",
    houseCleaning: "Cleaning company Biel SwissCleanMove",
    office: "Professional office cleaning Biel"
  },
  fr: {
    final: "Nettoyage de fin de bail Bienne avec garantie",
    houseCleaning: "Entreprise de nettoyage Bienne SwissCleanMove",
    office: "Nettoyage professionnel de bureaux Bienne"
  },
  it: {
    final: "Pulizia di fine locazione Biel con garanzia",
    houseCleaning: "Impresa di pulizie Biel SwissCleanMove",
    office: "Pulizia professionale uffici Biel"
  }
};

async function processTranslations() {
  for (const locale of locales) {
    const filePath = path.join(__dirname, 'messages', `${locale}.json`);
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${locale}, file not found.`);
      continue;
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);

    // 1. Homepage SEO text enhancement
    if (data.home && data.home.seoText) {
      if (!data.home.seoText.includes("Biel/Bienne") && !data.home.seoText.includes(homepageEnhancements[locale].trim())) {
          data.home.seoText = data.home.seoText + homepageEnhancements[locale];
      }
    }

    // 2. Alt text improvements (Homepage hero slides)
    if (data.home && data.home.hero && data.home.hero.slides) {
       if (data.home.hero.slides.final) {
           data.home.hero.slides.final.title = altEnhancements[locale].final;
       }
       if (data.home.hero.slides.houseCleaning) {
           data.home.hero.slides.houseCleaning.title = altEnhancements[locale].houseCleaning;
       }
       if (data.home.hero.slides.office) {
           data.home.hero.slides.office.title = altEnhancements[locale].office;
       }
    }

    // 3. Biel SEO Page Enhancement (reinigungsfirmaBiel)
    if (data.seoPages && data.seoPages.reinigungsfirmaBiel) {
      const b = data.seoPages.reinigungsfirmaBiel;
      
      // Add semantic keywords naturally to the intro
      if (b.intro && !b.intro.includes(bielSeoEnhancements[locale].substring(0, 20))) {
        b.intro = b.intro + "\n\n" + bielSeoEnhancements[locale];
      }

      // 4. Update Internal Links
      b.internalLinks = enhancedLinks[locale];
    }

    // Save the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`Successfully updated ${locale}.json`);
  }
}

processTranslations().catch(console.error);
