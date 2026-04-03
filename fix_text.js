const fs = require('fs');

['en', 'de', 'fr'].forEach(lang => {
  const f = `messages/${lang}.json`;
  let c = JSON.parse(fs.readFileSync(f, 'utf8'));

  // 3) Renames
  if (c.home && c.home.services && c.home.services.stairwellCleaning) {
    c.home.services.stairwellCleaning.title = lang === 'de' ? 'Facility Service Reinigung' : (lang === 'fr' ? 'Nettoyage des installations' : 'Facility Service Cleaning');
  }
  if (c.home && c.home.services && c.home.services.relocation) {
    c.home.services.relocation.title = lang === 'de' ? 'Transport' : (lang === 'fr' ? 'Transport' : 'Transportation');
  }
  
  // Update wizard labels
  if (c.serviceForm && c.serviceForm.services) {
    c.serviceForm.services.stairwellCleaning = lang === 'de' ? 'Facility Service Reinigung' : (lang === 'fr' ? 'Nettoyage des installations' : 'Facility Service Cleaning');
    c.serviceForm.services.relocation = lang === 'de' ? 'Transport' : (lang === 'fr' ? 'Transport' : 'Transportation');
  }

  // 1 & 2) Caretaking & Cleaning upkeep
  if (c.serviceForm && c.serviceForm.wizard) {
    if (!c.serviceForm.wizard.propertyMaintenance.services) c.serviceForm.wizard.propertyMaintenance.services = {};
    
    // Add technical maintenance (caretaking)
    c.serviceForm.wizard.propertyMaintenance.services.regInspection = lang === 'de' ? 'Regelmäßige Inspektionsrundgänge' : (lang === 'fr' ? "Tournées d'inspection régulières" : 'Regular inspection rounds');
    c.serviceForm.wizard.propertyMaintenance.services.techMonitoring = lang === 'de' ? 'Technische Überwachung' : (lang === 'fr' ? 'Surveillance technique' : 'Technical monitoring (heating, ventilation, systems)');
    c.serviceForm.wizard.propertyMaintenance.services.minorRepairsBase = lang === 'de' ? 'Kleinreparaturen' : (lang === 'fr' ? 'Réparations mineures' : 'Minor repairs / Maintenance');
    c.serviceForm.wizard.propertyMaintenance.services.faultManagement = lang === 'de' ? 'Störungsmanagement' : (lang === 'fr' ? 'Gestion des pannes' : 'Fault management / Emergency service');
    c.serviceForm.wizard.propertyMaintenance.services.keyManagement = lang === 'de' ? 'Schlüsselmanagement' : (lang === 'fr' ? 'Gestion des clés' : 'Key management');
    c.serviceForm.wizard.propertyMaintenance.caretakingTitle = lang === 'de' ? 'Hauswartung' : (lang === 'fr' ? 'Conciergerie' : 'Caretaking (Technical & Inspections)');

    // Rename waste to all
    if (c.serviceForm.wizard.maintenanceCleaning && c.serviceForm.wizard.maintenanceCleaning.services) {
       c.serviceForm.wizard.maintenanceCleaning.services.waste = lang === 'de' ? 'Alle' : (lang === 'fr' ? 'Tout' : 'All');
    }
    if (!c.serviceForm.wizard.finalCleaning) c.serviceForm.wizard.finalCleaning = {};
    if (!c.serviceForm.wizard.finalCleaning.otherRoomItems) c.serviceForm.wizard.finalCleaning.otherRoomItems = {};
    // Add balcony and terrace
    c.serviceForm.wizard.finalCleaning.otherRoomItems.balcony = lang === 'de' ? 'Balkon' : (lang === 'fr' ? 'Balcon' : 'Balcony');
    c.serviceForm.wizard.finalCleaning.otherRoomItems.terrace = lang === 'de' ? 'Terrasse' : (lang === 'fr' ? 'Terrasse' : 'Terrace');
    
    // Add Cleaning & Upkeep to MaintenanceCleaningForm
    if (!c.serviceForm.wizard.maintenanceCleaning.cleaningUpkeep) c.serviceForm.wizard.maintenanceCleaning.cleaningUpkeep = lang === 'de' ? 'Reinigung & Pflege' : (lang === 'fr' ? 'Nettoyage & Entretien' : 'Cleaning & Upkeep');
    c.serviceForm.wizard.maintenanceCleaning.services.stairwellClean = lang === 'de' ? 'Treppenhausreinigung' : (lang === 'fr' ? "Nettoyage de cages d'escalier" : 'Stairwell cleaning');
    c.serviceForm.wizard.maintenanceCleaning.services.elevatorClean = lang === 'de' ? 'Liftreinigung' : (lang === 'fr' ? "Nettoyage d'ascenseur" : 'Elevator cleaning');
    c.serviceForm.wizard.maintenanceCleaning.services.basementClean = lang === 'de' ? 'Keller / Nebenräume' : (lang === 'fr' ? 'Sous-sol / Locaux utilitaires' : 'Basement / Utility rooms');
    c.serviceForm.wizard.maintenanceCleaning.services.garageClean = lang === 'de' ? 'Tiefgarage / Parkplätze' : (lang === 'fr' ? 'Garage souterrain / Parkings' : 'Underground garage / Parking spaces');
    c.serviceForm.wizard.maintenanceCleaning.services.windowClean = lang === 'de' ? 'Fensterreinigung' : (lang === 'fr' ? 'Nettoyage de vitres' : 'Window cleaning');
    c.serviceForm.wizard.maintenanceCleaning.services.deepClean = lang === 'de' ? 'Grundreinigung' : (lang === 'fr' ? 'Nettoyage en profondeur' : 'Deep cleaning');
  }
  
  // 5) Regions - Geneva to Aargau
  if (c.regions) {
     if (c.regions.cities && c.regions.cities.geneva) {
        c.regions.cities.aargau = { name: 'Aargau', description: lang === 'de' ? 'Zuverlässige Reinigungsdienste in Aargau' : (lang === 'fr' ? 'Services de nettoyage fiables en Argovie' : 'Reliable cleaning services in Aargau') };
        delete c.regions.cities.geneva;
     }
  }

  // 6) Home page cantons 'All' to 'Several', '2+' to '5+'
  if (c.home && c.home.about) {
     if (c.home.about.stats) {
        c.home.about.stats.cantons = lang === 'de' ? 'Mehrere' : (lang === 'fr' ? 'Plusieurs' : 'Several');
        c.home.about.stats.experience = '5+';
     }
  }

  fs.writeFileSync(f, JSON.stringify(c, null, 2));
});
console.log('Translations updated.');
