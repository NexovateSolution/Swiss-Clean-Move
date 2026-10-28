// Email notification utility using nodemailer with Gmail
import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: any[];
}

export interface SendEmailResult {
  success: boolean;
  error?: string;
  messageId?: string;
}

let testEmailSender: ((options: EmailOptions) => Promise<SendEmailResult>) | null = null;

/** Test helper to mock email sending without real SMTP traffic */
export function __setTestEmailSender(fn: ((options: EmailOptions) => Promise<SendEmailResult>) | null) {
  testEmailSender = fn;
}

export async function sendEmailNotification(options: EmailOptions): Promise<SendEmailResult> {
  if (testEmailSender) {
    return testEmailSender(options);
  }

  try {
    let transporter;
    let senderEmail;

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      // Use generic SMTP if configured
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST.trim(),
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: parseInt(process.env.SMTP_PORT || '465') === 465, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER.trim(),
          pass: process.env.SMTP_PASSWORD.trim(),
        },
      });
      senderEmail = process.env.SMTP_USER.trim();
    } else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      // Fallback to Gmail
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER.trim(),
          pass: process.env.GMAIL_APP_PASSWORD.trim(),
        },
      });
      senderEmail = process.env.GMAIL_USER.trim();
    } else {
      console.warn('⚠️ SMTP/Gmail credentials not configured. Email not sent.');
      return { success: false, error: 'SMTP/Gmail credentials not configured on server' };
    }

    const info = await transporter.sendMail({
      from: `"SwissCleanMove" <${senderEmail}>`,
      to: options.to,
      replyTo: options.replyTo || senderEmail,
      subject: options.subject,
      text: options.text || '',
      html: options.html,
      attachments: options.attachments,
    });

    console.log(`✅ Email sent to ${options.to}: ${options.subject} (ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    const rawError = error instanceof Error ? error.message : String(error);
    // Sanitize any password leakage from connection errors
    const sanitizedError = rawError.replace(/pass(word)?\s*[:=]\s*[^\s,]+/gi, 'password=***');
    console.error(`❌ Failed to send email notification to ${options.to}:`, sanitizedError);
    return { success: false, error: sanitizedError };
  }
}

/**
 * Safely escapes HTML special characters to prevent HTML/XSS injection in emails.
 */
export function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Escapes HTML characters while safely preserving line breaks as <br>.
 */
export function escapeHtmlWithLineBreaks(str: unknown): string {
  if (str === null || str === undefined) return '';
  const escaped = escapeHtml(str);
  return escaped.replace(/(?:\r\n|\r|\n)/g, '<br>');
}

export function formatContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): string {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = data.phone ? escapeHtml(data.phone) : '';
  const safeSubject = escapeHtml(data.subject);
  const safeMessage = escapeHtmlWithLineBreaks(data.message);
  const rawDigits = data.phone ? data.phone.replace(/\D/g, '') : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 20px; background-color: #f3f4f6; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { background: #DC2626; color: white; padding: 24px; text-align: center; }
        .content { padding: 24px; }
        .section { background: #f9fafb; padding: 16px 20px; margin-bottom: 20px; border-radius: 6px; border: 1px solid #f3f4f6; }
        .section-title { font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb; padding-bottom: 6px; }
        .field { margin-bottom: 10px; font-size: 14px; }
        .label { font-weight: 600; color: #4b5563; min-width: 110px; display: inline-block; }
        .value { color: #111827; }
        .message-box { background: #ffffff; padding: 16px; border-left: 4px solid #DC2626; border-radius: 4px; font-size: 14px; color: #111827; margin-top: 8px; border: 1px solid #e5e7eb; border-left: 4px solid #DC2626; }
        .actions { text-align: center; margin: 24px 0 12px 0; }
        .btn { display: inline-block; padding: 10px 18px; margin: 4px; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 6px; color: #ffffff !important; }
        .btn-reply { background: #DC2626; }
        .btn-call { background: #0284c7; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; padding: 16px 20px; border-top: 1px solid #e5e7eb; background: #f9fafb; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">🏠 SwissCleanMove</h1>
          <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.95; font-weight: 600;">🚨 NEUE KONTAKTANFRAGE / NEW INQUIRY</p>
        </div>
        <div class="content">
          <div class="section">
            <h3 class="section-title">👤 Kundendaten / Customer Details</h3>
            <div class="field">
              <span class="label">Name:</span> <strong class="value">${safeName}</strong>
            </div>
            <div class="field">
              <span class="label">E-Mail:</span> <a href="mailto:${safeEmail}" style="color: #DC2626; font-weight: 600;">${safeEmail}</a>
            </div>
            ${safePhone ? `
            <div class="field">
              <span class="label">Telefon:</span> <a href="tel:${safePhone}" style="color: #DC2626; font-weight: 600;">${safePhone}</a>
            </div>
            ` : ''}
          </div>

          <div class="section">
            <h3 class="section-title">📝 Anliegen / Message Details</h3>
            <div class="field">
              <span class="label">Betreff / Subject:</span> <strong class="value">${safeSubject}</strong>
            </div>
            <div class="field" style="margin-top: 14px;">
              <span class="label" style="display: block; margin-bottom: 6px;">Nachricht / Message:</span>
              <div class="message-box">
                ${safeMessage}
              </div>
            </div>
          </div>

          <div class="actions">
            <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(data.subject)}" class="btn btn-reply">✉️ Direkt antworten</a>
            ${safePhone ? `<a href="tel:${safePhone}" class="btn btn-call">📞 Kunde anrufen</a>` : ''}
          </div>
        </div>
        <div class="footer">
          <p style="margin: 0 0 4px 0;">Automatische Benachrichtigung von SwissCleanMove Website</p>
          <p style="margin: 0;">Eingegangen: ${new Date().toLocaleString('de-CH', { timeZone: 'Europe/Zurich' })}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function formatQuoteEmail(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  details: any;
}): string {
  let parsedDetails: any = {};
  try {
    parsedDetails = typeof data.details === 'string' ? JSON.parse(data.details) : (data.details || {});
  } catch {
    parsedDetails = {};
  }

  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone);
  const safeService = escapeHtml(data.service);
  const safeAddress = escapeHtml(parsedDetails.address);
  const safeCity = escapeHtml(parsedDetails.city);
  const safePostalCode = escapeHtml(parsedDetails.postalCode);
  const safePropertyType = escapeHtml(parsedDetails.propertyType);
  const safeRooms = escapeHtml(parsedDetails.rooms);
  const safeArea = escapeHtml(parsedDetails.area);
  const safePreferredDate = escapeHtml(parsedDetails.preferredDate);
  const safeUrgency = escapeHtml(parsedDetails.urgency);
  const safeMessage = escapeHtmlWithLineBreaks(parsedDetails.message);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #00AA00; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; margin: 20px 0; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #00AA00; }
        .section { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #00AA00; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏠 SwissCleanMove</h1>
          <p>New Quote Request</p>
        </div>
        <div class="content">
          <div class="section">
            <h3>Customer Information</h3>
            <div class="field">
              <span class="label">Name:</span> ${safeName}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${safeEmail}
            </div>
            <div class="field">
              <span class="label">Phone:</span> ${safePhone}
            </div>
          </div>
          
          <div class="section">
            <h3>Service Details</h3>
            <div class="field">
              <span class="label">Service Type:</span> ${safeService}
            </div>
            ${parsedDetails.address ? `
            <div class="field">
              <span class="label">Address:</span> ${safeAddress}
            </div>
            ` : ''}
            ${parsedDetails.city ? `
            <div class="field">
              <span class="label">City:</span> ${safeCity}
            </div>
            ` : ''}
            ${parsedDetails.postalCode ? `
            <div class="field">
              <span class="label">Postal Code:</span> ${safePostalCode}
            </div>
            ` : ''}
            ${parsedDetails.propertyType ? `
            <div class="field">
              <span class="label">Property Type:</span> ${safePropertyType}
            </div>
            ` : ''}
            ${parsedDetails.rooms ? `
            <div class="field">
              <span class="label">Rooms:</span> ${safeRooms}
            </div>
            ` : ''}
            ${parsedDetails.area ? `
            <div class="field">
              <span class="label">Area:</span> ${safeArea} m²
            </div>
            ` : ''}
            ${parsedDetails.preferredDate ? `
            <div class="field">
              <span class="label">Preferred Date:</span> ${safePreferredDate}
            </div>
            ` : ''}
            ${parsedDetails.urgency ? `
            <div class="field">
              <span class="label">Urgency:</span> ${safeUrgency}
            </div>
            ` : ''}
            ${parsedDetails.message ? `
            <div class="field">
              <span class="label">Additional Message:</span><br>
              <p style="background: #f0f0f0; padding: 10px; margin-top: 5px;">
                ${safeMessage}
              </p>
            </div>
            ` : ''}
          </div>
        </div>
        <div class="footer">
          <p>This is an automated notification from SwissCleanMove website</p>
          <p>Received: ${new Date().toLocaleString('en-CH', { timeZone: 'Europe/Zurich' })}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function formatServiceFormEmail(data: any): string {
  const t = {
    newRequest: 'Neue Anfrage',
    customerInfo: 'Kundeninformationen',
    name: 'Name:',
    address: 'Adresse:',
    phone: 'Telefon:',
    email: 'E-Mail:',
    relocationDetails: 'Umzugsdetails',
    movingDate: 'Umzugsdatum:',
    unloadingAddress: 'Abladeadresse:',
    unloadingCity: 'Abladeort:',
    rooms: 'Zimmer:',
    livingSpace: 'Wohnfläche:',
    cleaningDetails: 'Reinigungsdetails',
    apartmentType: 'Objekttyp:',
    area: 'Fläche:',
    cleaningDate: 'Reinigungsdatum:',
    additionalRemarks: 'Zusätzliche Bemerkungen',
    automatedMsg: 'Dies ist eine automatische Benachrichtigung der SwissCleanMove Website',
    received: 'Empfangen:'
  };

  const safeServiceName = escapeHtml(data.serviceName);
  const safeFormType = escapeHtml(data.formType);
  const safeSalutation = escapeHtml(data.salutation);
  const safeFirstName = escapeHtml(data.firstName);
  const safeName = escapeHtml(data.name);
  const safeStreetAndNumber = escapeHtml(data.streetAndNumber);
  const safePostalCodeAndCity = escapeHtml(data.postalCodeAndCity);
  const safePhone = escapeHtml(data.telephone || data.phone);
  const safeEmail = escapeHtml(data.emailAddress || data.email);
  const safeMovingDate = escapeHtml(data.movingDate);
  const safeUnloadingAddress = escapeHtml(data.unloadingStreetAndNumber);
  const safeUnloadingCity = escapeHtml(data.unloadingPostalCodeAndCity);
  const safeRooms = escapeHtml(data.numberOfRooms || data.numberOfRoomsApartment);
  const safeLivingSpace = escapeHtml(data.livingSpaceInM2 || data.areaInM2);
  const safeFloors = escapeHtml(data.floors);
  const safeLift = escapeHtml(data.lift || 'Nein');
  const safeCleaningDate = escapeHtml(data.cleaningAppointment);
  const safeApartmentType = escapeHtml(data.apartmentType || data.propertyType);
  const safeDisposalType = escapeHtml(data.disposalType);
  const safeEstimatedVolume = escapeHtml(data.estimatedVolume);
  const safePreferredDate = escapeHtml(data.preferredDate);
  const safeRemarks = escapeHtmlWithLineBreaks(data.remark || data.additionalDetails);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #CC0000; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; margin: 20px 0; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #CC0000; }
        .section { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #CC0000; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏠 SwissCleanMove</h1>
          <p>${t.newRequest} - ${safeServiceName} (${safeFormType})</p>
        </div>
        <div class="content">
          <div class="section">
            <h3>${t.customerInfo}</h3>
            <div class="field">
              <span class="label">${t.name}</span> ${safeSalutation ? `${safeSalutation} ` : ''}${safeFirstName ? `${safeFirstName} ` : ''}${safeName}
            </div>
            <div class="field">
              <span class="label">${t.address}</span> ${safeStreetAndNumber}${safePostalCodeAndCity ? `, ${safePostalCodeAndCity}` : ''}
            </div>
            <div class="field">
              <span class="label">${t.phone}</span> ${safePhone}
            </div>
            <div class="field">
              <span class="label">${t.email}</span> ${safeEmail}
            </div>
          </div>
          
          ${(data.formType === 'relocation' || data.formType === 'moving' || data.formType === 'moving-and-cleaning' || data.formType === 'unified' || data.movingDate || data.unloadingStreetAndNumber) ? `
          <div class="section">
            <h3>${t.relocationDetails}</h3>
            ${data.movingDate ? `<div class="field"><span class="label">${t.movingDate}</span> ${safeMovingDate}</div>` : ''}
            ${data.unloadingStreetAndNumber ? `<div class="field"><span class="label">${t.unloadingAddress}</span> ${safeUnloadingAddress}</div>` : ''}
            ${data.unloadingPostalCodeAndCity ? `<div class="field"><span class="label">${t.unloadingCity}</span> ${safeUnloadingCity}</div>` : ''}
            ${(data.numberOfRooms || data.numberOfRoomsApartment) ? `<div class="field"><span class="label">${t.rooms}</span> ${safeRooms}</div>` : ''}
            ${(data.livingSpaceInM2 || data.areaInM2) ? `<div class="field"><span class="label">${t.livingSpace}</span> ${safeLivingSpace} m²</div>` : ''}
            ${data.floors ? `<div class="field"><span class="label">Etage / Aufzug:</span> ${safeFloors} / ${safeLift}</div>` : ''}
          </div>
          ` : ''}
          
          ${(data.formType === 'cleaning' || data.formType === 'moving-and-cleaning' || data.formType === 'house-cleaning' || data.formType === 'unified' || data.cleaningAppointment || data.numberOfRoomsApartment) ? `
          <div class="section">
            <h3>${t.cleaningDetails}</h3>
            ${data.cleaningAppointment ? `<div class="field"><span class="label">${t.cleaningDate}</span> ${safeCleaningDate}</div>` : ''}
            ${(data.numberOfRoomsApartment || data.numberOfRooms) ? `<div class="field"><span class="label">${t.rooms}</span> ${safeRooms}</div>` : ''}
            ${(data.apartmentType || data.propertyType) ? `<div class="field"><span class="label">${t.apartmentType}</span> ${safeApartmentType}</div>` : ''}
            ${(data.areaInM2 || data.livingSpaceInM2) ? `<div class="field"><span class="label">${t.area}</span> ${safeLivingSpace} m²</div>` : ''}
          </div>
          ` : ''}

          ${(data.formType === 'disposal' || (data.services && data.services.includes('disposalClearance'))) ? `
          <div class="section">
            <h3>Entsorgung & Räumung</h3>
            ${data.disposalType ? `<div class="field"><span class="label">Art:</span> ${safeDisposalType}</div>` : ''}
            ${data.estimatedVolume ? `<div class="field"><span class="label">Volumen:</span> ${safeEstimatedVolume}</div>` : ''}
            ${data.preferredDate ? `<div class="field"><span class="label">Wunschtermin:</span> ${safePreferredDate}</div>` : ''}
          </div>
          ` : ''}

          ${data.uploadedFiles && data.uploadedFiles.length > 0 ? `
          <div class="section">
            <h3>📎 Angehängte Dateien (${data.uploadedFiles.length})</h3>
            <ul>
              ${data.uploadedFiles.map((f: any) => `<li>${escapeHtml(f.name)} (${Math.round((f.size || 0) / 1024)} KB)</li>`).join('')}
            </ul>
          </div>
          ` : ''}
          
          ${(data.remark || data.additionalDetails) ? `
          <div class="section">
            <h3>${t.additionalRemarks}</h3>
            <p style="background: #f0f0f0; padding: 10px;">
              ${safeRemarks}
            </p>
          </div>
          ` : ''}
        </div>
        <div class="footer">
          <p>${t.automatedMsg}</p>
          <p>${t.received} ${new Date().toLocaleString('de-CH', { timeZone: 'Europe/Zurich' })}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
