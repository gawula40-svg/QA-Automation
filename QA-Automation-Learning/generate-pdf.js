const { chromium } = require('playwright');

async function generatePDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + __dirname + '/playwright-report/index.html');
  await page.pdf({ path: 'test-results.pdf', format: 'A4' });
  await browser.close();
  console.log('PDF report generated: test-results.pdf');
}

generatePDF();