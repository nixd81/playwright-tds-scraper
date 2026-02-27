const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  let grandTotal = 0;
  
  const seeds = ['70','71','72','73','74','75','76','77','78','79'];
  
  for (const seed of seeds) {
    const page = await browser.newPage();
    await page.goto(`https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`, { waitUntil: 'networkidle' });
    
    const numbers = await page.evaluate(() => {
      const tds = document.querySelectorAll('table td');
      return Array.from(tds)
        .map(td => parseFloat(td.textContent))
        .filter(n => !isNaN(n) && n !== 0);
    });
    
    const pageSum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += pageSum;
    console.log(`Seed ${seed} sum: ${pageSum.toFixed(2)} (${numbers.length} numbers)`);
    
    await page.close();
  }
  
  console.log(`\n🎯 GRAND TOTAL SUM OF ALL TABLES: ${grandTotal.toFixed(2)}`);
  await browser.close();
})();
