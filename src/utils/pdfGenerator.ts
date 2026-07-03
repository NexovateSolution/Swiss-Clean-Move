import puppeteer from 'puppeteer';
import { QuoteResult } from './pricingEngine';
import fs from 'fs';
import path from 'path';

export async function generateQuotePdf(quote: QuoteResult, customer: any): Promise<Buffer> {
  // Read the premium template HTML
  const templatePath = path.join(process.cwd(), 'public', 'SwissCleanMove_Offerte_A4_Premium.html');
  let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

  // We inject a script/style block at the end of the body to overlay the dynamic quote data
  // perfectly on top of the blank sections of the pdf2htmlEX output.
  const locale = customer.locale || 'de';
  let messages: any = {};
  try {
    const messagesPath = path.join(process.cwd(), 'messages', `${locale}.json`);
    messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
  } catch(e) {
    console.warn("Could not load translations for PDF", e);
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

  const lineItemsHtml = quote.lineItems.map(item => {
    // If the key is 'quote.items...', we might need to check where it was injected. 
    // Let's check root quote, then serviceForm.quote
    let label = t(item.id);
    if (label === item.id) {
       label = t('serviceForm.' + item.id);
    }
    
    return `
    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #ccc; padding: 5px 0;">
      <span>${label}</span>
      <span>CHF ${item.price.toFixed(2)}</span>
    </div>
  `}).join('');


  const totalStr = quote.isFallback ? 'On Request' : `CHF ${quote.totalEstimatedPrice?.toFixed(2)}`;

  const overlayHtml = `
    <div id="quote-overlay" style="position: absolute; top: 400px; left: 80px; width: 630px; background: white; padding: 20px; z-index: 9999; font-family: sans-serif;">
      <h3 style="color: #003366; margin-bottom: 15px;">Cost Breakdown / Kostenaufstellung</h3>
      
      <div style="margin-bottom: 20px;">
        <strong>Customer:</strong> ${customer.firstName} ${customer.name || customer.lastName}<br>
        <strong>Address:</strong> ${customer.streetAndNumber}, ${customer.postalCodeAndCity}
      </div>

      <div style="width: 100%;">
        ${lineItemsHtml}
      </div>

      <div style="display: flex; justify-content: space-between; margin-top: 15px; font-weight: bold; font-size: 1.1em; color: #003366;">
        <span>Total Estimated Price:</span>
        <span>${totalStr}</span>
      </div>
      <div style="margin-top: 30px; font-size: 0.8em; color: #666;">
        *This is an automated estimate. Final price is subject to inspection.
      </div>
    </div>
  `;

  // Inject before closing body tag
  htmlTemplate = htmlTemplate.replace('</body>', `${overlayHtml}</body>`);

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: "new"
  });
  
  const page = await browser.newPage();
  
  // Set content and wait for it to fully render
  await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });
  
  // Print to PDF
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true
  });
  
  await browser.close();
  
  return pdfBuffer as Buffer;
}
