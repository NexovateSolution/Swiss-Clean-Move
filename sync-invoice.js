const fs = require('fs');

const gen = fs.readFileSync('src/app/api/admin/generate-invoice/route.ts', 'utf8');
const send = fs.readFileSync('src/app/api/admin/send-invoice/route.ts', 'utf8');

const sendLines = send.split('\n');
const header = sendLines.slice(0, 144).join('\n');

const genLines = gen.split('\n');

// Find start of tBlock in gen (where `const t: any = {` is)
const tStart = genLines.findIndex(l => l.includes('const t: any = {'));
const returnHtmlStart = genLines.findIndex(l => l.includes('const html = `'));
const htmlEnd = genLines.findIndex(l => l.includes('</html>`'));

if (tStart === -1 || returnHtmlStart === -1 || htmlEnd === -1) {
    console.error('Could not find boundaries in generate-invoice', { tStart, returnHtmlStart, htmlEnd });
    process.exit(1);
}

// Logic block is everything between tStart and returnHtmlStart
const logicBlock = genLines.slice(tStart, returnHtmlStart).join('\n');

// HTML block is everything between returnHtmlStart and htmlEnd
const htmlBlock = genLines.slice(returnHtmlStart + 1, htmlEnd + 1).join('\n');

const fn = `function generateInvoiceHTML(client: any, language: string): string {
    const { join } = require('path');
    const { readFileSync } = require('fs');
    const logoPath = join(process.cwd(), 'public', 'images', 'logo.png');
    const logoBuffer = readFileSync(logoPath);
    const LOGO_BASE64 = logoBuffer.toString('base64');

` + logicBlock + `

        return \`
` + htmlBlock + `

    } catch (error) {
        console.error('Error generating invoice HTML:', error);
        return '';
    }
}
`;

fs.writeFileSync('src/app/api/admin/send-invoice/route.ts', header + '\n' + fn);
console.log('Sync complete with exact boundaries.');
