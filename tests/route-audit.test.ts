import assert from 'node:assert';

const BASE_URL = 'http://localhost:3008';

const locales = ['de', 'en', 'fr', 'it'];
const coreServices = [
  'house-cleaning',
  'relocation',
  'facility-services',
  'disposal',
  'household-helping',
  'window-cleaning',
];
const legacyServices = [
  'gastronomy-cleaning',
  'stairwell-cleaning',
  'final-cleaning',
];

const endpoints: { path: string; desc: string }[] = [];

// 1. Free offer landing pages across 4 languages
for (const loc of locales) {
  endpoints.push({ path: `/${loc}/free-offer`, desc: `Free offer page (${loc.toUpperCase()})` });
}

// 2. Direct form URLs for 6 core services across 4 languages
for (const loc of locales) {
  for (const svc of coreServices) {
    endpoints.push({
      path: `/${loc}/form?service=${svc}`,
      desc: `${svc} (${loc.toUpperCase()})`,
    });
  }
}

// 3. Legacy service slugs fallback
for (const legacy of legacyServices) {
  endpoints.push({
    path: `/de/form?service=${legacy}`,
    desc: `Legacy: ${legacy} (DE)`,
  });
}

async function runRouteAudit() {
  console.log('🌐 Auditing live routes on ' + BASE_URL + '...\n');
  let passed = 0;
  let failed = 0;

  for (const ep of endpoints) {
    try {
      const res = await fetch(`${BASE_URL}${ep.path}`);
      if (res.status === 200) {
        const text = await res.text();
        assert.ok(text.includes('SwissCleanMove'), 'Page contains SwissCleanMove branding');
        console.log(`  ✅ PASS (${res.status}): ${ep.desc} [${ep.path}]`);
        passed++;
      } else {
        console.error(`  ❌ FAIL (${res.status}): ${ep.desc} [${ep.path}]`);
        failed++;
      }
    } catch (err: any) {
      console.error(`  ❌ ERROR: ${ep.desc} [${ep.path}] -> ${err.message}`);
      failed++;
    }
  }

  console.log(`\n🏁 ROUTE AUDIT SUMMARY: ${passed} PASSED, ${failed} FAILED\n`);
  if (failed > 0) process.exit(1);
}

runRouteAudit();
