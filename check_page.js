const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('pageerror', err => console.log('Page Error:', err.toString()));
  page.on('console', msg => console.log('Console:', msg.text()));

  await page.goto('http://localhost:8080/podcast.html', { waitUntil: 'networkidle2' });
  
  const content = await page.evaluate(() => {
    return {
      grid: document.getElementById('episode-grid')?.innerHTML.length,
      featured: document.getElementById('featured-episode-card')?.innerHTML.length
    }
  });
  console.log('DOM Content Sizes:', content);
  
  await browser.close();
})();
