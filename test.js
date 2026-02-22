import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('response', response => {
    if (!response.ok()) {
      console.log('HTTP ERROR:', response.status(), response.url());
    }
  });

  await page.goto('http://localhost:8000/technical-topics.html');
  const content = await page.content();
  console.log("Includes MCP?", content.includes('Why MCP?'));
  await browser.close();
})();
