const fs = require('fs');
let text = fs.readFileSync('src/lib/knowledgeHubData.ts', 'utf8');

text = text.replace(/PRICING_RULES\.maintenance\.regular/g, "PRICING_RULES.maintenance.hourlyRates.residential");
text = text.replace(/PRICING_RULES\.facility\.houseMaintenanceMin/g, "PRICING_RULES.facilityService.monthly['500']");
text = text.replace(/PRICING_RULES\.disposal\.apartmentClearance\.apartment/g, "PRICING_RULES.disposal.volumePricing['10']");
text = text.replace(/PRICING_RULES\.disposal\.apartmentClearance\.house/g, "PRICING_RULES.disposal.volumePricing['20']");
text = text.replace(/PRICING_RULES\.disposal\.basementClearance/g, "PRICING_RULES.disposal.volumePricing['5']");
text = text.replace(/PRICING_RULES\.constructionCleaning\.postConstruction/g, "PRICING_RULES.cleaning.house['3.5']");

fs.writeFileSync('src/lib/knowledgeHubData.ts', text, 'utf8');
console.log('Fixed TypeScript errors');
