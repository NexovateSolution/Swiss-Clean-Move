import { generateQuotePdf } from './src/utils/pdfGenerator';
import { calculateQuote } from './src/utils/pricingEngine';
import fs from 'fs';

async function run() {
  const body = {
    formType: 'cleaning',
    firstName: 'Test',
    name: 'User',
    email: 'test@example.com',
    propertyType: 'apartment',
    numberOfRooms: 3.5,
    areaInM2: 80,
    streetAndNumber: 'Teststrasse 1',
    postalCodeAndCity: '8000 Zurich',
    locale: 'en'
  };

  try {
    const quoteResult = calculateQuote('cleaning', body);
    console.log("Calculated quote, generating PDF...");
    const pdfBuffer = await generateQuotePdf(quoteResult, body, 'quote');
    fs.writeFileSync('test_output.pdf', pdfBuffer);
    console.log("Success! PDF written to test_output.pdf");
  } catch (error) {
    console.error("PDF generation failed:", error);
  }
}

run();
