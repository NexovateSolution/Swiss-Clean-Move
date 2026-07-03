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
          emailAddress: body.email || 'N/A',
          telephone: body.phone || body.telephone || 'N/A',
          streetAndNumber: body.street || 'N/A',
          postalCodeAndCity: body.city || 'N/A',
          data: body,
          estimatedPrice: quoteResult.totalEstimatedPrice,
          lineItems: quoteResult.lineItems as any,
          quoteSent: true,
          locale: locale
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

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #003366;">SwissCleanMove - Your Quote Estimate</h2>
        <p>Thank you for your request. Based on the details provided, here is your estimated price:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="padding: 10px; text-align: left;">Service</th>
              <th style="padding: 10px; text-align: right;">Estimated Price</th>
            </tr>
          </thead>
          <tbody>
            ${lineItemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td style="padding: 10px; font-weight: bold; text-align: right;">Total Estimated Price:</td>
              <td style="padding: 10px; font-weight: bold; text-align: right;">${totalHtml}</td>
            </tr>
          </tfoot>
        </table>
        <p style="margin-top: 30px; font-size: 12px; color: #777;">*This is an automated estimate based on our standard pricing rules. Final price may vary upon inspection.</p>
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
      await sendEmailNotification({
        to: body.email,
        subject: 'Your Estimated Quote - SwissCleanMove',
        html: htmlContent,
        attachments
      });
    }

    // Send Admin Email
    await sendEmailNotification({
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER || 'admin@swisscleanmove.ch',
      subject: `New Request: ${serviceType} - ${body.firstName} ${body.lastName}`,
      html: `<h2>New Form Submission</h2><p>Customer: ${body.firstName} ${body.lastName} (${body.email})</p>` + htmlContent + `<h3>Raw Data</h3><pre>${JSON.stringify(body, null, 2)}</pre>`,
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
