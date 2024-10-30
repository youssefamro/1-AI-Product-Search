const { generateResponse ,verifyProductTitles} = require('../models/generativeAI');
const { scrapeAmazon } = require('../models/scraper');


async function getProductSuggestions(userPrompt) {
    console.log("prompt>>>>>>>>",{userPrompt})
    const prompt = "I want you to give me about 4 products that applies to the following condition (assume any missing data)and last term is really simple one word category for example:(phone,car,mouse,headphone,...etc): " 
        + userPrompt 
        + ". I want you to reply in the form of: number of products; name1; name2; name3; name4;category;";

    try {
        const responseText = await generateResponse(prompt);
        console.log(responseText)
        const parts = responseText.split(';');
        const numberOfProducts = parseInt(parts[0]);
        const productNames = parts.slice(1, numberOfProducts + 1);
        const category = parts[numberOfProducts + 1]?.trim();

        return { productNames, category };
    } catch (error) {
        throw new Error('Error getting product suggestions: ' + error.message);
    }
}

async function verifyAndScrapeProducts(productNames, userPrompt, category) {
    const verificationResults = [];

    for (const productName of productNames) {
        const products = await scrapeAmazon(productName.trim());
        console.log("products>>>>",products)
        const verificationResult = await verifyProductTitles(products, userPrompt, category);
        console.log("verificationResult>>>",verificationResult)
        verificationResults.push(...verificationResult);
    }

    return verificationResults;
}

module.exports = { getProductSuggestions, verifyAndScrapeProducts };

