const puppeteer = require('puppeteer');

async function scrapeAmazon(productName) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(productName)}`;

    await page.goto(url, { waitUntil: 'networkidle2' });

    const products = await page.evaluate(() => {
        const productElements = document.querySelectorAll('.s-main-slot .s-result-item');
        const results = [];

        productElements.forEach((element) => {
            const title = element.querySelector('h2 a span')?.innerText;
            const price = element.querySelector('.a-price .a-offscreen')?.innerText;
            const link = element.querySelector('h2 a')?.href;

            if (title && price) {
                results.push({ title, price, link });
            }
        });

        // Limit to 3 products at most
        return results.slice(0, 3);
    });

    await browser.close();
    return products;
}


module.exports = { scrapeAmazon };
