const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const downloadPath = path.resolve('./downloads');
  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath,
  });

  await page.goto('file://' + path.resolve('./public/test-html2pdf.html'));
  await page.waitForTimeout(5000); // wait for download
  await browser.close();
  console.log('done');
})();
