const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const htmlTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; box-sizing: border-box; }
    </style>
  </head>
  <body>
    <h1>Test PDF</h1>
    <p>This is a test PDF to check page numbers.</p>
    <div style="page-break-after: always; height: 1000px; background: #eee;">Page 1 content</div>
    <h1>Test PDF Page 2</h1>
    <div style="height: 500px; background: #ccc;">Page 2 content</div>
  </body>
  </html>
  `;

  const browser = await puppeteer.launch({
    headless: "new"
  });
  
  const page = await browser.newPage();
  await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });
  
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>', 
    footerTemplate: `
      <div style="width: 100%; font-size: 10px; display: flex; justify-content: space-between; align-items: center; color: #555; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <span></span>
        <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
      </div>
    `,
    margin: {
      top: '15mm',
      bottom: '15mm',
      left: '20mm',
      right: '20mm'
    }
  });

  await browser.close();
  fs.writeFileSync('test_output.pdf', pdfBuffer);
  console.log('PDF created at test_output.pdf');
}

run().catch(console.error);
