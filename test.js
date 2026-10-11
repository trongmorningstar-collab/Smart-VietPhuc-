import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle0' });
  
  const body = await page.evaluate(() => document.body.innerHTML);
  console.log("BODY LENGTH:", body.length);
  
  await browser.close();
})();
