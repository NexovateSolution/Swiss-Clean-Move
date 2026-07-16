const fs = require('fs');
let content = fs.readFileSync('src/lib/knowledgeHubData.ts', 'utf8');

if (!content.includes('PRICING_RULES')) {
    content = 'import { PRICING_RULES } from \'./pricingRules\';\n' + content;
}

content = content.replace(/CHF 1\\'190/g, 'CHF ${PRICING_RULES.moving.baseRates[\\'3.5\\']}');
content = content.replace(/CHF 1,190/g, 'CHF ${PRICING_RULES.moving.baseRates[\\'3.5\\']}');

content = content.replace(/CHF 890/g, 'CHF ${PRICING_RULES.cleaning.apartment[\\'3.5\\']}');
content = content.replace(/CHF 42/g, 'CHF ${PRICING_RULES.household.regular}');
content = content.replace(/CHF 690/g, 'CHF ${PRICING_RULES.disposal.apartmentClearance.apartment}');

content = content.replace(/CHF 490/g, 'CHF ${PRICING_RULES.moving.baseRates[\\'1\\']}');
content = content.replace(/CHF 2\\'490/g, 'CHF ${PRICING_RULES.moving.baseRates[\\'house\\']}');
content = content.replace(/CHF 2,490/g, 'CHF ${PRICING_RULES.moving.baseRates[\\'house\\']}');

content = content.replace(/CHF 1\\'390/g, 'CHF ${PRICING_RULES.cleaning.apartment[\\'5\\']}');
content = content.replace(/CHF 1,390/g, 'CHF ${PRICING_RULES.cleaning.apartment[\\'5\\']}');

content = content.replace(/CHF 48/g, 'CHF ${PRICING_RULES.household.oneTime}');
content = content.replace(/CHF 45/g, 'CHF ${PRICING_RULES.household.fourteenDays}');
content = content.replace(/CHF 49/g, 'CHF ${PRICING_RULES.household.premium}');
content = content.replace(/CHF 120/g, 'CHF ${PRICING_RULES.household.minOrder}');

content = content.replace(/CHF 35/g, 'CHF ${PRICING_RULES.maintenance.regular}');
content = content.replace(/CHF 500/g, 'CHF ${PRICING_RULES.facility.houseMaintenanceMin}');

content = content.replace(/CHF 150/g, 'CHF ${PRICING_RULES.disposal.volumePricing[\\'1\\']}');
content = content.replace(/CHF 300/g, 'CHF ${PRICING_RULES.disposal.basementClearance}');
content = content.replace(/CHF 1\\'490/g, 'CHF ${PRICING_RULES.disposal.apartmentClearance.house}');
content = content.replace(/CHF 1,490/g, 'CHF ${PRICING_RULES.disposal.apartmentClearance.house}');

content = content.replace(/'([^']*?\$\{[^}]+\}[^']*)'/g, '`$1`');

fs.writeFileSync('src/lib/knowledgeHubData.ts', content);
console.log('Done');
