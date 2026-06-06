const fs = require('fs');
const genContent = fs.readFileSync('src/app/api/admin/generate-invoice/route.ts', 'utf-8');
let sendContent = fs.readFileSync('src/app/api/admin/send-invoice/route.ts', 'utf-8');

// Use [\s\S]*? to handle \r\n and any other whitespace characters
const htmlMatch = genContent.match(/const html = `([\s\S]*?)`/);
if (htmlMatch) {
    const newHtml = htmlMatch[1];
    
    // In send-invoice, the HTML string starts with `return `\n    <!DOCTYPE html>...`
    sendContent = sendContent.replace(/return `[\s\S]*?<!DOCTYPE html>[\s\S]*?<\/html>[\s\S]*?`;/, 'return `\\n' + newHtml + '\\n    `;');
    
    const logoCode = `
    const { join } = require('path');
    const { readFileSync } = require('fs');
    const logoPath = join(process.cwd(), 'public', 'images', 'logo.png');
    const logoBuffer = readFileSync(logoPath);
    const LOGO_BASE64 = logoBuffer.toString('base64');
`;
    sendContent = sendContent.replace(/(function generateInvoiceHTML\(client: any, language: string\): string \{)/, '$1\\n' + logoCode);
    
    // Also remove the original LOGO_BASE64 import from send-invoice
    sendContent = sendContent.replace(/import { LOGO_BASE64 } from '@\/lib\/logo-base64'(\r?\n)/, '');
    
    fs.writeFileSync('src/app/api/admin/send-invoice/route.ts', sendContent);
    console.log('Successfully synced HTML to send-invoice');
} else {
    console.log('Failed to find HTML block');
}
