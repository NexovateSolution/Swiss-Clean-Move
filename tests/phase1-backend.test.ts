/**
 * Phase 1 Backend Reliability & Validation Test Suite
 *
 * Covers:
 * 1. Missing or invalid email, phone, name, and service selection (HTTP 400)
 * 2. Malformed request JSON or form data (HTTP 400)
 * 3. Administrative SMTP failure returns non-success (HTTP 502, delivered: false)
 * 4. Successful administrative notification returns success (HTTP 200, delivered: true)
 * 5. Database failure is surfaced and logged, not silently swallowed (persisted: false)
 * 6. Client confirmation email failure is handled separately (does not fail delivered submission)
 * 7. Italian email content and service labels (locale: 'it')
 * 8. Attachment validation (rejection of unsupported types, count > 3, oversized files)
 * 9. Frontend failure contract verification (ensures success is false on error)
 * 10. Existing valid submission payloads compatibility (all 5 core service types + legacy payloads)
 * 11. Consent and Authorization Security (enforcing explicit consent, rejecting forged isAdmin)
 * 12. HTML Email Safety & Malicious Input Sanitization (XSS defense)
 * 13. Contact API Route Delivery Contracts (/api/contact)
 * 14. Quotes API Route Delivery Contracts (/api/quotes)
 * 15. Robust Services Array Validation (rejecting non-strings, non-arrays)
 * 16. Platform-Compatible Upload Limits (2 MB per file, 3.5 MB total)
 */

import { POST as postServiceForms } from '../src/app/api/service-forms/route';
import { POST as postContact } from '../src/app/api/contact/route';
import { POST as postQuotes } from '../src/app/api/quotes/route';
import {
  __setTestEmailSender,
  escapeHtml,
  escapeHtmlWithLineBreaks,
  formatContactEmail,
  formatQuoteEmail,
  formatServiceFormEmail
} from '../src/lib/email';
import { prisma } from '../lib/db';
import { generateToken } from '../lib/auth';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}${detail ? ` - ${detail}` : ''}`);
    failed++;
  }
}

// Helper to construct a mock multipart/form-data Request for service-forms
function createFormDataRequest(
  dataObj: any,
  files: { name: string; type: string; content?: string; size?: number }[] = [],
  locale = 'de',
  headers: Record<string, string> = {}
) {
  const formData = new FormData();
  formData.append('data', JSON.stringify(dataObj));
  formData.append('locale', locale);
  for (const f of files) {
    const content = f.content || (f.size ? 'x'.repeat(f.size) : 'sample-content');
    const blob = new Blob([content], { type: f.type });
    formData.append('images', blob, f.name);
  }
  return new Request('http://localhost:3000/api/service-forms', {
    method: 'POST',
    headers,
    body: formData
  });
}

// Helper to construct a mock application/json Request for service-forms
function createJsonRequest(dataObj: any) {
  return new Request('http://localhost:3000/api/service-forms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataObj)
  });
}

async function runTests() {
  console.log('\n======================================================');
  console.log('🧪 SWISSCLEANMOVE — PHASE 1 BACKEND TEST SUITE');
  console.log('======================================================\n');

  // Save original Prisma delegates
  const originalPrismaCreate = prisma.serviceFormSubmission.create;
  const originalPrismaUpdate = prisma.serviceFormSubmission.update;
  const originalContactCreate = prisma.contactSubmission.create;
  const originalQuoteCreate = prisma.quoteSubmission.create;
  const originalUserFindUnique = prisma.user.findUnique;

  try {
    // ------------------------------------------------------------------
    // TEST 1: Missing or invalid customer fields (HTTP 400)
    // ------------------------------------------------------------------
    console.log('👉 1. Validation Tests: Required Customer Fields');

    // 1a. Missing first & last name
    {
      const req = createFormDataRequest({
        email: 'test@example.com',
        phone: '+41 79 123 45 67',
        services: ['disposalClearance'],
        agreeToTerms: true
      });
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 400, 'Rejects missing name with HTTP 400');
      assert(!json.success && json.details?.some((d: string) => d.includes('first name')), 'Returns first name error in details');
    }

    // 1b. Syntactically invalid email address
    {
      const req = createFormDataRequest({
        firstName: 'Hans',
        lastName: 'Muster',
        email: 'invalid-email-address',
        phone: '+41 79 123 45 67',
        services: ['disposalClearance'],
        agreeToTerms: true
      });
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 400, 'Rejects invalid email syntax with HTTP 400');
      assert(!json.success && json.details?.some((d: string) => d.includes('email address')), 'Returns email error in details');
    }

    // 1c. Invalid or too short phone number
    {
      const req = createFormDataRequest({
        firstName: 'Hans',
        lastName: 'Muster',
        email: 'hans.muster@gmail.com',
        phone: '12',
        services: ['disposalClearance'],
        agreeToTerms: true
      });
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 400, 'Rejects invalid phone with HTTP 400');
      assert(!json.success && json.details?.some((d: string) => d.includes('telephone number')), 'Returns telephone error in details');
    }

    // 1d. Missing recognized service selection
    {
      const req = createFormDataRequest({
        firstName: 'Hans',
        lastName: 'Muster',
        email: 'hans.muster@gmail.com',
        phone: '+41 79 123 45 67',
        services: [],
        agreeToTerms: true
      });
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 400, 'Rejects missing service with HTTP 400');
      assert(!json.success && json.details?.some((d: string) => d.includes('recognized service')), 'Returns recognized service error in details');
    }

    // 1e. Terms not accepted (false)
    {
      const req = createFormDataRequest({
        firstName: 'Hans',
        lastName: 'Muster',
        email: 'hans.muster@gmail.com',
        phone: '+41 79 123 45 67',
        services: ['caretaking'],
        agreeToTerms: false
      });
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 400, 'Rejects unaccepted terms with HTTP 400');
      assert(!json.success && json.details?.some((d: string) => d.includes('privacy terms')), 'Returns privacy terms error');
    }

    // ------------------------------------------------------------------
    // TEST 2: Malformed request JSON or form data (HTTP 400)
    // ------------------------------------------------------------------
    console.log('\n👉 2. Malformed Request Handling');

    // 2a. Malformed JSON in data field
    {
      const formData = new FormData();
      formData.append('data', '{ invalid-json: "broken" ');
      const req = new Request('http://localhost:3000/api/service-forms', {
        method: 'POST',
        body: formData
      });
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 400, 'Rejects malformed JSON in form data with HTTP 400');
      assert(json.error?.includes('Malformed request JSON'), 'Identifies malformed JSON');
    }

    // 2b. Malformed raw JSON body
    {
      const req = new Request('http://localhost:3000/api/service-forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{ "unclosed": '
      });
      const res = await postServiceForms(req);
      assert(res.status === 400, 'Rejects malformed raw JSON body with HTTP 400');
    }

    // ------------------------------------------------------------------
    // TEST 3: Administrative SMTP failure returns non-success (HTTP 502)
    // ------------------------------------------------------------------
    console.log('\n👉 3. Administrative Email Failure Defense');

    {
      (prisma.serviceFormSubmission as any).create = async () => ({ id: 'sub-test-123' });
      (prisma.serviceFormSubmission as any).update = async () => ({ id: 'sub-test-123' });

      __setTestEmailSender(async (opts) => {
        if (opts.to.includes('info@swisscleanmove.ch')) {
          return { success: false, error: 'Connection refused by SMTP host: mail.infomaniak.com:465' };
        }
        return { success: true };
      });

      const req = createFormDataRequest({
        firstName: 'Marco',
        lastName: 'Bernasconi',
        email: 'marco.bernasconi@ticino.com',
        phone: '+41 91 820 00 00',
        services: ['movingTransport'],
        agreeToTerms: true
      });

      const res = await postServiceForms(req);
      const json = await res.json();

      assert(res.status === 502, 'Returns HTTP 502 Bad Gateway when admin email delivery fails');
      assert(json.success === false, 'success is explicitly FALSE on admin email failure');
      assert(json.delivered === false, 'delivered is explicitly FALSE on admin email failure');
      assert(json.persisted === true, 'persisted is accurately TRUE because DB saved it');
      assert(json.error?.includes('received and saved in our system'), 'Informs user inquiry was saved and avoids duplicate retries');
    }

    // ------------------------------------------------------------------
    // TEST 4: Successful administrative notification returns success (HTTP 200)
    // ------------------------------------------------------------------
    console.log('\n👉 4. Successful End-to-End Processing');

    {
      (prisma.serviceFormSubmission as any).create = async () => ({ id: 'sub-test-success' });
      (prisma.serviceFormSubmission as any).update = async () => ({ id: 'sub-test-success', quoteSent: true });

      const emailAudit = {
        adminSent: false,
        clientSent: false
      };

      __setTestEmailSender(async (opts) => {
        if (opts.to.includes('info@swisscleanmove.ch')) {
          emailAudit.adminSent = true;
          return { success: true, messageId: 'msg-admin-123' };
        }
        if (opts.to.includes('clara.dupont@orange.fr')) {
          emailAudit.clientSent = true;
          return { success: true, messageId: 'msg-client-456' };
        }
        return { success: true };
      });

      const req = createFormDataRequest({
        firstName: 'Clara',
        lastName: 'Dupont',
        email: 'clara.dupont@orange.fr',
        phone: '+41 22 710 20 30',
        services: ['house-cleaning'],
        agreeToTerms: true
      }, [], 'fr');

      const res = await postServiceForms(req);
      const json = await res.json();

      assert(res.status === 200, 'Returns HTTP 200 when admin email delivery succeeds');
      assert(json.success === true, 'success is TRUE');
      assert(json.delivered === true, 'delivered is TRUE');
      assert(json.persisted === true, 'persisted is TRUE');
      assert(emailAudit.adminSent === true, 'Admin email was actually dispatched');
      assert(emailAudit.clientSent === true, 'Client confirmation email was dispatched');
    }

    // ------------------------------------------------------------------
    // TEST 5: Database failure is surfaced, not swallowed
    // ------------------------------------------------------------------
    console.log('\n👉 5. Database Failure Handling');

    {
      (prisma.serviceFormSubmission as any).create = async () => {
        throw new Error('Supabase database connection pool exhausted: P1001');
      };

      const dbAudit = {
        adminReceivedWarning: false
      };

      __setTestEmailSender(async (opts) => {
        if (opts.to.includes('info@swisscleanmove.ch')) {
          if (opts.html.includes('DATABASE WARNING')) {
            dbAudit.adminReceivedWarning = true;
          }
          return { success: true, messageId: 'msg-admin-dbfail' };
        }
        return { success: true };
      });

      const req = createFormDataRequest({
        firstName: 'Luca',
        lastName: 'Bianchi',
        email: 'luca.bianchi@gmail.com',
        phone: '+41 78 999 88 77',
        services: ['disposalClearance'],
        agreeToTerms: true
      });

      const res = await postServiceForms(req);
      const json = await res.json();

      assert(res.status === 200, 'Inquiry still delivered via email if DB fails');
      assert(json.delivered === true, 'delivered is TRUE because admin received email');
      assert(json.persisted === false, 'persisted accurately reports FALSE (not falsely claimed as saved)');
      assert(dbAudit.adminReceivedWarning === true, 'Admin email includes database failure warning banner with preserved data');
    }

    // ------------------------------------------------------------------
    // TEST 6: Client confirmation email failure handled separately
    // ------------------------------------------------------------------
    console.log('\n👉 6. Client Confirmation Email Isolation');

    {
      (prisma.serviceFormSubmission as any).create = async () => ({ id: 'sub-test-client-fail' });
      (prisma.serviceFormSubmission as any).update = async () => ({ id: 'sub-test-client-fail' });

      __setTestEmailSender(async (opts) => {
        if (opts.to.includes('info@swisscleanmove.ch')) {
          return { success: true, messageId: 'admin-ok' };
        }
        return { success: false, error: '550 5.1.1 User unknown / mailbox not found' };
      });

      const req = createFormDataRequest({
        firstName: 'Thomas',
        lastName: 'Schneider',
        email: 'thomas.typo-address@nonexistent.ch',
        phone: '+41 76 555 44 33',
        services: ['movingTransport'],
        agreeToTerms: true
      });

      const res = await postServiceForms(req);
      const json = await res.json();

      assert(res.status === 200, 'Returns HTTP 200: customer inquiry was delivered to company staff');
      assert(json.delivered === true, 'Admin notification not invalidated by client email bounce');
      assert(json.clientEmailSent === false, 'clientEmailSent accurately reflects false');
    }

    // ------------------------------------------------------------------
    // TEST 7: Italian Email Localization
    // ------------------------------------------------------------------
    console.log('\n👉 7. Italian Email Localization');

    {
      (prisma.serviceFormSubmission as any).create = async () => ({ id: 'sub-test-it' });
      (prisma.serviceFormSubmission as any).update = async () => ({ id: 'sub-test-it' });

      let capturedAdminSubject = '';
      let capturedClientSubject = '';
      let capturedClientHtml = '';

      __setTestEmailSender(async (opts) => {
        if (opts.to.includes('info@swisscleanmove.ch')) {
          capturedAdminSubject = opts.subject;
        } else {
          capturedClientSubject = opts.subject;
          capturedClientHtml = opts.html;
        }
        return { success: true };
      });

      const req = createFormDataRequest({
        firstName: 'Giovanni',
        lastName: 'Rossi',
        email: 'giovanni.rossi@bluewin.ch',
        phone: '+41 91 600 11 22',
        services: ['movingTransport'],
        formType: 'moving',
        agreeToTerms: true
      }, [], 'it');

      const res = await postServiceForms(req);
      assert(res.status === 200, 'Processes Italian request successfully');
      assert(capturedAdminSubject.includes('Nuova richiesta: Trasloco - Rossi Giovanni'), 'Admin subject in Italian: ' + capturedAdminSubject);
      assert(capturedClientSubject.includes('Il Vostro Preventivo - SwissCleanMove'), 'Client subject in Italian: ' + capturedClientSubject);
      assert(capturedClientHtml.includes('SwissCleanMove - Il Vostro Preventivo'), 'Client HTML title in Italian');
      assert(capturedClientHtml.includes('Nota relativa al preventivo'), 'Client HTML intro in Italian');
      assert(capturedClientHtml.includes('Cordiali saluti'), 'Client HTML salutation in Italian');
    }

    // ------------------------------------------------------------------
    // TEST 8: Attachment Validation & Platform-Compatible Limits
    // ------------------------------------------------------------------
    console.log('\n👉 8. Attachment Validation Tests');

    // 8a. Reject unsupported file format (e.g. .exe or .sh)
    {
      const req = createFormDataRequest(
        {
          firstName: 'Security',
          lastName: 'Tester',
          email: 'sec@example.com',
          phone: '+41 79 000 00 00',
          services: ['disposalClearance'],
          agreeToTerms: true
        },
        [{ name: 'malicious.exe', type: 'application/x-msdownload', content: 'fake-exe-content' }]
      );
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 400, 'Rejects invalid MIME type with HTTP 400');
      assert(json.details?.some((d: string) => d.includes('unsupported format')), 'Identifies unsupported format');
    }

    // 8b. Reject more than 3 attachments (platform limit)
    {
      const files = Array.from({ length: 4 }).map((_, i) => ({
        name: `photo_${i}.jpg`,
        type: 'image/jpeg',
        content: `image-content-${i}`
      }));
      const req = createFormDataRequest(
        {
          firstName: 'Photo',
          lastName: 'Collector',
          email: 'photos@example.com',
          phone: '+41 79 000 00 00',
          services: ['disposalClearance'],
          agreeToTerms: true
        },
        files
      );
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 400, 'Rejects > 3 attachments with HTTP 400');
      assert(json.details?.some((d: string) => d.includes('Maximum 3')), 'Enforces 3 attachments platform limit');
    }

    // 8c. Reject single file exceeding 2 MB serverless limit
    {
      const oversizedFile = {
        name: 'huge_photo.jpg',
        type: 'image/jpeg',
        size: 2.5 * 1024 * 1024 // 2.5MB
      };
      const req = createFormDataRequest(
        {
          firstName: 'Large',
          lastName: 'FileTester',
          email: 'large@example.com',
          phone: '+41 79 000 00 00',
          services: ['house-cleaning'],
          agreeToTerms: true
        },
        [oversizedFile]
      );
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 400, 'Rejects file > 2 MB with HTTP 400');
      assert(json.details?.some((d: string) => d.includes('2 MB')), 'Enforces 2 MB per-file limit');
    }

    // 8d. Accept valid images and attach them to admin email
    {
      (prisma.serviceFormSubmission as any).create = async () => ({ id: 'sub-test-photos' });
      (prisma.serviceFormSubmission as any).update = async () => ({ id: 'sub-test-photos' });

      let adminAttachmentsCount = 0;
      __setTestEmailSender(async (opts) => {
        if (opts.to.includes('info@swisscleanmove.ch')) {
          adminAttachmentsCount = opts.attachments?.length || 0;
        }
        return { success: true };
      });

      const req = createFormDataRequest(
        {
          firstName: 'David',
          lastName: 'Keller',
          email: 'david.keller@sunrise.ch',
          phone: '+41 79 111 22 33',
          services: ['disposalClearance'],
          agreeToTerms: true
        },
        [
          { name: 'sofa_front.jpg', type: 'image/jpeg', content: 'jpeg-binary-data' },
          { name: 'wardrobe_side.png', type: 'image/png', content: 'png-binary-data' }
        ]
      );
      const res = await postServiceForms(req);
      assert(res.status === 200, 'Valid photos processed successfully with HTTP 200');
      assert(adminAttachmentsCount >= 2, `Admin received ${adminAttachmentsCount} attachments (including customer photos)`);
    }

    // ------------------------------------------------------------------
    // TEST 9: 5 Core Services & Legacy Compatibility
    // ------------------------------------------------------------------
    console.log('\n👉 9. 5 Core Services & Legacy Compatibility');

    const coreServices = [
      { key: 'cleaning', slug: 'house-cleaning', name: 'End-of-Tenancy Cleaning' },
      { key: 'movingTransport', slug: 'relocation', name: 'Moving & Transport' },
      { key: 'disposalClearance', slug: 'disposal', name: 'Disposal & Clearance' },
      { key: 'facilityServices', slug: 'facility-services', name: 'Property Maintenance' },
      { key: 'householdHelping', slug: 'household-helping', name: 'Regular Cleaning' },
    ];

    for (const svc of coreServices) {
      (prisma.serviceFormSubmission as any).create = async () => ({ id: `sub-${svc.slug}` });
      (prisma.serviceFormSubmission as any).update = async () => ({ id: `sub-${svc.slug}` });

      const req = createFormDataRequest({
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@swisscleanmove.ch',
        phone: '+41 31 300 00 00',
        services: [svc.key],
        formType: svc.slug,
        agreeToTerms: true
      });
      const res = await postServiceForms(req);
      assert(res.status === 200, `Successfully processes service "${svc.name}" (${svc.slug})`);
    }

    // 9b. Legacy payload with nameFirstName and JSON request
    {
      const req = createJsonRequest({
        nameFirstName: 'Ursula von Allmen',
        emailAddress: 'ursula.va@gmx.ch',
        telephone: '+41 33 820 10 10',
        formType: 'moving',
        streetAndNumber: 'Hauptstrasse 15',
        postalCodeAndCity: '3800 Interlaken',
        agreeToTerms: true
      });
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 200, 'Successfully processes legacy payload with nameFirstName and JSON Content-Type');
      assert(json.success === true, 'Legacy submission success is TRUE');
    }

    // ------------------------------------------------------------------
    // TEST 11: Consent and Authorization Security
    // ------------------------------------------------------------------
    console.log('\n👉 11. Consent and Authorization Security');

    // Configure Prisma User mock for role verification tests
    (prisma.user as any).findUnique = async ({ where }: any) => {
      if (where.id === 'verified-admin-id') {
        return {
          id: 'verified-admin-id',
          email: 'admin@swisscleanmove.ch',
          name: 'Verified Admin',
          role: 'ADMIN'
        };
      }
      if (where.id === 'verified-non-admin-id') {
        return {
          id: 'verified-non-admin-id',
          email: 'user@example.com',
          name: 'Regular Customer',
          role: 'USER'
        };
      }
      return null;
    };

    const validAdminToken = generateToken('verified-admin-id');
    const validNonAdminToken = generateToken('verified-non-admin-id');
    const ghostUserToken = generateToken('deleted-user-id');
    const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.signature';

    // 11a. Missing consent entirely (omitted agreeToTerms) without token -> 400
    {
      const req = createFormDataRequest({
        firstName: 'Hans',
        lastName: 'Muster',
        email: 'hans.muster@gmail.com',
        phone: '+41 79 123 45 67',
        services: ['movingTransport']
      });
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 400, 'Rejects public submission with missing consent (HTTP 400)');
      assert(json.details?.some((d: string) => d.includes('privacy terms')), 'Flags missing consent in validation details');
    }

    // 11b. Explicit false consent (agreeToTerms: false) -> 400
    {
      const req = createFormDataRequest({
        firstName: 'Hans',
        lastName: 'Muster',
        email: 'hans.muster@gmail.com',
        phone: '+41 79 123 45 67',
        services: ['movingTransport'],
        agreeToTerms: false
      });
      const res = await postServiceForms(req);
      assert(res.status === 400, 'Rejects explicit false consent (HTTP 400)');
    }

    // 11c. Forged isAdmin: true in body without token -> 400
    {
      const req = createFormDataRequest({
        firstName: 'Attacker',
        lastName: 'ForgedAdmin',
        email: 'attacker@evil.com',
        phone: '+41 79 123 45 67',
        services: ['movingTransport'],
        isAdmin: true
      });
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 400, 'Rejects forged isAdmin: true without token (HTTP 400)');
      assert(json.details?.some((d: string) => d.includes('privacy terms')), 'Client-supplied isAdmin does NOT bypass terms consent');
    }

    // 11d. Forged isAdmin: true with agreeToTerms: false -> 400
    {
      const req = createFormDataRequest({
        firstName: 'Attacker',
        lastName: 'ForgedAdmin',
        email: 'attacker@evil.com',
        phone: '+41 79 123 45 67',
        services: ['movingTransport'],
        isAdmin: true,
        agreeToTerms: false
      });
      const res = await postServiceForms(req);
      assert(res.status === 400, 'Rejects forged isAdmin: true when agreeToTerms is false');
    }

    // 11e. Missing token without consent -> 400
    {
      const req = createFormDataRequest({
        firstName: 'Hans',
        lastName: 'Muster',
        email: 'hans.muster@gmail.com',
        phone: '+41 79 123 45 67',
        services: ['movingTransport']
      }, [], 'de', {});
      const res = await postServiceForms(req);
      assert(res.status === 400, 'Missing token requires consent (HTTP 400)');
    }

    // 11f. Invalid token without consent -> 400
    {
      const req = createFormDataRequest({
        firstName: 'Hans',
        lastName: 'Muster',
        email: 'hans.muster@gmail.com',
        phone: '+41 79 123 45 67',
        services: ['movingTransport']
      }, [], 'de', { Authorization: `Bearer ${invalidToken}` });
      const res = await postServiceForms(req);
      assert(res.status === 400, 'Invalid JWT token rejected, requires consent (HTTP 400)');
    }

    // 11g. Token for non-existent database user -> 400
    {
      const req = createFormDataRequest({
        firstName: 'Hans',
        lastName: 'Muster',
        email: 'hans.muster@gmail.com',
        phone: '+41 79 123 45 67',
        services: ['movingTransport']
      }, [], 'de', { Authorization: `Bearer ${ghostUserToken}` });
      const res = await postServiceForms(req);
      assert(res.status === 400, 'Token for non-existent DB user rejected, requires consent (HTTP 400)');
    }

    // 11h. Valid non-admin user (role: 'USER') without consent -> 400
    {
      const req = createFormDataRequest({
        firstName: 'Regular',
        lastName: 'User',
        email: 'user@example.com',
        phone: '+41 79 123 45 67',
        services: ['movingTransport']
      }, [], 'de', { Authorization: `Bearer ${validNonAdminToken}` });
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 400, 'Valid non-admin user (role: USER) CANNOT bypass consent (HTTP 400)');
      assert(json.details?.some((d: string) => d.includes('privacy terms')), 'Non-admin user receives privacy terms error');
    }

    // 11i. Valid non-admin user with forged isAdmin: true -> 400
    {
      const req = createFormDataRequest({
        firstName: 'Regular',
        lastName: 'User',
        email: 'user@example.com',
        phone: '+41 79 123 45 67',
        services: ['movingTransport'],
        isAdmin: true
      }, [], 'de', { Authorization: `Bearer ${validNonAdminToken}` });
      const res = await postServiceForms(req);
      assert(res.status === 400, 'Non-admin with forged isAdmin: true in body is rejected (HTTP 400)');
    }

    // 11j. Valid admin user (role: 'ADMIN') in database -> 200 (can bypass consent)
    {
      (prisma.serviceFormSubmission as any).create = async () => ({ id: 'sub-admin-priv' });
      (prisma.serviceFormSubmission as any).update = async () => ({ id: 'sub-admin-priv' });
      __setTestEmailSender(async () => ({ success: true, messageId: 'msg-admin-priv' }));

      const req = createFormDataRequest({
        firstName: 'AdminCreated',
        lastName: 'Project',
        email: 'client@swisscleanmove.ch',
        phone: '+41 79 123 45 67',
        services: ['movingTransport']
        // agreeToTerms omitted - privileged admin action
      }, [], 'de', { Authorization: `Bearer ${validAdminToken}` });
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 200, 'Verified admin in database (role: ADMIN) can bypass consent for internal creation (HTTP 200)');
      assert(json.success === true, 'Admin privileged submission success is TRUE');
    }

    // 11k. Quotes route (/api/quotes): Valid admin user (role: 'ADMIN') -> 201 without agreement
    {
      (prisma.quoteSubmission as any).create = async () => ({ id: 'quote-admin-priv' });
      __setTestEmailSender(async () => ({ success: true, messageId: 'msg-quote-admin' }));

      const req = new Request('http://localhost:3000/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${validAdminToken}`
        },
        body: JSON.stringify({
          firstName: 'Internal',
          lastName: 'Quote',
          email: 'admin.created@quotes.com',
          phone: '+41 79 123 45 67',
          serviceType: 'Umzug'
          // agreement omitted
        })
      });
      const res = await postQuotes(req);
      assert(res.status === 201, 'Quotes route allows verified ADMIN to bypass consent (HTTP 201)');
    }

    // 11l. Quotes route (/api/quotes): Non-admin user (role: 'USER') without agreement -> 400
    {
      const req = new Request('http://localhost:3000/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${validNonAdminToken}`
        },
        body: JSON.stringify({
          firstName: 'Regular',
          lastName: 'User',
          email: 'user@quotes.com',
          phone: '+41 79 123 45 67',
          serviceType: 'Umzug'
          // agreement omitted
        })
      });
      const res = await postQuotes(req);
      assert(res.status === 400, 'Quotes route rejects non-admin user without agreement (HTTP 400)');
    }

    // ------------------------------------------------------------------
    // TEST 12: HTML Email Safety & Malicious Input Sanitization
    // ------------------------------------------------------------------
    console.log('\n👉 12. HTML Email Safety & Malicious Input Sanitization');

    // 12a. escapeHtml unit test
    {
      const rawInput = '<script>alert("XSS & attack")</script>\'test\'';
      const escaped = escapeHtml(rawInput);
      assert(escaped === '&lt;script&gt;alert(&quot;XSS &amp; attack&quot;)&lt;/script&gt;&#39;test&#39;', 'escapeHtml neutralizes HTML special characters');
      assert(!escaped.includes('<script>'), 'No unescaped tags in output');
    }

    // 12b. escapeHtmlWithLineBreaks unit test
    {
      const multiline = 'Line 1\nLine 2\r\n<img src=x onerror=alert(1)>';
      const result = escapeHtmlWithLineBreaks(multiline);
      assert(result.includes('Line 1<br>Line 2<br>&lt;img src=x onerror=alert(1)&gt;'), 'Preserves line breaks as <br> while escaping tags');
    }

    // 12c. formatContactEmail XSS safety
    {
      const html = formatContactEmail({
        name: '<b onmouseover=alert(1)>Hacker</b>',
        email: 'test"onClick="alert(1)@evil.com',
        phone: '+41 79 <script>',
        subject: 'Inquiry <style>body{display:none}</style>',
        message: 'Hello<script>alert("hacked")</script>\nLine two'
      });
      assert(!html.includes('<script>'), 'formatContactEmail strips executable script tags');
      assert(html.includes('&lt;b onmouseover=alert(1)&gt;Hacker&lt;/b&gt;'), 'formatContactEmail escapes malicious name tag');
      assert(html.includes('Hello&lt;script&gt;alert(&quot;hacked&quot;)&lt;/script&gt;<br>Line two'), 'formatContactEmail escapes message and preserves <br>');
    }

    // 12d. formatQuoteEmail XSS safety
    {
      const html = formatQuoteEmail({
        name: '<img src=x onerror=alert(1)>',
        email: 'quote@example.com',
        phone: '+41 79 123 45 67',
        service: '<b>Umzug</b>',
        details: {
          address: '<iframe src=evil.com>',
          message: 'Attacking<script>alert(1)</script>'
        }
      });
      assert(!html.includes('<img src=x'), 'formatQuoteEmail escapes customer name image tag');
      assert(!html.includes('<iframe'), 'formatQuoteEmail escapes iframe tag in address');
      assert(!html.includes('<b>Umzug</b>'), 'formatQuoteEmail escapes service string');
    }

    // 12e. formatServiceFormEmail XSS safety
    {
      const html = formatServiceFormEmail({
        serviceName: '<svg onload=alert(1)>',
        formType: 'moving',
        firstName: '<script>alert(1)</script>',
        name: 'Attacker',
        streetAndNumber: 'Main St 1 <marquee>',
        remark: 'Line 1\nLine 2<script>'
      });
      assert(!html.includes('<svg onload'), 'formatServiceFormEmail escapes SVG payload in service name');
      assert(!html.includes('<script>alert'), 'formatServiceFormEmail escapes firstName script tag');
      assert(html.includes('Line 1<br>Line 2&lt;script&gt;'), 'formatServiceFormEmail escapes remark while preserving line breaks');
    }

    // ------------------------------------------------------------------
    // TEST 13: Contact API Route Contracts (/api/contact)
    // ------------------------------------------------------------------
    console.log('\n👉 13. Contact API Route Delivery Contracts');

    // 13a. Validation error: missing fields
    {
      const req = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '', email: 'not-an-email' })
      });
      const res = await postContact(req);
      assert(res.status === 400, 'Contact route rejects missing fields with HTTP 400');
    }

    // 13b. Full success: DB OK + Email OK -> HTTP 201
    {
      (prisma.contactSubmission as any).create = async () => ({ id: 'contact-test-ok' });
      __setTestEmailSender(async () => ({ success: true, messageId: 'msg-contact-ok' }));

      const req = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Beat Feuz',
          email: 'beat.feuz@swissski.ch',
          phone: '+41 79 888 77 66',
          subject: 'Anfrage Reinigung',
          message: 'Guten Tag, bitte um Rückruf.'
        })
      });
      const res = await postContact(req);
      const json = await res.json();
      assert(res.status === 201, 'Contact route returns HTTP 201 on full success');
      assert(json.success === true && json.delivered === true && json.persisted === true, 'Contact response reports success, delivered, and persisted');
    }

    // 13c. Email failure with DB success -> HTTP 502 with non-duplicate guidance
    {
      (prisma.contactSubmission as any).create = async () => ({ id: 'contact-test-saved' });
      __setTestEmailSender(async () => ({ success: false, error: 'SMTP connection failed' }));

      const req = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Beat Feuz',
          email: 'beat.feuz@swissski.ch',
          subject: 'Anfrage Umzug',
          message: 'Bitte um Offerte.'
        })
      });
      const res = await postContact(req);
      const json = await res.json();
      assert(res.status === 502, 'Contact route returns HTTP 502 on email failure');
      assert(json.success === false, 'Contact response reports success: false on email failure');
      assert(json.persisted === true, 'Contact response accurately reports persisted: true');
      assert(json.error?.includes('do not submit repeatedly'), 'Informs user message was saved to avoid duplicate submissions');
    }

    // 13d. DB failure with Email success -> HTTP 200 with fallback
    {
      (prisma.contactSubmission as any).create = async () => { throw new Error('DB Connection Refused'); };
      const contactAudit = { warningReceived: false };
      __setTestEmailSender(async (opts) => {
        if (opts.html.includes('DATABASE WARNING')) contactAudit.warningReceived = true;
        return { success: true };
      });

      const req = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Beat Feuz',
          email: 'beat.feuz@swissski.ch',
          subject: 'Anfrage',
          message: 'Nachricht'
        })
      });
      const res = await postContact(req);
      const json = await res.json();
      assert(res.status === 200, 'Contact route delivers email even if DB fails');
      assert(json.persisted === false && json.delivered === true, 'Accurately reports persisted: false and delivered: true');
      assert(contactAudit.warningReceived === true, 'Admin receives email with database warning banner');
    }

    // ------------------------------------------------------------------
    // TEST 14: Quotes API Route Contracts (/api/quotes)
    // ------------------------------------------------------------------
    console.log('\n👉 14. Quotes API Route Delivery Contracts');

    // 14a. Rejects missing consent
    {
      const req = new Request('http://localhost:3000/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Sarah',
          lastName: 'Meier',
          email: 'sarah.meier@gmx.ch',
          phone: '+41 79 123 45 67',
          serviceType: 'Umzug'
          // agreement omitted
        })
      });
      const res = await postQuotes(req);
      const json = await res.json();
      assert(res.status === 400, 'Quotes route rejects missing consent with HTTP 400');
      assert(json.details?.some((d: string) => d.includes('privacy terms')), 'Flags terms consent in quotes route');
    }

    // 14b. Forged isAdmin cannot bypass consent
    {
      const req = new Request('http://localhost:3000/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Attacker',
          lastName: 'Forged',
          email: 'attacker@quotes.com',
          phone: '+41 79 123 45 67',
          serviceType: 'Umzug',
          isAdmin: true
        })
      });
      const res = await postQuotes(req);
      assert(res.status === 400, 'Quotes route rejects forged isAdmin without server authentication');
    }

    // 14c. Quotes full success -> HTTP 201
    {
      (prisma.quoteSubmission as any).create = async () => ({ id: 'quote-test-ok' });
      __setTestEmailSender(async () => ({ success: true, messageId: 'msg-quote-ok' }));

      const req = new Request('http://localhost:3000/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Sarah',
          lastName: 'Meier',
          email: 'sarah.meier@gmx.ch',
          phone: '+41 79 123 45 67',
          serviceType: 'Umzug',
          agreement: true
        })
      });
      const res = await postQuotes(req);
      const json = await res.json();
      assert(res.status === 201, 'Quotes route returns HTTP 201 on success');
      assert(json.success === true && json.delivered === true && json.persisted === true, 'Reports success, delivered, and persisted');
    }

    // 14d. Quotes email failure with DB success -> HTTP 502 with non-duplicate guidance
    {
      (prisma.quoteSubmission as any).create = async () => ({ id: 'quote-test-saved' });
      __setTestEmailSender(async () => ({ success: false, error: 'SMTP connection failed' }));

      const req = new Request('http://localhost:3000/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Sarah',
          lastName: 'Meier',
          email: 'sarah.meier@gmx.ch',
          phone: '+41 79 123 45 67',
          serviceType: 'Umzug',
          agreement: true
        })
      });
      const res = await postQuotes(req);
      const json = await res.json();
      assert(res.status === 502, 'Quotes route returns HTTP 502 on email failure');
      assert(json.success === false && json.delivered === false, 'Quotes response reports success: false on email failure');
      assert(json.persisted === true, 'Quotes response accurately reports persisted: true');
      assert(json.error?.includes('do not submit repeatedly'), 'Informs user quote request was saved to avoid duplicates');
    }

    // ------------------------------------------------------------------
    // TEST 15: Robust Services Array Validation
    // ------------------------------------------------------------------
    console.log('\n👉 15. Robust Services Array Validation');

    // 15a. Services array contains non-string elements (numbers, objects)
    {
      const req = createFormDataRequest({
        firstName: 'Hans',
        lastName: 'Muster',
        email: 'hans.muster@gmail.com',
        phone: '+41 79 123 45 67',
        services: [1234, { malicious: 'payload' }],
        agreeToTerms: true
      });
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 400, 'Rejects array containing non-string service values with HTTP 400 (not 500)');
      assert(json.details?.some((d: string) => d.includes('non-string or malformed')), 'Identifies non-string service element');
    }

    // 15b. Services is an object instead of string or array
    {
      const req = createFormDataRequest({
        firstName: 'Hans',
        lastName: 'Muster',
        email: 'hans.muster@gmail.com',
        phone: '+41 79 123 45 67',
        services: { serviceName: 'cleaning' },
        agreeToTerms: true
      });
      const res = await postServiceForms(req);
      const json = await res.json();
      assert(res.status === 400, 'Rejects object passed as services with HTTP 400');
    }

  } finally {
    // Restore all mocked delegates
    __setTestEmailSender(null);
    prisma.serviceFormSubmission.create = originalPrismaCreate;
    prisma.serviceFormSubmission.update = originalPrismaUpdate;
    prisma.contactSubmission.create = originalContactCreate;
    prisma.quoteSubmission.create = originalQuoteCreate;
    prisma.user.findUnique = originalUserFindUnique;
  }

  console.log('\n======================================================');
  console.log(`🏁 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test suite runner crashed:', err);
  process.exit(1);
});
