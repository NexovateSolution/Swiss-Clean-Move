import { NextResponse, NextRequest } from 'next/server';
import { calculateQuote } from '@/utils/pricingEngine';
import { generateQuotePdf } from '@/utils/pdfGenerator';
import { sendEmailNotification, formatServiceFormEmail, escapeHtml } from '@/lib/email';
import { prisma } from '../../../../lib/db';
import { authenticateRequest } from '../../../../lib/auth';
import fs from 'fs';
import path from 'path';

/**
 * Normalizes wizard form field names to canonical names expected by
 * pricingEngine.ts and pdfGenerator.ts.
 */
function normalizeFormFields(body: any): any {
  const normalized = { ...body };

  // Property details
  if (body.sharedPropertyType && !body.propertyType) {
    normalized.propertyType = body.sharedPropertyType;
    normalized.apartmentType = body.sharedPropertyType;
  }
  if (body.sharedRooms && !body.numberOfRooms) {
    normalized.numberOfRooms = body.sharedRooms;
    normalized.rooms = body.sharedRooms;
    normalized.numberOfRoomsApartment = body.sharedRooms;
  }
  if (body.sharedLivingArea && !body.livingSpaceInM2) {
    normalized.livingSpaceInM2 = body.sharedLivingArea;
    normalized.areaInM2 = body.sharedLivingArea;
    normalized.squareMeters = body.sharedLivingArea;
    normalized.area = body.sharedLivingArea;
  }
  if (body.sharedFloor && !body.floor) {
    normalized.floor = body.sharedFloor;
  }
  if (body.sharedElevator !== undefined && body.elevator === undefined) {
    normalized.elevator = body.sharedElevator;
    normalized.elevatorSizes = body.sharedElevator === 'yes' ? 'Yes' : 'No';
    if (body.sharedElevator === 'no') {
      normalized.hasElevator = false;
    }
  }
  if (body.sharedParking !== undefined && body.parking === undefined) {
    normalized.parking = body.sharedParking;
    if (body.sharedParking === 'no') {
      normalized.noParking = true;
    }
  }
  if (body.sharedParkingDistance && !body.parkingDistance) {
    normalized.parkingDistance = body.sharedParkingDistance;
  }

  // Moving origin address
  if (body.moveFromStreet && !body.streetAndNumber) {
    normalized.streetAndNumber = body.moveFromStreet;
    normalized.street = body.moveFromStreet;
  }
  if (body.moveFromZipCity && !body.postalCodeAndCity) {
    normalized.postalCodeAndCity = body.moveFromZipCity;
    normalized.city = body.moveFromZipCity;
  }

  // Moving destination address
  if (body.moveToStreet) {
    normalized.unloadingStreetAndNumber = body.moveToStreet;
    normalized.destinationStreet = body.moveToStreet;
    normalized.movingStreet = body.moveToStreet;
  }
  if (body.moveToZipCity) {
    normalized.unloadingPostalCodeAndCity = body.moveToZipCity;
    normalized.destinationCity = body.moveToZipCity;
    normalized.movingZipCity = body.moveToZipCity;
  }

  // Moving specific fields
  if (body.moveFromConditions && Array.isArray(body.moveFromConditions)) {
    if (body.moveFromConditions.includes('noElevator')) {
      normalized.hasElevator = false;
      normalized.elevator = 'no';
    }
  }

  // Cleaning address
  if (body.cleanStreet && !body.streetAndNumber) {
    normalized.streetAndNumber = body.cleanStreet;
    normalized.street = body.cleanStreet;
  }
  if (body.cleanZipCity && !body.postalCodeAndCity) {
    normalized.postalCodeAndCity = body.cleanZipCity;
    normalized.city = body.cleanZipCity;
  }

  // Map requestType to proper formType
  if (body.requestType === 'moving' && !body.formType) {
    normalized.formType = 'moving';
  } else if (body.requestType === 'cleaning' && !body.formType) {
    normalized.formType = 'cleaning';
  } else if (body.requestType === 'combo' && !body.formType) {
    normalized.formType = 'cleaning';
  }

  // Outdoor area
  if (body.cleanOutdoorArea === 'balcony' || body.cleanOutdoorArea === 'both') {
    normalized.hasBalcony = true;
  }

  // Preferred date mapping
  if (body.preferredDate && !body.cleaningAppointment && !body.movingDate) {
    normalized.cleaningAppointment = body.preferredDate;
    normalized.movingDate = body.preferredDate;
  }

  if (body.isExpress === 'true') {
    normalized.isExpress = true;
  }

  return normalized;
}

const RECOGNIZED_SERVICES = new Set([
  'moving', 'relocation', 'movingtransport', 'house-cleaning', 'cleaning',
  'movingoutcleaning', 'maintenancecleaning', 'disposal', 'disposalclearance',
  'facility-services', 'facilityservice', 'caretaking', 'household-helping',
  'household', 'window-cleaning', 'moving-and-cleaning', 'combo', 'universal',
  'gastronomy', 'gastronomy-cleaning', 'restaurantcleaning', 'officecleaning',
  'constructioncleaning', 'specialistcleaning', 'stairwellcleaning',
  'furnitureassembly', 'packingservice', 'highpressurecleaning', 'otherservice',
  'endreinigung', 'umzug', 'entsorgung', 'hauswartung', 'haushaltshilfe',
  'unterhaltsreinigung', 'fensterreinigung'
]);

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'application/pdf'
]);

// Deployment platform compatibility: Vercel serverless request body is capped at 4.5 MB total.
// For direct multipart submissions, total payload must fit within 3.5 MB to leave headroom for JSON and boundary overhead.
// For larger portfolios or uncompressed mobile photos, direct-to-storage uploads (e.g. Vercel Blob / S3 presigned URLs) are required.
const MAX_ATTACHMENTS = 3;
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB per file
const MAX_TOTAL_SIZE_BYTES = 3.5 * 1024 * 1024; // 3.5MB total

interface ValidatedAttachment {
  filename: string;
  contentType: string;
  size: number;
  buffer: Buffer;
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let rawBody: any = {};
    let rawLocale: string | null = null;
    const rawFiles: File[] = [];

    if (contentType.includes('multipart/form-data')) {
      const rawData = await req.formData();
      const dataString = rawData.get('data') as string;
      if (!dataString) {
        return NextResponse.json(
          { success: false, error: 'Missing form data in request' },
          { status: 400 }
        );
      }
      try {
        rawBody = JSON.parse(dataString);
      } catch {
        return NextResponse.json(
          { success: false, error: 'Malformed request JSON in data parameter' },
          { status: 400 }
        );
      }
      rawLocale = rawData.get('locale') as string | null;

      // Extract uploaded images/files
      const filesFromImages = rawData.getAll('images');
      const filesFromFiles = rawData.getAll('files');
      for (const f of [...filesFromImages, ...filesFromFiles]) {
        if (f && typeof f === 'object' && 'name' in f && 'size' in f && (f as File).size > 0) {
          rawFiles.push(f as File);
        }
      }
    } else if (contentType.includes('application/json')) {
      try {
        rawBody = await req.json();
      } catch {
        return NextResponse.json(
          { success: false, error: 'Malformed request JSON body' },
          { status: 400 }
        );
      }
      rawLocale = rawBody.locale;
    } else {
      return NextResponse.json(
        { success: false, error: 'Unsupported Content-Type header' },
        { status: 400 }
      );
    }

    if (!rawBody || typeof rawBody !== 'object' || Array.isArray(rawBody)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payload structure' },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // 1. SERVER-SIDE VALIDATION
    // ─────────────────────────────────────────────────────────────────────────────
    const validationErrors: string[] = [];

    // Names
    const rawFirstName = String(rawBody.firstName || '').trim();
    const rawLastName = String(rawBody.lastName || rawBody.name || '').trim();
    let customerFirstName = rawFirstName;
    let customerLastName = rawLastName;

    // Handle legacy single-string nameFirstName e.g. "Max Muster"
    if ((!customerFirstName || !customerLastName) && rawBody.nameFirstName) {
      const parts = String(rawBody.nameFirstName).trim().split(/\s+/);
      if (parts.length > 1) {
        customerFirstName = customerFirstName || parts[0];
        customerLastName = customerLastName || parts.slice(1).join(' ');
      } else if (parts.length === 1 && parts[0]) {
        customerFirstName = customerFirstName || parts[0];
        customerLastName = customerLastName || parts[0];
      }
    }

    if (!customerFirstName || customerFirstName.length > 100) {
      validationErrors.push('Please provide a valid first name (max 100 characters)');
    }
    if (!customerLastName || customerLastName.length > 100) {
      validationErrors.push('Please provide a valid last name (max 100 characters)');
    }

    // Email
    const customerEmail = String(rawBody.emailAddress || rawBody.email || '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail || customerEmail.length > 254 || !emailRegex.test(customerEmail)) {
      validationErrors.push('Please provide a valid email address');
    }

    // Phone
    const customerPhone = String(rawBody.telephone || rawBody.phone || '').trim();
    const digitsOnly = customerPhone.replace(/\D/g, '');
    const phoneValidChars = /^[\d\s+\-()./]{6,40}$/;
    if (!customerPhone || digitsOnly.length < 6 || digitsOnly.length > 20 || !phoneValidChars.test(customerPhone)) {
      validationErrors.push('Please provide a valid telephone number (minimum 6 digits)');
    }

    // Services selection validation (reject malformed arrays, non-strings, or invalid formats with 400)
    let rawServices: string[] = [];
    if (rawBody.services !== undefined && rawBody.services !== null) {
      if (Array.isArray(rawBody.services)) {
        for (const item of rawBody.services) {
          if (typeof item !== 'string') {
            validationErrors.push('Service array contains non-string or malformed values');
            break;
          }
          if (item.trim()) {
            rawServices.push(item.trim());
          }
        }
      } else if (typeof rawBody.services === 'string' && rawBody.services.trim()) {
        try {
          const parsed = JSON.parse(rawBody.services);
          if (Array.isArray(parsed)) {
            for (const item of parsed) {
              if (typeof item !== 'string') {
                validationErrors.push('Service array contains non-string values');
                break;
              }
              if (item.trim()) rawServices.push(item.trim());
            }
          } else if (typeof parsed === 'string' && parsed.trim()) {
            rawServices.push(parsed.trim());
          } else {
            validationErrors.push('Services parameter must be a string or array of strings');
          }
        } catch {
          rawServices.push(rawBody.services.trim());
        }
      } else {
        validationErrors.push('Services must be an array of service strings or a service name');
      }
    }

    const directService = String(rawBody.formType || rawBody.serviceName || rawBody.desiredService || '').trim().toLowerCase();
    const directSlug = String(rawBody.service || '').trim().toLowerCase();

    const hasRecognizedService =
      rawServices.some(s => RECOGNIZED_SERVICES.has(s.toLowerCase())) ||
      RECOGNIZED_SERVICES.has(directService) ||
      RECOGNIZED_SERVICES.has(directSlug);

    if (!hasRecognizedService) {
      validationErrors.push('Please select at least one recognized service');
    }

    // Server-side authentication check for privileged actions (never trust client-supplied isAdmin)
    // Only verified users with the actual privileged 'ADMIN' role in the database may bypass consent
    const authUser = await authenticateRequest(req as unknown as NextRequest).catch(() => null);
    const isServerAuthenticatedAdmin = Boolean(authUser && authUser.role === 'ADMIN');

    // Explicit consent/terms check: MANDATORY for every public quote submission.
    // Client-supplied isAdmin flag is strictly ignored for authorization.
    const termsAccepted = rawBody.agreeToTerms === true ||
                          rawBody.agreeToTerms === 'true' ||
                          rawBody.privacyConsent === true ||
                          rawBody.privacyConsent === 'true';

    if (!isServerAuthenticatedAdmin) {
      if (!termsAccepted) {
        validationErrors.push('Please confirm acceptance of privacy terms and conditions');
      }
    }

    // Length checks for optional text fields
    if (rawBody.streetAndNumber && String(rawBody.streetAndNumber).length > 250) {
      validationErrors.push('Address exceeds maximum length of 250 characters');
    }
    if (rawBody.postalCodeAndCity && String(rawBody.postalCodeAndCity).length > 250) {
      validationErrors.push('City/ZIP exceeds maximum length of 250 characters');
    }
    if (rawBody.remark && String(rawBody.remark).length > 3000) {
      validationErrors.push('Comments exceed maximum length of 3000 characters');
    }

    // Attachment validation (serverless-compatible size & count constraints)
    const validAttachments: ValidatedAttachment[] = [];
    if (rawFiles.length > 0) {
      if (rawFiles.length > MAX_ATTACHMENTS) {
        validationErrors.push(`Too many attachments. Maximum ${MAX_ATTACHMENTS} files allowed for direct upload.`);
      }

      let totalAttachmentBytes = 0;
      for (const file of rawFiles) {
        const mime = (file.type || '').toLowerCase();
        if (!ALLOWED_MIME_TYPES.has(mime)) {
          validationErrors.push(`File "${file.name}" has an unsupported format. Only JPEG, PNG, WEBP, and PDF files are accepted.`);
          break;
        }
        if (file.size > MAX_FILE_SIZE_BYTES) {
          validationErrors.push(`File "${file.name}" exceeds the maximum allowed file size of 2 MB for serverless upload.`);
          break;
        }
        totalAttachmentBytes += file.size;
        if (totalAttachmentBytes > MAX_TOTAL_SIZE_BYTES) {
          validationErrors.push('Total attachment size exceeds the 3.5 MB platform limit.');
          break;
        }

        // Clean filename (strip path traversal and control characters)
        const cleanName = path.basename(file.name).replace(/[^a-zA-Z0-9._-]/g, '_') || 'attachment';
        const buffer = Buffer.from(await file.arrayBuffer());
        validAttachments.push({
          filename: cleanName,
          contentType: mime || 'application/octet-stream',
          size: file.size,
          buffer
        });
      }
    }

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validationErrors
        },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // 2. DATA NORMALIZATION & QUOTE CALCULATION
    // ─────────────────────────────────────────────────────────────────────────────
    const body = normalizeFormFields(rawBody);
    body.firstName = customerFirstName;
    body.lastName = customerLastName;
    body.name = customerLastName;
    body.email = customerEmail;
    body.emailAddress = customerEmail;
    body.phone = customerPhone;
    body.telephone = customerPhone;

    const serviceType = body.formType || body.serviceName || directSlug || directService || 'moving';
    const supportedLocales = ['de', 'fr', 'it', 'en'];
    const localeCandidate = String(rawLocale || body.locale || 'de').toLowerCase();
    const locale = supportedLocales.includes(localeCandidate) ? localeCandidate : 'de';

    // Calculate quote centrally
    const quoteResult = calculateQuote(serviceType, body);

    // ─────────────────────────────────────────────────────────────────────────────
    // 3. DATABASE PERSISTENCE (DELIBERATE ERROR HANDLING)
    // ─────────────────────────────────────────────────────────────────────────────
    let submissionRecordId: string | null = null;
    let dbPersisted = false;
    let dbErrorMessage: string | null = null;

    try {
      const submission = await prisma.serviceFormSubmission.create({
        data: {
          serviceName: serviceType,
          formType: serviceType,
          firstName: customerFirstName,
          name: customerLastName,
          emailAddress: customerEmail,
          telephone: customerPhone,
          streetAndNumber: body.streetAndNumber || body.street || 'N/A',
          postalCodeAndCity: body.postalCodeAndCity || body.city || body.cleanZipCity || 'N/A',
          contactPreferredVia: body.contactPreferredVia || null,
          viewingIsWelcome: body.viewingIsWelcome || null,
          remark: body.remark || body.additionalDetails || null,
          estimatedPrice: quoteResult.totalEstimatedPrice,
          lineItems: quoteResult.lineItems as any,
          quoteSent: false,
          locale: locale,
          status: 'NEW',
          data: {
            ...body,
            estimatedPrice: quoteResult.totalEstimatedPrice,
            lineItems: quoteResult.lineItems,
            locale: locale,
            quoteResult: quoteResult,
            uploadedFiles: validAttachments.map(a => ({
              filename: a.filename,
              size: a.size,
              contentType: a.contentType
            }))
          }
        }
      });
      submissionRecordId = submission.id;
      dbPersisted = true;
      console.log(`✅ Saved quote submission to database (ID: ${submission.id})`);
    } catch (dbErr: any) {
      dbErrorMessage = dbErr instanceof Error ? dbErr.message : String(dbErr);
      console.error('❌ Database persistence error in service-forms:', dbErrorMessage);
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // 4. LOAD TRANSLATIONS & CONSTRUCT LOCALIZED EMAIL
    // ─────────────────────────────────────────────────────────────────────────────
    let messages: any = {};
    try {
      const messagesPath = path.join(process.cwd(), 'messages', `${locale}.json`);
      if (fs.existsSync(messagesPath)) {
        messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
      }
    } catch (e) {
      console.warn('Could not load translations for email:', e);
    }

    const formatKey = (key: string) => {
      const parts = key.split('.');
      const last = parts[parts.length - 1];
      const secondLast = parts.length > 1 ? parts[parts.length - 2] : '';
      const combined = secondLast && secondLast !== 'items' && secondLast !== 'quote' && secondLast !== 'serviceForm' && secondLast !== 'wizard'
        ? `${secondLast} - ${last}`
        : last;

      let formatted = combined.replace(/([A-Z])/g, ' $1').replace(/\b\w/g, str => str.toUpperCase());
      if (locale === 'de') {
        formatted = formatted.replace(/Base/g, 'Basis');
      }
      return formatted;
    };

    const t = (key: string) => {
      if (key === 'quote.items.discount') {
        if (locale === 'de') return 'Rabatt 5%';
        if (locale === 'fr') return 'Remise 5%';
        if (locale === 'it') return 'Sconto 5%';
        return 'Discount 5%';
      }

      const parts = key.split('.');
      let current = messages;
      for (const part of parts) {
        if (current && current[part]) {
          current = current[part];
        } else {
          return formatKey(key);
        }
      }
      return typeof current === 'string' ? current : formatKey(key);
    };

    // Format Email HTML line items
    const lineItemsHtml = (quoteResult.lineItems || []).map(item => {
      let label = t(item.id);
      if (label === formatKey(item.id) || label === item.id) {
        const attempt2 = t('serviceForm.' + item.id);
        if (attempt2 !== formatKey('serviceForm.' + item.id) && attempt2 !== 'serviceForm.' + item.id) {
          label = attempt2;
        }
      }
      return `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${label}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">CHF ${item.price.toFixed(2)}</td>
      </tr>
      `;
    }).join('');

    const totalHtml = quoteResult.isFallback
      ? (locale === 'de' ? 'Auf Anfrage' : locale === 'fr' ? 'Sur Demande' : locale === 'it' ? 'Su Richiesta' : 'Price Upon Request')
      : `CHF ${quoteResult.totalEstimatedPrice?.toFixed(2)}`;

    // Localized client email texts
    let translatedIntro = '';
    let translatedTitle = '';
    let clientSubject = 'Your Quote - SwissCleanMove';

    if (locale === 'de') {
      translatedTitle = 'SwissCleanMove - Ihre Offerte';
      clientSubject = 'Ihre Offerte - SwissCleanMove';
      translatedIntro = `
        <p><strong>Hinweis zur Offerte</strong></p>
        <p>Diese Offerte wurde automatisch anhand Ihrer Angaben und unserer aktuellen Preisrichtlinien erstellt.</p>
        <p>Bei Fragen oder gewünschten Anpassungen beraten wir Sie gerne persönlich.</p>
        <p>Sind Sie mit dieser Offerte einverstanden, bitten wir Sie, diese zu unterzeichnen und an uns zurückzusenden. Nach Erhalt der unterzeichneten Offerte bestätigen wir Ihren Auftrag.</p>
        <p>Vielen Dank für Ihr Vertrauen. Wir freuen uns auf Ihren Auftrag.</p>
        <p>Freundliche Grüsse<br>Ihr SwissCleanMove Team</p>
      `;
    } else if (locale === 'fr') {
      translatedTitle = 'SwissCleanMove - Votre Devis';
      clientSubject = 'Votre Devis - SwissCleanMove';
      translatedIntro = `
        <p><strong>Remarque concernant le devis</strong></p>
        <p>Ce devis a été généré automatiquement sur la base des informations que vous avez fournies et de nos directives tarifaires actuelles.</p>
        <p>Si vous avez des questions ou si vous souhaitez des ajustements, nous nous ferons un plaisir de vous conseiller personnellement.</p>
        <p>Si vous êtes d'accord avec ce devis, nous vous prions de le signer et de nous le retourner. Dès réception du devis signé, nous confirmerons votre commande.</p>
        <p>Nous vous remercions de votre confiance. Nous attendons votre commande avec impatience.</p>
        <p>Meilleures salutations,<br>Votre équipe SwissCleanMove</p>
      `;
    } else if (locale === 'it') {
      translatedTitle = 'SwissCleanMove - Il Vostro Preventivo';
      clientSubject = 'Il Vostro Preventivo - SwissCleanMove';
      translatedIntro = `
        <p><strong>Nota relativa al preventivo</strong></p>
        <p>Questo preventivo è stato generato automaticamente in base alle informazioni fornite e alle nostre tariffe attuali.</p>
        <p>In caso di domande o modifiche desiderate, saremo lieti di consigliarvi personalmente.</p>
        <p>Se concordate con questo preventivo, vi preghiamo di firmarlo e restituircelo. Alla ricezione del preventivo firmato, confermeremo il vostro ordine.</p>
        <p>Grazie per la vostra fiducia. Attendiamo con piacere il vostro ordine.</p>
        <p>Cordiali saluti,<br>Il vostro team SwissCleanMove</p>
      `;
    } else {
      translatedTitle = 'SwissCleanMove - Your Quote Estimate';
      clientSubject = 'Your Quote - SwissCleanMove';
      translatedIntro = `
        <p><strong>Note Regarding the Quote</strong></p>
        <p>This quote was automatically generated based on the information you provided and our current pricing guidelines.</p>
        <p>If you have any questions or would like adjustments, we would be happy to advise you personally.</p>
        <p>If you agree with this quote, please sign and return it to us. Upon receipt of the signed quote, we will confirm your order.</p>
        <p>Thank you for your trust. We look forward to your order.</p>
        <p>Kind regards,<br>Your SwissCleanMove Team</p>
      `;
    }

    const serviceNameMap: Record<string, Record<string, string>> = {
      de: {
        moving: 'Umzug',
        relocation: 'Umzug',
        'house-cleaning': 'Hausreinigung',
        cleaning: 'Reinigung',
        'moving-out-cleaning': 'Endreinigung',
        disposal: 'Entsorgung',
        'facility-services': 'Hauswartung',
        'household-helping': 'Haushaltshilfe',
        'window-cleaning': 'Fensterreinigung',
        'moving-and-cleaning': 'Umzug & Reinigung'
      },
      fr: {
        moving: 'Déménagement',
        relocation: 'Déménagement',
        'house-cleaning': 'Nettoyage maison',
        cleaning: 'Nettoyage',
        'moving-out-cleaning': 'Nettoyage fin de bail',
        disposal: 'Débarras & Évacuation',
        'facility-services': 'Conciergerie',
        'household-helping': 'Aide ménagère',
        'window-cleaning': 'Nettoyage de vitres',
        'moving-and-cleaning': 'Déménagement & Nettoyage'
      },
      it: {
        moving: 'Trasloco',
        relocation: 'Trasloco',
        'house-cleaning': 'Pulizia casa',
        cleaning: 'Pulizia',
        'moving-out-cleaning': 'Pulizia fine locazione',
        disposal: 'Smaltimento & Sgombero',
        'facility-services': 'Manutenzione immobiliare',
        'household-helping': 'Aiuto domestico',
        'window-cleaning': 'Pulizia finestre',
        'moving-and-cleaning': 'Trasloco & Pulizia'
      },
      en: {
        moving: 'Moving',
        relocation: 'Moving & Transport',
        'house-cleaning': 'House Cleaning',
        cleaning: 'Cleaning',
        'moving-out-cleaning': 'End-of-Tenancy Cleaning',
        disposal: 'Disposal & Clearance',
        'facility-services': 'Property Maintenance',
        'household-helping': 'Household Helping',
        'window-cleaning': 'Window Cleaning',
        'moving-and-cleaning': 'Moving & Cleaning'
      }
    };

    const translatedService = (serviceNameMap[locale] && serviceNameMap[locale][serviceType]) ||
      (serviceNameMap.de[serviceType]) ||
      serviceType;

    const subjectName = [customerLastName, customerFirstName].filter(Boolean).join(' ') || 'Customer';

    const clientHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <h2 style="color: #003366;">${translatedTitle}</h2>
        ${translatedIntro}
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #eee;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Service</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${lineItemsHtml}
          </tbody>
          <tfoot>
            <tr style="background-color: #fcfcfc;">
              <td style="padding: 10px; font-weight: bold; text-align: right; border-top: 2px solid #ddd;">Total:</td>
              <td style="padding: 10px; font-weight: bold; text-align: right; color: #d00; border-top: 2px solid #ddd;">${totalHtml}</td>
            </tr>
          </tfoot>
        </table>
        <p style="margin-top: 30px; font-size: 12px; color: #777;">*This is an automated estimate based on our standard pricing rules. Final price may vary upon inspection.</p>
        <br/>
        <p>${locale === 'de' ? 'Freundliche Grüsse' : locale === 'fr' ? 'Meilleures salutations' : locale === 'it' ? 'Cordiali saluti' : 'Kind regards'},<br/><strong>${locale === 'de' ? 'Ihr' : locale === 'fr' ? 'Votre équipe' : locale === 'it' ? 'Il vostro team' : 'Your'} SwissCleanMove Team</strong></p>
      </div>
    `;

    // ─────────────────────────────────────────────────────────────────────────────
    // 5. GENERATE PDF OVERLAY (WITH TIMEOUT GUARD)
    // ─────────────────────────────────────────────────────────────────────────────
    let pdfBuffer: Buffer | undefined;
    try {
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('PDF generation timed out')), 15000);
      });
      pdfBuffer = await Promise.race([
        generateQuotePdf(quoteResult, body),
        timeoutPromise
      ]);
    } catch (pdfErr) {
      console.warn('Failed to generate PDF overlay:', pdfErr);
    }

    const pdfAttachments = pdfBuffer ? [{
      filename: `Quote_${translatedService}_${new Date().getTime()}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf'
    }] : [];

    // Attachments for admin email (PDF + customer uploaded images)
    const adminAttachments = [
      ...pdfAttachments,
      ...validAttachments.map(a => ({
        filename: a.filename,
        content: a.buffer,
        contentType: a.contentType
      }))
    ];

    // ─────────────────────────────────────────────────────────────────────────────
    // 6. ADMINISTRATIVE EMAIL DELIVERY (CRITICAL REQUIREMENT)
    // ─────────────────────────────────────────────────────────────────────────────
    let adminHtml = formatServiceFormEmail({
      ...body,
      uploadedFiles: validAttachments.map(a => ({ name: a.filename, size: a.size }))
    });

    if (!pdfBuffer) {
      adminHtml = `<div style="background: #ffcccc; padding: 10px; border: 1px solid red; margin-bottom: 20px;">
        <strong>⚠️ WARNING: PDF Generation Failed!</strong><br>
        The contract PDF could not be generated and was not attached.
      </div>` + adminHtml;
    }

    if (!dbPersisted && dbErrorMessage) {
      adminHtml = `<div style="background: #fff3cd; color: #856404; padding: 12px; margin-bottom: 20px; border: 1px solid #ffeeba;">
        <strong>⚠️ DATABASE WARNING:</strong> This quote submission could not be saved to the database (${dbErrorMessage}). All customer data is preserved in this email.
      </div>` + adminHtml;
    }

    const adminEmailSubject = locale === 'it'
      ? `Nuova richiesta: ${translatedService} - ${subjectName}`
      : locale === 'fr'
        ? `Nouvelle demande: ${translatedService} - ${subjectName}`
        : locale === 'de'
          ? `Neue Anfrage: ${translatedService} - ${subjectName}`
          : `New Request: ${translatedService} - ${subjectName}`;

    const adminResult = await sendEmailNotification({
      to: 'info@swisscleanmove.ch, swisscleanmove.ch@gmail.com',
      subject: adminEmailSubject,
      html: adminHtml,
      attachments: adminAttachments
    });

    // If administrative delivery fails, DO NOT report success to the user!
    if (!adminResult.success) {
      console.error('❌ Administrative notification email delivery failed:', adminResult.error);
      const userMessage = dbPersisted
        ? 'Your quote inquiry was received and saved in our system, but administrative notification delivery encountered a temporary issue. Please do not submit repeatedly; our team will review your saved inquiry.'
        : 'Failed to deliver quote request to our team. Please try again or contact us directly by phone or WhatsApp.';

      return NextResponse.json({
        success: false,
        delivered: false,
        persisted: dbPersisted,
        id: submissionRecordId,
        error: userMessage
      }, { status: 502 });
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // 7. CLIENT CONFIRMATION EMAIL DELIVERY (SEPARATE ERROR HANDLING)
    // ─────────────────────────────────────────────────────────────────────────────
    let clientEmailSent = false;
    let clientEmailError: string | null = null;

    if (customerEmail) {
      const clientResult = await sendEmailNotification({
        to: customerEmail,
        subject: clientSubject,
        html: clientHtmlContent,
        attachments: pdfAttachments
      });

      if (clientResult.success) {
        clientEmailSent = true;
      } else {
        clientEmailError = clientResult.error || 'Client email failed';
        console.warn('⚠️ Client confirmation email failed to deliver:', clientEmailError);
      }
    }

    // Update database record with confirmation email status if DB was persisted
    if (dbPersisted && submissionRecordId) {
      try {
        await prisma.serviceFormSubmission.update({
          where: { id: submissionRecordId },
          data: {
            quoteSent: clientEmailSent,
            data: {
              ...body,
              estimatedPrice: quoteResult.totalEstimatedPrice,
              lineItems: quoteResult.lineItems,
              quoteSent: clientEmailSent,
              clientEmailError: clientEmailError,
              locale: locale
            }
          }
        });
      } catch (updateErr) {
        console.warn('Could not update submission quoteSent status in DB:', updateErr);
      }
    }

    // Return successful response contract
    return NextResponse.json({
      success: true,
      delivered: true,
      persisted: dbPersisted,
      id: submissionRecordId,
      clientEmailSent,
      quote: quoteResult
    }, { status: 200 });

  } catch (error: any) {
    const sanitizedError = error instanceof Error ? error.message : String(error);
    console.error('Error processing quote form:', error instanceof Error ? error.stack : sanitizedError);
    return NextResponse.json({
      success: false,
      delivered: false,
      persisted: false,
      error: 'An unexpected server error occurred while processing your quote request. Please try again or contact us directly.'
    }, { status: 500 });
  }
}
