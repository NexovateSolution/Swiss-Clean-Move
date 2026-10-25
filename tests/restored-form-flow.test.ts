import assert from 'node:assert';
import { POST as postServiceForms } from '../src/app/api/service-forms/route';
import { prisma } from '../lib/db';
import { __setTestEmailSender } from '../src/lib/email';
import { generateToken } from '../lib/auth';

console.log('🧪 Starting Restored Previous Form Flow Verification Suite\n');

function createFormDataRequest(dataObj: Record<string, any>, files: { name: string; type: string; content: Buffer }[] = [], locale: string = 'de', headers: Record<string, string> = {}): Request {
  const boundary = '----WebKitFormBoundaryRestoredTest' + Math.random().toString(36).substring(2);
  const chunks: Buffer[] = [];

  // data field
  chunks.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="data"\r\n\r\n${JSON.stringify(dataObj)}\r\n`));

  // locale field
  chunks.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="locale"\r\n\r\n${locale}\r\n`));

  // files
  for (const f of files) {
    chunks.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="images"; filename="${f.name}"\r\nContent-Type: ${f.type}\r\n\r\n`));
    chunks.push(f.content);
    chunks.push(Buffer.from('\r\n'));
  }

  chunks.push(Buffer.from(`--${boundary}--\r\n`));
  const fullBody = Buffer.concat(chunks);

  return new Request('http://localhost:3000/api/service-forms', {
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      ...headers
    },
    body: fullBody
  });
}

async function runTests() {
  let passed = 0;
  let failed = 0;

  function test(desc: string, fn: () => Promise<void> | void) {
    try {
      const p = fn();
      if (p && typeof p.then === 'function') {
        return p.then(() => {
          console.log(`  ✅ PASS: ${desc}`);
          passed++;
        }).catch((err: any) => {
          console.error(`  ❌ FAIL: ${desc}\n     ${err.message}`);
          failed++;
        });
      } else {
        console.log(`  ✅ PASS: ${desc}`);
        passed++;
      }
    } catch (err: any) {
      console.error(`  ❌ FAIL: ${desc}\n     ${err.message}`);
      failed++;
    }
  }

  // Configure Prisma mock
  (prisma.serviceFormSubmission as any).create = async ({ data }: any) => {
    return { id: 'restored-sub-1', ...data };
  };
  (prisma.serviceFormSubmission as any).update = async ({ data }: any) => {
    return { id: 'restored-sub-1', ...data };
  };
  (prisma.user as any).findUnique = async ({ where }: any) => {
    if (where.id === 'admin-id-1') {
      return { id: 'admin-id-1', email: 'admin@swisscleanmove.ch', name: 'Admin', role: 'ADMIN' };
    }
    return null;
  };

  let sentEmails: any[] = [];
  __setTestEmailSender(async (params: any) => {
    sentEmails.push(params);
    return { success: true, messageId: `msg-${Date.now()}` };
  });

  console.log('👉 1. Restored Forms: Service-Specific Submissions Across All Supported Services');

  const supportedServices = [
    { slug: 'relocation', name: 'Moving & Transport', sampleData: { moveFromStreet: 'Bahnhofstrasse 10', moveFromZipCity: '3000 Bern', moveToStreet: 'Marktgasse 5', moveToZipCity: '8000 Zürich', currentLiving: 'apartment', currentRooms: '3.5', requestType: 'moving' } },
    { slug: 'house-cleaning', name: 'End-of-Tenancy Cleaning', sampleData: { cleanStreet: 'Poststrasse 12', cleanZipCity: '2502 Biel/Bienne', livingSpace: '85', objectType: 'apartment', requestType: 'cleaning', handoverGuarantee: 'yes' } },
    { slug: 'facility-services', name: 'Facility Services', sampleData: { streetNo: 'Industrieweg 4', zipCity: '3250 Lyss', facilityServiceType: 'maintenanceCleaning', frequency: 'weekly', area: '200' } },
    { slug: 'disposal', name: 'Disposal & Clearance', sampleData: { streetNo: 'Gartenstrasse 8', zipCity: '3012 Bern', disposalType: 'apartment', volume: '15' } },
    { slug: 'household-helping', name: 'Household Helping', sampleData: { streetNo: 'Kirchgasse 2', zipCity: '3800 Interlaken', hoursPerWeek: '4', frequency: 'weekly' } },
    { slug: 'window-cleaning', name: 'Window Cleaning', sampleData: { streetNo: 'Seestrasse 1', zipCity: '2503 Biel/Bienne', windowCount: '10', glassType: 'standard' } }
  ];

  for (const svc of supportedServices) {
    await test(`Service "${svc.name}" (${svc.slug}) submits and completes successfully with consent`, async () => {
      sentEmails = [];
      const req = createFormDataRequest({
        serviceName: svc.name,
        formType: svc.slug,
        service: svc.slug,
        services: [svc.slug],
        nameFirstName: 'Beat Feuz',
        telephone: '+41 79 333 44 55',
        emailAddress: 'beat.feuz@bluewin.ch',
        agreeToTerms: true,
        ...svc.sampleData
      });

      const res = await postServiceForms(req);
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.success, true);
      assert.strictEqual(json.delivered, true);
      assert.strictEqual(sentEmails.length >= 1, true);
    });
  }

  console.log('\n👉 2. Consent Enforcement & Rejection of Unconsented Submissions');

  await test('Rejects restored form submission when agreeToTerms is missing', async () => {
    const req = createFormDataRequest({
      serviceName: 'Moving & Transport',
      formType: 'relocation',
      nameFirstName: 'Beat Feuz',
      telephone: '+41 79 333 44 55',
      emailAddress: 'beat.feuz@bluewin.ch'
      // agreeToTerms omitted
    });

    const res = await postServiceForms(req);
    assert.strictEqual(res.status, 400);
    const json = await res.json();
    assert.strictEqual(json.success, false);
    assert.strictEqual(json.details?.some((d: string) => d.includes('privacy terms')), true);
  });

  await test('Rejects restored form submission when agreeToTerms is false', async () => {
    const req = createFormDataRequest({
      serviceName: 'Moving & Transport',
      formType: 'relocation',
      nameFirstName: 'Beat Feuz',
      telephone: '+41 79 333 44 55',
      emailAddress: 'beat.feuz@bluewin.ch',
      agreeToTerms: false
    });

    const res = await postServiceForms(req);
    assert.strictEqual(res.status, 400);
  });

  console.log('\n👉 3. Multilingual Support across all 4 Languages (DE, EN, FR, IT)');

  const locales = [
    { code: 'de', expectedSubjectPart: 'Neue Anfrage' },
    { code: 'en', expectedSubjectPart: 'New Request' },
    { code: 'fr', expectedSubjectPart: 'Nouvelle demande' },
    { code: 'it', expectedSubjectPart: 'Nuova richiesta' }
  ];

  for (const loc of locales) {
    await test(`Generates localized admin notification email in "${loc.code.toUpperCase()}"`, async () => {
      sentEmails = [];
      const req = createFormDataRequest({
        serviceName: 'End-of-Tenancy Cleaning',
        formType: 'house-cleaning',
        nameFirstName: 'Sophie Martin',
        telephone: '+41 22 700 80 90',
        emailAddress: 'sophie.martin@romandie.ch',
        agreeToTerms: true
      }, [], loc.code);

      const res = await postServiceForms(req);
      assert.strictEqual(res.status, 200);
      const adminMail = sentEmails.find(e => e.to.includes('info@swisscleanmove.ch'));
      assert.ok(adminMail, 'Admin email dispatched');
      assert.ok(adminMail.subject.includes(loc.expectedSubjectPart), `Subject contains localized prefix: "${adminMail.subject}"`);
    });
  }

  console.log('\n👉 4. Attachment Security & Upload Platform Headroom');

  await test('Rejects submissions exceeding 3 attachments', async () => {
    const fakeFiles = [
      { name: '1.jpg', type: 'image/jpeg', content: Buffer.from('photo1') },
      { name: '2.jpg', type: 'image/jpeg', content: Buffer.from('photo2') },
      { name: '3.jpg', type: 'image/jpeg', content: Buffer.from('photo3') },
      { name: '4.jpg', type: 'image/jpeg', content: Buffer.from('photo4') }
    ];
    const req = createFormDataRequest({
      serviceName: 'Moving',
      formType: 'relocation',
      nameFirstName: 'Test User',
      telephone: '+41 79 123 45 67',
      emailAddress: 'test@example.com',
      agreeToTerms: true
    }, fakeFiles);

    const res = await postServiceForms(req);
    assert.strictEqual(res.status, 400);
  });

  await test('Rejects individual file exceeding 2MB limit', async () => {
    const oversizedFile = [
      { name: 'huge.jpg', type: 'image/jpeg', content: Buffer.alloc(2.5 * 1024 * 1024) }
    ];
    const req = createFormDataRequest({
      serviceName: 'Moving',
      formType: 'relocation',
      nameFirstName: 'Test User',
      telephone: '+41 79 123 45 67',
      emailAddress: 'test@example.com',
      agreeToTerms: true
    }, oversizedFile);

    const res = await postServiceForms(req);
    assert.strictEqual(res.status, 400);
  });

  console.log('\n👉 5. Email Failure Defense (Conversion Safety)');

  await test('Returns HTTP 502 on admin email failure so client never fires conversion tracking', async () => {
    __setTestEmailSender(async () => ({ success: false, error: 'SMTP connection timeout' }));

    const req = createFormDataRequest({
      serviceName: 'Moving',
      formType: 'relocation',
      nameFirstName: 'Test User',
      telephone: '+41 79 123 45 67',
      emailAddress: 'test@example.com',
      agreeToTerms: true
    });

    const res = await postServiceForms(req);
    assert.strictEqual(res.status, 502);
    const json = await res.json();
    assert.strictEqual(json.success, false);
    assert.strictEqual(json.delivered, false);
    assert.strictEqual(json.persisted, true); // saved in DB so inquiry not lost
  });

  console.log('\n======================================================');
  console.log(`🏁 RESTORED FORM FLOW SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal error in tests:', err);
  process.exit(1);
});
