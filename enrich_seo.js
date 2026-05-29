const fs = require('fs');

function updateJsonFile(filePath, updateFn) {
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  updateFn(data);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// 1. Update English
updateJsonFile('messages/en.json', (data) => {
  const page = data.seoPages.hauswartungBiel;
  page.meta.title = "Property Maintenance Biel/Bienne | Facility Service & Property Care | SwissCleanMove";
  page.meta.description = "Professional property maintenance, facility services, and building cleaning in Biel/Bienne & Seeland. Tailored property care and caretaker service for B2B commercial properties and property managers.";
  page.h1 = "Property Maintenance Biel/Bienne & Facility Management";
  
  page.intro = "A professionally maintained property ensures value retention and guarantees the highest satisfaction among tenants and condominium associations. SwissCleanMove is your reliable partner for Property Maintenance Biel and comprehensive facility services. We offer tailored Building Management Biel and Property Supervision Biel for property management companies, office properties, and residential complexes – with premium Swiss quality standards, transparent processes, and a dedicated Caretaker Service Biel in the Seeland.";
  
  page.sections[0].heading = "Holistic Property Care Biel & Technical Facility Service";
  page.sections[0].body = "Our property care and caretaker service is designed for professional B2B requirements. We take over the complete technical building management, coordinate inspection rounds, and ensure that the building technology functions flawlessly. Whether in Nidau, Brügg, or Lyss – we manage your commercial buildings, office properties, and apartment buildings proactively and reliably.";
  
  page.sections[1].heading = "Building Cleaning for Residential Complexes & Commercial Buildings";
  page.sections[1].body = "The first impression of your property counts. Our Facility Service for Property Managers ensures immaculate cleanliness in all common areas. This includes careful stairwell cleaning, gentle elevator cleaning, and systematic Property Maintenance for Apartment Buildings and large parking halls.";
});

// 2. Update German
updateJsonFile('messages/de.json', (data) => {
  const page = data.seoPages.hauswartungBiel;
  page.h1 = "Hauswartung reinigung Biel/Bienne";
  
  page.intro = "Eine professionell betreute Liegenschaft sichert den Werterhalt und garantiert höchste Zufriedenheit bei Mietern und Stockwerkeigentümergemeinschaften. SwissCleanMove ist Ihr verlässlicher Hauswartdienst Biel für Facility Service und Hauswartung. Wir bieten massgeschneiderte Hauswartung für Mehrfamilienhäuser und Facility Service für Immobilienverwaltungen, Büroimmobilien und Wohnanlagen – mit Schweizer Qualitätsstandard, transparenten Prozessen und dedizierten Ansprechpartnern im Seeland.";
  
  page.sections[0].heading = "Liegenschaftsbetreuung für Gewerbeimmobilien & Wohnanlagen";
  page.sections[0].body = "Unser Facility Service richtet sich an professionelle Ansprüche. Wir übernehmen den kompletten technischen Hausdienst, koordinieren Kontrollgänge und stellen sicher, dass die Gebäudetechnik einwandfrei funktioniert. Ob in Nidau, Brügg oder Lyss – wir betreuen Ihre Gewerbegebäude, Büroimmobilien und Mehrfamilienhäuser vorausschauend und zuverlässig.";
  
  page.sections[1].heading = "Gebäudereinigung für Wohnanlagen & Treppenhausreinigung";
  page.sections[1].body = "Der erste Eindruck Ihrer Liegenschaft zählt. Unsere Spezialisten für Gebäudereinigung für Wohnanlagen sorgen für makellose Sauberkeit in allen Gemeinschaftszonen. Dazu gehört die sorgfältige Treppenhausreinigung, schonende Liftreinigung sowie die systematische Garagenreinigung in grossen Einstellhallen für Stockwerkeigentümergemeinschaften.";
});

// 3. Update French
updateJsonFile('messages/fr.json', (data) => {
  const page = data.seoPages.hauswartungBiel;
  page.meta.title = "Entretien de Propriétés Bienne/Bienne | Conciergerie & Facility Service";
  page.meta.description = "Entretien professionnel de propriétés, facility services et nettoyage de bâtiments à Bienne & Seeland. Conciergerie Bienne pour immeubles commerciaux.";
  page.h1 = "Entretien de Propriétés Bienne/Bienne & Gestion de Bâtiments";
  
  page.intro = "Une propriété gérée de manière professionnelle assure le maintien de sa valeur et garantit la plus haute satisfaction des locataires et des syndics de copropriété. SwissCleanMove est votre partenaire fiable pour la Conciergerie Bienne et le Facility Service. Nous offrons des solutions sur mesure de Supervision de Propriétés et Gestion de Bâtiments pour les sociétés immobilières, les immeubles de bureaux et les complexes résidentiels – avec les standards de qualité suisses.";
  
  page.sections[0].heading = "Entretien de Propriétés Bienne & Service Technique";
  page.sections[0].body = "Notre service de gestion de bâtiments est conçu pour les exigences professionnelles B2B. Nous prenons en charge l'ensemble du service technique, coordonnons les rondes d'inspection et veillons au bon fonctionnement technique. Que ce soit à Nidau, Brügg ou Lyss, nous gérons vos immeubles commerciaux et complexes résidentiels de manière proactive et fiable.";
  
  page.sections[1].heading = "Nettoyage de Bâtiments pour Complexes Résidentiels & Commerciaux";
  page.sections[1].body = "La première impression de votre propriété compte. Nos spécialistes de l'entretien de propriétés assurent une propreté immaculée dans tous les espaces communs. Cela inclut le nettoyage minutieux des cages d'escalier, le nettoyage en douceur des ascenseurs et le nettoyage systématique des grands garages pour les syndics de copropriété.";
});

console.log('Enrichment complete!');
