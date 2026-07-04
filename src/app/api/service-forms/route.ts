import { NextResponse } from 'next/server';
import { calculateQuote } from '@/utils/pricingEngine';
import { generateQuotePdf } from '@/utils/pdfGenerator';
import { sendEmailNotification } from '@/lib/email';
// We would import Prisma here if we are connecting to it.
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const rawData = await req.formData();
    const dataString = rawData.get('data') as string;
    const body = JSON.parse(dataString || '{}');
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
          return key; // Fallback to key
        }
      }
      return typeof current === 'string' ? current : key;
    };
  
    // Format Email HTML
    const lineItemsHtml = quoteResult.lineItems.map(item => {
      let label = t(item.id);
      if (label === item.id) {
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
      filename: `Quote_${serviceType}_${new Date().getTime()}.pdf`,
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
      subject: `New Request: ${serviceType} - ${body.firstName} ${body.lastName}`,
      html: `<h2>New Form Submission</h2><p>Customer: ${body.firstName} ${body.lastName} (${body.email || body.emailAddress})</p>` + htmlContent,
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
