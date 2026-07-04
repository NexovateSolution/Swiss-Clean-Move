import { NextResponse } from 'next/server';
import { calculateQuote } from '@/utils/pricingEngine';
import { generateQuotePdf } from '@/utils/pdfGenerator';
import { sendEmailNotification } from '@/lib/email';
// We would import Prisma here if we are connecting to it.
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Normalizes wizard form field names to canonical names expected by
 * pricingEngine.ts and pdfGenerator.ts.
 * 
 * The wizard uses prefixed names like "sharedPropertyType", "sharedRooms",
 * "moveFromStreet", "moveToStreet", etc. but the pricing engine and PDF
 * generator expect "propertyType", "rooms", "numberOfRooms", etc.
 */
function normalizeFormFields(body: any): any {
  const normalized = { ...body };

  // Property details (from the "propertyDetails" wizard step)
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
    // Pricing engine checks: elevator === 'no' or elevator === false
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

  // Moving specific fields mapped to pricing engine names
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

  // Map the "requestType" to a proper service type for normalizeServiceType
  if (body.requestType === 'moving' && !body.formType) {
    normalized.formType = 'moving';
  } else if (body.requestType === 'cleaning' && !body.formType) {
    normalized.formType = 'cleaning';
  } else if (body.requestType === 'combo' && !body.formType) {
    normalized.formType = 'cleaning'; // combo defaults to cleaning pricing
  }

  // Outdoor area -> hasBalcony for pricing
  if (body.cleanOutdoorArea === 'balcony' || body.cleanOutdoorArea === 'both') {
    normalized.hasBalcony = true;
  }

  // Preferred date mapping
  if (body.preferredDate && !body.cleaningAppointment && !body.movingDate) {
    normalized.cleaningAppointment = body.preferredDate;
    normalized.movingDate = body.preferredDate;
  }

  // Map isExpress string to boolean
  if (body.isExpress === 'true') {
    normalized.isExpress = true;
  }

  return normalized;
}

export async function POST(req: Request) {
  try {
    const rawData = await req.formData();
    const dataString = rawData.get('data') as string;
    const rawBody = JSON.parse(dataString || '{}');
    const body = normalizeFormFields(rawBody);
    const serviceType = body.formType || body.serviceName || 'moving';
    const locale = rawData.get('locale') || body.locale || 'en';
    
    // Calculate quote centrally
    const quoteResult = calculateQuote(serviceType, body);
    
    // Attempt to save to database
    try {
      await prisma.serviceFormSubmission.create({
        data: {
          serviceName: serviceType,
          formType: serviceType,
          firstName: body.firstName || 'N/A',
          name: body.lastName || body.name || 'N/A',
          emailAddress: body.email || body.emailAddress || 'N/A',
          telephone: body.phone || body.telephone || 'N/A',
          streetAndNumber: body.street || body.streetAndNumber || 'N/A',
          postalCodeAndCity: body.city || body.postalCodeAndCity || body.cleanZipCity || 'N/A',
          data: {
            ...body,
            estimatedPrice: quoteResult.totalEstimatedPrice,
            lineItems: quoteResult.lineItems,
            quoteSent: true,
            locale: locale,
            quoteResult: quoteResult
          }
        }
      });
    } catch(dbErr) {
      console.warn("Could not save to DB (perhaps schema not updated yet):", dbErr);
    }
    
    let messages: any = {};
    try {
      const fs = require('fs');
      const path = require('path');
      const messagesPath = path.join(process.cwd(), 'messages', `${locale}.json`);
      messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
    } catch(e) {
      console.warn("Could not load translations for Email", e);
    }
  
    const t = (key: string) => {
      const parts = key.split('.');
      let current = messages;
      for (const part of parts) {
        if (current && current[part]) {
          current = current[part];
        } else {
          return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()); // Fallback
        }
      }
      return typeof current === 'string' ? current : key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    };
  
    // Format Email HTML
    const lineItemsHtml = quoteResult.lineItems.map(item => {
      let label = t(item.id);
      if (label === item.id || label === item.id.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())) {
         label = t('serviceForm.' + item.id);
      }
      return `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${label}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">CHF ${item.price.toFixed(2)}</td>
      </tr>
      `}).join('');


    const totalHtml = quoteResult.isFallback 
      ? `Price Upon Request` 
      : `CHF ${quoteResult.totalEstimatedPrice?.toFixed(2)}`;

    let translatedIntro = '';
    let translatedTitle = '';
    
    if (locale === 'de') {
      translatedTitle = 'SwissCleanMove - Ihre Offerte';
      translatedIntro = `
        <p><strong>Hinweis zur Offerte</strong></p>
        <p>Diese Offerte wurde automatisch anhand Ihrer Angaben und unserer aktuellen Preisrichtlinien erstellt.</p>
        <p>SwissCleanMove steht für faire Preise, höchste Qualität und zuverlässigen Service nach Schweizer Standard.</p>
        <p>Haben Sie Fragen oder wünschen Sie Anpassungen? Wir beraten Sie gerne persönlich und finden die passende Lösung für Ihr Anliegen.</p>
        <p>Vielen Dank für Ihr Vertrauen. Wir freuen uns darauf, Sie bald als Kundin oder Kunden begrüssen zu dürfen.</p>
      `;
    } else if (locale === 'fr') {
      translatedTitle = 'SwissCleanMove - Votre Devis';
      translatedIntro = `
        <p><strong>Remarque concernant le devis</strong></p>
        <p>Ce devis a été généré automatiquement sur la base des informations que vous avez fournies et de nos directives tarifaires actuelles.</p>
        <p>SwissCleanMove est synonyme de prix équitables, de qualité supérieure et de service fiable selon les normes suisses.</p>
        <p>Avez-vous des questions ou souhaitez-vous des ajustements ? Nous nous ferons un plaisir de vous conseiller personnellement et de trouver la solution adaptée à vos besoins.</p>
        <p>Nous vous remercions de votre confiance. Nous nous réjouissons de vous accueillir prochainement comme client.</p>
      `;
    } else {
      translatedTitle = 'SwissCleanMove - Your Quote Estimate';
      translatedIntro = `
        <p><strong>Note Regarding the Quote</strong></p>
        <p>This quote was automatically generated based on the information you provided and our current pricing guidelines.</p>
        <p>SwissCleanMove stands for fair pricing, highest quality, and reliable service according to Swiss standards.</p>
        <p>Do you have any questions or would you like adjustments? We are happy to advise you personally and find the right solution for your needs.</p>
        <p>Thank you for your trust. We look forward to welcoming you soon as a valued customer.</p>
      `;
    }

    const subjectName = [body.name, body.firstName].filter(n => !!n && n !== 'N/A').join(' ') || 'Customer';
    const translatedService = locale === 'de' ? (serviceType === 'moving' ? 'Umzug' : (serviceType === 'house-cleaning' ? 'Hausreinigung' : 'Reinigung')) : (locale === 'fr' ? (serviceType === 'moving' ? 'Déménagement' : 'Nettoyage') : serviceType);

    const htmlContent = `
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
        <p>${locale === 'de' ? 'Freundliche Grüsse' : locale === 'fr' ? 'Meilleures salutations' : 'Kind regards'},<br/><strong>${locale === 'de' ? 'Ihr' : locale === 'fr' ? 'Votre équipe' : 'Your'} SwissCleanMove Team</strong></p>
      </div>
    `;

    // Generate PDF Overlay
    let pdfBuffer: Buffer | undefined;
    try {
      pdfBuffer = await generateQuotePdf(quoteResult, body);
    } catch (pdfErr) {
      console.warn("Failed to generate PDF overlay:", pdfErr);
    }

    const attachments = pdfBuffer ? [{
      filename: `Quote_${translatedService}_${new Date().getTime()}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf'
    }] : [];

    // Send Customer Email
    if (body.email) {
      let subject = 'Your Quote - SwissCleanMove';
      if (locale === 'de') subject = 'Ihre Offerte - SwissCleanMove';
      else if (locale === 'fr') subject = 'Votre Devis - SwissCleanMove';

      await sendEmailNotification({
        to: body.email,
        subject: subject,
        html: htmlContent,
        attachments: attachments
      });
    }

    // Send Admin Email (Formatted without raw data if possible, or keep it clean)
    await sendEmailNotification({
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER || 'admin@swisscleanmove.ch',
      subject: `New Request: ${translatedService} - ${subjectName}`,
      html: `<h2>New Form Submission</h2><p>Customer: ${subjectName} (${body.email || body.emailAddress})</p>` + htmlContent,
      attachments
    });

    return NextResponse.json({ 
      success: true, 
      quote: quoteResult 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error processing form:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
